"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

/* Motion helpers for the gym demo. Every effect has a reduced-motion fallback. */

const REDUCED = "(prefers-reduced-motion: reduce)";

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

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const PUNCH = "cubic-bezier(.34,1.56,.64,1)";
const OUT = "cubic-bezier(.16,1,.3,1)";
const WIPE = "cubic-bezier(.77,0,.18,1)";

/* ------------------------------------------------------------------ */
/* Counter                                                             */
/* ------------------------------------------------------------------ */

const format = (n: number, prefix: string) => `${prefix}${Math.round(n).toLocaleString("en-US")}`;

const noopSubscribe = () => () => {};

/** False on the server and during hydration, true afterwards. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

/**
 * Number that counts up (easeOutExpo, 1.8 s) the first time it is 25% visible.
 * Server render and no-JS show the final value; later value changes snap.
 */
export function CountUp({ value, prefix = "", className }: { value: number; prefix?: string; className?: string }) {
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
      {format(shown, prefix)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll: [data-rise] fades up, [data-tape] wipes in         */
/* ------------------------------------------------------------------ */

export function useReveal(rootRef: RefObject<HTMLElement | null>, key: unknown) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const targets = [...root.querySelectorAll<HTMLElement>("[data-rise]:not([data-risen]),[data-tape]:not([data-risen])")];
    root.dataset.motion = "on";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.dataset.risen = "";
          if (el.hasAttribute("data-tape")) {
            if (!reduced)
              el.animate([{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], { duration: 700, easing: WIPE });
          } else {
            el.animate(
              reduced
                ? [{ opacity: 0 }, { opacity: 1 }]
                : [{ transform: "translateY(40px)", opacity: 0 }, { transform: "none", opacity: 1 }],
              { duration: reduced ? 400 : 700, easing: reduced ? "ease" : OUT },
            );
          }
        }
      },
      { threshold: 0.15 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef, key]);
}

/* ------------------------------------------------------------------ */
/* Scroll scene: marquees, 3D barbell, pinned carousel, ECG, tapes     */
/* ------------------------------------------------------------------ */

type MarqueeTrack = HTMLElement & { _x?: number };

export function useScrollScene(rootRef: RefObject<HTMLElement | null>, onPlates: (n: number) => void, active: boolean) {
  const onPlatesRef = useRef(onPlates);
  useEffect(() => {
    onPlatesRef.current = onPlates;
  }, [onPlates]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !active) return;
    const q = <T extends Element = HTMLElement>(sel: string) => [...root.querySelectorAll<T & Element>(sel)] as T[];

    const reduced = prefersReducedMotion();
    let lastY = window.scrollY;
    let vel = 0;
    let dir = 1;
    let spin = -28;
    const rot = { x: -14, y: -28 };
    const mouse = { nx: 0, ny: 0 };
    const tilt = { x: 0, y: 0 };
    let plates = -1;

    const tracks = q<MarqueeTrack>("[data-mq-track]");
    const rig = q("[data-bb-rig]")[0];
    const scene = q("[data-bb-scene]")[0];
    const pin = q("[data-pin]")[0];
    const pinTrack = q("[data-pin-track]")[0];
    const reveals = q("[data-reveal]");
    const ecgs = q<SVGPathElement>("[data-ecg]").map((p) => ({ p, len: p.getTotalLength() }));
    const tapes = q("[data-tape]");
    const cards = q("[data-plan-card]");
    ecgs.forEach(({ p, len }) => (p.style.strokeDasharray = String(len)));

    const layout = () => {
      if (scene) scene.style.transform = `scale(${clamp(window.innerWidth / 1150, 0.46, 1.15)})`;
      if (pin && pinTrack)
        pin.style.height = `${Math.max(window.innerHeight * 1.2, pinTrack.scrollWidth - window.innerWidth + window.innerHeight)}px`;
    };
    layout();
    document.fonts?.ready.then(layout);

    const onMove = (e: PointerEvent) => {
      mouse.nx = e.clientX / window.innerWidth - 0.5;
      mouse.ny = e.clientY / window.innerHeight - 0.5;
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null) return;
      tilt.y = clamp(e.gamma, -40, 40) * 0.9;
      tilt.x = clamp((e.beta ?? 45) - 45, -40, 40) * -0.4;
    };
    window.addEventListener("resize", layout);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onOrient);

    let raf = 0;
    const tick = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      vel += (dy - vel) * 0.15;
      if (Math.abs(dy) > 0.5) dir = dy > 0 ? 1 : -1;

      // Marquees: 1 px/frame + 0.35 × scroll speed; row 2 runs the other way.
      tracks.forEach((track, i) => {
        const half = track.scrollWidth / 2;
        if (!half) return;
        const speed = reduced ? 0 : 1 + Math.min(Math.abs(vel), 60) * 0.35;
        track._x = (track._x ?? 0) - speed * (i % 2 ? -1 : 1) * dir;
        if (track._x <= -half) track._x += half;
        if (track._x > 0) track._x -= half;
        track.style.transform = `translate3d(${track._x.toFixed(1)}px,0,0)`;
      });

      // 3D barbell: slow spin + mouse / gyroscope / scroll, lerp 0.06.
      if (rig && y < vh * 1.3) {
        if (!reduced) spin += 0.18;
        const ty = spin + mouse.nx * 38 + tilt.y + y * 0.06;
        const tx = -14 + mouse.ny * -24 + tilt.x + y * 0.02;
        rot.x += (tx - rot.x) * 0.06;
        rot.y += (ty - rot.y) * 0.06;
        rig.style.transform = `rotateX(${rot.x.toFixed(2)}deg) rotateY(${rot.y.toFixed(2)}deg) rotateZ(-8deg)`;
      }

      // Pinned classes carousel: horizontal travel tied to vertical scroll + yellow wipe.
      if (pin && pinTrack) {
        const r = pin.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) {
          const total = Math.max(1, pin.offsetHeight - vh);
          const p = clamp(-r.top / total, 0, 1);
          pinTrack.style.transform = `translate3d(${(-p * Math.max(0, pinTrack.scrollWidth - vw)).toFixed(1)}px,0,0)`;
          reveals.forEach((card) => {
            const k = reduced ? 1 : clamp((vw - card.getBoundingClientRect().left) / (vw * 0.45), 0, 1);
            const e = 1 - Math.pow(1 - k, 3);
            const wipe = card.querySelector<HTMLElement>("[data-wipe]");
            const photo = card.querySelector<HTMLElement>("[data-ph]");
            if (wipe) wipe.style.transform = `scaleX(${(1 - e).toFixed(3)})`;
            if (photo) photo.style.transform = `scale(${(1.18 - 0.18 * e).toFixed(3)})`;
          });
        }
      }

      // Heartbeat line drawn with the scroll.
      ecgs.forEach(({ p, len }) => {
        const r = p.ownerSVGElement!.getBoundingClientRect();
        const k = reduced ? 1 : clamp((vh - r.top) / (vh * 0.9), 0, 1);
        p.style.strokeDashoffset = (len * (1 - k)).toFixed(1);
      });

      tapes.forEach((t) => {
        t.style.backgroundPosition = `${reduced ? 0 : (y * 0.5 * Number(t.dataset.dir ?? 1)).toFixed(1)}px 0`;
      });

      // One plate per plan card that reaches 78% of the viewport.
      if (cards.length) {
        const tops = cards.map((c) => c.getBoundingClientRect().top);
        const sameRow = Math.abs(tops[0] - tops[tops.length - 1]) < 120;
        const n = reduced ? cards.length : tops.filter((t, i) => t + (sameRow ? i * vh * 0.1 : 0) < vh * 0.78).length;
        if (n !== plates) {
          plates = n;
          onPlatesRef.current(n);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, [rootRef, active]);
}

/* ------------------------------------------------------------------ */
/* Plate cursor + magnetic buttons (fine pointers only)                */
/* ------------------------------------------------------------------ */

export function useCursor(cursorRef: RefObject<HTMLElement | null>, rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const cursor = cursorRef.current;
    const root = rootRef.current;
    if (!cursor || !root) return;
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;

    const html = document.documentElement;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2, s: 1 };
    const cur = { x: target.x, y: target.y, s: 1 };
    let pressed = false;
    let visible = false;
    const magnets = new Set<HTMLElement>();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        cursor.style.display = "block";
        html.dataset.plateCursor = "";
      }
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target instanceof Element ? e.target.closest("a,button,input,label,[data-magnet],[tabindex]") : null;
      target.s = el ? 1.9 : 1;
      root.querySelectorAll<HTMLElement>("[data-magnet]").forEach((b) => {
        const r = b.getBoundingClientRect();
        if (!r.width) return;
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < Math.max(r.width, r.height) * 0.9) {
          b.style.translate = `${(dx * 0.28).toFixed(1)}px ${(dy * 0.35).toFixed(1)}px`;
          magnets.add(b);
        } else if (magnets.has(b)) {
          b.style.translate = "";
          magnets.delete(b);
        }
      });
    };
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    const onLeave = () => {
      visible = false;
      cursor.style.display = "none";
      delete html.dataset.plateCursor;
    };

    let raf = 0;
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.22;
      cur.y += (target.y - cur.y) * 0.22;
      cur.s += ((pressed ? 0.8 : target.s) - cur.s) * 0.18;
      cursor.style.transform = `translate3d(${cur.x.toFixed(1)}px,${cur.y.toFixed(1)}px,0) scale(${cur.s.toFixed(3)}) rotate(${(cur.x * 0.5).toFixed(0)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      magnets.forEach((b) => (b.style.translate = ""));
      cursor.style.display = "none";
      delete html.dataset.plateCursor;
    };
  }, [cursorRef, rootRef]);
}

/* ------------------------------------------------------------------ */
/* One-shot effects                                                    */
/* ------------------------------------------------------------------ */

/** Burst of yellow plates from the center of the screen. */
export function plateConfetti() {
  if (prefersReducedMotion()) return;
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:450;overflow:hidden";
  document.body.appendChild(layer);
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.42;
  for (let i = 0; i < 46; i++) {
    const d = document.createElement("div");
    const s = 12 + Math.random() * 24;
    const color = Math.random() < 0.8 ? "#FFD400" : "#F5F5F5";
    d.style.cssText = `position:absolute;left:${cx}px;top:${cy}px;width:${s}px;height:${s}px;margin:-${s / 2}px;border-radius:50%;background:radial-gradient(circle,transparent 0 20%,#0A0A0A 21% 27%,${color} 28% 100%)`;
    layer.appendChild(d);
    const a = Math.random() * Math.PI * 2;
    const v = 160 + Math.random() * 340;
    const dx = Math.cos(a) * v;
    const dy = Math.sin(a) * v - 220;
    d.animate(
      [
        { transform: "translate(0,0) rotateX(0deg) scale(.3)", opacity: 1 },
        { transform: `translate(${dx}px,${dy}px) rotateX(${Math.random() * 360}deg) scale(1)`, opacity: 1, offset: 0.42 },
        { transform: `translate(${dx * 1.25}px,${dy + window.innerHeight * 0.75}px) rotateX(${Math.random() * 720}deg) scale(.9)`, opacity: 0 },
      ],
      { duration: 1600 + Math.random() * 600, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" },
    );
  }
  setTimeout(() => layer.remove(), 2600);
}

/** Striped yellow wipe across the screen; `onCovered` runs while it covers the page. */
export function screenWipe(el: HTMLElement | null, onCovered: () => void) {
  if (!el || prefersReducedMotion() || !el.animate) {
    onCovered();
    document.body.animate?.([{ opacity: 0.4 }, { opacity: 1 }], { duration: 400, easing: "ease" });
    return;
  }
  const skew = "skewX(-14deg)";
  const enter = el.animate([{ transform: `translateX(-140%) ${skew}` }, { transform: `translateX(0%) ${skew}` }], {
    duration: 480,
    easing: WIPE,
    fill: "forwards",
  });
  enter.onfinish = () => {
    onCovered();
    setTimeout(() => {
      const exit = el.animate([{ transform: `translateX(0%) ${skew}` }, { transform: `translateX(140%) ${skew}` }], {
        duration: 520,
        easing: WIPE,
        fill: "forwards",
      });
      exit.onfinish = () => {
        enter.cancel();
        exit.cancel();
      };
    }, 90);
  };
}

export const easings = { PUNCH, OUT, WIPE };
