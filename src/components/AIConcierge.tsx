import React, { useState } from 'react';

interface AIConciergeProps {
  lang: string;
}

const AIConcierge: React.FC<AIConciergeProps> = ({ lang }) => {
  const [selectedTopic, setSelectedTopic] = useState('Residency');
  const WHATSAPP_NUMBER = "595981492115";

  const topics = [
    { id: 'Residency', es: 'Residencia Permanente', en: 'Permanent Residency' },
    { id: 'Tax', es: 'Optimización Fiscal', en: 'Tax Optimization' },
    { id: 'Corporate', es: 'Apertura de Empresa', en: 'Company Formation' }
  ];

  const getWhatsAppLink = () => {
    const currentTopic = topics.find(t => t.id === selectedTopic);
    const topicLabel = lang === 'ES' ? currentTopic?.es : currentTopic?.en;
    
    const message = lang === 'ES' 
      ? `Hola, me gustaría recibir asesoría experta sobre: ${topicLabel}.`
      : `Hello, I would like to receive expert advice on: ${topicLabel}.`;
      
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="ai-advisor" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#112643] rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden border border-[#c19a5b]/20">
          
          <div className="relative z-10 text-center">
            <h2 className="text-[#c19a5b] font-black uppercase tracking-[0.5em] text-[10px] mb-6">
              {lang === 'ES' ? 'Canal de Comunicación VIP' : 'VIP Communication Channel'}
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-10 leading-tight">
              {lang === 'ES' ? 'Hable con un Asesor' : 'Speak with an Advisor'}
            </h3>

            {/* Selector de Temas Estilizado */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border-2 ${
                    selectedTopic === topic.id
                      ? 'bg-[#c19a5b] border-[#c19a5b] text-white shadow-lg shadow-[#c19a5b]/20 scale-105'
                      : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                  }`}
                >
                  {lang === 'ES' ? topic.es : topic.en}
                </button>
              ))}
            </div>

            <div className="max-w-md mx-auto">
              <p className="text-white/60 text-sm mb-10 font-light leading-relaxed">
                {lang === 'ES' 
                  ? 'Nuestro equipo de Concierge está disponible para coordinar su proceso de manera inmediata y confidencial.' 
                  : 'Our Concierge team is available to coordinate your process immediately and confidentially.'}
              </p>

              {/* Botón de WhatsApp Dinámico */}
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-6 bg-white text-[#112643] py-6 px-10 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#c19a5b] hover:text-white transition-all duration-700 shadow-2xl"
              >
                <svg className="w-6 h-6 transition-transform group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {lang === 'ES' ? 'Solicitar Consultoría' : 'Request Consultation'}
              </a>
              
              <div className="mt-8 flex items-center justify-center gap-4 text-white/30 text-[9px] font-black uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {lang === 'ES' ? 'Asesores en línea' : 'Advisors online'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConcierge;
