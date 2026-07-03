import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeader from "@components/ui/SectionHeader";
import { renderCategoryTherapyIcon } from "@utils/categoryIcons";
import { therapyAccessItems } from "@utils/kureHomepageRichContent";

const TherapyAccessGrid = () => (
  <section className="kure-section kure-section-white kure-therapy-access">
    <div className="kure-container">
      <SectionHeader
        eyebrow="Therapy Access"
        title="Comprehensive Specialty Drug Access Solutions"
        subtitle="Browse category-wise supply for hospitals, pharmacies, clinics and patients across India."
      />

      <div className="kure-therapy-access__grid">
        {therapyAccessItems.map((item) => (
          <Link
            key={item.category}
            href={`/products?category=${encodeURIComponent(item.category)}`}
            className="kure-therapy-access__card group"
          >
            <span className="kure-therapy-access__icon">
              {renderCategoryTherapyIcon({ icon: item.icon }, "w-6 h-6")}
            </span>
            <div className="kure-therapy-access__text">
              <h3 className="kure-therapy-access__title">{item.title}</h3>
              <p className="kure-therapy-access__desc">{item.description}</p>
            </div>
            <span className="kure-therapy-access__arrow">
              Click Here <FiArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default TherapyAccessGrid;
