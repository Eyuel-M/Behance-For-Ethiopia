import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioProject, getPortfolioProjects } from "@/lib/content/store";
import { FadeUp } from "@/components/Motion";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getPortfolioProject(id);
  if (!project) return {};
  return { title: `${project.title} — ${project.client}` };
}

// Decorative SVG geometric overlay for the hero gradient visual
function GeoOverlay() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <circle cx="820" cy="-40" r="320" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <circle cx="820" cy="-40" r="200" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <circle cx="820" cy="-40" r="100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <circle cx="80"  cy="620" r="260" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      <line x1="0" y1="300" x2="900" y2="300" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      <line x1="450" y1="0" x2="450" y2="600" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      <rect x="320" y="180" width="260" height="240" rx="4" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />
    </svg>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getPortfolioProject(id);

  if (!project || !project.published) notFound();

  const allProjects = getPortfolioProjects(true);
  const related = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative min-h-[92vh] flex flex-col" style={{ background: project.gradient }}>
        <GeoOverlay />

        {/* overlay darkening gradient bottom */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.3) 100%)" }} />

        {/* Large background number */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden"
          style={{ lineHeight: 1, fontSize: "clamp(160px, 28vw, 380px)", fontWeight: 900, color: "rgba(255,255,255,0.04)", fontFamily: "var(--font-display), sans-serif", letterSpacing: "-0.06em", paddingRight: "2vw" }}
          aria-hidden="true"
        >
          {project.num}
        </div>

        {/* Top nav */}
        <div className="relative z-10 flex items-center justify-between max-w-6xl mx-auto w-full px-5 sm:px-8 pt-8">
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Portfolio
          </Link>
          <span className="text-white/30 text-xs font-mono tabular-nums">{project.year}</span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 mt-auto max-w-6xl mx-auto w-full px-5 sm:px-8 pb-14 sm:pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border"
                style={{ borderColor: "rgba(109,204,70,0.4)", color: "#6dcc46", backgroundColor: "rgba(109,204,70,0.08)" }}
              >
                {project.category}
              </span>
              <span className="text-white/25 text-xs font-mono">Case Study</span>
            </div>

            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {project.title}
            </h1>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-0.5">Client</p>
                <p className="text-white font-semibold text-sm">{project.client}</p>
              </div>
              {project.duration && (
                <>
                  <div className="w-px h-8 bg-white/15" />
                  <div>
                    <p className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-0.5">Duration</p>
                    <p className="text-white font-semibold text-sm">{project.duration}</p>
                  </div>
                </>
              )}
              <div className="w-px h-8 bg-white/15" />
              <div>
                <p className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-0.5">Year</p>
                <p className="text-white font-semibold text-sm">{project.year}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 right-8 z-10 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-8 bg-white" style={{ animation: "pulse 2s ease-in-out infinite" }} />
          <span className="text-white text-[9px] uppercase tracking-widest font-bold" style={{ writingMode: "vertical-rl" }}>Scroll</span>
        </div>
      </div>

      {/* ── Overview strip ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <FadeUp>
            {project.services && project.services.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
                {/* Services */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#6dcc46] mb-5">Services Delivered</p>
                  <ul className="space-y-2">
                    {project.services.map((s) => (
                      <li key={s} className="flex items-center gap-2.5 text-white/70 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46] shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Description */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#6dcc46] mb-5">Overview</p>
                  <p className="text-white/70 text-base sm:text-lg leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-3xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6dcc46] mb-5">Overview</p>
                <p className="text-white/70 text-base sm:text-xl leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/50 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </FadeUp>
        </div>
      </div>

      {/* ── Challenge ── */}
      {project.challenge && (
        <div className="bg-white border-b border-zinc-100">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-20">
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#6dcc46]" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#6dcc46]">The Challenge</p>
                  </div>
                  <div className="mt-3 w-10 h-px bg-zinc-200" />
                </div>
                <p className="text-zinc-700 text-base sm:text-xl leading-relaxed max-w-2xl">{project.challenge}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      )}

      {/* ── Visual showcase ── */}
      <div className="relative overflow-hidden" style={{ height: "clamp(320px, 50vw, 560px)" }}>
        <div className="absolute inset-0" style={{ background: project.gradient }} />
        <GeoOverlay />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)" }} />

        {/* Category label centred */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold mb-3">Project Visual</p>
            <p
              className="text-white/10 font-black select-none"
              style={{ fontSize: "clamp(48px, 10vw, 120px)", fontFamily: "var(--font-display), sans-serif", lineHeight: 1 }}
            >
              {project.client.split(" ")[0]}
            </p>
          </div>
        </div>
      </div>

      {/* ── Approach ── */}
      {project.approach && (
        <div className="bg-zinc-50 border-b border-zinc-100">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-20">
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#6dcc46]" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#6dcc46]">The Approach</p>
                  </div>
                  <div className="mt-3 w-10 h-px bg-zinc-300" />
                </div>
                <p className="text-zinc-700 text-base sm:text-xl leading-relaxed max-w-2xl">{project.approach}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      )}

      {/* ── Outcome ── */}
      {project.outcome && (
        <div style={{ backgroundColor: "#0d2318" }}>
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
            <FadeUp>
              <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-20 items-start">
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#6dcc46]" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#6dcc46]">The Outcome</p>
                  </div>
                  <div className="mt-3 w-10 h-px bg-white/10" />
                </div>
                <p className="text-white/80 text-base sm:text-xl leading-relaxed max-w-2xl">{project.outcome}</p>
              </div>
            </FadeUp>
          </div>
        </div>
      )}

      {/* ── Testimonial ── */}
      {project.testimonialQuote && (
        <div style={{ backgroundColor: "#071208" }}>
          <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-24 text-center">
            <FadeUp>
              <svg className="mx-auto mb-8 opacity-20" width="40" height="30" viewBox="0 0 40 30" fill="none" aria-hidden="true">
                <path d="M0 30V18C0 8.4 5.6 2.4 16.8 0L18.4 3.6C13.2 5.2 10 8.4 9.2 13.2H16V30H0ZM24 30V18C24 8.4 29.6 2.4 40.8 0L42.4 3.6C37.2 5.2 34 8.4 33.2 13.2H40V30H24Z" fill="white"/>
              </svg>
              <blockquote
                className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug mb-8"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                "{project.testimonialQuote}"
              </blockquote>
              <p className="text-[#6dcc46] text-sm font-semibold">{project.testimonialAuthor}</p>
            </FadeUp>
          </div>
        </div>
      )}

      {/* ── Related Projects ── */}
      {related.length > 0 && (
        <div className="bg-zinc-50 border-t border-zinc-100">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <FadeUp className="mb-10">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-zinc-900 text-xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>More work</h2>
                <Link href="/portfolio" className="text-xs font-semibold text-zinc-400 hover:text-zinc-700 transition-colors">
                  View all →
                </Link>
              </div>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/portfolio/${p.id}`}
                  className="group block rounded-2xl overflow-hidden"
                >
                  {/* Gradient thumb */}
                  <div
                    className="relative h-44 overflow-hidden"
                    style={{ background: p.gradient }}
                  >
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                    <span className="absolute top-4 left-4 text-white/30 text-xs font-mono tabular-nums">{p.num}</span>
                    <span
                      className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", backdropFilter: "blur(4px)" }}
                    >
                      {p.category}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-extrabold text-sm leading-snug">{p.title}</p>
                    </div>
                    {/* Hover arrow */}
                    <span
                      className="absolute bottom-4 right-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </div>
                  {/* Caption */}
                  <div className="p-4 bg-white border border-t-0 border-zinc-100 rounded-b-2xl">
                    <p className="text-xs text-zinc-400 mb-1">{p.client}</p>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#6dcc46] mb-3">Ready to start?</p>
            <h2 className="font-black text-white text-3xl sm:text-4xl leading-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
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
