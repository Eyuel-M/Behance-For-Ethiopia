"use client";

import { useState, useTransition } from "react";
import { submitClientReview } from "@/app/actions/submit-client-review";

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

function StarPicker({ name, label }: { name: string; label: string }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const active = hovered || selected;

  return (
    <div>
      <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
      <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = n <= (hovered || selected);
          return (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHovered(n)}
              onClick={() => setSelected(n)}
              aria-label={`${n} star${n !== 1 ? "s" : ""}`}
              style={{
                background: "none",
                border: "none",
                padding: "2px",
                cursor: "pointer",
                transition: "transform 0.1s ease",
                transform: hovered === n ? "scale(1.2)" : "scale(1)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
                  fill={filled ? "#f59e0b" : "none"}
                  stroke={filled ? "#f59e0b" : "rgba(255,255,255,0.2)"}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          );
        })}
      </div>
      {active > 0 && (
        <p className="text-xs font-semibold mt-1.5" style={{ color: active >= 4 ? "#6dcc46" : active >= 3 ? "#f59e0b" : "rgba(255,255,255,0.4)" }}>
          {RATING_LABELS[active]}
        </p>
      )}
      {active === 0 && <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.18)" }}>Tap to rate</p>}
      <input type="hidden" name={name} value={selected || ""} />
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
      <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "rgba(109,204,70,0.07)", border: "1px solid rgba(109,204,70,0.2)" }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          backgroundColor: "rgba(109,204,70,0.15)", border: "1px solid rgba(109,204,70,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
        }}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path d="M1.5 8L8 14.5L20.5 1.5" stroke="#6dcc46" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-base font-bold mb-1" style={{ color: "#6dcc46" }}>Thank you for your review!</p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Your feedback helps us maintain high standards for our clients.</p>
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
      <div className="rounded-2xl p-6 space-y-7" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

        {/* Star ratings */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(255,255,255,0.25)" }}>Rate your experience</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StarPicker name="quality" label="Quality of work" />
            <StarPicker name="communication" label="Communication" />
            <StarPicker name="delivery" label="On-time delivery" />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.06)" }} />

        {/* Would rehire */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            Would you work with this professional again?
          </p>
          <div className="flex gap-2.5 flex-wrap">
            {(["yes", "maybe", "no"] as const).map((val) => {
              const labelMap = { yes: "Yes, definitely", maybe: "Possibly", no: "No" };
              const active = rehire === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRehire(val)}
                  style={{
                    padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                    border: active
                      ? val === "no" ? "1.5px solid rgba(249,115,22,0.6)" : "1.5px solid #6dcc46"
                      : "1.5px solid rgba(255,255,255,0.12)",
                    backgroundColor: active
                      ? val === "no" ? "rgba(249,115,22,0.12)" : "rgba(109,204,70,0.12)"
                      : "transparent",
                    color: active
                      ? val === "no" ? "#f97316" : "#6dcc46"
                      : "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {labelMap[val]}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="wouldRehire" value={rehire} />
        </div>

        {/* Comment */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            Share your experience <span style={{ color: "rgba(255,255,255,0.18)", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
          </p>
          <textarea
            name="comments"
            placeholder="What stood out about working with this professional? Your honest feedback helps us improve."
            rows={3}
            className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
            }}
          />
        </div>

        {error && (
          <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: "#f97316" }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#f97316" strokeWidth="1.4"/>
              <path d="M7 4v3.5" stroke="#f97316" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="7" cy="10" r="0.7" fill="#f97316"/>
            </svg>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-bold transition-opacity"
          style={{
            backgroundColor: "#6dcc46",
            color: "#0d2318",
            opacity: pending ? 0.6 : 1,
            cursor: pending ? "not-allowed" : "pointer",
          }}
        >
          {pending ? "Submitting…" : "Submit review"}
        </button>
      </div>
    </form>
  );
}
