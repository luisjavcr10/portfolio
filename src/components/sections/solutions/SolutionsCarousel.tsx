"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import styles from "./Solutions.module.css";

export type CarouselItem = {
  id: string;
  label: string;
  accent: string;
  content: ReactNode;
};

type SolutionsCarouselProps = {
  heading: ReactNode;
  items: CarouselItem[];
  labels: { prev: string; next: string; hint: string; region: string };
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Wide screens: horizontal scroll-snap carousel. Narrow screens: stacked cards (see CSS). */
export function SolutionsCarousel({ heading, items, labels }: SolutionsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    const scroller = scrollerRef.current;
    const target = Math.max(0, Math.min(items.length - 1, index));
    const slide = scroller?.children[target] as HTMLElement | undefined;
    if (!scroller || !slide) return;
    scroller.scrollTo({
      left: slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2,
      behavior: "smooth",
    });
    setActive(target);
  }

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let closest = 0;
    let minDistance = Infinity;
    Array.from(scroller.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (distance < minDistance) {
        minDistance = distance;
        closest = i;
      }
    });
    if (closest !== active) setActive(closest);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  }

  function handleSlideClick(event: MouseEvent, index: number) {
    // A dimmed neighbour slide works as a "go to" target instead of following its links.
    if (index === active || !window.matchMedia("(min-width: 1000px)").matches) return;
    event.preventDefault();
    goTo(index);
  }

  return (
    <>
      <div className={`container ${styles.header}`} data-reveal>
        {heading}
        <div className={styles.controls}>
          <span className={styles.counter}>
            {pad(active + 1)} / {pad(items.length)}
          </span>
          <button type="button" className={styles.arrow} onClick={() => goTo(active - 1)} aria-label={labels.prev} disabled={active === 0}>
            ←
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goTo(active + 1)}
            aria-label={labels.next}
            disabled={active === items.length - 1}
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className={styles.scroller}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={labels.region}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
      >
        {items.map((item, i) => (
          <article
            key={item.id}
            className={styles.slide}
            data-active={i === active}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${items.length} · ${item.label}`}
            style={{ "--accent": item.accent } as CSSProperties}
            onClick={(event) => handleSlideClick(event, i)}
          >
            {item.content}
          </article>
        ))}
      </div>

      <div className={`container ${styles.pager}`}>
        <div className={styles.dots}>
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={styles.dot}
              data-active={i === active}
              style={{ "--accent": item.accent } as CSSProperties}
              onClick={() => goTo(i)}
              aria-label={item.label}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>
        <span className={styles.hint}>{labels.hint}</span>
      </div>
    </>
  );
}
