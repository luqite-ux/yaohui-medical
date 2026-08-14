import Image from "next/image";
import { notFound } from "next/navigation";
import { InquiryBand, PageHero } from "@/components/site-shell";
import { getProduct, products } from "@/lib/site-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name.en,
    description: product.summary.en
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main>
      <PageHero eyebrow={product.category} title={product.name.en} intro={product.summary.en} />
      <section className="section section-white">
        <div className="container page-grid">
          <div className="page-card">
            <Image src={product.image} alt={product.name.en} width={760} height={520} />
            <h2>Product Overview</h2>
            <p>{product.description.en}</p>
          </div>
          <div className="spec-grid">
            <div className="spec-card">
              <h3>Specifications</h3>
              <ul>
                {product.specs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="spec-card">
              <h3>Applications</h3>
              <ul>
                {product.applications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="spec-card">
              <h3>Highlights</h3>
              <ul>
                {product.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="spec-card">
              <h3>B2B Supply Notes</h3>
              <p>Share target size, quantity, packing style and destination market. Yaohui Medical will review the inquiry and respond with project-specific supply information.</p>
            </div>
          </div>
        </div>
      </section>
      <InquiryBand title={`Send an inquiry for ${product.name.en}.`} product={product.name.en} />
    </main>
  );
}
