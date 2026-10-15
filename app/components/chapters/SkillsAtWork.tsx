"use client";
import { useState } from "react";
import { skillGroups } from "@/app/content/resume";
import styles from "./Chapters.module.css";
const examples: Record<
  string,
  {
    short: string;
    title: string;
    body: string;
    href: string;
    link: string;
    path: string[];
  }
> = {
  "software-product": {
    short: "Software",
    title: "An interface is a chain of decisions.",
    body: "StepSpark connects a visual prompt, answer reveal, confidence rating and source review in one learning flow.",
    href: "#project-stepspark",
    link: "Inspect StepSpark",
    path: ["Prompt", "Recall", "Reveal", "Review"],
  },
  "data-engineering": {
    short: "Data",
    title: "Keep the evidence within reach.",
    body: "Behavior Data Lab connects an appointment export to operational summaries, filters and the records behind each result.",
    href: "#project-bela-behavior-data-lab",
    link: "Inspect Behavior Data Lab",
    path: ["Import", "Filter", "Compare", "Inspect"],
  },
  leadership: {
    short: "Leadership",
    title: "Direction matters. So does delivery.",
    body: "At Create 13 Group and NeuroPath LLC, I connect product requirements with architecture, implementation and release decisions.",
    href: "#founder",
    link: "See the organizations",
    path: ["Understand", "Scope", "Build", "Refine"],
  },
  "research-methods": {
    short: "Research",
    title: "A structure you can examine.",
    body: "The George Mason University research poster documents the progression from fluorescent neuronal imagery to a vectorized tree.",
    href: "#research",
    link: "Inspect the original figures",
    path: ["Process", "Stitch", "Trace", "Reconstruct"],
  },
  "behavioral-science": {
    short: "Behavioral science",
    title: "Build around how people learn.",
    body: "Caregiver Academy brings my behavioral-science background into a learning product co-built with Meili Bela.",
    href: "#project-caregiver-academy",
    link: "Try a caregiver lesson",
    path: ["Observe", "Learn", "Practice", "Reflect"],
  },
};
export function SkillsAtWork() {
  const [selected, setSelected] = useState(skillGroups[0].id);
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.minorHeading}>
        <h2>Different tools. Connected thinking.</h2>
        <p>Choose a discipline to see it at work.</p>
      </div>
      <div
        className={styles.skillSelector}
        role="group"
        aria-label="Explore skills by discipline"
      >
        {skillGroups.map((g) => (
          <button
            type="button"
            key={g.id}
            aria-pressed={selected === g.id}
            onClick={() => setSelected(g.id)}
          >
            {examples[g.id].short}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      {skillGroups.map((g) => {
        const e = examples[g.id];
        return (
          <div
            className={styles.skillPanel}
            hidden={selected !== g.id}
            key={g.id}
          >
            <div>
              <p className={styles.kicker}>{g.title}</p>
              <h3>{e.title}</h3>
              <p>{e.body}</p>
              <a href={e.href}>
                {e.link} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className={styles.toolTray}>
              <ol aria-label="Related workflow" className={styles.toolPath}>
                {e.path.map((p, i) => (
                  <li key={p}>
                    <span>{p}</span>
                    {i < e.path.length - 1 && <b aria-hidden="true">→</b>}
                  </li>
                ))}
              </ol>
              <ul>
                {g.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </section>
  );
}
