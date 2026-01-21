import React, { useState } from 'react';
import Section from './ui/Section';
import { SOCIAL_LINKS } from '../constants';
import { ArrowUpRight, Mail, FileText, Check, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  return (
    <div className="bg-lime-400 text-black py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 border-[20px] border-black/5 rounded-full pointer-events-none"></div>
      
      <Section id="contact">
        <div className="grid md:grid-cols-2 gap-16 relative z-10">
          
          {/* Left: Heading & Context */}
          <div className="flex flex-col justify-between h-full">
            <div>
                <h2 className="text-6xl md:text-8xl font-bold uppercase leading-none font-syne mb-8">
                Let's build <br/> something <span className="opacity-40">bold.</span>
                </h2>
                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 max-w-lg">
                Ready to transform your organizational learning? I am available for select freelance projects and consultancy through Time Tells Innovations.
                </p>
            </div>

            <div className="flex flex-col gap-4 mt-8">
                <h4 className="font-bold uppercase tracking-widest text-sm mb-2 border-b border-black/20 pb-2 w-fit">Connect Directly</h4>
                <a href={SOCIAL_LINKS.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xl font-bold hover:opacity-60 transition-opacity w-fit group">
                <FileText size={20} /> Resume <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xl font-bold hover:opacity-60 transition-opacity w-fit group">
                <ArrowUpRight size={20} /> LinkedIn
                </a>
                <a href={`mailto:${SOCIAL_LINKS.displayEmails[0]}`} className="flex items-center gap-3 text-xl font-bold hover:opacity-60 transition-opacity w-fit">
                    <Mail size={20} /> {SOCIAL_LINKS.displayEmails[0]}
                </a>
            </div>
          </div>

          {/* Right: Interactive Form */}
          <div className="bg-white p-8 md:p-10 rounded-sm shadow-2xl shadow-black/10">
            <h3 className="text-2xl font-bold font-syne uppercase mb-6 flex items-center gap-2">
                <Send size={24} className="text-lime-600" /> Start a project
            </h3>
            
            {formState === 'success' ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center h-[400px] space-y-4"
                >
                    <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center text-lime-600 mb-4">
                        <Check size={40} />
                    </div>
                    <h4 className="text-3xl font-bold text-black">Message Sent!</h4>
                    <p className="text-neutral-600 max-w-xs">Thanks for reaching out. I'll get back to you within 24-48 hours.</p>
                    <button 
                        onClick={() => setFormState('idle')}
                        className="mt-6 text-sm font-bold uppercase tracking-widest border-b-2 border-black hover:text-lime-600 hover:border-lime-600 transition-colors"
                    >
                        Send another
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            required
                            className="bg-neutral-50 border-b-2 border-neutral-200 p-3 text-lg font-medium focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300"
                            placeholder="Jane Doe"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            required
                            className="bg-neutral-50 border-b-2 border-neutral-200 p-3 text-lg font-medium focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300"
                            placeholder="jane@company.com"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-neutral-500">Message</label>
                        <textarea 
                            id="message" 
                            required
                            rows={4}
                            className="bg-neutral-50 border-b-2 border-neutral-200 p-3 text-lg font-medium focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300 resize-none"
                            placeholder="Tell me about your project..."
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={formState === 'submitting'}
                        className="bg-black text-white py-4 px-8 font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
                    >
                        {formState === 'submitting' ? (
                            <>Sending <Loader2 size={18} className="animate-spin" /></>
                        ) : (
                            <>Send Request <ArrowUpRight size={18} /></>
                        )}
                    </button>
                </form>
            )}
          </div>

        </div>
      </Section>
    </div>
  );
};

export default Contact;