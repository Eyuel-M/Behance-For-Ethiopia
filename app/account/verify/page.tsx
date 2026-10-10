"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { verifyOtpAction, sendOtp, type OtpVerifyResult, type OtpRequestResult } from "@/app/actions/account-auth";

const initVerify: OtpVerifyResult = {};
const initResend: OtpRequestResult = {};

function VerifyForm() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") ?? "";
  const demoCode = searchParams.get("demo") ?? "";

  const [state, action, pending] = useActionState(verifyOtpAction, initVerify);
  const [resendState, resendAction, resendPending] = useActionState(sendOtp, initResend);

  const displayPhone = phone.replace(/(\+251|0)?(\d{2})(\d{3})(\d{4})/, "+251 $2 $3 $4");

  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>

      {/* Logo */}
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3 11h16M11 3l8 8-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p style={{ fontSize: 16, fontWeight: 800, color: "#111827", letterSpacing: "-0.01em" }}>Hire Ethiopia&apos;s Best</p>
      </div>

      <div style={{ width: "100%", maxWidth: 400, backgroundColor: "#ffffff", borderRadius: 20, border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", padding: 32 }}>

        {/* WhatsApp sent indicator */}
        <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M13 3C7.48 3 3 7.48 3 13c0 1.77.49 3.42 1.35 4.83L3 23l5.3-1.32A9.97 9.97 0 0013 23c5.52 0 10-4.48 10-10S18.52 3 13 3z" fill="#22c55e" />
            <path d="M9.5 12.5c0-.55.45-1 1-1h5a1 1 0 010 2h-5a1 1 0 01-1-1zM9.5 15.5c0-.55.45-1 1-1h3a1 1 0 010 2h-3a1 1 0 01-1-1z" fill="#fff" />
          </svg>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#111827", marginBottom: 6, letterSpacing: "-0.02em" }}>
          Enter your code
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24, lineHeight: 1.5 }}>
          We sent a 6-digit code to <span style={{ fontWeight: 700, color: "#374151" }}>{displayPhone || phone}</span> on WhatsApp.
        </p>

        {/* Demo banner */}
        {demoCode && (
          <div style={{ marginBottom: 20, padding: "10px 14px", borderRadius: 10, backgroundColor: "#fefce8", border: "1px solid #fde68a", display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="#fbbf24" />
              <path d="M8 5v4M8 11v.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.05em" }}>Demo mode</p>
              <p style={{ fontSize: 15, fontWeight: 900, color: "#92400e", letterSpacing: "0.15em" }}>{demoCode}</p>
            </div>
          </div>
        )}

        <form action={action}>
          <input type="hidden" name="phone" value={phone} />
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Verification code
          </label>
          <input
            name="code"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            placeholder="000000"
            autoComplete="one-time-code"
            style={{
              width: "100%", padding: "14px", borderRadius: 10, border: "1px solid #d1d5db",
              fontSize: 24, fontWeight: 800, color: "#111827", letterSpacing: "0.3em",
              textAlign: "center", outline: "none", marginBottom: 20, boxSizing: "border-box",
            }}
          />

          {state.error && (
            <p style={{ fontSize: 13, color: "#dc2626", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#dc2626" strokeWidth="1.4" />
                <path d="M7 4v3.5M7 9.5v.5" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{
              width: "100%", padding: "13px", borderRadius: 12, border: "none",
              background: pending ? "#93c5fd" : "linear-gradient(135deg, #3b82f6, #6366f1)",
              color: "#fff", fontSize: 14, fontWeight: 800, cursor: pending ? "not-allowed" : "pointer",
              letterSpacing: "-0.01em",
            }}
          >
            {pending ? "Verifying…" : "Verify and continue →"}
          </button>
        </form>

        {/* Resend */}
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #f3f4f6" }}>
          {resendState.demoCode ? (
            <p style={{ fontSize: 13, color: "#16a34a", textAlign: "center" }}>
              New code sent: <strong style={{ letterSpacing: "0.1em" }}>{resendState.demoCode}</strong>
            </p>
          ) : (
            <form action={resendAction} style={{ textAlign: "center" }}>
              <input type="hidden" name="phone" value={phone} />
              <button
                type="submit"
                disabled={resendPending}
                style={{ background: "none", border: "none", fontSize: 13, color: "#6b7280", cursor: "pointer", textDecoration: "underline" }}
              >
                {resendPending ? "Sending…" : "Didn't receive it? Resend code"}
              </button>
            </form>
          )}
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <a href="/account" style={{ fontSize: 13, color: "#9ca3af", textDecoration: "none" }}>← Change number</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  );
}
