"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const GAP = 20;
const PEEK = 48;

const cards = [
  {
    slug: "branding",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "Branding & Graphic Design",
    body: "Logos, identity systems, packaging, marketing collateral, presentations, and campaign assets that make your brand unmistakable.",
    tags: ["Brand Identity", "Logo Design", "Packaging", "Print"],
    bg: "bg-white",
    border: "border border-zinc-200",
    iconBg: "bg-zinc-100",
    iconColor: "text-zinc-600",
    tagBg: "bg-zinc-200 text-zinc-700",
    linkColor: "text-[#0d2318] hover:text-[#6dcc46]",
    titleColor: "text-zinc-900",
    bodyColor: "text-zinc-500",
  },
  {
    slug: "web",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    title: "Web & Digital",
    body: "WordPress sites, landing pages, UI/UX design, web app interfaces, and digital product design built to convert and perform.",
    tags: ["UI/UX Design", "WordPress", "Landing Pages", "Design Systems"],
    bg: "bg-[#6dcc46]",
    border: "",
    iconBg: "bg-[#0d2318]/15",
    iconColor: "text-[#0d2318]",
    tagBg: "bg-[#0d2318]/10 text-[#0d2318]",
    linkColor: "text-[#0d2318] hover:text-[#0d2318]/70",
    titleColor: "text-[#0d2318]",
    bodyColor: "text-[#0d2318]/70",
  },
  {
    slug: "visual",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
    title: "Visual Content",
    body: "3D visualisation, product rendering, motion graphics, video editing, and explainer content that brings your message to life.",
    tags: ["3D Rendering", "Motion Graphics", "Video Editing", "Animation"],
    bg: "bg-[#0d2318]",
    border: "",
    iconBg: "bg-white/10",
    iconColor: "text-[#6dcc46]",
    tagBg: "bg-white/10 text-white/70",
    linkColor: "text-white hover:text-[#6dcc46]",
    titleColor: "text-white",
    bodyColor: "text-white/55",
  },
  {
    slug: "architecture",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Architecture & Viz",
    body: "Architectural visualisation, CAD drawings, BIM models, floor plans, and photorealistic renders that bring spaces to life before a single brick is laid.",
    tags: ["Arch Viz", "CAD / BIM", "Floor Plans", "3D Renders"],
    bg: "bg-[#151515]",
    border: "",
    iconBg: "bg-[#6dcc46]/15",
    iconColor: "text-[#6dcc46]",
    tagBg: "bg-white/10 text-white/60",
    linkColor: "text-[#6dcc46] hover:text-white",
    titleColor: "text-white",
    bodyColor: "text-white/55",
  },
];

type Dims = { cardWidth: number; maxIndex: number; containerWidth: number };

function computeDims(el: HTMLDivElement, total: number): Dims {
  const w = el.offsetWidth;
  let visible = 1;
  if (w >= 1024) visible = 3;
  else if (w >= 640) visible = 2;
  const cardWidth = Math.max(180, Math.floor((w - visible * GAP - PEEK) / visible));
  return { cardWidth, maxIndex: Math.max(0, total - visible), containerWidth: w };
}

export default function ServicesCarousel() {
  const [current, setCurrent] = useState(0);
  const [dims, setDims] = useState<Dims | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchX = useRef(0);
  const N = cards.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const d = computeDims(el, N);
      setDims(d);
      setCurrent((c) => Math.min(c, d.maxIndex));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [N]);

  const maxIndex = dims?.maxIndex ?? N - 1;

  function getTranslateX(idx: number): number {
    if (!dims) return 0;
    const { cardWidth, maxIndex: mi, containerWidth } = dims;
    if (idx >= mi) {
      const trackW = N * cardWidth + (N - 1) * GAP;
      return -(Math.max(0, trackW - containerWidth));
    }
    return -(idx * (cardWidth + GAP));
  }

  const translateX = getTranslateX(current);

  return (
    <div>
      {/* Track */}
      <div
        ref={containerRef}
        className="overflow-hidden"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const d = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(d) > 40) {
            if (d > 0) setCurrent((i) => Math.min(maxIndex, i + 1));
            else setCurrent((i) => Math.max(0, i - 1));
          }
        }}
      >
        <div
          className="flex"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(${translateX}px)`,
            transition: dims ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className={[
                "shrink-0 rounded-3xl p-8 flex flex-col min-h-[390px]",
                card.bg,
                card.border,
                !dims ? "w-[82%] sm:w-[44%] lg:w-[31%]" : "",
              ].filter(Boolean).join(" ")}
              style={dims ? { width: `${dims.cardWidth}px` } : undefined}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${card.iconBg} ${card.iconColor}`}>
                {card.icon}
              </div>
              <h3 className={`font-extrabold text-lg leading-tight mb-3 ${card.titleColor}`}>
                {card.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-6 flex-1 ${card.bodyColor}`}>
                {card.body}
              </p>
              <div className="grid grid-cols-2 gap-1.5 mb-7">
                {card.tags.map((tag) => (
                  <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-medium text-center truncate ${card.tagBg}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/get-started/client?service=${card.slug}`}
                className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors ${card.linkColor}`}
              >
                Explore More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Controls: arrows left, progress dots right */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrent((i) => Math.max(0, i - 1))}
            disabled={current === 0}
            aria-label="Previous service"
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              current === 0
                ? "border-zinc-200 text-zinc-300 cursor-not-allowed"
                : "border-[#0d2318] text-[#0d2318] hover:bg-[#0d2318] hover:text-white"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <button
            onClick={() => setCurrent((i) => Math.min(maxIndex, i + 1))}
            disabled={current === maxIndex}
            aria-label="Next service"
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              current === maxIndex
                ? "border-zinc-200 text-zinc-300 cursor-not-allowed"
                : "border-[#0d2318] text-[#0d2318] hover:bg-[#0d2318] hover:text-white"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to position ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-7 h-2.5 bg-[#0d2318]"
                  : "w-2.5 h-2.5 bg-zinc-400 hover:bg-zinc-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
