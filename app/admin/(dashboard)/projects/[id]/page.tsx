import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  getProjectMilestones,
  getProjectNotes,
  getDesignerApplications,
  getProposalByProject,
  getProposalByToken,
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
  const [project, milestones, notes, allDesigners, existingProposal, tokenProposal] = await Promise.all([
    getProject(id),
    getProjectMilestones(id),
    getProjectNotes(id),
    getDesignerApplications(),
    getProposalByProject(id),
    proposalToken ? getProposalByToken(proposalToken) : Promise.resolve(null),
  ]);
  if (!project) notFound();
  // Use whichever proposal we can find — DB-saved one takes priority,
  // tokenProposal covers demo mode where getProposalByProject returns null.
  const activeProposal = existingProposal ?? tokenProposal;
  const approvedDesigners = allDesigners.filter((d) => d.status === "approved");
  const shortlistedDesigners = activeProposal
    ? (activeProposal.designer_application_ids
        .map((did) => allDesigners.find((d) => d.id === did))
        .filter(Boolean))
    : [];
  const selectedDesigner = activeProposal?.selected_designer_id
    ? allDesigners.find((d) => d.id === activeProposal.selected_designer_id) ?? null
    : null;

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

          {/* Client progress link */}
          <Section title="Client progress link">
            <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
              Share this read-only link with your client so they can track milestones and project status.
            </p>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 mb-2">
              <code className="text-xs text-zinc-600 break-all font-mono">/project/{id}</code>
            </div>
            <Link
              href={`/project/${id}`}
              target="_blank"
              className="text-xs font-semibold text-green-700 hover:text-green-900 transition-colors"
            >
              Preview link →
            </Link>
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

          {/* Proposal token banner (just generated) */}
          {proposalToken && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-5 py-4">
              <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-1.5">Proposal link generated</p>
              <p className="text-sm text-green-800 mb-2">Share this link with your client — it shows the project scope, milestones, and anonymized shortlist:</p>
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

          {/* ── State A: Client selected a designer ── */}
          {activeProposal && activeProposal.status === "selected" && (
            <div>
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-widest">Client selected a professional</p>
                <Link href={`/proposal/${activeProposal.id}`} target="_blank"
                  className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">
                  View proposal →
                </Link>
              </div>
              {selectedDesigner ? (
                <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3.5">
                  <div className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {selectedDesigner.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900">{selectedDesigner.full_name}</p>
                    <p className="text-xs text-zinc-500 truncate">{selectedDesigner.specialty} · {selectedDesigner.hourly_rate}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 shrink-0">
                    ✓ Selected
                  </span>
                </div>
              ) : (
                <p className="text-sm text-zinc-400">Designer data unavailable.</p>
              )}
              <p className="text-xs text-zinc-400 mt-3">Update the project status to &quot;In progress&quot; to kick things off.</p>
            </div>
          )}

          {/* ── State B: Proposal sent, awaiting client ── */}
          {activeProposal && activeProposal.status !== "selected" && (
            <div>
              {activeProposal.status === "revision_requested" && activeProposal.client_note && (
                <div className="mb-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
                  <p className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-1">Client requested changes</p>
                  <p className="text-sm text-orange-800 leading-relaxed">&ldquo;{activeProposal.client_note}&rdquo;</p>
                  <p className="text-xs text-orange-600 mt-2">Update the shortlist and generate a new proposal link for this client.</p>
                </div>
              )}
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <p className={`text-xs font-semibold uppercase tracking-widest ${activeProposal.status === "revision_requested" ? "text-orange-600" : "text-amber-600"}`}>
                  {activeProposal.status === "revision_requested" ? "Revision requested" : "Pending client selection"}
                </p>
                <Link href={`/proposal/${activeProposal.id}`} target="_blank"
                  className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">
                  View proposal →
                </Link>
              </div>
              <div className="space-y-2">
                {shortlistedDesigners.map((d, i) => {
                  if (!d) return null;
                  const initials = d.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                  return (
                    <div key={d.id} className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                      <span className="text-xs font-bold text-zinc-400 w-6 text-center shrink-0">
                        {["A","B","C"][i]}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-900">{d.full_name}</p>
                        <p className="text-xs text-zinc-400 truncate">{d.specialty} · {d.city}</p>
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
                        Pending
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-zinc-400 mt-3">Waiting for the client to choose from the shortlist above.</p>
            </div>
          )}

          {/* ── State C: No proposal yet ── */}
          {!activeProposal && approvedDesigners.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-zinc-400 mb-3">No approved professionals yet.</p>
              <Link href="/admin/applications" className="text-sm font-semibold text-green-700 hover:text-green-900 transition-colors">
                Review applications →
              </Link>
            </div>
          )}
          {!activeProposal && approvedDesigners.length > 0 && (
            <ProposalDesignerPicker projectId={id} designers={approvedDesigners} />
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
