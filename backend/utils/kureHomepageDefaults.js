const { popularCategoryItems } = require("./kureTherapeuticCategories");

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
    ctaPrimary: { text: "View Full Product Range", link: "/products" },
    ctaSecondary: { text: "Send Enquiry", action: "enquiry" },
    slides: [
      {
        tagline: "Oncology & Specialty Medicines | Prescription Products",
        titleLine1: "Leading Pharmaceutical Wholesale",
        titleHighlight: "Distributors",
        titleLine2: "in India.",
        subtitle:
          "CDSCO-compliant sourcing for hospitals, pharmacies and clinics. Noida | Delhi NCR | Mumbai | Lucknow | Kolkata | Pan-India delivery.",
        heroImage: "/products/ramiven.png",
        bgImage: "/products/ramiven.png",
      },
      {
        tagline: "Critical Care & Injectable Medicines",
        titleLine1: "Cold Chain",
        titleHighlight: "Assured Supply",
        titleLine2: "Across Bharat.",
        subtitle:
          "Temperature-controlled distribution for oncology injections, critical care and lifesaving medicines — reliable logistics since 2016.",
        heroImage: "/products/adcetris.png",
        bgImage: "/products/adcetris.png",
      },
      {
        tagline: "HIV, Nephrology & Imported Specialty",
        titleLine1: "100% Genuine Medicines",
        titleHighlight: "From Trusted",
        titleLine2: "Indian & Global Manufacturers.",
        subtitle:
          "Serving patients, doctors and hospitals with ethical wholesale distribution — GDP practices, licensed supplier, 1000+ products.",
        heroImage: "/products/tagrisso.png",
        bgImage: "/products/tagrisso.png",
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
    phone: "+91 99119 72234",
    phoneHref: "tel:+919911972234",
    enquiryButtonText: "Send Enquiry",
  },
};

module.exports = kureHomepageDefaults;
