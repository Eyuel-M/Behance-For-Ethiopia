import Link from "next/link";

const sections = [
  {
    href: "/resources/digital-assets",
    accent: "bg-green-500",
    accentText: "text-green-600",
    accentLight: "bg-green-50",
    label: "Digital Assets",
    headline: "The designer's toolkit",
    description:
      "Every resource you need to build beautiful work — mockups, 3D assets, icon sets, font libraries, UI kits, textures, and premium design tools.",
    tags: ["Mockups", "3D Assets", "Icons", "Fonts", "UI Kits", "Textures", "Stock Media", "Design Tools"],
    count: "100+ resources",
    gradient: "from-green-500/10 to-transparent",
  },
  {
    href: "/resources/courses",
    accent: "bg-blue-500",
    accentText: "text-blue-600",
    accentLight: "bg-blue-50",
    label: "Courses & Learning",
    headline: "Level up your craft",
    description:
      "Curated learning platforms and courses for every stage of your design career — from fundamentals to advanced motion, 3D, and design business.",
    tags: ["UI/UX", "Brand Identity", "Motion Graphics", "Typography", "3D Design", "Freelancing"],
    count: "40+ platforms",
    gradient: "from-blue-500/10 to-transparent",
  },
  {
    href: "/resources/insights",
    accent: "bg-amber-500",
    accentText: "text-amber-600",
    accentLight: "bg-amber-50",
    label: "Insights & News",
    headline: "Stay ahead of the curve",
    description:
      "The best design publications, YouTube channels, newsletters, and communities to keep you inspired and informed about what's happening in the industry.",
    tags: ["Publications", "YouTube", "Newsletters", "Communities", "Trends", "Case Studies"],
    count: "30+ sources",
    gradient: "from-amber-500/10 to-transparent",
  },
  {
    href: "/resources/jobs",
    accent: "bg-purple-500",
    accentText: "text-purple-600",
    accentLight: "bg-purple-50",
    label: "Jobs & Opportunities",
    headline: "Find your next project",
    description:
      "Job boards, freelance platforms, and career tools curated specifically for designers — including the best remote opportunities and the Ethiopian design market.",
    tags: ["Job Boards", "Freelance", "Remote Work", "Ethiopian Market", "Career Tips"],
    count: "25+ platforms",
    gradient: "from-purple-500/10 to-transparent",
  },
];

function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-zinc-50">

      {/* Hero */}
      <div className="bg-zinc-900 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-4">
            Designer Resources
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5">
            Everything a designer<br />needs to thrive
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A curated library of tools, courses, publications, and opportunities — built specifically
            for Ethiopian designers and the businesses that work with them.
          </p>
        </div>
      </div>

      {/* Section grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col sm:flex-row gap-6 sm:gap-10 items-start bg-white rounded-2xl border border-zinc-100 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 transition-all duration-200 p-7 cursor-pointer overflow-hidden relative"
          >
            {/* Gradient bleed */}
            <div className={`absolute inset-y-0 left-0 w-48 bg-gradient-to-r ${s.gradient} pointer-events-none`} />

            {/* Left: accent + label */}
            <div className="relative shrink-0">
              <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${s.accent} text-white`}>
                <span className="text-lg font-extrabold">{s.label[0]}</span>
              </span>
              <p className={`text-xs font-bold uppercase tracking-widest mt-3 ${s.accentText}`}>
                {s.count}
              </p>
            </div>

            {/* Center: content */}
            <div className="relative flex-1 min-w-0">
              <h2 className="text-xl font-extrabold text-zinc-900 mb-1">{s.label}</h2>
              <p className="text-sm font-medium text-zinc-500 mb-1">{s.headline}</p>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xl mb-4">{s.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <span key={tag} className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${s.accentLight} ${s.accentText}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="relative shrink-0 self-center text-zinc-300 group-hover:text-zinc-700 group-hover:translate-x-1 transition-all duration-200">
              <ArrowRightIcon />
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-zinc-200 bg-white py-14 text-center">
        <p className="text-sm text-zinc-400 mb-2">Missing a resource?</p>
        <Link
          href="/contact"
          className="text-sm font-semibold text-green-700 hover:text-green-900 transition-colors cursor-pointer"
        >
          Suggest a resource →
        </Link>
      </div>
    </div>
  );
}
