import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const PricingSection = ({ onGetQuote }) => {
  const plans = [
    { name: "Basic Pack", price: "9,999", items: "Up to 15 Tags", feat: ["Visual Inspection", "Standard Tagging", "Electronic Logbook"] },
    { name: "Business Pack", price: "19,999", items: "Up to 40 Tags", highlight: true, feat: ["3-Phase Testing", "RCD Testing", "Microwave Leakage", "Reporting"] },
    { name: "Enterprise", price: 'Custom', items: "Unlimited", feat: ["Full Compliance Audit", "Fire Safety Combo", "Multi-site Support", "Priority Booking"] },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#051124]">Transparent Pricing</h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-xl text-gray-500 px-2">No hidden costs. Simple, upfront pricing for all your safety needs.</p>
          <div className="w-24 h-1.5 bg-[#ED1C24] mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative flex flex-col h-full ${
                plan.highlight ? 'border-4 border-[#ED1C24] md:scale-105 z-10' : 'border border-gray-100'
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ED1C24] text-white px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-[#051124] mb-2">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4 sm:mb-6">{plan.items}</p>
              <div className="mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl font-black text-[#051124]">
                  {plan.price === 'Custom' ? 'Custom' : `₹${plan.price}`}
                </span>
                {plan.price !== 'Custom' && <span className="text-gray-400 font-medium text-sm sm:text-base"> + GST</span>}
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-10 flex-grow">
                {plan.feat.map((f, i) => (
                  <li key={i} className="flex items-start text-sm sm:text-base text-gray-600 font-medium">
                    <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onGetQuote()}
                className={`w-full py-3 sm:py-4 rounded-xl font-bold transition-all mt-auto ${
                  plan.highlight ? 'bg-[#ED1C24] text-white hover:bg-red-700' : 'bg-gray-100 text-[#051124] hover:bg-gray-200'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
