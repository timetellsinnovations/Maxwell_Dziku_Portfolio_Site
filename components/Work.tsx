import React, { useState } from 'react';
import Section from './ui/Section';
import { PROJECTS, SOCIAL_LINKS } from '../constants';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const Work: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <Section id="work" className="relative z-10 bg-neutral-950">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-neutral-800 pb-6 gap-6">
        <h2 className="text-5xl md:text-8xl font-bold uppercase text-white font-syne leading-[0.9]">
          Selected <br/><span className="text-transparent stroke-white text-lime-400/20">Work</span>
        </h2>
        <a 
          href={SOCIAL_LINKS.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 text-neutral-400 hover:text-lime-400 hover:bg-lime-400/10 transition-all uppercase tracking-widest text-sm font-bold border border-neutral-800 px-6 py-3 rounded-full hover:border-lime-400 focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none"
        >
          Archive <ExternalLink size={16} />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-32">
        {PROJECTS.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            viewport={{ once: true, margin: "-10%" }}
            className={`group relative flex flex-col ${index % 2 === 1 ? 'md:mt-32' : ''}`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block relative overflow-hidden mb-8 bg-neutral-900 cursor-pointer rounded-sm shadow-2xl shadow-black group-hover:shadow-lime-400/10 transition-all duration-500 focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none"
            >
              <div className="absolute inset-0 bg-lime-400/0 group-hover:bg-lime-400/10 transition-colors duration-500 z-10"></div>
              <img 
                src={project.image} 
                alt={project.title} 
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              <div className="absolute top-4 right-4 z-20 overflow-hidden">
                 {/* Mobile Fix: Button is always visible on mobile (translate-y-0) and only animates on desktop (md:translate-y-full) */}
                 <span className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest translate-y-0 md:translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                   {project.cta || "View Project"} <ArrowUpRight size={14} />
                 </span>
              </div>
            </a>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 items-start">
                <div className="flex flex-wrap gap-2">
                    {project.category.split('•').map((tag, i) => (
                        <span key={i} className="inline-block text-lime-400 text-[10px] font-mono tracking-widest uppercase px-2 py-1 border border-lime-400/20 bg-lime-400/5 rounded hover:bg-lime-400 hover:text-black transition-colors">
                            {tag.trim()}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-baseline w-full">
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none rounded"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-lime-400 transition-colors leading-tight">
                        {project.title}
                        </h3>
                    </a>
                    <span className="text-neutral-600 font-mono text-sm shrink-0 pl-4">{project.year}</span>
                </div>
              </div>
              
              <p className="text-neutral-400 leading-relaxed max-w-md text-sm md:text-base border-l border-neutral-800 pl-4">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Work;