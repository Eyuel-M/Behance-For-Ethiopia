import Link from "next/link";
import { logoutAdmin } from "@/app/actions/admin-auth";

const NAV = [
  {
    label: "Operations",
    items: [
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-zinc-50">

      {/* Sidebar — sticky, full viewport height, never scrolls */}
      <aside className="w-60 shrink-0 flex flex-col sticky top-0 h-screen bg-zinc-950 border-r border-zinc-800/60">

        {/* Brand */}
        <div className="px-5 pt-5 pb-4 border-b border-zinc-800/60">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center text-black text-xs font-extrabold select-none shrink-0">H</span>
            <div>
              <p className="text-sm font-bold text-white leading-none">Hire Ethiopia</p>
              <p className="text-xs text-zinc-500 mt-0.5 leading-none">Admin portal</p>
            </div>
          </div>
        </div>

        {/* New Project CTA */}
        <div className="px-4 pt-4 pb-3">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl bg-green-500 hover:bg-green-400 active:bg-green-600 transition-colors duration-150 cursor-pointer group"
          >
            <span className="w-5 h-5 rounded-md bg-black/20 flex items-center justify-center text-black text-sm font-extrabold shrink-0 leading-none">+</span>
            <div>
              <p className="text-sm font-bold text-black leading-none">New Project</p>
              <p className="text-xs text-black/50 mt-0.5 leading-none">For calling clients</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 overflow-hidden">
          {NAV.map((section) => (
            <div key={section.label} className="mb-5">
              <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors duration-150 cursor-pointer group"
                  >
                    <span className="text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer — always pinned to bottom */}
        <div className="px-3 pb-4 pt-3 border-t border-zinc-800/60 space-y-0.5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200 transition-colors duration-150 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M2 8l6-6 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 6.5V13a.5.5 0 00.5.5h2.5v-3h2v3H12a.5.5 0 00.5-.5V6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <span className="font-medium">View site</span>
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200 transition-colors duration-150 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <path d="M10.5 10.5L13 8l-2.5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M6 3H3.5A1.5 1.5 0 002 4.5v7A1.5 1.5 0 003.5 13H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <span className="font-medium">Sign out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Content — this is what scrolls, not the sidebar */}
      <div className="flex-1 min-w-0 overflow-auto">
        <main className="p-6 sm:p-10">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>

    </div>
  );
}
