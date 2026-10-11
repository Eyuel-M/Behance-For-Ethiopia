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
            <a href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold select-none transition-colors" style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}>
                H
              </span>
              <span className="font-extrabold text-white text-sm tracking-tight">
                Hire Ethiopia&apos;s Best
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              Ethiopia&apos;s first curated network matching businesses with vetted creative and digital professionals.
            </p>

            {/* Email */}
            <a
              href="mailto:info@hireethiopiasbest.com"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: "rgba(109,204,70,0.8)" }}
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
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#6dcc46";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#6dcc46";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer on large screens */}
          <div className="hidden lg:block" />

          {/* For Businesses */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#6dcc46" }}>
              For Businesses
            </p>
            <ul className="space-y-3">
              {businessLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#6dcc46" }}>
              For Professionals
            </p>
            <ul className="space-y-3">
              {proLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "white"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Hire Ethiopia&apos;s Best. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#6dcc46" }} />
            Ethiopia-first · Curated, not crowdsourced
          </div>
        </div>

      </div>
    </footer>
  );
}
