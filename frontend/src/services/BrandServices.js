import requests from "./httpServices";

const BrandServices = {
  getFeaturedBrands: async () => {
    return requests.get("/brand/featured");
  },

  getShowingBrands: async () => {
    return requests.get("/brand/show");
  },
};

export default BrandServices;
