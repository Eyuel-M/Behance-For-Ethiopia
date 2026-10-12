import Link from "next/link";
import { FadeUp } from "@/components/Motion";
import { getPortfolioProjects } from "@/lib/content/store";
import PortfolioClient from "@/components/PortfolioClient";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = getPortfolioProjects(true);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-0">
          <FadeUp>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">Our Work</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-12 border-b border-white/[0.07]">
              <h1
                className="text-5xl sm:text-7xl font-black text-white leading-none tracking-tight"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Work that<br />
                <span style={{ color: "#6dcc46" }}>speaks.</span>
              </h1>
              <p className="text-white/40 text-sm max-w-[260px] leading-relaxed sm:text-right">
                {projects.length} projects completed by vetted designers in our network for Ethiopian and international clients.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── Filter + Projects (client component owns both sections) ── */}
      <PortfolioClient projects={projects} />

      {/* ── CTA ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#6dcc46] mb-3">Ready to start?</p>
            <h2
              className="font-black text-white text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Want work like this<br />for your business?
            </h2>
            <p className="text-white/40 text-sm mt-3">Submit a brief — free to start, matched within 48 hours.</p>
          </div>
          <Link
            href="/get-started/client"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-colors"
            style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
          >
            Submit a Brief
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>

    </div>
  );
}
