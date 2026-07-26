#!/usr/bin/env python3
"""Serve the Journal Club locally with device-only owner authentication."""

from __future__ import annotations

import hashlib
import hmac
import json
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CREDENTIAL_FILE = ROOT / ".journal-club-owner.json"
HOST = "127.0.0.1"
PORT = 8765


class OwnerHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self) -> None:
        if self.path != "/api/local-owner-login":
            self.send_error(404)
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
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
    if not CREDENTIAL_FILE.exists():
        raise SystemExit(
            "Local owner credential not found. Run scripts/setup_local_owner.py first."
        )
    os.chdir(ROOT)
    server = ThreadingHTTPServer((HOST, PORT), OwnerHandler)
    print(f"Journal Club owner workspace: http://{HOST}:{PORT}/journal-club.html")
    print("Press Control-C to stop.")
    server.serve_forever()


if __name__ == "__main__":
    main()
