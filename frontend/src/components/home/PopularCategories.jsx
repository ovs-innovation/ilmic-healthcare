import Link from "next/link";
import SectionHeader from "@components/ui/SectionHeader";
import { renderCategoryTherapyIcon } from "@utils/categoryIcons";

const PopularCategories = ({ title = "Popular Categories", items = [] }) => {
  if (!items.length) return null;

  return (
    <section className="ilmic-section ilmic-section-cream ilmic-popular-cats">
      <div className="ilmic-container">
        <SectionHeader
          eyebrow="Browse by Therapy"
          title={title}
          subtitle="Specialty therapeutic segments trusted by hospitals across India"
        />
        <div className="ilmic-popular-cats__grid">
          {items.map((cat, idx) => {
            const accent = cat.textColor || "#1A2E5B";
            const bg = cat.bgColor || "#F8FAFC";

            return (
              <Link
                key={idx}
                href={`/products?category=${encodeURIComponent(cat.category || cat.name)}`}
                className="ilmic-cat-item group"
                style={{
                  "--cat-color": accent,
                  "--cat-bg": bg,
                }}
              >
                <div className="ilmic-cat-item__card">
                  <div className="ilmic-cat-circle">
                    <span className="ilmic-cat-circle__icon-wrap">
                      {renderCategoryTherapyIcon(cat)}
                    </span>
                  </div>
                </div>
                <span className="ilmic-cat-item__label">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
