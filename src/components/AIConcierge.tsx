import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Logo from './Logo';

interface AIConciergeProps { lang: string; }

const AIConcierge: React.FC<AIConciergeProps> = ({ lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Configuración de Enlaces Institucionales
  const WHATSAPP_NUMBER = "595981492115";
  const CALENDAR_LINK = "https://calendar.app.google/qnGfL7nwnFSbs3Yv8";

  useEffect(() => {
    const welcomeText = lang === 'ES' 
      ? '¡Hola! Soy tu consultor de ParaguayConcierge. ¿Cómo puedo ayudarte hoy?' 
      : 'Hello! I am your ParaguayConcierge advisor. How can I assist you today?';
    setMessages([{ role: 'model' as const, text: welcomeText }]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    const handlePlanSelection = (e: any) => {
      handleSendMessage(e.detail.message);
    };
    window.addEventListener('ai-plan-selection', handlePlanSelection);
    return () => window.removeEventListener('ai-plan-selection', handlePlanSelection);
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    const userMessage: ChatMessage = { role: 'user' as const, text: userMsg };
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
        body: JSON.stringify({ 
          message: userMsg, 
          history: chatHistory,
          language: lang 
        }),
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

  const shouldShowActions = (text: string) => {
    const t = text.toLowerCase();
    return t.includes('whatsapp') || 
           t.includes('llamada') || 
           t.includes('reunión') || 
           t.includes('reunion') || 
           t.includes('contacto') || 
           t.includes('contactemos') || 
           t.includes('cita') ||
           t.includes('meeting') ||
           t.includes('schedule') ||
           t.includes('call') ||
           t.includes('agendar');
  };

  return (
    <section className="py-12 md:py-24 bg-slate-50" id="ai-advisor">
      <div className="max-w-5xl mx-auto px-0 md:px-4">
        <div className="text-center mb-8 md:mb-16 px-4">
          <div className="flex justify-center mb-4 md:mb-6">
            <Logo type="icon" size="sm" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#112643] mb-2 text-center">
            {lang === 'ES' ? 'Asesor Institucional' : 'Institutional Advisor'}
          </h2>
          <p className="text-slate-500 uppercase tracking-[0.2em] text-[9px] font-black text-center italic">AI Grounded in Live Legal Data</p>
        </div>

        <div className="bg-white md:rounded-[2.5rem] shadow-2xl border-t md:border border-slate-100 overflow-hidden flex flex-col h-[80vh] md:h-[700px]">
          <div className="bg-[#112643] p-4 md:p-6 flex items-center justify-between text-white border-b border-[#c19a5b]/20">
            <div className="flex items-center gap-3">
              <Logo type="icon" size="xs" variant="light" />
              <div className="text-left">
                <p className="font-black text-[9px] uppercase tracking-[0.1em]">Official Protocol</p>
                <div className="flex items-center gap-1.5 mt-0.5 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">System Online</span>
                </div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex-shrink-0 hidden md:flex items-center justify-center p-1.5">
                    <Logo type="icon" size="xs" />
                  </div>
                )}
                <div className="flex flex-col max-w-[85%] md:max-w-[80%]">
                  <div className={`px-4 py-3 md:px-6 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] text-[13px] md:text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#112643] text-white rounded-tr-none ml-auto' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.role === 'model' && shouldShowActions(msg.text) && (
                    <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c19a5b] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c19a5b]"></span>
                        </span>
                        <span className="text-[#c19a5b] text-[9px] font-black uppercase tracking-[0.2em]">
                          {lang === 'ES' ? 'Respuesta Instantánea' : 'Instant Response'}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a 
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'ES' ? "Hola, me gustaría coordinar los siguientes pasos." : "Hello, I would like to coordinate the next steps.")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:brightness-105 transition-all shadow-md active:scale-95"
                        >
                          WhatsApp
                        </a>
                        <a 
                          href={CALENDAR_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white border border-slate-200 text-slate-700 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-md active:scale-95"
                        >
                          {lang === 'ES' ? 'Agendar Cita' : 'Schedule Call'}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-[#c19a5b] text-[10px] font-black animate-pulse uppercase tracking-widest ml-2 md:ml-12">IA is thinking...</div>}
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-6 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'ES' ? 'Escribe aquí...' : 'Type here...'}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-[#c19a5b]/50 transition-all font-medium"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-[#112643] text-white p-4 rounded-xl shadow-lg disabled:opacity-50 active:scale-90 transition-all"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AIConcierge;
