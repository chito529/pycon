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
      description: lang === 'ES' ? "Ideal para Nómadas Digitales." : "Ideal for Digital Nomads.",
      features: ["Temporary Residency", "Paraguayan ID Card", "Tax ID (RUC) setup"],
      cta: t.cta1,
      highlight: false
    },
    {
      name: t.premium,
      price: "$2,200",
      description: lang === 'ES' ? "Servicio VIP Guante Blanco." : "VIP White-Glove Service.",
      features: ["Permanent Residency", "0% Foreign Income Tax", "VIP Accompaniment"],
      cta: t.cta2,
      highlight: true
    },
    {
      name: t.corporate,
      price: "$3,800",
      description: lang === 'ES' ? "Solución para Empresas y Familias." : "Business & Family Solution.",
      features: ["Company Formation", "Corporate Banking", "Family Residency"],
      cta: t.cta3,
      highlight: false
    }
  ];

  const handlePlanSelection = (planName: string) => {
    // 1. Scroll suave al chat
    document.getElementById('ai-advisor')?.scrollIntoView({ behavior: 'smooth' });

    // 2. Disparar el evento exacto que espera el AIConcierge
    const event = new CustomEvent('selectPlan', { detail: { plan: planName } });
    window.dispatchEvent(event);
  };

  return (
    <section className="py-24 px-4 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold text-[#c19a5b] uppercase tracking-[0.4em] mb-4 text-center">Investment Plans</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#112643] text-center">{t.title}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col p-10 rounded-[2.5rem] border-2 transition-all duration-500 ${
                tier.highlight 
                  ? 'bg-[#112643] text-white scale-105 border-[#c19a5b]/50 shadow-2xl' 
                  : 'bg-slate-50 border-slate-100'
              }`}
            >
              <h4 className={`text-2xl font-bold mb-4 ${tier.highlight ? 'text-[#c19a5b]' : 'text-[#112643]'}`}>{tier.name}</h4>
              <div className="text-5xl font-serif font-bold mb-6">{tier.price}</div>
              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm opacity-80">
                    <span className="text-[#c19a5b]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handlePlanSelection(tier.name)}
                className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  tier.highlight ? 'bg-[#c19a5b] text-white' : 'bg-[#112643] text-white'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
