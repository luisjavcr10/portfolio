import styles from "./Kpi.module.css";

type KpiProps = {
  label: string;
  value: string;
  note: string;
  /** Color of the note: positive trend, attention or neutral. */
  tone?: "positive" | "attention" | "neutral";
};

export function Kpi({ label, value, note, tone = "neutral" }: KpiProps) {
  return (
    <div className={styles.kpi}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      <span className={`${styles.note} ${styles[tone]}`}>{note}</span>
    </div>
  );
}

export function KpiGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}
