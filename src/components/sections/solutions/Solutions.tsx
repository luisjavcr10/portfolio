import type { Dictionary } from "@/i18n/dictionaries/es";
import { solutions } from "@/data/solutions";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SolutionSlide } from "./SolutionSlide";
import { SolutionsCarousel } from "./SolutionsCarousel";
import styles from "./Solutions.module.css";

export function Solutions({ t }: { t: Dictionary["solutions"] }) {
  const items = solutions.map((solution, i) => {
    const copy = t.items[solution.id];
    return {
      id: solution.id,
      label: `${copy.industry} · ${solution.company}`,
      accent: solution.accent,
      content: <SolutionSlide solution={solution} copy={copy} index={i} t={t} />,
    };
  });

  return (
    <section id="soluciones" className={`section ${styles.section}`} aria-labelledby="soluciones-title">
      <SolutionsCarousel
        heading={<SectionHeading id="soluciones-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />}
        items={items}
        labels={{ prev: t.prev, next: t.next, hint: t.hint, region: t.eyebrow }}
      />
    </section>
  );
}
