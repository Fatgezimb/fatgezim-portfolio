"""Translate executed artifacts into the two dashboard evidence snapshots."""
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
APPS = ROOT.parent / "work/kaggle/apps"

def write(name, title, queries, filters):
    target = APPS / name / "src/data.json"
    previous = json.loads(target.read_text())
    snapshot = {"id": previous["id"], "surface": "dashboard", "title": title, "generatedAt": datetime.now(timezone.utc).isoformat(), "status": "reviewed", "buildStatus": "creating", "filters": filters, "queries": queries}
    target.write_text(json.dumps(snapshot, ensure_ascii=False, separators=(",", ":"), allow_nan=False))

def provenance(artifact, label, filename, caveats):
    source = artifact["source"]
    return {"label": label, "provider": "Kaggle", "url": source["url"], "files": [filename], "classification": source["classification"], "notes": [source["credit"], source["license"], *caveats], "evidenceFlow": [{"title": "Download pinned public source", "detail": source["download"]}, {"title": "Verify archive SHA-256", "detail": source["sha256"]}, {"title": "Reproduce", "detail": "Run python pipeline.py, then the executed analysis.ipynb companion."}]}

def main():
    a = json.loads((ROOT / "appointment-operations/artifacts/analysis.json").read_text())
    rows = [{**r, "month": r["appointment_date"][:7], "message": "Recorded SMS" if r["sms_received"] else "No recorded SMS"} for r in a["rows"]]
    source = provenance(a, "Medical Appointment No Shows · validated aggregates", "KaggleV2-May-2016.csv", a["methods"])
    source["sql"] = (ROOT / "appointment-operations/analysis.sql").read_text()
    source["metricDefinitions"] = [{"label":"Missed appointment rate", "definition":"Sum of missed appointments divided by sum of appointments in the selected cohorts; Yes in No-show means missed."}, {"label":"Booking lead time", "definition":"Appointment calendar date minus scheduling calendar date, in days."}, {"label":"Scenario recovered appointments", "definition":"Observed missed appointments multiplied by an assumed relative reduction. Scenario only; no intervention effect is measured."}]
    write("appointment-operations", "Appointment Operations", {
        "appointments": {"rows": rows, "source": source},
        "quality": {"rows": [a["summary"]], "source": provenance(a, "Source validation report", "KaggleV2-May-2016.csv", a["methods"])}
    }, [{"id": "month", "label": "Appointment month", "field": "month", "defaultValue": "all", "queryIds": ["appointments"]}, {"id": "lead", "label": "Booking lead time", "field": "lead_band", "defaultValue": "all", "queryIds": ["appointments"]}])
    e = json.loads((ROOT / "engine-prognostics/artifacts/analysis.json").read_text())
    source = provenance(e, "NASA C-MAPSS · held-out engine evaluation", "CMaps/{train,test,RUL}_FD00{1,3}.txt", e["methods"])
    evaluations, candidates = [], []
    for r in e["results"]:
        m=r["metrics"]
        evaluations.append({"dataset":r["dataset"], "model":r["winner"], "test_engines":100, "train_engines":100, "training_rows":r["train_rows"], "test_rows":r["test_rows"], "mae":m["mae"], "rmse":m["rmse"], "baseline_mae":m["baseline"]["mae"], "baseline_rmse":m["baseline"]["rmse"], "coverageRate":m["coverage"], "radius":m["interval_radius"], "ci_low":m["mae_ci95"][0], "ci_high":m["mae_ci95"][1]})
        candidates.extend({"dataset":r["dataset"],**v} for v in r["validation_scores"])
    write("engine-prognostics", "Engine Prognostics", {
        "engines":{"rows":[x for r in e["results"] for x in r["engines"]],"source":source},
        "history":{"rows":[x for r in e["results"] for x in r["history"]],"source":source},
        "evaluation":{"rows":evaluations,"source":source},
        "candidates":{"rows":candidates,"source":source}
    },[{"id":"dataset","label":"Fault scenario","field":"dataset","defaultValue":"FD001","queryIds":["engines","history","evaluation","candidates"]}])

if __name__ == "__main__":
    main()
