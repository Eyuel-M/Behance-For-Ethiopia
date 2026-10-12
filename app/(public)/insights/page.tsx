import Link from "next/link";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Motion";
import { getInsights } from "@/lib/content/store";
import type { Insight, InsightCategory } from "@/lib/content/types";

export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<InsightCategory, { bg: string; text: string }> = {
  Design:   { bg: "bg-[#0d2318]/10",  text: "text-[#0d2318]" },
  Business: { bg: "bg-[#6dcc46]/15",  text: "text-[#3a8f20]" },
  Tech:     { bg: "bg-zinc-200",      text: "text-zinc-600"  },
  Culture:  { bg: "bg-amber-100",     text: "text-amber-700" },
};

function CategoryPill({ category }: { category: InsightCategory }) {
  const c = CATEGORY_COLORS[category];
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${c.bg} ${c.text}`}>
      {category}
    </span>
  );
}

function FeaturedCard({ post }: { post: Insight }) {
  return (
    <Link href={`/insights/${post.slug}`} className="group block rounded-3xl overflow-hidden" style={{ backgroundColor: "#0d2318" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative min-h-[260px] lg:min-h-[380px] overflow-hidden" style={{ background: "linear-gradient(135deg, #071208 0%, #1a6c34 50%, #6dcc46 100%)" }}>
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <circle cx="350" cy="50"  r="180" fill="none" stroke="#6dcc46" strokeWidth="1" />
            <circle cx="350" cy="50"  r="120" fill="none" stroke="#6dcc46" strokeWidth="0.5" />
            <circle cx="50"  cy="280" r="150" fill="none" stroke="#6dcc46" strokeWidth="1" />
            <line x1="0" y1="150" x2="400" y2="150" stroke="#6dcc46" strokeWidth="0.5" />
          </svg>
          <div className="absolute bottom-6 left-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6dcc46]/60">Featured</span>
          </div>
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <CategoryPill category={post.category} />
            <h2 className="mt-4 text-2xl sm:text-3xl font-black text-white leading-tight group-hover:text-[#6dcc46] transition-colors duration-200" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              {post.title}
            </h2>
            <p className="mt-4 text-white/50 text-sm leading-relaxed">{post.excerpt}</p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#6dcc46] flex items-center justify-center text-[#0d2318] text-xs font-extrabold">
                {post.author[0]}
              </span>
              <div>
                <p className="text-xs font-semibold text-white/70">{post.author}</p>
                <p className="text-xs text-white/35">{post.date} · {post.readTime}</p>
              </div>
            </div>
            <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 group-hover:border-[#6dcc46] group-hover:text-[#6dcc46] transition-all duration-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: Insight }) {
  return (
    <Link href={`/insights/${post.slug}`} className="group flex flex-col rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6 flex flex-col flex-1">
        <CategoryPill category={post.category} />
        <h3 className="mt-3 text-base font-extrabold text-zinc-900 leading-snug group-hover:text-[#0d2318] transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-500 leading-relaxed flex-1">{post.excerpt}</p>
        <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-xs text-zinc-400">{post.date} · {post.readTime}</span>
          <span className="text-xs font-semibold text-[#0d2318] group-hover:text-[#6dcc46] transition-colors">Read →</span>
        </div>
      </div>
    </Link>
  );
}

export default function InsightsPage() {
  const posts = getInsights(true);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div style={{ backgroundColor: "#071208" }} className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#6dcc46]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6dcc46]/70">Insights</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                Thinking out<br /><span style={{ color: "#6dcc46" }}>loud.</span>
              </h1>
              <p className="mt-4 text-white/45 text-base max-w-md leading-relaxed">
                Design, industry, and the craft of matching great work to the right people.
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs text-white/30 shrink-0">
              <div className="text-center">
                <p className="text-2xl font-black text-white">{posts.length}</p>
                <p className="mt-0.5">Articles</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-black text-white">4</p>
                <p className="mt-0.5">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20 space-y-14">
        {featured && (
          <FadeUp>
            <FeaturedCard post={featured} />
          </FadeUp>
        )}

        {posts.length === 0 && (
          <p className="text-center text-zinc-400 text-sm py-16">No articles published yet.</p>
        )}

        {rest.length > 0 && (
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {rest.map((post) => (
              <StaggerItem key={post.slug}>
                <PostCard post={post} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}

        <div className="rounded-3xl p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8" style={{ backgroundColor: "#0d2318" }}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#6dcc46] mb-2">Stay in the loop</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              New posts, straight<br />to your inbox.
            </h2>
          </div>
          <form className="flex items-center gap-2 w-full sm:w-auto">
            <input type="email" placeholder="your@email.com"
              className="flex-1 sm:w-64 px-4 py-3 rounded-full text-sm bg-white/10 text-white placeholder-white/30 border border-white/15 focus:outline-none focus:border-[#6dcc46] transition-colors" />
            <button type="submit" className="shrink-0 px-5 py-3 rounded-full text-sm font-bold transition-colors" style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
