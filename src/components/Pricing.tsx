
import React from 'react';
import { translations } from '../constants/translations';

interface PricingProps {
  lang: string;
}

const Pricing: React.FC<PricingProps> = ({ lang }) => {
  const t = translations[lang as keyof typeof translations]?.pricing || translations.EN.pricing;

  const tiers = [
    {
      name: t.essential,
      price: "$1,450",
      description: lang === 'ES' ? "Ideal para Nómadas Digitales que necesitan una base legal." : "Ideal for Digital Nomads and solo travelers who need a legal foothold.",
      features: [
        "Temporary Residency (2 years)",
        "Paraguayan ID Card (Cédula)",
        "Standard RUC (Tax ID) setup",
        "Document translation (up to 3)",
        "Remote preparation guidance",
        "Basic banking introduction"
      ],
      cta: t.cta1,
      highlight: false
    },
    {
      name: t.premium,
      price: "$2,200",
      description: lang === 'ES' ? "Servicio guante blanco para individuos de alto patrimonio." : "White-glove service for high-net-worth individuals and tax residents.",
      features: [
        "Permanent Residency / SUACE Fast-Track",
        "Paraguayan ID Card (Cédula)",
        "0% Foreign Income Tax Certificate",
        "VIP Accompaniment in Asunción",
        "Priority Bank Account Opening",
        "Unlimited translations & legalizations",
        "Lifetime WhatsApp support"
      ],
      cta: t.cta2,
      highlight: true
    },
    {
      name: t.corporate,
      price: "$3,800",
      description: lang === 'ES' ? "El paquete completo para familias y negocios internacionales." : "The complete package for families and international business owners.",
      features: [
        "Residency for 2 Family Members",
        "EAS Company Formation (Simplified Corp)",
        "Registered Business Address (1 Year)",
        "Full Corporate Banking Intro",
        "Custom Real Estate Scouting",
        "Luxury SUV Transfer for appointments",
        "Tax Planning Session with Experts"
      ],
      cta: t.cta3,
      highlight: false
    }
  ];

  const handleAction = () => {
    document.getElementById('ai-advisor')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-4 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold text-[#c19a5b] uppercase tracking-[0.4em] mb-4">Investment Plans</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#112643] mb-6">{t.title}</h3>
          <p className="text-slate-500 max-w-3xl mx-auto text-lg font-light leading-relaxed">
            We provide fixed-price solutions with zero hidden costs. Our efficiency ensures you get your residency within the legal processing windows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col p-10 rounded-[3rem] transition-all duration-700 border-2 ${
                tier.highlight 
                  ? 'bg-[#112643] text-white shadow-[0_40px_80px_rgba(17,38,67,0.3)] scale-105 z-10 border-[#c19a5b]/50' 
                  : 'bg-slate-50 text-slate-900 border-slate-100 hover:border-[#c19a5b]'
              }`}
            >
              <div className="mb-10">
                <h4 className={`text-2xl font-bold mb-4 ${tier.highlight ? 'text-[#c19a5b]' : 'text-[#112643]'}`}>{tier.name}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-serif font-bold tracking-tighter">{tier.price}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${tier.highlight ? 'text-slate-400' : 'text-slate-400'}`}>/one-time</span>
                </div>
                <p className={`mt-6 text-sm leading-relaxed font-light ${tier.highlight ? 'text-slate-300' : 'text-slate-500'}`}>{tier.description}</p>
              </div>
              
              <ul className="space-y-5 mb-12 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-4 text-sm font-medium">
                    <div className={`mt-1 rounded-full p-0.5 ${tier.highlight ? 'text-[#c19a5b]' : 'text-[#112643]'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={tier.highlight ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={handleAction}
                className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:shadow-xl active:scale-95 ${
                  tier.highlight 
                    ? 'bg-[#c19a5b] hover:bg-[#b0894a] text-white shadow-[#c19a5b]/20' 
                    : 'bg-[#112643] hover:bg-slate-800 text-white shadow-indigo-900/10'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center space-y-4">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest opacity-60">
            * Official Government fees are included. No hidden surcharges.
          </p>
          <div className="flex justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-900">
               <span className="w-2 h-2 rounded-full bg-emerald-500"></span> BANK WIRE
             </div>
             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-900">
               <span className="w-2 h-2 rounded-full bg-[#c19a5b]"></span> CRYPTO
             </div>
             <div className="flex items-center gap-2 text-[10px] font-bold text-slate-900">
               <span className="w-2 h-2 rounded-full bg-blue-500"></span> SEPA / SWIFT
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
