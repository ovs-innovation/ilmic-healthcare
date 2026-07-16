import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@layout/Layout";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import LeadServices from "@services/LeadServices";
import { notifySuccess, notifyError } from "@utils/toast";
import { 
  FiCheck, FiArrowRight, FiShield, FiFileText, FiSend, 
  FiPlus, FiMinus, FiActivity, FiUsers, FiTrendingUp, 
  FiSettings, FiBriefcase, FiDollarSign, FiClock, FiTarget, 
  FiSmartphone, FiAward, FiLayers, FiAlertCircle
} from "react-icons/fi";

// Client-side animated counter component using Framer Motion
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

const HospitalManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", designation: "", facilityType: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedProcessStep, setSelectedProcessStep] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

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
        message: `[Designation: ${form.designation || "Not specified"}] [Facility Type: ${form.facilityType || "Not specified"}] ${form.message}`,
        service: "Hospital Management",
      });
      notifySuccess("Enquiry submitted successfully! Our healthcare consulting desk will contact you within 2 hours.");
      setForm({ name: "", email: "", phone: "", message: "", designation: "", facilityType: "" });
    } catch (err) {
      notifyError("Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // 1. Hero Floating Cards
  const floatingCards = [
    { title: "Hospital Operations", desc: "Maximizing throughput and patient discharge turnarounds.", delay: 0.1 },
    { title: "Healthcare Strategy", desc: "Long-term clinical expansion and feasibility roadmap design.", delay: 0.2 },
    { title: "Quality Management", desc: "Establishing strict sterility and safety protocols.", delay: 0.3 },
    { title: "Hospital Performance", desc: "Data-driven analytics for clinical and financial health.", delay: 0.4 },
    { title: "Accreditation Readiness", desc: "End-to-end guidance for JCI, NABH, and ISO audits.", delay: 0.5 },
  ];

  // 2. Services Grid (12 Items)
  const services = [
    {
      title: "Hospital Planning & Layouts",
      desc: "Architectural spatial designs conforming to international clinical zoning guidelines. We layout patient pathways, aseptic zones, sterile surgical corridors, and clean room flows to prevent nosocomial infections.",
      icon: FiLayers
    },
    {
      title: "Operational Consulting",
      desc: "Comprehensive diagnostic audits of healthcare workflows. We restructure hospital triage operations, reduce patient waiting queues in OPDs, and streamline laboratory and pharmacy dispatch timelines.",
      icon: FiActivity
    },
    {
      title: "Healthcare Growth Strategy",
      desc: "Formulating market placement and regional healthcare strategies. We identify patient capture zones, establish specialized clinical departments, and optimize pricing tariffs for private and corporate groups.",
      icon: FiTrendingUp
    },
    {
      title: "Clinical Staff Management",
      desc: "Fostering academic growth and operational efficiency among nursing and paramedical staff. We draft clinical hierarchy charts, implement skill retention models, and structure training paths.",
      icon: FiUsers
    },
    {
      title: "Hospital Workflow Restructuring",
      desc: "Redefining how information and patients move across clinical domains. We eliminate paper bottlenecks, redesign emergency department transfer loops, and establish clear criteria for ICU handovers.",
      icon: FiSettings
    },
    {
      title: "Healthcare Financial Planning",
      desc: "Preventing tariff leakages and managing capital expenditure. Our consultants perform root-cause analyses on billing codes, optimize department revenue yields, and run medical device purchase audits.",
      icon: FiDollarSign
    },
    {
      title: "Digital Transformation & EMR",
      desc: "Integrating state-of-the-art Electronic Medical Records (EMR) and Hospital Information Systems (HIS). We establish interoperability metrics matching international HL7 and FHIR messaging standards.",
      icon: FiSmartphone
    },
    {
      title: "Infrastructure Expansion Sizing",
      desc: "Advising hospital boards on physical capacity expansion. We conduct patient density analysis, size future ICU requirements, and plan diagnostic medical installations to ensure long-term ROI.",
      icon: FiTarget
    },
    {
      title: "Patient Experience Strategy",
      desc: "Redesigning inpatient and outpatient service interfaces. We establish feedback loops, implement digital check-in systems, and train customer-facing staff on hospitable patient coordination.",
      icon: FiClock
    },
    {
      title: "Clinical Quality Control",
      desc: "Establishing rigorous parameters for hospital quality. We design internal clinical audit workflows, set antibiotic stewardship plans, and outline central sterile supply department (CSSD) standards.",
      icon: FiAward
    },
    {
      title: "Clinical Governance & Oversight",
      desc: "Structuring executive boards, clinical advisory councils, and credentialing committees. We define hospital bylaws, professional standards, and ethical treatment practices to reduce liability.",
      icon: FiShield
    },
    {
      title: "Healthcare Data Analytics",
      desc: "Deploying predictive algorithms and clinical metrics dashboards. We compile patient bed-occupancy forecasts, calculate average length of stay (ALOS) patterns, and optimize pharmacy stock levels.",
      icon: FiFileText
    }
  ];

  // 3. Process Steps (8 steps)
  const processSteps = [
    { 
      title: "Assessment & Diagnostics", 
      desc: "We perform an in-depth audit of your hospital's clinical protocols, billing logs, and workflow bottlenecks. Our team reviews patient flow times, stock leakages, and historical waiting logs to highlight key operational gaps." 
    },
    { 
      title: "Blueprinting & Planning", 
      desc: "Creating structural solutions tailored to the diagnostic findings. We design updated staff schedules, draft sterile zone architectural drawings, and model dynamic staffing matrices based on peak patient inflow hours." 
    },
    { 
      title: "Strategic Formulation", 
      desc: "Aligning changes with hospital directors and executive boards. We restructure diagnostic pricing plans, establish medical equipment acquisition roadmaps, and define departmental KPIs." 
    },
    { 
      title: "System Implementation", 
      desc: "Deploying the strategic solutions. We deploy digital HMIS modules, install physical triage signage, integrate diagnostic reporting software, and restructure surgical pathways in real-time without disrupting care." 
    },
    { 
      title: "Clinical & SOP Training", 
      desc: "Familiarizing the medical staff with new systems. We run interactive nurse onboarding classes, simulate cardiorespiratory arrest drills, and train billing desks on revised code categorization." 
    },
    { 
      title: "Throughput Optimization", 
      desc: "Reviewing immediate outcomes and tuning setups. We refine ICU patient transfer checkpoints, accelerate diagnostic reporting, and ensure the Central Sterile Supply Department meets peak surgical demands." 
    },
    { 
      title: "Continuous Monitoring", 
      desc: "Integrating long-term safeguards. We set up executive operational dashboards, track average lengths of stay (ALOS), monitor medication inventory turnover, and analyze weekly patient experience scorecards." 
    },
    { 
      title: "Continuous Quality Improvement", 
      desc: "Maintaining international excellence. We perform mock audits for JCI and NABH accreditations, refine emergency protocols based on metrics, and update hospital SOPs to meet changing healthcare guidelines." 
    }
  ];

  // 4. Key Performance Improvements (Stats)
  const stats = [
    { value: "40%", label: "Operational Cost Reduction", desc: "Achieved via supply optimization and billing audits." },
    { value: "35%", label: "Improved Patient Satisfaction", desc: "Validated by post-discharge clinical experience surveys." },
    { value: "50%", label: "Workflow Efficiency Gain", desc: "Obtained by streamlining OPD queues and diagnostic handovers." },
    { value: "99%", label: "Compliance Rate", desc: "Matching rigorous international clinical sterility frameworks." },
    { value: "25+", label: "Hospital Projects Completed", desc: "Corporate, private, and university healthcare facilities." }
  ];

  // 5. Why Choose ILMIC
  const features = [
    { title: "Experienced Consultants", desc: "Our team includes veteran hospital administrators, clinical directors, and operations experts with decades of hands-on experience managing global healthcare groups." },
    { title: "Healthcare Sector Experts", desc: "We focus exclusively on healthcare infrastructure, avoiding generic strategies. Our recommendations are rooted in deep clinical realities and medical compliance." },
    { title: "Customized Solutions", desc: "No copy-paste strategies. We analyze your hospital's local demographic, staff capacity, and patient patterns to design tailored protocols that work on your clinic floor." },
    { title: "Hospital Modernization", desc: "Transitioning legacy facilities into digital-first institutions. We guide the deployment of EMRs, automated billing systems, and IoT medical devices." },
    { title: "Rigorous Compliance Support", desc: "We align your entire clinical operation with local state guidelines and premium global standards, minimizing operational liabilities and legal disputes." },
    { title: "Technology Integration", desc: "Bridging the gap between medical hardware and software systems. We integrate PACS, ERP, and bedside telemetry networks for real-time diagnostics." },
    { title: "International Standards", desc: "We structure operational workflows, safety parameters, and clinical sterility checklists to match global best practices set by WHO, JCI, and NABH." },
    { title: "Long-Term Partnership", desc: "We don't just draft strategy documents and leave. We guide your teams through implementation, training, and audits over multi-year operational cycles." }
  ];

  // 6. Case Studies
  const caseStudies = [
    {
      name: "Nairobi Tertiary Care Hospital Restructuring",
      challenge: "A 300-bed multi-specialty hospital suffered from severe emergency triage bottlenecks, average inpatient check-in delays of 3 hours, and a 14% annual revenue leakage in surgical consumables inventory.",
      solution: "ILMIC consultants redesigned the physical emergency entry routes, implemented a digital EMR-linked triage system, and established strict RFID barcode tracking for all operating theater equipment.",
      results: {
        before: "3-hour inpatient admission wait time, 14% surgical stock loss.",
        after: "18-minute admission wait time, 0.8% inventory variance.",
        improvement: "40% Emergency Queue reduction, 98% billing capture."
      },
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Luanda Specialty Clinic Chain Digital Transformation",
      challenge: "A chain of 12 orthopedic and spine centers had disjointed billing databases, causing major patient record delays and diagnostic billing errors that cost the group $1.2M in annual insurance denials.",
      solution: "We deployed a unified cloud-based Hospital Information System (HIS) with central accounting, integrated automated insurance verification APIs, and retrained the entire billing staff.",
      results: {
        before: "Disjointed patient databases, $1.2M in annual insurance claim denials.",
        after: "Centralized EHR cloud database, automated insurance pre-authorization.",
        improvement: "95% insurance claim approval rate, zero database sync delays."
      },
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Mumbai Multispecialty NABH Certification Preparedness",
      challenge: "A newly constructed 150-bed hospital failed its initial mock quality inspection due to inadequate sterilization cycles, poor clinical governance structures, and lack of nurse SOP training.",
      solution: "ILMIC established clinical governance committees, implemented a rigorous Central Sterile Supply Department (CSSD) workflow, and conducted 180 hours of bedside nurse SOP drills.",
      results: {
        before: "Failed mock quality inspection, uncertified CSSD workflows.",
        after: "Successfully passed final inspection with zero major non-conformances.",
        improvement: "NABH accreditation achieved in 6 months, 99.2% sterilization audit score."
      },
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <Layout
      title="Hospital Management & Operations Consulting | ILMIC Health Care"
      description="Professional healthcare consulting company. We provide operations auditing, custom SOP designing, JCI/NABH accreditation preparation, and digital HMIS setup."
    >
      {/* SECTION 1: HERO SECTION (Corporate Consulting Style) */}
      <section className="relative min-h-screen bg-gradient-to-br from-ilmic-blue-soft via-white to-slate-50 flex items-center pt-24 pb-16 overflow-hidden">
        {/* Decorative Grid Patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e5a9e08_1px,transparent_1px),linear-gradient(to_bottom,#1e5a9e08_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-ilmic-blue-light/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-slate-100 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Context & Typography */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-ilmic-blue/10 border border-ilmic-blue/20 rounded-full text-xs font-black uppercase tracking-wider text-ilmic-blue"
              >
                <span role="img" aria-label="Hospital">🏥</span> Hospital Management Solutions
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ilmic-text leading-tight"
              >
                Transforming Hospitals <br className="hidden sm:inline" />
                Through <span className="text-ilmic-blue relative">Smart Healthcare</span> Management
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-ilmic-muted text-base sm:text-lg max-w-2xl leading-relaxed"
              >
                Helping private hospitals, government institutions, healthcare groups, and medical colleges improve clinical operations, enhance patient care, optimize resources, and build financially sustainable healthcare systems.
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
                  Request Consultation <FiArrowRight />
                </button>
                <a
                  href="tel:+91800000000" // Replace with direct contact number or action
                  className="px-6 py-4 bg-white border border-ilmic-border hover:bg-ilmic-blue-soft text-ilmic-text font-bold rounded-xl transition-all flex items-center gap-2 hover:-translate-y-0.5 transform"
                >
                  Talk to Our Experts
                </a>
                <a
                  href="#consultation-form"
                  className="px-6 py-4 bg-ilmic-blue-soft hover:bg-ilmic-blue-light text-ilmic-blue font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  Download Profile
                </a>
              </motion.div>
            </div>

            {/* Right Column: Corporate Visuals & Floating Cards */}
            <div className="lg:col-span-5 relative mt-10 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative mx-auto max-w-[450px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-200"
              >
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
                  alt="Hospital boardroom meeting planning"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ilmic-text/40 to-transparent" />
              </motion.div>

              {/* Floating Cards (Animated on hover, staggered entry) */}
              <div className="absolute inset-0 pointer-events-none">
                {floatingCards.map((card, index) => {
                  const positions = [
                    "top-[5%] -left-[15%] max-w-[190px]",
                    "top-[30%] -right-[10%] max-w-[190px]",
                    "bottom-[35%] -left-[12%] max-w-[180px]",
                    "bottom-[12%] -right-[5%] max-w-[190px]",
                    "bottom-[2%] left-[10%] max-w-[210px]",
                  ];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: card.delay }}
                      className={`absolute hidden sm:block ${positions[index]} bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-ilmic-border/50 shadow-lg pointer-events-auto hover:bg-white transition-all`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-ilmic-blue" />
                        <h4 className="font-extrabold text-ilmic-text text-xs leading-tight">{card.title}</h4>
                      </div>
                      <p className="text-[10px] text-ilmic-muted font-medium leading-normal">{card.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT HOSPITAL MANAGEMENT */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Image Side */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-ilmic-blue-light/40 rounded-[40px] -z-10" />
              <div className="relative aspect-[3/4] rounded-[30px] overflow-hidden shadow-xl border border-slate-100 bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                  alt="Hospital leadership planning operational optimization"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Text Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">
                ABOUT HIERARCHICAL MANAGEMENT
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">
                Defining Excellence in Modern Healthcare Infrastructure
              </h2>
              
              <div className="space-y-4 text-ilmic-muted text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  Hospital management refers to the comprehensive administration of medical facilities, clinical personnel, and patient care workflows. In today's complex clinical environments, running a healthcare facility demands a rigorous balance between clinical quality governance, financial sustainability, and patient safety. At ILMIC, we understand that modern hospitals are not just clinical environments, but complex ecosystems requiring continuous operational coordination.
                </p>
                <p>
                  Our healthcare management consultants collaborate directly with hospital owners, directors, and boards to diagnostic audit legacy systems. By auditing tariff leakage, restructuring nurse staffing ratios, and optimizing patient triage pathways, we eliminate friction from arrival to discharge. We believe operational excellence is not an option, but the cornerstone of patient safety.
                </p>
                <p>
                  From designing emergency department spatial zones to deploying interoperable cloud Electronic Medical Records (EMR), our team helps healthcare groups build sustainable, highly efficient medical institutions. We ensure compliance with premium frameworks (such as NABH and JCI) while improving clinical throughput and financial resilience.
                </p>
              </div>

              {/* Mini Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { title: "Operational Excellence", desc: "Optimizing patient movement & reducing queues." },
                  { title: "Digital Healthcare", desc: "Deploying secure, interoperable systems." },
                  { title: "Patient Safety First", desc: "Mitigating clinical liability and sterile gaps." },
                  { title: "Financial Resilience", desc: "Plugging revenue leakage and capex waste." }
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

      {/* SECTION 3: OUR SERVICES (Premium Grid) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">CONSULTING SPECIALTIES</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Our Hospital Management Modules</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              We provide modular consulting services addressing every operational, financial, and clinical layer of healthcare infrastructure. Discover how our advisory units transform medical facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((serv, index) => {
              const Icon = serv.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)" }}
                  className="bg-white p-8 rounded-3xl border border-ilmic-border/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-ilmic-blue-soft border border-ilmic-blue-light flex items-center justify-center text-ilmic-blue mb-6 group-hover:bg-ilmic-blue group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-ilmic-text mb-3 group-hover:text-ilmic-blue transition-colors duration-200">
                      {serv.title}
                    </h3>
                    <p className="text-ilmic-muted text-xs leading-relaxed font-medium mb-6">
                      {serv.desc}
                    </p>
                  </div>
                  <a
                    href="#consultation-form"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-ilmic-blue hover:text-ilmic-blue-dark transition-colors mt-auto"
                  >
                    Learn More <FiArrowRight className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR CONSULTING PROCESS (Premium Circular Infographic) */}
      <section className="py-24 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">OUR ADVISORY METHODOLOGY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">The Clinical Improvement Lifecycle</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              We guide hospitals through a structured, 8-phase continuous optimization loop designed to minimize operational friction and maximize clinical compliance.
            </p>
          </div>

          {/* Large Screen Circular Diagram */}
          <div className="relative w-full max-w-[650px] h-[650px] mx-auto hidden md:block select-none">
            {/* Connecting Circle Loop (SVG) */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="38"
                className="stroke-ilmic-blue-light stroke-[2px] fill-none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="38"
                className="stroke-ilmic-blue stroke-[3px] fill-none"
                strokeDasharray={`${2 * Math.PI * 38}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 38 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 38 * (1 - (selectedProcessStep + 1) / 8) }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Central Information Box */}
            <div className="absolute inset-[24%] bg-white rounded-full shadow-2xl border border-ilmic-blue-light/60 p-8 flex flex-col justify-center items-center text-center z-10">
              <span className="text-[10px] font-black text-ilmic-blue uppercase tracking-widest mb-1.5">
                Phase 0{selectedProcessStep + 1}
              </span>
              <h4 className="text-lg font-extrabold text-ilmic-text mb-3 leading-snug">
                {processSteps[selectedProcessStep].title}
              </h4>
              <p className="text-ilmic-muted text-xs leading-relaxed max-w-[210px] font-medium">
                {processSteps[selectedProcessStep].desc}
              </p>
              
              {/* Stepper controls inside circle */}
              <div className="flex gap-2.5 mt-5">
                <button
                  onClick={() => setSelectedProcessStep((prev) => (prev - 1 + 8) % 8)}
                  className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-ilmic-text hover:bg-ilmic-blue hover:text-white transition-all text-xs font-bold"
                >
                  ←
                </button>
                <button
                  onClick={() => setSelectedProcessStep((prev) => (prev + 1) % 8)}
                  className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-ilmic-text hover:bg-ilmic-blue hover:text-white transition-all text-xs font-bold"
                >
                  →
                </button>
              </div>
            </div>

            {/* Step Nodes around the circle */}
            {processSteps.map((step, idx) => {
              // Calculate angles: 8 nodes, start at -90deg (top)
              const angle = (idx * 45 - 90) * (Math.PI / 180);
              const radius = 38; // matching SVG radius percentage
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const isActive = selectedProcessStep === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedProcessStep(idx)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
                    isActive
                      ? "bg-ilmic-blue text-white ring-8 ring-ilmic-blue-light/80 scale-110 z-20"
                      : "bg-white text-ilmic-text border border-ilmic-border hover:bg-ilmic-blue-soft z-10"
                  }`}
                >
                  <span className="text-[10px] font-bold opacity-60">Step</span>
                  <span className="text-sm font-black">{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Small Screen Mobile Accordion Steps List */}
          <div className="block md:hidden space-y-4">
            {processSteps.map((step, idx) => {
              const isActive = selectedProcessStep === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedProcessStep(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
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
                    <h4 className="font-bold text-ilmic-text text-sm">{step.title}</h4>
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

      {/* SECTION 5: SPECIALIZED SOLUTIONS (Alternating Layouts) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">TAILORED INFRASTRUCTURE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Specialized Hospital Architecture</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              We design state-of-the-art clinical units, ensuring seamless medical gas integration, ICU sterilizations, and digital database architectures.
            </p>
          </div>

          {/* Alternate Block 1: Hospital Design & Infrastructure Planning */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-200">
                <Image
                  src="/visuals/hospital_architecture.png"
                  alt="Modern Hospital Architecture Planning"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black text-ilmic-blue uppercase tracking-widest">
                01 / CLINICAL BLUEPRINTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-ilmic-text">
                Hospital Design & ICU Optimization Layouts
              </h3>
              <p className="text-ilmic-muted text-sm sm:text-base leading-relaxed font-medium">
                Designing clinical zones requires strict adherence to global health directives. We plan sterile cycles, map ICU airflow vectors to prevent contamination, and size emergency wings matching Emergency Severity Index (ESI) parameters.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Clean-room airflow designs",
                  "Laminar flow cycle separations",
                  "Emergency triage spatial loops",
                  "ICU bed deployment blueprints",
                  "Medical gas supply distributions",
                  "Operation theater spatial layouts"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <FiCheck className="text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alternate Block 2: Healthcare IT & EHR/EMR Integration */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black text-ilmic-blue uppercase tracking-widest">
                02 / HEALTHCARE TELEMETRY
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-ilmic-text">
                Healthcare IT & Interoperable EHR Platforms
              </h3>
              <p className="text-ilmic-muted text-sm sm:text-base leading-relaxed font-medium">
                Modern healthcare runs on clean data. We deploy interoperable Electronic Health Record (EHR) databases, ensuring immediate data exchange across pharmacy, billing, labs, and radiology using HL7 protocols.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "HL7 & FHIR integration compliance",
                  "Unified PACS imaging access",
                  "Central pharmacy inventory logs",
                  "Cloud EHR clinical records",
                  "Real-time laboratory databases",
                  "Automated queue analytics"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <FiCheck className="text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
                  alt="Healthcare Information Systems Integration"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Alternate Block 3: JCI, NABH & ISO Accreditations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                  alt="Medical Accreditation Auditing"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black text-ilmic-blue uppercase tracking-widest">
                03 / ACCREDITATION COMPLIANCE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-ilmic-text">
                JCI, NABH & ISO Quality Prep Auditing
              </h3>
              <p className="text-ilmic-muted text-sm sm:text-base leading-relaxed font-medium">
                We align clinical protocols with global standards to achieve accreditation. Our consultants perform mock runs, inspect sterilizations, configure safety documentation, and organize nursing quality committees.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "JCI international mock runs",
                  "NABH standards compliance checks",
                  "ISO 9001 quality frameworks",
                  "Antibiotic stewardship policies",
                  "Infection-control sterile cycles",
                  "Risk-mitigation committee logs"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <FiCheck className="text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: KEY PERFORMANCE IMPROVEMENTS (Animated Stats) */}
      <section className="py-20 bg-ilmic-blue text-white relative overflow-hidden">
        {/* Abstract circles */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue-light">OPERATIONAL IMPACT</span>
            <h2 className="text-3xl font-extrabold text-white">Target Benchmarks & Key Improvements</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="text-4xl sm:text-5xl font-black tracking-tight">
                  <Counter value={stat.value} suffix={stat.value.includes("+") ? "+" : "%"} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ilmic-blue-light">{stat.label}</h4>
                <p className="text-[10px] text-slate-350 leading-relaxed font-medium max-w-[150px] mx-auto">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY ILMIC */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">TRUST & EXCELLENCE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Why Boards Choose ILMIC Advisory</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              We combine years of hospital operations experience with clinical data tools, setting us apart from standard corporate generalists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, index) => (
              <div key={index} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col justify-between hover:border-ilmic-blue-light hover:bg-white transition-all">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-ilmic-blue-light/50 border border-ilmic-blue-light flex items-center justify-center text-ilmic-blue font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-extrabold text-ilmic-text text-base">{feat.title}</h4>
                  <p className="text-ilmic-muted text-xs leading-relaxed font-medium">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: INDUSTRIES WE SERVE */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">WHO WE PARTNER WITH</span>
            <h2 className="text-3xl font-extrabold text-ilmic-text">Institutions We Serve</h2>
            <p className="text-ilmic-muted font-medium text-xs sm:text-sm">
              We deploy custom operations consultants across specialized medical divisions globally.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: "Private Hospitals", desc: "Capital expansions & SOPs" },
              { name: "Government Hospitals", desc: "Clinical capacity optimizations" },
              { name: "Medical Colleges", desc: "Operational workflows & governance" },
              { name: "Diagnostic Centres", desc: "Equipment layout integrations" },
              { name: "Specialty Clinics", desc: "Triage & digital EHR modules" },
              { name: "Rehabilitation Centres", desc: "Patient experience mappings" },
              { name: "Healthcare Chains", desc: "Central billing & tech platforms" },
              { name: "Day Care Centres", desc: "Throughput cost reductions" },
              { name: "Corporate Hospitals", desc: "Comprehensive JCI preparation audits" },
              { name: "Medical Universities", desc: "Academic and clinical integrations" }
            ].map((ind, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-ilmic-border/30 text-center hover:-translate-y-1 transform transition-all shadow-sm flex flex-col justify-center min-h-[115px] space-y-1.5">
                <h4 className="font-bold text-ilmic-text text-sm">{ind.name}</h4>
                <p className="text-[10px] text-ilmic-muted font-semibold">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: CASE STUDIES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">SUCCESS STORIES</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Proven Performance Improvements</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              Explore how our analytical models and tailored layouts solved critical bottlenecks in real-world healthcare groups.
            </p>
          </div>

          {/* Desktop Interactive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left selector */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {caseStudies.map((study, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCaseStudy(idx)}
                  className={`p-6 text-left rounded-2xl border transition-all ${
                    activeCaseStudy === idx
                      ? "bg-ilmic-blue border-ilmic-blue text-white shadow-lg"
                      : "bg-slate-50 border-slate-100 text-ilmic-text hover:bg-slate-100"
                  }`}
                >
                  <h4 className="font-bold text-sm leading-snug">{study.name}</h4>
                  <p className={`text-[10px] font-medium mt-1 ${activeCaseStudy === idx ? "text-blue-100" : "text-ilmic-muted"}`}>
                    View case report
                  </p>
                </button>
              ))}
            </div>

            {/* Right details card */}
            <div className="lg:col-span-8 bg-slate-50 border border-slate-100 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-ilmic-text">
                  {caseStudies[activeCaseStudy].name}
                </h3>
                
                <div className="space-y-4 text-xs sm:text-sm font-medium leading-relaxed">
                  <div className="p-4 bg-red-50/50 border border-red-100 rounded-xl">
                    <h5 className="font-bold text-red-800 uppercase text-[10px] tracking-wider mb-1">Challenge</h5>
                    <p className="text-slate-700">{caseStudies[activeCaseStudy].challenge}</p>
                  </div>

                  <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                    <h5 className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider mb-1">Solution</h5>
                    <p className="text-slate-700">{caseStudies[activeCaseStudy].solution}</p>
                  </div>
                </div>

                {/* Before vs After stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-red-600 block mb-1">Before Advisory</span>
                    <p className="text-xs font-bold text-slate-800">{caseStudies[activeCaseStudy].results.before}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-emerald-600 block mb-1">After Advisory</span>
                    <p className="text-xs font-bold text-slate-800">{caseStudies[activeCaseStudy].results.after}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-black uppercase text-ilmic-blue block mb-1">Metrics Improvement</span>
                    <p className="text-xs font-bold text-slate-800">{caseStudies[activeCaseStudy].results.improvement}</p>
                  </div>
                </div>
              </div>

              {/* Side photo */}
              <div className="relative h-[220px] rounded-2xl overflow-hidden mt-6 bg-slate-200 border border-slate-100">
                <Image
                  src={caseStudies[activeCaseStudy].image}
                  alt={caseStudies[activeCaseStudy].name}
                  fill
                  className="object-cover animate-fade-in-up"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: TECHNOLOGY WE IMPLEMENT */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">HEALTHCARE SYSTEMS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Technologies We Integrate</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
              We deploy advanced digital tools to coordinate hospital accounting, records tracking, and patient throughput.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: "Healthcare ERP", desc: "Central payroll, supplier orders, and supply logs." },
              { name: "Hospital Information (HIS)", desc: "Integrating ward occupancy with diagnostic reporting." },
              { name: "EMR Platforms", desc: "Encrypted, interoperable clinical archives." },
              { name: "EHR Databases", desc: "Transferable patient history records across centers." },
              { name: "Patient Queue Systems", desc: "Predictive outpatient wait-time displays." },
              { name: "AI Analytics Dashboards", desc: "Automated bed occupancy forecasts." },
              { name: "Diagnostic PACS Systems", desc: "Cloud-based radiology image distribution." },
              { name: "Inventory Management", desc: "Real-time stock controls and barcode inputs." },
              { name: "Medical Billing Engines", desc: "Automatic insurance verification & auditing." },
              { name: "Digital Pharmacy Logs", desc: "Automated medication warnings and dosages." }
            ].map((tech, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-150 flex flex-col justify-between shadow-sm hover:border-ilmic-blue-light transition-all">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-ilmic-blue-soft flex items-center justify-center text-ilmic-blue text-xs font-bold">
                    {idx + 1}
                  </div>
                  <h4 className="font-extrabold text-ilmic-text text-sm leading-tight">{tech.name}</h4>
                  <p className="text-[10px] text-ilmic-muted font-medium leading-normal">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ SECTION */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">YOUR QUESTIONS ANSWERED</span>
            <h2 className="text-3xl font-extrabold text-ilmic-text">Hospital Advisory FAQs</h2>
          </div>

          <div className="space-y-4">
            {[
              { 
                q: "How does ILMIC improve hospital operational efficiency?", 
                a: "We deploy operations specialists directly onto the clinical floor to audit patient pathways, pharmacy stock flows, and emergency queue metrics. By reorganizing patient triage steps and deploying EMR-integrated queues, we reduce average waiting times and eliminate operational bottlenecks." 
              },
              { 
                q: "Can you consult for existing hospitals, or only new designs?", 
                a: "We work with both! For operating hospitals, we perform detailed diagnostics of tariff leakages, clinical workflows, and staff allocations to improve current margins. For new projects, we design architectural blueprints, coordinate medical device sourcing, and build SOPs from the ground up." 
              },
              { 
                q: "Do you support preparation for NABH and JCI accreditation audits?", 
                a: "Yes. Our consultants guide hospital teams through mock pre-audits, CSSD cycle validations, patient safety documentation, and ICU sterility updates, ensuring full compliance with national and international quality frameworks." 
              },
              { 
                q: "How do you coordinate new hospital layout designs?", 
                a: "We collaborate with specialized clinical architects to layout spatial plans matching strict isolation codes, clinical waste routes, and surgical pathway requirements. This ensures your facility complies with NABH/JCI physical setup codes from day one." 
              },
              { 
                q: "How long does a typical implementation project take?", 
                a: "A diagnostic audit takes 3 to 5 weeks. Setting up digital integrations or prepping clinical teams for accreditation runs over 3 to 6 months, depending on bed size, facility specialization, and staff headcount." 
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
                      <div className="p-6 text-ilmic-muted text-xs sm:text-sm leading-relaxed font-medium">
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

      {/* SECTION 12: FINAL CTA & LEAD CAPTURE FORM */}
      <section id="consultation-form" className="py-24 bg-gradient-to-br from-ilmic-blue-soft via-white to-slate-50 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e5a9e03_1px,transparent_1px),linear-gradient(to_bottom,#1e5a9e03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">GET STARTED NOW</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Build a Smarter, More Efficient Hospital</h2>
            <p className="text-ilmic-muted font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Partner with our healthcare management consultants to eliminate bottlenecks, minimize inventory losses, and secure international certifications.
            </p>
          </div>

          {/* Lead Capture Form Container */}
          <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-ilmic-border/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-ilmic-blue" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Executive / Director Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400"
                    placeholder="e.g. Dr. Aliyah Patel"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400"
                    placeholder="e.g. Hospital Director / CIO"
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400"
                    placeholder="e.g. director@hospital.com"
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400"
                    placeholder="e.g. +91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                  Healthcare Institution Type
                </label>
                <select
                  name="facilityType"
                  value={form.facilityType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium text-slate-700 bg-white"
                >
                  <option value="">Select facility type...</option>
                  <option value="Private Specialty Clinic">Private Specialty Clinic</option>
                  <option value="Tertiary Care Hospital">Tertiary Care Hospital</option>
                  <option value="Government Hospital Group">Government Hospital Group</option>
                  <option value="Medical College / University Hospital">Medical College / University Hospital</option>
                  <option value="Diagnostic Laboratory Group">Diagnostic Laboratory Group</option>
                  <option value="Healthcare Investment Group">Healthcare Investment Group</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                  Operational Challenges & Audit Scope
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-medium placeholder-slate-400"
                  placeholder="Outline bed capacity, location, accreditation goals (JCI, NABH, ISO), or key operational bottlenecks (billing delays, triage issues)..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-ilmic-blue hover:bg-ilmic-blue-dark text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm sm:text-base hover:-translate-y-0.5 transform disabled:bg-slate-300 disabled:transform-none"
              >
                {submitting ? "Sending Audit Request..." : "Schedule Operations Consultation"} <FiSend />
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pageType="hospital-management" 
      />
    </Layout>
  );
};

export default HospitalManagement;
