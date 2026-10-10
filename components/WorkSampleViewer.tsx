"use client";

import { useState, useEffect, useCallback } from "react";

export default function WorkSampleViewer({ samples }: { samples: string[] }) {
  const [idx, setIdx] = useState<number | null>(null);

  const close = useCallback(() => setIdx(null), []);
  const prev = useCallback(() => setIdx((i) => (i === null ? 0 : (i - 1 + samples.length) % samples.length)), [samples.length]);
  const next = useCallback(() => setIdx((i) => (i === null ? 0 : (i + 1) % samples.length)), [samples.length]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, close, prev, next]);

  if (samples.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ aspectRatio: "16/7", backgroundColor: "rgba(255,255,255,0.03)" }}>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>No work samples</p>
      </div>
    );
  }

  return (
    <>
      {/* Thumbnail strip — click to open lightbox */}
      <div
        className={`grid gap-0.5 cursor-pointer group relative overflow-hidden ${samples.length === 1 ? "grid-cols-1" : samples.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
        style={{ aspectRatio: "16/7" }}
        onClick={() => setIdx(0)}
        role="button"
        aria-label="View work samples"
      >
        {samples.slice(0, 3).map((url, j) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={j} src={url} alt="" className="w-full h-full object-cover" />
        ))}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        >
          <span
            className="text-white text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
          >
            View samples →
          </span>
        </div>
      </div>

      {/* Lightbox */}
      {idx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center select-none"
          style={{ backgroundColor: "rgba(0,0,0,0.94)" }}
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer z-10"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Counter */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            {idx + 1} / {samples.length}
          </p>

          {/* Image */}
          <div
            className="relative max-w-4xl w-full mx-20 max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={samples[idx]}
              alt=""
              className="w-full h-auto object-contain max-h-[80vh] rounded-xl"
            />
          </div>

          {/* Prev */}
          {samples.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 13L5 8L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Next */}
          {samples.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 13L11 8L6 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Dot indicators */}
          {samples.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {samples.map((_, j) => (
                <button
                  key={j}
                  onClick={(e) => { e.stopPropagation(); setIdx(j); }}
                  className="w-1.5 h-1.5 rounded-full transition-all cursor-pointer"
                  style={{ backgroundColor: j === idx ? "rgba(109,204,70,0.9)" : "rgba(255,255,255,0.3)" }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
