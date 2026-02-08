
import React from 'react';

const testimonials = [
  {
    name: "Dr. Julian Voss",
    origin: "Frankfurt, Germany",
    role: "Fintech Founder",
    text: "The 0% territorial tax structuring provided by the Concierge team was flawless. My residency was approved within 72 days as promised. Truly elite service.",
    avatar: "JV"
  },
  {
    name: "Elena Rodriguez",
    origin: "Madrid, Spain",
    role: "Global Consultant",
    text: "Moving my family and corporation to Asunción seemed daunting until I met this team. They handled school enrollments and private banking with impressive efficiency.",
    avatar: "ER"
  },
  {
    name: "Marcus Chen",
    origin: "Singapore",
    role: "Crypto Investor",
    text: "Paraguay is the hidden gem of 2026. This firm is the only one I trust with complex digital asset liquidation through local Investment Grade banks.",
    avatar: "MC"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-[#c19a5b] font-black uppercase tracking-[0.5em] text-[10px] mb-4">Client Portfolio</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#112643]">Global Voices of Trust</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 relative group hover:bg-[#112643] transition-all duration-700">
              <div className="text-6xl text-[#c19a5b]/20 font-serif absolute top-8 right-8 group-hover:text-[#c19a5b]/10 transition-colors">“</div>
              <div className="w-14 h-14 rounded-2xl bg-[#c19a5b] flex items-center justify-center text-white font-black mb-8 shadow-lg shadow-[#c19a5b]/20">
                {t.avatar}
              </div>
              <p className="text-slate-600 text-sm leading-[2] font-light mb-8 italic group-hover:text-slate-300 transition-colors">
                "{t.text}"
              </p>
              <div className="pt-8 border-t border-slate-200 group-hover:border-white/10">
                <h4 className="text-[#112643] font-bold text-lg group-hover:text-white transition-colors">{t.name}</h4>
                <p className="text-[#c19a5b] text-[10px] font-black uppercase tracking-[0.2em] mt-1">{t.role} • {t.origin}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
