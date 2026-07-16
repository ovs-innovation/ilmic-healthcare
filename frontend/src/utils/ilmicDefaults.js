export const ILMIC_LOGO = "/logo/ilmic new logo.png";

const ilmicDefaults = {
  seo: {
    title: "ILMIC Health Care - Oncology, General Pharma & Surgical Products",
    description:
      "ILMIC Health Care Pvt. Ltd. — India's trusted pharmaceutical exporter. Oncology medicines, general pharma, surgical products, medical tourism & hospital management since 2021.",
  },
  hero: {
    enabled: true,
    ctaPrimary: { text: "View Products", link: "/products" },
    ctaSecondary: { text: "Send Enquiry", action: "enquiry" },
    phone: "+91 88102 72080",
    phone2: "+91 92171 74829",
    whatsapp: "918810272080",
    slides: [
      {
        tagline: "ILMIC Health Care Pvt. Ltd.",
        titleLine1: "Trusted Pharmaceutical",
        titleHighlight: "Exporter & Supplier",
        titleLine2: "Since 2021.",
        subtitle:
          "Oncology, General Pharma & Surgical products — exporting to Dubai, Africa, CIS countries and beyond.",
        cities: "Delhi (India) · Luanda (Angola) · Global Export Markets",
        bgImage:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85",
        badge: {
          icon: "shield",
          title: "Quality You Can Trust",
          desc: "GMP-certified products with global quality standards.",
        },
      },
      {
        tagline: "Global Partnerships",
        titleText: "Building Trusted Healthcare Partnerships Worldwide.",
        subtitle:
          "Long-term hospital supply, distributor partnerships, and collaborative healthcare solutions across international markets.",
        cities: "Dubai · Angola · Africa · CIS Countries",
        bgImage:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85",
        badge: {
          icon: "handshake",
          title: "Partnership You Can Rely On",
          desc: "Handshake-ready support for hospitals, pharmacies & distributors.",
        },
        theme: "handshake",
      },
      {
        tagline: "Complete Healthcare Services",
        titleText: "Pharma Export · Medical Tourism · Hospital Management.",
        subtitle:
          "From oncology medicines to medical visa assistance and 50+ hospital management projects — one partner for your healthcare needs.",
        cities: "India HQ · Angola Branch · Worldwide Service Network",
        bgImage:
          "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1200&q=85",
        badge: {
          icon: "service",
          title: "End-to-End Service",
          desc: "Export documentation, cold chain, and post-treatment follow-up.",
        },
        theme: "service",
      },
    ],
    features: [
      { title: "Wide Range of Products", desc: "Oncology, General Pharma & Surgical solutions." },
      { title: "Global Reach", desc: "Exporting to 20+ countries across 4 continents." },
      { title: "Quality Assurance", desc: "GMP-compliant products with strict quality control." },
      { title: "Dedicated Support", desc: "End-to-end export & documentation support." },
    ],
  },
  popularCategories: {
    enabled: true,
    title: "Product Categories",
    items: [
      { name: "Oncology", category: "Oncology", icon: "🔬", bgColor: "#F3EEFF", textColor: "#7C3AED" },
      { name: "General Pharma", category: "General Pharma", icon: "💊", bgColor: "#EFF7FF", textColor: "#1D4ED8" },
      { name: "Surgical", category: "Surgical", icon: "🏥", bgColor: "#FFF0F0", textColor: "#DC2626" },
    ],
  },
  featuredBrands: {
    enabled: true,
    title: "Our Brands",
  },
  bottomCta: {
    enabled: true,
    title: "Need Product Sourcing Assistance?",
    subtitle: "Contact us for bulk orders, export enquiries, and hospital supply.",
    phone: "+91 88102 72080",
    phoneHref: "tel:+918810272080",
    enquiryButtonText: "Send Enquiry",
  },
  footer: {
    description:
      "ILMIC Health Care Pvt. Ltd. — incorporated 28th Aug 2021. Oncology, general pharma, surgical products, hospital management & medical tourism. Offices in Delhi, India & Luanda, Angola.",
    phone: "+91 88102 72080",
    phone2: "+91 92171 74829",
    phoneHref: "tel:+918810272080",
    email: "info.ilmichealthcare@gmail.com",
    address: "New Delhi, India & Luanda, Republic of Angola",
    hours: "Mon – Sat: 9am – 7pm IST",
    whatsappUrl: "https://wa.me/918810272080",
    copyright: "ILMIC Health Care Pvt. Ltd. All rights reserved.",
    badges: ["Oncology Specialist", "Global Exporter", "Hospital Management"],
  },
};

export const ilmicCategories = [
  { name: "Oncology", category: "Oncology", slug: "oncology", icon: "🔬", bgColor: "#F3EEFF", textColor: "#7C3AED" },
  { name: "General Pharma", category: "General Pharma", slug: "general-pharma", icon: "💊", bgColor: "#EFF7FF", textColor: "#1D4ED8" },
  { name: "Surgical", category: "Surgical", slug: "surgical", icon: "🏥", bgColor: "#FFF0F0", textColor: "#DC2626" },
];

export const heroProducts = [
  {
    _id: "qlq10",
    slug: "qlq-10",
    title: { en: "QLQ 10" },
    name: "QLQ 10",
    composition: "Co-Enzyme Q10 300 mg, L-Arginine 250 mg, Omega-3 Fatty Acid 250 mg, Selenium 70 mg, Zinc 20 mg, Lycopene USP 6% 3000 mcg",
    dosageForm: "Softgel Capsule",
    category: "General Pharma",
    manufacturer: "ILMIC Health Care",
    image: "https://images.unsplash.com/photo-1587854692152-cf240469e97e?w=1200&q=80",
    featured: true,
  },
  {
    _id: "imic-energy",
    slug: "imic-energy",
    title: { en: "IMIC ENERGY" },
    name: "IMIC ENERGY",
    composition: "L-Arginine 100 mg, Epimedium Extract 70 mg, Zinc 7.5 mg, Withania Somnifera 50 mg, Asphaltum Punjabianum 50 mg, Chlorophytum Borivilianum 100 mg, Moringa Extract 50 mg, Lepidium Extract 40 mg, Tribulus Terrestris 50 mg, Ginkgo Biloba 40 mg, Mucuna Pruriens 35 mg, Yohimbe Bark 5 mg",
    dosageForm: "Capsules",
    category: "General Pharma",
    manufacturer: "ILMIC Health Care",
    image: "https://images.unsplash.com/photo-1587854680352-936b22b91030?w=1200&q=80",
    featured: true,
  },
  {
    _id: "ctuxil-500",
    slug: "ctuxil-500",
    title: { en: "CTUXIL 500" },
    name: "CTUXIL 500",
    composition: "Cefuroxime Axetil 500 mg",
    dosageForm: "Tablet",
    category: "General Pharma",
    manufacturer: "ILMIC Health Care",
    image: "https://images.unsplash.com/photo-1587854680741-835c0c3e2f7c?w=1200&q=80",
    featured: true,
  },
  {
    _id: "abiramic-250",
    slug: "abiramic-250",
    title: { en: "ABIRAMIC 250" },
    name: "ABIRAMIC 250",
    composition: "Abiraterone Acetate 250 mg",
    dosageForm: "Tablet",
    category: "Oncology",
    manufacturer: "ILMIC Health Care",
    image: "https://images.unsplash.com/photo-1587854692000-0c2c29a0df20?w=1200&q=80",
    featured: true,
  },
  {
    _id: "pacmic-300",
    slug: "pacmic-300",
    title: { en: "PACMIC 300" },
    name: "PACMIC 300",
    composition: "Paclitaxel 300 mg",
    dosageForm: "Injection",
    category: "Oncology",
    manufacturer: "ILMIC Health Care",
    image: "https://images.unsplash.com/photo-1587854680604-ec7e5d83c8b8?w=1200&q=80",
    featured: true,
  },
];

export const tourismServicesFallback = [
  {
    slug: "hospital-treatment-packages",
    name: { en: "Hospital Treatment Packages" },
    description: { en: "Complete treatment packages at India's top accredited hospitals for international patients." },
    icon: "🏥",
    group: "Medical Tourism",
  },
  {
    slug: "medical-visa-assistance",
    name: { en: "Medical Visa Assistance" },
    description: { en: "End-to-end medical visa processing for patients and attendants." },
    icon: "📋",
    group: "Medical Tourism",
  },
  {
    slug: "hospital-management",
    name: { en: "Hospital Management" },
    description: { en: "Managing 50+ hospitals abroad — operations, supply chain, and clinical support." },
    icon: "🏨",
    group: "Hospital",
  },

  {
    slug: "international-medical-conferences",
    name: { en: "International Medical Conferences" },
    description: { en: "Organizing and conducting international medical conferences and training programs." },
    icon: "🎓",
    group: "Training",
  },
  {
    slug: "hospital-accessories-supply",
    name: { en: "Hospital Accessories Supply" },
    description: { en: "Supplier of any type of hospital accessories and surgical products globally." },
    icon: "🔧",
    group: "Surgical",
  },
  {
    slug: "pharmaceutical-export",
    name: { en: "Pharmaceutical Export" },
    description: { en: "Export of oncology and general pharma medicines to Dubai, Africa, Bangladesh, CIS, and other international markets." },
    icon: "🌍",
    group: "Export",
  },
  {
    slug: "post-treatment-followup",
    name: { en: "Post-Treatment Follow-up" },
    description: { en: "Continued patient care and medicine supply after treatment completion." },
    icon: "📞",
    group: "Support",
  },
];

export const whyChooseUs = [
  { visualSrc: "/visuals/oncology.png", title: "Oncology Specialist", desc: "Strong portfolio in anti-cancer medicines — Abiraterone, Paclitaxel, and more in our own brands." },
  { visualSrc: "/visuals/pharmaceutical_export.png", title: "Global Export Network", desc: "Exporting to Dubai, Angola, Cameroon, Namibia, Ethiopia, Uzbekistan & CIS countries." },
  { visualSrc: "/visuals/hospital_management.png", title: "50+ Hospitals Managed", desc: "Hospital management services across international markets with effective on-ground support." },
  { visualSrc: "/visuals/partnership_handshake.png", title: "Since 2021", desc: "Incorporated under Companies Act 2013. Focused exclusively on health sector from day one." },
];

export const patientJourneySteps = [
  { step: "01", title: "Send Enquiry", desc: "Share your product requirements, quantity, and destination country.", icon: "📋" },
  { step: "02", title: "Get Quote", desc: "Receive pricing and product details within 24 hours from our export team.", icon: "💰" },
  { step: "03", title: "Order & Dispatch", desc: "Confirm order, complete documentation, and we dispatch with cold chain if needed.", icon: "📦" },
  { step: "04", title: "Delivery & Support", desc: "Products delivered to your destination with full regulatory documentation.", icon: "🚚" },
  { step: "05", title: "Ongoing Supply", desc: "Regular supply partnership for hospitals, pharmacies, and distributors.", icon: "🤝" },
];

export const companyProfile = {
  name: "ILMIC HEALTH CARE PVT. LTD.",
  incorporated: "28th August 2021",
  registrar: "Registrar of Companies, Delhi & NCR",
  md: "Mr. Maroof Reza",
  offices: ["New Delhi, India", "Luanda, Republic of Angola"],
  markets: ["Dubai", "Angola", "Cameroon", "Namibia", "Ethiopia", "Uzbekistan", "CIS Countries"],
};

export default ilmicDefaults;

// Backward compatibility
export { ilmicDefaults as llmicDefaults };
export const treatmentSpecialties = ilmicCategories;
