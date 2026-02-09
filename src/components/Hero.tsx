import React from 'react';

interface HeroProps { lang: string; }

const Hero: React.FC<HeroProps> = ({ lang }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#112643]">
      {/* Imagen de fondo con Overlay dinámico para lectura clara */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80" 
          alt="Paraguay Business"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#112643]/80 via-transparent to-[#112643]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          {/* Etiqueta superior responsiva */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="w-12 h-[1px] bg-[#c19a5b]"></div>
            <span className="text-[#c19a5b] uppercase tracking-[0.4em] text-[10px] md:text-xs font-black">
              {lang === 'ES' ? 'Servicios de Reubicación Elite' : 'Elite Relocation Services'}
            </span>
          </div>

          {/* Título fluido: escala de 4xl a 7xl según el dispositivo */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-[1.1]">
            {lang === 'ES' ? (
              <>Tu Puerta de Entrada a <span className="text-[#c19a5b]">Paraguay</span></>
            ) : (
              <>Your Gateway to <span className="text-[#c19a5b]">Paraguay</span></>
            )}
          </h1>

          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
            {lang === 'ES' 
              ? 'Residencia permanente y optimización fiscal bajo la Ley 6984/2022. Disfruta de un 0% de impuestos sobre ingresos extranjeros.'
              : 'Permanent residency and tax optimization under Law 6984/2022. Benefit from 0% tax on foreign-sourced income.'}
          </p>

          {/* Botones adaptables: ocupan el ancho total en móvil */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#pricing"
              className="px-10 py-5 bg-[#c19a5b] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-[#a6824a] transition-all text-center shadow-2xl active:scale-95"
            >
              {lang === 'ES' ? 'Ver Planes de Inversión' : 'View Investment Plans'}
            </a>
            <a 
              href="#ai-advisor"
              className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/20 text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all text-center active:scale-95"
            >
              {lang === 'ES' ? 'Hablar con Asesor IA' : 'Talk to AI Advisor'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
