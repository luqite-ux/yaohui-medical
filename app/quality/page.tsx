import { Award, ClipboardCheck, FileCheck2 } from "lucide-react";
import { InquiryBand, PageHero } from "@/components/site-shell";
import { company } from "@/lib/site-data";

export const metadata = { title: "Quality Documentation", description: "Review the certification, technical file and inspection documentation available from Yaohui Medical.", alternates: { canonical: "/quality" } };

export default function QualityPage() {
  return (
    <main>
      <PageHero eyebrow="Quality & Certification" title="Documentation support for medical supply procurement." intro="Yaohui Medical can coordinate certification, technical and inspection documents according to buyer requirements." />
      <section className="section section-white">
        <div className="container feature-grid">
          {company.certifications.map((item) => (
            <article className="feature-card" key={item}>
              <div className="icon-badge">
                <Award size={22} />
              </div>
              <h3>{item}</h3>
              <p>Available for review during qualified B2B procurement and shipment preparation workflows.</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-light">
        <div className="container page-grid">
          <div className="page-card">
            <h2>Inspection-Oriented Communication</h2>
            <p>Buyers can request technical data sheets, test reports, shipment inspection documents or third-party inspection coordination as part of the inquiry process.</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon-badge">
                <ClipboardCheck size={22} />
              </div>
              <h3>Before Shipment</h3>
              <p>Inspection information can be arranged according to the confirmed order and buyer process.</p>
            </div>
            <div className="feature-card">
              <div className="icon-badge">
                <FileCheck2 size={22} />
              </div>
              <h3>Technical Files</h3>
              <p>Product documents can be coordinated for distributors, hospitals and import partners.</p>
            </div>
          </div>
        </div>
      </section>
      <InquiryBand title="Request product documents for your purchasing review." />
    </main>
  );
}
