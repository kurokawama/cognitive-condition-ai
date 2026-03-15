import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cognitive-condition.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/home", "/check", "/result", "/ai-analysis", "/ai-talk", "/note", "/settings", "/history"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
