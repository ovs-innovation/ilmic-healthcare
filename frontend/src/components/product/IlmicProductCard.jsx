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

  return (
    <article
      className={`group bg-white rounded-2xl border border-ilmic-border overflow-hidden shadow-sm hover:shadow-[0_18px_45px_rgba(15,58,102,0.10)] hover:border-ilmic-blue/40 transition-all duration-300 ${className}`}
    >
      <div
        className={
          isHorizontal
            ? "flex flex-col md:flex-row md:min-h-[320px]"
            : "flex flex-col h-full"
        }
      >
        <div
          className={
            isHorizontal
              ? "relative w-full md:w-[40%] flex-shrink-0 bg-ilmic-blue-soft"
              : "relative w-full aspect-[4/3] bg-ilmic-blue-soft"
          }
        >
          {(imageSrc || fallbackImage) ? (
            <img
              src={imageSrc || fallbackImage}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FiPackage className="w-16 h-16 text-ilmic-border" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ilmic-blue-darker/35 via-transparent to-transparent" />

          {category && (
            <span
              className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
            >
              {category}
            </span>
          )}
        </div>

        <div
          className={
            isHorizontal
              ? "flex flex-col justify-between flex-1 p-6 sm:p-7"
              : "flex flex-col flex-1 p-5 sm:p-6"
          }
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex px-3 py-1 rounded-full bg-ilmic-blue-light text-ilmic-blue text-xs font-bold uppercase tracking-wider">
                {dosageForm}
              </span>
              {strength ? (
                <span className="inline-flex px-3 py-1 rounded-full bg-ilmic-blue-soft text-ilmic-text text-xs font-semibold">
                  {strength}
                </span>
              ) : null}
              <span className="inline-flex px-3 py-1 rounded-full bg-ilmic-blue-soft text-ilmic-muted text-xs font-semibold">
                Price: On Enquiry
              </span>
            </div>

            <h3
              className={`font-black text-ilmic-text leading-tight group-hover:text-ilmic-blue transition-colors ${
                isHorizontal
                  ? "text-2xl sm:text-3xl lg:text-4xl mb-3"
                  : "text-xl sm:text-2xl mb-2"
              }`}
            >
              {title}
            </h3>

            <p className="text-xs font-semibold text-ilmic-muted uppercase tracking-wider mb-3">
              {manufacturer}
            </p>

            {composition ? (
              <p
                className={`text-ilmic-muted leading-relaxed ${
                  isHorizontal
                    ? "text-sm sm:text-base line-clamp-4 mb-6"
                    : "text-sm line-clamp-3 mb-5 flex-1"
                }`}
              >
                {composition}
              </p>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          <div className={`flex gap-3 ${isHorizontal ? "mt-6" : "mt-5"}`}>
            {onEnquire && (
              <button
                type="button"
                onClick={() => onEnquire(product)}
                className={`llmic-btn llmic-btn-coral flex-1 ${
                  isHorizontal ? "!py-3.5 !text-sm sm:!text-base" : "!py-3"
                }`}
              >
                <FiMessageSquare className="w-4 h-4" /> Send Enquiry
              </button>
            )}
            {product?.slug && (
              <Link
                href={`/product/${product.slug}`}
                className={`llmic-btn llmic-btn-navy ${
                  isHorizontal ? "!py-3.5 !px-6 !text-sm sm:!text-base" : "!py-3 !px-5"
                }`}
              >
                View <FiArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default IlmicProductCard;
