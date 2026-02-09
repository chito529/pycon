import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Logo from './Logo';

interface AIConciergeProps { lang: string; }

const AIConcierge: React.FC<AIConciergeProps> = ({ lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = "595981492115";
  const CALENDAR_LINK = "https://calendar.app.google/qnGfL7nwnFSbs3Yv8";

  // Bienvenida inicial
  useEffect(() => {
    const welcome = lang === 'ES' 
      ? '¡Hola! Soy tu consultor senior. ¿En qué puedo asesorarte hoy?' 
      : 'Hello! I am your senior consultant. How can I assist you today?';
    setMessages([{ role: 'model' as const, text: welcome }]);
  }, [lang]);

  // Escuchar evento de Pricing
  useEffect(() => {
    const handlePlanEvent = (e: any) => {
      const planName = e.detail.plan;
      const prompt = lang === 'ES' 
        ? `Me interesa el plan ${planName}. ¿Cuáles son los próximos pasos?` 
        : `I am interested in the ${planName} plan. What are the next steps?`;
      if (!isLoading) sendMessage(prompt);
    };
    window.addEventListener('selectPlan', handlePlanEvent);
    return () => window.removeEventListener('selectPlan', handlePlanEvent);
  }, [lang, messages]);

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = { role: 'user' as const, text: text.trim() };
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
        body: JSON.stringify({ message: text.trim(), history: chatHistory }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'model' as const, text: data.text }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const shouldShowButtons = (text: string) => {
    const t = text.toLowerCase();
    return t.includes('whatsapp') || t.includes('contacto') || t.includes('reunión') || t.includes('reunion') || t.includes('cita') || t.includes('llamada') || t.includes('agendar');
  };

  return (
    <section className="py-12 md:py-24 bg-slate-50 px-0 md:px-4" id="ai-advisor">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 px-4">
          <div className="flex justify-center mb-4"><Logo type="icon" size="sm" /></div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#112643]">
            {lang === 'ES' ? 'Asesor Institucional' : 'Institutional Advisor'}
          </h2>
        </div>

        <div className="bg-white md:rounded-[2.5rem] shadow-2xl border-t md:border border-slate-100 flex flex-col h-[85vh] md:h-[700px] overflow-hidden">
          <div className="bg-[#112643] p-4 md:p-6 flex items-center gap-4 text-white border-b border-[#c19a5b]/20">
            <Logo type="icon" size="xs" variant="light" />
            <div className="text-left">
               <span className="text-[10px] font-black uppercase tracking-widest block">Official Protocol Chat</span>
               <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">System Online</span>
               </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/50 chat-scrollbar text-left">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex flex-col max-w-[85%] md:max-w-[75%] gap-3">
                  <div className={`px-5 py-3 rounded-2xl text-[15px] md:text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' ? 'bg-[#112643] text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.role === 'model' && shouldShowButtons(msg.text) && (
                    <div className="mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c19a5b] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c19a5b]"></span>
                        </span>
                        <span className="text-[#c19a5b] text-[9px] font-black uppercase tracking-[0.2em]">Respuesta Instantánea</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a 
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, me gustaría coordinar los pasos con un asesor.")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                        >
                          WhatsApp
                        </a>
                        <a 
                          href={CALENDAR_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#c19a5b] text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                        >
                          📅 Reservar Reunión
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-[#c19a5b] text-[10px] font-black animate-pulse uppercase tracking-widest">IA Pensando...</div>}
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-6 bg-white border-t border-slate-100 mb-safe">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-[#c19a5b]/50"
                placeholder={lang === 'ES' ? 'Escribe aquí...' : 'Type here...'}
                disabled={isLoading}
              />
              <button type="submit" className="bg-[#112643] text-white p-4 rounded-xl shadow-lg active:scale-90 transition-all disabled:opacity-50" disabled={isLoading}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AIConcierge;
