import Link from "next/link";
import { logoutAdmin } from "@/app/actions/admin-auth";

const navItems = [
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/designers", label: "Designers" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-slate-900 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-700">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Admin</p>
          <p className="text-sm font-bold text-white mt-0.5">Hire Ethiopia</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-150 cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-slate-700">
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors duration-150 cursor-pointer text-left"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
