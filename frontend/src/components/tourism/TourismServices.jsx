import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const TourismServices = ({ services, title = "Our Medical Tourism Services" }) => {
  const getTitle = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj.en || Object.values(obj)[0] || "";
  };

  return (
    <section className="llmic-section bg-white" id="services">
      <div className="llmic-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="llmic-eyebrow">What We Do</p>
          <h2 className="llmic-heading">{title}</h2>
          <p className="llmic-subheading">
            Enquiry-based supply and services — pharma export, hospital management support, and medical tourism assistance.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {services.map((service) => (
            <Link
              key={service.slug || service._id}
              href={`/service/${service.slug}`}
              className="llmic-service-card group !p-4 sm:!p-7"
            >
              <div className="llmic-service-card__icon group-hover:scale-110 transition-transform !w-10 !h-10 sm:!w-14 sm:!h-14 !text-xl sm:!text-2xl !mb-3 sm:!mb-5">
                {service.icon || "🏥"}
              </div>
              {service.group && (
                <span className="llmic-service-card__group !text-[9px] sm:!text-[0.65rem]">{service.group}</span>
              )}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-ilmic-blue transition-colors line-clamp-2 leading-snug">
                {getTitle(service.name)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-1 line-clamp-2 sm:line-clamp-3">
                {getTitle(service.description)}
              </p>
              <span className="inline-flex items-center gap-1 text-ilmic-blue text-[11px] sm:text-sm font-bold mt-3 sm:mt-4 group-hover:gap-2 transition-all">
                <span className="sm:hidden">More</span>
                <span className="hidden sm:inline">Learn More</span>
                <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services" className="llmic-btn llmic-btn-primary !px-8">
            View All Services <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TourismServices;
