import { useState, useEffect, useCallback } from "react";
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
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
} from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";

const SLIDER_IMAGES = [
  "/im1.jpg",
  "/im2.jpg",
  "/im3.jpg",
  "/im4.jpg"
];

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1200&q=85",
];

const GLASS_ORBS = Array.from({ length: 24 }, (_, idx) => {
  const sizes = [25, 40, 60, 90];
  const size = sizes[idx % sizes.length];
  const left = (idx * 4.1 + 4) % 95;
  const bottom = (idx * 3.8 + 8) % 92;
  const duration = 25 + (idx % 6) * 4;
  const delay = idx * 0.3;
  const glowColors = ["#5AA9FF", "#43D9FF", "#8B7CFF", "#5BE7C4"];
  const glowColor = glowColors[idx % glowColors.length];
  const driftX = (idx % 2 === 0 ? 20 : -20) + (idx % 3) * 4;
  const driftY = (idx % 2 === 0 ? -30 : -60) - (idx % 4) * 5;
  return { idx, size, left, bottom, duration, delay, glowColor, driftX, driftY };
});

const GLASS_PANELS = Array.from({ length: 8 }, (_, idx) => {
  const icons = ['dna', 'capsule', 'cross', 'heartbeat', 'shield', 'microscope'];
  const icon = icons[idx % icons.length];
  const size = 70 + (idx % 3) * 15;
  const left = (idx * 13 + 8) % 85;
  const top = (idx * 11 + 12) % 70;
  const duration = 30 + idx * 5;
  return { idx, icon, size, left, top, duration };
});

const MICRO_PARTICLES = Array.from({ length: 80 }, (_, idx) => {
  const colors = ["#5AA9FF", "#8B7CFF", "#5BE7C4", "#43D9FF", "#FFFFFF"];
  const color = colors[idx % colors.length];
  const size = 1.5 + (idx % 3) * 1.5;
  const left = (idx * 1.27 + 2) % 96;
  const bottom = (idx * 1.13 + 3) % 94;
  const duration = 20 + (idx % 15) * 2.5;
  const delay = idx * 0.2;
  const driftX = (idx % 2 === 0 ? 25 : -25) + (idx % 3) * 5;
  const driftY = (idx % 3 === 0 ? -30 : -60) - (idx % 4) * 6;
  const maxOpacity = 0.25 + (idx % 4) * 0.12;
  const pulseSpeed = 2 + (idx % 4) * 1.5;
  return { idx, color, size, left, bottom, duration, delay, driftX, driftY, maxOpacity, pulseSpeed };
});

const renderShapeIcon = (icon) => {
  if (icon === 'dna') {
    return (
      <svg viewBox="0 0 50 100" fill="none" stroke="#5AA9FF" strokeWidth="2.5" className="w-[30%] h-[55%] opacity-[0.18] animate-pulse">
        <path d="M10 10 C 25 30, 25 70, 10 90 M40 10 C 25 30, 25 70, 40 90 M10 10 L40 10 M10 30 L40 30 M15 50 L35 50 M10 70 L40 70 M10 90 L40 90" />
      </svg>
    );
  }
  if (icon === 'capsule') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#FF7AB8" strokeWidth="2.5" className="w-[30%] h-[30%] opacity-[0.18] animate-pulse">
        <rect x="5" y="2" width="14" height="20" rx="7" transform="rotate(45 12 12)" />
        <line x1="7" y1="17" x2="17" y2="7" />
      </svg>
    );
  }
  if (icon === 'shield') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#8B7CFF" strokeWidth="2.5" className="w-[30%] h-[30%] opacity-[0.18] animate-pulse">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (icon === 'cross') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#5BE7C4" strokeWidth="3" className="w-[30%] h-[30%] opacity-[0.18] animate-pulse">
        <path d="M19 12H5M12 19V5" />
      </svg>
    );
  }
  if (icon === 'heartbeat') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#43D9FF" strokeWidth="2.5" className="w-[30%] h-[30%] opacity-[0.18] animate-pulse">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );
  }
  if (icon === 'microscope') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="#5AA9FF" strokeWidth="2.2" className="w-[30%] h-[30%] opacity-[0.18] animate-pulse">
        <path d="M6 18h8M3 22h14M12 18a4 4 0 0 0 4-4V7M9 3h3M9 3v11a3 3 0 0 0 3 3M16 7h2M16 11h1" />
      </svg>
    );
  }
  return null;
};

const getHeadline = (slide) => {
  if (slide?.titleLine1 && slide?.titleHighlight) {
    return `${slide.titleLine1} ${slide.titleHighlight}${slide.titleLine2 ? ` ${slide.titleLine2}` : "."
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
    <section className="ilmic-ref-hero relative overflow-hidden bg-white">
      <style>{`
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
        @keyframes auroraSilkFlow {
          0% { transform: translateY(0) scale(1) rotate(5deg) translate(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -8px)); }
          50% { transform: translateY(-20px) scale(1.08) rotate(12deg) translate(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -8px)); }
          100% { transform: translateY(15px) scale(0.95) rotate(-3deg) translate(calc(var(--mouse-x) * -8px), calc(var(--mouse-y) * -8px)); }
        }
        @keyframes waterFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(var(--drift-x, 20px), var(--drift-y, -40px)); }
        }
        @keyframes ringPulseSlow {
          0% { transform: scale(0.95) rotate(0deg); opacity: 0.03; }
          50% { transform: scale(1.03) rotate(180deg); opacity: 0.06; }
          100% { transform: scale(0.98) rotate(360deg); opacity: 0.04; }
        }
        @keyframes microPulse {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: var(--max-opacity, 0.6); transform: scale(1.15); }
        }
        @keyframes shapeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) translate(calc(var(--mouse-x) * 10px), calc(var(--mouse-y) * 10px)); }
          50% { transform: translateY(-25px) rotate(8deg) translate(calc(var(--mouse-x) * 10px + 3px), calc(var(--mouse-y) * 10px - 3px)); }
        }
        @keyframes randomDrift {
          0%, 100% { transform: translate(0, 0) translate(calc(var(--mouse-x) * -14px), calc(var(--mouse-y) * -14px)); }
          50% { transform: translate(var(--drift-x, 25px), var(--drift-y, -50px)) translate(calc(var(--mouse-x) * -14px), calc(var(--mouse-y) * -14px)); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.06; }
        }
        @keyframes hexGridScroll {
          0% { background-position: 0 0; }
          100% { background-position: 80px 40px; }
        }
        @keyframes raysMovement {
          0% { background-position: 0% 0%; }
          100% { background-position: 200px 100px; }
        }
        @keyframes glassShimmer {
          0% { transform: translateX(-150%) skewX(-15deg); opacity: 0; }
          15% { opacity: 0.08; }
          30% { transform: translateX(250%) skewX(-15deg); opacity: 0; }
          100% { transform: translateX(250%) skewX(-15deg); opacity: 0; }
        }
        .hero-aurora-bg {
          background: #FFFFFF;
        }
        .hero-hex-grid {
          background-image: 
            linear-gradient(30deg, rgba(37, 99, 235, 0.3) 12%, transparent 12.5%, transparent 87%, rgba(37, 99, 235, 0.3) 87.5%, rgba(37, 99, 235, 0.3)),
            linear-gradient(150deg, rgba(37, 99, 235, 0.3) 12%, transparent 12.5%, transparent 87%, rgba(37, 99, 235, 0.3) 87.5%, rgba(37, 99, 235, 0.3)),
            linear-gradient(270deg, rgba(37, 99, 235, 0.3) 12%, transparent 12.5%, transparent 87%, rgba(37, 99, 235, 0.3) 87.5%, rgba(37, 99, 235, 0.3));
          background-size: 40px 70px;
          animation: hexGridScroll 60s linear infinite, gridPulse 8s ease-in-out infinite;
        }
        .hero-noise-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.012;
        }
        .hero-light-rays {
          background: repeating-linear-gradient(60deg, transparent, transparent 80px, rgba(90, 169, 255, 0.08) 80px, rgba(90, 169, 255, 0.08) 160px);
          animation: raysMovement 45s linear infinite;
          opacity: 0.05;
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
      `}</style>

      {/* LAYER 1: Pure White Base */}
      <div className="absolute inset-0 hero-aurora-bg z-0 pointer-events-none" />

      {/* LAYER 2: Giant Aurora Flowing Ribbons (Silk-like, extremely slow) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.85]">
        {/* Blue/Indigo Ribbon */}
        <div 
          className="absolute w-[90vw] h-[25vw] top-[5%] left-[-20%] rounded-[100%_80%_60%_70%_/_80%_60%_80%_60%] blur-[150px] bg-gradient-to-r from-[#5AA9FF]/12 via-[#8B7CFF]/10 to-transparent"
          style={{ animation: 'auroraSilkFlow 35s ease-in-out infinite alternate' }}
        />
        {/* Cyan/Mint Ribbon */}
        <div 
          className="absolute w-[80vw] h-[20vw] bottom-[10%] right-[-10%] rounded-[90%_70%_80%_60%_/_70%_80%_60%_80%] blur-[130px] bg-gradient-to-r from-[#43D9FF]/10 via-[#5BE7C4]/12 to-transparent"
          style={{ animation: 'auroraSilkFlow 30s ease-in-out infinite alternate-reverse' }}
        />
        {/* Purple/Pink Ribbon */}
        <div 
          className="absolute w-[75vw] h-[22vw] top-[30%] left-[10%] rounded-[80%_90%_70%_85%_/_90%_70%_95%_80%] blur-[140px] bg-gradient-to-r from-[#8B7CFF]/8 via-[#FF7AB8]/10 to-transparent"
          style={{ animation: 'auroraSilkFlow 38s ease-in-out infinite alternate' }}
        />
      </div>

      {/* Interactive mouse spotlight glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 350px at calc(var(--mouse-x) * 100% + 50%) calc(var(--mouse-y) * 100% + 50%), rgba(90, 169, 255, 0.12) 0%, rgba(139, 124, 255, 0.04) 50%, transparent 100%)`,
        }}
      />

      {/* LAYER 4: Huge Glowing Energy Rings (Outline only, z-index 0) */}
      <div className="absolute top-[15%] left-[-10%] w-[1000px] h-[1000px] pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        {/* Ring 900px */}
        <div 
          className="absolute rounded-full border border-[#5AA9FF]/20"
          style={{
            width: '900px',
            height: '900px',
            opacity: 0.04,
            animation: 'ringPulseSlow 40s ease-in-out infinite alternate',
          }}
        />
        {/* Ring 700px */}
        <div 
          className="absolute rounded-full border border-dashed border-[#8B7CFF]/25"
          style={{
            width: '700px',
            height: '700px',
            opacity: 0.05,
            animation: 'ringPulseSlow 32s ease-in-out infinite alternate-reverse',
          }}
        />
        {/* Ring 500px */}
        <div 
          className="absolute rounded-full border border-[#5BE7C4]/25"
          style={{
            width: '500px',
            height: '500px',
            opacity: 0.04,
            animation: 'ringPulseSlow 25s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* LAYER 7: Floating Glass Panels with icons (z-index 1 - behind bubbles) */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {GLASS_PANELS.map((panel) => (
          <div
            key={panel.idx}
            className="absolute rounded-2xl border border-white/40 bg-white/8 backdrop-blur-[12px] shadow-sm flex items-center justify-center transition-transform duration-500 ease-out"
            style={{
              width: `${panel.size}px`,
              height: `${panel.size}px`,
              left: `${panel.left}%`,
              top: `${panel.top}%`,
              opacity: 0.14,
              animation: `shapeFloat ${panel.duration}s ease-in-out infinite alternate`,
              animationDelay: `${panel.idx * 0.6}s`,
              transform: `translate(calc(var(--mouse-x) * 10px), calc(var(--mouse-y) * 10px))`
            }}
          >
            {renderShapeIcon(panel.icon)}
          </div>
        ))}
      </div>

      {/* LAYER 5: Softly Glowing Technology Connection Network Lines (z-index 2) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-[2] transition-transform duration-500 ease-out" 
        viewBox="0 0 1000 700" 
        preserveAspectRatio="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `translate(calc(var(--mouse-x) * 6px), calc(var(--mouse-y) * 6px))` }}
      >
        {/* Line 1 */}
        <path d="M -50 150 Q 150 120 280 250" stroke="rgba(90, 169, 255, 0.2)" strokeWidth="1" fill="none" />
        <circle r="2" fill="#43D9FF" opacity="0.95">
          <animateMotion dur="12s" repeatCount="indefinite" path="M -50 150 Q 150 120 280 250" />
        </circle>

        {/* Line 2 (reversed direction) */}
        <path d="M 150 450 L 280 250" stroke="rgba(139, 124, 255, 0.2)" strokeWidth="1" fill="none" />
        <circle r="2" fill="#8B7CFF" opacity="0.95">
          <animateMotion dur="10s" repeatCount="indefinite" path="M 150 450 L 280 250" />
        </circle>

        {/* Line 3 (reversed direction) */}
        <path d="M 650 350 Q 400 480 150 450" stroke="rgba(91, 231, 196, 0.2)" strokeWidth="1" fill="none" />
        <circle r="2" fill="#5BE7C4" opacity="0.95">
          <animateMotion dur="15s" repeatCount="indefinite" path="M 650 350 Q 400 480 150 450" />
        </circle>

        {/* Line 4 */}
        <path d="M 850 100 Q 750 300 900 420" stroke="rgba(255, 122, 184, 0.2)" strokeWidth="1" fill="none" />
        <circle r="2" fill="#FF7AB8" opacity="0.95">
          <animateMotion dur="14s" repeatCount="indefinite" path="M 850 100 Q 750 300 900 420" />
        </circle>

        {/* Line 5 (reversed direction) */}
        <path d="M 700 600 L 900 420" stroke="rgba(90, 169, 255, 0.2)" strokeWidth="1" fill="none" />
        <circle r="2" fill="#5AA9FF" opacity="0.95">
          <animateMotion dur="9s" repeatCount="indefinite" path="M 700 600 L 900 420" />
        </circle>

        {/* Line 6 */}
        <path d="M 400 80 L 550 200" stroke="rgba(139, 124, 255, 0.15)" strokeWidth="1" fill="none" />
        <circle r="1.5" fill="#8B7CFF" opacity="0.9">
          <animateMotion dur="11s" repeatCount="indefinite" path="M 400 80 L 550 200" />
        </circle>

        {/* Line 7 (reversed direction) */}
        <path d="M 500 500 Q 300 650 50 550" stroke="rgba(91, 231, 196, 0.2)" strokeWidth="1" fill="none" />
        <circle r="2" fill="#5BE7C4" opacity="0.95">
          <animateMotion dur="16s" repeatCount="indefinite" path="M 500 500 Q 300 650 50 550" />
        </circle>
      </svg>

      {/* LAYER 5.2: Pulse ECG/DNA wave path */}
      <svg className="absolute bottom-[10%] left-0 right-0 h-[80px] w-full pointer-events-none opacity-[0.06] z-0" preserveAspectRatio="none" viewBox="0 0 1000 100">
        <path d="M 0 50 C 150 20, 150 80, 300 50 C 450 20, 450 80, 600 50 C 750 20, 750 80, 900 50 C 950 35, 980 65, 1000 50" stroke="#5BE7C4" strokeWidth="2.2" fill="none" strokeDasharray="6 6" />
        <path d="M 0 50 C 150 80, 150 20, 300 50 C 450 80, 450 20, 600 50 C 750 80, 750 20, 900 50 C 950 65, 980 35, 1000 50" stroke="#8B7CFF" strokeWidth="1.8" fill="none" />
      </svg>

      {/* LAYER 6: 80 Glowing Micro Particles (Drifting, pulsing, rotating) */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {MICRO_PARTICLES.map((p) => (
          <div
            key={p.idx}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              backgroundColor: p.color,
              boxShadow: p.color === "#FFFFFF" ? "0 0 6px #FFFFFF" : `0 0 6px ${p.color}`,
              animation: `randomDrift ${p.duration}s ease-in-out infinite, microPulse ${p.pulseSpeed}s ease-in-out infinite alternate`,
              animationDelay: `${p.delay}s`,
              '--drift-x': `${p.driftX}px`,
              '--drift-y': `${p.driftY}px`,
              '--max-opacity': p.maxOpacity,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* LAYER 3: Floating Premium Glass Orbs with High Gloss reflections (z-index 3 - Foreground) */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {GLASS_ORBS.map((b) => (
          <div
            key={b.idx}
            className="absolute pointer-events-none"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              bottom: `${b.bottom}%`,
              animation: `waterFloat ${b.duration}s ease-in-out infinite alternate`,
              animationDelay: `${b.delay}s`,
              '--drift-x': `${b.driftX}px`,
              '--drift-y': `${b.driftY}px`,
            }}
          >
            <div 
              className="relative w-full h-full rounded-full border border-white/50 backdrop-blur-[15px] flex items-center justify-center transition-transform duration-500 ease-out"
              style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 80%)`,
                boxShadow: `0 0 20px ${b.glowColor}1a, inset 0 0 12px rgba(255, 255, 255, 0.4), 0 4px 15px rgba(255, 255, 255, 0.1)`,
                transform: `translate(calc(var(--mouse-x) * 18px), calc(var(--mouse-y) * 18px))`
              }}
            >
              {/* Specular White glare crescent highlight */}
              <div className="absolute top-[12%] left-[12%] w-[25%] h-[25%] rounded-full bg-gradient-to-br from-white/95 to-white/0 pointer-events-none" />
              
              {/* Reflection sheen bottom highlight */}
              <div className="absolute bottom-[12%] right-[12%] w-[18%] h-[18%] rounded-full bg-white/30 blur-[0.5px] pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Grid Pattern Layer */}
      <div className="absolute inset-0 hero-hex-grid z-0 pointer-events-none" />

      {/* ECG Heartbeat Line Layer */}
      <div className="absolute bottom-[8%] left-0 right-0 h-16 opacity-[0.05] pointer-events-none z-0">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full" stroke="#2563EB" strokeWidth="2" fill="none">
          <path d="M 0 50 L 300 50 L 310 20 L 320 80 L 330 40 L 340 55 L 350 50 L 650 50 L 660 20 L 670 80 L 680 40 L 690 55 L 700 50 L 1000 50" className="animate-ecg-pulse-line" style={{ strokeDasharray: "240 600", animation: "ecgPulseLine 12s linear infinite" }} />
        </svg>
      </div>

      {/* Soft Moving Light Rays */}
      <div className="absolute inset-0 hero-light-rays z-0 pointer-events-none" />

      {/* Soft Glass Shimmer Sweep Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 bottom-0 w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" style={{ animation: "glassShimmer 9s ease-in-out infinite" }} />
      </div>

      {/* Super subtle paper/noise overlay texture to give depth */}
      <div className="absolute inset-0 hero-noise-texture z-0 pointer-events-none" />

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
              {ctaPrimary && (
                <button
                  type="button"
                  onClick={onEnquiry}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-ilmic-blue text-white text-[13px] font-bold hover:bg-ilmic-blue/90 w-full sm:w-auto shadow-md"
                >
                  <FiSend className="w-4 h-4" />
                  {ctaPrimary.text}
                </button>
              )}
              {ctaSecondary && (
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
                  <Icon className="w-3.5 h-3.5 text-ilmic-blue" />
                  {text}
                </span>
              ))}
            </div>


          </div>

          <div className="flex justify-center lg:justify-end order-1 lg:order-2 w-full">
            <div className="relative w-full max-w-[540px] mx-auto lg:mx-0">
              <div className="ilmic-ref-hero__frame relative">
                <div className="ilmic-ref-hero__accent" aria-hidden />

                <div className="ilmic-ref-hero__image-wrap">
                  <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    speed={900}
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
                          className="object-cover w-full h-full rounded-[inherit]"
                          sizes="(max-w-7xl) 50vw, 100vw"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {activeSlide.theme === "handshake" && (
                  <div className="ilmic-hero-carousel__handshake-float" aria-hidden>
                    <FaHandshake />
                  </div>
                )}

                <div
                  className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-auto z-20 bg-white rounded-xl shadow-[0_8px_30px_rgba(15,58,102,0.15)] border border-[#e8f0f6] px-4 py-3 sm:max-w-[240px] ilmic-hero-carousel__badge"
                  key={`badge-${current}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${activeSlide.theme === "handshake"
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
