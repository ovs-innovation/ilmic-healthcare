import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Layout from "@layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import LeadServices from "@services/LeadServices";
import { notifySuccess, notifyError } from "@utils/toast";
import { 
  FiHeart, FiCheck, FiMapPin, FiCalendar, FiShield, 
  FiClock, FiStar, FiFileText, FiPlus, FiMinus, FiSend, 
  FiPhone, FiMail, FiMap, FiSmile, FiTrendingUp, FiActivity, 
  FiBriefcase, FiGlobe, FiUsers, FiAward, FiDollarSign, 
  FiHome, FiChevronRight
} from "react-icons/fi";
import { FaPlane } from "react-icons/fa";
import ConsultationModal from "@components/tourism/ConsultationModal";

const MedicalTourism = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", country: "", specialty: "" });
  const [submitting, setSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedProcessStep, setSelectedProcessStep] = useState(0);

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
        message: `[Country: ${form.country || "Not specified"}] [Specialty Needed: ${form.specialty || "Not specified"}] ${form.message}`,
        service: "Medical Tourism",
      });
      notifySuccess("Enquiry submitted successfully! Our International Patient team will contact you within 2 hours.");
      setForm({ name: "", email: "", phone: "", message: "", country: "", specialty: "" });
    } catch (err) {
      notifyError("Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const trustBadges = [
    { text: "24/7 Concierge Support", desc: "Constant contact assistance" },
    { text: "Fast Medical Visa Assistance", desc: "Embassy invitation in 48h" },
    { text: "Complimentary Airport Pickup", desc: "Private vehicle/ambulance transfer" },
    { text: "All-Inclusive Packages", desc: "Treatment, hotel & local logistics" }
  ];

  const stats = [
    { value: "95%", label: "Patient Satisfaction", desc: "Based on post-treatment feedback" },
    { value: "60%", label: "Lower Treatment Cost", desc: "Compared to US, UK, and Europe prices" },
    { value: "1000+", label: "International Patients", desc: "Successfully assisted across 15+ countries" },
    { value: "24/7", label: "Dedicated Support", desc: "Personal coordinator assigned to you" }
  ];

  const processSteps = [
    {
      step: "Step 1",
      title: "Share Medical Reports",
      icon: FiFileText,
      description: "Patients upload their diagnostic files and scans securely via our encrypted portal or WhatsApp."
    },
    {
      step: "Step 2",
      title: "Doctor Review",
      icon: FiUsers,
      description: "Free case evaluation by senior board-certified specialists at our JCI-partner network hospitals."
    },
    {
      step: "Step 3",
      title: "Treatment Plan",
      icon: FiHeart,
      description: "Receive a detailed cost outline, estimated hospital stay, and clinical approach within 24-48 hours."
    },
    {
      step: "Step 4",
      title: "Visa Assistance",
      icon: FiShield,
      description: "We issue official Medical Visa Invitation Letters (M-Visa) and facilitate embassy approval."
    },
    {
      step: "Step 5",
      title: "Travel Planning",
      icon: FaPlane,
      description: "Secure comfortable flight itineraries and premium partner guest accommodations near the facility."
    },
    {
      step: "Step 6",
      title: "Airport Pickup",
      icon: FiMapPin,
      description: "Our guest relation team receives you at the arrival terminal and transfers you directly to the hotel/clinic."
    },
    {
      step: "Step 7",
      title: "Hospital Admission",
      icon: FiHome,
      description: "Express VIP admission at the hospital concierge desk without any waiting lists or queues."
    },
    {
      step: "Step 8",
      title: "Treatment",
      icon: FiActivity,
      description: "Surgical or clinical care delivered by leading specialists using state-of-the-art medical technology."
    },
    {
      step: "Step 9",
      title: "Recovery",
      icon: FiSmile,
      description: "Post-operative nursing, physiotherapies, and luxury recovery stays configured for full wellness."
    },
    {
      step: "Step 10",
      title: "Return Home",
      icon: FiGlobe,
      description: "Complete your medical journey with digital telemetry checkups and teleconsultations from home."
    }
  ];

  const treatments = [
    {
      title: "Cancer Treatment (Oncology)",
      image: "https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Advanced radiation (CyberKnife), targeted chemotherapy, immunotherapy, and precision tumor surgeries guided by top oncologists.",
      features: ["CyberKnife Radiotherapy", "Precision Chemotherapy", "Robotic Tumor Resections"]
    },
    {
      title: "Cardiology & Heart Care",
      image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Comprehensive heart bypass surgery (CABG), valve replacements, pediatric cardiology, and minimally invasive angioplasties.",
      features: ["CABG Surgery", "Heart Valve Replacements", "Pediatric Cardiac Care"]
    },
    {
      title: "Orthopedics & Spine",
      image: "https://images.pexels.com/photos/7446990/pexels-photo-7446990.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Computer-assisted total knee and hip replacements, complex spine fusions, arthroscopic surgeries, and rehabilitation.",
      features: ["Total Knee & Hip Replacement", "Minimal Access Spine Fusion", "Sports Medicine & Rehab"]
    },
    {
      title: "Neurology",
      image: "https://images.pexels.com/photos/5863388/pexels-photo-5863388.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Advanced therapeutic treatments for stroke, Parkinson's disease, epilepsy, neurodegenerative diseases, and brain disorders.",
      features: ["Epilepsy Monitoring", "Parkinson's Deep Brain Therapy", "Stroke Neuro-rehabilitation"]
    },
    {
      title: "Neurosurgery",
      image: "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Microsurgical treatment for brain tumors, spinal trauma, brain aneurysms, and pediatric neurosurgical anomalies.",
      features: ["Micro-neurosurgery", "Brain Aneurysm Coiling", "Pediatric Spine Surgery"]
    },
    {
      title: "Kidney Care & Urology",
      image: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Laparoscopic donor nephrectomy, renal transplants, high-flux dialysis facilities, and treatment for kidney stones.",
      features: ["Renal Transplant Coordination", "Laparoscopic Nephrectomy", "Lithotripsy Stone Treatment"]
    },
    {
      title: "Liver & Biliary Care",
      image: "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Living donor liver transplants, cirrhosis treatment, gallbladder surgeries, and specialized hepatobiliary interventions.",
      features: ["Liver Transplant Programs", "Hepatitis & Cirrhosis Care", "Whipple Resections"]
    },
    {
      title: "Ophthalmology (Eye)",
      image: "https://images.pexels.com/photos/5752263/pexels-photo-5752263.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "State-of-the-art laser vision corrections (LASIK, Contoura), corneal transplants, robotic cataract surgeries, and glaucoma care.",
      features: ["Contoura Vision LASIK", "Corneal Graft Transplants", "Micro-incision Cataract Care"]
    },
    {
      title: "Plastic & Reconstructive",
      image: "https://images.pexels.com/photos/8376232/pexels-photo-8376232.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Advanced reconstructive surgeries following trauma or oncology, cleft lip restoration, and high-end aesthetic clinical procedures.",
      features: ["Trauma Micro-reconstruction", "Cleft Lip & Palate Repair", "Aesthetic Body Contouring"]
    },
    {
      title: "IVF & Fertility Care",
      image: "https://images.pexels.com/photos/7584492/pexels-photo-7584492.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Premium reproductive therapies including IVF, ICSI, egg freezing, and advanced genetic screenings under expert embryologists.",
      features: ["IVF & ICSI Treatments", "Blastocyst Culture Stays", "Preimplantation Genetics (PGT)"]
    },
    {
      title: "Dental Rehabilitation",
      image: "https://images.pexels.com/photos/3845806/pexels-photo-3845806.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Full-mouth implants, digital smile designs, complex maxillofacial surgeries, and aesthetic dental crowns using global materials.",
      features: ["All-on-4 Dental Implants", "Digital Smile Architecture", "Maxillofacial Trauma Repair"]
    },
    {
      title: "General & Laparoscopic",
      image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600",
      desc: "Minimally invasive keyhole surgeries for hernias, appendectomy, weight-loss bariatric surgeries, and abdominal diagnostics.",
      features: ["Laparoscopic Cholecystectomy", "Bariatric Gastric Sleeve", "Laser Hernia Repair"]
    }
  ];


  const supportServices = [
    {
      title: "Medical Visa Support",
      icon: FiShield,
      desc: "We coordinate directly with partner JCI hospital admin departments to issue formal Visa Invitation Letters in under 48 hours. Our team guides you and up to two attendants through the embassy requirements for a smooth M-Visa issuance."
    },
    {
      title: "Travel & Flight Logistics",
      icon: FaPlane,
      desc: "We assist in planning your flight itineraries, taking medical conditions into account. Our coordinators ensure your flight timeline aligns perfectly with your scheduled consultations and hospital admissions."
    },
    {
      title: "Hotel & Guest Suites",
      icon: FiHome,
      desc: "We offer pre-verified partner hotel bookings and recovery guest apartments located within a 1km radius of the hospital. All options feature high-speed internet, kitchenettes for dietary cooking, and 24/7 security."
    },
    {
      title: "Dedicated Translators",
      icon: FiGlobe,
      desc: "Language should never be a barrier to healing. We assign dedicated multilingual translation hosts fluent in Arabic, French, Swahili, and Russian to stay by your side during medical rounds and diagnostic visits."
    },
    {
      title: "Currency & Local Sim Support",
      icon: FiDollarSign,
      desc: "Upon landing, we assist in activating a local Indian SIM card and setting up secure currency exchanges. We also help coordinate transparent bank transfers or card payments directly to the hospital's billing desk."
    },
    {
      title: "24/7 Airport Reception",
      icon: FiMapPin,
      desc: "An ILMIC representative meets you right outside the airport arrival terminal. We coordinate premium private vehicle transfers. If a patient is critically ill, we arrange a fully equipped cardiac ambulance pickup from the tarmac."
    },
    {
      title: "Personal Hospital Escort",
      icon: FiUsers,
      desc: "We assign a personal medical coordinator who meets you every morning at the clinic. They handle your billing receipts, doctor schedules, pharmaceutical refills, and coordinate with nurses to save you time."
    },
    {
      title: "Dietary Food Management",
      icon: FiCheck,
      desc: "Good nutrition is vital for post-operative recovery. We organize customizable daily meal deliveries matching your requirements, including certified Halal food, continental menus, and sodium-controlled diets."
    },
    {
      title: "Post-Treatment Follow-up",
      icon: FiActivity,
      desc: "Our responsibility doesn't end when you fly back home. We schedule regular video consultations with your treating Indian surgeon and coordinate follow-up diagnostic timelines with clinics in your home country."
    }
  ];

  const countries = [
    { name: "Angola", flag: "🇦🇴", region: "Central Africa", hub: "Luanda Hub" },
    { name: "Nigeria", flag: "🇳🇬", region: "West Africa", hub: "Lagos / Abuja Hub" },
    { name: "Kenya", flag: "🇰🇪", region: "East Africa", hub: "Nairobi Hub" },
    { name: "Uganda", flag: "🇺🇬", region: "East Africa", hub: "Kampala Hub" },
    { name: "Tanzania", flag: "🇹🇿", region: "East Africa", hub: "Dar es Salaam Hub" },
    { name: "Dubai & UAE", flag: "🇦🇪", region: "Middle East", hub: "Dubai Hub" },
    { name: "Ghana", flag: "🇬🇭", region: "West Africa", hub: "Accra Hub" },
    { name: "Ethiopia", flag: "🇪🇹", region: "East Africa", hub: "Addis Ababa Hub" },
    { name: "South Africa", flag: "🇿🇦", region: "Southern Africa", hub: "Johannesburg Hub" },
    { name: "CIS Countries", flag: "🌐", region: "Central Asia", hub: "Tashkent / Baku Hub" },
    { name: "Middle East", flag: "🌐", region: "Gulf Region", hub: "Muscat / Baghdad Hub" }
  ];

  const whyChooseUsPillars = [
    {
      title: "Experienced Team",
      icon: FiUsers,
      desc: "Over a decade of hands-on expertise in international healthcare coordination, managing over 1,000+ patient arrivals."
    },
    {
      title: "Trusted Hospital Partners",
      icon: FiAward,
      desc: "We connect you only with top-tier JCI and NABH accredited multi-specialty hospitals, ensuring global standards of hygiene and care."
    },
    {
      title: "Affordable Clinical Packages",
      icon: FiDollarSign,
      desc: "Due to our corporate tie-ups, we secure up to 20-30% lower tariffs on procedures than direct international patient walk-in rates."
    },
    {
      title: "Complete Billing Transparency",
      icon: FiShield,
      desc: "No hidden charges, no middleman fees. You pay the hospital directly based on verified pre-departure estimations."
    },
    {
      title: "Personal Coordinator",
      icon: FiHeart,
      desc: "A single point-of-contact assigned to you for airport runs, translations, hotel issues, and medical document filings."
    },
    {
      title: "International Operations",
      icon: FiGlobe,
      desc: "Operating dedicated representative desks in Luanda (Angola), Nairobi (Kenya), and Dubai to coordinate your files locally."
    },
    {
      title: "24/7 Communication Desk",
      icon: FiClock,
      desc: "An active helpline and dedicated WhatsApp coordinator always available for emergency assistance during your travel."
    },
    {
      title: "Secure Digital Records",
      icon: FiFileText,
      desc: "We utilize HIPAA-compliant systems to transfer and store your diagnostic files, keeping your health history highly private."
    }
  ];



  const journeyFlow = [
    { title: "Patient Contacts ILMIC", desc: "Submit reports via online form or WhatsApp helpline" },
    { title: "Medical Review", desc: "Top surgeons evaluate clinical records in 24 hours" },
    { title: "Treatment Plan", desc: "Detailed cost quote and travel timeline provided" },
    { title: "Visa Issuance", desc: "Official hospital M-Visa invitation letter shared" },
    { title: "Travel & Arrival", desc: "Flight booked, personal coordinator receives at terminal" },
    { title: "Hospital Care", desc: "Priority admission, clinical consults, and surgery" },
    { title: "Recovery Care", desc: "Stay at post-op guest suite with nursing follow-ups" },
    { title: "Return Home", desc: "Fly back with digital telemedicine support schedules" }
  ];

  const testimonials = [
    {
      name: "Ahmed Al-Mansoori",
      country: "Oman",
      flag: "🇴🇲",
      treatment: "Cardiac Bypass (CABG)",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "The coordination by ILMIC was outstanding. The medical invitation was processed within 2 days, and a private host met us at Delhi airport. The surgery at Fortis was highly successful, and the pricing was completely transparent."
    },
    {
      name: "Mercy Wambui",
      country: "Kenya",
      flag: "🇰🇪",
      treatment: "Bilateral Knee Replacement",
      rating: 5,
      avatar: "https://images.pexels.com/photos/3807571/pexels-photo-3807571.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "I was suffering from severe arthritis. ILMIC helped me connect with a top orthopedics specialist in India. The package was 60% cheaper than treatments in London. The hotel arranged was neat and they provided custom Swahili guides."
    },
    {
      name: "Tariq Ibrahim",
      country: "Nigeria",
      flag: "🇳🇬",
      treatment: "Oncology CyberKnife Care",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "Finding correct cancer therapy is hard. ILMIC organized a rapid oncology board review. We traveled within a week. The hospital was highly advanced with state-of-the-art scanners. Exceptional support team."
    }
  ];

  const faqs = [
    {
      q: "How much does medical treatment cost in India compared to other countries?",
      a: "Medical treatments in India are highly cost-effective, typically costing 60% to 80% less than identical procedures in the US, UK, or Europe. For example, a heart bypass surgery that costs $100,000 in the US costs approximately $6,000 to $8,000 in JCI-accredited hospitals in India, maintaining the exact same clinical quality and safety protocols."
    },
    {
      q: "How long does it take to secure an Indian Medical Visa?",
      a: "Once our partner doctors review your reports and confirm the treatment plan, we issue an official Hospital Medical Invitation Letter (Visa Invitation Letter). With this letter, the Indian embassy in your country typically approves and stamps the M-Visa (Medical Visa) within 3 to 5 working days."
    },
    {
      q: "Can ILMIC arrange local hotels and recovery apartments?",
      a: "Yes, we handle all accommodation arrangements. We have tie-ups with premium 3-star and 4-star hotels, as well as fully-equipped recovery apartments close to the hospital. These apartments are designed for patient comfort, containing functional kitchens where your attendants can cook custom meals, Wi-Fi, and 24/7 help lines."
    },
    {
      q: "Will someone receive me at the airport upon arrival?",
      a: "Absolutely. A dedicated ILMIC patient relations representative will meet you at the airport arrival terminal, holding a placard with your name. They will transfer you directly to your hotel or hospital in a private vehicle. In critical cases, we arrange terminal tarmac transfers directly into a standby medical ambulance."
    },
    {
      q: "Do you provide language translators during my hospital stay?",
      a: "Yes, we assign a dedicated translator to guide you throughout your medical journey. We provide experienced hosts fluent in Arabic, French, Swahili, and Russian. They accompany you during consultations, diagnostic procedures, and manage administrative discussions at the hospital."
    },
    {
      q: "How can I send my medical reports for evaluation?",
      a: "You can securely upload your reports via our consultation form below, email them to our patient team, or send high-resolution photos of your scans directly to our WhatsApp support number. Our medical board evaluates the records and provides a clinical opinion in under 24 hours at no cost."
    }
  ];

  const specialtiesList = [
    "Oncology (Cancer)", "Cardiology (Heart)", "Orthopedics (Joint/Spine)", 
    "Neurology & Neurosurgery", "Nephrology & Urology", "Gastroenterology & Liver", 
    "Ophthalmology (Eye)", "IVF & Infertility", "Dental & Maxillofacial", "General Surgery"
  ];

  return (
    <Layout
      title="Medical Tourism in India | JCI Treatment Packages | ILMIC Health Care"
      description="World-class healthcare in India. Affordable JCI-accredited surgical packages with comprehensive medical visa support, translation hosts, and VIP airport reception."
    >
      {/* ── SECTION 1: PREMIUM CONCIERGE HERO ── */}
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden py-16 lg:py-24 border-b border-ilmic-border/30">
        <div className="absolute inset-0 bg-[radial-gradient(#1E5A9E_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l from-ilmic-blue-soft/80 to-transparent -z-10 hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-ilmic-blue-light border border-ilmic-border rounded-full text-ilmic-blue text-xs font-black uppercase tracking-widest">
                <FiGlobe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} /> 
                International Healthcare Solutions
              </div>
              
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-[#123F73] leading-[1.08] tracking-tight">
                  Medical Tourism in India
                </h1>
                <p className="text-xl sm:text-[30px] font-semibold text-[#334155] mt-3.5 leading-snug">
                  Safe, Affordable & World-Class Healthcare for International Patients
                </p>
              </div>
              
              <p className="text-ilmic-muted text-lg leading-relaxed max-w-2xl font-medium">
                ILMIC connects international patients to India's most celebrated, JCI-accredited super-specialty hospitals. Benefit from Ivy League-trained surgeons, state-of-the-art clinical infrastructure, and complete medical visa, travel, and translation concierge.
              </p>
              
              {/* Trust badges checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {trustBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-ilmic-blue-soft/70 border border-ilmic-border/40 p-3.5 rounded-2xl">
                    <div className="w-5 h-5 rounded-full bg-ilmic-blue text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <FiCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ilmic-text">{badge.text}</h4>
                      <p className="text-xs text-ilmic-muted mt-0.5">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center bg-ilmic-blue hover:bg-ilmic-blue-dark text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Book Consultation
                </button>
                <a 
                  href="https://wa.me/919999999999" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center bg-white hover:bg-ilmic-blue-soft border-2 border-ilmic-blue text-ilmic-blue px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  WhatsApp Support
                </a>
                <a 
                  href="#support-details" 
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-ilmic-muted hover:text-ilmic-blue transition-colors duration-200"
                >
                  Learn Process <FiChevronRight />
                </a>
              </div>
            </div>

            {/* Right Collaged Visual Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md h-[460px] sm:h-[540px] flex items-center justify-center">
                {/* Visual Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-ilmic-blue/10 rounded-full blur-3xl -z-10" />
                
                {/* Main Image Card */}
                <div className="absolute top-4 left-4 w-[85%] h-[75%] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                  <Image 
                    src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Doctor consultation with international patient" 
                    fill 
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                
                {/* Secondary Image Card */}
                <div className="absolute bottom-4 right-4 w-[60%] h-[45%] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 transform rotate-6 hover:rotate-0 transition-transform duration-500 z-30">
                  <Image 
                    src="https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Luxury hospital lobby environment" 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Floating Trust Badge */}
                <div className="absolute top-1/2 -left-6 bg-white border border-ilmic-border p-4 rounded-2xl shadow-xl flex items-center gap-3 z-40 transform -translate-y-1/2 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-10 h-10 rounded-xl bg-ilmic-blue-light text-ilmic-blue flex items-center justify-center shadow-inner">
                    <FiAward className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-ilmic-text uppercase tracking-wider">JCI Accredited</h5>
                    <p className="text-[10px] text-ilmic-muted font-bold">Top Tier Clinical Partner</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHY CHOOSE INDIA ── */}
      <section className="py-24 sm:py-32 bg-ilmic-blue-soft/60 relative border-b border-ilmic-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">Advantage India</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text tracking-tight">Why Global Patients Choose India For Healthcare</h2>
            <p className="text-ilmic-muted text-base sm:text-lg font-medium leading-relaxed">
              India has emerged as the premier global destination for complex surgeries, offering a unique combination of extreme affordability and clinical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Visual Map Concept & Stats */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative h-[280px] rounded-3xl overflow-hidden border border-ilmic-border/60 shadow-lg bg-white flex flex-col justify-center p-8">
                <div className="absolute inset-0 bg-[radial-gradient(#1E5A9E_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                <div className="relative z-10 text-center space-y-3">
                  <FiGlobe className="w-12 h-12 text-ilmic-blue mx-auto animate-pulse" />
                  <h3 className="text-xl font-bold text-ilmic-text">Connected Care Worldwide</h3>
                  <p className="text-sm text-ilmic-muted font-medium max-w-sm mx-auto">
                    Direct flights and logistics setups connecting India with African countries, Middle East regions, and CIS hubs.
                  </p>
                </div>
              </div>
              
              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white border border-ilmic-border/50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-2xl sm:text-3xl font-black text-ilmic-blue tracking-tight block">{stat.value}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-ilmic-text mt-1 uppercase tracking-wider">{stat.label}</h4>
                    <p className="text-[10px] sm:text-xs text-ilmic-muted font-medium mt-1 leading-relaxed">{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Descriptions List */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Affordable Treatment", desc: "Surgical and healthcare procedures cost up to 60-80% lower than identical plans in Europe or the US with matching safety profiles." },
                { title: "Experienced Doctors", desc: "Operations are led by board-certified chief surgeons, many trained at international institutions, carrying decades of surgery logs." },
                { title: "Latest Medical Technology", desc: "Facilities offer advanced technologies including CyberKnife stereotactic radiosurgery, robotic joint replacement, and 3T MRI." },
                { title: "Zero Waiting Periods", desc: "Immediately access clinical assessments, laboratory test panels, and schedule operating theatres without waiting weeks." },
                { title: "English-Speaking Teams", desc: "All surgeons, consultants, nursing teams, and personal relation hosts speak fluent English, ensuring clear communication." },
                { title: "Accredited JCI Hospitals", desc: "Treatments are coordinated within premium multi-specialty hospitals carrying prestigious JCI (USA) and NABH accreditations." },
                { title: "Medical Visa Support", desc: "Fast-tracked official Medical Visa (M-Visa) invitation letters are processed directly, making visa approvals seamless." },
                { title: "Healing Recovery Tourism", desc: "Combine medical therapies with specialized ayurveda, physical rehabilitation, and travel to beautiful Indian recovery sites." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-ilmic-border/30 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-ilmic-blue-light text-ilmic-blue flex items-center justify-center font-bold text-xs shadow-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-ilmic-text mt-3.5 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-ilmic-muted font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: COMPLETE PROCESS TIMELINE ── */}
      <section id="support-details" className="py-24 sm:py-32 bg-white border-b border-ilmic-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">Operational Flow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text tracking-tight">Our Structured Medical Tourism Process</h2>
            <p className="text-ilmic-muted text-base sm:text-lg font-medium leading-relaxed">
              We manage every details of your medical journey, from initial file assessments at home to hospital admission and flight follow-ups.
            </p>
          </div>

          {/* Interactive Stepper Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Steps Navigation */}
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin border-r border-ilmic-border/30">
              {processSteps.map((step, idx) => {
                const IconComponent = step.icon;
                const isActive = selectedProcessStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedProcessStep(idx)}
                    className={`w-full text-left p-4 rounded-xl flex items-center gap-4 transition-all duration-300 ${
                      isActive 
                        ? "bg-ilmic-blue text-white shadow-md font-bold" 
                        : "bg-ilmic-blue-soft text-ilmic-text hover:bg-ilmic-blue-light/50 border border-ilmic-border/20"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-extrabold ${isActive ? "bg-white text-ilmic-blue" : "bg-ilmic-blue-light text-ilmic-blue"}`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] uppercase font-bold tracking-widest block ${isActive ? "text-blue-200" : "text-ilmic-muted"}`}>
                        {step.step}
                      </span>
                      <h4 className="text-sm font-bold truncate mt-0.5">{step.title}</h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Step Detailed Display Card */}
            <div className="lg:col-span-8 bg-ilmic-blue-soft/50 border border-ilmic-border/40 p-8 rounded-3xl shadow-sm min-h-[300px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProcessStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-ilmic-blue uppercase tracking-widest">
                      ✦ {processSteps[selectedProcessStep].step} Detailed Step
                    </span>
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-ilmic-border/30 text-ilmic-blue">
                      {React.createElement(processSteps[selectedProcessStep].icon, { className: "w-6 h-6" })}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-ilmic-text">{processSteps[selectedProcessStep].title}</h3>
                  
                  <p className="text-ilmic-muted text-base leading-relaxed font-medium">
                    {processSteps[selectedProcessStep].description}
                  </p>

                  <div className="bg-white border border-ilmic-border/20 p-4 rounded-xl flex items-start gap-3 mt-4">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs text-ilmic-text font-bold leading-relaxed">
                      ILMIC guarantees complete assistance during this phase, coordinating directly with hospital medical desks.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between items-center pt-8 border-t border-ilmic-border/30 mt-8">
                <button
                  disabled={selectedProcessStep === 0}
                  onClick={() => setSelectedProcessStep(prev => prev - 1)}
                  className="px-4 py-2 text-xs font-bold text-ilmic-blue hover:text-ilmic-blue-dark disabled:text-slate-300 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous Step
                </button>
                <button
                  disabled={selectedProcessStep === processSteps.length - 1}
                  onClick={() => setSelectedProcessStep(prev => prev + 1)}
                  className="px-5 py-2 bg-ilmic-blue hover:bg-ilmic-blue-dark text-white rounded-lg font-bold text-xs transition-colors shadow-sm disabled:bg-slate-200 disabled:cursor-not-allowed"
                >
                  Next Step →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: TREATMENTS WE ARRANGE ── */}
      <section className="py-24 sm:py-32 bg-ilmic-blue-soft/50 border-b border-ilmic-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">Clinical Specialties</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text tracking-tight">Specialty Treatments We Arrange In India</h2>
            <p className="text-ilmic-muted text-base sm:text-lg font-medium leading-relaxed">
              We coordinate high-quality treatment packages for major complex surgeries at top Indian hospital groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl overflow-hidden border border-ilmic-border/30 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              >
                {/* Image Wrap */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <Image 
                    src={treatment.image} 
                    alt={treatment.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-ilmic-blue text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    Clinical Care
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-ilmic-text group-hover:text-ilmic-blue transition-colors duration-200">
                      {treatment.title}
                    </h3>
                    <p className="text-xs text-ilmic-muted font-medium leading-relaxed">
                      {treatment.desc}
                    </p>
                    
                    {/* Features list */}
                    <div className="pt-2 space-y-1.5">
                      {treatment.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-ilmic-text">
                          <FiCheck className="text-emerald-500 w-3.5 h-3.5 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      setForm(f => ({ ...f, specialty: specialtiesList[idx] || specialtiesList[0] }));
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center w-full py-3.5 bg-ilmic-blue-soft hover:bg-ilmic-blue text-ilmic-blue hover:text-white rounded-xl text-xs font-bold transition-colors duration-300 shadow-inner group-hover:shadow-md cursor-pointer"
                  >
                    Request Medical Plan
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 5: INTERNATIONAL PATIENT SUPPORT (Alternating Layout) ── */}
      <section className="py-24 sm:py-32 bg-white border-b border-ilmic-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content List */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">Concierge Desk</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text tracking-tight">Full-Service International Patient Support</h2>
                <p className="text-ilmic-muted text-base font-medium leading-relaxed">
                  Medical travel can feel stressful. We coordinate all logistics, accommodation, visa clearance, and local translation escorts so you can focus entirely on recovery.
                </p>
              </div>

              {/* alternating layout items inside grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {supportServices.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <div key={idx} className="bg-ilmic-blue-soft/40 border border-ilmic-border/30 p-5 rounded-2xl space-y-3 hover:bg-white hover:shadow-md transition-all duration-300">
                      <div className="w-9 h-9 rounded-xl bg-ilmic-blue text-white flex items-center justify-center shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-ilmic-text">{service.title}</h3>
                      <p className="text-xs text-ilmic-muted font-medium leading-relaxed">{service.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Premium Coordinator Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image 
                  src="https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Personal medical coordinator helper" 
                  fill 
                  className="object-cover"
                  unoptimized
                />
                
                {/* Floating details overlay */}
                <div className="absolute bottom-6 inset-x-6 bg-white/95 backdrop-blur-sm border border-ilmic-border p-5 rounded-2xl shadow-xl space-y-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="text-amber-500 fill-current w-3.5 h-3.5" />
                    ))}
                  </div>
                  <h4 className="text-sm font-bold text-ilmic-text">Dedicated Guest Executive</h4>
                  <p className="text-xs text-ilmic-muted font-medium leading-relaxed">
                    Every patient is matched with a dedicated coordinator, assisting with translation and billing.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 6: COUNTRIES WE SERVE (Interactive Grid) ── */}
      <section className="py-24 sm:py-32 bg-ilmic-blue-soft/60 border-b border-ilmic-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">Global Network</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text tracking-tight">Active Patient Hubs & Regions We Serve</h2>
            <p className="text-ilmic-muted text-base sm:text-lg font-medium leading-relaxed">
              We operate dedicated clinical representation lines and visa help desks in major hubs across Africa, Middle East, and Central Asia.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {countries.map((country, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-ilmic-border/50 p-6 rounded-2xl text-center flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl filter drop-shadow-sm select-none">{country.flag}</div>
                <div>
                  <h4 className="font-bold text-ilmic-text text-sm sm:text-base leading-tight">{country.name}</h4>
                  <span className="text-[10px] text-ilmic-blue uppercase font-extrabold tracking-widest block mt-1">
                    {country.region}
                  </span>
                </div>
                <div className="text-[10px] text-ilmic-muted font-bold pt-2 border-t border-slate-100">
                  {country.hub}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 7: WHY CHOOSE ILMIC (Trust feature cards) ── */}
      <section className="py-24 sm:py-32 bg-white border-b border-ilmic-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">Trust Pillars</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text tracking-tight">Why International Patients Trust ILMIC</h2>
            <p className="text-ilmic-muted text-base sm:text-lg font-medium leading-relaxed">
              We stand apart through our commitment to ethical medical care, complete transparency, and patient-first services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-ilmic-blue-soft/30 border border-ilmic-border/20 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-ilmic-blue-light text-ilmic-blue flex items-center justify-center shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-ilmic-text leading-snug">{pillar.title}</h3>
                    <p className="text-xs text-ilmic-muted font-medium leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="w-8 h-1 bg-ilmic-blue/20 rounded-full group-hover:w-full transition-all duration-300" />
                </div>
              );
            })}
          </div>

        </div>
      </section>



      {/* ── SECTION 9: PATIENT JOURNEY ILLUSTRATION (Flowchart stepper) ── */}
      <section className="py-24 sm:py-32 bg-white border-b border-ilmic-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">Visual Map</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text tracking-tight">Your Patient Journey Step-by-Step</h2>
            <p className="text-ilmic-muted text-base sm:text-lg font-medium leading-relaxed">
              A high-level view of your complete medical path, representing total safety at every juncture.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-ilmic-blue-light -translate-y-1/2 z-10 hidden lg:block" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-6 relative z-20">
              {journeyFlow.map((step, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-ilmic-border/30 p-5 rounded-2xl text-center space-y-3 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-ilmic-blue text-white flex items-center justify-center mx-auto text-sm font-black shadow-md border-4 border-white">
                    0{idx + 1}
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-ilmic-text leading-tight">{step.title}</h4>
                  <p className="text-[10px] text-ilmic-muted leading-relaxed font-bold">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 10: PATIENT TESTIMONIALS ── */}
      <section className="py-24 sm:py-32 bg-ilmic-blue-soft/60 border-b border-ilmic-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ilmic-text tracking-tight">Stories Of Healing From Our Patients</h2>
            <p className="text-ilmic-muted text-base sm:text-lg font-medium leading-relaxed">
              Read verified feedback from patients who traveled to India for specialized clinical treatments through ILMIC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-ilmic-border/30 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Rating & treatment info */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <FiStar key={i} className="text-amber-500 fill-current w-4 h-4" />
                      ))}
                    </div>
                    <span className="text-[10px] text-ilmic-blue uppercase font-black tracking-wider bg-ilmic-blue-light px-2.5 py-1 rounded-full">
                      {t.treatment}
                    </span>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-ilmic-text text-sm leading-relaxed italic font-medium">
                    "{t.text}"
                  </p>
                </div>

                {/* Patient Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-ilmic-border/40 bg-slate-50">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-ilmic-text text-sm">{t.name}</h4>
                    <span className="text-xs text-ilmic-muted font-bold flex items-center gap-1 mt-0.5">
                      {t.flag} {t.country} Patient
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 11: FREQUENTLY ASKED QUESTIONS ── */}
      <section className="py-24 sm:py-32 bg-white border-b border-ilmic-border/20">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">Support Desk</span>
            <h2 className="text-3xl font-extrabold text-ilmic-text tracking-tight">Frequently Asked Questions</h2>
            <p className="text-ilmic-muted text-sm sm:text-base font-medium">
              Find answers to the most common queries raised by global medical travelers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-ilmic-border/50 rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left bg-ilmic-blue-soft/30 hover:bg-ilmic-blue-light/50 flex justify-between items-center transition-colors font-bold text-ilmic-text text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <FiMinus className="text-ilmic-blue" /> : <FiPlus className="text-ilmic-blue" />}
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="p-5 sm:p-6 bg-white border-t border-ilmic-border/20 text-ilmic-muted text-sm leading-relaxed font-medium">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── SECTION 12: STRONG CALL TO ACTION & CONSULTATION FORM ── */}
      <section id="quote-form" className="py-24 sm:py-32 bg-ilmic-blue-soft/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Left Action Banner Grid */}
            <div className="lg:col-span-5 bg-gradient-to-br from-ilmic-blue to-ilmic-blue-dark text-white rounded-3xl p-8 sm:p-12 flex flex-col justify-between gap-8 shadow-xl">
              <div className="space-y-6">
                <span className="inline-flex px-3.5 py-1 bg-white/15 border border-white/20 rounded-full text-blue-100 text-[10px] font-black uppercase tracking-widest">
                  International Coordinator Team
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-[1.1] tracking-tight text-white">
                  Need Medical Treatment in India?
                </h2>
                <p className="text-blue-100 text-sm leading-relaxed font-medium">
                  Our patient care team is online to analyze your files, schedule free doctor teleconsultations, and issue medical visa invites.
                </p>
                
                <div className="space-y-3.5 pt-4">
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-4 h-4 text-blue-200" />
                    <span className="text-xs font-bold text-blue-50">+91 99999 99999</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="w-4 h-4 text-blue-200" />
                    <span className="text-xs font-bold text-blue-50">tourism@ilmichealthcare.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMapPin className="w-4 h-4 text-blue-200" />
                    <span className="text-xs font-bold text-blue-50">New Delhi Support Center, India</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4">
                <a 
                  href="tel:+919999999999" 
                  className="bg-white hover:bg-blue-50 text-ilmic-blue font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all duration-300"
                >
                  Call Helpline
                </a>
                <a 
                  href="https://wa.me/919999999999" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all duration-300"
                >
                  WhatsApp Now
                </a>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-ilmic-border/50 shadow-xl flex flex-col justify-between">
              <div className="space-y-2 mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-ilmic-blue">Online Inquiry</span>
                <h3 className="text-2xl font-black text-ilmic-text">Request Medical Estimate</h3>
                <p className="text-xs text-ilmic-muted font-medium">Please provide case details below. We guarantee a full medical proposal in 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-muted uppercase tracking-widest mb-1.5">Patient Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-ilmic-text placeholder-slate-400 font-medium"
                      placeholder="e.g. Ahmed Al-Mansoori"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-muted uppercase tracking-widest mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-ilmic-text placeholder-slate-400 font-medium"
                      placeholder="e.g. name@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-muted uppercase tracking-widest mb-1.5">Phone / WhatsApp Number *</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-ilmic-text placeholder-slate-400 font-medium"
                      placeholder="e.g. +968 9912 3456"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-muted uppercase tracking-widest mb-1.5">Patient Country</label>
                    <input
                      type="text"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-ilmic-text placeholder-slate-400 font-medium"
                      placeholder="e.g. Oman"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-ilmic-muted uppercase tracking-widest mb-1.5">Clinical Specialty Needed</label>
                    <select
                      name="specialty"
                      value={form.specialty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-ilmic-text font-medium bg-white"
                    >
                      <option value="">Select Specialty</option>
                      {specialtiesList.map((spec, i) => (
                        <option key={i} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col justify-end">
                    <span className="text-[10px] text-ilmic-muted font-medium mb-1 select-none">
                      🔒 HIPAA Compliant encrypted data storage
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-ilmic-muted uppercase tracking-widest mb-1.5">Medical File Summary & Symptoms</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ilmic-blue text-ilmic-text placeholder-slate-400 font-medium"
                    placeholder="Briefly describe the current diagnoses, medical scans done, or specific dates preferred..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-ilmic-blue hover:bg-ilmic-blue-dark disabled:bg-slate-300 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {submitting ? "Sending..." : "Submit Enquiry Request"} <FiSend />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        pageType="medical-tourism" 
      />
    </Layout>
  );
};

export default MedicalTourism;
