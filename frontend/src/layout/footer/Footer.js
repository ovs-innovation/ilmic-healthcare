import React from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhoneCall, FiMail, FiMapPin, FiClock, FiShield, FiGlobe } from "react-icons/fi";

import ilmicDefaults, { ilmicCategories, ILMIC_LOGO } from "@utils/ilmicDefaults";

const BADGE_ICONS = [FiShield, FiGlobe];

const Footer = () => {
  const footer = ilmicDefaults.footer;
  const badges = (footer.badges || ilmicDefaults.footer.badges).filter(Boolean);

  return (
    <footer className="relative overflow-hidden mt-0 bg-gradient-to-b from-[#F5F9FF] to-[#EEF4FB] border-t border-ilmic-border text-ilmic-text">
      <div className="absolute top-0 left-0 right-0 h-1 bg-ilmic-blue" />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-8 pb-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-ilmic-border">
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center flex-shrink-0 rounded-xl overflow-hidden">
              <img
                src={ILMIC_LOGO}
                alt="ILMIC Health Care Pvt. Ltd."
                className="h-[62px] sm:h-[66px] w-auto max-w-[210px] object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-ilmic-muted max-w-sm">{footer.description}</p>
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {badges.map((label, index) => {
                  const Icon = BADGE_ICONS[index % BADGE_ICONS.length];
                  return (
                    <span key={label} className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-white border border-ilmic-border rounded-full px-3 py-1.5 text-ilmic-blue shadow-sm">
                      <Icon className="w-3 h-3" />{label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-ilmic-text uppercase tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Services", href: "/services" },
                { label: "About Us", href: "/about-us" },
                { label: "Contact", href: "/contact-us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ilmic-muted hover:text-ilmic-blue transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-ilmic-text uppercase tracking-wide mb-4">Product Categories</h4>
            <ul className="space-y-2.5 text-sm text-ilmic-muted">
              {ilmicCategories.map((item) => (
                <li key={item.name}>
                  <Link href={`/products?category=${encodeURIComponent(item.category)}`} className="hover:text-ilmic-blue transition-colors">
                    {item.icon} {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-ilmic-text uppercase tracking-wide mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+918810272080" className="flex items-center gap-3 text-ilmic-text hover:text-ilmic-blue transition-colors">
                <span className="w-8 h-8 rounded-lg bg-white border border-ilmic-border text-ilmic-blue flex items-center justify-center flex-shrink-0 shadow-sm"><FiPhoneCall className="w-4 h-4" /></span>
                <span>+91 88102 72080</span>
              </a>
              <a href="tel:+919217174829" className="flex items-center gap-3 text-ilmic-text hover:text-ilmic-blue transition-colors">
                <span className="w-8 h-8 rounded-lg bg-white border border-ilmic-border text-ilmic-blue flex items-center justify-center flex-shrink-0 shadow-sm"><FiPhoneCall className="w-4 h-4" /></span>
                <span>+91 92171 74829</span>
              </a>
              <a href={`mailto:${footer.email}`} className="flex items-center gap-3 text-ilmic-text hover:text-ilmic-blue transition-colors">
                <span className="w-8 h-8 rounded-lg bg-white border border-ilmic-border text-ilmic-blue flex items-center justify-center flex-shrink-0 shadow-sm"><FiMail className="w-4 h-4" /></span>
                <span>{footer.email}</span>
              </a>
              <div className="flex items-start gap-3 text-ilmic-text">
                <span className="w-8 h-8 rounded-lg bg-white border border-ilmic-border text-ilmic-blue flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"><FiMapPin className="w-4 h-4" /></span>
                <span className="leading-relaxed text-ilmic-muted">{footer.address}</span>
              </div>
              <div className="flex items-center gap-3 text-ilmic-text">
                <span className="w-8 h-8 rounded-lg bg-white border border-ilmic-border text-ilmic-blue flex items-center justify-center flex-shrink-0 shadow-sm"><FiClock className="w-4 h-4" /></span>
                <span className="text-ilmic-muted">{footer.hours}</span>
              </div>
            </div>
            {footer.whatsappUrl && (
              <a href={footer.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex mt-4 w-10 h-10 rounded-full bg-ilmic-blue items-center justify-center hover:bg-ilmic-blue-dark transition-colors shadow-sm" aria-label="WhatsApp">
                <FaWhatsapp className="w-5 h-5 text-white" />
              </a>
            )}
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ilmic-muted">
          <p>© {new Date().getFullYear()} ILMIC Health Care Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/privacy-policy" className="hover:text-ilmic-blue transition-colors">Privacy</Link>
            <span className="text-ilmic-border">|</span>
            <Link href="/terms-and-conditions" className="hover:text-ilmic-blue transition-colors">Terms</Link>
            <span className="text-ilmic-border">|</span>
            <Link href="/legal-disclaimer" className="hover:text-ilmic-blue transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
