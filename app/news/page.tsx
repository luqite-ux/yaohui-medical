import Link from "next/link";
import { InquiryBand, PageHero } from "@/components/site-shell";
import { getPublishedArticles } from "@/lib/articles-db";

export const dynamic = "force-dynamic";

export const metadata = { title: "News", description: "Company and product updates published by Yaohui Medical.", alternates: { canonical: "/news" } };

export default async function NewsPage() {
  const articles = await getPublishedArticles();
  return (
    <main>
      <PageHero eyebrow="News" title="Updates from Yaohui Medical." intro="Company, manufacturing and product information for medical supply partners." />
      <section className="section section-white">
        <div className="container">
          {articles.length ? <div className="feature-grid">{articles.map((article) => (
            <article className="feature-card" key={article.slug}>
              <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" })}</time>
              <h2><Link href={`/news/${article.slug}`}>{article.title}</Link></h2>
              {article.excerpt && <p>{article.excerpt}</p>}
            </article>
          ))}</div> : <div className="page-card news-empty"><h2>No news has been published yet.</h2><p>Please check back for future company and product updates.</p></div>}
        </div>
      </section>
      <InquiryBand />
    </main>
  );
}
