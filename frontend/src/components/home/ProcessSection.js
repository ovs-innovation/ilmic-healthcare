import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import {
  IconPowerBadge,
  IconBrowseCatalog,
  IconQuoteOrder,
  IconDeliverSupport,
  WhyIconTile,
} from "@components/home/WhyChooseIcons";

const STEPS = [
  {
    num: "01",
    Icon: IconBrowseCatalog,
    variant: "blue",
    title: "Browse & Choose",
    desc: "Explore BMS boards, lithium cells, battery packs and accessories for EV, solar and industrial projects.",
    href: "/search",
    linkLabel: "View Products",
  },
  {
    num: "02",
    Icon: IconQuoteOrder,
    variant: "red",
    title: "Order or Get Quote",
    desc: "Buy online instantly, place bulk orders, or request a custom quote for tailored battery pack solutions.",
    href: "/request-a-quote",
    linkLabel: "Request Quote",
  },
  {
    num: "03",
    Icon: IconDeliverSupport,
    variant: "green",
    title: "Delivery & Support",
    desc: "Get pan-India delivery with GST invoice plus expert technical guidance and after-sales support.",
    href: "/contact-us",
    linkLabel: "Contact Us",
  },
];

const ProcessStep = ({ step }) => {
  const { num, Icon, variant, title, desc, href, linkLabel } = step;

  return (
    <div className="process-step-card relative flex flex-col h-full">
      <div className="relative bg-white rounded-2xl border border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.18)] p-6 sm:p-7 h-full flex flex-col transition-transform duration-300 hover:-translate-y-1">
        <span
          className="absolute top-4 right-5 text-[#0b1d3d]/[0.06] text-[3.5rem] sm:text-6xl font-black leading-none select-none pointer-events-none"
          aria-hidden
        >
          {num}
        </span>

        <div className="flex items-center gap-3 mb-5">
          <WhyIconTile variant={variant} size="lg">
            <Icon className="w-[22px] h-[22px] sm:w-6 sm:h-6" />
          </WhyIconTile>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ED1C24]">
            Step {num}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-[#0b1d3d] mb-2.5 leading-snug pr-6">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{desc}</p>

        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0088FF] hover:text-[#0b1d3d] transition-colors group/link w-fit"
        >
          {linkLabel}
          <FiArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  return (
    <section className="relative py-14 sm:py-16 lg:py-20 overflow-hidden process-section-bg">
      <div className="absolute inset-0 process-section-dots pointer-events-none" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-1/4 w-72 h-72 bg-[#0088FF] rounded-full blur-[120px] opacity-[0.08]" />
        <div className="absolute -right-24 bottom-0 w-80 h-80 bg-[#ED1C24] rounded-full blur-[120px] opacity-[0.07]" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <WhyIconTile variant="blue" size="sm" className="!shadow-none ring-1 ring-white/20">
              <IconPowerBadge className="w-3.5 h-3.5 text-[#5eb8ff]" />
            </WhyIconTile>
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#5eb8ff]">
              How It Works
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-black text-white leading-tight tracking-tight mb-4">
            Three Simple Steps to{" "}
            <span className="text-[#0088FF]">Power Your Project</span>
          </h2>

          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mx-auto">
            From selecting the right BMS to receiving pan-India delivery — Kure Pharma makes
            battery sourcing fast, reliable and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 mb-10 sm:mb-12">
          {STEPS.map((step) => (
            <ProcessStep key={step.num} step={step} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#ED1C24] hover:bg-[#d41820] text-white font-bold text-sm transition-colors shadow-[0_6px_20px_rgba(237,28,36,0.35)] w-full sm:w-auto"
          >
            Browse Products
            <FiArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/request-a-quote"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/25 text-white font-bold text-sm transition-colors backdrop-blur-sm w-full sm:w-auto"
          >
            Get Custom Quote
          </Link>
        </div>
      </div>

      <style>{`
        .process-section-bg {
          background: linear-gradient(165deg, #0b2a66 0%, #06204a 42%, #021533 100%);
        }

        .process-section-dots {
          background-image: radial-gradient(rgba(0, 136, 255, 0.22) 1px, transparent 1px);
          background-size: 22px 22px;
          mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, black 0%, transparent 100%);
          opacity: 0.35;
        }

        @media (min-width: 1024px) {
          .process-step-card:not(:last-child)::after {
            content: "";
            position: absolute;
            top: 50%;
            right: -1.25rem;
            width: 2.5rem;
            height: 2px;
            background: linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05));
            transform: translateY(-50%);
            pointer-events: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;
