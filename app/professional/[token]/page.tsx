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

type MilestoneStyle = {
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  badgeColor: string;
  numBg: string;
  numColor: string;
};

const MILESTONE_STYLES: Record<MilestoneStatus, MilestoneStyle> = {
  pending: {
    cardBg: "rgba(255,255,255,0.025)",
    cardBorder: "rgba(255,255,255,0.07)",
    badgeBg: "rgba(255,255,255,0.08)",
    badgeColor: "rgba(255,255,255,0.35)",
    numBg: "rgba(255,255,255,0.06)",
    numColor: "rgba(255,255,255,0.25)",
  },
  in_progress: {
    cardBg: "rgba(59,130,246,0.05)",
    cardBorder: "rgba(59,130,246,0.18)",
    badgeBg: "rgba(59,130,246,0.15)",
    badgeColor: "#93c5fd",
    numBg: "rgba(59,130,246,0.15)",
    numColor: "#60a5fa",
  },
  submitted: {
    cardBg: "rgba(245,158,11,0.05)",
    cardBorder: "rgba(245,158,11,0.2)",
    badgeBg: "rgba(245,158,11,0.12)",
    badgeColor: "#fbbf24",
    numBg: "rgba(245,158,11,0.12)",
    numColor: "#f59e0b",
  },
  revision_requested: {
    cardBg: "rgba(249,115,22,0.05)",
    cardBorder: "rgba(249,115,22,0.2)",
    badgeBg: "rgba(249,115,22,0.12)",
    badgeColor: "#fb923c",
    numBg: "rgba(249,115,22,0.12)",
    numColor: "#f97316",
  },
  accepted: {
    cardBg: "rgba(16,185,129,0.05)",
    cardBorder: "rgba(16,185,129,0.18)",
    badgeBg: "rgba(16,185,129,0.12)",
    badgeColor: "#34d399",
    numBg: "rgba(16,185,129,0.12)",
    numColor: "#10b981",
  },
};

const STATUS_COLOR: Partial<Record<ProjectStatus, string>> = {
  in_progress: "#60a5fa",
  submitted_for_review: "#f59e0b",
  revision_requested: "#f97316",
  change_requested: "#f97316",
  accepted: "#10b981",
  completed: "#10b981",
  cancelled: "rgba(255,255,255,0.3)",
  disputed: "#f97316",
  ready_to_start: "#60a5fa",
};

export default async function ProfessionalPortalPage({ params }: Props) {
  const { token } = await params;
  const project = await getProfessionalProject(token);
  if (!project) notFound();

  const milestones = await getProjectMilestones(project.id);
  const status = project.status as ProjectStatus;
  const isCancelled = status === "cancelled";
  const isDone = status === "completed" || status === "accepted";
  const acceptedCount = milestones.filter((m) => m.status === "accepted").length;
  const submittedCount = milestones.filter((m) => m.status === "submitted").length;
  const progressPct = milestones.length > 0 ? Math.round((acceptedCount / milestones.length) * 100) : 0;
  const statusColor = STATUS_COLOR[status] ?? "#60a5fa";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#070d1a", color: "#fff" }}>

      {/* Top navigation */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(7,13,26,0.9)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>Hire Ethiopia&apos;s Best</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pro Portal</span>
        </div>
      </nav>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* Hero */}
        <div style={{ paddingTop: 48, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(96,165,250,0.7)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>
            {project.client_business}
          </p>
          <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 16, color: "#fff" }}>
            {project.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, backgroundColor: `${statusColor}18`, border: `1px solid ${statusColor}35`, color: statusColor }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: statusColor, flexShrink: 0 }} />
              {STATUS_LABEL[status]}
            </span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              {project.category} · {project.service_mode}
            </span>
            {project.deadline && !isCancelled && (
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
                Due {new Date(project.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            )}
          </div>
        </div>

        {/* Progress + stats row */}
        {milestones.length > 0 && !isCancelled && (
          <div style={{ padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>

            {/* Big number */}
            <div style={{ minWidth: 80 }}>
              <p style={{ fontSize: 40, fontWeight: 900, lineHeight: 1, color: isDone ? "#10b981" : "#60a5fa", letterSpacing: "-0.03em" }}>{progressPct}%</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4, fontWeight: 600 }}>Complete</p>
            </div>

            {/* Bar + counters */}
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{ height: 6, borderRadius: 999, overflow: "hidden", backgroundColor: "rgba(255,255,255,0.07)", marginBottom: 10 }}>
                <div style={{ height: "100%", borderRadius: 999, width: `${progressPct}%`, background: isDone ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #3b82f6, #60a5fa)", transition: "width 0.6s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                  <span style={{ color: "#10b981", marginRight: 4 }}>{acceptedCount}</span> accepted
                </span>
                {submittedCount > 0 && (
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                    <span style={{ color: "#f59e0b", marginRight: 4 }}>{submittedCount}</span> awaiting review
                  </span>
                )}
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>
                  {milestones.length} total
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Project scope */}
        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Project scope</p>
          <div style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>

            <div style={{ padding: "20px 20px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 0 }}>
              <div style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 14px" }}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Budget</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{project.budget}</p>
              </div>
              <div style={{ backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 14px" }}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Revisions</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>Up to {project.revision_limit}</p>
              </div>
            </div>

            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6, fontWeight: 600 }}>Deliverables</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{project.deliverables}</p>
              </div>

              {project.exclusions && (
                <div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6, fontWeight: 600 }}>Not included</p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{project.exclusions}</p>
                </div>
              )}

              {project.acceptance_criteria && (
                <div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6, fontWeight: 600 }}>Done when</p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{project.acceptance_criteria}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Milestones */}
        {milestones.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Milestones
              </p>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontWeight: 600 }}>
                {milestones.length} deliverable{milestones.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {milestones.map((m, i) => {
                const ms = m.status as MilestoneStatus;
                const style = MILESTONE_STYLES[ms];
                const isAccepted = ms === "accepted";
                const isSubmitted = ms === "submitted";
                const isRevision = ms === "revision_requested";
                const canSubmit = (ms === "pending" || ms === "in_progress") && !isCancelled;

                async function handleSubmit() {
                  "use server";
                  await submitMilestone(m.id, token);
                }

                return (
                  <div
                    key={m.id}
                    style={{
                      borderRadius: 14,
                      border: `1px solid ${style.cardBorder}`,
                      backgroundColor: style.cardBg,
                      overflow: "hidden",
                    }}
                  >
                    {/* Card header */}
                    <div style={{ padding: "16px 18px", display: "flex", alignItems: "flex-start", gap: 14 }}>
                      {/* Number badge */}
                      <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: style.numBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        {isAccepted ? (
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path d="M1.5 5L4.5 8L10.5 1.5" stroke={style.numColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <span style={{ fontSize: 11, fontWeight: 800, color: style.numColor }}>{i + 1}</span>
                        )}
                      </div>

                      {/* Title + description */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.4 }}>{m.title}</p>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, backgroundColor: style.badgeBg, color: style.badgeColor, whiteSpace: "nowrap", flexShrink: 0 }}>
                            {MILESTONE_STATUS_LABELS[ms]}
                          </span>
                        </div>
                        {m.description && (
                          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginTop: 5 }}>{m.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Card footer: metadata + action */}
                    {(m.due_date || m.payment_condition || canSubmit || isSubmitted || isRevision) && (
                      <div style={{ padding: "10px 18px 14px", paddingTop: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                        {/* Metadata */}
                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                          {m.due_date && (
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>
                              Due {new Date(m.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </span>
                          )}
                          {m.payment_condition && (
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b" }}>{m.payment_condition}</span>
                          )}
                        </div>

                        {/* Action / status message */}
                        {canSubmit && (
                          <form action={handleSubmit} style={{ marginLeft: "auto" }}>
                            <button
                              type="submit"
                              style={{
                                fontSize: 12,
                                fontWeight: 800,
                                padding: "7px 16px",
                                borderRadius: 8,
                                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                                letterSpacing: "-0.01em",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              Submit for review
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </form>
                        )}

                        {isSubmitted && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#fbbf24" }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f59e0b", flexShrink: 0 }} />
                            Waiting for admin review
                          </span>
                        )}

                        {isRevision && (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#fb923c" }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M6 2v4m0 2.5v.5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Revision needed — please re-submit
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {milestones.length === 0 && (
          <div style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.025)", padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.05)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="12" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                <path d="M7 8h6M7 12h4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>No milestones yet</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", lineHeight: 1.6 }}>
              Your project milestones will appear here once the plan is confirmed by our team.
            </p>
          </div>
        )}

        {/* Footer */}
        <p style={{ fontSize: 11, textAlign: "center", color: "rgba(255,255,255,0.15)", marginTop: 48, lineHeight: 1.7 }}>
          Questions about your project? Reply to the email you received from our team.<br />
          <span style={{ color: "rgba(255,255,255,0.1)" }}>Hire Ethiopia&apos;s Best</span>
        </p>

      </div>
    </div>
  );
}
