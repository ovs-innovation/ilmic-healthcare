import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import IlmicProductCard from "@components/product/IlmicProductCard";

const HeroProducts = ({ products, onEnquire }) => (
  <section className="llmic-section bg-gradient-to-b from-white to-ilmic-blue-soft" id="hero-products">
    <div className="llmic-container">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="llmic-eyebrow">Featured Products</p>
        <h2 className="llmic-heading">Our Hero Products</h2>
        <p className="llmic-subheading">
          Quality pharmaceutical products in our own brands — oncology, general pharma & health supplements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {products.map((prod) => (
          <IlmicProductCard
            key={prod._id || prod.slug}
            product={prod}
            onEnquire={onEnquire}
            layout="tile"
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/products" className="llmic-btn llmic-btn-primary !px-10 !py-3.5 !text-base">
          View All Products <FiArrowRight />
        </Link>
      </div>
    </div>
  </section>
);

export default HeroProducts;
