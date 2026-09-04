import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Factory, Globe2, PackageCheck, Sparkles } from "lucide-react";
import { InquiryBand } from "@/components/site-shell";
import { AnimatedStatValue } from "@/components/animated-stat-value";
import { ScrollReveal } from "@/components/scroll-reveal";
import { company, factoryHighlights, faqs, heroStats } from "@/lib/site-data";
import { listProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await listProducts();
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Orthopedic Medical Supply Manufacturer</p>
            <h1>Orthopedic bandages for global medical supply buyers.</h1>
            <p className="hero-lead">
              Yaohui Medical manufactures Plaster of Paris bandages, orthopedic padding and elastic bandages for distributors, hospitals and medical supply partners.
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
                  <strong>
                    <AnimatedStatValue stat={stat} />
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-panel" aria-label="Yaohui Medical product and factory collage">
            <div className="pulse-grid" />
            <div className="scan-line" />
            <div className="hero-card">
              <p className="eyebrow">Compliance Documentation</p>
              <p className="hero-card-title">ISO 13485:2016, MDR/CE declarations and export sales documents are available for purchasing review.</p>
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
                <Link className="product-card-link" href={`/products/${product.slug}`}>
                <Image src={product.image} alt={product.name.en} width={520} height={360} />
                <p className="eyebrow">{product.category}</p>
                <h3>{product.name.en}</h3>
                <p>{product.summary.en}</p>
                <span className="link-arrow">
                  Product details <ArrowRight size={16} />
                </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container page-grid manufacturing-motion">
          <ScrollReveal direction="left" className="motion-copy">
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
          </ScrollReveal>
          <div className="feature-grid">
            {factoryHighlights.slice(0, 3).map((item, index) => (
              <ScrollReveal className="motion-card" delay={index * 80} key={item}>
                <div className="feature-card">
                <div className="icon-badge">
                  <Factory size={22} />
                </div>
                <h3>{item}</h3>
                <p>Built around practical medical bandage production and packing workflows.</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container supply-motion">
          <ScrollReveal className="section-heading">
            <div>
            <p className="eyebrow">Why Yaohui</p>
            <h2>Clear supply communication for medical product importers.</h2>
            </div>
          </ScrollReveal>
          <div className="feature-grid">
            {[
              { icon: <BadgeCheck size={22} />, title: "Documentation Support", copy: "ISO 13485:2016, CE/MDR documentation and export sales documents can be coordinated for qualified projects." },
              { icon: <PackageCheck size={22} />, title: "OEM Packing", copy: "Specifications, packing format and label requirements can be reviewed for long-term distributor programs." },
              { icon: <Globe2 size={22} />, title: "Export Experience", copy: "Products are supplied to Southeast Asia, Europe, the Middle East and Africa through B2B medical supply channels." },
            ].map((item, index) => (
              <ScrollReveal className="motion-card" delay={index * 80} key={item.title}>
                <div className="feature-card">
              <div className="icon-badge">
                    {item.icon}
              </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container page-grid faq-motion">
          <ScrollReveal direction="left" className="motion-copy">
            <div>
            <p className="eyebrow">FAQ Preview</p>
            <h2>Fast answers before you send an inquiry.</h2>
            <p>Product specifications, samples, OEM support and lead time details are summarized for overseas buyers.</p>
            <Link className="secondary-button" href="/faq">
              Read FAQ
            </Link>
            </div>
          </ScrollReveal>
          <div className="faq-grid">
            {faqs.slice(0, 4).map((faq, index) => (
              <ScrollReveal direction="right" className="motion-card" delay={index * 70} key={faq.question}>
                <article className="faq-card">
                <h3>
                  <Sparkles size={18} /> {faq.question}
                </h3>
                <p>{faq.answer}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <InquiryBand />
    </main>
  );
}
