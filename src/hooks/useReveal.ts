"use client";

import { useEffect, useRef } from "react";

/**
 * Adds `.in` class to descendants matching `.reveal` and `.fade-in` as they
 * scroll into view. Uses both a scroll listener and a setInterval poll so it
 * works in environments where scroll events / IntersectionObserver / rAF can
 * be throttled. A safety timeout forces final state if transitions never tick.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let alive: Element[] = Array.from(
      el.querySelectorAll(".reveal, .fade-in")
    );

    const forceFinal = (node: Element) => {
      node.querySelectorAll<HTMLElement>(":scope > .line").forEach((l) => {
        l.style.transition = "none";
        l.style.transform = "translateY(0)";
        l.style.opacity = "1";
      });
      if (node.classList.contains("fade-in")) {
        const n = node as HTMLElement;
        n.style.transition = "none";
        n.style.transform = "none";
        n.style.opacity = "1";
      }
    };

    const reveal = (node: Element) => {
      node.classList.add("in");
      setTimeout(() => forceFinal(node), 1800);
    };

    const check = () => {
      if (alive.length === 0) return;
      const vh = window.innerHeight;
      const trigger = vh * 0.92;
      alive = alive.filter((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < trigger && r.bottom > -50) {
          reveal(n);
          return false;
        }
        return true;
      });
    };

    let lastY = -1;
    let lastH = -1;
    const pollId = window.setInterval(() => {
      if (alive.length === 0) {
        window.clearInterval(pollId);
        return;
      }
      const y = window.scrollY;
      const h = window.innerHeight;
      if (y !== lastY || h !== lastH) {
        lastY = y;
        lastH = h;
        check();
      }
    }, 80);

    const onScroll = () => check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const initialId = window.setTimeout(check, 50);

    return () => {
      window.clearInterval(pollId);
      window.clearTimeout(initialId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}
