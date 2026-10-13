import type { Metadata } from "next";
import { FadeUp } from "@/components/Motion";
import { getDesignerApplications } from "@/lib/supabase/admin-queries";
import DesignersGrid from "@/components/DesignersGrid";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Designers",
  description: "Meet the vetted Ethiopian creatives in our network — branding, UI/UX, architecture visualization, motion graphics, and more.",
  alternates: { canonical: "/designers" },
};

function shortSpecialty(s: string): string {
  if (s.toLowerCase().includes("brand")) return "Branding";
  if (s.toLowerCase().includes("ui") || s.toLowerCase().includes("ux") || s.toLowerCase().includes("product")) return "UI/UX";
  if (s.toLowerCase().includes("motion") || s.toLowerCase().includes("animation")) return "Motion";
  if (s.toLowerCase().includes("print") || s.toLowerCase().includes("marketing")) return "Print";
  if (s.toLowerCase().includes("web") || s.toLowerCase().includes("digital")) return "Web";
  if (s.toLowerCase().includes("arch") || s.toLowerCase().includes("3d") || s.toLowerCase().includes("render")) return "3D / Arch";
  if (s.toLowerCase().includes("photo")) return "Photography";
  if (s.toLowerCase().includes("illus")) return "Illustration";
  return s.split(/[&·,]/)[0].trim();
}

export default async function DesignersPage() {
  const applications = await getDesignerApplications();
  const approved = applications.filter((d) => d.status === "approved");

  const specialties = Array.from(
    new Set(approved.map((d) => shortSpecialty(d.specialty)))
  ).sort();

  const cards = approved.map((d) => ({
    id: d.id,
    full_name: d.full_name,
    specialty: d.specialty,
    city: d.city,
    experience: d.experience,
    bio: d.bio,
    skills: d.skills,
    availability: d.availability,
  }));

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
          <DesignersGrid designers={cards} specialties={specialties} />
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
