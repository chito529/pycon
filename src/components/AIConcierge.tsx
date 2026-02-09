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
  const CALENDAR_LINK = "https://calendar.google.com/calendar/u/0/appointments/schedules/..."; // Reemplaza con tu link real

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
        body: JSON.stringify({ 
          message: text, 
          history: chatHistory,
          language: lang // Enviamos el idioma al worker para asegurar coherencia
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

  return (
    <section className="py-12 md:py-24 bg-slate-50" id="ai-advisor">
      <div className="max-w-5xl mx-auto px-0 md:px-4">
        <div className="text-center mb-8 px-4">
          <div className="flex justify-center mb-4"><Logo type="icon" size="sm" /></div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#112643] mb-2">
            {lang === 'ES' ? 'Asesor Institucional' : 'Institutional Advisor'}
          </h2>
          <p className="text-slate-500 uppercase tracking-[0.2em] text-[9px] font-black text-center">AI Grounded in Live Legal Data</p>
        </div>

        <div className="bg-white md:rounded-[2.5rem] shadow-2xl border-t md:border border-slate-100 overflow-hidden flex flex-col h-[80vh] md:h-[700px]">
          {/* Header */}
          <div className="bg-[#112643] p-4 md:p-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <Logo type="icon" size="xs" variant="light" />
              <div className="text-left">
                <p className="font-black text-[9px] uppercase tracking-[0.1em]">Official Protocol</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase">System Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <div className="flex flex-col max-w-[85%] md:max-w-[80%]">
                  <div className={`px-4 py-3 rounded-[1.2rem] text-[13px] md:text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' ? 'bg-[#112643] text-white' : 'bg-white text-slate-800 border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>

                  {/* BOTONES DE ACCIÓN DUALES (Solo para el modelo) */}
                  {msg.role === 'model' && (msg.text.toLowerCase().includes('whatsapp') || msg.text.toLowerCase().includes('contacto') || msg.text.toLowerCase().includes('reunion') || msg.text.toLowerCase().includes('meeting')) && (
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      {/* WhatsApp Button */}
                      <a 
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'ES' ? "Hola, me gustaría agendar una reunión." : "Hello, I would like to schedule a meeting.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:brightness-110 transition-all shadow-md"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp
                      </a>
                      {/* Google Calendar Button */}
                      <a 
                        href={CALENDAR_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white border border-slate-200 text-slate-700 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-md"
                      >
                        <svg className="w-4 h-4 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
                        {lang === 'ES' ? 'Agendar Cita' : 'Schedule Call'}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-[#c19a5b] text-[10px] font-black animate-pulse uppercase tracking-widest">IA is typing...</div>}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 md:p-6 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'ES' ? 'Escribe aquí...' : 'Type here...'}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-[#c19a5b]/50"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-[#112643] text-white p-4 rounded-xl shadow-lg disabled:opacity-50"
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
