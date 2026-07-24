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

const isMedicineProduct = (product) => {
  const slug = String(product?.slug || "").toLowerCase();
  const title = String(
    product?.title?.en || product?.title || product?.name || "",
  ).toLowerCase();

  if (BLOCKED_KEYWORDS.some((k) => slug.includes(k) || title.includes(k))) {
    return false;
  }

  return true;
};

/** Storefront listings: real MongoDB medicine products only. */
export const filterStorefrontProducts = (products = []) => {
  if (!Array.isArray(products)) return [];

  return products.filter((product) => {
    if (!product || !isDbProductId(product._id)) return false;
    return isMedicineProduct(product);
  });
};

