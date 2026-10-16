import sys,json
from pathlib import Path
import numpy as np
import pandas as pd
ROOT=Path(__file__).resolve().parents[1];sys.path.insert(0,str(ROOT))
from pipeline import features,prepare,interval_radius,FEATURES

def test_no_future_information_at_forecast_origin():
    s=pd.Series(np.arange(1000,dtype=float),index=pd.date_range('2017-01-01',periods=1000,freq='h'))
    day=pd.Timestamp('2017-01-30');before=features(s).loc[day:day+pd.Timedelta(hours=23),FEATURES]
    changed=s.copy();changed.loc[day:]=999999
    pd.testing.assert_frame_equal(before,features(changed).loc[day:day+pd.Timedelta(hours=23),FEATURES])

def test_missing_hour_cannot_shift_lags():
    s=pd.Series(np.arange(600,dtype=float),index=pd.date_range('2017-01-01',periods=600,freq='h'));s.iloc[400]=np.nan
    d=features(s);assert np.isnan(d.iloc[424].lag24);assert d.iloc[425].lag24==401

def test_duplicate_policy_and_missingness():
    raw=pd.DataFrame({'Datetime':['2017-01-01 00:00','2017-01-01 00:00','2017-01-01 02:00'],'PJME_MW':[10,20,30]})
    s,q=prepare(raw);assert s.iloc[0]==15;assert np.isnan(s.iloc[1]);assert q['duplicate_timestamps']==1

def test_interval_finite_sample_order():
    assert interval_radius(np.arange(1,10),.9)==9

def test_artifact_holdout_and_reconciliation():
    a=json.loads((ROOT/'artifacts/analysis.json').read_text());r=a['rows']
    assert all(x['timestamp'].startswith('2017') and x['origin']<x['timestamp'] for x in r)
    assert sum(x['hours'] for x in a['monthly'])==len(r)==a['quality']['eligible_test_hours']
    mae=np.mean([abs(x['actual']-x['forecast']) for x in r]);assert abs(mae-a['metrics'][0]['mae'])<.001
    assert all(x['lower']<=x['forecast']<=x['upper'] for x in r)
    assert {x['year'] for x in a['candidates']}=={2014,2015}
