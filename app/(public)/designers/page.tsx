import Link from "next/link";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";

const DESIGNERS = [
  {
    initials: "AM",
    name: "Alem Mekonnen",
    specialty: "Brand Identity & Packaging",
    location: "Addis Ababa",
    years: 8,
    skills: ["Logo Design", "Packaging", "Brand Strategy", "Print"],
    bio: "Led brand projects for 40+ Ethiopian companies. Previously creative director at an Addis agency with international clients across the Horn.",
    rating: 4.9,
    projects: 34,
    color: "#6dcc46",
    bg: "#0d2318",
  },
  {
    initials: "BT",
    name: "Bethlehem Tadesse",
    specialty: "UI/UX & Product Design",
    location: "Addis Ababa",
    years: 5,
    skills: ["Figma", "Design Systems", "User Research", "Mobile UI"],
    bio: "Specialises in fintech and SaaS interfaces. Designed products used by over 200,000 users across East Africa. Fluent in Amharic, English, and French.",
    rating: 5.0,
    projects: 19,
    color: "#fff",
    bg: "#151515",
  },
  {
    initials: "YG",
    name: "Yonas Girma",
    specialty: "Architecture Visualisation",
    location: "Addis Ababa",
    years: 6,
    skills: ["3ds Max", "V-Ray", "AutoCAD", "BIM", "Lumion"],
    bio: "Photorealistic architectural renders for residential, commercial, and urban development projects. Work has been used in investor pitches and city planning proposals.",
    rating: 4.8,
    projects: 28,
    color: "#6dcc46",
    bg: "#071208",
  },
  {
    initials: "HW",
    name: "Hana Wolde",
    specialty: "Motion & Video",
    location: "Addis Ababa",
    years: 4,
    skills: ["After Effects", "Premiere Pro", "3D Animation", "Explainer Video"],
    bio: "Creates motion graphics, animated brand assets, and video content for startups and enterprises. Produced campaigns seen by audiences of 2M+.",
    rating: 4.9,
    projects: 22,
    color: "#0d2318",
    bg: "#6dcc46",
  },
  {
    initials: "DM",
    name: "Dawit Mulugeta",
    specialty: "Web Design & WordPress",
    location: "Addis Ababa",
    years: 7,
    skills: ["WordPress", "Elementor", "Figma", "Webflow", "SEO"],
    bio: "Builds conversion-focused websites for Ethiopian businesses going online for the first time. Over 60 sites launched, zero missed deadlines.",
    rating: 4.8,
    projects: 61,
    color: "#fff",
    bg: "#1a1a2e",
  },
  {
    initials: "SK",
    name: "Sara Kebede",
    specialty: "Illustration & Editorial",
    location: "Addis Ababa",
    years: 5,
    skills: ["Illustration", "Editorial Design", "Infographics", "Children's Books"],
    bio: "Original illustration style rooted in Ethiopian visual culture. Clients include NGOs, publishers, and international brands entering the Ethiopian market.",
    rating: 5.0,
    projects: 17,
    color: "#fff",
    bg: "#3d1a4a",
  },
  {
    initials: "MA",
    name: "Mikael Abebe",
    specialty: "Product Rendering & 3D",
    location: "Addis Ababa",
    years: 6,
    skills: ["Cinema 4D", "Blender", "KeyShot", "Product Viz"],
    bio: "Photorealistic product renders for manufacturing, retail, and e-commerce clients. Works with physical product companies from concept through to launch visuals.",
    rating: 4.7,
    projects: 31,
    color: "#6dcc46",
    bg: "#0a1a0a",
  },
  {
    initials: "FT",
    name: "Feven Tesfaye",
    specialty: "Social Media & Digital Marketing",
    location: "Addis Ababa",
    years: 3,
    skills: ["Social Media Design", "Canva Pro", "Photoshop", "Campaign Assets"],
    bio: "Creates consistent, high-performing social media visual systems for brands. Managed the digital creative output for 15+ Ethiopian brands simultaneously.",
    rating: 4.9,
    projects: 45,
    color: "#0d2318",
    bg: "#f5e6c8",
  },
];

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#6dcc46" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
      <span className="text-xs font-bold text-zinc-700">{value.toFixed(1)}</span>
    </span>
  );
}

export default function DesignersPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <FadeUp>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dcc46]" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">The Network</p>
            </div>
            <h1
              className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight mb-5"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Meet some of<br />
              <span style={{ color: "#6dcc46" }}>our designers.</span>
            </h1>
            <p className="text-white/50 text-base max-w-md leading-relaxed">
              Every designer here passed a manual vetting process. Real portfolios, real reliability, real results.
            </p>
          </FadeUp>

          {/* Stats */}
          <FadeUp delay={0.1} className="flex items-center gap-8 mt-10">
            {[
              { value: "50+", label: "Vetted designers" },
              { value: "70%", label: "Applicants rejected" },
              { value: "4.9", label: "Average rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-display), sans-serif" }}>{stat.value}</p>
                <p className="text-xs text-white/35 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {DESIGNERS.map((designer) => (
            <StaggerItem
              key={designer.name}
              className="rounded-2xl border border-zinc-100 bg-white overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col"
            >
              {/* Avatar strip */}
              <div
                className="h-24 flex items-end p-4"
                style={{ backgroundColor: designer.bg }}
              >
                <span
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-sm"
                  style={{ backgroundColor: `${designer.color}20`, color: designer.color, border: `2px solid ${designer.color}30` }}
                >
                  {designer.initials}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-extrabold text-zinc-900 text-sm leading-snug">{designer.name}</h3>
                  <StarRating value={designer.rating} />
                </div>
                <p className="text-xs font-semibold text-[#6dcc46] mb-1">{designer.specialty}</p>
                <p className="text-xs text-zinc-400 mb-3">{designer.location} · {designer.years} yrs exp · {designer.projects} projects</p>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4 flex-1">{designer.bio}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {designer.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-500">
                      {skill}
                    </span>
                  ))}
                  {designer.skills.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-400">
                      +{designer.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      {/* ── Apply CTA ── */}
      <div className="border-t border-zinc-100" style={{ backgroundColor: "#0d2318" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-black text-white text-xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              Are you a designer?
            </h2>
            <p className="text-white/50 text-sm mt-1">Apply to join the network. Free to apply — response within 3–5 days.</p>
          </div>
          <Link
            href="/get-started/designer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors"
            style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}
          >
            Apply to the Network →
          </Link>
        </div>
      </div>

    </div>
  );
}
