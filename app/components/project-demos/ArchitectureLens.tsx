import type { ProjectArchitecture } from "./storyboards";
import styles from "./ProjectMicroDemo.module.css";

const nodeKindLabels = {
  input: "Input",
  process: "Processing",
  output: "Output",
  boundary: "Boundary",
} as const;

export function ArchitectureLens({
  architecture,
}: {
  architecture: ProjectArchitecture;
}) {
  const nodeNames = new Map(
    architecture.nodes.map((node) => [node.id, node.label]),
  );

  return (
    <article className={styles.architectureLens}>
      <header className={styles.architectureHeader}>
        <div>
          <p className={styles.miniEyebrow}>Architecture lens</p>
          <h5>Verified workflow and system boundary</h5>
        </div>
        <span>Semantic system map</span>
      </header>
      <p className={styles.architectureSummary}>{architecture.summary}</p>

      <ol className={styles.architectureFlow} aria-label="Project data flow">
        {architecture.nodes.map((node, index) => {
          const nextNode = architecture.nodes[index + 1];
          const edge = nextNode
            ? architecture.edges.find(
                (candidate) =>
                  candidate.from === node.id && candidate.to === nextNode.id,
              )
            : undefined;

          return (
            <li data-kind={node.kind} key={node.id}>
              <article className={styles.architectureNode}>
                <header>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{nodeKindLabels[node.kind]}</p>
                </header>
                <h6>{node.label}</h6>
                <p>{node.description}</p>
                {node.technologies.length > 0 ? (
                  <ul aria-label={`${node.label} technologies`}>
                    {node.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
              {edge ? (
                <div className={styles.architectureConnector} aria-hidden="true">
                  <i />
                  <span>{edge.label}</span>
                  <b>→</b>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      <section className={styles.edgeLedger} aria-labelledby="edge-ledger-title">
        <h6 id="edge-ledger-title">Data-flow relationships</h6>
        <ul>
          {architecture.edges.map((edge) => (
            <li key={`${edge.from}-${edge.to}`}>
              <strong>{nodeNames.get(edge.from) ?? edge.from}</strong>
              <span>{edge.label}</span>
              <strong>{nodeNames.get(edge.to) ?? edge.to}</strong>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
