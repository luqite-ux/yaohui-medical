import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: {
    default: `${company.brand} | Orthopedic Bandage Manufacturer`,
    template: `%s | ${company.brand}`
  },
  description: company.description,
  icons: {
    icon: "/icon.png",
    apple: "/icon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
