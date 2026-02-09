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
    const welcomeText = lang === 'ES' 
      ? '¡Hola! Soy tu consultor de ParaguayConcierge. ¿Cómo puedo ayudarte hoy?' 
      : 'Hello! I am your ParaguayConcierge advisor. How can I assist you today?';
    setMessages([{ role: 'model' as const, text: welcomeText }]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const userMessage: ChatMessage = { role: 'user' as const, text: userMsg };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(-6).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await fetch("https://pycon-ai.juanalmiron529.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: chatHistory }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model' as const, text: data.text }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-24 bg-slate-50" id="ai-advisor">
      <div className="max-w-5xl mx-auto px-0 md:px-4"> {/* Sin padding en móvil para ganar espacio */}
        
        <div className="text-center mb-8 md:mb-16 px-4">
          <div className="flex justify-center mb-4 md:mb-6">
            <Logo type="icon" size="sm" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#112643] mb-2">
            {lang === 'ES' ? 'Asesor Institucional' : 'Institutional Advisor'}
          </h2>
          <p className="text-slate-500 uppercase tracking-[0.2em] text-[9px] font-black">AI Grounded in Live Legal Data</p>
        </div>

        {/* Contenedor Adaptativo: h-[85vh] en móvil, 700px en escritorio */}
        <div className="bg-white md:rounded-[2.5rem] shadow-2xl border-t md:border border-slate-100 overflow-hidden flex flex-col h-[80vh] md:h-[700px]">
          
          {/* Header Compacto para Móvil */}
          <div className="bg-[#112643] p-4 md:p-6 flex items-center justify-between text-white border-b border-[#c19a5b]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Logo type="icon" size="xs" variant="light" />
              </div>
              <div>
                <p className="font-black text-[9px] uppercase tracking-[0.1em]">Official Protocol</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase">System Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Área de Mensajes con scroll suave */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex-shrink-0 flex items-center justify-center p-1.5">
                    <Logo type="icon" size="xs" />
                  </div>
                )}
                <div className="flex flex-col max-w-[85%] md:max-w-[80%]">
                  <div className={`px-4 py-3 md:px-6 md:py-4 rounded-[1.2rem] md:rounded-[1.5rem] text-[13px] md:text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#112643] text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.role === 'model' && (msg.text.toLowerCase().includes('whatsapp') || msg.text.toLowerCase().includes('contacto')) && (
                    <a 
                      href={`https://wa.me/595981492115?text=${encodeURIComponent("Hola, quiero iniciar mi proceso.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 bg-[#c19a5b] text-white text-center py-4 md:py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                    >
                      🚀 WhatsApp Directo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input optimizado: text-base evita zoom automático en iPhone */}
          <form onSubmit={handleSubmit} className="p-4 md:p-6 bg-white border-t border-slate-100 mb-safe">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'ES' ? 'Escribe aquí...' : 'Type here...'}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-[#c19a5b]/50 transition-all font-medium"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-[#112643] text-white p-4 rounded-xl shadow-lg active:scale-90 transition-all"
                disabled={isLoading}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"/>
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
