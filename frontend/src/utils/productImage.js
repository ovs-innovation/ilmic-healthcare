import { IMAGE_PLACEHOLDER, optimizeImageUrl } from "@utils/cloudinaryImage";
import {
  getIndianCategoryImage,
  isGenericProductImage,
  resolveIndianProductImage,
} from "@utils/indianProductImages";

const collectImageCandidates = (product) => {
  if (!product || typeof product !== "object") return [];

  const candidates = [];

  if (Array.isArray(product.image)) {
    candidates.push(...product.image.filter(Boolean));
  } else if (typeof product.image === "string" && product.image.trim()) {
    candidates.push(product.image.trim());
  }

  if (Array.isArray(product.images)) {
    candidates.push(...product.images.filter(Boolean));
  } else if (typeof product.images === "string" && product.images.trim()) {
    candidates.push(product.images.trim());
  }

  if (Array.isArray(product.variants)) {
    for (const variant of product.variants) {
      if (!variant?.image) continue;
      if (Array.isArray(variant.image)) {
        candidates.push(...variant.image.filter(Boolean));
      } else if (typeof variant.image === "string" && variant.image.trim()) {
        candidates.push(variant.image.trim());
      }
    }
  }

  return candidates.filter(
    (src) => typeof src === "string" && src.trim().length > 0
  );
};

/** Resolve the best product image URL with Cloudinary optimization and category fallbacks */
export const getProductImageSrc = (product, index = 0, { width = 800 } = {}) => {
  if (product) {
    const title = (typeof product.title === "object" ? product.title?.en : product.title) || product.name || "";
    const cleanTitle = title.toLowerCase().trim();
    
    // Explicit unique name/brand to packshot image mapping
    if (cleanTitle.includes("midostar")) return "/products/ramiven.png";
    if (cleanTitle.includes("intazumab")) return "/products/hertuma.png";
    if (cleanTitle.includes("ibruzee")) return "/products/brukinsa.png";
    if (cleanTitle.includes("somalinx")) return "/products/adcetris.png";
    if (cleanTitle.includes("mediopa")) return "/products/darzalex.png";
    if (cleanTitle.includes("tucanat")) return "/products/xospata.png";
    if (cleanTitle.includes("carzomib")) return "/products/darzalex.png";
    if (cleanTitle.includes("tishta")) return "/products/adcetris.png";
    if (cleanTitle.includes("denosteorel")) return "/products/lorbriqua.png";
    if (cleanTitle.includes("treoall")) return "/products/darzalex.png";
    if (cleanTitle.includes("tukavo")) return "/products/tagrisso.png";
    if (cleanTitle.includes("tucaliv")) return "/products/crizalk.png";
    if (cleanTitle.includes("denotec")) return "/products/lorbriqua.png";
    if (cleanTitle.includes("abritiga")) return "/products/lorbriqua.png";
    if (cleanTitle.includes("hertraz")) return "/products/hertuma.png";
    if (cleanTitle.includes("golimurel")) return "/products/ramiven.png";
    
    const comp = (product.composition || "").toLowerCase();
    if (comp.includes("midostaurin")) return "/products/ramiven.png";
    if (comp.includes("pertuzumab")) return "/products/hertuma.png";
    if (comp.includes("ibrutinib")) return "/products/brukinsa.png";
    if (comp.includes("octreotide")) return "/products/adcetris.png";
    if (comp.includes("thiotepa")) return "/products/darzalex.png";
    if (comp.includes("tucatinib")) return "/products/xospata.png";
    if (comp.includes("carfilzomib")) return "/products/darzalex.png";
    if (comp.includes("nivolumab")) return "/products/adcetris.png";
    if (comp.includes("denosumab")) return "/products/lorbriqua.png";
    if (comp.includes("treosulfan")) return "/products/darzalex.png";
    if (comp.includes("midostaurin")) return "/products/ramiven.png";
    if (comp.includes("abiraterone")) return "/products/lorbriqua.png";
    if (comp.includes("trastuzumab")) return "/products/hertuma.png";
    if (comp.includes("golimumab")) return "/products/ramiven.png";
  }

  const candidates = collectImageCandidates(product);
  const src = candidates[index] ?? candidates[0];

  if (!src) {
    if (product) {
      let cat = "";
      if (product.category) {
        if (typeof product.category === "object") {
          cat = product.category.slug || product.category.name || "";
        } else {
          cat = String(product.category);
        }
      }
      
      const cleanCat = cat.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
      const categoryLabel =
        typeof product.category === "object"
          ? product.category.name?.en || product.category.name || cat
          : cat;

      return getIndianCategoryImage(
        typeof categoryLabel === "string" ? categoryLabel : String(categoryLabel),
      );
    }
    return IMAGE_PLACEHOLDER;
  }

  const categoryLabel = product?.category
    ? typeof product.category === "object"
      ? product.category.name?.en || product.category.name || ""
      : String(product.category)
    : "";

  if (isGenericProductImage(src)) {
    return resolveIndianProductImage(src, categoryLabel);
  }
  return optimizeImageUrl(src, { width });
};

export const hasProductImage = (product) =>
  collectImageCandidates(product).length > 0 || (product && product.category);
