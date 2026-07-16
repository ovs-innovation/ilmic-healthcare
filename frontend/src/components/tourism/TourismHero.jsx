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

const BUBBLES = Array.from({ length: 22 }, (_, idx) => {
  const sizes = [18, 24, 32, 40, 60, 80];
  const size = sizes[idx % sizes.length];
  const left = (idx * 4.5 + 5) % 95;
  const duration = 16 + (idx % 10) * 3;
  const delay = idx * 0.5;
  const driftX = (idx % 2 === 0 ? 35 : -35) + (idx % 4) * 6;
  const hasIcon = idx % 5 === 0 ? 'cross' : idx % 7 === 0 ? 'shield' : null;
  return { idx, size, left, duration, delay, driftX, hasIcon };
});

const SHAPES = Array.from({ length: 10 }, (_, idx) => {
  const types = ["square", "hexagon", "rect", "card", "panel"];
  const type = types[idx % types.length];
  const size = 60 + (idx % 5) * 40;
  const left = (idx * 9 + 8) % 85;
  const top = (idx * 8 + 12) % 75;
  const duration = 20 + (idx % 4) * 5;
  const isFilled = idx % 3 === 0;
  const icon = idx === 1 ? 'dna' : idx === 3 ? 'capsule' : idx === 5 ? 'shield' : idx === 7 ? 'cross' : idx === 9 ? 'heartbeat' : null;
  return { idx, type, size, left, top, duration, isFilled, icon };
});

const COLORED_PARTICLES = Array.from({ length: 48 }, (_, idx) => {
  const colors = ["#5AA9FF", "#43D9FF", "#8B7CFF", "#5BE7C4", "#FF7AB8"];
  const color = colors[idx % colors.length];
  const size = 3 + (idx % 3) * 2;
  const left = (idx * 2.1 + 4) % 95;
  const bottom = (idx * 1.9 + 5) % 95;
  const duration = 15 + (idx % 12) * 3;
  const delay = idx * 0.25;
  const driftX = (idx % 2 === 0 ? 40 : -40) + (idx % 4) * 8;
  const driftY = (idx % 3 === 0 ? -40 : -80) - (idx % 5) * 5;
  const maxOpacity = 0.2 + (idx % 3) * 0.12;
  return { idx, color, size, left, bottom, duration, delay, driftX, driftY, maxOpacity };
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
        @keyframes blobFloat1 {
          0%, 100% { transform: translate(calc(var(--mouse-x) * -25px), calc(var(--mouse-y) * -25px)) scale(1); }
          50% { transform: translate(calc(80px + var(--mouse-x) * -25px), calc(-50px + var(--mouse-y) * -25px)) scale(1.15); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(calc(var(--mouse-x) * -15px), calc(var(--mouse-y) * -15px)) scale(1.1); }
          50% { transform: translate(calc(-90px + var(--mouse-x) * -15px), calc(70px + var(--mouse-y) * -15px)) scale(0.9); }
        }
        @keyframes blobFloat3 {
          0%, 100% { transform: translate(calc(var(--mouse-x) * -20px), calc(var(--mouse-y) * -20px)) scale(0.95); }
          50% { transform: translate(calc(60px + var(--mouse-x) * -20px), calc(90px + var(--mouse-y) * -20px)) scale(1.1); }
        }
        @keyframes blobFloat4 {
          0%, 100% { transform: translate(calc(var(--mouse-x) * -10px), calc(var(--mouse-y) * -10px)) scale(1.05); }
          50% { transform: translate(calc(-70px + var(--mouse-x) * -10px), calc(-80px + var(--mouse-y) * -10px)) scale(0.9); }
        }
        @keyframes blobFloat5 {
          0%, 100% { transform: translate(calc(var(--mouse-x) * -30px), calc(var(--mouse-y) * -30px)) scale(1.0); }
          50% { transform: translate(calc(50px + var(--mouse-x) * -30px), calc(-60px + var(--mouse-y) * -30px)) scale(1.2); }
        }
        @keyframes bubbleFloat {
          0% { transform: translateY(115vh) translateX(0) scale(0.85); opacity: 0; }
          10% { opacity: 0.75; }
          90% { opacity: 0.75; }
          100% { transform: translateY(-15vh) translateX(var(--bubble-drift-x, 25px)) scale(1.15); opacity: 0; }
        }
        @keyframes shapeFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) translate(calc(var(--mouse-x) * -12px), calc(var(--mouse-y) * -12px)); }
          50% { transform: translateY(-25px) rotate(8deg) translate(calc(var(--mouse-x) * -12px + 5px), calc(var(--mouse-y) * -12px - 5px)); }
        }
        @keyframes randomDrift {
          0%, 100% { transform: translate(0, 0) scale(1) translate(calc(var(--mouse-x) * -20px), calc(var(--mouse-y) * -20px)); opacity: 0.15; }
          50% { transform: translate(var(--drift-x, 30px), var(--drift-y, -60px)) scale(1.2) translate(calc(var(--mouse-x) * -20px), calc(var(--mouse-y) * -20px)); opacity: var(--max-opacity, 0.4); }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.08; }
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
          15% { opacity: 0.15; }
          30% { transform: translateX(250%) skewX(-15deg); opacity: 0; }
          100% { transform: translateX(250%) skewX(-15deg); opacity: 0; }
        }
        .hero-aurora-bg {
          background: #FFFFFF;
        }
        .hero-hex-grid {
          background-image: 
            linear-gradient(30deg, rgba(37, 99, 235, 0.4) 12%, transparent 12.5%, transparent 87%, rgba(37, 99, 235, 0.4) 87.5%, rgba(37, 99, 235, 0.4)),
            linear-gradient(150deg, rgba(37, 99, 235, 0.4) 12%, transparent 12.5%, transparent 87%, rgba(37, 99, 235, 0.4) 87.5%, rgba(37, 99, 235, 0.4)),
            linear-gradient(270deg, rgba(37, 99, 235, 0.4) 12%, transparent 12.5%, transparent 87%, rgba(37, 99, 235, 0.4) 87.5%, rgba(37, 99, 235, 0.4));
          background-size: 40px 70px;
          animation: hexGridScroll 50s linear infinite, gridPulse 6s ease-in-out infinite;
        }
        .hero-noise-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.015;
        }
        .hero-light-rays {
          background: repeating-linear-gradient(60deg, transparent, transparent 80px, rgba(90, 169, 255, 0.1) 80px, rgba(90, 169, 255, 0.1) 160px);
          animation: raysMovement 45s linear infinite;
          opacity: 0.06;
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

      {/* LAYER 1: Aurora Gradient & Moving Colorful Glow Blobs (White Base) */}
      <div className="absolute inset-0 hero-aurora-bg z-0 pointer-events-none" />
      {/* Soft Blue */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#5AA9FF]/[0.15] blur-[130px] animate-blob-1-fast pointer-events-none z-0" />
      {/* Purple */}
      <div className="absolute top-[-15%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#8B7CFF]/[0.12] blur-[150px] animate-blob-2-med pointer-events-none z-0" />
      {/* Cyan */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#43D9FF]/[0.15] blur-[130px] animate-blob-3-slow pointer-events-none z-0" />
      {/* Mint */}
      <div className="absolute bottom-[-15%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#5BE7C4]/[0.10] blur-[150px] animate-blob-4-extraslow pointer-events-none z-0" />
      {/* Pink Accent */}
      <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#FF7AB8]/[0.10] blur-[140px] animate-blob-2-med pointer-events-none z-0" />
      {/* Very Light Indigo */}
      <div className="absolute top-[35%] left-[15%] w-[42vw] h-[42vw] rounded-full bg-[#DDE8FF]/[0.18] blur-[120px] animate-blob-3-slow pointer-events-none z-0" />

      {/* LAYER 3: Premium Floating Geometric Glass Boxes/Panels (z-index 1 - behind bubbles) */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {SHAPES.map((shape) => {
          let shapeClasses = "absolute flex items-center justify-center pointer-events-none transition-all ";
          if (shape.type === "square") shapeClasses += "rounded-3xl ";
          else if (shape.type === "hexagon") shapeClasses += "rounded-2xl ";
          else if (shape.type === "rect") shapeClasses += "rounded-[24px] ";
          else if (shape.type === "card") shapeClasses += "rounded-[32px] ";
          else shapeClasses += "rounded-[36px] ";

          if (shape.isFilled) {
            shapeClasses += "bg-white/12 border border-white/35 backdrop-blur-[12px] shadow-sm shadow-white/10";
          } else {
            shapeClasses += "border border-white/20 bg-transparent";
          }

          return (
            <div
              key={shape.idx}
              className={shapeClasses}
              style={{
                width: shape.type === "rect" || shape.type === "panel" ? `${shape.size * 1.5}px` : `${shape.size}px`,
                height: `${shape.size}px`,
                left: `${shape.left}%`,
                top: `${shape.top}%`,
                opacity: 0.12,
                animation: `shapeFloat ${shape.duration}s ease-in-out infinite alternate`,
                animationDelay: `${shape.idx * 0.4}s`
              }}
            >
              {shape.icon && renderShapeIcon(shape.icon)}
            </div>
          );
        })}
      </div>

      {/* LAYER 5: Softly Glowing Technology Connection Network Lines (z-index 2) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[2]" viewBox="0 0 1000 700" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M -50 150 Q 150 120 280 250" stroke="rgba(90, 169, 255, 0.22)" strokeWidth="1" fill="none" />
        <circle r="2.5" fill="#43D9FF" opacity="0.95">
          <animateMotion dur="12s" repeatCount="indefinite" path="M -50 150 Q 150 120 280 250" />
        </circle>

        <path d="M 280 250 L 150 450" stroke="rgba(139, 124, 255, 0.22)" strokeWidth="1" fill="none" />
        <circle r="2.5" fill="#8B7CFF" opacity="0.95">
          <animateMotion dur="10s" repeatCount="indefinite" path="M 280 250 L 150 450" />
        </circle>

        <path d="M 150 450 Q 400 480 650 350" stroke="rgba(91, 231, 196, 0.22)" strokeWidth="1" fill="none" />
        <circle r="2.5" fill="#5BE7C4" opacity="0.95">
          <animateMotion dur="15s" repeatCount="indefinite" path="M 150 450 Q 400 480 650 350" />
        </circle>

        <path d="M 850 100 Q 750 300 900 420" stroke="rgba(255, 122, 184, 0.22)" strokeWidth="1" fill="none" />
        <circle r="2.5" fill="#FF7AB8" opacity="0.95">
          <animateMotion dur="14s" repeatCount="indefinite" path="M 850 100 Q 750 300 900 420" />
        </circle>

        <path d="M 900 420 L 700 600" stroke="rgba(90, 169, 255, 0.22)" strokeWidth="1" fill="none" />
        <circle r="2.5" fill="#5AA9FF" opacity="0.95">
          <animateMotion dur="9s" repeatCount="indefinite" path="M 900 420 L 700 600" />
        </circle>

        <path d="M 400 80 L 550 200" stroke="rgba(139, 124, 255, 0.18)" strokeWidth="1" fill="none" />
        <circle r="2" fill="#8B7CFF" opacity="0.9">
          <animateMotion dur="11s" repeatCount="indefinite" path="M 400 80 L 550 200" />
        </circle>

        <path d="M 50 550 Q 300 650 500 500" stroke="rgba(91, 231, 196, 0.22)" strokeWidth="1" fill="none" />
        <circle r="2.5" fill="#5BE7C4" opacity="0.95">
          <animateMotion dur="16s" repeatCount="indefinite" path="M 50 550 Q 300 650 500 500" />
        </circle>
      </svg>

      {/* LAYER 6: Tiny Glowing Particles in Blue, Cyan, Purple, Mint, Pink (z-index 3) */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {COLORED_PARTICLES.map((p) => (
          <div
            key={p.idx}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              backgroundColor: p.color,
              filter: 'blur-[0.5px]',
              animation: `randomDrift ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              '--drift-x': `${p.driftX}px`,
              '--drift-y': `${p.driftY}px`,
              '--max-opacity': p.maxOpacity,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* LAYER 2: Floating Glass Bubbles (z-index 4 - in front) */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        {BUBBLES.map((b) => (
          <div
            key={b.idx}
            className="absolute flex items-center justify-center border border-white/45 bg-white/15 backdrop-blur-[12px] shadow-sm shadow-white/20 pointer-events-none rounded-full"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              bottom: '-10%',
              animation: `bubbleFloat ${b.duration}s linear infinite`,
              animationDelay: `${b.delay}s`,
              '--bubble-drift-x': `${b.driftX}px`,
              opacity: 0,
              transform: `translate(calc(var(--mouse-x) * 22px), calc(var(--mouse-y) * 22px))`
            }}
          >
            {b.hasIcon === 'cross' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="#FF7AB8" strokeWidth="3.5" className="w-[40%] h-[40%] opacity-80">
                <path d="M19 12H5M12 19V5" />
              </svg>
            )}
            {b.hasIcon === 'shield' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="#5AA9FF" strokeWidth="2.5" className="w-[40%] h-[40%] opacity-80">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            )}
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
        <div className="absolute top-0 bottom-0 w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" style={{ animation: "glassShimmer 10s ease-in-out infinite" }} />
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
