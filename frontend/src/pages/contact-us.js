import React from "react";
import Layout from "@layout/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import EnquiryServices from "@services/EnquiryServices";
import { motion } from "framer-motion";
import { FiClock, FiMapPin, FiPhoneCall, FiMail, FiSend, FiShield, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { ilmicCategories } from "@utils/ilmicDefaults";

const enquiryTypes = [
  ...ilmicCategories.map((item) => item.name),
  "Medical Tourism",
  "Hospital Management",
  "Export Enquiry",
  "General Enquiry",
];

const contactCards = [
  { icon: FiClock, title: "Business Hours", lines: ["Mon – Sat: 9am – 7pm IST", "Sunday: Closed"], bg: "bg-ilmic-blue-light", color: "text-ilmic-blue" },
  { icon: FiMapPin, title: "Our Offices", lines: ["New Delhi, India", "Luanda, Republic of Angola"], bg: "bg-ilmic-blue-light", color: "text-ilmic-blue" },
  { icon: FiPhoneCall, title: "Call Us", lines: ["+91 88102 72080", "+91 92171 74829"], href: "tel:+918810272080", bg: "bg-blue-50", color: "text-blue-600" },
  { icon: FiMail, title: "Email Us", lines: ["info.ilmichealthcare@gmail.com"], href: "mailto:info.ilmichealthcare@gmail.com", bg: "bg-purple-50", color: "text-purple-600" },
];

const ContactUs = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await EnquiryServices.addEnquiry({ ...data, enquiryType: data.enquiryType || "General Enquiry" });
      toast.success("Enquiry submitted! We'll contact you within 24 hours.");
      reset();
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    }
  };

  return (
    <Layout title="Contact ILMIC Health Care" description="Contact ILMIC Health Care for oncology, general pharma, surgical products, export & medical tourism enquiries.">
      {/* Hero Section with balanced padding */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" aria-hidden />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <p className="text-blue-300 text-sm font-black uppercase tracking-widest">Contact Us</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">Get In Touch</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            For product enquiries, bulk orders, export, hospital supply & medical tourism.
          </p>
        </div>
      </section>

      {/* Cards Section - Positioned inline with equal padding on all sides to prevent overlap cramps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {contactCards.map((card) => (
            <motion.div 
              key={card.title} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
            >
              <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 flex-shrink-0 shadow-sm`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-3 tracking-wide">{card.title}</h3>
              <div className="space-y-2 flex-grow">
                {card.lines.map((line) =>
                  card.href ? (
                    <a key={line} href={card.href} className="block text-sm text-slate-600 hover:text-ilmic-blue font-semibold transition-colors break-all">{line}</a>
                  ) : (
                    <p key={line} className="text-sm text-slate-600 font-medium">{line}</p>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form and CTA Section */}
      <section className="llmic-section bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            {/* Left side: Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-[20px] border-[1.5px] border-[#D8DEE8] shadow-[0_10px_30px_rgba(15,58,102,0.03)]">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Send Enquiry</h2>
              <p className="text-slate-500 text-sm mb-8">Our team will respond within 24 hours.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
                    <input 
                      {...register("name", { required: "Required" })} 
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 focus:border-ilmic-blue/50 text-sm transition-all duration-300" 
                      placeholder="Your name" 
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone *</label>
                    <input 
                      {...register("phone", { required: "Required" })} 
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 focus:border-ilmic-blue/50 text-sm transition-all duration-300" 
                      placeholder="+91 88102 72080" 
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                  <input 
                    {...register("email")} 
                    type="email" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 focus:border-ilmic-blue/50 text-sm transition-all duration-300" 
                    placeholder="your@email.com" 
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Country</label>
                    <input 
                      {...register("country")} 
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 focus:border-ilmic-blue/50 text-sm transition-all duration-300" 
                      placeholder="Your country" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enquiry Type *</label>
                    <select 
                      {...register("enquiryType", { required: true })} 
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 focus:border-ilmic-blue/50 text-sm bg-white cursor-pointer transition-all duration-300"
                    >
                      <option value="">Select type</option>
                      {enquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message *</label>
                  <textarea 
                    {...register("message", { required: "Required" })} 
                    rows={4} 
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 focus:border-ilmic-blue/50 text-sm resize-none transition-all duration-300" 
                    placeholder="Product name, quantity, export destination..." 
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.message.message}</p>}
                </div>
                
                {/* Refined modern CTA button */}
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center w-full bg-ilmic-blue hover:bg-ilmic-blue-dark text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-250 cursor-pointer gap-2"
                >
                  <FiSend className="w-4 h-4 text-white" /> Submit Enquiry
                </button>
                
                <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium"><FiShield className="w-3.5 h-3.5 text-ilmic-blue" /> Your information is confidential.</p>
              </form>
            </div>

            {/* Right side: Sidebar info */}
            <div className="lg:col-span-5 flex flex-col gap-6 h-full justify-between">
              {/* WhatsApp Call Out */}
              <div className="bg-[#0F3A66] p-8 rounded-3xl text-white flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-black mb-2">WhatsApp Us</h3>
                <p className="text-blue-100 text-sm mb-6 font-medium">Fastest way to reach us for product & export enquiries.</p>
                <div className="space-y-3">
                  <a href="https://wa.me/918810272080" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full bg-white hover:bg-slate-100 text-[#0F3A66] py-3.5 rounded-xl font-bold transition-all duration-300 gap-2 shadow-md cursor-pointer">
                    <FaWhatsapp className="w-5 h-5 text-[#25D366]" /> +91 88102 72080
                  </a>
                  <a href="https://wa.me/919217174829" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full bg-transparent hover:bg-white/10 text-white border border-white/20 py-3.5 rounded-xl font-bold transition-all duration-300 gap-2 cursor-pointer">
                    <FaWhatsapp className="w-5 h-5 text-[#25D366]" /> +91 92171 74829
                  </a>
                </div>
              </div>

              {/* Hero Products List */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-black text-slate-900 mb-4">Hero Products</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    "QLQ 10 — Softgel Capsule", 
                    "IMIC ENERGY — Capsules", 
                    "CTUXIL 500 — Tablet", 
                    "ABIRAMIC 250 — Oncology Tablet", 
                    "PACMIC 300 — Injection"
                  ].map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <FiChevronRight className="w-4 h-4 text-ilmic-blue flex-shrink-0" />
                      <Link href="/products" className="text-ilmic-blue hover:text-ilmic-blue-dark font-semibold transition-colors">{p}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
