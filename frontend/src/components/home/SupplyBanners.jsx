import Link from "next/link";
import { FiArrowRight, FiSend } from "react-icons/fi";
import { supplyBanners } from "@utils/ilmicHomepageRichContent";

const SupplyBanners = ({ onEnquiry }) => (
  <section className="ilmic-supply-bands">
    <div className="ilmic-container">
      <div className="ilmic-supply-bands__grid">
        {supplyBanners.map((band, idx) => (
          <article
            key={band.title}
            className={`ilmic-supply-band ilmic-supply-band--${idx % 3}`}
          >
            <p className="ilmic-supply-band__eyebrow">{band.eyebrow}</p>
            <h3 className="ilmic-supply-band__title">{band.title}</h3>
            <p className="ilmic-supply-band__desc">{band.description}</p>
            <div className="ilmic-supply-band__tags">
              {band.tags.map((tag) => (
                <span key={tag} className="ilmic-supply-band__tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="ilmic-supply-band__actions">
              {onEnquiry ? (
                <button
                  type="button"
                  onClick={onEnquiry}
                  className="ilmic-supply-band__btn ilmic-supply-band__btn--primary cursor-pointer"
                >
                  <FiSend className="w-3.5 h-3.5" />
                  {band.enquiryLabel}
                </button>
              ) : null}
              <Link href={band.linkUrl} className="ilmic-supply-band__btn">
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
