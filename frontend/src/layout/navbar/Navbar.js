import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiPhoneCall, FiChevronDown } from "react-icons/fi";
import dynamic from "next/dynamic";
import ProductEnquiryModal from "@components/modal/ProductEnquiryModal";

const Navbar = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [genericEnquiryOpen, setGenericEnquiryOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Products", href: "/products", hasDropdown: true },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const generalProductPlaceholder = {
    _id: "general",
    name: "General Sourcing Enquiry",
    shortDescription: "Inquire about customized packaging or general bulk drug sourcing.",
  };

  const isActive = (href) => {
    if (href === "/") return router.pathname === "/";
    if (href.startsWith("/#")) return false;
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <div
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-md" : "border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px]">

            {/* ── Logo ── */}
            <Link href="/" className="relative flex items-center h-[80px] w-[240px] flex-shrink-0 z-20">
              <img
                src="/kure-logo.png"
                alt="Kure Pharma"
                className="h-[120px] w-auto object-contain absolute left-0 top-[-15px] drop-shadow-md"
                style={{ maxWidth: 320 }}
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-0.5 px-3 py-2 rounded text-[15px] font-semibold transition-colors ${
                    isActive(item.href)
                      ? "text-[#005A60] font-black"
                      : "text-gray-600 hover:text-[#005A60]"
                  }`}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <FiChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5" />
                  )}
                </Link>
              ))}
            </nav>

            {/* ── Right side: Saffron Orange Button + Teal Accent for Call ── */}
            <div className="hidden md:flex items-center gap-5 flex-shrink-0">
              <a
                href="tel:+919910768201"
                className="flex items-center gap-1.5 text-[15px] font-bold text-gray-700 hover:text-[#005A60] transition-colors"
              >
                <FiPhoneCall className="w-4 h-4 text-[#005A60]" />
                +91 99107 68201
              </a>
              <button
                type="button"
                onClick={() => setGenericEnquiryOpen(true)}
                className="bg-[#E65F00] hover:bg-orange-700 text-white text-[14px] font-black px-5 py-2.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wide shadow-sm"
              >
                Send Enquiry <span className="text-[12px] font-black">↗</span>
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <img src="/kure-logo.png" alt="Kure Pharma" className="h-16 w-auto object-contain" />
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-gray-500 hover:text-gray-800">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-5 space-y-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-3 rounded-lg text-base font-semibold transition-colors ${
                      isActive(item.href)
                        ? "bg-[#005A60]/10 text-[#005A60]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-100 p-5 space-y-3">
                <a
                  href="tel:+919910768201"
                  className="flex items-center gap-2 text-base font-semibold text-gray-700 hover:text-[#005A60]"
                >
                  <FiPhoneCall className="w-4 h-4 text-[#005A60]" />
                  +91 99107 68201
                </a>
                <button
                  onClick={() => { setMobileMenuOpen(false); setGenericEnquiryOpen(true); }}
                  className="w-full bg-[#E65F00] text-white py-2.5 rounded-lg text-base font-bold uppercase tracking-wide cursor-pointer hover:bg-orange-700 transition-colors shadow-sm"
                >
                  Send Enquiry
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <ProductEnquiryModal
        modalOpen={genericEnquiryOpen}
        setModalOpen={setGenericEnquiryOpen}
        product={generalProductPlaceholder}
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });