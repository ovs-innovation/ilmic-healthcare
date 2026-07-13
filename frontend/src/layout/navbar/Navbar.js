import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import {
  FiMenu,
  FiX,
  FiPhoneCall,
  FiGlobe,
  FiShield,
  FiSearch,
  FiMail,
  FiChevronDown,
  FiArrowRight,
} from "react-icons/fi";
import dynamic from "next/dynamic";
import ProductEnquiryModal from "@components/modal/ProductEnquiryModal";
import { ILMIC_LOGO, ilmicCategories } from "@utils/ilmicDefaults";

const Navbar = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [genericEnquiryOpen, setGenericEnquiryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    router.push(query ? { pathname: "/products", query: { name: query } } : "/products");
    setSearchQuery("");
    closeMobileMenu();
  };

  useEffect(() => { setMobileMenuOpen(false); setProductsOpen(false); }, [router.asPath]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setProductsOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const generalPlaceholder = {
    _id: "general",
    name: "Product Enquiry",
    shortDescription: "Enquire about oncology, general pharma, or surgical products.",
  };

  const isActive = (href) => {
    if (href === "/") return router.pathname === "/";
    return router.pathname.startsWith(href);
  };

  const productsActive =
    router.pathname.startsWith("/products") ||
    router.pathname.startsWith("/product") ||
    router.pathname.startsWith("/category");

  const navLinkClass = (active) =>
    `px-3 py-2 text-[13px] font-bold transition-colors relative ${
      active ? "text-ilmic-blue" : "text-[#1a3a52] hover:text-ilmic-blue"
    }`;

  return (
    <>
      {/* Top utility bar — reference exact */}
      <div className="bg-[#0c4a6e] text-white text-[11px] font-medium hidden lg:block border-b border-white/5">
        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between h-9">
          <span className="flex items-center gap-1.5 opacity-95">
            <FiShield className="w-3 h-3 text-[#7ec8e3]" />
            Oncology <span className="opacity-50 mx-0.5">•</span> General Pharma <span className="opacity-50 mx-0.5">•</span> Surgical
          </span>
          <span className="flex items-center gap-1.5 opacity-95">
            <FiGlobe className="w-3 h-3 text-[#7ec8e3]" />
            International Export Markets
          </span>
          <div className="flex items-center gap-5">
            <a href="mailto:info.ilmichealthcare@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors opacity-95">
              <FiMail className="w-3 h-3 text-[#7ec8e3]" />
              info.ilmichealthcare@gmail.com
            </a>
            <a href="tel:+918810272080" className="flex items-center gap-1.5 hover:text-white transition-colors opacity-95">
              <FiPhoneCall className="w-3 h-3 text-[#7ec8e3]" />
              +91 88102 72080
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e2edf5] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="hidden lg:grid lg:grid-cols-[200px_1fr_auto] lg:items-center lg:gap-4 h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <img src={ILMIC_LOGO} alt="ILMIC Health Care" className="h-[52px] w-auto max-w-[180px] object-contain" />
            </Link>

            {/* Center nav */}
            <nav className="flex items-center justify-center gap-0.5 flex-wrap">
              <Link href="/" className={navLinkClass(isActive("/"))}>
                Home
                {isActive("/") && <span className="absolute -bottom-[13px] left-3 right-3 h-[2px] bg-ilmic-blue rounded-full" />}
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProductsOpen((o) => !o)}
                  className={`flex items-center gap-0.5 ${navLinkClass(productsActive)}`}
                >
                  Products
                  <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
                </button>
                {productsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl border border-[#e2edf5] shadow-xl py-1.5 z-50">
                    <Link href="/products" className="block px-4 py-2 text-sm font-semibold hover:bg-[#f0f7fc] text-[#1a3a52]" onClick={() => setProductsOpen(false)}>All Products</Link>
                    {ilmicCategories.map((cat) => (
                      <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.category)}`} className="block px-4 py-2 text-sm text-[#5a7394] hover:bg-[#f0f7fc]" onClick={() => setProductsOpen(false)}>
                        {cat.icon} {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} className={navLinkClass(isActive(item.href))}>
                  {item.name}
                  {isActive(item.href) && <span className="absolute -bottom-[13px] left-3 right-3 h-[2px] bg-ilmic-blue rounded-full" />}
                </Link>
              ))}
            </nav>

            {/* Right utilities */}
            <div className="flex items-center gap-3 justify-end min-w-0">
              <form onSubmit={handleSearch} className="relative w-[160px] xl:w-[175px]">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full h-9 pl-3.5 pr-9 text-[12px] border border-[#d4e3ef] rounded-full bg-[#f8fbfd] text-[#1a3a52] focus:outline-none focus:border-ilmic-blue focus:ring-1 focus:ring-ilmic-blue/20"
                />
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8aa3b8]" aria-label="Search">
                  <FiSearch className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-[#e8f4fa] flex items-center justify-center flex-shrink-0">
                  <FiPhoneCall className="w-4 h-4 text-ilmic-blue" />
                </span>
                <div className="text-[10.5px] leading-[1.35] font-bold text-[#1a3a52]">
                  <a href="tel:+918810272080" className="block hover:text-ilmic-blue">+91 88102 72080</a>
                  <a href="tel:+919217174829" className="block text-[#6b8499] font-semibold hover:text-ilmic-blue">+91 92171 74829</a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGenericEnquiryOpen(true)}
                className="inline-flex items-center gap-2 h-9 pl-4 pr-1.5 rounded-lg bg-ilmic-blue text-white text-[12px] font-bold hover:bg-ilmic-blue-dark transition-colors"
              >
                Send Enquiry
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <FiArrowRight className="w-3 h-3" />
                </span>
              </button>
            </div>
          </div>

          {/* Mobile row */}
          <div className="flex lg:hidden items-center justify-between h-16 gap-2">
            <Link href="/"><img src={ILMIC_LOGO} alt="ILMIC" className="h-10 w-auto max-w-[130px] object-contain" /></Link>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setGenericEnquiryOpen(true)} className="text-[11px] font-bold px-3 py-2 rounded-lg bg-ilmic-blue text-white">Enquiry</button>
              <button type="button" onClick={() => setMobileMenuOpen((o) => !o)} className="p-2 rounded-lg border border-[#e2edf5]" aria-label="Menu">
                {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="llmic-mobile-menu lg:hidden">
          <button type="button" className="llmic-mobile-menu__overlay" onClick={closeMobileMenu} aria-label="Close" />
          <div className="llmic-mobile-menu__panel">
            <div className="llmic-mobile-menu__header">
              <Link href="/" onClick={closeMobileMenu}><img src={ILMIC_LOGO} alt="ILMIC" className="h-10 w-auto" /></Link>
              <button type="button" className="llmic-mobile-menu__close" onClick={closeMobileMenu}><FiX className="w-6 h-6" /></button>
            </div>
            <nav className="llmic-mobile-menu__nav">
              <form onSubmit={handleSearch} className="px-1 pb-2">
                <div className="relative">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full h-10 pl-4 pr-10 text-sm border border-ilmic-border rounded-xl bg-ilmic-blue-soft focus:outline-none focus:border-ilmic-blue"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-ilmic-muted" aria-label="Search">
                    <FiSearch className="w-4 h-4" />
                  </button>
                </div>
              </form>
              <Link href="/" onClick={closeMobileMenu} className="llmic-mobile-menu__link">Home</Link>
              <Link href="/products" onClick={closeMobileMenu} className="llmic-mobile-menu__link">Products</Link>
              {ilmicCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${encodeURIComponent(cat.category)}`}
                  onClick={closeMobileMenu}
                  className="llmic-mobile-menu__link !text-sm !font-medium !text-ilmic-muted"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMobileMenu} className="llmic-mobile-menu__link">{item.name}</Link>
              ))}
            </nav>
            <div className="llmic-mobile-menu__footer">
              <a href="tel:+918810272080" className="llmic-mobile-menu__phone"><FiPhoneCall /> +91 88102 72080</a>
              <a href="tel:+919217174829" className="llmic-mobile-menu__phone"><FiPhoneCall /> +91 92171 74829</a>
              <button type="button" onClick={() => { closeMobileMenu(); setGenericEnquiryOpen(true); }} className="llmic-btn llmic-btn-coral w-full">Send Enquiry</button>
            </div>
          </div>
        </div>
      )}

      <ProductEnquiryModal modalOpen={genericEnquiryOpen} setModalOpen={setGenericEnquiryOpen} product={generalPlaceholder} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
