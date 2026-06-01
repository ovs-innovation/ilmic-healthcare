import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight, FiCheckCircle, FiShield, FiTarget, FiEye, FiCpu, FiTool, FiTruck, FiHeadphones, FiAward, FiZap, FiActivity, FiGlobe } from "react-icons/fi";
import Layout from "@layout/Layout";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <Layout title="About Us" description="Learn more about Elecmoon - Your trusted partner in power and safety solutions.">
      {/* 1. HERO / PAGE HEADER */}
      <section className="relative bg-[#0b1d3d] pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden border-b border-white/5">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-widest mb-6 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <FiChevronRight className="w-3 h-3" />
            <span className="text-[#ED1C24]">About Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight"
          >
            Powering the <span className="text-[#ED1C24]">Future</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-20 h-1.5 bg-[#ED1C24] rounded-full mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/70 max-w-3xl text-base md:text-xl leading-relaxed font-medium"
          >
            We are dedicated to providing industry-leading electrical products, unparalleled safety testing, and professional services that keep your operations running seamlessly and safely.
          </motion.p>
        </div>
      </section>

      {/* 2. INTERACTIVE COMPANY OVERVIEW */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left side: Interactive Tabs */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-5/12 flex flex-col"
            >
              <div className="inline-block px-4 py-1.5 mb-5 rounded-full bg-red-50 text-[#ED1C24] text-[10px] font-black uppercase tracking-[0.2em] border border-red-100 self-start">
                Who We Are
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0b1d3d] mb-8 tracking-tight leading-tight">
                Excellence in <br />
                <span className="text-[#ED1C24]">Industrial Solutions</span>
              </h2>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  { id: "story", icon: FiActivity, title: "Our Story" },
                  { id: "approach", icon: FiCpu, title: "Our Approach" },
                  { id: "guarantee", icon: FiShield, title: "Our Guarantee" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-all duration-300 font-bold border ${
                      activeTab === tab.id 
                        ? "bg-[#0b1d3d] text-white border-[#0b1d3d] shadow-lg shadow-[#0b1d3d]/10 scale-[1.02]" 
                        : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#ED1C24]' : 'text-gray-400'}`} />
                    <span className="text-sm tracking-wide">{tab.title}</span>
                    <FiChevronRight className={`ml-auto w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? 'opacity-100 translate-x-1' : 'opacity-0'}`} />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right side: Dynamic Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full lg:w-7/12"
            >
              <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 h-full border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px] opacity-60" />
                
                <AnimatePresence mode="wait">
                  {activeTab === "story" && (
                    <motion.div
                      key="story"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#ED1C24] shadow-sm mb-8 border border-gray-100">
                        <FiActivity className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black text-[#0b1d3d] mb-5">A Decade of Power and Precision</h3>
                      <p className="text-gray-600 text-base leading-relaxed mb-6 font-medium">
                        Founded with a vision to revolutionize industrial electrical solutions, Elecmoon began as a specialized testing facility. Over the years, we recognized the critical gap in the market for high-quality, reliable, and compliant electrical infrastructure.
                      </p>
                      <p className="text-gray-600 text-base leading-relaxed font-medium">
                        Today, we stand as a premier provider, not just testing, but supplying the very components that drive industries forward. Our journey from a local service provider to a comprehensive national supplier is fueled by our unwavering commitment to safety and engineering excellence.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "approach" && (
                    <motion.div
                      key="approach"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#0b1d3d] shadow-sm mb-8 border border-gray-100">
                        <FiCpu className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black text-[#0b1d3d] mb-5">Engineered for Performance</h3>
                      <p className="text-gray-600 text-base leading-relaxed mb-6 font-medium">
                        Our approach bridges the gap between premium product supply and expert technical execution. We don't just sell components; we provide comprehensive solutions engineered to integrate flawlessly into your existing infrastructure.
                      </p>
                      <ul className="space-y-4 mt-8">
                        {[
                          "Rigorous vendor selection and product auditing",
                          "Data-driven compliance and safety reporting",
                          "End-to-end lifecycle support for all supplied equipment"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-700">
                            <FiCheckCircle className="w-5 h-5 text-[#ED1C24] flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {activeTab === "guarantee" && (
                    <motion.div
                      key="guarantee"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-green-600 shadow-sm mb-8 border border-gray-100">
                        <FiShield className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black text-[#0b1d3d] mb-5">The Elecmoon Promise</h3>
                      <p className="text-gray-600 text-base leading-relaxed mb-6 font-medium">
                        Trust is the currency of the electrical industry. When dealing with high-voltage systems and critical infrastructure, there is absolutely zero room for error. That's why every product and service carries the Elecmoon Guarantee.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                          <h4 className="font-black text-[#0b1d3d] text-sm mb-2">100% Compliance</h4>
                          <p className="text-xs text-gray-500 font-medium">Strict adherence to AS/NZS electrical safety standards.</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                          <h4 className="font-black text-[#0b1d3d] text-sm mb-2">Certified Techs</h4>
                          <p className="text-xs text-gray-500 font-medium">Highly trained, fully insured professional personnel.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. EXPANDED MISSION & VISION */}
      <section className="py-16 lg:py-24 bg-[#0b1d3d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/[0.03] p-8 lg:p-14 rounded-[2.5rem] border border-white/10 backdrop-blur-md hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[#ED1C24] mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <FiTarget className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-white mb-5 tracking-tight">Our Mission</h3>
              <p className="text-white/60 leading-relaxed font-medium text-lg">
                To empower businesses with reliable, cutting-edge electrical solutions and comprehensive safety services. We strive to be the most trusted partner for industries requiring absolute precision, regulatory compliance, and uninterrupted performance.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/[0.03] p-8 lg:p-14 rounded-[2.5rem] border border-white/10 backdrop-blur-md hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <FiGlobe className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-white mb-5 tracking-tight">Our Vision</h3>
              <p className="text-white/60 leading-relaxed font-medium text-lg">
                To set the benchmark for quality and safety in the electrical industry across Australia. We envision a future where infrastructure is not only robust and highly efficient but fundamentally secure for every individual interacting with it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. PREMIUM WHY CHOOSE US */}
      <section className="py-20 lg:py-32 bg-[#f8fafc]">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-12">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white text-gray-500 border border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm"
            >
              The Elecmoon Advantage
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0b1d3d] tracking-tight"
            >
              Why Choose <span className="text-[#ED1C24]">Us</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: FiShield, title: "Genuine Products", desc: "100% authentic equipment sourced directly from certified global manufacturers." },
              { icon: FiCheckCircle, title: "Trusted Quality", desc: "Every product and service undergoes rigorous testing to meet AS/NZS standards." },
              { icon: FiTruck, title: "Fast Delivery", desc: "Streamlined logistics ensuring your critical equipment arrives exactly when needed." },
              { icon: FiZap, title: "Modern Solutions", desc: "Access to the latest advancements in power technology and electrical engineering." },
              { icon: FiHeadphones, title: "Expert Support", desc: "Dedicated local Melbourne team providing technical assistance and guidance." },
              { icon: FiTool, title: "Reliable Service", desc: "From on-site testing to maintenance, we deliver consistent, professional results." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[2rem] border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(11,29,61,0.08)] hover:-translate-y-2 transition-all duration-400 group relative overflow-hidden"
              >
                {/* Decorative background number */}
                <div className="absolute -top-4 -right-2 text-[100px] font-black text-gray-50 opacity-50 pointer-events-none group-hover:-translate-y-2 transition-transform duration-500">
                  0{idx + 1}
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 group-hover:bg-[#0b1d3d] group-hover:border-[#0b1d3d] flex items-center justify-center text-[#0b1d3d] group-hover:text-white transition-all duration-400 mb-8 relative z-10">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-black text-[#0b1d3d] mb-4 relative z-10">{feature.title}</h4>
                <p className="text-[15px] text-gray-500 font-medium leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS SECTION */}
      <section className="relative py-20 lg:py-24 overflow-hidden bg-white border-t border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { count: "15+", label: "Years Experience", icon: FiAward },
              { count: "2.5k+", label: "Happy Customers", icon: FiEye },
              { count: "10k+", label: "Products Delivered", icon: FiTruck },
              { count: "100%", label: "Compliance Rate", icon: FiCheckCircle }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center p-8 sm:p-10 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-[#0b1d3d] hover:border-[#0b1d3d] group transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-6 text-[#ED1C24] shadow-sm group-hover:bg-white/10 transition-colors duration-300">
                  <stat.icon className="w-5 h-5" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-black text-[#0b1d3d] group-hover:text-white mb-3 tracking-tight transition-colors duration-300">{stat.count}</h3>
                <p className="text-gray-400 group-hover:text-[#ED1C24] font-bold text-[10px] sm:text-xs uppercase tracking-widest transition-colors duration-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default AboutUs;
