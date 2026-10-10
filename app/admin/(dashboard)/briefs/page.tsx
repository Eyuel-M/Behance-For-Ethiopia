import Link from "next/link";
import { getClientBriefs, getProjects, getDesignerApplications, getProposals } from "@/lib/supabase/admin-queries";
import {
  BRIEF_STATUS_LABELS,
  BRIEF_STATUS_COLORS,
  type BriefStatus,
} from "@/lib/supabase/project-types";

export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: BriefStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-semibold ${BRIEF_STATUS_COLORS[status]}`}>
      {BRIEF_STATUS_LABELS[status]}
    </span>
  );
}

export default async function BriefsPage() {
  const [briefs, projects, applications, proposals] = await Promise.all([
    getClientBriefs(),
    getProjects(),
    getDesignerApplications(),
    getProposals(),
  ]);

  const appById = new Map(applications.map((a) => [a.id, a]));

  // Map project_id → selected designer name from proposals (most reliable source)
  const selectedByProject = new Map<string, string>();
  for (const prop of proposals) {
    if (prop.selected_designer_id) {
      const pro = appById.get(prop.selected_designer_id);
      if (pro) selectedByProject.set(prop.project_id, pro.full_name);
    }
  }

  // Map project_id → brief_id so we can go brief → project → designer
  const assignedByBrief = new Map<string, string>();
  for (const p of projects) {
    if (!p.brief_id) continue;
    // prefer proposal selection; fall back to assigned_professional_ids on the project
    const fromProposal = selectedByProject.get(p.id);
    if (fromProposal) {
      assignedByBrief.set(p.brief_id, fromProposal);
      continue;
    }
    if (p.assigned_professional_ids?.length) {
      const pro = appById.get(p.assigned_professional_ids[0]);
      if (pro) assignedByBrief.set(p.brief_id, pro.full_name);
    }
  }

  const counts = briefs.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] ?? 0) + 1;
    return acc;
  }, {});

  const actionableStatuses: BriefStatus[] = ["new", "needs_clarification"];
  const actionable = briefs.filter((b) => actionableStatuses.includes(b.status as BriefStatus));
  const rest = briefs.filter((b) => !actionableStatuses.includes(b.status as BriefStatus));

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Client Briefs</h1>
          <p className="text-sm text-zinc-400 mt-0.5">{briefs.length} total · {actionable.length} need action</p>
        </div>
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-2 mb-7">
        {(Object.entries(BRIEF_STATUS_LABELS) as [BriefStatus, string][]).map(([status, label]) => {
          const count = counts[status] ?? 0;
          if (count === 0) return null;
          return (
            <span key={status} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${BRIEF_STATUS_COLORS[status]}`}>
              {label}
              <span className="font-bold">{count}</span>
            </span>
          );
        })}
      </div>

      {briefs.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-16 text-center">
          <p className="text-zinc-400 text-sm">No briefs yet. They appear here when businesses submit the form.</p>
        </div>
      ) : (
        <>
          {actionable.length > 0 && (
            <BriefTable briefs={actionable} heading="Need action" assignedByBrief={assignedByBrief} />
          )}
          {rest.length > 0 && (
            <div className="mt-8">
              <BriefTable briefs={rest} heading="All others" assignedByBrief={assignedByBrief} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function BriefTable({
  briefs,
  heading,
  assignedByBrief,
}: {
  briefs: Awaited<ReturnType<typeof getClientBriefs>>;
  heading: string;
  assignedByBrief: Map<string, string>;
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">{heading}</h2>
      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50">
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide">Business</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">Mode</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden lg:table-cell">Budget</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden xl:table-cell">Assigned</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide hidden md:table-cell">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-zinc-500 text-xs uppercase tracking-wide"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {briefs.map((b) => {
              const assigned = assignedByBrief.get(b.id);
              const initials = assigned
                ? assigned.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                : null;
              return (
                <tr key={b.id} className="hover:bg-zinc-50 transition-colors duration-100">
                  <td className="px-4 py-3">
                    <p className="font-medium text-zinc-900 leading-snug">{b.business_name}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{b.contact_name}</p>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 hidden sm:table-cell">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-xs">
                      {b.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 hidden md:table-cell text-xs">{b.service_mode}</td>
                  <td className="px-4 py-3 text-zinc-600 hidden lg:table-cell">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-medium">
                      {b.budget}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status as BriefStatus} />
                  </td>
                  <td className="px-4 py-3 hidden xl:table-cell">
                    {assigned ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-green-700">{initials}</span>
                        </div>
                        <span className="text-xs font-medium text-zinc-700 truncate max-w-[120px]">{assigned}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 hidden md:table-cell whitespace-nowrap text-xs">
                    {new Date(b.created_at).toLocaleDateString("en-GB", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/briefs/${b.id}`}
                      className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      Review →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
