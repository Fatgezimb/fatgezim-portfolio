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
    queries=snapshot['queries']
    queries['engines']['rows']=[row for result in artifact['results'] for row in result['engines']]
    queries['history']['rows']=[row for result in artifact['results'] for row in result['history']]
    evaluations=[]
    candidates=[]
    for result in artifact['results']:
        m=result['metrics']
        evaluations.append({'dataset':result['dataset'],'model':result['winner'],'test_engines':100,'train_engines':100,'training_rows':result['train_rows'],'test_rows':result['test_rows'],'mae':m['mae'],'rmse':m['rmse'],'baseline_mae':m['baseline']['mae'],'baseline_rmse':m['baseline']['rmse'],'coverageRate':m['coverage'],'radius':m['interval_radius'],'ci_low':m['mae_ci95'][0],'ci_high':m['mae_ci95'][1]})
        candidates.extend({'dataset':result['dataset'],**row} for row in result['validation_scores'])
    queries['evaluation']['rows']=evaluations
    queries['candidates']['rows']=candidates
    snapshot['generatedAt']=datetime.now(timezone.utc).isoformat()
    snapshot['buildStatus']='complete'
    target.write_text(json.dumps(snapshot,ensure_ascii=False,allow_nan=False))
    print('Refreshed app/src/data.json. Rebuild the app and review its results before publishing.')

if __name__=='__main__':refresh()
