
import React, { useState } from 'react';
import { translations } from '../constants/translations';

// Added Props interface to accept lang from parent
interface TaxCalculatorProps {
  lang: string;
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({ lang }) => {
  const [income, setIncome] = useState<number>(100000);
  const [currentTax, setCurrentTax] = useState<number>(35);
  const t = translations[lang as keyof typeof translations]?.calculator || translations.EN.calculator;

  const calculateSavings = () => {
    const paidNow = (income * currentTax) / 100;
    const paraguayTax = 0; // Foreign income tax in PY
    return paidNow - paraguayTax;
  };

  return (
    <section className="py-24 bg-[#112643] text-white overflow-hidden relative" id="calculator">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c19a5b]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-[#c19a5b] font-black uppercase tracking-[0.4em] text-xs mb-4">The Wealth Arbitrage</h2>
            <h3 className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight">{t.title}</h3>
            <p className="text-slate-300 text-xl mb-10 font-light leading-relaxed">
              {t.subtitle}
            </p>
            <div className="flex items-center gap-6 p-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md">
              <div className="w-14 h-14 bg-[#c19a5b]/20 rounded-2xl flex items-center justify-center text-[#c19a5b]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-xs text-slate-400 font-medium">Calculations based on standard OECD tax rates vs. Paraguayan Ley de Reforma Tributaria.</p>
            </div>
          </div>

          <div className="bg-white rounded-[3.5rem] p-10 md:p-14 text-slate-900 shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-[#c19a5b]/10">
            <div className="space-y-10">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{t.label1}</label>
                <input 
                  type="range" 
                  min="30000" 
                  max="1000000" 
                  step="10000"
                  value={income} 
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#c19a5b]"
                />
                <div className="text-4xl font-black text-[#112643] mt-6 tracking-tighter">${income.toLocaleString()} <span className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">USD</span></div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{t.label2}</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={currentTax}
                    onChange={(e) => setCurrentTax(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-xl font-black text-[#112643] focus:ring-2 focus:ring-[#c19a5b]/50 focus:outline-none transition-all"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#c19a5b] font-black">%</span>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-100 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4 text-[#c19a5b]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
                </div>
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-center">{t.savings}</div>
                <div className="text-6xl md:text-7xl font-serif font-bold text-[#c19a5b] text-center tracking-tighter animate-pulse">
                  ${calculateSavings().toLocaleString()}
                </div>
                <p className="text-slate-400 text-[10px] font-bold text-center mt-6 uppercase tracking-widest opacity-60">
                  {lang === 'ES' ? `Eso es $${Math.round(calculateSavings()/12).toLocaleString()} extra al mes para su estilo de vida.` : `That's $${Math.round(calculateSavings()/12).toLocaleString()} extra per month for your lifestyle.`}
                </p>
              </div>

              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-[#112643] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95 group"
              >
                {t.cta}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxCalculator;
