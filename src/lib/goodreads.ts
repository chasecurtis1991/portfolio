export interface GoodreadsBook {
  title: string;
  author: string;
  coverUrl: string;
  reviewLink: string;
  rating: number;
  readAt: string | null;
  shelf: string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatReadAtUTC(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  // Use UTC fields so the formatted string is identical on server and client
  // (avoids hydration mismatch when the host timezone differs).
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

const USER_ID = process.env.NEXT_PUBLIC_GOODREADS_USER_ID ?? "154039453";
const SHELF = process.env.NEXT_PUBLIC_GOODREADS_SHELF ?? "chase-books";

function extractField(item: string, tag: string): string | null {
  // Matches <tag>...</tag> or <tag><![CDATA[...]]></tag>
  const re = new RegExp(
    `<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`
  );
  const m = item.match(re);
  return m ? m[1].trim() : null;
}

function upgradeCover(url: string): string {
  // Goodreads thumbnails are tiny (e.g., ._SY75_). Strip the size suffix to
  // get the original full-size cover.
  return url.replace(/\._(SX|SY)\d+_\./, ".");
}

export async function getLastReadBook(): Promise<GoodreadsBook | null> {
  const url = `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=${encodeURIComponent(
    SHELF
  )}&sort=date_read&order=d&per_page=1`;

  let xml: string;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (portfolio site)" },
      // Revalidate every hour — Goodreads RSS ttl is 60 min.
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.warn(`Goodreads RSS returned ${res.status}`);
      return null;
    }
    xml = await res.text();
  } catch (err) {
    console.warn("Goodreads RSS fetch failed:", err);
    return null;
  }

  const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
  if (!itemMatch) return null;
  const item = itemMatch[1];

  const title = extractField(item, "title");
  const author = extractField(item, "author_name");
  const cover =
    extractField(item, "book_large_image_url") ||
    extractField(item, "book_medium_image_url") ||
    extractField(item, "book_image_url");
  const link = extractField(item, "link");
  const ratingStr = extractField(item, "user_rating");
  const readAt = extractField(item, "user_read_at");

  if (!title || !author || !cover) return null;

  return {
    title,
    author,
    coverUrl: upgradeCover(cover),
    reviewLink: link ?? `https://www.goodreads.com/user/show/${USER_ID}`,
    rating: ratingStr ? parseInt(ratingStr, 10) : 0,
    readAt: formatReadAtUTC(readAt),
    shelf: SHELF,
  };
}
