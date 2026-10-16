"""Synthetic-video classification: pre-upload prediction and leakage audit."""
import json,pickle,zipfile
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder,StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.model_selection import train_test_split,StratifiedKFold
from sklearn.metrics import roc_auc_score,average_precision_score,brier_score_loss,confusion_matrix
from sklearn.inspection import permutation_importance
from source import archive,ROOT

NUM=['duration_sec','title_length','thumbnail_face','upload_hour','tags_count','description_length','log_subscribers']
CAT=['category','upload_day']
PRE=NUM+CAT
POST=['log_likes','log_comments','log_shares']

def feature_frame(raw):
    d=raw.copy()
    for col in ['subscriber_count','likes','comments','shares']:d['log_'+('subscribers' if col=='subscriber_count' else col)]=np.log1p(d[col])
    return d

def partitions(d):
    train,hold=train_test_split(d,test_size=.4,stratify=d.viral,random_state=42)
    val,test=train_test_split(hold,test_size=.5,stratify=hold.viral,random_state=43)
    return train,val,test

def make_model(kind,leaky=False):
    nums=NUM+(POST if leaky else [])
    transform=ColumnTransformer([('numeric',StandardScaler(),nums),('category',OneHotEncoder(handle_unknown='ignore',sparse_output=False),CAT)])
    clf=LogisticRegression(max_iter=1500,C=1) if kind=='Logistic regression' else HistGradientBoostingClassifier(max_iter=140,max_leaf_nodes=15,learning_rate=.06,l2_regularization=2,early_stopping=False,random_state=42)
    return CalibratedClassifierCV(make_pipeline(transform,clf),method='sigmoid',cv=StratifiedKFold(3,shuffle=True,random_state=42))

def metrics(y,p):
    tn,fp,fn,tp=confusion_matrix(y,np.asarray(p)>=.5,labels=[0,1]).ravel()
    return {'auc':float(roc_auc_score(y,p)),'ap':float(average_precision_score(y,p)),'brier':float(brier_score_loss(y,p)),'tn':int(tn),'fp':int(fp),'fn':int(fn),'tp':int(tp)}

def main():
    path,source=archive()
    with zipfile.ZipFile(path) as z:raw=pd.read_csv(z.open('viral_videos.csv'));datasheet=z.read('datasheet.md').decode()
    if len(raw)!=12000 or raw.isna().any().any() or raw.video_id.duplicated().any():raise ValueError('Unexpected input contract')
    cutoff=float(raw.views.quantile(.8))
    if not np.array_equal((raw.views>=cutoff).astype(int),raw.viral):raise ValueError('Target construction changed')
    d=feature_frame(raw);train,val,test=partitions(d);candidates=[];models={}
    for kind in ['Logistic regression','Gradient boosting']:
        m=make_model(kind);m.fit(train[PRE],train.viral);models[kind]=m;candidates.append({'model':kind,**metrics(val.viral,m.predict_proba(val[PRE])[:,1])})
    winner=max(candidates,key=lambda r:r['ap'])['model'];model=models[winner]
    leaky=make_model('Gradient boosting',True);leaky.fit(train[PRE+POST],train.viral)
    honest=model.predict_proba(test[PRE])[:,1];retro=leaky.predict_proba(test[PRE+POST])[:,1]
    base=np.full(len(test),float(train.viral.mean()))
    results=[{'model':'Pre-upload metadata',**metrics(test.viral,honest)},{'model':'Post-outcome engagement',**metrics(test.viral,retro)},{'model':'Prevalence baseline',**metrics(test.viral,base)}]
    rows=test[['video_id','category','viral','views','subscriber_count','duration_sec','title_length','thumbnail_face','upload_hour','upload_day']].copy();rows['probability']=honest;rows['retrospective']=retro;rows=rows.sort_values('video_id')
    bins=[]
    for name,probs in [('Pre-upload metadata',honest),('Post-outcome engagement',retro)]:
        for lo in np.arange(0,1,.1):
            mask=(probs>=lo)&(probs<(lo+.1 if lo<.9 else 1.0001))
            if mask.sum():bins.append({'model':name,'bin':round(float(lo),1),'n':int(mask.sum()),'predicted':float(probs[mask].mean()),'observed':float(test.viral.to_numpy()[mask].mean())})
    importance=permutation_importance(model,val[PRE],val.viral,scoring='average_precision',n_repeats=5,random_state=42,n_jobs=1)
    importance_rows=[{'feature':f,'ap_decrease':float(v),'std':float(s)} for f,v,s in zip(PRE,importance.importances_mean,importance.importances_std)]
    rng=np.random.default_rng(42);y=test.viral.to_numpy();boot=[]
    for _ in range(1000):
        ix=rng.integers(0,len(y),len(y));boot.append(roc_auc_score(y[ix],honest[ix]))
    report={'source':source,'quality':{'rows':len(raw),'categories':int(raw.category.nunique()),'missing_values':int(raw.isna().sum().sum()),'duplicates':int(raw.video_id.duplicated().sum()),'viral_rate':float(raw.viral.mean()),'views_cutoff':cutoff},'winner':winner,'partitions':{k:v.video_id.tolist() for k,v in [('train',train),('validation',val),('test',test)]},'candidates':candidates,'metrics':results,'rows':rows.round(6).to_dict('records'),'calibration':bins,'importance':importance_rows,'auc_ci95':np.quantile(boot,[.025,.975]).tolist(),'features':PRE,'leaky_features':POST}
    out=ROOT/'artifacts';out.mkdir(exist_ok=True);(ROOT/'models').mkdir(exist_ok=True)
    (out/'analysis.json').write_text(json.dumps(report,allow_nan=False,separators=(',',':')));rows.to_csv(out/'test-predictions.csv',index=False);(out/'datasheet.md').write_text(datasheet)
    with open(ROOT/'models/model.pkl','wb') as f:pickle.dump(model,f)
    print(json.dumps({k:report[k] for k in ['quality','winner','metrics','auc_ci95']},indent=2));return report
if __name__=='__main__':main()
