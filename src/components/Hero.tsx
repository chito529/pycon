import React from 'react';

interface HeroProps { lang: string; }

const Hero: React.FC<HeroProps> = ({ lang }) => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-[#112643]">
      {/* Fondo Original con Enfoque Mejorado */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=90" 
          alt="Paraguay Luxury Business"
          className="w-full h-full object-cover object-[center_20%] opacity-50" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#112643] via-[#112643]/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-8 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[2px] bg-[#c19a5b]"></div>
            <span className="text-[#c19a5b] uppercase tracking-[0.5em] text-[10px] md:text-xs font-black">
              Paraguay Concierge Elite
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-[1.05]">
            {lang === 'ES' ? (
              <>Tu Futuro en <br/><span className="text-[#c19a5b]">Paraguay</span></>
            ) : (
              <>Your Future in <br/><span className="text-[#c19a5b]">Paraguay</span></>
            )}
          </h1>

          <p className="text-white/80 text-lg md:text-2xl max-w-xl mb-12 font-light leading-relaxed">
            {lang === 'ES' 
              ? 'Residencia VIP y optimización fiscal estratégica bajo la Ley 6984/2022.'
              : 'VIP residency and strategic tax optimization under Law 6984/2022.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#pricing" className="px-12 py-5 bg-[#c19a5b] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-[#a6824a] transition-all text-center shadow-2xl">
              {lang === 'ES' ? 'Explorar Planes' : 'Explore Plans'}
            </a>
            {/* Botón de la imagen */}
            <a href="#ai-advisor" className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border-2 border-[#c19a5b]/50 text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-[#c19a5b] hover:text-white transition-all text-center">
              {lang === 'ES' ? 'Hablar con Concierge' : 'Speak to Concierge'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
