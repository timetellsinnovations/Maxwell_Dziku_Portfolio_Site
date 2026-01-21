import React from 'react';
import Section from './ui/Section';
import { motion } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: "What is the advantage of hiring a Learning Engineer over a traditional ID?",
    answer: "Traditional Instructional Designers typically rely on standard authoring tools like Storyline. As a Learning Engineer, I bridge the gap by writing custom code (React, Node.js), automating workflows (Python), and architecting data strategies (xAPI). This allows for scalable, interactive, and data-rich learning ecosystems that standard tools cannot support."
  },
  {
    question: "How do you integrate Artificial Intelligence into L&D projects?",
    answer: "I move beyond basic content generation. I build RAG (Retrieval-Augmented Generation) chatbots for secure internal knowledge access, automate learner feedback analysis using NLP, and create dynamic role-play simulators. I ensure all AI implementations prioritize data security and human-in-the-loop validation."
  },
  {
    question: "Can you work with our existing Learning Management System (LMS)?",
    answer: "Yes. My experience spans major platforms like Cornerstone, Canvas, and Sakai. I specialize in 'fixing' LMS limitations—whether that involves building custom SCORM/xAPI wrappers, creating external LTI tools, or developing 'Smart Walkthroughs' to improve user adoption."
  },
  {
    question: "Do you offer full-service development or just consulting?",
    answer: "I offer both. Through Time Tells Innovations LLC, I can operate as a full-stack developer building your learning app from scratch, or as a strategic consultant auditing your current tech stack and implementing automation to save your team hours of manual work."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <Section id="faq" className="bg-neutral-900 border-t border-neutral-800">
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-lime-400 text-xs font-mono uppercase tracking-wider mb-6">
             <HelpCircle size={14} /> AI & Search Optimized
          </div>
          <h2 className="text-4xl font-bold uppercase text-white font-syne mb-6">
            Common <br/><span className="text-lime-400">Questions</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Straight answers to help you understand the value of a hybrid technical approach in L&D.
          </p>
        </div>

        <div className="md:col-span-8 flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`border rounded-lg transition-colors duration-300 ${isOpen ? 'border-lime-400 bg-neutral-900' : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className={`text-lg md:text-xl font-bold font-syne pr-8 ${isOpen ? 'text-white' : 'text-neutral-300'}`}>
                    {faq.question}
                  </h3>
                  <span className={`shrink-0 ${isOpen ? 'text-lime-400' : 'text-neutral-500'}`}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                
                <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="p-6 pt-0 text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default FAQ;