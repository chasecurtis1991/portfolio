"use client";

import { useCallback, type MouseEvent } from "react";

export function useTilt(strength = 10) {
  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * strength;
      const ry = (px - 0.5) * strength;
      const layer = el.querySelector<HTMLElement>(".tilt-layer");
      if (layer) {
        layer.style.setProperty("--rx", rx + "deg");
        layer.style.setProperty("--ry", ry + "deg");
      }
      el.style.setProperty("--mx", px * 100 + "%");
      el.style.setProperty("--my", py * 100 + "%");
    },
    [strength]
  );

  const onMouseLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    const layer = e.currentTarget.querySelector<HTMLElement>(".tilt-layer");
    if (layer) {
      layer.style.setProperty("--rx", "0deg");
      layer.style.setProperty("--ry", "0deg");
    }
  }, []);

  return { onMouseMove, onMouseLeave };
}
