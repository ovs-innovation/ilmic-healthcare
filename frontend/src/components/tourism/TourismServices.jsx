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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <Link
              key={service.slug || service._id}
              href={`/services/${service.slug}`}
              className="llmic-service-card group"
            >
              <div className="llmic-service-card__icon group-hover:scale-110 transition-transform">
                {service.icon || "🏥"}
              </div>
              {service.group && (
                <span className="llmic-service-card__group">{service.group}</span>
              )}
              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-ilmic-blue transition-colors">
                {getTitle(service.name)}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">
                {getTitle(service.description)}
              </p>
              <span className="inline-flex items-center gap-1 text-ilmic-blue text-sm font-bold mt-4 group-hover:gap-2 transition-all">
                Learn More <FiArrowRight className="w-4 h-4" />
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
