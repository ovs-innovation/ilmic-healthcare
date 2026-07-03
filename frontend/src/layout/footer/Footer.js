import Link from "next/link";
import { kureTherapeuticCategories } from "@utils/kureTherapeuticCategories";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import {
  FiPhoneCall,
  FiMail,
  FiMapPin,
  FiClock,
  FiShield,
  FiTruck,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#0f1a33] text-blue-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF9933] via-[#B8860B] to-[#138808]" />

      <div className="kure-container pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              className="relative inline-flex items-center flex-shrink-0"
            >
              <img
                src="/kure-logo.png"
                alt="Kure Pharma"
                className="h-[88px] lg:h-[100px] w-auto object-contain -my-2 drop-shadow-sm"
              />
            </Link>
            <p className="text-sm leading-relaxed text-blue-100/75 max-w-sm">
              भारत का विश्वसनीय फार्मास्युटिकल वितरक — Oncology, Critical Care,
              HIV & Specialty medicines. Serving hospitals & pharmacies across
              India since 2016.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: FiShield, label: "Quality Assured" },
                { icon: FiTruck, label: "Pan-India" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-white/8 border border-white/10 rounded-full px-3 py-1.5"
                >
                  <Icon className="w-3 h-3 text-[#FF9933]" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="kure-footer-heading">Company</h4>
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
                    className="text-sm text-blue-100/70 hover:text-[#FF9933] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="kure-footer-heading">Therapeutic Areas</h4>
            <ul className="space-y-2.5 text-sm text-blue-100/70">
              {kureTherapeuticCategories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/products?category=${encodeURIComponent(item.category)}`}
                    className="hover:text-[#FF9933] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="kure-footer-heading">Get In Touch</h4>
            <div className="space-y-3.5 text-sm">
              <a
                href="tel:+919911972234"
                className="flex items-start gap-3 text-blue-100/80 hover:text-[#FF9933] transition-colors"
              >
                <FiPhoneCall className="w-4 h-4 text-[#FF9933] mt-0.5 flex-shrink-0" />
                +91 99119 72234
              </a>
              <a
                href="mailto:Kure.export@gmail.com"
                className="flex items-start gap-3 text-blue-100/80 hover:text-[#FF9933] transition-colors"
              >
                <FiMail className="w-4 h-4 text-[#FF9933] mt-0.5 flex-shrink-0" />
                Kure.export@gmail.com
              </a>
              <div className="flex items-start gap-3 text-blue-100/80">
                <FiMapPin className="w-4 h-4 text-[#FF9933] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  B-1/D, Saurav Vihar, Jaitpur,
                  <br />
                  Badarpur, New Delhi – 110044
                </span>
              </div>
              <div className="flex items-center gap-3 text-blue-100/80">
                <FiClock className="w-4 h-4 text-[#FF9933] flex-shrink-0" />
                Mon–Sat: 10 AM – 7 PM IST
              </div>
            </div>
            <div className="flex gap-2.5 mt-5">
              <a
                href="https://wa.me/919911972234"
                className="w-10 h-10 rounded-full bg-[#138808] flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://facebook.com"
                className="w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-100/50">
          <p>© {new Date().getFullYear()} Kure Pharma. Proudly serving India.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/privacy-policy" className="hover:text-[#FF9933]">
              Privacy
            </Link>
            <span className="text-white/15">|</span>
            <Link href="/terms-and-conditions" className="hover:text-[#FF9933]">
              Terms
            </Link>
            <span className="text-white/15">|</span>
            <Link href="/shipping-policy" className="hover:text-[#FF9933]">
              Shipping
            </Link>
            <span className="text-white/15">|</span>
            <Link href="/return-and-refund-policy" className="hover:text-[#FF9933]">
              Returns
            </Link>
            <span className="text-white/15">|</span>
            <Link href="/legal-disclaimer" className="hover:text-[#FF9933]">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
