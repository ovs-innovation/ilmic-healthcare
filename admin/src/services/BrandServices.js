import requests from "./httpService";

const BrandServices = {
  getAllBrands: async () => {
    return requests.get("/brand");
  },

  getShowingBrands: async () => {
    return requests.get("/brand/show");
  },

  getBrandById: async (id) => {
    return requests.get(`/brand/${id}`);
  },

  addBrand: async (body) => {
    return requests.post("/brand/add", body);
  },

  updateBrand: async (id, body) => {
    return requests.put(`/brand/${id}`, body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/brand/status/${id}`, body);
  },

  deleteBrand: async (id) => {
    return requests.delete(`/brand/${id}`);
  },
};

export default BrandServices;
