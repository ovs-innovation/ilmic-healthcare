import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiShield, FiTrendingUp, FiGlobe } from 'react-icons/fi';

const BenefitCard = ({ icon: Icon, title, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-sm border border-white/8 rounded-2xl group hover:bg-white/10 hover:border-white/15 transition-all duration-300"
  >
    <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#ED1C24]/20 border border-[#ED1C24]/20 flex items-center justify-center text-[#ED1C24] group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-white/90 font-bold text-sm tracking-wide">{title}</span>
  </motion.div>
);

const ModernCategoryBanner = () => {
  return (
    <section className="bg-[#051124] py-8 sm:py-10 overflow-hidden relative">
      {/* Decorative rings */}
      <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
         className="absolute -top-32 -left-32 w-80 h-80 border border-white/[0.04] rounded-full pointer-events-none"
      />
      <motion.div 
         animate={{ rotate: -360 }}
         transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
         className="absolute -bottom-32 -right-32 w-[450px] h-[450px] border border-white/[0.03] rounded-full pointer-events-none"
      />

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
           <div className="lg:w-2/5 w-full text-center lg:text-left">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
             >
               <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">
                 Why PowerQ
               </div>
               <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-black mb-4 leading-tight tracking-tight">
                 The Future of <span className="text-[#ED1C24]">Power</span>
               </h3>
               <div className="w-10 h-1 bg-[#ED1C24] rounded-full" />
             </motion.div>
           </div>

           <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <BenefitCard icon={FiZap} title="Instant Energy" delay={0.1} />
              <BenefitCard icon={FiShield} title="Certified Safety" delay={0.15} />
              <BenefitCard icon={FiTrendingUp} title="Power Analytics" delay={0.2} />
              <BenefitCard icon={FiGlobe} title="Global Standards" delay={0.25} />
           </div>
        </div>
      </div>
      
      {/* Edge gradients */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#051124] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#051124] to-transparent pointer-events-none" />
    </section>
  );
};

export default ModernCategoryBanner;
