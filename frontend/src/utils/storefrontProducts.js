import { breakthroughDrugs } from "@utils/ilmicHomepageRichContent";
import { ilmicCategories } from "@utils/ilmicDefaults";

const STATIC_CATALOG_SLUGS = new Set(
  breakthroughDrugs.map((item) => item.slug).filter(Boolean),
);

const ALLOWED_CATEGORIES = new Set(
  ilmicCategories.map((c) => c.category.toLowerCase()),
);

const BLOCKED_KEYWORDS = [
  "battery",
  "bms",
  "lithium",
  "ev-",
  "electronics",
  "electrical",
  "elecmoon",
  "solar",
  "welding",
  "nickle",
  "epoxy",
  "raw-material",
  "energy-storage",
  "assembly-testing",
  "test-and-tag",
  "microwave",
  "fire-extinguisher",
];

const isDbProductId = (id) => /^[a-f\d]{24}$/i.test(String(id || ""));

const getCategoryName = (product) => {
  const cat = product?.category;
  if (!cat) return "";
  if (typeof cat === "string") return cat;
  if (typeof cat?.name === "string") return cat.name;
  if (cat?.name?.en) return cat.name.en;
  return Object.values(cat.name || {})[0] || "";
};

const isMedicineProduct = (product) => {
  const slug = String(product?.slug || "").toLowerCase();
  const title = String(
    product?.title?.en || product?.title || product?.name || "",
  ).toLowerCase();
  const category = getCategoryName(product).toLowerCase();

  if (BLOCKED_KEYWORDS.some((k) => slug.includes(k) || title.includes(k))) {
    return false;
  }

  if (category && ALLOWED_CATEGORIES.has(category)) return true;

  // Allow known ILMIC hero products even if category missing
  const allowedSlugs = [
    "qlq-10",
    "imic-energy",
    "ctuxil-500",
    "abiramic-250",
    "pacmic-300",
  ];
  if (allowedSlugs.includes(slug)) return true;

  // If category exists but not in allowed list, hide legacy catalog items
  if (category) return ALLOWED_CATEGORIES.has(category);

  return true;
};

/** Storefront listings: real MongoDB medicine products only. */
export const filterStorefrontProducts = (products = []) => {
  if (!Array.isArray(products)) return [];

  return products.filter((product) => {
    if (!product || !isDbProductId(product._id)) return false;
    if (product.slug && STATIC_CATALOG_SLUGS.has(product.slug)) return false;
    return isMedicineProduct(product);
  });
};
