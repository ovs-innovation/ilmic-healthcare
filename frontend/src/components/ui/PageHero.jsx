import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const PageHero = ({
  title,
  highlight,
  subtitle,
  breadcrumb = "Page",
  bgImage = "https://images.unsplash.com/photo-1587854692152-cf240469e97e?w=1600&q=80",
  children,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0F3A66]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0F3A66]/95 via-[#15477A]/85 to-[#1E5A9E]/70"
        aria-hidden
      />

      <div className="llmic-container py-16 sm:py-20 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest mb-6">
          ILMIC Health Care
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-100/80 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <FiChevronRight className="w-3 h-3 opacity-60" />
          <span>{breadcrumb}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
          {title}{" "}
          {highlight ? <span className="text-blue-200">{highlight}</span> : null}
        </h1>

        {subtitle ? (
          <p className="text-blue-50/85 text-base sm:text-lg leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        ) : null}

        {children}
      </div>
    </section>
  );
};

export default PageHero;
