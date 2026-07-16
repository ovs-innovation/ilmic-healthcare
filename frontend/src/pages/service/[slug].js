import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@layout/Layout";
import { useCart } from "react-use-cart";
import ServiceServices from "@services/ServiceServices";
import ProductServices from "@services/ProductServices";
import LeadServices from "@services/LeadServices";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { notifySuccess, notifyError } from "@utils/toast";
import { FiChevronRight, FiSend, FiX, FiMail, FiPhone, FiUser, FiMessageSquare } from "react-icons/fi";
import ProductCard from "@components/product/ProductCard";
import ProductEnquiryModal from "@components/modal/ProductEnquiryModal";
import { PRODUCT_GRID_CLASS, PRODUCT_GRID_ITEM_CLASS } from "@utils/productGrid";

const fallbackImage = "/no-result.svg";

// Custom styles for animations
const customStyles = `
  @keyframes shine {
    100% {
      left: 125%;
    }
  }
  .animate-shine {
    animation: shine 2s infinite;
  }
`;

// ─── Enquiry Modal ────────────────────────────────────────────────────────────
const EnquiryModal = ({ product, service, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      notifyError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await LeadServices.addLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        service: service?.name?.en || service?.name || "",
        product: product
          ? { id: product._id, title: product.title?.en || product.title || "N/A" }
          : null,
      });
      notifySuccess("Enquiry submitted successfully! We'll contact you soon.");
      onClose();
    } catch (err) {
      notifyError("Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F4C81] to-[#1E63B5] p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
          <p className="text-[#EAF4FF] text-xs font-black uppercase tracking-widest mb-1">
            Service Enquiry
          </p>
          <h3 className="text-xl font-black leading-tight">
            {product
              ? product.title?.en || product.title || "Product Enquiry"
              : "General Service Enquiry"}
          </h3>
          {service && (
            <p className="text-white/60 text-sm mt-1">
              Service: {service.name?.en || service.name}
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Full Name *
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full pl-9 pr-4 py-2.5 border border-[#D9E8F8] rounded-xl outline-none focus:border-[#0F4C81] transition-colors text-sm"
                />
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                Phone *
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 XXXXXXXXXX"
                  className="w-full pl-9 pr-4 py-2.5 border border-[#D9E8F8] rounded-xl outline-none focus:border-[#0F4C81] transition-colors text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
              Email *
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-2.5 border border-[#D9E8F8] rounded-xl outline-none focus:border-[#0F4C81] transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
              Message
            </label>
            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your requirement..."
                className="w-full pl-9 pr-4 py-2.5 border border-[#D9E8F8] rounded-xl outline-none focus:border-[#0F4C81] transition-colors text-sm resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#0F4C81] hover:bg-[#1E63B5] text-white font-black rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
            ) : (
              <>
                <FiSend className="w-4 h-4" />
                Submit Enquiry
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const ServiceDetails = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { showingTranslateValue } = useUtilsFunction();

  const [service, setService] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState(fallbackImage);
  const [enquiryTarget, setEnquiryTarget] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch service data
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    ServiceServices.getServiceBySlug(slug)
      .then((data) => {
        if (!data || data.message === "Service not found") {
          setNotFound(true);
        } else {
          setService(data);
          setImgSrc(data.icon || fallbackImage);
          setTimeout(() => setIsVisible(true), 100);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Fetch related products
  useEffect(() => {
    if (!slug) return;
    setProductsLoading(true);
    ProductServices.getProductsByService({ serviceSlug: slug })
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]);
      })
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, [slug]);

  const openEnquiry = (target) => {
    if (target === "general") {
      setEnquiryTarget(target);
      setShowModal(true);
    } else {
      // It's a product
      setEnquiryTarget(target);
      setShowModal(true);
    }
  };
  const closeEnquiry = () => {
    setShowModal(false);
    setEnquiryTarget(null);
  };

  const serviceName = service ? (showingTranslateValue(service.name) || "Service") : "Service";
  const serviceDesc = service ? (showingTranslateValue(service.description) || "") : "";

  // ── Loading State ──
  if (loading) {
    return (
      <Layout title="Loading Service...">
        <div className="min-h-[60vh] flex items-center justify-center bg-[#F8FBFF]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#0F4C81] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#5C728A] font-medium">Loading service details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // ── Not Found ──
  if (notFound) {
    return (
      <Layout title="Service Not Found">
        <div className="min-h-[60vh] flex items-center justify-center bg-[#F8FBFF]">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-4xl font-bold text-[#183153] mb-4">Service Not Found</h1>
            <p className="text-[#5C728A] mb-6">We couldn't find the service you're looking for.</p>
            <Link href="/services" className="px-8 py-3 bg-[#0F4C81] text-white rounded-full font-bold hover:bg-[#1E63B5] transition-all">
              Back to Services
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!service) return null;

  return (
    <Layout
      title={`${serviceName} | ILMIC Health Care`}
      description={serviceDesc ? serviceDesc.substring(0, 160) : `${serviceName} by ILMIC Health Care`}
    >
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Enquiry Modal */}
      {showModal && (
        enquiryTarget === "general" ? (
          <EnquiryModal
            product={null}
            service={service}
            onClose={closeEnquiry}
          />
        ) : (
          <ProductEnquiryModal
            modalOpen={showModal}
            setModalOpen={setShowModal}
            product={enquiryTarget}
            selectedVariant={enquiryTarget?.variants?.[0]}
          />
        )
      )}

      {/* ── Hero Section ── */}
      <div className="relative bg-gradient-to-br from-white via-[#F8FBFF] to-[#EAF4FF] text-[#183153] min-h-[380px] flex items-center overflow-hidden border-b border-[#D9E8F8]">
        <div className="absolute inset-0 z-10 pointer-events-none" />

        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAF4FF] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#EAF4FF] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-10 py-16 z-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Content */}
            <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-[#5C728A] text-xs mb-6 backdrop-blur-sm w-fit px-3 py-1.5 rounded-full border border-[#D9E8F8] bg-white transition-opacity hover:opacity-100 shadow-sm">
                <Link href="/" className="hover:text-[#0F4C81] transition-colors">Home</Link>
                <FiChevronRight className="w-3 h-3 text-[#5C728A]/50" />
                <Link href="/services" className="hover:text-[#0F4C81] transition-colors">Services</Link>
                <FiChevronRight className="w-3 h-3 text-[#5C728A]/50" />
                <span className="text-[#1E63B5] font-bold">{serviceName}</span>
              </div>

              <div className="inline-block px-4 py-1.5 bg-[#EAF4FF] border border-[#D9E8F8] text-[#1E63B5] rounded-lg text-xs font-black uppercase tracking-[0.2em] mb-6">
                {service.group || "Healthcare Services"}
              </div>

              <h1 className="text-4xl sm:text-6xl font-black leading-[1.1] mb-6 text-[#183153] tracking-tight">
                Premium <span className="text-[#0F4C81]">{serviceName}</span> Solutions
              </h1>

              {serviceDesc && (
                <p className="text-[#5C728A] text-lg max-w-2xl leading-relaxed mb-10 font-medium">
                  {serviceDesc.length > 220 ? serviceDesc.substring(0, 220) + "..." : serviceDesc}
                </p>
              )}

              <div className="flex flex-wrap gap-5 items-center">
                <button
                  onClick={() => openEnquiry("general")}
                  className="px-10 py-4 bg-[#0F4C81] hover:bg-[#1E63B5] text-white font-black rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(15,76,129,0.2)] flex items-center gap-3 overflow-hidden relative group"
                >
                  <span className="relative z-10 flex items-center gap-2 text-lg">
                    <FiSend className="w-5 h-5" />
                    Request a Quote
                  </span>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
                </button>
                <Link
                  href="/contact-us"
                  className="px-10 py-4 border-2 border-[#D9E8F8] hover:border-[#0F4C81] hover:bg-[#EAF4FF]/25 text-[#0F4C81] font-black rounded-2xl transition-all duration-300 flex items-center gap-2 group text-lg bg-white"
                >
                  <FiPhone className="w-5 h-5 text-[#1E63B5]" />
                  Expert Advice
                </Link>
              </div>

              {/* Trust markers */}
              <div className="mt-12 flex flex-wrap gap-8 items-center border-t border-[#D9E8F8] pt-8">
                {[
                  { label: "ISO Certified", val: "9001:2015" },
                  { label: "Service Areas", val: "Global Export & Local" },
                  { label: "Quick Connect", val: "24/7 Available" }
                ].map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-[#5C728A]/60 tracking-wider mb-0.5">{m.label}</span>
                    <span className="text-sm font-bold text-[#183153]">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — image frame */}
            <div className={`hidden lg:block relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}>
              {/* White Card Style */}
              <div className="relative z-20 p-8 rounded-[40px] bg-white border border-[#D9E8F8] shadow-xl overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0F4C81] to-[#1E63B5]" />

                <div className="flex items-center justify-between mb-8">
                  <div className="bg-[#EAF4FF] p-4 rounded-2xl border border-[#D9E8F8]">
                    <Image
                      src={imgSrc}
                      alt={serviceName}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-[#5C728A]/85 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Status</p>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Ready for Service
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-black text-[#183153] leading-tight">
                    Reliability Delivered, <br />
                    <span className="text-[#0F4C81]">Every Single Time.</span>
                  </h3>
                  <p className="text-[#5C728A] text-sm leading-relaxed font-medium">
                    Our {serviceName} team brings extensive medical industry experience to ensure your healthcare infrastructure remains resilient & efficient.
                  </p>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {["Fast Response", "Expert Doctors", "Full Compliance", "Global Support"].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-[#183153] bg-[#F8FBFF] p-3 rounded-xl border border-[#D9E8F8]">
                      <div className="w-5 h-5 rounded-full bg-[#EAF4FF] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#0F4C81]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>

                {/* Direct Action */}
                <button
                  onClick={() => openEnquiry("general")}
                  className="w-full py-4 bg-[#EAF4FF] hover:bg-[#EAF4FF]/80 border border-[#D9E8F8] text-[#0F4C81] font-black text-sm rounded-2xl transition-all flex items-center justify-center gap-3 group/btn"
                >
                  Get Immediate Consultation
                  <FiChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#0F4C81]/5 rounded-full blur-[80px] z-10" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1E63B5]/5 rounded-full blur-[60px] z-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#D9E8F8]/10 rounded-full z-0 opacity-20 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products Section ── */}
      <div className="bg-[#F8FBFF] py-16 border-b border-[#D9E8F8]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[#1E63B5] font-black uppercase tracking-widest text-xs mb-2">
                Related Products
              </p>
              <h2 className="text-3xl font-black text-[#0F4C81]">
                Products for <span className="text-[#1E63B5]">{serviceName}</span>
              </h2>
            </div>

            {products.length > 0 && (
              <button
                onClick={() => openEnquiry("general")}
                className="px-6 py-3 bg-[#0F4C81] text-white font-bold rounded-xl hover:bg-[#1E63B5] transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <FiSend className="w-4 h-4" />
                Enquire About Service
              </button>
            )}
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <div className={PRODUCT_GRID_CLASS}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse border border-[#D9E8F8]">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-10 bg-gray-200 rounded mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className={PRODUCT_GRID_CLASS}>
              {products.map((product) => (
                <div key={product._id} className={PRODUCT_GRID_ITEM_CLASS}>
                <ProductCard
                  product={product}
                  onEnquire={(p) => openEnquiry(p)}
                  overrideCategoryName={serviceName}
                />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-[#D9E8F8] rounded-[32px] p-10">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Products Yet</h3>
              <p className="text-gray-400 mb-6">
                Products for this service will appear here once they're added.
              </p>
              <button
                onClick={() => openEnquiry("general")}
                className="px-8 py-3 bg-[#0F4C81] text-white rounded-xl font-bold hover:bg-[#1E63B5] transition-all"
              >
                Enquire Directly
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Service Detail Content ── */}
      <div className="bg-white py-20 relative overflow-hidden">
        {/* Background dots pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#0F4C81 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        <div className="max-w-screen-xl mx-auto px-4 sm:px-10 relative z-10">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="mb-10">
                <p className="text-[#1E63B5] font-black uppercase tracking-[0.2em] text-xs mb-3">Service Deep Dive</p>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0F4C81] mb-8 leading-tight">
                  Comprehensive Overview of our <span className="text-[#1E63B5]">{serviceName}</span>
                </h2>
                <div className="w-20 h-1.5 bg-[#0F4C81] rounded-full mb-10" />

                {serviceDesc ? (
                  <div className="text-gray-600 text-lg leading-relaxed space-y-6">
                    {serviceDesc.split(". ").filter(Boolean).map((sentence, i) => (
                      sentence.length > 10 ? (
                        <p key={i} className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#EAF4FF] flex items-center justify-center text-[#0F4C81] text-[10px] font-black mt-1">
                            {i + 1}
                          </span>
                          <span>{sentence.trim()}{!sentence.endsWith(".") ? "." : ""}</span>
                        </p>
                      ) : null
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No detailed description available for this service.</p>
                )}
              </div>

              {/* Service Capabilities */}
              <div className="grid sm:grid-cols-2 gap-8 mt-16">
                {[
                  { title: "Standard Compliance", icon: "✓", desc: "All our solutions meet international safety and efficiency standards." },
                  { title: "Optimized Performance", icon: "⚡", desc: "Enhanced performance features to maximize equipment lifespan." },
                ].map((cap, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-[#D9E8F8] hover:border-[#1E63B5] hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-[#F8FBFF] border border-[#D9E8F8] rounded-2xl shadow-sm flex items-center justify-center text-[#0F4C81] text-2xl mb-6 group-hover:scale-110 transition-transform">{cap.icon}</div>
                    <h4 className="text-lg font-black text-[#0F4C81] mb-3">{cap.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                {/* Fast Callback Card */}
                <div className="bg-white border border-[#D9E8F8] rounded-[32px] p-8 text-[#183153] relative overflow-hidden shadow-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAF4FF] rounded-full blur-[60px] pointer-events-none opacity-40" />

                  <h4 className="text-xl font-black mb-4 text-[#0F4C81] relative z-10">Need Assistance?</h4>
                  <p className="text-[#5C728A] text-sm mb-8 relative z-10 leading-relaxed font-medium">
                    Request a quick callback from our team. We typically respond within 15 minutes during business hours.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 bg-[#F8FBFF] p-4 rounded-2xl border border-[#D9E8F8] group hover:border-[#1E63B5] transition-all cursor-pointer">
                      <div className="w-10 h-10 bg-[#EAF4FF] rounded-xl flex items-center justify-center text-[#0F4C81] font-bold">
                        <FiPhone />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-[#5C728A]/80 tracking-wider">Call Directly</p>
                        <p className="text-sm font-bold text-[#183153]">+91 9217174829</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#F8FBFF] p-4 rounded-2xl border border-[#D9E8F8] group hover:border-[#1E63B5] transition-all cursor-pointer">
                      <div className="w-10 h-10 bg-[#EAF4FF] rounded-xl flex items-center justify-center text-[#0F4C81] font-bold">
                        <FiMail />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-[#5C728A]/80 tracking-wider">Email Support</p>
                        <p className="text-sm font-bold text-[#183153]">ilmic.healthcare@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openEnquiry("general")}
                    className="w-full py-4 bg-[#0F4C81] hover:bg-[#1E63B5] text-white font-black rounded-2xl transition-all shadow-md"
                  >
                    Send Quick Request
                  </button>
                </div>

                {/* Quality Checklist */}
                <div className="bg-white rounded-[32px] p-8 border border-[#D9E8F8] shadow-sm">
                  <h4 className="text-lg font-black text-[#0F4C81] mb-6">Our Quality Standard</h4>
                  <ul className="space-y-4">
                    {["Tested Components", "Full Documentation", "Warranty Support", "Maintenance Plans"].map((v, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-[#5C728A]">
                        <div className="w-2 h-2 rounded-full bg-[#0F4C81]" />
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Why Partner Us ── */}
      <div className="bg-[#F8FBFF] py-20 border-t border-b border-[#D9E8F8]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-[#183153] mb-3">
              Why Partner With <span className="text-[#0F4C81]">ILMIC Health Care</span>?
            </h3>
            <div className="w-20 h-1 bg-[#0F4C81] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🏆", title: "Expertise", desc: "Decades of combined experience delivering world-class solutions." },
              { icon: "🛡️", title: "Reliability", desc: "High-standard manufacturing ensuring products perform when needed." },
              { icon: "🤝", title: "Support", desc: "Dedicated team for post-sale support and continuous innovation." },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#D9E8F8] rounded-3xl p-8 hover:border-[#1E63B5] hover:shadow-lg transition-all group">
                <div className="text-4xl mb-5 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                <h4 className="text-[#0F4C81] font-extrabold text-lg mb-3 group-hover:text-[#1E63B5] transition-colors">{item.title}</h4>
                <p className="text-[#5C728A] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-gradient-to-br from-[#F8FBFF] to-[#EAF4FF] py-16 border-b border-[#D9E8F8]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-10">
          <div className="bg-white border border-[#D9E8F8] rounded-[32px] p-10 sm:p-14 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#EAF4FF] rounded-full blur-[80px] opacity-60" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#EAF4FF] rounded-full blur-[80px] opacity-60" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0F4C81] mb-4">
                Ready to Get Started with {serviceName}?
              </h2>
              <p className="text-[#5C728A] text-lg mb-8 max-w-2xl mx-auto font-medium">
                Contact our team today and let us find the perfect solution for your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => openEnquiry("general")}
                  className="px-10 py-4 bg-[#0F4C81] hover:bg-[#1E63B5] text-white font-black rounded-full transition-all duration-300 shadow-xl shadow-[#0F4C81]/15"
                >
                  Get a Free Quote
                </button>
                <Link
                  href="/contact-us"
                  className="px-10 py-4 border-2 border-[#D9E8F8] text-[#0F4C81] font-black rounded-full hover:bg-[#EAF4FF] transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetails;
