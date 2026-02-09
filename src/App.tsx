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
import ComparisonTable from './components/ComparisonTable';
import FAQ from './components/FAQ';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    // Detección automática del idioma del navegador
    const userLang = navigator.language.split('-')[0].toUpperCase();
    setLang(['ES', 'DE'].includes(userLang) ? userLang : 'EN');
  }, []);
  
  const WHATSAPP_NUMBER = "595981492115"; 
  const WHATSAPP_MESSAGE = encodeURIComponent(
    lang === 'ES' 
    ? "Hola, estoy interesado en los servicios premium de ParaguayConcierge." 
    : "Hello, I am interested in the premium services of ParaguayConcierge."
  );

  return (
    <div className="min-h-screen relative bg-slate-50 font-sans antialiased overflow-x-hidden">
      <Navbar currentLang={lang} />
      <main>
        {/* Flujo de conversión optimizado */}
        <Hero lang={lang} />
        <AuthorityDashboard lang={lang} />
        <ComparisonTable lang={lang} />
        <TaxCalculator lang={lang} />
        <Services lang={lang} />
        <Roadmap lang={lang} />
        <Requirements lang={lang} />
        <Pricing lang={lang} />
        <FAQ lang={lang} />
        <AIConcierge lang={lang} />
        <SEOSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <LiveConcierge lang={lang} />
      
      {/* Botón flotante de contacto directo */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`} 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-50 bg-[#112643] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all border-2 border-[#c19a5b]/50 group flex items-center gap-4"
      >
        <Logo type="icon" size="xs" variant="light" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-black text-[10px] uppercase tracking-widest whitespace-nowrap">
          {lang === 'ES' ? 'Contacto Directo' : 'Direct Contact'}
        </span>
      </a>
    </div>
  );
};

export default App;
