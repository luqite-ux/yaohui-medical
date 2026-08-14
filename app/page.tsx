import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Factory, Globe2, PackageCheck, Sparkles } from "lucide-react";
import { InquiryBand } from "@/components/site-shell";
import { company, factoryHighlights, faqs, heroStats, products } from "@/lib/site-data";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Orthopedic Medical Supply Manufacturer</p>
            <h1>Yaohui Medical supplies casting bandages for global B2B buyers.</h1>
            <p className="hero-lead">
              Manufacturer of plaster of paris bandages, orthopedic padding and elastic bandages for distributors, hospitals and medical supply partners.
            </p>
            <div className="hero-actions">
              <Link className="primary-button" href="/contact">
                Send Inquiry <ArrowRight size={18} />
              </Link>
              <Link className="secondary-button" href="/products">
                View Products
              </Link>
            </div>
            <div className="stats-grid">
              {heroStats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-panel" aria-label="Yaohui Medical product and factory collage">
            <div className="pulse-grid" />
            <div className="scan-line" />
            <div className="hero-card">
              <p className="eyebrow">Bright, certified, export-ready</p>
              <h3>ISO 13485:2016 and CE/MDR documentation support for medical distribution projects.</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Product Lines</p>
            <h2>Core orthopedic consumables for recurring supply programs.</h2>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.slug}>
                <Image src={product.image} alt={product.name.en} width={520} height={360} />
                <p className="eyebrow">{product.category}</p>
                <h3>{product.name.en}</h3>
                <p>{product.summary.en}</p>
                <Link className="link-arrow" href={`/products/${product.slug}`}>
                  Product details <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container page-grid">
          <div>
            <p className="eyebrow">Manufacturing Strength</p>
            <h2>Purpose-built workshops for plaster bandage and padding production.</h2>
            <p>
              Yaohui Medical is located in Anji, Zhejiang, with convenient access to Hangzhou, Shanghai and Ningbo. The factory covers more than 4,000 square meters and supports repeat export orders.
            </p>
            <Link className="primary-button" href="/manufacturing">
              Explore Manufacturing <ArrowRight size={18} />
            </Link>
          </div>
          <div className="feature-grid">
            {factoryHighlights.slice(0, 3).map((item) => (
              <div className="feature-card" key={item}>
                <div className="icon-badge">
                  <Factory size={22} />
                </div>
                <h3>{item}</h3>
                <p>Built around practical medical bandage production and packing workflows.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Why Yaohui</p>
            <h2>Clear supply communication for medical product importers.</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon-badge">
                <BadgeCheck size={22} />
              </div>
              <h3>Documentation Support</h3>
              <p>ISO 13485:2016, CE/MDR documentation and export sales documents can be coordinated for qualified projects.</p>
            </div>
            <div className="feature-card">
              <div className="icon-badge">
                <PackageCheck size={22} />
              </div>
              <h3>OEM Packing</h3>
              <p>Specifications, packing format and label requirements can be reviewed for long-term distributor programs.</p>
            </div>
            <div className="feature-card">
              <div className="icon-badge">
                <Globe2 size={22} />
              </div>
              <h3>Export Experience</h3>
              <p>Products are supplied to Southeast Asia, Europe, the Middle East and Africa through B2B medical supply channels.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container page-grid">
          <div>
            <p className="eyebrow">FAQ Preview</p>
            <h2>Fast answers before you send an inquiry.</h2>
            <p>Product specifications, samples, OEM support and lead time details are summarized for overseas buyers.</p>
            <Link className="secondary-button" href="/faq">
              Read FAQ
            </Link>
          </div>
          <div className="faq-grid">
            {faqs.slice(0, 4).map((faq) => (
              <article className="faq-card" key={faq.question}>
                <h3>
                  <Sparkles size={18} /> {faq.question}
                </h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InquiryBand />
    </main>
  );
}
