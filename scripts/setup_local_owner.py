#!/usr/bin/env python3
"""Create a local-only Journal Club owner credential."""

from __future__ import annotations

import getpass
import hashlib
import json
import os
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CREDENTIAL_FILE = ROOT / ".journal-club-owner.json"
ITERATIONS = 600_000


def main() -> None:
    print("\nJournal Club local owner setup")
    print("This credential stays on this Mac and is ignored by Git.\n")
    email = input("Owner email: ").strip().lower()
    if "@" not in email:
        raise SystemExit("Please enter a valid email address.")

    password = getpass.getpass("Choose a password (12+ characters): ")
    confirmation = getpass.getpass("Confirm password: ")
    if password != confirmation:
        raise SystemExit("Passwords did not match.")
    if len(password) < 12:
        raise SystemExit("Password must contain at least 12 characters.")

    salt = os.urandom(32)
    password_hash = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, ITERATIONS
    )
    payload = {
        "email": email,
        "salt": salt.hex(),
        "passwordHash": password_hash.hex(),
        "iterations": ITERATIONS,
    }

    CREDENTIAL_FILE.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    CREDENTIAL_FILE.chmod(0o600)
    print(f"\nCredential saved securely to:\n{CREDENTIAL_FILE}")
    print("\nYou can close this Terminal window.")


if __name__ == "__main__":
    main()
