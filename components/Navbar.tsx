"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState<string | null>(null);

  // Clear hash active state when navigating away from homepage
  useEffect(() => {
    if (pathname !== "/") setActiveHash(null);
  }, [pathname]);

  function navClass(href: string) {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return active
      ? "px-4 py-2 rounded-full text-sm font-semibold bg-[#0d2318] text-white transition-all duration-150"
      : "px-4 py-2 rounded-full text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-150";
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

          {/* Center links */}
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
              <Link href="/insights" className={navClass("/insights")}>
                Insights
              </Link>
            </li>
            <li>
              <Link href="/contact" className={navClass("/contact")}>
                Contact
              </Link>
            </li>
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
