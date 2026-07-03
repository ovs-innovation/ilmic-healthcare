import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const PageHero = ({
  title,
  highlight,
  subtitle,
  breadcrumb = "Page",
  bgImage = "/hero-indian-pharma.png",
  children,
}) => {
  return (
    <section className="kure-page-hero">
      <div
        className="kure-page-hero__bg"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden
      />
      <div className="kure-page-hero__overlay" aria-hidden />
      <div className="kure-page-hero__pattern" aria-hidden />

      <div className="kure-container kure-page-hero-content">
        <div className="kure-page-hero__badge">
          <span className="kure-page-hero__badge-dot" aria-hidden />
          <span>Kure Pharma · Bharat</span>
        </div>

        <div className="kure-breadcrumb">
          <Link href="/" className="hover:text-[#FF9933] transition-colors">
            Home
          </Link>
          <FiChevronRight className="w-3 h-3 opacity-50" />
          <span>{breadcrumb}</span>
        </div>

        <h1 className="kure-hero-title mb-4">
          {title}
          {highlight ? (
            <>
              <br />
              <span>{highlight}</span>
            </>
          ) : null}
        </h1>

        {subtitle ? (
          <p className="kure-page-hero__subtitle">{subtitle}</p>
        ) : null}

        {children}
      </div>
    </section>
  );
};

export default PageHero;
