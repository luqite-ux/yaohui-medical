export type Locale = "en";

export type LocalizedString = Record<Locale, string>;

export type Product = {
  slug: string;
  category: string;
  image: string;
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
    "Anji Yaohui Medical Products Co., Ltd. manufactures plaster of paris bandages, orthopedic padding and elastic bandages for distributors, hospitals and medical supply partners.",
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
  { label: "Contact", href: "/contact" }
];

export const heroStats = [
  { value: company.established, label: "Established" },
  { value: company.monthlyCapacity, label: "Monthly capacity" },
  { value: company.factoryArea, label: "Factory area" },
  { value: "ISO 13485", label: "Quality system" }
];

export const products: Product[] = [
  {
    slug: "plaster-of-paris-bandage",
    category: "Medical Bandage",
    image: "/images/products/1f5adc7b-57d2-4907-bc00-a804a03e6486.jpg",
    name: { en: "Plaster of Paris Bandage" },
    summary: {
      en: "Fast-setting orthopedic casting bandage made from cotton gauze coated with calcined gypsum powder."
    },
    description: {
      en: "Yaohui plaster of paris bandage is produced by coating cotton gauze with calcined gypsum powder and drying it through controlled production equipment. After soaking in water, it hardens quickly and supports strong molding performance for orthopedic fixation, molds, prosthetic support work and protective orthopedic applications."
    },
    specs: ["Widths: 5cm, 7.5cm, 10cm, 12.5cm, 15cm, 20cm", "Lengths: 2.7m, 3m, 3.6m, 4m, 4.5m", "Custom specifications available", "Single-use medical supply"],
    applications: ["Orthopedic department fixation", "External immobilization support", "Mold and prosthetic auxiliary work", "Protective support for clinical use"],
    highlights: ["Fast setting after water immersion", "Strong shaping ability", "Stable batch production", "Available for OEM packing"]
  },
  {
    slug: "orthopedic-padding",
    category: "Medical Bandage",
    image: "/images/products/9311980e-6162-4f4f-9632-c94bd11aa7c2.jpg",
    name: { en: "Orthopedic Padding" },
    summary: {
      en: "Soft auxiliary padding used before orthopedic external fixation to separate skin from the cast layer."
    },
    description: {
      en: "Orthopedic padding is designed as an auxiliary dressing before external orthopedic fixation. It is commonly made with cotton, non-woven fabric or viscose cotton, providing a soft isolation layer before plaster bandage wrapping while helping disperse pressure during clinical use."
    },
    specs: ["Cotton, non-woven or viscose cotton options", "Soft roll format", "Custom width and packing support", "Single-use auxiliary dressing"],
    applications: ["Padding before plaster bandage application", "Orthopedic external fixation", "Hospital orthopedic departments", "Medical supply distribution"],
    highlights: ["Soft contact layer", "Breathable and absorbent feel", "Works with plaster bandage systems", "Custom size support"]
  },
  {
    slug: "elastic-bandage",
    category: "Medical Bandage",
    image: "/images/products/9ba57ef0-fd33-4146-ab01-ff78360fa1de.jpg",
    name: { en: "Elastic Bandage" },
    summary: {
      en: "Elastic medical bandage for supportive wrapping, compression assistance and everyday orthopedic supply programs."
    },
    description: {
      en: "Yaohui elastic bandages are supplied for medical distribution and orthopedic support use. Specifications, packaging and private-label requirements can be reviewed for long-term B2B purchasing programs."
    },
    specs: ["Multiple widths available by request", "Roll packing", "OEM label and carton options", "Samples can be arranged"],
    applications: ["Supportive wrapping", "Medical distribution channels", "Hospital and clinic supplies", "First-aid product programs"],
    highlights: ["Comfortable wrapping feel", "Flexible OEM packing", "Stable repeat supply", "Inspection records available on request"]
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
