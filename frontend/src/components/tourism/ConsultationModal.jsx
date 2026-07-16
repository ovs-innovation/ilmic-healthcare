import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPhone, FiCheckCircle } from "react-icons/fi";
import LeadServices from "@services/LeadServices";
import { notifySuccess, notifyError } from "@utils/toast";

const getModalDetails = (pageType) => {
  switch (pageType) {
    case "medical-tourism":
      return {
        title: "Book Medical Consultation",
        serviceName: "Medical Tourism",
        placeholderMsg: "Share your treatment requirements or medical conditions..."
      };
    case "hospital-management":
      return {
        title: "Request Hospital Management Consultation",
        serviceName: "Hospital Management",
        placeholderMsg: "Describe your hospital facility and operation support needs..."
      };
    case "pharmaceutical-export":
      return {
        title: "Pharmaceutical Export Enquiry",
        serviceName: "Pharmaceutical Export",
        placeholderMsg: "Specify medicines required, quantities, and target port..."
      };
    case "hospital-accessories-supply":
      return {
        title: "Request Supply Quotation",
        serviceName: "Hospital Accessories Supply",
        placeholderMsg: "List surgical instruments or hospital accessories needed..."
      };
    case "international-medical-conferences":
      return {
        title: "Register Your Interest",
        serviceName: "International Medical Conferences",
        placeholderMsg: "Let us know your attendance mode or registration requirements..."
      };
    default:
      return {
        title: "Request Free Consultation",
        serviceName: "General Enquiry",
        placeholderMsg: "How can our medical team assist you today?"
      };
  }
};

const ConsultationModal = ({ isOpen, onClose, pageType }) => {
  const details = getModalDetails(pageType);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    company: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  // Lock and restore background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ESC key press handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.country) {
      notifyError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const formattedMessage = `[Country: ${form.country}] [Company/Hospital: ${form.company || "Not specified"}] ${form.message}`;
      await LeadServices.addLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: formattedMessage,
        service: details.serviceName
      });

      notifySuccess("Enquiry submitted successfully! Our expert desk will contact you shortly.");
      setForm({ name: "", email: "", phone: "", country: "", company: "", message: "" });
      onClose();
    } catch (err) {
      notifyError("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100/80 overflow-hidden flex flex-col p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto scrollbar-thin"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-slate-600 transition-colors p-1.5 hover:bg-slate-100 rounded-full cursor-pointer z-20"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1 mb-6 pr-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-ilmic-blue">
                DIRECT ENQUIRY PORTAL
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-ilmic-text leading-tight tracking-tight">
                {details.title}
              </h3>
              <p className="text-slate-500 text-xs font-semibold">
                Submit details below to connect with our specialized trade desk.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="modal-name" className="text-[10px] sm:text-xs font-black uppercase text-ilmic-text">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-ilmic-blue focus:bg-white transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label htmlFor="modal-email" className="text-[10px] sm:text-xs font-black uppercase text-ilmic-text">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-ilmic-blue focus:bg-white transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div className="space-y-1">
                  <label htmlFor="modal-phone" className="text-[10px] sm:text-xs font-black uppercase text-ilmic-text">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-ilmic-blue focus:bg-white transition-all"
                    placeholder="+91 99999 99999"
                  />
                </div>

                {/* Country */}
                <div className="space-y-1">
                  <label htmlFor="modal-country" className="text-[10px] sm:text-xs font-black uppercase text-ilmic-text">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-country"
                    type="text"
                    name="country"
                    required
                    value={form.country}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-ilmic-blue focus:bg-white transition-all"
                    placeholder="e.g. Dubai, India, Angola"
                  />
                </div>
              </div>

              {/* Company / Hospital (Optional) */}
              <div className="space-y-1">
                <label htmlFor="modal-company" className="text-[10px] sm:text-xs font-black uppercase text-ilmic-text">
                  Company / Hospital <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="modal-company"
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-ilmic-blue focus:bg-white transition-all"
                  placeholder="e.g. City General Hospital"
                />
              </div>

              {/* Service (Read-only Indicator) */}
              <div className="space-y-1">
                <label className="text-[10px] sm:text-xs font-black uppercase text-ilmic-text">
                  Pre-selected Service
                </label>
                <input
                  type="text"
                  readOnly
                  disabled
                  value={details.serviceName}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 cursor-not-allowed select-none"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="modal-message" className="text-[10px] sm:text-xs font-black uppercase text-ilmic-text">
                  Enquiry Message
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows="3"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-ilmic-blue focus:bg-white transition-all resize-none"
                  placeholder={details.placeholderMsg}
                />
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-ilmic-blue hover:bg-ilmic-blue-dark text-white rounded-xl py-3 font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
                <a
                  href="tel:+918810272080"
                  className="w-full border border-slate-200 hover:bg-slate-50 text-ilmic-text rounded-xl py-3 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiPhone className="w-4 h-4 text-ilmic-blue" />
                  Call Now
                </a>
              </div>
            </form>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-500 border-t border-slate-100 mt-6 pt-4">
              <span className="flex items-center justify-center gap-1">
                <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 shrink-0" />
                Response within 24h
              </span>
              <span className="flex items-center justify-center gap-1 border-x border-slate-100">
                <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 shrink-0" />
                Secure & Confidential
              </span>
              <span className="flex items-center justify-center gap-1">
                <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5 shrink-0" />
                Global Support Team
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsultationModal;
