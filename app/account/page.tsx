"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { sendOtp, type OtpRequestResult } from "@/app/actions/account-auth";

const init: OtpRequestResult = {};

export default function AccountLoginPage() {
  const [state, action, pending] = useActionState(sendOtp, init);
  const router = useRouter();

  useEffect(() => {
    if (state.phone !== undefined) {
      const params = new URLSearchParams({ phone: state.phone });
      if (state.demoCode) params.set("demo", state.demoCode);
      router.push(`/account/verify?${params}`);
    }
  }, [state, router]);

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
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Professional portal</p>
      </div>

      {/* Card */}
      <div style={{ width: "100%", maxWidth: 400, backgroundColor: "#ffffff", borderRadius: 20, border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", padding: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#111827", marginBottom: 6, letterSpacing: "-0.02em" }}>
          Sign in to your account
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28, lineHeight: 1.5 }}>
          Enter the phone number you registered with. We&apos;ll send a one-time code via WhatsApp.
        </p>

        <form action={action}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Phone number
          </label>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", padding: "0 12px", borderRadius: 10, border: "1px solid #d1d5db", backgroundColor: "#f9fafb", fontSize: 14, fontWeight: 600, color: "#374151", whiteSpace: "nowrap", flexShrink: 0 }}>
              🇪🇹 +251
            </div>
            <input
              name="phone"
              type="tel"
              placeholder="91 234 5678"
              defaultValue=""
              autoComplete="tel"
              style={{
                flex: 1, padding: "12px 14px", borderRadius: 10, border: "1px solid #d1d5db",
                fontSize: 15, color: "#111827", backgroundColor: "#fff", outline: "none",
              }}
            />
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

          <button
            type="submit"
            disabled={pending}
            style={{
              width: "100%", padding: "13px", borderRadius: 12, border: "none",
              background: pending ? "#93c5fd" : "linear-gradient(135deg, #3b82f6, #6366f1)",
              color: "#fff", fontSize: 14, fontWeight: 800, cursor: pending ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              letterSpacing: "-0.01em",
            }}
          >
            {pending ? "Sending…" : (
              <>
                Send code via WhatsApp
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2.5C4.96 2.5 2.5 4.96 2.5 8c0 1.06.3 2.05.82 2.89L2.5 13.5l2.7-.8A5.48 5.48 0 008 13.5c3.04 0 5.5-2.46 5.5-5.5S11.04 2.5 8 2.5z" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.5 7.5c0-.28.22-.5.5-.5h2a.5.5 0 010 1H7a.5.5 0 01-.5-.5zM6.5 9.5c0-.28.22-.5.5-.5h1a.5.5 0 010 1H7a.5.5 0 01-.5-.5z" fill="#fff" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "#9ca3af", textAlign: "center" }}>
        Not a registered professional?{" "}
        <a href="/apply" style={{ color: "#3b82f6", fontWeight: 600, textDecoration: "none" }}>Apply here</a>
      </p>
    </div>
  );
}
