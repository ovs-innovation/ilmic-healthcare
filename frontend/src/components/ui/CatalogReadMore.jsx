import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const CatalogReadMore = ({ href = "/products" }) => (
  <Link href={href} className="ilmic-read-more-btn">
    <span>Read more</span>
    <FiArrowRight className="ilmic-read-more-btn-icon" aria-hidden />
  </Link>
);

export default CatalogReadMore;
