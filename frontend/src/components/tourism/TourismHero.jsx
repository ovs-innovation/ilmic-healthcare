import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  FiSend,
  FiPhoneCall,
  FiMapPin,
  FiGlobe,
  FiShield,
  FiPackage,
  FiFileText,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
} from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1200&q=85",
];

const getHeadline = (slide) => {
  if (slide?.titleLine1 && slide?.titleHighlight) {
    return `${slide.titleLine1} ${slide.titleHighlight}${
      slide.titleLine2 ? ` ${slide.titleLine2}` : "."
    }`;
  }
  return slide?.titleText || "Trusted Pharmaceutical Exporter & Supplier Since 2021.";
};

const BadgeIcon = ({ type }) => {
  if (type === "handshake") {
    return <FaHandshake className="w-[18px] h-[18px] text-ilmic-blue" />;
  }
  if (type === "service") {
    return <FiHeart className="w-[18px] h-[18px] text-ilmic-blue" />;
  }
  return <FiShield className="w-[18px] h-[18px] text-ilmic-blue" />;
};

const TourismHero = ({
  slides = [],
  slide,
  ctaPrimary,
  ctaSecondary,
  onEnquiry,
  phone,
}) => {
  const heroSlides = slides.length ? slides : slide ? [slide] : [];
  const [current, setCurrent] = useState(0);
  const [imgFallback, setImgFallback] = useState({});

  const slideCount = heroSlides.length;
  const activeSlide = heroSlides[current] || heroSlides[0];

  const goTo = useCallback(
    (index) => {
      if (!slideCount) return;
      setCurrent((index + slideCount) % slideCount);
    },
    [slideCount],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (slideCount <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [slideCount]);

  if (!activeSlide) return null;

  const tel = (phone || "+91 88102 72080").replace(/\s/g, "");
  const headline = getHeadline(activeSlide);
  const badge = activeSlide.badge || {
    icon: "shield",
    title: "Quality You Can Trust",
    desc: "We ensure GMP-certified products with global quality standards.",
  };

  const getImageSrc = (item, idx) => {
    if (imgFallback[idx] != null) return FALLBACK_IMAGES[imgFallback[idx]] || FALLBACK_IMAGES[0];
    return item.bgImage || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
  };

  const handleImgError = (idx) => {
    setImgFallback((prev) => ({
      ...prev,
      [idx]: Math.min((prev[idx] ?? -1) + 1, FALLBACK_IMAGES.length - 1),
    }));
  };

  return (
    <section className="ilmic-ref-hero relative bg-white overflow-hidden">
      <div className="ilmic-ref-hero__pattern absolute inset-0 pointer-events-none" aria-hidden />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10 pt-8 sm:pt-10 pb-24 sm:pb-28 lg:pt-12 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          <div className="max-w-[560px] w-full order-2 lg:order-1">
            <div className="ilmic-hero-carousel__copy" key={`copy-${current}`}>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ilmic-blue mb-3">
                {activeSlide.tagline || "ILMIC HEALTH CARE PVT. LTD."}
              </p>

              <h1 className="text-[1.65rem] sm:text-[2.5rem] lg:text-[2.75rem] font-extrabold text-[#0c2d4a] leading-[1.18] tracking-tight mb-4">
                {headline}
              </h1>

              <p className="text-[14px] sm:text-[15px] text-[#5a7285] leading-relaxed mb-5 max-w-[500px]">
                {activeSlide.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-[#1a3a52] mb-7">
              {(activeSlide.cities || "Delhi (India) · Luanda (Angola) · Global Export Markets")
                .split("·")
                .map((label) => label.trim())
                .filter(Boolean)
                .map((label) => (
                  <span key={label} className="inline-flex items-center gap-1.5">
                    {label.toLowerCase().includes("global") ? (
                      <FiGlobe className="w-3.5 h-3.5 text-ilmic-blue" />
                    ) : (
                      <FiMapPin className="w-3.5 h-3.5 text-ilmic-blue" />
                    )}
                    {label}
                  </span>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2.5 mb-7">
              {ctaPrimary?.link && (
                <Link
                  href={ctaPrimary.link}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-ilmic-blue text-white text-[13px] font-bold hover:bg-ilmic-blue-dark shadow-[0_4px_14px_rgba(30,90,158,0.35)] w-full sm:w-auto"
                >
                  <FiPackage className="w-4 h-4" />
                  {ctaPrimary.text}
                  <FiArrowRight className="w-3.5 h-3.5 opacity-80" />
                </Link>
              )}
              {ctaSecondary?.action === "enquiry" && (
                <button
                  type="button"
                  onClick={onEnquiry}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-white border border-[#b8d4e8] text-ilmic-blue text-[13px] font-bold hover:bg-[#f0f7fc] w-full sm:w-auto"
                >
                  {activeSlide.theme === "handshake" ? (
                    <FaHandshake className="w-4 h-4" />
                  ) : (
                    <FiSend className="w-4 h-4" />
                  )}
                  {ctaSecondary.text}
                </button>
              )}
              <a
                href={`tel:${tel}`}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-white border border-[#b8d4e8] text-[#1a3a52] text-[13px] font-bold hover:border-ilmic-blue hover:text-ilmic-blue w-full sm:w-auto"
              >
                <FiPhoneCall className="w-4 h-4 text-ilmic-blue" />
                Call Now
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-[#6b8499]">
              {[
                { icon: FiFileText, text: "Price: On Enquiry" },
                { icon: FiPackage, text: "Bulk Orders" },
                { icon: FiGlobe, text: "Export Documentation Support" },
              ].map(({ icon: Icon, text }, i) => (
                <span key={text} className="inline-flex items-center gap-1">
                  {i > 0 && <span className="text-[#c5d9e8]">|</span>}
                  <Icon className="w-3 h-3 text-ilmic-blue" />
                  {text}
                </span>
              ))}
            </div>

            {slideCount > 1 && (
              <div className="ilmic-hero-carousel__dots mt-6">
                {heroSlides.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    className={`ilmic-hero-carousel__dot ${
                      current === idx ? "ilmic-hero-carousel__dot--active" : ""
                    }`}
                    aria-label={`Banner ${idx + 1}: ${item.tagline || "slide"}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center lg:justify-end order-1 lg:order-2 w-full">
            <div className="relative w-full max-w-[540px] mx-auto lg:mx-0">
              <div className="ilmic-ref-hero__frame relative">
                <div className="ilmic-ref-hero__accent" aria-hidden />

                <div className="ilmic-ref-hero__image-wrap ilmic-hero-carousel__images">
                  {heroSlides.map((item, idx) => (
                    <img
                      key={idx}
                      src={getImageSrc(item, idx)}
                      alt=""
                      role="presentation"
                      className={`ilmic-hero-carousel__img ${
                        idx === current ? "ilmic-hero-carousel__img--active" : ""
                      }`}
                      onError={() => handleImgError(idx)}
                    />
                  ))}
                </div>

                {activeSlide.theme === "handshake" && (
                  <div className="ilmic-hero-carousel__handshake-float" aria-hidden>
                    <FaHandshake />
                  </div>
                )}

                {slideCount > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      className="ilmic-hero-carousel__nav ilmic-hero-carousel__nav--prev"
                      aria-label="Previous banner"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      className="ilmic-hero-carousel__nav ilmic-hero-carousel__nav--next"
                      aria-label="Next banner"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div
                  className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-auto z-20 bg-white rounded-xl shadow-[0_8px_30px_rgba(15,58,102,0.15)] border border-[#e8f0f6] px-4 py-3 sm:max-w-[240px] ilmic-hero-carousel__badge"
                  key={`badge-${current}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activeSlide.theme === "handshake"
                          ? "bg-[#e8f4fa] ilmic-hero-carousel__badge-icon--shake"
                          : "bg-[#e8f4fa]"
                      }`}
                    >
                      <BadgeIcon type={badge.icon} />
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-[#0c2d4a] leading-tight">
                        {badge.title}
                      </p>
                      <p className="text-[10.5px] text-[#6b8499] mt-0.5 leading-snug">
                        {badge.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourismHero;
