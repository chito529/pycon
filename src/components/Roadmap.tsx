
import React from 'react';
import Logo from './Logo';

interface RoadmapProps {
  lang: string;
}

const steps = [
  { day: "Phase 1", title: "Document Audit", desc: "Digital review of your apostilled documents. We ensure everything is 100% compliant before you travel." },
  { day: "Phase 2", title: "The Visit", desc: "A 24-hour trip to Asunción. We escort you to Interpol, Medical, and Migraciones for biometrics." },
  { day: "Phase 3", title: "Legal Processing", desc: "Our lawyers manage the case. Migraciones typically issues the Residency Resolution in 60-90 days." },
  { day: "Phase 4", title: "Identity Card", desc: "Once residency is granted, we apply for your Cédula. Issuance takes approximately 30-45 additional days." },
  { day: "Phase 5", title: "Tax Residency", desc: "With your Cédula in hand, we activate your RUC (Tax ID) and issue your 0% Tax Residence certificate." }
];

const Roadmap: React.FC<RoadmapProps> = ({ lang }) => {
  return (
    <section className="py-24 bg-white px-4 border-t border-slate-100" id="roadmap">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-xs font-bold text-[#c19a5b] uppercase tracking-[0.4em] mb-4">Realistic Timeline</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#112643]">Your Path to Legal Status</h3>
          <p className="text-slate-500 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
            Following the 2022 Migration Law reform, we prioritize accuracy over empty promises. Here is the institutional process for a successful relocation.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line for Desktop */}
          <div className="absolute top-[32px] left-0 w-full h-[1px] bg-slate-100 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#112643] flex items-center justify-center mb-8 z-10 group-hover:bg-[#c19a5b] group-hover:border-[#c19a5b] transition-all duration-500 shadow-sm relative overflow-hidden">
                  <span className="text-[#112643] font-black group-hover:text-white relative z-10">{idx + 1}</span>
                  <div className="absolute inset-0 bg-[#c19a5b] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </div>
                <p className="text-[#c19a5b] font-black text-[10px] uppercase tracking-[0.3em] mb-3">{step.day}</p>
                <h4 className="text-lg font-bold text-[#112643] mb-4 group-hover:text-[#c19a5b] transition-colors">{step.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 flex justify-center">
          <button 
            onClick={() => document.getElementById('ai-advisor')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-4 bg-slate-50 border border-slate-200 px-8 py-4 rounded-full hover:border-[#c19a5b] transition-all"
          >
            <Logo type="icon" size="xs" className="opacity-40 group-hover:opacity-100 transition-opacity" />
            <span className="text-[#112643] font-bold text-xs uppercase tracking-[0.2em] group-hover:text-[#c19a5b]">
              {lang === 'ES' ? 'Generar Mi Cronograma Personalizado' : 'Generate My Custom Timeline'}
            </span>
            <svg className="w-4 h-4 text-[#c19a5b] transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
