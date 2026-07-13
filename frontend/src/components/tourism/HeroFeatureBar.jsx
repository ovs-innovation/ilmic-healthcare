import { FiPackage, FiGlobe, FiShield, FiHeadphones } from "react-icons/fi";

const ICON_BY_TITLE = {
  "Wide Range of Products": FiPackage,
  "Global Reach": FiGlobe,
  "Quality Assurance": FiShield,
  "Dedicated Support": FiHeadphones,
};

const DEFAULT_FEATURES = [
  { title: "Wide Range of Products", desc: "Oncology, General Pharma & Surgical solutions." },
  { title: "Global Reach", desc: "Exporting to 20+ countries across 4 continents." },
  { title: "Quality Assurance", desc: "GMP-compliant products with strict quality control." },
  { title: "Dedicated Support", desc: "End-to-end export & documentation support." },
];

const HeroFeatureBar = ({ features }) => {
  const items = (features?.length ? features : DEFAULT_FEATURES).map((f) => ({
    ...f,
    icon: f.icon || ICON_BY_TITLE[f.title] || FiPackage,
  }));

  return (
    <section className="relative z-20 -mt-8 sm:-mt-12 lg:-mt-[72px] pb-10 lg:pb-14">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-[#e8f0f6] shadow-[0_8px_40px_rgba(15,58,102,0.08)] px-6 py-7 sm:px-10 sm:py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4">
            {items.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-2.5 sm:gap-3.5 min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ilmic-blue flex items-center justify-center flex-shrink-0 shadow-[0_4px_12px_rgba(30,90,158,0.3)]">
                  <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-xs sm:text-[13.5px] font-extrabold text-[#0c2d4a] leading-snug mb-0.5 line-clamp-2">{title}</h3>
                  <p className="text-[11px] sm:text-[12.5px] text-[#6b8499] leading-relaxed line-clamp-2 sm:line-clamp-none">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFeatureBar;
