"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type DesignerCard = {
  id: string;
  full_name: string;
  specialty: string;
  city: string;
  experience: string;
  bio: string;
  skills: string;
  availability: string;
};

const PALETTE = [
  { bg: "#0d2318", color: "#6dcc46" },
  { bg: "#071208", color: "#6dcc46" },
  { bg: "#6dcc46", color: "#0d2318" },
  { bg: "#1a1a2e", color: "#ffffff" },
  { bg: "#3d1a4a", color: "#ffffff" },
  { bg: "#0a1a0a", color: "#6dcc46" },
  { bg: "#151515", color: "#ffffff" },
  { bg: "#f5e6c8", color: "#0d2318" },
];

function avatarStyle(name: string) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffffff;
  return PALETTE[Math.abs(h) % PALETTE.length];
}

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

// Normalise specialty to a short label for filter chips
function shortSpecialty(s: string): string {
  if (s.toLowerCase().includes("brand")) return "Branding";
  if (s.toLowerCase().includes("ui") || s.toLowerCase().includes("ux") || s.toLowerCase().includes("product")) return "UI/UX";
  if (s.toLowerCase().includes("motion") || s.toLowerCase().includes("animation")) return "Motion";
  if (s.toLowerCase().includes("print") || s.toLowerCase().includes("marketing")) return "Print";
  if (s.toLowerCase().includes("web") || s.toLowerCase().includes("digital")) return "Web";
  if (s.toLowerCase().includes("arch") || s.toLowerCase().includes("3d") || s.toLowerCase().includes("render")) return "3D / Arch";
  if (s.toLowerCase().includes("photo")) return "Photography";
  if (s.toLowerCase().includes("illus")) return "Illustration";
  return s.split(/[&·,]/)[0].trim();
}

export default function DesignersGrid({
  designers,
  specialties,
}: {
  designers: DesignerCard[];
  specialties: string[];
}) {
  const [activeSpecialty, setActiveSpecialty] = useState<string>("All");
  const [activeAvailability, setActiveAvailability] = useState<string>("All");

  const availabilityOptions = useMemo(() => {
    const set = new Set(designers.map((d) => {
      const a = d.availability.toLowerCase();
      if (a.includes("full")) return "Full-time";
      if (a.includes("part")) return "Part-time";
      return "Project-based";
    }));
    return ["All", ...Array.from(set).sort()];
  }, [designers]);

  const filtered = useMemo(() => {
    return designers.filter((d) => {
      const matchSpec = activeSpecialty === "All" || shortSpecialty(d.specialty) === activeSpecialty;
      const avLabel = (() => {
        const a = d.availability.toLowerCase();
        if (a.includes("full")) return "Full-time";
        if (a.includes("part")) return "Part-time";
        return "Project-based";
      })();
      const matchAvail = activeAvailability === "All" || avLabel === activeAvailability;
      return matchSpec && matchAvail;
    });
  }, [designers, activeSpecialty, activeAvailability]);

  return (
    <div>
      {/* ── Filter bar ── */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Specialty chips */}
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Specialty</p>
          <div className="flex flex-wrap gap-2">
            {["All", ...specialties].map((s) => (
              <button
                key={s}
                onClick={() => setActiveSpecialty(s)}
                className="px-3 py-2.5 min-h-[40px] rounded-full text-xs font-semibold transition-all cursor-pointer"
                style={
                  activeSpecialty === s
                    ? { backgroundColor: "#0d2318", color: "#ffffff", border: "1.5px solid #0d2318" }
                    : { backgroundColor: "#f4f4f5", color: "#71717a", border: "1.5px solid transparent" }
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Availability chips */}
        {availabilityOptions.length > 2 && (
          <div className="shrink-0">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Availability</p>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((a) => (
                <button
                  key={a}
                  onClick={() => setActiveAvailability(a)}
                  className="px-3 py-2.5 min-h-[40px] rounded-full text-xs font-semibold transition-all cursor-pointer"
                  style={
                    activeAvailability === a
                      ? { backgroundColor: "#6dcc46", color: "#0d2318", border: "1.5px solid #6dcc46" }
                      : { backgroundColor: "#f4f4f5", color: "#71717a", border: "1.5px solid transparent" }
                  }
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Count ── */}
      <p className="text-xs text-zinc-400 mb-6">
        {filtered.length === designers.length
          ? `${designers.length} designer${designers.length !== 1 ? "s" : ""}`
          : `${filtered.length} of ${designers.length} designer${designers.length !== 1 ? "s" : ""}`}
      </p>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-400 text-sm mb-3">No designers match this filter.</p>
          <button
            onClick={() => { setActiveSpecialty("All"); setActiveAvailability("All"); }}
            className="text-xs font-bold text-[#0d2318] hover:text-[#6dcc46] transition-colors cursor-pointer"
          >
            Clear filters →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((d) => {
            const { bg, color } = avatarStyle(d.full_name);
            const inits = initials(d.full_name);
            const skills = d.skills.split(",").map((s) => s.trim()).filter(Boolean);
            return (
              <Link
                key={d.id}
                href={`/designers/${d.id}`}
                className="group rounded-2xl border border-zinc-100 bg-white overflow-hidden hover:shadow-md hover:border-zinc-200 transition-all duration-200 flex flex-col h-full"
              >
                {/* Avatar strip */}
                <div className="h-24 flex items-end p-4" style={{ backgroundColor: bg }}>
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm"
                    style={{ backgroundColor: `${color}20`, color, border: `2px solid ${color}30` }}
                  >
                    {inits}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-extrabold text-zinc-900 text-sm leading-snug mb-0.5">{d.full_name}</h3>
                  <p className="text-xs font-semibold text-[#6dcc46] mb-1">{d.specialty}</p>
                  <p className="text-xs text-zinc-400 mb-3">{d.city} · {d.experience}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4 flex-1 line-clamp-3">{d.bio}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {skills.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-500">{s}</span>
                    ))}
                    {skills.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-400">+{skills.length - 3}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                    <span className="text-xs text-zinc-400">{d.availability}</span>
                    <span className="text-xs font-bold text-[#0d2318] group-hover:text-[#6dcc46] transition-colors">
                      View profile →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
