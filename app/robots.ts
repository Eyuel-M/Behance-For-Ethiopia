import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hireethiopiasbest.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/project/", "/professional/", "/feedback/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
