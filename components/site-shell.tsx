import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { company, navigation, products } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-link" href="/" aria-label="Yaohui Medical Home">
        <Image src="/logo.png" alt="Yaohui Medical logo" width={210} height={98} priority />
      </Link>
      <nav aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href="/contact">
        Send Inquiry <ArrowRight size={16} />
      </Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Image src="/logo.png" alt="Yaohui Medical logo" width={190} height={90} />
          <h3>{company.companyName}</h3>
          <p>{company.description}</p>
        </div>
        <div>
          <h4>Products</h4>
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`}>
              {product.name.en}
            </Link>
          ))}
        </div>
        <div>
          <h4>Contact</h4>
          <p>
            <Mail size={17} /> {company.email}
          </p>
          <p>
            <Phone size={17} /> {company.phones.join(" / ")}
          </p>
          <p>
            <MapPin size={17} /> {company.address}
          </p>
        </div>
      </div>
      <div className="footer-bottom">© 2026 {company.companyName}. B2B medical supply inquiry website.</div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="breadcrumb">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-lead">{intro}</p>
      </div>
    </section>
  );
}

export function InquiryForm({ product }: { product?: string }) {
  return (
    <form className="inquiry-form" action="/api/inquiry" method="post">
      <input type="hidden" name="source" value="website" />
      <div className="form-grid">
        <label>
          Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Company
          <input name="company" required placeholder="Company name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required placeholder="name@company.com" />
        </label>
        <label>
          Phone / WhatsApp
          <input name="phone" placeholder="Country code + number" />
        </label>
      </div>
      <label>
        Product Interest
        <select name="product" defaultValue={product || ""}>
          <option value="">Select a product</option>
          {products.map((item) => (
            <option key={item.slug} value={item.name.en}>
              {item.name.en}
            </option>
          ))}
        </select>
      </label>
      <label>
        Inquiry Details
        <textarea name="message" required rows={5} placeholder="Tell us specifications, quantity, packaging and destination market." />
      </label>
      <button className="primary-button" type="submit">
        Submit Inquiry <ArrowRight size={18} />
      </button>
    </form>
  );
}

export function InquiryBand({ title = "Ready to discuss a medical bandage supply program?", product }: { title?: string; product?: string }) {
  return (
    <section className="section section-blue">
      <div className="container page-grid">
        <div>
          <p className="eyebrow">B2B Inquiry</p>
          <h2>{title}</h2>
          <p>
            Share specifications, expected quantity, packaging needs and destination market. Yaohui Medical will review the project details and respond with supply information.
          </p>
        </div>
        <InquiryForm product={product} />
      </div>
    </section>
  );
}
