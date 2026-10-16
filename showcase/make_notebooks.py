"""Author readable, executable companions; execution is a separate build step."""
from pathlib import Path
import json
import nbformat as nbf

ROOT=Path(__file__).resolve().parent
md=nbf.v4.new_markdown_cell
code=nbf.v4.new_code_cell
setup="""from pathlib import Path
import json
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from IPython.display import display
from pipeline import run
plt.rcParams.update({'figure.figsize': (10, 4.6), 'figure.dpi': 130, 'axes.spines.top': False, 'axes.spines.right': False, 'axes.titleweight': 'bold', 'axes.titlesize': 14, 'font.size': 11, 'axes.grid': True, 'grid.alpha': .15})
artifact = run()
figures = Path('artifacts/figures')
figures.mkdir(exist_ok=True)
"""

def save(name,cells):
    book=nbf.v4.new_notebook(cells=cells, metadata={'kernelspec':{'display_name':'Python 3','language':'python','name':'python3'},'language_info':{'name':'python'}})
    nbf.validate(book)
    nbf.write(book,ROOT/name/'analysis.ipynb')

a=json.loads((ROOT/'appointment-operations/artifacts/analysis.json').read_text())
s=a['summary']; lead={r['lead_band']:r for r in a['lead']}
save('appointment-operations',[
md(f"""# Appointment Operations
## Summary
The verified extract contains **{s['source_rows']:,} appointments**. Six invalid records are quarantined, leaving **{s['accepted_rows']:,} appointments**, of which **{s['missed']:,} ({100*s['no_show_rate']:.2f}%)** were missed.

The missed rate is **{100*lead['Same day']['rate']:.2f}%** for same-day bookings and **{100*lead['31+ days']['rate']:.2f}%** for bookings at least 31 days ahead. This is an association in historical data, not evidence that changing the booking window causes attendance to improve.

**Purpose:** help an operations analyst investigate attendance patterns, check data quality, and evaluate explicit capacity assumptions. Dataset: [Medical Appointment No Shows](https://www.kaggle.com/datasets/joniarroba/noshowappointments), Joni Hoppen / Aquarela Analytics, CC BY-NC-SA 4.0."""),
md("""## Context and method
One row represents one appointment, including repeat patients. The appointment field has calendar dates rather than useful visit times; both timestamp fields are normalized before lead-time subtraction. Negative age and booking-after-visit rows are quarantined. Age values above 110 are flagged and retained because age is not used here.

No-show `Yes` means **missed**. Group rates are recalculated from counts. The public application receives aggregate counts, not source record identifiers.

### Assumptions
The source outcome labels and dates are taken as supplied after validation. The extract covers April 29–June 8, 2016, not three complete months. SMS timing and assignment rules are unavailable. Intervention effects cannot be estimated from these comparisons."""),
md("### 1. Download, validate, and aggregate"),code(setup),
md("### 2. Inspect the data contract"),code("display(pd.DataFrame([artifact['summary']]).T.rename(columns={0:'Value'}))\nrows = pd.DataFrame(artifact['rows'])\nassert rows.appointments.sum() == artifact['summary']['accepted_rows']\nassert rows.missed.sum() == artifact['summary']['missed']\nprint('Aggregate counts reconcile to all accepted records.')"),
md("## Results\n### Booking lead time and missed visits"),code("""lead = pd.DataFrame(artifact['lead'])
fig, ax = plt.subplots()
ax.bar(lead.lead_band, lead.rate*100, color='#922e43', width=.62)
ax.set(title='Missed appointment rate by booking lead time', ylabel='Missed appointments (%)', ylim=(0,40))
for i, r in lead.iterrows():
    ax.text(i, r.rate*100+1, f'{r.rate*100:.1f}%\\nn = {r.appointments:,}', ha='center', fontsize=10)
fig.tight_layout(); fig.savefig(figures/'lead-time.png'); plt.show()
display(lead[['lead_band','appointments','missed','rate']])"""),
md("Longer lead-time groups have higher missed rates in this extract. The chart includes each denominator, so small and large groups are distinguishable. Patient characteristics and appointment types could confound this association."),
md("### Daily volume"),code("""daily = rows.groupby('appointment_date')[['appointments','missed']].sum()
daily.index = pd.to_datetime(daily.index)
fig, ax = plt.subplots()
ax.plot(daily.index, daily.appointments, color='#277367', label='All appointments')
ax.plot(daily.index, daily.missed, color='#922e43', label='Missed')
ax.set(title='Appointment volume on dates represented in the extract', ylabel='Appointments')
ax.legend(frameon=False); fig.autofmt_xdate(); fig.tight_layout()
fig.savefig(figures/'daily-volume.png'); plt.show()"""),
md("Dates without records are gaps in source coverage, not imputed zero-volume days. April and June are partial months; raw monthly totals should not be interpreted as a trend in demand."),
md("### SMS comparisons within booking windows"),code("""sms = rows.groupby(['lead_band','sms_received'])[['appointments','missed']].sum().reset_index()
sms['missed_rate'] = sms.missed / sms.appointments
sms['message'] = sms.sms_received.map({0:'No recorded SMS',1:'Recorded SMS'})
display(sms[['lead_band','message','appointments','missed','missed_rate']])
fig, ax = plt.subplots()
order = ['Same day','1–7 days','8–30 days','31+ days']
for value, color, shift in [(0,'#7b8984',-.17),(1,'#922e43',.17)]:
    group = sms[sms.sms_received==value].set_index('lead_band').reindex(order)
    ax.bar(np.arange(4)+shift, group.missed_rate*100, width=.32, color=color, label='Recorded SMS' if value else 'No recorded SMS')
ax.set(xticks=np.arange(4), xticklabels=order, ylabel='Missed appointments (%)', title='SMS record groups within booking windows', ylim=(0,45))
ax.legend(frameon=False); fig.tight_layout(); fig.savefig(figures/'sms-context.png'); plt.show()"""),
md("The absence of a same-day SMS bar means no matching observations, not a 0% missed rate. The within-window comparison differs from the unadjusted headline. Neither identifies SMS effectiveness."),
md("## Planning example"),code("""relative_reduction = .10
slot_minutes = 30
missed = artifact['summary']['missed']
scenario = {'Observed missed appointments':missed, 'Assumed relative reduction':relative_reduction, 'Potential recovered appointments':missed*relative_reduction, 'Potential appointment-hours':missed*relative_reduction*slot_minutes/60}
display(pd.Series(scenario))"""),
md("This is a capacity calculation under explicit assumptions, not a forecast of achieved savings. It does not establish staff availability, visit duration, costs, or the effectiveness of any intervention.\n\n## Takeaways\nUse this tool to identify questions for operations review, reproduce counts, and compare scenarios. A next study would prospectively test a specific outreach or scheduling intervention with an appropriate randomized or carefully designed comparison. The source data and derived aggregates retain CC BY-NC-SA 4.0; original project code is MIT licensed.")
])

e=json.loads((ROOT/'engine-prognostics/artifacts/analysis.json').read_text())
lines=[]
for r in e['results']:
 m=r['metrics']; lines.append(f"- **{r['dataset']}: {m['mae']:.2f} cycles MAE**, compared with {m['baseline']['mae']:.2f} for the age-only baseline. Selected model: {r['winner']}.")
save('engine-prognostics',[
md("# Engine Prognostics\n## Summary\n"+'\n'.join(lines)+"\n\nEach result uses 100 official test engines from the **NASA C-MAPSS simulated degradation benchmark**. These are benchmark results, not measurements from operational aircraft. Interval coverage is high but intervals are wide; model error and uncertainty are both exposed in the app.\n\nData: [Kaggle distribution](https://www.kaggle.com/datasets/behrad3d/nasa-cmaps), CC0 as listed by B²; [NASA provenance](https://data.nasa.gov/dataset/cmapss-jet-engine-simulated-data)."),
md("""## Context and methods
**Question:** How accurately can current and past sensor observations estimate remaining operating cycles?

FD001 has compressor degradation; FD003 has compressor and fan degradation. Both have one operating condition. Each is modeled independently.

For each dataset, 60 whole training engines fit candidate Ridge and gradient-boosting models. Twenty validation engines, with one seeded random truncation each, select the lower-RMSE candidate. The winner is refitted on those 80 engines. Twenty separate calibration engines supply one truncation each for a nominal 90% split-conformal residual interval. Official test engines are evaluated at their last supplied observation.

Features: cycle count, 14 sensor readings, trailing ten-cycle means and trailing deltas (43 total). Feature calculations never use later cycles. Targets and predictions are capped at 125 cycles; all reported test errors use **uncapped** official truth. The age-only baseline uses median training-engine lifetime minus elapsed cycles, clipped at zero.

### Key assumptions and limitations
Calibration censoring is random, while official test censoring follows the benchmark generation process. Exchangeability is not assured. Early-life RUL may be unidentified from sensor readings, and the 125-cycle cap contributes to underestimation for long-lived engines. The small calibration set produces wide intervals. The two fault scenarios do not test changing operating conditions or transfer to physical engines.

Model candidates and their parameters are fixed in `pipeline.py`. The conformal implementation uses the exact finite-sample order statistic; a unit test guards its rank calculation."""),
md("### 1. Reproduce the full experiment"),code(setup),
md("### 2. Inspect partitioning and model selection"),code("""for result in artifact['results']:
    parts = result['split']
    assert not (set(parts['fit']) & set(parts['validation']) or set(parts['fit']) & set(parts['calibration']) or set(parts['validation']) & set(parts['calibration']))
    print(result['dataset'], {k:len(v) for k,v in parts.items()}, 'winner:', result['winner'])
    display(pd.DataFrame(result['validation_scores']))"""),
md("## Results\n### Baseline comparison on official test engines"),code("""scores = []
for result in artifact['results']:
    m = result['metrics']
    scores.extend([{'dataset':result['dataset'],'method':'Model','MAE':m['mae'],'RMSE':m['rmse']}, {'dataset':result['dataset'],'method':'Age only','MAE':m['baseline']['mae'],'RMSE':m['baseline']['rmse']}])
scores = pd.DataFrame(scores)
fig, ax = plt.subplots()
for i, method in enumerate(['Model','Age only']):
    selected = scores[scores.method==method]
    ax.bar(np.arange(2)+(i-.5)*.32, selected.MAE, width=.3, color=['#277367','#a87532'][i], label=method)
ax.set(xticks=[0,1],xticklabels=['FD001','FD003'],ylabel='Mean absolute error (cycles)',title='Held-out error versus an age-only baseline',ylim=(0,45))
ax.legend(frameon=False); fig.tight_layout(); fig.savefig(figures/'baseline.png'); plt.show()
display(scores)"""),
md("### Where the model misses"),code("""fig, axes = plt.subplots(1,2,figsize=(11,4.6),sharex=True,sharey=True)
for ax,result in zip(axes,artifact['results']):
    frame = pd.DataFrame(result['engines'])
    ax.scatter(frame.actual,frame.predicted,s=24,alpha=.65,color='#277367')
    ax.plot([0,160],[0,160],ls='--',color='#687478',lw=1,label='Perfect prediction')
    ax.set(title=result['dataset'],xlabel='Actual remaining cycles',ylabel='Predicted remaining cycles',xlim=(0,160),ylim=(0,160))
fig.suptitle('Official test predictions: the 125-cycle ceiling is visible',fontsize=13,y=1.02)
fig.tight_layout(); fig.savefig(figures/'prediction-errors.png',bbox_inches='tight'); plt.show()"""),
md("The ceiling is a deliberate modeling choice, not a plotting limit. A score alone hides the underestimation of engines with actual RUL above that ceiling."),
md("### Uncertainty is not the same as precision"),code("""interval_rows=[]
for result in artifact['results']:
    m=result['metrics']; f=pd.DataFrame(result['engines'])
    interval_rows.append({'Dataset':result['dataset'],'Nominal coverage':.90,'Test coverage':m['coverage'],'Mean interval width (cycles)':float((f.upper-f.lower).mean()),'MAE 95% bootstrap lower':m['mae_ci95'][0],'MAE 95% bootstrap upper':m['mae_ci95'][1]})
display(pd.DataFrame(interval_rows))
result=artifact['results'][0]; frame=pd.DataFrame(result['engines']).sort_values('actual').reset_index(drop=True)
fig,ax=plt.subplots()
ax.fill_between(frame.index,frame.lower,frame.upper,alpha=.2,color='#277367',label='Nominal 90% calibrated interval')
ax.plot(frame.index,frame.predicted,color='#277367',lw=1,label='Prediction')
ax.scatter(frame.index,frame.actual,color='#a87532',s=14,label='Actual')
ax.set(title='FD001: wide intervals cover outcomes but limit precision',xlabel='Test engines ordered by actual remaining life',ylabel='Cycles remaining')
ax.legend(frameon=False,fontsize=9); fig.tight_layout(); fig.savefig(figures/'uncertainty.png'); plt.show()"""),
md("MAE intervals bootstrap the 100 independent test-engine errors 2,000 times. They describe uncertainty in average error, whereas the calibrated prediction intervals concern an individual engine. Those are different quantities."),
md("### Replay a long observed trajectory"),code("""result=artifact['results'][0]
engine=max(result['engines'],key=lambda r:r['last_cycle'])['engine']
history=pd.DataFrame(result['history']); history=history[history.engine==engine]
fig,ax=plt.subplots()
ax.plot(history.cycle,history.predicted,label='Model estimate',color='#277367')
ax.plot(history.cycle,history.actual,label='Historical truth',color='#a87532',ls='--')
ax.set(title=f'FD001 engine {engine}: predictions from past and current readings',xlabel='Observed cycle',ylabel='Cycles remaining')
ax.legend(frameon=False); fig.tight_layout(); fig.savefig(figures/'replay.png'); plt.show()"""),
md("The default example is chosen for the longest observed trajectory, not as a representative error estimate. Every official test engine is available in the interactive app. Display traces are sampled every five cycles plus endpoints; model fitting and scoring use the full records.\n\n## Takeaways\nThe sensor models outperform a transparent age-only baseline in both scenarios. Their limitations are substantial: early-life ambiguity, capped forecasts, broad intervals, and simulated rather than operational data. A further research iteration should add FD002/FD004 operating-condition variation, evaluate more engine-level folds, and assess calibration under matched censoring before considering any real-world use.")
])
