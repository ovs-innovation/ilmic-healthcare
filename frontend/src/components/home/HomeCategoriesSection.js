import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiGrid } from "react-icons/fi";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getCategorySearchUrl } from "@utils/categoryUrl";

const HomeCategoriesSection = () => {
  const { categories, isCategoriesLoading } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  if (isCategoriesLoading) {
    return (
      <section className="bg-gray-50 py-10 lg:py-14">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-12">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 bg-white rounded-2xl animate-pulse border border-gray-100" />
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
              Click any category to view and buy products — lithium batteries, raw materials, and more.
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-[11px] font-black text-[#0b1d3d] hover:text-[#ED1C24] uppercase tracking-widest transition-colors whitespace-nowrap"
          >
            View All Products <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {categories.map((cat) => {
            const name = showingTranslateValue(cat.name);
            if (!name) return null;
            const href = getCategorySearchUrl(cat._id, name);

            return (
              <Link
                key={cat._id}
                href={href}
                className="group bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-5 flex flex-col items-center text-center hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:hover:-translate-y-1 hover:border-[#0b1d3d]/20 transition-all duration-300 min-h-[120px] sm:min-h-[160px] min-w-0"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-3 group-hover:bg-[#0b1d3d]/5 group-hover:border-[#0b1d3d]/10 transition-colors overflow-hidden flex-shrink-0">
                  {cat.icon ? (
                    <Image
                      src={cat.icon}
                      alt={name}
                      width={40}
                      height={40}
                      className="object-contain w-8 h-8 sm:w-10 sm:h-10"
                    />
                  ) : (
                    <FiGrid className="w-6 h-6 text-[#0b1d3d]/40 group-hover:text-[#ED1C24] transition-colors" />
                  )}
                </div>
                <h3 className="text-[11px] sm:text-xs font-black text-gray-800 group-hover:text-[#0b1d3d] leading-snug line-clamp-2 uppercase tracking-wide">
                  {name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeCategoriesSection;
