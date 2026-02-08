
import React from 'react';
import { translations } from '../constants/translations';

interface ServicesProps {
  lang: string;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const t = translations[lang as keyof typeof translations]?.services || translations.EN.services;

  const serviceCategories = [
    {
      category: lang === 'ES' ? "Legal y Residencia" : lang === 'DE' ? "Recht und Aufenthalt" : "Legal & Residency",
      items: [
        {
          title: "SUACE Fast-Track",
          desc: lang === 'ES' ? "Canal exclusivo para inversores. Aprobación en 45-90 días." : "Permanent residency approval in 45-90 days with business priority.",
          icon: "⚖️"
        },
        {
          title: lang === 'ES' ? "Visa Nómada Digital" : "Digital Nomad Visa",
          desc: lang === 'ES' ? "Camino rápido para trabajadores remotos bajo la ley 2022." : "Quick processing and 2-year validity for remote workers.",
          icon: "💻"
        },
        {
          title: lang === 'ES' ? "Plan de Ciudadanía" : "Citizenship Planning",
          desc: lang === 'ES' ? "Estrategia para pasaporte paraguayo tras 3 años de residencia." : "Long-term strategy for obtaining a passport after 3 years.",
          icon: "📜"
        }
      ]
    },
    {
      category: lang === 'ES' ? "Finanzas e Impuestos" : lang === 'DE' ? "Finanzen und Steuern" : "Financial & Tax Strategy",
      items: [
        {
          title: "0% Territorial Tax",
          desc: lang === 'ES' ? "Estructuración legal para eximir ingresos de fuente extranjera." : "Expert structuring to legally exempt foreign income from local tax.",
          icon: "🛡️"
        },
        {
          title: lang === 'ES' ? "Banca VIP" : "VIP Banking Relations",
          desc: lang === 'ES' ? "Introducción directa a directores bancarios para cuentas multi-divisa." : "Direct introductions to bank directors for multi-currency accounts.",
          icon: "🏦"
        },
        {
          title: lang === 'ES' ? "Cumplimiento Crypto" : "Crypto Compliance",
          desc: lang === 'ES' ? "Marcos legales para liquidar activos digitales de forma regulada." : "Legal frameworks for liquidating digital assets via local banks.",
          icon: "₿"
        }
      ]
    }
  ];

  return (
    <section className="py-24 px-4 bg-slate-50" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold text-[#c19a5b] uppercase tracking-[0.4em] mb-3">{t.title}</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#112643]">{t.subtitle}</h3>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">{t.desc}</p>
        </div>
        
        <div className="space-y-20">
          {serviceCategories.map((cat, idx) => (
            <div key={idx}>
              <h4 className="text-lg font-black text-[#112643] mb-10 flex items-center gap-6 uppercase tracking-widest">
                <span className="h-0.5 bg-[#c19a5b] w-16"></span>
                {cat.category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cat.items.map((s, sIdx) => (
                  <div key={sIdx} className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all group hover:-translate-y-2 relative overflow-hidden">
                    <div className="text-4xl mb-8 group-hover:scale-110 transition-transform inline-block grayscale group-hover:grayscale-0">{s.icon}</div>
                    <h5 className="text-xl font-bold text-[#112643] mb-4 group-hover:text-[#c19a5b] transition-colors">{s.title}</h5>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 rounded-[3.5rem] bg-[#112643] text-white flex flex-col md:flex-row items-center justify-between gap-10 border border-[#c19a5b]/30">
          <div>
            <h4 className="text-3xl font-serif font-bold mb-3">{t.tailored}</h4>
            <p className="text-slate-300 font-light">{lang === 'ES' ? 'Nuestro equipo legal redacta estatutos para holdings internacionales.' : 'Our legal team drafts bylaws for international holdings.'}</p>
          </div>
          <button 
            onClick={() => document.getElementById('ai-advisor')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#c19a5b] hover:bg-[#b0894a] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
