import fs from "fs";
import path from "path";
import type { Insight, PortfolioProject, HomepageContent, Testimonial } from "./types";

const STORE_FILE = path.join(process.cwd(), ".content-store.json");

interface ContentStore {
  insights: Insight[];
  portfolio: PortfolioProject[];
  homepage: HomepageContent;
}

function readDiskStore(): ContentStore | null {
  try {
    if (fs.existsSync(STORE_FILE)) {
      return JSON.parse(fs.readFileSync(STORE_FILE, "utf-8")) as ContentStore;
    }
  } catch {}
  return null;
}

function writeDiskStore(data: ContentStore) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {}
}

const DEFAULT_INSIGHTS: Insight[] = [
  {
    id: "1",
    slug: "why-ethiopian-design-is-having-a-moment",
    category: "Design",
    title: "Why Ethiopian Creative Talent Is Having a Global Moment",
    excerpt: "A new generation of Ethiopian designers, illustrators, and brand strategists are landing work for international clients — and the quality gap is closing fast.",
    author: "Eyuel M.",
    date: "Oct 2026",
    readTime: "5 min read",
    published: true,
    createdAt: "2026-10-01T00:00:00Z",
    updatedAt: "2026-10-01T00:00:00Z",
    body: [
      "Ten years ago, an Ethiopian graphic designer with a strong portfolio had two realistic paths: find work at one of a handful of Addis agencies, or apply to international studios and hope to beat thousands of applicants with nothing to differentiate beyond talent alone. The infrastructure for discovery didn't exist.",
      "That's changed. And it's changed faster than most people expected.",
      "The shift happened in layers. First, design education improved dramatically — AAiT, Unity University, and several private institutions started producing graduates with genuine craft skills rather than just software familiarity. Second, the global shift to remote work removed the geography penalty that had always disadvantaged African designers. A brand identity developed in Addis is indistinguishable from one developed in Amsterdam when the work is strong.",
      "Third — and this is the part that doesn't get enough credit — Ethiopian designers started building public portfolios. Behance, Instagram, Dribbble. The work became visible in a way it never had been. And when international clients saw it, many were surprised. They shouldn't have been, but they were.",
      "What we're seeing now is the compounding effect of all three: better-trained designers with visible portfolios in a world that no longer cares where you're located. The opportunity for local businesses is the one that tends to get overlooked in this narrative: that same talent is available to you, right here, at competitive rates, with no timezone friction.",
    ],
  },
  {
    id: "2",
    slug: "how-to-brief-a-designer",
    category: "Business",
    title: "How to Write a Brief That Gets You Great Design",
    excerpt: "Vague briefs produce vague results. We've reviewed thousands of them — here are the six things that separate a brief a designer loves from one they dread.",
    author: "Eyuel M.",
    date: "Sep 2026",
    readTime: "4 min read",
    published: true,
    createdAt: "2026-09-15T00:00:00Z",
    updatedAt: "2026-09-15T00:00:00Z",
    body: [
      "The brief is the most underestimated document in any creative project. Clients focus on the end result — understandably — but designers focus on the brief. Get it right and the work almost writes itself. Get it wrong and even exceptional designers will deliver something that misses.",
      "After reviewing thousands of briefs, here are the six things that consistently separate a brief that produces great work from one that produces confusion.",
      "First: state the problem, not the solution. 'We need a logo' is not a brief. 'We're launching a premium honey brand targeting urban Ethiopian millennials and need to look credible next to international competitors' is a brief.",
      "Second: be specific about what you hate. Most clients tell us what they like. The useful information is what you don't want. 'Don't make it look like every other Ethiopian restaurant' or 'no serif fonts — we want to feel modern' saves hours of wrong-direction work.",
      "Third: include the context your designer can't Google. What's the competitive landscape? Who are your three main competitors and what do they look like?",
      "Fourth: give a real budget range. Designers calibrate effort to budget.",
      "Fifth: name one decision-maker. Design by committee produces design that offends no one and excites no one.",
      "Sixth: say what success looks like. Not 'we'll know it when we see it' — that's a decision deferral, not success criteria.",
    ],
  },
  {
    id: "3",
    slug: "managed-vs-direct-which-suits-you",
    category: "Business",
    title: "Managed Project vs. Direct Match: Which One Suits Your Business?",
    excerpt: "Our two service modes exist because different businesses have fundamentally different needs. This guide helps you pick the right one before you submit a brief.",
    author: "Eyuel M.",
    date: "Sep 2026",
    readTime: "3 min read",
    published: true,
    createdAt: "2026-09-01T00:00:00Z",
    updatedAt: "2026-09-01T00:00:00Z",
    body: [
      "When businesses submit a brief through us, the first question they answer is service mode: Managed Project, or Direct Match. Most people choose based on instinct. Here's the reasoning behind both.",
      "Direct Match is exactly what it sounds like: we find you the right designer, make an introduction, and then step back. You manage the relationship, the feedback process, and the delivery directly.",
      "This mode works well when you have internal capacity to manage a creative relationship. If you have a marketing manager, a project owner, or any experienced team member who's worked with designers before, Direct Match is typically faster and cheaper.",
      "Managed Project is different. We don't just make an introduction — we own the process. We scope the project, write the milestone plan, manage designer communication, review deliverables before you see them, and handle any revisions or disputes.",
      "This mode is designed for businesses that don't have internal creative capacity and don't want to develop it.",
      "The honest answer is: if you're unsure which to pick, pick Managed. It costs the same. The extra layer of oversight doesn't slow things down — it often speeds them up by catching misalignments before they become expensive.",
    ],
  },
  {
    id: "4",
    slug: "sheba-organic-case-study",
    category: "Culture",
    title: "How Sheba Organic Refreshed Its Brand in Under Two Weeks",
    excerpt: "When Sheba Organic needed a rebrand ahead of a product launch, they had 14 days and a tight budget. We matched them with a vetted brand designer on day one.",
    author: "Eyuel M.",
    date: "Aug 2026",
    readTime: "6 min read",
    published: true,
    createdAt: "2026-08-15T00:00:00Z",
    updatedAt: "2026-08-15T00:00:00Z",
    body: [
      "Sheba Organic makes Ethiopian-sourced skincare products — shea butter, argan oil blends, moringa-based serums. The products are excellent. The brand, when they came to us, told a different story.",
      "The constraint was real: 14 days to a product launch at an Addis retail event, and a budget of ETB 35,000. Not generous, but workable for a focused brand identity refresh rather than a full rebuild.",
      "We reviewed the brief the same morning it arrived. By afternoon, we'd identified three designers with direct experience in FMCG packaging and at least one prior project in the personal care category.",
      "Two responded within the day. We presented both to Sheba's founder with a recommendation. She chose our recommendation. The designer received a formal brief by end of day two.",
      "Concept presentations were on day five — two directions, both relevant, neither generic. A few rounds of feedback, minor adjustments, and by day eleven she had final files: new logo, updated color palette, packaging layouts for three SKUs, and a simple brand guidelines document.",
      "The products launched on schedule. Sheba is now back for a second project.",
    ],
  },
  {
    id: "5",
    slug: "vetting-process-explained",
    category: "Design",
    title: "Inside Our Vetting Process: What We Actually Look For",
    excerpt: "We reject more than 70% of applicants. Not because we're elitist — because quality matters. Here's the exact criteria we use to decide who joins the network.",
    author: "Eyuel M.",
    date: "Aug 2026",
    readTime: "5 min read",
    published: true,
    createdAt: "2026-08-01T00:00:00Z",
    updatedAt: "2026-08-01T00:00:00Z",
    body: [
      "Our rejection rate sits above 70%. We're not proud of it and we're not defensive about it — it's the number that comes out when you apply a consistent standard to the applications we receive.",
      "Portfolio quality is the obvious starting point, but 'quality' means something specific: we're looking for evidence of craft, not just output.",
      "The second thing we look at is category breadth vs. depth. A designer who has done 15 logo projects and nothing else is a logo designer — we'll match them to logo briefs.",
      "Third: communication, assessed at the application stage. Designers who write clearly and specifically about their process are generally the ones who can manage a client relationship.",
      "Fourth: references or past client names. A designer who has worked for recognisable businesses and can name them has a track record.",
      "Finally: our onboarding call. It's thirty minutes and it covers work, rates, and reliability. We're assessing honesty and communication style.",
    ],
  },
  {
    id: "6",
    slug: "arch-viz-rising",
    category: "Design",
    title: "Architecture Visualisation Is the Fastest-Growing Brief We Receive",
    excerpt: "Real estate, urban planning, and interior design firms are all discovering the power of photorealistic renders. We break down why and who's producing the best work.",
    author: "Eyuel M.",
    date: "Jul 2026",
    readTime: "4 min read",
    published: true,
    createdAt: "2026-07-01T00:00:00Z",
    updatedAt: "2026-07-01T00:00:00Z",
    body: [
      "In the past eight months, architectural visualisation has gone from our fourth most common brief category to our second.",
      "The answer was consistent: the cost of architectural visualisation has dropped dramatically, and the quality ceiling has risen. Five years ago, a photorealistic exterior render required specialist software, expensive hardware, and several weeks of work. Today, the same quality is achievable in days by a skilled designer.",
      "Who is using arch viz in Ethiopia right now? Three categories dominate. Real estate developers who need to pre-sell units before construction is complete. Urban planning organizations presenting proposals to committees. And interior design firms who use renders to visualize layouts.",
      "The quality of work we're seeing from Ethiopian arch viz designers is, in our view, at international standard. The challenge has been finding it.",
      "We're actively recruiting in this category. If you're an architectural visualizer reading this — your application is particularly welcome right now.",
    ],
  },
];

const DEFAULT_PORTFOLIO: PortfolioProject[] = [
  {
    id: "1", num: "01", category: "Branding", client: "Habesha Premium Coffee", title: "Export-Grade Brand Identity",
    description: "Full visual identity for an Addis-based coffee exporter targeting European buyers. Logo, packaging, and brand guidelines.",
    tags: ["Logo", "Packaging", "Brand Guidelines", "Print"],
    gradient: "linear-gradient(155deg, #1a0c00 0%, #6b3210 40%, #c8802a 80%, #e8b060 100%)",
    year: "2024", published: true, sortOrder: 1, duration: "6 weeks",
    coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516743619420-154b70a65fea?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=1600&h=900&q=80&auto=format&fit=crop",
    ],
    services: ["Brand Strategy", "Logo Design", "Packaging Design", "Brand Guidelines", "Print Collateral"],
    challenge: "Habesha Premium Coffee had exceptional product — single-origin Yirgacheffe beans with a story worth telling — but a brand that spoke to the Addis local market, not the European specialty buyer. The packaging looked like every other local export brand: dense, unstructured, and missing the narrative that premium buyers expect to see on a shelf in Amsterdam or Berlin.",
    approach: "We started by studying the European specialty coffee market closely — what Onyx, Blue Bottle, and Oslo's Tim Wendelboe communicate through their packaging, and why it works. Then we stripped everything back. The identity we built centres on the origin story: a hand-drawn topographic mark representing the Yirgacheffe highlands, paired with a clean serif that signals craft without pretension. The colour system draws directly from the bean-to-cup journey — raw green, roast amber, espresso black.",
    outcome: "The rebrand launched in Q2 2024. Within 90 days, Habesha secured listings with two European specialty distributors and a direct wholesale account with a Copenhagen café group. The founder described the reaction at the Specialty Coffee Expo in Milan as 'night and day' compared to their previous showing.",
    testimonialQuote: "We went to Milan with the new brand and people stopped at our stand without us calling them over. That had never happened before.",
    testimonialAuthor: "Dawit H., Founder — Habesha Premium Coffee",
  },
  {
    id: "2", num: "02", category: "Web & Digital", client: "Agar Microfinance", title: "Fintech App UI — Amharic-First",
    description: "Mobile app UI for a rural micro-lending platform. Offline-capable, Amharic language support, designed for first-time smartphone users.",
    tags: ["UI/UX", "Mobile", "Amharic", "Fintech", "Accessibility"],
    gradient: "linear-gradient(155deg, #041008 0%, #0d3018 40%, #2a7040 80%, #6dcc46 100%)",
    year: "2024", published: true, sortOrder: 2, duration: "10 weeks",
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&h=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1600&h=900&q=80&auto=format&fit=crop",
    ],
    services: ["UX Research", "Information Architecture", "UI Design", "Amharic Typography", "Prototype & Handoff"],
    challenge: "Agar's existing web portal required a stable internet connection and assumed users were comfortable navigating complex financial interfaces — assumptions that broke down completely in rural Tigray and Oromia, where most of their 12,000 active borrowers live. Drop-off during the loan application flow was above 70%. The team needed a mobile app that worked offline, read naturally in Amharic, and didn't intimidate someone using a smartphone to access financial services for the first time.",
    approach: "We spent two weeks in the field before touching design tools — visiting borrowers in Adama and Bahir Dar, watching how they held their phones, what confused them, when they handed the device to a younger family member. From that research we built a set of design principles: one action per screen, no jargon, progress always visible, errors always recoverable. Every screen went through Amharic linguistic review. The offline architecture — sync-on-connection, optimistic UI — was designed collaboratively with Agar's engineering team from day one so nothing had to be retrofitted.",
    outcome: "Beta launch in March 2024 with 800 pilot users. Application completion rate rose from 29% to 81%. Average time-to-submit dropped from 22 minutes to under 7. Agar's CTO reported zero critical UX-related support tickets in the first month of operation — a first for any product they had launched.",
    testimonialQuote: "The research phase alone changed how we think about our users. The design just made that thinking visible.",
    testimonialAuthor: "Selam T., CTO — Agar Microfinance",
  },
  {
    id: "3", num: "03", category: "Architecture", client: "Bole Heights Real Estate", title: "Residential Tower Visualisation",
    description: "Photorealistic renders of a 14-storey mixed-use tower in Bole. Interior walkthroughs, exterior day/night renders, and marketing material.",
    tags: ["3D Render", "Arch Viz", "Interior", "Animation", "Marketing"],
    gradient: "linear-gradient(155deg, #06061a 0%, #101040 40%, #2828a0 80%, #5060d0 100%)",
    year: "2024", published: true, sortOrder: 3, duration: "8 weeks",
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=1200&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&q=80&auto=format&fit=crop",
    ],
    services: ["3D Modelling", "Architectural Visualisation", "Interior Renders", "Day/Night Cycles", "Walkthrough Animation", "Print Marketing"],
    challenge: "Bole Heights needed to pre-sell units in a 14-storey mixed-use development before construction broke ground. The architectural drawings were complete but the project had no visual identity — no sense of how it would feel to live there, look out from a 9th-floor terrace, or walk through the lobby. Pre-sales were stalled. Investors wanted to see something they could believe in.",
    approach: "We built the entire structure in 3D from the architectural drawings, then focused on lighting and material fidelity — the kind of detail (shadow behaviour, glass reflectance, concrete texture) that separates renders that feel like simulations from renders that feel like photographs. We produced three exterior views (golden hour, overcast afternoon, night), a full interior suite for the flagship unit, and a 90-second animated walkthrough with a narrated voiceover script.",
    outcome: "The render suite was used in a pre-sales event two weeks after delivery. Bole Heights pre-sold 34 of 48 residential units within 6 weeks of launch — a conversion rate the development director described as unprecedented for an off-plan project in that price bracket.",
    testimonialQuote: "Buyers were pointing at specific details in the renders and asking us to confirm they'd be in the finished building. That's the level of trust the visuals built.",
    testimonialAuthor: "Yonas B., Development Director — Bole Heights Real Estate",
  },
  {
    id: "4", num: "04", category: "Branding", client: "Abyssinia Kitchen", title: "Restaurant Brand Refresh",
    description: "Updated visual identity for a 3-location Addis restaurant chain. Social media templates, rollup banners, and menu redesign.",
    tags: ["Brand Refresh", "Print", "Social"],
    gradient: "linear-gradient(155deg, #120204 0%, #5c1010 40%, #c03030 80%, #e86060 100%)",
    year: "2023", published: true, sortOrder: 4,
    coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1600&h=900&q=80&auto=format&fit=crop",
    ],
  },
  {
    id: "5", num: "05", category: "Visual Content", client: "Ethio-Tech Hub", title: "Product Launch Motion Package",
    description: "Animated logo reveal, social media story templates, and an 80-second explainer video for an Addis-based SaaS product launch.",
    tags: ["Motion", "Animation", "Video"],
    gradient: "linear-gradient(155deg, #041210 0%, #0a3d34 40%, #1a9080 80%, #30ccb8 100%)",
    year: "2024", published: true, sortOrder: 5,
    coverImage: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=1600&h=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551503766-ac63dfa6401c?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574717024453-354b755973d0?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1600&h=900&q=80&auto=format&fit=crop",
    ],
  },
  {
    id: "6", num: "06", category: "Web & Digital", client: "Sheba Organic", title: "E-commerce & Brand Website",
    description: "Shopify-powered storefront with custom UI for an organic skincare brand. Mobile-first, Amharic/English bilingual, launched in under 3 weeks.",
    tags: ["E-commerce", "Shopify", "Bilingual"],
    gradient: "linear-gradient(155deg, #081404 0%, #204818 40%, #4a9030 80%, #80cc50 100%)",
    year: "2023", published: true, sortOrder: 6,
    coverImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1600&h=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=1600&h=900&q=80&auto=format&fit=crop",
    ],
  },
  {
    id: "7", num: "07", category: "Architecture", client: "Addis Urban Design Office", title: "Mixed-Use Plaza Concept",
    description: "BIM models and concept renders for a proposed public plaza in the Kazanchis district. Presented to city planners and developers.",
    tags: ["BIM", "Urban Design", "Concept"],
    gradient: "linear-gradient(155deg, #0c0c0c 0%, #222222 40%, #555555 80%, #909090 100%)",
    year: "2023", published: true, sortOrder: 7,
    coverImage: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&h=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1431440869543-efaf3388c585?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&h=900&q=80&auto=format&fit=crop",
    ],
  },
  {
    id: "8", num: "08", category: "Branding", client: "Genet Textiles", title: "Heritage Fashion Brand Identity",
    description: "Identity system for an Ethiopian textile brand blending traditional patterns with contemporary design.",
    tags: ["Fashion", "Heritage", "Print"],
    gradient: "linear-gradient(155deg, #120800 0%, #4a2008 40%, #a06828 80%, #d4a058 100%)",
    year: "2024", published: true, sortOrder: 8,
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=900&q=80&auto=format&fit=crop",
    ],
  },
  {
    id: "9", num: "09", category: "Visual Content", client: "Selam Airlines", title: "3D Fleet & Route Visualisations",
    description: "Product renders of aircraft livery concepts and animated route maps for a regional airline's investor presentation.",
    tags: ["3D", "Aviation", "Presentation"],
    gradient: "linear-gradient(155deg, #04060e 0%, #0a1840 40%, #1838a0 80%, #4070d8 100%)",
    year: "2023", published: true, sortOrder: 9,
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&q=80&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500862110879-b0a4f225ed62?w=1600&h=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=1600&h=900&q=80&auto=format&fit=crop",
    ],
  },
];

const DEFAULT_HOMEPAGE: HomepageContent = {
  heroHeadline: "Ethiopia's first curated creative network.",
  heroSubheadline: "We match businesses with vetted Ethiopian designers — fast, fair, and fully managed.",
  stats: [
    { value: "50+", label: "Vetted professionals" },
    { value: "48 hrs", label: "Brief reviewed & matched" },
    { value: "ETB 0", label: "Upfront placement fee" },
    { value: "4.9", label: "Average client rating" },
  ],
  testimonials: [
    { id: "1", quote: "We had our brand identity in under two weeks. The designer they matched us with understood our market immediately — I didn't have to explain Ethiopia to her.", author: "Tigist A.", company: "Sheba Organic", service: "Brand Identity" },
    { id: "2", quote: "I was sceptical about using a curated network. Then I saw the first concepts. That was the end of my scepticism.", author: "Dawit M.", company: "Bole Heights Real Estate", service: "Architecture Viz" },
    { id: "3", quote: "We needed an Amharic-first UI designer and found exactly that. No compromises, no lengthy search.", author: "Selamawit T.", company: "Agar Microfinance", service: "Product Design" },
  ],
};

function getOrInitStore(): ContentStore {
  const g = globalThis as typeof globalThis & { __contentStore?: ContentStore };
  if (!g.__contentStore) {
    const disk = readDiskStore();
    if (disk) {
      // Merge defaults INTO disk projects so new fields (challenge, approach, etc.)
      // are present even when the on-disk JSON was written before they were added.
      // Disk data wins for every key that already exists there; missing keys fall
      // back to the default project's values.
      const portfolio = disk.portfolio.map((p) => {
        const def = DEFAULT_PORTFOLIO.find((d) => d.id === p.id);
        return def ? { ...def, ...p } : p;
      });
      g.__contentStore = { ...disk, portfolio };
    } else {
      g.__contentStore = {
        insights: DEFAULT_INSIGHTS,
        portfolio: DEFAULT_PORTFOLIO,
        homepage: DEFAULT_HOMEPAGE,
      };
    }
  }
  return g.__contentStore;
}

function save(store: ContentStore) {
  (globalThis as typeof globalThis & { __contentStore?: ContentStore }).__contentStore = store;
  writeDiskStore(store);
}

// ── Insights ──────────────────────────────────────────────────────────────────

export function getInsights(publishedOnly = false): Insight[] {
  const store = getOrInitStore();
  const items = store.insights;
  return publishedOnly ? items.filter(i => i.published) : items;
}

export function getInsightBySlug(slug: string): Insight | null {
  return getOrInitStore().insights.find(i => i.slug === slug) ?? null;
}

export function createInsight(data: Omit<Insight, "id" | "createdAt" | "updatedAt">): Insight {
  const store = getOrInitStore();
  const insight: Insight = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.insights.unshift(insight);
  save(store);
  return insight;
}

export function updateInsight(id: string, data: Partial<Omit<Insight, "id" | "createdAt">>): boolean {
  const store = getOrInitStore();
  const idx = store.insights.findIndex(i => i.id === id);
  if (idx === -1) return false;
  store.insights[idx] = { ...store.insights[idx], ...data, updatedAt: new Date().toISOString() };
  save(store);
  return true;
}

export function deleteInsight(id: string): boolean {
  const store = getOrInitStore();
  const before = store.insights.length;
  store.insights = store.insights.filter(i => i.id !== id);
  if (store.insights.length === before) return false;
  save(store);
  return true;
}

// ── Portfolio ─────────────────────────────────────────────────────────────────

export function getPortfolioProjects(publishedOnly = false): PortfolioProject[] {
  const store = getOrInitStore();
  const items = [...store.portfolio]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((p) => {
      const def = DEFAULT_PORTFOLIO.find((d) => d.id === p.id);
      return def ? { ...def, ...p } : p;
    });
  return publishedOnly ? items.filter(p => p.published) : items;
}

export function getPortfolioProject(id: string): PortfolioProject | null {
  const stored = getOrInitStore().portfolio.find(p => p.id === id);
  if (!stored) return null;
  // Always merge with the current default so new fields (challenge, approach,
  // outcome, etc.) appear even when the in-memory store was seeded from an older
  // disk snapshot that predates those fields.
  const def = DEFAULT_PORTFOLIO.find(d => d.id === id);
  return def ? { ...def, ...stored } : stored;
}

export function createPortfolioProject(data: Omit<PortfolioProject, "id">): PortfolioProject {
  const store = getOrInitStore();
  const maxOrder = store.portfolio.reduce((m, p) => Math.max(m, p.sortOrder), 0);
  const project: PortfolioProject = {
    ...data,
    id: Date.now().toString(),
    sortOrder: maxOrder + 1,
  };
  store.portfolio.push(project);
  save(store);
  return project;
}

export function updatePortfolioProject(id: string, data: Partial<Omit<PortfolioProject, "id">>): boolean {
  const store = getOrInitStore();
  const idx = store.portfolio.findIndex(p => p.id === id);
  if (idx === -1) return false;
  store.portfolio[idx] = { ...store.portfolio[idx], ...data };
  save(store);
  return true;
}

export function deletePortfolioProject(id: string): boolean {
  const store = getOrInitStore();
  const before = store.portfolio.length;
  store.portfolio = store.portfolio.filter(p => p.id !== id);
  if (store.portfolio.length === before) return false;
  save(store);
  return true;
}

// ── Homepage ──────────────────────────────────────────────────────────────────

export function getHomepageContent(): HomepageContent {
  return getOrInitStore().homepage;
}

export function updateHomepageContent(data: Partial<HomepageContent>): void {
  const store = getOrInitStore();
  store.homepage = { ...store.homepage, ...data };
  save(store);
}

export function upsertTestimonial(t: Testimonial): void {
  const store = getOrInitStore();
  const idx = store.homepage.testimonials.findIndex(x => x.id === t.id);
  if (idx === -1) {
    store.homepage.testimonials.push({ ...t, id: Date.now().toString() });
  } else {
    store.homepage.testimonials[idx] = t;
  }
  save(store);
}

export function deleteTestimonial(id: string): void {
  const store = getOrInitStore();
  store.homepage.testimonials = store.homepage.testimonials.filter(t => t.id !== id);
  save(store);
}
