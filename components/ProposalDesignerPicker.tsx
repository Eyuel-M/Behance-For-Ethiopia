"use client";

import { useState } from "react";
import { generateProposalLink } from "@/app/actions/admin-proposals";
import type { DesignerApplicationRow } from "@/lib/supabase/project-types";

export default function ProposalDesignerPicker({
  projectId,
  designers,
}: {
  projectId: string;
  designers: DesignerApplicationRow[];
}) {
  const [query, setQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const specialties = ["All", ...Array.from(new Set(designers.map((d) => d.specialty)))];

  const filtered = designers.filter((d) => {
    const q = query.toLowerCase();
    const matchesSearch = !q || d.full_name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q) || d.city.toLowerCase().includes(q);
    const matchesSpecialty = specialtyFilter === "All" || d.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  function toggle(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  return (
    <form action={generateProposalLink} className="space-y-4">
      <input type="hidden" name="projectId" value={projectId} />
      {selectedIds.map((id) => (
        <input key={id} type="hidden" name="designerId" value={id} />
      ))}

      <p className="text-sm text-zinc-500">
        Select up to 3 professionals. Their identities will be anonymized as Designer A, B, C on the client&apos;s shortlist.
      </p>

      {/* Search */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, specialty, or city…"
        className="w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-900 bg-white outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
      />

      {/* Specialty filter chips */}
      {specialties.length > 2 && (
        <div className="flex flex-wrap gap-2">
          {specialties.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSpecialtyFilter(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                specialtyFilter === s
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Designer list */}
      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-0.5">
        {filtered.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center py-8">No professionals match this filter.</p>
        ) : (
          filtered.map((d) => {
            const isSelected = selectedIds.includes(d.id);
            const isDisabled = !isSelected && selectedIds.length >= 3;
            const initials = d.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <label
                key={d.id}
                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all select-none ${
                  isDisabled
                    ? "opacity-35 cursor-not-allowed border-zinc-100 bg-zinc-50"
                    : isSelected
                    ? "border-green-400 bg-green-50/60 cursor-pointer"
                    : "border-zinc-200 bg-white cursor-pointer hover:bg-zinc-50"
                }`}
              >
                {/* Custom checkbox */}
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected ? "bg-green-500 border-green-500" : "border-zinc-300"
                  }`}
                  onClick={() => !isDisabled && toggle(d.id)}
                >
                  {isSelected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0" onClick={() => !isDisabled && toggle(d.id)}>
                  <p className="text-sm font-semibold text-zinc-900">{d.full_name}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 truncate">{d.specialty} · {d.hourly_rate}</p>
                </div>

                {/* City + experience */}
                <div className="text-right shrink-0 hidden sm:block" onClick={() => !isDisabled && toggle(d.id)}>
                  <p className="text-xs font-medium text-zinc-500">{d.city}</p>
                  <p className="text-xs text-zinc-300 mt-0.5">{d.experience}</p>
                </div>
              </label>
            );
          })
        )}
      </div>

      {/* Footer / submit */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 gap-3 flex-wrap">
        <p className="text-xs text-zinc-400">
          <span className={selectedIds.length > 0 ? "text-zinc-700 font-semibold" : ""}>{selectedIds.length}</span> of 3 selected
          {selectedIds.length === 3 && <span className="text-amber-600 ml-1.5">— max reached</span>}
        </p>
        <button
          type="submit"
          disabled={selectedIds.length === 0}
          className="px-5 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-bold hover:bg-zinc-700 disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Generate client proposal link →
        </button>
      </div>
    </form>
  );
}
