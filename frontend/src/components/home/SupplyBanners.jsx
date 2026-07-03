import Link from "next/link";
import { FiArrowRight, FiSend } from "react-icons/fi";
import { supplyBanners } from "@utils/kureHomepageRichContent";

const SupplyBanners = ({ onEnquiry }) => (
  <section className="kure-supply-bands">
    <div className="kure-container">
      <div className="kure-supply-bands__grid">
        {supplyBanners.map((band, idx) => (
          <article
            key={band.title}
            className={`kure-supply-band kure-supply-band--${idx % 3}`}
          >
            <p className="kure-supply-band__eyebrow">{band.eyebrow}</p>
            <h3 className="kure-supply-band__title">{band.title}</h3>
            <p className="kure-supply-band__desc">{band.description}</p>
            <div className="kure-supply-band__tags">
              {band.tags.map((tag) => (
                <span key={tag} className="kure-supply-band__tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="kure-supply-band__actions">
              {onEnquiry ? (
                <button
                  type="button"
                  onClick={onEnquiry}
                  className="kure-supply-band__btn kure-supply-band__btn--primary cursor-pointer"
                >
                  <FiSend className="w-3.5 h-3.5" />
                  {band.enquiryLabel}
                </button>
              ) : null}
              <Link href={band.linkUrl} className="kure-supply-band__btn">
                View Products <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default SupplyBanners;
