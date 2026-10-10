"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    label: "Operations",
    items: [
      {
        href: "/admin/projects/new",
        label: "New Project",
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        href: "/admin/briefs",
        label: "Client Briefs",
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        href: "/admin/applications",
        label: "Pro Applications",
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M2.5 13c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        href: "/admin/projects",
        label: "Projects",
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 4.5A1.5 1.5 0 013.5 3h9A1.5 1.5 0 0114 4.5v7a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 11.5v-7z" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M5 7h6M5 10h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        ),
      },
    ],
  },
  {
    label: "Talent",
    items: [
      {
        href: "/admin/designers",
        label: "Professionals",
        icon: (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M1.5 13c0-2.485 2.014-4 4.5-4s4.5 1.515 4.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M11 7.5l1.5 1.5L15 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
    ],
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 py-3 overflow-hidden">
      {NAV.map((section) => (
        <div key={section.label} className="mb-5">
          <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            {section.label}
          </p>
          <div className="space-y-0.5">
            {section.items.map((item) => {
              const isActive =
                item.href === "/admin/projects/new"
                  ? pathname === item.href
                  : item.href === "/admin/projects"
                  ? pathname.startsWith("/admin/projects") && pathname !== "/admin/projects/new"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 cursor-pointer group ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
                  }`}
                >
                  <span className={`shrink-0 transition-colors ${isActive ? "text-white" : "text-zinc-600 group-hover:text-zinc-300"}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
