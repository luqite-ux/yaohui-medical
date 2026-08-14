import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InquiryBand, PageHero } from "@/components/site-shell";
import { listProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Orthopedic Bandage Products",
  description: "View Plaster of Paris bandages, orthopedic padding and elastic bandages manufactured by Yaohui Medical.",
  alternates: { canonical: "/products" }
};

export default async function ProductsPage() {
  const products = await listProducts();
  return (
    <main>
      <PageHero eyebrow="Products" title="Orthopedic bandage products for B2B supply." intro="Browse Yaohui Medical's main export product lines and send specifications for project review." />
      <section className="section section-white">
        <div className="container product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.slug}>
              <Link className="product-card-link" href={`/products/${product.slug}`}>
              <Image src={product.image} alt={product.name.en} width={520} height={360} />
              <p className="eyebrow">{product.category}</p>
              <h3>{product.name.en}</h3>
              <p>{product.summary.en}</p>
              <span className="link-arrow">
                View details <ArrowRight size={16} />
              </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <InquiryBand title="Send specifications for product matching and supply review." />
    </main>
  );
}
