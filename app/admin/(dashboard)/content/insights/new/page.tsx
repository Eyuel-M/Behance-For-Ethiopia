import Link from "next/link";
import { createInsightAction } from "@/app/actions/admin-content";

export default function NewInsightPage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/content/insights" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">Insights</Link>
        <span className="text-zinc-300">/</span>
        <span className="text-sm font-semibold text-zinc-900">New article</span>
      </div>
      <InsightForm action={createInsightAction} />
    </div>
  );
}

export function InsightForm({
  action,
  defaultValues,
}: {
  action: (fd: FormData) => Promise<void>;
  defaultValues?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    category?: string;
    author?: string;
    date?: string;
    readTime?: string;
    body?: string[];
    published?: boolean;
  };
}) {
  const body = defaultValues?.body?.join("\n\n") ?? "";

  return (
    <form action={action} className="space-y-5">
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Article Content</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs font-semibold text-zinc-500">Published</span>
            <select name="published" defaultValue={defaultValues?.published ? "true" : "false"}
              className="text-xs border border-zinc-200 rounded-lg px-2 py-1 bg-white text-zinc-700 outline-none focus:border-[#0d2318] cursor-pointer">
              <option value="true">Yes</option>
              <option value="false">No (draft)</option>
            </select>
          </label>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Title *</label>
            <input type="text" name="title" required defaultValue={defaultValues?.title}
              placeholder="Why Ethiopian Creative Talent Is Having a Global Moment"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Slug (URL)</label>
              <input type="text" name="slug" defaultValue={defaultValues?.slug}
                placeholder="auto-generated-from-title"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Category *</label>
              <select name="category" required defaultValue={defaultValues?.category ?? "Design"}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318] cursor-pointer">
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Tech">Tech</option>
                <option value="Culture">Culture</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Excerpt (1–2 sentences) *</label>
            <textarea name="excerpt" required rows={2} defaultValue={defaultValues?.excerpt}
              placeholder="A short summary shown on the insights listing page…"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318] resize-none" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Author</label>
              <input type="text" name="author" defaultValue={defaultValues?.author ?? "Eyuel M."}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Date</label>
              <input type="text" name="date" defaultValue={defaultValues?.date}
                placeholder="Oct 2026"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Read time</label>
              <input type="text" name="readTime" defaultValue={defaultValues?.readTime ?? "5 min read"}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">
              Body *
              <span className="ml-2 normal-case font-normal text-zinc-400">Separate paragraphs with a blank line</span>
            </label>
            <textarea name="body" required rows={16} defaultValue={body}
              placeholder="First paragraph here…&#10;&#10;Second paragraph here…&#10;&#10;Third paragraph here…"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318] resize-y font-mono leading-relaxed" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors cursor-pointer"
          style={{ backgroundColor: "#0d2318", color: "white" }}>
          Save article
        </button>
        <Link href="/admin/content/insights" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}
