import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Logo from './Logo';

interface AIConciergeProps { lang: string; }

const AIConcierge: React.FC<AIConciergeProps> = ({ lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Bienvenida inicial
  useEffect(() => {
    const welcomeText = lang === 'ES' 
      ? '¡Hola! Soy tu consultor de ParaguayConcierge. ¿Cómo puedo ayudarte hoy?' 
      : 'Hello! I am your ParaguayConcierge advisor. How can I assist you today?';
    setMessages([{ role: 'model' as const, text: welcomeText }]);
  }, [lang]);

  // Scroll automático
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  // ESCUCHAR SELECCIÓN DE PLANES
  useEffect(() => {
    const handlePlanSelection = (e: any) => {
      const planMsg = e.detail.message;
      handleSendMessage(planMsg);
    };

    window.addEventListener('ai-plan-selection', handlePlanSelection);
    return () => window.removeEventListener('ai-plan-selection', handlePlanSelection);
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user' as const, text: text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(-6).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await fetch("https://pycon-ai.juanalmiron529.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: chatHistory }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model' as const, text: data.text }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
    setInput('');
  };

  return (
    <section className="py-12 md:py-24 bg-slate-50" id="ai-advisor">
      <div className="max-w-5xl mx-auto px-0 md:px-4">
        <div className="text-center mb-8 px-4">
          <div className="flex justify-center mb-4">
            <Logo type="icon" size="sm" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#112643] mb-2 text-center">
            {lang === 'ES' ? 'Asesor Institucional' : 'Institutional Advisor'}
          </h2>
          <p className="text-slate-500 uppercase tracking-[0.2em] text-[9px] font-black text-center">AI Grounded in Live Legal Data</p>
        </div>

        <div className="bg-white md:rounded-[2.5rem] shadow-2xl border-t md:border border-slate-100 overflow-hidden flex flex-col h-[80vh] md:h-[700px]">
          <div className="bg-[#112643] p-4 md:p-6 flex items-center justify-between text-white border-b border-[#c19a5b]/20">
            <div className="flex items-center gap-3 text-left">
              <Logo type="icon" size="xs" variant="light" />
              <div>
                <p className="font-black text-[9px] uppercase tracking-[0.1em] text-left">Official Protocol</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase">System Online</span>
                </div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <div className="flex flex-col max-w-[85%] md:max-w-[80%]">
                  <div className={`px-4 py-3 rounded-[1.2rem] text-[13px] md:text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' ? 'bg-[#112643] text-white' : 'bg-white text-slate-800 border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.role === 'model' && (msg.text.toLowerCase().includes('whatsapp') || msg.text.toLowerCase().includes('contacto')) && (
                    <a 
                      href={`https://wa.me/595981492115?text=${encodeURIComponent("Hola, quiero iniciar mi proceso.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 bg-[#c19a5b] text-white text-center py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                    >
                      🚀 WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-[#c19a5b] text-[10px] font-black animate-pulse uppercase tracking-widest">IA is typing...</div>}
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-6 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'ES' ? 'Escribe aquí...' : 'Type here...'}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-[#c19a5b]/50 font-medium"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-[#112643] text-white p-4 rounded-xl shadow-lg active:scale-90 transition-all disabled:opacity-50"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AIConcierge;
