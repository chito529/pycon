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
      // 1. REEMPLAZA ESTA URL CON LA URL DE TU WORKER EN CLOUDFLARE
      // Ejemplo: "https://pycon-api.tu-usuario.workers.dev"
      const WORKER_URL = "https://pycon-api.juanalmiron529.workers.dev"; 

      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: `${userMsg} (Please respond in ${lang})` 
        }),
      });

      if (!response.ok) throw new Error("Worker connection failed");

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: data.text || "No hay respuesta disponible."
      }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: lang === 'ES' 
          ? "Lo siento, el sistema está en mantenimiento. Contacte por WhatsApp." 
          : "Sorry, system is under maintenance. Please contact via WhatsApp." 
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
          <p className="text-slate-500 uppercase tracking-[0.
