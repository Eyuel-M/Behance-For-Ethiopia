import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";
import { getDesignerApplications } from "@/lib/supabase/admin-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Designers",
  description: "Meet the vetted Ethiopian creatives in our network — branding, UI/UX, architecture visualization, motion graphics, and more.",
  alternates: { canonical: "/designers" },
};

// Deterministic avatar colour from name
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

export default async function DesignersPage() {
  const applications = await getDesignerApplications();
  const approved = applications.filter((d) => d.status === "approved");

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <FadeUp>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">The Network</p>
            </div>
            <h1
              className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Meet some of<br />
              <span style={{ color: "#6dcc46" }}>our designers.</span>
            </h1>
            <p className="text-white/50 text-base max-w-md leading-relaxed">
              Every designer here passed a manual vetting process. Real portfolios, real reliability, real results.
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="flex items-center gap-8 mt-10">
            {[
              { value: "50+", label: "Vetted designers" },
              { value: "70%", label: "Applicants rejected" },
              { value: "4.9", label: "Average rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-display), sans-serif" }}>{stat.value}</p>
                <p className="text-xs text-white/35 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        {approved.length === 0 ? (
          <p className="text-zinc-400 text-sm text-center py-16">Profiles coming soon.</p>
        ) : (
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {approved.map((d) => {
              const { bg, color } = avatarStyle(d.full_name);
              const inits = initials(d.full_name);
              const skills = d.skills.split(",").map((s) => s.trim()).filter(Boolean);
              return (
                <StaggerItem key={d.id}>
                  <Link
                    href={`/designers/${d.id}`}
                    className="group rounded-2xl border border-zinc-100 bg-white overflow-hidden hover:shadow-md hover:border-zinc-200 transition-all duration-200 flex flex-col h-full"
                  >
                    {/* Avatar strip */}
                    <div className="h-24 flex items-end p-4" style={{ backgroundColor: bg }}>
                      <span
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm"
                        style={{ backgroundColor: `${color}20`, color, border: `2px solid ${color}30` }}
                      >
                        {inits}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-extrabold text-zinc-900 text-sm leading-snug mb-0.5">{d.full_name}</h3>
                      <p className="text-xs font-semibold text-[#6dcc46] mb-1">{d.specialty}</p>
                      <p className="text-xs text-zinc-400 mb-3">{d.city} · {d.experience}</p>
                      <p className="text-xs text-zinc-500 leading-relaxed mb-4 flex-1 line-clamp-3">{d.bio}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {skills.slice(0, 3).map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-500">{s}</span>
                        ))}
                        {skills.length > 3 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-400">+{skills.length - 3}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                        <span className="text-xs text-zinc-400">{d.availability}</span>
                        <span className="text-xs font-bold text-[#0d2318] group-hover:text-[#6dcc46] transition-colors">
                          View profile →
                        </span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        )}
      </div>

      {/* ── Apply CTA ── */}
      <div className="border-t border-zinc-100" style={{ backgroundColor: "#0d2318" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-black text-white text-xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              Are you a designer?
            </h2>
            <p className="text-white/50 text-sm mt-1">Apply to join the network. Free to apply — response within 3–5 days.</p>
          </div>
          <Link
            href="/get-started/designer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors"
            style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
          >
            Apply to the Network →
          </Link>
        </div>
      </div>

    </div>
  );
}
