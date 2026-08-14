import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://yaohuimedicalbandage.com"),
  title: {
    default: `${company.brand} | Orthopedic Bandage Manufacturer`,
    template: `%s | ${company.brand}`
  },
  description: company.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.brand,
    title: `${company.brand} | Orthopedic Bandage Manufacturer`,
    description: company.description,
    url: "/",
    images: [{ url: "/logo.png", alt: "Yaohui Medical" }]
  },
  icons: {
    icon: "/icon-v2.png",
    apple: "/icon-v2.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.companyName,
    alternateName: company.brand,
    url: "https://yaohuimedicalbandage.com",
    logo: "https://yaohuimedicalbandage.com/logo.png",
    email: company.email,
    telephone: company.phones,
    address: { "@type": "PostalAddress", streetAddress: company.address, addressCountry: "CN" }
  };
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
