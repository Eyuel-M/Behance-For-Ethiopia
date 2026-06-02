import Link from "next/link";

// ─── SVG Icons (stroke-based, 20×20, strokeWidth 1.5) ─────────────────────────

function AwardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function CoinsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

function PlayCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
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

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const reasons = [
  {
    Icon: AwardIcon,
    title: "World-Class Talent",
    body: "Ethiopian designers are trained in the same tools and principles as designers anywhere in the world — with portfolios to prove it.",
  },
  {
    Icon: CoinsIcon,
    title: "Exceptional Value",
    body: "Get senior-level creative work at a fraction of Western agency costs, without compromising on quality or professionalism.",
  },
  {
    Icon: ChatIcon,
    title: "Fluent Collaboration",
    body: "Clear English communication, fast response times, and a strong work ethic make every project smooth from brief to delivery.",
  },
  {
    Icon: ShieldIcon,
    title: "Vetted & Trusted",
    body: "Every designer on the platform is manually reviewed for skill, reliability, and portfolio quality before being accepted.",
  },
];

const featured = [
  {
    initials: "AD",
    name: "Abebe Dereje",
    specialty: "Brand Identity & UI Design",
    tags: ["Figma", "Branding", "Systems"],
    rate: "$25 / hr",
    rating: 4.9,
    bg: "bg-amber-100",
    text: "text-amber-800",
    slug: "abebe-dereje",
  },
  {
    initials: "SM",
    name: "Sara Mulugeta",
    specialty: "Product & UX Design",
    tags: ["UX Research", "Prototyping", "Figma"],
    rate: "$30 / hr",
    rating: 5.0,
    bg: "bg-stone-200",
    text: "text-stone-800",
    slug: "sara-mulugeta",
  },
  {
    initials: "YT",
    name: "Yonas Tesfaye",
    specialty: "Motion & Visual Design",
    tags: ["After Effects", "Illustration", "3D"],
    rate: "$28 / hr",
    rating: 4.8,
    bg: "bg-orange-100",
    text: "text-orange-800",
    slug: "yonas-tesfaye",
  },
];

const categories = [
  { label: "UI / UX Design", count: 24, Icon: LayersIcon },
  { label: "Brand Identity", count: 18, Icon: PaletteIcon },
  { label: "Illustration", count: 12, Icon: PenIcon },
  { label: "Motion Graphics", count: 9, Icon: PlayCircleIcon },
  { label: "Web Design", count: 21, Icon: GlobeIcon },
  { label: "Product Design", count: 15, Icon: BoxIcon },
];

const stats = [
  { value: "100+", label: "Vetted designers" },
  { value: "50+", label: "Businesses served" },
  { value: "4.9", label: "Average rating" },
  { value: "48h", label: "Avg. match time" },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <WhySection />
      <FeaturedSection />
      <CategoriesSection />
      <CtaSection />
    </>
  );
}

// ─── Sections ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-stone-900">
      {/* Radial gradient atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(161,98,7,0.25) 0%, transparent 70%)",
        }}
      />
      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #78716c 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28 sm:py-36 flex flex-col items-center text-center gap-7">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-800/60 px-4 py-1.5 text-xs font-medium text-stone-300 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          Now matching businesses — get connected in 48 hours
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          The fastest way to hire{" "}
          <span className="text-amber-400">
            Ethiopia&apos;s best
          </span>{" "}
          designers
        </h1>

        {/* Subheadline */}
        <p className="max-w-xl text-base sm:text-lg text-stone-400 leading-relaxed">
          A curated marketplace of vetted Ethiopian designers. Senior-level
          creative work, transparent pricing, zero agency markup.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-1">
          <Link
            href="/designers"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-500 transition-colors duration-150 cursor-pointer shadow-lg shadow-amber-900/30"
          >
            Browse Designers
            <ArrowRightIcon />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-stone-600 bg-stone-800/50 text-stone-200 text-sm font-medium hover:bg-stone-700/60 hover:border-stone-500 transition-colors duration-150 cursor-pointer backdrop-blur-sm"
          >
            Talk to Us
          </Link>
        </div>

        {/* Social proof strip */}
        <div className="mt-4 flex items-center gap-2 text-sm text-stone-400">
          <div className="flex -space-x-2">
            {["AB", "SM", "YT", "KD"].map((init) => (
              <span
                key={init}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-stone-700 border-2 border-stone-900 text-xs font-medium text-stone-200"
              >
                {init}
              </span>
            ))}
          </div>
          <span>
            Trusted by{" "}
            <span className="text-stone-200 font-medium">50+ businesses</span>{" "}
            across Ethiopia
          </span>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5 py-1">
            <span className="text-2xl font-bold text-stone-900">{value}</span>
            <span className="text-xs text-stone-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhySection() {
  return (
    <section className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">
            Why Ethiopia
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            The smarter way to hire design talent
          </h2>
          <p className="mt-3 text-stone-500 max-w-lg mx-auto text-base leading-relaxed">
            Ethiopian designers bring a rare combination of craft, value, and
            professionalism that fast-growing businesses need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="group relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-stone-300 transition-all duration-200 cursor-default"
            >
              {/* Glass shimmer on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)",
                }}
              />
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-50 text-amber-700 mb-4">
                <Icon />
              </span>
              <h3 className="font-semibold text-stone-900 text-base mb-2">
                {title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">
              Featured
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Meet a few of our designers
            </h2>
          </div>
          <Link
            href="/designers"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-150 cursor-pointer"
          >
            View all <ArrowRightIcon />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {featured.map((d) => (
            <Link
              key={d.slug}
              href={`/designers/${d.slug}`}
              className="group relative rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-stone-300 transition-all duration-200 cursor-pointer overflow-hidden"
            >
              {/* Ambient gradient on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(251,243,219,0.5) 0%, transparent 70%)",
                }}
              />

              <div className="relative">
                {/* Avatar + name */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm ${d.bg} ${d.text}`}
                  >
                    {d.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm leading-tight">
                      {d.name}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {d.specialty}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {d.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between border-t border-stone-100 pt-4">
                  <span className="text-sm font-semibold text-stone-900">
                    {d.rate}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                    <StarIcon />
                    <span>{d.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/designers"
            className="text-sm font-medium text-stone-700 hover:text-stone-900 cursor-pointer"
          >
            View all designers →
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">
            Categories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Find the right skill set
          </h2>
          <p className="mt-3 text-stone-500 max-w-md mx-auto text-base">
            Browse designers by discipline and find the exact expertise your
            project needs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ label, count, Icon }) => (
            <Link
              key={label}
              href="/designers"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-stone-200 bg-white p-5 text-center shadow-sm hover:shadow-md hover:border-amber-200 hover:bg-amber-50/30 transition-all duration-200 cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-stone-100 text-stone-600 group-hover:bg-amber-100 group-hover:text-amber-700 transition-colors duration-200">
                <Icon />
              </span>
              <span className="text-xs font-semibold text-stone-800 leading-snug">
                {label}
              </span>
              <span className="text-xs text-stone-400">{count} designers</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-stone-900 py-24">
      {/* Amber glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 110%, rgba(161,98,7,0.3) 0%, transparent 65%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
          Ready to hire?
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          Work with exceptional designers — matched in 48 hours
        </h2>
        <p className="text-stone-400 text-base max-w-xl leading-relaxed">
          Tell us about your project and we&apos;ll connect you with the right
          vetted Ethiopian designer. No upfront fees, no agency overhead.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-1">
          <Link
            href="/designers"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-amber-600 text-white text-sm font-semibold hover:bg-amber-500 transition-colors duration-150 cursor-pointer shadow-lg shadow-amber-900/40"
          >
            Browse Designers
            <ArrowRightIcon />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3 rounded-lg border border-stone-600 text-stone-200 text-sm font-medium hover:bg-stone-800 hover:border-stone-500 transition-colors duration-150 cursor-pointer"
          >
            Get Matched
          </Link>
        </div>
      </div>
    </section>
  );
}
