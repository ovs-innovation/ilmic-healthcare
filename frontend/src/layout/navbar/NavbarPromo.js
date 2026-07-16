import React, { useState } from "react";
import Link from "next/link";
import { ilmicCategories, tourismServicesFallback } from "@utils/ilmicDefaults";

const productCategories = ilmicCategories.map((c) => ({
  label: c.name,
  href: `/products?category=${encodeURIComponent(c.category)}`,
}));

const services = tourismServicesFallback.slice(0, 6).map((s) => ({
  label: s.name?.en || s.name,
  href: `/services/${s.slug}`,
}));

const NavbarPromo = () => {
  const [openService, setOpenService] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  return (
    <div className="hidden lg:block bg-white text-black border-b">
      <div className="llmic-container h-14 flex items-center justify-between">
        <nav className="flex items-center gap-6 text-[15px] font-semibold">
          <Link href="/" className="hover:text-ilmic-blue transition">Home</Link>

          <div className="relative" onMouseEnter={() => setOpenCategories(true)} onMouseLeave={() => setOpenCategories(false)}>
            <button type="button" className="flex items-center gap-1 hover:text-ilmic-blue transition" onClick={() => setOpenCategories((p) => !p)}>
              Categories <span className="text-[10px]">▼</span>
            </button>
            {openCategories && (
              <div className="absolute left-0 top-full w-64 bg-white text-gray-900 shadow-2xl rounded-lg overflow-hidden border border-gray-100 z-50 py-1">
                {productCategories.map((item) => (
                  <Link key={item.label} href={item.href} className="block px-4 py-2.5 text-sm hover:bg-ilmic-blue-light hover:text-ilmic-blue-dark transition font-medium" onClick={() => setOpenCategories(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={() => setOpenService(true)} onMouseLeave={() => setOpenService(false)}>
            <button type="button" className="flex items-center gap-1 hover:text-ilmic-blue transition" onClick={() => setOpenService((p) => !p)}>
              Services <span className="text-xs">▼</span>
            </button>
            {openService && (
              <div className="absolute left-0 top-full w-72 bg-white text-gray-900 shadow-xl rounded-md overflow-hidden z-30">
                {services.map((item) => (
                  <Link key={item.label} href={item.href} className="block px-4 py-3 text-sm hover:bg-ilmic-blue-light" onClick={() => setOpenService(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/faq" className="hover:text-ilmic-blue transition">FAQ</Link>
          <Link href="/request-a-quote" className="hover:text-ilmic-blue transition">Request Quote</Link>
          <Link href="/contact-us" className="hover:text-ilmic-blue transition">Contact</Link>
        </nav>
      </div>
    </div>
  );
};

export default NavbarPromo;
