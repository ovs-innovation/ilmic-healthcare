const { popularCategoryItems } = require("./ilmicTherapeuticCategories");

const ilmicHomepageDefaults = {
  seo: {
    title:
      "ILMIC Health Care - Trusted Pharmaceutical Distributor | Oncology, Critical Care, Specialty Medicines",
    description:
      "ILMIC Health Care is a leading pharmaceutical wholesaler and distributor of Anti-Cancer, Oncology, Critical Care, HIV, Nephrology & Specialty medicines. Established 2016, Noida.",
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
    ctaPrimary: { text: "View Full Product Range", link: "/products" },
    ctaSecondary: { text: "Send Enquiry", action: "enquiry" },
    phone: "+91 88102 72080",
    whatsapp: "9188102 72080",
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
    items: popularCategoryItems,
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
        label: "Anti-Cancer Medicines",
        title: "Anti-Cancer &",
        titleLine2: "Oncology Range",
        image: "/products/ramiven.png",
        category: "Anti-Cancer Medicines",
        accent: "navy",
        linkText: "Browse Anti-Cancer",
        linkUrl: "/products?category=Anti-Cancer Medicines",
      },
      {
        label: "Critical Care Medicines",
        title: "Life-Saving",
        titleLine2: "Injectable Medicines",
        image: "/products/adcetris.png",
        category: "Critical Care Medicines",
        accent: "maroon",
        linkText: "Browse Critical Care",
        linkUrl: "/products?category=Critical Care Medicines",
      },
      {
        label: "Imported medicine",
        title: "Imported &",
        titleLine2: "Specialty Therapeutics",
        image: "/products/tagrisso.png",
        category: "Imported medicine",
        accent: "gold",
        linkText: "View Imported Range",
        linkUrl: "/products?category=Imported medicine",
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
      "Authenticated Indian & licensed specialty medicines from Zydus, Natco, Intas, Cipla, Sun Pharma and trusted partners — cold-chain delivered to hospitals and pharmacies across India.",
    image: "/products/hertuma.png",
    imageLabel: "Hertraz",
    imageSubLabel: "Indian branded oncology medicine",
  },
  featuredBrands: {
    enabled: true,
    title: "Our Featured Brands",
  },
  trendingProducts: {
    enabled: true,
    title: "Our Trending Products",
    subtitle: "Indian branded medicines trusted across Bharat.",
    linkText: "See all products",
    linkUrl: "/products",
  },
  bottomCta: {
    enabled: true,
    title: "Need Medicine Sourcing Assistance?",
    subtitle:
      "Call us or send an enquiry — our team responds within 24 hours.",
    phone: "+91 88102 72080",
    phoneHref: "tel:+9188102 72080",
    enquiryButtonText: "Send Enquiry",
  },
  footer: {
    description:
      "भारत का विश्वसनीय फार्मास्युटिकल वितरक — Oncology, Critical Care, HIV & Specialty medicines. Serving hospitals & pharmacies across India since 2016.",
    badges: ["Quality Assured", "Pan-India"],
    phone: "+91 88102 72080",
    phoneHref: "tel:+9188102 72080",
    email: "info.ilmichealthcare@gmail.com",
    address:
      "B-1/D, Saurav Vihar, Jaitpur,\nBadarpur, New Delhi – 110044",
    hours: "Mon–Sat: 10 AM – 7 PM IST",
    whatsappUrl: "https://wa.me/9188102 72080",
    facebookUrl: "https://facebook.com",
    copyright: "Proudly serving India.",
  },
};

module.exports = ilmicHomepageDefaults;
