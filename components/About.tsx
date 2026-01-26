import React, { useState } from 'react';
import Section from './ui/Section';
import { SERVICES, EXPERIENCE } from '../constants';
import { motion } from 'framer-motion';
import { Palette, Terminal, Workflow, ArrowUpRight, Database, Award, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  // Resilient image loading using GitHub Raw Content
  // This links directly to the file in your public/assets folder on GitHub
  const [imgSrc, setImgSrc] = useState("https://raw.githubusercontent.com/timetellsinnovations/Maxwell_Dziku_Portfolio_Site/main/public/assets/profile.JPG");
  const fallbackImg = "https://ui-avatars.com/api/?name=Maxwell+Dziku&background=a3e635&color=000&size=512";

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
                         <img 
                            src={imgSrc} 
                            onError={() => setImgSrc(fallbackImg)}
                            alt="Maxwell Dziku"
                            loading="lazy"
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-lime-400/20 mix-blend-overlay group-hover:bg-transparent transition-all"></div>
                    </div>
                     <motion.div 
                        className="absolute -bottom-2 -right-2 bg-black text-lime-400 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full border border-lime-400 whitespace-nowrap shadow-lg shadow-lime-400/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                     >
                        ALWAYS BUILDING
                     </motion.div>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold uppercase text-white font-syne leading-none">
                    The Technical <br/><span className="text-lime-400">Edge</span>
                </h3>
            </div>
            
            <p className="text-lg text-neutral-400 leading-relaxed">
              I don't just design courses—I build learning engines. With <strong>18+ years</strong> in instructional design and educational technology, I've delivered solutions for Fortune 500 companies, academic institutions, and healthcare organizations including <strong>Johnson & Johnson Vision</strong>, <strong>NYU</strong>, <strong>Johns Hopkins</strong>, and <strong>MedHub</strong>.
            </p>

            <p className="text-lg text-neutral-400 leading-relaxed border-l-2 border-lime-400 pl-4">
              I specialize in translating complex, technical subject matter into clear, engaging learning experiences. Whether it's medical procedures, compliance regulations, or software workflows—I work closely with SMEs to distill expertise into content that learners actually retain.
            </p>

            {/* Impact Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-neutral-800 py-6 my-2">
                <div>
                    <span className="text-3xl font-bold text-white font-syne block">18+</span>
                    <span className="text-xs text-neutral-500 uppercase tracking-widest">Years Experience</span>
                </div>
                 <div>
                    <span className="text-xl md:text-2xl font-bold text-white font-syne block mt-1">Global</span>
                    <span className="text-xs text-neutral-500 uppercase tracking-widest">Enterprise Reach</span>
                </div>
                 <div>
                    <span className="text-xl md:text-2xl font-bold text-white font-syne block mt-1">Full-Stack</span>
                    <span className="text-xs text-neutral-500 uppercase tracking-widest">Design & Code</span>
                </div>
                 <div>
                    <span className="text-xl md:text-2xl font-bold text-white font-syne block mt-1">Diverse</span>
                    <span className="text-xs text-neutral-500 uppercase tracking-widest">Healthcare & EdTech</span>
                </div>
            </div>

             {/* Credentials */}
            <div className="space-y-3">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Credentials</h4>
                 <div className="flex items-center gap-3 text-sm text-white">
                    <GraduationCap size={16} className="text-lime-400" />
                    <span>MA, Educational Technology (UM-Flint)</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-white">
                    <GraduationCap size={16} className="text-lime-400" />
                    <span>MA, Educational Administration (Concordia)</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-white">
                    <Award size={16} className="text-lime-400" />
                    <span>MIT xPRO VR/AR Certified</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-white">
                    <Award size={16} className="text-lime-400" />
                    <span>Google Project Management Professional</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-white">
                    <Award size={16} className="text-lime-400" />
                    <span>WalkMe DAP Builder Certified</span>
                 </div>
            </div>
            
            {/* Visual Skill Stack */}
            <div className="space-y-6 mt-4 border-t border-neutral-800 pt-6">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Tech Stack</h4>
                {[
                    { icon: Terminal, title: "Full Stack Dev", skills: "React, Next.js, Node.js, TypeScript", level: "Expert" },
                    { icon: Workflow, title: "Automation", skills: "Python, Zapier, n8n, OpenAI API", level: "Expert" },
                    { icon: Palette, title: "Instructional Design", skills: "Storyline, Camtasia, xAPI, Figma", level: "Advanced" },
                    { icon: Database, title: "LMS Architecture", skills: "Sakai, Canvas, SCORM, API Integration", level: "Expert" }
                ].map((stack, i) => (
                    <div key={i} className="group">
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm">
                                <stack.icon size={16} className="text-lime-400" /> {stack.title}
                             </div>
                             <span className="text-xs text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded font-mono uppercase">{stack.level}</span>
                        </div>
                        <p className="text-xs text-neutral-500 font-mono pl-6 border-l border-neutral-800">{stack.skills}</p>
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

        {/* Experience Timeline */}
        <div className="mt-32 relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-neutral-800 md:left-1/2 md:-ml-[0.5px]"></div>
          
          <div className="text-center mb-16 relative z-10">
            <span className="bg-neutral-900 px-4 text-2xl font-mono text-lime-400 uppercase tracking-widest">Career Trajectory</span>
          </div>
          
          <div className="space-y-12">
            {EXPERIENCE.map((job, idx) => (
              <div key={job.id} className={`relative grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className="absolute left-[15px] md:left-1/2 md:-ml-[5px] w-[9px] h-[9px] rounded-full bg-lime-400 border-2 border-black z-10 shadow-[0_0_10px_rgba(163,230,53,0.5)]"></div>
                <div className={`${idx % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12'} pl-16 md:pl-0`}>
                   <div className="group">
                        <span className="text-xl font-bold text-white block mb-1 group-hover:text-lime-400 transition-colors">{job.period}</span>
                        <span className="text-sm text-lime-400 font-mono uppercase mb-4 block tracking-wider">{job.company}</span>
                        <h4 className="text-2xl font-bold mb-3 text-white">{job.role}</h4>
                        <p className="text-neutral-400 mb-4 leading-relaxed text-sm md:text-base">{job.description}</p>
                        <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'md:justify-end justify-start' : 'justify-start'}`}>
                            {job.skills.map(skill => (
                            <span key={skill} className="text-xs border border-neutral-700 bg-neutral-950 px-3 py-1 rounded-full text-neutral-300 hover:border-lime-400 transition-colors cursor-default">
                                {skill}
                            </span>
                            ))}
                        </div>
                   </div>
                </div>
                <div className="hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default About;