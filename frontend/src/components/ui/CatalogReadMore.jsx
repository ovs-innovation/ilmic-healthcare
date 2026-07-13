import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const CatalogReadMore = ({ href = "/products", decorative = false }) => {
  const content = (
    <>
      <span>Read more</span>
      <FiArrowRight className="ilmic-read-more-btn-icon" aria-hidden />
    </>
  );

  if (decorative) {
    return <span className="ilmic-read-more-btn">{content}</span>;
  }

  return (
    <Link href={href} className="ilmic-read-more-btn">
      {content}
    </Link>
  );
};

export default CatalogReadMore;
