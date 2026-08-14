import { Package, PenTool, Ruler } from "lucide-react";
import { InquiryBand, PageHero } from "@/components/site-shell";
import { company } from "@/lib/site-data";

export default function OemPage() {
  return (
    <main>
      <PageHero eyebrow="OEM / ODM" title="Customized specifications and packing for medical distributors." intro="Yaohui Medical supports B2B projects that require custom size, material, packing and private-label coordination." />
      <section className="section section-white">
        <div className="container feature-grid">
          <article className="feature-card">
            <div className="icon-badge">
              <Ruler size={22} />
            </div>
            <h3>Specification Review</h3>
            <p>Width, length, material and packing requirements are reviewed before sampling or order confirmation.</p>
          </article>
          <article className="feature-card">
            <div className="icon-badge">
              <PenTool size={22} />
            </div>
            <h3>Private Label Support</h3>
            <p>OEM label, pouch and carton information can be discussed for distributor programs.</p>
          </article>
          <article className="feature-card">
            <div className="icon-badge">
              <Package size={22} />
            </div>
            <h3>Sampling Path</h3>
            <p>Samples can be arranged in about {company.sampleLeadTime.toLowerCase()} depending on specification and quantity.</p>
          </article>
        </div>
      </section>
      <InquiryBand title="Send your OEM/ODM project details for review." />
    </main>
  );
}
