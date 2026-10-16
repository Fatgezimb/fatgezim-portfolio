import React, { useState } from "react";
import { DataComponent, DataTable, Dropdown, EvidenceChart, Filters, MetricCard, Section, Slider, SortableItem, SortableRegion, useDataApp, useDashboardTabs } from "../../data-app-public.jsx";
import "./project.css";

const num = n=>Number(n).toFixed(1);
const tabs=[{id:"fleet",label:"Engine explorer",filterIds:["dataset"]},{id:"evaluation",label:"Model evaluation",filterIds:["dataset"]},{id:"methods",label:"How it works",filterIds:[]}];
export function DashboardContent() {
  const {queries,filters,setFilter,reviewedRows}=useDataApp();
  const {activeTabId}=useDashboardTabs(tabs);
  const tab=activeTabId||"fleet";
  const dataset=filters.dataset==="FD003"?"FD003":"FD001";
  const engines=reviewedRows("engines",["engine"]).filter(r=>r.dataset===dataset);
  const history=reviewedRows("history",["engine","cycle"]).filter(r=>r.dataset===dataset);
  const evaluation=reviewedRows("evaluation",["dataset"]).find(r=>r.dataset===dataset);
  const [engineId,setEngineId]=useState(null);
  const [step,setStep]=useState(999);
  const [threshold,setThreshold]=useState(30);
  const selected=engines.find(r=>String(r.engine)===engineId)??[...engines].sort((a,b)=>b.last_cycle-a.last_cycle)[0];
  const series=history.filter(r=>r.engine===selected?.engine).sort((a,b)=>a.cycle-b.cycle);
  const index=Math.min(step,Math.max(0,series.length-1));
  const current=series[index];
  const observed=series.slice(0,index+1);
  const flagged=engines.filter(r=>r.predicted<=threshold).length;
  const improvement=evaluation?100*(1-evaluation.mae/evaluation.baseline_mae):0;
  const lower=Math.max(0,(current?.predicted??0)-(evaluation?.radius??0));
  const upper=(current?.predicted??0)+(evaluation?.radius??0);
  const selectEngine=id=>{setEngineId(String(id));setStep(999);};
  return <article className="engine-app">
    <h1 className="project-accessible-title">Engine Prognostics</h1>
    <div className="project-context"><span>NASA C-MAPSS · Simulated degradation · Offline benchmark</span><a href="../../work/">Zim Bela / Work ↗</a></div>
    {tab!=="methods" && <Filters filters={[]} queries={queries} values={filters} onChange={setFilter}><Dropdown label="Fault scenario" showLabel value={dataset} choices={["FD001","FD003"]} choiceLabels={{FD001:"FD001 · Compressor",FD003:"FD003 · Compressor + fan"}} onChange={value=>{setFilter("dataset",value);setEngineId(null);setStep(999);}}/></Filters>}
    {tab==="fleet"&&current&&<>
      <div className="engine-explorer">
        <DataComponent id="engine-replay" queryId="history" title={`Engine ${String(selected.engine).padStart(3,"0")} · observation replay`} kind="custom" sourceRows={observed} displayRows={observed} variant="card" headerControls={<Dropdown label="Engine" showLabel value={String(selected.engine)} choices={engines.map(r=>String(r.engine))} onChange={selectEngine}/>}>
          <div className="engine-reading"><div><span>Estimated cycles remaining</span><strong>{num(current.predicted)}<small>cycles</small></strong><p>Using observations through cycle {current.cycle}</p></div><div className="cycle-dial" style={{"--progress":`${100*current.cycle/selected.last_cycle}%`}}><div><b>{current.cycle}</b><span>observed cycle</span></div></div></div>
          <Slider label="Observed cycle" min={0} max={Math.max(1,series.length-1)} step={1} value={index} onChange={value=>setStep(Number(value))} formatValue={value=>`Cycle ${series[Number(value)]?.cycle??1}`}/>
          <div className="forecast-context"><span>Calibrated interval: <b>{num(lower)}–{num(upper)} cycles</b></span><span>Historical truth: <b>{current.actual} cycles</b></span></div>
          <p className="chart-note">Historical truth is revealed for benchmark comparison. The model uses only sensor readings available at the selected cycle. Replay is sampled every five cycles, plus the endpoints.</p>
        </DataComponent>
        <div className="engine-summary"><DataComponent id="fleet-threshold" queryId="engines" title="Review threshold" kind="custom" displayRows={[{engines:engines.length,flagged,threshold}]} sourceRows={engines} variant="card"><strong className="big-count">{flagged}<small> / {engines.length}</small></strong><p>engines with estimated remaining life of {threshold} cycles or fewer at their last recorded observation</p><Slider label="Review threshold in cycles" min={10} max={100} step={5} value={threshold} onChange={value=>setThreshold(Number(value))} formatValue={v=>`${v} cycles`}/><p className="chart-note">A benchmark exploration threshold. Results vary with the selected fault scenario.</p></DataComponent><DataComponent id="interval-note" queryId="evaluation" title="Read the uncertainty" kind="custom" displayRows={[evaluation]} sourceRows={[evaluation]} variant="card"><p>The interval radius is {num(evaluation.radius)} cycles. Wide intervals reflect limited calibration data and uncertain early-life estimates.</p><p>Nominal coverage is 90%; measured official-test coverage is {(evaluation.coverageRate*100).toFixed(0)}%. Coverage alone does not make an interval precise.</p></DataComponent></div>
      </div>
      <Section id="replay-title" title="Follow the prediction as evidence arrives"><EvidenceChart id="remaining-life" queryId="history" title="Remaining life over observed cycles" rows={observed} sourceRows={observed} height={300} variant="card" spec={{type:"line",x:"cycle",y:"predicted",fields:["predicted","actual"],legend:{labels:{predicted:"Model estimate",actual:"Historical truth"}},colors:{predicted:"var(--chart-1)",actual:"var(--chart-2)"},showLegend:true,stackable:false,xLabel:"Observed cycle",yLabel:"Cycles remaining",valueDecimals:1}} /></Section>
      <Section id="fleet-table-title" title="Inspect the held-out engines"><DataComponent id="engine-table" title="Official test engines" queryId="engines" kind="table" displayRows={[...engines].sort((a,b)=>a.predicted-b.predicted)} sourceRows={engines} variant="card"><DataTable label="Held-out engines; select an engine to replay its observations" rows={[...engines].sort((a,b)=>a.predicted-b.predicted)} rowKey="engine" selectedRowKey={selected.engine} onRowSelect={row=>selectEngine(row.engine)} rowActionLabel={row=>`Replay engine ${row.engine}`} columns={[{field:"engine",label:"Engine"},{field:"last_cycle",label:"Observed cycles"},{field:"predicted",label:"Estimated RUL",renderCell:v=>num(v)},{field:"actual",label:"Actual RUL"},{field:"error",label:"Signed error",renderCell:v=>num(v)}]}/></DataComponent></Section>
    </>}
    {tab==="evaluation"&&evaluation&&<>
      <SortableRegion id="engine:evaluation-metrics" variant="freeform" className="project-metrics">
        {[['mae','Mean absolute error',`${num(evaluation.mae)} cycles`],['baseline','Age-only baseline',`${num(evaluation.baseline_mae)} cycles`],['improvement','Lower error than baseline',`${num(improvement)}%`]].map(([id,title,value])=><SortableItem id={id} label={title} key={id} kind="metric"><MetricCard id={id} queryId="evaluation" title={title} value={value} displayRows={[evaluation]} sourceRows={[evaluation]}/></SortableItem>)}
      </SortableRegion>
      <Section id="benchmark-title" title="A comparison on the same 100 test engines" spacing="after-metrics" columns={2}>
        <EvidenceChart id="baseline-comparison" queryId="evaluation" title="Model versus age-only baseline" rows={[{model:evaluation.model,MAE:evaluation.mae,RMSE:evaluation.rmse},{model:"Age only",MAE:evaluation.baseline_mae,RMSE:evaluation.baseline_rmse}]} sourceRows={[evaluation]} height={300} variant="card" spec={{type:"bar",x:"model",y:"MAE",fields:["MAE","RMSE"],colors:{MAE:"var(--chart-1)",RMSE:"var(--chart-2)"},showLegend:true,stackable:false,startAtZero:true,yLabel:"Error in cycles",valueDecimals:1,showXAxisLabel:false}}/>
        <EvidenceChart id="prediction-scatter" queryId="engines" title="Prediction versus historical truth" rows={engines} sourceRows={engines} height={300} variant="card" spec={{type:"scatter",x:"actual",y:"predicted",xLabel:"Actual cycles remaining",yLabel:"Predicted cycles remaining",valueDecimals:1,colors:{predicted:"var(--chart-1)"}}}/>
      </Section>
      <Section id="interpretation-title" title="What the score does—and does not—tell us"><DataComponent id="evaluation-context" queryId="evaluation" title="Evaluation context" kind="custom" displayRows={[evaluation]} sourceRows={[evaluation]} variant="card"><div className="method-columns"><div><h3>{evaluation.model}</h3><p>Selected using 20 validation engines, then fitted on 80 engines. The official test set contains 100 other engine trajectories.</p><p>MAE 95% bootstrap interval: {num(evaluation.ci_low)}–{num(evaluation.ci_high)} cycles, resampling whole test engines 2,000 times.</p></div><div><h3>A bounded forecast horizon</h3><p>Training targets and predictions are capped at 125 cycles. Evaluation uses uncapped official truth, so long-lived engines can produce large errors.</p><p>Each scenario has one operating condition. Generalization to other operating conditions and real engines remains unmeasured.</p></div></div></DataComponent></Section>
      <Section id="validation-title" title="Model selection evidence"><DataComponent id="validation-scores" queryId="candidates" title="Validation scores before official testing" kind="table" displayRows={reviewedRows("candidates",["model"])} sourceRows={reviewedRows("candidates",["model"])} variant="card"><DataTable searchable={false} label="Candidate models evaluated on validation engines" rows={reviewedRows("candidates",["model"])} columns={[{field:"model",label:"Candidate"},{field:"n",label:"Validation engines"},{field:"mae",label:"MAE (cycles)",renderCell:v=>num(v)},{field:"rmse",label:"RMSE (cycles)",renderCell:v=>num(v)}]}/></DataComponent></Section>
    </>}
    {tab==="methods"&&<>
      <section className="method-intro"><h2>How much operating life remains?</h2><p>Follow a simulated engine from sensor observations to a forecast, then inspect the errors against known outcomes.</p></section>
      <div className="method-columns"><section><h2>Two fault scenarios</h2><p><b>FD001:</b> high-pressure compressor degradation, one operating condition.</p><p><b>FD003:</b> compressor and fan degradation, one operating condition.</p><p>Each scenario includes 100 training engines and 100 official test engines. They are modeled independently.</p></section><section><h2>Features available at prediction time</h2><p>Cycle count, 14 current sensor readings, their trailing 10-cycle means, and their trailing deltas. There are 43 features.</p><p>Rolling windows restart for every engine. A later sensor reading cannot change an earlier feature row.</p></section></div>
      <div className="split-story"><div><strong>60</strong><span>engines fit candidate models</span></div><div><strong>20</strong><span>engines select the model</span></div><div><strong>20</strong><span>engines calibrate uncertainty</span></div><div><strong>100</strong><span>official test engines per scenario</span></div></div>
      <div className="method-columns"><section><h2>Why hold out whole engines?</h2><p>Adjacent cycles from one engine are closely related. Randomly splitting rows would let the model see the same engine during training and testing.</p><p>After model selection, the chosen model is refitted on the 60 training and 20 validation engines. Calibration engines remain separate.</p></section><section><h2>Uncertainty with visible limits</h2><p>A nominal 90% split-conformal interval uses one randomly censored snapshot from each calibration engine. Calibration and test censoring differ, so coverage is measured explicitly.</p><p>The included notebook documents the full method, model parameters, split identities and results. The browser replays saved predictions from that pipeline.</p></section></div>
      <div className="artifact-links"><a href="./analysis.html">Read the executed analysis ↗</a><a href="./project.zip" download>Download the complete project ↓</a><a href="https://www.kaggle.com/datasets/behrad3d/nasa-cmaps" target="_blank" rel="noreferrer">Kaggle dataset ↗</a><a href="https://data.nasa.gov/dataset/cmapss-jet-engine-simulated-data" target="_blank" rel="noreferrer">NASA provenance ↗</a></div>
      <p className="chart-note">NASA Ames Prognostics Center of Excellence; Saxena, Goebel, Simon & Eklund (2008). Kaggle distribution: B² / behrad3d, CC0. Original application and analysis code: MIT.</p>
    </>}
  </article>;
}
