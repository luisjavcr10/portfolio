import type { Dictionary } from "@/i18n/dictionaries/es";
import { stack } from "@/data/stack";
import { ChipList } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Stack.module.css";

export function Stack({ t }: { t: Dictionary["stack"] }) {
  return (
    <section id="stack" className="section">
      <div className={`container ${styles.wrapper}`} data-reveal>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <div className={styles.grid}>
          {stack.map((group, i) => (
            <div key={group.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.groupName}>{t.groups[group.id]}</h3>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <ChipList items={group.items} variant="filled" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
