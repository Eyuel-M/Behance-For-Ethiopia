export type InsightCategory = "Design" | "Business" | "Tech" | "Culture";

export interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  author: string;
  date: string;
  readTime: string;
  body: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PortfolioCategory = "Branding" | "Web & Digital" | "Visual Content" | "Architecture";

export interface PortfolioProject {
  id: string;
  num: string;
  category: PortfolioCategory;
  client: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  year: string;
  published: boolean;
  sortOrder: number;
}

export interface HomepageStat {
  value: string;
  label: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  service: string;
}

export interface HomepageContent {
  heroHeadline: string;
  heroSubheadline: string;
  stats: HomepageStat[];
  testimonials: Testimonial[];
}
