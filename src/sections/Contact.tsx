export function ContactSection() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: 48 }}>
          <div>
            <div className="label">Contact</div>
          </div>
          <div className="count">Q3 2026 · open</div>
        </div>
        <h2 className="contact-headline reveal">
          <span className="line">Got something</span>
          <span className="line">
            <em>worth building?</em>
          </span>
          <span className="line">
            <span className="stroke">Let&apos;s talk.</span>
          </span>
        </h2>
        <a
          className="contact-cta fade-in"
          href="mailto:hello@chasecurtis.com"
          data-magnetic
        >
          hello@chasecurtis.com <span>↗</span>
        </a>
        <dl className="contact-meta fade-in">
          <div>
            <dt>Based in</dt>
            <dd>Knoxville, TN · USA</dd>
          </div>
          <div>
            <dt>Working</dt>
            <dd>United States, remote-first</dd>
          </div>
          <div>
            <dt>Response</dt>
            <dd>Within 24 hours</dd>
          </div>
          <div>
            <dt>Currently</dt>
            <dd>Booking engagements</dd>
          </div>
        </dl>
        <div className="foot">
          <div>© 2026 Chase Curtis · All rights reserved</div>
          <div className="social">
            <a
              href="https://www.linkedin.com/in/chasecurtis/"
              data-magnetic
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/chasecurtis1991"
              data-magnetic
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://x.com/DatabaseChase"
              data-magnetic
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter ↗
            </a>
            <a
              href="https://www.instagram.com/themotochase/"
              data-magnetic
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
