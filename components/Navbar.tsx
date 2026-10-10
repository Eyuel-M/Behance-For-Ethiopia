import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#0d2318] py-2.5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
          <p className="text-xs text-[#6dcc46] font-medium">
            Ethiopia&apos;s first curated creative talent network
          </p>
          <div className="hidden sm:flex items-center gap-5 text-xs text-white/40">
            <span>info@hireethiopiasbest.com</span>
            <span className="flex items-center gap-2">
              <span>Follow us</span>
              <span className="flex gap-1.5">
                {["f", "in", "ig"].map((s) => (
                  <span key={s} className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[9px] font-bold text-white/50">
                    {s}
                  </span>
                ))}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-zinc-100 shadow-sm">
        <nav className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group cursor-pointer">
            <span className="w-8 h-8 rounded-lg bg-[#6dcc46] flex items-center justify-center text-[#0d2318] text-sm font-extrabold select-none group-hover:bg-[#7de055] transition-colors">
              H
            </span>
            <span className="font-extrabold text-zinc-900 text-sm tracking-tight">
              Hire Ethiopia&apos;s Best
            </span>
          </Link>

          {/* Center links */}
          <ul className="hidden md:flex items-center gap-1">
            {[
              { href: "/#how-it-works", label: "How It Works" },
              { href: "/#services", label: "Services" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="px-4 py-2 rounded-full text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-150"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right CTAs */}
          <div className="flex items-center gap-2">
            <Link
              href="/get-started/designer"
              className="hidden sm:block px-4 py-2 text-sm text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-50 transition-all duration-150"
            >
              Apply as a Pro
            </Link>
            <Link
              href="/get-started/client"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d2318] text-white text-sm font-semibold hover:bg-[#1a3e28] transition-colors duration-150"
            >
              Submit a Brief
              <span className="w-5 h-5 rounded-full bg-[#6dcc46] flex items-center justify-center shrink-0">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0d2318" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </Link>
          </div>

        </nav>
      </header>
    </>
  );
}
