import { notFound } from "next/navigation";
import { getProjectByClientToken, getProjectMilestones, getFeedbackByProject } from "@/lib/supabase/admin-queries";
import type { ProjectStatus, MilestoneStatus } from "@/lib/supabase/project-types";
import { MILESTONE_STATUS_LABELS } from "@/lib/supabase/project-types";
import { submitClientReview } from "@/app/actions/submit-client-review";

const CLIENT_STATUS_LABELS: Record<ProjectStatus, string> = {
  ready_to_start:       "Starting soon",
  in_progress:          "In progress",
  submitted_for_review: "Under review",
  revision_requested:   "Revisions underway",
  change_requested:     "Changes requested",
  accepted:             "Approved",
  completed:            "Completed",
  disputed:             "On hold",
  cancelled:            "Cancelled",
};

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }> };

const STATUS_STEP: Record<ProjectStatus, number> = {
  ready_to_start: 0,
  in_progress: 1,
  submitted_for_review: 2,
  revision_requested: 2,
  change_requested: 2,
  accepted: 3,
  completed: 4,
  disputed: 1,
  cancelled: -1,
};

const MILESTONE_DOT: Record<MilestoneStatus, { color: string; label: string }> = {
  pending:            { color: "rgba(255,255,255,0.15)", label: "Pending" },
  in_progress:        { color: "#6dcc46",               label: "In progress" },
  submitted:          { color: "#f59e0b",               label: "Submitted" },
  revision_requested: { color: "#f97316",               label: "Revision needed" },
  accepted:           { color: "#6dcc46",               label: "Done" },
};

export default async function ClientProjectPage({ params }: Props) {
  const { token } = await params;
  const [project, milestones] = await Promise.all([
    getProjectByClientToken(token),
    Promise.resolve(null),
  ]);
  if (!project) notFound();

  const ms = await getProjectMilestones(project.id);
  const existingReview = await getFeedbackByProject(project.id);

  const status = project.status as ProjectStatus;
  const step = STATUS_STEP[status] ?? 0;
  const isCancelled = status === "cancelled";
  const isDone = status === "completed" || status === "accepted";

  const acceptedCount = ms.filter((m) => m.status === "accepted").length;
  const progressPct = ms.length > 0 ? Math.round((acceptedCount / ms.length) * 100) : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d2318" }}>

      {/* Top bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-sm font-black" style={{ color: "#6dcc46" }}>Hire Ethiopia&apos;s Best</span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Project update</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 pt-12 pb-20">

        {/* Header */}
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(109,204,70,0.7)" }}>
          {project.client_business}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
          {project.title}
        </h1>
        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
          {project.category} · {project.service_mode}
        </p>

        {/* Status pill */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{
              backgroundColor: isDone ? "rgba(109,204,70,0.15)" : isCancelled ? "rgba(255,255,255,0.07)" : "rgba(109,204,70,0.1)",
              border: isDone ? "1px solid rgba(109,204,70,0.4)" : isCancelled ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(109,204,70,0.25)",
              color: isDone ? "#6dcc46" : isCancelled ? "rgba(255,255,255,0.4)" : "#6dcc46",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: isDone ? "#6dcc46" : isCancelled ? "rgba(255,255,255,0.3)" : "#6dcc46", opacity: isCancelled ? 0.5 : 1 }}
            />
            {CLIENT_STATUS_LABELS[status]}
          </span>
          {project.deadline && !isCancelled && (
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Deadline: {new Date(project.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          )}
        </div>

        {/* Progress bar (only shown when there are milestones) */}
        {ms.length > 0 && !isCancelled && (
          <div className="mb-8 rounded-xl p-5" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Overall progress</p>
              <p className="text-xs font-black" style={{ color: "#6dcc46" }}>{progressPct}%</p>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%`, backgroundColor: "#6dcc46" }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              {acceptedCount} of {ms.length} milestone{ms.length !== 1 ? "s" : ""} completed
            </p>
          </div>
        )}

        {/* Milestones */}
        {ms.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              Milestones
            </p>
            <div className="relative">
              {/* vertical connector line */}
              <div
                className="absolute left-[9px] top-3 bottom-3 w-px"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              />
              <div className="space-y-4">
                {ms.map((m, i) => {
                  const ms_status = m.status as MilestoneStatus;
                  const dot = MILESTONE_DOT[ms_status];
                  const isAccepted = ms_status === "accepted";
                  return (
                    <div key={m.id} className="flex gap-4 relative">
                      {/* dot */}
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
                            <path d="M1 3.5L3 5.5L7 1" stroke="#0d2318" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>

                      {/* content */}
                      <div
                        className="flex-1 rounded-xl px-4 py-3"
                        style={{
                          backgroundColor: isAccepted ? "rgba(109,204,70,0.07)" : "rgba(255,255,255,0.04)",
                          border: isAccepted ? "1px solid rgba(109,204,70,0.2)" : "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div>
                            <p className="text-sm font-bold text-white">{m.title}</p>
                            {m.description && (
                              <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                                {m.description}
                              </p>
                            )}
                          </div>
                          <span
                            className="text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: isAccepted ? "rgba(109,204,70,0.15)" : "rgba(255,255,255,0.07)",
                              color: isAccepted ? "#6dcc46" : "rgba(255,255,255,0.45)",
                            }}
                          >
                            {MILESTONE_STATUS_LABELS[ms_status]}
                          </span>
                        </div>
                        {m.due_date && (
                          <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>
                            Due {new Date(m.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {ms.length === 0 && (
          <div className="mb-8 rounded-xl px-5 py-8 text-center" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Project milestones will appear here once the plan is set.</p>
          </div>
        )}

        {/* ── Review section ──────────────────────────────────── */}
        <ReviewSection
          clientToken={token}
          isDone={isDone}
          existingReview={existingReview}
          projectTitle={project.title}
          clientName={project.client_name}
        />

        {/* Footer note */}
        <p className="text-xs text-center mt-8" style={{ color: "rgba(255,255,255,0.2)" }}>
          Questions? Reply to the email you received from our team.
        </p>
      </div>
    </div>
  );
}

// ── Star display (read-only) ─────────────────────────────────────────────────

function Stars({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1.5l1.545 3.13 3.455.502-2.5 2.436.59 3.44L7 9.25l-3.09 1.758.59-3.44L2 5.132l3.455-.502L7 1.5z"
            fill={i < value ? "#f59e0b" : "rgba(255,255,255,0.12)"}
          />
        </svg>
      ))}
    </span>
  );
}

// ── Review section component ─────────────────────────────────────────────────

import type { DesignerFeedbackRow } from "@/lib/supabase/project-types";

function ReviewSection({
  clientToken,
  isDone,
  existingReview,
  projectTitle,
  clientName,
}: {
  clientToken: string;
  isDone: boolean;
  existingReview: DesignerFeedbackRow | null;
  projectTitle: string;
  clientName: string;
}) {
  const ACCENT = "#6dcc46";

  // Already submitted
  if (existingReview?.status === "submitted") {
    const r = existingReview;
    const rehireLabel = r.would_rehire === "yes" ? "Yes, definitely" : r.would_rehire === "maybe" ? "Yes, maybe" : "No";
    return (
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Your review</p>
        <div className="rounded-xl p-5 space-y-4" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm font-bold text-white">{projectTitle}</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                {clientName} · {r.submitted_at ? new Date(r.submitted_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0" style={{ backgroundColor: "rgba(109,204,70,0.15)", color: ACCENT }}>
              {rehireLabel}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Quality", value: r.quality_rating },
              { label: "Communication", value: r.communication_rating },
              { label: "On-time", value: r.delivery_rating },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
                <Stars value={value ?? 0} />
                <p className="text-xs font-bold mt-1" style={{ color: ACCENT }}>{value?.toFixed(1)}</p>
              </div>
            ))}
          </div>
          {r.comments && (
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
              &ldquo;{r.comments}&rdquo;
            </p>
          )}
          <p className="text-xs" style={{ color: "rgba(109,204,70,0.6)" }}>✓ Review submitted — thank you!</p>
        </div>
      </div>
    );
  }

  // Form (blurred if project not done)
  return (
    <div className="mb-8">
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>Leave a review</p>
      <div style={{ position: "relative" }}>
        {/* Blur overlay when not done */}
        {!isDone && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 10, borderRadius: 12,
            backdropFilter: "blur(6px)", backgroundColor: "rgba(13,35,24,0.6)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="8" rx="2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
                <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-center" style={{ color: "rgba(255,255,255,0.5)" }}>Available when your project is completed</p>
          </div>
        )}
        <form action={submitClientReview} style={{ filter: isDone ? "none" : "blur(2px)", pointerEvents: isDone ? "auto" : "none" }}>
          <input type="hidden" name="clientToken" value={clientToken} />
          <div className="rounded-xl p-5 space-y-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

            {/* Star ratings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { name: "quality", label: "Quality of work" },
                { name: "communication", label: "Communication" },
                { name: "delivery", label: "On-time delivery" },
              ].map(({ name, label }) => (
                <div key={name}>
                  <p className="text-xs font-semibold mb-2.5" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <label key={n} style={{ cursor: "pointer" }}>
                        <input type="radio" name={name} value={n} required className="sr-only peer" />
                        <span className="block w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold select-none transition-all duration-150"
                          style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.3)" }}
                        >
                          {n}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>1 = Poor · 5 = Excellent</p>
                </div>
              ))}
            </div>

            {/* Would rehire */}
            <div>
              <p className="text-xs font-semibold mb-2.5" style={{ color: "rgba(255,255,255,0.5)" }}>Would you work with this professional again?</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: "yes", label: "Yes, definitely" },
                  { value: "maybe", label: "Yes, maybe" },
                  { value: "no", label: "No" },
                ].map(({ value, label }) => (
                  <label key={value} style={{ cursor: "pointer" }}>
                    <input type="radio" name="wouldRehire" value={value} required className="sr-only peer" />
                    <span className="block px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 select-none"
                      style={{ border: "1.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}
                    >
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Comments <span style={{ color: "rgba(255,255,255,0.25)" }}>(optional)</span></p>
              <textarea
                name="comments"
                placeholder="Share your experience working with this professional…"
                rows={3}
                className="w-full rounded-lg px-3 py-2.5 text-sm resize-none outline-none"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" }}
              />
            </div>

            <button type="submit"
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
              style={{ backgroundColor: ACCENT, color: "#0d2318" }}
            >
              Submit review →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
