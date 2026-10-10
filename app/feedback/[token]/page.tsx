import { notFound } from "next/navigation";
import { getFeedbackByToken } from "@/lib/supabase/admin-queries";
import { submitFeedback } from "@/app/actions/designer-feedback";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }>; searchParams: Promise<{ error?: string }> };

function StarInput({ name, label }: { name: string; label: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white mb-3">{label}</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className="cursor-pointer group">
            <input type="radio" name={name} value={n} required className="sr-only peer" />
            <span className="block w-11 h-11 rounded-xl border-2 border-white/20 flex items-center justify-center text-lg text-white/30 peer-checked:border-[#6dcc46] peer-checked:text-[#6dcc46] peer-checked:bg-[#6dcc46]/10 hover:border-white/50 hover:text-white/60 transition-all duration-150 select-none">
              {n}
            </span>
          </label>
        ))}
      </div>
      <p className="text-xs text-white/30 mt-2">1 = Poor · 5 = Excellent</p>
    </div>
  );
}

export default async function FeedbackPage({ params, searchParams }: Props) {
  const { token } = await params;
  const { error } = await searchParams;
  const feedback = await getFeedbackByToken(token);

  if (!feedback) notFound();

  if (feedback.status === "submitted") {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ backgroundColor: "#0d2318" }}>
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(109,204,70,0.15)", border: "1px solid rgba(109,204,70,0.3)" }}>
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-3">Already submitted</h1>
          <p className="text-sm text-white/50 leading-relaxed">
            Feedback for <span className="text-white/70 font-medium">{feedback.project_title}</span> has already been recorded. Thank you!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-12" style={{ backgroundColor: "#0d2318" }}>
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-10">
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold shrink-0" style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}>H</span>
          <span className="font-extrabold text-white text-sm">Hire Ethiopia&apos;s Best</span>
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(109,204,70,0.7)" }}>Project feedback</p>
          <h1 className="text-3xl font-black text-white leading-tight mb-2">
            How did the project go?
          </h1>
          {feedback.project_title && (
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Project: <span className="text-white/70 font-medium">{feedback.project_title}</span>
            </p>
          )}
          {feedback.client_name && (
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Submitted by {feedback.client_name}
            </p>
          )}
        </div>

        {error === "incomplete" && (
          <div className="rounded-xl px-4 py-3 text-sm mb-6" style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "rgb(252,165,165)" }}>
            Please complete all ratings before submitting.
          </div>
        )}

        <form action={submitFeedback} className="space-y-8">
          <input type="hidden" name="token" value={token} />

          {/* Ratings */}
          <div className="rounded-2xl p-6 space-y-7" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <StarInput name="qualityRating" label="Quality of work" />
            <div className="h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
            <StarInput name="communicationRating" label="Communication throughout the project" />
            <div className="h-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
            <StarInput name="deliveryRating" label="Delivered on time" />
          </div>

          {/* Would rehire */}
          <div>
            <p className="text-sm font-semibold text-white mb-3">Would you work with this professional again?</p>
            <div className="grid grid-cols-3 gap-3">
              {(["yes", "maybe", "no"] as const).map((val) => (
                <label key={val} className="cursor-pointer">
                  <input type="radio" name="wouldRehire" value={val} required className="sr-only peer" />
                  <span className="block text-center py-3 rounded-xl border-2 border-white/15 text-sm font-semibold text-white/50 peer-checked:border-[#6dcc46] peer-checked:text-[#6dcc46] peer-checked:bg-[#6dcc46]/10 hover:border-white/30 hover:text-white/70 transition-all duration-150 capitalize select-none">
                    {val === "yes" ? "Yes, definitely" : val === "maybe" ? "Maybe" : "Probably not"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Any additional comments? <span className="font-normal text-white/35">(optional)</span>
            </label>
            <textarea
              name="comments"
              rows={4}
              placeholder="What went well? What could have been better? Any other thoughts…"
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)" }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl text-sm font-bold transition-colors duration-150 cursor-pointer"
            style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
          >
            Submit feedback →
          </button>
        </form>

        <p className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.2)" }}>
          Your feedback is private and helps us match great talent with the right clients.
        </p>
      </div>
    </div>
  );
}
