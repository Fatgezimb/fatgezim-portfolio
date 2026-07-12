from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]

required = [
    "README_START_HERE.md",
    "SUBMIT_THIS_TO_CODEX.md",
    "AGENTS.md",
    "PLANS.md",
    "phase-state.json",
    "prompts/00_MASTER_ORCHESTRATOR.md",
    "prompts/01_PHASE_1_CONTENT_LAYOUT.md",
    "prompts/03_PHASE_2_VISUAL_MOTION.md",
    ".agents/skills/portfolio-phase-gate/SKILL.md",
    "prototype/index.html",
    "prototype/styles.css",
    "prototype/script.js",
]

missing = [path for path in required if not (ROOT / path).exists()]
if missing:
    raise SystemExit(f"Missing required files: {missing}")

json.loads((ROOT / "phase-state.json").read_text(encoding="utf-8"))
json.loads((ROOT / "schemas/PROJECT_SCHEMA.json").read_text(encoding="utf-8"))
json.loads((ROOT / "project-briefs/portfolio-content.seed.json").read_text(encoding="utf-8"))

class Parser(HTMLParser):
    pass

parser = Parser()
parser.feed((ROOT / "prototype/index.html").read_text(encoding="utf-8"))

css = (ROOT / "prototype/styles.css").read_text(encoding="utf-8")
if css.count("{") != css.count("}"):
    raise SystemExit("CSS brace count does not match")

if "APPROVE PHASE 1" not in (ROOT / "AGENTS.md").read_text(encoding="utf-8"):
    raise SystemExit("Phase 1 approval phrase missing from AGENTS.md")

print("Pack validation passed.")
