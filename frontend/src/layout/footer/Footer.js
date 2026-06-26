import React from "react";
import Link from "next/link";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall, FiMail, FiMapPin, FiClock } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-100">

          {/* ── Brand Column ── */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/kure-logo.png"
                alt="Kure Pharma Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-[12px] leading-relaxed text-gray-500 font-medium max-w-[220px]">
              Kure Pharma is a trusted pharmaceutical distributor of oncology, critical care, HIV, Nephrology and specialty medicines across India.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#0F4C81] text-white flex items-center justify-center hover:bg-[#2A7DE1] transition-colors"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="https://wa.me/919910768201"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#0F4C81] text-white flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <FaWhatsapp className="w-3.5 h-3.5" />
              </Link>
              <a
                href="mailto:info@kurepharma.com"
                aria-label="Email"
                className="w-8 h-8 rounded-full bg-[#0F4C81] text-white flex items-center justify-center hover:bg-[#2A7DE1] transition-colors"
              >
                <FiMail className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:+919910768201"
                aria-label="Phone"
                className="w-8 h-8 rounded-full bg-[#0F4C81] text-white flex items-center justify-center hover:bg-[#2A7DE1] transition-colors"
              >
                <FiPhoneCall className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-extrabold text-gray-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Products", href: "/products" },
                { label: "Contact Us", href: "/contact-us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[12px] font-medium text-gray-500 hover:text-[#0F4C81] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Us ── */}
          <div className="space-y-4">
            <h4 className="text-[13px] font-extrabold text-gray-900 uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:+919910768201"
                className="flex items-start gap-2.5 text-[12px] font-medium text-gray-500 hover:text-[#0F4C81] transition-colors"
              >
                <FiPhoneCall className="w-4 h-4 text-[#0F4C81] flex-shrink-0 mt-0.5" />
                +91 99107 68201
              </a>
              <a
                href="mailto:info@kurepharma.com"
                className="flex items-start gap-2.5 text-[12px] font-medium text-gray-500 hover:text-[#0F4C81] transition-colors"
              >
                <FiMail className="w-4 h-4 text-[#0F4C81] flex-shrink-0 mt-0.5" />
                info@kurepharma.com
              </a>
              <div className="flex items-start gap-2.5 text-[12px] font-medium text-gray-500">
                <FiMapPin className="w-4 h-4 text-[#0F4C81] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  123, Pharma House, Sector 63,<br />
                  Noida, Uttar Pradesh - 201301
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-[12px] font-medium text-gray-500">
                <FiClock className="w-4 h-4 text-[#0F4C81] flex-shrink-0 mt-0.5" />
                Mon - Sat: 9:00 AM – 6:00 PM
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-medium text-gray-400">
          <p>© 2024 Kure Pharma. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#0F4C81] transition-colors">Privacy Policy</Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms-and-conditions" className="hover:text-[#0F4C81] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
