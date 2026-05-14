"use client";

import { useTilt } from "@/hooks/useTilt";

interface Project {
  n: string;
  year: string;
  client: string;
  title: string;
  desc: string;
  bullets: string[];
  stack: string[];
  link: string;
  shotBg: string;
  shotLabel: string;
}

const PROJECTS: Project[] = [
  {
    n: "01",
    year: "2024",
    client: "Personal",
    title: "Spotify Now Playing Widget",
    desc:
      "A real-time listening widget for the web that mirrors what's spinning, surfaces the track in a single click, and re-renders the instant a new song lands.",
    bullets: [
      "Realtime polling with optimistic UI for sub-200ms feel",
      "Direct deep-link to the live track on Spotify",
      "Zero-config drop-in for any portfolio or blog header",
    ],
    stack: ["React", "Spotify API", "Edge Functions"],
    link: "https://github.com/chasecurtis1991/cyberus",
    shotBg:
      "linear-gradient(135deg, oklch(0.32 0.18 145), oklch(0.18 0.04 145))",
    shotLabel: "now-playing.tsx",
  },
  {
    n: "02",
    year: "2024",
    client: "Personal",
    title: "Kanban Task Manager",
    desc:
      "A frictionless task surface built around the muscle memory of physical sticky notes — drag, drop, type, done.",
    bullets: [
      "Reorderable columns + cards with native DnD",
      "Pointer-driven drag with keyboard fallback",
      "Persistent state across reloads",
    ],
    stack: ["React", "TypeScript", "dnd-kit"],
    link: "https://github.com/chasecurtis1991/todo-kanban",
    shotBg:
      "linear-gradient(135deg, oklch(0.30 0.16 250), oklch(0.16 0.04 250))",
    shotLabel: "board/view.tsx",
  },
  {
    n: "03",
    year: "2022",
    client: "KatKam",
    title: "KatKam Storefront",
    desc:
      "A Shopify build for a creator-led brand — design, merchandising, and growth instrumentation handled end to end.",
    bullets: [
      "Lifted merch sales by 80% in the first quarter",
      "Drove a 15% bump in social-channel traffic",
      "Custom liquid theme tuned for mobile-first buyers",
    ],
    stack: ["Shopify", "Liquid", "GSAP"],
    link: "https://github.com/chasecurtis1991/KatKam-Shopify",
    shotBg: "linear-gradient(135deg, oklch(0.32 0.18 30), oklch(0.18 0.04 30))",
    shotLabel: "storefront.liquid",
  },
  {
    n: "04",
    year: "2019",
    client: "DOE Code",
    title: "DOE Code Search",
    desc:
      "A research-grade search experience for the U.S. Department of Energy — built for clarity at scale across thousands of public records.",
    bullets: [
      "Improved time-on-task by 30% in user testing",
      "Cut Largest-Contentful-Paint by 20%",
      "Lifted mobile sessions by 35%",
    ],
    stack: ["React", "Elasticsearch", "a11y"],
    link: "https://www.osti.gov/doecode",
    shotBg:
      "linear-gradient(135deg, oklch(0.30 0.12 220), oklch(0.16 0.03 220))",
    shotLabel: "search/index.tsx",
  },
  {
    n: "05",
    year: "2018",
    client: "Valence",
    title: "Valence Landing",
    desc:
      "A long-form landing page for an emerging artist — designed to make first-time visitors stay, scroll, and buy.",
    bullets: [
      "Boosted sales by 20% in 60 days",
      "Expanded customer reach by 35%",
      "Increased brand recall by 15% in survey data",
    ],
    stack: ["Next.js", "Framer Motion", "Stripe"],
    link: "https://github.com/chasecurtis1991/valence",
    shotBg:
      "linear-gradient(135deg, oklch(0.30 0.18 320), oklch(0.16 0.04 320))",
    shotLabel: "landing.tsx",
  },
];

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
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "oklch(1 0 0 / 0.3)",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "oklch(1 0 0 / 0.18)",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "oklch(1 0 0 / 0.18)",
            }}
          />
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
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "140px 1fr",
            gap: 0,
          }}
        >
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
                  background:
                    k === 0 ? "var(--accent)" : "oklch(1 0 0 / 0.08)",
                  boxShadow: k === 0 ? "0 0 12px var(--accent-glow)" : "none",
                  width,
                }}
              />
            ))}
          </div>
          <div
            style={{
              padding: "18px 18px 18px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                height: 14,
                width: "55%",
                borderRadius: 3,
                background: "oklch(1 0 0 / 0.14)",
              }}
            />
            <div
              style={{
                height: 10,
                width: "88%",
                borderRadius: 3,
                background: "oklch(1 0 0 / 0.08)",
              }}
            />
            <div
              style={{
                height: 10,
                width: "72%",
                borderRadius: 3,
                background: "oklch(1 0 0 / 0.08)",
              }}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginTop: 6,
              }}
            >
              <div
                style={{
                  height: 60,
                  borderRadius: 6,
                  background:
                    "linear-gradient(135deg, var(--accent), transparent)",
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  height: 60,
                  borderRadius: 6,
                  background: "oklch(1 0 0 / 0.08)",
                }}
              />
            </div>
            <div
              style={{
                height: 10,
                width: "66%",
                borderRadius: 3,
                background: "oklch(1 0 0 / 0.08)",
                marginTop: 6,
              }}
            />
            <div
              style={{
                height: 10,
                width: "48%",
                borderRadius: 3,
                background: "oklch(1 0 0 / 0.08)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const tilt = useTilt(10);
  const flip = index % 2 === 1;
  const isGitHub = p.link.includes("github");

  return (
    <article className={"proj " + (flip ? "flip" : "")}>
      <div className="proj-body">
        <div className="proj-meta">
          <span className="num">{p.n}</span>
          <span className="dot" />
          <span>{p.client}</span>
          <span className="dot" />
          <span>{p.year}</span>
        </div>
        <h3 className="reveal">
          <span className="line">{p.title}</span>
        </h3>
        <p
          className="fade-in"
          style={{
            color: "var(--fg-1)",
            fontSize: "17px",
            lineHeight: 1.55,
            margin: "0 0 28px",
            maxWidth: 520,
          }}
        >
          {p.desc}
        </p>
        <ol className="proj-bullets fade-in">
          {p.bullets.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ol>
        <div
          className="fade-in"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            margin: "0 0 28px",
          }}
        >
          {p.stack.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg-2)",
                padding: "6px 10px",
                border: "1px solid var(--line)",
                borderRadius: 999,
              }}
            >
              {s}
            </span>
          ))}
        </div>
        <a
          className="proj-link fade-in"
          href={p.link}
          data-magnetic
          target="_blank"
          rel="noopener noreferrer"
        >
          {isGitHub ? "View on GitHub" : "Visit live site"} <span>→</span>
        </a>
      </div>
      <div
        className="proj-shot fade-in"
        {...tilt}
        style={{ background: p.shotBg }}
      >
        <div className="tilt-layer">
          <MockUI label={p.shotLabel} />
        </div>
        <span className="badge">
          {p.n} / {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="label">Selected Work</div>
            <h2 className="reveal">
              <span className="line">Things I&apos;ve shipped.</span>
            </h2>
          </div>
          <div className="count">
            {PROJECTS.length.toString().padStart(2, "0")} projects · 2018 — 2024
          </div>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.n} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
