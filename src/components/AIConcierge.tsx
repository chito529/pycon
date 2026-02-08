import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Logo from './Logo';

interface AIConciergeProps {
  lang: string;
}

const AIConcierge: React.FC<AIConciergeProps> = ({ lang }) => {
  const initialMessages: Record<string, string> = {
    EN: 'Welcome to ParaguayConcierge. I have access to real-time data on laws and exchange rates. How can I help you today?',
    ES: 'Bienvenido a ParaguayConcierge. Tengo acceso a datos en tiempo real sobre leyes y tasas de cambio. ¿En qué puedo ayudarle hoy?',
    DE: 'Willkommen bei ParaguayConcierge. Ich habe Zugriff auf Echtzeitdaten zu Gesetzen und Wechselkursen. Wie kann ich Ihnen heute helfen?'
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: initialMessages[lang] || initialMessages.EN }]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const WORKER_URL = "https://pycon-ai.juanalmiron529.workers.dev"; 

      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `${userMsg} (Please respond in ${lang})` 
        }),
      });

      if (!response.ok) throw new Error("Worker connection failed");
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: data.text || "No response."
      }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: lang === 'ES' ? "Error de conexión." : "Connection error." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50" id="ai-advisor">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Logo type="icon" size="sm" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#112643] mb-4">
            {lang === 'ES' ? 'Asesor Institucional' : lang === 'DE' ? 'Institutioneller Berater' : 'Institutional Advisor'}
          </h2>
          <p className="text-slate-500 uppercase tracking-[0.3em] text-[10px] font-black">AI Grounded in Live Legal Data</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[700px]">
          <div className="bg-[#112643] p-6 flex items-center justify-between text-white border-b border-[#c19a5b]/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Logo type="icon" size="xs" variant="light" />
              </div>
              <div>
                <p className="font-black text-[10px] uppercase tracking-[0.2em]">Official Protocol Chat</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">System Online</span>
                </div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'model' && (
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex-shrink-0 flex items-center justify-center p-2">
                    <Logo type="icon" size="xs" />
                  </div>
                )}
                <div className="flex flex-col max-w-[80%]">
                  <div className={`px-6 py-4 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' ? 'bg-[#112643] text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 p-4 bg-white/50 rounded-2xl w-max border border-slate-100">
                <div className="w-2 h-2 bg-[#c19a5b] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#c19a5b] rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-[#c19a5b] rounded-full animate-bounce delay-150"></div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-slate-100">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'ES' ? 'Consulte sobre residencia...' : 'Ask about residency...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c19a5b]/50 pr-20 transition-all"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="absolute right-2 bg-[#112643] text-white p-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all disabled:opacity-50"
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
