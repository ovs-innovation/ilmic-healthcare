import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "@layout/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { tourismServicesFallback, whyChooseUs } from "@utils/ilmicDefaults";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const serviceImages = {
  "hospital-treatment-packages": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80",
  "medical-visa-assistance": "https://images.unsplash.com/photo-1436491865332-7a61a4b3f3d7?w=1600&q=80",
  "airport-pickup-transfer": "https://images.unsplash.com/photo-1436491865332-7a61a4b3f3d7?w=1600&q=80",
  "accommodation-stay": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80",
  "interpreter-language-support": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&q=80",
  "second-opinion-consultation": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1600&q=80",
  "post-treatment-followup": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80",
  "wellness-ayurveda-tourism": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80",
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState(null);
  const [mounted, setMounted] = useState(false);
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
    import("@services/ServiceServices")
      .then(({ default: SS }) => {
        SS.getShowingServices()
          .then((res) => {
            setServices(res?.length ? res : tourismServicesFallback);
            setLoading(false);
          })
          .catch(() => {
            setServices(tourismServicesFallback);
            setLoading(false);
          });
      });
  }, []);

  const getDisplay = (service) => ({
    title: showingTranslateValue(service.name),
    description: showingTranslateValue(service.description) || "",
    icon: service.icon || "🏥",
    group: service.group || "Medical",
    image: serviceImages[service.slug] || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80",
    href: service.slug ? `/service/${service.slug}` : "",
    slug: service.slug,
    key: service._id || service.slug,
  });

  const displayList = services.map(getDisplay);

  return (
    <Layout
      title="Medical Tourism Services"
      description="Complete hospital tourism services — treatment packages, medical visa, airport pickup, accommodation, interpreter support, and post-treatment care in India."
    >
      {/* Hero Slider */}
      <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
        {mounted && !loading && displayList.length > 0 && (
          <Swiper
            key={displayList.length}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            speed={1000}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            loop
            className="w-full h-full"
          >
            {displayList.slice(0, 4).map((service) => (
              <SwiperSlide key={service.key} className="relative w-full h-full">
                <div className="absolute inset-0">
                  <Image src={service.image} alt={service.title} fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
                </div>
                <div className="relative z-10 llmic-container h-full flex items-center">
                  <div className="max-w-2xl space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-ilmic-blue/20 border border-blue-300/30 rounded-full text-blue-200 text-sm font-bold">
                      {service.icon} {service.group}
                    </span>
                    <h2 className="text-white font-black text-3xl sm:text-5xl leading-tight">{service.title}</h2>
                    <p className="text-slate-300 text-lg leading-relaxed line-clamp-3">{service.description}</p>
                    <div className="flex flex-wrap gap-4 swiper-no-swiping">
                      {service.slug ? (
                        <Link href={service.href} className="llmic-btn llmic-btn-coral !px-8 cursor-pointer">
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
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayList.map((service) => (
              <div
                key={service.key}
                className={`llmic-service-card cursor-pointer ${activeService === service.key ? "ring-2 ring-ilmic-blue" : ""}`}
                onClick={() => setActiveService(activeService === service.key ? null : service.key)}
              >
                <div className="llmic-service-card__icon">{service.icon}</div>
                <span className="llmic-service-card__group">{service.group}</span>
                <h3 className="text-base font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className={`text-sm text-slate-500 leading-relaxed flex-1 ${activeService === service.key ? "" : "line-clamp-3"}`}>
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
                <div className="text-4xl mb-4">{item.icon}</div>
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
