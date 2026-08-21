import { createAdminClient, getTenantId } from "@/lib/supabase/server";
import { products as fallbackProducts, type Product } from "@/lib/site-data";
import { normalizeProductImages } from "@/lib/product-gallery.mjs";

function localized(value: unknown, locale = "en") {
  if (!value || typeof value !== "object") return undefined;
  const entries = value as Record<string, unknown>;
  const selected = entries[locale] || entries.en || Object.values(entries).find(Boolean);
  return typeof selected === "string" ? selected : undefined;
}

function localizedList(value: unknown, locale = "en") {
  if (!value || typeof value !== "object") return undefined;
  const entries = value as Record<string, unknown>;
  const selected = entries[locale] || entries.en || Object.values(entries).find(Array.isArray);
  return Array.isArray(selected) ? selected.map(String).filter(Boolean) : undefined;
}

function mergeProduct(row: Record<string, unknown>): Product | undefined {
  const slug = String(row.slug || "");
  const fallback = fallbackProducts.find((product) => product.slug === slug);
  if (!fallback) return undefined;
  return {
    ...fallback,
    image: String(row.image_url || fallback.image),
    images: normalizeProductImages(String(row.image_url || fallback.image), row.extra_data),
    name: { en: localized(row.name_i18n) || String(row.name || fallback.name.en) },
    summary: { en: localized(row.description_i18n) || fallback.summary.en },
    description: { en: localized(row.overview_i18n) || localized(row.description_i18n) || fallback.description.en },
    applications: localizedList(row.applications_i18n) || fallback.applications,
    highlights: localizedList(row.features_i18n) || fallback.highlights
  };
}

export async function listProducts(locale = "en") {
  const tenantId = getTenantId();
  if (!tenantId || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return fallbackProducts;
  const { data, error } = await createAdminClient().from("products").select("slug,name,name_i18n,description_i18n,overview_i18n,features_i18n,applications_i18n,image_url,extra_data,is_active,sort_order").eq("tenant_id", tenantId).eq("is_active", true).order("sort_order", { ascending: true });
  if (error) throw new Error(`Unable to load products: ${error.message}`);
  return (data || []).map(mergeProduct).filter((product): product is Product => Boolean(product));
}

export async function getProductBySlug(slug: string, locale = "en") {
  return (await listProducts(locale)).find((product) => product.slug === slug);
}
