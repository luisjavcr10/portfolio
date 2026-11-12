"use client";

import { useState } from "react";
import type { CvDictionary } from "@/i18n/dictionaries/cv/es";
import { jobCount, layers, timeline, type Tech } from "@/data/cv";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Career.module.css";

/**
 * The stack, grouped by layer, filters the timeline next to it: picking a technology dims the roles
 * that did not use it. The timeline is drawn as two parallel lanes, like a branch graph.
 */
export function Career({ t }: { t: CvDictionary["career"] }) {
  const [filter, setFilter] = useState<Tech | null>(null);

  const matches = timeline.filter((entry) => entry.kind === "job" && filter && entry.techs.includes(filter)).length;
  const status = filter
    ? t.result.replace("{tech}", filter).replace("{count}", String(matches)).replace("{total}", String(jobCount))
    : t.hint;

  return (
    <section id="trayectoria" className="section">
      <div className={`container ${styles.wrapper}`}>
        <div data-reveal>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        </div>

        <div className={styles.grid}>
          <div className={styles.layers}>
            {layers.map((layer) => (
              <div key={layer.id} className={styles.layer}>
                <div className={styles.layerLabel}>
                  <span className={styles.diamond} aria-hidden />
                  {t.layers[layer.id]}
                </div>
                <div className={styles.chips}>
                  {layer.techs.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={styles.chip}
                      aria-pressed={filter === tech}
                      onClick={() => setFilter(filter === tech ? null : tech)}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className={styles.status}>
              <span aria-live="polite">{status}</span>
              {filter && (
                <button type="button" className={styles.clear} onClick={() => setFilter(null)}>
                  {t.clear}
                </button>
              )}
            </div>
          </div>

          <ol className={styles.timeline}>
            {timeline.map((entry, index) => {
              const copy = t.entries[entry.id];
              const dimmed = filter !== null && entry.kind === "job" && !entry.techs.includes(filter);
              return (
                <li
                  key={entry.id}
                  className={styles.entry}
                  data-lane={entry.lane}
                  data-kind={entry.kind}
                  data-current={entry.current || undefined}
                  data-dimmed={dimmed || undefined}
                  data-first={index === 0 || undefined}
                  data-last={index === timeline.length - 1 || undefined}
                  data-branch={entry.id === "damaris" || undefined}
                  data-side-start={entry.id === "own" || undefined}
                >
                  <div className={styles.graph} aria-hidden>
                    <span className={styles.mainLine} />
                    <span className={styles.sideLine} />
                    <span className={styles.branch} />
                    <span className={styles.node} />
                  </div>
                  <div className={styles.body}>
                    <div className={styles.meta}>
                      <span className={styles.lane}>{copy.lane}</span>
                      <span>{copy.period}</span>
                    </div>
                    <div className={styles.heading}>
                      <h3 className={styles.role}>{copy.role}</h3>
                      <span className={styles.company}>{copy.company}</span>
                    </div>
                    {copy.summary && <p className={styles.summary}>{copy.summary}</p>}
                    {entry.techs.length > 0 && (
                      <ul className={styles.tags}>
                        {entry.techs.map((tech) => (
                          <li key={tech} className={styles.tag} data-active={filter === tech || undefined}>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
