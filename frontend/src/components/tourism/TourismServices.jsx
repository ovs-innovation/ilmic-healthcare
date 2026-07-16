import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const HOME_SERVICES = [
  {
    slug: "medical-tourism",
    name: "Medical Tourism",
    description: "Complete medical tourism services for international patients in India.",
    image: "/visuals/medical_tourism.png",
    group: "Medical Tourism",
  },
  {
    slug: "hospital-management",
    name: "Hospital Management",
    description: "Managing 50+ hospitals abroad with effective on-ground support.",
    image: "/visuals/hospital_management.png",
    group: "Hospital",
  },
  {
    slug: "pharmaceutical-export",
    name: "Pharmaceutical Export",
    description: "Export of oncology and general pharma medicines to Dubai, Africa, Bangladesh, CIS, and other international markets.",
    image: "/visuals/pharmaceutical_export.png",
    group: "Export",
  },
  {
    slug: "hospital-accessories-supply",
    name: "Hospital Accessories Supply",
    description: "Supplier of all types of hospital accessories, surgical instruments, and medical products.",
    image: "/visuals/hospital_accessories.png",
    group: "Surgical",
  },
  {
    slug: "international-medical-conferences",
    name: "International Medical Conferences",
    description: "Conducting international medical conferences, workshops, and professional training programs.",
    image: "/visuals/medical_conferences.png",
    group: "Training",
  },
];

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

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-5 max-w-6xl mx-auto">
          {HOME_SERVICES.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`llmic-service-card group !p-4 sm:!p-7 ${
                index < 3
                  ? "lg:col-span-2"
                  : index === 3
                  ? "lg:col-span-2 lg:col-start-2"
                  : "lg:col-span-2"
              }`}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50/80 flex items-center justify-center p-2 border border-slate-100 mb-3 sm:mb-5 shadow-sm group-hover:border-ilmic-blue/20 transition-all duration-300">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-contain transition-all duration-[0.4s] group-hover:scale-[1.08] group-hover:drop-shadow-[0_8px_16px_rgba(15,58,102,0.18)]"
                />
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
