"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Designer } from "@/lib/types";
import { categories } from "@/lib/data/designers";

type Action = (prev: string | null, formData: FormData) => Promise<string | null>;

function inputClass(error?: boolean) {
  return [
    "w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900",
    "placeholder-slate-400 outline-none transition-all duration-150",
    "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
    error ? "border-red-400" : "border-slate-200",
  ].join(" ");
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

export default function DesignerForm({
  action,
  designer,
}: {
  action: Action;
  designer?: Designer;
}) {
  const [error, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-5">
      {error && (
        <div role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label required>Full name</Label>
          <input name="name" required defaultValue={designer?.name} placeholder="Abebe Dereje" className={inputClass()} />
        </div>
        <div>
          <Label required>Category</Label>
          <select name="category" required defaultValue={designer?.category ?? ""} className={inputClass() + " cursor-pointer"}>
            <option value="" disabled>Select…</option>
            {categories.filter((c) => c !== "All").map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label required>Skills (comma-separated)</Label>
        <input name="skills" required defaultValue={designer?.skills.join(", ")} placeholder="Figma, Branding, Typography" className={inputClass()} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <Label required>Experience (years)</Label>
          <input name="experience" type="number" min={0} max={40} required defaultValue={designer?.experience} placeholder="5" className={inputClass()} />
        </div>
        <div>
          <Label required>Location</Label>
          <input name="location" required defaultValue={designer?.location} placeholder="Addis Ababa" className={inputClass()} />
        </div>
        <div>
          <Label required>Rate ($/hr)</Label>
          <input name="rate" type="number" min={0} required defaultValue={designer?.rate} placeholder="25" className={inputClass()} />
        </div>
      </div>

      <div>
        <Label required>Bio</Label>
        <textarea name="bio" required rows={4} defaultValue={designer?.bio} placeholder="Short biography…" className={inputClass() + " resize-none"} />
      </div>

      <div className="flex items-center gap-3">
        <Label>Available</Label>
        <select name="available" defaultValue={designer?.available !== false ? "true" : "false"} className={inputClass() + " cursor-pointer w-32"}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors cursor-pointer"
        >
          {isPending ? "Saving…" : designer ? "Save changes" : "Create designer"}
        </button>
        <Link href="/admin/designers" className="text-sm text-slate-500 hover:text-slate-700 transition-colors cursor-pointer">
          Cancel
        </Link>
      </div>
    </form>
  );
}
