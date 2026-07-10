import React, { useState } from "react";
import Layout from "@layout/Layout";
import PageHero from "@components/ui/PageHero";
import useGetSetting from "@hooks/useGetSetting";
import {
  getFaqItemsFromSettings,
  getFaqPageTitle,
} from "@utils/ilmicFaqDefaults";
import { FiChevronDown } from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { storeCustomizationSetting, loading } = useGetSetting();

  const faqSetting = storeCustomizationSetting?.faq;
  const pageTitle = getFaqPageTitle(faqSetting);
  const items = getFaqItemsFromSettings(faqSetting);

  return (
    <Layout
      title={`${pageTitle} | ILMIC Health Care`}
      description="Frequently asked questions about ILMIC Health Care — oncology, general pharma, surgical products and export enquiries."
    >
      <PageHero
        breadcrumb="FAQ"
        title={pageTitle}
        highlight="ILMIC Health Care"
        subtitle="Answers about product enquiries, bulk orders, export documentation, and oncology & pharma supply."
      />

      <section className="llmic-section bg-white">
        <div className="llmic-container max-w-4xl">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-16 bg-gray-100 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={`${item.question}-${index}`}
                    className="border border-[#e8dcc8] rounded-lg overflow-hidden bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-[#fff9f0] transition-colors"
                    >
                      <span className="text-sm sm:text-base font-bold text-[#1A2E5B]">
                        {item.question}
                      </span>
                      <FiChevronDown
                        className={`w-5 h-5 text-[#8B1A2E] flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen ? (
                      <div className="px-5 pb-4 text-sm sm:text-[15px] text-gray-600 leading-relaxed border-t border-[#f0e8d8] pt-3">
                        {item.answer}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-10 p-6 rounded-xl bg-[#fff9f0] border border-[#e8dcc8] text-center">
            <p className="text-sm text-gray-600 mb-3">
              Still have questions? Our team is here to help with product availability, pricing, and bulk supply.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+9188102 72080" className="ilmic-btn ilmic-btn-primary !text-sm">
                Call +91 88102 72080
              </a>
              <a
                href="mailto:ilmic.healthcare@gmail.com"
                className="ilmic-btn ilmic-btn-outline !text-sm"
              >
                Email ilmic.healthcare@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
