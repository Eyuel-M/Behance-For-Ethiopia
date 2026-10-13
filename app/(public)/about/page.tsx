import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "About Us",
  description: "We are Ethiopia's first curated creative marketplace — hand-picking 2–3 vetted designers to pitch on every client brief. No open bidding. No cold searching.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    n: "01",
    title: "Curated, not crowdsourced",
    body: "Every designer in our network passed a manual review — portfolio, communication, and reliability. We reject over 70% of applicants. That's not elitism, it's how we protect your time.",
  },
  {
    n: "02",
    title: "A human in the middle",
    body: "Every brief gets reviewed by a real person before anything moves forward. We check feasibility, budget fit, and whether the right talent exists before making a match.",
  },
  {
    n: "03",
    title: "Ethiopia-first, globally capable",
    body: "We believe the talent is already here. Our job is to make it findable, trustworthy, and easy to hire — for local businesses and international clients alike.",
  },
  {
    n: "04",
    title: "Accountability built in",
    body: "Scope agreed means scope delivered. We track milestones, mediate disagreements, and stay involved until the work is complete. Not just a marketplace — a managed process.",
  },
];

const TEAM = [
  {
    initials: "EM",
    name: "Eyuel M.",
    role: "Founder & Creative Director",
    bio: "Spent a decade watching Ethiopian creative talent go unrecognised internationally. Built this to fix that. Previously led brand strategy at a Nairobi-based agency.",
  },
  {
    initials: "SK",
    name: "Sara K.",
    role: "Head of Talent & Vetting",
    bio: "Reviews every designer application personally. Former lecturer in visual communication at AAiT. Believes craft and reliability are equally non-negotiable.",
  },
  {
    initials: "DT",
    name: "Dawit T.",
    role: "Operations & Client Success",
    bio: "Makes sure every project that starts, finishes. Runs the matching process, manages timelines, and is the first call when anything goes sideways.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <FadeUp>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">Our Story</p>
            </div>
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              We built this because<br />
              <span style={{ color: "#6dcc46" }}>we saw a gap.</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              Ethiopian businesses were paying for mediocre work from overseas while world-class designers sat
              in Addis with no reliable way to reach them. That gap didn&apos;t need to exist.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── Story ── */}
      <section className="py-20 sm:py-28 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <h2
                className="text-3xl sm:text-4xl font-black text-[#0d2318] leading-tight"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                The talent was always here.
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="space-y-5 text-zinc-500 leading-relaxed">
                <p>
                  Ethiopia has a generation of designers, developers, architects, and brand strategists who are
                  producing work that competes internationally. The problem was never talent — it was trust and
                  discoverability.
                </p>
                <p>
                  Businesses couldn&apos;t find the right professional without months of cold outreach, bad referrals,
                  or paying inflated rates to agencies that outsourced the work anyway. Designers couldn&apos;t find
                  clients who matched their level without a personal network built over years.
                </p>
                <p>
                  We started this platform to solve both sides at once: a curated network where every designer is
                  verified, every brief is reviewed, and every project is tracked to completion. No cold searching.
                  No unqualified leads. Just good work, done right.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 sm:py-28 bg-zinc-50 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeUp className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">How we operate</p>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-black text-[#0d2318] leading-tight"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Four things we won&apos;t compromise on.
            </h2>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <StaggerItem
                key={v.n}
                className="rounded-2xl bg-white border border-zinc-100 p-8"
              >
                <span
                  className="text-xs font-black text-zinc-300 mb-4 block"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {v.n}
                </span>
                <h3 className="font-extrabold text-zinc-900 text-base mb-3">{v.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.body}</p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 sm:py-28 border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeUp className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">The team</p>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-black text-[#0d2318] leading-tight"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              People who care about craft.
            </h2>
          </FadeUp>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <StaggerItem
                key={member.name}
                className="rounded-2xl border border-zinc-100 bg-white p-7"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg mb-5"
                  style={{ backgroundColor: "#0d2318" }}
                >
                  {member.initials}
                </div>
                <h3 className="font-extrabold text-zinc-900 text-base">{member.name}</h3>
                <p className="text-xs font-semibold text-[#6dcc46] mb-3 mt-0.5">{member.role}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{member.bio}</p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: "#0d2318" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
          <FadeUp>
            <h2
              className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Ready to work with us?
            </h2>
            <p className="text-white/50 text-base max-w-md mx-auto mb-8 leading-relaxed">
              Submit a brief and a real person will review it within 48 hours. No commitment required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/get-started/client"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors"
                style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
              >
                Submit a Brief
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
