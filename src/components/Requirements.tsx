
import React from 'react';

interface RequirementsProps {
  lang: string;
}

const requirements = [
  {
    title: "Valid Passport",
    desc: "Must be valid for at least 6 months. A high-resolution color scan of all pages (including empty ones) is required for the initial audit.",
    icon: "🛂"
  },
  {
    title: "Birth Certificate",
    desc: "Certified copy issued within the last 12 months. Mandatory Hague Apostille or Legalization at the nearest Paraguayan consulate.",
    icon: "👶"
  },
  {
    title: "Criminal Record",
    desc: "Background check from your country of origin and any country where you resided for the last 3 years. Must be Apostilled.",
    icon: "📜"
  },
  {
    title: "Civil Status",
    desc: "Marriage or Divorce certificates if applicable. Must follow the same Apostille/Legalization protocol for validity in Paraguay.",
    icon: "💍"
  }
];

const Requirements: React.FC<RequirementsProps> = ({ lang }) => {
  return (
    <section className="py-24 bg-slate-50 px-4" id="requirements">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-xs font-black text-[#c19a5b] uppercase tracking-[0.5em] mb-3">Institutional Compliance</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#112643] mb-8 leading-tight">Documentary Protocol</h3>
            <p className="text-slate-600 mb-10 text-lg leading-relaxed font-light">
              Under the <span className="font-bold text-[#112643]">Nueva Ley de Migraciones 6984/2022</span>, the following documents are non-negotiable for a successful residency application. Our legal team performs a 24-step audit on every document before you board your flight.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-6 items-start bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group transition-all hover:shadow-lg">
                <div className="bg-[#c19a5b] text-white p-4 rounded-2xl font-black text-xl shadow-lg shadow-[#c19a5b]/20">!</div>
                <div>
                  <h4 className="font-bold text-[#112643] text-lg mb-2">The Apostille Rule</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">
                    Paraguay is a signatory of the Hague Convention. Documents from non-signatory countries must be legalized through the Ministry of Foreign Affairs and the Paraguayan Consulate. 
                    <span className="block mt-2 font-bold text-[#c19a5b]">We assist with worldwide document procurement.</span>
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center text-center">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 italic">Preparation Phase</p>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                  Ensure all physical documents are stored in a climate-controlled environment to preserve stamps and security watermarks during transit.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {requirements.map((req, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all group hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#c19a5b]/5 rounded-bl-full transform translate-x-8 -translate-y-8 transition-transform group-hover:translate-x-4 group-hover:-translate-y-4"></div>
                <div className="text-5xl mb-8 group-hover:scale-110 transition-transform inline-block grayscale group-hover:grayscale-0 transition-all">{req.icon}</div>
                <h4 className="text-xl font-bold text-[#112643] mb-4">{req.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{req.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Requirements;
