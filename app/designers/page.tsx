"use client";

import { useState, useMemo } from "react";
import DesignerCard from "@/components/DesignerCard";
import { designers, categories } from "@/lib/data/designers";

// ─── Icons ────────────────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignersPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return designers.filter((d) => {
      const matchesCategory =
        activeCategory === "All" || d.category === activeCategory;
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.skills.some((s) => s.toLowerCase().includes(q)) ||
        d.location.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            Browse Designers
          </h1>
          <p className="mt-1.5 text-stone-500 text-base">
            {designers.length} vetted Ethiopian designers ready to work with
            your business.
          </p>

          {/* Search */}
          <div className="relative mt-5 max-w-md">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-stone-400">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, skill, or location…"
              aria-label="Search designers"
              className="w-full rounded-xl border border-stone-200 bg-white py-2.5 pl-10 pr-10 text-sm text-stone-900 placeholder-stone-400 shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-150"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-3 flex items-center text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                <XIcon />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer ${
                activeCategory === cat
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-white border border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-stone-400 mb-5">
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
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
              <SearchIcon />
            </div>
            <p className="font-medium text-stone-700">No designers found</p>
            <p className="text-sm text-stone-400 mt-1">
              Try adjusting your search or clearing the filters.
            </p>
            <button
              onClick={() => { setQuery(""); setActiveCategory("All"); }}
              className="mt-4 text-sm font-medium text-amber-700 hover:text-amber-900 transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
