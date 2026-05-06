import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiArrowRight, FiMessageCircle } from "react-icons/fi";
import useGetSetting from "@hooks/useGetSetting";
import "swiper/css";

const HomeHeroBanner = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const sd = storeCustomizationSetting?.slider;
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);

  const slides = [
    {
      id: 1,
      image: sd?.first_img || "/slider/hero/battery.png",
      badge: "Power Solutions",
      title: sd?.first_title?.en || "High Performance Industrial Batteries",
      body: sd?.first_description?.en || "Reliable energy storage solutions for your critical infrastructure and industrial needs.",
      href: sd?.first_link || "/search?category=batteries",
      cta: sd?.first_button?.en || "Discover Products",
    },
    {
      id: 2,
      image: sd?.second_img || "/slider/hero/transformer.png",
      badge: "Grid Infrastructure",
      title: sd?.second_title?.en || "Precision Engineering Power Transformers",
      body: sd?.second_description?.en || "Advanced transformer technology designed for maximum efficiency and long-term durability.",
      href: sd?.second_link || "/search?category=transformers",
      cta: sd?.second_button?.en || "Discover Products",
    },
    {
      id: 3,
      image: sd?.third_img || "/slider/hero/electronics.png",
      badge: "Advanced Electronics",
      title: sd?.third_title?.en || "Cutting-edge Power Control Systems",
      body: sd?.third_description?.en || "Integrated electronic solutions for seamless power management and system monitoring.",
      href: sd?.third_link || "/search?category=electronics",
      cta: sd?.third_button?.en || "Discover Products",
    },
  ];

  const onSwiper = useCallback((s) => { swiperRef.current = s; }, []);
  const onChange = useCallback((s) => { setActive(s.realIndex); }, []);
  const isActive = (idx) => active === idx % slides.length;

  return (
    <section className="relative w-full bg-[#f8fafc] overflow-hidden border-b border-gray-100">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        speed={800}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        onSwiper={onSwiper}
        onSlideChange={onChange}
        className="w-full hero-swiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full flex flex-col lg:flex-row bg-[#f8fafc] hero-slide-inner">

              {/* LEFT: Text Panel */}
              <div className="flex-1 flex items-center justify-center lg:justify-start px-5 sm:px-8 lg:px-12 xl:px-16 pt-10 pb-16 lg:py-14 order-2 lg:order-1 relative">
                <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-[#ED1C24] to-transparent hidden lg:block opacity-40" />

                <AnimatePresence mode="wait">
                  {isActive(idx) && (
                    <motion.div
                      key={`text-${slide.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full max-w-lg text-center lg:text-left"
                    >
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 mb-4 justify-center lg:justify-start">
                        <span className="w-4 h-px bg-[#ED1C24]" />
                        <span className="text-[10px] font-black text-[#ED1C24] uppercase tracking-[0.28em]">{slide.badge}</span>
                      </div>

                      {/* Title */}
                      <h1 className="font-black text-[#0b1d3d] leading-[1.08] tracking-tight mb-4 text-3xl sm:text-4xl lg:text-5xl xl:text-[52px]">
                        {slide.title}
                      </h1>

                      {/* Divider */}
                      <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                        <div className="w-8 h-0.5 bg-[#ED1C24] rounded-full" />
                        <div className="w-3 h-0.5 bg-gray-200 rounded-full" />
                      </div>

                      {/* Description */}
                      <p className="text-gray-500 leading-relaxed mb-7 font-medium text-[15px] xl:text-[17px] max-w-sm mx-auto lg:mx-0">
                        {slide.body}
                      </p>

                      {/* CTAs */}
                      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                        <Link href={slide.href} className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#0b1d3d] hover:bg-[#ED1C24] text-white rounded-full font-black uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] text-[12px]">
                          {slide.cta}
                          <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link href="/contact-us" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-black uppercase tracking-widest border-2 border-gray-200 text-gray-500 hover:border-[#0b1d3d] hover:text-[#0b1d3d] hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200 text-[12px]">
                          <FiMessageCircle className="w-3.5 h-3.5" />
                          Get A Quote
                        </Link>
                      </div>

                      {/* Trust stats */}
                      <div className="flex items-center gap-5 sm:gap-8 mt-8 pt-6 border-t border-gray-100 justify-center lg:justify-start">
                        {[
                          { value: "2,500+", label: "Clients" },
                          { value: "15 Yrs", label: "Experience" },
                          { value: "100%", label: "Compliant" },
                        ].map((stat) => (
                          <div key={stat.label} className="flex flex-col items-center lg:items-start">
                            <span className="text-[#0b1d3d] font-black text-lg leading-none">{stat.value}</span>
                            <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest mt-1">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* RIGHT: Image Panel — only on lg+ */}
              <div className="flex-1 items-center justify-center order-1 lg:order-2 overflow-hidden bg-white border-l border-gray-100/60 hidden lg:flex relative">
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 75% 65% at 50% 50%, #eef2ff 0%, #f6f8ff 55%, white 100%)" }} />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #0b1d3d 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

                <AnimatePresence mode="wait">
                  {isActive(idx) && (
                    <motion.div
                      key={`img-${slide.id}`}
                      initial={{ opacity: 0, scale: 0.9, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="relative z-10 w-full h-full flex items-center justify-center p-8 lg:p-12 xl:p-16"
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        loading={idx === 0 ? "eager" : "lazy"}
                        className="w-full h-full object-contain max-w-full max-h-full"
                        style={{ filter: "drop-shadow(0 16px 40px rgba(11,29,61,0.10))" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom control bar */}
      <div className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16 py-3 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => swiperRef.current?.slidePrev()} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#0b1d3d] hover:border-[#0b1d3d] hover:bg-gray-50 transition-all">
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button key={i} onClick={() => swiperRef.current?.slideToLoop(i)} className={`rounded-full transition-all duration-400 ${active === i ? "w-6 h-1.5 bg-[#ED1C24]" : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"}`} />
            ))}
          </div>
          <button onClick={() => swiperRef.current?.slideNext()} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#0b1d3d] hover:border-[#0b1d3d] hover:bg-gray-50 transition-all">
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2 font-black tracking-[0.15em] text-[11px]">
          <span className="text-[#ED1C24]">{String(active + 1).padStart(2, "0")}</span>
          <span className="w-5 h-px bg-gray-200" />
          <span className="text-gray-300">{String(slides.length).padStart(2, "0")}</span>
        </div>
      </div>

      <style>{`
        .hero-swiper { width: 100%; }
        .hero-swiper .swiper-wrapper { align-items: stretch; }
        .hero-swiper .swiper-slide { height: auto !important; }

        @media (min-width: 1024px) {
          .hero-slide-inner {
            height: calc(100vh - 160px);
            min-height: 540px;
            max-height: 740px;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-slide-inner { min-height: 420px; }
        }
        @media (max-width: 639px) {
          .hero-slide-inner { min-height: 380px; }
        }
      `}</style>
    </section>
  );
};

export default HomeHeroBanner;
