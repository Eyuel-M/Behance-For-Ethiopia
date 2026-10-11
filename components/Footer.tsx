export default function Footer() {
  const businessLinks = [
    { label: "Submit a Brief", href: "/get-started/client" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Our Services", href: "/#services" },
    { label: "Contact Us", href: "/contact" },
  ];

  const proLinks = [
    { label: "Apply to the Network", href: "/get-started/designer" },
    { label: "How Vetting Works", href: "/#how-it-works" },
    { label: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <footer style={{ backgroundColor: "#071208" }}>
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #6dcc46 30%, #6dcc46 70%, transparent)" }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-14">

          {/* Brand column — spans 2 of 5 */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold select-none" style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}>
                H
              </span>
              <span className="font-extrabold text-white text-sm tracking-tight">
                Hire Ethiopia&apos;s Best
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs mb-6 text-white/45">
              Ethiopia&apos;s first curated network matching businesses with vetted creative and digital professionals.
            </p>

            {/* Email */}
            <a
              href="mailto:info@hireethiopiasbest.com"
              className="inline-flex items-center gap-2 text-sm text-[#6dcc46]/80 hover:text-[#6dcc46] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              info@hireethiopiasbest.com
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 border border-white/10 hover:text-[#6dcc46] hover:border-[#6dcc46] transition-all duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block" />

          {/* For Businesses */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5 text-[#6dcc46]">
              For Businesses
            </p>
            <ul className="space-y-3">
              {businessLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/45 hover:text-white transition-colors duration-150">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5 text-[#6dcc46]">
              For Professionals
            </p>
            <ul className="space-y-3">
              {proLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/45 hover:text-white transition-colors duration-150">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.07]">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Hire Ethiopia&apos;s Best. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
            Ethiopia-first · Curated, not crowdsourced
          </div>
        </div>

      </div>
    </footer>
  );
}
