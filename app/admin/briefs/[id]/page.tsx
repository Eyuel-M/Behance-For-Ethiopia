import Link from "next/link";
import { notFound } from "next/navigation";
import { getClientBrief } from "@/lib/supabase/admin-queries";
import {
  BRIEF_STATUS_LABELS,
  BRIEF_STATUS_COLORS,
  type BriefStatus,
} from "@/lib/supabase/project-types";
import { qualifyBrief, createProjectFromBrief } from "@/app/actions/admin-briefs";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

function Badge({ status }: { status: BriefStatus }) {
  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full border text-xs font-semibold ${BRIEF_STATUS_COLORS[status]}`}>
      {BRIEF_STATUS_LABELS[status]}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2 border-b border-zinc-100 last:border-0">
      <dt className="text-xs font-semibold text-zinc-400 w-36 shrink-0 pt-0.5">{label}</dt>
      <dd className="text-sm text-zinc-700 leading-relaxed">{value}</dd>
    </div>
  );
}

export default async function BriefDetailPage({ params }: Props) {
  const { id } = await params;
  const brief = await getClientBrief(id);
  if (!brief) notFound();

  const status = brief.status as BriefStatus;
  const isActionable = ["new", "needs_clarification", "qualified"].includes(status);
  const canCreateProject = status === "qualified";

  async function handleQualify(formData: FormData) {
    "use server";
    const newStatus = formData.get("status") as string;
    const notes = formData.get("adminNotes") as string;
    await qualifyBrief(id, newStatus, notes);
  }

  return (
    <div className="max-w-3xl">
      {/* Back */}
      <Link href="/admin/briefs" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer mb-6">
        ← All briefs
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{brief.business_name}</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{brief.contact_name} · {brief.email} · {brief.phone}</p>
        </div>
        <Badge status={status} />
      </div>

      {/* Brief content */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Brief</h2>
        <dl>
          <InfoRow label="Service mode" value={brief.service_mode} />
          <InfoRow label="Category" value={brief.category} />
          <InfoRow label="Types of work" value={brief.design_types} />
          <InfoRow label="Timeline" value={brief.timeline} />
          <InfoRow label="Budget" value={brief.budget} />
          <InfoRow label="Engagement type" value={brief.engagement_type} />
          <InfoRow label="References" value={brief.references} />
        </dl>
        <div className="mt-4">
          <dt className="text-xs font-semibold text-zinc-400 mb-1">Project description</dt>
          <dd className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap bg-zinc-50 rounded-lg p-4 border border-zinc-100">
            {brief.project_description}
          </dd>
        </div>
        {brief.additional_notes && (
          <div className="mt-3">
            <dt className="text-xs font-semibold text-zinc-400 mb-1">Additional notes</dt>
            <dd className="text-sm text-zinc-600 leading-relaxed">{brief.additional_notes}</dd>
          </div>
        )}
      </div>

      {/* Context */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 mb-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">Client context</h2>
        <dl>
          <InfoRow label="Worked with designer" value={brief.worked_with_designer} />
          <InfoRow label="Heard about us" value={brief.hear_about_us} />
          <InfoRow label="Submitted" value={new Date(brief.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })} />
        </dl>
      </div>

      {/* Admin notes display */}
      {brief.admin_notes && (
        <div className="rounded-xl border border-amber-100 bg-amber-50 p-5 mb-5">
          <p className="text-xs font-semibold text-amber-700 mb-1">Admin notes</p>
          <p className="text-sm text-amber-800 leading-relaxed whitespace-pre-wrap">{brief.admin_notes}</p>
        </div>
      )}

      {/* Actions panel */}
      {isActionable && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 mb-5">
          <h2 className="text-sm font-bold text-zinc-900 mb-4">Update status</h2>
          <form action={handleQualify} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 block mb-1.5">New status</label>
              <select name="status" className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 cursor-pointer">
                <option value="needs_clarification">Needs clarification</option>
                <option value="qualified">Qualified ✓</option>
                <option value="declined">Declined</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 block mb-1.5">Notes (shown to team, not client)</label>
              <textarea
                name="adminNotes"
                defaultValue={brief.admin_notes ?? ""}
                rows={3}
                placeholder="Why declined, what clarification needed, qualification rationale…"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 resize-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Update status
            </button>
          </form>
        </div>
      )}

      {/* Create project */}
      {canCreateProject && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <h2 className="text-sm font-bold text-zinc-900 mb-1">Create project</h2>
          <p className="text-xs text-zinc-500 mb-5">
            This creates a live project record from this brief. Once created, you can add
            milestones, assign professionals, and track status.
          </p>
          <form action={createProjectFromBrief} className="space-y-4">
            <input type="hidden" name="briefId" value={id} />
            <div>
              <label className="text-xs font-semibold text-zinc-500 block mb-1.5">Project title</label>
              <input
                type="text"
                name="title"
                placeholder={`${brief.category} — ${brief.business_name}`}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 block mb-1.5">Deliverables (from scope)</label>
              <textarea
                name="deliverables"
                defaultValue={brief.project_description}
                rows={4}
                placeholder="Itemised deliverables: 1. Brand identity (logo, colour system, typography)…"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-500 block mb-1.5">Exclusions</label>
                <input type="text" name="exclusions" placeholder="What is NOT included…"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 block mb-1.5">Revision limit</label>
                <input type="number" name="revisionLimit" defaultValue="2" min="1" max="10"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 block mb-1.5">Deadline</label>
                <input type="date" name="deadline"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 cursor-pointer" />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 block mb-1.5">Acceptance criteria</label>
                <input type="text" name="acceptanceCriteria" placeholder="How client confirms completion…"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 block mb-1.5">Manager notes</label>
              <textarea name="managerNotes" rows={2} placeholder="Internal notes for the PM team…"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 resize-none" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-green-500 text-black text-sm font-semibold hover:bg-green-400 transition-colors cursor-pointer"
            >
              Create project →
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
