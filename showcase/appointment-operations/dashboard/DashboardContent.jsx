import React, { useState } from "react";
import { DataComponent, DataTable, EvidenceChart, Filters, MetricCard, Section, Slider, SortableItem, SortableRegion, useDataApp, useDashboardTabs } from "../../data-app-public.jsx";
import "./project.css";

const fmt = n => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
const pct = n => `${(100*n).toFixed(1)}%`;
const bands = ["Same day", "1–7 days", "8–30 days", "31+ days"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export function aggregateRows(rows, field) {
  const map = new Map();
  for (const row of rows) {
    const key = row[field];
    const value = map.get(key) ?? { [field]:key, appointments:0, missed:0, total_lead_days:0 };
    for (const name of ["appointments", "missed", "total_lead_days"]) value[name] += row[name];
    map.set(key, value);
  }
  return [...map.values()].map(row => ({...row, attended:row.appointments-row.missed, missedRate:row.missed/row.appointments}));
}
const tabs = [{id:"overview", label:"Attendance", filterIds:["month","lead"]}, {id:"planning", label:"Capacity planning", filterIds:["month","lead"]}, {id:"methods", label:"Data & methods", filterIds:[]}];

export function DashboardContent() {
  const { snapshot, queries, filters, setFilter, reviewedRows, assumptions, setAssumptions } = useDataApp();
  const { activeTabId } = useDashboardTabs(tabs);
  const tab = activeTabId || "overview";
  const rows = reviewedRows("appointments", ["appointment_date","lead_band","sms_received"]);
  const totals = aggregateRows(rows.map(row=>({...row,group:"all"})),"group")[0] ?? {appointments:0,missed:0,total_lead_days:0,missedRate:0};
  const lead = aggregateRows(rows,"lead_band").sort((a,b)=>bands.indexOf(a.lead_band)-bands.indexOf(b.lead_band));
  const daily = aggregateRows(rows,"appointment_date").sort((a,b)=>a.appointment_date.localeCompare(b.appointment_date));
  const weekday = aggregateRows(rows,"weekday").sort((a,b)=>days.indexOf(a.weekday)-days.indexOf(b.weekday));
  const summary = queries.quality.rows[0];
  const reduction = Number(assumptions.reduction ?? 10);
  const minutes = Number(assumptions.minutes ?? 30);
  const recovered = totals.missed * reduction/100;
  const [expanded, setExpanded] = useState(false);
  const metricRows = [{appointments:totals.appointments,missed:totals.missed,missedRate:totals.missedRate}];
  return <article className="appointment-app">
    <h1 className="project-accessible-title">Appointment Operations</h1>
    <div className="project-context"><span>Brazil · April–June 2016 · Historical appointment records</span><a href="../../work/">Zim Bela / Work ↗</a></div>
    {tab !== "methods" && <Filters filters={snapshot.filters} queries={queries} values={filters} onChange={setFilter} />}
    {tab === "overview" && <>
      <SortableRegion id="appointments:metrics" variant="freeform" className="project-metrics">
        {[['appointments','Appointments',fmt(totals.appointments)],['missed','Missed appointments',fmt(totals.missed)],['rate','Missed appointment rate',pct(totals.missedRate)]].map(([id,title,value])=><SortableItem key={id} id={id} label={title} kind="metric"><MetricCard id={id} title={title} value={value} queryId="appointments" displayRows={metricRows} sourceRows={rows}/></SortableItem>)}
      </SortableRegion>
      <Section id="attendance-title" title="Where attendance changes" spacing="after-metrics">
        <SortableRegion id="appointments:main" variant="freeform" className="project-primary">
          <SortableItem id="lead-time" label="Missed rate by booking lead time" kind="chart"><EvidenceChart id="lead-time" queryId="appointments" title="Missed rate by booking lead time" rows={lead} sourceRows={rows} variant="card" height={310} spec={{type:"bar",x:"lead_band",y:"missedRate",colors:{missedRate:"var(--chart-1)"},startAtZero:true,valueDecimals:1,showXAxisLabel:false}}><p className="chart-note">Appointments are grouped by the number of calendar days between booking and the visit. This comparison describes association.</p></EvidenceChart></SortableItem>
          <SortableItem id="weekday" label="Appointments by weekday" kind="chart"><EvidenceChart id="weekday" queryId="appointments" title="Appointments by weekday" rows={weekday} sourceRows={rows} variant="card" height={310} spec={{type:"stackedBar",x:"weekday",y:"attended",fields:["attended","missed"],colors:{attended:"var(--chart-2)",missed:"var(--chart-1)"},showLegend:true,startAtZero:true,showXAxisLabel:false,valueDecimals:0}}><p className="chart-note">Counts preserve the different number of appointment days represented in this extract.</p></EvidenceChart></SortableItem>
        </SortableRegion>
      </Section>
      <Section id="daily-title" title="The daily pattern"><EvidenceChart id="daily-attendance" queryId="appointments" title="Daily appointment volume" rows={daily} sourceRows={rows} variant="card" height={280} spec={{type:"line",x:"appointment_date",y:"appointments",fields:["appointments","missed"],colors:{appointments:"var(--chart-2)",missed:"var(--chart-1)"},showLegend:true,stackable:false,valueDecimals:0,showXAxisLabel:false}} /></Section>
      <Section id="message-title" title="Look beyond the headline"><DataComponent id="message-comparison" queryId="appointments" title="Recorded SMS and booking lead time" kind="table" sourceRows={rows} displayRows={bands.flatMap(b=>aggregateRows(rows.filter(r=>r.lead_band===b),"message").map(r=>({lead_band:b,...r})))} variant="card"><p className="chart-note">Messaging was not randomized. Compare groups within booking windows before making claims about reminders.</p><DataTable searchable={false} label="SMS groups by booking lead time" rows={bands.flatMap(b=>aggregateRows(rows.filter(r=>r.lead_band===b),"message").map(r=>({lead_band:b,...r})))} columns={[{field:"lead_band",label:"Lead time"},{field:"message",label:"SMS record"},{field:"appointments",label:"Appointments",renderCell:fmt},{field:"missed",label:"Missed",renderCell:fmt},{field:"missedRate",label:"Missed rate",renderCell:pct}]} /></DataComponent></Section>
    </>}
    {tab === "planning" && <Section id="planning-title" title="What would fewer missed visits mean?" spacing="none"><DataComponent id="capacity-scenario" queryId="appointments" title="Capacity scenario" kind="custom" sourceRows={rows} displayRows={[{observed_missed:totals.missed,assumed_relative_reduction:reduction/100,assumed_slot_minutes:minutes,recovered_appointments:recovered,recovered_hours:recovered*minutes/60}]} variant="card"><div className="scenario-layout"><div><p className="scenario-label">Planning assumption</p><Slider label="Relative reduction in missed appointments" min={0} max={50} step={1} value={reduction} onChange={value=>setAssumptions({...assumptions,reduction:Number(value)})} formatValue={value=>`${value}%`} /><Slider label="Minutes per appointment" min={10} max={90} step={5} value={minutes} onChange={value=>setAssumptions({...assumptions,minutes:Number(value)})} formatValue={value=>`${value} min`} /><button className="project-button" onClick={()=>setAssumptions({...assumptions,reduction:10,minutes:30})}>Reset assumptions</button></div><div className="scenario-result" aria-live="polite"><small>Potentially recovered appointments</small><strong>{fmt(recovered)}</strong><p>{fmt(recovered*minutes/60)} appointment-hours at {minutes} minutes each</p><span>{fmt(totals.missed)} observed missed appointments × {reduction}% assumed reduction</span></div></div><p className="chart-note">This scenario estimates capacity under your assumptions. The dataset does not measure whether a reminder, scheduling change, or other intervention would achieve that reduction.</p></DataComponent><DataComponent id="plan-cohorts" queryId="appointments" title="Cohorts behind this scenario" kind="table" sourceRows={rows} displayRows={lead} variant="card"><DataTable searchable={false} label="Planning cohorts" rows={lead} columns={[{field:"lead_band",label:"Booking lead time"},{field:"appointments",label:"Appointments",renderCell:fmt},{field:"missed",label:"Missed",renderCell:fmt},{field:"missedRate",label:"Missed rate",renderCell:pct}]}/></DataComponent></Section>}
    {tab === "methods" && <>
      <Section id="quality-title" title="From source records to reproducible evidence" spacing="none"><DataComponent id="data-contract" queryId="quality" title="Validation ledger" kind="custom" displayRows={[summary]} sourceRows={[summary]} variant="card"><div className="validation-ledger"><div><strong>{fmt(summary.source_rows)}</strong><span>source records</span></div><b aria-hidden="true">→</b><div><strong>{summary.quarantined_rows}</strong><span>quarantined</span></div><b aria-hidden="true">→</b><div><strong>{fmt(summary.accepted_rows)}</strong><span>accepted appointments</span></div></div><p>One record has a negative age. Five have a booking date after the appointment date. All remaining appointment counts reconcile to the aggregate artifact.</p><button className="project-button" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}> {expanded?'Hide':'Inspect'} validation details</button>{expanded && <dl className="method-list"><dt>Duplicate appointment IDs</dt><dd>{summary.duplicate_appointment_ids}</dd><dt>Missing source values</dt><dd>{summary.missing_values}</dd><dt>Age above 110</dt><dd>{summary.age_above_110_rows}; flagged and retained. Age is not used in the analysis.</dd><dt>Repeated patients</dt><dd>Counts represent appointments. The source includes repeated patients.</dd></dl>}</DataComponent></Section>
      <div className="method-columns"><section><h2>How the pipeline works</h2><ol><li>Download the public archive and check its SHA-256 fingerprint.</li><li>Validate the schema, appointment keys, categories and dates.</li><li>Quarantine six invalid records, then aggregate with versioned SQL.</li><li>Export counts, quality checks and an executed notebook.</li><li>Recompute every displayed rate from the selected counts.</li></ol></section><section><h2>What the evidence supports</h2><p>Descriptive patterns in one historical Brazilian appointment extract. Booking delay, SMS records and missed visits are associated; these observations do not identify causal effects.</p><p>Appointment timestamps are calendar-date placeholders. Both dates are normalized before calculating lead time.</p><p>The public app contains aggregates. Identifiers are unnecessary for this analysis.</p></section></div>
      <div className="artifact-links"><a href="./analysis.html">Read the executed analysis ↗</a><a href="./project.zip" download>Download the complete project ↓</a><a href="https://www.kaggle.com/datasets/joniarroba/noshowappointments" target="_blank" rel="noreferrer">Kaggle source ↗</a></div>
      <p className="chart-note">Data: Joni Hoppen and Aquarela Analytics · CC BY-NC-SA 4.0. The derived data retains that license. Original application and analysis code: MIT.</p>
    </>}
  </article>;
}
