"use client";

const TRAITS = [
  "Performant",
  "Accessible",
  "Maintainable",
  "Scalable",
  "Type-safe",
  "Pixel-perfect",
  "Animated",
  "Responsive",
  "Reliable",
  "Documented",
  "Battle-tested",
];

export function HeroSection() {
  const loop = [...TRAITS, ...TRAITS, ...TRAITS];

  return (
    <section className="hero wrap">
      <div className="hero-eyebrow">
        <span className="led" />
        <span>Currently shipping</span>
        <span className="sep" />
        <span>2014 → present</span>
      </div>
      <h1 className="reveal">
        <span className="line">I build the parts of the web</span>
        <span className="line">
          <em>people actually</em> touch.
        </span>
      </h1>
      <div className="marquee-hero fade-in">
        <div className="marquee-track">
          {loop.map((t, i) => (
            <span key={i}>
              {t}
              <span className="star">✦</span>
            </span>
          ))}
        </div>
      </div>
      <p className="hero-sub fade-in">
        Frontend engineer based in Knoxville, TN. I help teams turn the messy
        middle of product development into shipped, polished interfaces —
        without trading speed for quality.
      </p>
      <div className="hero-ctas fade-in">
        <a className="btn btn-primary" href="#work" data-magnetic>
          Explore my work <span className="arrow">→</span>
        </a>
        <a className="btn" href="#contact" data-magnetic>
          Start a project <span className="arrow">↗</span>
        </a>
      </div>
    </section>
  );
}
