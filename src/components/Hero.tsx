import React from 'react';
import { translations } from '../constants/translations';

interface HeroProps {
  lang: string;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang as keyof typeof translations]?.hero || translations.EN.hero;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#112643]">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1646837599653-e39f2be8a310?q=75&w=1920&auto=format,compress&fm=webp&fit=crop" 
          alt="Modern Asunción skyline featuring high-rise corporate buildings and luxury real estate, representing Paraguay's investment-grade economy" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover scale-110 animate-[zoom_30s_infinite_alternate] opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#112643]/70 via-[#112643]/20 to-[#112643]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="inline-flex items-center gap-4 px-8 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="flex h-2 w-2 rounded-full bg-[#c19a5b] animate-pulse"></div>
            <span className="text-[#c19a5b] text-[10px] font-black uppercase tracking-[0.5em]">{t.badge}</span>
          </div>
          <div className="px-6 py-2 bg-[#c19a5b]/20 border border-[#c19a5b]/30 rounded-lg backdrop-blur-md">
            <span className="text-white text-[9px] font-black uppercase tracking-[0.3em]">{t.rating}</span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-[8.5rem] font-serif font-bold mb-10 leading-[0.85] tracking-tighter animate-in fade-in zoom-in duration-1000 delay-300">
          {t.title1}<br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e5c78a] via-[#c19a5b] to-[#e5c78a]">{t.title2}</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-14 text-slate-200/90 max-w-4xl mx-auto font-light leading-relaxed animate-in fade-in duration-1000 delay-500">
          {t.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
          <button 
            onClick={() => scrollTo('calculator')}
            className="group relative bg-[#c19a5b] hover:bg-[#b0894a] text-white px-14 py-7 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl hover:shadow-[#c19a5b]/40 active:scale-95"
          >
            {t.cta1}
          </button>
          
          <button 
            onClick={() => scrollTo('pricing')}
            className="group bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white px-14 py-7 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 flex items-center gap-4"
          >
            {t.cta2}
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-px h-16 bg-gradient-to-b from-[#c19a5b] to-transparent"></div>
        <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white">{t.scroll}</span>
      </div>

      <style>{`
        @keyframes zoom {
          from { transform: scale(1.1); }
          to { transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
};

export default Hero;