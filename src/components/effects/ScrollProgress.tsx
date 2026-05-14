"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf: number | null = null;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = pct + "%";
      raf = null;
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="bar" ref={barRef} />
    </div>
  );
}
