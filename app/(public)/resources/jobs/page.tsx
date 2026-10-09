import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

type JobType = "Full-time" | "Freelance" | "Both" | "Remote" | "Gig";

type Platform = {
  name: string;
  description: string;
  url: string;
  types: JobType[];
  free: boolean;
  highlight?: string;
  local?: boolean;
};

const platforms: { section: string; color: string; textColor: string; items: Platform[] }[] = [
  {
    section: "Design-Specific Job Boards",
    color: "bg-purple-500",
    textColor: "text-purple-600",
    items: [
      { name: "Behance Jobs", description: "Creative roles from established companies and agencies — direct connection to portfolio-driven hiring.", url: "https://www.behance.net/joblist", types: ["Full-time", "Freelance"], free: true, highlight: "Portfolio-linked" },
      { name: "Dribbble Jobs", description: "Design-focused job listings aggregated from top companies. Heavily UI/UX and product design oriented.", url: "https://dribbble.com/jobs", types: ["Full-time", "Freelance"], free: true },
      { name: "Working Not Working", description: "Premium marketplace connecting top creative talent with world-class agencies and brands.", url: "https://www.workingnot working.com", types: ["Full-time", "Freelance"], free: true, highlight: "Premium brands" },
      { name: "Design Jobs Board", description: "Dedicated board for graphic designers, UX designers, art directors, and creative roles.", url: "https://www.designjobsboard.com", types: ["Full-time", "Remote"], free: true },
      { name: "AIGA Design Jobs", description: "AIGA's curated job board for professional designers across all specialisations.", url: "https://designjobs.aiga.org", types: ["Full-time"], free: true },
    ],
  },
  {
    section: "Freelance Platforms",
    color: "bg-blue-500",
    textColor: "text-blue-600",
    items: [
      { name: "Contra", description: "Commission-free freelance platform — keep 100% of what you earn. Growing fast with quality clients.", url: "https://contra.com", types: ["Freelance"], free: true, highlight: "0% commission" },
      { name: "Toptal", description: "Exclusive network of the top 3% of global freelance talent. Rigorous screening, premium rates.", url: "https://www.toptal.com/designers", types: ["Freelance", "Remote"], free: true, highlight: "Top 3% only" },
      { name: "99designs", description: "Design contests and direct hire — good for building portfolio and finding first clients.", url: "https://99designs.com", types: ["Freelance", "Gig"], free: true },
      { name: "Upwork", description: "Largest general freelance marketplace. Competitive but high volume — good for building reviews.", url: "https://www.upwork.com", types: ["Freelance"], free: true },
      { name: "Fiverr", description: "Gig-based platform to offer packaged design services. High traffic, lower-to-mid pricing generally.", url: "https://www.fiverr.com", types: ["Gig"], free: true },
      { name: "PeoplePerHour", description: "Freelance marketplace popular in the UK/Europe with hourlies and project-based work.", url: "https://www.peopleperhour.com", types: ["Freelance"], free: true },
    ],
  },
  {
    section: "Remote Design Work",
    color: "bg-teal-500",
    textColor: "text-teal-600",
    items: [
      { name: "We Work Remotely", description: "One of the largest remote work communities — strong design and creative category.", url: "https://weworkremotely.com", types: ["Remote", "Full-time"], free: true, highlight: "Best remote board" },
      { name: "Remote.co", description: "Vetted remote job board with quality postings from established companies hiring globally.", url: "https://remote.co", types: ["Remote"], free: true },
      { name: "Remotive", description: "Curated remote tech and design job newsletter and board — updated frequently.", url: "https://remotive.com", types: ["Remote", "Full-time"], free: true },
      { name: "Himalayas", description: "Remote job board with strong filtering — stack, timezone, visa sponsorship, and more.", url: "https://himalayas.app", types: ["Remote", "Full-time"], free: true },
      { name: "Arc.dev", description: "Remote developer and designer marketplace with pre-screened candidates and clients.", url: "https://arc.dev", types: ["Remote", "Freelance"], free: true },
    ],
  },
  {
    section: "Ethiopian & African Market",
    color: "bg-green-500",
    textColor: "text-green-600",
    items: [
      { name: "Hire Ethiopia's Best", description: "Our platform — connecting vetted Ethiopian designers with local and international businesses. Apply to join or post a project.", url: "/get-started", types: ["Full-time", "Freelance", "Remote"], free: true, highlight: "You are here", local: true },
      { name: "EthioJobs", description: "Ethiopia's largest job portal — search for design and creative roles with local companies.", url: "https://ethiojobs.net", types: ["Full-time"], free: true, local: true },
      { name: "LinkedIn (Ethiopia)", description: "Filter for design roles in Ethiopia and across East Africa. Essential for building local professional network.", url: "https://linkedin.com/jobs", types: ["Full-time", "Freelance"], free: true, local: true },
      { name: "African Freelancers", description: "Pan-African freelance marketplace connecting African talent with local and diaspora businesses.", url: "https://africanfreelancers.com", types: ["Freelance"], free: true, local: true },
    ],
  },
  {
    section: "General Platforms with Strong Creative Categories",
    color: "bg-zinc-700",
    textColor: "text-zinc-600",
    items: [
      { name: "LinkedIn Jobs", description: "The world's largest professional network. Set up job alerts for 'UX Designer', 'Brand Designer', 'Creative Director'.", url: "https://www.linkedin.com/jobs", types: ["Full-time", "Freelance"], free: true },
      { name: "AngelList / Wellfound", description: "Startup-focused job board — great for designers who want equity, impact, and fast-paced teams.", url: "https://wellfound.com/jobs", types: ["Full-time"], free: true, highlight: "Startup equity" },
      { name: "Glassdoor", description: "Jobs plus salary data and company reviews — research before you apply.", url: "https://glassdoor.com", types: ["Full-time"], free: true },
    ],
  },
];

const tips = [
  { title: "Build your portfolio first", body: "Before applying anywhere, ensure your portfolio has 3–5 strong case studies. Explain your process, not just the output. A mediocre portfolio with great case studies beats a beautiful portfolio with no thinking shown." },
  { title: "Set rates for the Ethiopian market", body: "Ethiopian market rates typically range from $10–$40/hr for mid-level designers. For international remote work, research global rates on Levels.fyi and compare. Don't undersell — poor rates attract poor clients." },
  { title: "Specialize to earn more", body: "Generalists struggle to stand out. Pick a niche — fintech UI, Ethiopian brand identity, motion graphics for social — and become the obvious choice for that category of client." },
  { title: "Use LinkedIn actively", body: "Post your work weekly. Connect with Ethiopian founders, marketing directors, and CMOs. Comment thoughtfully on posts. Most designers who get consistent work have built an audience, not just a portfolio." },
  { title: "Start with local, expand globally", body: "Build credibility with Ethiopian businesses first. The case studies, reviews, and reputation you build locally are powerful anchors when reaching out to international clients." },
  { title: "Cold outreach works", body: "Identify 20 businesses whose brand doesn't match their product quality. Write a personalised email: what you noticed, what you'd change, why it matters. 1 in 10 will respond. That's a pipeline." },
];

function ArrowLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const typeColors: Record<JobType, string> = {
  "Full-time":  "bg-blue-50 text-blue-700",
  "Freelance":  "bg-purple-50 text-purple-700",
  "Both":       "bg-zinc-100 text-zinc-600",
  "Remote":     "bg-teal-50 text-teal-700",
  "Gig":        "bg-orange-50 text-orange-700",
};

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">

      {/* Hero */}
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <Link href="/resources" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-700 text-sm transition-colors duration-150 cursor-pointer mb-8">
            <ArrowLeftIcon /> All Resources
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">Jobs & Opportunities</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">Find your next project</h1>
          <p className="text-zinc-500 text-base max-w-xl leading-relaxed">
            The best platforms for Ethiopian designers to find full-time work, freelance clients,
            and remote opportunities — plus the career tips that actually move the needle.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { value: "25+", label: "Platforms listed" },
              { value: "4", label: "Ethiopian-specific sources" },
              { value: "6", label: "Career tips" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-zinc-900">{s.value}</p>
                <p className="text-xs text-zinc-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* Platform sections */}
        {platforms.map((section) => (
          <section key={section.section} aria-labelledby={`section-${section.section}`}>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-zinc-200">
              <div className={`w-2 h-6 rounded-full ${section.color}`} />
              <h2 id={`section-${section.section}`} className={`text-xs font-bold uppercase tracking-widest ${section.textColor}`}>
                {section.section}
              </h2>
            </div>

            <div className="space-y-3">
              {section.items.map((p) => {
                const cardClass = "group flex flex-col sm:flex-row sm:items-center gap-3 bg-white rounded-2xl border border-zinc-100 hover:border-zinc-300 hover:shadow-sm transition-all duration-150 cursor-pointer p-5";
                const inner = (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-zinc-900">{p.name}</p>
                        {p.highlight && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${p.local ? "bg-green-50 text-green-700" : "bg-zinc-100 text-zinc-600"}`}>
                            {p.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {p.types.map((t) => (
                        <span key={t} className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[t]}`}>
                          {t}
                        </span>
                      ))}
                      <span className="text-zinc-300 group-hover:text-zinc-500 ml-1 transition-colors">
                        <ExternalLinkIcon />
                      </span>
                    </div>
                  </>
                );

                return p.url.startsWith("/") ? (
                  <Link key={p.name} href={p.url} className={cardClass}>{inner}</Link>
                ) : (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-zinc-900">{p.name}</p>
                        {p.highlight && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${p.local ? "bg-green-50 text-green-700" : "bg-zinc-100 text-zinc-600"}`}>
                            {p.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed">{p.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {p.types.map((t) => (
                        <span key={t} className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[t]}`}>
                          {t}
                        </span>
                      ))}
                      <span className="text-zinc-300 group-hover:text-zinc-500 ml-1 transition-colors">
                        <ExternalLinkIcon />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        ))}

        {/* Career Tips */}
        <section aria-labelledby="tips-heading">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-zinc-200">
            <div className="w-2 h-6 rounded-full bg-amber-500" />
            <h2 id="tips-heading" className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Career Tips for Ethiopian Designers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((t, i) => (
              <div key={t.title} className="bg-white rounded-2xl border border-zinc-100 p-5">
                <p className="text-xs font-bold text-zinc-200 tabular-nums mb-3">0{i + 1}</p>
                <p className="text-sm font-bold text-zinc-900 mb-2">{t.title}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-zinc-900 rounded-3xl p-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-3">Ready to start?</p>
          <h2 className="text-2xl font-extrabold text-white mb-3">The best opportunity is already here</h2>
          <p className="text-zinc-400 text-sm max-w-md mx-auto mb-7 leading-relaxed">
            Join Ethiopia&apos;s only vetted designer network and get matched with businesses
            that are actively looking for talented creatives like you.
          </p>
          <Link
            href="/get-started/designer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-green-500 text-black text-sm font-bold hover:bg-green-400 transition-colors cursor-pointer"
          >
            Apply as a Designer
          </Link>
        </div>

      </div>
    </div>
  );
}
