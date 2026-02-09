import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Logo from './Logo';

interface AIConciergeProps { lang: string; }

const AIConcierge: React.FC<AIConciergeProps> = ({ lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inicialización
  useEffect(() => {
    const welcome = lang === 'ES' ? '¡Hola! Soy tu consultor de ParaguayConcierge. ¿Cómo puedo ayudarte?' : 'Hello! I am your ParaguayConcierge advisor. How can I assist you?';
    setMessages([{ role: 'model' as const, text: welcome }]);
  }, [lang]);

  // Escuchar selección de planes desde Pricing.tsx
  useEffect(() => {
    const handlePlanEvent = (e: any) => {
      const planName = e.detail.plan;
      const prompt = lang === 'ES' 
        ? `Me interesa el plan ${planName}. ¿Cuáles son los requisitos?` 
        : `I am interested in the ${planName} plan. What are the requirements?`;
      
      handleExternalSubmit(prompt);
    };

    window.addEventListener('selectPlan', handlePlanEvent);
    return () => window.removeEventListener('selectPlan', handlePlanEvent);
  }, [lang, messages]);

  const handleExternalSubmit = (text: string) => {
    if (isLoading) return;
    sendMessage(text);
  };

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = { role: 'user' as const, text };
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
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <section className="py-12 md:py-24 bg-slate-50" id="ai-advisor">
      <div className="max-w-5xl mx-auto px-0 md:px-4">
        <div className="bg-white md:rounded-[2.5rem] shadow-2xl border-t md:border border-slate-100 flex flex-col h-[85vh] md:h-[700px]">
          
          <div className="bg-[#112643] p-4 md:p-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <Logo type="icon" size="xs" variant="light" />
              <p className="font-black text-[9px] uppercase tracking-widest">Protocol Chat Online</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`px-4 py-3 rounded-[1.2rem] text-[15px] md:text-sm shadow-sm ${
                  msg.role === 'user' ? 'bg-[#112643] text-white' : 'bg-white text-slate-800 border border-slate-100'
                }`}>
                  {msg.text}
                </div>
                {msg.role === 'model' && (msg.text.toLowerCase().includes('whatsapp') || msg.text.toLowerCase().includes('contacto')) && (
                  <a 
                    href={`https://wa.me/595981492115?text=Hola, quiero iniciar mi proceso.`}
                    target="_blank"
                    className="mt-2 block bg-[#c19a5b] text-white text-center py-3 rounded-xl font-bold text-[10px] uppercase shadow-lg"
                  >
                    🚀 WhatsApp Directo
                  </a>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-50 border p-4 rounded-2xl text-base md:text-sm focus:outline-none"
                placeholder="Consulte aquí..."
              />
              <button type="submit" className="bg-[#112643] text-white p-4 rounded-xl">
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
