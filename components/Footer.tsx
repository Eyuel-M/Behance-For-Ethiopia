export default function Footer() {
  const cols = [
    {
      heading: "For Businesses",
      links: [
        { label: "Submit a Brief",  href: "/get-started/client" },
        { label: "How It Works",    href: "/#how-it-works" },
        { label: "Our Services",    href: "/#services" },
        { label: "Portfolio",       href: "/portfolio" },
        { label: "Track Your Brief",href: "/track" },
        { label: "Contact Us",      href: "/contact" },
      ],
    },
    {
      heading: "For Designers",
      links: [
        { label: "Apply to the Network", href: "/get-started/designer" },
        { label: "Designer Roster",      href: "/designers" },
        { label: "Pricing",              href: "/pricing" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Insights", href: "/insights" },
        { label: "FAQ",      href: "/faq" },
      ],
    },
  ];

  const socials = [
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <footer style={{ backgroundColor: "#071208" }}>

      {/* ── Statement band ── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            {/* Big headline */}
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-[#6dcc46] mb-4">
                Ethiopia-first · Curated, not crowdsourced
              </p>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                The talent was<br />
                always{" "}
                <span
                  className="relative inline-block"
                  style={{ color: "#6dcc46" }}
                >
                  here.
                  {/* underline squiggle */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 120 8"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M2 5 Q30 1 60 5 Q90 9 118 5" stroke="#6dcc46" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </span>
              </h2>
            </div>

            {/* CTA cluster */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end shrink-0">
              <a
                href="/get-started/client"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors"
                style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
              >
                Submit a Brief
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a
                href="/get-started/designer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-all"
              >
                Apply as a Designer
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ── Links + brand ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">

          {/* Brand */}
          <div className="sm:col-span-2">
            <a href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold select-none group-hover:scale-105 transition-transform"
                style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
              >
                H
              </span>
              <span className="font-extrabold text-white text-sm tracking-tight">
                Hire Ethiopia&apos;s Best
              </span>
            </a>

            <p className="text-sm text-white/35 leading-relaxed max-w-[220px] mb-7">
              Ethiopia&apos;s first curated network for creative and digital talent.
            </p>

            <a
              href="mailto:info@hireethiopiasbest.com"
              className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-[#6dcc46] transition-colors mb-6"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              info@hireethiopiasbest.com
            </a>

            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 border border-white/[0.08] hover:text-[#6dcc46] hover:border-[#6dcc46]/40 transition-all duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6dcc46] mb-5">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/35 hover:text-white transition-colors duration-150"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Hire Ethiopia&apos;s Best. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/20">
            <a href="/faq" className="hover:text-white/50 transition-colors">FAQ</a>
            <span className="w-px h-3 bg-white/10" />
            <a href="/pricing" className="hover:text-white/50 transition-colors">Pricing</a>
            <span className="w-px h-3 bg-white/10" />
            <a href="/contact" className="hover:text-white/50 transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
