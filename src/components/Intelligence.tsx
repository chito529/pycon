import React from 'react';

interface IntelligenceProps { lang: string; }

const Intelligence: React.FC<IntelligenceProps> = ({ lang }) => {
  const news = [
    {
      date: "FEB 2026",
      tag: lang === 'ES' ? "ECONOMÍA" : "ECONOMY",
      title: lang === 'ES' ? "Paraguay consolida su Grado de Inversión Baa3" : "Paraguay Consolidates Baa3 Investment Grade",
      source: "Moody's Ratings",
      desc: lang === 'ES' ? "La estabilidad macroeconómica atrae un flujo récord de capitales europeos hacia Asunción." : "Macroeconomic stability attracts record-breaking European capital flows to Asunción."
    },
    {
      date: "JAN 2026",
      tag: lang === 'ES' ? "LEGAL" : "LEGAL",
      title: lang === 'ES' ? "Optimización Fiscal bajo Ley 6984/2022" : "Tax Optimization under Law 6984/2022",
      source: "Official Gazette",
      desc: lang === 'ES' ? "Nuevas directrices confirman la exención del 0% para rentas de fuente extranjera." : "New guidelines confirm 0% exemption for foreign-sourced income."
    },
    {
      date: "DEC 2025",
      tag: lang === 'ES' ? "INFRAESTRUCTURA" : "INFRASTRUCTURE",
      title: lang === 'ES' ? "Asunción: Hub Tecnológico del Cono Sur" : "Asunción: Technology Hub of the Southern Cone",
      source: "Business Insider",
      desc: lang === 'ES' ? "El distrito financiero de Santa Teresa lidera el crecimiento de oficinas de lujo." : "The Santa Teresa financial district leads the growth of luxury corporate offices."
    }
  ];

  const tickers = [
    { label: "GDP GROWTH", value: "+4.2%" },
    { label: "USD/PYG", value: "7,450" },
    { label: "INFLATION", value: "3.8%" },
    { label: "CORP TAX", value: "10%" },
    { label: "FOREIGN INCOME", value: "0%" },
    { label: "MOODY'S", value: "Baa3 STABLE" }
  ];

  return (
    <section className="py-24 bg-[#0d1a2d] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-[#c19a5b] font-black uppercase tracking-[0.5em] text-[10px] mb-4">
              {lang === 'ES' ? 'INTELIGENCIA DE MERCADO' : 'MARKET INTELLIGENCE'}
            </h2>
            <h3 className="text-4xl font-serif font-bold text-white italic">
              Paraguay <span className="text-[#c19a5b]">Briefing</span>
            </h3>
          </div>
          <div className="text-slate-500 text-[10px] font-mono tracking-[0.2em] uppercase">
            // LIVE_FEED_02.2026 //
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {news.map((item, idx) => (
            <article key={idx} className="group cursor-pointer">
              <div className="border-l border-white/10 pl-8 group-hover:border-[#c19a5b] transition-all duration-700">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-black text-[#c19a5b] tracking-widest">{item.date}</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] text-slate-400 font-bold uppercase tracking-widest border border-white/10">
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-[#c19a5b] transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                  {item.desc}
                </p>
                <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">
                  SOURCE: {item.source}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Ticker Animation */}
      <div className="bg-[#c19a5b]/5 border-y border-[#c19a5b]/20 py-4 overflow-hidden flex">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...tickers, ...tickers].map((t, i) => (
            <div key={i} className="flex items-center mx-12">
              <span className="text-[#c19a5b] text-[10px] font-black uppercase tracking-widest mr-3">{t.label}</span>
              <span className="text-white text-sm font-mono font-bold tracking-tighter">{t.value}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Intelligence;
