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
  FiTruck, FiNavigation, FiAnchor, FiSearch, FiSliders, FiGrid,
  FiTool, FiCheckCircle
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

const HospitalAccessoriesSupply = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", designation: "", facilityName: "", targetLocation: "", budgetRange: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedProcessStep, setSelectedProcessStep] = useState(0);
  const [activeRegion, setActiveRegion] = useState("Africa");
  const [selectedProductSpotlight, setSelectedProductSpotlight] = useState(0);

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
        message: `[Facility: ${form.facilityName || "Not specified"}] [Designation: ${form.designation || "Not specified"}] [Location: ${form.targetLocation || "Not specified"}] [Budget: ${form.budgetRange || "Not specified"}] ${form.message}`,
        service: "Hospital Accessories Supply",
      });
      notifySuccess("Quotation request submitted! Our medical supply desk will contact you within 2 hours with catalog specs.");
      setForm({ name: "", email: "", phone: "", message: "", designation: "", facilityName: "", targetLocation: "", budgetRange: "" });
    } catch (err) {
      notifyError("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // 1. Hero Floating Glass Cards
  const glassCards = [
    { title: "ISO Certified", desc: "Sourcing strictly from accredited facilities.", delay: 0.1 },
    { title: "Premium Quality", desc: "Rigorous biomedical inspection standards.", delay: 0.2 },
    { title: "Global Supply", desc: "Fast logistics to hospitals and ports worldwide.", delay: 0.3 },
    { title: "Fast Delivery", desc: "Priority cargo space allocations.", delay: 0.4 },
    { title: "Trusted Partners", desc: "Supplying health groups and ministries.", delay: 0.5 }
  ];

  // 2. Product Categories (21 Items)
  const productCategories = [
    { title: "Hospital Beds", desc: "Standard multi-function manual and semi-electric ward beds built for long-term patient recovery.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80" },
    { title: "ICU Beds", desc: "Five-function electric beds featuring custom remote tilt positioning, emergency CPR levers, and integrated scale rails.", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80" },
    { title: "Patient Stretchers", desc: "Hydraulic emergency stretchers with central braking systems, oxygen cylinder slots, and collapsible side guards.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80" },
    { title: "Wheelchairs", desc: "Heavy-duty ergonomic chairs with lightweight aluminum frames, foldable backrests, and anti-tip wheels.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" },
    { title: "Operation Theatre", desc: "Stainless steel surgical tables, ceiling LED OT lights with shadow-reduction optics, and anesthesia stations.", image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80" },
    { title: "Medical Trolleys", desc: "Emergency crash carts, anesthesia trolleys, and sterile instrument tables with secure lockable drawers.", image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&q=80" },
    { title: "Infusion Pumps", desc: "Micro-dosing volumetric infusion and syringe pumps featuring sensitive air-in-line alerts and data logs.", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80" },
    { title: "Patient Monitors", desc: "Multi-parameter monitors tracking ECG, heart rate, SpO2, respiratory rates, and body temperatures.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80" },
    { title: "Ventilators", desc: "Microprocessor-controlled ICU ventilators supporting invasive and non-invasive breathing therapy modes.", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80" },
    { title: "ECG Machines", desc: "12-lead digital ECG recorders featuring built-in thermal printers and automated clinical analysis reporting.", image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=600&q=80" },
    { title: "Suction Machines", desc: "High-vacuum electric suction units with double overflow safety bottles, designed for operating wings.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80" },
    { title: "Oxygen Concentrators", desc: "Dual-flow 10L oxygen concentrators supplying medical-grade oxygen with active purity indicator alerts.", image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&q=80" },
    { title: "Defibrillators", desc: "Manual and AED defibrillators with thermal printers and active voice guide menus for trauma units.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" },
    { title: "Hospital Furniture", desc: "Stainless steel bedside lockers, overbed tables, ward visitor stools, and IV drip stands with heavy casters.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80" },
    { title: "Medical Lighting", desc: "Mobile LED examination lamps, dental headlights, and shadowless ceiling surgical lighting fixtures.", image: "https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=600&q=80" },
    { title: "Sterilization Units", desc: "High-pressure vertical autoclaves, vacuum steam sterilizers, and ETO sterilizer chambers for central depots.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80" },
    { title: "Medical Cabinets", desc: "Lockable medicine storage cupboards, toxic substance drawers, and temperature-controlled laboratory cabinets.", image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&q=80" },
    { title: "Emergency Equipment", desc: "Trauma spine boards, resuscitator bag valve masks, suction pumps, and mobile first-aid ambulance packs.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80" },
    { title: "Examination Tables", desc: "Manual folding patient exam tables, gynecological exam couches, and pediatric beds with soft cushions.", image: "https://images.unsplash.com/photo-1559757175-5700def83abb?w=600&q=80" },
    { title: "Hospital Curtains", desc: "Flame-retardant, anti-microbial medical partition screens and ceiling-mounted track cubicle curtains.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" },
    { title: "Gas Pipeline Supply", desc: "Medical gas pipeline outlet valves, oxygen flowmeters, humidifier bottles, and central alarm manifolds.", image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&q=80" }
  ];

  // 3. Featured Equipment Spotlight (8 Items)
  const featuredEquipment = [
    {
      name: "Electric 5-Function ICU Bed",
      features: ["Auto-contour back & leg tilt", "Integrated electronic weighing scales", "One-button cardiac chair position"],
      benefits: ["Prevents pressure ulcers", "Reduces patient movement strains", "Enables quick trauma handovers"],
      applications: "ICU units, cardiac care centers, burn isolation wards.",
      specs: { "Voltage": "220V / 50Hz", "Safeload Capacity": "250 kg", "Tilt Angles": "Backrest (0-75°), Trendelenburg (0-12°)" },
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
    },
    {
      name: "Multi-parameter Patient Monitor",
      features: ["12.1-inch high-res color display", "120-hour trend data review", "Sensitive arrhythmia alerts"],
      benefits: ["Constant clinical parameter tracking", "Audible alerts protect patient safety", "Clear data syncs to central nurse desk"],
      applications: "Operating theaters, emergency wings, intensive care units.",
      specs: { "Parameters": "ECG, SpO2, NIBP, TEMP, RESP, PR", "Battery backup": "4 hours active run", "Data ports": "RJ45, USB sync" },
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80"
    },
    {
      name: "Microprocessor ICU Ventilator",
      features: ["SIMV, PCV, VCV mode settings", "10.4-inch sensitive touch console", "Integrated ultrasonic nebulizer"],
      benefits: ["Maintains breath rhythm target", "Adapts parameters based on patient volume", "Alarms flag pressure anomalies"],
      applications: "Neonatal/adult intensive care, trauma respiratory care.",
      specs: { "Tidal Volume": "20 - 2000 mL", "Oxygen Concentration": "21% - 100%", "Pressure limits": "0 - 60 cmH2O" },
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&q=80"
    },
    {
      name: "Electro-Hydraulic Surgical Table",
      features: ["X-ray transparent tabletop panels", "C-arm scanning access routes", "Reversible head & leg setups"],
      benefits: ["Simplifies intra-operative imaging", "Safe hydraulic load transfers", "Fits ortho, neuro & cardiac surgeries"],
      applications: "Hybrid operating suites, neurosurgical theaters.",
      specs: { "Load Capacity": "220 kg", "Tabletop Length": "2100 mm", "Tilts": "Lateral (20°), Trendelenburg (25°)" },
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80"
    },
    {
      name: "Aluminum Ergonomic Wheelchair",
      features: ["Lightweight rust-free chassis", "Anti-microbial double cushions", "Foldable drop-back handles"],
      benefits: ["Allows easy patient transport", "Reduces skin friction sore points", "Fits inside standard vehicle trunks"],
      applications: "Outpatient departments, rehabilitation clinics.",
      specs: { "Self weight": "12.5 kg", "Weight Capacity": "120 kg", "Seat Width": "460 mm" },
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
    },
    {
      name: "12-Lead Digital ECG Recorder",
      features: ["Automated rhythm analysis algorithm", "A4-size thermal paper feed", "Full-disclosure record reviews"],
      benefits: ["Accelerates cardiac diagnostic times", "Detailed waveform logs for reports", "Saves records in digital PDF format"],
      applications: "Cardiology clinics, diagnostic labs, OPD checkups.",
      specs: { "Leads": "Standard 12 leads", "Filters": "Muscle tremor, AC interference", "Paper speed": "5, 10, 25, 50 mm/s" },
      image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=800&q=80"
    },
    {
      name: "Shadowless Ceiling Surgical Light",
      features: ["Double dome LED configuration", "Variable color temperature dials", "High-performance heat dissipation"],
      benefits: ["Reduces head shadows in deep incisions", "Minimizes eye fatigue for surgical staff", "Protects tissue from dry heat exposure"],
      applications: "Cardiac surgical wings, micro-neurosurgery units.",
      specs: { "Lux intensity": "160,000 + 120,000 Lux", "LED Bulb count": "72 + 48 units", "Spot size": "120 - 300 mm" },
      image: "https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=800&q=80"
    },
    {
      name: "Surgical Instrument Set (Major)",
      features: ["Medical-grade SS316 steel", "Precision-ground cutting blades", "ETO sterilizer compatible box"],
      benefits: ["Resists frequent chemical sterilization", "Retains edge sharpness during incisions", "Standard tools packed in single tray"],
      applications: "General surgical wards, major clinical theaters.",
      specs: { "Set Content": "68 instruments total", "Steel Quality": "SS316 surgical grade", "Case Size": "540 x 240 x 120 mm" },
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=80"
    }
  ];

  // 4. Procurement Workflow (9 Steps)
  const procurementWorkflow = [
    { title: "Hospital Requirement", desc: "The hospital's engineering or procurement team submits their required medical accessories, target brands, and technical requirements list." },
    { title: "Product Consultation", desc: "ILMIC's biomedical engineers review the list to match voltage parameters, hospital building layouts, and specify custom options." },
    { title: "Quotation Issuance", desc: "We coordinate with partner manufacturers in India to issue a clear bulk quote, detailing warranty terms and transport incoterms." },
    { title: "Order Confirmation", desc: "Contracts are validated by the hospital's directors, L/C payment lines are verified, and the factory production queue is locked." },
    { title: "Biomedical Inspection", desc: "Our local quality check team tests monitor boards, autocalibrates sensors, and runs sterilizer cycles to ensure compliance." },
    { title: "Sterile Packaging", desc: "Instruments undergo ETO sterilization. Large machinery is packed in anti-shock, foam-padded wooden export-grade pallets." },
    { title: "Global Transit", desc: "Consignments are cleared at customs and dispatched via priority air cargo or container ships to the target port destination." },
    { title: "Onsite Installation", desc: "ILMIC's technical team or regional partners assemble the furniture, route pipelines, and perform test runs on diagnostic machinery." },
    { title: "After-Sales Calibration", desc: "We provide regular maintenance checks, ship replacement parts, and ensure that clinical devices maintain target calibration." }
  ];

  // 5. Why Choose ILMIC
  const whyChooseFeatures = [
    { title: "Certified Medical Products", desc: "Every device carries valid CE certificates, ISO standard tags, and FDA compliance reports, ensuring patient safety." },
    { title: "Reliable Manufacturers", desc: "We maintain sourcing channels with leading WHO-GMP and CE-certified medical OEMs in India, avoiding unverified suppliers." },
    { title: "Affordable Pricing tiers", desc: "By consolidating global hospital orders, we purchase in high volumes to secure significant discounts for foreign buyers." },
    { title: "Fast Global Delivery", desc: "Our trade team books cargo blocks with leading container freight operators to ensure safe and on-time arrivals." },
    { title: "After-Sales Technical Support", desc: "We provide direct calibration support, replacement components, and onsite engineering audits to prevent downtime." },
    { title: "High-Volume Bulk Supply", desc: "We coordinate entire hospital setup shipments, packaging beds, lighting, and surgical sets in large cargo volumes." },
    { title: "Customized Sourcing", desc: "From customized pediatric bed graphics to custom gas outlet designs, we adapt specs to fit your clinic." },
    { title: "Comprehensive Warranty cover", desc: "All electronic monitors, ventilators, and surgical steel sets carry a 1-year replacement warranty." },
    { title: "Quality Assurance Checkpoints", desc: "Every shipment undergoes pre-port inspections to check for structural anomalies, sensor codes, and sterility." }
  ];

  // 6. Industries We Serve (11 Sectors)
  const industriesServed = [
    { name: "Private Hospitals", desc: "Turnkey equipment upgrades & beds" },
    { name: "Public Clinics", desc: "Consumables & diagnostic devices" },
    { name: "Diagnostic Labs", desc: "Centrifuges, analyzers & pipettes" },
    { name: "Medical Colleges", desc: "Anatomy boards & training labs" },
    { name: "Emergency Centres", desc: "AEDs, trauma boards & stretchers" },
    { name: "Nursing Homes", desc: "Patient furniture & lockers" },
    { name: "Healthcare Chains", desc: "Standardized equipment inventories" },
    { name: "Research Institutes", desc: "High-precision laboratory devices" },
    { name: "Government Healthcare", desc: "Ministry supply contracts & tenders" },
    { name: "NGO Medical Wings", desc: "Mobile clinic packs & first aid kits" },
    { name: "Military Hospitals", desc: "Heavy-duty rugged clinical stretchers" }
  ];

  // 7. Quality Standards
  const qualityStandards = [
    { title: "ISO 13485:2016 Certification", desc: "Sourcing strictly conforms to international quality management systems for medical devices." },
    { title: "CE Mark Approvals", desc: "Our electronics and instruments comply with European safety, health, and environmental guidelines." },
    { title: "FDA Compliance Sourcing", desc: "We distribute clinical monitors and pumps carrying active regulatory clearance logs." },
    { title: "Autoclave Sterility Tests", desc: "Instruments undergo ETO steam tests and include visual sterilization tags." },
    { title: "Biomedical Calibration Logs", desc: "Our engineers run electrical safety checkups and output validation on all monitors." },
    { title: "Technical Product Inspections", desc: "We verify structural weld integrity on steel beds, trolleys, and examination tables." },
    { title: "Shock-Absorbent Packaging", desc: "Delicate screens and monitors are protected by thick polystyrene shells and wooden crates." },
    { title: "Calibrated Gas Valve Audits", desc: "Oxygen pipeline accessories are pressure-tested to eliminate gas leakages." }
  ];

  // 8. Global Ports & Regions
  const regionalSupply = {
    "Africa": {
      desc: "Supplying ICU beds, surgical sets, and diagnostic devices directly to regional public healthcare depots.",
      ports: ["Mombasa Port (Kenya)", "Lagos APAPA Terminal (Nigeria)", "Port of Luanda (Angola)", "Durban Port (South Africa)"]
    },
    "Middle East": {
      desc: "Delivering high-end shadowless lights and patient monitors to private clinical networks and diagnostic centers.",
      ports: ["Jebel Ali Port (Dubai, UAE)", "Port of Muscat (Oman)", "Shuwaikh Port (Kuwait)", "Jeddah Islamic Port (KSA)"]
    },
    "Asia": {
      desc: "Sourcing general hospital furniture and medical consumables to Southeast Asian distribution hubs.",
      ports: ["Port of Singapore", "Port of Colombo (Sri Lanka)", "Chittagong Port (Bangladesh)", "Port of Jakarta (Indonesia)"]
    },
    "Europe": {
      desc: "Supplying CE-certified clinical instruments and custom steel accessories to private networks.",
      ports: ["Port of Rotterdam (Netherlands)", "Port of Hamburg (Germany)", "Port of Genoa (Italy)"]
    },
    "CIS Countries": {
      desc: "Delivering ventilators and ICU monitors to regional healthcare groups under active custom declarations.",
      ports: ["Port of Tashkent (Uzbekistan)", "Port of Almaty (Kazakhstan)", "Port of Baku (Azerbaijan)"]
    },
    "Latin America": {
      desc: "Exporting specialty consumables and surgical tables under strict import quality frameworks.",
      ports: ["Port of Santos (Brazil)", "Port of Veracruz (Mexico)", "Port of Callao (Peru)"]
    }
  };

  // 9. Stats
  const stats = [
    { value: "500+", label: "Hospital Products", desc: "Surgical sets, ICU beds, and ventilators." },
    { value: "50+", label: "Trusted Manufacturers", desc: "CE & ISO accredited production allies." },
    { value: "25+", label: "Countries Served", desc: "Active distribution networks globally." },
    { value: "1000+", label: "Successful Deliveries", desc: "Delivered directly to hospital wards." },
    { value: "98%", label: "Client Satisfaction", desc: "Based on engineering feedback." },
    { value: "24/7", label: "Biomedical Support", desc: "Resolving technical checkups & calibration." }
  ];

  // 10. Testimonials
  const testimonials = [
    {
      name: "Engr. Patrick Mensah",
      country: "Accra, Ghana",
      title: "Biomedical Engineering Chief",
      review: "The 12.1-inch patient monitors supplied by ILMIC passed our strict electrical safety checks and sensor calibration runs. Their technical team provided full wiring diagnostics.",
      logoText: "PM",
      rating: 5
    },
    {
      name: "Dr. Farah Al-Mansoori",
      country: "Abu Dhabi, UAE",
      title: "Hospital Operations Director",
      review: "Equipping our new 50-bed ward was seamless. The electric ICU beds and bedside cabinets arrived inside foam-padded crates. Not a single scratch. Excellent price advantage.",
      logoText: "FA",
      rating: 5
    },
    {
      name: "Marcus Thorne",
      country: "Nairobi, Kenya",
      title: "Procurement Group Chief",
      review: "We coordinate public tenders in East Africa. ILMIC provides flawless paperwork, ISO certificates, and COA validation check sheets. They are our go-to partner for medical equipment.",
      logoText: "MT",
      rating: 5
    }
  ];

  return (
    <Layout
      title="Hospital Accessories & Medical Equipment Sourcing | ILMIC Health Care"
      description="Global supplier of premium hospital accessories. We supply CE-marked ICU beds, ventilators, patient monitors, and surgical instruments to hospitals worldwide."
    >
      {/* Background Styling: Blueprint Radial Grid (Sleek, tech corporate feel) */}
      <div className="bg-[radial-gradient(#1e5a9e0a_1.5px,transparent_1.5px)] bg-[size:32px_32px] min-h-screen">

        {/* SECTION 1: HERO SECTION (Premium OEM style) */}
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
          {/* Soft blue background glows */}
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-ilmic-blue-light/35 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-slate-100 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Text Column */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-ilmic-blue/10 border border-ilmic-blue/20 rounded-full text-xs font-black uppercase tracking-wider text-ilmic-blue"
                >
                  <span role="img" aria-label="Bed">🏥</span> Hospital Accessories Supply
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ilmic-text leading-tight"
                >
                  Complete Hospital Equipment & <br className="hidden sm:inline" />
                  <span className="text-ilmic-blue">Medical Accessories</span> Solutions
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-ilmic-muted text-base sm:text-lg max-w-2xl leading-relaxed font-semibold"
                >
                  Supplying premium-quality medical equipment, hospital furniture, surgical instruments, diagnostic devices, and healthcare accessories to hospitals and healthcare institutions worldwide.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-4 pt-2"
                >
                  <a
                    href="#categories"
                    className="px-6 py-4 bg-ilmic-blue hover:bg-ilmic-blue-dark text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 hover:-translate-y-0.5 transform"
                  >
                    Browse Product Range <FiArrowRight />
                  </a>
                  <a
                    href="#procurement-form"
                    className="px-6 py-4 bg-white border border-ilmic-border hover:bg-ilmic-blue-soft text-ilmic-text font-bold rounded-xl transition-all flex items-center gap-2 hover:-translate-y-0.5 transform"
                  >
                    Request Quotation
                  </a>
                  <a
                    href="tel:+91800000000"
                    className="px-6 py-4 bg-ilmic-blue-soft hover:bg-ilmic-blue-light text-ilmic-blue font-bold rounded-xl transition-all flex items-center gap-2"
                  >
                    Talk to Procurement Team
                  </a>
                </motion.div>
              </div>

              {/* Right Side Visual with glassmorphism cards */}
              <div className="lg:col-span-5 relative mt-10 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative mx-auto max-w-[450px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-200"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                    alt="Premium clinical patient monitoring devices"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ilmic-text/40 to-transparent" />
                </motion.div>

                {/* Floating Glassmorphism Badges */}
                <div className="absolute inset-0 pointer-events-none">
                  {glassCards.map((badge, index) => {
                    const positions = [
                      "top-[3%] -left-[12%] max-w-[170px]",
                      "top-[25%] -right-[8%] max-w-[170px]",
                      "bottom-[38%] -left-[10%] max-w-[180px]",
                      "bottom-[14%] -right-[4%] max-w-[170px]",
                      "bottom-[1%] left-[10%] max-w-[180px]"
                    ];
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: badge.delay }}
                        className={`absolute hidden sm:block ${positions[index]} bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-ilmic-border/50 shadow-lg pointer-events-auto hover:bg-white transition-all`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-ilmic-blue" />
                          <h4 className="font-extrabold text-ilmic-text text-xs leading-tight">{badge.title}</h4>
                        </div>
                        <p className="text-[9px] text-ilmic-muted font-semibold leading-normal">{badge.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PRODUCT CATEGORIES GRID (21 Items) */}
        <section id="categories" className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">PRODUCT MANIFEST</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Hospital Equipment & Accessories</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Explore our comprehensive inventory of medical hardware, surgical steel tools, patient monitors, and sterilization systems.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.map((item, index) => (
                <div 
                  key={index}
                  className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-150 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-[200px] overflow-hidden bg-slate-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <h4 className="font-bold text-ilmic-text text-base group-hover:text-ilmic-blue transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-ilmic-muted text-xs leading-relaxed font-semibold">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <a
                      href="#procurement-form"
                      className="inline-flex items-center gap-1.5 text-xs font-black text-ilmic-blue hover:text-ilmic-blue-dark transition-colors"
                    >
                      Specifications <FiArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURED EQUIPMENT SPOTLIGHT (Staggered Layout) */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">PRODUCT SPOTLIGHT</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Featured Diagnostic & ICU Devices</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Review core technical data, clinical applications, and warranty parameters of our premium diagnostic systems.
              </p>
            </div>

            {/* Alternating Tabbed Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Left Selector List */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                {featuredEquipment.map((device, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedProductSpotlight(idx)}
                    className={`p-5 text-left rounded-2xl border transition-all ${
                      selectedProductSpotlight === idx
                        ? "bg-ilmic-blue border-ilmic-blue text-white shadow-md"
                        : "bg-white border-slate-200 text-ilmic-text hover:bg-slate-100"
                    }`}
                  >
                    <h4 className="font-bold text-sm leading-snug">{device.name}</h4>
                    <span className={`text-[9px] font-black uppercase tracking-wider block mt-1 ${
                      selectedProductSpotlight === idx ? "text-blue-100" : "text-ilmic-muted"
                    }`}>
                      Check Specifications
                    </span>
                  </button>
                ))}
              </div>

              {/* Right Detail Card */}
              <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-xl">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-ilmic-text">
                      {featuredEquipment[selectedProductSpotlight].name}
                    </h3>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-black uppercase tracking-wider rounded-full">
                      CE Approved
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Features & Benefits */}
                    <div className="space-y-4 text-xs font-semibold leading-relaxed">
                      <div>
                        <h5 className="text-[10px] font-black text-ilmic-blue uppercase tracking-widest mb-1.5">Key Features</h5>
                        <ul className="space-y-1 text-slate-700">
                          {featuredEquipment[selectedProductSpotlight].features.map((feat, i) => (
                            <li key={i} className="flex gap-1.5 items-start">
                              <span className="text-ilmic-blue mt-0.5">•</span> {feat}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1.5">Clinical Benefits</h5>
                        <ul className="space-y-1 text-slate-700">
                          {featuredEquipment[selectedProductSpotlight].benefits.map((bene, i) => (
                            <li key={i} className="flex gap-1.5 items-start">
                              <span className="text-emerald-500 mt-0.5">•</span> {bene}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Specs Table */}
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                      <h5 className="text-[10px] font-black text-ilmic-text uppercase tracking-widest">Technical Specifications</h5>
                      <div className="space-y-2 text-xs font-semibold text-slate-750">
                        {Object.entries(featuredEquipment[selectedProductSpotlight].specs).map(([key, val], i) => (
                          <div key={i} className="flex justify-between border-b border-slate-200/50 pb-1.5">
                            <span className="text-ilmic-muted">{key}:</span>
                            <span className="text-ilmic-text text-right font-bold">{val}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-ilmic-muted font-bold pt-2">
                        <strong>Applications:</strong> {featuredEquipment[selectedProductSpotlight].applications}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Display Image */}
                <div className="relative h-[240px] rounded-2xl overflow-hidden mt-8 bg-slate-100 border border-slate-200">
                  <Image
                    src={featuredEquipment[selectedProductSpotlight].image}
                    alt={featuredEquipment[selectedProductSpotlight].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: SUPPLY PROCESS (Procurement Timeline) */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">SOURCING LOGISTICS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">B2B Procurement Workflow</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                From technical consultations to onsite calibrations, trace our structured equipment pipeline.
              </p>
            </div>

            {/* Procurement Timeline Line */}
            <div className="relative max-w-4xl mx-auto border-l-2 border-slate-200 pl-8 space-y-8">
              {procurementWorkflow.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Indicator Dot */}
                  <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-slate-200 group-hover:border-ilmic-blue transition-all flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-ilmic-blue" />
                  </div>
                  <h4 className="font-extrabold text-ilmic-text text-base leading-snug group-hover:text-ilmic-blue transition-colors">
                    {idx + 1}. {step.title}
                  </h4>
                  <p className="text-ilmic-muted text-xs leading-relaxed font-semibold mt-1 max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: WHY CHOOSE ILMIC */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">OUR ADVANTAGES</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Why Procurement Officers Choose ILMIC</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                We combine wholesale advantages in India with direct biomedical engineering checks to provide absolute reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseFeatures.map((feat, index) => (
                <div key={index} className="p-8 bg-white border border-slate-200 rounded-3xl flex flex-col justify-between hover:border-ilmic-blue-light transition-all shadow-sm">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-ilmic-blue-soft border border-ilmic-blue-light flex items-center justify-center text-ilmic-blue font-bold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="font-extrabold text-ilmic-text text-base leading-snug">{feat.title}</h4>
                    <p className="text-ilmic-muted text-xs leading-relaxed font-semibold">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: INDUSTRIES WE SERVE */}
        <section className="py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">TARGET SECTORS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Healthcare Sectors We Equip</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                We distribute customized machinery sets across specialized clinical divisions globally.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {industriesServed.map((ind, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2 hover:-translate-y-1 transform transition-all shadow-sm">
                  <span className="text-2xl">🏥</span>
                  <h4 className="font-bold text-ilmic-text text-xs leading-snug">{ind.name}</h4>
                  <p className="text-[10px] text-ilmic-muted font-semibold">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: QUALITY STANDARDS */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">COMPLIANCE CODE</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Biomedical Compliance & Standards</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Our supply pathways are verified by international quality control teams. Review our standard checkpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {qualityStandards.map((std, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm">
                  <div className="space-y-3">
                    <FiCheckCircle className="text-ilmic-blue w-6 h-6" />
                    <h4 className="font-bold text-ilmic-text text-sm leading-snug">{std.title}</h4>
                    <p className="text-ilmic-muted text-[11px] leading-relaxed font-semibold">{std.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: GLOBAL SUPPLY NETWORK */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Region description left */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">LOGISTICS MAP</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">International Supply Harbors</h2>
                <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                  We supply critical care machinery to medical boards globally. Select a regional tab to see target port coordinates.
                </p>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {Object.keys(regionalSupply).map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setActiveRegion(reg)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                        activeRegion === reg
                          ? "bg-ilmic-blue border-ilmic-blue text-white"
                          : "bg-slate-50 border-slate-200 text-ilmic-text hover:bg-slate-100"
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>

                {/* Ports list */}
                <div className="p-6 bg-slate-50 border border-slate-150 rounded-2xl space-y-4">
                  <p className="text-ilmic-text text-xs sm:text-sm font-bold italic leading-relaxed">
                    "{regionalSupply[activeRegion].desc}"
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {regionalSupply[activeRegion].ports.map((port, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                        <FiAnchor className="text-ilmic-blue flex-shrink-0" />
                        <span>{port}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Graphic right */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-4 bg-slate-100 rounded-[40px] -z-10" />
                <div className="relative aspect-[4/3] rounded-[30px] overflow-hidden shadow-xl border border-slate-200 bg-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
                    alt="Global shipping containers"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: OUR STRENGTH (Animated Stats) */}
        <section className="py-20 bg-ilmic-blue text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue-light">SOURCING CAPABILITIES</span>
              <h2 className="text-3xl font-extrabold text-white">Consolidated Supply Volume</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-2 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className="text-4xl sm:text-5xl font-black tracking-tight">
                    <Counter value={stat.value} suffix={stat.value.includes("+") ? "+" : "%"} />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ilmic-blue-light">{stat.label}</h4>
                  <p className="text-[10px] text-slate-350 leading-relaxed font-semibold max-w-[130px] mx-auto">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: PRODUCT GALLERY (Masonry Grid) */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">CATALOG IMAGES</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Medical Sourcing Gallery</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Preview our shadowless lamps, orthopedic table setups, and double-walled sterilization units.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&q=80",
                "https://images.unsplash.com/photo-1504813184591-01557010c722?w=600&q=80",
                "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80",
                "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80",
                "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80",
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
                "https://images.unsplash.com/photo-1559757175-5700def83abb?w=600&q=80",
                "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&q=80"
              ].map((img, idx) => (
                <div key={idx} className="relative h-[220px] rounded-2xl overflow-hidden shadow-sm group bg-slate-200 border border-slate-150">
                  <Image
                    src={img}
                    alt="Sourcing items gallery"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: MANUFACTURING PARTNERS (Logo Wall) */}
        <section className="py-16 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h4 className="text-xs font-black uppercase tracking-widest text-ilmic-blue mb-10">
              ALLIED MEDICAL OEMs & PARTNERS
            </h4>
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              {["Stryker Allied", "Philips Diagnostics Sourcing", "Medtronic Valves Sourcing", "Roche Laboratory Allies", "Zydus Hardware Sourcing", "B. Braun Systems Sourcing"].map((partner, idx) => (
                <div key={idx} className="px-6 py-3.5 bg-white border border-slate-200 rounded-xl font-black text-slate-700 text-xs shadow-sm hover:border-ilmic-blue-light transition-all">
                  🩺 {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 12: CUSTOM PROCUREMENT SOLUTIONS */}
        <section className="py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">
                  ENTERPRISE PROJECT CONTROLS
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">
                  Turnkey Hospital Commissioning & Tenders
                </h2>
                
                <div className="space-y-4 text-ilmic-muted text-xs sm:text-sm leading-relaxed font-semibold">
                  <p>
                    Equipping a tertiary hospital group demands strict coordination between biomedical parameters, electrical safety boards, and logistics transits. We act as a consolidated medical equipment consultant, handling bid specifications, supplier calibrations, and local port clearance bills.
                  </p>
                  <p>
                    For governmental ministries of health, diagnostic chains, or private oncology units, we bundle furniture, surgical steel, and diagnostic lamps in single cargo consignments, drastically reducing capex logistics.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    "Ministry of health tender bids",
                    "Commissioning specs checks",
                    "Customized surgical sets selection",
                    "Consolidated shipping bills",
                    "Onsite assembly technicians",
                    "Post-installation sensor testing"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <FiCheck className="text-emerald-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80"
                    alt="Medical equipment testing operations"
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 13: CLIENT TESTIMONIALS */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">TESTIMONIALS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">B2B Procurement Reviews</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Discover what hospital directors and biomedical engineers say about our medical hardware calibrations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((story, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-ilmic-blue/10 border border-ilmic-blue/20 flex items-center justify-center font-bold text-ilmic-blue text-xs">
                        {story.logoText}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-ilmic-text text-sm leading-tight">{story.name}</h4>
                        <span className="text-[9px] text-slate-400 font-bold block">{story.title} - {story.country}</span>
                      </div>
                    </div>
                    <p className="text-ilmic-muted text-xs leading-relaxed font-semibold italic">
                      "{story.review}"
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-ilmic-blue uppercase tracking-wider">
                    <span>Calibration Approved</span>
                    <span>★★★★★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 14: FAQ ACCORDION */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">SOURCING FAQS</span>
              <h2 className="text-3xl font-extrabold text-ilmic-text">Equipment Sourcing FAQs</h2>
            </div>

            <div className="space-y-4">
              {[
                { 
                  q: "Can you supply bulk hospital equipment for new facility setups?", 
                  a: "Yes. ILMIC designs complete hospital procurement packages. We consolidate hospital beds, ICU monitors, ventilators, ceiling OT lighting, and surgical sets in large container transits, managing all invoice files, calibrations, and port clearances." 
                },
                { 
                  q: "Do you provide onsite installation and biomedical calibration support?", 
                  a: "Yes, our technical team or local engineering partners guide the physical setup of ceiling LED fixtures, operating tables, and gas pipeline outlet valves. We verify monitor sensor accuracy and generate calibration logs before ward handovers." 
                },
                { 
                  q: "Do your medical products include warranty coverage?", 
                  a: "All supplied electronic patient monitors, volumetric infusion pumps, ventilators, and defibrillators include a 1-year replacement warranty cover against manufacturing or motherboard defects." 
                },
                { 
                  q: "Can you export internationally and handle custom approvals?", 
                  a: "Yes, we ship medical supplies under standard Incoterms (FOB Mumbai/Mundra, CIF, or EXW) directly to international ports. We compile CTD dossiers, ISO certificates, and COA validation check sheets for custom offices." 
                },
                { 
                  q: "How long does a typical medical equipment delivery take?", 
                  a: "Standard diagnostic items and consumables ship via priority air cargo in 5 to 7 days. Large-volume hospital furniture, surgical beds, and heavy machinery transits take 20 to 35 days via sea routes." 
                },
                { 
                  q: "Do you support government procurement and ministries tenders?", 
                  a: "Yes, our global trade desk coordinates with regional ministries of health and NGOs to supply custom-labeled equipment and bid documentation matching public tender compliance guidelines." 
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
                        <div className="p-6 text-ilmic-muted text-xs sm:text-sm leading-relaxed font-semibold">
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

        {/* SECTION 15: FINAL CTA & LEAD FORM */}
        <section id="procurement-form" className="py-24 bg-gradient-to-br from-ilmic-blue-soft via-white to-slate-50 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e5a9e03_1px,transparent_1px),linear-gradient(to_bottom,#1e5a9e03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">GET CUSTOM QUOTE</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Equip Your Healthcare Facility</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Partner with ILMIC Health Care for reliable hospital accessories, medical equipment, and end-to-end procurement solutions.
              </p>
            </div>

            {/* Sourcing Form */}
            <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-ilmic-border/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-ilmic-blue" />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                      Procurement Chief Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold placeholder-slate-400 bg-slate-50/50"
                      placeholder="e.g. Daniel Obeng"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                      Hospital / Facility Name *
                    </label>
                    <input
                      type="text"
                      name="facilityName"
                      value={form.facilityName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold placeholder-slate-400 bg-slate-50/50"
                      placeholder="e.g. Accra City Clinic"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold placeholder-slate-400 bg-slate-50/50"
                      placeholder="e.g. procurement@accracityclinic.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold placeholder-slate-400 bg-slate-50/50"
                      placeholder="e.g. +233 24 123 4567"
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
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold placeholder-slate-400 bg-slate-50/50"
                      placeholder="e.g. Lead Biomedical Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                      Target Delivery Country
                    </label>
                    <input
                      type="text"
                      name="targetLocation"
                      value={form.targetLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold placeholder-slate-400 bg-slate-50/50"
                      placeholder="e.g. Ghana"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                      Target capex Budget Range
                    </label>
                    <select
                      name="budgetRange"
                      value={form.budgetRange}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold text-slate-700 bg-white"
                    >
                      <option value="">Select budget range...</option>
                      <option value="Under $10,000">Under $10,000</option>
                      <option value="$10,000 - $50,000">$10,000 - $50,000</option>
                      <option value="$50,000 - $150,000">$50,000 - $150,000</option>
                      <option value="Over $150,000">Over $150,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Equipment Sourcing Specifications & Items List
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold placeholder-slate-400 bg-slate-50/50"
                    placeholder="Provide item counts (e.g. 10 electric ICU beds, 4 multi-parameter monitors), technical model numbers, custom dimensions, required CE/ISO certifications, and tender document lists..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-ilmic-blue hover:bg-ilmic-blue-dark text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm sm:text-base hover:-translate-y-0.5 transform disabled:bg-slate-350 disabled:transform-none"
                >
                  {submitting ? "Sending Sourcing Specifications..." : "Submit Quotation Request"} <FiSend />
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default HospitalAccessoriesSupply;
