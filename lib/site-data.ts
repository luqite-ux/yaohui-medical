export type Locale = "en";

export type LocalizedString = Record<Locale, string>;

export type Product = {
  slug: string;
  category: string;
  image: string;
  images: string[];
  name: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  specs: string[];
  applications: string[];
  highlights: string[];
};

export const company = {
  locale: "en" as Locale,
  supportedLocales: ["en"] as Locale[],
  adminGroup: 2,
  brand: "Yaohui Medical",
  companyName: "Anji Yaohui Medical Products Co., Ltd.",
  chineseDisplayName: "安吉耀辉医疗用品有限公司",
  email: "info@yaohuimedicalbandage.com",
  phones: ["18967285819", "15868226853"],
  address: "Tianzi Lake Industrial Park, Anji County, Zhejiang, China",
  tagline: "Orthopedic bandage manufacturing for global medical supply partners",
  description:
    "Anji Yaohui Medical Products Co., Ltd. manufactures Plaster of Paris bandages, orthopedic padding and elastic bandages for distributors, hospitals and medical supply partners.",
  established: "2010",
  factoryArea: "4,000+ m²",
  monthlyCapacity: "600,000 rolls",
  leadTime: "About 30 days",
  sampleLeadTime: "About 10 days",
  moq: "10,000 rolls per size",
  certifications: ["ISO 13485:2016", "MDR CE documentation", "Export sales documentation"],
  markets: ["Southeast Asia", "Europe", "Middle East", "Africa"]
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Quality", href: "/quality" },
  { label: "OEM/ODM", href: "/oem-odm" },
  { label: "FAQ", href: "/faq" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" }
];

export const heroStats = [
  { value: company.established, label: "Established", start: 2000, end: 2010, prefix: "", suffix: "", grouping: false, duration: 1200 },
  { value: company.monthlyCapacity, label: "Monthly capacity", start: 0, end: 600000, prefix: "", suffix: " rolls", duration: 1200 },
  { value: company.factoryArea, label: "Factory area", start: 0, end: 4000, prefix: "", suffix: "+ m²", duration: 1200 },
  { value: "ISO 13485", label: "Quality system", start: 13000, end: 13485, prefix: "ISO ", suffix: "", grouping: false, duration: 1200 }
];

export const products: Product[] = [
  {
    slug: "plaster-of-paris-bandage",
    category: "Medical Bandage",
    image: "/images/products/customer-update-2026-08/plaster-of-paris-bandage/01-customer-confirmed-main.jpg",
    images: [
      "/images/products/customer-update-2026-08/plaster-of-paris-bandage/01-customer-confirmed-main.jpg",
      "/images/products/customer-update-2026-08/plaster-of-paris-bandage/02-supplemental.jpg",
      "/images/products/customer-update-2026-08/plaster-of-paris-bandage/03-supplemental.jpg",
      "/images/products/customer-update-2026-08/plaster-of-paris-bandage/04-supplemental.jpg"
    ],
    name: { en: "Plaster of Paris Bandage" },
    summary: {
      en: "Fast-setting orthopedic casting bandage made from cotton gauze coated with calcined gypsum powder."
    },
    description: {
      en: "Yaohui Plaster of Paris bandages are made by coating cotton gauze with calcined gypsum powder and drying the coated gauze in an oven. After immersion in water, the bandage sets quickly and can be molded for orthopedic fixation, mold making, prosthetic work and protective supports."
    },
    specs: ["Widths: 5cm, 7.5cm, 10cm, 12.5cm, 15cm, 20cm", "Lengths: 2.7m, 3m, 3.6m, 4m, 4.5m", "Custom specifications available", "Single-use medical supply"],
    applications: ["Orthopedic fixation", "External immobilization", "Mold and prosthetic work", "Protective support fabrication"],
    highlights: ["Sets quickly after water immersion", "Easy to mold", "Cotton gauze base", "Custom specifications available"]
  },
  {
    slug: "orthopedic-padding",
    category: "Medical Bandage",
    image: "/images/products/customer-update-2026-08/orthopedic-padding/01-customer-supplied.jpg",
    images: [
      "/images/products/customer-update-2026-08/orthopedic-padding/01-customer-supplied.jpg",
      "/images/products/customer-update-2026-08/orthopedic-padding/02-customer-supplied.jpg",
      "/images/products/customer-update-2026-08/orthopedic-padding/03-customer-supplied.jpg",
      "/images/products/customer-update-2026-08/orthopedic-padding/04-customer-supplied.jpg",
      "/images/products/customer-update-2026-08/orthopedic-padding/05-customer-supplied.jpg"
    ],
    name: { en: "Orthopedic Padding" },
    summary: {
      en: "Soft undercast padding applied before external orthopedic fixation to form a cushioning layer beneath the cast."
    },
    description: {
      en: "Orthopedic padding is an auxiliary dressing applied before external orthopedic fixation. Available in cotton, nonwoven or viscose cotton, it forms a soft layer beneath a Plaster of Paris bandage and helps absorb heat from the setting reaction and distribute external pressure."
    },
    specs: ["Cotton, non-woven or viscose cotton options", "Soft roll format", "Custom width and packing support", "Single-use auxiliary dressing"],
    applications: ["Padding before plaster bandage application", "Orthopedic external fixation", "Hospital orthopedic departments", "Medical supply distribution"],
    highlights: ["Soft cushioning layer", "Moisture-absorbing and breathable materials", "For use beneath cast bandages", "Custom specifications available"]
  },
  {
    slug: "elastic-bandage",
    category: "Medical Bandage",
    image: "/images/products/gallery/elastic-bandage/03-blue-line.webp",
    images: [
      "/images/products/gallery/elastic-bandage/03-blue-line.webp",
      "/images/products/gallery/elastic-bandage/01-unbleached.webp",
      "/images/products/gallery/elastic-bandage/02-red-line.webp",
      "/images/products/gallery/elastic-bandage/04-skin-colour.webp",
      "/images/products/gallery/elastic-bandage/05-bleached.webp"
    ],
    name: { en: "Elastic Bandage" },
    summary: {
      en: "Elastic bandage supplied for medical wrapping applications and distributor purchasing programs."
    },
    description: {
      en: "Yaohui Medical manufactures elastic bandages for medical supply channels. Buyers can submit required specifications and packing details for review."
    },
    specs: ["Specifications confirmed by inquiry", "Roll format", "Packing requirements reviewed by project", "Samples available on request"],
    applications: ["Medical wrapping", "Medical supply distribution", "Hospital supply procurement", "Orthopedic supply programs"],
    highlights: ["Elastic roll format", "Single-use medical supply", "Custom requirements reviewed by inquiry", "Sample requests accepted"]
  }
];

export const factoryHighlights = [
  "Integrated plaster bandage coating and setting workshop",
  "Plaster bandage packing workshop",
  "Orthopedic padding packing workshop",
  "Self-developed semi-automatic cutting machines",
  "Three-servo automatic packing machines"
];

export const faqs = [
  {
    question: "What specifications are available?",
    answer: "Plaster bandage widths include 5cm, 7.5cm, 10cm, 12.5cm, 15cm and 20cm. Lengths include 2.7m, 3m, 3.6m, 4m and 4.5m. Specifications can be customized according to project needs."
  },
  {
    question: "Do you support customized size, material, color or process?",
    answer: "Yes. Yaohui Medical supports customized specifications and packaging for qualified B2B purchasing programs."
  },
  {
    question: "Can you provide samples?",
    answer: "Yes. Samples can be arranged, and the typical sample lead time is about 10 days depending on quantity and specification."
  },
  {
    question: "Do you support OEM or ODM cooperation?",
    answer: "Yes. OEM and ODM cooperation can be discussed for medical distributors and long-term supply partners."
  },
  {
    question: "What is the reference MOQ?",
    answer: "The reference MOQ is 10,000 rolls per size. Final order requirements depend on specifications, packaging and production schedule."
  },
  {
    question: "What is the production lead time after ordering?",
    answer: "Regular orders can usually be delivered in about 30 days after confirmation. Peak season timing should be confirmed before ordering."
  },
  {
    question: "Can you provide technical documents or inspection records?",
    answer: "Technical data sheets, test reports or shipment inspection documents can be coordinated according to buyer requirements."
  },
  {
    question: "Do you support third-party inspection?",
    answer: "Yes. Third-party inspection can be coordinated before shipment according to the buyer's process."
  }
];

export function text(value: LocalizedString, locale: Locale = "en") {
  return value[locale] || value.en || Object.values(value)[0] || "";
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
