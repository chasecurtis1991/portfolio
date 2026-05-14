import { getLastReadBook } from "@/lib/goodreads";
import { ReadsCard } from "./ReadsCard";

export async function AboutSection() {
  const book = await getLastReadBook();

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

          <ReadsCard book={book} />
        </div>
      </div>
    </section>
  );
}
