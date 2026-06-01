import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { FiHeart, FiEye, FiShoppingBag, FiMessageSquare, FiZap } from "react-icons/fi";
import { getCategorySearchUrl } from "@utils/categoryUrl";
import { useContext } from "react";
import { WishlistContext } from "@context/WishlistContext";

// internal import
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { handleLogEvent } from "src/lib/analytics";
import { notifySuccess } from "@utils/toast";
import MainModal from "@components/modal/MainModal";

const ProductCard = ({ 
  product, 
  onEnquire, 
  overrideCategoryName, 
  hideHoverActions = false, 
  hideAddToCart = false,
  hideBuyNow = false,
  forceEnquiry = false
}) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { addToWishlist } = useContext(WishlistContext);
  const { globalSetting } = useGetSetting();
  const { showingTranslateValue, getNumberTwo } = useUtilsFunction();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const currency = globalSetting?.default_currency || "₹";

  const price = product?.price || product?.prices?.price || 0;
  const originalPrice = Number(
    product?.originalPrice ?? product?.prices?.originalPrice ?? 0
  );
  const showOriginalPrice = originalPrice > price;

  useEffect(() => {
    setImgError(false);
  }, [product?._id, product?.image?.[0]]);
  const categoryName = overrideCategoryName || showingTranslateValue(product?.category?.name) || "Electronics";
  const categoryId = product?.category?._id || product?.category;

  const handleAddToCart = () => {
    const minQty = product.minOrderQuantity || 1;
    addItem({
      id: product._id,
      name: showingTranslateValue(product.title),
      price: price,
      image: product.image?.[0],
      variant: product?.variants?.[0] || {},
      minQty: minQty,
      sku: product.sku || "",
      barcode: product.barcode || "",
      deliveryCharge: product.deliveryCharge || 0,
      gstPercentage: product.gstPercentage || 0,
      basePrice: product.basePrice || product.price || 0,
    }, minQty);
    notifySuccess(`${showingTranslateValue(product.title)} added to cart!`);
    handleLogEvent("cart", `added ${showingTranslateValue(product?.title)} to cart`);
  };

  const handleBuyNow = () => {
    const minQty = product.minOrderQuantity || 1;
    router.push({
      pathname: "/checkout",
      query: {
        buyNow: true,
        id: product._id,
        title: showingTranslateValue(product.title),
        price,
        image: product.image?.[0],
        quantity: minQty,
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
    router.push(getCategorySearchUrl(categoryId, categoryName));
  };

  return (
    <>
      <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100/80 flex flex-col h-full min-w-0 w-full transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:hover:-translate-y-1">

        {/* Product Image */}
        <div
          onClick={() => {
            if (forceEnquiry && onEnquire) {
                onEnquire(product);
            } else {
                router.push(`/product/${product.slug}`);
            }
          }}
          className="relative w-full flex-shrink-0 cursor-pointer bg-gray-50 overflow-hidden"
        >
          <div className="relative w-full pb-[100%] sm:pb-[75%]">
            {/* Sale Badge — inside image area only */}
            <div className="absolute top-2 left-2 z-10 pointer-events-none">
              <span className="bg-[#ED1C24] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                Sale
              </span>
            </div>

            {/* Hover Action Buttons */}
            {!hideHoverActions && (
              <div className="absolute inset-0 z-20 hidden sm:flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-xl rounded-full px-3 py-2 border border-gray-100 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishlist(product);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-50 hover:bg-red-50 flex items-center justify-center transition-colors"
                    title="Add to Wishlist"
                  >
                    <FiHeart className="w-4 h-4 text-gray-500" />
                  </button>
                  <div className="w-px h-4 bg-gray-200" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                    className="w-8 h-8 rounded-full bg-gray-50 hover:bg-blue-50 flex items-center justify-center transition-colors"
                    title="Quick View"
                  >
                    <FiEye className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            )}

            <div className="absolute inset-0">
              {product.image?.[0] && !imgError ? (
                <Image
                  src={product.image[0]}
                  alt={showingTranslateValue(product.title)}
                  fill
                  sizes="(max-width: 400px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 230px"
                  className="object-contain p-2 sm:p-3 group-hover:scale-[1.04] transition-transform duration-500"
                  onError={() => setImgError(true)}
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center gap-2">
                  <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="px-3 pt-3 pb-3 sm:px-4 sm:pt-3 sm:pb-4 flex flex-col flex-grow min-w-0">
          {/* Category */}
          {categoryId ? (
            <button
              type="button"
              onClick={handleCategoryClick}
              className="text-[9px] sm:text-[9px] text-[#ED1C24] font-black mb-1.5 uppercase tracking-[0.12em] sm:tracking-[0.15em] text-left hover:underline truncate w-full"
            >
              {categoryName}
            </button>
          ) : (
            <div className="text-[9px] text-[#ED1C24] font-black mb-1.5 uppercase tracking-[0.12em] sm:tracking-[0.15em] truncate w-full">
              {categoryName}
            </div>
          )}

          {/* Title */}
          <h2
            className="text-xs sm:text-sm font-bold text-gray-800 mb-2 line-clamp-2 leading-snug cursor-pointer hover:text-[#0b1d3d] transition-colors"
            onClick={() => {
                if (forceEnquiry && onEnquire) {
                    onEnquire(product);
                } else {
                    router.push(`/product/${product.slug}`);
                }
            }}
          >
            {showingTranslateValue(product.title)}
          </h2>

          {/* Min Order Quantity */}
          {product.minOrderQuantity && product.minOrderQuantity > 1 && (
            <div className="text-[10px] text-gray-500 font-medium mb-2 bg-gray-50 rounded-md px-2 py-0.5 inline-block w-fit">
              Min. Order: <span className="font-bold text-gray-700">{product.minOrderQuantity} Units</span>
            </div>
          )}

          {/* Prices — sale price + MRP before discount */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-3 sm:mb-4 mt-auto min-w-0">
            {showOriginalPrice && (
              <span className="text-gray-500 line-through text-xs sm:text-sm font-semibold shrink-0">
                {currency}{getNumberTwo(originalPrice)}
              </span>
            )}
            <span className="text-[#0b1d3d] font-black text-sm sm:text-base">
              {currency}{getNumberTwo(price)}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-tight">
              Incl. GST
            </span>
            {showOriginalPrice && (
              <span className="text-[9px] font-black text-[#ED1C24] uppercase tracking-wide bg-red-50 px-1.5 py-0.5 rounded">
                {Math.round(((originalPrice - price) / originalPrice) * 100)}% off
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col xs:flex-row gap-2 w-full min-w-0">
            {!hideBuyNow && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyNow();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 bg-[#ED1C24] hover:bg-red-700 text-white py-2.5 px-3 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wide transition-all duration-200 active:scale-95"
              >
                <FiZap className="w-3.5 h-3.5 shrink-0" />
                Buy Now
              </button>
            )}
            <div className="flex gap-2 w-full min-w-0">
              {!hideAddToCart && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#0b1d3d] hover:bg-[#162542] text-white py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wide transition-all duration-200 active:scale-95 min-w-0"
                >
                  <FiShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  Cart
                </button>
              )}
              {onEnquire && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnquire(product);
                  }}
                  className={`${hideAddToCart && hideBuyNow ? "w-full" : "flex-1"} flex items-center justify-center gap-1.5 bg-white border-2 border-gray-200 hover:border-[#0b1d3d] text-[#0b1d3d] py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wide transition-all duration-200 active:scale-95 min-w-0`}
                >
                  <FiMessageSquare className="w-3.5 h-3.5 shrink-0" />
                  Enquire
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <MainModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen}>
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl">
          <div className="flex flex-col md:flex-row">
            {/* Image Side */}
            <div className="w-full md:w-1/2 p-8 bg-gray-50 flex items-center justify-center relative min-h-[380px]">
               {product.image?.[0] ? (
                  <Image
                    src={product.image[0]}
                    alt={showingTranslateValue(product.title)}
                    width={500}
                    height={500}
                    className="object-contain max-h-[380px] drop-shadow-md"
                  />
                ) : (
                  <div className="text-gray-300">No Image</div>
                )}
                <div className="absolute top-4 left-4">
                   <span className="bg-[#0b1d3d] text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
                    Quick View
                  </span>
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 flex flex-col">
               <div className="mb-2 uppercase text-[9px] font-black text-[#ED1C24] tracking-[0.2em]">
                 {categoryName}
               </div>
               <h2 className="text-2xl font-black text-gray-900 mb-6 leading-tight">
                 {showingTranslateValue(product.title)}
               </h2>

               <div className="space-y-1 mb-8">
                  <div className="grid grid-cols-1 gap-0 border border-gray-100 rounded-2xl overflow-hidden">
                    <div className="flex justify-between items-center px-5 py-3.5 bg-gray-50 border-b border-gray-100">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product SKU</span>
                       <span className="text-sm font-mono font-bold text-gray-700">{product.sku || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-start px-5 py-3.5 border-b border-gray-100">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-1">Price</span>
                       <div className="flex flex-col items-end">
                          <span className="text-2xl font-black text-[#0b1d3d]">{currency}{getNumberTwo(price)}</span>
                          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Inclusive of GST</span>
                          {(product?.price - (product?.basePrice || product?.price)) > 0 && (
                            <span className="text-[9px] text-green-600 font-bold mt-1 uppercase tracking-tighter text-right">
                              Incl. {currency}{getNumberTwo(product.price - product.basePrice)} GST ({product.gstPercentage}%)
                            </span>
                          )}
                       </div>
                    </div>
                    <div className="flex justify-between items-center px-5 py-3.5 bg-gray-50">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Min. Order Qty</span>
                       <span className="text-sm font-bold text-gray-700">{product.minOrderQuantity || 1} {product.minOrderQuantity > 1 ? 'Units' : 'Unit'}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 leading-relaxed pt-3 px-1">
                    {product.description ? showingTranslateValue(product.description).slice(0, 150) : "No description available"}...
                  </div>
               </div>

               <div className="mt-auto space-y-3">
                  {!hideBuyNow && (
                    <button
                      onClick={() => {
                        handleBuyNow();
                        setIsModalOpen(false);
                      }}
                      className="w-full bg-[#ED1C24] hover:bg-red-700 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <FiZap className="w-4 h-4" />
                      Buy Now
                    </button>
                  )}
                  {!hideAddToCart && (
                    <button
                      onClick={() => {
                        handleAddToCart();
                        setIsModalOpen(false);
                      }}
                      className="w-full bg-[#0b1d3d] hover:bg-[#162542] text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-[#0b1d3d]/10 flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <FiShoppingBag className="w-4 h-4" />
                      Add To Cart
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      router.push(`/product/${product.slug}`);
                    }}
                    className="w-full text-gray-400 hover:text-[#0b1d3d] py-2 rounded-2xl font-bold text-[10px] transition-all uppercase tracking-widest hover:bg-gray-50"
                  >
                    View Full Details →
                  </button>
               </div>
            </div>
          </div>
        </div>
      </MainModal>
    </>
  );
};


export default dynamic(() => Promise.resolve(ProductCard), { ssr: false });
