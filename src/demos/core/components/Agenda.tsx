import type { CSSProperties, ReactNode } from "react";
import { formatTime } from "../dates";
import type { CategoryTone } from "../types";
import styles from "./Agenda.module.css";

export type AgendaColumn = { id: string; name: string; role: string };

export type AgendaBlock = {
  id: string;
  columnId: string;
  start: number;
  duration: number;
  title: string;
  subtitle: string;
  tone: CategoryTone;
  highlight?: boolean;
  /** Already attended: shown faded. */
  done?: boolean;
};

type AgendaProps = {
  title: string;
  /** Extra controls in the header (e.g. day navigation). */
  actions?: ReactNode;
  legend: { label: string; tone: CategoryTone }[];
  columns: AgendaColumn[];
  blocks: AgendaBlock[];
  /** Opening and closing minutes; null renders the closed state. */
  hours: { open: number; close: number } | null;
  closedText: string;
  hourHeight?: number;
  /** Shortest block drawn, so short appointments stay readable. */
  minBlockMinutes?: number;
};

/** Day agenda: one column per staff member, blocks positioned by time. */
export function Agenda({
  title,
  actions,
  legend,
  columns,
  blocks,
  hours,
  closedText,
  hourHeight = 64,
  minBlockMinutes = 45,
}: AgendaProps) {
  const style = { "--hour": `${hourHeight}px`, "--cols": columns.length } as CSSProperties;

  return (
    <section className={styles.agenda} aria-label={title}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {actions}
        <ul className={styles.legend} aria-label="Leyenda">
          {legend.map((item) => (
            <li key={item.label}>
              <span className={`${styles.swatch} ${styles[item.tone]}`} aria-hidden />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {hours ? (
        <div className={styles.scroller} tabIndex={0} aria-label={`${title}, desplazable`}>
          <div className={styles.grid} style={style}>
            <div />
            {columns.map((column) => (
              <div key={column.id} className={styles.columnHead}>
                <strong>{column.name}</strong>
                <span>{column.role}</span>
              </div>
            ))}

            <div className={styles.hours} style={{ height: ((hours.close - hours.open) / 60) * hourHeight }}>
              {Array.from({ length: Math.ceil((hours.close - hours.open) / 60) }, (_, i) => (
                <span key={i} style={{ top: i * hourHeight + 2 }}>
                  {formatTime(hours.open + i * 60)}
                </span>
              ))}
            </div>

            {columns.map((column) => (
              <ol
                key={column.id}
                className={styles.column}
                style={{ height: ((hours.close - hours.open) / 60) * hourHeight }}
                aria-label={column.name}
              >
                {blocks
                  .filter((block) => block.columnId === column.id)
                  .map((block) => (
                    <li
                      key={block.id}
                      data-appointment-id={block.id}
                      className={`${styles.block} ${styles[block.tone]} ${block.highlight ? styles.highlight : ""} ${block.done ? styles.done : ""}`}
                      style={{
                        top: ((block.start - hours.open) / 60) * hourHeight + 2,
                        height: (Math.max(block.duration, minBlockMinutes) / 60) * hourHeight - 4,
                      }}
                    >
                      <strong>{block.title}</strong>
                      <span>{block.subtitle}</span>
                    </li>
                  ))}
              </ol>
            ))}
          </div>
        </div>
      ) : (
        <p className={styles.closed}>{closedText}</p>
      )}
    </section>
  );
}
