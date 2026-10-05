import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

export function Eyebrow({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return <div className={`${styles.eyebrow} ${muted ? styles.muted : ""}`}>{children}</div>;
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, lead, id }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}
