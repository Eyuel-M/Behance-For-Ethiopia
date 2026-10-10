import Link from "next/link";
import { logoutAdmin } from "@/app/actions/admin-auth";
import AdminNav from "@/components/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-zinc-50">

      {/* Sidebar */}
      <aside className="w-56 shrink-0 flex flex-col sticky top-0 h-screen bg-zinc-950 border-r border-zinc-800/60">

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

        {/* Nav (client component for active state) */}
        <AdminNav />

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

      {/* Content */}
      <div className="flex-1 min-w-0 overflow-auto">
        <main className="p-6 sm:p-10">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>

    </div>
  );
}
