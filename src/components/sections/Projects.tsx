import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { projects } from "@/data/projects";
import { ChipList } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./Projects.module.css";

export function Projects({ t }: { t: Dictionary["projects"] }) {
  return (
    <section id="proyectos" className="section">
      <div className={`container ${styles.wrapper}`} data-reveal>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <div className={styles.grid}>
          {projects.map((project) => (
            <article key={project.id} className={`${styles.card} ${styles[project.size]}`}>
              <div className={styles.media}>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes={project.size === "wide" ? "(max-width: 819px) 100vw, 780px" : "(max-width: 819px) 100vw, 390px"}
                  className={styles.image}
                />
              </div>
              <div className={styles.body}>
                <div className={styles.titleRow}>
                  <h3 className={styles.name}>{project.name}</h3>
                  <span className={styles.role}>{project.role}</span>
                </div>
                <p className={styles.description}>{t.items[project.id]}</p>
                <div className={styles.footer}>
                  <ChipList items={project.stack} />
                  {project.link && (
                    <a href={project.link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {t.links[project.link.kind]} <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
