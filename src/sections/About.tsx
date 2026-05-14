"use client";

import { useParallax } from "@/hooks/useParallax";

const HOBBIES: [string, string][] = [
  ["GAMING", "Gaming"],
  ["MUSIC", "Music"],
  ["READING", "Reading"],
  ["HOCKEY", "Hockey"],
  ["MMA", "MMA"],
  ["CARS", "Cars"],
  ["NIGHTLIFE", "Nightlife"],
];

export function AboutSection() {
  const parallaxRef = useParallax(0.06);

  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="label">About</div>
            <h2 className="reveal">
              <span className="line">A glimpse into</span>
              <span className="line">my world.</span>
            </h2>
          </div>
          <div className="count">8+ yrs · Knoxville, TN</div>
        </div>

        <div className="about-grid">
          <div>
            <p className="about-lede reveal">
              <span className="line">I build the layer of software</span>
              <span className="line">
                people actually <em>touch</em>—
              </span>
              <span className="line">interfaces that feel sharp,</span>
              <span className="line">load fast, and don&apos;t get in the way.</span>
            </p>
            <div className="about-stats fade-in">
              <div className="stat">
                <div className="num">
                  40<span>+</span>
                </div>
                <div className="lbl">Apps shipped</div>
              </div>
              <div className="stat">
                <div className="num">
                  8<span>yrs</span>
                </div>
                <div className="lbl">In the trade</div>
              </div>
              <div className="stat">
                <div className="num">
                  99<span>%</span>
                </div>
                <div className="lbl">Lighthouse avg</div>
              </div>
              <div className="stat">
                <div className="num">
                  ∞<span />
                </div>
                <div className="lbl">Coffee → code</div>
              </div>
            </div>
          </div>

          <div className="fade-in" ref={parallaxRef}>
            <div className="reads-card">
              <div className="reads-head">
                <h4>Currently reading</h4>
                <span className="tag">My shelf</span>
              </div>
              <div className="book-row">
                <div className="book-cover">
                  <div className="stripes" />
                  <div className="ttl">A Philosophy of Software Design</div>
                </div>
                <div className="book-meta">
                  <div className="ttl">A Philosophy of Software Design</div>
                  <div className="au">— John Ousterhout</div>
                  <div className="progress">
                    <div />
                  </div>
                  <div className="progress-lbl">62% · ch. 11 of 21</div>
                </div>
              </div>
              <div className="hobbies">
                {HOBBIES.map(([k, name]) => (
                  <span key={k} className="hobby" data-magnetic>
                    <span>{k}</span>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
