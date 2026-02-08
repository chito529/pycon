
import React from 'react';

interface SEOSectionProps {
  lang: string;
}

const knowledgeBase = [
  {
    title: "Territorial Taxation: The Legal Foundation",
    content: "Paraguay's tax code (Ley 125/91 and updated 6380/19) establishes a strictly territorial system. Unlike citizenship-based taxation (USA) or worldwide taxation (Europe/Canada), Paraguay only taxes income generated within its borders. In 2026, this remains the most competitive legal framework for global citizens seeking fiscal sovereignty."
  },
  {
    title: "Investment Grade Status: Moody's Baa3",
    content: "The upgrade to Investment Grade status (Moody's Baa3) has fundamentally changed the risk profile of Paraguay. In 2026, residents enjoy a more stable banking environment, increased foreign direct investment (FDI), and enhanced international reputation, making the 'Cédula' a highly prestigious asset for global business."
  }
];

const faqs = [
  {
    q: "Why choose Paraguay in 2026 over other MERCOSUR nations?",
    a: "While Argentina and Brazil struggle with inflation and fiscal volatility, Paraguay maintains its Baa3 Investment Grade status, low public debt, and a predictable 10-10-10 tax system (VAT, Personal Income, Corporate Income). It is the regional leader in institutional stability."
  },
  {
    q: "How does the naturalization process work for citizenship?",
    a: "After 3 years of holding permanent residency, you are eligible to apply for naturalization. The process requires proof of ties to the country, basic Spanish or Guaraní knowledge, and a petition to the Supreme Court. It is a true path to a second passport in a neutral, peaceful nation."
  },
  {
    q: "Can I obtain residency remotely?",
    a: "While much of the document audit and preparation is done remotely, the biometric phase (Migraciones, Interpol, Medical) requires a physical presence in Asunción for approximately 24-48 hours. Our concierge team handles all logistics to ensure this visit is efficient and seamless."
  },
  {
    q: "What are the banking benefits of the new rating?",
    a: "Investment Grade status means Paraguayan banks have better access to international credit lines. For residents, this translates to easier international transfers, higher credit limits, and a banking sector that is increasingly integrated with global fintech and crypto-compliance standards."
  }
];

const SEOSection: React.FC<SEOSectionProps> = ({ lang }) => {
  return (
    <section className="py-24 px-4 bg-white border-t border-slate-100" id="knowledge-hub">
      <div className="max-w-6xl mx-auto">
        <article className="text-center mb-24">
          <h2 className="text-xs font-black text-[#c19a5b] uppercase tracking-[0.5em] mb-4">
            {lang === 'ES' ? 'La Ventaja Soberana' : 'The Sovereign Advantage'}
          </h2>
          <h3 className="text-4xl md:text-6xl font-serif font-bold text-[#112643] mb-8 leading-tight">Architects of Freedom in an<br/>Investment Grade Economy</h3>
          <p className="mt-8 text-slate-500 max-w-3xl mx-auto text-lg font-light leading-relaxed">
            In 2026, Paraguay stands as the gold standard of fiscal liberty. 
            Our firm provides the bridge to this jurisdiction with unparalleled legal precision.
          </p>
        </article>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {knowledgeBase.map((item, idx) => (
            <div key={idx} className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-2xl group">
              <h4 className="text-xl font-bold text-[#112643] mb-8 flex items-center gap-4">
                <span className="w-2 h-10 bg-[#c19a5b] rounded-full"></span>
                {item.title}
              </h4>
              <p className="text-slate-600 text-sm leading-[2] font-light">
                {item.content}
              </p>
            </div>
          ))}
        </div>
        
        <div className="bg-[#112643] rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl border border-[#c19a5b]/20">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#c19a5b20,transparent_60%)]"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-4xl font-serif font-bold mb-20 text-center tracking-tight">Intelligence Briefing: FAQs</h3>
            <div className="space-y-12">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/10 pb-10 group cursor-default">
                  <h4 className="text-xl font-bold text-[#c19a5b] mb-6 group-hover:text-white transition-colors">{faq.q}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-light opacity-90">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 pt-24 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {[
            { label: "Baa3 Stability", text: "Moody's Investment Grade confirms a safe landscape for high-net-worth relocations." },
            { label: "Sovereign Goal", text: "A global leader in organic agriculture and clean energy production (Itaipu Hydroelectric)." },
            { label: "Stable Economy", text: "Low public debt and consistent GDP growth compared to regional peers in 2026." },
            { label: "Plan B Luxury", text: "Asunción offers high-end dining, shopping, and real estate at a fraction of global costs." }
          ].map((stat, sIdx) => (
            <div key={sIdx}>
              <h5 className="font-black text-[#112643] text-[10px] uppercase tracking-[0.4em] mb-4">{stat.label}</h5>
              <p className="text-slate-500 text-[11px] leading-relaxed font-light">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEOSection;
