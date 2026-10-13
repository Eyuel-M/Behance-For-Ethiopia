import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getClientBrief,
  getProjects,
  getDesignerApplications,
  getDesignerPitchesByBrief,
} from "@/lib/supabase/admin-queries";
import {
  BRIEF_STATUS_LABELS,
  BRIEF_STATUS_COLORS,
  type BriefStatus,
} from "@/lib/supabase/project-types";
import { qualifyBrief, createProjectFromBrief, deleteBrief } from "@/app/actions/admin-briefs";
import { assignDesigners, sendToClient } from "@/app/actions/admin-pitches";
import ConfirmDeleteButton from "@/components/ConfirmDeleteButtonClient";

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
  const [brief, projects, allDesigners, pitches] = await Promise.all([
    getClientBrief(id),
    getProjects(),
    getDesignerApplications(),
    getDesignerPitchesByBrief(id),
  ]);
  if (!brief) notFound();

  const status = brief.status as BriefStatus;
  const initials = brief.business_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const existingProject = projects.find((p) => p.brief_id === id) ?? null;
  const isTerminal = ["declined", "cancelled", "completed"].includes(status);
  const isActionable = !isTerminal;
  const canCreateProject = !existingProject && status === "qualified";

  const approvedDesigners = allDesigners.filter((d) => d.status === "approved");
  const assignedDesignerIds = new Set(pitches.map((p) => p.designer_id));
  const availableDesigners = approvedDesigners.filter((d) => !assignedDesignerIds.has(d.id));
  const canAssign = status === "qualified" && !existingProject && pitches.length < 3;
  const submittedPitches = pitches.filter((p) => p.status === "submitted");
  const canSendToClient = status === "qualified" && !existingProject && pitches.length > 0;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  async function handleQualify(formData: FormData) {
    "use server";
    const newStatus = formData.get("status") as import("@/lib/supabase/project-types").BriefStatus;
    const notes = formData.get("adminNotes") as string;
    await qualifyBrief(id, newStatus, notes);
  }

  return (
    <div>

      {/* Back + delete */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/briefs"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          All briefs
        </Link>
        <ConfirmDeleteButton
          action={async () => { "use server"; await deleteBrief(id); }}
          label="Delete brief"
          confirmMessage="Delete this brief permanently? This cannot be undone."
        />
      </div>

      {/* ── Status action bar — always on top ── */}
      {isActionable && (
        <form action={handleQualify} className="mb-5 rounded-2xl overflow-hidden border-2 border-[#0d2318]">
          <div className="bg-[#0d2318] px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#6dcc46] animate-pulse" />
              <p className="text-sm font-bold text-white">Update Brief Status</p>
              <span className="hidden sm:inline text-white/30">·</span>
              <span className="hidden sm:inline text-xs text-white/40">Current:</span>
              <StatusBadge status={status} />
            </div>
            <button
              type="submit"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer"
              style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Save changes
            </button>
          </div>
          <div className="bg-white px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">New status</label>
              <select
                name="status"
                defaultValue={status}
                className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-900 bg-white outline-none focus:border-[#0d2318] cursor-pointer"
              >
                <option value="new">New</option>
                <option value="needs_clarification">Needs clarification</option>
                <option value="qualified">Qualified ✓</option>
                <option value="in_progress">In progress</option>
                <option value="completed">Completed</option>
                <option value="declined">Declined</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                Internal notes <span className="font-normal normal-case text-zinc-400">(team only)</span>
              </label>
              <textarea
                name="adminNotes"
                defaultValue={brief.admin_notes ?? ""}
                rows={1}
                placeholder="Why declined, clarification needed, qualification rationale…"
                className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318] resize-none"
              />
            </div>
          </div>
        </form>
      )}

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


      {/* Existing project link */}
      {existingProject && (
        <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-1">Project created</p>
            <p className="text-sm font-semibold text-zinc-800">{existingProject.title}</p>
            <p className="text-xs text-zinc-400 mt-0.5 capitalize">{existingProject.status.replace(/_/g, " ")}</p>
          </div>
          <Link
            href={`/admin/projects/${existingProject.id}`}
            className="px-5 py-2.5 rounded-full bg-green-700 text-white text-sm font-bold hover:bg-green-900 transition-colors shrink-0"
          >
            View project →
          </Link>
        </div>
      )}

      {/* ── Assign Designers ── */}
      {canAssign && availableDesigners.length > 0 && (
        <div className="mt-5">
          <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Assign Designers</h2>
              <span className="text-xs text-zinc-400">{3 - pitches.length} slot{3 - pitches.length !== 1 ? "s" : ""} remaining</span>
            </div>
            <div className="p-6">
              <p className="text-sm text-zinc-500 mb-5">
                Select up to {3 - pitches.length} approved designer{3 - pitches.length !== 1 ? "s" : ""} to pitch for this brief.
                Each will receive a unique link to submit their approach, timeline, and price.
              </p>
              <form action={assignDesigners} className="space-y-4">
                <input type="hidden" name="briefId" value={id} />
                {[0, 1, 2].filter((i) => i < (3 - pitches.length)).map((i) => (
                  <div key={i}>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                      Designer {i + 1 + pitches.length}
                    </label>
                    <select
                      name={`designer_${i}`}
                      className="w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-sm font-semibold text-zinc-900 bg-white outline-none focus:border-[#0d2318] cursor-pointer"
                    >
                      <option value="">— Not assigned —</option>
                      {availableDesigners.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.full_name} · {d.specialty} · {d.city}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer"
                  style={{ backgroundColor: "#0d2318", color: "white" }}
                >
                  Assign & Generate Pitch Links →
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Designer Pitches ── */}
      {pitches.length > 0 && (
        <div className="mt-5">
          <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Designer Pitches</h2>
              <span className="text-xs text-zinc-400">{submittedPitches.length}/{pitches.length} submitted</span>
            </div>
            <div className="divide-y divide-zinc-100">
              {pitches.map((pitch) => {
                const designer = allDesigners.find((d) => d.id === pitch.designer_id);
                const pitchUrl = `${siteUrl}/pitch/${pitch.id}`;
                return (
                  <div key={pitch.id} className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-sm font-bold text-zinc-900">{designer?.full_name ?? "Unknown"}</p>
                        <p className="text-xs text-zinc-400 mt-0.5">{designer?.specialty} · {designer?.city}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-bold ${
                        pitch.status === "submitted"
                          ? "bg-green-50 text-green-700 border-green-100"
                          : pitch.status === "declined"
                          ? "bg-red-50 text-red-700 border-red-100"
                          : "bg-blue-50 text-blue-700 border-blue-100"
                      }`}>
                        {pitch.status === "submitted" ? "Submitted" : pitch.status === "declined" ? "Declined" : "Awaiting pitch"}
                      </span>
                    </div>

                    {pitch.status === "assigned" && (
                      <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100 flex items-center justify-between gap-3">
                        <p className="text-xs text-zinc-500 font-mono break-all">{pitchUrl}</p>
                        <a
                          href={pitchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs font-bold text-[#0d2318] hover:text-[#6dcc46] transition-colors"
                        >
                          Open →
                        </a>
                      </div>
                    )}

                    {pitch.status === "submitted" && (
                      <div className="space-y-3 mt-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                            <p className="text-xs text-zinc-400 mb-1">Price quoted</p>
                            <p className="text-sm font-bold text-zinc-900">{pitch.price}</p>
                          </div>
                          <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-100">
                            <p className="text-xs text-zinc-400 mb-1">Timeline</p>
                            <p className="text-sm font-bold text-zinc-900">{pitch.timeline}</p>
                          </div>
                        </div>
                        <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                          <p className="text-xs text-zinc-400 mb-2">Approach</p>
                          <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">{pitch.approach}</p>
                        </div>
                        {pitch.message && (
                          <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                            <p className="text-xs text-zinc-400 mb-2">Additional message</p>
                            <p className="text-sm text-zinc-700 leading-relaxed">{pitch.message}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Send to Client ── */}
      {canSendToClient && (
        <div className="mt-5">
          <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: "#0d2318" }}>
            <div className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap" style={{ backgroundColor: "#0d2318" }}>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#6dcc46] animate-pulse" />
                <p className="text-sm font-bold text-white">Ready to Send to Client</p>
              </div>
              <span className="text-xs text-white/40">
                {submittedPitches.length > 0
                  ? `${submittedPitches.length} pitch${submittedPitches.length !== 1 ? "es" : ""} ready`
                  : `${pitches.length} designer${pitches.length !== 1 ? "s" : ""} assigned`}
              </span>
            </div>
            <div className="bg-white px-6 py-5">
              <p className="text-sm text-zinc-500 mb-5">
                This will create a project, build a proposal with the shortlisted designers, and send {brief.contact_name} at {brief.business_name} a link to review and choose.
                {submittedPitches.length === 0 && (
                  <span className="text-amber-600"> No pitches submitted yet — designers will still be presented but without their own content.</span>
                )}
              </p>
              <form action={sendToClient}>
                <input type="hidden" name="briefId" value={id} />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-sm font-bold transition-colors cursor-pointer"
                  style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
                >
                  Send Proposal to Client →
                </button>
              </form>
            </div>
          </div>
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
