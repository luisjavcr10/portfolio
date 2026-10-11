import type { Dictionary } from "@/i18n/dictionaries/es";
import type { Solution } from "@/data/solutions";
import { ContactTrigger } from "@/components/contact/ContactPanel";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { DeviceMockup } from "@/components/ui/DeviceMockup";
import styles from "./Solutions.module.css";

type SolutionSlideProps = {
  solution: Solution;
  copy: Dictionary["solutions"]["items"][Solution["id"]];
  index: number;
  t: Dictionary["solutions"];
};

export function SolutionSlide({ solution, copy, index, t }: SolutionSlideProps) {
  return (
    <>
      <div className={styles.glow} aria-hidden />

      <div className={styles.head}>
        <div className={styles.meta}>
          <span className={styles.diamond} aria-hidden />
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>
            {copy.industry} · {solution.company}
          </span>
        </div>
        <h3 className={styles.slideTitle}>{copy.title}</h3>
      </div>

      <div className={styles.actions}>
        {solution.demoUrl ? (
          <ButtonLink href={solution.demoUrl} size="sm" external>
            {t.demo}
          </ButtonLink>
        ) : (
          <span className={styles.soon}>{t.comingSoon}</span>
        )}
        <ContactTrigger className={buttonClass("secondary", "sm")} business={solution.inquiry} stopPropagation>
          {t.want}
        </ContactTrigger>
      </div>

      <div className={styles.mockup}>
        <DeviceMockup
          label={solution.company}
          laptopLabel={t.mockup.laptop}
          phoneLabel={t.mockup.phone}
          laptopSrc={solution.screens?.laptop}
          phoneSrc={solution.screens?.phone}
        />
      </div>

      <div className={styles.side}>
        <ul className={`${styles.card} ${styles.benefits}`}>
          {copy.benefits.map((benefit) => (
            <li key={benefit.title} className={styles.benefit}>
              <span className={styles.benefitIcon} aria-hidden>
                <span />
              </span>
              <div>
                <div className={styles.benefitTitle}>{benefit.title}</div>
                <div className={styles.benefitText}>{benefit.text}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className={`${styles.card} ${styles.metricsCard}`}>
          <div className={styles.metrics}>
            {copy.metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
          <p className={styles.sampleNote}>{t.sampleFigures}</p>
        </div>

        <div className={`${styles.card} ${styles.parts}`}>
          <span className={styles.partsLabel}>{t.includesLabel}</span>
          <ul className={styles.partsList}>
            {copy.parts.map((part) => (
              <li key={part}>{part}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
