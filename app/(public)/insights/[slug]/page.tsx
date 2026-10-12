import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsights, getInsightBySlug } from "@/lib/content/store";
import type { InsightCategory } from "@/lib/content/types";
import { FadeUp } from "@/components/Motion";

export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<InsightCategory, { bg: string; text: string }> = {
  Design:   { bg: "bg-[#0d2318]/10",  text: "text-[#0d2318]" },
  Business: { bg: "bg-[#6dcc46]/15",  text: "text-[#3a8f20]" },
  Tech:     { bg: "bg-zinc-200",      text: "text-zinc-600"  },
  Culture:  { bg: "bg-amber-100",     text: "text-amber-700" },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return {};
  return { title: post.title };
}

export default async function InsightsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post || !post.published) notFound();

  const allPosts = getInsights(true);
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const cc = CATEGORY_COLORS[post.category];

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ── */}
      <div style={{ backgroundColor: "#071208" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-16">
          <div className="flex items-center gap-2 text-xs text-white/30 mb-8">
            <Link href="/insights" className="hover:text-white/60 transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-white/50 truncate max-w-xs">{post.title}</span>
          </div>
          <FadeUp>
            <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5 ${cc.bg} ${cc.text}`}>
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 max-w-3xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <span className="w-9 h-9 rounded-full bg-[#6dcc46] flex items-center justify-center text-[#0d2318] text-sm font-extrabold shrink-0">
                {post.author[0]}
              </span>
              <div>
                <p className="text-sm font-semibold text-white/80">{post.author}</p>
                <p className="text-xs text-white/35">{post.date} · {post.readTime}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── Article body ── */}
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <FadeUp>
          <p className="text-base text-zinc-600 leading-relaxed font-medium mb-8 border-l-4 border-[#6dcc46] pl-5">
            {post.excerpt}
          </p>
          <div className="space-y-6">
            {post.body.map((para, i) => (
              <p key={i} className="text-zinc-700 leading-relaxed text-base">{para}</p>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-14 pt-10 border-t border-zinc-100">
          <div className="flex items-start gap-4">
            <span className="w-12 h-12 rounded-xl bg-[#0d2318] flex items-center justify-center text-white font-extrabold text-base shrink-0">
              {post.author[0]}
            </span>
            <div>
              <p className="font-extrabold text-zinc-900 text-sm">{post.author}</p>
              <p className="text-xs text-[#6dcc46] font-semibold mt-0.5">Founder</p>
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed max-w-sm">
                Writes about design, the creative industry in Ethiopia, and how to get great work done.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ── Related ── */}
      {related.length > 0 && (
        <div className="border-t border-zinc-100 bg-zinc-50 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <FadeUp className="mb-8">
              <h2 className="font-black text-zinc-900 text-xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>More from Insights</h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => {
                const c = CATEGORY_COLORS[p.category];
                return (
                  <Link key={p.slug} href={`/insights/${p.slug}`} className="group rounded-2xl border border-zinc-200 bg-white p-6 hover:shadow-md transition-all duration-200">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 ${c.bg} ${c.text}`}>
                      {p.category}
                    </span>
                    <h3 className="font-extrabold text-zinc-900 text-sm leading-snug group-hover:text-[#0d2318] transition-colors mb-2">{p.title}</h3>
                    <p className="text-xs text-zinc-400">{p.date} · {p.readTime}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: "#0d2318" }} className="py-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-black text-white text-xl" style={{ fontFamily: "var(--font-display), sans-serif" }}>Ready to start a project?</h2>
            <p className="text-white/50 text-sm mt-1">Submit a brief — free to start, matched within 48 hours.</p>
          </div>
          <Link href="/get-started/client" className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors" style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}>
            Submit a Brief →
          </Link>
        </div>
      </div>

    </div>
  );
}
