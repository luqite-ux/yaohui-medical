import { PageHero, InquiryBand } from "@/components/site-shell";
import { company } from "@/lib/site-data";

export const metadata = { title: "About Us", description: "Learn about Anji Yaohui Medical Products Co., Ltd., its bandage manufacturing focus and production capacity.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <main>
      <PageHero eyebrow="About Us" title="A focused medical bandage manufacturer in Anji, Zhejiang." intro="Yaohui Medical has manufactured orthopedic bandage products since 2010, serving medical supply partners across export markets." />
      <section className="section section-white">
        <div className="container page-grid">
          <div className="page-card">
            <h2>{company.companyName}</h2>
            <p>
              Located in Tianzi Lake Industrial Park, Anji County, Yaohui Medical is 70 km from Hangzhou, 200 km from Shanghai and 250 km from Ningbo. The company manufactures Plaster of Paris bandages, orthopedic padding and elastic bandages.
            </p>
            <p>
              The factory covers more than 4,000 square meters and includes workshops for plaster bandage coating, plaster bandage packing and orthopedic padding packing. Export markets include Southeast Asia, Europe, the Middle East and Africa.
            </p>
          </div>
          <div className="spec-grid">
            <div className="stat-card">
              <strong>{company.established}</strong>
              <span>Established</span>
            </div>
            <div className="stat-card">
              <strong>{company.factoryArea}</strong>
              <span>Factory area</span>
            </div>
            <div className="stat-card">
              <strong>{company.monthlyCapacity}</strong>
              <span>Monthly capacity</span>
            </div>
            <div className="stat-card">
              <strong>{company.leadTime}</strong>
              <span>Regular lead time</span>
            </div>
          </div>
        </div>
      </section>
      <InquiryBand title="Talk with Yaohui Medical about your orthopedic supply needs." />
    </main>
  );
}
