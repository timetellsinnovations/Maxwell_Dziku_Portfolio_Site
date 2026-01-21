import React, { useState } from 'react';
import Section from './ui/Section';
import { SERVICES, EXPERIENCE } from '../constants';
import { motion } from 'framer-motion';
import { Palette, Terminal, Workflow, ArrowUpRight, Database } from 'lucide-react';

const About: React.FC = () => {
  // DIRECTION: Create a 'public/assets' folder in your repo and upload your photo named 'profile.jpg'
  // If the file is not found, it will fallback to the avatar generator.
  const [imgSrc, setImgSrc] = useState("/assets/profile.jpg");

  return (
    <div className="bg-neutral-900 text-neutral-200">
      <Section id="about">
        <div className="grid md:grid-cols-12 gap-12 mb-32">
          {/* Bio Column */}
          <div className="md:col-span-5 flex flex-col gap-8">
            
            {/* Header + Photo */}
            <div className="flex flex-col gap-6">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-lime-400 p-1 relative group cursor-pointer shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-800">
                         {/* Image with fallback */}
                         <img 
                            src={imgSrc} 
                            onError={() => setImgSrc("https://ui-avatars.com/api/?name=Maxwell+Dziku&background=a3e635&color=000&size=512")}
                            alt="Maxwell Dziku"
                            loading="lazy"
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-lime-400/20 mix-blend-overlay group-hover:bg-transparent transition-all"></div>
                    </div>
                     <motion.div 
                        className="absolute -bottom-2 -right-2 bg-black text-lime-400 text-xs font-bold px-3 py-1 rounded-full border border-lime-400"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                     >
                        HIRE ME
                     </motion.div>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold uppercase text-white font-syne leading-none">
                    The Technical <br/><span className="text-lime-400">Edge</span>
                </h3>
            </div>
            
            <p className="text-lg text-neutral-400 leading-relaxed">
              Traditional Instructional Design has a ceiling. To break through, you need code.
              I bridge the gap between L&D and Engineering. From custom <strong>React applications</strong> to complex <strong>Python automation scripts</strong>, I create solutions that standard authoring tools can't touch.
            </p>
            
            {/* Visual Skill Stack */}
            <div className="space-y-4 mt-4">
                {[
                    { icon: Terminal, title: "Full Stack Dev", skills: "React, Next.js, Node.js, TypeScript", percent: "90%" },
                    { icon: Workflow, title: "Automation", skills: "Python, Zapier, n8n, OpenAI API", percent: "95%" },
                    { icon: Palette, title: "Instructional Design", skills: "Storyline, Camtasia, xAPI, Figma", percent: "100%" },
                    { icon: Database, title: "LMS Architecture", skills: "Sakai, Canvas, SCORM, API Integration", percent: "85%" }
                ].map((stack, i) => (
                    <div key={i} className="group">
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm">
                                <stack.icon size={16} className="text-lime-400" /> {stack.title}
                             </div>
                             <span className="text-xs text-neutral-500 font-mono">{stack.percent}</span>
                        </div>
                        <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden mb-2">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: stack.percent }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-lime-400"
                            />
                        </div>
                        <p className="text-xs text-neutral-500 font-mono">{stack.skills}</p>
                    </div>
                ))}
            </div>

            <a href="https://linkedin.com/in/maxwelldzikuinstructionaldesign/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lime-400 font-bold uppercase tracking-widest text-sm hover:text-white transition-colors mt-4">
              Let's Connect on LinkedIn <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Services Column */}
          <div className="md:col-span-7 scroll-mt-32" id="services">
            <h3 className="text-2xl font-mono text-white mb-8 uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-[2px] bg-lime-400 inline-block"></span> Capabilities
            </h3>
            <div className="grid gap-8">
              {SERVICES.map((service, idx) => (
                <div key={service.id} className="group border-b border-neutral-800 pb-8 transition-all duration-300 hover:pl-4 hover:border-lime-400">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-2xl font-bold text-white group-hover:text-lime-400 transition-colors">
                      {service.title}
                    </h4>
                    <span className="text-sm font-mono text-neutral-600">0{idx + 1}</span>
                  </div>
                  <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors max-w-2xl leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Timeline Visualized */}
        <div className="mt-32 relative">
          <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-neutral-800 md:left-1/2 md:-ml-[0.5px]"></div>
          
          <div className="text-center mb-16 relative z-10">
            <span className="bg-neutral-900 px-4 text-2xl font-mono text-lime-400 uppercase tracking-widest">Career Trajectory</span>
          </div>
          
          <div className="space-y-12">
            {EXPERIENCE.map((job, idx) => (
              <div key={job.id} className={`relative grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                
                {/* Dot on Timeline */}
                <div className="absolute left-[11px] md:left-1/2 md:-ml-[5px] w-[9px] h-[9px] rounded-full bg-lime-400 border-2 border-black z-10"></div>

                {/* Left Side (Content for Even, Empty for Odd on Desktop) */}
                <div className={`${idx % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12'} pl-12 md:pl-0`}>
                   <div className="group">
                        <span className="text-xl font-bold text-white block mb-1 group-hover:text-lime-400 transition-colors">{job.period}</span>
                        <span className="text-sm text-lime-400 font-mono uppercase mb-4 block tracking-wider">{job.company}</span>
                        <h4 className="text-2xl font-bold mb-3 text-white">{job.role}</h4>
                        <p className="text-neutral-400 mb-4 leading-relaxed text-sm md:text-base">{job.description}</p>
                        <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                            {job.skills.map(skill => (
                            <span key={skill} className="text-xs border border-neutral-700 bg-neutral-950 px-3 py-1 rounded-full text-neutral-300 hover:border-lime-400 transition-colors cursor-default">
                                {skill}
                            </span>
                            ))}
                        </div>
                   </div>
                </div>

                {/* Spacer for alternate side */}
                <div className={`${idx % 2 === 0 ? 'hidden md:block' : 'hidden md:block md:col-start-1'} `}></div>
                
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default About;