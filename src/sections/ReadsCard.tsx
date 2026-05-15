"use client";

import { useParallax } from "@/hooks/useParallax";
import type { GoodreadsBook } from "@/lib/goodreads";

const HOBBIES: [string, string][] = [
  ["GAMING", "Gaming"],
  ["MUSIC", "Music"],
  ["READING", "Reading"],
  ["HOCKEY", "Hockey"],
  ["MMA", "MMA"],
  ["CARS", "Cars"],
  ["NIGHTLIFE", "Nightlife"],
];

function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, rating));
  return (
    <div
      className="stars"
      aria-label={`Rated ${r} out of 5`}
      title={`${r} / 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < r ? "" : "empty"} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export function ReadsCard({ book }: { book: GoodreadsBook | null }) {
  const parallaxRef = useParallax<HTMLDivElement>(0.06);

  return (
    <div className="fade-in" ref={parallaxRef}>
      <div className="reads-card">
        <div className="reads-head">
          <h4>{book?.readAt ? "Recently finished" : "Currently reading"}</h4>
          <span className={`tag${book ? " live" : ""}`}>
            {book ? book.shelf.replace(/-/g, " ").toUpperCase() : "My shelf"}
          </span>
        </div>

        {book ? (
          <div className="book-row">
            <a
              href={book.reviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="book-cover"
              aria-label={`${book.title} on Goodreads`}
              data-magnetic
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={book.coverUrl} alt={`Cover of ${book.title}`} />
            </a>
            <div className="book-meta">
              <div className="ttl">{book.title}</div>
              <div className="au">— {book.author}</div>
              {book.rating > 0 && <Stars rating={book.rating} />}
              {book.readAt && <div className="when">Finished {book.readAt}</div>}
            </div>
          </div>
        ) : (
          <div className="book-row">
            <div className="book-cover">
              <div className="stripes" />
              <div className="ttl">A Philosophy of Software Design</div>
            </div>
            <div className="book-meta">
              <div className="ttl">A Philosophy of Software Design</div>
              <div className="au">— John Ousterhout</div>
              <div className="when">Goodreads feed unavailable</div>
            </div>
          </div>
        )}

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
  );
}
