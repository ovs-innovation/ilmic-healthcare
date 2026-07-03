import Link from "next/link";
import SectionHeader from "@components/ui/SectionHeader";
import CatalogProductImage from "@components/ui/CatalogProductImage";
import CatalogReadMore from "@components/ui/CatalogReadMore";
import { breakthroughDrugs } from "@utils/kureHomepageRichContent";

const cardShell =
  "group flex flex-col h-full w-full min-w-0 border-2 border-[#c9a066]/55 rounded-sm bg-white overflow-hidden hover:border-[#b8860b]/80 hover:shadow-[0_6px_20px_rgba(184,134,11,0.12)] transition-all duration-300 text-center";

const BreakthroughDrugs = ({ onEnquiry }) => (
  <section className="kure-section kure-section-white kure-breakthrough">
    <div className="kure-container">
      <SectionHeader
        eyebrow="Breakthrough Therapies"
        title="Breakthrough Drugs Available In India"
        subtitle="Indian branded specialty medicines from trusted manufacturers — oncology, hematology, critical care and more."
      />

      <div className="kure-catalog-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {breakthroughDrugs.map((drug) => {
          const href = drug.slug
            ? `/product/${drug.slug}`
            : `/products?category=${encodeURIComponent(drug.category)}`;
          return (
            <Link key={drug.name} href={href} className={cardShell}>
              <CatalogProductImage src={drug.image} alt={drug.name} />
              <div className="kure-catalog-card-body">
                <h3 className="kure-catalog-card-title">{drug.name}</h3>
                {drug.subtitle ? (
                  <p className="kure-breakthrough__composition">{drug.subtitle}</p>
                ) : null}
                <CatalogReadMore href={href} />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="kure-breakthrough__footer">
        <p className="kure-breakthrough__note">
          More breakthrough drugs available across oncology, HIV, nephrology & imported specialty range.
        </p>
        <div className="kure-breakthrough__actions">
          <Link href="/products" className="kure-btn kure-btn-primary !text-sm">
            View Full Product Range
          </Link>
          {onEnquiry ? (
            <button
              type="button"
              onClick={onEnquiry}
              className="kure-btn kure-btn-outline !text-sm cursor-pointer"
            >
              Enquire Now
            </button>
          ) : null}
        </div>
      </div>
    </div>
  </section>
);

export default BreakthroughDrugs;
