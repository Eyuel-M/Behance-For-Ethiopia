"use client";

import { useState, useMemo } from "react";
import DesignerCard from "@/components/DesignerCard";
import type { Designer } from "@/lib/types";
import { categories } from "@/lib/data/designers";

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function DesignersGrid({
  designers,
  initialQuery = "",
  initialLocation = "",
}: {
  designers: Designer[];
  initialQuery?: string;
  initialLocation?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const loc = locationFilter.toLowerCase().trim();
    return designers.filter((d) => {
      const matchesCategory =
        activeCategory === "All" || d.category === activeCategory;
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.skills.some((s) => s.toLowerCase().includes(q)) ||
        d.location.toLowerCase().includes(q);
      const matchesLocation =
        !loc || loc === "remote"
          ? !loc || d.location.toLowerCase().includes(loc)
          : d.location.toLowerCase().includes(loc);
      return matchesCategory && matchesQuery && matchesLocation;
    });
  }, [query, locationFilter, activeCategory, designers]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer ${
              activeCategory === cat
                ? "bg-zinc-900 text-white shadow-sm"
                : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-zinc-400 mb-5">
        {filtered.length === designers.length
          ? `${designers.length} designers`
          : `${filtered.length} of ${designers.length} designers`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((designer) => (
            <DesignerCard key={designer.id} designer={designer} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4 text-zinc-400">
            <SearchIcon />
          </div>
          <p className="font-semibold text-zinc-700">No designers found</p>
          <p className="text-sm text-zinc-400 mt-1">
            Try adjusting your search or clearing the filters.
          </p>
          <button
            onClick={() => { setQuery(""); setLocationFilter(""); setActiveCategory("All"); }}
            className="mt-4 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative max-w-md">
      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-zinc-400">
        <SearchIcon />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, skill, or location…"
        aria-label="Search designers"
        className="w-full rounded-full border border-zinc-200 bg-white py-2.5 pl-10 pr-10 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-150"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
}
