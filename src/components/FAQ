import React, { useState } from 'react';

interface FAQProps { lang: string; }

const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const [open, setOpen] = useState<number | null>(null);

  const questions = [
    {
      q: lang === 'ES' ? "¿Es necesario residir permanentemente?" : "Is permanent residence required?",
      a: lang === 'ES' ? "No. Para mantener el estatus de residencia permanente solo se requiere una visita a Paraguay cada tres años." : "No. To maintain permanent residency status, only one visit to Paraguay every three years is required."
    },
    {
      q: lang === 'ES' ? "¿Qué documentos debo apostillar?" : "Which documents need to be apostilled?",
      a: lang === 'ES' ? "Generalmente: Certificado de Nacimiento, Antecedentes Penales y Acta de Matrimonio (si aplica), todos con apostilla de La Haya." : "Generally: Birth Certificate, Criminal Record, and Marriage Certificate (if applicable), all with the Hague Apostille."
    },
    {
      q: lang === 'ES' ? "¿Puedo operar mi empresa internacional?" : "Can I run my international business?",
      a: lang === 'ES' ? "Sí. Paraguay no grava los ingresos generados fuera del territorio nacional, permitiendo una optimización fiscal del 0%." : "Yes. Paraguay does not tax income generated outside the national territory, allowing for 0% tax optimization."
    },
    {
      q: lang === 'ES' ? "¿Cuánto tiempo demora el proceso?" : "How long does the process take?",
      a: lang === 'ES' ? "El trámite de residencia suele completarse en 90 días, tras lo cual se emite la Cédula de Identidad paraguaya." : "The residency process is typically completed in 90 days, after which the Paraguayan Identity Card (Cédula) is issued."
    }
  ];

  return (
    <section className="py-24 bg-slate-50" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#c19a5b] font-black uppercase tracking-[0.4em] text-[10px] mb-4">
            {lang === 'ES' ? 'Preguntas Frecuentes' : 'Technical FAQ'}
          </h2>
          <h3 className="text-4xl font-serif font-bold text-[#112643]">
            {lang === 'ES' ? 'Protocolo y Consultas' : 'Protocol Inquiries'}
          </h3>
        </div>

        <div className="space-y-4">
          {questions.map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm">
              <button 
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full p-8 text-left flex justify-between items-center hover:bg-slate-50/50 transition-colors"
              >
                <span className="font-bold text-xs md:text-sm text-[#112643] uppercase tracking-widest">{item.q}</span>
                <span className={`text-[#c19a5b] transition-transform duration-500 ${open === idx ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
                </span>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${open === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-8 pt-0 text-slate-600 text-[15px] leading-relaxed font-light border-t border-slate-50">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
