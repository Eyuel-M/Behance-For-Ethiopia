import { notFound } from "next/navigation";
import {
  getProposalByToken,
  getDesignerApplication,
  getDesignerFeedback,
  getProject,
  getProjectMilestones,
} from "@/lib/supabase/admin-queries";
import type { DesignerFeedbackRow } from "@/lib/supabase/project-types";
import { MILESTONE_STATUS_LABELS, type MilestoneStatus } from "@/lib/supabase/project-types";
import { selectDesigner } from "@/app/actions/client-proposal";
import WorkSampleViewer from "@/components/WorkSampleViewer";
import ProposalFeedbackForm from "@/components/ProposalFeedbackForm";
import QuoteCarousel from "@/components/QuoteCarousel";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }> };

const LABELS = ["A", "B", "C"] as const;

function avgRating(feedback: DesignerFeedbackRow[]) {
  const s = feedback.filter((f) => f.status === "submitted" && f.quality_rating);
  if (!s.length) return null;
  const avg = (k: keyof DesignerFeedbackRow) =>
    s.reduce((acc, f) => acc + ((f[k] as number) ?? 0), 0) / s.length;
  return {
    overall: (avg("quality_rating") + avg("communication_rating") + avg("delivery_rating")) / 3,
    count: s.length,
  };
}

function getQuotes(feedback: DesignerFeedbackRow[]): Array<{ comment: string; project: string | null; rating: number }> {
  return feedback
    .filter((f) => f.status === "submitted" && f.comments && f.comments.trim().length > 0)
    .sort((a, b) => {
      const aScore = ((a.quality_rating ?? 0) + (a.communication_rating ?? 0) + (a.delivery_rating ?? 0)) / 3;
      const bScore = ((b.quality_rating ?? 0) + (b.communication_rating ?? 0) + (b.delivery_rating ?? 0)) / 3;
      return bScore - aScore;
    })
    .map((f) => ({
      comment: f.comments!.trim(),
      project: f.project_title ?? null,
      rating: ((f.quality_rating ?? 0) + (f.communication_rating ?? 0) + (f.delivery_rating ?? 0)) / 3,
    }));
}

function parseWorkSamples(json: string | null): string[] {
  if (!json) return [];
  try { return JSON.parse(json) as string[]; } catch { return []; }
}

export default async function ProposalPage({ params }: Props) {
  const { token } = await params;
  const proposal = await getProposalByToken(token);
  if (!proposal) notFound();

  const [rawDesigners, project, milestones] = await Promise.all([
    Promise.all(proposal.designer_application_ids.map((id) => getDesignerApplication(id))),
    getProject(proposal.project_id),
    getProjectMilestones(proposal.project_id),
  ]);
  const designers = rawDesigners.filter(Boolean) as NonNullable<Awaited<ReturnType<typeof getDesignerApplication>>>[];
  const feedbackLists = await Promise.all(designers.map((d) => getDesignerFeedback(d.id)));

  const isSelected = proposal.status === "selected";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0d2318" }}>

      {/* Top bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <span className="text-sm font-black" style={{ color: "#6dcc46" }}>Hire Ethiopia&apos;s Best</span>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Confidential shortlist</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto px-5 pt-12 pb-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(109,204,70,0.7)" }}>
          {isSelected ? "Selection confirmed" : "Your shortlist"}
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
          {isSelected ? "Thank you for choosing!" : (project?.title ?? "Choose your creative professional")}
        </h1>
        {project && (
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
            {project.category} · {project.service_mode}
          </p>
        )}
        <p className="text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
          {isSelected
            ? "Our team has been notified. We'll confirm the details and introduce you to your designer within 1 business day."
            : `We've curated ${designers.length} professional${designers.length !== 1 ? "s" : ""} who match your project. Review their work samples and bio, then select who you'd like to work with.`}
        </p>
      </div>

      {/* Project scope */}
      {project && !isSelected && (
        <div className="max-w-5xl mx-auto px-5 pb-10">
          <div className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(109,204,70,0.6)" }}>
              What you&apos;re getting
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Deliverables + meta */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Deliverables</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)" }}>{project.deliverables}</p>

                {project.acceptance_criteria && (
                  <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "rgba(255,255,255,0.25)" }}>Done when</p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{project.acceptance_criteria}</p>
                  </div>
                )}

                <div className="flex gap-6 flex-wrap">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Budget</p>
                    <p className="text-sm font-black text-white mt-0.5">{project.budget}</p>
                  </div>
                  {project.deadline && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Deadline</p>
                      <p className="text-sm font-black text-white mt-0.5">
                        {new Date(project.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>Revisions</p>
                    <p className="text-sm font-black text-white mt-0.5">Up to {project.revision_limit}</p>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              {milestones.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Project timeline</p>
                  <div className="space-y-2">
                    {milestones.map((m, i) => (
                      <div key={m.id} className="flex items-start gap-3 rounded-xl px-3 py-2.5"
                        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: "rgba(109,204,70,0.15)", color: "#6dcc46" }}>{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white">{m.title}</p>
                          {m.description && (
                            <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "rgba(255,255,255,0.35)" }}>{m.description}</p>
                          )}
                          {m.due_date && (
                            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                              Due {new Date(m.due_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                            </p>
                          )}
                        </div>
                        {m.payment_condition && (
                          <span className="text-xs font-semibold shrink-0 mt-0.5" style={{ color: "#6dcc46" }}>{m.payment_condition}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Approve / revise section — inside the scope card */}
            <ProposalFeedbackForm
              token={token}
              disabled={isSelected}
              alreadyRequested={proposal.status === "revision_requested"}
              existingNote={proposal.client_note}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-10 mb-2">
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              Now choose your professional
            </p>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-5 pb-20" data-designer-cards>
        <div className={`grid gap-6 ${designers.length === 1 ? "grid-cols-1 max-w-sm" : designers.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {designers.map((designer, i) => {
            const label = LABELS[i];
            const rating = avgRating(feedbackLists[i] ?? []);
            const quotes = getQuotes(feedbackLists[i] ?? []);
            const samples = parseWorkSamples(designer.work_samples);
            const isChosen = proposal.selected_designer_id === designer.id;

            return (
              <div
                key={designer.id}
                className="rounded-2xl overflow-hidden flex flex-col transition-all duration-200"
                style={{
                  backgroundColor: isSelected && !isChosen ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
                  border: isChosen ? "1.5px solid #6dcc46" : "1px solid rgba(255,255,255,0.1)",
                  opacity: isSelected && !isChosen ? 0.45 : 1,
                }}
              >
                {/* Work sample strip — click opens lightbox */}
                <WorkSampleViewer samples={samples} />

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        {isChosen && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}>Selected</span>
                        )}
                        <h2 className="text-lg font-black text-white">Designer {label}</h2>
                      </div>
                      <p className="text-xs font-medium" style={{ color: "#6dcc46" }}>{designer.specialty}</p>
                    </div>
                    {rating && (
                      <div className="text-right shrink-0">
                        <p className="text-base font-black text-white">{rating.overall.toFixed(1)} ★</p>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{rating.count} review{rating.count !== 1 ? "s" : ""}</p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {designer.experience} experience · {designer.hourly_rate}
                  </p>

                  <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {designer.bio}
                  </p>

                  {/* Client quotes carousel */}
                  {quotes.length > 0 && <QuoteCarousel quotes={quotes} />}

                  {!isSelected && (
                    <form action={selectDesigner}>
                      <input type="hidden" name="token" value={token} />
                      <input type="hidden" name="designerId" value={designer.id} />
                      <input type="hidden" name="designerLabel" value={label} />
                      <button
                        type="submit"
                        className="w-full py-3 rounded-full text-sm font-bold transition-all cursor-pointer hover:opacity-90 active:scale-[0.98]"
                        style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
                      >
                        Choose Designer {label} →
                      </button>
                    </form>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-center mt-10" style={{ color: "rgba(255,255,255,0.2)" }}>
          Designer identities are anonymized to protect our professional network. Contact details are shared after your selection is confirmed by our team.
        </p>
      </div>
    </div>
  );
}
