import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Logo from './Logo';

interface AIConciergeProps { lang: string; }

const AIConcierge: React.FC<AIConciergeProps> = ({ lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcome = lang === 'ES' ? '¡Hola! Soy tu consultor senior. ¿En qué puedo asesorarte hoy?' : 'Hello! I am your senior consultant. How can I assist you today?';
    setMessages([{ role: 'model' as const, text: welcome }]);
  }, [lang]);

  useEffect(() => {
    const handlePlanEvent = (e: any) => {
      const planName = e.detail.plan;
      const prompt = lang === 'ES' 
        ? `Me interesa el plan ${planName}. ¿Cuáles son los próximos pasos?` 
        : `I am interested in the ${planName} plan. What are the next steps?`;
      handleExternalSubmit(prompt);
    };
    window.addEventListener('selectPlan', handlePlanEvent);
    return () => window.removeEventListener('selectPlan', handlePlanEvent);
  }, [lang, messages]);

  const handleExternalSubmit = (text: string) => {
    if (!isLoading) sendMessage(text);
  };

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = { role: 'user' as const, text };
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
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <section className="py-12 md:py-24 bg-slate-50 px-0 md:px-4" id="ai-advisor">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-16 px-4">
          <div className="flex justify-center mb-4 md:mb-6">
            <Logo type="icon" size="sm" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#112643]">
            {lang === 'ES' ? 'Asesor Institucional' : 'Institutional Advisor'}
          </h2>
        </div>

        <div className="bg-white md:rounded-[2.5rem] shadow-2xl border-t md:border border-slate-100 flex flex-col h-[85vh] md:h-[700px]">
          <div className="bg-[#112643] p-4 md:p-6 flex items-center gap-4 text-white">
            <Logo type="icon" size="xs" variant="light" />
            <span className="text-[10px] font-black uppercase tracking-widest">Protocol Secured</span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`px-4 py-3 rounded-[1.2rem] text-[15px] md:text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' ? 'bg-[#112643] text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
                {msg.role === 'model' && (msg.text.toLowerCase().includes('whatsapp') || msg.text.toLowerCase().includes('contacto')) && (
                  <a 
                    href={`https://wa.me/595981492115?text=Hola, quiero iniciar mi proceso.`}
                    target="_blank"
                    className="mt-2 block bg-[#c19a5b] text-white text-center py-4 rounded-xl font-bold text-[10px] uppercase shadow-lg active:scale-95"
                  >
                    🚀 WhatsApp Directo
                  </a>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 mb-safe">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-[#c19a5b]/50 transition-all"
                placeholder={lang === 'ES' ? 'Consulte aquí...' : 'Ask here...'}
              />
              <button type="submit" className="bg-[#112643] text-white p-4 rounded-xl active:scale-90 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AIConcierge;
