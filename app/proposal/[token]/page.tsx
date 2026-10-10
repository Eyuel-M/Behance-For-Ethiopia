import { notFound } from "next/navigation";
import {
  getProposalByToken,
  getDesignerApplication,
  getDesignerFeedback,
} from "@/lib/supabase/admin-queries";
import type { DesignerFeedbackRow } from "@/lib/supabase/project-types";
import { selectDesigner } from "@/app/actions/client-proposal";

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

function parseWorkSamples(json: string | null): string[] {
  if (!json) return [];
  try { return JSON.parse(json) as string[]; } catch { return []; }
}

export default async function ProposalPage({ params }: Props) {
  const { token } = await params;
  const proposal = await getProposalByToken(token);
  if (!proposal) notFound();

  const designers = (
    await Promise.all(proposal.designer_application_ids.map((id) => getDesignerApplication(id)))
  ).filter(Boolean) as NonNullable<Awaited<ReturnType<typeof getDesignerApplication>>>[];

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
      <div className="max-w-5xl mx-auto px-5 pt-12 pb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(109,204,70,0.7)" }}>
          {isSelected ? "Selection confirmed" : "Your shortlist"}
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
          {isSelected ? "Thank you for choosing!" : "Choose your creative professional"}
        </h1>
        <p className="text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
          {isSelected
            ? "Our team has been notified. We'll confirm the details and introduce you to your designer within 1 business day."
            : `We've curated ${designers.length} professional${designers.length !== 1 ? "s" : ""} who match your project. Review their work and select who you'd like to work with.`}
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-5 pb-20">
        <div className={`grid gap-6 ${designers.length === 1 ? "grid-cols-1 max-w-sm" : designers.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {designers.map((designer, i) => {
            const label = LABELS[i];
            const rating = avgRating(feedbackLists[i] ?? []);
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
                {/* Work sample strip */}
                {samples.length > 0 ? (
                  <div className={`grid gap-0.5 ${samples.length === 1 ? "grid-cols-1" : samples.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
                    style={{ aspectRatio: "16/7" }}>
                    {samples.slice(0, 3).map((url, j) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={j} src={url} alt="" className="w-full h-full object-cover" />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center" style={{ aspectRatio: "16/7", backgroundColor: "rgba(255,255,255,0.03)" }}>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>No work samples</p>
                  </div>
                )}

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

                  <p className="text-sm leading-relaxed flex-1 mb-5 line-clamp-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {designer.bio}
                  </p>

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
