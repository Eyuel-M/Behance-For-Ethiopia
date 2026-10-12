import Link from "next/link";
import { createPortfolioAction } from "@/app/actions/admin-content";
import type { PortfolioProject } from "@/lib/content/types";

export function PortfolioForm({
  action,
  defaultValues,
}: {
  action: (fd: FormData) => Promise<void>;
  defaultValues?: Partial<PortfolioProject>;
}) {
  const GRADIENTS = [
    { label: "Coffee Brown", value: "linear-gradient(155deg, #1a0c00 0%, #6b3210 40%, #c8802a 80%, #e8b060 100%)" },
    { label: "Lime Green", value: "linear-gradient(155deg, #041008 0%, #0d3018 40%, #2a7040 80%, #6dcc46 100%)" },
    { label: "Indigo Blue", value: "linear-gradient(155deg, #06061a 0%, #101040 40%, #2828a0 80%, #5060d0 100%)" },
    { label: "Crimson", value: "linear-gradient(155deg, #120204 0%, #5c1010 40%, #c03030 80%, #e86060 100%)" },
    { label: "Teal", value: "linear-gradient(155deg, #041210 0%, #0a3d34 40%, #1a9080 80%, #30ccb8 100%)" },
    { label: "Forest", value: "linear-gradient(155deg, #081404 0%, #204818 40%, #4a9030 80%, #80cc50 100%)" },
    { label: "Charcoal", value: "linear-gradient(155deg, #0c0c0c 0%, #222222 40%, #555555 80%, #909090 100%)" },
    { label: "Amber", value: "linear-gradient(155deg, #120800 0%, #4a2008 40%, #a06828 80%, #d4a058 100%)" },
    { label: "Sky Blue", value: "linear-gradient(155deg, #04060e 0%, #0a1840 40%, #1838a0 80%, #4070d8 100%)" },
    { label: "Dark Emerald", value: "linear-gradient(155deg, #071208 0%, #0d3018 40%, #12412a 80%, #3fa852 100%)" },
  ];

  return (
    <form action={action} className="space-y-5">
      {defaultValues?.id && <input type="hidden" name="id" value={defaultValues.id} />}

      <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Project Details</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Number</label>
              <input type="text" name="num" required defaultValue={defaultValues?.num}
                placeholder="01"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Category *</label>
              <select name="category" required defaultValue={defaultValues?.category ?? "Branding"}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318] cursor-pointer">
                <option value="Branding">Branding</option>
                <option value="Web & Digital">Web & Digital</option>
                <option value="Visual Content">Visual Content</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Year</label>
              <input type="text" name="year" defaultValue={defaultValues?.year ?? new Date().getFullYear().toString()}
                placeholder="2024"
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Visible</label>
              <select name="published" defaultValue={defaultValues?.published !== false ? "true" : "false"}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318] cursor-pointer">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Client name *</label>
            <input type="text" name="client" required defaultValue={defaultValues?.client}
              placeholder="Habesha Premium Coffee"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Project title *</label>
            <input type="text" name="title" required defaultValue={defaultValues?.title}
              placeholder="Export-Grade Brand Identity"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Description</label>
            <textarea name="description" rows={3} defaultValue={defaultValues?.description}
              placeholder="Brief project description shown under the card…"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318] resize-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">
              Tags <span className="font-normal normal-case text-zinc-400">comma-separated</span>
            </label>
            <input type="text" name="tags" defaultValue={defaultValues?.tags?.join(", ")}
              placeholder="Logo, Packaging, Guidelines"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Card background</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
              {GRADIENTS.map(g => (
                <label key={g.value} className="relative cursor-pointer group">
                  <input type="radio" name="gradient" value={g.value}
                    defaultChecked={defaultValues?.gradient === g.value || (!defaultValues?.gradient && g.label === "Coffee Brown")}
                    className="sr-only peer" />
                  <div className="h-14 rounded-xl border-2 border-transparent peer-checked:border-[#6dcc46] transition-all" style={{ background: g.value }} />
                  <span className="absolute bottom-1 left-0 right-0 text-center text-[9px] text-white/70 font-semibold">{g.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-zinc-400">Or paste a custom CSS gradient:</p>
            <input type="text" name="gradient_custom" placeholder="linear-gradient(155deg, #000 0%, #fff 100%)"
              className="w-full mt-1.5 rounded-xl border border-zinc-200 px-4 py-2 text-xs text-zinc-900 bg-white outline-none focus:border-[#0d2318]" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-colors cursor-pointer"
          style={{ backgroundColor: "#0d2318", color: "white" }}>
          Save project
        </button>
        <Link href="/admin/content/portfolio" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  );
}

export default function NewPortfolioPage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/content/portfolio" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">Portfolio</Link>
        <span className="text-zinc-300">/</span>
        <span className="text-sm font-semibold text-zinc-900">Add project</span>
      </div>
      <PortfolioForm action={createPortfolioAction} />
    </div>
  );
}
