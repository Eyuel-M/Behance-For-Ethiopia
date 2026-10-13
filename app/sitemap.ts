import type { MetadataRoute } from "next";
import { getPortfolioProjects, getInsights } from "@/lib/content/store";
import { getDesignerApplications } from "@/lib/supabase/admin-queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hireethiopiasbest.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/designers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/get-started/client`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/get-started/designer`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const portfolioRoutes: MetadataRoute.Sitemap = getPortfolioProjects(true).map((p) => ({
    url: `${base}/portfolio/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = getInsights(true).map((i) => ({
    url: `${base}/insights/${i.slug}`,
    lastModified: new Date(i.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const applications = await getDesignerApplications();
  const designerRoutes: MetadataRoute.Sitemap = applications
    .filter((d) => d.status === "approved")
    .map((d) => ({
      url: `${base}/designers/${d.id}`,
      lastModified: new Date(d.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }));

  return [...staticRoutes, ...portfolioRoutes, ...insightRoutes, ...designerRoutes];
}
