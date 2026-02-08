import React from 'react';

const LocationShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1549643276-fdf2fab574f5?auto=format,compress&fm=webp&fit=crop&q=80&w=800" 
                className="rounded-3xl shadow-2xl h-64 w-full object-cover transform translate-y-8" 
                alt="Luxury residential area in Asunción, showcasing high-end architecture and lush green surroundings" 
                loading="lazy"
                decoding="async"
              />
              <img 
                src="https://images.unsplash.com/photo-1571235133642-451296541671?auto=format,compress&fm=webp&fit=crop&q=80&w=800" 
                className="rounded-3xl shadow-2xl h-64 w-full object-cover" 
                alt="The bustling corporate district of Santa Teresa in Asunción, a hub for international business and investment" 
                loading="lazy"
                decoding="async"
              />
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format,compress&fm=webp&fit=crop&q=80&w=800" 
                className="rounded-3xl shadow-2xl h-64 w-full object-cover col-span-2 mt-4" 
                alt="Modern luxury lifestyle and architecture in Paraguay, featuring contemporary designs and premium amenities" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl text-center">
              <span className="text-[#c19a5b] font-black text-[10px] uppercase tracking-[0.5em]">Global Ranking</span>
              <p className="text-3xl font-serif font-bold mt-2">#1 Growth<br/>City 2026</p>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="text-[#c19a5b] font-black uppercase tracking-[0.4em] text-xs">The Lifestyle Arbitrage</h2>
            <h3 className="text-5xl md:text-6xl font-serif font-bold leading-tight">Your New HQ in<br/><span className="text-[#c19a5b]">Santa Teresa</span></h3>
            <p className="text-slate-300 text-lg font-light leading-relaxed">
              Asunción is not just a tax haven; it is a burgeoning financial hub. Experience the "Golden Mile" with ultra-modern high-rises, international dining, and private clubs—all at a cost of living that maximizes your wealth.
            </p>
            
            <div className="space-y-6">
              {[
                "Luxury Real Estate: 40% lower vs. regional peers",
                "Clean Energy: Powered by 100% Hydroelectric (Itaipu)",
                "Elite Safety: Private residential zones with 24/7 security",
                "World-Class Private Schools & Healthcare"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-[#c19a5b] group-hover:scale-150 transition-transform"></div>
                  <span className="text-sm font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => document.getElementById('ai-advisor')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#112643] px-14 py-6 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#c19a5b] hover:text-white transition-all active:scale-95 shadow-2xl"
            >
              Request City Briefing
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/world-map.png')]"></div>
    </section>
  );
};

export default LocationShowcase;