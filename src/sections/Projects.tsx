import { getProjects, type Project } from "@/lib/github";
import { ProjectShot } from "./ProjectShot";

function ProjectCard({ p, index, total }: { p: Project; index: number; total: string }) {
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
        {p.desc && (
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
        )}
        {p.bullets.length > 0 && (
          <ol className="proj-bullets fade-in">
            {p.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ol>
        )}
        {p.stack.length > 0 && (
          <div
            className="fade-in"
            style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "0 0 28px" }}
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
        )}
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
      <ProjectShot
        n={p.n}
        total={total}
        shotUrl={p.shotUrl}
        shotBg={p.shotBg}
        shotLabel={p.shotLabel}
        title={p.title}
      />
    </article>
  );
}

export async function ProjectsSection() {
  const projects = await getProjects();
  const total = projects.length.toString().padStart(2, "0");
  const firstYear =
    projects[projects.length - 1]?.year ?? new Date().getFullYear().toString();
  const lastYear =
    projects[0]?.year ?? new Date().getFullYear().toString();

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
            {total} projects · {firstYear} — {lastYear}
          </div>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} total={total} />
          ))}
        </div>
      </div>
    </section>
  );
}
