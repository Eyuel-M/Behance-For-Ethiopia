"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const [error, action, isPending] = useActionState(loginAdmin, null);
  const isMisconfig = error?.includes("not configured");

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0d2318" }}>

      {/* Left panel — brand */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-12 border-r" style={{ borderColor: "rgba(255,255,255,0.07)", backgroundColor: "#0a1e13" }}>
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold" style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}>H</span>
          <span className="font-extrabold text-white text-sm">Hire Ethiopia&apos;s Best</span>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(109,204,70,0.7)" }}>Admin Portal</p>
          <h2 className="text-3xl font-black text-white leading-tight mb-4" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            Manage briefs,<br />professionals<br />&amp; projects.
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
            Internal operations dashboard for reviewing client briefs,
            approving professional applications, and overseeing active projects.
          </p>
        </div>

        {/* Decorative stat pills */}
        <div className="space-y-2">
          {[
            { label: "Client Briefs", desc: "Review incoming project requests" },
            { label: "Pro Applications", desc: "Approve vetted professionals" },
            { label: "Projects", desc: "Track active deliveries" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#6dcc46" }} />
              <div>
                <p className="text-xs font-semibold text-white">{item.label}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold" style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}>H</span>
            <span className="font-extrabold text-white text-sm">Hire Ethiopia&apos;s Best</span>
          </div>

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(109,204,70,0.7)" }}>Admin access</p>
            <h1 className="text-3xl font-black text-white" style={{ fontFamily: "var(--font-display), sans-serif" }}>Sign in</h1>
          </div>

          <form action={action} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                autoFocus
                autoComplete="current-password"
                placeholder="Enter admin password"
                className="w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all duration-150"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1.5px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#6dcc46"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(109,204,70,0.15)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl px-4 py-3 text-sm"
                style={{ backgroundColor: isMisconfig ? "rgba(234,179,8,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${isMisconfig ? "rgba(234,179,8,0.25)" : "rgba(239,68,68,0.25)"}`, color: isMisconfig ? "rgb(253,224,71)" : "rgb(252,165,165)" }}
              >
                {isMisconfig ? (
                  <>
                    <p className="font-semibold mb-1">Setup required</p>
                    <p className="text-xs opacity-80">Create a <code className="font-mono">.env.local</code> file in the project root and add:<br /><code className="font-mono">ADMIN_PASSWORD=yourpassword<br />ADMIN_SESSION_SECRET=anyrandomstring</code></p>
                  </>
                ) : error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer disabled:opacity-60"
              style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
            >
              {isPending ? "Signing in…" : "Sign in →"}
            </button>
          </form>

          <p className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.2)" }}>
            Access restricted to authorised personnel only.
          </p>
        </div>
      </div>

    </div>
  );
}
