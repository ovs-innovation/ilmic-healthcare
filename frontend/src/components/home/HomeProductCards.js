import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import {
  FiHeart,
  FiShoppingBag,
  FiMessageSquare,
  FiZap,
  FiStar,
} from "react-icons/fi";
import { getCategorySearchUrl } from "@utils/categoryUrl";
import { isInStock } from "@utils/inventory";
import { WishlistContext } from "@context/WishlistContext";
import { UserContext } from "@context/UserContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { handleLogEvent } from "src/lib/analytics";
import { notifySuccess, notifyError } from "@utils/toast";
import {
  buildCartItemFields,
  getEffectiveMinOrder,
  getUnitPriceForQuantity,
  stashBuyNowPricing,
} from "@utils/quantityPricing";
import { navigateToBuyNow } from "@utils/buyNowNavigation";
import { getProductImageSrc } from "@utils/productImage";
import { IMAGE_PLACEHOLDER, isCloudinaryUrl } from "@utils/cloudinaryImage";

const getProductBadge = (product, showOriginalPrice) => {
  const tag = product?.tag?.[0];
  if (tag) {
    const label = String(tag).toUpperCase();
    const isGreen = /popular|new|featured/i.test(label);
    return { label, tone: isGreen ? "green" : "red" };
  }
  if (product?.type === "popular") return { label: "BESTSELLER", tone: "red" };
  if (product?.type === "trending") return { label: "POPULAR", tone: "green" };
  if (product?.type === "new") return { label: "NEW", tone: "green" };
  if (showOriginalPrice) return { label: "SALE", tone: "red" };
  return null;
};

const ProductStars = ({ className = "" }) => (
  <div className={`flex items-center gap-0.5 ${className}`} aria-hidden>
    {Array.from({ length: 5 }).map((_, i) => (
      <FiStar key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" strokeWidth={1} />
    ))}
  </div>
);

const useProductCardCore = (product, onEnquire) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { addToWishlist } = useContext(WishlistContext);
  const { state: { userInfo } } = useContext(UserContext);
  const { showingTranslateValue, getNumberTwo, currency } = useUtilsFunction();
  const [imgError, setImgError] = useState(false);

  const price = product?.price || product?.prices?.price || 0;
  const originalPrice = Number(product?.originalPrice ?? product?.prices?.originalPrice ?? 0);
  const showOriginalPrice = originalPrice > price;
  const productImageSrc = getProductImageSrc(product);
  const showProductImage = productImageSrc !== IMAGE_PLACEHOLDER && !imgError;
  const categoryName =
    showingTranslateValue(product?.category?.name) || "Electronics";
  const categoryId = product?.category?._id || product?.category;
  const productPath = product?.slug ? `/product/${product.slug}` : null;
  const outOfStock = !isInStock(product);
  const badge = getProductBadge(product, showOriginalPrice);
  const displayPrice = getUnitPriceForQuantity(product, getEffectiveMinOrder(product));

  useEffect(() => {
    setImgError(false);
  }, [product?._id, product?.image, product?.variants]);

  useEffect(() => {
    if (productPath) router.prefetch(productPath);
  }, [productPath, router]);

  const navigateToProduct = () => {
    if (productPath) router.push(productPath);
  };

  const handleAddToCart = (e) => {
    e?.stopPropagation?.();
    if (outOfStock) {
      notifyError("This product is currently out of stock.");
      return;
    }
    const pricing = buildCartItemFields(product);
    addItem(
      {
        id: product._id,
        name: showingTranslateValue(product.title),
        price: pricing.price,
        image: getProductImageSrc(product),
        variant: product?.variants?.[0] || {},
        minQty: pricing.minQty,
        maxQty: pricing.maxQty,
        quantityTiers: pricing.quantityTiers,
        listPrice: pricing.listPrice,
        stock: pricing.stock,
        hsnCode: pricing.hsnCode,
        sku: product.sku || "",
        barcode: product.barcode || "",
        deliveryCharge: product.deliveryCharge || 0,
        gstPercentage: product.gstPercentage || 0,
        basePrice: product.basePrice || product.price || 0,
      },
      pricing.quantity
    );
    notifySuccess(`${showingTranslateValue(product.title)} added to cart!`);
    handleLogEvent("cart", `added ${showingTranslateValue(product?.title)} to cart`);
  };

  const handleBuyNow = (e) => {
    e?.stopPropagation?.();
    if (outOfStock) {
      notifyError("This product is currently out of stock.");
      return;
    }
    const pricing = buildCartItemFields(product);
    stashBuyNowPricing(product);
    navigateToBuyNow(router, {
      userInfo,
      checkoutQuery: {
        buyNow: true,
        id: product._id,
        title: showingTranslateValue(product.title),
        price: pricing.price,
        image: getProductImageSrc(product),
        quantity: pricing.quantity,
        sku: product.sku || "",
        barcode: product.barcode || "",
        deliveryCharge: product.deliveryCharge || 0,
        gstPercentage: product.gstPercentage || 0,
        basePrice: product.basePrice || product.price || 0,
      },
    });
    handleLogEvent("checkout", `buy now ${showingTranslateValue(product?.title)}`);
  };

  const handleCategoryClick = (e) => {
    e.stopPropagation();
    if (!categoryId) return;
    const categoryPath = getCategorySearchUrl(
      categoryId,
      categoryName,
      product?.category?.slug
    );
    router.push(categoryPath);
  };

  return {
    router,
    addToWishlist,
    showingTranslateValue,
    getNumberTwo,
    currency,
    showProductImage,
    productImageSrc,
    categoryName,
    categoryId,
    outOfStock,
    badge,
    displayPrice,
    imgError,
    setImgError,
    navigateToProduct,
    handleAddToCart,
    handleBuyNow,
    handleCategoryClick,
    onEnquire,
    product,
  };
};

export const HomePremiumProductCard = ({ product, onEnquire }) => {
  const core = useProductCardCore(product, onEnquire);

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-[0_2px_16px_rgba(11,29,61,0.06)] flex flex-col h-full min-w-0 w-full transition-all duration-300 hover:shadow-[0_12px_40px_rgba(11,29,61,0.1)] hover:-translate-y-0.5">
      <div
        onClick={core.navigateToProduct}
        className="relative w-full flex-shrink-0 cursor-pointer bg-[#f3f5f8] overflow-hidden"
      >
        <div className="relative w-full pb-[78%]">
          {core.badge ? (
            <span
              className={`absolute top-3 left-3 z-10 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm ${
                core.badge.tone === "green"
                  ? "bg-emerald-500 text-white"
                  : "bg-[#ED1C24] text-white"
              }`}
            >
              {core.badge.label}
            </span>
          ) : null}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              core.addToWishlist(product);
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 shadow-md flex items-center justify-center text-gray-400 hover:text-[#ED1C24] transition-colors"
            aria-label="Add to wishlist"
          >
            <FiHeart className="w-4 h-4" />
          </button>

          <div className="absolute inset-0">
            {core.showProductImage ? (
              <Image
                src={core.productImageSrc}
                alt={core.showingTranslateValue(product.title)}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-500"
                unoptimized={isCloudinaryUrl(core.productImageSrc)}
                onError={() => core.setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <FiShoppingBag className="w-12 h-12 text-gray-200" aria-hidden />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onEnquire) {
                onEnquire(product);
              } else {
                core.navigateToProduct();
              }
            }}
            className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#0b1d3d] hover:bg-[#0F4C81] hover:text-white transition-colors"
            aria-label="Enquire Now"
          >
            <FiMessageSquare className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-3.5 pb-4 flex flex-col flex-grow min-w-0">
        {core.categoryId ? (
          <button
            type="button"
            onClick={core.handleCategoryClick}
            className="text-[10px] text-[#ED1C24] font-bold mb-1.5 uppercase tracking-[0.14em] text-left hover:underline truncate w-full"
          >
            {core.categoryName}
          </button>
        ) : (
          <div className="text-[10px] text-[#ED1C24] font-bold mb-1.5 uppercase tracking-[0.14em] truncate">
            {core.categoryName}
          </div>
        )}

        <h3
          onClick={core.navigateToProduct}
          className="text-[13px] sm:text-sm font-bold text-[#0b1d3d] mb-2 line-clamp-2 leading-snug cursor-pointer hover:text-[#0088FF] transition-colors min-h-[2.5rem]"
        >
          {core.showingTranslateValue(product.title)}
        </h3>

        <ProductStars className="mb-2" />

        <div className="flex items-center justify-between gap-2 mb-3 mt-auto">
          <span className="text-[#0b1d3d] font-black text-lg sm:text-xl leading-none">
            {core.currency}
            {core.getNumberTwo(core.displayPrice)}
          </span>
          {!core.outOfStock ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden />
              Out of Stock
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <button
            type="button"
            onClick={core.handleBuyNow}
            disabled={core.outOfStock}
            className="w-full flex items-center justify-center gap-2 bg-[#ED1C24] hover:bg-[#d41820] text-white py-2.5 rounded-lg text-[11px] font-black uppercase tracking-wide transition-colors disabled:opacity-50"
          >
            <FiZap className="w-3.5 h-3.5" />
            Buy Now
          </button>
          {onEnquire ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEnquire(product);
              }}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-[#0b1d3d] text-[#0b1d3d] py-2.5 rounded-lg text-[11px] font-black uppercase tracking-wide transition-colors"
            >
              <FiMessageSquare className="w-3.5 h-3.5 text-[#ED1C24]" />
              Enquire Now
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const HomeTrendingProductCard = ({ product, onEnquire }) => {
  const core = useProductCardCore(product, onEnquire);

  return (
    <div
      className="group flex items-stretch gap-3 sm:gap-4 bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(11,29,61,0.05)] p-3 sm:p-4 h-full min-h-[120px] transition-all duration-300 hover:shadow-[0_8px_28px_rgba(11,29,61,0.08)]"
      onClick={core.navigateToProduct}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && core.navigateToProduct()}
    >
      <div className="relative w-[88px] sm:w-[100px] flex-shrink-0 rounded-lg bg-[#f3f5f8] overflow-hidden self-center">
        <div className="relative w-full pb-[100%]">
          <div className="absolute inset-0">
            {core.showProductImage ? (
              <Image
                src={core.productImageSrc}
                alt={core.showingTranslateValue(product.title)}
                fill
                sizes="100px"
                className="object-contain p-2"
                unoptimized={isCloudinaryUrl(core.productImageSrc)}
                onError={() => core.setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <FiShoppingBag className="w-8 h-8 text-gray-200" aria-hidden />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
        <h3 className="text-xs sm:text-[13px] font-bold text-[#0b1d3d] line-clamp-2 leading-snug mb-1.5 group-hover:text-[#0088FF] transition-colors">
          {core.showingTranslateValue(product.title)}
        </h3>
        <ProductStars className="mb-1.5" />
        <span className="text-[#0b1d3d] font-black text-base sm:text-lg leading-none">
          {core.currency}
          {core.getNumberTwo(core.displayPrice)}
        </span>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onEnquire) {
            onEnquire(product);
          } else {
            core.navigateToProduct();
          }
        }}
        className="flex-shrink-0 self-center w-10 h-10 rounded-full bg-[#f3f5f8] border border-gray-100 flex items-center justify-center text-[#0b1d3d] hover:bg-[#0F4C81] hover:text-white transition-colors"
        aria-label="Enquire Now"
      >
        <FiMessageSquare className="w-[18px] h-[18px]" />
      </button>
    </div>
  );
};

const Cards = {
  HomePremiumProductCard,
  HomeTrendingProductCard,
};

export default dynamic(() => Promise.resolve(Cards), { ssr: false });
