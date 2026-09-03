import { createAdminClient, getTenantId } from "@/lib/supabase/server";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
};

function localized(value: unknown, locale = "en") {
  if (!value || typeof value !== "object") return "";
  const entries = value as Record<string, unknown>;
  return String(entries[locale] || entries.en || "");
}

function mapArticle(row: Record<string, unknown>): Article {
  return {
    slug: String(row.slug || ""),
    title: localized(row.title_i18n),
    excerpt: localized(row.excerpt_i18n),
    content: localized(row.content_i18n),
    publishedAt: String(row.published_at || row.created_at || ""),
    updatedAt: String(row.updated_at || row.published_at || row.created_at || "")
  };
}

export async function getPublishedArticles(locale = "en") {
  const tenantId = getTenantId();
  if (!tenantId) return [];
  try {
    const { data, error } = await createAdminClient().from("articles").select("*").eq("tenant_id", tenantId).eq("is_published", true).order("published_at", { ascending: false });
    if (error) throw new Error(`Unable to load articles: ${error.message}`);
    return (data || []).map(mapArticle).filter((article) => article.slug && article.title);
  } catch {
    return [];
  }
}

export async function getPublishedArticle(slug: string, locale = "en") {
  const articles = await getPublishedArticles(locale);
  return articles.find((article) => article.slug === slug);
}
