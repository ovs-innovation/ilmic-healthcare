import React from "react";
import Layout from "@layout/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import EnquiryServices from "@services/EnquiryServices";
import { motion } from "framer-motion";
import { FiClock, FiMapPin, FiPhoneCall, FiMail, FiSend, FiShield } from "react-icons/fi";
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
  { icon: FiMail, title: "Email Us", lines: ["ilmic.healthcare@gmail.com"], href: "mailto:ilmic.healthcare@gmail.com", bg: "bg-purple-50", color: "text-purple-600" },
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
      <section className="relative py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="llmic-container text-center">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-4">Contact Us</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Get In Touch</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            For product enquiries, bulk orders, export, hospital supply & medical tourism.
          </p>
        </div>
      </section>

      <section className="llmic-container -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map((card) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="llmic-card p-6">
              <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-4`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
              {card.lines.map((line) =>
                card.href ? (
                  <a key={line} href={card.href} className="block text-sm text-slate-600 hover:text-ilmic-blue">{line}</a>
                ) : (
                  <p key={line} className="text-sm text-slate-600">{line}</p>
                )
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="llmic-section">
        <div className="llmic-container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="llmic-card p-8">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Send Enquiry</h2>
              <p className="text-slate-500 text-sm mb-6">Our team will respond within 24 hours.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
                    <input {...register("name", { required: "Required" })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 text-sm" placeholder="Your name" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone *</label>
                    <input {...register("phone", { required: "Required" })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 text-sm" placeholder="+91 88102 72080" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                  <input {...register("email")} type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 text-sm" placeholder="your@email.com" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Country</label>
                    <input {...register("country")} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 text-sm" placeholder="Your country" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enquiry Type *</label>
                    <select {...register("enquiryType", { required: true })} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 text-sm bg-white">
                      <option value="">Select type</option>
                      {enquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message *</label>
                  <textarea {...register("message", { required: "Required" })} rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-ilmic-blue/30 text-sm resize-none" placeholder="Product name, quantity, export destination..." />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" className="llmic-btn llmic-btn-coral w-full !py-3.5">
                  <FiSend className="w-4 h-4" /> Submit Enquiry
                </button>
                <p className="text-xs text-slate-400 flex items-center gap-1.5"><FiShield className="w-3.5 h-3.5 text-ilmic-blue" /> Your information is confidential.</p>
              </form>
            </div>

            <div className="space-y-6">
              <div className="llmic-card p-8 bg-ilmic-blue text-white">
                <h3 className="text-xl font-black mb-4">WhatsApp Us</h3>
                <p className="text-ilmic-blue-light text-sm mb-6">Fastest way to reach us for product & export enquiries.</p>
                <a href="https://wa.me/918810272080" target="_blank" rel="noopener noreferrer" className="llmic-btn bg-white text-ilmic-blue-dark hover:bg-ilmic-blue-light w-full">
                  <FaWhatsapp className="w-5 h-5" /> +91 88102 72080
                </a>
                <a href="https://wa.me/919217174829" target="_blank" rel="noopener noreferrer" className="llmic-btn llmic-btn-outline w-full mt-3 !border-white/40">
                  <FaWhatsapp className="w-5 h-5" /> +91 92171 74829
                </a>
              </div>
              <div className="llmic-card p-8">
                <h3 className="text-lg font-black text-slate-900 mb-4">Hero Products</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {["QLQ 10 — Softgel Capsule", "IMIC ENERGY — Capsules", "CTUXIL 500 — Tablet", "ABIRAMIC 250 — Oncology Tablet", "PACMIC 300 — Injection"].map((p) => (
                    <li key={p}><Link href="/products" className="text-ilmic-blue hover:text-ilmic-blue-dark font-medium">→ {p}</Link></li>
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
