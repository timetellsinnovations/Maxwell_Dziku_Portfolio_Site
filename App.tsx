import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/ui/Cursor';
import ChatBot from './components/ChatBot';
import AiPlayground from './components/AiPlayground';
import { motion, useScroll, useSpring } from 'framer-motion';

const NOISE_SVG = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-neutral-950 min-h-screen text-white selection:bg-lime-400 selection:text-black relative">
      <Cursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-lime-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Noise Texture Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[5] opacity-[0.03] mix-blend-overlay" 
        style={{ backgroundImage: `url("${NOISE_SVG}")` }}
        aria-hidden="true"
      ></div>

      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <Work />
        <AiPlayground />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;