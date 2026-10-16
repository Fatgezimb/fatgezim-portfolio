"""Refresh the portable app snapshot after a successful pipeline run."""
from pathlib import Path
import json
from datetime import datetime, timezone
from pipeline import run

def refresh():
    root=Path(__file__).resolve().parent
    artifact=run()
    target=root/'app/src/data.json'
    snapshot=json.loads(target.read_text())
    snapshot['queries']['appointments']['rows']=[{**r,'month':r['appointment_date'][:7],'message':'Recorded SMS' if r['sms_received'] else 'No recorded SMS'} for r in artifact['rows']]
    snapshot['queries']['quality']['rows']=[artifact['summary']]
    snapshot['generatedAt']=datetime.now(timezone.utc).isoformat()
    snapshot['buildStatus']='complete'
    target.write_text(json.dumps(snapshot,ensure_ascii=False,allow_nan=False))
    print('Refreshed app/src/data.json. Rebuild the app and review its results before publishing.')

if __name__=='__main__':refresh()
