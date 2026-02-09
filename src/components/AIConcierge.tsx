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
    const welcomeText = lang === 'ES' 
      ? '¡Hola! Soy tu consultor de ParaguayConcierge. ¿En qué puedo asesorarte hoy?' 
      : 'Hello! I am your ParaguayConcierge advisor. How can I assist you today?';
    setMessages([{ role: 'model', text: welcomeText }]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  // Listener para eventos desde Pricing.tsx
  useEffect(() => {
    const handlePlanEvent = (e: any) => {
      const planName = e.detail.plan;
      const prompt = lang === 'ES' 
        ? `Me interesa el plan ${planName}. ¿Cuáles son los próximos pasos?` 
        : `I am interested in the ${planName} plan. What are the next steps?`;
      sendMessage(prompt);
    };
    window.addEventListener('selectPlan', handlePlanEvent);
    return () => window.removeEventListener('selectPlan', handlePlanEvent);
  }, [lang, messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: text.trim() };
    // Actualizamos mensajes localmente primero
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Formateamos el historial para que sea compatible con el Worker
      const chatHistory = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await fetch("https://pycon-ai.juanalmiron529.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text.trim(), 
          history: chatHistory 
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      if (data && data.text) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        throw new Error('No text in response');
      }
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg = lang === 'ES' 
        ? "Lo siento, hubo un problema con la conexión. Por favor, intenta de nuevo o contáctanos por WhatsApp." 
        : "Sorry, there was a connection issue. Please try again or contact us via WhatsApp.";
      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const shouldShowButtons = (text: string) => {
    const t = text.toLowerCase();
    const keywords = ['whatsapp', 'contacto', 'reunión', 'reunion', 'cita', 'llamada', 'agendar', 'meeting', 'calendar', 'call'];
    return keywords.some(k => t.includes(k));
  };

  return (
    <section className="py-12 md:py-24 bg-slate-50 px-0 md:px-4" id="ai-advisor">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <div className="flex justify-center mb-4"><Logo type="icon" size="sm" /></div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#112643] mb-4">
            {lang === 'ES' ? 'Asesor Institucional' : 'Institutional Advisor'}
          </h2>
        </div>

        <div className="bg-white md:rounded-[2.5rem] shadow-2xl border-t md:border border-slate-100 flex flex-col h-[85vh] md:h-[700px]">
          <div className="bg-[#112643] p-4 md:p-6 flex items-center gap-4 text-white">
            <Logo type="icon" size="xs" variant="light" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Protocol Secured</span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex flex-col max-w-[85%] md:max-w-[75%] gap-3">
                  <div className={`px-5 py-3 rounded-[1.5rem] text-[15px] md:text-sm shadow-sm ${
                    msg.role === 'user' ? 'bg-[#112643] text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.role === 'model' && shouldShowButtons(msg.text) && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                      <a 
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'ES' ? "Hola, me gustaría hablar con un asesor." : "Hello, I would like to speak with an advisor.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:brightness-105 transition-all shadow-md"
                      >
                        WhatsApp
                      </a>
                      <a 
                        href={CALENDAR_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#c19a5b] text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:brightness-105 transition-all shadow-md"
                      >
                        📅 {lang === 'ES' ? 'Reservar Reunión' : 'Book Meeting'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-[#c19a5b] text-[10px] font-black animate-pulse ml-2">IA PENSANDO...</div>}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 mb-safe">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-[#c19a5b]/50"
                placeholder={lang === 'ES' ? 'Consulte aquí...' : 'Ask here...'}
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading} className="bg-[#112643] text-white p-4 rounded-xl active:scale-95 disabled:opacity-50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AIConcierge;
