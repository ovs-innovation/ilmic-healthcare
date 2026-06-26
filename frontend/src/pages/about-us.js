import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronRight,
  FiCheckCircle,
  FiShield,
  FiTarget,
  FiEye,
  FiTruck,
  FiHeadphones,
  FiAward,
  FiActivity,
  FiGlobe,
  FiPackage,
  FiStar,
  FiUsers,
  FiZap,
  FiTrendingUp,
  FiHeart,
} from "react-icons/fi";
import Layout from "@layout/Layout";

const AboutUsRedesign = () => {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <Layout
      title="About Us - Kure Pharma | Premium Pharmaceutical Distributor"
      description="Since 2016, Kure Pharma is a trusted trader, wholesaler, and supply partner of Anti-Cancer, Oncology, Critical Care, HIV, and Specialty medicines, led by Mr. Hitesh Sharma."
    >
      {/* 1. STUNNING HERO SECTION WITH IMAGE BACKGROUND & GRADIENT OVERLAY */}
      <section 
        className="relative py-24 lg:py-36 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "linear-gradient(to right, rgba(15, 76, 129, 0.95), rgba(15, 76, 129, 0.75)), url('/about-hero-medicines.png')" }}
      >
        {/* Dynamic mesh backgrounds */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 to-[#C1272D] rounded-full blur-[140px] opacity-25" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-sky-500 rounded-full blur-[120px] opacity-25" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[10px] font-black text-white/80 uppercase tracking-widest mb-6 bg-white/10 px-5 py-2 rounded-full border border-white/20 backdrop-blur-md"
          >
            <Link href="/" className="hover:text-[#C1272D] transition-colors">Home</Link>
            <FiChevronRight className="w-3 h-3 text-white/50" />
            <span className="text-white">About Kure Pharma</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6"
          >
            Redefining Medicine <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-white">Distribution in India</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-1.5 bg-[#C1272D] rounded-full mx-auto mb-8"
          />

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-blue-100 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed font-medium"
          >
            Established in 2016, Kure Pharma stands at the forefront of specialty pharmaceutical supply, bridging the gap between global manufacturers and patients who need life-saving medications.
          </motion.p>
        </div>
      </section>

      {/* 2. STATS BANNER - OVERLAPPING HIGH-END FLOATING CARD */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { count: "9+ Years", label: "Industry Legacy", desc: "Delivering trust since 2016", icon: FiAward, color: "text-red-500", bg: "bg-red-50" },
            { count: "500+", label: "Specialty Medicines", desc: "Oncology, ICU & Critical care", icon: FiPackage, color: "text-blue-500", bg: "bg-blue-50" },
            { count: "1000+", label: "Partners Sourced", desc: "Hospitals & retail pharmacies", icon: FiUsers, color: "text-purple-500", bg: "bg-purple-50" },
            { count: "100%", label: "Genuine Sourced", desc: "Direct manufacturer sourcing", icon: FiShield, color: "text-emerald-500", bg: "bg-emerald-50" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
              <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0 ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">{item.count}</div>
                <div className="text-xs font-bold text-gray-600 mt-1">{item.label}</div>
                <div className="text-[10px] text-gray-400 font-medium mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DUAL COLUMN STORY & VALUE PROPOSITION */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left: Beautiful Graphics Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-tr from-[#0F4C81]/10 to-transparent rounded-full blur-xl" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#C1272D]/10 to-transparent rounded-full blur-xl" />

              <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-gray-50 shadow-2xl max-w-sm sm:max-w-md bg-white">
                <img
                  src="/about-us.jpg"
                  alt="Kure Pharma Corporate Operations"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-8 text-white">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#C1272D] mb-1.5 bg-red-600/20 border border-red-500/30 px-3 py-1 rounded-full self-start">KURE PHARMA PVT LTD</span>
                  <h4 className="text-xl font-black leading-tight">Delivering Critical Healthcare Everywhere</h4>
                  <p className="text-white/80 text-xs font-semibold mt-1">Sourcing authentic oncology and specialty drugs pan-India.</p>
                </div>
              </div>
            </div>

            {/* Right: Interactive Tabs & Content */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-block px-4 py-1.5 mb-5 rounded-full text-[#C1272D] text-[10px] font-black uppercase tracking-[0.2em]">
                  Leadership & Legacy
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F4C81] tracking-tight leading-tight">
                  Ethical Sourcing, <br />
                  <span className="text-[#C1272D]">Uncompromising Trust</span>
                </h2>
              </div>

              {/* Tabs buttons */}
              <div className="flex gap-2 flex-wrap border-b border-gray-100 pb-4">
                {[
                  { id: "story", icon: FiActivity, title: "Our Story" },
                  { id: "approach", icon: FiPackage, title: "Operational Excellence" },
                  { id: "guarantee", icon: FiShield, title: "Authenticity Pledge" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-left transition-all duration-300 font-bold border text-xs sm:text-sm cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-[#0F4C81] text-white border-[#0F4C81] shadow-lg shadow-blue-900/10 scale-102"
                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.title}</span>
                  </button>
                ))}
              </div>

              {/* Tab Details */}
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  {activeTab === "story" && (
                    <motion.div
                      key="story"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-black text-[#0F4C81]">Established under Mr. Hitesh Sharma</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                        Since our inception in 2016, Kure Pharma has focused on sourcing high-end pharmaceutical tablets, injectable formulations, and life-critical compounds under the direction of <strong>Mr. Hitesh Sharma</strong>.
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                        We operate as authorized distributors, suppliers, and traders, fulfilling specialized medicine requirements for key hospital pharmacies, clinics, and government supply bodies nationwide.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "approach" && (
                    <motion.div
                      key="approach"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-black text-[#0F4C81]">Timely Delivery & Cold-Chain Logistics</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                        We employ strict cold-chain management and verified shipping channels to preserve the potency and bio-structure of delicate injectable solutions and oncology drugs.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {[
                          "Real-time temperature tracking & storage",
                          "Hassle-free shipping across Pan-India",
                          "Experienced medical product packaging",
                          "Verified logistics partners & delivery networks",
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                            <FiCheckCircle className="text-[#C1272D] w-4 h-4 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "guarantee" && (
                    <motion.div
                      key="guarantee"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-black text-[#0F4C81]">Zero Tolerance for Counterfeit Drugs</h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                        Every single product we sell is backed by batch analysis certificates, direct sourcing trails, and strict laboratory controls. Your patients' safety is Kure Pharma's highest priority.
                      </p>
                      <div className="flex gap-4 mt-6">
                        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100">
                          <FiShield className="text-[#C1272D] w-5 h-5 flex-shrink-0" />
                          <span className="text-[11px] font-black text-[#C1272D] uppercase tracking-wide">100% Genuine Sourced</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                          <FiAward className="text-[#0F4C81] w-5 h-5 flex-shrink-0" />
                          <span className="text-[11px] font-black text-[#0F4C81] uppercase tracking-wide">FDA Approved Brands</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CHRONOLOGICAL TIMELINE OF GROWTH */}
      <section className="py-20 lg:py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0F4C81]/10 text-[#0F4C81] text-[10px] font-black uppercase tracking-[0.2em]">Our Milestones</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">The Growth of <span className="text-[#C1272D]">Kure Pharma</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />

            {[
              { year: "2016", title: "Kure Pharma Founded", desc: "Established operations in Delhi NCR region, setting up strong trader connections." },
              { year: "2019", title: "Pan-India Expansion", desc: "Registered supplies for leading corporate hospitals and regional pharmacy chains." },
              { year: "2022", title: "Cold-Chain Integration", desc: "Implemented advanced refrigeration capabilities for sensitive oncology injectables." },
              { year: "2026", title: "Digitized Supply Ecosystem", desc: "Launched dynamic digital catalogs for fast sourcing of lifesaving & specialty drugs." },
            ].map((milestone, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-200/60 shadow-sm relative z-10 flex flex-col items-center text-center space-y-4 hover:shadow-md hover:border-[#0F4C81]/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-[#0F4C81] text-white flex items-center justify-center text-lg font-black shadow-lg">
                  {milestone.year}
                </div>
                <h4 className="font-black text-gray-900 text-sm">{milestone.title}</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC GRID FOR CORE MEDICINE PORTFOLIOS */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-[#C1272D] text-[10px] font-black uppercase tracking-[0.2em]">Our Sourcing Portfolios</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0F4C81] tracking-tight">Products We Deliver <span className="text-[#C1272D]">With Care</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "Anti-Cancer Medicines", desc: "Top-tier oncology drugs, targeted therapeutic compounds, chemotherapy vials, and supportive care items.", image: "/products/oncology.png", color: "from-[#F3EEFF] to-white", border: "border-[#7C3AED]/15" },
              { title: "Critical Care", desc: "Emergency ICU formulations, high-strength antibiotics, cardiovascular, and emergency injections.", image: "/products/critical.png", color: "from-[#FFF0F0] to-white", border: "border-[#DC2626]/15" },
              { title: "Lifesaving Medicines", desc: "Anti-retroviral treatments, organ transplant solutions, and nephrology drugs.", image: "/products/hiv.png", color: "from-[#EFF7FF] to-white", border: "border-[#1D4ED8]/15" },
              { title: "Imported Specialty Drugs", desc: "Novel global molecules and rare disease drugs imported legally with compliance pathways.", image: "/products/imported.png", color: "from-[#EDFFF5] to-white", border: "border-[#059669]/15" },
              { title: "Hormonal & Biotech Items", desc: "Precision biosimilars, growth hormones, and biotech formulations requiring cold storage.", image: "/products/specialty.png", color: "from-[#FFFBEA] to-white", border: "border-[#D97706]/15" },
              { title: "Injectables & Infusions", desc: "IV infusions, lyophilized injections, and sterile fluid formulations for hospital suites.", image: "/products/nephrology.png", color: "from-[#FFF0F5] to-white", border: "border-[#BE185D]/15" },
            ].map((cat, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${cat.color} p-8 rounded-[2rem] border ${cat.border} shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center p-3 shadow-sm mb-6 group-hover:scale-105 transition-transform">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-contain" />
                  </div>
                  <h4 className="text-lg font-black text-gray-900 mb-3">{cat.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{cat.desc}</p>
                </div>
                <Link href="/products" className="inline-flex items-center gap-1.5 mt-6 text-xs font-black text-[#0F4C81] group-hover:text-[#C1272D] transition-colors uppercase tracking-wider">
                  Browse Range <FiChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VISION & MISSION STATEMENTS */}
      <section className="py-20 lg:py-24 bg-[#0F4C81] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            <div className="bg-white/5 p-8 sm:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-[#C1272D] mb-8">
                <FiTarget className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Our Dedicated Mission</h3>
              <p className="text-blue-100/70 text-sm sm:text-base leading-relaxed font-medium">
                To streamline the distribution of lifesaving medical formulations across India, ensuring clinics and pharmacies receive 100% authentic drugs at reasonable prices, backed by high-speed logistics and support.
              </p>
            </div>

            <div className="bg-white/5 p-8 sm:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-8">
                <FiEye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Our Vision</h3>
              <p className="text-blue-100/70 text-sm sm:text-base leading-relaxed font-medium">
                To become India's most recognized and respected trader and supplier of anti-cancer, critical care, and special formulations—setting high standards of medicine authenticity and client-centric distribution.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. DETAILED FAQS OR TRUST ACCENT SECTION */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0F4C81]/5 text-[#0F4C81] text-[10px] font-black uppercase tracking-[0.2em] border border-[#0F4C81]/15">Answering Key Questions</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Distribution & Supply FAQs</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Where does Kure Pharma deliver medicines?", a: "We provide comprehensive distribution network delivery across all states in India, serving local pharmacies, corporate hospital suites, diagnostic clinics, and individual practitioner centers." },
              { q: "How do you verify the authenticity of cancer medications?", a: "Every batch is sourced directly from licensed pharma companies or their authorized direct importers. We trace every batch ID and provide full certification trails for peace of mind." },
              { q: "What is your typical turnaround time for orders?", a: "In-stock formulations are dispatched within 24 hours. Transit times vary depending on the destination, but critical air logistics is prioritized for urgent lifesaving compounds." },
            ].map((faq, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-gray-50 border border-gray-100">
                <h4 className="font-black text-gray-900 text-sm sm:text-base mb-2">Q. {faq.q}</h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PREMIUM CTA BANNER */}
      <section className="py-16 bg-gradient-to-br from-[#1f2937] to-[#374151] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">Partner with a Trusted Name</h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Contact us today for direct wholesale contract rates, rare drug sourcing requests, or to register your hospital pharmacy accounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-extrabold text-sm hover:bg-gray-100 transition-all shadow-lg hover:scale-102"
            >
              Contact Our Desk <FiChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-extrabold text-sm hover:bg-white hover:text-gray-900 transition-all hover:scale-102"
            >
              Browse Catalog <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUsRedesign;
