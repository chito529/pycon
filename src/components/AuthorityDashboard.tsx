import React from 'react';
import { translations } from '../constants/translations';

interface AuthorityDashboardProps {
  lang: string;
}

const AuthorityDashboard: React.FC<AuthorityDashboardProps> = ({ lang }) => {
  const t = translations[lang as keyof typeof translations]?.authority || translations.EN.authority;

  const institutions = [
    {
      name: "DNM",
      full: "Dirección Nacional de Migraciones",
      role: lang === 'ES' ? "Residencia Permanente" : lang === 'DE' ? "Permanente Residenz" : "Permanent Residency",
      desc: lang === 'ES' ? "Autoridad exclusiva para la emisión de radicaciones definitivas bajo Ley 6984/2022." : lang === 'DE' ? "Exklusive Behörde für dauerhafte Aufenthalte nach Gesetz 6984/2022." : "Exclusive authority for issuing permanent residency under Law 6984/2022.",
      icon: "🏛️"
    },
    {
      name: "MIC / SUACE",
      full: "Ministerio de Industria y Comercio",
      role: lang === 'ES' ? "Inversionista VIP" : lang === 'DE' ? "VIP Investor" : "VIP Investor",
      desc: lang === 'ES' ? "Canal prioritario (Fast-track) para la obtención de documentos de inversión extranjeros." : lang === 'DE' ? "Prioritärer Fast-track-Kanal für ausländische Investitionsunterlagen." : "Priority fast-track channel for obtaining foreign investment documentation.",
      icon: "📈"
    },
    {
      name: "BCP",
      full: "Banco Central del Paraguay",
      role: lang === 'ES' ? "Estabilidad Capital" : lang === 'DE' ? "Kapitalstabilität" : "Capital Stability",
      desc: lang === 'ES' ? "Garante del Grado de Inversión y la inflación más baja y estable de la región." : lang === 'DE' ? "Garant für Investment Grade und die niedrigste Inflation in der Region." : "Guarantor of Investment Grade and the most stable, low inflation in the region.",
      icon: "🏦"
    },
    {
      name: "DIPEP",
      full: "Policía Nacional",
      role: lang === 'ES' ? "Cédula Jurídica" : lang === 'DE' ? "Juristische ID" : "Legal ID Card",
      desc: lang === 'ES' ? "Departamento encargado de la emisión del documento nacional de identidad biométrico." : lang === 'DE' ? "Zuständig für die Ausstellung der biometrischen nationalen Identitätskarte." : "Department in charge of issuing the biometric national identity document.",
      icon: "🆔"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-900 overflow-hidden relative">
      {/* Trama de fondo institucional */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c19a5b_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[#c19a5b] font-black uppercase tracking-[0.5em] text-[9px] md:text-[10px] mb-6 animate-pulse">
              {t.title || "Institutional Framework"}
            </h2>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1]">
              {t.subtitle || "Global Investment"} <br/>
              <span className="text-[#c19a5b]/70 italic">{t.grade || "Sovereign Trust"}</span>
            </h3>
          </div>
          
          <div className="hidden lg:block h-[1px] flex-1 bg-gradient-to-r from-[#c19a5b]/40 to-transparent mx-10 mb-6"></div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-xl mb-2">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
              {t.protocol || "Active Protocol"}
            </span>
          </div>
        </div>

        {/* Grid adaptable con tarjetas táctiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {institutions.map((inst, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white/5 hover:bg-[#112643] border border-white/10 rounded-[2rem] p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-[#c19a5b]/10"
            >
              <div className="absolute top-6 right-8 text-white/5 text-6xl font-bold group-hover:text-[#c19a5b]/10 transition-colors select-none">
                0{idx + 1}
              </div>
              
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#c19a5b]/10 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-8 group-hover:bg-[#c19a5b] group-hover:text-white transition-all duration-500">
                {inst.icon}
              </div>
              
              <h4 className="text-white font-bold text-xl md:text-2xl mb-2">{inst.name}</h4>
              <p className="text-[#c19a5b] text-[10px] font-black uppercase tracking-[0.3em] mb-6">{inst.role}</p>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-8 opacity-90 font-light">
                {inst.desc}
              </p>
              
              <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest border-t border-white/10 pt-6 group-hover:text-slate-300 transition-colors">
                {inst.full}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorityDashboard;
