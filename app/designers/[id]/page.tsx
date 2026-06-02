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
      <circle cx="12" cy="12" r="10" fill="#d97706" />
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
    <div className="min-h-screen bg-stone-50">
      <HeroSection designer={designer} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-16">
        <BioSection designer={designer} />
        <SkillsSection designer={designer} />
        <PortfolioSection portfolio={designer.portfolio} />
      </div>
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
    <div className="relative bg-stone-900 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 0% 50%, rgba(161,98,7,0.2) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Back link */}
        <Link
          href="/designers"
          className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-200 text-sm transition-colors duration-150 cursor-pointer mb-8"
        >
          <ArrowLeftIcon />
          All designers
        </Link>

        <div className="flex flex-col sm:flex-row gap-6 sm:items-end">
          {/* Avatar */}
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0 ${avatarColor} ${avatarText}`}
          >
            {initials}
          </div>

          {/* Name block */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {name}
              </h1>
              <span title="Vetted designer">
                <CheckBadgeIcon />
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  available
                    ? "bg-emerald-900/60 text-emerald-300"
                    : "bg-stone-800 text-stone-400"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${available ? "bg-emerald-400" : "bg-stone-500"}`} />
                {available ? "Available" : "Booked"}
              </span>
            </div>
            <p className="text-amber-400 font-medium text-sm">{category}</p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-stone-400">
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

          {/* Stats card */}
          <div className="flex sm:flex-col gap-5 sm:gap-3 shrink-0 rounded-xl border border-stone-700 bg-stone-800/60 backdrop-blur-sm px-5 py-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-0.5">
                <StarIcon />
                <span className="text-white font-bold">{rating.toFixed(1)}</span>
              </div>
              <p className="text-xs text-stone-400">{reviewCount} reviews</p>
            </div>
            <div className="hidden sm:block h-px bg-stone-700" />
            <div className="text-center">
              <p className="text-white font-bold">${rate}<span className="text-stone-400 text-xs font-normal">/hr</span></p>
              <p className="text-xs text-stone-400">Hourly rate</p>
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
      <h2 id="bio-heading" className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">
        About
      </h2>
      <p className="text-stone-600 text-base leading-relaxed max-w-3xl">
        {designer.bio}
      </p>
    </section>
  );
}

function SkillsSection({ designer }: { designer: Designer }) {
  return (
    <section aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-4">
        Skills
      </h2>
      <div className="flex flex-wrap gap-2">
        {designer.skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 text-sm font-medium shadow-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

function PortfolioSection({ portfolio }: { portfolio: PortfolioItem[] }) {
  return (
    <section aria-labelledby="portfolio-heading">
      <h2 id="portfolio-heading" className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-6">
        Portfolio
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 cursor-default">
      {/* Gradient preview */}
      <div className={`h-44 bg-gradient-to-br ${item.gradient}`} />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors duration-200 rounded-2xl" />

      {/* Info footer */}
      <div className="px-4 py-3 border-t border-stone-100">
        <p className="text-sm font-semibold text-stone-900 truncate">{item.title}</p>
        <p className="text-xs text-stone-400 mt-0.5">{item.category}</p>
      </div>
    </div>
  );
}

function ContactCta({ designer }: { designer: Designer }) {
  return (
    <div className="relative overflow-hidden bg-stone-900 py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(161,98,7,0.25) 0%, transparent 65%)",
        }}
      />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
          Ready to work together?
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Hire {designer.name.split(" ")[0]} for your next project
        </h2>
        <p className="text-stone-400 text-base max-w-md leading-relaxed">
          {designer.available
            ? `${designer.name.split(" ")[0]} is currently available and taking on new clients.`
            : `${designer.name.split(" ")[0]} is currently booked but you can get in touch to discuss future availability.`}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-500 transition-colors duration-150 cursor-pointer shadow-lg shadow-amber-900/30"
          >
            Get in Touch
            <ArrowRightIcon />
          </Link>
          <Link
            href="/designers"
            className="inline-flex items-center justify-center px-7 py-3 rounded-lg border border-stone-600 text-stone-300 text-sm font-medium hover:bg-stone-800 transition-colors duration-150 cursor-pointer"
          >
            Browse Other Designers
          </Link>
        </div>
      </div>
    </div>
  );
}
