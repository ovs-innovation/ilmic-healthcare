import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@layout/Layout";
import PageHero from "@components/ui/PageHero";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import LeadServices from "@services/LeadServices";
import ProductServices from "@services/ProductServices";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FiSend, FiPhoneCall } from "react-icons/fi";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { useContext } from "react";
import { UserContext } from "@context/UserContext";
import { useCart } from "react-use-cart";
import { ilmicCategories } from "@utils/ilmicDefaults";

const enquiryTypes = [
  ...ilmicCategories.map((c) => c.name),
  "Medical Tourism",
  "Hospital Management",
  "Export Enquiry",
  "General Enquiry",
];

const RequestAQuote = () => {
  const router = useRouter();
  const { state: { userInfo } } = useContext(UserContext);
  const { productSlug } = router.query;
  const { items, emptyCart } = useCart();
  const { showingTranslateValue } = useUtilsFunction();
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    if (!productSlug) return;
    ProductServices.getProductBySlug(productSlug)
      .then((res) => setSingleProduct(res))
      .catch(() => setSingleProduct(null));
  }, [productSlug]);

  const quoteItems = useMemo(() => {
    if (productSlug && singleProduct) {
      return [{
        id: singleProduct._id,
        name: showingTranslateValue(singleProduct.title) || singleProduct.title,
        quantity: 1,
        category: showingTranslateValue(singleProduct.category?.name),
      }];
    }
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      category: item.category,
    }));
  }, [productSlug, singleProduct, items, showingTranslateValue]);

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await LeadServices.addLead({
        ...data,
        user: userInfo?._id || userInfo?.id || null,
        enquiryType: data.enquiryType,
        product: {
          title: singleProduct
            ? showingTranslateValue(singleProduct.title)
            : "Product Quote Request",
          type: "quote_request",
          items: quoteItems,
        },
      });
      toast.success("Quote request submitted! Our team will contact you within 24 hours.");
      if (!productSlug) emptyCart();
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit quote request.");
    }
  };

  return (
    <Layout
      title="Request a Quote"
      description="Request a quote for ILMIC Health Care oncology, general pharma and surgical products."
    >
      <PageHero
        breadcrumb="Request Quote"
        title="Request a"
        highlight="Quote"
        subtitle="Bulk orders, export enquiries, and hospital supply — share your requirements and get pricing within 24 hours."
      />

      <section className="llmic-section bg-slate-50">
        <div className="llmic-container grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 llmic-card p-6 sm:p-8">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Product Quote Form</h2>

            {quoteItems.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-ilmic-blue-light border border-ilmic-blue-light">
                <p className="text-sm font-bold text-ilmic-blue-darker mb-2">Selected Products</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  {quoteItems.map((item) => (
                    <li key={item.id}>• {item.name} {item.quantity ? `(Qty: ${item.quantity})` : ""}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input {...register("name", { required: "Name is required" })} placeholder="Full Name *" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-ilmic-blue/20 focus:border-ilmic-blue outline-none" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input {...register("email", { required: "Email is required" })} type="email" placeholder="Email *" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-ilmic-blue/20 focus:border-ilmic-blue outline-none" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Phone is required", validate: (v) => (v && v.length > 8) || "Invalid phone" }}
                    render={({ field }) => (
                      <PhoneInput {...field} country="in" inputClass="!w-full !h-[46px] !rounded-xl !text-sm" buttonClass="!rounded-l-xl" containerClass="!w-full" />
                    )}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <select {...register("enquiryType", { required: true })} defaultValue="" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-ilmic-blue/20 focus:border-ilmic-blue outline-none">
                    <option value="" disabled>Enquiry Type *</option>
                    {enquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input {...register("country")} placeholder="Country" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-ilmic-blue/20 focus:border-ilmic-blue outline-none" />
                <input {...register("company")} placeholder="Company / Hospital Name" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-ilmic-blue/20 focus:border-ilmic-blue outline-none" />
              </div>

              <textarea {...register("message", { required: "Please describe your requirement" })} rows={4} placeholder="Product name, quantity, destination country, composition/strength if known..." className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-ilmic-blue/20 focus:border-ilmic-blue outline-none" />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}

              <button type="submit" className="llmic-btn llmic-btn-coral w-full !py-3.5">
                <FiSend /> Submit Quote Request
              </button>
            </form>
          </div>

          <div className="space-y-5">
            <div className="llmic-card p-6 bg-slate-900 text-white">
              <h3 className="font-black text-lg mb-3">Need Help?</h3>
              <p className="text-slate-300 text-sm mb-4">Call our export team for oncology and pharma enquiries.</p>
              <a href="tel:+918810272080" className="flex items-center gap-2 text-blue-200 font-bold"><FiPhoneCall /> +91 88102 72080</a>
              <a href="tel:+919217174829" className="flex items-center gap-2 text-blue-200 font-bold mt-2"><FiPhoneCall /> +91 92171 74829</a>
            </div>
            <div className="llmic-card p-6">
              <h3 className="font-black text-slate-900 mb-3">Hero Products</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>QLQ 10 — Softgel Capsule</li>
                <li>IMIC ENERGY — Capsules</li>
                <li>CTUXIL 500 — Tablet</li>
                <li>ABIRAMIC 250 — Oncology Tablet</li>
                <li>PACMIC 300 — Injection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RequestAQuote;
