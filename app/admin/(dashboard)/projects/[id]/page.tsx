import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  getProjectMilestones,
  getProjectNotes,
  getDesignerApplications,
  getProposalByProject,
} from "@/lib/supabase/admin-queries";
import {
  PROJECT_STATUS_LABELS,
  PROJECT_STATUS_COLORS,
  MILESTONE_STATUS_LABELS,
  MILESTONE_STATUS_COLORS,
  type ProjectStatus,
  type MilestoneStatus,
} from "@/lib/supabase/project-types";
import {
  changeProjectStatus,
  addProjectMilestone,
  changeMilestoneStatus,
  postProjectNote,
} from "@/app/actions/admin-projects";
import ProposalDesignerPicker from "@/components/ProposalDesignerPicker";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ proposalToken?: string }> };

function ProjectBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${PROJECT_STATUS_COLORS[status]}`}>
      {PROJECT_STATUS_LABELS[status]}
    </span>
  );
}

function MilestoneBadge({ status }: { status: MilestoneStatus }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full border text-xs font-medium ${MILESTONE_STATUS_COLORS[status]}`}>
      {MILESTONE_STATUS_LABELS[status]}
    </span>
  );
}

export default async function ProjectDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { proposalToken } = await searchParams;
  const [project, milestones, notes, allDesigners, existingProposal] = await Promise.all([
    getProject(id),
    getProjectMilestones(id),
    getProjectNotes(id),
    getDesignerApplications(),
    getProposalByProject(id),
  ]);
  if (!project) notFound();
  const approvedDesigners = allDesigners.filter((d) => d.status === "approved");

  const status = project.status as ProjectStatus;

  return (
    <div className="max-w-4xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer mb-6">
        ← All projects
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{project.title}</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {project.client_business} · {project.client_name} · {project.client_email}
          </p>
        </div>
        <ProjectBadge status={status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left col — main content */}
        <div className="lg:col-span-2 space-y-5">

          {/* Scope */}
          <Section title="Scope">
            <InfoRow label="Service mode" value={project.service_mode} />
            <InfoRow label="Category" value={project.category} />
            <InfoRow label="Budget" value={project.budget} />
            <InfoRow label="Deadline" value={project.deadline ? new Date(project.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : null} />
            <InfoRow label="Revision limit" value={project.revision_limit?.toString()} />
            <div className="pt-2">
              <dt className="text-xs font-semibold text-zinc-400 mb-1">Deliverables</dt>
              <dd className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap bg-zinc-50 rounded-lg p-3 border border-zinc-100">{project.deliverables}</dd>
            </div>
            {project.exclusions && (
              <div className="pt-2">
                <dt className="text-xs font-semibold text-zinc-400 mb-1">Exclusions</dt>
                <dd className="text-sm text-zinc-600 leading-relaxed">{project.exclusions}</dd>
              </div>
            )}
            {project.acceptance_criteria && (
              <div className="pt-2">
                <dt className="text-xs font-semibold text-zinc-400 mb-1">Acceptance criteria</dt>
                <dd className="text-sm text-zinc-600 leading-relaxed">{project.acceptance_criteria}</dd>
              </div>
            )}
          </Section>

          {/* Milestones */}
          <Section title={`Milestones (${milestones.length})`}>
            {milestones.length === 0 ? (
              <p className="text-xs text-zinc-400 py-2">No milestones yet. Add them below.</p>
            ) : (
              <div className="space-y-2">
                {milestones.map((m, i) => (
                  <div key={m.id} className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                    <span className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-500 shrink-0 mt-0.5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-900">{m.title}</p>
                      {m.description && <p className="text-xs text-zinc-500 mt-0.5">{m.description}</p>}
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        {m.due_date && <span className="text-xs text-zinc-400">Due {new Date(m.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>}
                        {m.payment_condition && <span className="text-xs text-amber-600">{m.payment_condition}</span>}
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <MilestoneBadge status={m.status as MilestoneStatus} />
                      <form action={changeMilestoneStatus}>
                        <input type="hidden" name="milestoneId" value={m.id} />
                        <input type="hidden" name="projectId" value={id} />
                        <select
                          name="status"
                          defaultValue={m.status}
                          onChange={undefined}
                          className="text-xs rounded-lg border border-zinc-200 bg-white px-2 py-1 text-zinc-600 outline-none cursor-pointer focus:border-zinc-900"
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In progress</option>
                          <option value="submitted">Submitted</option>
                          <option value="revision_requested">Revision requested</option>
                          <option value="accepted">Accepted</option>
                        </select>
                        <button type="submit" className="sr-only">Update</button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add milestone form */}
            <form action={addProjectMilestone} className="pt-3 border-t border-zinc-100 space-y-3">
              <input type="hidden" name="projectId" value={id} />
              <input type="hidden" name="sortOrder" value={milestones.length} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Milestone title (e.g. Brand concepts)"
                  required
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                />
                <input
                  type="date"
                  name="dueDate"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 cursor-pointer"
                />
              </div>
              <input
                type="text"
                name="description"
                placeholder="Description (optional)"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              />
              <input
                type="text"
                name="paymentCondition"
                placeholder="Payment condition (optional, e.g. 50% on delivery)"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                + Add milestone
              </button>
            </form>
          </Section>

          {/* Notes / activity log */}
          <Section title="Notes & activity">
            {notes.length === 0 ? (
              <p className="text-xs text-zinc-400">No notes yet.</p>
            ) : (
              <div className="space-y-3 mb-4">
                {notes.map((n) => (
                  <div key={n.id} className={`rounded-xl border px-4 py-3 ${n.is_internal ? "border-amber-100 bg-amber-50" : "border-zinc-100 bg-white"}`}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-zinc-600">{n.author}</span>
                      <div className="flex items-center gap-2">
                        {n.is_internal && (
                          <span className="text-xs text-amber-600 font-medium">Internal</span>
                        )}
                        <span className="text-xs text-zinc-400">
                          {new Date(n.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">{n.content}</p>
                  </div>
                ))}
              </div>
            )}
            <form action={postProjectNote} className="space-y-3 pt-3 border-t border-zinc-100">
              <input type="hidden" name="projectId" value={id} />
              <textarea
                name="content"
                placeholder="Add a note or update…"
                rows={3}
                required
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 resize-none"
              />
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="text"
                  name="author"
                  placeholder="Your name"
                  className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 w-40"
                />
                <label className="flex items-center gap-2 text-xs text-zinc-600 cursor-pointer">
                  <input type="checkbox" name="isInternal" value="true" defaultChecked className="cursor-pointer" />
                  Internal only
                </label>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  Post note
                </button>
              </div>
            </form>
          </Section>
        </div>

        {/* Right col — status + meta */}
        <div className="space-y-5">
          <Section title="Update status">
            <form action={changeProjectStatus} className="space-y-3">
              <input type="hidden" name="projectId" value={id} />
              <select
                name="status"
                defaultValue={status}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 cursor-pointer"
              >
                {(Object.entries(PROJECT_STATUS_LABELS) as [ProjectStatus, string][]).map(([s, label]) => (
                  <option key={s} value={s}>{label}</option>
                ))}
              </select>
              <input
                type="text"
                name="notes"
                placeholder="Notes for this update (optional)"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                Update status
              </button>
            </form>
          </Section>

          {project.manager_notes && (
            <Section title="Manager notes">
              <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">{project.manager_notes}</p>
            </Section>
          )}

          <Section title="Meta">
            <div className="space-y-2 text-xs text-zinc-500">
              <div className="flex gap-2 justify-between">
                <span className="text-zinc-400">Created</span>
                <span>{new Date(project.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
              <div className="flex gap-2 justify-between">
                <span className="text-zinc-400">Updated</span>
                <span>{new Date(project.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
              {project.brief_id && (
                <Link
                  href={`/admin/briefs/${project.brief_id}`}
                  className="block text-green-700 hover:text-green-900 transition-colors cursor-pointer mt-1"
                >
                  View original brief →
                </Link>
              )}
            </div>
          </Section>
        </div>
      </div>

      {/* ── Professional Shortlist ─────────────────────────────── */}
      <div className="mt-5">
        <Section title="Professional Shortlist">

          {/* New proposal token banner */}
          {proposalToken && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-5 py-4">
              <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-1.5">Proposal link generated</p>
              <p className="text-sm text-green-800 mb-2">Share this link with your client — it opens the anonymized shortlist:</p>
              <div className="flex items-center gap-3 flex-wrap bg-white rounded-lg border border-green-200 px-4 py-2.5">
                <code className="text-xs text-zinc-700 flex-1 break-all font-mono">
                  /proposal/{proposalToken}
                </code>
                <Link href={`/proposal/${proposalToken}`} target="_blank"
                  className="text-xs font-bold text-green-700 hover:text-green-900 shrink-0 transition-colors">
                  Preview →
                </Link>
              </div>
              <p className="text-xs text-green-700 mt-2 opacity-60">⚠ Link only persists once Supabase is connected.</p>
            </div>
          )}

          {/* Existing proposal status (when not just generated) */}
          {existingProposal && !proposalToken && (
            <div className={`mb-5 rounded-xl border px-5 py-4 ${existingProposal.status === "selected" ? "border-green-200 bg-green-50" : "border-amber-100 bg-amber-50"}`}>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${existingProposal.status === "selected" ? "text-green-700" : "text-amber-700"}`}>
                    Proposal {existingProposal.status === "selected" ? "— Client selected" : "— Awaiting client"}
                  </p>
                  <p className={`text-sm ${existingProposal.status === "selected" ? "text-green-800" : "text-amber-800"}`}>
                    {existingProposal.status === "selected"
                      ? `Client has chosen a designer. Update project status to In Progress.`
                      : `Proposal sent. Waiting for client to choose a designer.`}
                  </p>
                </div>
                <Link href={`/proposal/${existingProposal.id}`} target="_blank"
                  className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors shrink-0">
                  View proposal →
                </Link>
              </div>
            </div>
          )}

          {/* Picker */}
          {!existingProposal && approvedDesigners.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-zinc-400 mb-3">No approved professionals yet.</p>
              <Link href="/admin/applications" className="text-sm font-semibold text-green-700 hover:text-green-900 transition-colors">
                Review applications →
              </Link>
            </div>
          ) : !existingProposal ? (
            <ProposalDesignerPicker projectId={id} designers={approvedDesigners} />
          ) : (
            <p className="text-sm text-zinc-400 text-center py-4">
              Proposal already active.{" "}
              <Link href={`/proposal/${existingProposal.id}`} target="_blank" className="text-green-700 hover:text-green-900 font-medium transition-colors">
                View it →
              </Link>
            </p>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-1.5 border-b border-zinc-100 last:border-0">
      <dt className="text-xs text-zinc-400 w-28 shrink-0 pt-0.5">{label}</dt>
      <dd className="text-sm text-zinc-700">{value}</dd>
    </div>
  );
}
