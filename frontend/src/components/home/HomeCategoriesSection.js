import React, { useContext } from "react";
import Link from "next/link";
import { FiArrowRight, FiGrid } from "react-icons/fi";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getCategorySearchUrl } from "@utils/categoryUrl";
import CategoryImage from "@components/common/CategoryImage";

const HomeCategoriesSection = () => {
  const { categories, isCategoriesLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  if (isCategoriesLoading) {
    return (
      <section className="bg-gray-50 py-10 lg:py-14">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-12">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="flex flex-nowrap gap-4 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[140px] sm:w-[160px] lg:flex-1 min-h-[200px] bg-white rounded-2xl animate-pulse border border-gray-100"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories?.length) return null;

  return (
    <section className="bg-gray-50 py-10 lg:py-14 border-y border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[#0b1d3d]/5 text-[10px] font-black text-[#0b1d3d] uppercase tracking-[0.2em]">
              <FiGrid className="w-3 h-3" />
              Shop by Category
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Browse Our Product Categories
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl">
              Electronics, batteries, components and industrial supplies — explore by category.
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-[11px] font-black text-[#0b1d3d] hover:text-[#ED1C24] uppercase tracking-widest transition-colors whitespace-nowrap"
          >
            View All Products <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-nowrap gap-3 sm:gap-4 overflow-x-auto pb-1 snap-x snap-mandatory lg:overflow-visible scrollbar-thin">
          {categories.map((cat) => {
            const name = showingTranslateValue(cat.name);
            if (!name) return null;
            const href = getCategorySearchUrl(cat._id, name, cat.slug);

            return (
              <Link
                key={cat._id}
                href={href}
                className="group flex flex-col flex-shrink-0 w-[42%] xs:w-[38%] sm:w-[28%] md:w-[22%] lg:flex-1 lg:min-w-0 lg:w-auto snap-start min-h-[200px] sm:min-h-[220px] bg-white rounded-2xl border border-gray-100 overflow-hidden text-center hover:shadow-[0_16px_48px_rgba(11,29,61,0.12)] sm:hover:-translate-y-1 hover:border-[#0b1d3d]/15 transition-all duration-300"
              >
                <CategoryImage
                  src={cat.icon}
                  alt={name}
                  className="w-full flex-[4] min-h-0 rounded-none"
                  aspectClass="aspect-[4/3]"
                  imageClassName="object-contain p-2 sm:p-3 group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 1024px) 40vw, 180px"
                  optimizeWidth={480}
                />
                <div className="flex-[1] flex items-center justify-center px-2 py-3 sm:px-3 border-t border-gray-50">
                  <h3 className="text-[10px] sm:text-[11px] font-black text-gray-800 group-hover:text-[#0b1d3d] leading-snug line-clamp-2 uppercase tracking-wide">
                    {name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(HomeCategoriesSection);
