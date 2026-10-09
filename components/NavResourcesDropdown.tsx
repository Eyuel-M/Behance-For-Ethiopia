"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// ─── Icons ────────────────────────────────────────────────────────────────────

function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function NewspaperIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ─── Menu items ────────────────────────────────────────────────────────────────

const items = [
  {
    href: "/resources/digital-assets",
    icon: <LayersIcon />,
    iconBg: "bg-green-50 text-green-700",
    title: "Digital Assets",
    description: "Mockups, 3D assets, icons, fonts, UI kits, textures & stock media",
    tag: "100+ resources",
  },
  {
    href: "/resources/courses",
    icon: <GraduationCapIcon />,
    iconBg: "bg-blue-50 text-blue-700",
    title: "Courses & Learning",
    description: "Curated platforms for UI/UX, branding, motion, typography & 3D",
    tag: "All levels",
  },
  {
    href: "/resources/insights",
    icon: <NewspaperIcon />,
    iconBg: "bg-amber-50 text-amber-700",
    title: "Insights & News",
    description: "Publications, YouTube channels, newsletters & design communities",
    tag: "Stay current",
  },
  {
    href: "/resources/jobs",
    icon: <BriefcaseIcon />,
    iconBg: "bg-purple-50 text-purple-700",
    title: "Jobs & Opportunities",
    description: "Job boards, freelance platforms & career resources for designers",
    tag: "Find work",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function NavResourcesDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1 px-4 py-2 rounded-full text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-150 cursor-pointer"
      >
        Resources
        <ChevronDownIcon open={open} />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-80 rounded-2xl border border-zinc-100 bg-white shadow-xl shadow-zinc-200/60 p-1.5 z-50 transition-all duration-150 ease-out origin-top ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {/* Arrow notch */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white border-l border-t border-zinc-100" />

        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors duration-100 cursor-pointer"
          >
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
                <span className="text-xs text-zinc-400 shrink-0">{item.tag}</span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{item.description}</p>
            </div>
            <span className="text-zinc-300 group-hover:text-zinc-500 mt-1 shrink-0 transition-colors duration-100">
              <ArrowRightIcon />
            </span>
          </Link>
        ))}

        <div className="border-t border-zinc-100 mt-1 pt-1.5 pb-0.5 px-3">
          <Link
            href="/resources"
            className="flex items-center justify-between text-xs text-zinc-400 hover:text-zinc-700 transition-colors duration-100 cursor-pointer py-1"
          >
            <span>Browse all resources</span>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
