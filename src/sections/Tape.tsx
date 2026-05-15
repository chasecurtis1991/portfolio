import type { ComponentType, SVGProps } from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiFramer,
  SiGreensock,
  SiShopify,
  SiFigma,
  SiVercel,
  SiPostgresql,
  SiThreedotjs,
} from "react-icons/si";

interface Tool {
  name: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const TOOLS: Tool[] = [
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node", Icon: SiNodedotjs },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "GSAP", Icon: SiGreensock },
  { name: "Shopify", Icon: SiShopify },
  { name: "Figma", Icon: SiFigma },
  { name: "Vercel", Icon: SiVercel },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Three.js", Icon: SiThreedotjs },
];

function ToolRow({ items, keyPrefix }: { items: Tool[]; keyPrefix: string }) {
  return items.map((t, i) => (
    <div className="tool" key={`${keyPrefix}-${i}`}>
      <span className="tool-icon">
        <t.Icon aria-hidden="true" />
      </span>
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
          <ToolRow items={[...TOOLS, ...TOOLS]} keyPrefix="a" />
        </div>
      </div>
      <div className="tool-marquee" style={{ borderTop: "none", marginTop: -1 }}>
        <div className="tool-track" style={{ animationDirection: "reverse" }}>
          <ToolRow items={[...reversed, ...reversed]} keyPrefix="b" />
        </div>
      </div>
    </section>
  );
}
