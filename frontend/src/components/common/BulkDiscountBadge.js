import { getBulkDiscountInfo } from "@utils/quantityPricing";

/**
 * @param {"pill" | "inline" | "banner"} variant
 */
const BulkDiscountBadge = ({ product, variant = "inline", className = "" }) => {
  const info = getBulkDiscountInfo(product);
  if (!info.hasBulkTiers) return null;

  const styles = {
    pill: "bg-green-600 text-white text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider leading-tight",
    inline:
      "text-[9px] sm:text-[10px] text-green-800 font-bold bg-green-50 border border-green-100 px-1.5 py-0.5 rounded",
    banner:
      "text-[10px] sm:text-xs text-green-800 font-bold bg-green-50 border border-green-200 px-2.5 py-1.5 rounded-lg leading-snug block w-full",
  };

  return (
    <span className={`${styles[variant] || styles.inline} ${className}`}>
      {info.shortLabel}
    </span>
  );
};

export default BulkDiscountBadge;
