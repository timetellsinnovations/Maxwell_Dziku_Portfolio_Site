import React from 'react';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', className = '' }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      {/* Container that moves */}
      <div 
        className="flex min-w-full animate-marquee"
        style={{
            animationDirection: direction === 'right' ? 'reverse' : 'normal'
        }}
      >
        {/* We duplicate the text enough times to ensure it covers screens of all sizes */}
        {[...Array(6)].map((_, i) => (
          <span key={i} className="mx-4 text-6xl md:text-9xl font-bold uppercase opacity-30 hover:opacity-100 transition-opacity duration-300 font-oswald text-transparent stroke-text whitespace-nowrap">
            {text} <span className="text-lime-400 mx-4">•</span>
          </span>
        ))}
      </div>
      
      {/* CSS for Animation & Outlined Text */}
      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
            /* Critical for mobile performance */
            will-change: transform; 
        }
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