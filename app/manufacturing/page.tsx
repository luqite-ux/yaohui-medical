import Image from "next/image";
import { Factory } from "lucide-react";
import { InquiryBand, PageHero } from "@/components/site-shell";
import { factoryHighlights } from "@/lib/site-data";

export default function ManufacturingPage() {
  return (
    <main>
      <PageHero eyebrow="Manufacturing" title="Production capacity built around bandage coating, cutting and packing." intro="Yaohui Medical supports repeat B2B supply with dedicated workshops and practical production equipment." />
      <section className="section section-white">
        <div className="container media-grid">
          {["/images/brochure/2.jpg", "/images/brochure/3.jpg", "/images/brochure/4.jpg"].map((src, index) => (
            <article className="media-card" key={src}>
              <Image src={src} alt={`Yaohui Medical manufacturing view ${index + 1}`} width={560} height={360} />
              <h3>Factory View {index + 1}</h3>
              <p>Real production and packing scenes from Yaohui Medical's medical supply manufacturing environment.</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-light">
        <div className="container feature-grid">
          {factoryHighlights.map((item) => (
            <article className="feature-card" key={item}>
              <div className="icon-badge">
                <Factory size={22} />
              </div>
              <h3>{item}</h3>
              <p>Configured to support stable production, packing and shipment preparation for recurring medical supply orders.</p>
            </article>
          ))}
        </div>
      </section>
      <InquiryBand title="Share your volume plan and packing requirements." />
    </main>
  );
}
