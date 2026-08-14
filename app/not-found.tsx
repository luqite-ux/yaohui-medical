import Link from "next/link";
import { PageHero } from "@/components/site-shell";

export const metadata = { title: "Page Not Found", robots: { index: false, follow: false } };

export default function NotFoundPage() {
  return <main>
    <PageHero eyebrow="404" title="The requested page could not be found." intro="The address may have changed, or the page may no longer be available." />
    <section className="section section-white"><div className="container"><Link className="primary-button" href="/">Return Home</Link></div></section>
  </main>;
}
