"use client";

import { useState, useTransition } from "react";
import { submitPitch } from "@/app/actions/submit-pitch";

export default function PitchForm({ token }: { token: string }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const result = await submitPitch(token, data);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error);
      }
    });
  }

  if (success) {
    return (
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">Your Pitch</p>

        {/* Approach */}
        <div className="mb-4">
          <label htmlFor="approach" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
            Your approach <span className="text-[#6dcc46]">*</span>
          </label>
          <textarea
            id="approach"
            name="approach"
            required
            minLength={80}
            rows={5}
            placeholder="How would you approach this project? What's your process, what makes your work right for this brief?"
            className="w-full rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#6dcc46] resize-none transition-colors"
          />
          <p className="text-xs text-zinc-600 mt-1">At least 80 characters. Be specific and confident.</p>
        </div>

        {/* Timeline + Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="timeline" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
              Your timeline <span className="text-[#6dcc46]">*</span>
            </label>
            <input
              id="timeline"
              name="timeline"
              type="text"
              required
              placeholder="e.g. 2–3 weeks"
              className="w-full rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#6dcc46] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
              Your price <span className="text-[#6dcc46]">*</span>
            </label>
            <input
              id="price"
              name="price"
              type="text"
              required
              placeholder="e.g. ETB 35,000"
              className="w-full rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#6dcc46] transition-colors"
            />
            <p className="text-xs text-zinc-600 mt-1">This is your full take-home amount.</p>
          </div>
        </div>

        {/* Optional message */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
            Anything else? <span className="text-zinc-600 font-normal normal-case">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Questions for the client, portfolio links relevant to this brief, or any clarifications…"
            className="w-full rounded-xl border-2 border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-[#6dcc46] resize-none transition-colors"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
      )}

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 text-xs text-zinc-500 leading-relaxed">
        <strong className="text-zinc-400">How this works:</strong> Your pitch is reviewed by our team alongside up to 2 other designers. The client sees anonymised proposals — Designer A, B, C — and selects based on approach, timeline, and price. If selected, you'll receive the full brief and we'll connect you directly with the client. The platform fee is paid by the client; you keep 100% of your quoted price.
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 rounded-full text-sm font-bold transition-all cursor-pointer disabled:opacity-60"
        style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
      >
        {isPending ? "Submitting…" : "Submit Pitch →"}
      </button>
    </form>
  );
}
