import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Linkedin, ExternalLink, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-500 py-12 border-t border-neutral-900 text-sm uppercase tracking-wider">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
            <p>&copy; {new Date().getFullYear()} Maxwell Dziku. All Rights Reserved.</p>
            <p className="text-xs text-neutral-600">Designed & Built with React</p>
        </div>
        
        <div className="flex items-center gap-6">
            <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-lime-400 transition-colors"
                aria-label="LinkedIn Profile"
            >
                <Linkedin size={20} />
            </a>
             <a 
                href={SOCIAL_LINKS.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-lime-400 transition-colors"
                aria-label="Company Website"
            >
                <ExternalLink size={20} />
            </a>
            <a 
                href={SOCIAL_LINKS.email} 
                className="hover:text-lime-400 transition-colors"
                aria-label="Send Email"
            >
                <Mail size={20} />
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;