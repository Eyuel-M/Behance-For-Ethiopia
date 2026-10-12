import Link from "next/link";
import { getInsights } from "@/lib/content/store";
import { deleteInsightAction, toggleInsightPublished } from "@/app/actions/admin-content";
import ConfirmButton from "@/components/ConfirmButton";

export const dynamic = "force-dynamic";

export default function InsightsAdminPage() {
  const insights = getInsights();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/content" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">Content</Link>
            <span className="text-zinc-300">/</span>
            <span className="text-sm font-semibold text-zinc-900">Insights</span>
          </div>
          <p className="text-xs text-zinc-400">{insights.filter(i => i.published).length} published · {insights.filter(i => !i.published).length} draft</p>
        </div>
        <Link
          href="/admin/content/insights/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
          style={{ backgroundColor: "#0d2318", color: "white" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New article
        </Link>
      </div>

      {insights.length === 0 && (
        <div className="text-center py-16 text-zinc-400 text-sm bg-white rounded-2xl border border-zinc-200">
          No articles yet. Create your first one.
        </div>
      )}

      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.id} className="bg-white rounded-2xl border border-zinc-200 p-5 flex items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${insight.published ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"}`}>
                  {insight.published ? "Published" : "Draft"}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6dcc46]">{insight.category}</span>
                <span className="text-xs text-zinc-400">{insight.date} · {insight.readTime}</span>
              </div>
              <h3 className="font-bold text-zinc-900 text-sm leading-snug mb-1">{insight.title}</h3>
              <p className="text-xs text-zinc-500 line-clamp-2">{insight.excerpt}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {/* Toggle published */}
              <form action={toggleInsightPublished}>
                <input type="hidden" name="id" value={insight.id} />
                <input type="hidden" name="published" value={insight.published ? "false" : "true"} />
                <button type="submit" className="px-3 py-1.5 rounded-full text-xs font-semibold border border-zinc-200 text-zinc-600 hover:border-zinc-400 transition-colors cursor-pointer">
                  {insight.published ? "Unpublish" : "Publish"}
                </button>
              </form>
              <Link
                href={`/admin/content/insights/${insight.id}`}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-zinc-200 text-zinc-600 hover:border-[#0d2318] hover:text-[#0d2318] transition-colors"
              >
                Edit
              </Link>
              <form action={deleteInsightAction}>
                <input type="hidden" name="id" value={insight.id} />
                <ConfirmButton type="submit" message="Delete this article permanently?" className="px-3 py-1.5 rounded-full text-xs font-semibold border border-red-100 text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                  Delete
                </ConfirmButton>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
