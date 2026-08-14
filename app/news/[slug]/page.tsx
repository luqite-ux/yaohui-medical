import { notFound } from "next/navigation";
import { InquiryBand, PageHero } from "@/components/site-shell";
import { getPublishedArticle } from "@/lib/articles-db";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt, alternates: { canonical: `/news/${slug}` } };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();
  return <main>
    <PageHero eyebrow="News" title={article.title} intro={article.excerpt} />
    <article className="section section-white"><div className="container page-card article-content"><time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" })}</time><div dangerouslySetInnerHTML={{ __html: article.content }} /></div></article>
    <InquiryBand />
  </main>;
}
