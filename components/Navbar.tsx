import Link from "next/link";
import NavResourcesDropdown from "@/components/NavResourcesDropdown";

const navLinks = [
  { href: "/designers", label: "Browse Designers" },
  { href: "/contact", label: "Contact" },
];

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8" style={{ height: "4.5rem" }}>

        {/* Logo mark + wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
          aria-label="Hire Ethiopia's Best — home"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-green-500 text-black text-sm font-extrabold select-none transition-transform duration-150 group-hover:scale-105">
            H
          </span>
          <span className="font-extrabold text-zinc-900 text-sm tracking-tight leading-none">
            Hire Ethiopia&apos;s Best
          </span>
        </Link>

        {/* Center nav links */}
        <ul className="hidden sm:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 rounded-full text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-150 cursor-pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <NavResourcesDropdown />
          </li>
        </ul>

        {/* Right: secondary text link + CTA pill */}
        <div className="flex items-center gap-1 shrink-0">
          <Link
            href="/contact"
            className="hidden sm:block px-4 py-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150 cursor-pointer rounded-full hover:bg-zinc-50"
          >
            Post a Job
          </Link>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors duration-150 cursor-pointer"
          >
            Get Started
            <ArrowRightIcon />
          </Link>
        </div>

      </nav>
    </header>
  );
}
