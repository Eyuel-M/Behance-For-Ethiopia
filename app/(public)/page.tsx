import Link from "next/link";

// ─── Shared ───────────────────────────────────────────────────────────────────

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function Check() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <ServiceModes />
      <Categories />
      <ForProfessionals />
      <ClosingCta />
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-zinc-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-28 sm:pt-28 sm:pb-36 relative">

        {/* Background accent */}
        <div aria-hidden className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-500/5 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute bottom-0 left-20 w-64 h-64 rounded-full bg-green-500/8 blur-3xl pointer-events-none" />

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-zinc-400">Now accepting project briefs</span>
        </div>

        {/* Headline */}
        <h1 className="font-extrabold text-white tracking-tight leading-[0.9] mb-8 max-w-3xl">
          <span className="block text-5xl sm:text-7xl lg:text-8xl">Tell us what</span>
          <span className="block text-5xl sm:text-7xl lg:text-8xl">you need.</span>
          <span className="block text-5xl sm:text-7xl lg:text-8xl text-green-400 mt-2">We handle</span>
          <span className="block text-5xl sm:text-7xl lg:text-8xl text-green-400">the rest.</span>
        </h1>

        {/* Sub */}
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-md mb-10">
          A curated network of vetted Ethiopian professionals. Branding, web, and
          visual production — matched to your brief or managed end-to-end.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/get-started/client"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-green-500 text-black text-sm font-bold hover:bg-green-400 transition-colors duration-150"
          >
            Submit Your Brief <Arrow />
          </Link>
          <Link
            href="/get-started/designer"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-zinc-700 text-zinc-300 text-sm font-semibold hover:border-zinc-500 hover:text-white transition-all duration-150"
          >
            Apply as a Professional
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-7 text-xs text-zinc-600 max-w-xs leading-relaxed">
          Every brief is reviewed by a real person before anything moves. No
          auto-matching. No upfront fee.
        </p>
      </div>
    </section>
  );
}

// ─── Trust strip ──────────────────────────────────────────────────────────────

function TrustStrip() {
  const items = [
    "Branding & Graphic Design",
    "Web & Digital",
    "Visual Content",
    "Ethiopia-first",
    "Manually vetted",
    "Curated, not crowdsourced",
  ];
  return (
    <div className="bg-zinc-900 border-y border-zinc-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
        <div className="flex items-center gap-6 flex-wrap">
          {items.map((item, i) => (
            <span key={item} className="flex items-center gap-6">
              <span className="text-xs text-zinc-500 font-medium tracking-wide whitespace-nowrap">{item}</span>
              {i < items.length - 1 && <span aria-hidden className="text-zinc-700 text-xs">·</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "You submit a brief",
      body: "Describe your goal, deliverables, budget, and deadline. Choose Direct Match or Managed Project. Takes under 5 minutes.",
    },
    {
      n: "02",
      title: "We qualify it",
      body: "A real person reviews every brief. We check feasibility, budget fit, and whether we have the right professionals. We'll reach out within 48 hours.",
    },
    {
      n: "03",
      title: "We match you",
      body: "We present a curated shortlist — not a feed of hundreds. You confirm the fit before anything is agreed.",
    },
    {
      n: "04",
      title: "Work begins",
      body: "Scope is agreed, milestones set, kickoff confirmed. You stay informed at every stage. We hold everyone accountable to what was agreed.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left — label + headline */}
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">
              The process
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-5">
              No open bidding.<br />No cold searching.
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed max-w-sm mb-8">
              We do the matching. A qualified human reviews every brief and every
              candidate before anything moves forward.
            </p>
            <Link
              href="/get-started/client"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors duration-150"
            >
              Submit your brief <Arrow />
            </Link>
          </div>

          {/* Right — steps */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`relative flex gap-5 pb-10 ${i === steps.length - 1 ? "" : "border-l border-zinc-100 ml-5"}`}
              >
                {/* Number node */}
                <div className={`absolute -left-5 top-0 flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm border-2 ${i === 0 ? "bg-green-500 border-green-500 text-black" : "bg-white border-zinc-200 text-zinc-400"}`}>
                  {step.n}
                </div>
                <div className="pl-10">
                  <h3 className="font-bold text-zinc-900 text-base mb-1.5">{step.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Service modes ────────────────────────────────────────────────────────────

function ServiceModes() {
  return (
    <section id="services" className="bg-zinc-50 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">Two ways to work</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
            How much do you<br />want us to handle?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Direct Match */}
          <div className="rounded-3xl bg-white border border-zinc-200 p-8 sm:p-10 flex flex-col">
            <div className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600 mb-6 w-fit">
              Direct Match
            </div>
            <h3 className="text-2xl font-extrabold text-zinc-900 mb-3">
              We find it.<br />You manage it.
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              We qualify your brief, vet the talent, and give you a curated shortlist.
              You own the day-to-day relationship with the professional.
            </p>
            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                "Brief reviewed and qualified",
                "Shortlist of 2–3 vetted professionals",
                "Kickoff support included",
                "You manage day-to-day work",
                "Best when: you know what you want",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600">
                  <span className="w-4 h-4 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center shrink-0 mt-0.5"><Check /></span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/get-started/client"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-900 hover:text-green-600 transition-colors"
            >
              Submit a brief <Arrow />
            </Link>
          </div>

          {/* Managed Project */}
          <div className="rounded-3xl bg-zinc-900 p-8 sm:p-10 flex flex-col">
            <div className="inline-flex items-center rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-400 mb-6 w-fit">
              Managed Project
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-3">
              We find it.<br />We run it.
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              We scope the project, select professionals, coordinate milestones,
              check quality at every stage, and manage handover. You approve and
              stay informed.
            </p>
            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                "Full scope with milestones and deliverables",
                "Platform project manager throughout",
                "Quality review before every handover",
                "Change order management included",
                "Best when: you don't have bandwidth to manage",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-green-400 flex items-center justify-center shrink-0 mt-0.5"><Check /></span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/get-started/client"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-green-400 transition-colors"
            >
              Submit a brief <Arrow />
            </Link>
          </div>
        </div>

        <p className="text-xs text-zinc-400 text-center mt-6">
          Not sure which fits? Select &ldquo;Not sure yet&rdquo; in your brief — we&apos;ll recommend the right mode.
        </p>
      </div>
    </section>
  );
}

// ─── Categories ───────────────────────────────────────────────────────────────

function Categories() {
  const cats = [
    {
      num: "01",
      title: "Branding & Graphic Design",
      description: "Identity systems, logos, packaging, marketing materials, presentations, campaign assets.",
      tags: ["Brand identity", "Logo", "Packaging", "Print", "Marketing collateral"],
      accent: "text-green-600",
    },
    {
      num: "02",
      title: "Web & Digital",
      description: "WordPress sites, landing pages, UI/UX design, web app interfaces, digital product design.",
      tags: ["UI/UX", "WordPress", "Landing pages", "Web apps", "Design systems"],
      accent: "text-blue-600",
    },
    {
      num: "03",
      title: "Visual Content",
      description: "3D visualisation, product rendering, motion graphics, video editing, explainer content.",
      tags: ["3D rendering", "Motion graphics", "Video editing", "Animation"],
      accent: "text-amber-600",
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-4">What we cover</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight">
              Three disciplines.<br />One network.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
            We launched with categories where we can reliably vet talent and deliver results. More follow as we grow.
          </p>
        </div>

        <div className="divide-y divide-zinc-100">
          {cats.map((cat) => (
            <div key={cat.num} className="group py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 hover:bg-zinc-50 -mx-5 px-5 sm:-mx-8 sm:px-8 rounded-2xl transition-colors duration-150 cursor-default">
              <div className="sm:col-span-1">
                <span className={`text-3xl font-extrabold ${cat.accent} leading-none opacity-30 group-hover:opacity-60 transition-opacity`}>{cat.num}</span>
              </div>
              <div className="sm:col-span-4">
                <h3 className="text-lg font-bold text-zinc-900">{cat.title}</h3>
              </div>
              <div className="sm:col-span-4">
                <p className="text-sm text-zinc-500 leading-relaxed">{cat.description}</p>
              </div>
              <div className="sm:col-span-3 flex flex-wrap gap-1.5 sm:justify-end">
                {cat.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-xs text-zinc-500 whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-zinc-200 p-5 flex items-center justify-between gap-4 flex-wrap bg-zinc-50">
          <div>
            <p className="text-sm font-semibold text-zinc-700">Need something not listed?</p>
            <p className="text-xs text-zinc-400 mt-0.5">CAD, copywriting, software development, and more are on the roadmap. Submit a brief and describe what you need — we&apos;ll be honest about whether we can help today.</p>
          </div>
          <Link href="/contact" className="shrink-0 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors">
            Talk to us →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── For professionals ────────────────────────────────────────────────────────

function ForProfessionals() {
  const steps = [
    "Submit your portfolio and application",
    "We review your identity and portfolio quality",
    "Skills assessed against category standards",
    "Approved professionals are matched to projects",
  ];

  return (
    <section className="bg-zinc-950 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-4">
              For professionals
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
              Join Ethiopia&apos;s first curated talent network.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-8">
              We&apos;re building a small, vetted network — not a race to the bottom.
              If your portfolio is strong and you take your craft seriously, we want
              to meet you.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Free to apply — no joining fees",
                "Matched to vetted Ethiopian businesses",
                "Set your own rates and availability",
                "Managed Project option — less client management for you",
                "Quality reputation actively protected",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="w-4 h-4 rounded-full bg-white/10 text-green-400 flex items-center justify-center shrink-0 mt-0.5"><Check /></span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/get-started/designer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500 text-black text-sm font-bold hover:bg-green-400 transition-colors duration-150"
            >
              Apply to the network <Arrow />
            </Link>
          </div>

          {/* Right — vetting steps visual */}
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 px-5 py-4">
                <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold text-xs flex items-center justify-center shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-zinc-300">{step}</span>
                <span className="ml-auto text-green-500 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
              </div>
            ))}
            <div className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/5 px-5 py-4 opacity-35">
              <span className="w-8 h-8 rounded-full bg-zinc-700/40 font-bold text-xs flex items-center justify-center shrink-0 text-zinc-500">05</span>
              <span className="text-sm text-zinc-500">Projects start arriving</span>
              <span className="ml-auto text-zinc-700 shrink-0">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Closing CTA ──────────────────────────────────────────────────────────────

function ClosingCta() {
  return (
    <section className="bg-green-500 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight mb-4">
              Ready to submit your brief?
            </h2>
            <p className="text-black/70 text-base leading-relaxed">
              Tell us what you need. A real person reviews it, reaches out within 48 hours,
              and matches you with the right professional.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <Link
              href="/get-started/client"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 transition-colors duration-150"
            >
              Submit a Brief <Arrow />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-black/20 text-black text-sm font-semibold hover:bg-black/10 transition-colors duration-150"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
