import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-zinc-100">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group cursor-pointer">
          <span className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center text-black text-xs font-extrabold select-none group-hover:bg-green-400 transition-colors">
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
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors duration-150"
          >
            Submit a Brief
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>

      </nav>
    </header>
  );
}
