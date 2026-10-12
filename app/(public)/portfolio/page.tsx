"use client";

import Link from "next/link";
import { useState } from "react";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

type Category = "All" | "Branding" | "Web & Digital" | "Visual Content" | "Architecture";

interface Project {
  id: string;
  num: string;
  category: Exclude<Category, "All">;
  client: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  year: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    num: "01",
    category: "Branding",
    client: "Habesha Premium Coffee",
    title: "Export-Grade Brand Identity",
    description: "Full visual identity for an Addis-based coffee exporter targeting European buyers. Logo, packaging, and brand guidelines.",
    tags: ["Logo", "Packaging", "Guidelines"],
    gradient: "linear-gradient(155deg, #1a0c00 0%, #6b3210 40%, #c8802a 80%, #e8b060 100%)",
    year: "2024",
  },
  {
    id: "2",
    num: "02",
    category: "Web & Digital",
    client: "Agar Microfinance",
    title: "Fintech App UI — Amharic-First",
    description: "Mobile app UI for a rural micro-lending platform. Offline-capable, Amharic language support, designed for first-time smartphone users.",
    tags: ["UI/UX", "Mobile", "Amharic"],
    gradient: "linear-gradient(155deg, #041008 0%, #0d3018 40%, #2a7040 80%, #6dcc46 100%)",
    year: "2024",
  },
  {
    id: "3",
    num: "03",
    category: "Architecture",
    client: "Bole Heights Real Estate",
    title: "Residential Tower Visualisation",
    description: "Photorealistic renders of a 14-storey mixed-use tower in Bole. Interior walkthroughs, exterior day/night renders, and marketing material.",
    tags: ["3D Render", "Arch Viz", "Interior"],
    gradient: "linear-gradient(155deg, #06061a 0%, #101040 40%, #2828a0 80%, #5060d0 100%)",
    year: "2024",
  },
  {
    id: "4",
    num: "04",
    category: "Branding",
    client: "Abyssinia Kitchen",
    title: "Restaurant Brand Refresh",
    description: "Updated visual identity for a 3-location Addis restaurant chain. Social media templates, rollup banners, and menu redesign.",
    tags: ["Brand Refresh", "Print", "Social"],
    gradient: "linear-gradient(155deg, #120204 0%, #5c1010 40%, #c03030 80%, #e86060 100%)",
    year: "2023",
  },
  {
    id: "5",
    num: "05",
    category: "Visual Content",
    client: "Ethio-Tech Hub",
    title: "Product Launch Motion Package",
    description: "Animated logo reveal, social media story templates, and an 80-second explainer video for an Addis-based SaaS product launch.",
    tags: ["Motion", "Animation", "Video"],
    gradient: "linear-gradient(155deg, #041210 0%, #0a3d34 40%, #1a9080 80%, #30ccb8 100%)",
    year: "2024",
  },
  {
    id: "6",
    num: "06",
    category: "Web & Digital",
    client: "Sheba Organic",
    title: "E-commerce & Brand Website",
    description: "Shopify-powered storefront with custom UI for an organic skincare brand. Mobile-first, Amharic/English bilingual, launched in under 3 weeks.",
    tags: ["E-commerce", "Shopify", "Bilingual"],
    gradient: "linear-gradient(155deg, #081404 0%, #204818 40%, #4a9030 80%, #80cc50 100%)",
    year: "2023",
  },
  {
    id: "7",
    num: "07",
    category: "Architecture",
    client: "Addis Urban Design Office",
    title: "Mixed-Use Plaza Concept",
    description: "BIM models and concept renders for a proposed public plaza in the Kazanchis district. Presented to city planners and developers.",
    tags: ["BIM", "Urban Design", "Concept"],
    gradient: "linear-gradient(155deg, #0c0c0c 0%, #222222 40%, #555555 80%, #909090 100%)",
    year: "2023",
  },
  {
    id: "8",
    num: "08",
    category: "Branding",
    client: "Genet Textiles",
    title: "Heritage Fashion Brand Identity",
    description: "Identity system for an Ethiopian textile brand blending traditional patterns with contemporary design. Includes swing tags, lookbook, and digital assets.",
    tags: ["Fashion", "Heritage", "Print"],
    gradient: "linear-gradient(155deg, #120800 0%, #4a2008 40%, #a06828 80%, #d4a058 100%)",
    year: "2024",
  },
  {
    id: "9",
    num: "09",
    category: "Visual Content",
    client: "Selam Airlines",
    title: "3D Fleet & Route Visualisations",
    description: "Product renders of aircraft livery concepts and animated route maps for a regional airline's investor presentation and marketing materials.",
    tags: ["3D", "Aviation", "Presentation"],
    gradient: "linear-gradient(155deg, #04060e 0%, #0a1840 40%, #1838a0 80%, #4070d8 100%)",
    year: "2023",
  },
];

const CATEGORIES: Category[] = ["All", "Branding", "Web & Digital", "Visual Content", "Architecture"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isFeatured = index === 0;

  return (
    <article className="group cursor-pointer">
      {/* Thumbnail */}
      <div
        className={[
          "relative overflow-hidden rounded-2xl mb-5",
          isFeatured ? "h-[420px] sm:h-[520px]" : "h-[260px] sm:h-[300px]",
        ].join(" ")}
        style={{ background: project.gradient }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
        />

        {/* Top row */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <span className="text-white/40 text-xs font-mono tabular-nums">{project.year}</span>
          <span className="bg-white/10 backdrop-blur-sm border border-white/15 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        {/* Bottom row */}
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

        {/* Hover shine */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)" }}
        />
      </div>

      {/* Caption */}
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
    </article>
  );
}

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-0">
          <FadeUp>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">Our Work</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-12 border-b border-white/[0.07]">
              <h1
                className="text-5xl sm:text-7xl font-black text-white leading-none tracking-tight"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                Work that<br />
                <span style={{ color: "#6dcc46" }}>speaks.</span>
              </h1>
              <p className="text-white/40 text-sm max-w-[260px] leading-relaxed sm:text-right">
                {PROJECTS.length} projects completed by vetted designers in our network for Ethiopian and international clients.
              </p>
            </div>
          </FadeUp>

          {/* Category filter — lives inside header */}
          <FadeUp delay={0.1}>
            <div className="flex items-center gap-1 overflow-x-auto py-4 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const count = cat === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length;
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
                    <span
                      className="text-[10px] tabular-nums"
                      style={{ opacity: isActive ? 0.6 : 0.4 }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── Projects ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">

        {filtered.length === 0 && (
          <p className="text-zinc-400 text-sm text-center py-20">No projects in this category yet.</p>
        )}

        {featured && (
          <FadeUp className="mb-10 sm:mb-14">
            <ProjectCard project={featured} index={0} />
          </FadeUp>
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

      {/* ── CTA ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#6dcc46] mb-3">Ready to start?</p>
            <h2
              className="font-black text-white text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Want work like this<br />for your business?
            </h2>
            <p className="text-white/40 text-sm mt-3">Submit a brief — free to start, matched within 48 hours.</p>
          </div>
          <Link
            href="/get-started/client"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold transition-colors"
            style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
          >
            Submit a Brief
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>

    </div>
  );
}
