import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@layout/Layout";
import { motion, AnimatePresence, animate } from "framer-motion";
import LeadServices from "@services/LeadServices";
import { notifySuccess, notifyError } from "@utils/toast";
import { 
  FiCheck, FiArrowRight, FiShield, FiFileText, FiSend, 
  FiPlus, FiMinus, FiActivity, FiUsers, FiTrendingUp, 
  FiSettings, FiBriefcase, FiDollarSign, FiClock, FiTarget, 
  FiSmartphone, FiAward, FiLayers, FiAlertCircle, FiGlobe, 
  FiTruck, FiNavigation, FiAnchor, FiSearch, FiSliders
} from "react-icons/fi";

// Client-side animated counter component
const Counter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const numericVal = parseFloat(value.replace(/[^0-9.]/g, ""));
  const isFloat = value.includes(".");

  useEffect(() => {
    const controls = animate(0, numericVal, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCount(isFloat ? latest.toFixed(1) : Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [numericVal, isFloat]);

  return <span>{count}{suffix}</span>;
};

import ConsultationModal from "@components/tourism/ConsultationModal";

const PharmaceuticalExport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", designation: "", companyName: "", targetPort: "", incoterms: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedProcessStep, setSelectedProcessStep] = useState(0);
  const [activeRegion, setActiveRegion] = useState("Africa");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      notifyError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await LeadServices.addLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `[Company: ${form.companyName || "Not specified"}] [Designation: ${form.designation || "Not specified"}] [Port: ${form.targetPort || "Not specified"}] [Incoterms: ${form.incoterms || "Not specified"}] ${form.message}`,
        service: "Pharmaceutical Export",
      });
      notifySuccess("Export request submitted! Our global trade desk will contact you within 2 hours with pricing configurations.");
      setForm({ name: "", email: "", phone: "", message: "", designation: "", companyName: "", targetPort: "", incoterms: "" });
    } catch (err) {
      notifyError("Failed to submit export request. Please check connections and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // 1. Hero Floating Badges
  const heroBadges = [
    { title: "WHO-GMP Certified", desc: "Formulations from accredited production units.", delay: 0.1 },
    { title: "Worldwide Shipping", desc: "Reliable distribution routes across global ports.", delay: 0.2 },
    { title: "Export Documentation", desc: "End-to-end customs and regulatory paperwork.", delay: 0.3 },
    { title: "Global Distribution", desc: "Direct logistics coordinating with health ministries.", delay: 0.4 },
    { title: "ISO Standards", desc: "Adhering to strict trade quality policies.", delay: 0.5 },
    { title: "Quality Assurance", desc: "Comprehensive lab verification checkups.", delay: 0.6 }
  ];

  // 2. Export Categories (16 Categories)
  const categories = [
    {
      title: "Prescription Medicines",
      desc: "Wide range of custom prescribed drugs for acute and chronic therapies, packaged under strict batch-code rules.",
      image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "OTC Medicines",
      desc: "Over-the-counter painkillers, cough syrups, antihistamines, and dermatological creams for direct wholesale supply.",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Injectables & Vials",
      desc: "Sterile liquid injectables, lyophilized vials, and intravenous infusions prepared under aseptic clean-room environments.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Tablets Formulations",
      desc: "Film-coated, enteric-coated, and sustained-release solid tablets manufactured on WHO-GMP compliant compression lines.",
      image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Capsules (Hard & Soft)",
      desc: "Gelatin and vegetarian capsules housing granules, pellets, or oils, optimized for bioavailability.",
      image: "https://images.unsplash.com/photo-1584017911766-d451b3f0e843?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Syrups & Suspensions",
      desc: "Oral liquid formulations, pediatric drops, and dry syrups bottled in secure, leakage-proof pharmaceutical containers.",
      image: "https://images.unsplash.com/photo-1550572017-c0e5a953e5e6?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Antibiotics & Antivirals",
      desc: "Broad-spectrum antibacterial agents, cephalosporins, and antiviral combinations targeting global infectious diseases.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Oncology Specialty Care",
      desc: "Critical chemotherapy vials, tyrosine kinase inhibitors, and targeted monoclonal antibodies under validated cold chain transport.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Cardiology Medicines",
      desc: "Beta-blockers, statins, anti-hypertensive drugs, and calcium channel blockers supporting chronic cardiovascular care.",
      image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Dermatology Treatments",
      desc: "Topical antifungal creams, corticosteroid ointments, acne gels, and medicated body lotions for global distribution.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Gynecology Formulations",
      desc: "Hormonal therapies, oral contraceptives, iron supplements, and prenatal care medicines configured for women's health.",
      image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Pediatrics Solutions",
      desc: "Carefully dosed infant drops, multivitamin liquids, and non-alcoholic soothing syrups for pediatric wards.",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Critical Care Vials",
      desc: "Intravenous anesthetics, muscle relaxants, emergency cardiac ampoules, and heparin injections for emergency centers.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "General Medicine",
      desc: "Common analgesics, anti-pyretics, gastric acid reducers, and antacids for daily community clinical needs.",
      image: "https://images.unsplash.com/photo-1559757175-5700def83abb?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Nutraceuticals & Vitamins",
      desc: "Premium dietary supplements, antioxidants, protein powders, and complex vitamin pills for daily wellness.",
      image: "https://images.unsplash.com/photo-1584017911766-d451b3f0e843?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Medical Consumables",
      desc: "Disposable syringes, cannulas, sterile dressings, surgical gloves, and transfusion lines matching CE standards.",
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // 3. Global Export Process Steps (10 Steps)
  const processSteps = [
    { title: "Buyer Enquiry", port: "Global Office", desc: "The importer submits a comprehensive manifest detailing requested drug formulations, required strengths, batch volume targets, and preferred port Incoterms.", x: 150, y: 180 },
    { title: "Quotation", port: "ILMIC Desk", desc: "Our trade team issues a competitive proforma invoice outlining unit costs, export packaging parameters, validation testing fees, and cargo scheduling.", x: 550, y: 220 },
    { title: "Order Confirmation", port: "Board Review", desc: "Both parties verify and sign trade contracts, settle currency payment milestones, and confirm Letter of Credit (L/C) authentication protocols.", x: 580, y: 150 },
    { title: "Quality Inspection", port: "Lab Check", desc: "Batch certificates (COA) are generated. The pharmaceutical products undergo final visual, stability, and chemical assays in accredited testing centers.", x: 510, y: 280 },
    { title: "Insulated Packaging", port: "Noida Depo", desc: "Shipped products are organized into export-grade double EPS boxes with calibrated gel cooling packs and active USB data loggers for temperature tracking.", x: 620, y: 190 },
    { title: "Documentation Desk", port: "Customs Hub", desc: "We compile all legal documents, including the Certificate of Pharmaceutical Product (COPP), Certificate of Origin (COO), and commercial cargo slips.", x: 640, y: 260 },
    { title: "Customs Clearance", port: "Mumbai Port", desc: "Indian Customs authorities audit batch licenses, drug registration paperwork, and transport declarations to issue the port shipping authorization.", x: 580, y: 310 },
    { title: "Air/Sea Shipment", port: "Transit Route", desc: "Consignments are loaded onto cargo flights or refrigerated shipping vessels depending on product urgency and thermal parameters.", x: 380, y: 300 },
    { title: "Country Arrival", port: "Target Port", desc: "The shipment lands at the destination airport or maritime harbor. The buyer's local agents receive the cargo files to process regional custom releases.", x: 220, y: 320 },
    { title: "Customer Delivery", port: "Client Warehouse", desc: "The temperature-controlled container is delivered to the buyer's distribution center, where logs are analyzed to verify complete thermal stability.", x: 100, y: 280 }
  ];

  // 4. Quality Assurance Cards (8 Items)
  const qualityCards = [
    { title: "WHO-GMP Compliance", desc: "All medicines are sourced from plants conforming to the World Health Organization's Good Manufacturing Practices.", icon: FiAward },
    { title: "ISO 9001:2015 Standards", desc: "Adhering to international quality management systems across packaging, tracking, and supply protocols.", icon: FiShield },
    { title: "Rigorous Quality Testing", desc: "Independent chemical assays and stability tests are performed on every batch to confirm molecular potency.", icon: FiActivity },
    { title: "Laboratory Inspections", desc: "Sourcing plants maintain state-of-the-art labs for high-performance liquid chromatography (HPLC) inspections.", icon: FiSearch },
    { title: "Batch COA Verification", desc: "A detailed Certificate of Analysis (COA) matching active ingredients is dispatched with every package.", icon: FiFileText },
    { title: "Packaging Inspections", desc: "Double-walled fiberboard boxes are tested for impact resilience and humidity defense during ocean transit.", icon: FiLayers },
    { title: "Cold Chain Monitoring", desc: "Validated shipping boxes keep critical biological vials under strict 2°C to 8°C controls with active GPS logs.", icon: FiClock },
    { title: "Regulatory Compliance", desc: "We align all drug files with destination country guidelines, ensuring smooth registration with local ministries.", icon: FiCheck }
  ];

  // 5. Global Shipping Network Regions & Ports
  const regions = {
    "Africa": {
      desc: "Supplying critical generic and oncology drugs to public clinics and distribution networks across 12 countries.",
      ports: ["Port of Lagos (Nigeria)", "Port of Luanda (Angola)", "Port of Mombasa (Kenya)", "Port of Durban (South Africa)"]
    },
    "Middle East": {
      desc: "Delivering prescription formulations and specialty vials to regional wholesale networks and private chains.",
      ports: ["Jebel Ali Port (Dubai, UAE)", "Port of Muscat (Oman)", "Hamad Port (Qatar)", "Jeddah Islamic Port (Saudi Arabia)"]
    },
    "Asia": {
      desc: "Sourcing high-volume over-the-counter and prescription products to Southeast Asian healthcare partners.",
      ports: ["Port of Singapore", "Port of Colombo (Sri Lanka)", "Port of Chittagong (Bangladesh)", "Port of Manila (Philippines)"]
    },
    "Europe": {
      desc: "Contract export operations supplying CE-marked medical consumables and generic medical tablets.",
      ports: ["Port of Rotterdam (Netherlands)", "Port of Hamburg (Germany)", "Port of Felixstowe (UK)"]
    },
    "CIS Countries": {
      desc: "Exporting oncology medications and antibiotic syrups to medical hubs under active custom documents.",
      ports: ["Port of Tashkent (Uzbekistan)", "Port of Almaty (Kazakhstan)", "Port of Baku (Azerbaijan)"]
    },
    "Latin America": {
      desc: "Providing specialized therapeutic chemicals and clinical packages to regional importers.",
      ports: ["Port of Santos (Brazil)", "Port of Veracruz (Mexico)", "Port of Callao (Peru)"]
    }
  };

  // 6. Why Choose ILMIC Feature Cards (9 Cards)
  const whyChooseCards = [
    { title: "Reliable Export Partner", desc: "ILMIC acts as a trusted corporate bridge between WHO-GMP certified laboratories and international distributors, ensuring constant medication supply." },
    { title: "Competitive Wholesale Pricing", desc: "By optimizing local bulk procurement contracts in India, we pass significant cost advantages directly to our foreign buyers." },
    { title: "Timely Delivery Schedules", desc: "We prioritize booking space on leading cargo flights and fast ocean vessels, keeping your inventory levels stable." },
    { title: "Worldwide Logistics Integration", desc: "Coordinating land, sea, and air routes with leading freight agencies to deliver cargo directly to your depot gates." },
    { title: "Full Regulatory Compliance", desc: "We ensure all exported medicines carry proper drug master files (DMF) and dossiers matching local state requirements." },
    { title: "Certified Manufacturing Lines", desc: "All formulations are produced in plants holding valid WHO-GMP, ISO, and MOH clearances." },
    { title: "Dedicated Export Team", desc: "Our global trade specialists are available 24/7 to resolve customs clearances, draft invoice logs, and track transits." },
    { title: "End-to-End Documentation", desc: "From shipping bill logs to Certificate of Pharmaceutical Product (COPP), we manage all required paperwork." },
    { title: "International Business Support", desc: "We assist partners in registering new drug molecules with their respective ministries of health to expand market reach." }
  ];

  // 7. Export Documentation Desk (9 Items)
  const documentationDesk = [
    { name: "Commercial Invoice", desc: "A detailed transaction bill detailing product batch classifications, total unit costs, and trade terms." },
    { name: "Packing List", desc: "Comprehensive manifest listing exact box dimensions, gross weights, and specific batch content keys." },
    { name: "Certificate of Origin (COO)", desc: "Legal trade document certifying that the pharmaceutical cargo was manufactured and packaged in India." },
    { name: "Bill of Lading (B/L)", desc: "Carrier contract issued for maritime shipments, representing cargo tracking keys and destination delivery rights." },
    { name: "Airway Bill (AWB)", desc: "Priority cargo dispatch bill issued by international airlines to track high-speed air transits." },
    { name: "Export License", desc: "Accredited drug export authorization issued by the Indian licensing bureaus to verify trade legality." },
    { name: "Product Registration Dossier", desc: "Dossier compilation prepared in CTD/ACTD format to secure import approvals from destination health ministries." },
    { name: "Certificate of Analysis (COA)", desc: "Manufacturer-certified chemical laboratory report showing active ingredient assay validation." },
    { name: "Certificate of Pharmaceutical Product", desc: "Standard WHO-format document confirming that the exported medicine is registered and sold in the source country." }
  ];

  // 8. Stats Counters (6 Items)
  const stats = [
    { value: "500+", label: "Export Products", desc: "Generic brands, oncology vials, and clinical items." },
    { value: "25+", label: "Countries Served", desc: "Across Africa, Middle East, Europe, and Asia." },
    { value: "100+", label: "Business Partners", desc: "Ministries of health, wholesale groups, and hospital chains." },
    { value: "1000+", label: "Successful Shipments", desc: "Delivered securely under temperature log tracking." },
    { value: "99%", label: "Quality Compliance", desc: "Achieved through strict batch check loops." },
    { value: "24/7", label: "Export Support Desk", desc: "Solving cargo updates and port clearances." }
  ];

  // 9. Client Success Stories (B2B Reviews)
  const clientStories = [
    {
      company: "Universal Pharma Distributors Ltd.",
      country: "Nairobi, Kenya",
      clientType: "Healthcare Distributor",
      review: "ILMIC has been our primary source for critical care injectables and oncology medications since 2023. Their insulated cold chain boxes consistently arrive with intact temperature logs, preventing clinical stock losses.",
      logoText: "UP"
    },
    {
      company: "Al-Shifa Specialty Hospital Group",
      country: "Muscat, Oman",
      clientType: "Private Hospital Group",
      review: "Our oncology ward relies on constant generic medicine flows from India. ILMIC coordinates registration dossiers, and their priority air freight delivers within 4 days of customs release. Their pricing is highly competitive.",
      logoText: "AS"
    },
    {
      company: "Ministry of Health Procurement Wing",
      country: "Luanda, Angola",
      clientType: "Government Buyer",
      review: "We awarded ILMIC a bulk generic supply tender for pediatric suspensions. Their documentation was flawless, passing port customs checkups without delay. The quality and labeling met our high standards.",
      logoText: "MH"
    }
  ];

  return (
    <Layout
      title="Global Pharmaceutical Export & Sourcing | WHO-GMP Indian Medicines | ILMIC Health Care"
      description="Leading pharmaceutical exporter from India. Sourcing prescription generics, oncology vials, and medical supplies under certified cold chain logistics."
    >
      <style>{`
        @keyframes routeDash {
          to {
            stroke-dashoffset: -40;
          }
        }
        .animate-route-dash {
          stroke-dasharray: 8 6;
          animation: routeDash 15s linear infinite;
        }
      `}</style>

      {/* SECTION 1: HERO SECTION (Global Corporate Export Theme) */}
      <section className="relative min-h-screen bg-gradient-to-br from-ilmic-blue-soft via-white to-slate-50 flex items-center pt-24 pb-16 overflow-hidden">
        {/* Abstract World Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e5a9e05_1px,transparent_1px),linear-gradient(to_bottom,#1e5a9e05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-ilmic-blue-light/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-slate-100 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-ilmic-blue/10 border border-ilmic-blue/20 rounded-full text-xs font-black uppercase tracking-wider text-ilmic-blue"
              >
                <FiGlobe className="animate-spin-slow text-ilmic-blue" /> Global Pharmaceutical Export
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ilmic-text leading-tight"
              >
                Delivering Trusted <br className="hidden sm:inline" />
                <span className="text-ilmic-blue">Pharmaceutical Products</span> Across the Globe
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-ilmic-muted text-base sm:text-lg max-w-2xl leading-relaxed"
              >
                ILMIC Health Care provides reliable pharmaceutical export solutions, supplying high-quality medicines, healthcare products, and medical supplies to hospitals, distributors, and healthcare organizations worldwide.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-4 bg-ilmic-blue hover:bg-ilmic-blue-dark text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 hover:-translate-y-0.5 transform cursor-pointer"
                >
                  Export Enquiry <FiArrowRight />
                </button>
                <a
                  href="#export-quote-form"
                  className="px-6 py-4 bg-white border border-ilmic-border hover:bg-ilmic-blue-soft text-ilmic-text font-bold rounded-xl transition-all flex items-center gap-2 hover:-translate-y-0.5 transform"
                >
                  Download Catalogue
                </a>
                <a
                  href="#export-quote-form"
                  className="px-6 py-4 bg-ilmic-blue-soft hover:bg-ilmic-blue-light text-ilmic-blue font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  Contact Export Team
                </a>
              </motion.div>
            </div>

            {/* Right side logistics graphic */}
            <div className="lg:col-span-5 relative mt-10 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative mx-auto max-w-[450px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-200"
              >
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                  alt="Modern pharmaceutical logistics warehouse"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ilmic-text/40 to-transparent" />
              </motion.div>

              {/* Floating Badges */}
              <div className="absolute inset-0 pointer-events-none">
                {heroBadges.map((badge, index) => {
                  const positions = [
                    "top-[4%] -left-[14%] max-w-[180px]",
                    "top-[28%] -right-[8%] max-w-[180px]",
                    "bottom-[38%] -left-[10%] max-w-[190px]",
                    "bottom-[14%] -right-[4%] max-w-[180px]",
                    "bottom-[2%] left-[12%] max-w-[190px]",
                    "top-[50%] -left-[15%] max-w-[170px]"
                  ];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: badge.delay }}
                      className={`absolute hidden sm:block ${positions[index]} bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-ilmic-border/50 shadow-lg pointer-events-auto hover:bg-white transition-all`}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className="w-2 h-2 rounded-full bg-ilmic-blue" />
                        <h4 className="font-extrabold text-ilmic-text text-xs leading-tight">{badge.title}</h4>
                      </div>
                      <p className="text-[9px] text-ilmic-muted font-medium leading-normal">{badge.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT OUR EXPORT SERVICES (B2B Split Layout) */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Warehouse image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-ilmic-blue-light/30 rounded-[40px] -z-10" />
              <div className="relative aspect-[3/4] rounded-[30px] overflow-hidden shadow-xl border border-slate-100 bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80"
                  alt="Pharmaceutical export cargo containers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Business descriptions */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">
                WHO WE ARE & WHAT WE SOURCING
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">
                Your Trusted Bridge to Certified Indian Pharmaceutical Sourcing
              </h2>
              
              <div className="space-y-4 text-ilmic-muted text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  As a premium global pharmaceutical supplier, ILMIC Health Care specializes in exporting WHO-GMP certified medicines, prescription generics, and critical medical consumables to international distributors, government bodies, and hospital groups. India is known as the pharmacy of the world, and our trade desk coordinates directly with approved formulation plants to ensure the highest chemical purity and compliance.
                </p>
                <p>
                  We coordinate the entire export process, managing dossiers, Certificate of Pharmaceutical Product (COPP) registrations, customs checks, and temperature-controlled logistics. Whether you are importing bulk generics, anti-cancer vials, or hospital consumables, our logistical network guarantees on-time delivery to your target ports under flexible FOB, CIF, or EXW terms.
                </p>
                <p>
                  Our commitment to quality includes strict batch analysis, packaging checks, and active cold-chain monitoring. We provide global B2B buyers with complete transparent access, document integrity, and constant trade communication.
                </p>
              </div>

              {/* Trade parameters checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { title: "WHO-GMP Verified", desc: "All plants carry active WHO-GMP certifications." },
                  { title: "Secure Cold-Chain Logs", desc: "Active data loggers for temperature-sensitive vials." },
                  { title: "Regulatory Dossier Prep", desc: "Assisting partners in registering molecules locally." },
                  { title: "Flexible Incoterms", desc: "Supporting FOB, CIF, and EXW shipment protocols." }
                ].map((item, index) => (
                  <div key={index} className="flex gap-2.5 items-start bg-ilmic-blue-soft/50 p-3 rounded-xl border border-ilmic-blue-light/50">
                    <FiCheck className="text-ilmic-blue mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-ilmic-text text-xs">{item.title}</h4>
                      <p className="text-[10px] text-ilmic-muted font-medium mt-0.5 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR EXPORT CATEGORIES (16 Cards Grid) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">PRODUCT MANIFEST</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Pharmaceutical Export Categories</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              We export a comprehensive portfolio of therapeutic products, ensuring strict batch verification and specialized packaging matching international health standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl overflow-hidden border border-ilmic-border/30 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-[180px] bg-slate-200 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="font-bold text-ilmic-text text-base group-hover:text-ilmic-blue transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-ilmic-muted text-xs leading-relaxed font-medium">
                      {cat.desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="#export-quote-form"
                    className="inline-flex items-center gap-1 text-xs font-bold text-ilmic-blue hover:text-ilmic-blue-dark transition-colors"
                  >
                    Explore Category <FiArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: GLOBAL EXPORT PROCESS (World Map Story) */}
      <section className="py-24 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">SUPPLY CHAIN ROUTE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">The Global Export Journey</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              Trace the complete, structured export path from initial buyer specifications to temperature-controlled delivery at your warehouse destination.
            </p>
          </div>

          {/* SVG Map Layout (Desktop View) */}
          <div className="relative w-full max-w-[950px] aspect-[100/47] mx-auto hidden md:block select-none border border-slate-100 rounded-[32px] p-4 bg-slate-50/50">
            {/* World Map Stylized Dots / Silhouette (Simple placeholder nodes for styling) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 470">
              {/* Stylized continent paths to represent world */}
              <path d="M 80 120 Q 150 90 220 130 T 320 180 Q 250 250 200 320 T 100 250 Z" fill="#e8f2fc" opacity="0.45" /> {/* Americas/Africa left */}
              <path d="M 400 130 Q 550 80 700 110 T 850 150 Q 800 280 700 320 T 450 260 Z" fill="#e8f2fc" opacity="0.45" /> {/* Eurasia/Asia */}
              <path d="M 120 280 Q 180 320 240 350 T 180 430 Z" fill="#e8f2fc" opacity="0.3" /> {/* Africa South */}
              <path d="M 520 240 Q 620 280 680 350 Z" fill="#e8f2fc" opacity="0.4" /> {/* India */}

              {/* Connecting animated shipping routes */}
              <path d="M 150 180 C 300 180, 400 200, 550 220" fill="none" stroke="#e8f2fc" strokeWidth="2" />
              <path d="M 150 180 C 300 180, 400 200, 550 220" fill="none" stroke="#1E5A9E" strokeWidth="2" className="animate-route-dash" />

              <path d="M 550 220 C 565 180, 570 170, 580 150" fill="none" stroke="#1E5A9E" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 580 150 C 560 210, 540 240, 510 280" fill="none" stroke="#1E5A9E" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 510 280 C 550 240, 580 220, 620 190" fill="none" stroke="#1E5A9E" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 620 190 C 630 220, 635 240, 640 260" fill="none" stroke="#1E5A9E" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 640 260 C 610 280, 600 295, 580 310" fill="none" stroke="#1E5A9E" strokeWidth="1.5" strokeDasharray="4 4" />

              <path d="M 580 310 C 480 305, 420 300, 380 300" fill="none" stroke="#e8f2fc" strokeWidth="2" />
              <path d="M 580 310 C 480 305, 420 300, 380 300" fill="none" stroke="#1E5A9E" strokeWidth="2" className="animate-route-dash" />

              <path d="M 380 300 C 300 310, 260 315, 220 320" fill="none" stroke="#e8f2fc" strokeWidth="2" />
              <path d="M 380 300 C 300 310, 260 315, 220 320" fill="none" stroke="#1E5A9E" strokeWidth="2" className="animate-route-dash" />

              <path d="M 220 320 C 160 310, 130 290, 100 280" fill="none" stroke="#e8f2fc" strokeWidth="2" />
              <path d="M 220 320 C 160 310, 130 290, 100 280" fill="none" stroke="#1E5A9E" strokeWidth="2" className="animate-route-dash" />
            </svg>

            {/* Clickable pins representing steps */}
            {processSteps.map((step, idx) => {
              const isActive = selectedProcessStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedProcessStep(idx)}
                  style={{ left: `${step.x}px`, top: `${step.y}px` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10`}
                >
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shadow-md transition-all duration-300 ${
                    isActive 
                      ? "bg-ilmic-blue text-white ring-4 ring-ilmic-blue-light scale-110" 
                      : "bg-white text-ilmic-text border-ilmic-border hover:bg-ilmic-blue-soft"
                  }`}>
                    {idx + 1}
                  </div>
                  {/* Tooltip badge */}
                  <span className="absolute top-9 px-2 py-0.5 bg-ilmic-text text-white text-[9px] font-bold rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {step.title}
                  </span>
                </button>
              );
            })}

            {/* Active Step Panel Overlap (Bottom Left) */}
            <div className="absolute bottom-6 left-6 max-w-[320px] bg-white border border-ilmic-border/50 rounded-2xl p-5 shadow-xl z-20">
              <span className="text-[9px] font-black text-ilmic-blue uppercase tracking-widest block mb-1">
                Step 0{selectedProcessStep + 1} / {processSteps[selectedProcessStep].port}
              </span>
              <h4 className="font-extrabold text-ilmic-text text-sm mb-2">{processSteps[selectedProcessStep].title}</h4>
              <p className="text-ilmic-muted text-[11px] leading-relaxed font-semibold">
                {processSteps[selectedProcessStep].desc}
              </p>
              <div className="flex gap-1.5 mt-3 justify-end">
                <button
                  onClick={() => setSelectedProcessStep((p) => (p - 1 + 10) % 10)}
                  className="px-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-[9px] font-bold text-ilmic-text"
                >
                  Previous
                </button>
                <button
                  onClick={() => setSelectedProcessStep((p) => (p + 1) % 10)}
                  className="px-2 py-1 bg-ilmic-blue hover:bg-ilmic-blue-dark text-white rounded text-[9px] font-bold"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Stepper Layout */}
          <div className="block md:hidden space-y-4">
            {processSteps.map((step, idx) => {
              const isActive = selectedProcessStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedProcessStep(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? "bg-ilmic-blue-soft border-ilmic-blue shadow-sm"
                      : "bg-white border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      isActive ? "bg-ilmic-blue text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-ilmic-text text-sm">{step.title}</h4>
                      <span className="text-[9px] text-ilmic-muted font-bold block">{step.port}</span>
                    </div>
                  </div>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-ilmic-muted text-xs mt-3 leading-relaxed pl-11 font-medium"
                    >
                      {step.desc}
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: QUALITY ASSURANCE */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">REGULATORY ASSURANCE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Pharmaceutical Quality Audits</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              Every exported batch complies with strict international healthcare protocols, passing rigid pre-shipment inspections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col justify-between shadow-sm hover:border-ilmic-blue-light transition-all">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-ilmic-blue-soft border border-ilmic-blue-light flex items-center justify-center text-ilmic-blue">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-ilmic-text text-base">{card.title}</h4>
                    <p className="text-ilmic-muted text-xs leading-relaxed font-medium">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: GLOBAL SHIPPING NETWORK */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side network details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">LOGISTICAL NODES</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Global Export Destination Ports</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                We supply key formulations to pharmacies and depots across active regions. Select a region below to inspect target port terminals.
              </p>

              {/* Region Selector Tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                {Object.keys(regions).map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                      activeRegion === region
                        ? "bg-ilmic-blue border-ilmic-blue text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-ilmic-text hover:bg-slate-100"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Active Region Ports */}
              <div className="p-6 bg-slate-50 border border-slate-150 rounded-2xl space-y-4">
                <p className="text-ilmic-text text-xs sm:text-sm font-bold italic leading-relaxed">
                  "{regions[activeRegion].desc}"
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {regions[activeRegion].ports.map((port, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                      <FiAnchor className="text-ilmic-blue flex-shrink-0" />
                      <span>{port}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side static global trade graphics */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[40px] -z-10" />
              <div className="relative aspect-[4/3] rounded-[30px] overflow-hidden shadow-xl border border-slate-200 bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=800&q=80"
                  alt="Global trade operations"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE ILMIC */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">PARTNERSHIP BENEIFTS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Wholesale Export Advantages</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              We leverage large purchasing contracts in India to offer international buyers maximum cost efficiency and logistics security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseCards.map((feat, index) => (
              <div key={index} className="p-8 bg-white border border-slate-100 rounded-3xl flex flex-col justify-between hover:border-ilmic-blue-light transition-all shadow-sm">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-ilmic-blue-soft border border-ilmic-blue-light flex items-center justify-center text-ilmic-blue font-bold text-sm">
                    {index + 1}
                  </div>
                  <h4 className="font-extrabold text-ilmic-text text-base leading-snug">{feat.title}</h4>
                  <p className="text-ilmic-muted text-xs leading-relaxed font-medium">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: EXPORT DOCUMENTATION DESK */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">DOSSIERS & REGISTRATION</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Dossier & Customs Documentation</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              We compile and process all required regulatory documents to secure customs approvals at destination ports.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {documentationDesk.map((doc, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-150 flex flex-col justify-between hover:bg-white transition-all shadow-sm">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-ilmic-blue-soft flex items-center justify-center text-ilmic-blue text-xs font-bold">
                    {idx + 1}
                  </div>
                  <h4 className="font-extrabold text-ilmic-text text-sm leading-tight">{doc.name}</h4>
                  <p className="text-[10px] text-ilmic-muted font-medium leading-normal">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: WAREHOUSE & PACKAGING */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">LOGISTICS DEPOT</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Fully Managed Warehouse & Packaging</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              Consignments are stored, packaged, and labeled under strict clinical warehousing codes in our modern Noida facility.
            </p>
          </div>

          {/* Block 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                  alt="Warehouse cold storage infrastructure"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black text-ilmic-blue uppercase tracking-widest">
                STORAGE CONDITIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-ilmic-text">
                Validated Cold Rooms & Inventory Controls
              </h3>
              <p className="text-ilmic-muted text-sm sm:text-base leading-relaxed font-medium">
                Our warehouse includes automated inventory barcodes, constant security monitoring, and dedicated cold rooms keeping critical injectables and insulin between 2°C and 8°C.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Dual-cooling backup power",
                  "Barcode scanning stock inputs",
                  "-20°C deep freezing units",
                  "2°C to 8°C walk-in cold rooms",
                  "Clean-room labeling centers",
                  "Moisture-controlled shelf racks"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-150 shadow-sm">
                    <FiCheck className="text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: OUR GLOBAL STRENGTH (Animated Stats) */}
      <section className="py-20 bg-ilmic-blue text-white relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue-light">EXPORT VOLUME</span>
            <h2 className="text-3xl font-extrabold text-white">Global Footprint & Statistics</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="text-4xl sm:text-5xl font-black tracking-tight">
                  <Counter value={stat.value} suffix={stat.value.includes("+") ? "+" : "%"} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ilmic-blue-light">{stat.label}</h4>
                <p className="text-[10px] text-slate-350 leading-relaxed font-medium max-w-[130px] mx-auto">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: INDUSTRIES WE SERVE */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">TARGET BUYERS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">B2B Partners We Supply</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              We deliver custom pharmaceutical consignments to certified buyers across global healthcare divisions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Hospitals", desc: "Specialty wards & vials" },
              { name: "Distributors", desc: "Wholesale generics supplies" },
              { name: "Government", desc: "Ministry of health tenders" },
              { name: "NGOs", desc: "Emergency aid dispatches" },
              { name: "Medical Stores", desc: "High-volume formulations" },
              { name: "Healthcare Chains", desc: "Unified stock integrations" },
              { name: "Importers", desc: "Global trading agreements" },
              { name: "Wholesalers", desc: "Bulk capsules & tablets" },
              { name: "Retail Chains", desc: "OTC medicine supplies" },
              { name: "Healthcare Institutions", desc: "Surgical consumables" }
            ].map((ind, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-150 text-center hover:-translate-y-1 transform transition-all shadow-sm flex flex-col justify-center min-h-[115px] space-y-1.5">
                <h4 className="font-bold text-ilmic-text text-xs leading-snug">{ind.name}</h4>
                <p className="text-[10px] text-ilmic-muted font-semibold">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: CLIENT SUCCESS STORIES */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">TESTIMONIALS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">B2B Partner Testimonials</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              Discover how our stable pricing, document integrity, and cold chain logs supported importers and health boards worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientStories.map((story, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ilmic-blue/10 border border-ilmic-blue/20 flex items-center justify-center font-bold text-ilmic-blue text-xs">
                      {story.logoText}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-ilmic-text text-sm leading-tight">{story.company}</h4>
                      <span className="text-[10px] text-slate-400 font-bold block">{story.country}</span>
                    </div>
                  </div>
                  <p className="text-ilmic-muted text-xs leading-relaxed font-medium italic">
                    "{story.review}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-ilmic-blue uppercase tracking-wider">
                  <span>{story.clientType}</span>
                  <span>★★★★★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: EXPORT FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">YOUR QUESTIONS ANSWERED</span>
            <h2 className="text-3xl font-extrabold text-ilmic-text">Export & Sourcing FAQs</h2>
          </div>

          <div className="space-y-4">
            {[
              { 
                q: "Which countries do you export to?", 
                a: "We export to major medical hubs across Africa (including Nigeria, Angola, and Kenya), the Middle East (UAE, Oman, Qatar), Southeast Asia, the CIS countries (Uzbekistan, Kazakhstan), and Latin America. We hold valid trade licenses for all active port clearances." 
              },
              { 
                q: "Can you provide export documentation and dossiers?", 
                a: "Yes. Our regulatory desk prepares all required dossiers in CTD/ACTD format, Certificate of Pharmaceutical Product (COPP), Certificates of Analysis (COA), Certificates of Origin (COO), and commercial invoicing papers to ensure smooth port releases." 
              },
              { 
                q: "What is your minimum order value for export consignments?", 
                a: "To ensure freight efficiency and cover port customs processing fees, our minimum order value is USD 5,000 per consignment. This allows us to pack and schedule shipping under competitive wholesale rates." 
              },
              { 
                q: "Do you support private labeling and custom contract manufacturing?", 
                a: "Yes, we coordinate private label formulations for major distributor brands, provided that the requested compositions have valid medical clearances. Minimum production volumes vary by therapeutic category." 
              },
              { 
                q: "Do you provide validated cold chain logistics for injectables?", 
                a: "Yes, all temperature-sensitive biologicals and oncology injectables are packed using double-insulated EPS boxes, calibrated gel packs, and USB data loggers to monitor parameters (2°C to 8°C) during air or sea transit." 
              },
              { 
                q: "What certifications do your sourcing facilities hold?", 
                a: "All medicines are sourced from production lines carrying active WHO-GMP, ISO 9001:2015, and state drug authority clearances, ensuring chemical potency and standard manufacturing safety." 
              },
              { 
                q: "What payment methods do you accept for B2B export contracts?", 
                a: "We support standard international trade payment milestones, including Irrevocable Letter of Credit (L/C) at sight and Telegraphic Transfer (T/T) bank settlements." 
              },
              { 
                q: "How long does shipping take to reach our target port?", 
                a: "Priority air cargo transits take 3 to 7 days, whereas ocean container shipping (FCL/LCL) ranges from 15 to 30 days depending on the final harbor destination and local custom check speeds." 
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left bg-slate-50 hover:bg-ilmic-blue-soft/50 flex justify-between items-center transition-colors font-bold text-ilmic-text text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? <FiMinus className="text-ilmic-blue flex-shrink-0" /> : <FiPlus className="text-ilmic-blue flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white border-t border-slate-50"
                    >
                      <div className="p-6 text-ilmic-muted text-xs sm:text-sm leading-relaxed font-medium font-semibold">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: FINAL CTA & LEAD CAPTURE FORM */}
      <section id="export-quote-form" className="py-24 bg-gradient-to-br from-ilmic-blue-soft via-white to-slate-50 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e5a9e03_1px,transparent_1px),linear-gradient(to_bottom,#1e5a9e03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">GLOBAL COLLABORATION</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Expand Your Pharmaceutical Sourcing</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Partner with a trusted pharmaceutical exporter delivering certified healthcare products to global markets with quality, compliance, and reliability.
            </p>
          </div>

          {/* B2B Export Quote Form */}
          <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-ilmic-border/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-ilmic-blue" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Importer Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400 bg-slate-50/50"
                    placeholder="e.g. Adebayo Adesina"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Company Name / Organization *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400 bg-slate-50/50"
                    placeholder="e.g. Universal Pharma Ltd."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400 bg-slate-50/50"
                    placeholder="e.g. buyer@universalpharma.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400 bg-slate-50/50"
                    placeholder="e.g. +234 803 123 4567"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400 bg-slate-50/50"
                    placeholder="e.g. Procurement Manager"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Target Destination Port
                  </label>
                  <input
                    type="text"
                    name="targetPort"
                    value={form.targetPort}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400 bg-slate-50/50"
                    placeholder="e.g. Port of Lagos, Nigeria"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Preferred Incoterms
                  </label>
                  <select
                    name="incoterms"
                    value={form.incoterms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium text-slate-700 bg-white"
                  >
                    <option value="">Select term...</option>
                    <option value="FOB">FOB (Free On Board)</option>
                    <option value="CIF">CIF (Cost, Insurance, Freight)</option>
                    <option value="EXW">EXW (Ex Works Noida)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                  Drug Formulations manifest & Quantities
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400 bg-slate-50/50"
                  placeholder="Detail brand names, active molecules, therapeutic focus (e.g., oncology, injectables), required strengths, volumes, and standard dossier certificates required..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-ilmic-blue hover:bg-ilmic-blue-dark text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm sm:text-base hover:-translate-y-0.5 transform disabled:bg-slate-350 disabled:transform-none"
              >
                {submitting ? "Sending Export Manifest..." : "Submit Export Quote Request"} <FiSend />
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pageType="pharmaceutical-export" 
      />
    </Layout>
  );
};

export default PharmaceuticalExport;
