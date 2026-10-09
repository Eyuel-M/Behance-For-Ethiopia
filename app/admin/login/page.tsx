"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const [error, action, isPending] = useActionState(loginAdmin, null);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Admin</p>
          <h1 className="text-2xl font-bold text-white">Sign in</h1>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-150"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 disabled:opacity-60 transition-colors cursor-pointer"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
