interface Testimonial {
  name: string;
  role: string;
  initials: string;
  quote: string;
}

const TESTS: Testimonial[] = [
  {
    name: "Chris Nicolaou",
    role: "Artist · Valence",
    initials: "CN",
    quote:
      "Chase is thorough and makes sure he does a great service by you. He walks you through every step — finding a domain, hosting, the lot. Recommend him 100%.",
  },
  {
    name: "Kat",
    role: "Creator · ItsKatKam",
    initials: "K",
    quote:
      "Chase's work on our site has been nothing short of exceptional. A talented developer who's also a great communicator. We highly recommend him.",
  },
  {
    name: "Tony Beery",
    role: "Project Manager · KeyLogic",
    initials: "TB",
    quote:
      "His ability to create seamless user experiences is unmatched. He took our complex product and turned it into an intuitive, engaging interface.",
  },
  {
    name: "Brad Love",
    role: "Senior Developer · McLeod Software",
    initials: "BL",
    quote:
      "Chase is a true frontend wizard. We're already seeing positive feedback from our customers — clear wins on both polish and performance.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="words" className="section">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="label">Kind Words</div>
            <h2 className="reveal">
              <span className="line">What clients say.</span>
            </h2>
          </div>
          <div className="count">04 · verified</div>
        </div>
        <div className="tests-grid">
          {TESTS.map((t) => (
            <div key={t.name} className="test fade-in" data-magnetic>
              <p>{t.quote}</p>
              <div className="test-by">
                <div className="test-av">{t.initials}</div>
                <div>
                  <div className="test-name">{t.name}</div>
                  <div className="test-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
