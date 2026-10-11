import React from "react";
import Link from "next/link";

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

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsTicker />
      <Services />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <ForProfessionals />
      <ClosingCta />
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="overflow-hidden relative" style={{ backgroundColor: "#071208" }}>
      {/* Vertical stripe gradient — dark forest left → bright cyan right */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 640"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="stripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#040d06" />
            <stop offset="6%"   stopColor="#071810" />
            <stop offset="12%"  stopColor="#0a2414" />
            <stop offset="18%"  stopColor="#0d3018" />
            <stop offset="24%"  stopColor="#104820" />
            <stop offset="30%"  stopColor="#14602a" />
            <stop offset="36%"  stopColor="#1a8035" />
            <stop offset="42%"  stopColor="#22a440" />
            <stop offset="48%"  stopColor="#2ecc50" />
            <stop offset="54%"  stopColor="#3cda60" />
            <stop offset="60%"  stopColor="#4ee470" />
            <stop offset="66%"  stopColor="#60ec84" />
            <stop offset="72%"  stopColor="#7aefa8" />
            <stop offset="78%"  stopColor="#88f0c8" />
            <stop offset="84%"  stopColor="#6aeae0" />
            <stop offset="90%"  stopColor="#40e4f8" />
            <stop offset="96%"  stopColor="#18dcff" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
          {/* Thin vertical stripe texture overlay */}
          <pattern id="stripes" x="0" y="0" width="48" height="640" patternUnits="userSpaceOnUse">
            <rect x="0"  y="0" width="20" height="640" fill="rgba(0,0,0,0.10)" />
            <rect x="20" y="0" width="28" height="640" fill="rgba(255,255,255,0.04)" />
          </pattern>
          {/* Left dark scrim so text stays readable */}
          <linearGradient id="scrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#030c05" stopOpacity="0.97" />
            <stop offset="42%"  stopColor="#040e07" stopOpacity="0.85" />
            <stop offset="58%"  stopColor="#040e07" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#040e07" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Base stripe gradient */}
        <rect x="0" y="0" width="1200" height="640" fill="url(#stripeGrad)" />
        {/* Stripe texture */}
        <rect x="0" y="0" width="1200" height="640" fill="url(#stripes)" />
        {/* Dark left scrim for text legibility */}
        <rect x="0" y="0" width="1200" height="640" fill="url(#scrim)" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-10 items-center">

        {/* Left — copy */}
        <div>
          {/* Social proof badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8">
            <span className="text-yellow-400 text-xs tracking-wider">★★★★★</span>
            <span className="text-white/60 text-xs font-medium">4.9 · 50+ vetted professionals</span>
          </div>

          {/* Display headline */}
          <h1
            className="text-white uppercase leading-[0.85] tracking-tight mb-7"
            style={{ fontFamily: "var(--font-display), sans-serif", fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 900 }}
          >
            <span className="block">Ethiopia&apos;s</span>
            <span className="block" style={{ color: "#6dcc46" }}>Top Creative</span>
            <span className="block">Talent.</span>
          </h1>

          {/* Body */}
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-[420px] mb-9">
            A curated network of vetted Ethiopian professionals. Branding, web, and
            visual production — matched to your brief or managed end-to-end.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-9">
            <Link
              href="/get-started/client"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold transition-colors duration-150"
              style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
            >
              Submit a Brief
              <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[#0d2318] font-bold" style={{ backgroundColor: "rgba(13,35,24,0.2)" }}>
                »
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.31 8.91a19.79 19.79 0 01-3.07-8.59A2 2 0 012.22 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.12 6.12l1.27-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17.92z"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/35 font-semibold">Call Us</p>
                <p className="text-sm font-semibold text-white">+251 911 000 000</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/25 leading-relaxed">
            Every brief reviewed by a real person · No auto-matching · No upfront fee
          </p>
        </div>

        {/* Right — mosaic grid */}
        <div className="hidden lg:grid grid-cols-2 gap-3">

          {/* Branding tile — lime */}
          <div className="rounded-2xl p-6 flex flex-col justify-between aspect-square" style={{ backgroundColor: "#6dcc46" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(13,35,24,0.15)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d2318" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-0.5" style={{ color: "#0d2318" }}>Branding &amp; Design</h3>
              <p className="text-xs" style={{ color: "rgba(13,35,24,0.6)" }}>Identity, logo, packaging</p>
              <span className="font-black text-2xl mt-2 block" style={{ color: "#0d2318", fontFamily: "var(--font-display), sans-serif" }}>01</span>
            </div>
          </div>

          {/* Response stat tile — dark */}
          <div className="rounded-2xl p-6 flex flex-col justify-between aspect-square" style={{ backgroundColor: "#1a3e28" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6dcc46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <p className="font-black text-3xl" style={{ color: "#6dcc46", fontFamily: "var(--font-display), sans-serif" }}>48h</p>
              <p className="text-xs text-white/50">Brief reviewed &amp; matched</p>
            </div>
          </div>

          {/* Web tile — mid */}
          <div className="rounded-2xl p-6 flex flex-col justify-between aspect-square" style={{ backgroundColor: "#163222" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(109,204,70,0.15)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6dcc46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white mb-0.5">Web &amp; Digital</h3>
              <p className="text-xs text-white/40">UI/UX, WordPress, apps</p>
              <span className="font-black text-2xl mt-2 block text-white/20" style={{ fontFamily: "var(--font-display), sans-serif" }}>02</span>
            </div>
          </div>

          {/* Visual tile — ghost */}
          <div className="rounded-2xl p-6 flex flex-col justify-between aspect-square border" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm text-white mb-0.5">Visual Content</h3>
              <p className="text-xs text-white/40">3D, motion, video</p>
              <span className="font-black text-2xl mt-2 block text-white/20" style={{ fontFamily: "var(--font-display), sans-serif" }}>03</span>
            </div>
          </div>

        </div>
      </div>
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
  const cards = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      title: "Branding & Graphic Design",
      body: "Logos, identity systems, packaging, marketing collateral, presentations, and campaign assets that make your brand unmistakable.",
      tags: ["Brand Identity", "Logo Design", "Packaging", "Print"],
      bg: "bg-white",
      border: "border border-zinc-200",
      iconBg: "bg-zinc-100",
      iconColor: "text-zinc-600",
      tagBg: "bg-zinc-50 text-zinc-500",
      linkColor: "text-[#0d2318] hover:text-[#6dcc46]",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
        </svg>
      ),
      title: "Web & Digital",
      body: "WordPress sites, landing pages, UI/UX design, web app interfaces, and digital product design built to convert and perform.",
      tags: ["UI/UX Design", "WordPress", "Landing Pages", "Design Systems"],
      bg: "bg-[#6dcc46]",
      border: "",
      iconBg: "bg-[#0d2318]/15",
      iconColor: "text-[#0d2318]",
      tagBg: "bg-[#0d2318]/10 text-[#0d2318]",
      linkColor: "text-[#0d2318] hover:text-[#0d2318]/70",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
        </svg>
      ),
      title: "Visual Content",
      body: "3D visualisation, product rendering, motion graphics, video editing, and explainer content that brings your message to life.",
      tags: ["3D Rendering", "Motion Graphics", "Video Editing", "Animation"],
      bg: "bg-[#0d2318]",
      border: "",
      iconBg: "bg-white/10",
      iconColor: "text-[#6dcc46]",
      tagBg: "bg-white/10 text-white/70",
      linkColor: "text-white hover:text-[#6dcc46]",
    },
  ];

  return (
    <section id="services" className="bg-[#f1f0ea] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
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
          <p className="text-zinc-500 text-base leading-relaxed max-w-md lg:ml-auto">
            We launched with three disciplines where we can reliably vet talent and
            deliver results. Every professional is reviewed before they join our network.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div key={card.title} className={`rounded-3xl p-7 sm:p-8 flex flex-col ${card.bg} ${card.border}`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${card.iconBg} ${card.iconColor}`}>
                {card.icon}
              </div>
              <h3 className={`font-extrabold text-lg leading-tight mb-3 ${card.bg === "bg-white" ? "text-zinc-900" : card.bg === "bg-[#6dcc46]" ? "text-[#0d2318]" : "text-white"}`}>
                {card.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-6 flex-1 ${card.bg === "bg-white" ? "text-zinc-500" : card.bg === "bg-[#6dcc46]" ? "text-[#0d2318]/70" : "text-white/55"}`}>
                {card.body}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {card.tags.map((tag) => (
                  <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-medium ${card.tagBg}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/get-started/client"
                className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${card.linkColor}`}
              >
                Explore More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Submit a brief",
      body: "Describe your project, budget, timeline, and choose your service mode. Takes under 5 minutes.",
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
      body: "Scope agreed, milestones set, kickoff confirmed. We keep everyone accountable to what was agreed.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-24 sm:py-32 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-28">
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
          </div>

          {/* Right — step cards */}
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div
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
                <svg className="ml-auto shrink-0 mt-1 text-zinc-300 group-hover:text-[#6dcc46] transition-colors duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            ))}
          </div>
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
          <div className="grid grid-cols-2 gap-4">
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
                  {["Branding", "Web", "Motion", "3D"].map((s) => (
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
          </div>

          {/* Right — copy */}
          <div>
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
          </div>

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
          <div>
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
          </div>

          {/* Right — numbered step cards */}
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl border px-5 py-4" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                <span
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ backgroundColor: "rgba(109,204,70,0.15)", color: "#6dcc46", fontFamily: "var(--font-display), sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white mb-0.5">{step.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{step.body}</p>
                </div>
                <svg className="shrink-0 mt-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6dcc46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            ))}
            <div className="flex items-center gap-4 rounded-2xl px-5 py-4 opacity-30" style={{ backgroundColor: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white/40" style={{ backgroundColor: "rgba(255,255,255,0.06)", fontFamily: "var(--font-display), sans-serif" }}>05</span>
              <span className="text-sm text-white/40">Projects start arriving</span>
              <span className="ml-auto text-white/20 text-lg">→</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const reviews = [
    {
      quote: "They matched us with exactly the right designer in under 48 hours. The branding we received exceeded anything we'd seen locally — it looked international.",
      name: "Yonas Tesfaye",
      role: "Co-founder, Sheba Organic",
      rating: 5,
      tag: "Branding & Identity",
    },
    {
      quote: "I was skeptical at first — but the process was completely different from hiring on a marketplace. A real person called us, understood the brief, and only then introduced candidates.",
      name: "Marta Alemu",
      role: "Marketing Director, Tsehay Finance",
      rating: 5,
      tag: "Web & Digital",
    },
    {
      quote: "Our product packaging went from generic to award-shelf worthy. The managed project option meant I didn't have to chase anyone — it just got done.",
      name: "Biruk Haile",
      role: "CEO, Buna Roasters",
      rating: 5,
      tag: "Visual Content",
    },
    {
      quote: "Finally a platform that vets talent properly. Every designer we've worked with through Behance Ethiopia has been professional, responsive and genuinely skilled.",
      name: "Hana Girma",
      role: "Brand Manager, Addis Blue Label",
      rating: 5,
      tag: "Branding & Identity",
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <div
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Closing CTA ──────────────────────────────────────────────────────────────

function ClosingCta() {
  return (
    <section className="py-24 sm:py-32 overflow-hidden" style={{ backgroundColor: "#6dcc46" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d2318]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0d2318]/60">Get Started</p>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-black text-[#0d2318] leading-tight mb-4"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Experienced.<br />Vetted.<br />Ready.
            </h2>
            <p className="text-[#0d2318]/60 text-base leading-relaxed max-w-sm">
              Tell us what you need. A real person reviews your brief, reaches out within
              48 hours, and matches you with the right professional.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <Link
              href="/get-started/client"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-bold text-white transition-colors duration-150"
              style={{ backgroundColor: "#0d2318" }}
            >
              Submit a Brief
              <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#6dcc46" }}>
                <ArrowIcon />
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border-2 text-sm font-bold transition-colors duration-150"
              style={{ borderColor: "rgba(13,35,24,0.25)", color: "#0d2318" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
