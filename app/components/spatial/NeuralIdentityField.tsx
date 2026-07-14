"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { SceneCanvas } from "./SceneCanvas";
import styles from "./NeuralIdentityField.module.css";
import {
  createNeuralScene,
  neuralDomains,
  type NeuralDomainId,
} from "./neuralScene";

export type NeuralIdentityFieldProps = {
  className?: string;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function NeuralFieldFallback() {
  return (
    <div className={styles.fallback}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1000 700">
        <ellipse className={styles.fallbackOrbit} cx="520" cy="330" rx="330" ry="190" />
        <ellipse
          className={styles.fallbackOrbit}
          cx="520"
          cy="330"
          rx="245"
          ry="300"
          transform="rotate(48 520 330)"
        />
        <g className={styles.fallbackLinks}>
          <path d="M220 240 L500 105 L795 230 L820 445 L570 585 L210 475 Z" />
          <path d="M220 240 L820 445 M210 475 L500 105 M500 105 L570 585" />
        </g>
        {([
          [220, 240, "#74c7f5"],
          [795, 230, "#f6c878"],
          [820, 445, "#75e4d3"],
          [210, 475, "#a58afa"],
          [570, 585, "#74c7f5"],
          [500, 105, "#f6c878"],
        ] as const).map(([cx, cy, color]) => (
          <g key={`${cx}-${cy}`} style={{ color }}>
            <circle className={styles.fallbackNode} cx={cx} cy={cy} r="20" />
            <circle cx={cx} cy={cy} fill="currentColor" r="5" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Full-bleed decorative scene plus a semantic, keyboard-operable domain lens. */
export function NeuralIdentityField({ className }: NeuralIdentityFieldProps) {
  const [activeDomain, setActiveDomain] = useState<NeuralDomainId>("neuroscience");
  const activeDefinition = neuralDomains.find((domain) => domain.id === activeDomain)!;
  const sceneConfig = useMemo(() => ({ activeDomain }), [activeDomain]);
  const statusStyle = {
    "--active-domain-color": activeDefinition.color,
  } as CSSProperties;

  return (
    <div className={joinClassNames(styles.field, className)}>
      <SceneCanvas
        className={styles.scene}
        config={sceneConfig}
        createScene={createNeuralScene}
        fallback={<NeuralFieldFallback />}
      />

      <div className={styles.controls}>
        <p className={styles.controlLabel}>Signal focus / connected disciplines</p>
        <p className={styles.visuallyHidden} id="neural-domain-description">
          Choose a discipline to highlight its connection within the multidisciplinary field.
        </p>
        <div
          aria-describedby="neural-domain-description"
          aria-label="Highlight a professional discipline"
          className={styles.domainControls}
          role="group"
        >
          {neuralDomains.map((domain) => (
            <button
              aria-pressed={domain.id === activeDomain}
              className={styles.domainButton}
              key={domain.id}
              onClick={() => setActiveDomain(domain.id)}
              onFocus={() => setActiveDomain(domain.id)}
              style={{ "--domain-color": domain.color } as CSSProperties}
              type="button"
            >
              {domain.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className={styles.status} role="status" style={statusStyle}>
          <span>
            <strong>{activeDefinition.label}:</strong> {activeDefinition.description}
          </span>
        </p>
      </div>
    </div>
  );
}
