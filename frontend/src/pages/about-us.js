import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  FiChevronRight,
  FiShield,
  FiTarget,
  FiEye,
  FiGlobe,
  FiAward,
  FiUsers,
  FiHeart,
  FiMaximize2,
  FiZoomIn,
  FiZoomOut,
  FiX,
  FiCompass,
  FiTrendingUp,
  FiMail,
  FiExternalLink,
  FiBookOpen,
  FiBriefcase
} from "react-icons/fi";
import Layout from "@layout/Layout";
import { whyChooseUs } from "@utils/ilmicDefaults";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const DEFAULT_PROFILE_IMG = "/maroof.jpeg";
const DEFAULT_MD_IMG = "/maroof.jpeg";
const DEFAULT_MIDDLE_IMG = "/about-pharma.png";
const DEFAULT_HEADER_BG = "/about-banner.jpg";

const resolveAboutImage = (value, fallback) => {
  if (!value || typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  // Heavy legacy PNG — prefer optimized jpeg
  if (trimmed === "/maaroof.png" || trimmed.endsWith("/maaroof.png")) {
    return fallback || DEFAULT_PROFILE_IMG;
  }
  // Ignore stock demo placeholders from old store settings
  if (
    trimmed.includes("dkuwefj17/image/upload") ||
    trimmed.includes("team-1_acjmv7") ||
    trimmed.includes("v7g6gowiju0wanpwx70f") ||
    trimmed.includes("sl8vzvzm54jgzq6sphn2") ||
    trimmed.includes("yw3cd2xupqwqpqcbxv9l")
  ) {
    return fallback;
  }
  return trimmed;
};

// Animated counter component that triggers when in view
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);
  const [hasRun, setHasRun] = useState(false);

  const startAnimate = () => {
    if (hasRun) return;
    setHasRun(true);
    const end = parseInt(value.replace(/\D/g, ""));
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    const duration = 900;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  };

  const suffix = value.includes("+") ? "+" : "";
  const prefix = value.startsWith("$") ? "$" : "";

  return (
    <motion.span onViewportEnter={startAnimate} viewport={{ once: true }}>
      {prefix}{hasRun ? count : 0}{suffix}
    </motion.span>
  );
};

const AboutUs = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const timelineRef = useRef(null);
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const aboutSettings = storeCustomizationSetting?.about_us || {};
  const heroBgImage = resolveAboutImage(
    aboutSettings.header_bg,
    DEFAULT_HEADER_BG
  );
  const companyProfileImage = resolveAboutImage(
    aboutSettings.content_right_img || aboutSettings.founder_one_img,
    DEFAULT_PROFILE_IMG
  );
  const middleImage = resolveAboutImage(
    aboutSettings.content_middle_Img,
    DEFAULT_MIDDLE_IMG
  );
  const mdImage = resolveAboutImage(
    aboutSettings.founder_one_img || aboutSettings.content_right_img,
    DEFAULT_MD_IMG
  );
  const startupIndiaCert = resolveAboutImage(
    aboutSettings.startup_india_cert,
    "/img3.jpeg"
  );
  const startupIndiaThumb = resolveAboutImage(
    aboutSettings.startup_india_thumb,
    "/img2.jpeg"
  );
  const udyamCert = resolveAboutImage(
    aboutSettings.udyam_cert,
    "/img1.jpeg"
  );
  const mdName =
    showingTranslateValue(aboutSettings.founder_one_name) || "Mr. Maroof Reza";
  const mdRole =
    showingTranslateValue(aboutSettings.founder_one_sub) || "Managing Director";

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenCert = (cert) => {
    setSelectedCert(cert);
    setZoomLevel(1);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.75));

  const timelineEvents = [
    { year: "2021", title: "Company Incorporated", desc: "Registered under the Companies Act, 2013 with ROC Delhi & NCR, focusing exclusively on domestic and international healthcare needs." },
    { year: "2022", title: "Started Pharmaceutical Export", desc: "Launched dedicated anti-cancer and general pharma export operations to African markets and Dubai." },
    { year: "2023", title: "Recognized by Startup India", desc: "Obtained official recognition from Department for Promotion of Industry and Internal Trade (DPIIT) and expanded international healthcare consulting." },
    { year: "2024", title: "Hospital Management Expansion", desc: "Increased footprint in global hospital management operations, handling logistics, medical staffing, and supplies for 50+ facilities abroad." },
    { year: "2025", title: "Serving Multiple Markets", desc: "Consolidated a reliable pharmaceutical supply chain across 8+ major countries, connecting patients globally to premier Indian medical services." }
  ];

  const services = [
    { title: "Pharmaceutical Export", icon: FiGlobe, desc: "Exporting Oncology and General Pharmaceutical formulations globally with regulatory clearances." },
    { title: "Oncology Medicines", icon: FiHeart, desc: "Providing premium specialty chemotherapy and targeted oncology treatments under our own trusted brands." },
    { title: "General Pharma", icon: FiShield, desc: "Supplying wide-ranging therapeutics, supplements, and cardiovascular medicines for family wellness." },
    { title: "Hospital Management", icon: FiUsers, desc: "Consulting and managing clinical operations, medical infrastructure, and logistics for international hospitals." },
    { title: "Medical Tourism", icon: FiCompass, desc: "Guiding global patients to accredited Indian hospitals for low-cost, high-quality operations and treatment packages." },
    { title: "International Conferences", icon: FiAward, desc: "Organizing global medical training, doctor roundtables, and clinical skill development events." },
    { title: "Hospital Accessories Supply", icon: FiBriefcase, desc: "Sourcing premium surgical tools, disposable hospital wear, clinical machinery, and critical care units." }
  ];

  const highlights = [
    { count: "2021", label: "Founded", desc: "Registered in NCR Delhi" },
    { count: "50+", label: "Hospitals Managed", desc: "International Operations" },
    { count: "8+", label: "International Markets", desc: "Active Sourcing Hubs" },
    { count: "5+", label: "Years of Export Experience", desc: "Trusted Global Supplier" },
    { count: "100+", label: "Healthcare Products", desc: "Oncology & General Pharma" },
    { count: "3", label: "Core Business Divisions", desc: "Pharma, Hospital, Tourism" }
  ];

  const focusAreas = [
    { title: "Hospital Management", icon: FiUsers, desc: "Managing more than 50 hospitals internationally, supporting healthcare infrastructure setup, staffing, and clinical workflows." },
    { title: "Medical Tourism", icon: FiCompass, desc: "Helping international patients receive top-tier, quality healthcare in India with visa support and translational escorts." },
    { title: "Global Pharmaceutical Export", icon: FiGlobe, desc: "Exporting lifesaving specialized medicines to multiple countries, strictly adhering to global cold chain logistics protocols." },
    { title: "Healthcare Innovation", icon: FiTrendingUp, desc: "Providing modern digital healthcare consultations, surgical support software, and hospital administration solutions." }
  ];

  const certifications = [
    { title: "Startup India Recognition Certificate", image: startupIndiaThumb, description: "Recognized as a startup by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India." },
    { title: "Udyam Registration Certificate", image: udyamCert, description: "Registered under the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India." }
  ];

  const whyChooseUsCards = [
    { title: "Trusted Export Partner", desc: "Over 5 years of certified pharmaceutical exports with zero cargo delay records." },
    { title: "Quality Assurance", desc: "All medicines are sourced from WHO-GMP compliant, fully licensed manufacturing plants." },
    { title: "International Network", desc: "Direct logistical offices in Luanda (Angola) and New Delhi (India) for rapid distribution." },
    { title: "Hospital Expertise", desc: "Deep operational background managing over 50 hospitals globally." },
    { title: "Medical Tourism Specialists", desc: "Comprehensive patient care, transparent treatments, and dedicated personal assistants." },
    { title: "Fast Response", desc: "24/7 dedicated account managers for bulk export queries and patient enquiries." }
  ];

  return (
    <Layout
      title="About Us - ILMIC Health Care Pvt. Ltd."
      description="ILMIC Health Care Pvt. Ltd. is a premier Indian pharmaceutical exporter, hospital management consultant, and medical tourism operator. Established in 2021, Noida."
    >
      {/* ── SECTION 1: HERO BANNER ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#0F3A66]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBgImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E2E52]/95 via-[#0F3A66]/85 to-[#1A5288]/75" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-4xl space-y-6"
          >
            <span className="inline-flex px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-black uppercase tracking-widest">
              About Company
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
              ILMIC <span className="text-blue-300">Health Care Pvt. Ltd.</span>
            </h1>
            <p className="text-blue-50/90 text-lg sm:text-xl leading-relaxed max-w-3xl font-medium">
              Trusted Pharmaceutical Exporter • Hospital Management • Medical Tourism • Surgical & Healthcare Solutions
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/contact-us" className="inline-flex items-center justify-center bg-ilmic-blue hover:bg-ilmic-blue-dark text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                Contact Us
              </Link>
              <Link href="/products" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/25 border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: COMPANY OVERVIEW ── */}
      <section className="llmic-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-[4/3] w-full group"
            >
              <Image
                src={companyProfileImage}
                alt="Mr. Maroof Reza — ILMIC Health Care"
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized={companyProfileImage?.startsWith("http")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-white font-extrabold text-lg drop-shadow">{mdName}</p>
                <p className="text-white/85 text-xs font-bold uppercase tracking-widest">{mdRole}</p>
              </div>
            </motion.div>

            {/* Right Column: Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-ilmic-blue uppercase tracking-widest">
                <FiUsers className="w-4 h-4" /> Company Profile
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Pioneering Professional Healthcare Globally
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong>ILMIC HEALTH CARE PVT. LTD.</strong> was incorporated on <strong>28th August 2021</strong> under the Companies Act, 2013 and is registered with the Registrar of Companies, Delhi & NCR.
                </p>
                <p>
                  Since its establishment, the company has remained dedicated exclusively to the healthcare sector, serving both domestic and international markets with high-grade integrity and standard operations.
                </p>
                <p className="font-semibold text-slate-900 mb-2">Our diverse business interests include:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {[
                    "Pharmaceutical Products",
                    "Oncology Medicines",
                    "General Pharma",
                    "Hospital Management",
                    "Hospital Accessories & Surgical Supplies",
                    "Medical Tourism",
                    "Healthcare Consultancy",
                    "International Healthcare Services"
                  ].map((interest) => (
                    <div key={interest} className="flex items-center gap-2 text-sm font-semibold">
                      <FiChevronRight className="w-4 h-4 text-[#ED1C24] flex-shrink-0" />
                      <span>{interest}</span>
                    </div>
                  ))}
                </div>
                <p className="pt-2">
                  Our corporate offices in <strong>New Delhi (India)</strong> and <strong>Luanda (Republic of Angola)</strong> support international operations and business expansion across multiple countries.
                </p>
              </div>
              <div className="pt-4">
                <Link href="#our-services" className="inline-flex items-center justify-center bg-[#0F3A66] hover:bg-[#0b2848] text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                  Learn More <FiChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: COMPANY HIGHLIGHTS ── */}
      <section className="llmic-section-sm bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]" aria-hidden />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-black text-blue-300">
                  <Counter value={item.count} />
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-white mt-2 tracking-wide uppercase">
                  {item.label}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-1 leading-snug">
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: OUR JOURNEY (TIMELINE) ── */}
      <section className="llmic-section bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black text-[#ED1C24] uppercase tracking-widest">Our Milestones</span>
            <h2 className="llmic-heading">Journey of Exponential Growth</h2>
            <p className="text-slate-500 text-sm">How we evolved from a startup to a trusted global medical network.</p>
          </div>

          <div className="relative max-w-5xl mx-auto pl-10 md:pl-0" ref={timelineRef}>
            {/* Central Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" aria-hidden />
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-ilmic-blue -translate-x-1/2"
              aria-hidden
            />

            <div className="space-y-12">
              {timelineEvents.map((ev, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={i} className="relative flex flex-col md:flex-row items-stretch md:justify-between w-full">
                    {/* Timeline dot */}
                    <div
                      className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-10 w-4 h-4 rounded-full bg-slate-900 border-4 border-slate-50 shadow-md ring-2 ring-ilmic-blue"
                    />

                    {/* Left Panel */}
                    <div className={`w-full md:w-[45%] flex justify-end text-right ${isEven ? "block" : "hidden md:flex pointer-events-none opacity-0"}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35 }}
                        className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 text-left w-full h-full flex flex-col justify-center cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <span className="text-[#ED1C24] text-xs font-black uppercase tracking-wider">{ev.year}</span>
                        <h4 className="font-extrabold text-slate-800 text-base mt-1 mb-2">{ev.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{ev.desc}</p>
                      </motion.div>
                    </div>

                    {/* Center Year Badge (desktop only) */}
                    <div
                      className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-ilmic-blue text-white font-black text-xs shadow-md z-10 absolute left-1/2 -translate-x-1/2 top-2"
                    >
                      {ev.year}
                    </div>

                    {/* Right Panel */}
                    <div className={`w-full md:w-[45%] flex justify-start text-left ${!isEven ? "block" : "hidden md:flex pointer-events-none opacity-0"}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35 }}
                        className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-slate-100 text-left w-full h-full flex flex-col justify-center cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <span className="text-[#ED1C24] text-xs font-black uppercase tracking-wider">{ev.year}</span>
                        <h4 className="font-extrabold text-slate-800 text-base mt-1 mb-2">{ev.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{ev.desc}</p>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: INTRODUCTION (SPLIT LAYOUT) ── */}
      <section className="llmic-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100 group"
            >
              <Image
                src={middleImage}
                alt="WHO-GMP Laboratory Testing"
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 40vw"
                unoptimized={middleImage?.startsWith("http")}
              />
              <div className="absolute inset-0 bg-[#0F3A66]/10 mix-blend-overlay" />
            </motion.div>

            {/* Right side: Who We Are */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-ilmic-blue uppercase tracking-widest">
                <FiCompass className="w-4 h-4" /> Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                One of India's Fastest-Growing Healthcare Entities
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong>ILMIC HEALTH CARE PVT. LTD.</strong> is one of India's fastest-growing privately held pharmaceutical companies headquartered in New Delhi.
                </p>
                <p>
                  Over the last five years, the company has built a strong international presence by exporting high-quality Oncology and General Pharmaceutical medicines while expanding into multiple healthcare services.
                </p>
                <p className="font-semibold text-slate-900 mb-2">Our expertise includes:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
                  {[
                    "Pharmaceutical Exports",
                    "Oncology Medicines",
                    "General Pharma",
                    "Medical Tourism",
                    "International Medical Conferences",
                    "Hospital Management",
                    "Doctor-on-call Services",
                    "Critical Surgery Support",
                    "Hospital Accessories Supply",
                    "Healthcare Training Programs"
                  ].map((exp) => (
                    <div key={exp} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-ilmic-blue" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <p className="font-semibold text-slate-900 mb-3">We currently serve clients across:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Dubai", "Angola", "Cameroon", "Namibia", "Ethiopia",
                      "Uzbekistan", "CIS Countries"
                    ].map((market) => (
                      <span
                        key={market}
                        className="px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide bg-ilmic-blue-soft border border-ilmic-border text-ilmic-blue-dark"
                      >
                        {market}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: OUR SERVICES ── */}
      <section id="our-services" className="llmic-section bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black text-[#ED1C24] uppercase tracking-widest">Global Solutions</span>
            <h2 className="llmic-heading">Our Core Business Services</h2>
            <p className="text-slate-500 text-sm">Providing complete, reliable healthcare and surgical operations internationally.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(24,minmax(0,1fr))] gap-6 items-stretch">
            {services.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-ilmic-blue/30 hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full ${i < 4
                  ? "lg:col-span-6"
                  : i === 4
                    ? "lg:col-span-6 lg:col-start-4"
                    : "lg:col-span-6"
                  }`}
              >
                <div className="w-12 h-12 rounded-xl bg-ilmic-blue-light text-ilmic-blue flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: MANAGEMENT ── */}
      <section className="llmic-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side: MD image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-slate-200 group"
            >
              <Image
                src={mdImage}
                alt={mdName}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 40vw"
                unoptimized={mdImage?.startsWith("http")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                <h4 className="font-black text-xl text-white">{mdName}</h4>
                <p className="text-xs font-extrabold text-blue-200 uppercase tracking-widest mt-1">{mdRole}</p>
                <span className="inline-block mt-3 text-[11px] font-bold text-white/70 uppercase tracking-widest">
                  Executive Board Portfolio
                </span>
              </div>
            </motion.div>

            {/* Right side: Organization Profile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-ilmic-blue uppercase tracking-widest">
                <FiAward className="w-4 h-4" /> Board of Management
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Management & Organisation
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  Our organization is led by our Managing Director, <strong>{mdName}</strong>, who possesses extensive experience in the healthcare sector.
                </p>
                <p>
                  Under his leadership, ILMIC Health Care continues to expand internationally while maintaining a strong commitment to quality, innovation, and patient-focused healthcare solutions.
                </p>
              </div>

              {/* Three feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 items-stretch">
                {[
                  { title: "Leadership", desc: "Decades of combined healthcare experience guiding global operations." },
                  { title: "Global Vision", desc: "Aiming to build seamless bridges between Indian medicine and global patients." },
                  { title: "Healthcare Expertise", desc: "Deep clinical and regulatory compliance understanding." }
                ].map((feat) => (
                  <div key={feat.title} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2 flex flex-col h-full">
                    <h4 className="font-extrabold text-slate-800 text-sm tracking-wide">{feat.title}</h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed flex-grow">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: OUR FOCUS ── */}
      <section className="llmic-section bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black text-[#ED1C24] uppercase tracking-widest">Our Focus</span>
            <h2 className="llmic-heading">Commitment to High-Quality Care</h2>
            <p className="text-slate-500 text-sm">Directing our core strengths toward patient satisfaction and global trade safety.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {focusAreas.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-ilmic-blue/30 transition-all duration-300 text-center flex flex-col group h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-ilmic-blue-light text-ilmic-blue flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-black text-slate-800 text-base mb-3 tracking-wide">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: CERTIFICATIONS & RECOGNITIONS ── */}
      <section className="llmic-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black text-[#ED1C24] uppercase tracking-widest">Accreditations</span>
            <h2 className="llmic-heading">Certifications & Recognitions</h2>
            <p className="text-slate-500 text-sm">Officially recognized and registered under major Indian government authorities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                <div
                  onClick={() => handleOpenCert(cert)}
                  className="relative aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden border border-slate-200 cursor-pointer mb-5 group-hover:border-ilmic-blue/40 transition-colors flex-shrink-0"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-500"
                    unoptimized={cert.image?.startsWith("http") || cert.image?.startsWith("data:")}
                  />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/5 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100 duration-300">
                      <FiMaximize2 className="w-5 h-5 text-ilmic-blue" />
                    </div>
                  </div>
                </div>
                <h3 className="font-extrabold text-slate-800 text-base mb-2">{cert.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: GLOBAL PRESENCE ── */}
      <section className="llmic-section !bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0F3A66]/35 z-0" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Graphic List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 space-y-6 text-left"
            >
              <span className="text-xs font-black text-blue-300 uppercase tracking-widest">Global Network</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Our Global Sourcing & Distribution Reach
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Headquartered in India, we have built regulatory supply corridors to fast-developing healthcare hubs across international borders.
              </p>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center flex-shrink-0">
                  <FiGlobe className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white">8+</h4>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Countries Served Globally</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Map Grid List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {[
                { name: "India", role: "HQ & Exports" },
                { name: "Angola", role: "Branch Office" },
                { name: "Dubai (UAE)", role: "Partner Hub" },
                { name: "Cameroon", role: "Supply Route" },
                { name: "Namibia", role: "Supply Route" },
                { name: "Ethiopia", role: "Supply Route" },
                { name: "Uzbekistan", role: "Supply Route" },
                { name: "CIS Countries", role: "Regional Reach" }
              ].map((c) => (
                <div key={c.name} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-blue-500/40 transition-colors flex flex-col justify-center h-full">
                  <h4 className="font-extrabold text-white text-sm">{c.name}</h4>
                  <p className="text-[10px] text-blue-300 font-bold uppercase tracking-wider mt-1">{c.role}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 11: WHY CHOOSE ILMIC ── */}
      <section className="llmic-section bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black text-[#ED1C24] uppercase tracking-widest">Why Choose Us</span>
            <h2 className="llmic-heading">Setting Global Benchmarks</h2>
            <p className="text-slate-500 text-sm">Ensuring pharmaceutical integrity, rapid compliance, and transparent services.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {whyChooseUsCards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col group h-full"
              >
                <div className="w-10 h-10 rounded-lg bg-ilmic-blue-light text-ilmic-blue flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                  <FiShield className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-base mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 11.5: CERTIFICATIONS & RECOGNITION (STARTUP INDIA) ── */}
      <section className="llmic-section bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Side: Text and Recognition details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <span className="inline-flex px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-ilmic-blue text-xs font-black uppercase tracking-wider">
                Government Recognition
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                Startup India Recognition Certificate
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                ILMIC Health Care Private Limited is officially recognized by the Government of India under the Startup India initiative. This recognition reflects our commitment to innovation, quality, and excellence in the pharmaceutical and healthcare industry.
              </p>

              {/* Highlight Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Recognized by Startup India (DPIIT)",
                  "Government of India Certified",
                  "Trusted Pharmaceutical Manufacturer",
                  "Committed to Innovation & Quality"
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <span className="text-green-500 font-extrabold flex-shrink-0 text-sm">✓</span>
                    <span className="text-sm font-semibold text-slate-700">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Certificate Image Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div
                onClick={() => handleOpenCert({
                  title: "Startup India Recognition Certificate",
                  image: startupIndiaCert,
                  description: "Officially recognized by the Department for Promotion of Industry and Internal Trade (DPIIT), Government of India under the Startup India initiative."
                })}
                className="relative w-full max-w-md aspect-[1.414/1] bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer flex items-center justify-center p-4 group"
              >
                <Image
                  src={startupIndiaCert}
                  alt="Startup India Recognition Certificate"
                  fill
                  className="object-contain p-4 transition-transform duration-500"
                  unoptimized={startupIndiaCert?.startsWith("http") || startupIndiaCert?.startsWith("data:")}
                />
                {/* Maximize overlay */}
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/5 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 duration-300">
                    <FiMaximize2 className="w-5 h-5 text-ilmic-blue" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 12: CALL TO ACTION ── */}
      <section className="llmic-section bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl bg-gradient-to-br from-[#0F3A66] via-[#103E6D] to-[#1E5D9B] p-10 lg:p-16 text-center text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Partner With ILMIC Health Care Pvt. Ltd.</h2>
              <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Whether you need pharmaceutical exports, hospital management, medical tourism services, or healthcare partnerships, ILMIC Health Care is ready to support your business worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/products" className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-[#0F3A66] px-10 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                  Explore Products
                </Link>
                <Link href="/contact-us" className="inline-flex items-center justify-center bg-transparent hover:bg-white hover:text-[#0F3A66] text-white border border-white px-10 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CERTIFICATE LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden cursor-zoom-out"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col relative overflow-hidden cursor-default"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50 flex-shrink-0">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight">
                    {selectedCert.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    Registration Authority Document
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-500 shadow-sm border border-slate-200 transition-colors"
                    title="Zoom Out"
                  >
                    <FiZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-500 shadow-sm border border-slate-200 transition-colors"
                    title="Zoom In"
                  >
                    <FiZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600 shadow-sm border border-red-100 transition-colors ml-2"
                    title="Close"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body / Image Viewer */}
              <div className="flex-grow overflow-auto bg-slate-100 flex items-center justify-center p-6 relative">
                <div
                  className="relative transition-transform duration-200 origin-center"
                  style={{ transform: `scale(${zoomLevel})`, minWidth: "300px", minHeight: "400px" }}
                >
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-w-full max-h-[70vh] object-contain shadow-lg bg-white rounded-lg"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 text-slate-500 text-xs sm:text-sm leading-relaxed flex-shrink-0">
                {selectedCert.description}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default AboutUs;
