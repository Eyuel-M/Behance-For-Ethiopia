import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDesignerApplication, getDesignerFeedback } from "@/lib/supabase/admin-queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const designer = await getDesignerApplication(id);
  if (!designer || designer.status !== "approved") return { title: "Designer Not Found" };
  return {
    title: `${designer.full_name} — ${designer.specialty}`,
    description: designer.bio.slice(0, 160),
    alternates: { canonical: `/designers/${id}` },
  };
}

const PALETTE = [
  { bg: "#0d2318", color: "#6dcc46" },
  { bg: "#071208", color: "#6dcc46" },
  { bg: "#6dcc46", color: "#0d2318" },
  { bg: "#1a1a2e", color: "#ffffff" },
  { bg: "#3d1a4a", color: "#ffffff" },
  { bg: "#0a1a0a", color: "#6dcc46" },
  { bg: "#151515", color: "#ffffff" },
  { bg: "#f5e6c8", color: "#0d2318" },
];

function avatarStyle(name: string) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffffff;
  return PALETTE[Math.abs(h) % PALETTE.length];
}

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={i <= Math.round(value) ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1.2">
          <polygon points="6,1 7.5,4.5 11,4.8 8.5,7 9.3,10.5 6,8.5 2.7,10.5 3.5,7 1,4.8 4.5,4.5" />
        </svg>
      ))}
    </span>
  );
}

export default async function DesignerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [designer, feedbackRows] = await Promise.all([
    getDesignerApplication(id),
    getDesignerFeedback(id),
  ]);

  if (!designer || designer.status !== "approved") notFound();

  const { bg, color } = avatarStyle(designer.full_name);
  const inits = initials(designer.full_name);
  const skills = designer.skills.split(",").map((s) => s.trim()).filter(Boolean);
  const tools = designer.tools.split(",").map((s) => s.trim()).filter(Boolean);

  let workSamples: string[] = [];
  if (designer.work_samples) {
    try { workSamples = JSON.parse(designer.work_samples); } catch { workSamples = []; }
  }

  const submitted = feedbackRows.filter((f) => f.status === "submitted");
  const avgRating = submitted.length > 0
    ? submitted.reduce((sum, f) => {
        const ratings = [f.quality_rating, f.communication_rating, f.delivery_rating].filter((r): r is number => r !== null);
        return sum + (ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0);
      }, 0) / submitted.length
    : null;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <Link
            href="/designers"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            All designers
          </Link>

          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center font-extrabold text-xl shrink-0"
              style={{ backgroundColor: bg, color, border: `2px solid ${color}20` }}
            >
              {inits}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
                <span className="text-xs font-semibold text-[#6dcc46]/70 uppercase tracking-widest">Vetted Professional</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-1" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                {designer.full_name}
              </h1>
              <p className="text-[#6dcc46] font-semibold text-base mb-2">{designer.specialty}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/50 text-sm">
                <span>{designer.city}</span>
                <span>·</span>
                <span>{designer.experience} experience</span>
                {avgRating !== null && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1.5">
                      <StarRating value={avgRating} />
                      <span className="text-white/70 font-semibold">{avgRating.toFixed(1)}</span>
                      <span className="text-white/35">({submitted.length} review{submitted.length !== 1 ? "s" : ""})</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="mt-10 flex flex-wrap gap-5">
            <div className="bg-white/5 rounded-xl px-5 py-3 border border-white/10">
              <p className="text-xs text-white/40 mb-0.5">Availability</p>
              <p className="text-sm font-semibold text-white">{designer.availability}</p>
            </div>
            <div className="bg-white/5 rounded-xl px-5 py-3 border border-white/10">
              <p className="text-xs text-white/40 mb-0.5">Rate</p>
              <p className="text-sm font-semibold text-white">{designer.hourly_rate}</p>
            </div>
            <div className="bg-white/5 rounded-xl px-5 py-3 border border-white/10">
              <p className="text-xs text-white/40 mb-0.5">On-site</p>
              <p className="text-sm font-semibold text-white">{designer.can_work_on_site}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-18 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left / main column */}
        <div className="lg:col-span-2 space-y-12">

          {/* Bio */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">About</h2>
            <p className="text-zinc-700 leading-relaxed text-base">{designer.bio}</p>
          </section>

          {/* Work samples */}
          {workSamples.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Work Samples</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workSamples.map((url, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-zinc-100 aspect-video bg-zinc-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Work sample ${i + 1} by ${designer.full_name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#0d2318]/5 text-[#0d2318] border border-[#0d2318]/10">{s}</span>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Tools</h2>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600">{t}</span>
              ))}
            </div>
          </section>

          {/* Education */}
          {designer.education && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Education</h2>
              <p className="text-zinc-700 text-sm leading-relaxed">{designer.education}</p>
            </section>
          )}

          {/* Certificates */}
          {designer.certificates && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Certifications</h2>
              <p className="text-zinc-700 text-sm leading-relaxed">{designer.certificates}</p>
            </section>
          )}

          {/* Reviews */}
          {submitted.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Client Reviews</h2>
              <div className="space-y-5">
                {submitted.map((fb) => {
                  const ratings = [fb.quality_rating, fb.communication_rating, fb.delivery_rating].filter((r): r is number => r !== null);
                  const avg = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;
                  return (
                    <div key={fb.id} className="rounded-2xl border border-zinc-100 p-5 bg-zinc-50">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-bold text-zinc-900 text-sm">{fb.client_name}</p>
                          {fb.project_title && <p className="text-xs text-zinc-400 mt-0.5">{fb.project_title}</p>}
                        </div>
                        {avg !== null && (
                          <div className="flex items-center gap-1.5 shrink-0">
                            <StarRating value={avg} />
                            <span className="text-xs font-bold text-zinc-700">{avg.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      {fb.comments && <p className="text-sm text-zinc-600 leading-relaxed">{fb.comments}</p>}
                      <div className="flex gap-4 mt-3 pt-3 border-t border-zinc-200">
                        {([["Quality", fb.quality_rating], ["Communication", fb.communication_rating], ["Delivery", fb.delivery_rating]] as [string, number | null][]).map(([label, val]) => val !== null && (
                          <div key={label} className="text-center">
                            <p className="text-[10px] text-zinc-400">{label}</p>
                            <p className="text-xs font-bold text-zinc-700">{val}/5</p>
                          </div>
                        ))}
                        {fb.would_rehire && (
                          <div className="text-center ml-auto">
                            <p className="text-[10px] text-zinc-400">Would rehire</p>
                            <p className={`text-xs font-bold ${fb.would_rehire === "yes" ? "text-green-600" : fb.would_rehire === "maybe" ? "text-amber-600" : "text-red-500"}`}>
                              {fb.would_rehire === "yes" ? "Yes" : fb.would_rehire === "maybe" ? "Maybe" : "No"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Right / sidebar — first on mobile, last column on desktop */}
        <div className="space-y-6 order-first lg:order-none">

          {/* CTA card */}
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 lg:sticky lg:top-6">
            <h3 className="font-extrabold text-zinc-900 text-base mb-1">Work with {designer.full_name.split(" ")[0]}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-5">
              We'll match you with the right talent for your project — free consultation, no commitment.
            </p>
            <Link
              href="/get-started/client"
              className="block w-full text-center px-5 py-3 rounded-full text-sm font-bold transition-colors"
              style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
            >
              Start a project →
            </Link>
            <p className="text-[10px] text-zinc-400 text-center mt-3">Free to start · Response within 24h</p>
          </div>

          {/* Links */}
          {(designer.portfolio_url || designer.social_url) && (
            <div className="rounded-2xl border border-zinc-100 bg-white p-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Portfolio & Links</h3>
              <div className="space-y-2">
                {designer.portfolio_url && !designer.portfolio_url.startsWith("[PDF") && (
                  <a
                    href={designer.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-zinc-700 hover:text-[#0d2318] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 8h6M8 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Portfolio
                  </a>
                )}
                {designer.social_url && (
                  <a
                    href={designer.social_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-zinc-700 hover:text-[#0d2318] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 2c0 0-2 2-2 6s2 6 2 6M8 2c0 0 2 2 2 6s-2 6-2 6M2 8h12" strokeLinecap="round"/></svg>
                    LinkedIn / Social
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Verified badge */}
          <div className="rounded-2xl border border-[#6dcc46]/30 bg-[#6dcc46]/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10 5.5L15 6.3L11.5 9.7L12.4 14.7L8 12.3L3.6 14.7L4.5 9.7L1 6.3L6 5.5L8 1Z" fill="#6dcc46" stroke="#6dcc46" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs font-bold text-[#0d2318]">Verified & Vetted</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              This designer passed our manual vetting process including portfolio review and professional assessment.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="border-t border-zinc-100" style={{ backgroundColor: "#0d2318" }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-black text-white text-xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              Ready to work with {designer.full_name.split(" ")[0]}?
            </h2>
            <p className="text-white/50 text-sm mt-1">Start a brief and we'll set everything up — no upfront cost.</p>
          </div>
          <Link
            href="/get-started/client"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors"
            style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
          >
            Get started →
          </Link>
        </div>
      </div>

    </div>
  );
}
