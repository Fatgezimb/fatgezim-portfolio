"use client";
import { useId, useState } from "react";
import { neuralUnits } from "@/app/content/technical-preview";
import { NeuralChart } from "./NeuralChart";
import { SafeLink } from "../SafeLink";
import styles from "./NeuroStackPreview.module.css";

export default function NeuroStackPreview() {
  const id = useId();
  const [unit, setUnit] = useState("t1c1");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const [rate, setRate] = useState(false);
  const selected =
    neuralUnits.find((item) => item.id === unit) ?? neuralUnits[0];
  const count = selected.spikes.filter(
    (time) => time >= start && time < end,
  ).length;
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <span className={styles.mark}>NS</span>
        <div>
          <strong>NeuroStack Explorer</strong>
          <span>Exploratory project · Public neural recording</span>
        </div>
        <span className={styles.sourceTag}>Public NWB derivative</span>
      </header>
      <div className={styles.explainer}>
        <h3>When did each neuron fire?</h3>
        <p>
          This sample shows 20 seconds from an existing public rat recording.
          Each row is a recorded neuron, and each tick is a firing event. Choose
          a row and a time window; the rate view counts those events per second.
        </p>
        <p>
          <strong>Try it:</strong> Select t3c1 and compare the first few seconds
          with the end of the recording. The chart and totals update together.
        </p>
      </div>
      <div className={styles.layout}>
        <aside className={styles.controls} aria-label="Neural data controls">
          <p className={styles.label}>Controls</p>
          <label htmlFor={`${id}-unit`}>Target unit</label>
          <select
            id={`${id}-unit`}
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {neuralUnits.map((item) => (
              <option key={item.id}>{item.id}</option>
            ))}
          </select>
          <label htmlFor={`${id}-view`}>Chart</label>
          <select
            id={`${id}-view`}
            value={rate ? "rate" : "raster"}
            onChange={(e) => setRate(e.target.value === "rate")}
          >
            <option value="raster">Spike raster</option>
            <option value="rate">Firing rate</option>
          </select>
          <div className={styles.interval}>
            <p>Selected interval</p>
            <label htmlFor={`${id}-start`}>
              Start <output>{start}.0 s</output>
            </label>
            <input
              id={`${id}-start`}
              type="range"
              min="0"
              max={end - 1}
              step="1"
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
            />
            <label htmlFor={`${id}-end`}>
              End <output>{end}.0 s</output>
            </label>
            <input
              id={`${id}-end`}
              type="range"
              min={start + 1}
              max="20"
              step="1"
              value={end}
              onChange={(e) => setEnd(Number(e.target.value))}
            />
          </div>
          <button
            className={styles.reset}
            onClick={() => {
              setUnit("t1c1");
              setStart(0);
              setEnd(20);
              setRate(false);
            }}
          >
            Reset view
          </button>
        </aside>
        <div className={styles.content}>
          <div className={styles.chartHeading}>
            <h3>{rate ? "Firing rate" : "Spike raster"}</h3>
            <span>
              {start}–{end} s
            </span>
          </div>
          <p className={styles.hint}>
            {rate
              ? "One-second bins for the selected unit."
              : "Each mark is a recorded spike. The selected row is highlighted."}
          </p>
          <NeuralChart unit={unit} start={start} end={end} rate={rate} />
          <p className={styles.summary} role="status">
            <strong>{unit}</strong>
            <span>{count} spikes</span>
            <span>{(count / (end - start)).toFixed(2)} Hz mean</span>
          </p>
          <details className={styles.table}>
            <summary>Inspect the values</summary>
            {rate && (
              <div>
                <table>
                  <caption>{unit} · one-second firing-rate bins</caption>
                  <thead>
                    <tr>
                      <th>Interval (seconds)</th>
                      <th>Rate (Hz)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.rates.slice(start, end).map((value, i) => (
                      <tr key={i}>
                        <th scope="row">
                          {start + i}–{start + i + 1}
                        </th>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div>
              <table>
                <caption>
                  Selected interval · spike counts and mean rates
                </caption>
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th>Spikes</th>
                    <th>Mean rate (Hz)</th>
                  </tr>
                </thead>
                <tbody>
                  {neuralUnits.map((row) => {
                    const spikes = row.spikes.filter(
                      (t) => t >= start && t < end,
                    ).length;
                    return (
                      <tr key={row.id}>
                        <th scope="row">
                          {row.id}
                          {row.id === unit ? " (selected)" : ""}
                        </th>
                        <td>{spikes}</td>
                        <td>{(spikes / (end - start)).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </details>
          <p className={styles.provenance}>
            First 20 seconds of a public-derived recording. DANDI 000582 ·
            Sargolini et al. · CC BY 4.0.{" "}
            <SafeLink
              href="https://fatgezimb.github.io/neurostack-explorer/sources/"
              newTab
            >
              Data & methods ↗
            </SafeLink>
          </p>
        </div>
      </div>
    </div>
  );
}
