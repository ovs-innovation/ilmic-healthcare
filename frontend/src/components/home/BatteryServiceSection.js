import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiBattery, FiZap, FiPhone, FiX, FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";
import BatteryServiceServices from "@services/BatteryServiceServices";
import {
  IconPowerBadge,
  IconGenuine,
  IconDelivery,
  IconTechnical,
  IconWarranty,
  IconBatteryPack,
  IconEnergyUse,
  IconCustomers,
  IconOrderBox,
  IconSatisfaction,
  IconLiveSupport,
  IconCustomBattery,
  IconPhoneHandset,
  WhyIconTile,
} from "@components/home/WhyChooseIcons";

const WHY_FEATURES = [
  {
    Icon: IconGenuine,
    title: "100% Genuine Products",
    desc: "We deal in original & tested BMS, battery cells and components from trusted brands.",
    variant: "blue",
  },
  {
    Icon: IconDelivery,
    title: "Fast & Reliable Delivery",
    desc: "Quick order processing and pan India delivery to keep your projects on track.",
    variant: "green",
  },
  {
    Icon: IconTechnical,
    title: "Technical Expertise",
    desc: "Our team of experts provides technical guidance and after-sales support you can rely on.",
    variant: "red",
  },
  {
    Icon: IconWarranty,
    title: "Warranty & Support",
    desc: "All products come with assured warranty and dedicated customer support for peace of mind.",
    variant: "navy",
  },
];

const STATS = [
  {
    Icon: IconCustomers,
    value: "2500+",
    label: "Happy Customers",
    variant: "blue",
  },
  {
    Icon: IconOrderBox,
    value: "5000+",
    label: "Orders Delivered",
    variant: "green",
  },
  {
    Icon: IconSatisfaction,
    value: "98%",
    label: "Customer Satisfaction",
    variant: "amber",
  },
  {
    Icon: IconLiveSupport,
    value: "24/7",
    label: "Expert Support",
    variant: "navy",
  },
];

const CARD_HIGHLIGHTS = [
  {
    Icon: IconBatteryPack,
    label: "Indian-grade BMS, Cells & Battery Packs",
    variant: "blue",
  },
  { Icon: IconEnergyUse, label: "EV, Solar & Industrial Use", variant: "red" },
  { Icon: IconDelivery, label: "Pan India Fast Delivery", variant: "green" },
  { Icon: IconGenuine, label: "100% Tested & Genuine", variant: "navy" },
];

const BATTERY_TYPES = [
  "Lead Acid",
  "Lithium Ion",
  "Lithium Polymer",
  "AGM",
  "Gel",
  "Tubular",
  "VRLA",
  "Other",
];
const SERVICE_TYPES = [
  "Battery Repair",
  "Battery Reconditioning",
  "Battery Testing",
  "Battery Replacement",
  "Battery Maintenance",
  "Electrolyte Refilling",
  "Cell Replacement",
  "Charging Issue",
  "Leakage Fix",
  "Other",
];
const SERVICE_TAGS = [
  "Repair",
  "Reconditioning",
  "Testing",
  "Cell Replace",
  "Leakage Fix",
];

const inp =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0b1d3d] focus:ring-1 focus:ring-[#0b1d3d] transition-all bg-white";
const sel = `${inp} appearance-none cursor-pointer`;

const FL = ({ label, required, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const BatteryModal = ({ onClose }) => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneCountry: "+91",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    batteryBrand: "",
    batteryType: "",
    serviceType: "",
    problemDescription: "",
    preferredDate: "",
  });

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.batteryType ||
      !form.serviceType ||
      !form.problemDescription
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const fullPhone = `${form.phoneCountry} ${form.phone}`;
      const submissionData = { ...form, phone: fullPhone };
      await BatteryServiceServices.submitRequest(submissionData);
      toast.success("🔋 Request submitted! We will contact you shortly.");
      onClose();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to submit. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-center justify-center px-4"
        style={{ background: "rgba(0,0,0,0.55)" }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.93, opacity: 0, y: 18 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 18 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex"
          style={{ maxWidth: 900 }}
        >
          <div
            className="hidden md:flex flex-col justify-between w-[240px] flex-shrink-0 p-6"
            style={{
              background: "linear-gradient(155deg,#f5f7fa 0%,#e9ecf3 100%)",
              borderRight: "1px solid #e2e6ef",
            }}
          >
            <div>
              <div className="w-[72px] h-[72px] rounded-xl bg-gradient-to-br from-[#0b1d3d] to-[#1e3a6e] flex items-center justify-center shadow-md mb-4">
                <FiBattery className="w-9 h-9 text-white" />
              </div>

              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-gray-400 mb-0.5">
                Service Profile
              </p>
              <h3 className="text-[17px] font-black text-gray-900 leading-snug mb-4">
                Battery Repair
                <br />& Service
              </h3>

              {[
                { label: "Battery Types", value: "All Types" },
                { label: "Service Time", value: "Same Day" },
                { label: "Warranty", value: "Guaranteed", red: true },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                >
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">
                    {row.label}
                  </span>
                  <span
                    className={`text-[11px] font-black ${row.red ? "text-[#ED1C24]" : "text-gray-800"}`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}

              <p className="text-[11px] text-gray-500 leading-relaxed mt-4">
                Certified technicians for Lead Acid, Lithium Ion, Tubular &amp;
                all battery types. Affordable pricing with service guarantee.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4">
              {SERVICE_TAGS.map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-bold uppercase tracking-wide bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between px-6 pt-5 pb-3.5 border-b border-gray-100">
              <div>
                <h2 className="text-[17px] font-black text-gray-900 flex items-center gap-2">
                  <FiZap className="w-4 h-4 text-[#ED1C24] flex-shrink-0" />
                  Battery Service Request
                </h2>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mt-0.5">
                  Fill in your details &amp; battery information
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:border-gray-400 transition-all ml-3 flex-shrink-0"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-6 py-4 flex flex-col gap-3"
            >
              <div className="grid grid-cols-2 gap-4">
                <FL label="Full Name" required>
                  <input
                    className={inp}
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={set("name")}
                  />
                </FL>
                <FL label="Work Email" required>
                  <input
                    className={inp}
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={set("email")}
                  />
                </FL>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FL label="Phone Number" required>
                  <div className="flex gap-1.5">
                    <select
                      className="w-16 border border-gray-200 rounded-lg text-xs bg-gray-50 font-black px-1 focus:outline-none"
                      value={form.phoneCountry}
                      onChange={set("phoneCountry")}
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+61">🇦🇺 +61</option>
                    </select>
                    <input
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0b1d3d] focus:ring-1 focus:ring-[#0b1d3d] transition-all bg-white"
                      placeholder="Enter number"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                  </div>
                </FL>
                <FL label="Area Pincode">
                  <input
                    className={inp}
                    placeholder="Zip code"
                    value={form.pincode}
                    onChange={set("pincode")}
                  />
                </FL>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FL label="State">
                  <input
                    className={inp}
                    placeholder="Select State"
                    value={form.state}
                    onChange={set("state")}
                  />
                </FL>
                <FL label="District / City">
                  <input
                    className={inp}
                    placeholder="Select District"
                    value={form.city}
                    onChange={set("city")}
                  />
                </FL>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FL label="Battery Type" required>
                  <div className="relative">
                    <select
                      className={sel}
                      value={form.batteryType}
                      onChange={set("batteryType")}
                    >
                      <option value="">Select Battery Type</option>
                      {BATTERY_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </FL>
                <FL label="Service Required" required>
                  <div className="relative">
                    <select
                      className={sel}
                      value={form.serviceType}
                      onChange={set("serviceType")}
                    >
                      <option value="">Select Service Type</option>
                      {SERVICE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  </div>
                </FL>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FL label="Battery Brand / Model">
                  <input
                    className={inp}
                    placeholder="e.g. Exide FT0-150"
                    value={form.batteryBrand}
                    onChange={set("batteryBrand")}
                  />
                </FL>
                <FL label="Preferred Service Date">
                  <input
                    className={inp}
                    type="date"
                    value={form.preferredDate}
                    onChange={set("preferredDate")}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FL>
              </div>

              <FL
                label="Problem Description — what's wrong with the battery?"
                required
              >
                <textarea
                  className={`${inp} resize-none`}
                  rows={2}
                  placeholder="e.g. not holding charge, leaking, won't start, swollen cells..."
                  value={form.problemDescription}
                  onChange={set("problemDescription")}
                />
              </FL>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-lg bg-[#0b1d3d] hover:bg-[#162542] text-white font-black text-[11px] uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  "Submit Battery Service Request"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const BatteryServiceSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <BatteryModal onClose={() => setModalOpen(false)} />}

      <section className="bg-[#f3f5f8] py-12 sm:py-14 lg:py-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 lg:items-stretch mb-6 lg:mb-8">
            {/* Left — copy + product image (image stretches to match right column height) */}
            <div className="flex flex-col gap-5 sm:gap-6 min-h-0">
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2.5 mb-4">
                  <WhyIconTile variant="blue" size="sm">
                    <IconPowerBadge className="w-3.5 h-3.5" />
                  </WhyIconTile>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0088FF]">
                    Why Choose ILMIC Health Care
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-black text-[#0b1d3d] leading-[1.15] tracking-tight mb-4">
                  Powering India’s Energy Needs with Trusted{" "}
                  <span className="text-[#0088FF]">Battery Solutions</span>
                </h2>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
                  From high-performance BMS to custom battery packs, we deliver
                  rugged, reliable solutions built for India’s homes, EVs, solar
                  systems and factories.
                </p>
              </div>

              <div className="flex-1 min-h-[180px] max-h-[260px] lg:max-h-none rounded-2xl overflow-hidden bg-white shadow-[0_8px_40px_rgba(11,29,61,0.08)] border border-gray-100 flex flex-col sm:flex-row">
                {/* Image — left inside card */}
                <div className="relative w-full sm:w-[50%] lg:w-[48%] flex-shrink-0 min-h-[180px] sm:min-h-0 sm:self-stretch bg-[#fff7ed] border-b sm:border-b-0 sm:border-r border-gray-100">
                  <Image
                    src="/hero-medicines.png"
                    alt="Indian battery components and BMS solutions"
                    fill
                    sizes="(max-width: 640px) 100vw, 260px"
                    className="object-contain p-4 sm:p-5"
                  />
                </div>

                {/* Highlights — right inside card */}
                <div className="flex-1 flex flex-col justify-center px-4 py-4 sm:px-5 sm:py-5 lg:px-6 min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0088FF] mb-1.5">
                    Our Range
                  </p>
                  <h3 className="text-sm sm:text-[15px] font-black text-[#0b1d3d] leading-snug mb-3 sm:mb-4">
                    Complete Battery &amp; BMS Solutions
                  </h3>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {CARD_HIGHLIGHTS.map(({ Icon, label, variant }) => (
                      <li
                        key={label}
                        className="flex items-center gap-2.5 min-w-0"
                      >
                        <WhyIconTile variant={variant} size="sm">
                          <Icon className="w-[15px] h-[15px]" />
                        </WhyIconTile>
                        <span className="text-[11px] sm:text-xs font-semibold text-gray-600 leading-snug truncate">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right — 2×2 feature cards */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 content-start lg:content-stretch">
              {WHY_FEATURES.map(({ Icon, title, desc, variant }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-[0_2px_16px_rgba(11,29,61,0.05)] p-4 sm:p-5 lg:p-6 transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(11,29,61,0.08)] h-full flex flex-col"
                >
                  <WhyIconTile
                    variant={variant}
                    size="md"
                    className="mb-3 sm:mb-4"
                  >
                    <Icon className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" />
                  </WhyIconTile>
                  <h3 className="text-sm font-black text-[#0b1d3d] mb-1.5 sm:mb-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats + CTAs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(11,29,61,0.06)] px-5 sm:px-6 lg:px-8 py-6 sm:py-7 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 xl:gap-8">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 flex-1">
              {STATS.map(({ Icon, value, label, variant }) => (
                <li key={label} className="flex items-center gap-3 min-w-0">
                  <WhyIconTile variant={variant} size="stat">
                    <Icon className="w-[18px] h-[18px]" />
                  </WhyIconTile>
                  <span className="min-w-0">
                    <span className="block text-base sm:text-lg font-black text-[#0b1d3d] leading-none">
                      {value}
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-gray-500 mt-1 leading-snug">
                      {label}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <button
                type="button"
                id="battery-service-cta"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-[#0b1d3d] hover:bg-[#162542] text-white font-bold text-sm transition-colors shadow-[0_4px_16px_rgba(11,29,61,0.2)]"
              >
                <IconCustomBattery className="w-[18px] h-[18px]" />
                Customize Battery Pack
              </button>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-white border border-gray-200 hover:border-[#0b1d3d] text-[#0b1d3d] font-bold text-sm transition-colors"
              >
                <IconPhoneHandset className="w-[18px] h-[18px]" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BatteryServiceSection;
