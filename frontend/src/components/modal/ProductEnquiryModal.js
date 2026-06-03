import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FiZap, FiShoppingBag } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import MainModal from "@components/modal/MainModal";
import LeadServices from "@services/LeadServices";
import useUtilsFunction from "@hooks/useUtilsFunction";
import ProductBulkPricing from "@components/product/ProductBulkPricing";
import {
  clampQuantity,
  getEffectiveMinOrder,
  getEffectiveMaxOrder,
  getBulkEnquiryThreshold,
  getPricingSummary,
  getUnitPriceForQuantity,
} from "@utils/quantityPricing";

const ProductEnquiryModal = ({
  modalOpen,
  setModalOpen,
  product,
  selectedVariant,
  initialQuantity,
}) => {
  const { showingTranslateValue, getNumberTwo, currency } = useUtilsFunction();
  const [enquiryQty, setEnquiryQty] = useState(1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const bulkThreshold = product ? getBulkEnquiryThreshold(product) : 10;

  useEffect(() => {
    if (!product || !modalOpen) return;
    const start = initialQuantity
      ? clampQuantity(product, initialQuantity)
      : Math.max(getBulkEnquiryThreshold(product), getEffectiveMinOrder(product));
    setEnquiryQty(start);
  }, [product?._id, modalOpen, initialQuantity]);

  if (!product) return null;

  const pricing = getPricingSummary(product, enquiryQty);
  const productTitle =
    showingTranslateValue(selectedVariant?.title) ||
    showingTranslateValue(product?.title);
  const productImage =
    selectedVariant?.image?.length > 0
      ? selectedVariant.image[0]
      : product?.image?.[0];
  const productSKU = selectedVariant?.sku || product.sku || "N/A";
  const listPrice = product?.price || product?.prices?.price || 0;
  const maxOrder = getEffectiveMaxOrder(product);

  const onSubmitEnquiry = async (data) => {
    try {
      const { phoneCountry, phone, ...rest } = data;
      const fullPhone = `${phoneCountry || "+91"} ${phone}`;
      const summary = getPricingSummary(product, enquiryQty);

      const leadData = {
        ...rest,
        phone: fullPhone,
        quantity: summary.quantity,
        enquiryType: summary.isBulk ? "bulk" : "single",
        currency,
        listUnitPrice: summary.listUnitPrice,
        unitPrice: summary.unitPrice,
        estimatedTotal: summary.estimatedTotal,
        discountPercent: summary.discountPercent,
        tierLabel: summary.tierLabel,
        pricingNote: `Estimated @ ${currency}${summary.unitPrice}/pc for ${summary.tierLabel}`,
        product: {
          _id: product._id,
          title: product.title,
          sku: productSKU,
          slug: product.slug,
          images: product.image,
          price: product.price,
          quantityTiers: product.quantityTiers,
          minOrderQuantity: product.minOrderQuantity,
          maxOrderQuantity: product.maxOrderQuantity,
          category: product.category,
          description: product.description,
          variant: selectedVariant,
        },
      };

      await LeadServices.addLead(leadData);
      setModalOpen(false);
      toast.success("Quote request submitted! Our team will contact you shortly.");
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to submit enquiry."
      );
    }
  };

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="block w-full max-w-5xl my-0 sm:my-4 text-left bg-white shadow-2xl rounded-t-2xl sm:rounded-2xl relative max-h-[92vh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden min-w-0">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="sticky top-2 right-2 float-right z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-500 shadow-lg border border-gray-100 sm:absolute sm:right-4 sm:top-4"
          aria-label="Close"
        >
          <IoClose className="w-5 h-5" />
        </button>

        <div className="flex flex-col lg:flex-row min-w-0 clear-both">
          <div className="w-full lg:w-[38%] bg-gray-50/90 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-gray-100 min-w-0">
            <span className="text-[9px] font-black text-[#0b1d3d] uppercase tracking-[0.2em]">
              Bulk / wholesale quote
            </span>
            <h2 className="text-lg sm:text-xl font-black text-gray-900 mt-1 mb-3 leading-snug break-words">
              {productTitle}
            </h2>

            <div className="w-full max-w-[140px] mx-auto lg:mx-0 aspect-square relative bg-white rounded-xl border border-gray-100 p-2 mb-4">
              {productImage ? (
                <Image
                  src={productImage}
                  alt={productTitle}
                  fill
                  className="object-contain rounded-lg"
                  sizes="140px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                  ⚡
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs sm:text-sm mb-4">
              <div className="flex justify-between gap-2 py-1.5 border-b border-gray-200/60">
                <span className="text-gray-500 font-bold uppercase text-[9px]">SKU</span>
                <span className="font-bold text-gray-800">{productSKU}</span>
              </div>
              <div className="flex justify-between gap-2 py-1.5 border-b border-gray-200/60">
                <span className="text-gray-500 font-bold uppercase text-[9px]">List rate</span>
                <span className="font-bold text-gray-800">
                  {currency}
                  {getNumberTwo(listPrice)}/pc
                </span>
              </div>
            </div>

            <ProductBulkPricing
              product={product}
              currency={currency}
              selectedQty={enquiryQty}
              compact
            />
          </div>

          <div className="w-full lg:w-[62%] p-4 sm:p-6 flex flex-col min-w-0">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <FiZap className="w-4 h-4 text-amber-500" />
                <h3 className="text-base sm:text-lg font-black text-gray-900">
                  Request quantity quote
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                For bulk orders ({bulkThreshold}+ units recommended), submit your details.
                Pricing below updates automatically by quantity slab.
              </p>
            </div>

            {/* Quantity + live estimate */}
            <div className="rounded-xl border-2 border-[#0b1d3d]/10 bg-white p-3 sm:p-4 mb-4">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">
                Required quantity
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center border-2 border-[#0b1d3d]/15 rounded-xl">
                  <button
                    type="button"
                    onClick={() =>
                      setEnquiryQty((q) => clampQuantity(product, q - 1))
                    }
                    disabled={enquiryQty <= getEffectiveMinOrder(product)}
                    className="w-10 h-10 font-bold text-[#0b1d3d] disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="w-14 text-center font-black text-[#0b1d3d] text-lg">
                    {enquiryQty}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setEnquiryQty((q) => clampQuantity(product, q + 1))
                    }
                    disabled={maxOrder > 0 && enquiryQty >= maxOrder}
                    className="w-10 h-10 font-bold text-[#0b1d3d] disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
                <div className="flex-grow min-w-[160px]">
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Slab</p>
                  <p className="text-sm font-bold text-[#0b1d3d]">{pricing.tierLabel}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <p className="text-[9px] uppercase text-gray-400 font-bold">Unit price</p>
                  <p className="text-lg font-black text-[#ED1C24]">
                    {currency}
                    {getNumberTwo(pricing.unitPrice)}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase text-gray-400 font-bold">You save</p>
                  <p className="text-sm font-bold text-green-700">
                    {pricing.discountPercent > 0
                      ? `${pricing.discountPercent}%`
                      : "—"}
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-[9px] uppercase text-gray-400 font-bold">Est. total</p>
                  <p className="text-xl font-black text-[#0b1d3d]">
                    {currency}
                    {getNumberTwo(pricing.estimatedTotal)}
                  </p>
                  <p className="text-[9px] text-gray-400">+ GST / delivery as applicable</p>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4 flex items-start gap-2">
              <FiShoppingBag className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Need fewer than {bulkThreshold} units? Use <strong>Buy Now</strong> or{" "}
                <strong>Add to Cart</strong> on the product page for instant checkout.
              </span>
            </p>

            <form onSubmit={handleSubmit(onSubmitEnquiry)} className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                <input
                  type="checkbox"
                  id="isEnterprise"
                  {...register("isEnterprise")}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <label htmlFor="isEnterprise" className="text-[10px] font-bold text-gray-700 uppercase">
                  Enterprise / company order
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase">
                    Full name *
                  </label>
                  <input
                    {...register("name", { required: true })}
                    className={`w-full mt-0.5 border rounded-lg py-2 px-3 text-sm ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase">
                    Email *
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className={`w-full mt-0.5 border rounded-lg py-2 px-3 text-sm ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase">
                    Phone *
                  </label>
                  <div className="flex gap-1.5 mt-0.5">
                    <select
                      {...register("phoneCountry")}
                      className="w-[72px] border border-gray-200 rounded-lg text-xs font-bold px-1"
                    >
                      <option value="+91">+91</option>
                    </select>
                    <input
                      {...register("phone", { required: true })}
                      className={`flex-grow border rounded-lg py-2 px-3 text-sm ${
                        errors.phone ? "border-red-500" : "border-gray-200"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase">
                    Pincode *
                  </label>
                  <input
                    {...register("pincode", { required: true })}
                    className={`w-full mt-0.5 border rounded-lg py-2 px-3 text-sm ${
                      errors.pincode ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase">
                    State *
                  </label>
                  <input
                    {...register("state", { required: true })}
                    className={`w-full mt-0.5 border rounded-lg py-2 px-3 text-sm ${
                      errors.state ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase">
                    District *
                  </label>
                  <input
                    {...register("district", { required: true })}
                    className={`w-full mt-0.5 border rounded-lg py-2 px-3 text-sm ${
                      errors.district ? "border-red-500" : "border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase">
                  Address *
                </label>
                <input
                  {...register("address", { required: true })}
                  className={`w-full mt-0.5 border rounded-lg py-2 px-3 text-sm ${
                    errors.address ? "border-red-500" : "border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase">
                  Additional notes
                </label>
                <textarea
                  {...register("message")}
                  rows={2}
                  placeholder="Delivery timeline, GST invoice, etc."
                  className="w-full mt-0.5 border border-gray-200 rounded-lg py-2 px-3 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b1d3d] text-white py-3 rounded-xl hover:bg-[#162542] font-black text-xs uppercase tracking-widest shadow-lg active:scale-[0.98]"
              >
                Submit quote request — {currency}
                {getNumberTwo(pricing.estimatedTotal)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainModal>
  );
};

export default ProductEnquiryModal;
