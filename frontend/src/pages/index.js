import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
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
