import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const reasons = [
  {
    icon: "✦",
    title: "World-Class Talent",
    body: "Ethiopia's design scene is producing graduates trained in the same tools and principles as designers anywhere in the world.",
  },
  {
    icon: "◈",
    title: "Exceptional Value",
    body: "Get senior-level creative work at a fraction of the cost of Western agencies — without compromising on quality.",
  },
  {
    icon: "⬡",
    title: "English Proficient",
    body: "Clear communication from day one. Ethiopian designers are fluent in English and collaborate seamlessly across time zones.",
  },
  {
    icon: "◎",
    title: "Vetted & Reliable",
    body: "Every designer on the platform is reviewed for skill, professionalism, and portfolio quality before being listed.",
  },
];

const featured = [
  {
    initials: "AD",
    name: "Abebe Dereje",
    specialty: "Brand Identity & UI",
    tags: ["Figma", "Branding", "Systems"],
    rate: "$25/hr",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    initials: "SM",
    name: "Sara Mulugeta",
    specialty: "Product & UX Design",
    tags: ["UX Research", "Prototyping", "Figma"],
    rate: "$30/hr",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    initials: "YT",
    name: "Yonas Tesfaye",
    specialty: "Motion & Visual Design",
    tags: ["After Effects", "Illustration", "3D"],
    rate: "$28/hr",
    color: "bg-amber-100 text-amber-700",
  },
];

const categories = [
  { label: "UI / UX Design", count: "24 designers", icon: "⬡" },
  { label: "Brand Identity", count: "18 designers", icon: "◈" },
  { label: "Illustration", count: "12 designers", icon: "✦" },
  { label: "Motion Graphics", count: "9 designers", icon: "◎" },
  { label: "Web Design", count: "21 designers", icon: "▣" },
  { label: "Product Design", count: "15 designers", icon: "◐" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <FeaturedSection />
      <CategoriesSection />
      <CtaSection />
    </>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <div className="relative max-w-6xl mx-auto px-4 py-28 flex flex-col items-center text-center gap-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-500 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Now accepting new businesses — get matched in 48 hrs
        </div>
        <h1 className="max-w-3xl text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
          Hire Ethiopia&apos;s{" "}
          <span className="relative">
            <span className="relative z-10 text-indigo-600">Best Designers</span>
            <span
              aria-hidden
              className="absolute bottom-1 left-0 right-0 h-3 -z-0 bg-indigo-100 rounded"
            />
          </span>
        </h1>
        <p className="max-w-xl text-lg text-gray-500 leading-relaxed">
          A curated marketplace connecting growing businesses with vetted
          Ethiopian designers. Senior-level work. Transparent pricing.
          Zero agency markup.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Link
            href="/designers"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Browse Designers
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-gray-200 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Talk to Us
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-6 text-sm text-gray-400">
          {[
            ["100+", "Vetted designers"],
            ["50+", "Businesses served"],
            ["4.9★", "Average rating"],
          ].map(([stat, label]) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-xl font-bold text-gray-900">{stat}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">
            Why Ethiopia
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            The smarter way to hire creative talent
          </h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Ethiopian designers bring a rare combination of craft, value, and
            professionalism that growing businesses need.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-2xl text-indigo-500">{r.icon}</span>
              <h3 className="mt-4 font-semibold text-gray-900 text-base">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {r.body}
              </p>
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
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">
              Featured
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Meet a few of our designers
            </h2>
          </div>
          <Link
            href="/designers"
            className="hidden sm:inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featured.map((d) => (
            <div
              key={d.name}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-5">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm ${d.color}`}
                >
                  {d.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{d.name}</p>
                  <p className="text-xs text-gray-400">{d.specialty}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {d.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {d.rate}
                </span>
                <Link
                  href={`/designers/${d.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs font-medium text-indigo-600 group-hover:underline"
                >
                  View profile →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/designers"
            className="text-sm font-medium text-indigo-600"
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
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">
            Categories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Find the right skill set
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href="/designers"
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <span className="text-2xl text-indigo-400">{cat.icon}</span>
              <span className="text-xs font-semibold text-gray-800 leading-snug">
                {cat.label}
              </span>
              <span className="text-xs text-gray-400">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-indigo-600 py-24">
      <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Ready to work with exceptional designers?
        </h2>
        <p className="text-indigo-200 text-lg max-w-xl leading-relaxed">
          Post your project and get matched with a vetted Ethiopian designer
          within 48 hours. No upfront fees.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/designers"
            className="px-7 py-3 bg-white text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Browse Designers
          </Link>
          <Link
            href="/contact"
            className="px-7 py-3 border border-indigo-400 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Get Matched
          </Link>
        </div>
      </div>
    </section>
  );
}
