
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
      role: lang === 'ES' ? "Permisos de Residencia" : lang === 'DE' ? "Aufenthaltsgenehmigungen" : "Residence Permits",
      desc: lang === 'ES' ? "Autoridad nacional para la emisión de residencias temporales y permanentes." : lang === 'DE' ? "Nationale Behörde für die Erteilung von Aufenthaltsgenehmigungen." : "The primary national authority for issuing residency resolutions.",
      icon: "🏛️"
    },
    {
      name: "MIC / SUACE",
      full: "Ministerio de Industria y Comercio",
      role: lang === 'ES' ? "Canal de Inversionistas" : lang === 'DE' ? "Investor Fast-Track" : "Investor Fast-Track",
      desc: lang === 'ES' ? "Sistema unificado para la apertura de empresas con prioridad." : lang === 'DE' ? "Vereinfachtes System zur Unternehmensgründung mit Priorität." : "Unified system providing priority processing for investors.",
      icon: "📈"
    },
    {
      name: "Banco Central",
      full: "Central Bank of Paraguay",
      role: lang === 'ES' ? "Grado de Inversión" : lang === 'DE' ? "Investment Grade Status" : "Investment Grade Status",
      desc: lang === 'ES' ? "Rating Baa3 de Moody's que confirma la estabilidad del capital." : lang === 'DE' ? "Baa3 Rating bestätigt Stabilität für privates Kapital." : "Baa3 rating confirms Paraguay as a safe, stable destination.",
      icon: "🏦"
    },
    {
      name: "Identificaciones",
      full: "Policía Nacional",
      role: lang === 'ES' ? "Emisión de Cédula" : lang === 'DE' ? "ID-Kartenausstellung" : "ID Card Issuance",
      desc: lang === 'ES' ? "Responsable de su documento de identidad y registro local." : lang === 'DE' ? "Zuständig für Ihre Cédula und lokale Registrierung." : "Department responsible for your identity documents.",
      icon: "🆔"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#c19a5b_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-20 gap-10">
          <div className="text-center lg:text-left">
            <h2 className="text-[#c19a5b] font-black uppercase tracking-[0.5em] text-[10px] mb-4">{t.title}</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">{t.subtitle}<br/><span className="text-[#c19a5b]/70">{t.grade}</span></h3>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#c19a5b]/40 to-transparent hidden lg:block"></div>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-4 backdrop-blur-xl">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{t.protocol}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {institutions.map((inst, idx) => (
            <div key={idx} className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2.5rem] p-10 transition-all duration-700 hover:-translate-y-2">
              <div className="absolute top-6 right-8 text-white/5 text-7xl font-bold group-hover:text-[#c19a5b]/10 transition-colors select-none">
                0{idx + 1}
              </div>
              <div className="w-16 h-16 bg-[#c19a5b]/10 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform shadow-inner shadow-[#c19a5b]/20">
                {inst.icon}
              </div>
              <h4 className="text-white font-bold text-2xl mb-2">{inst.name}</h4>
              <p className="text-[#c19a5b] text-[10px] font-black uppercase tracking-[0.3em] mb-6">{inst.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto transition-all duration-700 font-light overflow-hidden">
                {inst.desc}
              </p>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest border-t border-white/10 pt-6">
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
