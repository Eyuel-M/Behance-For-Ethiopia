import Link from "next/link";
import {
  getClientBriefs,
  getDesignerApplications,
  getProjects,
  getAllMilestones,
} from "@/lib/supabase/admin-queries";

export const dynamic = "force-dynamic";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function fmt(n: number) {
  return `ETB ${n.toLocaleString()}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  accent,
  href,
}: {
  label: string;
  value: number;
  sub: string;
  accent?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col gap-3 hover:border-zinc-300 hover:shadow-sm transition-all duration-150"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">{label}</p>
      <p
        className="text-4xl font-black leading-none tracking-tight"
        style={{ color: accent ?? "#0d2318" }}
      >
        {value}
      </p>
      <p className="text-xs text-zinc-400 leading-snug">{sub}</p>
    </Link>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">{title}</h2>
  );
}

const BRIEF_STATUS_LABEL: Record<string, string> = {
  new: "New",
  needs_clarification: "Needs info",
  qualified: "Qualified",
  declined: "Declined",
  in_progress: "Active",
  completed: "Done",
  cancelled: "Cancelled",
};

const BRIEF_STATUS_COLOR: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-100",
  needs_clarification: "bg-amber-50 text-amber-700 border-amber-100",
  qualified: "bg-[#6dcc46]/10 text-green-700 border-green-100",
  in_progress: "bg-[#0d2318]/5 text-[#0d2318] border-[#0d2318]/10",
  declined: "bg-red-50 text-red-600 border-red-100",
  completed: "bg-zinc-100 text-zinc-500 border-zinc-200",
  cancelled: "bg-zinc-100 text-zinc-400 border-zinc-200",
};

const APP_STATUS_COLOR: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  reviewing: "bg-blue-50 text-blue-700 border-blue-100",
  approved: "bg-[#6dcc46]/10 text-green-700 border-green-100",
  conditionally_approved: "bg-teal-50 text-teal-700 border-teal-100",
  waitlisted: "bg-zinc-100 text-zinc-500 border-zinc-200",
  rejected: "bg-red-50 text-red-500 border-red-100",
};

const PROJECT_STATUS_COLOR: Record<string, string> = {
  ready_to_start: "bg-blue-50 text-blue-700 border-blue-100",
  in_progress: "bg-[#6dcc46]/10 text-green-700 border-green-100",
  submitted_for_review: "bg-amber-50 text-amber-700 border-amber-100",
  revision_requested: "bg-orange-50 text-orange-700 border-orange-100",
  change_requested: "bg-orange-50 text-orange-700 border-orange-100",
  accepted: "bg-[#6dcc46]/10 text-green-700 border-green-100",
  completed: "bg-zinc-100 text-zinc-500 border-zinc-200",
  disputed: "bg-red-50 text-red-600 border-red-100",
  cancelled: "bg-zinc-100 text-zinc-400 border-zinc-200",
};

const PROJECT_STATUS_LABEL: Record<string, string> = {
  ready_to_start: "Starting soon",
  in_progress: "In progress",
  submitted_for_review: "Under review",
  revision_requested: "Revisions",
  change_requested: "Changes",
  accepted: "Accepted",
  completed: "Completed",
  disputed: "On hold",
  cancelled: "Cancelled",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminDashboardPage() {
  const [briefs, applications, projects, milestones] = await Promise.all([
    getClientBriefs(),
    getDesignerApplications(),
    getProjects(),
    getAllMilestones(),
  ]);

  // ── KPI counts ──────────────────────────────────────────────────────────────
  const openBriefs = briefs.filter((b) =>
    ["new", "needs_clarification", "qualified"].includes(b.status)
  );
  const activeProjects = projects.filter((p) =>
    ["ready_to_start", "in_progress", "submitted_for_review", "revision_requested", "change_requested"].includes(p.status)
  );
  const pendingApps = applications.filter((a) =>
    ["pending", "reviewing"].includes(a.status)
  );
  const approvedPros = applications.filter((a) => a.status === "approved");

  // ── Revenue ─────────────────────────────────────────────────────────────────
  const totalPipeline = milestones.reduce((s, m) => s + (m.amount ?? 0), 0);
  const totalFunded = milestones
    .filter((m) => m.payment_status === "funded")
    .reduce((s, m) => s + (m.amount ?? 0), 0);
  const totalReleased = milestones
    .filter((m) => m.payment_status === "released")
    .reduce((s, m) => s + (m.amount ?? 0), 0);

  // ── Activity feed ────────────────────────────────────────────────────────────
  const activity = [
    ...briefs.map((b) => ({
      type: "brief" as const,
      id: b.id,
      title: b.business_name,
      status: b.status,
      statusLabel: BRIEF_STATUS_LABEL[b.status] ?? b.status,
      statusColor: BRIEF_STATUS_COLOR[b.status] ?? "bg-zinc-100 text-zinc-500 border-zinc-200",
      createdAt: b.created_at,
      href: `/admin/briefs/${b.id}`,
    })),
    ...applications.map((a) => ({
      type: "application" as const,
      id: a.id,
      title: a.full_name,
      status: a.status,
      statusLabel: a.status.charAt(0).toUpperCase() + a.status.slice(1).replace(/_/g, " "),
      statusColor: APP_STATUS_COLOR[a.status] ?? "bg-zinc-100 text-zinc-500 border-zinc-200",
      createdAt: a.created_at,
      href: `/admin/applications/${a.id}`,
    })),
    ...projects.map((p) => ({
      type: "project" as const,
      id: p.id,
      title: p.title,
      status: p.status,
      statusLabel: PROJECT_STATUS_LABEL[p.status] ?? p.status,
      statusColor: PROJECT_STATUS_COLOR[p.status] ?? "bg-zinc-100 text-zinc-500 border-zinc-200",
      createdAt: p.created_at,
      href: `/admin/projects/${p.id}`,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const TYPE_TAG: Record<string, { label: string; color: string }> = {
    brief: { label: "Brief", color: "bg-blue-50 text-blue-600 border-blue-100" },
    application: { label: "Application", color: "bg-amber-50 text-amber-600 border-amber-100" },
    project: { label: "Project", color: "bg-[#6dcc46]/10 text-green-700 border-green-100" },
  };

  // ── Project status breakdown ─────────────────────────────────────────────────
  const projectStatusBreakdown = [
    { label: "Starting soon", count: projects.filter((p) => p.status === "ready_to_start").length, color: "#3b82f6" },
    { label: "In progress", count: projects.filter((p) => p.status === "in_progress").length, color: "#6dcc46" },
    { label: "Under review", count: projects.filter((p) => p.status === "submitted_for_review").length, color: "#f59e0b" },
    { label: "Revisions", count: projects.filter((p) => ["revision_requested", "change_requested"].includes(p.status)).length, color: "#f97316" },
    { label: "Completed", count: projects.filter((p) => ["accepted", "completed"].includes(p.status)).length, color: "#16a34a" },
  ].filter((s) => s.count > 0);

  const todayStr = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>

      {/* Page header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1
            className="text-2xl font-black text-zinc-900 tracking-tight"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Dashboard
          </h1>
          <p className="text-sm text-zinc-400 mt-0.5">{todayStr}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/briefs"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white text-sm font-semibold text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-all duration-150"
          >
            Review briefs
            {openBriefs.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                {openBriefs.length}
              </span>
            )}
          </Link>
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
            style={{ backgroundColor: "#0d2318" }}
          >
            Applications
            {pendingApps.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#6dcc46] text-[#0d2318] text-[10px] font-black flex items-center justify-center shrink-0">
                {pendingApps.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard
          label="Open Briefs"
          value={openBriefs.length}
          sub={`${briefs.filter((b) => b.status === "new").length} new · ${briefs.filter((b) => b.status === "qualified").length} qualified`}
          accent="#1d4ed8"
          href="/admin/briefs"
        />
        <KpiCard
          label="Active Projects"
          value={activeProjects.length}
          sub={`${projects.filter((p) => p.status === "in_progress").length} in progress · ${projects.filter((p) => p.status === "submitted_for_review").length} under review`}
          accent="#0d2318"
          href="/admin/projects"
        />
        <KpiCard
          label="Pending Applications"
          value={pendingApps.length}
          sub={`${applications.filter((a) => a.status === "pending").length} waiting · ${applications.filter((a) => a.status === "reviewing").length} reviewing`}
          accent="#d97706"
          href="/admin/applications"
        />
        <KpiCard
          label="Professionals"
          value={approvedPros.length}
          sub="approved in network"
          accent="#16a34a"
          href="/admin/designers"
        />
      </div>

      {/* Main content: activity + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Activity feed (spans 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-zinc-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100">
            <SectionHeader title="Recent Activity" />
          </div>
          {activity.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-zinc-400">No activity yet.</div>
          ) : (
            <ul className="divide-y divide-zinc-50">
              {activity.map((item) => {
                const tag = TYPE_TAG[item.type];
                return (
                  <li key={`${item.type}-${item.id}`}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 transition-colors group"
                    >
                      {/* Type tag */}
                      <span
                        className={`shrink-0 inline-block px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest w-24 text-center ${tag.color}`}
                      >
                        {tag.label}
                      </span>

                      {/* Title */}
                      <p className="flex-1 min-w-0 text-sm font-semibold text-zinc-800 truncate group-hover:text-zinc-900">
                        {item.title}
                      </p>

                      {/* Status badge */}
                      <span
                        className={`shrink-0 hidden sm:inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${item.statusColor}`}
                      >
                        {item.statusLabel}
                      </span>

                      {/* Time */}
                      <span className="shrink-0 text-xs text-zinc-400 tabular-nums w-14 text-right">
                        {timeAgo(item.createdAt)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-5">

          {/* Revenue */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6">
            <SectionHeader title="Revenue (ETB)" />
            <div className="space-y-4">
              <div>
                <p className="text-xs text-zinc-400 mb-1">Total pipeline</p>
                <p className="text-2xl font-black text-zinc-900 tracking-tight">{fmt(totalPipeline)}</p>
              </div>
              <div className="h-px bg-zinc-100" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Funded</span>
                <span className="text-sm font-bold text-zinc-800">{fmt(totalFunded)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Released</span>
                <span className="text-sm font-bold text-zinc-800">{fmt(totalReleased)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
                <span className="text-xs text-zinc-400">Milestones</span>
                <span className="text-xs font-bold text-zinc-400 tabular-nums">
                  {milestones.filter((m) => m.payment_status === "released").length}/{milestones.length} released
                </span>
              </div>
            </div>
          </div>

          {/* Project breakdown */}
          {projects.length > 0 && (
            <div className="bg-white rounded-2xl border border-zinc-200 p-6">
              <SectionHeader title="Projects by Status" />
              {projectStatusBreakdown.length === 0 ? (
                <p className="text-sm text-zinc-400">No projects yet.</p>
              ) : (
                <div className="space-y-3">
                  {projectStatusBreakdown.map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="flex-1 text-sm text-zinc-600">{s.label}</span>
                      <span
                        className="text-sm font-black tabular-nums"
                        style={{ color: s.color }}
                      >
                        {s.count}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Total projects</span>
                    <span className="text-xs font-bold text-zinc-500 tabular-nums">{projects.length}</span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Quick actions bar */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 flex items-center gap-3 flex-wrap">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mr-1">Quick actions</p>
        {[
          { label: "New Project", href: "/admin/projects/new", primary: true },
          { label: "New Brief", href: "/admin/briefs", primary: false },
          { label: "Content Editor", href: "/admin/content", primary: false },
          { label: "Designer Archive", href: "/admin/archive", primary: false },
        ].map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-150 ${
              a.primary
                ? "bg-[#0d2318] text-white border-[#0d2318] hover:opacity-90"
                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
            }`}
          >
            {a.label}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        ))}
      </div>

    </div>
  );
}
