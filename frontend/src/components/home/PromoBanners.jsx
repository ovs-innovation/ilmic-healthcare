import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import { CATEGORY_INDIAN_BRAND_IMAGES, isGenericProductImage } from "@utils/indianProductImages";

const FALLBACK_IMAGES = [
  CATEGORY_INDIAN_BRAND_IMAGES["Anti-Cancer Medicines"],
  CATEGORY_INDIAN_BRAND_IMAGES["Oncology Drugs"],
  CATEGORY_INDIAN_BRAND_IMAGES["Imported medicine"],
];

const ACCENT_VARIANTS = ["navy", "maroon", "gold"];

export const getBannerImage = (banner, index) => {
  if (banner?.heroImage && !isGenericProductImage(banner.heroImage)) {
    return banner.heroImage;
  }
  if (banner?.image && !isGenericProductImage(banner.image)) {
    return banner.image;
  }
  if (banner?.category && CATEGORY_INDIAN_BRAND_IMAGES[banner.category]) {
    return CATEGORY_INDIAN_BRAND_IMAGES[banner.category];
  }
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
};

const getAccent = (banner, index) =>
  banner.accent || ACCENT_VARIANTS[index % ACCENT_VARIANTS.length];

const PromoBanners = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <section className="ilmic-section ilmic-section-white ilmic-promo-section">
      <div className="ilmic-container">
        <div className="ilmic-promo-grid">
          {items.map((banner, idx) => {
            const accent = getAccent(banner, idx);
            return (
              <Link
                key={idx}
                href={banner.linkUrl || "/products"}
                className={`ilmic-promo-banner ilmic-promo-banner--${accent}`}
              >
                <div className="ilmic-promo-banner__body">
                  <p className="ilmic-promo-banner__label">{banner.label}</p>
                  <h3 className="ilmic-promo-banner__title">
                    {banner.title}
                    {banner.titleLine2 ? (
                      <>
                        <br />
                        {banner.titleLine2}
                      </>
                    ) : null}
                  </h3>
                  <span className="ilmic-promo-banner__link">
                    {banner.linkText || "View products"}
                    <FiArrowRight className="w-4 h-4" />
                  </span>
                </div>
                <div className="ilmic-promo-banner__media">
                  <img
                    src={getBannerImage(banner, idx)}
                    alt=""
                    className="ilmic-promo-banner__img"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
