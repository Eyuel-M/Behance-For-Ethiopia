"use client";

import Link from "next/link";
import { useState } from "react";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

type Category = "All" | "Branding" | "Web & Digital" | "Visual Content" | "Architecture";

interface Project {
  id: string;
  category: Exclude<Category, "All">;
  client: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    category: "Branding",
    client: "Habesha Premium Coffee",
    title: "Export-Grade Brand Identity",
    description: "Full visual identity for an Addis-based coffee exporter targeting European buyers. Logo, packaging, and brand guidelines.",
    tags: ["Logo", "Packaging", "Guidelines"],
    gradient: "linear-gradient(135deg, #2d1b00 0%, #8b4513 50%, #d4a056 100%)",
    accentColor: "#d4a056",
  },
  {
    id: "2",
    category: "Web & Digital",
    client: "Agar Microfinance",
    title: "Fintech App UI — Amharic-First",
    description: "Mobile app UI for a rural micro-lending platform. Offline-capable, Amharic language support, designed for first-time smartphone users.",
    tags: ["UI/UX", "Mobile", "Amharic"],
    gradient: "linear-gradient(135deg, #071208 0%, #1a3e28 50%, #6dcc46 100%)",
    accentColor: "#6dcc46",
  },
  {
    id: "3",
    category: "Architecture",
    client: "Bole Heights Real Estate",
    title: "Residential Tower Visualisation",
    description: "Photorealistic renders of a 14-storey mixed-use tower in Bole. Interior walkthroughs, exterior day/night renders, and marketing material.",
    tags: ["3D Render", "Arch Viz", "Interior"],
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #6e7bcc 100%)",
    accentColor: "#6e7bcc",
  },
  {
    id: "4",
    category: "Branding",
    client: "Abyssinia Kitchen",
    title: "Restaurant Brand Refresh",
    description: "Updated visual identity for a 3-location Addis restaurant chain. Social media templates, rollup banners, and menu redesign.",
    tags: ["Brand Refresh", "Print", "Social"],
    gradient: "linear-gradient(135deg, #1a0505 0%, #8b1a1a 50%, #e85555 100%)",
    accentColor: "#e85555",
  },
  {
    id: "5",
    category: "Visual Content",
    client: "Ethio-Tech Hub",
    title: "Product Launch Motion Package",
    description: "Animated logo reveal, social media story templates, and an 80-second explainer video for a Addis-based SaaS product launch.",
    tags: ["Motion", "Animation", "Video"],
    gradient: "linear-gradient(135deg, #071208 0%, #0d4a3e 50%, #2dccaa 100%)",
    accentColor: "#2dccaa",
  },
  {
    id: "6",
    category: "Web & Digital",
    client: "Sheba Organic",
    title: "E-commerce & Brand Website",
    description: "Shopify-powered storefront with custom UI for an organic skincare brand. Mobile-first, Amharic/English bilingual, launched in under 3 weeks.",
    tags: ["E-commerce", "Shopify", "Bilingual"],
    gradient: "linear-gradient(135deg, #0d1a08 0%, #2d5a1e 50%, #7ec850 100%)",
    accentColor: "#7ec850",
  },
  {
    id: "7",
    category: "Architecture",
    client: "Addis Urban Design Office",
    title: "Mixed-Use Plaza Concept",
    description: "BIM models and concept renders for a proposed public plaza in the Kazanchis district. Presented to city planners and developers.",
    tags: ["BIM", "Urban Design", "Concept"],
    gradient: "linear-gradient(135deg, #101010 0%, #2a2a2a 50%, #888 100%)",
    accentColor: "#aaa",
  },
  {
    id: "8",
    category: "Branding",
    client: "Genet Textiles",
    title: "Heritage Fashion Brand Identity",
    description: "Identity system for an Ethiopian textile brand blending traditional patterns with contemporary design. Includes swing tags, lookbook, and digital assets.",
    tags: ["Fashion", "Heritage", "Print"],
    gradient: "linear-gradient(135deg, #1a0d00 0%, #5c3010 50%, #c8a060 100%)",
    accentColor: "#c8a060",
  },
  {
    id: "9",
    category: "Visual Content",
    client: "Selam Airlines",
    title: "3D Fleet & Route Visualisations",
    description: "Product renders of aircraft livery concepts and animated route maps for a regional airline's investor presentation and marketing materials.",
    tags: ["3D", "Aviation", "Presentation"],
    gradient: "linear-gradient(135deg, #050a1a 0%, #0d2a5c 50%, #4a80d4 100%)",
    accentColor: "#4a80d4",
  },
];

const CATEGORIES: Category[] = ["All", "Branding", "Web & Digital", "Visual Content", "Architecture"];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-zinc-100 bg-white hover:shadow-lg transition-all duration-300">
      {/* Thumbnail */}
      <div
        className="h-48 relative overflow-hidden"
        style={{ background: project.gradient }}
      >
        <div className="absolute inset-0 flex items-end p-5">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: `${project.accentColor}20`, color: project.accentColor, border: `1px solid ${project.accentColor}30` }}
          >
            {project.category}
          </span>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
          <span className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs text-zinc-400 mb-1">{project.client}</p>
        <h3 className="font-extrabold text-zinc-900 text-sm leading-snug mb-2 group-hover:text-[#0d2318] transition-colors">
          {project.title}
        </h3>
        <p className="text-xs text-zinc-500 leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-zinc-100 text-zinc-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <FadeUp>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">Our Work</p>
            </div>
            <h1
              className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Work that<br />
              <span style={{ color: "#6dcc46" }}>speaks for itself.</span>
            </h1>
            <p className="text-white/50 text-base max-w-md leading-relaxed">
              A selection of projects completed by designers in our network for Ethiopian and international clients.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ── Filter + Grid ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">

        {/* Filter pills */}
        <FadeUp className="mb-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150"
                style={active === cat
                  ? { backgroundColor: "#0d2318", color: "white", borderColor: "#0d2318" }
                  : { backgroundColor: "white", color: "#71717a", borderColor: "#e4e4e7" }
                }
              >
                {cat}
                <span className="ml-1.5 opacity-50">
                  {cat === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Grid */}
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGrid>

      </div>

      {/* ── CTA ── */}
      <div className="border-t border-zinc-100 py-16 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-black text-zinc-900 text-xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              Want work like this for your business?
            </h2>
            <p className="text-zinc-500 text-sm mt-1">Submit a brief — free to start, matched within 48 hours.</p>
          </div>
          <Link
            href="/get-started/client"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors"
            style={{ backgroundColor: "#0d2318", color: "white" }}
          >
            Submit a Brief →
          </Link>
        </div>
      </div>

    </div>
  );
}
