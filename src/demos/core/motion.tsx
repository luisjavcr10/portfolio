"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* Motion helpers shared by the demos. Every effect has a reduced-motion fallback. */

const REDUCED = "(prefers-reduced-motion: reduce)";
const PUNCH = "cubic-bezier(.34,1.56,.64,1)";

function subscribeReduced(callback: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCED).matches;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReduced, prefersReducedMotion, () => false);
}

const noopSubscribe = () => () => {};

/** False on the server and during hydration, true afterwards. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

type CountUpProps = {
  value: number;
  prefix?: string;
  /** Digits after the decimal point, e.g. 1 for a "4.8" rating. */
  decimals?: number;
  className?: string;
};

const format = (n: number, prefix: string, decimals: number) =>
  `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;

/**
 * Number that counts up (easeOutExpo, 1.8 s) the first time it is 25% visible.
 * Server render and no-JS show the final value; later value changes snap.
 */
export function CountUp({ value, prefix = "", decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  // null = not started, number = animating, "done" = show the live value.
  const [progress, setProgress] = useState<number | "done" | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !hydrated || reduced) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1800);
          setProgress(p === 1 ? "done" : 1 - Math.pow(2, -10 * p));
          if (p < 1) frame = requestAnimationFrame(step);
          else el.animate([{ transform: "scale(1.1)" }, { transform: "scale(1)" }], { duration: 300, easing: PUNCH });
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [hydrated, reduced]);

  const animated = hydrated && !reduced && progress !== "done";
  const shown = animated ? value * (typeof progress === "number" ? progress : 0) : value;

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {format(shown, prefix, decimals)}
    </span>
  );
}
