import Link from "next/link";
import { FiArrowRight, FiPackage, FiMessageSquare } from "react-icons/fi";
import { getProductImageSrc } from "@utils/productImage";

const getTitle = (obj) => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj.en || Object.values(obj)[0] || "";
};

const getDescription = (obj) => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj.en || Object.values(obj)[0] || "";
};

const CATEGORY_COLORS = {
  Oncology: { bg: "bg-ilmic-blue-light", text: "text-ilmic-blue-darker", border: "border-ilmic-border" },
  "General Pharma": { bg: "bg-blue-100", text: "text-ilmic-blue", border: "border-ilmic-border" },
  Surgical: { bg: "bg-blue-50", text: "text-ilmic-blue-dark", border: "border-ilmic-border" },
};

const IlmicProductCard = ({
  product,
  onEnquire,
  layout = "tile",
  className = "",
}) => {
  const title = getTitle(product?.title) || product?.name || "Product";
  const composition =
    product?.composition || getDescription(product?.description) || "";
  const dosageForm = product?.dosageForm || product?.form || "Medicine";
  const manufacturer = product?.manufacturer || "ILMIC Health Care";
  const strength = product?.strength || product?.packaging || "";
  const category =
    typeof product?.category === "string"
      ? product.category
      : getTitle(product?.category?.name) || product?.category || "";

  const imageSrc =
    product?.image && !Array.isArray(product.image)
      ? product.image
      : getProductImageSrc(product);

  const fallbackImage =
    "https://images.unsplash.com/photo-1587854692152-cf240469e97e?w=1200&q=80";

  const catStyle =
    CATEGORY_COLORS[category] || {
      bg: "bg-ilmic-blue-light",
      text: "text-ilmic-blue",
      border: "border-ilmic-border",
    };

  const isHorizontal = layout === "horizontal";
  const productHref = product?.slug ? `/product/${product.slug}` : null;

  return (
    <article
      className={`ilmic-product-card group relative bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-[0_15px_35px_rgba(15,58,102,0.12)] hover:-translate-y-1.5 hover:border-ilmic-blue/40 transition-all duration-300 ${productHref ? "cursor-pointer" : ""} ${className}`}
    >
      {productHref && (
        <Link
          href={productHref}
          className="absolute inset-0 z-10 rounded-2xl"
          aria-label={`View details for ${title}`}
        />
      )}
      <div
        className={
          isHorizontal
            ? "flex flex-col md:flex-row md:min-h-[320px]"
            : "ilmic-product-card__body flex flex-col h-full min-w-0"
        }
      >
        <div
          className={
            isHorizontal
              ? "relative w-full md:w-[40%] flex-shrink-0 bg-white overflow-hidden min-h-[12rem] md:min-h-[320px] flex items-center justify-center p-4 sm:p-6"
              : "ilmic-product-card__media relative w-full flex-shrink-0 bg-white overflow-hidden"
          }
        >
          {(imageSrc || fallbackImage) ? (
            <img
              src={imageSrc || fallbackImage}
              alt={title}
              className="ilmic-product-card__img w-full h-full object-contain object-center group-hover:scale-[1.03] transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-ilmic-blue-soft">
              <FiPackage className="w-12 h-12 text-ilmic-border" />
            </div>
          )}

          {category && (
            <span
              className={`ilmic-product-card__category absolute top-2.5 left-2.5 max-w-[calc(100%-1.25rem)] px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wide border truncate ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
            >
              {category}
            </span>
          )}
        </div>

        <div
          className={
            isHorizontal
              ? "flex flex-col justify-between flex-1 p-6 sm:p-7 min-w-0"
              : "ilmic-product-card__content flex flex-col flex-1 p-4 sm:p-5 min-w-0"
          }
        >
          <div className="flex flex-col flex-grow min-w-0">
            <div className="ilmic-product-card__badges flex flex-wrap items-center gap-1.5 mb-2.5 sm:mb-3">
              <span className="inline-flex items-center min-h-6 px-2.5 py-0.5 rounded-full bg-ilmic-blue-light text-ilmic-blue text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-normal text-center">
                {dosageForm}
              </span>
              {strength ? (
                <span className="inline-flex items-center min-h-6 px-2.5 py-0.5 rounded-full bg-ilmic-blue-soft text-ilmic-text text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-normal text-center">
                  {strength}
                </span>
              ) : null}
              <span className="inline-flex items-center min-h-6 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-normal text-center">
                Price: On Enquiry
              </span>
            </div>

            <h3
              className={`ilmic-product-card__title font-black text-slate-800 leading-snug group-hover:text-ilmic-blue transition-colors break-words ${isHorizontal
                  ? "text-xl sm:text-2xl mb-2"
                  : "text-base sm:text-lg mb-1"
                }`}
            >
              {title}
            </h3>

            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1 mb-2 break-words">
              {manufacturer}
            </p>

            {composition ? (
              <p className="ilmic-product-card__composition text-slate-500 leading-relaxed text-xs sm:text-sm break-words mb-3 sm:mb-4">
                {composition}
              </p>
            ) : null}
          </div>

          <div className="ilmic-product-card__actions relative z-20 flex flex-col sm:flex-row gap-2 mt-auto pt-3 sm:pt-4 border-t border-slate-50">
            {onEnquire && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEnquire(product);
                }}
                className="inline-flex items-center justify-center gap-2 min-h-10 px-4 py-2.5 rounded-xl bg-ilmic-blue hover:bg-ilmic-blue-dark text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer w-full sm:flex-1"
              >
                <FiMessageSquare className="w-3.5 h-3.5 shrink-0" /> Send Enquiry
              </button>
            )}
            {productHref && (
              <Link
                href={productHref}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-1.5 min-h-10 px-4 py-2.5 rounded-xl bg-[#0F3A66] hover:bg-[#0b294a] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer w-full sm:w-auto sm:shrink-0 relative z-20"
              >
                View Details <FiArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default IlmicProductCard;
