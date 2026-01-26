import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Layers, ArrowDown, Briefcase } from 'lucide-react';
import Marquee from './ui/Marquee';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-900 via-neutral-950 to-neutral-950 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-xs font-mono uppercase tracking-wider">
              <Layers size={14} /> Design
            </span>
             <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-xs font-mono uppercase tracking-wider">
              <Code2 size={14} /> Dev
            </span>
             <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-xs font-mono uppercase tracking-wider">
              <Cpu size={14} /> Automate
            </span>
             {/* HR Priority: Current Role Badge */}
             <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 text-xs font-mono uppercase tracking-wider">
              <Briefcase size={14} className="text-lime-400" /> Associate Manager, Content Dev @ J&J Vision
            </span>
          </div>
          
          {/* Fluid Typography using clamp() for best-in-class responsiveness */}
          <h1 className="font-bold leading-[0.95] md:leading-[0.9] font-syne uppercase text-white mb-8 tracking-tight" style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}>
            Learning <br/>
            Engineered <br/>
            <span className="text-lime-400">For Scale.</span>
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-end mt-12 gap-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-xl"
          >
            <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
              <strong>18+ years</strong> building learning engines for Fortune 500 companies. With <strong>100+ modules</strong> launched across <strong>50+ medical institutions</strong>, I bridge the gap between Instructional Design and Engineering.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="hidden md:flex gap-4 items-center"
          >
            <div className="flex flex-col items-center gap-2 group">
                <div className="w-24 h-24 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center group-hover:border-lime-400 transition-colors">
                    <Code2 className="text-neutral-500 group-hover:text-lime-400 transition-colors" size={32} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">My Stack</span>
            </div>
            
            <a 
              href="#work"
              className="flex flex-col items-center gap-2 group cursor-pointer"
              aria-label="Scroll to work section"
            >
                <div className="w-24 h-24 rounded-full bg-lime-400 flex items-center justify-center hover:scale-110 transition-transform focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none">
                    <ArrowDown className="text-black group-hover:translate-y-1 transition-transform duration-300" size={32} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-lime-400">View Work</span>
            </a>
          </motion.div>
        </div>

        {/* Social Proof Strip - "Trusted By" */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 pt-8 border-t border-neutral-900"
        >
          <p className="text-xs font-mono uppercase text-neutral-600 mb-4 tracking-widest">Trusted by teams at</p>
          <div className="flex flex-wrap gap-8 md:gap-16 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text representation for logos to ensure no broken images, stylized to look like logos */}
            <span className="text-xl font-bold font-syne text-neutral-400">J&J Vision</span>
            <span className="text-xl font-bold font-serif text-neutral-400">NYU</span>
            <span className="text-xl font-bold font-sans text-neutral-400 tracking-tighter">Johns Hopkins</span>
            <span className="text-xl font-bold font-mono text-neutral-400">MedHub</span>
            <span className="text-xl font-bold font-syne text-neutral-400">ProQuest</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 md:mt-24 border-y border-neutral-900 py-10 bg-neutral-950">
        <Marquee text="Instructional Design