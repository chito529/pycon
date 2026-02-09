import React from 'react';

interface ComparisonTableProps { lang: string; }

const ComparisonTable: React.FC<ComparisonTableProps> = ({ lang }) => {
  const data = [
    { 
      feature: lang === 'ES' ? "Impuesto a Renta Extranjera" : "Foreign Sourced Income Tax", 
      py: "0%", 
      others: "15% - 35%" 
    },
    { 
      feature: lang === 'ES' ? "Residencia Permanente" : "Permanent Residency", 
      py: lang === 'ES' ? "90 Días" : "90 Days", 
      others: "5+ Years" 
    },
    { 
      feature: lang === 'ES' ? "Presencia Física Mínima" : "Min. Physical Presence", 
      py: lang === 'ES' ? "1 día c/ 3 años" : "1 day every 3 yrs", 
      others: "183+ Days" 
    },
    { 
      feature: lang === 'ES' ? "Grado de Inversión (Moody's)" : "Investment Grade (Moody's)", 
      py: "Baa3 (Stable)", 
      others: "Speculative" 
    },
  ];

  return (
    <section className="py-24 bg-[#112643] relative overflow-hidden border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[#c19a5b] font-black uppercase tracking-[0.4em] text-[10px] mb-4">
            {lang === 'ES' ? 'Análisis Comparativo' : 'Comparative Analysis'}
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white">
            {lang === 'ES' ? 'Por qué ' : 'Why '} 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e5c78a] via-[#c19a5b] to-[#e5c78a]">
              Paraguay
            </span>
          </h3>
        </div>

        <div className="border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl bg-white/5 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-8 text-[#c19a5b] uppercase text-[10px] tracking-[0.3em] font-black italic">
                    {lang === 'ES' ? 'INDICADOR ESTRATÉGICO' : 'STRATEGIC INDICATOR'}
                  </th>
                  <th className="p-8 text-white uppercase text-[11px] tracking-[0.3em] font-black border-l border-white/10">
                    PARAGUAY
                  </th>
                  <th className="p-8 text-slate-500 uppercase text-[10px] tracking-[0.3em] font-black">
                    GLOBAL AVG
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    <td className="p-8 text-sm font-light text-slate-300 group-hover:text-white transition-colors">
                      {item.feature}
                    </td>
                    <td className="p-8 text-lg text-[#c19a5b] font-serif font-bold border-l border-white/10 bg-[#c19a5b]/5">
                      {item.py}
                    </td>
                    <td className="p-8 text-sm text-slate-500 font-light">
                      {item.others}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
