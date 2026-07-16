import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import IlmicProductCard from "@components/product/IlmicProductCard";

const TreatmentPackages = ({ products, onEnquire, title = "More Products" }) => (
  <section className="llmic-section bg-ilmic-blue-soft">
    <div className="llmic-container">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <p className="llmic-eyebrow">Product Range</p>
          <h2 className="llmic-heading">{title}</h2>
        </div>
        <Link href="/products" className="llmic-btn llmic-btn-primary flex-shrink-0">
          All Products <FiArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {products.map((prod) => (
          <IlmicProductCard
            key={prod._id || prod.slug}
            product={prod}
            onEnquire={onEnquire}
            layout="tile"
          />
        ))}
      </div>
    </div>
  </section>
);

export default TreatmentPackages;
