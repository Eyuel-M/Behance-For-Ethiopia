"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#071208" }}>

      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-5xl mx-auto px-5 py-4">
          <Link href="/" className="text-sm font-black" style={{ color: "#6dcc46" }}>
            Hire Ethiopia&apos;s Best
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-20 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <div className="flex items-center gap-2 justify-center mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">Something went wrong</p>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4"
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        >
          Unexpected error.
        </h1>
        <p className="text-white/50 text-sm max-w-sm leading-relaxed mx-auto mb-8">
          Something broke on our end. Try again — if the problem persists, contact our team.
        </p>

        {error.digest && (
          <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.2)" }}>
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={unstable_retry}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors cursor-pointer"
            style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
          >
            Try again →
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors"
            style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
