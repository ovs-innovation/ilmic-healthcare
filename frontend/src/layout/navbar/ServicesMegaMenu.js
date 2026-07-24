import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiNavigation,
  FiHome,
  FiGlobe,
  FiActivity,
  FiAward,
  FiCheckCircle,
  FiArrowRight,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

// ─── Service Data ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "medical-tourism",
    name: "Medical Tourism",
    slug: "medical-tourism",
    icon: FiNavigation,
    tagline: "World-Class Treatment in India",
    description:
      "Helping international patients receive world-class treatment in India with complete travel, visa, hospital, and recovery assistance.",
    highlights: [
      "Medical Visa Assistance",
      "Airport Pickup & Transfer",
      "Hospital Coordination",
      "Language & Translation Support",
      "Post-Treatment Care",
    ],
    primaryCTA: { label: "Explore Service", href: "/services/medical-tourism" },
    secondaryCTA: { label: "Book Consultation", href: "/services/medical-tourism#enquiry" },
    image: "/visuals/service_medical_tourism.png",
    imageAlt: "Medical Tourism in India - ILMIC Health Care",
  },
  {
    id: "hospital-management",
    name: "Hospital Management",
    slug: "hospital-management",
    icon: FiHome,
    tagline: "Operational Excellence for Healthcare",
    description:
      "End-to-end hospital management services for operational excellence, patient satisfaction, staffing, and healthcare administration.",
    highlights: [
      "Hospital Operations Audit",
      "Digital EMR Management",
      "Resource & Budget Planning",
      "Staff Training & Coordination",
      "Healthcare Consulting",
    ],
    primaryCTA: { label: "Explore Service", href: "/services/hospital-management" },
    secondaryCTA: { label: "Request Consultation", href: "/services/hospital-management#enquiry" },
    image: "/visuals/service_hospital_management.png",
    imageAlt: "Hospital Management Services - ILMIC Health Care",
  },
  {
    id: "pharmaceutical-export",
    name: "Pharmaceutical Export",
    slug: "pharmaceutical-export",
    icon: FiGlobe,
    tagline: "Global Pharma Trade Solutions",
    description:
      "Global pharmaceutical export solutions with WHO-GMP quality products, regulatory compliance, and international logistics.",
    highlights: [
      "WHO-GMP Certified Products",
      "Global Distribution Network",
      "Export Documentation & Compliance",
      "Bulk Order Fulfilment",
      "Quality Assurance & COA",
    ],
    primaryCTA: { label: "Explore Service", href: "/services/pharmaceutical-export" },
    secondaryCTA: { label: "Export Enquiry", href: "/services/pharmaceutical-export#enquiry" },
    image: "/visuals/service_pharma_export.png",
    imageAlt: "Global Pharmaceutical Export Solutions - ILMIC Health Care",
  },
  {
    id: "hospital-accessories-supply",
    name: "Hospital Accessories",
    slug: "hospital-accessories-supply",
    icon: FiActivity,
    tagline: "Premium Medical Equipment Worldwide",
    description:
      "Supplying premium medical equipment and hospital accessories for healthcare institutions worldwide.",
    highlights: [
      "ICU & Critical Care Equipment",
      "Diagnostic Devices",
      "Surgical Instruments",
      "Hospital Furniture & Fittings",
      "Onsite Installation Support",
    ],
    primaryCTA: { label: "Explore Service", href: "/services/hospital-accessories-supply" },
    secondaryCTA: { label: "Request Quotation", href: "/services/hospital-accessories-supply#enquiry" },
    image: "/visuals/service_hospital_accessories.png",
    imageAlt: "Hospital Accessories & Medical Equipment - ILMIC Health Care",
  },
  {
    id: "international-medical-conferences",
    name: "Medical Conferences",
    slug: "international-medical-conferences",
    icon: FiAward,
    tagline: "Connecting Global Healthcare Leaders",
    description:
      "Connecting healthcare professionals through global conferences, workshops, exhibitions, and knowledge exchange events.",
    highlights: [
      "World-Class Medical Experts",
      "Hands-on Clinical Workshops",
      "Global Networking Opportunities",
      "Cutting-edge Research Presentations",
      "Innovation Showcase & Expo",
    ],
    primaryCTA: { label: "Explore Service", href: "/services/international-medical-conferences" },
    secondaryCTA: { label: "Register Interest", href: "/services/international-medical-conferences#enquiry" },
    image: "/visuals/service_international_conferences.png",
    imageAlt: "International Medical Conferences - ILMIC Health Care",
  },
];

// ─── Right Panel ──────────────────────────────────────────────────────────────

function MegaMenuRightPanel({ service, onClose, onOpenConsultation }) {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  useEffect(() => {
    setVisible(false);
    setImgLoaded(false);
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, [service.id]);

  return (
    <div
      className="ilmic-mega-right"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
      }}
    >
      {/* Text block */}
      <div className="ilmic-mega-right__text">
        <span className="ilmic-mega-right__tagline">{service.tagline}</span>
        <h3 className="ilmic-mega-right__title">{service.name}</h3>
        <p className="ilmic-mega-right__desc">{service.description}</p>

        <ul className="ilmic-mega-right__highlights">
          {service.highlights.map((h) => (
            <li key={h} className="ilmic-mega-right__highlight-item">
              <FiCheckCircle size={14} className="ilmic-mega-right__check" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="ilmic-mega-right__actions">
          <Link
            href={service.primaryCTA.href}
            onClick={onClose}
            className="ilmic-mega-right__btn-primary"
          >
            {service.primaryCTA.label}
            <FiArrowRight size={14} className="ilmic-mega-right__btn-arrow" />
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onOpenConsultation(service.id);
            }}
            className="ilmic-mega-right__btn-secondary"
          >
            {service.secondaryCTA.label}
          </button>
        </div>
      </div>

      {/* Image block */}
      <div className="ilmic-mega-right__img-wrap">
        {!imgLoaded && <div className="ilmic-mega-right__img-skeleton" />}
        <img
          src={service.image}
          alt={service.imageAlt}
          className="ilmic-mega-right__img"
          style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.3s ease" }}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        <div className="ilmic-mega-right__img-badge">
          <span>{service.tagline}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop Mega Menu ────────────────────────────────────────────────────────

export function DesktopMegaMenu({ isOpen, onClose, onOpenConsultation }) {
  const router = useRouter();
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const [menuTop, setMenuTop] = useState(82);
  const activeService = SERVICES.find((s) => s.id === activeId) || SERVICES[0];

  // Measure actual header bottom to position menu correctly
  useEffect(() => {
    if (!isOpen) return;
    const measure = () => {
      const header = document.querySelector("header.sticky");
      if (header) {
        const rect = header.getBoundingClientRect();
        setMenuTop(rect.bottom + 6);
      }
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    return () => window.removeEventListener("scroll", measure);
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Reset on open
  useEffect(() => {
    if (isOpen) setActiveId(SERVICES[0].id);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="ilmic-mega-menu"
      role="dialog"
      aria-label="Services navigation menu"
      style={{ top: menuTop }}
    >

      {/* LEFT PANEL */}
      <div className="ilmic-mega-left">
        <div className="ilmic-mega-left__header">
          <p className="ilmic-mega-left__label">OUR SERVICES</p>
          <p className="ilmic-mega-left__subtitle">
            Explore ILMIC&apos;s complete healthcare solutions.
          </p>
        </div>
        <div className="ilmic-mega-left__divider" />

        <nav className="ilmic-mega-left__nav" aria-label="Services list">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const isActive = service.id === activeId;
            const isCurrent = router.asPath.startsWith(`/services/${service.slug}`);
            return (
              <button
                key={service.id}
                type="button"
                onMouseEnter={() => setActiveId(service.id)}
                onFocus={() => setActiveId(service.id)}
                onClick={() => { router.push(`/services/${service.slug}`); onClose(); }}
                className={`ilmic-mega-left__item${isActive ? " ilmic-mega-left__item--active" : ""}${isCurrent ? " ilmic-mega-left__item--current" : ""}`}
                aria-current={isCurrent ? "page" : undefined}
              >
                <span className={`ilmic-mega-left__indicator${isActive ? " ilmic-mega-left__indicator--on" : ""}`} />
                <span className={`ilmic-mega-left__icon${isActive ? " ilmic-mega-left__icon--active" : ""}`}>
                  <Icon size={15} />
                </span>
                <span className={`ilmic-mega-left__name${isActive ? " ilmic-mega-left__name--active" : ""}`}>
                  {service.name}
                </span>
                <FiChevronRight
                  size={13}
                  className={`ilmic-mega-left__chevron${isActive ? " ilmic-mega-left__chevron--on" : ""}`}
                />
              </button>
            );
          })}
        </nav>

        <div className="ilmic-mega-left__footer">
          <Link href="/services" onClick={onClose} className="ilmic-mega-left__all-link">
            View All Services
            <FiArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <MegaMenuRightPanel service={activeService} onClose={onClose} onOpenConsultation={onOpenConsultation} />
    </div>
  );
}

// ─── Mobile Accordion ─────────────────────────────────────────────────────────

export function MobileMegaMenu({ onClose, onOpenConsultation }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="ilmic-mega-mobile">
      <Link href="/services" onClick={onClose} className="ilmic-mega-mobile__all">
        All Services
      </Link>
      {SERVICES.map((service) => {
        const Icon = service.icon;
        const isExpanded = expandedId === service.id;
        return (
          <div key={service.id} className="ilmic-mega-mobile__item">
            <button
              type="button"
              className="ilmic-mega-mobile__toggle"
              onClick={() => setExpandedId(isExpanded ? null : service.id)}
              aria-expanded={isExpanded}
            >
              <span className="ilmic-mega-mobile__toggle-left">
                <span className="ilmic-mega-mobile__toggle-icon">
                  <Icon size={14} />
                </span>
                <span className="ilmic-mega-mobile__toggle-name">{service.name}</span>
              </span>
              <FiChevronDown
                size={14}
                style={{ transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}
              />
            </button>
            {isExpanded && (
              <div className="ilmic-mega-mobile__content">
                <p className="ilmic-mega-mobile__desc">{service.description}</p>
                <div className="flex flex-col gap-2 mt-3 w-full">
                  <Link
                    href={service.primaryCTA.href}
                    onClick={onClose}
                    className="ilmic-mega-mobile__cta"
                  >
                    {service.primaryCTA.label}
                    <FiArrowRight size={12} />
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenConsultation(service.id);
                    }}
                    className="text-xs font-bold text-ilmic-blue px-3 py-2 border border-ilmic-blue/30 rounded-lg hover:bg-ilmic-blue-soft transition-colors text-center w-full"
                  >
                    {service.secondaryCTA.label}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { SERVICES };
