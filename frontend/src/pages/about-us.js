import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiChevronRight, FiShield, FiTarget, FiEye, FiGlobe, FiAward, FiUsers, FiHeart } from "react-icons/fi";
import Layout from "@layout/Layout";
import { companyProfile } from "@utils/ilmicDefaults";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <Layout
      title="About ILMIC Health Care Pvt. Ltd."
      description="ILMIC Health Care Pvt. Ltd. incorporated 28th Aug 2021. Oncology, general pharma, surgical products, hospital management & medical tourism. Led by Mr. Maroof Reza."
    >
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=80)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        <div className="relative llmic-container py-20">
          <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-4">About Company</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight max-w-3xl">
            ILMIC <span className="text-blue-300">Health Care Pvt. Ltd.</span>
          </h1>
          <p className="text-slate-300 text-lg mt-4 max-w-2xl">
            Incorporated 28th August 2021 — focused exclusively on health sector since beginning.
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-10 llmic-container">
        <div className="llmic-card p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { count: "2021", label: "Incorporated", desc: "Companies Act 2013", icon: FiAward },
            { count: "50+", label: "Hospitals Managed", desc: "Abroad & medical tourism", icon: FiHeart },
            { count: "8+", label: "Export Markets", desc: "Africa, Dubai, CIS & more", icon: FiGlobe },
            { count: "3", label: "Core Divisions", desc: "Oncology, Pharma, Surgical", icon: FiShield },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-ilmic-blue-light text-ilmic-blue flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-slate-900">{item.count}</div>
              <div className="text-sm font-bold text-slate-700 mt-1">{item.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="llmic-section bg-white">
        <div className="llmic-container">
          <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-4">
            {[
              { id: "profile", label: "Company Profile" },
              { id: "introduction", label: "Introduction" },
              { id: "management", label: "Management" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? "bg-ilmic-blue text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <h2 className="llmic-heading mb-6">Company's Profile</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  <strong className="text-slate-900">ILMIC HEALTH CARE PVT. LTD.</strong> was incorporated on <strong>28th August 2021</strong> under the Companies Act 2013 (18 of 2013), registered with the Registrar of Companies, Delhi & NCR.
                </p>
                <p>
                  Our company's diverse interests range from <strong>Hospital Management</strong>, <strong>Pharmaceuticals</strong>, <strong>All Hospital Products</strong>, and <strong>Foods</strong>.
                </p>
                <p>
                  Since the beginning, our company has been focusing exclusively towards the health sector, till date.
                </p>
                <p>
                  Our company has a strong presence in domestic & international markets of pharmaceuticals, like <strong>Oncology Products</strong>, <strong>Pediatric Products</strong>, <strong>Health Supplements</strong>, <strong>Cardio-diabetic Products</strong> in our own brands.
                </p>
                <p>
                  Our company's offices in <strong>Luanda (Republic of Angola)</strong> and <strong>Delhi (India)</strong> are there for effective services & business expansions.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "introduction" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
              <h2 className="llmic-heading mb-6">Introduction</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                <p>
                  ILMIC HEALTH CARE PVT. LTD. is one of the fastest growing privately held pharmaceutical companies in India, headquartered at <strong>New Delhi</strong>, in the capital of India.
                </p>
                <p>
                  The company has been in export for the last 5 years of medicine — both <strong>Oncology</strong> and <strong>General Pharma</strong>, <strong>Medical Tourism</strong>, providing <strong>Training Programs</strong>, conducting <strong>International Medical Conferences</strong>, providing <strong>Doctors on Call for Critical Surgeries</strong>, and supplier of any type of <strong>Hospital Accessories</strong> in various countries like:
                </p>
                <div className="flex flex-wrap gap-2 my-4">
                  {companyProfile.markets.map((m) => (
                    <span key={m} className="px-3 py-1.5 bg-ilmic-blue-light text-ilmic-blue-dark text-sm font-semibold rounded-full border border-ilmic-border">{m}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "management" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-8">
              <div className="llmic-card p-8">
                <div className="w-14 h-14 rounded-2xl bg-ilmic-blue-light text-ilmic-blue flex items-center justify-center mb-6">
                  <FiUsers className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Management & Organisation</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our group is headed by our <strong>Managing Director Mr. Maroof Reza</strong>, who has experience in health sectors since long.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Focus:</strong> We are participating in the hospital management of about more than <strong>50 hospitals abroad</strong> & medical tourism.
                </p>
              </div>
              <div className="llmic-card p-8">
                <div className="w-14 h-14 rounded-2xl bg-ilmic-blue-light text-ilmic-blue flex items-center justify-center mb-6">
                  <FiTarget className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Our Focus Areas</h3>
                <ul className="space-y-3 text-slate-600">
                  {["Oncology Medicines Export", "General Pharma Products", "Surgical & Hospital Accessories", "Hospital Management (50+ abroad)", "Medical Tourism Services", "International Medical Conferences", "Doctors on Call for Critical Surgeries"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <FiChevronRight className="w-4 h-4 text-ilmic-blue flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="llmic-section-sm bg-ilmic-blue">
        <div className="llmic-container text-center">
          <h2 className="text-3xl font-black text-white mb-4">Partner With ILMIC Health Care</h2>
          <p className="text-ilmic-blue-light mb-8 max-w-xl mx-auto">For bulk orders, export enquiries, hospital supply, and medical tourism.</p>
          <Link href="/contact-us" className="llmic-btn bg-white text-ilmic-blue-dark hover:bg-ilmic-blue-light !px-10">
            Contact Us <FiChevronRight className="inline" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
