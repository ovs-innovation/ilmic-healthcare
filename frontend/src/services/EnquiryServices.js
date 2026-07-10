import requests from "./httpServices";

const EnquiryServices = {
  createEnquiry: async (enquiryData) => {
    return requests.post("/leads", enquiryData);
  },
  addEnquiry: async (enquiryData) => {
    return requests.post("/leads", enquiryData);
  },
};

export default EnquiryServices;
