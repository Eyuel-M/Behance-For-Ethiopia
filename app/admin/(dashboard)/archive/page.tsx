import Link from "next/link";
import { getArchivedBriefs, getArchivedApplications } from "@/lib/supabase/admin-queries";
import { restoreBriefAction } from "@/app/actions/admin-briefs";
import { restoreApplicationAction } from "@/app/actions/admin-applications";

export const dynamic = "force-dynamic";

function EmptyState({ label }: { label: string }) {
  return (
    <div className="py-10 text-center rounded-2xl border border-dashed border-zinc-200">
      <p className="text-sm text-zinc-400">{label}</p>
    </div>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-sm font-bold text-zinc-900">{title}</h2>
      <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 text-xs font-semibold">{count}</span>
    </div>
  );
}

export default async function ArchivePage() {
  const [briefs, applications] = await Promise.all([
    getArchivedBriefs(),
    getArchivedApplications(),
  ]);

  const total = briefs.length + applications.length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6dcc46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="21 8 21 21 3 21 3 8" />
              <rect x="1" y="3" width="22" height="5" rx="1" />
              <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
            <h1 className="text-2xl font-black text-zinc-900">Archive</h1>
            {total > 0 && (
              <span className="ml-1 px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-xs font-bold">{total}</span>
            )}
          </div>
          <p className="text-sm text-zinc-400">Archived records are hidden from active lists. Restore to bring them back.</p>
        </div>
      </div>

      <div className="space-y-10">

        {/* ── Briefs ── */}
        <section>
          <SectionHeader title="Client Briefs" count={briefs.length} />
          {briefs.length === 0 ? (
            <EmptyState label="No archived briefs" />
          ) : (
            <div className="space-y-2">
              {briefs.map((brief) => {
                const initials = brief.business_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <div
                    key={brief.id}
                    className="bg-white rounded-2xl border border-zinc-200 px-5 py-4 flex items-center gap-4 flex-wrap"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-500 text-xs font-black shrink-0 select-none">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-zinc-900 truncate">{brief.business_name}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{brief.category} · {brief.contact_name} · {brief.email}</p>
                    </div>
                    <p className="text-xs text-zinc-400 shrink-0 hidden sm:block">
                      {new Date(brief.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/admin/briefs/${brief.id}`}
                        className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
                      >
                        View
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await restoreBriefAction(brief.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="text-xs font-bold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                          style={{ backgroundColor: "#0d2318", color: "#6dcc46" }}
                        >
                          ↩ Restore
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Applications ── */}
        <section>
          <SectionHeader title="Pro Applications" count={applications.length} />
          {applications.length === 0 ? (
            <EmptyState label="No archived applications" />
          ) : (
            <div className="space-y-2">
              {applications.map((app) => {
                const initials = app.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-zinc-200 px-5 py-4 flex items-center gap-4 flex-wrap"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-500 text-xs font-black shrink-0 select-none">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-zinc-900 truncate">{app.full_name}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{app.specialty} · {app.email}</p>
                    </div>
                    <p className="text-xs text-zinc-400 shrink-0 hidden sm:block">
                      {new Date(app.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 px-3 py-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
                      >
                        View
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await restoreApplicationAction(app.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="text-xs font-bold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                          style={{ backgroundColor: "#0d2318", color: "#6dcc46" }}
                        >
                          ↩ Restore
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
