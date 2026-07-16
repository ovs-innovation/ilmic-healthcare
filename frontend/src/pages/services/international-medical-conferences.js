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
  FiTool, FiCheckCircle, FiVolume2, FiBookOpen, FiMapPin, FiCalendar, FiStar
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

const InternationalMedicalConferences = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", designation: "", organization: "", attendanceMode: "", cmeRequired: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedProcessStep, setSelectedProcessStep] = useState(0);
  const [activeRegion, setActiveRegion] = useState("India");

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
        message: `[Organization: ${form.organization || "Not specified"}] [Designation: ${form.designation || "Not specified"}] [Mode: ${form.attendanceMode || "Not specified"}] [CME Needed: ${form.cmeRequired || "Not specified"}] ${form.message}`,
        service: "International Medical Conferences",
      });
      notifySuccess("Registration submitted successfully! Our events desk will contact you within 2 hours with delegate passes.");
      setForm({ name: "", email: "", phone: "", message: "", designation: "", organization: "", attendanceMode: "", cmeRequired: "" });
    } catch (err) {
      notifyError("Failed to submit registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // 1. Hero Floating Glass Cards
  const glassCards = [
    { title: "International Speakers", desc: "Keynotes led by board-certified clinicians.", delay: 0.1 },
    { title: "Global Delegates", desc: "Connecting medical groups across 50+ nations.", delay: 0.2 },
    { title: "CME Learning", desc: "Earn accredited professional development hours.", delay: 0.3 },
    { title: "Healthcare Innovation", desc: "Discover digital clinical software solutions.", delay: 0.4 },
    { title: "Scientific Sessions", desc: "Peer-reviewed abstract presentations.", delay: 0.5 }
  ];

  // 2. Conference Types (12 Types Grid)
  const conferenceTypes = [
    { title: "Medical Conferences", desc: "Large-scale annual scientific assemblies presenting peer-reviewed research panels, clinical trials updates, and diagnostic breakthroughs.", image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=600&q=80" },
    { title: "Healthcare Summits", desc: "High-level roundtables matching hospital owners, administrators, government chiefs, and healthcare groups to analyze system optimization.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80" },
    { title: "Scientific Symposiums", desc: "Deep specialized medical focus sessions detailing oncology protocols, molecular diagnostics, precision medicine, and clinical governance.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" },
    { title: "Clinical Workshops", desc: "Hands-on surgical training courses, emergency triage drills, and diagnostic equipment mock checkups in simulation labs.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80" },
    { title: "CME Programs", desc: "Continuing Medical Education modules accredited by national and international medical boards to fulfill doctor licensing rules.", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80" },
    { title: "Hospital Leadership", desc: "Operational and financial workshops discussing tariff structures, hospital workflows, and patient experience checklists.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80" },
    { title: "Medical Technology Expo", desc: "Showcasing advanced diagnostic PACS, cloud EMR databases, robotic surgical arms, and modern hospital accessories.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80" },
    { title: "Pharmaceutical Forums", desc: "Connecting wholesale importers, medicine exporters, FDA regulators, and GMP laboratories to analyze global trade paths.", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80" },
    { title: "Innovation Panels", desc: "Showcasing AI diagnostics, telemedicine software setups, and automated pharmacy stock algorithms.", image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=600&q=80" },
    { title: "Research Congress", desc: "Academic poster presentations, medical paper readings, and global clinical registry updates for medical students.", image: "https://images.unsplash.com/photo-1504813184591-01557010c722?w=600&q=80" },
    { title: "Education Programs", desc: "Medical curriculum updates, university alliance programs, and postgraduate training paths.", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80" },
    { title: "Global Networking", desc: "Social delegate dinners, regional trade tables, and partnership agreements for international buyers.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80" }
  ];

  // 3. Event Experience (10 Steps)
  const eventExperience = [
    { step: "Registration", desc: "Submit doctor credentials, verify L/C delegate vouchers, and download the digital summit badges." },
    { step: "Welcome", desc: "Receive welcoming packages, local transport shuttle cards, and digital guides of the exhibition hall." },
    { step: "Opening Ceremony", desc: "Welcome address led by ILMIC directors and national health ministers, establishing the event goals." },
    { step: "Keynote Sessions", desc: "Senior surgeons present peer-reviewed research papers and clinical trial results on oncology and cardiology." },
    { step: "Panel Discussions", desc: "Multi-national roundtables debating telemedicine logistics, hospital capex planning, and WHO-GMP guidelines." },
    { step: "Hands-on Workshops", desc: "Interactive surgical simulators, ventilator calibrations, and diagnostic report checkups in clinical labs." },
    { step: "Networking Lounge", desc: "Connect with hospital owners, importers, and biomedical engineers during designated coffee and dinner slots." },
    { step: "Exhibition Area", desc: "Walk through medical hardware displays showing modern ICU beds, shadowless lamps, and EMR software." },
    { step: "Awards Ceremony", desc: "Recognizing outstanding academic posters, innovative medical designs, and regional hospital operations." },
    { step: "Closing Session", desc: "Concluding remarks, distribution of accredited CME point certificates, and scheduling of next assemblies." }
  ];

  // 4. Featured Topics (12 Topics)
  const featuredTopics = [
    { title: "AI in Healthcare", desc: "Machine learning diagnostic scans, automated triage priorities, and predictive patient bed-occupancy algorithms." },
    { title: "Digital Health Systems", desc: "Deploying secure patient portals, central pharmacy barcode scans, and real-time laboratory databases." },
    { title: "Telemedicine Tech", desc: "High-speed encrypted video consultancy setups and mobile patient records integrations across clinics." },
    { title: "Hospital Innovation", desc: "Streamlining OPD queues, auditing surgical drapes sterility, and reducing ICU throughput wait-times." },
    { title: "Medical Research", desc: "Conducting multi-center double-blind clinical trials and publishing abstract documents in journals." },
    { title: "Precision Medicine", desc: "Targeting chemotherapy based on genetic tumor sequencing and optimizing personalized dosage grids." },
    { title: "Robotic Surgery", desc: "Minimally invasive operations using robotic arms, reducing patient recovery timelines and incision pain." },
    { title: "Cancer Care (Oncology)", desc: "Integrating CyberKnife therapies, radiation checklists, and targeted monoclonal antibodies." },
    { title: "Cardiology Advancements", desc: "Restructuring bypass surgical pathways, pediatric valve installations, and coronary stents checks." },
    { title: "Neurology Diagnostics", desc: "Evaluating neurodegenerative indicators, MRI scans, and stroke neuro-rehabilitation protocols." },
    { title: "Public Health Policy", desc: "Developing global health guidelines, clinical waste safety protocols, and vaccine shipping monitoring." },
    { title: "Healthcare Capex", desc: "Formulating medical equipment acquisition roadmaps and private hospital project finances." }
  ];

  // 5. Why Attend (8 Items)
  const whyAttendFeatures = [
    { title: "Learn from Global Experts", desc: "Gain clinical insights directly from senior board-certified surgeons and medical university professors." },
    { title: "Earn CME Credit Points", desc: "Earn certified Professional Development Hours required to renew your licensing with medical councils." },
    { title: "Discover Clinical Tech", desc: "Test active ICU monitors, electric surgical tables, and digital EMR platforms in our exhibition halls." },
    { title: "Meet Global Delegates", desc: "Exchange ideas with healthcare administrators, medical researchers, and distributors from over 50 nations." },
    { title: "Expand Professional Network", desc: "Establish business partnerships with hospital owners, global trade importers, and pharma exporters." },
    { title: "Industry Collaborations", desc: "Participate in roundtables matching clinical laboratories with hardware manufacturers." },
    { title: "Research Presentations", desc: "Upload and present your scientific abstracts to secure peer-reviewed journal publications." },
    { title: "Technology Demonstrations", desc: "Observe live surgery broadcasts and hands-on simulation drills under consultant supervision." }
  ];

  // 6. Speakers List
  const speakers = [
    { name: "Dr. Arthur Mwangi", hospital: "Nairobi Cardiac Group", specialization: "Cardiology", country: "Kenya", bio: "Leading researcher in pediatric valve installations with 20+ years of surgical board experience in East Africa." },
    { name: "Prof. Elena Petrova", hospital: "Moscow Medical Center", specialization: "Intensive Care", country: "Russia", bio: "Specializes in ICU sterility workflows, ETO verification cycles, and emergency triage pathways." },
    { name: "Dr. Adebayo Adesina", hospital: "Lagos University Hospital", specialization: "Oncology", country: "Nigeria", bio: "Board-certified oncologist focusing on precision chemotherapy protocols and tumor sequencing." }
  ];

  // 7. Global Participation Nodes
  const globalNodes = [
    { country: "India", flag: "🇮🇳", count: "1200+ Delegates" },
    { country: "UAE", flag: "🇦🇪", count: "450+ Delegates" },
    { country: "Saudi Arabia", flag: "🇸🇦", count: "350+ Delegates" },
    { country: "Qatar", flag: "🇶🇦", count: "200+ Delegates" },
    { country: "Nigeria", flag: "🇳🇬", count: "600+ Delegates" },
    { country: "Kenya", flag: "🇰🇪", count: "500+ Delegates" },
    { country: "South Africa", flag: "🇿🇦", count: "300+ Delegates" },
    { country: "United Kingdom", flag: "🇬🇧", count: "250+ Delegates" },
    { country: "Germany", flag: "🇩🇪", count: "200+ Delegates" },
    { country: "United States", flag: "🇺🇸", count: "400+ Delegates" },
    { country: "Singapore", flag: "🇸🇬", count: "350+ Delegates" },
    { country: "Malaysia", flag: "🇲🇾", count: "200+ Delegates" }
  ];

  // 8. Stats
  const stats = [
    { value: "100+", label: "International Speakers", desc: "Surgeons, professors, and industry leaders." },
    { value: "50+", label: "Countries Represented", desc: "Delegates across global medical boards." },
    { value: "5000+", label: "Delegates Trained", desc: "Attending hybrid and onsite sessions." },
    { value: "250+", label: "Scientific Sessions", desc: "CME lectures, simulation labs, and panels." },
    { value: "100+", label: "Research Papers", desc: "Published in international journals." },
    { value: "50+", label: "Industry Partners", desc: "Hospitals, universities, and OEMs." }
  ];

  // 9. Testimonials
  const testimonials = [
    {
      name: "Dr. Farah Al-Mansoori",
      country: "Abu Dhabi, UAE",
      title: "Cardiologist & Dean",
      review: "The CME Oncology Summit organized by ILMIC provided outstanding clinical panels. The 15 CME points earned were automatically logged with our medical council. The hybrid stream was flawless.",
      logoText: "FA",
      rating: 5
    },
    {
      name: "Prof. Joseph Kiprop",
      country: "Eldoret, Kenya",
      title: "Oncology Lead Professor",
      review: "Presenting our abstract on robotic surgery workflows was a highlight. The networking dinner matched us with biomedical suppliers in India to upgrade our lab. Highly professional setup.",
      logoText: "JK",
      rating: 5
    },
    {
      name: "Marcus Thorne",
      country: "London, UK",
      title: "Healthcare Group CIO",
      review: "The Technology Expo showcases active EMR and telemetry tools that we are now integrating across our clinics. A must-attend medical congress for operational administrators.",
      logoText: "MT",
      rating: 5
    }
  ];

  return (
    <Layout
      title="International Medical Conferences & CME summits | ILMIC Health Care"
      description="Organizing CME-accredited scientific medical conferences, hybrid healthcare summits, hands-on doctor workshops, and surgical training seminars."
    >
      {/* Background Styling: Event Connected Network nodes (Sleek light-blue dot grid) */}
      <div className="bg-[radial-gradient(#1e5a9e08_1.5px,transparent_1.5px)] bg-[size:24px_24px] min-h-screen">

        {/* SECTION 1: HERO SECTION (Summit & Academy Theme) */}
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-ilmic-blue-light/35 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-slate-100 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-ilmic-blue/10 border border-ilmic-blue/20 rounded-full text-xs font-black uppercase tracking-wider text-ilmic-blue"
                >
                  <FiGlobe className="animate-spin-slow text-ilmic-blue" /> International Medical Conferences
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ilmic-text leading-tight"
                >
                  Connecting Global <br className="hidden sm:inline" />
                  <span className="text-ilmic-blue">Healthcare Leaders</span> Through Knowledge
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-ilmic-muted text-base sm:text-lg max-w-2xl leading-relaxed font-semibold"
                >
                  ILMIC Health Care organizes international medical conferences, healthcare summits, scientific meetings, workshops, and networking events that bring together medical experts, hospitals, researchers, pharmaceutical companies, and healthcare innovators from around the world.
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-4 pt-2"
                >
                  <a
                    href="#registration-form"
                    className="px-6 py-4 bg-ilmic-blue hover:bg-ilmic-blue-dark text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 hover:-translate-y-0.5 transform"
                  >
                    Register Interest <FiArrowRight />
                  </a>
                  <a
                    href="#categories"
                    className="px-6 py-4 bg-white border border-ilmic-border hover:bg-ilmic-blue-soft text-ilmic-text font-bold rounded-xl transition-all flex items-center gap-2 hover:-translate-y-0.5 transform"
                  >
                    Upcoming Events
                  </a>
                  <a
                    href="#registration-form"
                    className="px-6 py-4 bg-ilmic-blue-soft hover:bg-ilmic-blue-light text-ilmic-blue font-bold rounded-xl transition-all flex items-center gap-2"
                  >
                    Partner With Us
                  </a>
                </motion.div>
              </div>

              {/* Right Side Visual with floating glass cards */}
              <div className="lg:col-span-5 relative mt-10 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative mx-auto max-w-[450px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-slate-200"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=800&q=80"
                    alt="International medical conference delegates auditorium"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ilmic-text/40 to-transparent" />
                </motion.div>

                {/* Floating Badges */}
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

        {/* SECTION 2: ABOUT OUR CONFERENCES */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Left Image */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-4 bg-ilmic-blue-light/30 rounded-[40px] -z-10" />
                <div className="relative aspect-[3/4] rounded-[30px] overflow-hidden shadow-xl border border-slate-100 bg-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
                    alt="Doctors networking during medical congress"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right text descriptions */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">
                  PROFESSIONAL DEVELOPMENT
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">
                  Bridging Clinical Research with Global Medical Education
                </h2>
                
                <div className="space-y-4 text-ilmic-muted text-sm sm:text-base leading-relaxed font-medium">
                  <p>
                    ILMIC Health Care organizes CME-accredited scientific medical conferences, hybrid webinars, hands-on doctor workshops, and surgical training seminars. Continuous medical education (CME) and professional development (CPD) are mandatory for doctor license extensions, and our events division coordinates agendas directly with accredited medical councils to deliver certified credit hours.
                  </p>
                  <p>
                    Our summits serve as global platforms for medical researchers to present poster sessions, publish abstracts, and showcase advanced diagnostics technology. By bridging senior surgeons, hospital CEOs, pharmaceutical manufacturers, and biomedical engineers, we foster knowledge exchange and international trade alliances.
                  </p>
                  <p>
                    From live operating-room streams to hands-on suture simulation labs, our conferences inspire innovation, encourage B2B networking, and help shape sustainable healthcare guidelines globally.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    { title: "Accredited CME Credits", desc: "Verified points logged with international medical boards." },
                    { title: "Hands-on Suture Labs", desc: "Live Operating Room streaming and simulator exercises." },
                    { title: "Abstract Publications", desc: "Peer-reviewed academic research poster slots." },
                    { title: "B2B Trade Networks", desc: "Connecting hospital administrators and medical manufacturers." }
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

        {/* SECTION 3: OUR CONFERENCE TYPES (12 Cards Grid) */}
        <section id="categories" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">SUMMIT PORTFOLIO</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Conference & Summit Frameworks</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Discover our specialized conference types designed to deliver clinical education, technology expos, and B2B medical supply connections.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {conferenceTypes.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-150 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-[200px] overflow-hidden bg-slate-200">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
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
                      href="#registration-form"
                      className="inline-flex items-center gap-1.5 text-xs font-black text-ilmic-blue hover:text-ilmic-blue-dark transition-colors"
                    >
                      Learn More <FiArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: EVENT EXPERIENCE (Horizontal Timeline Infographic) */}
        <section className="py-24 bg-white border-y border-slate-100 overflow-x-auto select-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">DELEGATE EXPERIENCE</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">The Scientific Assembly Experience</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Review the structured itinerary configured to optimize delegate learning, network roundtables, and workshop hours.
              </p>
            </div>

            {/* Horizontal Timeline Wrapper */}
            <div className="flex gap-6 pb-6 min-w-[1200px]">
              {eventExperience.map((exp, idx) => (
                <div key={idx} className="w-[280px] bg-slate-50 p-6 rounded-2xl border border-slate-150 relative flex flex-col justify-between shadow-sm hover:border-ilmic-blue-light transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
                      <span className="text-[10px] font-black text-ilmic-blue uppercase tracking-widest">Phase 0{idx + 1}</span>
                      <span className="w-6 h-6 rounded-full bg-ilmic-blue/10 text-ilmic-blue font-bold text-[10px] flex items-center justify-center">
                        ✔
                      </span>
                    </div>
                    <h4 className="font-extrabold text-ilmic-text text-sm leading-tight">{exp.step}</h4>
                    <p className="text-ilmic-muted text-[11px] leading-relaxed font-semibold">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: FEATURED TOPICS */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">SCIENTIFIC TOPICS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Key Clinical Research Topics</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                We coordinate presentations detailing advanced surgical models, precision medicine, and hospital digital innovations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredTopics.map((topic, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm hover:border-ilmic-blue-light transition-all">
                  <div className="space-y-3">
                    <FiBookOpen className="text-ilmic-blue w-6 h-6" />
                    <h4 className="font-bold text-ilmic-text text-sm leading-snug">{topic.title}</h4>
                    <p className="text-ilmic-muted text-[11px] leading-relaxed font-semibold">{topic.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: WHY ATTEND */}
        <section className="py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">CONGRESS VALUE</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Why Register for ILMIC Assemblies</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Acquire international CME credits, present peer-reviewed abstracts, and inspect cutting-edge medical devices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyAttendFeatures.map((feat, index) => (
                <div key={index} className="p-8 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col justify-between hover:border-ilmic-blue-light hover:bg-white transition-all shadow-sm">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-ilmic-blue font-bold text-sm">
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

        {/* SECTION 7: SPEAKERS & FACULTY */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">FACULTY PANEL</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Distinguished Keynote Speakers</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Meet the veteran surgeons, research directors, and hospital administrators heading our clinical sessions.
              </p>
            </div>

            {/* Profiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {speakers.map((spk, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-ilmic-blue/10 text-ilmic-blue flex items-center justify-center font-bold text-sm">
                      {spk.name.charAt(0)}{spk.name.split(" ")[1]?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base leading-tight">{spk.name}</h4>
                      <span className="text-[10px] text-slate-400 font-bold block mt-1">{spk.specialization} - {spk.hospital}</span>
                    </div>
                    <p className="text-ilmic-muted text-xs leading-relaxed font-semibold italic">
                      "{spk.bio}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-ilmic-blue uppercase tracking-wider">
                    <span>{spk.country}</span>
                    <span>★ Keynote Speaker</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: GLOBAL PARTICIPATION */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">ATTENDEE ORIGINS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Global Delegate Attendance</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Connecting clinicians across major medical hubs, universities, and pharmaceutical groups globally.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {globalNodes.map((node, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2 hover:-translate-y-1 transform transition-all shadow-sm">
                  <span className="text-2xl">{node.flag}</span>
                  <h4 className="font-bold text-ilmic-text text-sm leading-snug">{node.country}</h4>
                  <p className="text-[10px] text-ilmic-muted font-semibold">{node.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: EVENT GALLERY */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">SUMMIT VISUALS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Congress & Exhibition Gallery</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Preview our live operating room streams, panel roundtables, and hands-on simulation labs.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=600&q=80",
                "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
                "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
                "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80",
                "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80",
                "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80",
                "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80"
              ].map((img, idx) => (
                <div key={idx} className="relative h-[220px] rounded-2xl overflow-hidden shadow-sm group bg-slate-200 border border-slate-150">
                  <Image
                    src={img}
                    alt="Sourcing items gallery"
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: OUR PARTNERS (Logo Wall) */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h4 className="text-xs font-black uppercase tracking-widest text-ilmic-blue mb-10">
              ACCREDITED UNIVERSITIES & HOSPITAL GROUPS
            </h4>
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              {["Fortis Hospital Group", "Nairobi Cardiology Board", "Moscow Clinical Academy", "Grace Hospitals Group", "Eldoret Medical University", "Mumbai Quality Council"].map((partner, idx) => (
                <div key={idx} className="px-6 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-black text-slate-700 text-xs shadow-sm hover:border-ilmic-blue-light transition-all">
                  🏢 {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: EVENT STATISTICS */}
        <section className="py-20 bg-ilmic-blue text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue-light">CONGRESS METRICS</span>
              <h2 className="text-3xl font-extrabold text-white">Delegate & Scientific Sessions Volume</h2>
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

        {/* SECTION 12: TESTIMONIALS */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">TESTIMONIALS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Academic Delegate Reviews</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base leading-relaxed">
                Discover how our CME accredited lectures and B2B summits support doctors and healthcare administrators.
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
                    <span>CME Accredited</span>
                    <span>★★★★★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 13: FAQ ACCORDION */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">FREQUENTLY ASKED</span>
              <h2 className="text-3xl font-extrabold text-ilmic-text">Conferences & Registration FAQs</h2>
            </div>

            <div className="space-y-4">
              {[
                { 
                  q: "How do I register for upcoming summits and workshops?", 
                  a: "You can submit your doctor credential details and preferred attendance mode (hybrid or onsite) in our lead capture form. Our events desk will issue a proforma delegate invoice and send you your digital entry pass." 
                },
                { 
                  q: "Can I become a speaker or present an academic research abstract?", 
                  a: "Yes. ILMIC coordinates abstract submission windows. You can submit your scientific PDF files. Selected posters are presented during clinical panels and published in partner medical journals." 
                },
                { 
                  q: "Do you provide CME credit point certificates?", 
                  a: "Yes, all our congress lectures, hands-on simulation labs, and interactive webinars are accredited by medical councils. Certificates with registered credit loggers are dispatched via email after checkouts." 
                },
                { 
                  q: "Are CME credits accepted internationally?", 
                  a: "Yes, our CME points are structured to comply with international CPD standards, allowing doctors from UAE, UK, Africa, and India to renew their clinical licenses." 
                },
                { 
                  q: "Can companies sponsor booths in the exhibition hall?", 
                  a: "Yes, pharmaceutical groups, medical accessories suppliers, and software developers can acquire exhibition slots. We provide turnkey booth setup, lighting, and delegate lead integrations." 
                },
                { 
                  q: "Do you support government healthcare ministry coordination?", 
                  a: "Yes, we coordinate public health summits, organizing venues, transport, international delegate invitations, and security protocols matching government clearances." 
                },
                { 
                  q: "Are virtual or hybrid conference options available?", 
                  a: "Yes, we deploy high-speed hybrid streams, enabling remote delegates to check live surgery broadcasts, submit questions to keynote panels, and complete audits to earn certificates." 
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

        {/* SECTION 14: FINAL CTA & REGISTRATION FORM */}
        <section id="registration-form" className="py-24 bg-gradient-to-br from-ilmic-blue-soft via-white to-slate-50 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e5a9e03_1px,transparent_1px),linear-gradient(to_bottom,#1e5a9e03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">DELEGATE ENROLMENT</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text">Join the Future of Healthcare</h2>
              <p className="text-ilmic-muted font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Be part of world-class medical conferences that inspire innovation, foster collaboration, and shape the future of healthcare worldwide.
              </p>
            </div>

            {/* Registration Form */}
            <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-ilmic-border/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-ilmic-blue" />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                      Delegate / Coordinator Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold placeholder-slate-400 bg-slate-50/50"
                      placeholder="e.g. Prof. Joseph Kiprop"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                      University / Hospital Name *
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={form.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold placeholder-slate-400 bg-slate-50/50"
                      placeholder="e.g. Nairobi Medical University"
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
                      placeholder="e.g. dean@university.edu"
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
                      placeholder="e.g. +254 712 345678"
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
                      placeholder="e.g. Dean of Oncology"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                      Attendance Preference
                    </label>
                    <select
                      name="attendanceMode"
                      value={form.attendanceMode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold text-slate-700 bg-white"
                    >
                      <option value="">Select attendance...</option>
                      <option value="Onsite Delegate (Physical)">Onsite Delegate (Physical)</option>
                      <option value="Virtual Delegate (Livestream)">Virtual Delegate (Livestream)</option>
                      <option value="Scientific Abstract Speaker">Scientific Abstract Speaker</option>
                      <option value="Exhibition Booth Sponsor">Exhibition Booth Sponsor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                      CME Credit Points Required
                    </label>
                    <select
                      name="cmeRequired"
                      value={form.cmeRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold text-slate-700 bg-white"
                    >
                      <option value="">CME credits needed?</option>
                      <option value="Yes (Need Certificate)">Yes (Need Certificate)</option>
                      <option value="No (Attendance Only)">No (Attendance Only)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-ilmic-text uppercase tracking-widest mb-2">
                    Research Abstract Topic & Sponsoring Scope
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-sm font-semibold placeholder-slate-400 bg-slate-50/50"
                    placeholder="Outline abstract focus (e.g. robotic surgery outcomes), special logistics needs, or booth specifications for exhibition hall..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-ilmic-blue hover:bg-ilmic-blue-dark text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm sm:text-base hover:-translate-y-0.5 transform disabled:bg-slate-350 disabled:transform-none"
                >
                  {submitting ? "Sending Registration details..." : "Register Pass & Partner Events"} <FiSend />
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default InternationalMedicalConferences;
