import { useRouter } from "next/router";
import React, { useContext, useRef } from "react";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller, Navigation, Pagination } from "swiper/modules";

import { getCategorySearchUrl } from "@utils/categoryUrl";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import CategoryCarouselSkeleton from "@components/skeleton/CategoryCarouselSkeleton";
import CategoryImage from "@components/common/CategoryImage";

const CategoryCarousel = ({ activeSlug }) => {
  const router = useRouter();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { showingTranslateValue } = useUtilsFunction();
  const { categories, isCategoriesLoading } = useContext(SidebarContext);

  const handleCategoryClick = (category) => {
    const category_name = showingTranslateValue(category?.name);
    const url = getCategorySearchUrl(category?._id, category_name, category?.slug);
    router.push(url);
  };

  const handleCategoryHover = (category) => {
    const category_name = showingTranslateValue(category?.name);
    const url = getCategorySearchUrl(category?._id, category_name, category?.slug);
    router.prefetch(url);
  };

  const enableLoop = categories.length > 6;

  if (isCategoriesLoading) {
    return <CategoryCarouselSkeleton />;
  }

  if (!categories.length) {
    return null;
  }

  return (
    <>
      <Swiper
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        navigation={true}
        allowTouchMove={true}
        loop={enableLoop}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 14,
          },
          480: {
            slidesPerView: 1.6,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2.2,
            spaceBetween: 18,
          },
          860: {
            slidesPerView: 2.8,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 22,
          },
          1280: {
            slidesPerView: 4.2,
            spaceBetween: 24,
          },
          1536: {
            slidesPerView: 5,
            spaceBetween: 26,
          },
        }}
        modules={[Autoplay, Navigation, Pagination, Controller]}
        className="mySwiper category-slider my-10"
      >
        {categories.map((category) => {
          const catSlug =
            category?.slug ||
            showingTranslateValue(category?.name)
              ?.toLowerCase()
              .replace(/[^A-Z0-9]+/gi, "-");
          const isActive =
            activeSlug === catSlug ||
            router.query._id === category?._id ||
            (router.query.category &&
              showingTranslateValue(category?.name)
                ?.toLowerCase()
                .replace(/[^A-Z0-9]+/gi, "-") === router.query.category);
          return (
            <SwiperSlide key={category._id} className="group px-2 py-3">
              <div
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={() => handleCategoryHover(category)}
                onTouchStart={() => handleCategoryHover(category)}
                className={`flex flex-col cursor-pointer bg-white rounded-2xl border overflow-hidden transition-all duration-300 w-full min-h-[240px] sm:min-h-[260px] md:min-h-[280px] mx-auto hover:shadow-[0_16px_48px_rgba(11,29,61,0.12)] sm:hover:-translate-y-1 ${
                  isActive
                    ? "border-[#A821A8] shadow-md ring-1 ring-[#A821A8]/20"
                    : "border-gray-100 hover:border-[#A821A8]/25 shadow-sm"
                }`}
              >
                <CategoryImage
                  src={category?.icon}
                  alt={showingTranslateValue(category?.name) || "category"}
                  className="w-full flex-[4] min-h-0 rounded-none"
                  aspectClass="aspect-[4/3]"
                  imageClassName="object-contain p-2 sm:p-3 group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 280px"
                  optimizeWidth={480}
                />

                <div className="flex-[1] flex items-center justify-center px-3 py-3 sm:px-4 sm:py-4 border-t border-gray-50 bg-white">
                  <h3
                    className={`text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-wide text-center line-clamp-2 leading-snug transition-colors duration-200 ${
                      isActive ? "text-[#A821A8]" : "text-gray-700 group-hover:text-[#A821A8]"
                    }`}
                  >
                    {showingTranslateValue(category?.name)}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <button ref={prevRef} className="prev">
          <IoChevronBackOutline />
        </button>
        <button ref={nextRef} className="next">
          <IoChevronForward />
        </button>
      </Swiper>
    </>
  );
};

export default React.memo(CategoryCarousel);
