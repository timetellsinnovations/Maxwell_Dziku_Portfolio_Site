import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', className = '' }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <motion.div
        className="flex min-w-full"
        animate={{
          x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {/* We duplicate the text enough times to ensure it covers screens of all sizes */}
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-4 text-6xl md:text-9xl font-bold uppercase opacity-30 hover:opacity-100 transition-opacity duration-300 font-oswald text-transparent stroke-text whitespace-nowrap">
            {text} <span className="text-lime-400 mx-4">•</span>
          </span>
        ))}
      </motion.div>
      {/* CSS for outlined text effect */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px #666;
        }
        @media (min-width: 768px) {
            .stroke-text {
                -webkit-text-stroke: 2px #666;
            }
        }
        .stroke-text:hover {
           -webkit-text-stroke: 2px #a3e635; /* lime-400 */
           color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Marquee;