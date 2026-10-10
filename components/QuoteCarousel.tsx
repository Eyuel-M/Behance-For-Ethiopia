"use client";

import { useState } from "react";

interface Quote {
  comment: string;
  project: string | null;
  rating: number;
}

export default function QuoteCarousel({ quotes }: { quotes: Quote[] }) {
  const [index, setIndex] = useState(0);

  if (!quotes.length) return null;

  const q = quotes[index];
  const stars = Math.round(q.rating);

  return (
    <div
      className="mb-5 rounded-xl px-4 py-3"
      style={{ backgroundColor: "rgba(255,255,255,0.04)", borderLeft: "3px solid rgba(109,204,70,0.4)" }}
    >
      <p
        className="text-xs italic leading-relaxed line-clamp-3 mb-2.5"
        style={{ color: "rgba(255,255,255,0.55)", minHeight: "3.6em" }}
      >
        &ldquo;{q.comment}&rdquo;
      </p>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span style={{ display: "inline-flex", gap: 1, flexShrink: 0 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <svg key={n} width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
                  fill={n <= stars ? "#f59e0b" : "rgba(255,255,255,0.12)"}
                />
              </svg>
            ))}
          </span>
          {q.project && (
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.25)" }}>
              {q.project}
            </p>
          )}
        </div>

        {quotes.length > 1 && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + quotes.length) % quotes.length)}
              aria-label="Previous review"
              style={{
                width: 22, height: 22, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "transparent", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M5 1.5L2.5 4 5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-xs tabular-nums" style={{ color: "rgba(255,255,255,0.25)", minWidth: "2.5ch", textAlign: "center" }}>
              {index + 1}/{quotes.length}
            </span>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % quotes.length)}
              aria-label="Next review"
              style={{
                width: 22, height: 22, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "transparent", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
                color: "rgba(255,255,255,0.4)",
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M3 1.5L5.5 4 3 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
