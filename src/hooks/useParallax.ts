"use client";

import { useEffect, useRef } from "react";

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  strength = 0.15
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number | null = null;
    const apply = () => {
      const r = el.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const off = (r.top + r.height / 2 - center) * strength;
      el.style.transform = `translate3d(0, ${off}px, 0)`;
      raf = null;
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
