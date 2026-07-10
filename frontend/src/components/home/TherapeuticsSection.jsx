import Link from "next/link";
import { FiCheckCircle, FiArrowUpRight } from "react-icons/fi";
import { ilmicTherapeuticCategories } from "@utils/ilmicTherapeuticCategories";
import { THERAPEUTICS_SHOWCASE, isGenericProductImage } from "@utils/indianProductImages";

const TherapeuticsSection = ({ therapeutics = {} }) => {
  const categories = therapeutics.items?.length
    ? therapeutics.items
    : ilmicTherapeuticCategories;

  const showcaseImage = !isGenericProductImage(therapeutics.image)
    ? therapeutics.image
    : THERAPEUTICS_SHOWCASE.image;
  const showcaseLabel = therapeutics.imageLabel || THERAPEUTICS_SHOWCASE.label;
  const showcaseSubLabel =
    therapeutics.imageSubLabel || THERAPEUTICS_SHOWCASE.sublabel;

  return (
    <section className="ilmic-section ilmic-section-cream relative overflow-hidden">
      <div className="ilmic-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-4 space-y-4">
            <span className="ilmic-eyebrow">
              {therapeutics.badge || "Specialized Distribution"}
            </span>
            <h2 className="ilmic-section-title !text-left">
              {therapeutics.title || "Comprehensive Range of"}{" "}
              <span className="text-[#8B1A2E]">
                {therapeutics.titleHighlight || "Life-Saving"}
              </span>{" "}
              {therapeutics.titleSuffix || "Therapeutics"}
            </h2>
            <p className="ilmic-section-subtitle !mx-0 !text-left">
              {therapeutics.description ||
                "Authenticated Indian & licensed specialty medicines from trusted manufacturers — Zydus, Natco, Intas, Cipla, Sun Pharma and more — delivered pan-India with cold-chain handling."}
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="ilmic-therapeutics-showcase group">
              <div className="ilmic-therapeutics-showcase__media">
                <img
                  src={showcaseImage}
                  alt={showcaseLabel}
                  className="ilmic-therapeutics-showcase__img"
                />
              </div>
              <div className="ilmic-therapeutics-showcase__meta">
                <span className="ilmic-therapeutics-showcase__brand">
                  {showcaseLabel}
                </span>
                <span className="ilmic-therapeutics-showcase__note">
                  {showcaseSubLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            {categories.map((item) => {
              const label = item.name || item.label || item.category;
              const href = `/products?category=${encodeURIComponent(
                item.category || item.name,
              )}`;
              return (
                <Link
                  key={label}
                  href={href}
                  className="ilmic-card-flat flex items-center justify-between px-4 py-3 hover:border-[#1A2E5B]/20 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FiCheckCircle className="text-[#1A2E5B] w-4 h-4 flex-shrink-0" />
                    <span className="text-[14px] font-bold text-gray-700 truncate">
                      {label}
                    </span>
                  </div>
                  <FiArrowUpRight className="text-gray-300 w-3.5 h-3.5 flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapeuticsSection;
