import styles from "./Kpi.module.css";

type KpiProps = {
  label: string;
  value: string;
  note: string;
  /** Color of the note: positive trend, attention or neutral. */
  tone?: "positive" | "attention" | "neutral";
  /** 0–100: shows a progress bar under the value. */
  meter?: number;
  /** Makes the whole card a button (e.g. "see reminders"). */
  onClick?: () => void;
};

export function Kpi({ label, value, note, tone = "neutral", meter, onClick }: KpiProps) {
  const content = (
    <>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {meter !== undefined && (
        <span className={styles.meter} aria-hidden>
          <span style={{ width: `${Math.max(0, Math.min(100, meter))}%` }} />
        </span>
      )}
      {note && <span className={`${styles.note} ${styles[tone]}`}>{note}</span>}
    </>
  );

  return onClick ? (
    <button type="button" className={`${styles.kpi} ${styles.action}`} onClick={onClick}>
      {content}
    </button>
  ) : (
    <div className={styles.kpi}>{content}</div>
  );
}

export function KpiGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}
