"use client";

import Link from "next/link";
import { useState } from "react";
import { StaggerGrid, StaggerItem } from "@/components/Motion";
import type { PortfolioProject, PortfolioCategory } from "@/lib/content/types";

type Category = "All" | PortfolioCategory;
const CATEGORIES: Category[] = ["All", "Branding", "Web & Digital", "Visual Content", "Architecture"];

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const isFeatured = index === 0;

  return (
    <Link href={`/portfolio/${project.id}`} className="group block cursor-pointer">
      <div
        className={[
          "relative overflow-hidden rounded-2xl mb-5",
          isFeatured ? "h-[420px] sm:h-[520px]" : "h-[260px] sm:h-[300px]",
        ].join(" ")}
        style={{ background: project.gradient }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
        />
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <span className="text-white/40 text-xs font-mono tabular-nums">{project.year}</span>
          <span className="bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <p className="text-white font-extrabold text-base sm:text-lg leading-snug">{project.title}</p>
          <span
            className="shrink-0 w-9 h-9 rounded-full border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.1)" }}
            aria-hidden="true"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)" }}
        />
      </div>
      <div className="flex items-start gap-4">
        <span className="text-zinc-200 font-mono text-xs tabular-nums pt-0.5 select-none shrink-0">{project.num}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-400 mb-1">{project.client}</p>
          <p className="text-xs text-zinc-500 leading-relaxed mb-3 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-zinc-100 text-zinc-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function PortfolioClient({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      {/* Category filter — dark background bar */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-4 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? projects.length : projects.filter(p => p.category === cat).length;
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer"
                  style={isActive
                    ? { backgroundColor: "#6dcc46", color: "#0d2318" }
                    : { backgroundColor: "transparent", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }
                  }
                >
                  {cat}
                  <span className="text-[10px] tabular-nums" style={{ opacity: isActive ? 0.6 : 0.4 }}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects grid — white background */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        {filtered.length === 0 && (
          <p className="text-zinc-400 text-sm text-center py-20">No projects in this category yet.</p>
        )}
        {featured && (
          <div className="mb-10 sm:mb-14">
            <ProjectCard project={featured} index={0} />
          </div>
        )}
        {rest.length > 0 && (
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
            {rest.map((project, i) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} index={i + 1} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </>
  );
}
