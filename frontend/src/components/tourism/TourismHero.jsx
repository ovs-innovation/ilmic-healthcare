import Link from "next/link";
import { useState } from "react";
import {
  FiSend,
  FiPhoneCall,
  FiMapPin,
  FiGlobe,
  FiShield,
  FiPackage,
  FiFileText,
  FiArrowRight,
} from "react-icons/fi";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1576086213369-97a3b6096d16?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1587854692152-cf240469e97e?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1532187863486-abf9db3851ee?auto=format&fit=crop&w=1600&q=90",
];

const TourismHero = ({ slide, ctaPrimary, ctaSecondary, onEnquiry, phone }) => {
  const [imgIndex, setImgIndex] = useState(0);
  if (!slide) return null;

  const tel = (phone || "+91 88102 72080").replace(/\s/g, "");
  const heroSrc = slide.bgImage || HERO_IMAGES[0];
  const displaySrc = imgIndex === 0 ? heroSrc : HERO_IMAGES[imgIndex] || HERO_IMAGES[0];

  return (
    <section className="ilmic-ref-hero relative bg-white overflow-hidden">
      {/* subtle hex/dot pattern like reference */}
      <div className="ilmic-ref-hero__pattern absolute inset-0 pointer-events-none" aria-hidden />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10 pt-8 sm:pt-10 pb-24 sm:pb-28 lg:pt-12 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          {/* LEFT — text */}
          <div className="max-w-[560px] w-full order-2 lg:order-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ilmic-blue mb-3">
              ILMIC HEALTH CARE PVT. LTD.
            </p>

            <h1 className="text-[1.65rem] sm:text-[2.5rem] lg:text-[2.75rem] font-extrabold text-[#0c2d4a] leading-[1.18] tracking-tight mb-4">
              Trusted Pharmaceutical Exporter &amp; Supplier Since 2021.
            </h1>

            <p className="text-[14px] sm:text-[15px] text-[#5a7285] leading-relaxed mb-5 max-w-[500px]">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-[#1a3a52] mb-7">
              {[
                { icon: FiMapPin, label: "Delhi (India)" },
                { icon: FiMapPin, label: "Luanda (Angola)" },
                { icon: FiGlobe, label: "Global Export Markets" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-ilmic-blue" />
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
                  <FiSend className="w-4 h-4" />
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
          </div>

          {/* RIGHT — image frame */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 w-full">
            <div className="relative w-full max-w-[540px] mx-auto lg:mx-0">
              {/* light blue outer frame */}
              <div className="ilmic-ref-hero__frame relative">
                {/* teal left accent curve */}
                <div className="ilmic-ref-hero__accent" aria-hidden />

                <div className="ilmic-ref-hero__image-wrap">
                  <img
                    src={displaySrc}
                    alt=""
                    role="presentation"
                    className="w-full h-full object-cover"
                    onError={() => setImgIndex((i) => Math.min(i + 1, HERO_IMAGES.length - 1))}
                  />
                </div>

                {/* Quality badge — bottom left like reference */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-auto z-20 bg-white rounded-xl shadow-[0_8px_30px_rgba(15,58,102,0.15)] border border-[#e8f0f6] px-4 py-3 sm:max-w-[230px]">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#e8f4fa] flex items-center justify-center flex-shrink-0">
                      <FiShield className="w-[18px] h-[18px] text-ilmic-blue" />
                    </div>
                    <div>
                      <p className="text-[13px] font-extrabold text-[#0c2d4a] leading-tight">Quality You Can Trust</p>
                      <p className="text-[10.5px] text-[#6b8499] mt-0.5 leading-snug">
                        We ensure GMP-certified products with global quality standards.
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
