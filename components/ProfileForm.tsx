"use client";

import { useActionState, useState } from "react";
import { saveProfile, type ProfileSaveResult } from "@/app/actions/account-auth";
import type { DesignerApplicationRow } from "@/lib/supabase/project-types";

const AVAILABILITY_OPTIONS = [
  "Full-time (40 hrs/week)",
  "Part-time (20 hrs/week)",
  "Project-based / Freelance",
  "Weekends only",
];

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 5 }}>{hint}</p>}
    </div>
  );
}

const INPUT_STYLE: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #d1d5db",
  fontSize: 14, color: "#111827", backgroundColor: "#fff", outline: "none", boxSizing: "border-box",
};

const TEXTAREA_STYLE: React.CSSProperties = {
  ...INPUT_STYLE, resize: "vertical" as const, lineHeight: 1.65,
};

export default function ProfileForm({
  app,
  existingSamples,
}: {
  app: DesignerApplicationRow;
  existingSamples: string[];
}) {
  const [state, action, pending] = useActionState<ProfileSaveResult, FormData>(saveProfile, {});
  const [saved, setSaved] = useState(false);

  const samples = [existingSamples[0] ?? "", existingSamples[1] ?? "", existingSamples[2] ?? ""];

  return (
    <form
      action={async (fd) => {
        await action(fd);
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      }}
    >
      <input type="hidden" name="applicationId" value={app.id} />

      {/* Portfolio images */}
      <div style={{ backgroundColor: "#ffffff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24, marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: "#111827", marginBottom: 4, letterSpacing: "-0.01em" }}>Portfolio images</p>
        <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 18 }}>Paste up to 3 public image URLs showcasing your best work.</p>
        {[0, 1, 2].map((i) => (
          <Field key={i} label={`Image ${i + 1}${i === 0 ? " (required)" : " (optional)"}`}>
            <input
              name={`ws_${i}`}
              type="url"
              placeholder="https://example.com/my-work.jpg"
              defaultValue={samples[i]}
              style={INPUT_STYLE}
            />
          </Field>
        ))}
      </div>

      {/* About */}
      <div style={{ backgroundColor: "#ffffff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24, marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: "#111827", marginBottom: 18, letterSpacing: "-0.01em" }}>About you</p>

        <Field label="Bio" hint="2–4 sentences. What you do, who you do it for, and what makes your work stand out.">
          <textarea
            name="bio"
            rows={4}
            defaultValue={app.bio}
            style={TEXTAREA_STYLE}
          />
        </Field>

        <Field label="Skills" hint="Comma-separated. e.g. Logo design, brand guidelines, packaging">
          <textarea
            name="skills"
            rows={2}
            defaultValue={app.skills}
            style={TEXTAREA_STYLE}
          />
        </Field>

        <Field label="Tools" hint="Software and tools you actively use.">
          <textarea
            name="tools"
            rows={2}
            defaultValue={app.tools}
            style={TEXTAREA_STYLE}
          />
        </Field>
      </div>

      {/* Availability & rates */}
      <div style={{ backgroundColor: "#ffffff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24, marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: "#111827", marginBottom: 18, letterSpacing: "-0.01em" }}>Availability & rates</p>

        <Field label="Availability">
          <select
            name="availability"
            defaultValue={app.availability}
            style={{ ...INPUT_STYLE, appearance: "none" as const, cursor: "pointer" }}
          >
            {AVAILABILITY_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
            <option value={app.availability}>{app.availability}</option>
          </select>
        </Field>

        <Field label="Rate / budget range" hint="e.g. ETB 20,000 – 50,000 per project">
          <input
            name="hourly_rate"
            type="text"
            defaultValue={app.hourly_rate}
            style={INPUT_STYLE}
          />
        </Field>
      </div>

      {/* Links */}
      <div style={{ backgroundColor: "#ffffff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24, marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: "#111827", marginBottom: 18, letterSpacing: "-0.01em" }}>Links</p>

        <Field label="Portfolio URL">
          <input
            name="portfolio_url"
            type="url"
            placeholder="https://behance.net/yourprofile"
            defaultValue={app.portfolio_url}
            style={INPUT_STYLE}
          />
        </Field>

        <Field label="LinkedIn / social URL (optional)">
          <input
            name="social_url"
            type="url"
            placeholder="https://linkedin.com/in/yourname"
            defaultValue={app.social_url ?? ""}
            style={INPUT_STYLE}
          />
        </Field>
      </div>

      {/* Read-only info */}
      <div style={{ backgroundColor: "#f9fafb", borderRadius: 16, border: "1px solid #e5e7eb", padding: 20, marginBottom: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Account info (read-only)</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Name", value: app.full_name },
            { label: "Phone", value: app.phone },
            { label: "Email", value: app.email },
            { label: "City", value: app.city },
          ].map(({ label, value }) => (
            <div key={label} style={{ backgroundColor: "#fff", borderRadius: 10, padding: "10px 14px", border: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{label}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{value}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10 }}>To change your name, phone, or email, contact our team directly.</p>
      </div>

      {state.error && (
        <p style={{ fontSize: 13, color: "#dc2626", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#dc2626" strokeWidth="1.4" />
            <path d="M7 4v3.5M7 9.5v.5" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          {state.error}
        </p>
      )}

      {saved && !state.error && (
        <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 10, backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#15803d" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#16a34a" strokeWidth="1.4" />
            <path d="M4.5 7l2 2 3-3.5" stroke="#16a34a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Saved! Our team will review your changes shortly.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          width: "100%", padding: "14px", borderRadius: 12, border: "none",
          background: pending ? "#93c5fd" : "linear-gradient(135deg, #3b82f6, #6366f1)",
          color: "#fff", fontSize: 15, fontWeight: 800, cursor: pending ? "not-allowed" : "pointer",
          letterSpacing: "-0.01em",
        }}
      >
        {pending ? "Saving…" : "Save changes"}
      </button>

      <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 10 }}>
        Our team will review your changes before they go live on your profile.
      </p>
    </form>
  );
}
