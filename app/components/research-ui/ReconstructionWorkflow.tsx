import type { ReconstructionStage } from "@/app/content/research";
import styles from "./ResearchComponents.module.css";

type ReconstructionWorkflowProps = {
  stages: readonly ReconstructionStage[];
  headingId?: string;
};

export function ReconstructionWorkflow({
  stages,
  headingId = "reconstruction-workflow-heading",
}: ReconstructionWorkflowProps) {
  return (
    <section aria-labelledby={headingId} className={styles.workflowSection}>
      <header className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>Documented process</p>
        <h2 id={headingId}>Explore the reconstruction workflow</h2>
        <p>
          The stages below restate the collaborative process documented in the original
          poster. Every stage remains visible without motion or JavaScript.
        </p>
      </header>

      <ol className={styles.workflowList}>
        {stages.map((stage, index) => (
          <li className={styles.workflowStage} key={stage.id}>
            <span aria-hidden="true" className={styles.workflowIndex}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <div className={styles.workflowTitleRow}>
                <h3>{stage.title}</h3>
                {stage.tool ? <span className={styles.toolLabel}>{stage.tool}</span> : null}
              </div>
              <p>{stage.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
