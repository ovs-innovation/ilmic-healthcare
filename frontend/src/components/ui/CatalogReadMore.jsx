import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const CatalogReadMore = ({ href = "/products" }) => (
  <Link href={href} className="kure-read-more-btn">
    <span>Read more</span>
    <FiArrowRight className="kure-read-more-btn-icon" aria-hidden />
  </Link>
);

export default CatalogReadMore;
