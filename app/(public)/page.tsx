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
    bg: "bg-green-100",
    text: "text-green-800",
    slug: "abebe-dereje",
  },
  {
    initials: "SM",
    name: "Sara Mulugeta",
    specialty: "Product & UX Design",
    tags: ["UX Research", "Prototyping", "Figma"],
    rate: "$30 / hr",
    rating: 5.0,
    bg: "bg-zinc-200",
    text: "text-zinc-800",
    slug: "sara-mulugeta",
  },
  {
    initials: "YT",
    name: "Yonas Tesfaye",
    specialty: "Motion & Visual Design",
    tags: ["After Effects", "Illustration", "3D"],
    rate: "$28 / hr",
    rating: 4.8,
    bg: "bg-emerald-100",
    text: "text-emerald-800",
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
    <section className="bg-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16 sm:pb-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-black/10 px-4 py-1.5 text-xs font-semibold text-black/80 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-black/60 animate-pulse" />
          Now matching businesses — get connected in 48 hours
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-black leading-[0.95] max-w-4xl mb-6">
          The fastest way to hire Ethiopia&apos;s best designers
        </h1>

        {/* Subheadline */}
        <p className="max-w-lg text-base sm:text-lg text-black/75 leading-relaxed mb-8">
          A curated marketplace of vetted Ethiopian designers. Senior-level
          creative work, transparent pricing, zero agency markup.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Link
            href="/designers"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-zinc-800 transition-colors duration-150 cursor-pointer"
          >
            Browse Designers
            <ArrowRightIcon />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-black/60 text-black text-sm font-semibold hover:bg-black/10 transition-colors duration-150 cursor-pointer"
          >
            Talk to Us
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-2.5 text-sm text-black/70">
          <div className="flex -space-x-2">
            {["AB", "SM", "YT", "KD"].map((init) => (
              <span
                key={init}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/20 border-2 border-green-500 text-xs font-semibold text-black"
              >
                {init}
              </span>
            ))}
          </div>
          <span>
            Trusted by{" "}
            <span className="font-bold text-black">50+ businesses</span>{" "}
            across Ethiopia
          </span>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <div className="bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-zinc-100">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-10 gap-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-zinc-900">{value}</span>
              <span className="text-xs sm:text-sm text-zinc-400 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhySection() {
  return (
    <section className="bg-zinc-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            Why Ethiopia
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
            The smarter way to hire design talent
          </h2>
          <p className="mt-4 text-zinc-500 max-w-lg text-base leading-relaxed">
            Ethiopian designers bring a rare combination of craft, value, and
            professionalism that fast-growing businesses need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200 cursor-default"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 text-green-700 mb-4">
                <Icon />
              </span>
              <h3 className="font-bold text-zinc-900 text-base mb-2">
                {title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
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
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
              Featured
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
              Meet a few of our designers
            </h2>
          </div>
          <Link
            href="/designers"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors duration-150 cursor-pointer"
          >
            View all <ArrowRightIcon />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {featured.map((d) => (
            <Link
              key={d.slug}
              href={`/designers/${d.slug}`}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-200 cursor-pointer"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${d.bg} ${d.text}`}
                >
                  {d.initials}
                </div>
                <div>
                  <p className="font-bold text-zinc-900 text-sm leading-tight">
                    {d.name}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {d.specialty}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {d.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer row */}
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                <span className="text-sm font-bold text-zinc-900">
                  {d.rate}
                </span>
                <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
                  <StarIcon />
                  <span>{d.rating.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/designers"
            className="text-sm font-semibold text-zinc-700 hover:text-zinc-900 cursor-pointer"
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
    <section className="bg-zinc-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            Categories
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
            Find the right skill set
          </h2>
          <p className="mt-4 text-zinc-500 max-w-md text-base">
            Browse designers by discipline and find the exact expertise your
            project needs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ label, count, Icon }) => (
            <Link
              key={label}
              href="/designers"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm hover:shadow-md hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 text-zinc-600 group-hover:bg-green-100 group-hover:text-green-700 transition-colors duration-200">
                <Icon />
              </span>
              <span className="text-xs font-bold text-zinc-800 leading-snug">
                {label}
              </span>
              <span className="text-xs text-zinc-400">{count} designers</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-zinc-900 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-green-400">
          Ready to hire?
        </p>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Work with exceptional designers — matched in 48 hours
        </h2>
        <p className="text-zinc-400 text-base max-w-xl leading-relaxed">
          Tell us about your project and we&apos;ll connect you with the right
          vetted Ethiopian designer. No upfront fees, no agency overhead.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-1">
          <Link
            href="/designers"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-green-500 text-black text-sm font-semibold hover:bg-green-400 transition-colors duration-150 cursor-pointer"
          >
            Browse Designers
            <ArrowRightIcon />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-zinc-600 text-white text-sm font-semibold hover:bg-zinc-800 hover:border-zinc-500 transition-colors duration-150 cursor-pointer"
          >
            Get Matched
          </Link>
        </div>
      </div>
    </section>
  );
}
