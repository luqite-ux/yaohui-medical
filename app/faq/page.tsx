import { Sparkles } from "lucide-react";
import { InquiryBand, PageHero } from "@/components/site-shell";
import { faqs } from "@/lib/site-data";

export const metadata = { title: "FAQ", description: "Answers about specifications, samples, MOQ, production lead times, OEM/ODM and inspection for Yaohui Medical bandages.", alternates: { canonical: "/faq" } };

export default function FaqPage() {
  return (
    <main>
      <PageHero eyebrow="FAQ" title="Common questions for medical bandage procurement." intro="Review specification, sample, lead time, OEM and documentation details before sending your inquiry." />
      <section className="section section-white">
        <div className="container faq-grid">
          {faqs.map((faq) => (
            <article className="faq-card" key={faq.question}>
              <h3>
                <Sparkles size={18} /> {faq.question}
              </h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
      <InquiryBand title="Still need a specific answer? Send an inquiry." />
    </main>
  );
}
