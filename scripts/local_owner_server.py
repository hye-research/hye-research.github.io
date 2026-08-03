#!/usr/bin/env python3
"""Serve the Journal Club locally with device-only owner authentication."""

from __future__ import annotations

import hashlib
import hmac
import json
import os
import socket
import subprocess
import sys
import time
from collections import deque
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
CREDENTIAL_FILE = ROOT / ".journal-club-owner.json"
HOST = "127.0.0.1"
PORT = 8765
LITNEST_ROOT = Path.home() / "LitNest"
LITNEST_HOST = "127.0.0.1"
LITNEST_PORT = 4310
ALLOWED_HOSTS = {f"127.0.0.1:{PORT}", f"localhost:{PORT}"}
ALLOWED_ORIGINS = {f"http://{host}" for host in ALLOWED_HOSTS}
DENIED_PATH_PARTS = {".git", "scripts", "supabase", "node_modules", "__pycache__"}
MAX_LOGIN_BODY = 16 * 1024
LOGIN_WINDOW_SECONDS = 60
LOGIN_ATTEMPT_LIMIT = 5
login_attempts: deque[float] = deque()


def port_is_open(host: str, port: int) -> bool:
    try:
        with socket.create_connection((host, port), timeout=0.25):
            return True
    except OSError:
        return False


def start_litnest() -> subprocess.Popen[bytes] | None:
    if port_is_open(LITNEST_HOST, LITNEST_PORT):
        print(f"LitNest already running: http://{LITNEST_HOST}:{LITNEST_PORT}")
        return None
    server_file = LITNEST_ROOT / "server.mjs"
    if not server_file.exists():
        print(f"LitNest was not found at {LITNEST_ROOT}", file=sys.stderr)
        return None
    environment = os.environ.copy()
    environment.update({"HOST": LITNEST_HOST, "PORT": str(LITNEST_PORT)})
    process = subprocess.Popen(
        ["node", "--no-warnings", "server.mjs"],
        cwd=LITNEST_ROOT,
        env=environment,
    )
    print(f"Starting LitNest: http://{LITNEST_HOST}:{LITNEST_PORT}")
    return process


class OwnerHandler(SimpleHTTPRequestHandler):
    server_version = "HYIntranet"
    sys_version = ""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def host_allowed(self) -> bool:
        return self.headers.get("Host", "").lower() in ALLOWED_HOSTS

    def path_allowed(self) -> bool:
        try:
            decoded = urlsplit(self.path).path
            for _ in range(3):
                expanded = unquote(decoded)
                if expanded == decoded:
                    break
                decoded = expanded
            parts = [part for part in decoded.split("/") if part]
            candidate = (ROOT.joinpath(*parts)).resolve()
            candidate.relative_to(ROOT.resolve())
        except ValueError:
            return False
        return not any(
            part.startswith(".") or part.casefold() in DENIED_PATH_PARTS
            for part in parts
        )

    def do_GET(self) -> None:
        if not self.host_allowed():
            self.send_error(421, "Invalid local host")
            return
        if not self.path_allowed():
            self.send_error(404)
            return
        super().do_GET()

    def do_HEAD(self) -> None:
        if not self.host_allowed():
            self.send_error(421, "Invalid local host")
            return
        if not self.path_allowed():
            self.send_error(404)
            return
        super().do_HEAD()

    def list_directory(self, path: str):
        self.send_error(404)
        return None

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self'; base-uri 'none'; object-src 'none'; "
            "frame-ancestors 'none'; form-action 'self'; img-src 'self' data: blob:; "
            "font-src 'self' data:; style-src 'self' 'unsafe-inline'; "
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
            "connect-src 'self' https://*.supabase.co wss://*.supabase.co; "
            "worker-src 'self' blob:",
        )
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Resource-Policy", "same-origin")
        self.send_header(
            "Permissions-Policy",
            "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
        )
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("X-Robots-Tag", "noindex, nofollow")
        super().end_headers()

    def do_POST(self) -> None:
        if not self.host_allowed():
            self.send_error(421, "Invalid local host")
            return
        if self.path != "/api/local-owner-login":
            self.send_error(404)
            return
        content_type = self.headers.get("Content-Type", "").split(";", 1)[0].strip()
        origin = self.headers.get("Origin")
        fetch_site = self.headers.get("Sec-Fetch-Site")
        if (
            content_type != "application/json"
            or origin not in ALLOWED_ORIGINS
            or fetch_site not in (None, "same-origin", "none")
        ):
            self.send_error(403, "Untrusted request")
            return

        now = time.monotonic()
        while login_attempts and now - login_attempts[0] > LOGIN_WINDOW_SECONDS:
            login_attempts.popleft()
        if len(login_attempts) >= LOGIN_ATTEMPT_LIMIT:
            self.send_error(429, "Too many attempts")
            return
        login_attempts.append(now)

        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_LOGIN_BODY:
                raise ValueError("Invalid request size")
            submitted = json.loads(self.rfile.read(length))
            stored = json.loads(CREDENTIAL_FILE.read_text(encoding="utf-8"))
            candidate = hashlib.pbkdf2_hmac(
                "sha256",
                submitted.get("password", "").encode("utf-8"),
                bytes.fromhex(stored["salt"]),
                int(stored["iterations"]),
            )
            email_matches = hmac.compare_digest(
                submitted.get("email", "").strip().lower(), stored["email"]
            )
            password_matches = hmac.compare_digest(
                candidate.hex(), stored["passwordHash"]
            )
            success = email_matches and password_matches
        except (OSError, ValueError, KeyError, json.JSONDecodeError):
            success = False

        body = json.dumps({"success": success}).encode("utf-8")
        self.send_response(200 if success else 401)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args) -> None:
        print(f"[Journal Club] {format % args}")


def main() -> None:
    os.umask(0o077)
    if CREDENTIAL_FILE.exists():
        CREDENTIAL_FILE.chmod(0o600)
    litnest_process = start_litnest()
    os.chdir(ROOT)
    server = ThreadingHTTPServer((HOST, PORT), OwnerHandler)
    print(f"HY Intranet: http://{HOST}:{PORT}/intranet.html")
    print("Press Control-C to stop.")
    try:
        server.serve_forever()
    finally:
        if litnest_process is not None and litnest_process.poll() is None:
            litnest_process.terminate()


if __name__ == "__main__":
    main()
