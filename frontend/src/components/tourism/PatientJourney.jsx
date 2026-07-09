import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { patientJourneySteps } from "@utils/ilmicDefaults";

const PatientJourney = () => (
  <section className="llmic-section bg-slate-50">
    <div className="llmic-container">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="llmic-eyebrow">How It Works</p>
        <h2 className="llmic-heading">Your Medical Journey in 5 Simple Steps</h2>
        <p className="llmic-subheading">
          We guide you through every stage — from your first enquiry to post-treatment care at home.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {patientJourneySteps.map((item, i) => (
          <div key={item.step} className="llmic-journey-step relative">
            {i < patientJourneySteps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-ilmic-border" />
            )}
            <div className="llmic-journey-step__number">{item.step}</div>
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/contact-us" className="llmic-btn llmic-btn-coral !px-8">
          Start Your Journey <FiArrowRight />
        </Link>
      </div>
    </div>
  </section>
);

export default PatientJourney;
