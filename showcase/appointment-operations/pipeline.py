"""Reproduce Appointment Operations from the pinned public Kaggle archive.

No credentials required. Raw identifiers remain in the ignored data directory.
The public artifact contains aggregate appointment counts only.
"""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path
import sqlite3
import urllib.request
import zipfile

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent
SOURCE = "https://www.kaggle.com/datasets/joniarroba/noshowappointments"
DOWNLOAD = "https://www.kaggle.com/api/v1/datasets/download/joniarroba/noshowappointments"
EXPECTED_COLUMNS = {"PatientId", "AppointmentID", "Gender", "ScheduledDay", "AppointmentDay", "Age", "Neighbourhood", "Scholarship", "Hipertension", "Diabetes", "Alcoholism", "Handcap", "SMS_received", "No-show"}
LEAD_BANDS = ["Same day", "1–7 days", "8–30 days", "31+ days"]


def download(destination: Path) -> Path:
    destination.mkdir(parents=True, exist_ok=True)
    archive = destination / "appointments.zip"
    if not archive.exists():
        urllib.request.urlretrieve(DOWNLOAD, archive)
    return archive


def load_validate(archive: Path) -> tuple[pd.DataFrame, dict]:
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    lock = ROOT / "source-lock.json"
    if lock.exists() and json.loads(lock.read_text())["sha256"] != digest:
        raise ValueError("Source checksum changed. Review the new source before rebuilding.")
    with zipfile.ZipFile(archive) as zipped:
        with zipped.open("KaggleV2-May-2016.csv") as stream:
            raw = pd.read_csv(stream, dtype={"PatientId": "string", "AppointmentID": "string"})
    if set(raw.columns) != EXPECTED_COLUMNS:
        raise ValueError("Unexpected source schema")
    if raw.isna().any().any() or raw.AppointmentID.duplicated().any():
        raise ValueError("Missing values or duplicate appointment IDs require review")
    if not set(raw["No-show"]).issubset({"Yes", "No"}) or not set(raw.SMS_received).issubset({0, 1}):
        raise ValueError("Unexpected outcome or SMS category")
    scheduled = pd.to_datetime(raw.ScheduledDay, utc=True, errors="raise")
    appointed = pd.to_datetime(raw.AppointmentDay, utc=True, errors="raise")
    # Appointment timestamps are date placeholders. Normalize BOTH timestamps
    # before subtraction; an afternoon booking for the same date is valid.
    lead = (appointed.dt.normalize() - scheduled.dt.normalize()).dt.days
    bad_age = raw.Age < 0
    bad_order = lead < 0
    valid = ~(bad_age | bad_order)
    frame = pd.DataFrame({
        "appointment_date": appointed.dt.strftime("%Y-%m-%d"),
        "weekday": appointed.dt.day_name(),
        "lead_days": lead,
        "lead_band": pd.cut(lead, [-1, 0, 7, 30, np.inf], labels=LEAD_BANDS).astype("string"),
        "sms_received": raw.SMS_received,
        "no_show": (raw["No-show"] == "Yes").astype(int),
    })[valid].copy()
    audit = {
        "source_rows": len(raw), "accepted_rows": len(frame), "quarantined_rows": int((~valid).sum()),
        "negative_age_rows": int(bad_age.sum()), "negative_lead_rows": int(bad_order.sum()),
        "age_above_110_rows": int((raw.Age > 110).sum()),
        "missing_values": int(raw.isna().sum().sum()), "duplicate_appointment_ids": int(raw.AppointmentID.duplicated().sum()),
        "unique_patients": int(raw.PatientId.nunique()),
        "start": frame.appointment_date.min(), "end": frame.appointment_date.max(),
        "sha256": digest,
    }
    return frame, audit


def aggregate(frame: pd.DataFrame) -> pd.DataFrame:
    with sqlite3.connect(":memory:") as connection:
        frame.to_sql("appointments", connection, index=False)
        result = pd.read_sql_query((ROOT / "analysis.sql").read_text(), connection)
    assert int(result.appointments.sum()) == len(frame)
    assert int(result.missed.sum()) == int(frame.no_show.sum())
    assert (result.missed <= result.appointments).all()
    return result


def run(archive: Path | None = None) -> dict:
    archive = archive or download(ROOT / "data")
    frame, audit = load_validate(archive)
    rows = aggregate(frame)
    lead = frame.groupby("lead_band", observed=True).agg(appointments=("no_show", "size"), missed=("no_show", "sum"), lead_days=("lead_days", "sum")).reindex(LEAD_BANDS).reset_index()
    lead["rate"] = lead.missed / lead.appointments
    summary = {**audit, "missed": int(frame.no_show.sum()), "attendance_rate": float(1-frame.no_show.mean()), "no_show_rate": float(frame.no_show.mean()), "mean_lead_days": float(frame.lead_days.mean())}
    methods = [
        "Each row is one appointment; repeat patients remain repeat appointments.",
        "UTC calendar dates are compared because the appointment field has no meaningful visit time.",
        "Quarantine negative age and booking-after-appointment dates; preserve other source records.",
        "No-show is Yes = missed, No = attended. Rates are missed / appointments, recomputed from additive counts.",
        "SMS groups are observational and differ in booking lead time. Their difference is not an estimate of message effectiveness.",
        "The planning control applies an assumed relative reduction in missed appointments; it is not a measured intervention result.",
    ]
    artifact = {"summary": summary, "rows": rows.to_dict("records"), "lead": lead.to_dict("records"), "methods": methods,
        "source": {"url": SOURCE, "download": DOWNLOAD, "version": 5, "license": "CC BY-NC-SA 4.0", "credit": "Joni Hoppen and Aquarela Analytics", "file": "KaggleV2-May-2016.csv", "sha256": audit["sha256"], "classification": "Historical observations, Brazil, 2016"}}
    out = ROOT / "artifacts"
    out.mkdir(exist_ok=True)
    (out / "analysis.json").write_text(json.dumps(artifact, ensure_ascii=False, indent=2, allow_nan=False))
    rows.to_csv(out / "appointment-cohorts.csv", index=False)
    (out / "quality-report.json").write_text(json.dumps(audit, indent=2))
    print(json.dumps(summary, indent=2))
    return artifact


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--archive", type=Path)
    run(parser.parse_args().archive)
