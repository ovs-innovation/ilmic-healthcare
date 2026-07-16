import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

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

const SLIDER_IMAGES = [
  "/im1.jpg",
  "/im2.jpg",
  "/im3.jpg",
  "/im4.jpg"
];

const TourismHero = ({ slide, ctaPrimary, ctaSecondary, onEnquiry, phone }) => {
  if (!slide) return null;

  const tel = (phone || "+91 88102 72080").replace(/\s/g, "");

  return (
    <section className="ilmic-ref-hero relative overflow-hidden bg-white">
      <style>{`
        @keyframes diagonalGrid {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes floatSlow1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(6deg); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-8deg); }
        }
        @keyframes floatSlow3 {
          0%, 100% { transform: translateY(0px) translate(0px) rotate(0deg); }
          50% { transform: translateY(-10px) translateX(10px) rotate(12deg); }
        }
        @keyframes mapDrift {
          0%, 100% { transform: translateX(-3%) scale(1.02); }
          50% { transform: translateX(3%) scale(0.98); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; transform: scale(0.97); }
          50% { opacity: 0.45; transform: scale(1.03); }
        }
        @keyframes beamSweep {
          0% { transform: translateX(-100%) skewX(-15deg); }
          30%, 100% { transform: translateX(300%) skewX(-15deg); }
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }
        .bg-grid-animate {
          animation: diagonalGrid 20s linear infinite;
        }
        .animate-float-1 {
          animation: floatSlow1 12s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: floatSlow2 16s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: floatSlow3 20s ease-in-out infinite;
        }
        .animate-map-drift {
          animation: mapDrift 40s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow 5s ease-in-out infinite;
        }
        .animate-beam {
          animation: beamSweep 10s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
        .animate-blob-1 {
          animation: blobFloat 25s ease-in-out infinite;
        }
        .animate-blob-2 {
          animation: blobFloat 30s ease-in-out infinite-reverse;
        }
        .swiper {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
        }
        .swiper-slide {
          width: 100%;
          height: 100%;
          position: relative;
        }
        @keyframes auroraFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blobFloat1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(120px, -80px) rotate(120deg); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-140px, 90px) rotate(-120deg); }
        }
        @keyframes blobFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(80px, -110px) scale(1.12); }
        }
        @keyframes blobFloat4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(-90px, -70px) rotate(90deg) scale(0.9); }
        }
        @keyframes particleDrift {
          0% { transform: translateY(150px) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.55; }
          90% { opacity: 0.55; }
          100% { transform: translateY(-150px) translateX(30px) scale(0.7); opacity: 0; }
        }
        @keyframes pulseGlowPoint {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.5); opacity: 0.85; }
        }
        @keyframes dnaRotation {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes hexGridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 80px 40px; }
        }
        @keyframes iconFloatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(15deg); }
        }
        @keyframes moleculeRotateFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, 20px) rotate(10deg); }
        }
        @keyframes ecgPulseLine {
          0% { stroke-dashoffset: 1200; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes raysMovement {
          0% { background-position: 0% 0%; }
          100% { background-position: 200px 100px; }
        }
        @keyframes glassPanelsFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(8deg); }
        }
        .hero-aurora-bg {
          background: linear-gradient(135deg, #FFFFFF 30%, #F3E8FF 55%, #E0F2FE 75%, #FFFFFF 100%);
          background-size: 400% 400%;
          animation: auroraFlow 32s ease-in-out infinite;
        }
        .hero-hex-grid {
          background-image: 
            linear-gradient(30deg, rgba(37, 99, 235, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(37, 99, 235, 0.02) 87.5%, rgba(37, 99, 235, 0.02)),
            linear-gradient(150deg, rgba(37, 99, 235, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(37, 99, 235, 0.02) 87.5%, rgba(37, 99, 235, 0.02)),
            linear-gradient(270deg, rgba(37, 99, 235, 0.02) 12%, transparent 12.5%, transparent 87%, rgba(37, 99, 235, 0.02) 87.5%, rgba(37, 99, 235, 0.02));
          background-size: 40px 70px;
          animation: hexGridScroll 50s linear infinite;
        }
        .hero-noise-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.015;
        }
        .hero-light-rays {
          background: repeating-linear-gradient(60deg, transparent, transparent 60px, rgba(255, 255, 255, 0.12) 60px, rgba(255, 255, 255, 0.12) 120px);
          animation: raysMovement 45s linear infinite;
        }
        .animate-blob-1-fast {
          animation: blobFloat1 18s ease-in-out infinite alternate;
        }
        .animate-blob-2-med {
          animation: blobFloat2 24s ease-in-out infinite alternate;
        }
        .animate-blob-3-slow {
          animation: blobFloat3 30s ease-in-out infinite alternate;
        }
        .animate-blob-4-extraslow {
          animation: blobFloat4 36s ease-in-out infinite alternate;
        }
        .animate-particle-1 { animation: particleDrift 14s linear infinite; }
        .animate-particle-2 { animation: particleDrift 18s linear infinite 2s; }
        .animate-particle-3 { animation: particleDrift 22s linear infinite 4s; }
        .animate-particle-4 { animation: particleDrift 20s linear infinite 1s; }
        .animate-particle-5 { animation: particleDrift 26s linear infinite 5s; }
        .animate-pulse-glow-point {
          animation: pulseGlowPoint 3s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-dna-rotation {
          animation: dnaRotation 40s linear infinite;
        }
        .animate-icon-float-1 {
          animation: iconFloatSlow 12s ease-in-out infinite;
        }
        .animate-icon-float-2 {
          animation: iconFloatSlow 15s ease-in-out infinite 2s;
        }
        .animate-molecule-float {
          animation: moleculeRotateFloat 16s ease-in-out infinite;
        }
        .animate-ecg-pulse-line {
          stroke-dasharray: 240 600;
          animation: ecgPulseLine 12s linear infinite;
        }
        .animate-glass-panels {
          animation: glassPanelsFloat 20s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Layer 1: Large animated Aurora Gradient background */}
      <div className="absolute inset-0 hero-aurora-bg z-0 pointer-events-none" />

      {/* Layer 2: Large blurred colorful blobs (Drifting at independent speeds/angles) */}
      {/* Blue Blob - Top Left */}
      <div className="absolute top-[-15%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-[#2563EB]/[0.22] blur-[140px] animate-blob-1-fast pointer-events-none z-0" />
      {/* Purple Blob - Top Right */}
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#8B5CF6]/[0.20] blur-[150px] animate-blob-2-med pointer-events-none z-0" />
      {/* Cyan Blob - Bottom Left */}
      <div className="absolute bottom-[-15%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-[#06B6D4]/[0.22] blur-[130px] animate-blob-3-slow pointer-events-none z-0" />
      {/* Gold Blob - Bottom Right */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FBBF24]/[0.18] blur-[150px] animate-blob-4-extraslow pointer-events-none z-0" />
      {/* Soft Pink Blob - Center Right */}
      <div className="absolute top-[20%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-[#EC4899]/[0.18] blur-[140px] animate-blob-3-slow pointer-events-none z-0" />

      {/* Layer 3: Floating glowing particles (Drifting & Staggered) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#2563EB]/40 blur-[0.5px] left-[15%] bottom-[10%] animate-particle-1" />
        <div className="absolute w-2 h-2 rounded-full bg-[#8B5CF6]/50 blur-[0.5px] left-[45%] bottom-[30%] animate-particle-2" />
        <div className="absolute w-3 h-3 rounded-full bg-[#06B6D4]/40 left-[75%] bottom-[20%] animate-particle-3" />
        <div className="absolute w-2 h-2 rounded-full bg-[#EC4899]/50 blur-[0.5px] left-[30%] top-[25%] animate-particle-4" />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#FBBF24]/40 left-[85%] top-[15%] animate-particle-5" />
      </div>

      {/* Layer 4: Medical Network Constellation Nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.40] pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <g stroke="rgba(37, 99, 235, 0.15)" strokeWidth="1.2">
          <line x1="10%" y1="15%" x2="22%" y2="28%" strokeDasharray="3 3" />
          <line x1="22%" y1="28%" x2="15%" y2="48%" />
          <line x1="15%" y1="48%" x2="5%" y2="60%" />
        </g>
        <g stroke="rgba(139, 92, 246, 0.15)" strokeWidth="1.2">
          <line x1="85%" y1="12%" x2="94%" y2="28%" />
          <line x1="94%" y1="28%" x2="88%" y2="48%" strokeDasharray="4 4" />
        </g>
        <g className="animate-pulse-glow-point">
          <circle cx="10%" cy="15%" r="4" fill="#2563EB" />
          <circle cx="22%" cy="28%" r="6.5" fill="#8B5CF6" />
          <circle cx="15%" cy="48%" r="4.5" fill="#06B6D4" />
          <circle cx="5%" cy="60%" r="4" fill="#14B8A6" />
          <circle cx="85%" cy="12%" r="4" fill="#8B5CF6" />
          <circle cx="94%" cy="28%" r="6" fill="#FBBF24" />
          <circle cx="88%" cy="48%" r="4.5" fill="#EC4899" />
        </g>
      </svg>

      {/* Layer 5: Large Faint Rotating DNA Helix outline */}
      <div className="absolute top-[10%] left-[2%] w-24 h-48 opacity-[0.035] animate-dna-rotation pointer-events-none z-0">
        <svg viewBox="0 0 50 100" fill="none" stroke="#2563EB" strokeWidth="2.5" className="w-full h-full">
          <path d="M10 10 C 25 30, 25 70, 10 90 M40 10 C 25 30, 25 70, 40 90 M10 10 L40 10 M10 30 L40 30 M15 50 L35 50 M10 70 L40 70 M10 90 L40 90" />
        </svg>
      </div>

      {/* Layer 6: Hexagon Pattern Grid scrolling very slowly */}
      <div className="absolute inset-0 hero-hex-grid z-0 pointer-events-none opacity-80" />

      {/* Layer 7: Medical Cross Icons floating */}
      <div className="absolute top-[8%] left-[18%] w-6 h-6 opacity-[0.08] animate-icon-float-1 pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M19 12H5M12 19V5" />
        </svg>
      </div>
      <div className="absolute bottom-[25%] right-[28%] w-8 h-8 opacity-[0.06] animate-icon-float-2 pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M19 12H5M12 19V5" />
        </svg>
      </div>

      {/* Layer 8: Molecule Structures floating */}
      <div className="absolute top-[40%] right-[22%] w-10 h-10 opacity-[0.07] animate-molecule-float pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" className="w-full h-full">
          <circle cx="12" cy="12" r="3" /><circle cx="19" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" />
          <line x1="12" y1="12" x2="19" y2="5" /><line x1="12" y1="12" x2="5" y2="19" /><line x1="12" y1="12" x2="19" y2="19" />
        </svg>
      </div>
      <div className="absolute bottom-[15%] left-[28%] w-12 h-12 opacity-[0.06] animate-molecule-float pointer-events-none z-0" style={{ animationDelay: "1.5s" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#14B8A6" strokeWidth="2" className="w-full h-full">
          <circle cx="12" cy="12" r="3" /><circle cx="19" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" />
          <line x1="12" y1="12" x2="19" y2="5" /><line x1="12" y1="12" x2="5" y2="19" /><line x1="12" y1="12" x2="19" y2="19" />
        </svg>
      </div>

      {/* Layer 9: ECG Heartbeat Line running along the bottom */}
      <div className="absolute bottom-[8%] left-0 right-0 h-16 opacity-[0.05] pointer-events-none z-0">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full" stroke="#2563EB" strokeWidth="2" fill="none">
          <path d="M 0 50 L 300 50 L 310 20 L 320 80 L 330 40 L 340 55 L 350 50 L 650 50 L 660 20 L 670 80 L 680 40 L 690 55 L 700 50 L 1000 50" className="animate-ecg-pulse-line" />
        </svg>
      </div>

      {/* Layer 10: Soft diagonal light rays */}
      <div className="absolute inset-0 hero-light-rays z-0 pointer-events-none opacity-40" />

      {/* Layer 11: Floating translucent glass panels */}
      <div className="absolute top-[25%] left-[8%] w-32 h-32 rounded-2xl border border-white/30 bg-white/5 backdrop-blur-[6px] shadow-sm animate-glass-panels pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-40 h-40 rounded-3xl border border-white/20 bg-white/3 backdrop-blur-[8px] shadow-md animate-glass-panels pointer-events-none z-0" style={{ animationDelay: "2s" }} />

      {/* Layer 12: Super subtle paper/noise overlay texture to give depth */}
      <div className="absolute inset-0 hero-noise-texture z-0 pointer-events-none" />

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
                  <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    speed={600}
                    className="w-full h-full"
                  >
                    {SLIDER_IMAGES.map((src, idx) => (
                      <SwiperSlide key={src} className="relative w-full h-full">
                        <Image
                          src={src}
                          alt={`Pharmaceutical slide ${idx + 1}`}
                          fill
                          priority={idx === 0}
                          loading={idx === 0 ? undefined : "lazy"}
                          className="object-cover w-full h-full"
                          sizes="(max-w-7xl) 50vw, 100vw"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
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
