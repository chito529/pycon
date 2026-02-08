
import React, { useState } from 'react';
import Logo from './Logo';

interface FooterProps {
  lang: string;
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJoinClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
    setEmail('');
  };

  return (
    <footer className="bg-[#112643] text-slate-300 py-24 px-4 relative overflow-hidden border-t border-[#c19a5b]/20">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c19a5b] to-transparent opacity-30"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#c19a5b]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 mb-20">
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <Logo size="lg" variant="light" className="mb-10 -ml-2" />
            <p className="text-sm leading-relaxed mb-8 opacity-60 font-light italic">
              The premier global gateway for sovereign relocation and institutional tax engineering in South America's Investment Grade heartland.
            </p>
            <div className="flex gap-4">
              {['Ln', 'Ig', '𝕏'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#c19a5b] hover:text-white transition-all duration-300">
                  <span className="text-xs font-bold">{social}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Ecosystem</h4>
            <ul className="space-y-4 text-xs font-medium uppercase tracking-widest">
              <li><button onClick={() => scrollTo('calculator')} className="hover:text-[#c19a5b] transition-colors">Tax Savings</button></li>
              <li><button onClick={() => scrollTo('services')} className="hover:text-[#c19a5b] transition-colors">Elite Services</button></li>
              <li><button onClick={() => scrollTo('pricing')} className="hover:text-[#c19a5b] transition-colors">Global Plans</button></li>
              <li><button onClick={() => scrollTo('ai-advisor')} className="hover:text-[#c19a5b] transition-colors">AI Concierge</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Compliance</h4>
            <ul className="space-y-4 text-xs font-medium uppercase tracking-widest">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c19a5b]"></span> DNM Verified</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c19a5b]"></span> Baa3 Grade Bank Partners</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c19a5b]"></span> GDPR Secure</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c19a5b]"></span> Ley 6984 Experts</li>
            </ul>
          </div>

          <div className="relative">
            <h4 className="text-white font-black mb-8 uppercase tracking-[0.3em] text-[10px]">Intelligence Report</h4>
            <p className="text-xs mb-6 opacity-60 italic leading-relaxed">Join the "Sovereign Intelligence Report" for monthly tax law and yield analysis.</p>
            
            {!isSubscribed ? (
              <form onSubmit={handleJoinClub} className="space-y-3">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="professional@email.com" 
                  className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-xs w-full focus:outline-none focus:ring-1 focus:ring-[#c19a5b] transition-all placeholder:opacity-30" 
                />
                <button 
                  type="submit"
                  className="w-full bg-[#c19a5b] hover:bg-[#b0894a] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
                >
                  Join the List
                </button>
              </form>
            ) : (
              <div className="bg-[#c19a5b]/10 border border-[#c19a5b]/30 rounded-2xl p-6 animate-in fade-in zoom-in duration-500">
                <p className="text-[#c19a5b] font-black text-[10px] uppercase tracking-[0.3em] text-center mb-1">Success</p>
                <p className="text-xs text-white text-center opacity-80">Intelligence Access Granted.</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.3em] font-black opacity-30">
          <p>© {new Date().getFullYear()} ParaguayConcierge.com • Paraguay Concierge Global</p>
          <div className="flex gap-10">
            <button className="hover:text-white transition-colors">Privacy</button>
            <button className="hover:text-white transition-colors">Terms</button>
            <button className="hover:text-white transition-colors">Compliance</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
