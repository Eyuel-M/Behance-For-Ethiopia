import Link from "next/link";
import { getInsights } from "@/lib/content/store";
import { getPortfolioProjects } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default function ContentPage() {
  const insights = getInsights();
  const portfolio = getPortfolioProjects();
  const publishedInsights = insights.filter(i => i.published).length;
  const publishedPortfolio = portfolio.filter(p => p.published).length;

  const sections = [
    {
      href: "/admin/content/insights",
      label: "Insights / Blog",
      description: "Write and publish articles that appear on the Insights page.",
      count: insights.length,
      published: publishedInsights,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
    },
    {
      href: "/admin/content/portfolio",
      label: "Portfolio Projects",
      description: "Manage the work samples shown on the Portfolio page.",
      count: portfolio.length,
      published: publishedPortfolio,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
      ),
    },
    {
      href: "/admin/content/homepage",
      label: "Homepage Content",
      description: "Edit stats, testimonials, and key text shown on the homepage.",
      count: null,
      published: null,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-zinc-900">Content Management</h1>
        <p className="text-sm text-zinc-500 mt-1">Edit and publish content that appears on the public website.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white rounded-2xl border border-zinc-200 p-6 hover:border-[#0d2318] hover:shadow-md transition-all duration-150 group"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-[#0d2318] text-zinc-500 group-hover:text-white flex items-center justify-center mb-4 transition-all duration-150">
              {s.icon}
            </div>
            <p className="font-bold text-zinc-900 mb-1">{s.label}</p>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">{s.description}</p>
            {s.count !== null && (
              <p className="text-xs font-semibold text-zinc-500">
                {s.published} published · {s.count - (s.published ?? 0)} draft
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
