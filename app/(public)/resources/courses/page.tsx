import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Level = "Beginner" | "Intermediate" | "Advanced" | "All Levels";
type Pricing = "Free" | "Paid" | "Freemium";

type Course = {
  name: string;
  provider: string;
  description: string;
  url: string;
  level: Level;
  pricing: Pricing;
  duration?: string;
  highlight?: string;
};

type Discipline = {
  id: string;
  label: string;
  color: string;
  lightColor: string;
  icon: string;
  courses: Course[];
};

const disciplines: Discipline[] = [
  {
    id: "uiux",
    label: "UI / UX Design",
    color: "bg-blue-500",
    lightColor: "bg-blue-50 text-blue-700",
    icon: "▣",
    courses: [
      { name: "Google UX Design Certificate", provider: "Coursera", description: "The gold standard entry point. 7-course professional certificate designed by Google. Covers the full UX process from research to prototype to hand-off.", url: "https://coursera.org/professional-certificates/google-ux-design", level: "Beginner", pricing: "Paid", duration: "6 months", highlight: "Industry certificate" },
      { name: "Interaction Design Foundation", provider: "IDF", description: "World-class UX courses taught by leading practitioners. Covers information architecture, usability testing, visual design, and UX management.", url: "https://www.interaction-design.org", level: "All Levels", pricing: "Paid", duration: "Self-paced", highlight: "Best for depth" },
      { name: "Design+Code", provider: "Design+Code", description: "Learn to design in Figma and build interactive prototypes — bridges design and frontend development.", url: "https://designcode.io", level: "Intermediate", pricing: "Paid", duration: "Self-paced" },
      { name: "UX Design Institute", provider: "UXDI", description: "Professional Diploma in UX Design — structured, mentored programme with a portfolio project.", url: "https://www.uxdesigninstitute.com", level: "Beginner", pricing: "Paid", duration: "9 months", highlight: "Diploma awarded" },
      { name: "Shift Nudge", provider: "Shift Nudge", description: "Focused on the visual craft of UI design — spacing, colour, hierarchy, components. Highly respected in the industry.", url: "https://shiftnudge.com", level: "Intermediate", pricing: "Paid" },
      { name: "DesignCourse (Free)", provider: "Gary Simon / YouTube", description: "Hundreds of free UI/UX tutorials on YouTube — Figma walkthroughs, CSS, design fundamentals.", url: "https://youtube.com/@DesignCourse", level: "Beginner", pricing: "Free", highlight: "Completely free" },
    ],
  },
  {
    id: "brand",
    label: "Brand Identity",
    color: "bg-pink-500",
    lightColor: "bg-pink-50 text-pink-700",
    icon: "◈",
    courses: [
      { name: "The Futur Academy", provider: "The Futur / Chris Do", description: "Chris Do's comprehensive brand strategy and design business masterclasses. Covers positioning, pricing, client work, and the art of brand narrative.", url: "https://thefutur.com", level: "All Levels", pricing: "Freemium", highlight: "YouTube free content" },
      { name: "Logo Design Masterclass", provider: "Domestika", description: "In-depth courses on logo design, brand identity systems, and visual language. Taught by award-winning designers.", url: "https://www.domestika.org", level: "Intermediate", pricing: "Paid", duration: "Self-paced" },
      { name: "Skillshare Brand Design", provider: "Skillshare", description: "Collection of brand identity courses covering logomarks, colour systems, type pairings, and brand books.", url: "https://www.skillshare.com", level: "All Levels", pricing: "Paid" },
      { name: "Future London Academy", provider: "Future London Academy", description: "Intensive brand strategy and design thinking workshops led by senior practitioners.", url: "https://futurelondonacademy.co.uk", level: "Advanced", pricing: "Paid", highlight: "Workshop-based" },
      { name: "Flux Academy", provider: "Ran Segall / YouTube", description: "Free YouTube channel covering freelance brand design, Webflow, and building a design business.", url: "https://youtube.com/@FluxAcademy", level: "Intermediate", pricing: "Free" },
    ],
  },
  {
    id: "motion",
    label: "Motion Graphics",
    color: "bg-purple-500",
    lightColor: "bg-purple-50 text-purple-700",
    icon: "▶",
    courses: [
      { name: "School of Motion", provider: "School of Motion", description: "The premier motion design school. Courses on After Effects, Cinema 4D, and motion fundamentals taught by industry professionals.", url: "https://schoolofmotion.com", level: "All Levels", pricing: "Paid", highlight: "Industry gold standard" },
      { name: "Motion Design School", provider: "Motion Design School", description: "Advanced training in After Effects, Cinema 4D, Houdini, and motion theory.", url: "https://motiondesign.school", level: "Intermediate", pricing: "Paid" },
      { name: "Eyedesyn (Free)", provider: "EJ Hassenfratz / YouTube", description: "Free Cinema 4D and motion graphics tutorials — excellent for learning C4D fundamentals.", url: "https://youtube.com/@eyedesyn", level: "Beginner", pricing: "Free" },
      { name: "MotionArray", provider: "MotionArray", description: "Motion graphics templates, tutorials, and learning resources for After Effects and Premiere Pro.", url: "https://motionarray.com", level: "All Levels", pricing: "Freemium" },
      { name: "Kurzgesagt Team", provider: "YouTube / Free", description: "Study how the world's best explainer animation studio builds visual narratives.", url: "https://www.youtube.com/@kurzgesagt", level: "Advanced", pricing: "Free", highlight: "Inspiration" },
    ],
  },
  {
    id: "typography",
    label: "Typography",
    color: "bg-amber-500",
    lightColor: "bg-amber-50 text-amber-700",
    icon: "T",
    courses: [
      { name: "Practical Typography", provider: "Matthew Butterick", description: "The definitive online book on typography — clear rules, elegant examples, real-world application. An essential read for every designer.", url: "https://practicaltypography.com", level: "All Levels", pricing: "Paid", highlight: "Essential reading" },
      { name: "Typewolf", provider: "Typewolf", description: "Daily font inspiration, real-world type pairings, and guides to using type effectively on the web.", url: "https://www.typewolf.com", level: "All Levels", pricing: "Free" },
      { name: "I Love Typography", provider: "ILT", description: "Long-running editorial site dedicated to type culture, foundry spotlights, and typographic craft.", url: "https://ilovetypography.com", level: "All Levels", pricing: "Free" },
      { name: "Fonts In Use", provider: "Fonts In Use", description: "Archive of typography in real-world use — identify typefaces from posters, books, screens and more.", url: "https://fontsinuse.com", level: "All Levels", pricing: "Free" },
      { name: "Kern Type", provider: "Web game", description: "The free kerning game that sharpens your spacing eye — challenging, addictive, educational.", url: "https://type.method.ac", level: "Beginner", pricing: "Free", highlight: "Fun game" },
    ],
  },
  {
    id: "3d",
    label: "3D & Visualisation",
    color: "bg-teal-500",
    lightColor: "bg-teal-50 text-teal-700",
    icon: "◆",
    courses: [
      { name: "Blender Guru", provider: "Andrew Price / YouTube", description: "The most popular free Blender tutorial channel. Start with the famous Donut tutorial — comprehensive, beginner-friendly.", url: "https://youtube.com/@blenderguru", level: "Beginner", pricing: "Free", highlight: "Best starting point" },
      { name: "CG Cookie", provider: "CG Cookie", description: "Structured, comprehensive Blender courses with project files and mentorship. Highly organised curriculum.", url: "https://cgcookie.com", level: "All Levels", pricing: "Paid" },
      { name: "Greyscale Gorilla", provider: "GSG", description: "Cinema 4D mastery — lighting, rendering, and animation for motion designers.", url: "https://greyscalegorilla.com", level: "Intermediate", pricing: "Paid" },
      { name: "Spline Tutorials", provider: "Spline", description: "Official tutorials for Spline — the browser-based 3D tool that is rapidly becoming a designer staple.", url: "https://spline.design/learn", level: "Beginner", pricing: "Free" },
    ],
  },
  {
    id: "freelance",
    label: "Freelancing & Business",
    color: "bg-green-500",
    lightColor: "bg-green-50 text-green-700",
    icon: "◎",
    courses: [
      { name: "The Futur (Free YouTube)", provider: "Chris Do", description: "Hundreds of free videos on pricing, client communication, contracts, positioning, and building a sustainable design business.", url: "https://youtube.com/@thefutur", level: "All Levels", pricing: "Free", highlight: "100% free" },
      { name: "ADPList Mentorship", provider: "ADPList", description: "Free 1-on-1 mentorship sessions with senior designers, career coaches, and design leaders worldwide.", url: "https://adplist.org", level: "All Levels", pricing: "Free", highlight: "Free mentorship" },
      { name: "Awwwards Academy", provider: "Awwwards", description: "Masterclasses on web design, Webflow, and portfolio-building from award-winning studios.", url: "https://www.awwwards.com/academy", level: "Intermediate", pricing: "Paid" },
      { name: "Design MBA", provider: "Various", description: "Business of design resources — contracts, proposals, rate-setting, and studio management for freelancers.", url: "https://thefutur.com/resources", level: "All Levels", pricing: "Freemium" },
      { name: "Contra", provider: "Contra", description: "Commission-free freelance platform that also has guides and resources for building your freelance career.", url: "https://contra.com", level: "All Levels", pricing: "Free" },
    ],
  },
];

function ArrowLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const levelColor: Record<Level, string> = {
  "Beginner":     "bg-green-50 text-green-700",
  "Intermediate": "bg-blue-50 text-blue-700",
  "Advanced":     "bg-purple-50 text-purple-700",
  "All Levels":   "bg-zinc-100 text-zinc-600",
};

const pricingColor: Record<Pricing, string> = {
  "Free":     "text-green-600 font-semibold",
  "Freemium": "text-amber-600 font-semibold",
  "Paid":     "text-zinc-500",
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-white border-b border-zinc-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <Link href="/resources" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-700 text-sm transition-colors duration-150 cursor-pointer mb-8">
            <ArrowLeftIcon /> All Resources
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Courses & Learning</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">Level up your craft</h1>
          <p className="text-zinc-500 text-base max-w-xl leading-relaxed">
            The platforms and courses that actually make a difference — curated from recommendations
            by working designers, not algorithmic lists.
          </p>

          {/* Jump links */}
          <div className="flex flex-wrap gap-2 mt-8">
            {disciplines.map((d) => (
              <a
                key={d.id}
                href={`#${d.id}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors duration-150 cursor-pointer"
              >
                {d.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Disciplines */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {disciplines.map((d) => (
          <section key={d.id} id={d.id} aria-labelledby={`heading-${d.id}`}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
              <span className={`w-8 h-8 rounded-xl ${d.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                {d.icon}
              </span>
              <h2 id={`heading-${d.id}`} className="text-xl font-extrabold text-zinc-900">{d.label}</h2>
              <span className="text-xs text-zinc-400 tabular-nums">{d.courses.length} picks</span>
            </div>

            {/* Course cards */}
            <div className="space-y-3">
              {d.courses.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-start gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-150 cursor-pointer p-5"
                >
                  {/* Left accent bar */}
                  <div className={`hidden sm:block w-1 self-stretch rounded-full ${d.color} shrink-0`} />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 mb-1">
                      <p className="text-sm font-bold text-zinc-900 group-hover:text-zinc-700">{c.name}</p>
                      {c.highlight && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${d.lightColor}`}>
                          {c.highlight}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-zinc-400 mb-2">{c.provider}{c.duration ? ` · ${c.duration}` : ""}</p>
                    <p className="text-sm text-zinc-500 leading-relaxed">{c.description}</p>
                  </div>

                  {/* Right meta */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs ${levelColor[c.level]}`}>{c.level}</span>
                    <span className={`text-xs ${pricingColor[c.pricing]}`}>{c.pricing}</span>
                    <span className="text-zinc-300 group-hover:text-zinc-500 transition-colors sm:mt-auto">
                      <ExternalLinkIcon />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
