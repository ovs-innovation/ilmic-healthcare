import requests from "./httpServices";

const CategoryServices = {
  // Public storefront — returns all categories with status: show
  getAllCategories: async () => {
    return requests.get("/category/show");
  },

  getShowingCategory: async () => {
    return requests.get("/category/show");
  },

  getCategoryBySlug: async (slug) => {
    return requests.get(`/category/slug/${encodeURIComponent(slug)}`);
  },
};

export default CategoryServices;
