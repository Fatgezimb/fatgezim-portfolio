import json
from pathlib import Path
import pandas as pd
import pipeline

ROOT=Path(__file__).resolve().parent

def test_outcome_counts_reconcile():
    a=json.loads((ROOT/'artifacts/analysis.json').read_text())
    assert sum(r['appointments'] for r in a['rows'])==a['summary']['accepted_rows']==110521
    assert sum(r['missed'] for r in a['rows'])==a['summary']['missed']==22314
    assert a['summary']['accepted_rows']+a['summary']['quarantined_rows']==a['summary']['source_rows']

def test_grain_unique_and_numerators_bounded():
    a=json.loads((ROOT/'artifacts/analysis.json').read_text())
    keys=[(r['appointment_date'],r['lead_band'],r['sms_received']) for r in a['rows']]
    assert len(keys)==len(set(keys))
    assert all(0<=r['missed']<=r['appointments'] for r in a['rows'])

def test_sql_preserves_weighted_counts():
    frame=pd.DataFrame([{'appointment_date':'2016-05-01','weekday':'Sunday','lead_band':'Same day','sms_received':0,'no_show':n,'lead_days':0} for n in [0,0,1]])
    result=pipeline.aggregate(frame)
    assert result.iloc[0].appointments==3
    assert result.iloc[0].missed==1

def test_filters_partition_totals():
    a=json.loads((ROOT/'artifacts/analysis.json').read_text())
    months={r['appointment_date'][:7] for r in a['rows']}
    assert sum(sum(r['appointments'] for r in a['rows'] if r['appointment_date'].startswith(m)) for m in months)==110521

def test_export_has_no_record_identifiers():
    a=json.loads((ROOT/'artifacts/analysis.json').read_text())
    forbidden={'PatientId','AppointmentID','Age','Gender','Neighbourhood','Diabetes','Hipertension'}
    assert all(not forbidden.intersection(r) for r in a['rows'])

def test_quarantine_does_not_discard_same_day_booking():
    a=json.loads((ROOT/'artifacts/analysis.json').read_text())
    assert a['summary']['negative_lead_rows']==5
    assert next(r for r in a['lead'] if r['lead_band']=='Same day')['appointments']>38000
