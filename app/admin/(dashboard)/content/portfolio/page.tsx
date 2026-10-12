import Link from "next/link";
import { getPortfolioProjects } from "@/lib/content/store";
import { deletePortfolioAction } from "@/app/actions/admin-content";

export const dynamic = "force-dynamic";

export default function PortfolioAdminPage() {
  const projects = getPortfolioProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/content" className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors">Content</Link>
            <span className="text-zinc-300">/</span>
            <span className="text-sm font-semibold text-zinc-900">Portfolio</span>
          </div>
          <p className="text-xs text-zinc-400">{projects.filter(p => p.published).length} published · {projects.filter(p => !p.published).length} hidden</p>
        </div>
        <Link
          href="/admin/content/portfolio/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
          style={{ backgroundColor: "#0d2318", color: "white" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add project
        </Link>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16 text-zinc-400 text-sm bg-white rounded-2xl border border-zinc-200">
          No portfolio projects yet.
        </div>
      )}

      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl border border-zinc-200 p-5 flex items-center gap-4 flex-wrap">
            {/* Gradient preview */}
            <div className="w-12 h-12 rounded-xl shrink-0" style={{ background: project.gradient }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${project.published ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"}`}>
                  {project.published ? "Visible" : "Hidden"}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6dcc46]">{project.category}</span>
                <span className="text-xs text-zinc-400">#{project.num} · {project.year}</span>
              </div>
              <p className="font-bold text-zinc-900 text-sm">{project.title}</p>
              <p className="text-xs text-zinc-500">{project.client}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/content/portfolio/${project.id}`}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border border-zinc-200 text-zinc-600 hover:border-[#0d2318] hover:text-[#0d2318] transition-colors"
              >
                Edit
              </Link>
              <form action={deletePortfolioAction}>
                <input type="hidden" name="id" value={project.id} />
                <button type="submit"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border border-red-100 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  onClick={(e) => { if (!confirm("Delete this project?")) e.preventDefault(); }}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
