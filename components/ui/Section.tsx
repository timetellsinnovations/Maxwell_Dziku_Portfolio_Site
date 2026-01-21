import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, id, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section 
      id={id} 
      ref={ref} 
      className={`py-20 md:py-32 px-4 md:px-12 max-w-7xl mx-auto ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;