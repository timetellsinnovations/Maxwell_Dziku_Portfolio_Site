import React from 'react';
import Section from './ui/Section';
import { TESTIMONIALS } from '../constants';
import { Star, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  return (
    <Section id="reviews" className="bg-neutral-950 border-t border-neutral-900">
        <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold uppercase text-white font-syne mb-4">
                Client <br/><span className="text-lime-400">Feedback</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl">
                Real feedback from leading organizations who trust our services to deliver high-impact learning solutions.
            </p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
                <motion.div 
                    key={t.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    viewport={{ once: true }}
                    className="bg-neutral-900/50 p-8 border border-neutral-800 relative group hover:border-lime-400 transition-colors duration-500 rounded-sm flex flex-col h-full"
                >
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-6 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} fill="currentColor" stroke="none" />
                        ))}
                    </div>

                    <p className="text-neutral-200 text-lg leading-relaxed mb-8 italic flex-grow">
                        "{t.text}"
                    </p>
                    
                    {/* Author & Org Footer */}
                    <div className="mt-auto border-t border-neutral-800 pt-6 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-lime-400 shrink-0 shadow-lg group-hover:bg-lime-400 group-hover:text-black transition-colors duration-300">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">{t.author}</p>
                                <p className="text-neutral-500 text-xs mt-0.5 leading-tight">{t.role}</p>
                            </div>
                        </div>
                        
                        {/* Organization Logo Placeholder / Text */}
                        <div className="text-right shrink-0">
                            <span className="text-lime-400/70 font-syne font-bold uppercase tracking-wider text-xs block group-hover:text-lime-400 transition-colors">
                                {t.organization}
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </Section>
  );
};

export default Testimonials;