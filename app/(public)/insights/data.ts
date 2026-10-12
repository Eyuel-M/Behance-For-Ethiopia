export type Category = "Industry" | "Design" | "Company" | "Client Story";

export interface Post {
  slug: string;
  category: Category;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const POSTS: Post[] = [
  {
    slug: "why-ethiopian-design-is-having-a-moment",
    category: "Industry",
    title: "Why Ethiopian Creative Talent Is Having a Global Moment",
    excerpt:
      "A new generation of Ethiopian designers, illustrators, and brand strategists are landing work for international clients — and the quality gap is closing fast. Here's what's driving it.",
    author: "Eyuel M.",
    date: "Oct 2026",
    readTime: "5 min read",
    featured: true,
    body: [
      "Ten years ago, an Ethiopian graphic designer with a strong portfolio had two realistic paths: find work at one of a handful of Addis agencies, or apply to international studios and hope to beat thousands of applicants with nothing to differentiate beyond talent alone. The infrastructure for discovery didn't exist.",
      "That's changed. And it's changed faster than most people expected.",
      "The shift happened in layers. First, design education improved dramatically — AAiT, Unity University, and several private institutions started producing graduates with genuine craft skills rather than just software familiarity. Second, the global shift to remote work removed the geography penalty that had always disadvantaged African designers. A brand identity developed in Addis is indistinguishable from one developed in Amsterdam when the work is strong.",
      "Third — and this is the part that doesn't get enough credit — Ethiopian designers started building public portfolios. Behance, Instagram, Dribbble. The work became visible in a way it never had been. And when international clients saw it, many were surprised. They shouldn't have been, but they were.",
      "What we're seeing now is the compounding effect of all three: better-trained designers with visible portfolios in a world that no longer cares where you're located. Ethiopian creative talent isn't having a moment. It's arriving at a reckoning that was always inevitable.",
      "The opportunity for local businesses is the one that tends to get overlooked in this narrative: that same talent is available to you, right here, at competitive rates, with no timezone friction. The gap between what Ethiopian businesses spend on creative work and the quality they get back is a consequence of discovery problems — not a talent gap. We're here to close it.",
    ],
  },
  {
    slug: "how-to-brief-a-designer",
    category: "Design",
    title: "How to Write a Brief That Gets You Great Design",
    excerpt:
      "Vague briefs produce vague results. We've reviewed thousands of them — here are the six things that separate a brief a designer loves from one they dread.",
    author: "Eyuel M.",
    date: "Sep 2026",
    readTime: "4 min read",
    body: [
      "The brief is the most underestimated document in any creative project. Clients focus on the end result — understandably — but designers focus on the brief. Get it right and the work almost writes itself. Get it wrong and even exceptional designers will deliver something that misses.",
      "After reviewing thousands of briefs, here are the six things that consistently separate a brief that produces great work from one that produces confusion.",
      "First: state the problem, not the solution. 'We need a logo' is not a brief. 'We're launching a premium honey brand targeting urban Ethiopian millennials and need to look credible next to international competitors' is a brief. The designer's job is to solve the problem — give them the problem.",
      "Second: be specific about what you hate. Most clients tell us what they like. The useful information is what you don't want. 'Don't make it look like every other Ethiopian restaurant' or 'no serif fonts — we want to feel modern' saves hours of wrong-direction work.",
      "Third: include the context your designer can't Google. What's the competitive landscape? Who are your three main competitors and what do they look like? What does your best customer say about you? What's the launch date and why does it matter?",
      "Fourth: give a real budget range. Designers calibrate effort to budget. 'What's your budget?' is not a trick question — it determines whether to propose a 3-page website or a 30-page one. A budget range is more useful than a specific number and helps both sides stay honest.",
      "Fifth: name one decision-maker. Design by committee produces design that offends no one and excites no one. The brief should name a single person who signs off. Everything else is feedback, not approval.",
      "Sixth: say what success looks like. Not 'we'll know it when we see it' — that's not success criteria, it's a decision deferral. Success looks like: our CEO can explain the brand positioning in two sentences. Or: we can use this across all social channels without resizing. Concrete outcomes focus the work.",
      "The brief you write before submitting to us becomes the document your designer works from for the entire engagement. Time spent on it multiplies forward.",
    ],
  },
  {
    slug: "managed-vs-direct-which-suits-you",
    category: "Industry",
    title: "Managed Project vs. Direct Match: Which One Suits Your Business?",
    excerpt:
      "Our two service modes exist because different businesses have fundamentally different needs. This guide helps you pick the right one before you submit a brief.",
    author: "Eyuel M.",
    date: "Sep 2026",
    readTime: "3 min read",
    body: [
      "When businesses submit a brief through us, the first question they answer is service mode: Managed Project, or Direct Match. Most people choose based on instinct. Here's the reasoning behind both.",
      "Direct Match is exactly what it sounds like: we find you the right designer, make an introduction, and then step back. You manage the relationship, the feedback process, and the delivery directly. We stay available if something goes wrong, but day-to-day you're working with the designer as if you found them yourself — except we've already vetted them.",
      "This mode works well when you have internal capacity to manage a creative relationship. If you have a marketing manager, a project owner, or any experienced team member who's worked with designers before, Direct Match is typically faster and cheaper. The platform fee is the same, but the overhead on our side is lower, which means we can match you faster and the brief process is shorter.",
      "Managed Project is different. We don't just make an introduction — we own the process. We scope the project, write the milestone plan, manage designer communication, review deliverables before you see them, and handle any revisions or disputes. You see finished (or near-finished) work, not drafts.",
      "This mode is designed for businesses that don't have internal creative capacity and don't want to develop it. If the CEO or a non-creative senior manager is the only person available to interface with the designer, Managed Project protects the quality of work from that constraint.",
      "The honest answer is: if you're unsure which to pick, pick Managed. It costs the same. The extra layer of oversight doesn't slow things down — it often speeds them up by catching misalignments before they become expensive.",
    ],
  },
  {
    slug: "sheba-organic-case-study",
    category: "Client Story",
    title: "How Sheba Organic Refreshed Its Brand in Under Two Weeks",
    excerpt:
      "When Sheba Organic needed a rebrand ahead of a product launch, they had 14 days and a tight budget. We matched them with a vetted brand designer on day one.",
    author: "Eyuel M.",
    date: "Aug 2026",
    readTime: "6 min read",
    body: [
      "Sheba Organic makes Ethiopian-sourced skincare products — shea butter, argan oil blends, moringa-based serums. The products are excellent. The brand, when they came to us, told a different story.",
      "The logo was designed by a friend-of-a-friend in 2021. It wasn't bad — it just wasn't competitive. In a category where packaging and brand story drive purchase decisions as much as ingredients, Sheba was underselling itself every time a product appeared on a shelf.",
      "The constraint was real: 14 days to a product launch at a Addis retail event, and a budget of ETB 35,000. Not generous, but workable for a focused brand identity refresh rather than a full rebuild.",
      "We reviewed the brief the same morning it arrived. By afternoon, we'd identified three designers with direct experience in FMCG packaging and at least one prior project in the personal care category. We reached out to all three with the brief summary and a scope estimate.",
      "Two responded within the day. One was unavailable. The remaining two submitted short portfolio samples specific to the brief. We presented both to Sheba's founder with a recommendation — our preferred option had stronger typography instincts and a tighter portfolio, but the final call was hers.",
      "She chose our recommendation. The designer received a formal brief by end of day two. Concept presentations were on day five — two directions, both relevant, neither generic. A few rounds of feedback, minor adjustments, and by day eleven she had final files: new logo, updated color palette, packaging layouts for three SKUs, and a simple brand guidelines document.",
      "The products launched on schedule. Sheba is now back for a second project.",
    ],
  },
  {
    slug: "vetting-process-explained",
    category: "Company",
    title: "Inside Our Vetting Process: What We Actually Look For",
    excerpt:
      "We reject more than 70% of applicants. Not because we're elitist — because quality matters. Here's the exact criteria we use to decide who joins the network.",
    author: "Eyuel M.",
    date: "Aug 2026",
    readTime: "5 min read",
    body: [
      "Our rejection rate sits above 70%. We're not proud of it and we're not defensive about it — it's the number that comes out when you apply a consistent standard to the applications we receive.",
      "Here's exactly what that standard is.",
      "Portfolio quality is the obvious starting point, but 'quality' means something specific: we're looking for evidence of craft, not just output. A portfolio of 30 pieces where none of them show careful typographic decisions, consistent spacing, or deliberate color choices is a portfolio of volume, not skill. We want to see fewer, better.",
      "The second thing we look at is category breadth vs. depth. A designer who has done 15 logo projects and nothing else is a logo designer — we'll match them to logo briefs. A designer who claims to do branding, UI, motion, illustration, and architecture viz with equal facility usually does none of them well. We match specialty to need, so the portfolio needs to support the specialty.",
      "Third: communication, assessed at the application stage. The application form includes two open-ended questions that most applicants treat as optional. The answers — or absence of them — tell us a lot. Designers who write clearly and specifically about their process are generally the ones who can manage a client relationship. This sounds like a soft criterion. It isn't.",
      "Fourth: references or past client names. We don't verify every one. But a designer who has worked for recognisable businesses — even small local ones — and can name them has a track record. That track record is what allows us to put our reputation behind the match.",
      "Finally: our onboarding call. It's thirty minutes and it covers work, rates, and reliability. We're assessing honesty — whether a designer's account of a project matches what the portfolio shows — and communication style. If a designer is difficult to interview, they'll be difficult to work with.",
      "We close applications and reopen them in batches. If you applied and didn't hear back, it doesn't necessarily mean we declined — you may be in a future cohort. The best thing you can do in the meantime is add projects to your portfolio.",
    ],
  },
  {
    slug: "arch-viz-rising",
    category: "Design",
    title: "Architecture Visualisation Is the Fastest-Growing Brief We Receive",
    excerpt:
      "Real estate, urban planning, and interior design firms are all discovering the power of photorealistic renders. We break down why and who's producing the best work.",
    author: "Eyuel M.",
    date: "Jul 2026",
    readTime: "4 min read",
    body: [
      "In the past eight months, architectural visualisation has gone from our fourth most common brief category to our second. We wanted to understand why before writing about it, so we asked the clients who submitted those briefs.",
      "The answer was consistent: the cost of architectural visualisation has dropped dramatically, and the quality ceiling has risen. Five years ago, a photorealistic exterior render required specialist software, expensive hardware, and several weeks of work. Today, the same quality is achievable in days by a skilled designer with a mid-range workstation. The cost reduction has opened the market to clients who previously considered it out of reach.",
      "Who is using arch viz in Ethiopia right now? Three categories dominate. Real estate developers who need to pre-sell units before construction is complete — renders allow buyers to see finished apartments that don't exist yet. Urban planning and government-adjacent organizations presenting proposals to committees and stakeholders. And interior design firms who use renders to visualize layouts for clients before any furniture moves.",
      "The quality of work we're seeing from Ethiopian arch viz designers is, in our view, at international standard. The challenge has been finding it — most of these designers don't have strong public portfolios, and they're not on the platforms international clients typically use. They take work through referrals, they're often overloaded, and they're priced below market because the referral-only model doesn't create pricing transparency.",
      "We're actively recruiting in this category. If you're an architectural visualizer reading this — your application is particularly welcome right now.",
    ],
  },
];

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  Industry:      { bg: "bg-[#6dcc46]/15",     text: "text-[#3a8f20]" },
  Design:        { bg: "bg-[#0d2318]/10",      text: "text-[#0d2318]" },
  Company:       { bg: "bg-zinc-200",          text: "text-zinc-600"  },
  "Client Story":{ bg: "bg-amber-100",         text: "text-amber-700" },
};
