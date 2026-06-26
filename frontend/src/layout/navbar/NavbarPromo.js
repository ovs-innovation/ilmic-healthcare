import React, { useState } from "react";
import Link from "next/link";
import { FiUser, FiShoppingCart } from "react-icons/fi";

const services = [
  { label: "Electrical Testing & Tagging", href: "/service/electrical-testing-tagging" },
  { label: "Fire Extinguishers", href: "/service/fire-extinguishers" },
  { label: "RCD/Safety Switches", href: "/service/rcd-safety-switches" },
  { label: "Three Phase Testing", href: "/service/three-phase-testing" },
  { label: "Microwave Testing", href: "/service/microwave-testing" },
  { label: "Emergency Exit Light Testing", href: "/service/emergency-exit-light-testing" },
  { label: "Smoke Alarm Service", href: "/service/smoke-alarm-service" },
];

const productCategories = [
  { label: "Oncology Medicines", href: "/products?category=Oncology%20Medicines" },
  { label: "Anti Cancer Drugs", href: "/products?category=Anti%20Cancer%20Drugs" },
  { label: "Critical Care", href: "/products?category=Critical%20Care" },
  { label: "Immunotherapy", href: "/products?category=Immunotherapy" },
  { label: "Targeted Therapy", href: "/products?category=Targeted%20Therapy" },
  { label: "Hematology", href: "/products?category=Hematology" },
  { label: "Bone Health", href: "/products?category=Bone%20Health" },
  { label: "Injectable Medicines", href: "/products?category=Injectable%20Medicines" },
  { label: "Oral Medicines", href: "/products?category=Oral%20Medicines" },
  { label: "Imported Medicines", href: "/products?category=Imported%20Medicines" },
  { label: "HIV Medicines", href: "/products?category=HIV%20Medicines" },
  { label: "Nephrology Medicines", href: "/products?category=Nephrology%20Medicines" },
  { label: "Lifesaving Medicines", href: "/products?category=Lifesaving%20Medicines" }
];

const NavbarPromo = () => {
  const [openService, setOpenService] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  return (
    <div className="hidden lg:block bg-white text-black border-b">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 h-14 flex items-center justify-between">
        <nav className="flex items-center gap-6 text-[15px] font-semibold">
          <Link href="/" className="hover:text-red-500 transition">
            Home
          </Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenCategories(true)}
            onMouseLeave={() => setOpenCategories(false)}
          >
            <button
              className="flex items-center gap-1 hover:text-red-500 transition focus:outline-none"
              onClick={() => setOpenCategories((prev) => !prev)}
            >
              Categories <span className="text-[10px]">▼</span>
            </button>
            {openCategories && (
              <div
                className="absolute left-0 top-full w-64 bg-white text-gray-900 shadow-2xl rounded-lg overflow-hidden border border-gray-100 z-50 py-1"
              >
                {productCategories.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-red-500 transition font-medium"
                    onClick={() => setOpenCategories(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpenService(true)}
            onMouseLeave={() => setOpenService(false)}
          >
            <button
              className="flex items-center gap-1 hover:text-red-500 transition"
              onClick={() => setOpenService((prev) => !prev)}
            >
              Service <span className="text-xs">▼</span>
            </button>
            {openService && (
              <div
                className="absolute left-0 top-full w-72 bg-white text-gray-900 shadow-xl rounded-md overflow-hidden z-30"
              >
                {services.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 text-sm hover:bg-gray-100"
                    onClick={() => setOpenService(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/faq" className="hover:text-red-500 transition">
            Faq
          </Link>
          <Link href="/request-a-quote" className="hover:text-red-500 transition">
            Request A Quote
          </Link>
          <Link href="/blog" className="hover:text-red-500 transition">
            Blog
          </Link>
        </nav>

       
      </div>
    </div>
  );
};

export default NavbarPromo;

