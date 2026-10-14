import { notFound } from "next/navigation";
import { getProfessionalProject, getProjectMilestones, getProposalByProject, getProjectMessages, getDesignerApplication } from "@/lib/supabase/admin-queries";
import type { ProjectStatus, MilestoneStatus } from "@/lib/supabase/project-types";
import { MILESTONE_STATUS_LABELS } from "@/lib/supabase/project-types";
import { submitMilestone, resubmitProject, postProfessionalMessage, startProject } from "@/app/actions/professional-portal";
import ProjectChat from "@/components/ProjectChat";

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
    cardBg: "#ffffff",
    cardBorder: "#e5e7eb",
    badgeBg: "#f3f4f6",
    badgeColor: "#9ca3af",
    numBg: "#f3f4f6",
    numColor: "#9ca3af",
  },
  in_progress: {
    cardBg: "#eff6ff",
    cardBorder: "#bfdbfe",
    badgeBg: "#dbeafe",
    badgeColor: "#2563eb",
    numBg: "#dbeafe",
    numColor: "#3b82f6",
  },
  submitted: {
    cardBg: "#fffbeb",
    cardBorder: "#fde68a",
    badgeBg: "#fef3c7",
    badgeColor: "#d97706",
    numBg: "#fef3c7",
    numColor: "#f59e0b",
  },
  revision_requested: {
    cardBg: "#fff7ed",
    cardBorder: "#fed7aa",
    badgeBg: "#ffedd5",
    badgeColor: "#c2410c",
    numBg: "#ffedd5",
    numColor: "#f97316",
  },
  accepted: {
    cardBg: "#f0fdf4",
    cardBorder: "#bbf7d0",
    badgeBg: "#dcfce7",
    badgeColor: "#15803d",
    numBg: "#dcfce7",
    numColor: "#16a34a",
  },
};

const STATUS_DOT: Partial<Record<ProjectStatus, string>> = {
  in_progress:          "#3b82f6",
  submitted_for_review: "#f59e0b",
  revision_requested:   "#f97316",
  change_requested:     "#f97316",
  accepted:             "#16a34a",
  completed:            "#16a34a",
  disputed:             "#f97316",
  ready_to_start:       "#3b82f6",
  cancelled:            "#9ca3af",
};

export default async function ProfessionalPortalPage({ params }: Props) {
  const { token } = await params;
  const project = await getProfessionalProject(token);
  if (!project) notFound();

  const designerId = project.assigned_professional_ids?.[0] ?? null;
  const [milestones, proposal, messages, designer] = await Promise.all([
    getProjectMilestones(project.id),
    getProposalByProject(project.id),
    getProjectMessages(project.id),
    designerId ? getDesignerApplication(designerId) : Promise.resolve(null),
  ]);
  const status = project.status as ProjectStatus;
  const isCancelled = status === "cancelled";
  const isDone = status === "completed" || status === "accepted";
  const acceptedCount = milestones.filter((m) => m.status === "accepted").length;
  const submittedCount = milestones.filter((m) => m.status === "submitted").length;
  const progressPct = milestones.length > 0 ? Math.round((acceptedCount / milestones.length) * 100) : 0;
  const dotColor = STATUS_DOT[status] ?? "#3b82f6";
  const isChangeRequested = status === "change_requested" || status === "revision_requested";
  const changeNote = proposal?.client_note ?? null;

  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", backgroundColor: "#f8fafc", fontFamily: "inherit", overflow: "hidden" }}>

      {/* Top nav */}
      <nav style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", flexShrink: 0, zIndex: 10 }}>
        <div style={{ padding: "0 24px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5h7M5 2l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#111827", letterSpacing: "-0.01em" }}>Hire Ethiopia&apos;s Best</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>Professional Portal</span>
        </div>
      </nav>

      {/* Two-column body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

      {/* ── Left sidebar: project info ── */}
      <div style={{ width: 400, minWidth: 300, flexShrink: 0, overflowY: "auto", borderRight: "1px solid #e5e7eb", backgroundColor: "#ffffff", padding: "28px 24px 40px" }}>

        {/* Hero */}
        <div style={{ paddingTop: 40, paddingBottom: 32, borderBottom: "1px solid #e5e7eb" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            {project.client_business}
          </p>
          <h1 style={{ fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#111827", marginBottom: 14 }}>
            {project.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, backgroundColor: `${dotColor}15`, border: `1px solid ${dotColor}30`, color: dotColor }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: dotColor, flexShrink: 0 }} />
              {STATUS_LABEL[status]}
            </span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>
              {project.category} · {project.service_mode}
            </span>
            {project.deadline && !isCancelled && (
              <span style={{ fontSize: 12, color: "#9ca3af" }}>
                Due {new Date(project.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            )}
          </div>
        </div>

        {/* Start working banner */}
        {status === "ready_to_start" && !isCancelled && (
          <div style={{ marginTop: 24, marginBottom: 0, borderRadius: 14, border: "1px solid #bfdbfe", backgroundColor: "#eff6ff", padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#1d4ed8", marginBottom: 2 }}>Ready to start</p>
              <p style={{ fontSize: 12, color: "#3b82f6", lineHeight: 1.5 }}>Click below to confirm you&apos;ve begun work on this project.</p>
            </div>
            <form action={async () => { "use server"; await startProject(project.id, token); }}>
              <button
                type="submit"
                style={{ padding: "10px 22px", borderRadius: 999, fontSize: 13, fontWeight: 800, backgroundColor: "#1d4ed8", color: "#ffffff", border: "none", cursor: "pointer" }}
              >
                Start working →
              </button>
            </form>
          </div>
        )}

        {/* Progress row */}
        {milestones.length > 0 && !isCancelled && (
          <div style={{ padding: "24px 0", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ minWidth: 72 }}>
              <p style={{ fontSize: 36, fontWeight: 900, lineHeight: 1, color: isDone ? "#16a34a" : "#3b82f6", letterSpacing: "-0.03em" }}>{progressPct}%</p>
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 3, fontWeight: 600 }}>Complete</p>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <div style={{ height: 6, borderRadius: 999, overflow: "hidden", backgroundColor: "#e5e7eb", marginBottom: 10 }}>
                <div style={{ height: "100%", borderRadius: 999, width: `${progressPct}%`, background: isDone ? "linear-gradient(90deg, #16a34a, #22c55e)" : "linear-gradient(90deg, #3b82f6, #6366f1)", transition: "width 0.6s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}>
                  <span style={{ color: "#16a34a", marginRight: 3 }}>{acceptedCount}</span> accepted
                </span>
                {submittedCount > 0 && (
                  <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}>
                    <span style={{ color: "#d97706", marginRight: 3 }}>{submittedCount}</span> awaiting review
                  </span>
                )}
                <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>{milestones.length} total</span>
              </div>
            </div>
          </div>
        )}

        {/* Client change request banner */}
        {isChangeRequested && (
          <div style={{ marginTop: 24, borderRadius: 14, border: "1px solid #fed7aa", backgroundColor: "#fff7ed", overflow: "hidden" }}>
            <div style={{ padding: "12px 18px", borderBottom: "1px solid #fed7aa", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="7.5" cy="7.5" r="6.5" stroke="#f97316" strokeWidth="1.4" />
                <path d="M7.5 4v4m0 2.5v.5" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#c2410c", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Client requested changes
              </p>
            </div>
            {changeNote && (
              <div style={{ padding: "12px 18px", borderBottom: "1px solid #fed7aa" }}>
                <p style={{ fontSize: 13, color: "#7c2d12", lineHeight: 1.6, fontStyle: "italic" }}>
                  &ldquo;{changeNote}&rdquo;
                </p>
              </div>
            )}
            <div style={{ padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <p style={{ fontSize: 12, color: "#9a3412" }}>
                Review the feedback, update your work, then resubmit for review.
              </p>
              <form action={async () => { "use server"; await resubmitProject(project.id, token); }}>
                <button
                  type="submit"
                  style={{
                    fontSize: 12, fontWeight: 800, padding: "8px 18px", borderRadius: 8,
                    background: "linear-gradient(135deg, #f97316, #fb923c)", color: "#fff",
                    border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Resubmit for review
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Project scope */}
        <div style={{ marginTop: 28, marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Project scope</p>
          <div style={{ backgroundColor: "#ffffff", borderRadius: 14, border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ backgroundColor: "#f8fafc", borderRadius: 10, padding: "10px 14px", border: "1px solid #e5e7eb" }}>
                <p style={{ fontSize: 10, color: "#9ca3af", marginBottom: 3, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Budget</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#111827" }}>{project.budget}</p>
              </div>
              <div style={{ backgroundColor: "#f8fafc", borderRadius: 10, padding: "10px 14px", border: "1px solid #e5e7eb" }}>
                <p style={{ fontSize: 10, color: "#9ca3af", marginBottom: 3, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Revisions</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#111827" }}>Up to {project.revision_limit}</p>
              </div>
            </div>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 5, fontWeight: 600 }}>Deliverables</p>
                <p style={{ fontSize: 14, color: "#1f2937", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{project.deliverables}</p>
              </div>
              {project.exclusions && (
                <div>
                  <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 5, fontWeight: 600 }}>Not included</p>
                  <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7 }}>{project.exclusions}</p>
                </div>
              )}
              {project.acceptance_criteria && (
                <div>
                  <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 5, fontWeight: 600 }}>Done when</p>
                  <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7 }}>{project.acceptance_criteria}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Milestones */}
        {milestones.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em" }}>Milestones</p>
              <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>
                {milestones.length} deliverable{milestones.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {milestones.map((m, i) => {
                const ms = m.status as MilestoneStatus;
                const st = MILESTONE_STYLES[ms];
                const isAccepted = ms === "accepted";
                const isSubmitted = ms === "submitted";
                const isRevision = ms === "revision_requested";
                const canSubmit = (ms === "pending" || ms === "in_progress") && !isCancelled;
                const canResubmit = isRevision && !isCancelled;

                async function handleSubmit(formData: FormData) {
                  "use server";
                  const url = (formData.get("deliveryUrl") as string | null)?.trim() || undefined;
                  await submitMilestone(m.id, token, url);
                }

                return (
                  <div
                    key={m.id}
                    style={{
                      borderRadius: 14,
                      border: `1px solid ${st.cardBorder}`,
                      backgroundColor: st.cardBg,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Revision banner */}
                    {isRevision && (
                      <div style={{ backgroundColor: "#fff7ed", borderBottom: "1px solid #fed7aa", padding: "10px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: m.revision_note ? 6 : 0 }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                            <path d="M7 2.5v4m0 2.5v.5" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" />
                            <circle cx="7" cy="7" r="5.5" stroke="#f97316" strokeWidth="1.2" />
                          </svg>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#c2410c" }}>Revision requested</span>
                        </div>
                        {m.revision_note && (
                          <p style={{ fontSize: 13, color: "#7c2d12", lineHeight: 1.6, fontStyle: "italic", marginLeft: 22 }}>
                            &ldquo;{m.revision_note}&rdquo;
                          </p>
                        )}
                      </div>
                    )}

                    {/* Card body */}
                    <div style={{ padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: st.numBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        {isAccepted ? (
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path d="M1.5 5L4.5 8L10.5 1.5" stroke={st.numColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <span style={{ fontSize: 11, fontWeight: 800, color: st.numColor }}>{i + 1}</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", lineHeight: 1.4 }}>{m.title}</p>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, backgroundColor: st.badgeBg, color: st.badgeColor, whiteSpace: "nowrap", flexShrink: 0 }}>
                            {MILESTONE_STATUS_LABELS[ms]}
                          </span>
                        </div>
                        {m.description && (
                          <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginTop: 5 }}>{m.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Card footer */}
                    {(m.due_date || m.payment_condition || canSubmit || canResubmit || isSubmitted || isAccepted) && (
                      <div style={{ padding: "0 18px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                          {m.due_date && (
                            <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>
                              Due {new Date(m.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </span>
                          )}
                          {m.payment_condition && (
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#d97706" }}>{m.payment_condition}</span>
                          )}
                          {isAccepted && m.payment_status === "released" && (
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", display: "inline-flex", alignItems: "center", gap: 4 }}>
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                              Payment released
                            </span>
                          )}
                          {isAccepted && m.payment_status === "funded" && (
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#2563eb" }}>Payment secured</span>
                          )}
                        </div>

                        {(canSubmit || canResubmit) && (
                          <form action={handleSubmit} style={{ marginLeft: "auto", width: "100%" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                              <input
                                name="deliveryUrl"
                                type="url"
                                defaultValue={m.delivery_url ?? ""}
                                placeholder="Delivery link (Figma, Drive, Dropbox…)"
                                style={{
                                  flex: "1 1 180px",
                                  minWidth: 0,
                                  fontSize: 12,
                                  padding: "7px 12px",
                                  borderRadius: 8,
                                  border: "1px solid #d1d5db",
                                  outline: "none",
                                  backgroundColor: "#fff",
                                  color: "#111827",
                                }}
                              />
                              <button
                                type="submit"
                                style={{
                                  fontSize: 12,
                                  fontWeight: 800,
                                  padding: "7px 16px",
                                  borderRadius: 8,
                                  background: canResubmit ? "linear-gradient(135deg, #f97316, #fb923c)" : "linear-gradient(135deg, #3b82f6, #6366f1)",
                                  color: "#fff",
                                  border: "none",
                                  cursor: "pointer",
                                  letterSpacing: "-0.01em",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  flexShrink: 0,
                                }}
                              >
                                {canResubmit ? "Resubmit" : "Submit for review"}
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </div>
                          </form>
                        )}

                        {isSubmitted && (
                          <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#d97706" }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f59e0b", flexShrink: 0 }} />
                              Waiting for review
                            </span>
                            {m.delivery_url && (
                              <a href={m.delivery_url} target="_blank" rel="noopener noreferrer"
                                style={{ fontSize: 11, color: "#6b7280", textDecoration: "underline" }}>
                                View delivery →
                              </a>
                            )}
                          </div>
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
          <div style={{ borderRadius: 14, border: "1px solid #e5e7eb", backgroundColor: "#ffffff", padding: "40px 24px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "#f3f4f6", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="12" rx="2" stroke="#9ca3af" strokeWidth="1.5" />
                <path d="M7 8h6M7 12h4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", marginBottom: 6 }}>No milestones yet</p>
            <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>
              Your project milestones will appear here once the plan is confirmed by our team.
            </p>
          </div>
        )}

        {/* Sidebar footer */}
        <p style={{ fontSize: 11, color: "#d1d5db", marginTop: 40, lineHeight: 1.7, textAlign: "center" }}>
          Hire Ethiopia&apos;s Best · Professional Portal
        </p>
      </div>

      {/* ── Right panel: full-height chat ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "#f0f6ff" }}>

        {/* Chat panel header */}
        <div style={{ padding: "14px 24px", borderBottom: "1px solid #e0eaff", backgroundColor: "#eaf2ff", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800, color: "#1e40af", margin: 0 }}>Project Messages</p>
            <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>Communicate with the client and our team</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>Live · updates every 15s</span>
          </div>
        </div>

        {/* Chat fills remaining height */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <ProjectChat
            projectId={project.id}
            viewerRole="professional"
            viewerName={designer?.full_name ?? "Designer"}
            initialMessages={messages}
            sendAction={postProfessionalMessage}
            extraFields={{ token, projectId: project.id }}
            dark={false}
            variant="fiverr"
          />
        </div>
      </div>

      </div>{/* end two-column body */}
    </div>
  );
}
