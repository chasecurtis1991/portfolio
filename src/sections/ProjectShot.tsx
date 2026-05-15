"use client";

import { useTilt } from "@/hooks/useTilt";

interface ProjectShotProps {
  n: string;
  total: string;
  shotUrl: string | null;
  shotBg: string;
  shotLabel: string;
  title: string;
}

function MockUI({ label }: { label: string }) {
  const bars = ["65%", "75%", "55%", "82%", "45%", "60%"];
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent 0 18px, oklch(1 0 0 / 0.04) 18px 19px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "8%",
          top: "14%",
          right: "8%",
          bottom: "14%",
          border: "1px solid oklch(1 0 0 / 0.18)",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            borderBottom: "1px solid oklch(1 0 0 / 0.1)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(1 0 0 / 0.3)" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(1 0 0 / 0.18)" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "oklch(1 0 0 / 0.18)" }} />
          <span
            style={{
              marginLeft: 14,
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "oklch(1 0 0 / 0.55)",
              letterSpacing: ".04em",
            }}
          >
            {label}
          </span>
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "140px 1fr", gap: 0 }}>
          <div
            style={{
              borderRight: "1px solid oklch(1 0 0 / 0.08)",
              padding: "14px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {bars.map((width, k) => (
              <div
                key={k}
                style={{
                  height: 8,
                  borderRadius: 2,
                  background: k === 0 ? "var(--accent)" : "oklch(1 0 0 / 0.08)",
                  boxShadow: k === 0 ? "0 0 12px var(--accent-glow)" : "none",
                  width,
                }}
              />
            ))}
          </div>
          <div style={{ padding: "18px 18px 18px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ height: 14, width: "55%", borderRadius: 3, background: "oklch(1 0 0 / 0.14)" }} />
            <div style={{ height: 10, width: "88%", borderRadius: 3, background: "oklch(1 0 0 / 0.08)" }} />
            <div style={{ height: 10, width: "72%", borderRadius: 3, background: "oklch(1 0 0 / 0.08)" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6 }}>
              <div
                style={{
                  height: 60,
                  borderRadius: 6,
                  background: "linear-gradient(135deg, var(--accent), transparent)",
                  opacity: 0.7,
                }}
              />
              <div style={{ height: 60, borderRadius: 6, background: "oklch(1 0 0 / 0.08)" }} />
            </div>
            <div style={{ height: 10, width: "66%", borderRadius: 3, background: "oklch(1 0 0 / 0.08)", marginTop: 6 }} />
            <div style={{ height: 10, width: "48%", borderRadius: 3, background: "oklch(1 0 0 / 0.08)" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export function ProjectShot({ n, total, shotUrl, shotBg, shotLabel, title }: ProjectShotProps) {
  const tilt = useTilt(10);
  const className = "proj-shot fade-in" + (shotUrl ? " proj-shot-img" : "");
  return (
    <div
      className={className}
      {...tilt}
      style={shotUrl ? undefined : { background: shotBg }}
    >
      <div className="tilt-layer">
        {shotUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shotUrl} alt={`Screenshot of ${title}`} />
        ) : (
          <MockUI label={shotLabel} />
        )}
      </div>
      <span className="badge">
        {n} / {total}
      </span>
    </div>
  );
}
