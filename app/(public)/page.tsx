import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";
import ServicesCarousel from "@/components/ServicesCarousel";
import { getHomepageContent, getPortfolioProjects } from "@/lib/content/store";
import type { HomepageStat, Testimonial, PortfolioProject } from "@/lib/content/types";

export const dynamic = "force-dynamic";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function CheckIcon({ dark }: { dark?: boolean }) {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={dark ? "#0d2318" : "#6dcc46"} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function projectToCard(p: PortfolioProject) {
  const SERVICE_MAP: Record<string, string> = {
    "Branding": "Brand Identity",
    "Web & Digital": "Web Design",
    "Visual Content": "Visual Content",
    "Architecture": "3D Renders",
  };
  return {
    id: p.id,
    category: p.category,
    client: p.client,
    title: p.title,
    service: SERVICE_MAP[p.category] ?? p.category,
    image: p.coverImage ?? `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&q=80&auto=format&fit=crop`,
  };
}

export default async function HomePage() {
  const [content, allProjects] = await Promise.all([
    Promise.resolve(getHomepageContent()),
    Promise.resolve(getPortfolioProjects(true)),
  ]);
  const portfolioCards = allProjects.slice(0, 5).map(projectToCard);

  return (
    <>
      <Hero stats={content.stats} />
      <ClientsTicker />
      <Services />
      <PortfolioTeaser cards={portfolioCards} />
      <HowItWorks />
      <WhyUs />
      <Testimonials testimonials={content.testimonials} />
      <ForProfessionals />
      <ClosingCta />
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ stats }: { stats: HomepageStat[] }) {
  return (
    <section className="relative min-h-[calc(100dvh-64px)] flex flex-col overflow-hidden">

      {/* Background photo */}
      <Image
        src="/hero-bg.avif"
        alt="Ethiopian creative professional at work"
        fill
        className="object-cover object-center"
        style={{ transform: "scaleX(-1)" }}
        priority
        sizes="100vw"
      />

      {/* Left-to-right dark scrim so headline stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(3,12,5,0.96) 0%, rgba(3,12,5,0.82) 38%, rgba(3,12,5,0.50) 62%, rgba(3,12,5,0.15) 100%)",
        }}
      />
      {/* Bottom vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(3,12,5,0.75) 0%, transparent 48%)",
        }}
      />

      {/* Content — anchored to bottom-left */}
      <div className="relative flex-1 flex flex-col justify-end max-w-6xl mx-auto px-5 sm:px-8 w-full pb-16 sm:pb-24">

        {/* Social proof badge */}
        <FadeUp delay={0.05}>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8 w-fit backdrop-blur-sm">
            <span className="text-yellow-400 text-xs tracking-wider">★★★★★</span>
            <span className="text-white/60 text-xs font-medium">4.9 · 50+ vetted professionals</span>
          </div>
        </FadeUp>

        {/* Display headline */}
        <FadeUp delay={0.14}>
          <h1
            className="text-white uppercase leading-[0.85] tracking-tight mb-7"
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(3rem, 8.5vw, 6.5rem)",
              fontWeight: 900,
            }}
          >
            <span className="block">Ethiopia&apos;s</span>
            <span className="block" style={{ color: "#6dcc46" }}>Top Creative</span>
            <span className="block">Talent.</span>
          </h1>
        </FadeUp>

        {/* Body */}
        <FadeUp delay={0.24}>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-[440px] mb-10">
            A curated network of vetted Ethiopian designers — branding, web,
            visual production, and architecture — matched to your brief.
          </p>
        </FadeUp>

        {/* Single primary CTA */}
        <FadeUp delay={0.32}>
          <Link
            href="/get-started/client"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold w-fit transition-opacity duration-150 hover:opacity-90"
            style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
          >
            Submit a Brief
            <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(13,35,24,0.2)" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0d2318" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </Link>
        </FadeUp>
      </div>

      {/* Bottom stats strip */}
      <FadeUp>
        <div
          className="relative border-t"
          style={{
            backgroundColor: "rgba(3,12,5,0.70)",
            borderColor: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 sm:py-5">
            <div className="flex items-center gap-5 sm:gap-10 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && <div className="w-px h-5 bg-white/10 shrink-0" />}
                  <div className="shrink-0 flex items-baseline gap-2.5">
                    <p
                      className="text-sm font-black text-white"
                      style={{ fontFamily: "var(--font-display), sans-serif" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/35 whitespace-nowrap">{stat.label}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

// ─── Clients ticker ───────────────────────────────────────────────────────────

function ClientsTicker() {
  // SVG wordmarks: each is a small inline SVG ~120×36px
  const wordmarks: { label: string; svg: React.ReactNode }[] = [
    {
      label: "Sheba Organic",
      svg: (
        <svg viewBox="0 0 130 36" width="130" height="36" aria-label="Sheba Organic">
          <circle cx="10" cy="18" r="7" fill="#6dcc46" opacity="0.85" />
          <circle cx="10" cy="18" r="4" fill="white" />
          <text x="24" y="22" fontFamily="Georgia,serif" fontSize="13" fontWeight="700" fill="#1a1a1a" letterSpacing="0.3">SHEBA</text>
          <text x="24" y="32" fontFamily="Georgia,serif" fontSize="8" fontWeight="400" fill="#888" letterSpacing="2">ORGANIC</text>
        </svg>
      ),
    },
    {
      label: "Tsehay Finance",
      svg: (
        <svg viewBox="0 0 140 36" width="140" height="36" aria-label="Tsehay Finance">
          <rect x="0" y="6" width="3" height="24" rx="1.5" fill="#f59e0b" />
          <rect x="6" y="12" width="3" height="18" rx="1.5" fill="#f59e0b" opacity="0.6" />
          <text x="16" y="23" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="800" fill="#1a1a1a" letterSpacing="0.5">TSEHAY</text>
          <text x="16" y="32" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="400" fill="#aaa" letterSpacing="1.5">FINANCE</text>
        </svg>
      ),
    },
    {
      label: "Buna Roasters",
      svg: (
        <svg viewBox="0 0 135 36" width="135" height="36" aria-label="Buna Roasters">
          <path d="M8 26 Q5 18 8 12 Q11 18 14 12 Q17 18 14 26" fill="none" stroke="#7c3f00" strokeWidth="2" strokeLinecap="round"/>
          <text x="22" y="20" fontFamily="Georgia,serif" fontSize="14" fontWeight="900" fill="#2a1500" letterSpacing="-0.5">Buna</text>
          <text x="22" y="31" fontFamily="Georgia,serif" fontSize="8" fill="#9a7040" letterSpacing="2.5">ROASTERS</text>
        </svg>
      ),
    },
    {
      label: "Addis Blue Label",
      svg: (
        <svg viewBox="0 0 150 36" width="150" height="36" aria-label="Addis Blue Label">
          <rect x="0" y="10" width="14" height="16" rx="2" fill="#1e40af" />
          <rect x="2" y="12" width="10" height="3" rx="1" fill="white" opacity="0.9"/>
          <rect x="2" y="17" width="7" height="2" rx="1" fill="white" opacity="0.6"/>
          <text x="20" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#1a1a1a">ADDIS BLUE</text>
          <text x="20" y="32" fontFamily="Arial,sans-serif" fontSize="7.5" fill="#888" letterSpacing="2">LABEL</text>
        </svg>
      ),
    },
    {
      label: "Habesha Homes",
      svg: (
        <svg viewBox="0 0 145 36" width="145" height="36" aria-label="Habesha Homes">
          <polygon points="9,26 2,26 9,12 16,26" fill="none" stroke="#0d2318" strokeWidth="2"/>
          <rect x="6" y="20" width="6" height="6" fill="#0d2318" opacity="0.15"/>
          <text x="22" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#1a1a1a" letterSpacing="0.2">HABESHA</text>
          <text x="22" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#aaa" letterSpacing="1.5">HOMES</text>
        </svg>
      ),
    },
    {
      label: "Zemen Studios",
      svg: (
        <svg viewBox="0 0 138 36" width="138" height="36" aria-label="Zemen Studios">
          <text x="0" y="24" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="900" fill="#0d2318" letterSpacing="-1">Z</text>
          <line x1="10" y1="26" x2="16" y2="8" stroke="#6dcc46" strokeWidth="2"/>
          <text x="20" y="22" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#1a1a1a">ZEMEN</text>
          <text x="20" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#aaa" letterSpacing="1.5">STUDIOS</text>
        </svg>
      ),
    },
    {
      label: "Nile Creative",
      svg: (
        <svg viewBox="0 0 132 36" width="132" height="36" aria-label="Nile Creative">
          <path d="M2 26 Q8 8 14 18 Q18 26 22 10" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round"/>
          <text x="28" y="22" fontFamily="Georgia,serif" fontSize="13" fontWeight="700" fill="#1a1a1a">Nile</text>
          <text x="28" y="32" fontFamily="Georgia,serif" fontSize="8" fill="#888" letterSpacing="2">CREATIVE</text>
        </svg>
      ),
    },
    {
      label: "Selam Tech",
      svg: (
        <svg viewBox="0 0 120 36" width="120" height="36" aria-label="Selam Tech">
          <rect x="0" y="8" width="16" height="20" rx="3" fill="#0d2318"/>
          <rect x="3" y="11" width="10" height="2" rx="1" fill="#6dcc46"/>
          <rect x="3" y="15" width="7" height="1.5" rx="0.75" fill="#6dcc46" opacity="0.6"/>
          <rect x="3" y="19" width="8" height="1.5" rx="0.75" fill="#6dcc46" opacity="0.4"/>
          <text x="22" y="21" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#0d2318">SELAM</text>
          <text x="22" y="31" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="700" fill="#6dcc46" letterSpacing="1">TECH</text>
        </svg>
      ),
    },
    {
      label: "Admas Group",
      svg: (
        <svg viewBox="0 0 130 36" width="130" height="36" aria-label="Admas Group">
          <polygon points="10,8 18,26 2,26" fill="none" stroke="#dc2626" strokeWidth="2"/>
          <text x="24" y="21" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#1a1a1a" letterSpacing="0.3">ADMAS</text>
          <text x="24" y="31" fontFamily="Arial,sans-serif" fontSize="8" fill="#aaa" letterSpacing="1.5">GROUP</text>
        </svg>
      ),
    },
    {
      label: "Abyssinia Bank",
      svg: (
        <svg viewBox="0 0 145 36" width="145" height="36" aria-label="Abyssinia Bank">
          <rect x="0" y="14" width="16" height="14" rx="1" fill="none" stroke="#1e3a8a" strokeWidth="2"/>
          <rect x="3" y="8" width="10" height="8" rx="1" fill="none" stroke="#1e3a8a" strokeWidth="1.5"/>
          <text x="22" y="22" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#1e3a8a">ABYSSINIA</text>
          <text x="22" y="32" fontFamily="Arial,sans-serif" fontSize="8" fill="#888" letterSpacing="1.5">BANK</text>
        </svg>
      ),
    },
    {
      label: "Ethio Telecom",
      svg: (
        <svg viewBox="0 0 142 36" width="142" height="36" aria-label="Ethio Telecom">
          <circle cx="10" cy="18" r="9" fill="none" stroke="#007a3d" strokeWidth="2"/>
          <ellipse cx="10" cy="18" rx="4" ry="9" fill="none" stroke="#007a3d" strokeWidth="1.2"/>
          <line x1="1" y1="18" x2="19" y2="18" stroke="#007a3d" strokeWidth="1.2"/>
          <text x="25" y="21" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#007a3d">ETHIO</text>
          <text x="25" y="31" fontFamily="Arial,sans-serif" fontSize="8" fill="#555" letterSpacing="1.5">TELECOM</text>
        </svg>
      ),
    },
    {
      label: "Tikur Anbessa",
      svg: (
        <svg viewBox="0 0 140 36" width="140" height="36" aria-label="Tikur Anbessa">
          <path d="M6 28 C2 22 2 14 6 10 C9 6 13 8 14 12 C16 8 20 6 22 10 C26 14 22 26 14 30 Z" fill="#b45309" opacity="0.85"/>
          <text x="30" y="21" fontFamily="Georgia,serif" fontSize="11" fontWeight="700" fill="#1a1a1a" letterSpacing="0.3">TIKUR</text>
          <text x="30" y="31" fontFamily="Georgia,serif" fontSize="9" fill="#888" letterSpacing="1">ANBESSA</text>
        </svg>
      ),
    },
  ];

  const items = [...wordmarks, ...wordmarks];

  return (
    <div className="bg-white border-b border-zinc-100 overflow-hidden py-6 select-none">
      <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-zinc-300 mb-5">
        Businesses we&apos;ve worked with
      </p>
      <div className="relative flex">
        <style>{`
          @keyframes ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            align-items: center;
            width: max-content;
            animation: ticker 36s linear infinite;
          }
          .ticker-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="ticker-track">
          {items.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-0 px-8 whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity duration-200">
              {item.svg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="bg-[#f1f0ea] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <FadeUp>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Our Services</p>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-black text-[#0d2318] leading-tight"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Essential services<br />for Ethiopian<br />businesses
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-zinc-500 text-base leading-relaxed max-w-md lg:ml-auto">
              We launched with four disciplines where we can reliably vet talent and
              deliver results. Every professional is reviewed before they join our network.
            </p>
          </FadeUp>
        </div>

        {/* Carousel */}
        <FadeUp delay={0.15}>
          <ServicesCarousel />
        </FadeUp>

      </div>
    </section>
  );
}

// ─── Portfolio Teaser ─────────────────────────────────────────────────────────

type WorkCardData = { id: string; category: string; client: string; title: string; service: string; image: string };

function WorkCard({
  card,
  style,
  eager = false,
  className = "",
}: {
  card: WorkCardData;
  style?: React.CSSProperties;
  eager?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/portfolio/${card.id}`}
      className={`group relative block overflow-hidden ${className}`}
      style={style}
    >
      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image}
        alt=""
        loading={eager ? "eager" : "lazy"}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)" }}
      />

      {/* Category badge */}
      <div className="absolute top-5 right-5 z-10">
        <span className="bg-white/90 backdrop-blur-sm text-zinc-900 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
          {card.category}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1.5">{card.service}</p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-white font-extrabold text-base sm:text-lg leading-snug mb-0.5">{card.title}</p>
            <p className="text-white/45 text-xs">{card.client}</p>
          </div>
          <span
            className="shrink-0 w-9 h-9 rounded-full border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.1)" }}
            aria-hidden="true"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function PortfolioTeaser({ cards }: { cards: WorkCardData[] }) {
  return (
    <section style={{ backgroundColor: "#071208" }} className="border-t border-white/5">

      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-10 sm:pb-14">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#6dcc46]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#6dcc46]/70">Our Work</p>
              </div>
              <h2
                className="text-4xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Work that speaks<br />for itself.
              </h2>
            </div>
            <div className="sm:text-right">
              <p className="text-white/40 text-sm leading-relaxed mb-4 max-w-xs sm:ml-auto">
                A curated selection from vetted designers in our network.
              </p>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm font-semibold text-white/60 hover:border-white/40 hover:text-white transition-all duration-150"
              >
                View all work
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Mobile / tablet stacked grid */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2">
        {cards.map((card, i) => (
          <WorkCard
            key={card.id}
            card={card}
            eager={i === 0}
            className="min-h-[300px] sm:min-h-[340px]"
          />
        ))}
      </div>

      {/* Desktop bento grid — full-bleed, 3-column */}
      <div
        className="hidden lg:grid grid-cols-3"
        style={{ gridTemplateRows: "52vh 40vh 34vh" }}
      >
        <WorkCard card={cards[0] ?? cards[0]} eager style={{ gridColumn: "1 / 3", gridRow: "1" }} />
        <WorkCard card={cards[2] ?? cards[0]} style={{ gridColumn: "3", gridRow: "1 / 3" }} />
        <WorkCard card={cards[1] ?? cards[0]} style={{ gridColumn: "1", gridRow: "2" }} />
        <WorkCard card={cards[3] ?? cards[0]} style={{ gridColumn: "2", gridRow: "2" }} />
        <WorkCard card={cards[4] ?? cards[0]} style={{ gridColumn: "1 / 4", gridRow: "3" }} />
      </div>

      {/* Bottom breathing room */}
      <div className="h-16 sm:h-20" />
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Submit a brief",
      body: "Describe your project, budget, timeline, and choose your service mode. Takes under 5 minutes — no payment, no commitment.",
    },
    {
      n: "02",
      title: "We qualify it",
      body: "A real person reviews every brief — checking feasibility, budget fit, and available talent. We reach out within 48 hours.",
    },
    {
      n: "03",
      title: "We match you",
      body: "We present a curated shortlist of 2–3 professionals. You confirm the fit before anything is agreed.",
    },
    {
      n: "04",
      title: "Work begins",
      body: "Scope agreed, milestones set, kickoff confirmed. Payment is only collected once you've approved the proposal — not before.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-24 sm:py-32 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <FadeUp className="lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">The Process</p>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-black text-[#0d2318] leading-tight mb-5"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              No open<br />bidding.<br />No cold<br />searching.
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed max-w-sm mb-8">
              We do the matching. A qualified human reviews every brief and every
              candidate before anything moves forward.
            </p>
            <Link
              href="/get-started/client"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-colors duration-150"
              style={{ backgroundColor: "#0d2318" }}
            >
              Submit your brief
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#6dcc46" }}>
                <ArrowIcon />
              </span>
            </Link>
          </FadeUp>

          {/* Right — step cards */}
          <StaggerGrid className="space-y-3">
            {steps.map((step, i) => (
              <StaggerItem
                key={step.n}
                className="group rounded-2xl border border-zinc-100 bg-zinc-50 hover:bg-[#0d2318] hover:border-[#0d2318] px-6 py-5 flex items-start gap-5 transition-all duration-200 cursor-default"
              >
                <span
                  className="shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-black transition-colors duration-200"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  <span className="group-hover:hidden">{step.n}</span>
                  <span className="hidden group-hover:block text-[#6dcc46]">{step.n}</span>
                </span>
                <div>
                  <h3 className="font-bold text-zinc-900 text-sm mb-1 group-hover:text-white transition-colors duration-200">{step.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed group-hover:text-white/55 transition-colors duration-200">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </section>
  );
}

// ─── Why Us ───────────────────────────────────────────────────────────────────

function WhyUs() {
  const perks = [
    "Reviewed by real people — every time",
    "No race to the bottom on price",
    "Managed Project option for hands-off delivery",
    "All professionals are Ethiopia-based",
    "Portfolio and identity manually reviewed",
  ];

  return (
    <section className="bg-[#f1f0ea] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — stat mosaic */}
          <FadeUp className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#6dcc46] p-7 flex flex-col justify-between aspect-square">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(13,35,24,0.15)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d2318" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <p className="font-black text-4xl text-[#0d2318] leading-none mb-1" style={{ fontFamily: "var(--font-display), sans-serif" }}>100%</p>
                <p className="text-xs text-[#0d2318]/60 font-medium">Our Total<br />Completed Works</p>
              </div>
            </div>

            <div className="grid grid-rows-2 gap-4">
              <div className="rounded-2xl bg-white border border-zinc-200 p-5 flex flex-col justify-between">
                <p className="text-xs text-zinc-400 font-medium">Avg. client rating</p>
                <div>
                  <p className="text-yellow-400 text-xs tracking-wider mb-0.5">★★★★★</p>
                  <p className="font-black text-xl text-zinc-900 leading-none" style={{ fontFamily: "var(--font-display), sans-serif" }}>4.9<span className="text-xs font-normal text-zinc-400">/5.0</span></p>
                </div>
              </div>
              <div className="rounded-2xl bg-[#0d2318] p-5 flex flex-col justify-between">
                <p className="text-xs text-white/40 font-medium">Premium skills</p>
                <div className="flex flex-wrap gap-1">
                  {["Branding", "Web", "Motion", "3D", "Arch Viz"].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium text-white/70 border border-white/10">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-2 rounded-2xl bg-white border border-zinc-200 p-6">
              <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-3">Why professionals choose us</p>
              <div className="flex flex-wrap gap-2">
                {["Ethiopia-first", "Curated, not crowdsourced", "No joining fee", "You set your rate", "Real projects"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[#f1f0ea] text-xs font-medium text-zinc-600">{tag}</span>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Right — copy */}
          <FadeUp delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Who We Are</p>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-black text-[#0d2318] leading-tight mb-5"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Comprehensive solution for business excellence
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed mb-8">
              We&apos;re not a freelance marketplace. We&apos;re a concierge matching service
              that takes the risk out of hiring creative talent in Ethiopia. Every
              professional is vetted before they join, and every project is supported
              from brief to handover.
            </p>
            <ul className="space-y-3 mb-10">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-zinc-600">
                  <span className="w-5 h-5 rounded-full bg-[#6dcc46]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href="/get-started/client"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors"
              style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
            >
              Submit a Brief
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(13,35,24,0.2)" }}>
                <ArrowIcon />
              </span>
            </Link>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}

// ─── For Professionals ────────────────────────────────────────────────────────

function ForProfessionals() {
  const steps = [
    { title: "Submit your application", body: "Share your portfolio, specialty, rates, and availability." },
    { title: "Identity & portfolio review", body: "We verify who you are and assess the quality of your work." },
    { title: "Skills assessment", body: "Your output is checked against the standards of your category." },
    { title: "Match to projects", body: "Approved professionals receive relevant project opportunities." },
  ];

  return (
    <section className="bg-[#0d2318] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <FadeUp>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">For Professionals</p>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Join Ethiopia&apos;s first curated talent network
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              We&apos;re building a small, quality network — not a race to the bottom.
              If your portfolio is strong and you take your craft seriously, we want to work with you.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Free to apply — no joining fees",
                "Matched to vetted Ethiopian businesses",
                "Set your own rates and availability",
                "Managed Project option means less client management",
                "Quality reputation actively protected",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "rgba(109,204,70,0.15)" }}>
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/get-started/designer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors"
              style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
            >
              Apply to the Network
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(13,35,24,0.2)" }}>
                <ArrowIcon />
              </span>
            </Link>
          </FadeUp>

          {/* Right — numbered step cards */}
          <StaggerGrid className="space-y-3">
            {steps.map((step, i) => (
              <StaggerItem
                key={i}
                className="group rounded-2xl border px-6 py-5 flex items-start gap-5 transition-all duration-200 cursor-default hover:bg-[#6dcc46]/10 hover:border-[#6dcc46]/30"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                <span
                  className="shrink-0 w-10 h-10 rounded-full border-2 border-[#6dcc46]/30 group-hover:border-[#6dcc46] flex items-center justify-center text-xs font-black text-[#6dcc46] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed group-hover:text-white/65 transition-colors duration-200">{step.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const reviews = testimonials.map((t) => ({
    quote: t.quote,
    name: t.author,
    role: `${t.company}`,
    rating: 5 as const,
    tag: t.service,
  }));

  return (
    <section className="bg-white py-24 sm:py-32 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Testimonials</p>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-black text-[#0d2318] leading-tight"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Trusted by Ethiopian<br />businesses
              </h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-yellow-400 text-sm tracking-wider">★★★★★</span>
              <div>
                <p className="font-black text-2xl text-[#0d2318] leading-none" style={{ fontFamily: "var(--font-display), sans-serif" }}>4.9</p>
                <p className="text-xs text-zinc-400">average rating</p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Cards grid */}
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <StaggerItem
              key={i}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col gap-5 ${i === 0 ? "bg-[#0d2318]" : i === 2 ? "bg-[#6dcc46]" : "bg-[#f1f0ea]"}`}
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={i === 0 ? "#6dcc46" : i === 2 ? "#0d2318" : "#f59e0b"} aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className={`text-sm leading-relaxed flex-1 ${i === 0 ? "text-white/70" : i === 2 ? "text-[#0d2318]/70" : "text-zinc-600"}`}>
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Footer */}
              <div className={`flex items-center justify-between gap-4 pt-2 border-t ${i === 0 ? "border-white/10" : i === 2 ? "border-[#0d2318]/10" : "border-zinc-200"}`}>
                <div>
                  <p className={`text-sm font-bold ${i === 0 ? "text-white" : i === 2 ? "text-[#0d2318]" : "text-zinc-900"}`}>{r.name}</p>
                  <p className={`text-xs mt-0.5 ${i === 0 ? "text-white/40" : i === 2 ? "text-[#0d2318]/50" : "text-zinc-400"}`}>{r.role}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap shrink-0 ${i === 0 ? "bg-white/10 text-white/60" : i === 2 ? "bg-[#0d2318]/10 text-[#0d2318]/60" : "bg-zinc-200 text-zinc-500"}`}>
                  {r.tag}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

// ─── Closing CTA ──────────────────────────────────────────────────────────────

function ClosingCta() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40" style={{ backgroundColor: "#071208" }}>

      {/* Background: dot grid */}
      <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none select-none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ctaDots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#6dcc46" opacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ctaDots)" />
      </svg>

      {/* Background: large decorative rings */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full border border-white/[0.04]" />
      </div>
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[480px] h-[480px] rounded-full border border-[#6dcc46]/[0.07]" />
      </div>

      {/* Accent corner glows */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(109,204,70,0.12) 0%, transparent 70%)" }} />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle at bottom left, rgba(109,204,70,0.08) 0%, transparent 70%)" }} />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">

        {/* Badge */}
        <FadeUp>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6dcc46]/25 bg-[#6dcc46]/10 px-4 py-2 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/80">Now accepting projects</p>
          </div>
        </FadeUp>

        {/* Headline */}
        <FadeUp delay={0.1}>
          <h2
            className="text-5xl sm:text-7xl font-black leading-[0.88] tracking-tight text-white mb-7"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Your next great<br />
            <span style={{ color: "#6dcc46" }}>creative project</span><br />
            starts here.
          </h2>
        </FadeUp>

        {/* Sub */}
        <FadeUp delay={0.18}>
          <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-12">
            A real person reviews your brief, reaches out within 48 hours,
            and matches you with exactly the right professional.
          </p>
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={0.26}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/get-started/client"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold transition-all duration-150 hover:opacity-90"
              style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
            >
              Submit a Brief
              <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(13,35,24,0.2)" }}>
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/get-started/designer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border text-sm font-bold transition-all duration-150 hover:bg-white/5"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)" }}
            >
              Apply as a Designer
            </Link>
          </div>
        </FadeUp>

        {/* Trust stats */}
        <FadeUp delay={0.34}>
          <div className="flex items-center justify-center gap-6 sm:gap-10 pt-10 border-t border-white/[0.08]">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white leading-none" style={{ fontFamily: "var(--font-display), sans-serif" }}>50+</p>
              <p className="text-[11px] text-white/35 font-medium mt-1.5 uppercase tracking-widest">Vetted pros</p>
            </div>
            <div className="w-px h-10 bg-white/10 shrink-0" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white leading-none" style={{ fontFamily: "var(--font-display), sans-serif" }}>48h</p>
              <p className="text-[11px] text-white/35 font-medium mt-1.5 uppercase tracking-widest">Response</p>
            </div>
            <div className="w-px h-10 bg-white/10 shrink-0" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black leading-none" style={{ color: "#6dcc46", fontFamily: "var(--font-display), sans-serif" }}>ETB 0</p>
              <p className="text-[11px] text-white/35 font-medium mt-1.5 uppercase tracking-widest">Upfront fee</p>
            </div>
            <div className="w-px h-10 bg-white/10 shrink-0 hidden sm:block" />
            <div className="text-center hidden sm:block">
              <p className="text-yellow-400 text-sm tracking-wider leading-none">★★★★★</p>
              <p className="text-[11px] text-white/35 font-medium mt-1.5 uppercase tracking-widest">4.9 rating</p>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
