import styles from "./ResearchComponents.module.css";

type EvidenceStatusProps = {
  children: string;
  pending?: boolean;
};

export function EvidenceStatus({ children, pending = false }: EvidenceStatusProps) {
  return (
    <span className={styles.evidenceStatus} data-pending={pending ? "true" : "false"}>
      <span aria-hidden="true" className={styles.evidenceDot} />
      {children}
    </span>
  );
}
