"use client";

import { useState, useTransition } from "react";
import { submitClientReview } from "@/app/actions/submit-client-review";

function StarPicker({ name, label }: { name: string; label: string }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <p className="text-xs font-semibold mb-2.5" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</p>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = hovered ? n <= hovered : n <= selected;
          return (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setSelected(n)}
              style={{
                width: 38, height: 38, borderRadius: 8, flexShrink: 0,
                border: active ? "1.5px solid #6dcc46" : "1.5px solid rgba(255,255,255,0.15)",
                backgroundColor: active ? "rgba(109,204,70,0.15)" : "transparent",
                color: active ? "#6dcc46" : "rgba(255,255,255,0.3)",
                fontSize: 13, fontWeight: 700,
                cursor: "pointer", transition: "all 0.1s ease",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={selected || ""} />
      <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>1 = Poor · 5 = Excellent</p>
    </div>
  );
}

export default function ClientReviewForm({ clientToken }: { clientToken: string }) {
  const [pending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rehire, setRehire] = useState<"yes" | "maybe" | "no" | "">("");

  if (done) {
    return (
      <div className="rounded-xl p-6 text-center" style={{ backgroundColor: "rgba(109,204,70,0.08)", border: "1px solid rgba(109,204,70,0.25)" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(109,204,70,0.15)", border: "1px solid rgba(109,204,70,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M1.5 7L6.5 12L16.5 1.5" stroke="#6dcc46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-sm font-bold" style={{ color: "#6dcc46" }}>Review submitted — thank you!</p>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>Your feedback helps us improve our service.</p>
      </div>
    );
  }

  function handleSubmit(formData: FormData) {
    setError(null);
    const quality = formData.get("quality") as string;
    const communication = formData.get("communication") as string;
    const delivery = formData.get("delivery") as string;
    const wouldRehire = formData.get("wouldRehire") as string;

    if (!quality || !communication || !delivery) {
      setError("Please rate all three categories.");
      return;
    }
    if (!wouldRehire) {
      setError("Please answer the rehire question.");
      return;
    }

    startTransition(async () => {
      try {
        await submitClientReview(formData);
        setDone(true);
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="clientToken" value={clientToken} />
      <div className="rounded-xl p-5 space-y-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

        {/* Star ratings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StarPicker name="quality" label="Quality of work" />
          <StarPicker name="communication" label="Communication" />
          <StarPicker name="delivery" label="On-time delivery" />
        </div>

        {/* Would rehire */}
        <div>
          <p className="text-xs font-semibold mb-2.5" style={{ color: "rgba(255,255,255,0.55)" }}>
            Would you work with this professional again?
          </p>
          <div className="flex gap-2 flex-wrap">
            {(["yes", "maybe", "no"] as const).map((val) => {
              const labels = { yes: "Yes, definitely", maybe: "Yes, maybe", no: "No" };
              const active = rehire === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRehire(val)}
                  style={{
                    padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                    border: active ? "1.5px solid #6dcc46" : "1.5px solid rgba(255,255,255,0.15)",
                    backgroundColor: active ? "rgba(109,204,70,0.15)" : "transparent",
                    color: active ? "#6dcc46" : "rgba(255,255,255,0.4)",
                    cursor: "pointer", transition: "all 0.1s ease",
                  }}
                >
                  {labels[val]}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="wouldRehire" value={rehire} />
        </div>

        {/* Comment */}
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>
            Comments <span style={{ color: "rgba(255,255,255,0.25)" }}>(optional)</span>
          </p>
          <textarea
            name="comments"
            placeholder="Share your experience working with this professional…"
            rows={3}
            className="w-full rounded-lg px-3 py-2.5 text-sm resize-none outline-none"
            style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" }}
          />
        </div>

        {error && (
          <p className="text-xs font-semibold" style={{ color: "#f97316" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 rounded-full text-sm font-bold transition-opacity"
          style={{ backgroundColor: "#6dcc46", color: "#0d2318", opacity: pending ? 0.6 : 1, cursor: pending ? "not-allowed" : "pointer" }}
        >
          {pending ? "Submitting…" : "Submit review →"}
        </button>
      </div>
    </form>
  );
}
