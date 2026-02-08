import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Roadmap from './components/Roadmap';
import Requirements from './components/Requirements';
import Pricing from './components/Pricing';
import AIConcierge from './components/AIConcierge';
import SEOSection from './components/SEOSection';
import Footer from './components/Footer';
import LiveConcierge from './components/LiveConcierge';
import TaxCalculator from './components/TaxCalculator';
import AuthorityDashboard from './components/AuthorityDashboard';
import Testimonials from './components/Testimonials';
import LocationShowcase from './components/LocationShowcase';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    // Detección automática del idioma del navegador
    const userLang = navigator.language.split('-')[0].toUpperCase();
    if (['ES', 'DE'].includes(userLang)) {
      setLang(userLang);
    } else {
      setLang('EN'); // Default
    }
  }, []);
  
  const WHATSAPP_NUMBER = "595981492115"; 
  const WHATSAPP_MESSAGE = encodeURIComponent(
    lang === 'ES' 
    ? "Hola, estoy interesado en los servicios premium de ParaguayConcierge. Me gustaría una consultoría." 
    : lang === 'DE' 
    ? "Hallo, ich interessiere mich für die Premium-Services von ParaguayConcierge." 
    : "Hello, I am interested in the premium services of ParaguayConcierge."
  );

  return (
    <div className="min-h-screen relative bg-slate-50">
      <Navbar currentLang={lang} />
      <main>
        <Hero lang={lang} />
        <AuthorityDashboard lang={lang} />
        <LocationShowcase />
        <TaxCalculator lang={lang} />
        <Services lang={lang} />
        <Roadmap lang={lang} />
        <Requirements lang={lang} />
        <Testimonials />
        <Pricing lang={lang} />
        <AIConcierge lang={lang} />
        <SEOSection lang={lang} />
      </main>
      <Footer lang={lang} />
      
      <LiveConcierge lang={lang} />
      
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`} 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-50 bg-[#112643] text-white p-5 rounded-full shadow-[0_30px_60px_rgba(17,38,67,0.5)] hover:scale-110 transition-all active:scale-95 group flex items-center gap-4 border-2 border-[#c19a5b]/50"
      >
        <div className="relative">
          <Logo type="icon" size="xs" variant="light" className="transition-transform group-hover:rotate-12" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c19a5b] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c19a5b]"></span>
          </span>
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap pr-2">
          {lang === 'ES' ? 'Hablar con un Experto' : lang === 'DE' ? 'Experten kontaktieren' : 'Contact an Expert'}
        </span>
      </a>
    </div>
  );
};

export default App;