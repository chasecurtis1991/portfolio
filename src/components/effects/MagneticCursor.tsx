"use client";

import { useEffect, useRef } from "react";

type SnapTarget = Element | null;

interface CursorState {
  x: number;
  y: number;
  bx: number;
  by: number;
  rx: number;
  ry: number;
  dx: number;
  dy: number;
  snap: SnapTarget;
}

export function MagneticCursor({ enabled = true }: { enabled?: boolean }) {
  const blobRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef<CursorState>({
    x: 0, y: 0, bx: 0, by: 0, rx: 0, ry: 0, dx: 0, dy: 0, snap: null,
  });

  useEffect(() => {
    if (!enabled) return;
    const state = stateRef.current;
    state.x = window.innerWidth / 2;
    state.y = window.innerHeight / 2;
    state.bx = state.x; state.by = state.y;
    state.rx = state.x; state.ry = state.y;
    state.dx = state.x; state.dy = state.y;

    const onMove = (e: MouseEvent) => {
      state.x = e.clientX;
      state.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest(
        "[data-magnetic], a, button, .btn, .proj-link, .hobby, .nav a"
      );
      state.snap = t ?? null;
    };
    const onOut = () => {
      state.snap = null;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    let raf = 0;
    const tick = () => {
      let tx = state.x;
      let ty = state.y;
      if (state.snap) {
        const r = state.snap.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        tx = state.x + (cx - state.x) * 0.32;
        ty = state.y + (cy - state.y) * 0.32;
      }
      state.dx += (state.x - state.dx) * 0.85;
      state.dy += (state.y - state.dy) * 0.85;
      state.rx += (tx - state.rx) * 0.22;
      state.ry += (ty - state.ry) * 0.22;
      state.bx += (state.x - state.bx) * 0.07;
      state.by += (state.y - state.by) * 0.07;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${state.dx}px, ${state.dy}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${state.rx}px, ${state.ry}px) translate(-50%,-50%)`;
        ringRef.current.classList.toggle("snap", !!state.snap);
      }
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${state.bx}px, ${state.by}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={blobRef} className="cursor-blob" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
