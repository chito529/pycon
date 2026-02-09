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
    // Desplazamiento suave al chat
    const chatSection = document.getElementById('ai-advisor');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Emitir evento para el chat
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-[2rem] border-2 transition-all duration-500 ${
                pkg.highlight 
                  ? 'border-[#c19a5b] bg-[#112643] text-
