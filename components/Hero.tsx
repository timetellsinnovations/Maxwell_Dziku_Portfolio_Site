import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Layers, ArrowDown, Briefcase, Rocket, Globe, Zap } from 'lucide-react';
import Marquee from './ui/Marquee';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden bg-neutral-950">
      {/* Background Grid - Big Dirty Aesthetic */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-900 via-neutral-950 to-neutral-950 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top Tags / Stats Row */}
          <div className="flex flex-wrap items-center gap-4 mb-8 border-b border-neutral-800 pb-6">
             {/* Key Metric: 100+ Modules */}
             <span className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400 text-black text-sm font-bold font-mono uppercase tracking-widest hover:scale-105 transition-transform cursor-default">
              <Rocket size={16} /> 100+ Modules Launched
            </span>

             {/* Role Badge */}
             <span className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-700 bg-neutral-900 text-neutral-300 text-xs font-mono uppercase tracking-wider">
              <Briefcase size={14} className="text-lime-400" /> 
              <span className="text-lime-400 font-bold">Current:</span> Associate Mgr, Content Dev @ J&J Vision
            </span>

            <div className="hidden md:flex gap-2 ml-auto">
               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 text-neutral-500 text-[10px] font-mono uppercase">
                  <Layers size={12} /> Design
               </span>
               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 text-neutral-500 text-[10px] font-mono uppercase">
                  <Code2 size={12} /> Dev
               </span>
               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 text-neutral-500 text-[10px] font-mono uppercase">
                  <Cpu size={12} /> Automate
               </span>
            </div>
          </div>
          
          {/* Massive Typography - "Big Dirty" Style */}
          <h1 className="font-bold leading-[0.85] font-syne uppercase text-white mb-12 tracking-tighter mix-blend-normal" style={{ fontSize: 'clamp(4rem, 11vw, 10rem)' }}>
            Turning <br/>
            Complexity <br/>
            <span className="text-transparent stroke-text hover:text-lime-400 transition-colors duration-500 cursor-default">Into Clarity.</span>
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-end mt-8 border-t border-neutral-800 pt-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="md:col-span-7"
          >
            <p className="text-neutral-400 text-xl md:text-2xl leading-relaxed font-light">
              <span className="text-white font-bold">I build learning engines.</span> With 18+ years of experience delivering enterprise-grade solutions, I bridge the gap between Instructional Design and Full-Stack Engineering.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="md:col-span-5 flex justify-end gap-6 items-center"
          >
             {/* Stat Box */}
             <div className="hidden lg:block text-right">
                <div className="text-4xl font-bold text-lime-400 font-mono">18+</div>
                <div className="text-xs uppercase tracking-widest text-neutral-500">Years Experience</div>
             </div>

            <a 
              href="#work"
              className="flex items-center justify-center w-32 h-32 rounded-full bg-lime-400 text-black font-bold uppercase tracking-widest hover:scale-110 transition-transform focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none group"
              aria-label="Scroll to work section"
            >
                <div className="flex flex-col items-center gap-1">
                  <span>View Work</span>
                  <ArrowDown className="group-hover:translate-y-1 transition-transform duration-300" size={20} />
                </div>
            </a>
          </motion.div>
        </div>

        {/* Social Proof Strip - Brutalist Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 border-y border-neutral-800"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-neutral-800">
             {[
               { name: "J&J Vision", font: "font-syne" },
               { name: "NYU", font: "font-serif" },
               { name: "Johns Hopkins", font: "font-sans" },
               { name: "MedHub", font: "font-mono" },
               { name: "ProQuest", font: "font-syne" }
             ].map((brand, i) => (
                <div key={i} className="py-6 flex items-center justify-center text-neutral-500 grayscale hover:grayscale-0 hover:text-white hover:bg-neutral-900 transition-all duration-300 cursor-default">
                    <span className={`text-lg font-bold ${brand.font}`}>{brand.name}</span>
                </div>
             ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-16 bg-lime-400 py-3 transform -rotate-1 scale-105 shadow-xl shadow-lime-400/10">
        <div className="overflow-hidden whitespace-nowrap flex">
             <div className="flex min-w-full animate-marquee">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="mx-4 text-black font-bold uppercase font-mono tracking-widest flex items-center gap-4">
                        Instructional Design <Zap size={14} fill="black" /> Web Development <Zap size={14} fill="black" /> Automation <Zap size={14} fill="black" />
                    </span>
                ))}
             </div>
        </div>
      </div>
      
      {/* CSS for Outline Text */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 2px #fff;
        }
        .stroke-text:hover {
           -webkit-text-stroke: 2px #a3e635;
           color: transparent;
        }
        @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;