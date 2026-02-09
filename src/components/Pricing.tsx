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
      description: lang === 'ES' ? "Servicio guante blanco VIP." : "White-glove VIP service.",
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
      description: lang === 'ES' ? "Paquete completo para empresas." : "Complete package for businesses.",
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

  const handlePlanSelection = (planName: string) => {
    // 1. Scroll suave al chat
    document.getElementById('ai-advisor')?.scrollIntoView({ behavior: 'smooth' });

    // 2. Emitir evento para la IA
    const message = lang === 'ES' 
      ? `Me interesa el ${planName}. ¿Cómo agendamos para iniciar?` 
      : `I am interested in the ${planName}. How can we schedule to start?`;

    const event = new CustomEvent('ai-plan-selection', { detail: { message } });
    window.dispatchEvent(event);
  };

  return (
    <section className="py-24 px-4 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold text-[#c19a5b] uppercase tracking-[0.4em] mb-4 text-center">Investment Plans</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#112643] mb-6 text-center">{t.title}</h3>
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
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">/one-time</span>
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
                onClick={() => handlePlanSelection(tier.name)}
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
      </div>
    </section>
  );
};

export default Pricing;
