import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { FiHeart, FiEye, FiZap, FiShoppingBag, FiMessageSquare } from "react-icons/fi";
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
  forceEnquiry = false
}) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { addToWishlist } = useContext(WishlistContext);
  const { globalSetting } = useGetSetting();
  const { showingTranslateValue, getNumberTwo } = useUtilsFunction();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currency = globalSetting?.default_currency || "₹";

  const price = product?.price || (product?.prices?.price) || 0;
  const originalPrice = product?.originalPrice || (product?.prices?.originalPrice) || (price > 0 ? price + 100 : 0);
  const categoryName = overrideCategoryName || showingTranslateValue(product?.category?.name) || "Electronics";

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

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100/80 flex flex-col h-full transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 relative">
        
        {/* Sale Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#ED1C24] text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
            Sale
          </span>
        </div>

        {/* Product Image */}
        <div
          onClick={() => {
            if (forceEnquiry && onEnquire) {
                onEnquire(product);
            } else {
                router.push(`/product/${product.slug}`);
            }
          }}
          className="relative block cursor-pointer overflow-hidden bg-white"
          style={{ paddingTop: '75%' /* 4:3 ratio */ }}
        >
          {/* Hover Action Buttons */}
          {!hideHoverActions && (
            <div className="absolute inset-0 z-20 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
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
          {product.image?.[0] ? (
            <Image
              src={product.image[0]}
              alt={showingTranslateValue(product.title)}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 230px"
              className="object-contain p-3 group-hover:scale-[1.06] transition-transform duration-500"
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

        {/* Product Info */}
        <div className="px-4 pt-3 pb-4 flex flex-col flex-grow">
          {/* Category */}
          <div className="text-[9px] text-[#ED1C24] font-black mb-1.5 uppercase tracking-[0.15em]">
            {categoryName}
          </div>

          {/* Title */}
          <h2
            className="text-xs font-bold text-gray-800 mb-2 line-clamp-2 leading-snug cursor-pointer hover:text-[#0b1d3d] transition-colors"
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
            <div className="text-[9px] text-gray-400 font-medium mb-2 bg-gray-50 rounded-lg px-2 py-1 inline-block w-fit">
              Min. Order: <span className="font-bold text-gray-700">{product.minOrderQuantity} {product.minOrderQuantity > 1 ? 'Units' : 'Unit'}</span>
            </div>
          )}

          {/* Prices */}
          <div className="flex items-baseline gap-2 mb-4 mt-auto">
            <span className="text-[#0b1d3d] font-black text-sm">
              {currency}{getNumberTwo(price)}
            </span>
            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tight">
              Incl. GST
            </span>
            {originalPrice > price && (
              <span className="text-gray-300 line-through text-[11px] ml-auto">
                {currency}{getNumberTwo(originalPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full">
            {onEnquire && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEnquire(product);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 bg-[#ED1C24] hover:bg-red-700 text-white py-2.5 px-2 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all duration-200 active:scale-95 ${hideAddToCart ? 'w-full' : ''}`}
              >
                <FiMessageSquare className="w-3 h-3" />
                Enquire
              </button>
            )}
            {!hideAddToCart && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className={`${onEnquire ? 'flex-1' : 'w-full'} flex items-center justify-center gap-1.5 bg-[#0b1d3d] hover:bg-[#162542] text-white py-2.5 px-2 rounded-xl text-[10px] font-black uppercase tracking-wide transition-all duration-200 active:scale-95`}
              >
                <FiShoppingBag className="w-3 h-3" />
                Add to Cart
              </button>
            )}
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
