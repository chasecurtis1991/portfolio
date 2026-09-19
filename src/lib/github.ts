/**
 * Auto-discovers portfolio projects from GitHub.
 *
 * How it works:
 *   1. Searches for public repos owned by GH_USER that have the FEATURE_TOPIC
 *      topic (default: "portfolio"). Tag any repo with that topic on GitHub
 *      and it will appear here automatically on next ISR revalidation.
 *   2. For each repo, fetches the README and extracts the first inline image
 *      to use as the project shot (relative paths are resolved against the
 *      default branch on raw.githubusercontent.com).
 *   3. If no repos carry the topic yet, falls back to FALLBACK_REPOS so the
 *      section is never empty.
 *   4. OVERRIDES keyed by repo name let you polish auto-fetched content
 *      (custom title, narrative description, bullets, etc.).
 *   5. MANUAL_PROJECTS holds projects that live outside GitHub.
 *
 * Caching: 1 hour ISR via Next.js fetch options. Optional GITHUB_TOKEN env
 * var bumps rate limit from 60/hr → 5000/hr (not required at this cache
 * duration but useful in dev or if you tag many repos).
 */

export interface Project {
  n: string;
  year: string;
  client: string;
  title: string;
  desc: string;
  bullets: string[];
  stack: string[];
  link: string;
  shotUrl: string | null;
  shotBg: string;
  shotLabel: string;
  pushedAt: number; // epoch ms, used for sorting
}

const GH_USER = process.env.NEXT_PUBLIC_GITHUB_USER ?? "chasecurtis1991";
const FEATURE_TOPIC = "portfolio";
const TOKEN = process.env.GITHUB_TOKEN;

const FALLBACK_REPOS = ["cyberus", "todo-kanban", "KatKam-Shopify", "valence"];

// Polish for auto-fetched repos. Keys are repo names. Anything provided here
// wins over the field pulled from GitHub.
const OVERRIDES: Record<string, Partial<Project>> = {
  cyberus: {
    title: "Spotify Now Playing Widget",
    client: "Personal",
    desc:
      "A real-time listening widget for the web that mirrors what's spinning, surfaces the track in a single click, and re-renders the instant a new song lands.",
    bullets: [
      "Realtime polling with optimistic UI for sub-200ms feel",
      "Direct deep-link to the live track on Spotify",
      "Zero-config drop-in for any portfolio or blog header",
    ],
    stack: ["React", "Spotify API", "Edge Functions"],
    shotBg:
      "linear-gradient(135deg, oklch(0.32 0.18 145), oklch(0.18 0.04 145))",
    shotLabel: "now-playing.tsx",
  },
  "todo-kanban": {
    title: "Kanban Task Manager",
    client: "Personal",
    desc:
      "A frictionless task surface built around the muscle memory of physical sticky notes — drag, drop, type, done.",
    bullets: [
      "Reorderable columns + cards with native DnD",
      "Pointer-driven drag with keyboard fallback",
      "Persistent state across reloads",
    ],
    stack: ["React", "TypeScript", "dnd-kit"],
    shotBg:
      "linear-gradient(135deg, oklch(0.30 0.16 250), oklch(0.16 0.04 250))",
    shotLabel: "board/view.tsx",
  },
  "KatKam-Shopify": {
    title: "KatKam Storefront",
    client: "KatKam",
    desc:
      "A Shopify build for a creator-led brand — design, merchandising, and growth instrumentation handled end to end.",
    bullets: [
      "Lifted merch sales by 80% in the first quarter",
      "Drove a 15% bump in social-channel traffic",
      "Custom liquid theme tuned for mobile-first buyers",
    ],
    stack: ["Shopify", "Liquid", "GSAP"],
    shotBg: "linear-gradient(135deg, oklch(0.32 0.18 30), oklch(0.18 0.04 30))",
    shotLabel: "storefront.liquid",
  },
  valence: {
    title: "Valence Landing",
    client: "Valence",
    desc:
      "A long-form landing page for an emerging artist — designed to make first-time visitors stay, scroll, and buy.",
    bullets: [
      "Boosted sales by 20% in 60 days",
      "Expanded customer reach by 35%",
      "Increased brand recall by 15% in survey data",
    ],
    stack: ["Next.js", "Framer Motion", "Stripe"],
    shotBg:
      "linear-gradient(135deg, oklch(0.30 0.18 320), oklch(0.16 0.04 320))",
    shotLabel: "landing.tsx",
  },
};

// Projects that don't live on GitHub — keep them maintained here.
const MANUAL_PROJECTS: Project[] = [
  {
    n: "",
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
    shotUrl: null,
    shotBg:
      "linear-gradient(135deg, oklch(0.30 0.12 220), oklch(0.16 0.03 220))",
    shotLabel: "search/index.tsx",
    pushedAt: new Date("2019-12-31").getTime(),
  },
];

interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  topics: string[];
  language: string | null;
  pushed_at: string;
  default_branch: string;
}

function authHeaders(): HeadersInit {
  const base: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (TOKEN) base.Authorization = `Bearer ${TOKEN}`;
  return base;
}

async function ghJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: authHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      if (res.status !== 404) {
        console.warn(`GitHub ${path} returned ${res.status}`);
      }
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`GitHub ${path} fetch failed:`, err);
    return null;
  }
}

interface SearchResponse {
  total_count: number;
  items: GitHubRepo[];
}

async function fetchTaggedRepos(): Promise<GitHubRepo[]> {
  const q = encodeURIComponent(`user:${GH_USER} topic:${FEATURE_TOPIC} fork:false`);
  const data = await ghJson<SearchResponse>(
    `/search/repositories?q=${q}&per_page=20`
  );
  return data?.items ?? [];
}

async function fetchRepoByName(name: string): Promise<GitHubRepo | null> {
  return ghJson<GitHubRepo>(`/repos/${GH_USER}/${name}`);
}

interface ReadmeResponse {
  content: string; // base64
  encoding: string;
}

const BADGE_HOSTS = new Set([
  "img.shields.io",
  "shields.io",
  "badge.fury.io",
  "badgen.net",
  "github.com", // workflow badges
  "codecov.io",
  "travis-ci.org",
  "travis-ci.com",
]);

function extractFirstImage(
  markdown: string,
  owner: string,
  repo: string,
  branch: string
): string | null {
  // Capture both markdown `![alt](url)` and HTML `<img src="url">`. We scan
  // every match and return the first one whose host isn't a badge service.
  const re = /!\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)|<img[^>]+src=["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(markdown)) !== null) {
    const raw = (match[1] ?? match[2] ?? "").trim();
    if (!raw) continue;

    const resolved = resolveImageUrl(raw, owner, repo, branch);
    try {
      const host = new URL(resolved).hostname;
      if (BADGE_HOSTS.has(host)) continue;
      // Skip <img> badges that point to .svg from any host
      if (resolved.toLowerCase().includes("/badge")) continue;
    } catch {
      continue;
    }
    return resolved;
  }
  return null;
}

function resolveImageUrl(
  raw: string,
  owner: string,
  repo: string,
  branch: string
): string {
  if (/^https?:\/\//i.test(raw)) {
    // GitHub renders /blob/ URLs but raw content lives at raw.githubusercontent.com
    return raw
      .replace(
        /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\//,
        "https://raw.githubusercontent.com/$1/$2/"
      )
      .replace(
        /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\//,
        "https://raw.githubusercontent.com/$1/$2/"
      );
  }
  const cleaned = raw.replace(/^\.\//, "").replace(/^\//, "");
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${cleaned}`;
}

async function fetchReadmeImage(
  owner: string,
  repo: string,
  branch: string
): Promise<string | null> {
  const data = await ghJson<ReadmeResponse>(`/repos/${owner}/${repo}/readme`);
  if (!data || data.encoding !== "base64") return null;
  const md = Buffer.from(data.content, "base64").toString("utf8");
  return extractFirstImage(md, owner, repo, branch);
}

const SHOT_BG_PALETTE = [
  "linear-gradient(135deg, oklch(0.30 0.18 320), oklch(0.16 0.04 320))",
  "linear-gradient(135deg, oklch(0.30 0.16 250), oklch(0.16 0.04 250))",
  "linear-gradient(135deg, oklch(0.32 0.18 30), oklch(0.18 0.04 30))",
  "linear-gradient(135deg, oklch(0.30 0.12 220), oklch(0.16 0.03 220))",
  "linear-gradient(135deg, oklch(0.32 0.18 145), oklch(0.18 0.04 145))",
];

async function repoToProject(repo: GitHubRepo, paletteIdx: number): Promise<Project> {
  const o = OVERRIDES[repo.name] ?? {};
  const shotUrl = await fetchReadmeImage(GH_USER, repo.name, repo.default_branch);

  const topicsExclTopic = repo.topics.filter((t) => t !== FEATURE_TOPIC);
  const autoStack =
    topicsExclTopic.length > 0
      ? topicsExclTopic.slice(0, 4).map(titleCase)
      : repo.language
        ? [repo.language]
        : [];

  return {
    n: "",
    year: repo.pushed_at.slice(0, 4),
    client: o.client ?? "Personal",
    title: o.title ?? prettifyRepoName(repo.name),
    desc: o.desc ?? repo.description ?? "",
    bullets: o.bullets ?? [],
    stack: o.stack ?? autoStack,
    link: repo.homepage || repo.html_url,
    shotUrl,
    shotBg: o.shotBg ?? SHOT_BG_PALETTE[paletteIdx % SHOT_BG_PALETTE.length],
    shotLabel: o.shotLabel ?? `${repo.name}/README.md`,
    pushedAt: new Date(repo.pushed_at).getTime(),
  };
}

function titleCase(s: string): string {
  return s
    .split(/[-_\s]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function prettifyRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function getProjects(): Promise<Project[]> {
  // Primary: repos carrying the `portfolio` topic on GitHub.
  let repos = await fetchTaggedRepos();

  // Fallback: if none tagged yet, use the curated FALLBACK_REPOS list so the
  // section is never empty during the transition.
  if (repos.length === 0) {
    const fetched = await Promise.all(FALLBACK_REPOS.map(fetchRepoByName));
    repos = fetched.filter((r): r is GitHubRepo => r !== null);
  }

  const ghProjects = await Promise.all(
    repos.map((r, i) => repoToProject(r, i))
  );

  const all = [...ghProjects, ...MANUAL_PROJECTS].sort(
    (a, b) => b.pushedAt - a.pushedAt
  );

  // Stable numbering "01"…"NN" based on final order
  return all.map((p, i) => ({
    ...p,
    n: String(i + 1).padStart(2, "0"),
  }));
}
