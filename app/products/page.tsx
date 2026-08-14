import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InquiryBand, PageHero } from "@/components/site-shell";
import { products } from "@/lib/site-data";

export default function ProductsPage() {
  return (
    <main>
      <PageHero eyebrow="Products" title="Orthopedic bandage products for B2B supply." intro="Browse Yaohui Medical's main export product lines and send specifications for project review." />
      <section className="section section-white">
        <div className="container product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.slug}>
              <Image src={product.image} alt={product.name.en} width={520} height={360} />
              <p className="eyebrow">{product.category}</p>
              <h3>{product.name.en}</h3>
              <p>{product.summary.en}</p>
              <Link className="link-arrow" href={`/products/${product.slug}`}>
                View details <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <InquiryBand title="Send specifications for product matching and supply review." />
    </main>
  );
}
