import Link from "next/link";
import { logoutAdmin } from "@/app/actions/admin-auth";

const navSections = [
  {
    label: "Operations",
    items: [
      { href: "/admin/briefs", label: "Client Briefs", badge: null },
      { href: "/admin/applications", label: "Pro Applications", badge: null },
      { href: "/admin/projects", label: "Projects", badge: null },
    ],
  },
  {
    label: "Talent",
    items: [
      { href: "/admin/designers", label: "Professionals", badge: null },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-zinc-900 flex flex-col">
        <div className="px-5 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center text-black text-xs font-extrabold select-none">H</span>
            <p className="text-xs font-bold text-white">Hire Ethiopia</p>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Admin portal</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="px-3 text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    <span>{item.label}</span>
                    {item.badge !== null && (
                      <span className="px-1.5 py-0.5 rounded-full bg-green-500 text-black text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-zinc-800">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors duration-150 cursor-pointer mb-1"
          >
            ← View site
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors duration-150 cursor-pointer text-left"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 p-6 sm:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
