import requests from "./httpServices";

const appendQuery = (params = {}) => {
  const entries = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );
  if (!entries.length) return "";
  return `&${entries
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&")}`;
};

const ProductServices = {
  // Public storefront product listing (no auth required)
  getAllProducts: async ({ category = "", name = "", page = 1, limit = 100 } = {}) => {
    let url = `/products/store?page=${page}&limit=${limit}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (name) url += `&title=${encodeURIComponent(name)}`;
    return requests.get(url);
  },

  getShowingStoreProducts: async ({
    category = "",
    title = "",
    slug = "",
    variantSlug = "",
    page = 1,
    limit = 60,
  } = {}) => {
    let url = `/products/store?page=${page}&limit=${limit}`;
    url += appendQuery({ category, title, slug, variantSlug });
    return requests.get(url);
  },

  getShowingProducts: async () => {
    return requests.get("/products/show");
  },

  getProductsByTag: async (tag) => {
    return requests.get(`/products/tag?tag=${encodeURIComponent(tag)}`);
  },

  getProductsByType: async (typeOrParams) => {
    const type =
      typeof typeOrParams === "string" ? typeOrParams : typeOrParams?.type;
    if (!type) return requests.get("/products/type");
    return requests.get(`/products/type?type=${encodeURIComponent(type)}`);
  },

  getProductsByService: async ({ serviceSlug, serviceId } = {}) => {
    let url = "/products/service";
    const query = appendQuery({ serviceSlug, serviceId }).replace(/^&/, "");
    if (query) url += `?${query}`;
    return requests.get(url);
  },

  getProductBySlug: async (slug) => {
    return requests.get(`/products/product/${slug}`);
  },
};

export default ProductServices;
