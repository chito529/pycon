import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import Logo from './Logo';

interface AIConciergeProps { lang: string; }

const AIConcierge: React.FC<AIConciergeProps> = ({ lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inicialización de WebSpeech API
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang === 'ES' ? 'es-PY' : lang === 'DE' ? 'de-DE' : 'en-US';
  }

  useEffect(() => {
    const welcomeText = lang === 'ES' 
      ? '¡Hola! Soy tu consultor de ParaguayConcierge. ¿En qué puedo asesorarte hoy?' 
      : 'Hello! I am your ParaguayConcierge advisor. How can I assist you today?';
    setMessages([{ role: 'model' as const, text: welcomeText }]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Función para capturar voz
  const handleVoiceInput = () => {
    if (!recognition) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      // Opcional: enviar automáticamente después de dictar
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleSubmit = async (e: React.FormEvent | null, textOverride?: string) => {
    if (e) e.preventDefault();
    const finalInput = textOverride || input;
    if (!finalInput.trim() || isLoading) return;

    const userMsg = finalInput.trim();
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
      const modelResponse: ChatMessage = { role: 'model' as const, text: data.text };
      setMessages(prev => [...prev, modelResponse]);
      
      // OPCIONAL: Hacer que la IA hable de vuelta (Text-to-Speech)
      const utterance = new SpeechSynthesisUtterance(data.text);
      utterance.lang = recognition?.lang || 'es-PY';
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50" id="ai-advisor">
      <div className="max-w-5xl mx-auto px-4">
        {/* ... (Mantén tu diseño de encabezado anterior) ... */}

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[700px]">
          {/* Header del Chat */}
          <div className="bg-[#112643] p-6 flex items-center justify-between text-white border-b border-[#c19a5b]/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Logo type="icon" size="xs" variant="light" />
              </div>
              <p className="font-black text-[10px] uppercase tracking-[0.2em]">Live Voice Concierge</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`px-6 py-4 rounded-[1.5rem] text-sm ${
                  msg.role === 'user' ? 'bg-[#112643] text-white' : 'bg-white text-slate-800 border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Formulario con botón de Micro */}
          <form onSubmit={(e) => handleSubmit(e)} className="p-6 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2">
              <button 
                type="button"
                onClick={handleVoiceInput}
                className={`p-4 rounded-xl transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-[#c19a5b]'} text-white`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
              </button>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm"
                placeholder={isListening ? "Escuchando..." : "Escribe o usa el micrófono..."}
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
