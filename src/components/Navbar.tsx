
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { translations } from '../constants/translations';

interface NavbarProps {
  currentLang: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[currentLang as keyof typeof translations]?.nav || translations.EN.nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: t.services, id: 'services' },
    { label: t.timeline, id: 'roadmap' },
    { label: t.wealth, id: 'calculator' },
    { label: t.fees, id: 'pricing' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-2xl py-2' : 'bg-transparent py-8 md:py-12'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {isScrolled ? (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
              <Logo type="icon" size="xs" />
              <div className="flex flex-col leading-none border-l border-slate-200 pl-3">
                <span className="text-[#112643] font-serif font-bold text-lg tracking-tight">Paraguay</span>
                <span className="text-[#c19a5b] font-serif italic text-sm">Concierge</span>
              </div>
            </div>
          ) : (
            <Logo 
              size="md" 
              variant="light" 
              className="transition-all duration-700 transform group-hover:scale-105"
            />
          )}
        </div>
        
        <div className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollTo(item.id)}
              className={`text-[9px] uppercase tracking-[0.4em] font-black transition-all hover:text-[#c19a5b] ${isScrolled ? 'text-[#112643]' : 'text-white/80'}`}
            >
              {item.label}
            </button>
          ))}
          
          <button 
            onClick={() => scrollTo('ai-advisor')}
            className="bg-[#c19a5b] hover:bg-[#b0894a] text-white px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl hover:shadow-[#c19a5b]/40"
          >
            {t.start}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
