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
    const welcome = lang === 'ES' 
      ? 'Bienvenido a ParaguayConcierge. Soy su asesor experto en leyes migratorias y tributarias. ¿En qué puedo ayudarle?' 
      : 'Welcome to ParaguayConcierge. I am your expert advisor on immigration and tax laws. How can I assist you?';
    setMessages([{ role: 'model', text: welcome }]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    // Guardamos el mensaje del usuario en la pantalla
    const updatedMessages = [...messages, { role: 'user', text: userMsg }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Mapeamos el historial al formato que entiende Gemini
      const chatHistory = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const response = await fetch("https://pycon-ai.juanalmiron529.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMsg,
          history: chatHistory 
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50" id="ai-advisor">
      <div className="max-w-5xl mx-auto px-4">
        {/* Títulos y Logo (Mantén tu diseño original aquí) */}
        
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[700px]">
          {/* Header del Chat */}
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'model' && (
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex-shrink-0 flex items-center justify-center p-2">
                    <Logo type="icon" size="xs" />
                  </div>
                )}
                <div className={`px-6 py-4 rounded-[1.5rem] text-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-[#112643] text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'ES' ? 'Pregunte sobre la Ley 6984/2022...' : 'Ask about Law 6984/2022...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c19a5b]/50"
                disabled={isLoading}
              />
              <button type="submit" className="absolute right-2 bg-[#112643] text-white p-4 rounded-xl" disabled={isLoading}>
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
