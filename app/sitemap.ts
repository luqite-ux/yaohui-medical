import type { MetadataRoute } from "next";
import { products } from "@/lib/site-data";

const siteUrl = "https://yaohuimedicalbandage.com";
const publicRoutes = ["", "/products", "/about", "/manufacturing", "/quality", "/oem-odm", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-14");
  const pages = publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : route === "/products" ? 0.9 : 0.7
  }));

  const productPages = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [...pages, ...productPages];
}
