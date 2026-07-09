import Link from "next/link";
import { whyChooseUs } from "@utils/ilmicDefaults";

const WhyChooseUs = () => (
  <section className="relative overflow-hidden bg-ilmic-blue-soft pt-12 pb-8 sm:pt-14 sm:pb-10">
    <div className="absolute top-0 right-0 w-96 h-96 bg-ilmic-blue/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

    <div className="llmic-container relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="llmic-eyebrow">Why ILMIC</p>
        <h2 className="llmic-heading">Why Partners Choose ILMIC Health Care</h2>
        <p className="llmic-subheading">
          Oncology, General Pharma & Surgical products with export-focused support and international presence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyChooseUs.map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-2xl bg-white border border-ilmic-border hover:border-ilmic-blue/40 hover:shadow-[0_18px_50px_rgba(15,58,102,0.08)] transition-all duration-300"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-black text-lg mb-2 text-ilmic-text">{item.title}</h3>
            <p className="text-sm text-ilmic-muted leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
