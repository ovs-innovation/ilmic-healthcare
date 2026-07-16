import Link from "next/link";

const getCatAccent = (cat) => {
  const name = String(cat?.name || cat?.category || "").toLowerCase();
  if (name.includes("oncology")) {
    return {
      ring: "hover:ring-ilmic-blue-dark/40",
      iconBg: "bg-ilmic-blue-light",
      iconText: "text-ilmic-blue-darker",
      pill: "bg-ilmic-blue-light text-ilmic-blue-darker border-ilmic-border",
      glow: "group-hover:shadow-[0_18px_50px_rgba(15,58,102,0.14)]",
    };
  }
  if (name.includes("general")) {
    return {
      ring: "hover:ring-ilmic-blue/30",
      iconBg: "bg-blue-100",
      iconText: "text-ilmic-blue",
      pill: "bg-blue-50 text-ilmic-blue border-ilmic-border",
      glow: "group-hover:shadow-[0_18px_50px_rgba(30,90,158,0.15)]",
    };
  }
  if (name.includes("surgical")) {
    return {
      ring: "hover:ring-blue-300/50",
      iconBg: "bg-blue-50",
      iconText: "text-ilmic-blue-dark",
      pill: "bg-blue-50 text-ilmic-blue-dark border-ilmic-border",
      glow: "group-hover:shadow-[0_18px_50px_rgba(21,71,122,0.12)]",
    };
  }

  return {
    ring: "hover:ring-ilmic-blue/30",
    iconBg: "bg-ilmic-blue-light",
    iconText: "text-ilmic-blue",
    pill: "bg-ilmic-blue-light text-ilmic-blue border-ilmic-border",
    glow: "group-hover:shadow-[0_18px_50px_rgba(30,90,158,0.14)]",
  };
};

const TreatmentCategories = ({ items, title = "Popular Treatments" }) => (
  <section className="llmic-section bg-white">
    <div className="llmic-container">
      <div className="text-center mb-10 sm:mb-12">
        <p className="llmic-eyebrow">Product Categories</p>
        <h2 className="llmic-heading">{title}</h2>
        <p className="text-ilmic-muted text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
          Explore our core categories and send an enquiry for bulk orders and export requirements.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
        {items.map((cat) => {
          const accent = getCatAccent(cat);
          const icon = cat.icon || "💊";

          return (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.category)}`}
              className={`group rounded-2xl sm:rounded-3xl border border-ilmic-border bg-white p-4 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-ilmic-border/60 ring-0 hover:ring-4 ${accent.ring} ${accent.glow}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
                <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl mx-auto sm:mx-0 ${accent.iconBg} ${accent.iconText} flex items-center justify-center text-2xl sm:text-3xl shadow-sm shrink-0`}>
                  <span className="leading-none">{icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border text-[9px] sm:text-[11px] font-black uppercase tracking-wider ${accent.pill}`}>
                    Category
                  </div>
                  <h3 className="text-sm sm:text-xl font-black text-ilmic-text mt-2 sm:mt-3 leading-tight group-hover:text-ilmic-blue transition-colors line-clamp-2">
                    {cat.name}
                  </h3>
                  <p className="hidden sm:block text-sm text-ilmic-muted mt-2 leading-relaxed">
                    View products in {cat.name} and send enquiry for pricing & availability.
                  </p>
                  <div className="mt-3 sm:mt-5 inline-flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-xs sm:text-sm font-black text-ilmic-text group-hover:text-ilmic-blue transition-colors">
                    <span className="sm:hidden">Browse →</span>
                    <span className="hidden sm:inline">Browse Products <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span></span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default TreatmentCategories;
