import React, { useState, useEffect } from 'react';
import { NAV_LINKS, SOCIAL_LINKS } from '../constants';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false); 
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      setTimeout(() => {
        const offset = 100; // Adjust for header height
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
      }, 300); // Slight delay to allow menu exit animation
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const menuVariants: Variants = {
    closed: {
        opacity: 0,
        x: "100%",
        transition: { type: "tween", duration: 0.4 }
    },
    open: {
        opacity: 1,
        x: 0,
        transition: { 
            type: "tween", 
            duration: 0.4,
            staggerChildren: 0.1,
            delayChildren: 0.2 
        }
    }
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mix-blend-difference text-white ${
          isScrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className="px-6 md:px-12 flex justify-between items-center">
          <a 
            href="#" 
            onClick={scrollToTop}
            className="text-2xl font-bold tracking-tighter uppercase font-oswald border-2 border-white px-2 py-1 hover:bg-white hover:text-black transition-colors focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none"
            aria-label="Scroll to top"
          >
            MD.
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8 items-center">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-sm font-bold uppercase tracking-widest transition-colors relative group cursor-pointer focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none rounded-sm px-1 ${isActive ? 'text-lime-400' : 'text-white hover:text-lime-400'}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-lime-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </a>
                );
              })}
            </nav>
            <a 
              href={SOCIAL_LINKS.resume} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest border border-white/30 hover:bg-lime-400 hover:border-lime-400 hover:text-black transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none"
            >
              <FileText size={14} /> Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none rounded hover:text-lime-400 transition-colors"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-neutral-950 z-[60] flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-8 right-6 text-white p-4 focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none rounded hover:text-lime-400 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-8 text-center items-center">
              {NAV_LINKS.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  variants={linkVariants}
                  className="text-5xl font-bold uppercase font-oswald text-white hover:text-lime-400 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none px-4 py-2 rounded"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                href={SOCIAL_LINKS.resume}
                target="_blank" 
                rel="noopener noreferrer"
                variants={linkVariants}
                className="mt-8 px-8 py-3 bg-lime-400 text-black text-xl font-bold uppercase font-oswald flex items-center gap-2 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none hover:scale-105 transition-transform"
              >
                View Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;