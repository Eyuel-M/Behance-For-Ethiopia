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
  MILESTONE_STATUS_COLORS,
  type ProjectStatus,
  type MilestoneStatus,
} from "@/lib/supabase/project-types";
import {
  addProjectMilestone,
  postProjectNote,
} from "@/app/actions/admin-projects";
import ProposalDesignerPicker from "@/components/ProposalDesignerPicker";
import MilestoneStatusSelect from "@/components/MilestoneStatusSelect";
import ProjectStatusSelect from "@/components/ProjectStatusSelect";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ proposalToken?: string }> };

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

  const activeProposal = existingProposal ?? tokenProposal;
  const approvedDesigners = allDesigners.filter((d) => d.status === "approved");
  const shortlistedDesigners = activeProposal
    ? activeProposal.designer_application_ids.map((did) => allDesigners.find((d) => d.id === did)).filter(Boolean)
    : [];
  const selectedDesigner = activeProposal?.selected_designer_id
    ? allDesigners.find((d) => d.id === activeProposal.selected_designer_id) ?? null
    : null;

  const status = project.status as ProjectStatus;
  const acceptedCount = milestones.filter((m) => m.status === "accepted").length;
  const progressPct = milestones.length > 0 ? Math.round((acceptedCount / milestones.length) * 100) : 0;

  return (
    <div className="max-w-5xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer mb-5 group">
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span> All projects
      </Link>

      {/* ── Hero header ────────────────────────────────────────── */}
      <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-5 mb-5">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-2 flex-wrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold ${PROJECT_STATUS_COLORS[status]}`}>
                {PROJECT_STATUS_LABELS[status]}
              </span>
              {project.deadline && (
                <span className="text-xs text-zinc-400">
                  Due {new Date(project.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 leading-tight mb-1">{project.title}</h1>
            <p className="text-sm text-zinc-500">{project.client_business} · {project.client_name} · {project.client_email}</p>
          </div>

          {/* Status selector */}
          <div className="shrink-0">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5">Status</p>
            <ProjectStatusSelect
              projectId={id}
              currentStatus={status}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 cursor-pointer min-w-[160px]"
            />
          </div>
        </div>

        {/* Progress bar */}
        {milestones.length > 0 && (
          <div className="mt-5 pt-4 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-zinc-400">Overall progress</p>
              <p className="text-xs font-bold text-zinc-700">{progressPct}% · {acceptedCount}/{milestones.length} milestones</p>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left col */}
        <div className="lg:col-span-2 space-y-5">

          {/* Scope */}
          <Card title="Scope">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <Stat label="Budget" value={project.budget} />
              <Stat label="Category" value={project.category} />
              <Stat label="Service mode" value={project.service_mode} />
              <Stat label="Revisions" value={`Up to ${project.revision_limit}`} />
            </div>
            <Field label="Deliverables" value={project.deliverables} />
            {project.exclusions && <Field label="Exclusions" value={project.exclusions} />}
            {project.acceptance_criteria && <Field label="Done when" value={project.acceptance_criteria} />}
          </Card>

          {/* Milestones */}
          <Card title={`Milestones · ${milestones.length}`}>
            {milestones.length === 0 ? (
              <p className="text-xs text-zinc-400 py-1">No milestones yet.</p>
            ) : (
              <div className="space-y-2 mb-5">
                {milestones.map((m, i) => {
                  const ms = m.status as MilestoneStatus;
                  const isAccepted = ms === "accepted";
                  const isActive = ms === "in_progress";
                  return (
                    <div key={m.id} className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors ${
                      isAccepted ? "bg-green-50 border-green-100" : isActive ? "bg-blue-50 border-blue-100" : "bg-zinc-50 border-zinc-100"
                    }`}>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isAccepted ? "bg-green-200 text-green-700" : "bg-zinc-200 text-zinc-500"
                      }`}>{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${isAccepted ? "text-green-900" : "text-zinc-900"}`}>{m.title}</p>
                        <div className="flex items-center gap-2.5 mt-0.5 flex-wrap">
                          {m.due_date && (
                            <span className="text-xs text-zinc-400">
                              Due {new Date(m.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </span>
                          )}
                          {m.payment_condition && (
                            <span className="text-xs font-medium text-amber-600">{m.payment_condition}</span>
                          )}
                        </div>
                      </div>
                      <MilestoneStatusSelect
                        milestoneId={m.id}
                        projectId={id}
                        currentStatus={m.status}
                        className={`text-xs rounded-lg border px-2.5 py-1.5 outline-none cursor-pointer shrink-0 ${
                          MILESTONE_STATUS_COLORS[ms]
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add milestone */}
            <form action={addProjectMilestone} className="pt-4 border-t border-zinc-100 space-y-2.5">
              <input type="hidden" name="projectId" value={id} />
              <input type="hidden" name="sortOrder" value={milestones.length} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input type="text" name="title" placeholder="Milestone title" required
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" />
                <input type="date" name="dueDate"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 cursor-pointer" />
              </div>
              <input type="text" name="description" placeholder="Description (optional)"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" />
              <input type="text" name="paymentCondition" placeholder="Payment condition (e.g. 50% on delivery)"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" />
              <button type="submit"
                className="px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-700 transition-colors cursor-pointer">
                + Add milestone
              </button>
            </form>
          </Card>

          {/* Notes */}
          <Card title="Notes & activity">
            {notes.length > 0 && (
              <div className="space-y-3 mb-4">
                {notes.map((n) => (
                  <div key={n.id} className={`rounded-xl border px-4 py-3 ${n.is_internal ? "border-amber-100 bg-amber-50" : "border-zinc-100 bg-zinc-50"}`}>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-zinc-700">{n.author}</span>
                      <div className="flex items-center gap-2">
                        {n.is_internal && <span className="text-xs text-amber-600 font-medium">Internal</span>}
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
            <form action={postProjectNote} className="space-y-2.5 pt-4 border-t border-zinc-100">
              <input type="hidden" name="projectId" value={id} />
              <textarea name="content" placeholder="Add a note…" rows={3} required
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 resize-none" />
              <div className="flex items-center gap-3 flex-wrap">
                <input type="text" name="author" placeholder="Your name"
                  className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 w-36" />
                <label className="flex items-center gap-1.5 text-xs text-zinc-500 cursor-pointer">
                  <input type="checkbox" name="isInternal" value="true" defaultChecked className="cursor-pointer" />
                  Internal only
                </label>
                <button type="submit"
                  className="px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-700 transition-colors cursor-pointer">
                  Post note
                </button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right col */}
        <div className="space-y-5">

          {/* Client progress link */}
          <Card title="Client link">
            <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
              Share with your client to track milestones and project status.
            </p>
            <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 mb-3">
              <code className="text-xs text-zinc-600 break-all font-mono">/project/{id}</code>
            </div>
            <Link href={`/project/${id}`} target="_blank"
              className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-900 transition-colors">
              Open client view →
            </Link>
          </Card>

          {project.manager_notes && (
            <Card title="Manager notes">
              <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">{project.manager_notes}</p>
            </Card>
          )}

          {/* Meta */}
          <Card title="Details">
            <div className="space-y-2.5 text-xs">
              <Row label="Created" value={new Date(project.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} />
              <Row label="Updated" value={new Date(project.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} />
              <Row label="Budget" value={project.budget} />
              {project.brief_id && (
                <Link href={`/admin/briefs/${project.brief_id}`}
                  className="block pt-1 text-green-700 hover:text-green-900 transition-colors font-semibold">
                  View original brief →
                </Link>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* ── Professional Shortlist ─────────────────────────────── */}
      <div className="mt-5 mb-2">
        <Card title="Professional Shortlist">

          {proposalToken && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-5 py-4">
              <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-1.5">Proposal link ready</p>
              <p className="text-sm text-green-800 mb-3">Share this with your client — it shows the project scope, milestones, and anonymised shortlist.</p>
              <div className="flex items-center gap-3 flex-wrap bg-white rounded-lg border border-green-200 px-4 py-2.5">
                <code className="text-xs text-zinc-700 flex-1 break-all font-mono">/proposal/{proposalToken}</code>
                <Link href={`/proposal/${proposalToken}`} target="_blank"
                  className="text-xs font-bold text-green-700 hover:text-green-900 shrink-0 transition-colors">
                  Preview →
                </Link>
              </div>
            </div>
          )}

          {/* State A — designer chosen */}
          {activeProposal && activeProposal.status === "selected" && (
            <div>
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <p className="text-xs font-bold text-green-700 uppercase tracking-widest">Client selected a professional</p>
                <Link href={`/proposal/${activeProposal.id}`} target="_blank" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">View proposal →</Link>
              </div>
              {selectedDesigner ? (
                <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {selectedDesigner.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900">{selectedDesigner.full_name}</p>
                    <p className="text-xs text-zinc-500">{selectedDesigner.specialty}</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">✓ Selected</span>
                </div>
              ) : (
                <p className="text-sm text-zinc-400">Designer data unavailable.</p>
              )}
            </div>
          )}

          {/* State B — awaiting selection */}
          {activeProposal && activeProposal.status !== "selected" && (
            <div>
              {activeProposal.status === "revision_requested" && activeProposal.client_note && (
                <div className="mb-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
                  <p className="text-xs font-bold text-orange-700 uppercase tracking-widest mb-1">Client requested changes</p>
                  <p className="text-sm text-orange-800 leading-relaxed">&ldquo;{activeProposal.client_note}&rdquo;</p>
                </div>
              )}
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <p className={`text-xs font-semibold uppercase tracking-widest ${activeProposal.status === "revision_requested" ? "text-orange-600" : "text-amber-600"}`}>
                  {activeProposal.status === "revision_requested" ? "Revision requested" : "Awaiting client choice"}
                </p>
                <Link href={`/proposal/${activeProposal.id}`} target="_blank" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">View proposal →</Link>
              </div>
              <div className="space-y-2">
                {shortlistedDesigners.map((d, i) => {
                  if (!d) return null;
                  return (
                    <div key={d.id} className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                      <span className="text-xs font-bold text-zinc-400 w-5 shrink-0">{["A","B","C"][i]}</span>
                      <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {d.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-900">{d.full_name}</p>
                        <p className="text-xs text-zinc-400 truncate">{d.specialty}</p>
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100 shrink-0">Pending</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* State C — no proposal */}
          {!activeProposal && approvedDesigners.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-zinc-400 mb-3">No approved professionals yet.</p>
              <Link href="/admin/applications" className="text-sm font-semibold text-green-700 hover:text-green-900 transition-colors">Review applications →</Link>
            </div>
          )}
          {!activeProposal && approvedDesigners.length > 0 && (
            <ProposalDesignerPicker projectId={id} designers={approvedDesigners} />
          )}
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
      <div className="px-5 py-3.5 border-b border-zinc-100 bg-zinc-50/60">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-3 py-2.5">
      <p className="text-xs text-zinc-400 mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-zinc-800 leading-snug">{value}</p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-xs font-semibold text-zinc-400 mb-1">{label}</p>
      <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap bg-zinc-50 rounded-lg px-3 py-2.5 border border-zinc-100">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-zinc-400">{label}</span>
      <span className="text-zinc-700 font-medium">{value}</span>
    </div>
  );
}
