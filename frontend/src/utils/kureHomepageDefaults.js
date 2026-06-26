const kureHomepageDefaults = {
  seo: {
    title:
      "Kure Pharma - Trusted Pharmaceutical Distributor | Oncology, Critical Care, Specialty Medicines",
    description:
      "Kure Pharma is a leading pharmaceutical wholesaler and distributor of Anti-Cancer, Oncology, Critical Care, HIV, Nephrology & Specialty medicines. Established 2016, Noida.",
  },
  hero: {
    enabled: true,
    trustBadges: [
      {
        icon: "FiShield",
        title: "Trusted Since 2016",
        description: "Years of excellence in distribution",
      },
      {
        icon: "FiPackage",
        title: "1000+ Products",
        description: "Wide range of medications",
      },
      {
        icon: "FiTruck",
        title: "Pan India Supply",
        description: "Cold chain delivery logistics",
      },
    ],
    ctaPrimary: { text: "Explore Products", link: "/products" },
    ctaSecondary: { text: "Send Enquiry", action: "enquiry" },
    slides: [
      {
        tagline: "TRUSTED. RELIABLE. NATIONWIDE.",
        titleLine1: "Delivering",
        titleHighlight: "Life-Saving Medicines",
        titleLine2: "Across India.",
        subtitle:
          "Your trusted partner in Oncology, Critical Care & Specialty Medicines with a strong Pan India distribution network.",
        bgImage: "/hero-medicines.png",
      },
      {
        tagline: "TEMPERATURE-CONTROLLED LOGISTICS",
        titleLine1: "Cold Chain",
        titleHighlight: "Assured Supply",
        titleLine2: "Maximum Potency.",
        subtitle:
          "Ensuring the complete safety and integrity of temperature-sensitive oncology & specialty medications nationwide.",
        bgImage: "/hero-pharma.png",
      },
      {
        tagline: "FDA-APPROVED AUTHENTIC SOURCING",
        titleLine1: "100% Genuine",
        titleHighlight: "Global Therapeutics",
        titleLine2: "Direct Imports.",
        subtitle:
          "Direct procurement pathways from global manufacturers to guarantee absolute authenticity for life-saving drugs.",
        bgImage: "/about-pharma.png",
      },
    ],
  },
  qualityBar: {
    enabled: true,
    items: [
      {
        icon: "FiShield",
        title: "Quality Assured",
        description: "Strict quality checks & temperature controlled handling",
      },
      {
        icon: "FiAward",
        title: "Timely Delivery",
        description: "On-time delivery across India",
      },
      {
        icon: "FiHeadphones",
        title: "Customer Support",
        description: "Dedicated support team for your assistance",
      },
      {
        icon: "FiUsers",
        title: "Ethical Business",
        description: "Transparent & ethical business practices",
      },
    ],
  },
  popularCategories: {
    enabled: true,
    title: "Popular Categories",
    items: [
      {
        name: "Oncology Medicines",
        bgColor: "#F3EEFF",
        textColor: "#7C3AED",
        category: "Oncology Medicines",
        image: "/products/oncology_box.png",
      },
      {
        name: "Anti Cancer Drugs",
        bgColor: "#FFF0F0",
        textColor: "#DC2626",
        category: "Anti Cancer Drugs",
        image: "/products/cancer_treatment_pack.png",
      },
      {
        name: "Critical Care",
        bgColor: "#FFF0F5",
        textColor: "#BE185D",
        category: "Critical Care",
        image: "/products/critical_care_injection.png",
      },
      {
        name: "Immunotherapy",
        bgColor: "#EFF7FF",
        textColor: "#1D4ED8",
        category: "Immunotherapy",
        image: "/products/immunotherapy_kit.png",
      },
      {
        name: "Targeted Therapy",
        bgColor: "#EDFFF5",
        textColor: "#059669",
        category: "Targeted Therapy",
        image: "/products/targeted_therapy_pack.png",
      },
      {
        name: "Lifesaving",
        bgColor: "#FFFBEA",
        textColor: "#D97706",
        category: "Lifesaving Medicines",
        image: "/products/lifesaving_emergency_box.png",
      },
    ],
  },
  bestDeals: {
    enabled: true,
    title: "Today's Best Deals For You!",
    linkText: "See all",
    linkUrl: "/products",
  },
  promoBanners: {
    enabled: true,
    items: [
      {
        label: "Oncology Medicines",
        title: "Available",
        titleLine2: "Now",
        emoji: "🎗️",
        gradientFrom: "#FFD1A9",
        gradientTo: "#FFBE85",
        linkText: "Shop Now",
        linkUrl: "/products?category=Oncology",
        labelColor: "#9A3412",
        titleColor: "#7A3B00",
        linkColor: "#7C2D12",
      },
      {
        label: "Critical Care",
        title: "Life Saving",
        titleLine2: "Medicines",
        emoji: "🏥",
        gradientFrom: "#C5E2F3",
        gradientTo: "#A8D4ED",
        linkText: "Explore",
        linkUrl: "/products?category=Critical Care",
        labelColor: "#1E40AF",
        titleColor: "#0F4C81",
        linkColor: "#1E3A8A",
      },
      {
        label: "Specialty Pharma",
        title: "High-End",
        titleLine2: "Medicines",
        emoji: "💊",
        gradientFrom: "#D1FAE5",
        gradientTo: "#A7F3D0",
        linkText: "View Range",
        linkUrl: "/products?category=Specialty Pharma",
        labelColor: "#166534",
        titleColor: "#065F46",
        linkColor: "#14532D",
      },
    ],
  },
  therapeutics: {
    enabled: true,
    badge: "Specialized Distribution",
    title: "Comprehensive Range of",
    titleHighlight: "Life-Saving",
    titleSuffix: "Therapeutics",
    description:
      "We distribute fully authenticated, temperature-controlled specialty medicines sourced directly from trusted global manufacturers to hospitals, pharmacy chains, and clinical networks across India.",
    image: "/products/specialty.png",
    imageLabel: "Specialty Medicine",
    bullets: [
      "Anti-Cancer & Oncology formulations",
      "Critical care ICU-grade medicines",
      "HIV & antiretroviral treatments",
      "Imported & rare disease medicines",
      "Nephrology & dialysis support drugs",
    ],
  },
  featuredBrands: {
    enabled: true,
    title: "Our Featured Brands",
  },
  trendingProducts: {
    enabled: true,
    title: "Our Trending Products",
    subtitle: "Quality medicines from trusted global partners",
    linkText: "See all products",
    linkUrl: "/products",
  },
  bottomCta: {
    enabled: true,
    title: "Need Medicine Sourcing Assistance?",
    subtitle:
      "Call us or send an enquiry — our team responds within 24 hours.",
    phone: "+91 99107 68201",
    phoneHref: "tel:+919910768201",
    enquiryButtonText: "Send Enquiry",
  },
};

export const fallbackBrands = [
  { name: "Lilly", logo: "/brands/lilly.svg" },
  { name: "Novo Nordisk", logo: "/brands/novo-nordisk.svg" },
  { name: "AstraZeneca", logo: "/brands/astrazeneca.svg" },
  { name: "Astellas", logo: "/brands/astellas.svg" },
  { name: "Novartis", logo: "/brands/novartis.svg" },
  { name: "Mankind", logo: "/brands/mankind.png" },
  { name: "Natco Pharma", logo: "/brands/natco.svg" },
  { name: "Bharat Serums", logo: "/brands/bharat-serums.webp" },
  { name: "Pfizer", logo: "/brands/pfizer.svg" },
  { name: "Glenmark", logo: "/brands/glenmark.png" },
];

export default kureHomepageDefaults;
