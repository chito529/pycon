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

  useEffect(() => {
    const welcome = lang === 'ES' 
      ? '¡Hola! Soy tu consultor senior. ¿En qué puedo asesorarte hoy?' 
      : 'Hello! I am your senior consultant. How can I assist you today?';
    setMessages([{ role: 'model' as const, text: welcome }]);
  }, [lang]);

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
    <section className="py-12 md:py-24 bg-slate-50 px-4" id="ai-advisor">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4"><Logo type="icon" size="sm" /></div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#112643]">
            {lang === 'ES' ? 'Asesor Institucional' : 'Institutional Advisor'}
          </h2>
        </div>

        <div className="bg-white md:rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col h-[600px] md:h-[700px] overflow-hidden">
          <div className="bg-[#112643] p-4 flex items-center gap-4 text-white">
            <Logo type="icon" size="xs" variant="light" />
            <span className="text-[10px] font-black uppercase tracking-widest">System Online</span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex flex-col max-w-[85%] md:max-w-[70%] gap-2">
                  <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                    msg.role === 'user' ? 'bg-[#112643] text-white' : 'bg-white text-slate-800 border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.role === 'model' && shouldShowButtons(msg.text) && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <a 
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero coordinar los pasos con un asesor.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest"
                      >
                        WhatsApp
                      </a>
                      <a 
                        href={CALENDAR_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#c19a5b] text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest"
                      >
                        📅 Reservar Reunión
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-[#c19a5b] text-[10px] font-black animate-pulse uppercase">IA Pensando...</div>}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#c19a5b]"
                placeholder={lang === 'ES' ? 'Escribe aquí...' : 'Type here...'}
              />
              <button type="submit" className="bg-[#112643] text-white p-3 rounded-xl shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AIConcierge;
