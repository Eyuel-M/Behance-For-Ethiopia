"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Pricing = "free" | "freemium" | "paid";

type Resource = {
  name: string;
  description: string;
  url: string;
  pricing: Pricing;
  category: string;
  hot?: boolean;
};

const resources: Resource[] = [
  // ── Mockups
  { name: "Mockup World", description: "The largest free mockup library — devices, packaging, apparel, print and more.", url: "https://www.mockupworld.co", pricing: "free", category: "Mockups", hot: true },
  { name: "Placeit", description: "Browser-based mockup generator with thousands of lifestyle and device templates.", url: "https://placeit.net", pricing: "freemium", category: "Mockups" },
  { name: "Smartmockups", description: "Create professional product mockups in seconds without Photoshop.", url: "https://smartmockups.com", pricing: "freemium", category: "Mockups" },
  { name: "Mockuphone", description: "Wrap app screenshots in device frames for instant polished presentations.", url: "https://mockuphone.com", pricing: "free", category: "Mockups" },
  { name: "Free Mockup Zone", description: "Curated free PSD mockup templates across all categories.", url: "https://freemockupzone.com", pricing: "free", category: "Mockups" },
  { name: "The Mockup Club", description: "Premium curated mockup collection — packaging, branding & lifestyle.", url: "https://themockup.club", pricing: "paid", category: "Mockups" },
  { name: "Mockup Hunt", description: "Community-driven archive of free and premium mockups.", url: "https://mockuphunt.co", pricing: "free", category: "Mockups" },

  // ── 3D Assets
  { name: "Poly Haven", description: "100% free CC0 3D models, HDRIs, and PBR textures for any project.", url: "https://polyhaven.com", pricing: "free", category: "3D Assets", hot: true },
  { name: "Sketchfab", description: "The world's largest platform to publish and discover 3D content.", url: "https://sketchfab.com", pricing: "freemium", category: "3D Assets" },
  { name: "BlenderKit", description: "Blender-native asset library with models, materials and HDRIs.", url: "https://www.blenderkit.com", pricing: "freemium", category: "3D Assets" },
  { name: "CGTrader", description: "Professional 3D model marketplace with thousands of free models.", url: "https://www.cgtrader.com", pricing: "freemium", category: "3D Assets" },
  { name: "TurboSquid", description: "Industry-standard 3D marketplace trusted by studios worldwide.", url: "https://www.turbosquid.com", pricing: "freemium", category: "3D Assets" },
  { name: "Spline", description: "Browser-based 3D design tool — create interactive 3D scenes easily.", url: "https://spline.design", pricing: "freemium", category: "3D Assets", hot: true },
  { name: "Quixel Megascans", description: "Film-quality photorealistic 3D assets. Free with Unreal Engine.", url: "https://quixel.com/megascans", pricing: "free", category: "3D Assets" },

  // ── UI Kits
  { name: "Figma Community", description: "The official hub for Figma UI kits, templates, plugins and inspiration.", url: "https://www.figma.com/community", pricing: "free", category: "UI Kits", hot: true },
  { name: "UI8", description: "Premium marketplace for UI kits, dashboards and design systems.", url: "https://ui8.net", pricing: "paid", category: "UI Kits" },
  { name: "Mobbin", description: "Real-world mobile and web UI pattern library from top products.", url: "https://mobbin.com", pricing: "freemium", category: "UI Kits" },
  { name: "Framer Templates", description: "Ready-to-use interactive website templates built in Framer.", url: "https://www.framer.com/templates", pricing: "freemium", category: "UI Kits" },
  { name: "Creative Tim", description: "Bootstrap and Tailwind UI kits and admin templates.", url: "https://www.creative-tim.com", pricing: "freemium", category: "UI Kits" },
  { name: "Sketch App Sources", description: "Community-shared Sketch files, UI kits and resources.", url: "https://www.sketchappsources.com", pricing: "free", category: "UI Kits" },

  // ── Icons
  { name: "Heroicons", description: "Hand-crafted SVG icons by the Tailwind CSS team. Outline & solid.", url: "https://heroicons.com", pricing: "free", category: "Icons", hot: true },
  { name: "Phosphor Icons", description: "Flexible icon family with 6 weights and 1000+ icons.", url: "https://phosphoricons.com", pricing: "free", category: "Icons" },
  { name: "Lucide", description: "Beautiful, consistent open-source icons — fork of Feather Icons.", url: "https://lucide.dev", pricing: "free", category: "Icons" },
  { name: "Iconify", description: "All icon sets — 200,000+ icons — in one unified framework.", url: "https://iconify.design", pricing: "free", category: "Icons" },
  { name: "Tabler Icons", description: "3800+ pixel-perfect stroke icons in SVG, PNG and more.", url: "https://tabler-icons.io", pricing: "free", category: "Icons" },
  { name: "Flaticon", description: "World's largest icon database with 15M+ free and premium icons.", url: "https://www.flaticon.com", pricing: "freemium", category: "Icons" },
  { name: "Iconscout", description: "Icons, illustrations, 3D assets and Lottie animations in one place.", url: "https://iconscout.com", pricing: "freemium", category: "Icons" },

  // ── Fonts
  { name: "Google Fonts", description: "1500+ open-source font families, optimized for the web.", url: "https://fonts.google.com", pricing: "free", category: "Fonts", hot: true },
  { name: "Font Squirrel", description: "High-quality, hand-selected fonts free for commercial use.", url: "https://www.fontsquirrel.com", pricing: "free", category: "Fonts" },
  { name: "Fontshare", description: "Quality fonts by the Indian Type Foundry. Beautifully free.", url: "https://www.fontshare.com", pricing: "free", category: "Fonts", hot: true },
  { name: "DaFont", description: "Large archive of freely downloadable fonts across all styles.", url: "https://www.dafont.com", pricing: "free", category: "Fonts" },
  { name: "Uncut.wtf", description: "Curated selection of high-quality free and open-source fonts.", url: "https://uncut.wtf", pricing: "free", category: "Fonts" },
  { name: "Befonts", description: "Free handcrafted fonts for creative designers.", url: "https://befonts.com", pricing: "free", category: "Fonts" },
  { name: "Adobe Fonts", description: "Premium font subscription with 20,000+ fonts via Creative Cloud.", url: "https://fonts.adobe.com", pricing: "paid", category: "Fonts" },

  // ── Textures & Patterns
  { name: "Poly Haven Textures", description: "Free CC0 PBR texture maps — albedo, normal, roughness, AO.", url: "https://polyhaven.com/textures", pricing: "free", category: "Textures", hot: true },
  { name: "Subtle Patterns", description: "Free tileable CSS/PNG background patterns for web projects.", url: "https://www.toptal.com/designers/subtlepatterns", pricing: "free", category: "Textures" },
  { name: "Hero Patterns", description: "Customizable repeatable SVG background patterns.", url: "https://heropatterns.com", pricing: "free", category: "Textures" },
  { name: "Grainy Gradient", description: "Generate beautiful noise-grain gradients for trendy backgrounds.", url: "https://grainy-gradients.vercel.app", pricing: "free", category: "Textures" },
  { name: "patternpad", description: "Create seamless custom patterns with a visual editor.", url: "https://patternpad.com", pricing: "free", category: "Textures" },
  { name: "TextureLabs", description: "Free creative textures for graphic and web design projects.", url: "https://texturelabs.org", pricing: "free", category: "Textures" },

  // ── Stock Media
  { name: "Unsplash", description: "The internet's source of freely usable high-resolution photography.", url: "https://unsplash.com", pricing: "free", category: "Stock Media", hot: true },
  { name: "Pexels", description: "Free stock photos and videos — curated by talented creators.", url: "https://www.pexels.com", pricing: "free", category: "Stock Media" },
  { name: "Mixkit", description: "Free stock video clips, music and sound effects for any project.", url: "https://mixkit.co", pricing: "free", category: "Stock Media" },
  { name: "Pixabay", description: "Over 4 million free images, videos, vectors and audio clips.", url: "https://pixabay.com", pricing: "free", category: "Stock Media" },
  { name: "Burst by Shopify", description: "Free stock photos focused on entrepreneurship and business.", url: "https://burst.shopify.com", pricing: "free", category: "Stock Media" },
  { name: "Coverr", description: "Beautiful, free stock video clips — no attribution required.", url: "https://coverr.co", pricing: "free", category: "Stock Media" },

  // ── Design Tools
  { name: "Figma", description: "The industry-standard collaborative UI/UX design tool. Free plan available.", url: "https://figma.com", pricing: "freemium", category: "Design Tools", hot: true },
  { name: "Canva", description: "Accessible graphic design platform for non-designers and designers alike.", url: "https://www.canva.com", pricing: "freemium", category: "Design Tools" },
  { name: "Penpot", description: "Open-source, cross-platform design tool — a free Figma alternative.", url: "https://penpot.app", pricing: "free", category: "Design Tools" },
  { name: "Framer", description: "Design and publish responsive websites with code-based interactions.", url: "https://www.framer.com", pricing: "freemium", category: "Design Tools" },
  { name: "Affinity Suite", description: "One-time purchase alternatives to Photoshop, Illustrator & InDesign.", url: "https://affinity.serif.com", pricing: "paid", category: "Design Tools" },
  { name: "Adobe Creative Cloud", description: "Industry-standard suite: Photoshop, Illustrator, InDesign & more.", url: "https://www.adobe.com/creativecloud", pricing: "paid", category: "Design Tools" },
  { name: "Vectornator / Linearity", description: "Intuitive vector design for iPad, iPhone and Mac.", url: "https://www.linearity.io", pricing: "freemium", category: "Design Tools" },
];

const categories = ["All", "Mockups", "3D Assets", "UI Kits", "Icons", "Fonts", "Textures", "Stock Media", "Design Tools"];

const pricingBadge: Record<Pricing, { label: string; classes: string }> = {
  free:     { label: "Free",     classes: "bg-green-50 text-green-700 border border-green-100" },
  freemium: { label: "Freemium", classes: "bg-amber-50 text-amber-700 border border-amber-100" },
  paid:     { label: "Paid",     classes: "bg-zinc-100 text-zinc-600 border border-zinc-200" },
};

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M12 2c0 0-5 5.5-5 10a5 5 0 0 0 10 0c0-4.5-5-10-5-10Zm0 14a3 3 0 0 1-3-3c0-2.5 1.5-4.5 3-6.5 1.5 2 3 4 3 6.5a3 3 0 0 1-3 3Z" />
    </svg>
  );
}

export default function DigitalAssetsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePricing, setActivePricing] = useState<"all" | Pricing>("all");

  const filtered = resources.filter((r) => {
    const catMatch = activeCategory === "All" || r.category === activeCategory;
    const priceMatch = activePricing === "all" || r.pricing === activePricing;
    return catMatch && priceMatch;
  });

  const grouped: Record<string, Resource[]> = {};
  filtered.forEach((r) => {
    if (!grouped[r.category]) grouped[r.category] = [];
    grouped[r.category].push(r);
  });

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Hero */}
      <div className="bg-zinc-950 border-b border-zinc-800 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/resources" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-sm transition-colors duration-150 cursor-pointer mb-8">
            <ArrowLeftIcon /> All Resources
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-green-400 mb-3">Digital Assets</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">The Designer&apos;s Toolkit</h1>
              <p className="mt-3 text-zinc-400 text-base max-w-xl leading-relaxed">
                {resources.length}+ curated resources across mockups, 3D assets, icons, fonts, UI kits and more.
                Filtered to save you hours of searching.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              {(["all", "free", "freemium", "paid"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePricing(p)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-150 cursor-pointer border ${
                    activePricing === p
                      ? "bg-white text-zinc-900 border-white"
                      : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  {p === "all" ? "All pricing" : p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-[4.5rem] z-30 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer shrink-0 ${
                  activeCategory === cat
                    ? "bg-green-500 text-black"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} aria-labelledby={`cat-${category}`}>
            <div className="flex items-center gap-3 mb-5">
              <h2 id={`cat-${category}`} className="text-lg font-extrabold text-white">{category}</h2>
              <span className="text-xs text-zinc-500 tabular-nums">{items.length} resources</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {items.map((r) => {
                const badge = pricingBadge[r.pricing];
                return (
                  <a
                    key={r.name}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800/80 transition-all duration-150 cursor-pointer p-4 gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors duration-150">
                          {r.name}
                        </p>
                        {r.hot && (
                          <span className="flex items-center gap-0.5 text-orange-400 text-xs font-semibold">
                            <FireIcon /> Hot
                          </span>
                        )}
                      </div>
                      <span className="text-zinc-600 group-hover:text-zinc-300 shrink-0 mt-0.5 transition-colors duration-150">
                        <ExternalLinkIcon />
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed flex-1">{r.description}</p>
                    <span className={`self-start px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.classes}`}>
                      {badge.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-zinc-500">No resources match this filter combination.</p>
            <button
              onClick={() => { setActiveCategory("All"); setActivePricing("all"); }}
              className="mt-3 text-sm text-green-400 hover:text-green-300 cursor-pointer transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
