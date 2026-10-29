"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { FadeUp } from "@/components/Motion";
import { lookupBriefsByEmail } from "./actions";

type Result = Awaited<ReturnType<typeof lookupBriefsByEmail>>[number];

function StatusDot({ color }: { color: string }) {
  return (
    <span
      className="w-2.5 h-2.5 rounded-full shrink-0"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    />
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ET", { day: "numeric", month: "short", year: "numeric" });
}

export default function TrackPage() {
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<Result[] | null>(null);
  const [searched, setSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    startTransition(async () => {
      const data = await lookupBriefsByEmail(email.trim());
      setResults(data);
      setSearched(true);
    });
  }

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <FadeUp>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">Brief Tracker</p>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-black text-white leading-none tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Track your brief.
            </h1>
            <p className="text-white/50 text-base max-w-sm leading-relaxed">
              Enter the email you used when submitting your brief to see its current status.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-14 sm:py-20">

        <FadeUp>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 rounded-full border border-zinc-200 bg-white text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#0d2318] transition-colors"
            />
            <button
              type="submit"
              disabled={isPending}
              className="shrink-0 px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-150 disabled:opacity-60"
              style={{ backgroundColor: "#0d2318", color: "white" }}
            >
              {isPending ? "Checking…" : "Look up"}
            </button>
          </form>
        </FadeUp>

        {/* Results */}
        {searched && results !== null && (
          <FadeUp>
            {results.length === 0 ? (
              <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
                <p className="font-bold text-zinc-900 text-sm mb-2">No briefs found</p>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto">
                  We couldn&apos;t find any briefs submitted with <strong>{email}</strong>.
                  Double-check the email or{" "}
                  <Link href="/contact" className="text-[#0d2318] font-semibold hover:text-[#6dcc46] transition-colors">
                    contact us
                  </Link>{" "}
                  if you need help.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-zinc-400 mb-5">
                  Found {results.length} brief{results.length !== 1 ? "s" : ""} for <strong className="text-zinc-700">{email}</strong>
                </p>
                {results.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-zinc-200 bg-white p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="font-extrabold text-zinc-900 text-sm">{r.business_name ?? "Unnamed brief"}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{r.category} · Submitted {formatDate(r.created_at)}</p>
                      </div>
                      <span
                        className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: `${r.statusColor}15`, color: r.statusColor }}
                      >
                        <StatusDot color={r.statusColor} />
                        {r.statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-100 pt-3 mt-3">
                      {r.statusDescription}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </FadeUp>
        )}

        {/* Help text */}
        {!searched && (
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-zinc-100 bg-white p-6 mt-2">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">What each status means</p>
              <div className="space-y-3">
                {[
                  { label: "Received",             color: "#6e7bcc", desc: "Your brief is in the queue — we'll review it within 48 hours." },
                  { label: "Needs Clarification", color: "#f5a623", desc: "We have questions. Check your email for a message from us." },
                  { label: "Qualified",            color: "#6dcc46", desc: "Brief passed review. We're sourcing designer candidates." },
                  { label: "In Progress",          color: "#2dccaa", desc: "Project is active — milestones are being tracked." },
                  { label: "Completed",            color: "#6dcc46", desc: "Project is done. Thank you." },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3 text-xs text-zinc-500">
                    <StatusDot color={s.color} />
                    <span className="font-semibold text-zinc-700 w-24 shrink-0">{s.label}</span>
                    <span>{s.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        )}

      </div>
    </div>
  );
}
