import { notFound } from "next/navigation";
import {
  getDesignerPitchByToken,
  getClientBrief,
  getDesignerApplication,
} from "@/lib/supabase/admin-queries";
import PitchForm from "./PitchForm";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }> };

export default async function PitchPage({ params }: Props) {
  const { token } = await params;
  const pitch = await getDesignerPitchByToken(token);
  if (!pitch) notFound();

  const [brief, designer] = await Promise.all([
    getClientBrief(pitch.brief_id),
    getDesignerApplication(pitch.designer_id),
  ]);
  if (!brief || !designer) notFound();

  const alreadySubmitted = pitch.status === "submitted";

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Header */}
      <div style={{ backgroundColor: "#071208" }} className="border-b border-zinc-800">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 py-6 flex items-center gap-3">
          <span className="text-sm font-black text-white tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            Hire Ethiopia's Best
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-600" />
          <span className="text-xs text-zinc-500 font-semibold uppercase tracking-widest">Pitch Invitation</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12">

        {/* Designer greeting */}
        <div className="mb-8">
          <p className="text-[#6dcc46] text-xs font-bold uppercase tracking-widest mb-2">For {designer.full_name}</p>
          <h1
            className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            You've been shortlisted<br />for a project.
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
            A client is looking for a designer with your skills. Review the brief below and submit your pitch — your price, timeline, and approach.
          </p>
        </div>

        {/* Brief summary card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">The Brief</p>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Category</p>
              <p className="text-sm font-semibold text-white">{brief.category}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Budget (client)</p>
              <p className="text-sm font-semibold text-white">{brief.budget}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Timeline needed</p>
              <p className="text-sm font-semibold text-white">{brief.timeline}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Service mode</p>
              <p className="text-sm font-semibold text-white">{brief.service_mode}</p>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-4">
            <p className="text-xs text-zinc-500 mb-2">Types of work</p>
            <p className="text-sm text-zinc-300">{brief.design_types}</p>
          </div>
          <div className="border-t border-zinc-800 pt-4 mt-4">
            <p className="text-xs text-zinc-500 mb-2">Project description</p>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{brief.project_description}</p>
          </div>
          {brief.additional_notes && (
            <div className="border-t border-zinc-800 pt-4 mt-4">
              <p className="text-xs text-zinc-500 mb-2">Additional notes from client</p>
              <p className="text-sm text-zinc-400 leading-relaxed">{brief.additional_notes}</p>
            </div>
          )}
        </div>

        {alreadySubmitted ? (
          <div className="rounded-2xl border border-[#6dcc46]/30 bg-[#0d2318]/50 p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#6dcc46]/20 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6dcc46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-lg font-black text-white mb-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              Pitch submitted
            </h2>
            <p className="text-zinc-400 text-sm">
              Your pitch has been received. We'll be in touch once the client has reviewed all proposals.
            </p>
          </div>
        ) : (
          <PitchForm token={token} />
        )}

      </div>
    </div>
  );
}
