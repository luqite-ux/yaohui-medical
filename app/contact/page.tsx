import { Mail, MapPin, Phone } from "lucide-react";
import { InquiryForm, PageHero } from "@/components/site-shell";
import { company } from "@/lib/site-data";

export const metadata = { title: "Contact", description: "Contact Yaohui Medical about Plaster of Paris bandages, orthopedic padding, elastic bandages and OEM/ODM requirements.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <main>
      <PageHero eyebrow="Contact" title="Send your inquiry to Yaohui Medical." intro="Tell us your product, size, quantity, packing and target market. The team will review your B2B supply request." />
      <section className="section section-white">
        <div className="container page-grid">
          <div className="contact-card">
            <h2>Contact Information</h2>
            <p>
              <Mail size={18} /> {company.email}
            </p>
            <p>
              <Phone size={18} /> {company.phones.join(" / ")}
            </p>
            <p>
              <MapPin size={18} /> {company.address}
            </p>
            <p>Reference MOQ: {company.moq}. Regular production lead time: {company.leadTime.toLowerCase()}.</p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
