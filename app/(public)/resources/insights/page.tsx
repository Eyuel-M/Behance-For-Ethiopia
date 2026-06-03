import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Source = {
  name: string;
  type: string;
  description: string;
  url: string;
  focus: string[];
  free: boolean;
  featured?: boolean;
};

const publications: Source[] = [
  { name: "Smashing Magazine", type: "Magazine", description: "The most trusted resource for web designers and developers. Deep-dive articles on UX, CSS, accessibility, performance, and design processes.", url: "https://www.smashingmagazine.com", focus: ["Web Design", "UX", "CSS", "Accessibility"], free: true, featured: true },
  { name: "UX Collective", type: "Publication", description: "Medium-based publication dedicated to UX design stories, case studies, and opinion pieces from practitioners worldwide.", url: "https://uxdesign.cc", focus: ["UX Research", "Product Design", "Case Studies"], free: true, featured: true },
  { name: "It's Nice That", type: "Magazine", description: "The creative industry's go-to for culture, inspiration, and profiles of the world's most exciting designers and artists.", url: "https://www.itsnicethat.com", focus: ["Branding", "Illustration", "Culture"], free: true, featured: true },
  { name: "Nielsen Norman Group", type: "Research", description: "Evidence-based UX research and guidelines from the world's leading UX authority. Rigorous, trustworthy, essential.", url: "https://www.nngroup.com", focus: ["UX Research", "Usability", "Accessibility"], free: true },
  { name: "A List Apart", type: "Magazine", description: "Explores the design, development, and meaning of web content — with a strong editorial voice and long-form thinking.", url: "https://alistapart.com", focus: ["Web Design", "Content Strategy", "Frontend"], free: true },
  { name: "Eye on Design", type: "Magazine", description: "AIGA's design publication — in-depth stories on graphic design, typography, and the cultural impact of design.", url: "https://eyeondesign.aiga.org", focus: ["Graphic Design", "Typography", "Culture"], free: true },
  { name: "Muzli Design Inspiration", type: "Curation", description: "AI-curated daily design inspiration aggregated from the best design sources on the web. Browser extension available.", url: "https://muz.li", focus: ["UI Inspiration", "Web", "Branding"], free: true },
  { name: "Creative Bloq", type: "Blog", description: "Practical tips, tutorials, reviews, and news for graphic designers, illustrators, and digital artists.", url: "https://www.creativebloq.com", focus: ["Graphic Design", "Illustration", "Tools"], free: true },
  { name: "Design Week", type: "Magazine", description: "The UK's leading design industry publication covering business, studio news, and design culture.", url: "https://www.designweek.co.uk", focus: ["Industry News", "Branding", "Business"], free: true },
  { name: "Awwwards", type: "Awards & Inspiration", description: "Awards platform recognising the best website design and development worldwide. Curated gallery of cutting-edge web work.", url: "https://www.awwwards.com", focus: ["Web Design", "Interaction", "UI"], free: true },
  { name: "Sidebar.io", type: "Newsletter", description: "Five design links every weekday, curated by Sacha Grief. Consistently high quality, concise, and free.", url: "https://sidebar.io", focus: ["Curation", "Tools", "Articles"], free: true },
  { name: "Dense Discovery", type: "Newsletter", description: "A thoughtful weekly newsletter exploring design, technology, culture and sustainability with editorial depth.", url: "https://www.densediscovery.com", focus: ["Design Culture", "Technology", "Sustainability"], free: true },
];

const channels = [
  { name: "The Futur", handle: "@thefutur", description: "Business of design, branding philosophy, client pricing, and career-building conversations with Chris Do and guests.", url: "https://youtube.com/@thefutur", subscribers: "2M+", focus: ["Brand Strategy", "Business", "Career"] },
  { name: "Flux Academy", handle: "@FluxAcademy", description: "Ran Segall covers freelancing, web design, Webflow development, and running a sustainable design studio.", url: "https://youtube.com/@FluxAcademy", subscribers: "700K+", focus: ["Freelancing", "Web Design", "Webflow"] },
  { name: "DesignCourse", handle: "@DesignCourse", description: "Gary Simon's comprehensive free tutorials on UI design, Figma, CSS and web development for aspiring designers.", url: "https://youtube.com/@DesignCourse", subscribers: "1.1M+", focus: ["UI Design", "Figma", "CSS"] },
  { name: "CharliMarieTV", handle: "@charlimarie", description: "Honest conversations about graphic and UI design careers, freelance life, and personal brand-building.", url: "https://youtube.com/@charlimarie", subscribers: "200K+", focus: ["Graphic Design", "Career", "Freelancing"] },
  { name: "Juxtopposed", handle: "@juxtopposed", description: "Creative CSS experiments, UI tips, and satisfying design breakdowns with a playful, inspiring tone.", url: "https://youtube.com/@juxtopposed", subscribers: "450K+", focus: ["CSS", "UI Tips", "Interaction"] },
  { name: "Figma (Official)", handle: "@Figma", description: "Official Figma channel — Config talks, feature tutorials, and community spotlight videos.", url: "https://youtube.com/@Figma", subscribers: "400K+", focus: ["Figma", "Design Systems", "Prototyping"] },
  { name: "Blender Guru", handle: "@blenderguru", description: "The world's most-watched Blender tutorial channel. Start here for 3D — the Donut is a rite of passage.", url: "https://youtube.com/@blenderguru", subscribers: "2M+", focus: ["Blender", "3D", "Rendering"] },
  { name: "Mizko", handle: "@mizko", description: "Product design process, Figma workflows, and design system deep-dives from a seasoned product designer.", url: "https://youtube.com/@mizko", subscribers: "250K+", focus: ["Product Design", "Figma", "Systems"] },
];

const newsletters = [
  { name: "Dense Discovery", frequency: "Weekly", description: "Thoughtful curation at the intersection of design, tech and culture.", url: "https://www.densediscovery.com", free: true },
  { name: "Sidebar", frequency: "Daily (Mon–Fri)", description: "5 quality design links in your inbox every weekday morning.", url: "https://sidebar.io", free: true },
  { name: "TLDR Design", frequency: "Weekly", description: "Digest of the week's most important design news, condensed.", url: "https://tldr.tech/design", free: true },
  { name: "Pixels of the Week", frequency: "Weekly", description: "UX, accessibility, and web design articles curated by Stéphanie Walter.", url: "https://stephaniewalter.design/blog/pixels-of-the-week/", free: true },
  { name: "The Honest Designer", frequency: "Bi-weekly", description: "Raw, real discussions about the design industry — money, mental health, and craft.", url: "https://thehonestdesigner.com", free: true },
  { name: "Creativerly", frequency: "Weekly", description: "Tools, products, and articles for creative minds — broad and well-curated.", url: "https://creativerly.com", free: true },
];

const communities = [
  { name: "ADPList", type: "Mentorship", description: "Connect with 10,000+ design mentors worldwide for free 1-on-1 sessions. The single best resource for career advice.", url: "https://adplist.org", highlight: "Free mentorship" },
  { name: "Dribbble Community", type: "Portfolio + Community", description: "Share your work, get feedback, and discover what top designers are creating globally.", url: "https://dribbble.com", highlight: "Portfolio showcase" },
  { name: "Figma Community", type: "Resource + Community", description: "Templates, plugins, UI kits, and community files shared by designers worldwide.", url: "https://www.figma.com/community", highlight: "Free resources" },
  { name: "Designer Hangout", type: "Slack Community", description: "Invite-only Slack community of 20,000+ UX professionals. Discussions, job postings, and peer support.", url: "https://www.designerhangout.co", highlight: "Invite-only" },
  { name: "Behance", type: "Portfolio + Network", description: "Adobe's creative community — showcase work, follow top creatives, and explore global design.", url: "https://www.behance.net", highlight: "Portfolio + jobs" },
  { name: "Layers.to", type: "Portfolio Community", description: "Modern portfolio platform and community for product designers and digital creatives.", url: "https://layers.to", highlight: "Portfolio platform" },
];

const trends2024 = [
  { trend: "Bento Grid Layouts", description: "Modular, card-based grid systems inspired by Japanese bento boxes — information-dense yet readable." },
  { trend: "Motion as Language", description: "Micro-interactions and page transitions becoming a core brand differentiator, not just decoration." },
  { trend: "AI-Assisted Design", description: "Figma AI, Adobe Firefly, and Midjourney reshaping how designers ideate, iterate, and produce assets." },
  { trend: "Glassmorphism 2.0", description: "Refined frosted-glass aesthetics with proper depth, accessibility, and dark mode support." },
  { trend: "Variable Fonts", description: "Single font files with infinite weight/width axes enabling more expressive, performant typography." },
  { trend: "Dark Mode as Default", description: "Products increasingly shipping dark-first interfaces, with light as the alternative, not the inverse." },
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

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">

      {/* Hero — editorial dark */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <Link href="/resources" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-sm transition-colors duration-150 cursor-pointer mb-8">
            <ArrowLeftIcon /> All Resources
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Insights & News</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">Stay ahead of the curve</h1>
          <p className="text-zinc-400 text-base max-w-xl leading-relaxed">
            The publications, channels, and newsletters that keep the world&apos;s best designers informed,
            inspired, and thinking critically about their craft.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* ── Design Trends 2024/25 ── */}
        <section aria-labelledby="trends-heading">
          <h2 id="trends-heading" className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-6">Design Trends to Watch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trends2024.map((t, i) => (
              <div key={t.trend} className="bg-white rounded-2xl border border-zinc-100 p-5">
                <p className="text-xs font-bold text-zinc-300 tabular-nums mb-2">0{i + 1}</p>
                <p className="font-bold text-zinc-900 text-sm mb-1">{t.trend}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured Publications ── */}
        <section aria-labelledby="publications-heading">
          <h2 id="publications-heading" className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-6">Publications & Blogs</h2>

          {/* Featured 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {publications.filter((p) => p.featured).map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-zinc-200 bg-white hover:border-amber-300 hover:shadow-md transition-all duration-150 cursor-pointer overflow-hidden"
              >
                <div className="h-2 bg-amber-400" />
                <div className="p-5 flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-extrabold text-zinc-900">{p.name}</p>
                    <span className="text-zinc-300 group-hover:text-zinc-500 transition-colors"><ExternalLinkIcon /></span>
                  </div>
                  <p className="text-xs text-amber-600 font-semibold">{p.type}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.focus.map((f) => (
                      <span key={f} className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 text-xs">{f}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Rest in compact list */}
          <div className="space-y-2">
            {publications.filter((p) => !p.featured).map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-white rounded-xl border border-zinc-100 hover:border-zinc-300 hover:shadow-sm p-4 transition-all duration-150 cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-zinc-900">{p.name}</p>
                    <span className="text-xs text-zinc-400">{p.type}</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed">{p.description}</p>
                </div>
                <span className="text-zinc-300 group-hover:text-zinc-500 shrink-0 mt-0.5 transition-colors"><ExternalLinkIcon /></span>
              </a>
            ))}
          </div>
        </section>

        {/* ── YouTube Channels ── */}
        <section aria-labelledby="youtube-heading">
          <h2 id="youtube-heading" className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-6">YouTube Channels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {channels.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-white rounded-2xl border border-zinc-100 hover:border-zinc-300 hover:shadow-sm p-5 transition-all duration-150 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444" aria-hidden="true">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-sm font-bold text-zinc-900">{c.name}</p>
                    <span className="text-xs text-zinc-400 tabular-nums shrink-0">{c.subscribers}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-1.5">{c.handle}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{c.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Newsletters ── */}
        <section aria-labelledby="newsletters-heading">
          <h2 id="newsletters-heading" className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-6">Newsletters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {newsletters.map((n) => (
              <a
                key={n.name}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 bg-white rounded-xl border border-zinc-100 hover:border-amber-200 hover:shadow-sm p-4 transition-all duration-150 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-zinc-900">{n.name}</p>
                  <span className="text-zinc-300 group-hover:text-zinc-500 shrink-0 transition-colors"><ExternalLinkIcon /></span>
                </div>
                <p className="text-xs text-amber-600 font-medium">{n.frequency}</p>
                <p className="text-xs text-zinc-500 leading-relaxed flex-1">{n.description}</p>
                <span className="text-xs text-green-600 font-semibold">Free</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Communities ── */}
        <section aria-labelledby="community-heading">
          <h2 id="community-heading" className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-6">Communities & Networks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {communities.map((c) => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-white rounded-2xl border border-zinc-100 hover:border-zinc-300 hover:shadow-sm p-5 transition-all duration-150 cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-zinc-900">{c.name}</p>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold shrink-0">{c.highlight}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-1.5 font-medium">{c.type}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{c.description}</p>
                </div>
                <span className="text-zinc-300 group-hover:text-zinc-500 shrink-0 mt-0.5 transition-colors"><ExternalLinkIcon /></span>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
