import React from 'react';

interface PricingProps { lang: string; }

const Pricing: React.FC<PricingProps> = ({ lang }) => {
  const packages = [
    {
      name: 'Essential',
      price: '$1,450',
      features: lang === 'ES' 
        ? ['Residencia Permanente', 'Cédula Paraguaya', 'Gestión de Documentos', 'Acompañamiento Local']
        : ['Permanent Residency', 'Paraguayan ID Card', 'Document Management', 'Local Assistance'],
      highlight: false
    },
    {
      name: 'Premium',
      price: '$2,200',
      features: lang === 'ES'
        ? ['Todo en Essential', 'VIP Airport Transfer', 'Prioridad en Trámites', 'Asesoría Fiscal Inicial']
        : ['Everything in Essential', 'VIP Airport Transfer', 'Priority Processing', 'Initial Tax Advisory'],
      highlight: true
    },
    {
      name: 'Corporate',
      price: '$3,800',
      features: lang === 'ES'
        ? ['Todo en Premium', 'Apertura de Sociedad', 'Estructura Corporativa', 'Cuenta Bancaria Business']
        : ['Everything in Premium', 'Company Formation', 'Corporate Structuring', 'Business Bank Account'],
      highlight: false
    }
  ];

  const handlePlanSelection = (planName: string) => {
    const chatSection = document.getElementById('ai-advisor');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
    const event = new CustomEvent('selectPlan', { detail: { plan: planName } });
    window.dispatchEvent(event);
  };

  return (
    <section className="py-12 md:py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#112643] mb-4">
            {lang === 'ES' ? 'Inversión en tu Futuro' : 'Investment in Your Future'}
          </h2>
          <div className="w-20 h-1 bg-[#c19a5b] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`relative p-6 md:p-8 rounded-[2rem] border-2 transition-all duration-500 ${
                pkg.highlight 
                  ? 'border-[#c19a5b] bg-[#112643] text-white shadow-2xl md:scale-105 z-10' 
                  : 'border-slate-100 bg-slate-50 text-[#112643]'
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c19a5b] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {lang === 'ES' ? 'Más Popular' : 'Most Popular'}
                </span>
              )}
              
              <h3 className="text-2xl font-serif font-bold mb-2">{pkg.name}</h3>
              <div className={`text-4xl font-light mb-8 ${pkg.highlight ? 'text-[#c19a5b]' : 'text-[#112643]'}`}>
                {pkg.price}
              </div>

              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <svg className={`w-5 h-5 flex-shrink-0 ${pkg.highlight ? 'text-[#c19a5b]' : 'text-[#112643]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handlePlanSelection(pkg.name)}
                className={`w-full py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 ${
                  pkg.highlight 
                    ? 'bg-[#c19a5b] text-white hover:bg-[#a6824a]' 
                    : 'bg-[#112643] text-white hover:bg-slate-800'
                }`}
              >
                {lang === 'ES' ? 'Seleccionar Plan' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
