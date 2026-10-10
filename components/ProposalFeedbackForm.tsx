"use client";

import { useState, useTransition } from "react";
import { requestRevision } from "@/app/actions/client-proposal";

type Props = {
  token: string;
  disabled?: boolean;
  alreadyRequested?: boolean;
  existingNote?: string | null;
};

export default function ProposalFeedbackForm({ token, disabled, alreadyRequested, existingNote }: Props) {
  const [stage, setStage] = useState<"idle" | "note" | "done">(alreadyRequested ? "done" : "idle");
  const [note, setNote] = useState("");
  const [isPending, startTransition] = useTransition();

  if (disabled) return null;

  const accent = "#6dcc46";

  if (stage === "done") {
    return (
      <div className="mt-6 rounded-xl px-5 py-4" style={{ backgroundColor: "rgba(109,204,70,0.07)", border: "1px solid rgba(109,204,70,0.2)" }}>
        <p className="text-sm font-bold mb-1" style={{ color: accent }}>Revision request sent</p>
        {existingNote && (
          <p className="text-sm mb-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>&ldquo;{existingNote}&rdquo;</p>
        )}
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          Our team will review your feedback and send an updated shortlist shortly.
        </p>
      </div>
    );
  }

  if (stage === "note") {
    return (
      <div className="mt-6 rounded-xl p-5" style={{ border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}>
        <p className="text-sm font-bold text-white mb-3">What would you like us to change?</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. I'd prefer someone with fintech experience, or a lower budget range…"
          rows={3}
          className="w-full text-sm rounded-lg px-3 py-2.5 resize-none outline-none placeholder:opacity-40"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.85)",
          }}
        />
        <div className="flex gap-3 mt-3 flex-wrap">
          <button
            onClick={() => {
              if (!note.trim() || isPending) return;
              startTransition(async () => {
                await requestRevision(token, note.trim());
                setStage("done");
              });
            }}
            disabled={!note.trim() || isPending}
            className="px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: accent, color: "#0d2318" }}
          >
            {isPending ? "Sending…" : "Send request →"}
          </button>
          <button
            onClick={() => setStage("idle")}
            className="px-5 py-2.5 rounded-full text-sm cursor-pointer transition-colors"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
        Does this shortlist work for your project?
      </p>
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => {
            document.querySelector<HTMLElement>("[data-designer-cards]")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all hover:opacity-90"
          style={{ backgroundColor: "rgba(109,204,70,0.15)", color: accent, border: "1px solid rgba(109,204,70,0.3)" }}
        >
          Looks good — choose a professional ↓
        </button>
        <button
          onClick={() => setStage("note")}
          className="px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer transition-all hover:opacity-90"
          style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Request changes
        </button>
      </div>
    </div>
  );
}
