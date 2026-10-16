import json
from pathlib import Path
import numpy as np
import pandas as pd
import pipeline

ROOT=Path(__file__).resolve().parent

def artifact():
    return json.loads((ROOT/'artifacts/analysis.json').read_text())

def test_whole_engine_splits_are_disjoint():
    for result in artifact()['results']:
        a,b,c=[set(result['split'][k]) for k in ['fit','validation','calibration']]
        assert [len(a),len(b),len(c)]==[60,20,20]
        assert not (a&b or a&c or b&c)
        assert len(a|b|c)==100

def test_rolling_features_cannot_see_future():
    rows=[]
    for engine in [1,2]:
        for cycle in range(1,16):
            rows.append({'engine':engine,'cycle':cycle,**{f'sensor_{n}':float(cycle+engine) for n in pipeline.SENSORS}})
    frame=pd.DataFrame(rows)
    before=pipeline.features(frame)
    frame.loc[(frame.engine==1)&(frame.cycle>8),'sensor_11']=999999
    after=pipeline.features(frame)
    pd.testing.assert_frame_equal(before[(before.engine==1)&(before.cycle<=8)],after[(after.engine==1)&(after.cycle<=8)])
    pd.testing.assert_frame_equal(before[before.engine==2],after[after.engine==2])

def test_engine_window_restarts():
    frame=pd.DataFrame([{'engine':e,'cycle':c,**{f'sensor_{n}':100*e+c for n in pipeline.SENSORS}} for e in [1,2] for c in [1,2]])
    transformed=pipeline.features(frame)
    row=transformed[(transformed.engine==2)&(transformed.cycle==1)].iloc[0]
    assert row.sensor_11_mean10==201
    assert row.sensor_11_delta10==0

def test_conformal_order_statistic():
    assert pipeline.conformal_radius(np.arange(1,21),.9)==19

def test_official_test_metrics_reconcile():
    for result in artifact()['results']:
        frame=pd.DataFrame(result['engines'])
        assert len(frame)==frame.engine.nunique()==100
        assert abs(np.abs(frame.predicted-frame.actual).mean()-result['metrics']['mae'])<.001
        assert abs(np.sqrt(((frame.predicted-frame.actual)**2).mean())-result['metrics']['rmse'])<.001

def test_replay_last_point_matches_evaluation():
    for result in artifact()['results']:
        frame=pd.DataFrame(result['history']).sort_values(['engine','cycle']).groupby('engine').tail(1)
        for row in result['engines']:
            last=frame[frame.engine==row['engine']].iloc[0]
            assert last.predicted==row['predicted']
            assert last.actual==row['actual']
            assert last.cycle==row['last_cycle']

def test_predictions_bounded_truth_uncapped():
    for result in artifact()['results']:
        assert all(0<=r['predicted']<=125 for r in result['engines'])
        assert any(r['actual']>125 for r in result['engines'])

def test_interval_coverage_reconciles():
    for result in artifact()['results']:
        calculated=np.mean([r['lower']<=r['actual']<=r['upper'] for r in result['engines']])
        assert calculated==result['metrics']['coverage']
