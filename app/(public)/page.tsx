import Link from "next/link";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <polyline points="2 6 5 9 10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <ServiceModesSection />
      <CategoriesSection />
      <ForProfessionalsSection />
      <WhySection />
      <CtaSection />
    </>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-20 sm:pb-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Now accepting project briefs · Ethiopia-first talent network
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 leading-[0.95] mb-6">
            Tell us what you need.{" "}
            <span className="text-green-500">We&apos;ll handle the rest.</span>
          </h1>

          {/* Sub */}
          <p className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-xl mb-10">
            A curated network of vetted Ethiopian professionals — branding, web, and visual
            production. We match you with the right talent, or coordinate the entire project
            for you.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/get-started/client"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors duration-150 cursor-pointer"
            >
              Submit Your Brief
              <ArrowRightIcon />
            </Link>
            <Link
              href="/get-started/designer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-zinc-200 bg-white text-zinc-700 text-sm font-semibold hover:border-zinc-400 hover:text-zinc-900 transition-all duration-150 cursor-pointer"
            >
              Apply as a Professional
            </Link>
          </div>

          {/* Trust note */}
          <p className="mt-8 text-xs text-zinc-400 max-w-sm leading-relaxed">
            Every professional is manually reviewed before joining. We qualify every brief
            before matching. No listings, no bidding wars.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      n: "01",
      Icon: ClipboardIcon,
      title: "Submit your brief",
      body: "Tell us your goal, what you need delivered, your deadline and budget. Choose whether you want a direct match or managed delivery.",
    },
    {
      n: "02",
      Icon: SearchIcon,
      title: "We qualify & match",
      body: "Our team reviews your brief, confirms it&apos;s a good fit, and identifies the right professionals from our vetted network.",
    },
    {
      n: "03",
      Icon: UserIcon,
      title: "You approve the shortlist",
      body: "We present you with a curated shortlist — not a feed of hundreds. You confirm the fit before work begins.",
    },
    {
      n: "04",
      Icon: ThumbsUpIcon,
      title: "Work begins",
      body: "Kick off with confidence. We support the engagement end-to-end and stay accountable to the agreed scope.",
    },
  ];

  return (
    <section className="bg-zinc-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            The process
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
            How it works
          </h2>
          <p className="mt-4 text-zinc-500 max-w-md text-base leading-relaxed">
            No open bidding. No cold searching. A qualified human reviews every brief and
            every match before anything moves forward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ n, Icon, title, body }, i) => (
            <div
              key={n}
              className="relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              {i < steps.length - 1 && (
                <div aria-hidden className="hidden lg:block absolute top-10 -right-2.5 z-10 text-zinc-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-zinc-300 tabular-nums">{n}</span>
                <span className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                  <Icon />
                </span>
              </div>
              <h3 className="font-bold text-zinc-900 mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: body }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceModesSection() {
  return (
    <section className="bg-white py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            Two ways to work
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
            Choose how much support you need
          </h2>
          <p className="mt-4 text-zinc-500 max-w-md text-base leading-relaxed">
            Both modes use the same vetted professionals. The difference is how much day-to-day
            coordination we take off your hands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Direct Match */}
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 text-white text-xs font-semibold px-3 py-1 mb-4">
                Direct Match
              </div>
              <h3 className="text-2xl font-extrabold text-zinc-900 mb-2">
                You manage, we find
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                We qualify your brief, vet the talent, and recommend a shortlist. You own the
                day-to-day relationship with your professional.
              </p>
            </div>
            <ul className="space-y-2.5">
              {[
                "Brief qualified by our team",
                "Curated shortlist of 2–3 vetted professionals",
                "Support for agreement and kickoff",
                "You manage day-to-day work",
                "Best for: clients who know what they want",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/get-started/client"
              className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-green-700 transition-colors cursor-pointer"
            >
              Submit a brief <ArrowRightIcon size={14} />
            </Link>
          </div>

          {/* Managed Project */}
          <div className="rounded-3xl bg-zinc-900 p-8 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-green-500 text-black text-xs font-semibold px-3 py-1 mb-4">
                Managed Project
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">
                We coordinate, you approve
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We scope the project, select the professionals, coordinate milestones, check
                quality, and manage handover. You stay informed and approve at key stages.
              </p>
            </div>
            <ul className="space-y-2.5">
              {[
                "Full brief scoping with deliverables & milestones",
                "Platform project manager coordinates delivery",
                "Quality checks before every handover",
                "Change order management included",
                "Best for: teams without bandwidth to manage",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-white/10 text-green-400 flex items-center justify-center shrink-0">
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/get-started/client"
              className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-green-400 transition-colors cursor-pointer"
            >
              Submit a brief <ArrowRightIcon size={14} />
            </Link>
          </div>
        </div>

        <p className="text-xs text-zinc-400 text-center mt-6 max-w-lg mx-auto leading-relaxed">
          Not sure which fits? Submit a brief and select &quot;Not sure yet&quot; — our team will
          recommend the right mode after reviewing your project.
        </p>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const cats = [
    {
      Icon: PaletteIcon,
      title: "Branding & Graphic Design",
      description: "Identity systems, logos, packaging, print materials, campaign assets, presentations.",
      examples: ["Brand identity", "Logo design", "Packaging", "Marketing collateral"],
      color: "bg-green-50 text-green-700 border-green-100",
      dot: "bg-green-500",
    },
    {
      Icon: GlobeIcon,
      title: "Web & Digital",
      description: "WordPress sites, landing pages, UI/UX design, web app interfaces, digital product design.",
      examples: ["UI/UX design", "WordPress sites", "Landing pages", "Web apps"],
      color: "bg-blue-50 text-blue-700 border-blue-100",
      dot: "bg-blue-500",
    },
    {
      Icon: VideoIcon,
      title: "Visual Content",
      description: "3D visualisation, product rendering, motion graphics, explainer videos, video editing.",
      examples: ["3D rendering", "Motion graphics", "Video editing", "Product visualisation"],
      color: "bg-amber-50 text-amber-700 border-amber-100",
      dot: "bg-amber-500",
    },
  ];

  return (
    <section className="bg-zinc-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            What we cover
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
            Three disciplines. One network.
          </h2>
          <p className="mt-4 text-zinc-500 max-w-md text-base leading-relaxed">
            We launched with the creative and digital disciplines where we can reliably vet
            talent and deliver consistent results. More categories follow as we grow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cats.map(({ Icon, title, description, examples, color, dot }) => (
            <div key={title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col gap-4">
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center ${color}`}>
                <Icon />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 mb-1.5">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {examples.map((ex) => (
                  <span key={ex} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-100 text-xs text-zinc-500">
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-zinc-200 bg-white p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-zinc-700">Need something not listed here?</p>
            <p className="text-xs text-zinc-400 mt-0.5">CAD, software development, copywriting, translation, and more are on the roadmap. Submit a brief and describe what you need — we&apos;ll be honest about whether we can help today.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors cursor-pointer"
          >
            Contact us <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ForProfessionalsSection() {
  const perks = [
    "Free to apply — no fees to join the network",
    "Work with vetted Ethiopian businesses and international clients",
    "Set your own rates, availability, and engagement type",
    "Portfolio and identity reviewed; quality reputation protected",
    "Access managed projects — we handle client coordination for you",
  ];

  return (
    <section className="bg-white py-24 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-zinc-900 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {/* Left */}
            <div className="p-10 sm:p-14 flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-4">
                For professionals
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                Join Ethiopia&apos;s first curated talent network
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                We&apos;re building a small, vetted network — not a race to the bottom. If your
                portfolio is strong and you take your craft seriously, we want to meet you.
              </p>
              <ul className="space-y-2.5 mb-8">
                {perks.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-white/10 text-green-400 flex items-center justify-center shrink-0">
                      <CheckIcon />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href="/get-started/designer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-black text-sm font-semibold hover:bg-green-400 transition-colors duration-150 cursor-pointer w-fit"
              >
                Apply to the network
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Right — visual */}
            <div className="hidden sm:flex items-center justify-center p-10 sm:p-14 bg-zinc-800/40">
              <div className="space-y-3 w-full max-w-xs">
                {[
                  { label: "Portfolio reviewed", color: "bg-green-500" },
                  { label: "Identity verified", color: "bg-green-500" },
                  { label: "Skills assessed", color: "bg-green-500" },
                  { label: "Approved & listed", color: "bg-green-500" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                    <span className={`w-2 h-2 rounded-full ${step.color} shrink-0`} />
                    <span className="text-sm text-zinc-300">{step.label}</span>
                    <span className="ml-auto">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-500"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 opacity-40">
                  <span className="w-2 h-2 rounded-full bg-zinc-500 shrink-0" />
                  <span className="text-sm text-zinc-400">Matching begins</span>
                  <span className="ml-auto text-zinc-500">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const points = [
    {
      Icon: ShieldCheckIcon,
      title: "Manually vetted, not self-listed",
      body: "Every professional is reviewed for portfolio quality, identity, and reliability before being accepted. We decline more than we approve.",
    },
    {
      Icon: ClipboardIcon,
      title: "Brief-first, not search-first",
      body: "You tell us what you need. We qualify it and match you — no scrolling through hundreds of profiles or waiting for bids.",
    },
    {
      Icon: UserIcon,
      title: "Honest about fit",
      body: "If your brief isn't a good fit — budget too low, timeline unrealistic, category not yet supported — we'll tell you and explain why, rather than take your money.",
    },
    {
      Icon: ThumbsUpIcon,
      title: "Accountable to the scope",
      body: "We define deliverables, exclusions, milestones and acceptance criteria before work starts. Scope creep and surprise costs are managed, not ignored.",
    },
  ];

  return (
    <section className="bg-zinc-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">
            Why curated
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
            Not a marketplace. A network.
          </h2>
          <p className="mt-4 text-zinc-500 max-w-md text-base leading-relaxed">
            Upwork has millions of freelancers. We have a small, carefully selected group. The
            difference is accountability — ours and theirs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {points.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 text-green-700 mb-4">
                <Icon />
              </span>
              <h3 className="font-bold text-zinc-900 text-base mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-green-500 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black leading-tight">
          Ready to submit your brief?
        </h2>
        <p className="text-black/70 text-base max-w-xl leading-relaxed">
          Tell us what you need. We&apos;ll review it, ask any clarifying questions, and match
          you with the right professional — usually within 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-1">
          <Link
            href="/get-started/client"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors duration-150 cursor-pointer"
          >
            Submit Your Brief
            <ArrowRightIcon />
          </Link>
          <Link
            href="/designers"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-black/20 text-black text-sm font-semibold hover:bg-black/10 transition-colors duration-150 cursor-pointer"
          >
            Browse Professionals
          </Link>
        </div>
        <p className="text-xs text-black/60">
          No upfront fees. We qualify your brief before asking for anything.
        </p>
      </div>
    </section>
  );
}
