import Link from "next/link";
import { notFound } from "next/navigation";
import { getDesignerBySlug } from "@/lib/supabase/queries";
import type { Designer, PortfolioItem } from "@/lib/types";

export const dynamic = "force-dynamic";

// ─── Icons ────────────────────────────────────────────────────────────────────

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CheckBadgeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#22c55e" />
      <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ id: string }> };

export default async function DesignerProfilePage({ params }: Props) {
  const { id } = await params;
  const designer = await getDesignerBySlug(id);
  if (!designer) notFound();

  return (
    <div className="min-h-screen bg-zinc-50">
      <HeroSection designer={designer} />

      {/* Narrow content: bio + skills */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-14 pb-8 space-y-14">
        <BioSection designer={designer} />
        <SkillsSection designer={designer} />
      </div>

      {/* Full-width portfolio showcase */}
      <PortfolioSection portfolio={designer.portfolio} />

      <ContactCta designer={designer} />
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection({ designer }: { designer: Designer }) {
  const {
    name, category, location, experience,
    rating, reviewCount, rate, available,
    avatarColor, avatarText,
  } = designer;

  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="relative bg-zinc-900 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 0% 50%, rgba(34,197,94,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/designers"
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 text-sm transition-colors duration-150 cursor-pointer mb-8"
        >
          <ArrowLeftIcon />
          All designers
        </Link>

        <div className="flex flex-col sm:flex-row gap-6 sm:items-end">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 ${avatarColor} ${avatarText}`}
          >
            {initials}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {name}
              </h1>
              <span title="Vetted designer">
                <CheckBadgeIcon />
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  available
                    ? "bg-green-900/60 text-green-300"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${available ? "bg-green-400" : "bg-zinc-500"}`} />
                {available ? "Available" : "Booked"}
              </span>
            </div>
            <p className="text-green-400 font-semibold text-sm">{category}</p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-zinc-400">
              <span className="flex items-center gap-1.5">
                <MapPinIcon />
                {location}
              </span>
              <span className="flex items-center gap-1.5">
                <BriefcaseIcon />
                {experience} years experience
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col gap-5 sm:gap-3 shrink-0 rounded-xl border border-zinc-700 bg-zinc-800/60 backdrop-blur-sm px-5 py-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-400 mb-0.5">
                <StarIcon />
                <span className="text-white font-bold">{rating.toFixed(1)}</span>
              </div>
              <p className="text-xs text-zinc-400">{reviewCount} reviews</p>
            </div>
            <div className="hidden sm:block h-px bg-zinc-700" />
            <div className="text-center">
              <p className="text-white font-bold">${rate}<span className="text-zinc-400 text-xs font-normal">/hr</span></p>
              <p className="text-xs text-zinc-400">Hourly rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BioSection({ designer }: { designer: Designer }) {
  return (
    <section aria-labelledby="bio-heading">
      <h2 id="bio-heading" className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">
        About
      </h2>
      <p className="text-zinc-600 text-base leading-relaxed max-w-3xl">
        {designer.bio}
      </p>
    </section>
  );
}

function SkillsSection({ designer }: { designer: Designer }) {
  return (
    <section aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">
        Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {designer.skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-700 text-sm font-medium shadow-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── Portfolio (full-width, Behance-style editorial grid) ─────────────────────

function PortfolioSection({ portfolio }: { portfolio: PortfolioItem[] }) {
  if (!portfolio.length) return null;

  return (
    <section aria-labelledby="portfolio-heading" className="bg-white py-16 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-baseline justify-between mb-10">
          <h2
            id="portfolio-heading"
            className="text-xs font-semibold uppercase tracking-widest text-green-600"
          >
            Portfolio
          </h2>
          <span className="text-xs text-zinc-400 tabular-nums">{portfolio.length} works</span>
        </div>

        {/*
          Editorial grid layout:
          — Item 0 (hero):    full width,    very tall
          — Items 1–2:        2 columns,     medium tall
          — Items 3–5:        3 columns,     standard
        */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 sm:gap-5">
          {portfolio.map((item, i) => {
            const isHero = i === 0;
            const isMid = i === 1 || i === 2;

            const colClass = isHero
              ? "sm:col-span-6"
              : isMid
              ? "sm:col-span-3"
              : "sm:col-span-2";

            const heightClass = isHero
              ? "h-64 sm:h-[30rem]"
              : isMid
              ? "h-56 sm:h-80"
              : "h-48 sm:h-60";

            return (
              <div key={item.id} className={`group ${colClass}`}>
                {/* Gradient artwork block */}
                <div className={`relative ${heightClass} rounded-2xl overflow-hidden cursor-default`}>
                  {/* Gradient fills and zooms on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500 ease-out group-hover:scale-105`}
                  />
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  {/* Category chip — always visible */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/40 text-white text-xs font-medium backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Title below the artwork — always visible, Behance style */}
                <div className="mt-3 px-0.5">
                  <p className="font-semibold text-zinc-900 text-sm leading-snug group-hover:text-green-700 transition-colors duration-150">
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Contact CTA ──────────────────────────────────────────────────────────────

function ContactCta({ designer }: { designer: Designer }) {
  return (
    <div className="bg-zinc-900 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-green-400">
          Ready to work together?
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Hire {designer.name.split(" ")[0]} for your next project
        </h2>
        <p className="text-zinc-400 text-base max-w-md leading-relaxed">
          {designer.available
            ? `${designer.name.split(" ")[0]} is currently available and taking on new clients.`
            : `${designer.name.split(" ")[0]} is currently booked but you can get in touch to discuss future availability.`}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-green-500 text-black text-sm font-semibold hover:bg-green-400 transition-colors duration-150 cursor-pointer"
          >
            Get in Touch
            <ArrowRightIcon />
          </Link>
          <Link
            href="/designers"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-zinc-600 text-zinc-300 text-sm font-semibold hover:bg-zinc-800 transition-colors duration-150 cursor-pointer"
          >
            Browse Other Designers
          </Link>
        </div>
      </div>
    </div>
  );
}
