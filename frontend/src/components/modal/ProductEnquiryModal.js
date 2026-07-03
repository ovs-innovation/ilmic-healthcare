import React from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import MainModal from "@components/modal/MainModal";
import EnquiryServices from "@services/EnquiryServices";

const ProductEnquiryModal = ({ modalOpen, setModalOpen, product }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!product) return null;

  const onSubmitEnquiry = async (data) => {
    try {
      // Check if productId is a valid MongoDB ObjectId (24-char hex string)
      const isValidObjectId = product._id && /^[a-f\d]{24}$/i.test(product._id);

      const enquiryData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        productId: isValidObjectId ? product._id : null,
        productName: product.name || "General Sourcing Enquiry",
        message: data.message,
      };

      await EnquiryServices.createEnquiry(enquiryData);
      setModalOpen(false);
      toast.success("Your enquiry has been submitted successfully!");
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to submit enquiry. Please try again."
      );
    }
  };

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="block w-full max-w-xl my-4 text-left bg-white shadow-2xl rounded-2xl relative p-6 overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          aria-label="Close"
        >
          <IoClose className="w-5 h-5" />
        </button>

        <div className="mb-6 border-b pb-4">
          <span className="text-[10px] font-bold text-[#2A7DE1] uppercase tracking-wider block">
            Send Enquiry
          </span>
          <h2 className="text-xl font-extrabold text-[#1A2E5B] mt-1">
            {product.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Fill out the form below, and our medical sales team will reach out with details shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitEnquiry)} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-[#1A2E5B] uppercase tracking-wide mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="John Doe"
              className={`w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2A7DE1]/30 focus:border-[#2A7DE1] ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.name && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.name.message}</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1A2E5B] uppercase tracking-wide mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register("email", { 
                  required: "Email is required", 
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } 
                })}
                type="email"
                placeholder="john@example.com"
                className={`w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2A7DE1]/30 focus:border-[#2A7DE1] ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.email && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2E5B] uppercase tracking-wide mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                type="tel"
                placeholder="+1 (234) 567-890"
                className={`w-full border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2A7DE1]/30 focus:border-[#2A7DE1] ${
                  errors.phone ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.phone && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.phone.message}</span>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1A2E5B] uppercase tracking-wide mb-1">
              Message / Specific Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("message", { required: "Message is required" })}
              rows={3}
              placeholder="Describe your inquiry quantity, delivery requirements, etc..."
              className={`w-full border rounded-lg py-2 px-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2A7DE1]/30 focus:border-[#2A7DE1] ${
                errors.message ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.message && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.message.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#1A2E5B] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#2A7DE1] shadow-lg shadow-[#1A2E5B]/15 hover:shadow-xl hover:shadow-[#2A7DE1]/15 transition-all duration-300 uppercase tracking-wider cursor-pointer"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default ProductEnquiryModal;
