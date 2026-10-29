"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash(null);
      return;
    }
    const sync = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveHash(hash === "how-it-works" || hash === "services" ? hash : null);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key; lock body scroll when open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function navClass(href: string) {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return active
      ? "px-4 py-2 rounded-full text-sm font-semibold bg-[#0d2318] text-white transition-all duration-150"
      : "px-4 py-2 rounded-full text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-150";
  }

  function mobileNavClass(href: string) {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return active
      ? "block w-full text-left px-4 py-3.5 text-sm font-semibold text-[#0d2318] bg-[#0d2318]/5 rounded-xl"
      : "block w-full text-left px-4 py-3.5 text-sm text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors";
  }

  return (
    <>
      {/* Main navbar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-zinc-100 shadow-sm">
        <nav className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group cursor-pointer">
            <span className="w-8 h-8 rounded-lg bg-[#6dcc46] flex items-center justify-center text-[#0d2318] text-sm font-extrabold select-none group-hover:bg-[#7de055] transition-colors">
              H
            </span>
            <span className="font-extrabold text-zinc-900 text-sm tracking-tight">
              Hire Ethiopia&apos;s Best
            </span>
          </a>

          {/* Center links — desktop only */}
          <ul className="hidden md:flex items-center gap-1">
            <li>
              <a
                href="/#how-it-works"
                onClick={() => setActiveHash("how-it-works")}
                className={activeHash === "how-it-works"
                  ? "px-4 py-2 rounded-full text-sm font-semibold bg-[#0d2318] text-white transition-all duration-150"
                  : "px-4 py-2 rounded-full text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-150"}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="/#services"
                onClick={() => setActiveHash("services")}
                className={activeHash === "services"
                  ? "px-4 py-2 rounded-full text-sm font-semibold bg-[#0d2318] text-white transition-all duration-150"
                  : "px-4 py-2 rounded-full text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-150"}
              >
                Services
              </a>
            </li>
            <li>
              <Link href="/portfolio" className={navClass("/portfolio")}>Portfolio</Link>
            </li>
            <li>
              <Link href="/insights" className={navClass("/insights")}>Insights</Link>
            </li>
            <li>
              <Link href="/about" className={navClass("/about")}>About</Link>
            </li>
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Apply as a Pro — desktop only */}
            <Link
              href="/get-started/designer"
              className="hidden md:block px-4 py-2 text-sm text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-50 transition-all duration-150"
            >
              Apply as a Pro
            </Link>

            {/* Submit a Brief — always visible */}
            <Link
              href="/get-started/client"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d2318] text-white text-sm font-semibold hover:bg-[#1a3e28] transition-colors duration-150"
            >
              <span className="hidden sm:inline">Submit a Brief</span>
              <span className="sm:hidden">Brief</span>
              <span className="w-5 h-5 rounded-full bg-[#6dcc46] flex items-center justify-center shrink-0">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0d2318" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-zinc-700 hover:bg-zinc-100 transition-colors"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile slide-in panel from right */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-100 shrink-0">
          <span className="font-extrabold text-zinc-900 text-sm tracking-tight">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Panel nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <a
            href="/#how-it-works"
            onClick={() => { setActiveHash("how-it-works"); setMenuOpen(false); }}
            className="block w-full text-left px-4 py-3.5 text-sm text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors"
          >
            How It Works
          </a>
          <a
            href="/#services"
            onClick={() => { setActiveHash("services"); setMenuOpen(false); }}
            className="block w-full text-left px-4 py-3.5 text-sm text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-colors"
          >
            Services
          </a>
          <Link href="/portfolio" className={mobileNavClass("/portfolio")} onClick={() => setMenuOpen(false)}>
            Portfolio
          </Link>
          <Link href="/insights" className={mobileNavClass("/insights")} onClick={() => setMenuOpen(false)}>
            Insights
          </Link>
          <Link href="/about" className={mobileNavClass("/about")} onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </nav>

        {/* Panel CTA buttons */}
        <div className="px-4 py-5 border-t border-zinc-100 space-y-3 shrink-0">
          <Link
            href="/get-started/designer"
            onClick={() => setMenuOpen(false)}
            className="block w-full px-5 py-3.5 rounded-full border-2 border-[#0d2318] text-[#0d2318] text-sm font-semibold text-center hover:bg-[#0d2318] hover:text-white transition-all duration-150"
          >
            Apply as a Pro
          </Link>
          <Link
            href="/get-started/client"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full bg-[#0d2318] text-white text-sm font-semibold hover:bg-[#1a3e28] transition-colors duration-150"
          >
            Submit a Brief
            <span className="w-5 h-5 rounded-full bg-[#6dcc46] flex items-center justify-center shrink-0">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0d2318" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
