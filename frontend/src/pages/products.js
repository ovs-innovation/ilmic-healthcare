import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@layout/Layout";
import PageHero from "@components/ui/PageHero";
import ProductServices from "@services/ProductServices";
import CategoryServices from "@services/CategoryServices";
import ProductEnquiryModal from "@components/modal/ProductEnquiryModal";
import IlmicProductCard from "@components/product/IlmicProductCard";
import { filterStorefrontProducts } from "@utils/storefrontProducts";
import { heroProducts as ilmicHeroProducts } from "@utils/ilmicDefaults";
import { FiSearch, FiChevronRight, FiChevronLeft } from "react-icons/fi";

const DOSAGE_FORMS = ["Tablets", "Capsules", "Injections", "Liquid", "Others"];

const catBgMap = {
  "Oncology Medicines": {
    light: "#F3EEFF",
    badge: "#7C3AED",
    accent: "#EDE9FE",
  },
  "Anti Cancer Drugs": {
    light: "#F3EEFF",
    badge: "#7C3AED",
    accent: "#EDE9FE",
  },
  "Critical Care": { light: "#FFF0F0", badge: "#DC2626", accent: "#FEE2E2" },
  Immunotherapy: { light: "#FFF0F5", badge: "#BE185D", accent: "#FCE7F3" },
  "Targeted Therapy": { light: "#EFF7FF", badge: "#1D4ED8", accent: "#DBEAFE" },
  Hematology: { light: "#EFF7FF", badge: "#1D4ED8", accent: "#DBEAFE" },
  "Bone Health": { light: "#EDFFF5", badge: "#059669", accent: "#D1FAE5" },
  "Injectable Medicines": {
    light: "#FFFBEA",
    badge: "#D97706",
    accent: "#FDE68A",
  },
  "Oral Medicines": { light: "#FFFBEA", badge: "#D97706", accent: "#FDE68A" },
  "Imported Medicines": {
    light: "#EDFFF5",
    badge: "#059669",
    accent: "#D1FAE5",
  },
  "HIV Medicines": { light: "#FFF0F5", badge: "#BE185D", accent: "#FCE7F3" },
  "Nephrology Medicines": {
    light: "#EFF7FF",
    badge: "#1D4ED8",
    accent: "#DBEAFE",
  },
  "Lifesaving Medicines": {
    light: "#FFF0F0",
    badge: "#DC2626",
    accent: "#FEE2E2",
  },
};

const getTitleString = (titleObj) => {
  if (!titleObj) return "";
  if (typeof titleObj === "string") return titleObj;
  if (typeof titleObj === "object") {
    return titleObj.en || titleObj[Object.keys(titleObj)[0]] || "";
  }
  return "";
};

const Products = ({ initialProducts, categories }) => {
  const router = useRouter();
  const [products, setProducts] = useState(
    filterStorefrontProducts(initialProducts),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDosage, setSelectedDosage] = useState("");
  const [sortBy, setSortBy] = useState("A-Z");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [genericEnquiryOpen, setGenericEnquiryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  /* ── Sync URL query → state ── */
  useEffect(() => {
    if (router.query.category) {
      const found = categories.find(
        (c) =>
          getTitleString(c.name).toLowerCase() ===
          router.query.category.toLowerCase() ||
          c._id === router.query.category,
      );
      setSelectedCategory(found ? found._id : "");
    } else {
      setSelectedCategory("");
    }
  }, [router.query.category, categories]);

  useEffect(() => {
    if (router.query.name) {
      setSearchQuery(String(router.query.name));
    }
  }, [router.query.name]);

  /* ── Fetch on filter change ── */
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await ProductServices.getAllProducts({
          category: selectedCategory,
          name: searchQuery,
        });
        setProducts(filterStorefrontProducts(res.products || []));
        setCurrentPage(1);
      } catch (err) {
        console.error(err);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const handleEnquireClick = (product) => {
    setSelectedProduct(product);
    setEnquiryModalOpen(true);
  };

  /* ── Category filter handler ── */
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    router.push(
      catId
        ? { pathname: "/products", query: { category: catId } }
        : { pathname: "/products" },
      undefined,
      { shallow: true },
    );
  };

  /* ── Dosage client-side filter ── */
  const getProductTitle = (prod) => {
    return getTitleString(prod.title) || prod.name || "";
  };
  const getProductDesc = (prod) => {
    return getTitleString(prod.description) || "";
  };

  const filteredProducts = products.filter((prod) => {
    if (!selectedDosage) return true;
    const name = getProductTitle(prod).toLowerCase();
    const desc = getProductDesc(prod).toLowerCase();
    const d = selectedDosage.toLowerCase();
    if (d === "tablets" && (name.includes("tablet") || desc.includes("tablet")))
      return true;
    if (
      d === "capsules" &&
      (name.includes("capsule") || desc.includes("capsule"))
    )
      return true;
    if (
      d === "injections" &&
      (name.includes("injection") ||
        name.includes("vial") ||
        name.includes("ampoule") ||
        desc.includes("inject"))
    )
      return true;
    if (d === "liquid" && (name.includes("liquid") || name.includes("syrup")))
      return true;
    if (
      d === "others" &&
      !name.includes("tablet") &&
      !name.includes("capsule") &&
      !name.includes("injection") &&
      !name.includes("liquid")
    )
      return true;
    return false;
  });

  /* ── Sort ── */
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const nameA = getProductTitle(a);
    const nameB = getProductTitle(b);
    return sortBy === "A-Z"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });

  /* ── Pagination ── */
  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / itemsPerPage),
  );
  const indexOfFirst = (currentPage - 1) * itemsPerPage;
  const indexOfLast = indexOfFirst + itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirst, indexOfLast);

  const generalProductPlaceholder = {
    _id: "general",
    name: "General Sourcing Enquiry",
    shortDescription:
      "Inquire about customized packaging or general bulk drug sourcing.",
  };

  /* ── Visible page buttons ── */
  const getPageButtons = () => {
    if (totalPages <= 7) return [...Array(totalPages)].map((_, i) => i + 1);
    const pages = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let p = Math.max(2, currentPage - 1);
      p <= Math.min(totalPages - 1, currentPage + 1);
      p++
    ) {
      pages.push(p);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  return (
    <Layout
      title="Products - Oncology, General Pharma & Surgical | ILMIC Health Care"
      description="Browse ILMIC Health Care products — QLQ 10, IMIC ENERGY, CTUXIL 500, ABIRAMIC 250, PACMIC 300 and more. Oncology, General Pharma & Surgical."
    >
      <PageHero
        productsHero={true}
        breadcrumb="Products"
        title="Our"
        highlight="Products"
        subtitle="Oncology, General Pharma & Surgical products — in our own brands. Exporting globally from Delhi, India."
        bgImage="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1600&q=80"
      />
      <div className="min-h-screen bg-slate-50 pt-6 sm:pt-14 ilmic-products-page">
        <div className="llmic-container pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ══════════════════════════════
                SIDEBAR (Desktop Only)
            ══════════════════════════════ */}
            <aside className="hidden lg:block lg:col-span-3 space-y-4">
              {/* Therapeutic Areas Filter */}
              <div className="llmic-card overflow-hidden">
                <div className="bg-transparent text-slate-800 border-b border-slate-100 px-5 py-4 text-xs font-extrabold uppercase tracking-wider">
                  Therapeutic Areas
                </div>
                <div className="p-4 space-y-3">
                  {/* All Categories */}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selectedCategory === ""
                          ? "bg-ilmic-blue border-ilmic-blue"
                          : "border-gray-300 group-hover:border-ilmic-blue"
                        }`}
                    >
                      {selectedCategory === "" && (
                        <svg
                          viewBox="0 0 10 10"
                          fill="none"
                          className="w-2.5 h-2.5"
                        >
                          <path
                            d="M2 5l2.5 2.5 4-4"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-[13px] font-semibold transition-colors ${selectedCategory === ""
                          ? "text-ilmic-blue-dark font-bold"
                          : "text-gray-600 group-hover:text-gray-800"
                        }`}
                    >
                      All Categories
                    </span>
                  </label>
                  <input
                    type="hidden"
                    checked={selectedCategory === ""}
                    onChange={() => handleCategoryChange("")}
                  />

                  {categories.map((cat) => (
                    <label
                      key={cat._id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        onClick={() =>
                          handleCategoryChange(
                            selectedCategory === cat._id ? "" : cat._id,
                          )
                        }
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${selectedCategory === cat._id
                            ? "bg-ilmic-blue border-ilmic-blue"
                            : "border-gray-300 group-hover:border-ilmic-blue"
                          }`}
                      >
                        {selectedCategory === cat._id && (
                          <svg
                            viewBox="0 0 10 10"
                            fill="none"
                            className="w-2.5 h-2.5"
                          >
                            <path
                              d="M2 5l2.5 2.5 4-4"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() =>
                          handleCategoryChange(
                            selectedCategory === cat._id ? "" : cat._id,
                          )
                        }
                        className={`text-[13px] font-semibold cursor-pointer transition-colors ${selectedCategory === cat._id
                            ? "text-ilmic-blue-dark font-bold"
                            : "text-gray-600 group-hover:text-gray-800"
                          }`}
                      >
                        {getTitleString(cat.name)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dosage Form Filter */}
              <div className="llmic-card overflow-hidden">
                <div className="bg-transparent text-slate-800 border-b border-slate-100 px-5 py-4 text-xs font-extrabold uppercase tracking-wider">
                  Dosage Form
                </div>
                <div className="p-4 space-y-3">
                  {DOSAGE_FORMS.map((dosage) => (
                    <label
                      key={dosage}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        onClick={() =>
                          setSelectedDosage(
                            selectedDosage === dosage ? "" : dosage,
                          )
                        }
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${selectedDosage === dosage
                            ? "bg-ilmic-blue border-ilmic-blue"
                            : "border-gray-300 group-hover:border-ilmic-blue"
                          }`}
                      >
                        {selectedDosage === dosage && (
                          <svg
                            viewBox="0 0 10 10"
                            fill="none"
                            className="w-2.5 h-2.5"
                          >
                            <path
                              d="M2 5l2.5 2.5 4-4"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() =>
                          setSelectedDosage(
                            selectedDosage === dosage ? "" : dosage,
                          )
                        }
                        className={`text-[13px] font-semibold cursor-pointer transition-colors ${selectedDosage === dosage
                            ? "text-ilmic-blue-dark font-bold"
                            : "text-gray-600 group-hover:text-gray-800"
                          }`}
                      >
                        {dosage}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* ══════════════════════════════
                MAIN CONTENT
            ══════════════════════════════ */}
            <main className="lg:col-span-9 space-y-5">
              {/* Page heading + search */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Our Products
                    </h1>
                    <p className="text-[13px] text-slate-500 font-medium mt-1 max-w-lg">
                      Oncology, General Pharma & Surgical products. Bulk orders and export enquiries supported.
                    </p>
                  </div>
                  <div className="relative flex-shrink-0 w-full sm:w-56">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:ring-2 focus:ring-ilmic-blue/15 focus:border-ilmic-blue bg-slate-50 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[11px] sm:text-[12px] font-semibold text-gray-500">
                  Showing {sortedProducts.length > 0 ? indexOfFirst + 1 : 0} -{" "}
                  {Math.min(indexOfLast, sortedProducts.length)} of{" "}
                  {sortedProducts.length} products
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-[11px] sm:text-[12px] font-semibold text-gray-500 shrink-0">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 sm:flex-none border border-slate-200 rounded-xl text-[12px] font-semibold text-slate-700 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-ilmic-blue/15 focus:border-ilmic-blue cursor-pointer"
                  >
                    <option value="A-Z">A - Z</option>
                    <option value="Z-A">Z - A</option>
                  </select>
                </div>
              </div>

              {/* Mobile & Tablet Horizontal Filters (Hidden on Desktop) */}
              <div className="lg:hidden space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {/* Therapeutic Areas */}
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2 px-1">Therapeutic Areas</span>
                  <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-hide snap-x -mx-0.5 px-0.5">
                    <button
                      onClick={() => handleCategoryChange("")}
                      className={`flex-shrink-0 px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all border max-w-[85vw] whitespace-normal text-center leading-tight ${selectedCategory === ""
                          ? "bg-[#0F4C81] text-white border-[#0F4C81]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => {
                      const title = getTitleString(cat.name);
                      const isActive = selectedCategory === cat._id;
                      return (
                        <button
                          key={cat._id}
                          onClick={() => handleCategoryChange(isActive ? "" : cat._id)}
                          className={`flex-shrink-0 px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all border max-w-[85vw] whitespace-normal text-center leading-tight ${isActive
                              ? "bg-[#0F4C81] text-white border-[#0F4C81]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                            }`}
                        >
                          {title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dosage Form */}
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2 px-1">Dosage Form</span>
                  <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-hide snap-x">
                    <button
                      onClick={() => setSelectedDosage("")}
                      className={`flex-shrink-0 px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all border whitespace-nowrap ${selectedDosage === ""
                          ? "bg-[#0F4C81] text-white border-[#0F4C81]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      All Dosages
                    </button>
                    {DOSAGE_FORMS.map((dosage) => {
                      const isActive = selectedDosage === dosage;
                      return (
                        <button
                          key={dosage}
                          onClick={() => setSelectedDosage(isActive ? "" : dosage)}
                          className={`flex-shrink-0 px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all border max-w-[85vw] whitespace-normal text-center leading-tight ${isActive
                              ? "bg-[#0F4C81] text-white border-[#0F4C81]"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                            }`}
                        >
                          {dosage}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Ecommerce-style grid cards (enquiry based) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {currentItems.length > 0 ? (
                  currentItems.map((prod) => (
                    <IlmicProductCard
                      key={prod._id}
                      product={prod}
                      onEnquire={handleEnquireClick}
                      layout="tile"
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-gray-400 text-sm font-semibold">
                    No products found.
                  </div>
                )}
              </div>

              {/* ── Pagination ── */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 pt-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                  </button>

                  {getPageButtons().map((page, i) =>
                    page === "..." ? (
                      <span
                        key={`dot-${i}`}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded border text-[13px] font-bold transition-colors ${currentPage === page
                            ? "bg-ilmic-blue border-ilmic-blue text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── CTA Banner ── */}
              <div className="mt-8 bg-slate-900 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-6 h-6 text-white"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M7 9h10M7 13h6"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="18"
                        cy="16"
                        r="3"
                        fill="white"
                        opacity="0.3"
                      />
                      <path
                        d="M17 16l1 1 1.5-1.5"
                        stroke="white"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-base">
                      Need Product Information?
                    </h3>
                    <p className="text-slate-300 text-[12px] font-medium mt-0.5">
                      Our team will help with product availability, export documentation, and bulk order enquiries.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setGenericEnquiryOpen(true)}
                  className="llmic-btn llmic-btn-coral flex-shrink-0 !px-6 !py-3"
                >
                  Send Enquiry Now
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedProduct && (
        <ProductEnquiryModal
          modalOpen={enquiryModalOpen}
          setModalOpen={setEnquiryModalOpen}
          product={selectedProduct}
        />
      )}
      <ProductEnquiryModal
        modalOpen={genericEnquiryOpen}
        setModalOpen={setGenericEnquiryOpen}
        product={generalProductPlaceholder}
      />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { category = "" } = context.query;
  try {
    const productsRes = await ProductServices.getAllProducts({ category });
    const categoriesRes = await CategoryServices.getAllCategories();

    // /products/store returns { products: [...], ... } in all cases
    const dbProducts = filterStorefrontProducts(productsRes?.products || []);
    const initialProducts = dbProducts;

    // /categories/show returns a direct array
    const categories = Array.isArray(categoriesRes)
      ? categoriesRes
      : categoriesRes?.value || categoriesRes?.categories || [];

    return {
      props: {
        initialProducts,
        categories,
      },
    };
  } catch (error) {
    console.error("Products SSR error:", error);
    return { props: { initialProducts: [], categories: [] } };
  }
};

export default Products;
