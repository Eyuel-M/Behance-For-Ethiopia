"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const STAGGER_INTERVAL = 0.07;

function applyHide(el: HTMLElement) {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
}

function applyReveal(el: HTMLElement, delay = 0) {
  el.style.transition = `opacity 0.55s ${EASE} ${delay}s, transform 0.55s ${EASE} ${delay}s`;
  el.style.opacity = "1";
  el.style.transform = "translateY(0)";
}

// ── FadeUp ────────────────────────────────────────────────────────────────────
// Fades up from below when the element scrolls into view (fires once).
export function FadeUp({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    applyHide(el);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          applyReveal(el, delay);
          obs.disconnect();
        }
      },
      { rootMargin: "-80px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

// ── StaggerGrid ───────────────────────────────────────────────────────────────
// Container that reveals all [data-stagger] children in sequence when in view.
export function StaggerGrid({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-stagger]"));
    items.forEach(applyHide);

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => applyReveal(item, i * STAGGER_INTERVAL));
          obs.disconnect();
        }
      },
      { rootMargin: "-60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

// ── StaggerItem ───────────────────────────────────────────────────────────────
// Direct child of StaggerGrid — tagged so StaggerGrid can find and stagger it.
export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div data-stagger className={className} style={style}>
      {children}
    </div>
  );
}
