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

function StatusBadge({ status }: { status: BriefStatus }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold tracking-wide ${BRIEF_STATUS_COLORS[status]}`}>
      {BRIEF_STATUS_LABELS[status]}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-semibold text-zinc-800 leading-snug">{value}</p>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default async function BriefDetailPage({ params }: Props) {
  const { id } = await params;
  const brief = await getClientBrief(id);
  if (!brief) notFound();

  const status = brief.status as BriefStatus;
  const initials = brief.business_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const isActionable = ["new", "needs_clarification"].includes(status);
  const canCreateProject = status === "qualified";

  async function handleQualify(formData: FormData) {
    "use server";
    const newStatus = formData.get("status") as string;
    const notes = formData.get("adminNotes") as string;
    await qualifyBrief(id, newStatus, notes);
  }

  return (
    <div>

      {/* Back */}
      <Link
        href="/admin/briefs"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer mb-6 group"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
        All briefs
      </Link>

      {/* Hero card */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 mb-5 flex items-start gap-5 flex-wrap">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-white text-xl font-black shrink-0 select-none">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
            <div>
              <h1 className="text-2xl font-black text-zinc-900">{brief.business_name}</h1>
              <p className="text-sm text-zinc-500 mt-0.5">{brief.category} · {brief.service_mode}</p>
            </div>
            <StatusBadge status={status} />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
            <span>{brief.contact_name}</span>
            <span className="text-zinc-200 hidden sm:inline">|</span>
            <span>{brief.email}</span>
            <span className="text-zinc-200 hidden sm:inline">|</span>
            <span>{brief.phone}</span>
          </div>
        </div>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="Budget" value={brief.budget} />
        <StatCard label="Timeline" value={brief.timeline} />
        <StatCard label="Engagement" value={brief.engagement_type} />
        <StatCard label="Submitted" value={new Date(brief.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} />
      </div>

      {/* Project brief */}
      <SectionCard title="Project Brief">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-zinc-400 mb-2">Types of work requested</p>
            <p className="text-sm font-medium text-zinc-800">{brief.design_types}</p>
          </div>
          <div className="h-px bg-zinc-100" />
          <div>
            <p className="text-xs font-semibold text-zinc-400 mb-2">Project description</p>
            <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap bg-zinc-50 rounded-xl p-4 border border-zinc-100">
              {brief.project_description}
            </p>
          </div>
          {brief.references && (
            <>
              <div className="h-px bg-zinc-100" />
              <div>
                <p className="text-xs font-semibold text-zinc-400 mb-2">Reference links</p>
                <a
                  href={brief.references}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-700 hover:text-green-900 font-medium transition-colors"
                >
                  {brief.references} →
                </a>
              </div>
            </>
          )}
          {brief.additional_notes && (
            <>
              <div className="h-px bg-zinc-100" />
              <div>
                <p className="text-xs font-semibold text-zinc-400 mb-2">Additional notes</p>
                <p className="text-sm text-zinc-600 leading-relaxed">{brief.additional_notes}</p>
              </div>
            </>
          )}
        </div>
      </SectionCard>

      {/* Client context */}
      <div className="mt-5">
        <SectionCard title="Client Context">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
              <p className="text-xs font-semibold text-zinc-400 mb-1">Worked with a designer before?</p>
              <p className="text-sm font-medium text-zinc-800">{brief.worked_with_designer}</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100">
              <p className="text-xs font-semibold text-zinc-400 mb-1">How they heard about us</p>
              <p className="text-sm font-medium text-zinc-800">{brief.hear_about_us}</p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Admin notes */}
      {brief.admin_notes && (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Admin notes</p>
          <p className="text-sm text-amber-800 leading-relaxed whitespace-pre-wrap">{brief.admin_notes}</p>
        </div>
      )}

      {/* Update status */}
      {isActionable && (
        <div className="mt-5">
          <SectionCard title="Update Status">
            <form action={handleQualify} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">New status</label>
                  <select
                    name="status"
                    defaultValue={status}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="needs_clarification">Needs clarification</option>
                    <option value="qualified">Qualified ✓</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                  Notes (team only, not shown to client)
                </label>
                <textarea
                  name="adminNotes"
                  defaultValue={brief.admin_notes ?? ""}
                  rows={4}
                  placeholder="Why declined, clarification needed, qualification rationale…"
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Update status
              </button>
            </form>
          </SectionCard>
        </div>
      )}

      {/* Create project */}
      {canCreateProject && (
        <div className="mt-5 mb-8">
          <div className="bg-white rounded-2xl border border-green-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-green-100 bg-green-50">
              <h2 className="text-xs font-bold uppercase tracking-widest text-green-700">Create Project</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-zinc-500 mb-5">
                Creates a live project record from this brief. Once created you can add milestones, assign professionals, and track status.
              </p>
              <form action={createProjectFromBrief} className="space-y-4">
                <input type="hidden" name="briefId" value={id} />
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Project title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder={`${brief.category} — ${brief.business_name}`}
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Deliverables</label>
                  <textarea
                    name="deliverables"
                    defaultValue={brief.project_description}
                    rows={4}
                    placeholder="Itemised deliverables: 1. Brand identity (logo, colour system, typography)…"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Exclusions</label>
                    <input type="text" name="exclusions" placeholder="What is NOT included…"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Revision limit</label>
                    <input type="number" name="revisionLimit" defaultValue="2" min="1" max="10"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Deadline</label>
                    <input type="date" name="deadline"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 cursor-pointer" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Acceptance criteria</label>
                    <input type="text" name="acceptanceCriteria" placeholder="How client confirms completion…"
                      className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Manager notes</label>
                  <textarea name="managerNotes" rows={2} placeholder="Internal notes for the PM team…"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 resize-none" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-green-500 text-black text-sm font-bold hover:bg-green-400 transition-colors cursor-pointer"
                >
                  Create project →
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
