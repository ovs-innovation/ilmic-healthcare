import React, { useState, useEffect } from "react";
import { FiStar, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import ProductServices from "@services/ProductServices";
import ProductCard from "@components/product/ProductCard";
import ProductEnquiryModal from "@components/modal/ProductEnquiryModal";
import { PRODUCT_GRID_CLASS, PRODUCT_GRID_ITEM_CLASS } from "@utils/productGrid";

/* ══════════════════════════════════════════════════════════
   GRID SECTION  — fills full width, no side gaps
══════════════════════════════════════════════════════════ */
const GridSection = ({ title, icon, accent, products, onEnquire }) => {
  const [showAll, setShowAll] = useState(false);

  if (!products || products.length === 0) return null;

  // Show 10 by default, "show all" reveals rest
  const visible = showAll ? products : products.slice(0, 10);

  return (
    <div className="mb-12 last:mb-0">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{ background: accent }}
          >
            {icon}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">{title}</h2>
            <div className="h-0.5 w-8 rounded-full mt-1" style={{ background: accent }} />
          </div>
        </div>

        <Link
          href="/search"
          className="hidden sm:flex items-center gap-1.5 text-[11px] font-black text-gray-400 hover:text-[#0b1d3d] uppercase tracking-widest transition-colors"
        >
          View All <FiArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Product grid — fills full width with no gaps */}
      <div className={PRODUCT_GRID_CLASS}>
        {visible.map((product) => (
          <div key={product._id} className={PRODUCT_GRID_ITEM_CLASS}>
            <ProductCard product={product} onEnquire={onEnquire} />
          </div>
        ))}
      </div>

      {/* Show more / Mobile view all */}
      <div className="flex items-center justify-between mt-5">
        {products.length > 10 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[11px] font-black text-gray-400 hover:text-[#0b1d3d] uppercase tracking-widest transition-colors"
          >
            {showAll ? "Show Less ↑" : `Show All ${products.length} Products ↓`}
          </button>
        )}
        <Link
          href="/search"
          className="sm:hidden ml-auto flex items-center gap-1.5 text-[11px] font-black text-gray-400 hover:text-[#0b1d3d] uppercase tracking-widest transition-colors"
        >
          View All <FiArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
const HomeProductsSection = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEnquire = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [popular, trending] = await Promise.all([
          ProductServices.getProductsByType("popular"),
          ProductServices.getProductsByType("trending"),
        ]);
        setPopularProducts(popular || []);
        setTrendingProducts(trending || []);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (!loading && popularProducts.length === 0 && trendingProducts.length === 0) return null;

  /* Loading skeleton */
  if (loading) {
    return (
      <section className="bg-white py-8 sm:py-10 lg:py-14 pb-24 sm:pb-14">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-12">
          {[0, 1].map((s) => (
            <div key={s} className="mb-12">
              {/* Header skeleton */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-5 bg-gray-100 rounded w-40 animate-pulse" />
              </div>
              {/* Grid skeleton */}
              <div className={PRODUCT_GRID_CLASS}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl animate-pulse min-h-[360px] sm:min-h-[320px]" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white py-8 sm:py-10 lg:py-14 pb-24 sm:pb-14">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-12">
          <GridSection
            title="Popular Products"
            icon={<FiStar className="w-4 h-4" />}
            accent="#0b1d3d"
            products={popularProducts}
            onEnquire={handleEnquire}
          />
          <GridSection
            title="Trending Products"
            icon={<FiTrendingUp className="w-4 h-4" />}
            accent="#ED1C24"
            products={trendingProducts}
            onEnquire={handleEnquire}
          />
        </div>
      </section>

      <ProductEnquiryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={selectedProduct}
        selectedVariant={selectedProduct?.variants?.[0]}
      />
    </>
  );
};

export default HomeProductsSection;
