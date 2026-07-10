import Link from "next/link";
import { FiCheckCircle, FiSend } from "react-icons/fi";
import { trustedManufacturers } from "@utils/ilmicHomepageRichContent";

const expertise = [
  "Specialty drug distribution & cost-effective sourcing",
  "Patient care & treatment management support",
  "Regulatory guidance & compliance assistance",
  "Cold-chain handling for biologics & injectables",
];

const SpecialtyTrust = ({ onEnquiry }) => (
  <section className="ilmic-section ilmic-section-cream ilmic-specialty-trust">
    <div className="ilmic-container">
      <div className="ilmic-specialty-trust__layout">
        <div className="ilmic-specialty-trust__main">
          <span className="ilmic-eyebrow">Trusted Supplier</span>
          <h2 className="ilmic-section-title !text-left !mx-0">
            Looking for specialty drugs from trusted manufacturers in India?
          </h2>
          <p className="ilmic-section-subtitle !text-left !mx-0 !mb-6">
            ILMIC Health Care is a licensed pharmaceutical wholesaler and distributor,
            delivering genuine specialty medicines, reliable sourcing, and dependable
            customer service to hospitals and pharmacies nationwide.
          </p>

          <h3 className="ilmic-specialty-trust__list-title">Our expertise includes:</h3>
          <ul className="ilmic-specialty-trust__list">
            {expertise.map((item) => (
              <li key={item}>
                <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="ilmic-specialty-trust__cta">
            {onEnquiry ? (
              <button
                type="button"
                onClick={onEnquiry}
                className="ilmic-btn ilmic-btn-maroon cursor-pointer"
              >
                <FiSend className="w-4 h-4 rotate-45" /> Contact Support Team
              </button>
            ) : null}
            <Link href="/products" className="ilmic-btn ilmic-btn-outline">
              Explore Products & Pricing
            </Link>
          </div>
        </div>

        <aside className="ilmic-specialty-trust__brands">
          <h3 className="ilmic-specialty-trust__brands-title">
            Buy specialty drugs from trusted manufacturers
          </h3>
          <p className="ilmic-specialty-trust__brands-intro">
            We source directly from leading Indian & global pharma partners including:
          </p>
          <div className="ilmic-specialty-trust__brand-chips">
            {trustedManufacturers.map((name) => (
              <span key={name} className="ilmic-specialty-trust__chip">
                {name}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </div>
  </section>
);

export default SpecialtyTrust;
