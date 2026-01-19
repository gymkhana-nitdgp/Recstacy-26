import React from 'react';
import { motion } from 'framer-motion';

const SponsorsPage: React.FC = () => {
  // Placeholder data
  const tiers = [
    { name: "Title Sponsor", count: 1, height: "h-64" },
    { name: "Platinum Sponsors", count: 2, height: "h-40" },
    { name: "Gold Sponsors", count: 4, height: "h-32" }
  ];

  return (
    <div className="min-h-screen w-full bg-black text-[#FFEBD0] pt-32 pb-20 px-6 font-[family-name:var(--font-man-of-space)]">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,235,208,0.3)]">
          Our Sponsors
        </h1>
        <div className="h-1 w-24 bg-[#FFEBD0] mx-auto mt-6 rounded-full opacity-50" />
      </motion.div>

      {/* Grid of Placeholders */}
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {tiers.map((tier, tierIndex) => (
          <div key={tier.name} className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-white/40 uppercase tracking-[0.2em] mb-8 text-center">
              {tier.name}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              {Array.from({ length: tier.count }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`${tier.height} w-full md:w-auto md:min-w-[300px] flex-1 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group`}
                >
                  <span className="text-white/20 font-bold text-xl uppercase tracking-widest group-hover:text-white/40 transition-colors">
                    Logo {i + 1}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SponsorsPage;