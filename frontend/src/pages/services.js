import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { tourismServicesFallback, whyChooseUs } from "@utils/ilmicDefaults";

const serviceImages = {
  "medical-tourism": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80",
  "hospital-management": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80",
  "pharmaceutical-export": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80",
  "hospital-accessories-supply": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=80",
  "international-medical-conferences": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&q=80",
};

const servicesList = [
  {
    slug: "medical-tourism",
    name: { en: "Medical Tourism" },
    description: { en: "Complete medical tourism services for international patients in India." },
    image: "/visuals/medical_tourism.png",
    group: "Medical Tourism",
  },
  {
    slug: "hospital-management",
    name: { en: "Hospital Management" },
    description: { en: "Managing 50+ hospitals abroad with effective on-ground support." },
    image: "/visuals/hospital_management.png",
    group: "Hospital",
  },
  {
    slug: "pharmaceutical-export",
    name: { en: "Pharmaceutical Export" },
    description: { en: "Export of oncology and general pharma medicines to Dubai, Africa, CIS, and other international markets." },
    image: "/visuals/pharmaceutical_export.png",
    group: "Export",
  },
  {
    slug: "hospital-accessories-supply",
    name: { en: "Hospital Accessories Supply" },
    description: { en: "Supplier of all types of hospital accessories, surgical instruments, and medical products." },
    image: "/visuals/hospital_accessories.png",
    group: "Surgical",
  },
  {
    slug: "international-medical-conferences",
    name: { en: "International Medical Conferences" },
    description: { en: "Conducting international medical conferences, workshops, and professional training programs." },
    image: "/visuals/medical_conferences.png",
    group: "Training",
  },
];

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const { showingTranslateValue } = useUtilsFunction();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToServices = (e) => {
    e?.preventDefault?.();
    const element = document.getElementById("services-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setServices(servicesList);
    setLoading(false);
  }, []);

  const getDisplay = (service) => ({
    title: showingTranslateValue(service.name),
    description: showingTranslateValue(service.description) || "",
    visualSrc: service.image,
    group: service.group || "Medical",
    image: serviceImages[service.slug] || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80",
    href: service.slug ? `/services/${service.slug}` : "",
    slug: service.slug,
    key: service._id || service.slug,
  });

  const displayList = services.map(getDisplay);
  const totalSlides = displayList.length;
  const activeService = displayList[currentIndex];
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    if (!mounted || loading || totalSlides === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5500);
    return () => clearInterval(timer);
  }, [mounted, loading, totalSlides]);

  const handleNext = () => {
    const now = Date.now();
    if (now - lastClickTime < 450) return;
    setLastClickTime(now);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    const now = Date.now();
    if (now - lastClickTime < 450) return;
    setLastClickTime(now);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <Layout
      title="Medical Tourism Services"
      description="Complete hospital tourism services — treatment packages, medical visa, airport pickup, accommodation, interpreter support, and post-treatment care in India."
    >
      {/* Hero Slider */}
      <div className="relative w-full h-[500px] lg:h-[600px] bg-slate-950 overflow-hidden">
        {mounted && !loading && displayList.length > 0 && activeService && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 }
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image src={activeService.image} alt={activeService.title} fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 llmic-container h-full flex items-center">
                  <div className="max-w-2xl space-y-6">
                    <motion.div
                      variants={{
                        initial: { opacity: 0, y: 15 },
                        animate: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.4, ease: "easeInOut" } }
                      }}
                    >
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-ilmic-blue/20 border border-blue-300/30 rounded-full text-blue-200 text-sm font-bold">
                        {activeService.visualSrc && <img src={activeService.visualSrc} className="w-5 h-5 object-contain inline-block mr-1.5" alt="" />} {activeService.group}
                      </span>
                    </motion.div>

                    <motion.h2
                      variants={{
                        initial: { opacity: 0, y: 15 },
                        animate: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: "easeInOut" } }
                      }}
                      className="text-white font-black text-3xl sm:text-5xl leading-tight"
                    >
                      {activeService.title}
                    </motion.h2>

                    <motion.p
                      variants={{
                        initial: { opacity: 0, y: 15 },
                        animate: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" } }
                      }}
                      className="text-slate-300 text-lg leading-relaxed line-clamp-3"
                    >
                      {activeService.description}
                    </motion.p>

                    <motion.div
                      variants={{
                        initial: { opacity: 0, y: 15 },
                        animate: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4, ease: "easeInOut" } }
                      }}
                      className="flex flex-wrap gap-4"
                    >
                      {activeService.slug ? (
                        <Link href={activeService.href} className="llmic-btn llmic-btn-coral !px-8 cursor-pointer">
                          Explore Service
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={scrollToServices}
                          className="llmic-btn llmic-btn-coral !px-8 cursor-pointer"
                        >
                          Explore Service
                        </button>
                      )}
                      <Link href="/contact-us" className="llmic-btn llmic-btn-outline !px-8 cursor-pointer">
                        Contact Us
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}

          {mounted && !loading && displayList.length > 0 && (
            <>
              {/* Left Navigation Arrow */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer group backdrop-blur-sm"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Right Navigation Arrow */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer group backdrop-blur-sm"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
                {displayList.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const now = Date.now();
                      if (now - lastClickTime < 450) return;
                      setLastClickTime(now);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
      </div>

      {/* Intro */}
      <section className="llmic-section bg-white">
        <div className="llmic-container text-center max-w-3xl mx-auto">
          <p className="llmic-eyebrow">Hospital Tourism</p>
          <h1 className="llmic-heading">
            Complete Medical Tourism <span className="text-ilmic-blue">Services</span> in India
          </h1>
          <p className="llmic-subheading">
            From hospital management to pharmaceutical export, medical tourism, and surgical supply — ILMIC Health Care handles your complete healthcare needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/contact-us" className="llmic-btn llmic-btn-coral !px-8">Get Free Consultation</Link>
            <Link href="/products" className="llmic-btn llmic-btn-navy !px-8">View Treatment Packages</Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" className="llmic-section !bg-slate-50">
        <div className="llmic-container">
          <div className="text-center mb-12">
            <p className="llmic-eyebrow">All Services</p>
            <h2 className="llmic-heading">Everything You Need for Your Medical Journey</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 max-w-6xl mx-auto">
            {displayList.map((service, index) => (
              <div
                key={service.key}
                className={`llmic-service-card cursor-pointer ${
                  activeCard === service.key ? "ring-2 ring-ilmic-blue" : ""
                } ${
                  index < 3
                    ? "lg:col-span-2"
                    : index === 3
                    ? "lg:col-span-2 lg:col-start-2"
                    : "lg:col-span-2"
                }`}
                onClick={() => setActiveCard(activeCard === service.key ? null : service.key)}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50/80 flex items-center justify-center p-2 border border-slate-100 mb-3 sm:mb-5 shadow-sm group-hover:border-ilmic-blue/20 transition-all duration-300">
                  <img
                    src={service.visualSrc}
                    alt={service.title}
                    className="w-full h-full object-contain transition-all duration-[0.4s] group-hover:scale-[1.08] group-hover:drop-shadow-[0_8px_16px_rgba(15,58,102,0.18)]"
                  />
                </div>
                <span className="llmic-service-card__group">{service.group}</span>
                <h3 className="text-base font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className={`text-sm text-slate-500 leading-relaxed flex-1 ${activeCard === service.key ? "" : "line-clamp-3"}`}>
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1 text-ilmic-blue text-sm font-bold mt-4 hover:gap-2 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  Full Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="llmic-section !bg-slate-900 text-white">
        <div className="llmic-container">
          <div className="text-center mb-12">
            <p className="llmic-eyebrow !text-blue-300">Why LLMIC</p>
            <h2 className="llmic-heading !text-white">Trusted by Patients Worldwide</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center p-1.5 border border-white/25 mb-4 shadow-sm">
                  <img
                    src={item.visualSrc}
                    alt={item.title}
                    className="w-full h-full object-contain filter brightness-[1.15]"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="llmic-section bg-white">
        <div className="llmic-container">
          <div className="rounded-3xl bg-gradient-to-br from-ilmic-blue to-ilmic-blue-dark p-10 lg:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Plan Your Medical Trip?</h2>
            <p className="text-ilmic-blue-light text-lg mb-8 max-w-2xl mx-auto">
              Share your medical reports and get a personalized treatment plan with transparent pricing within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact-us" className="llmic-btn bg-white text-ilmic-blue-dark hover:bg-ilmic-blue-light !px-10">
                Start Free Consultation
              </Link>
              <a href="https://wa.me/9188102 72080" target="_blank" rel="noopener noreferrer" className="llmic-btn llmic-btn-outline !px-10">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
