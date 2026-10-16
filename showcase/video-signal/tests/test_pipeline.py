import sys,json
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT))
from pipeline import PRE,POST,metrics

def artifact():return json.loads((ROOT/'artifacts/analysis.json').read_text())

def test_preupload_contract():
    assert not set(PRE)&{'views','viral','likes','comments','shares',*POST}

def test_disjoint_complete_partition():
    p={k:set(v) for k,v in artifact()['partitions'].items()}
    assert not p['train']&p['test'];assert not p['train']&p['validation'];assert not p['validation']&p['test']
    assert len(set.union(*p.values()))==12000
    assert [len(p[k]) for k in ['train','validation','test']]==[7200,2400,2400]

def test_probabilities_and_source_classification():
    a=artifact();assert 'Synthetic' in a['source']['classification'];assert len(a['rows'])==2400
    assert all(0<=r['probability']<=1 and 0<=r['retrospective']<=1 for r in a['rows'])
    assert sum(r['viral'] for r in a['rows'])==480

def test_metrics_reconcile():
    a=artifact();m=metrics([r['viral'] for r in a['rows']],[r['probability'] for r in a['rows']]);expected=a['metrics'][0]
    assert abs(m['auc']-expected['auc'])<1e-5
    assert sum(expected[k] for k in ['tn','fp','fn','tp'])==2400

def test_calibration_bins_cover_population():
    a=artifact()
    for name in ['Pre-upload metadata','Post-outcome engagement']:
        rows=[r for r in a['calibration'] if r['model']==name];assert sum(r['n'] for r in rows)==2400
        assert abs(sum(r['n']*r['observed'] for r in rows)-480)<1e-9
