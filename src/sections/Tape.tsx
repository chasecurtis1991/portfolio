import type { ReactNode } from "react";

interface Tool {
  name: string;
  icon: keyof typeof TOOL_ICONS;
}

const TOOL_ICONS: Record<string, ReactNode> = {
  ts: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 14h8M12 14v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
      <path
        d="M18 22.5c.8 1.2 2.2 1.8 3.6 1.8 1.6 0 3-.8 3-2.4 0-3-6.4-2.2-6.4-5.2 0-1.5 1.4-2.4 3-2.4 1.2 0 2.4.5 3 1.6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
      <ellipse cx="16" cy="16" rx="11" ry="4.5" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="16" cy="16" rx="11" ry="4.5" stroke="currentColor" strokeWidth="1.6" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="11" ry="4.5" stroke="currentColor" strokeWidth="1.6" transform="rotate(120 16 16)" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 9v14M22 9v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
      <path d="M10 9l12 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2.5 3.5 9.75v12.5L16 29.5l12.5-7.25V9.75L16 2.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 16c1.5-4 4-6 7.5-6 5.5 0 6 4 8.8 4.7 1.9.5 3.6-.2 5.2-2-1.5 4-4 6-7.5 6-5.5 0-6-4-8.8-4.7-1.9-.5-3.6.2-5.2 2zM5 24c1.5-4 4-6 7.5-6 5.5 0 6 4 8.8 4.7 1.9.5 3.6-.2 5.2-2-1.5 4-4 6-7.5 6-5.5 0-6-4-8.8-4.7-1.9-.5-3.6.2-5.2 2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  framer: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 4h16v8H16l8 8H8v-8h8L8 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M16 20v8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  gsap: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 12a11 11 0 1 0 1 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M19 16h9v8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  ),
  shopify: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 9.4c0-2.6 2-5.4 4.8-5.4 1.4 0 2.5.7 3.3 1.7-1.6.5-3 2-3.5 4.4l-4.6.7zm5.6-.9c.4-1.8 1.3-3 2.4-3.3.5.6.9 1.7.9 3.2 0 .1 0 .3 0 .4l-3.3.5v-.8zm4.2.2c0-.2 0-.4 0-.6 0-1.4-.3-2.5-.8-3.3 1.5.4 2.4 1.9 2.7 3.7l-1.9.2zM7.5 10.3l1.3-.2 6.6-1 6.4-.9 1.8-.3 2.4 17.1-15 2.1L7.5 10.3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 17.5c-.4-.3-1.1-.7-2-.7-1.4 0-1.5.9-1.5 1.1 0 1.2 3.3 1.7 3.3 4.7 0 2.3-1.5 3.8-3.5 3.8-2.4 0-3.6-1.5-3.6-1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="4" width="6" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="16" y="4" width="6" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="10" y="11" width="6" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="10" y="18" width="6" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="19" cy="14.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 5l13 22H3L16 5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  postgres: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="7" rx="10" ry="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 7v18c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5V7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 14c0 2 4.5 3.5 10 3.5S26 16 26 14M6 21c0 2 4.5 3.5 10 3.5S26 23 26 21" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  three: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3l13 7.5v11L16 29 3 21.5v-11L16 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M16 3v26M3 10.5l26 11M29 10.5L3 21.5" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
    </svg>
  ),
};

const TOOLS: Tool[] = [
  { name: "TypeScript", icon: "ts" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "next" },
  { name: "Node", icon: "node" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "Framer Motion", icon: "framer" },
  { name: "GSAP", icon: "gsap" },
  { name: "Shopify", icon: "shopify" },
  { name: "Figma", icon: "figma" },
  { name: "Vercel", icon: "vercel" },
  { name: "PostgreSQL", icon: "postgres" },
  { name: "Three.js", icon: "three" },
];

function ToolRow({ items }: { items: Tool[] }) {
  return items.map((t, i) => (
    <div className="tool" key={i}>
      <span className="tool-icon">{TOOL_ICONS[t.icon]}</span>
      {t.name}
    </div>
  ));
}

export function TapeSection() {
  const reversed = TOOLS.slice().reverse();
  return (
    <section id="stack" className="section" style={{ paddingBottom: 80 }}>
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="label">Toolbox</div>
            <h2 className="reveal">
              <span className="line">The kit I reach for.</span>
            </h2>
          </div>
          <div className="count">Daily drivers · battle-tested</div>
        </div>
      </div>
      <div className="tool-marquee">
        <div className="tool-track">
          <ToolRow items={[...TOOLS, ...TOOLS]} />
        </div>
      </div>
      <div className="tool-marquee" style={{ borderTop: "none", marginTop: -1 }}>
        <div className="tool-track" style={{ animationDirection: "reverse" }}>
          <ToolRow items={[...reversed, ...reversed]} />
        </div>
      </div>
    </section>
  );
}
