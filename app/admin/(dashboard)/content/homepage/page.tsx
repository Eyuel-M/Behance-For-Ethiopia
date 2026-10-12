import Link from "next/link";
import { getHomepageContent } from "@/lib/content/store";
import { updateHomepageAction, upsertTestimonialAction, deleteTestimonialAction } from "@/app/actions/admin-content";
import ConfirmButton from "@/components/ConfirmButton";

export const dynamic = "force-dynamic";

export default function HomepageAdminPage() {
  const content = getHomepageContent();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Link href="/admin/content" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">Content</Link>
        <span className="text-zinc-300">/</span>
        <span className="text-sm font-semibold text-zinc-900">Homepage</span>
      </div>

      {/* Stats & headline */}
      <form action={updateHomepageAction} className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Hero & Stats</h2>
          <button type="submit"
            className="px-5 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer"
            style={{ backgroundColor: "#0d2318", color: "white" }}>
            Save changes
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Hero headline</label>
            <input type="text" name="heroHeadline" defaultValue={content.heroHeadline}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Hero subheadline</label>
            <input type="text" name="heroSubheadline" defaultValue={content.heroSubheadline}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
          </div>

          <input type="hidden" name="statsCount" value={content.stats.length} />
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-3">Stats strip</label>
            <div className="space-y-2">
              {content.stats.map((stat, i) => (
                <div key={i} className="flex gap-3">
                  <input type="text" name={`stat_value_${i}`} defaultValue={stat.value}
                    placeholder="50+"
                    className="w-28 rounded-xl border border-zinc-200 px-3 py-2 text-sm font-bold text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
                  <input type="text" name={`stat_label_${i}`} defaultValue={stat.label}
                    placeholder="Vetted professionals"
                    className="flex-1 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>

      {/* Testimonials */}
      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Testimonials</h2>
        </div>
        <div className="p-6 space-y-4">
          {content.testimonials.map((t) => (
            <div key={t.id} className="border border-zinc-100 rounded-xl p-4 bg-zinc-50/50">
              <form action={upsertTestimonialAction} className="space-y-3">
                <input type="hidden" name="id" value={t.id} />
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Quote</label>
                  <textarea name="quote" rows={3} defaultValue={t.quote}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318] resize-none" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Author</label>
                    <input type="text" name="author" defaultValue={t.author}
                      className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Company</label>
                    <input type="text" name="company" defaultValue={t.company}
                      className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Service</label>
                    <input type="text" name="service" defaultValue={t.service}
                      className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="submit"
                    className="px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
                    style={{ backgroundColor: "#0d2318", color: "white" }}>
                    Save
                  </button>
                </div>
              </form>
              <form action={deleteTestimonialAction} className="mt-2">
                <input type="hidden" name="id" value={t.id} />
                <ConfirmButton type="submit" message="Delete this testimonial?" className="text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer">
                  Delete testimonial
                </ConfirmButton>
              </form>
            </div>
          ))}

          {/* Add new testimonial */}
          <details className="border border-dashed border-zinc-200 rounded-xl">
            <summary className="px-4 py-3 text-xs font-semibold text-zinc-500 cursor-pointer hover:text-zinc-700">
              + Add new testimonial
            </summary>
            <form action={upsertTestimonialAction} className="p-4 space-y-3 border-t border-zinc-100">
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Quote</label>
                <textarea name="quote" rows={3} placeholder="The work was exceptional…"
                  className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318] resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Author</label>
                  <input type="text" name="author" placeholder="Tigist A."
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Company</label>
                  <input type="text" name="company" placeholder="Sheba Organic"
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Service</label>
                  <input type="text" name="service" placeholder="Brand Identity"
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
                </div>
              </div>
              <button type="submit"
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
                style={{ backgroundColor: "#6dcc46", color: "#0d2318" }}>
                Add testimonial
              </button>
            </form>
          </details>
        </div>
      </div>
    </div>
  );
}
