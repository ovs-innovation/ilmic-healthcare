import { useRouter } from "next/router";
import { tourismServicesFallback } from "@utils/ilmicDefaults";

const FeatureCategory = () => {
  const router = useRouter();

  const services = tourismServicesFallback.slice(0, 4).map((s) => ({
    name: s.name?.en || s.name,
    icon: s.icon || "🏥",
    slug: `/service/${s.slug}`,
  }));

  const iconBgColors = ["bg-ilmic-blue-light", "bg-blue-50", "bg-ilmic-blue-light", "bg-purple-50"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, i) => (
        <div
          key={service.slug}
          className="llmic-card p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 group"
        >
          <div className={`w-20 h-20 mb-4 flex items-center justify-center ${iconBgColors[i % iconBgColors.length]} rounded-2xl text-3xl`}>
            {service.icon}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 min-h-[56px] flex items-center justify-center">
            {service.name}
          </h3>
          <button
            type="button"
            onClick={() => router.push(service.slug)}
            className="llmic-btn llmic-btn-primary w-full"
          >
            Learn More
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeatureCategory;
