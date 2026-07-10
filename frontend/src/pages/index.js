import { useState } from "react";
import Link from "next/link";
import Layout from "@layout/Layout";
import ProductServices from "@services/ProductServices";
import ServiceServices from "@services/ServiceServices";
import SettingServices from "@services/SettingServices";
import ProductEnquiryModal from "@components/modal/ProductEnquiryModal";
import TourismHero from "@components/tourism/TourismHero";
import HeroFeatureBar from "@components/tourism/HeroFeatureBar";
import HeroProducts from "@components/tourism/HeroProducts";
import TourismServices from "@components/tourism/TourismServices";
import TreatmentCategories from "@components/tourism/TreatmentCategories";
import TreatmentPackages from "@components/tourism/TreatmentPackages";
import WhyChooseUs from "@components/tourism/WhyChooseUs";
import ilmicDefaults, { tourismServicesFallback, heroProducts } from "@utils/ilmicDefaults";
import { FiSend } from "react-icons/fi";

const getTitle = (obj) => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj.en || Object.values(obj)[0] || "";
};

const Home = ({ products, services, homepageSettings }) => {
  // IMPORTANT: Do not use remote homepage settings to avoid legacy/incorrect branding.
  // Keep ILMIC content source-of-truth in `ilmicDefaults` unless explicitly managed later.
  const settings = ilmicDefaults;
  const heroSlide = settings?.hero?.slides?.[0] || ilmicDefaults.hero.slides[0];
  const heroFeatures = settings?.hero?.features || ilmicDefaults.hero.features;
  const categories = settings?.popularCategories?.items || ilmicDefaults.popularCategories.items;
  const displayServices = services?.length ? services : tourismServicesFallback;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [genericEnquiryOpen, setGenericEnquiryOpen] = useState(false);

  const handleEnquire = (product) => {
    setSelectedProduct(product);
    setEnquiryModalOpen(true);
  };

  // Storefront products from database only (no static/mock fallbacks)
  const displayProducts = (products || []).slice(0, 12);
  let heroDisplay = displayProducts.filter((p) => p.featured !== false).slice(0, 5);
  if (heroDisplay.length === 0 && displayProducts.length > 0) {
    heroDisplay = displayProducts.slice(0, 5);
  }

  const generalPlaceholder = {
    _id: "general",
    name: "Product Enquiry",
    shortDescription: "Enquire about oncology, general pharma, or surgical products from ILMIC Health Care.",
  };

  return (
    <Layout title={settings?.seo?.title} description={settings?.seo?.description}>
      <TourismHero
        slide={heroSlide}
        ctaPrimary={settings?.hero?.ctaPrimary}
        ctaSecondary={settings?.hero?.ctaSecondary}
        onEnquiry={() => setGenericEnquiryOpen(true)}
        phone={settings?.hero?.phone}
        phone2={settings?.hero?.phone2}
      />

      <HeroFeatureBar features={heroFeatures} />

      <TreatmentCategories items={categories} title={settings?.popularCategories?.title} />

      <HeroProducts products={heroDisplay} onEnquire={handleEnquire} />

      {displayProducts.length > 5 && (
        <TreatmentPackages
          products={displayProducts}
          onEnquire={handleEnquire}
          title="More Products"
        />
      )}

      <TourismServices services={displayServices} title="Our Services" />

      <WhyChooseUs />

      {/* Removed duplicate above-footer CTA (footer has its own CTA block). */}
      {false && settings?.bottomCta?.enabled !== false && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ilmic-blue-dark via-ilmic-blue to-ilmic-blue-dark" />
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-ilmic-blue/15 rounded-full blur-2xl" />

          <div className="llmic-container py-10 sm:py-12 relative">
            <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-7 sm:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div className="max-w-2xl">
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {settings?.bottomCta?.title}
                  </h2>
                  <p className="text-ilmic-blue-light/85 text-base font-medium mt-2 leading-relaxed">
                    {settings?.bottomCta?.subtitle}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                    {[
                      { title: "Bulk Orders", desc: "Hospitals, pharmacies & distributors" },
                      { title: "Export Support", desc: "Documentation & fast response" },
                      { title: "On Enquiry Pricing", desc: "Share requirement, get quote" },
                    ].map((b) => (
                      <div
                        key={b.title}
                        className="rounded-2xl bg-white/10 border border-white/10 p-4"
                      >
                        <div className="text-white font-extrabold text-sm">
                          {b.title}
                        </div>
                        <div className="text-ilmic-blue-light/75 text-xs mt-1 leading-relaxed">
                          {b.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <a
                    href={settings?.bottomCta?.phoneHref || "tel:+918810272080"}
                    className="llmic-btn bg-white text-ilmic-blue-darker hover:bg-ilmic-blue-light !px-8 !py-3.5"
                  >
                    📞 {settings?.bottomCta?.phone}
                  </a>
                  <Link
                    href="/request-a-quote"
                    className="llmic-btn llmic-btn-navy !px-8 !py-3.5"
                  >
                    Request Quote
                  </Link>
                  <button
                    type="button"
                    onClick={() => setGenericEnquiryOpen(true)}
                    className="llmic-btn llmic-btn-coral cursor-pointer !px-8 !py-3.5"
                  >
                    <FiSend className="w-4 h-4" />{" "}
                    {settings?.bottomCta?.enquiryButtonText || "Send Enquiry"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedProduct && (
        <ProductEnquiryModal modalOpen={enquiryModalOpen} setModalOpen={setEnquiryModalOpen} product={selectedProduct} />
      )}
      <ProductEnquiryModal modalOpen={genericEnquiryOpen} setModalOpen={setGenericEnquiryOpen} product={generalPlaceholder} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const [productsResult, servicesResult, homepageResult] = await Promise.allSettled([
    ProductServices.getAllProducts({ limit: 20 }),
    ServiceServices.getShowingServices(),
    SettingServices.getIlmicHomepageSetting(),
  ]);

  const productsRes = productsResult.status === "fulfilled" ? productsResult.value : null;
  const servicesRes = servicesResult.status === "fulfilled" ? servicesResult.value : null;
  const homepageSettings =
    homepageResult.status === "fulfilled" && homepageResult.value ? homepageResult.value : ilmicDefaults;

  return {
    props: {
      products: productsRes?.products || [],
      services: Array.isArray(servicesRes) ? servicesRes : [],
      homepageSettings,
    },
  };
};

export default Home;
