"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createInsight, updateInsight, deleteInsight,
  createPortfolioProject, updatePortfolioProject, deletePortfolioProject,
  updateHomepageContent, upsertTestimonial, deleteTestimonial,
} from "@/lib/content/store";
import type { InsightCategory, PortfolioCategory } from "@/lib/content/types";

// ── Insights ──────────────────────────────────────────────────────────────────

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function createInsightAction(formData: FormData): Promise<void> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();
  const title = get("title");
  const slug = get("slug") || slugify(title);
  const bodyRaw = get("body");
  const body = bodyRaw.split("\n\n").map(p => p.trim()).filter(Boolean);

  createInsight({
    slug,
    title,
    excerpt: get("excerpt"),
    category: get("category") as InsightCategory,
    author: get("author") || "Eyuel M.",
    date: get("date") || new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
    readTime: get("readTime") || "5 min read",
    body,
    published: formData.get("published") === "true",
  });

  revalidatePath("/insights");
  revalidatePath("/admin/content/insights");
  redirect("/admin/content/insights");
}

export async function updateInsightAction(formData: FormData): Promise<void> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();
  const id = get("id");
  const bodyRaw = get("body");
  const body = bodyRaw.split("\n\n").map(p => p.trim()).filter(Boolean);

  updateInsight(id, {
    title: get("title"),
    slug: get("slug"),
    excerpt: get("excerpt"),
    category: get("category") as InsightCategory,
    author: get("author"),
    date: get("date"),
    readTime: get("readTime"),
    body,
    published: formData.get("published") === "true",
  });

  revalidatePath("/insights");
  revalidatePath(`/insights/${get("slug")}`);
  revalidatePath("/admin/content/insights");
  redirect("/admin/content/insights");
}

export async function deleteInsightAction(formData: FormData): Promise<void> {
  const id = ((formData.get("id") as string | null) ?? "").trim();
  deleteInsight(id);
  revalidatePath("/insights");
  revalidatePath("/admin/content/insights");
}

export async function toggleInsightPublished(formData: FormData): Promise<void> {
  const id = ((formData.get("id") as string | null) ?? "").trim();
  const published = formData.get("published") === "true";
  updateInsight(id, { published });
  revalidatePath("/insights");
  revalidatePath("/admin/content/insights");
}

// ── Portfolio ─────────────────────────────────────────────────────────────────

export async function createPortfolioAction(formData: FormData): Promise<void> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();
  const tagsRaw = get("tags");
  const tags = tagsRaw.split(",").map(t => t.trim()).filter(Boolean);

  createPortfolioProject({
    num: get("num"),
    category: get("category") as PortfolioCategory,
    client: get("client"),
    title: get("title"),
    description: get("description"),
    tags,
    gradient: get("gradient"),
    year: get("year") || new Date().getFullYear().toString(),
    published: formData.get("published") === "true",
    sortOrder: parseInt(get("sortOrder") || "99") || 99,
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/content/portfolio");
  redirect("/admin/content/portfolio");
}

export async function updatePortfolioAction(formData: FormData): Promise<void> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();
  const id = get("id");
  const tagsRaw = get("tags");
  const tags = tagsRaw.split(",").map(t => t.trim()).filter(Boolean);

  updatePortfolioProject(id, {
    num: get("num"),
    category: get("category") as PortfolioCategory,
    client: get("client"),
    title: get("title"),
    description: get("description"),
    tags,
    gradient: get("gradient"),
    year: get("year"),
    published: formData.get("published") === "true",
    sortOrder: parseInt(get("sortOrder") || "99") || 99,
  });

  revalidatePath("/portfolio");
  revalidatePath("/admin/content/portfolio");
  redirect("/admin/content/portfolio");
}

export async function deletePortfolioAction(formData: FormData): Promise<void> {
  const id = ((formData.get("id") as string | null) ?? "").trim();
  deletePortfolioProject(id);
  revalidatePath("/portfolio");
  revalidatePath("/admin/content/portfolio");
}

// ── Homepage ──────────────────────────────────────────────────────────────────

export async function updateHomepageAction(formData: FormData): Promise<void> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();

  const statsCount = parseInt(get("statsCount") || "4");
  const stats = Array.from({ length: statsCount }, (_, i) => ({
    value: get(`stat_value_${i}`),
    label: get(`stat_label_${i}`),
  })).filter(s => s.value && s.label);

  updateHomepageContent({
    heroHeadline: get("heroHeadline"),
    heroSubheadline: get("heroSubheadline"),
    stats,
  });

  revalidatePath("/");
  revalidatePath("/admin/content/homepage");
}

export async function upsertTestimonialAction(formData: FormData): Promise<void> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();
  upsertTestimonial({
    id: get("id") || Date.now().toString(),
    quote: get("quote"),
    author: get("author"),
    company: get("company"),
    service: get("service"),
  });
  revalidatePath("/");
  revalidatePath("/admin/content/homepage");
}

export async function deleteTestimonialAction(formData: FormData): Promise<void> {
  const id = ((formData.get("id") as string | null) ?? "").trim();
  deleteTestimonial(id);
  revalidatePath("/");
  revalidatePath("/admin/content/homepage");
}
