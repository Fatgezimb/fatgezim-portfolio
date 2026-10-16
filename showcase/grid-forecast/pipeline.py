"""Day-ahead PJME forecasting with chronological selection and frozen holdout."""
from pathlib import Path
import json, pickle, zipfile
import numpy as np
import pandas as pd
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, root_mean_squared_error
from source import archive, ROOT

FEATURES=['hour','weekday','month','year','dayofyear','lag24','lag48','lag168','lag336','prior_mean24']
CANDIDATES={'Compact boosting':15,'Deeper boosting':31}

def prepare(raw):
    d=raw.copy();d['Datetime']=pd.to_datetime(d.Datetime)
    if d.isna().any().any() or (d.PJME_MW<=0).any():raise ValueError('Invalid source demand')
    duplicates=int(d.Datetime.duplicated().sum())
    s=d.groupby('Datetime').PJME_MW.mean().sort_index()
    index=pd.date_range(s.index.min(),s.index.max(),freq='h')
    s=s.reindex(index)
    return s,{'source_rows':len(d),'duplicate_timestamps':duplicates,'missing_hours':int(s.isna().sum()),'start':str(s.index.min()),'end':str(s.index.max())}

def features(s):
    # The full hourly index makes shift(k) an elapsed-clock-hour lag, not a row lag.
    d=pd.DataFrame({'actual':s})
    for label,values in [('hour',s.index.hour),('weekday',s.index.dayofweek),('month',s.index.month),('year',s.index.year),('dayofyear',s.index.dayofyear)]:d[label]=values
    for lag in [24,48,168,336]:d[f'lag{lag}']=s.shift(lag)
    d['prior_mean24']=s.shift(24).rolling(24,min_periods=24).mean()
    return d

def score(y,p):
    return {'mae':float(mean_absolute_error(y,p)),'rmse':float(root_mean_squared_error(y,p))}

def fit(frame,leaves):
    m=HistGradientBoostingRegressor(max_leaf_nodes=leaves,max_iter=180,learning_rate=.07,l2_regularization=1,early_stopping=False,random_state=42)
    m.fit(frame[FEATURES],frame.actual);return m

def interval_radius(errors,coverage=.9):
    a=np.sort(np.asarray(errors));return float(a[min(int(np.ceil((len(a)+1)*coverage)),len(a))-1])

def main():
    path,source=archive()
    with zipfile.ZipFile(path) as z:raw=pd.read_csv(z.open('PJME_hourly.csv'))
    s,quality=prepare(raw);full=features(s);d=full.dropna()
    candidates=[]
    for name,leaves in CANDIDATES.items():
        for year in [2014,2015]:
            train=d[d.index.year<year];val=d[d.index.year==year]
            m=fit(train,leaves);candidates.append({'model':name,'year':year,'hours':len(val),**score(val.actual,m.predict(val[FEATURES]))})
    winner=min(CANDIDATES,key=lambda name:sum(r['mae']*r['hours'] for r in candidates if r['model']==name)/sum(r['hours'] for r in candidates if r['model']==name))
    train=d[d.index.year<2016];cal=d[d.index.year==2016];test=d[d.index.year==2017].copy()
    model=fit(train,CANDIDATES[winner]);radius=interval_radius(abs(cal.actual-model.predict(cal[FEATURES])))
    test['forecast']=model.predict(test[FEATURES]);test['lower']=np.maximum(0,test.forecast-radius);test['upper']=test.forecast+radius
    test['yesterday']=test.lag24;test['last_week']=test.lag168
    test['covered']=(test.actual>=test.lower)&(test.actual<=test.upper)
    test['date']=test.index.strftime('%Y-%m-%d');test['timestamp']=test.index.strftime('%Y-%m-%d %H:%M');test['origin']=(test.index.normalize()-pd.Timedelta(hours=1)).strftime('%Y-%m-%d %H:%M')
    test['month_label']=test.index.strftime('%Y-%m');test['error']=test.forecast-test.actual
    metrics=[{'model':name,**score(test.actual,test[col])} for name,col in [(winner,'forecast'),('Yesterday','yesterday'),('Last week','last_week')]]
    monthly=[{'month':str(month),'hours':len(g),'mae':float(abs(g.error).mean()),'baseline_mae':float(abs(g.last_week-g.actual).mean()),'coverage':float(g.covered.mean())} for month,g in test.groupby('month_label')]
    daily=[{'date':date,'hours':len(g),'mae':float(abs(g.error).mean()),'peak_actual':float(g.actual.max()),'peak_forecast':float(g.forecast.max()),'coverage':float(g.covered.mean())} for date,g in test.groupby('date')]
    # Resample whole days, preserving within-day correlation; seasonality remains a limitation.
    rng=np.random.default_rng(42);errors=[abs(g.error).to_numpy() for _,g in test.groupby('date')]
    boot=[float(np.concatenate([errors[i] for i in rng.integers(0,len(errors),len(errors))]).mean()) for _ in range(1000)]
    quality.update({'eligible_test_hours':len(test),'excluded_test_hours':int((full.index.year==2017).sum()-len(test)),'train_hours':len(train),'calibration_hours':len(cal)})
    report={'source':source,'quality':quality,'winner':winner,'radius':radius,'coverage':float(test.covered.mean()),'mae_ci95':np.quantile(boot,[.025,.975]).tolist(),'candidates':candidates,'metrics':metrics,'monthly':monthly,'daily':daily,'rows':test[['timestamp','date','origin','hour','actual','forecast','lower','upper','yesterday','last_week','error']].round(3).to_dict('records'),'features':FEATURES}
    out=ROOT/'artifacts';out.mkdir(exist_ok=True);(ROOT/'models').mkdir(exist_ok=True)
    (out/'analysis.json').write_text(json.dumps(report,allow_nan=False,separators=(',',':')))
    test[['timestamp','origin','actual','forecast','lower','upper','yesterday','last_week']].to_csv(out/'test-predictions.csv',index=False)
    with open(ROOT/'models/model.pkl','wb') as f:pickle.dump(model,f)
    print(json.dumps({k:report[k] for k in ['quality','winner','radius','coverage','metrics','mae_ci95']},indent=2))
    return report
if __name__=='__main__':main()
