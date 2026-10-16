"""Checksum-locked public input. Never silently accept a changed archive."""
from pathlib import Path
import hashlib, json, requests
ROOT=Path(__file__).resolve().parent

def archive():
    lock=json.loads((ROOT/"source-lock.json").read_text())
    path=ROOT/"data/source.zip"
    if not path.exists():
        path.parent.mkdir(exist_ok=True)
        r=requests.get(lock["download"],timeout=120);r.raise_for_status()
        path.write_bytes(r.content)
    if hashlib.sha256(path.read_bytes()).hexdigest()!=lock["sha256"]:
        raise ValueError("Source archive changed; review provenance before accepting a new hash.")
    return path, lock
