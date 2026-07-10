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
      className={`group bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-[0_15px_35px_rgba(15,58,102,0.12)] hover:-translate-y-1.5 hover:border-ilmic-blue/40 transition-all duration-300 ${className}`}
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
              ? "relative w-full md:w-[40%] flex-shrink-0 bg-ilmic-blue-soft overflow-hidden"
              : "relative w-full aspect-[16/10] bg-ilmic-blue-soft overflow-hidden"
          }
        >
          {(imageSrc || fallbackImage) ? (
            <img
              src={imageSrc || fallbackImage}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FiPackage className="w-12 h-12 text-ilmic-border" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ilmic-blue-darker/20 via-transparent to-transparent" />

          {category && (
            <span
              className={`absolute top-3 left-3 px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
            >
              {category}
            </span>
          )}
        </div>

        <div
          className={
            isHorizontal
              ? "flex flex-col justify-between flex-1 p-6 sm:p-7"
              : "flex flex-col flex-1 p-5"
          }
        >
          <div className="flex flex-col flex-grow">
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-ilmic-blue-light text-ilmic-blue text-[10px] font-bold uppercase tracking-wider">
                {dosageForm}
              </span>
              {strength ? (
                <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-ilmic-blue-soft text-ilmic-text text-[10px] font-bold uppercase tracking-wider">
                  {strength}
                </span>
              ) : null}
              <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                Price: On Enquiry
              </span>
            </div>

            <h3
              className={`font-black text-slate-800 leading-snug group-hover:text-ilmic-blue transition-colors ${isHorizontal
                  ? "text-xl sm:text-2xl mb-2"
                  : "text-base sm:text-lg mb-1"
                }`}
            >
              {title}
            </h3>

            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1 mb-2.5">
              {manufacturer}
            </p>

            {composition ? (
              <p
                className={`text-slate-500 leading-relaxed text-xs sm:text-sm line-clamp-2 mb-4`}
              >
                {composition}
              </p>
            ) : null}
          </div>

          <div className={`flex gap-2 mt-auto pt-4 border-t border-slate-50`}>
            {onEnquire && (
              <button
                type="button"
                onClick={() => onEnquire(product)}
                className={`inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-ilmic-blue hover:bg-ilmic-blue-dark text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex-grow`}
              >
                <FiMessageSquare className="w-3.5 h-3.5" /> Send Enquiry
              </button>
            )}
            {product?.slug && (
              <Link
                href={`/product/${product.slug}`}
                className={`inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-xl bg-[#0F3A66] hover:bg-[#0b294a] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer`}
              >
                View Details <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default IlmicProductCard;
