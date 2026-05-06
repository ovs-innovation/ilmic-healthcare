import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCheckCircle, FiShield, FiClock } from 'react-icons/fi';

const StatCard = ({ icon: Icon, count, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative p-5 sm:p-8 rounded-2xl bg-white border border-gray-100 flex flex-col items-center text-center group overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Subtle hover bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      
      <div className="relative z-10 w-14 h-14 mb-5 rounded-xl bg-red-50 flex items-center justify-center text-[#ED1C24] group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6" />
      </div>
      
      <h3 className="relative z-10 text-3xl sm:text-4xl font-black text-[#0b1d3d] mb-2 tracking-tighter">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        >
          {count}
        </motion.span>
      </h3>
      <p className="relative z-10 text-gray-400 font-bold tracking-widest uppercase text-[10px]">
        {label}
      </p>
    </motion.div>
  );
};

const HomeStatsSection = () => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-[#f8fafc]">
      {/* Subtle background blobs */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-red-50 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      <div className="absolute -right-20 bottom-0 w-72 h-72 bg-blue-50 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-12 relative z-10">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-5 rounded-full bg-red-50 text-[#ED1C24] text-[10px] font-black uppercase tracking-[0.2em] border border-red-100"
          >
            Our Impact
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight"
          >
            Excellence in <span className="text-[#ED1C24]">Power & Safety</span>
          </motion.h2>
          <motion.div
             initial={{ scaleX: 0 }}
             whileInView={{ scaleX: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="w-16 h-1 bg-[#ED1C24] mx-auto rounded-full mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed"
          >
            We've spent a decade building trust through uncompromising quality and safety standards. See our journey through numbers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          <StatCard icon={FiUsers} count="2.5k+" label="Satisfied Clients" delay={0.1} />
          <StatCard icon={FiCheckCircle} count="580+" label="Projects Done" delay={0.2} />
          <StatCard icon={FiShield} count="12+" label="Certifications" delay={0.3} />
          <StatCard icon={FiClock} count="15yrs+" label="Experience" delay={0.4} />
        </div>
      </div>
    </section>
  );
};

export default HomeStatsSection;
