import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { InquiryBand, PageHero } from "@/components/site-shell";
import { getProductBySlug } from "@/lib/products-db";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name.en,
    description: product.summary.en,
    alternates: { canonical: `/products/${slug}` },
    openGraph: { type: "website", title: product.name.en, description: product.summary.en, url: `/products/${slug}`, images: [{ url: product.image, alt: product.name.en }] }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const productSchema = { "@context": "https://schema.org", "@type": "Product", name: product.name.en, description: product.summary.en, image: product.images, brand: { "@type": "Brand", name: "Yaohui Medical" } };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <PageHero eyebrow={product.category} title={product.name.en} intro={product.summary.en} />
      <section className="section section-white product-detail-section">
        <div className="container product-detail-layout">
          <div className="product-media-panel">
            <ProductGallery images={product.images} productName={product.name.en} />
          </div>
          <div className="product-summary-panel">
            <p className="eyebrow">Product Overview</p>
            <h2>Designed for reliable orthopedic supply.</h2>
            <p>{product.description.en}</p>
            <div className="product-summary-highlights">
              {product.highlights.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
            </div>
            <a className="button button-primary" href="/contact">Request a Quote</a>
          </div>
        </div>
        <div className="container product-detail-sections">
          <div className="spec-card product-detail-card product-detail-card-wide">
            <h3>Specifications</h3>
            <ul>
              {product.specs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="spec-card product-detail-card">
            <h3>Applications</h3>
            <ul>
              {product.applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="spec-card product-detail-card">
            <h3>B2B Supply Notes</h3>
            <p>Share target size, quantity, packing style and destination market. Yaohui Medical will review the inquiry and respond with project-specific supply information.</p>
          </div>
        </div>
      </section>
      <InquiryBand title={`Send an inquiry for ${product.name.en}.`} product={product.name.en} />
    </main>
  );
}
