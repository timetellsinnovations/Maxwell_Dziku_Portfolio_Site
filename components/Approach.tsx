import React from 'react';
import Section from './ui/Section';
import { BrainCircuit, BarChart3, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const Approach: React.FC = () => {
  const approaches = [
    {
      icon: BrainCircuit,
      title: "Complexity → Clarity",
      description: "I translate dense technical content into digestible, learner-centered experiences using cognitive load principles and plain language."
    },
    {
      icon: BarChart3,
      title: "Data-Informed Design",
      description: "Every decision is grounded in learning science, analytics (xAPI), and measurable outcomes—not guesswork."
    },
    {
      icon: Layers,
      title: "Built to Scale",
      description: "From single modules to enterprise ecosystems, I architect solutions that grow with your organization using modern tech stacks."
    }
  ];

  return (
    <div className="bg-neutral-950 border-b border-neutral-900">
      <Section id="approach" className="py-12 md:py-20">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {approaches.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-colors duration-300">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold font-syne text-white">{item.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Approach;