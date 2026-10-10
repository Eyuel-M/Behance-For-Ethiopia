import { notFound } from "next/navigation";
import { getProfessionalProject, getProjectMilestones } from "@/lib/supabase/admin-queries";
import type { ProjectStatus, MilestoneStatus } from "@/lib/supabase/project-types";
import { MILESTONE_STATUS_LABELS } from "@/lib/supabase/project-types";
import { submitMilestone } from "@/app/actions/professional-portal";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }> };

const STATUS_LABEL: Record<ProjectStatus, string> = {
  ready_to_start:       "Starting soon",
  in_progress:          "In progress",
  submitted_for_review: "Under review",
  revision_requested:   "Revisions requested",
  change_requested:     "Changes requested",
  accepted:             "Approved by client",
  completed:            "Completed",
  disputed:             "On hold",
  cancelled:            "Cancelled",
};

const MILESTONE_DOT: Record<MilestoneStatus, { color: string }> = {
  pending:            { color: "rgba(255,255,255,0.18)" },
  in_progress:        { color: "#60a5fa" },
  submitted:          { color: "#f59e0b" },
  revision_requested: { color: "#f97316" },
  accepted:           { color: "#6dcc46" },
};

const ACCENT = "#60a5fa"; // blue for professional portal (distinct from green client portal)

export default async function ProfessionalPortalPage({ params }: Props) {
  const { token } = await params;
  const project = await getProfessionalProject(token);
  if (!project) notFound();

  const milestones = await getProjectMilestones(project.id);
  const status = project.status as ProjectStatus;
  const isCancelled = status === "cancelled";
  const isDone = status === "completed" || status === "accepted";
  const acceptedCount = milestones.filter((m) => m.status === "accepted").length;
  const progressPct = milestones.length > 0 ? Math.round((acceptedCount / milestones.length) * 100) : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d1f2d" }}>

      {/* Top bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-sm font-black" style={{ color: ACCENT }}>Hire Ethiopia&apos;s Best</span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Professional portal</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 pt-10 pb-20">

        {/* Header */}
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `${ACCENT}99` }}>
          {project.client_business}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
          {project.title}
        </h1>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
          {project.category} · {project.service_mode}
        </p>

        {/* Status + deadline */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{
              backgroundColor: isDone ? "rgba(96,165,250,0.15)" : isCancelled ? "rgba(255,255,255,0.07)" : "rgba(96,165,250,0.12)",
              border: `1px solid ${isDone ? "rgba(96,165,250,0.4)" : isCancelled ? "rgba(255,255,255,0.12)" : "rgba(96,165,250,0.25)"}`,
              color: isDone ? ACCENT : isCancelled ? "rgba(255,255,255,0.4)" : ACCENT,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isCancelled ? "rgba(255,255,255,0.3)" : ACCENT }} />
            {STATUS_LABEL[status]}
          </span>
          {project.deadline && !isCancelled && (
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Deadline: {new Date(project.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          )}
        </div>

        {/* Project scope */}
        <div className="mb-8 rounded-2xl p-5 space-y-4" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Project scope</p>

          <div>
            <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Deliverables</p>
            <p className="text-sm text-white leading-relaxed whitespace-pre-wrap">{project.deliverables}</p>
          </div>

          {project.exclusions && (
            <div>
              <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Not included</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{project.exclusions}</p>
            </div>
          )}

          {project.acceptance_criteria && (
            <div>
              <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Done when</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{project.acceptance_criteria}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-xl px-3 py-2.5" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Budget</p>
              <p className="text-sm font-semibold text-white">{project.budget}</p>
            </div>
            <div className="rounded-xl px-3 py-2.5" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Revision limit</p>
              <p className="text-sm font-semibold text-white">Up to {project.revision_limit}</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {milestones.length > 0 && !isCancelled && (
          <div className="mb-8 rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Your progress</p>
              <p className="text-xs font-black" style={{ color: ACCENT }}>{progressPct}%</p>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%`, backgroundColor: ACCENT }} />
            </div>
            <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              {acceptedCount} of {milestones.length} milestone{milestones.length !== 1 ? "s" : ""} accepted
            </p>
          </div>
        )}

        {/* Milestones */}
        {milestones.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
              Milestones
            </p>
            <div className="relative">
              <div className="absolute left-[9px] top-3 bottom-3 w-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
              <div className="space-y-4">
                {milestones.map((m, i) => {
                  const ms = m.status as MilestoneStatus;
                  const dot = MILESTONE_DOT[ms];
                  const isAccepted = ms === "accepted";
                  const isSubmitted = ms === "submitted";
                  const isPending = ms === "pending" || ms === "in_progress";
                  const canSubmit = isPending && !isCancelled;

                  async function handleSubmit() {
                    "use server";
                    await submitMilestone(m.id, token);
                  }

                  return (
                    <div key={m.id} className="flex gap-4 relative">
                      <div
                        className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center"
                        style={{
                          backgroundColor: isAccepted ? dot.color : "transparent",
                          border: `2px solid ${dot.color}`,
                          zIndex: 1,
                        }}
                      >
                        {isAccepted && (
                          <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                            <path d="M1 3.5L3 5.5L7 1" stroke="#0d1f2d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>

                      <div
                        className="flex-1 rounded-xl px-4 py-4"
                        style={{
                          backgroundColor: isAccepted ? "rgba(96,165,250,0.07)" : isSubmitted ? "rgba(245,158,11,0.07)" : "rgba(255,255,255,0.04)",
                          border: isAccepted ? "1px solid rgba(96,165,250,0.2)" : isSubmitted ? "1px solid rgba(245,158,11,0.2)" : "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white">{i + 1}. {m.title}</p>
                            {m.description && (
                              <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{m.description}</p>
                            )}
                          </div>
                          <span
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: isAccepted ? "rgba(96,165,250,0.15)" : isSubmitted ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.07)",
                              color: isAccepted ? ACCENT : isSubmitted ? "#f59e0b" : "rgba(255,255,255,0.4)",
                            }}
                          >
                            {MILESTONE_STATUS_LABELS[ms]}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 flex-wrap mt-3">
                          <div className="flex items-center gap-3">
                            {m.due_date && (
                              <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                                Due {new Date(m.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                              </span>
                            )}
                            {m.payment_condition && (
                              <span className="text-xs font-semibold" style={{ color: "#f59e0b" }}>{m.payment_condition}</span>
                            )}
                          </div>

                          {canSubmit && (
                            <form action={handleSubmit}>
                              <button
                                type="submit"
                                className="text-xs font-bold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                                style={{ backgroundColor: ACCENT, color: "#0d1f2d" }}
                              >
                                Mark as submitted →
                              </button>
                            </form>
                          )}
                          {isSubmitted && (
                            <span className="text-xs" style={{ color: "rgba(245,158,11,0.7)" }}>Waiting for admin review</span>
                          )}
                          {ms === "revision_requested" && (
                            <span className="text-xs font-semibold" style={{ color: "#f97316" }}>Revision needed — please re-submit</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {milestones.length === 0 && (
          <div className="mb-8 rounded-xl px-5 py-8 text-center" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Milestones will appear here once the project plan is set by our team.</p>
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
          Questions? Reply to the email you received from our team · Hire Ethiopia&apos;s Best
        </p>
      </div>
    </div>
  );
}
