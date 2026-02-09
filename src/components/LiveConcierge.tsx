import React, { useState } from 'react';
import Logo from './Logo';

interface LiveConciergeProps { lang: string; }

const LiveConcierge: React.FC<LiveConciergeProps> = ({ lang }) => {
  const [isListening, setIsListening] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.lang = lang === 'ES' ? 'es-PY' : 'en-US';
    recognition.continuous = false;
  }

  // Función para encontrar una voz femenina de calidad
  const getFemaleVoice = (lang: string) => {
    const voices = window.speechSynthesis.getVoices();
    // Buscamos voces que contengan nombres femeninos comunes en los motores de voz
    const femaleKeywords = ['female', 'femenino', 'soft', 'google', 'luciana', 'monica', 'helena', 'samantha'];
    
    return voices.find(v => 
      v.lang.startsWith(lang.toLowerCase()) && 
      femaleKeywords.some(key => v.name.toLowerCase().includes(key))
    ) || voices.find(v => v.lang.startsWith(lang.toLowerCase()));
  };

  const handleVoiceChat = () => {
    if (!recognition) {
      alert("Voice recognition not supported.");
      return;
    }

    setIsListening(true);
    recognition.start();

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      setIsConnecting(true);

      try {
        const response = await fetch("https://pycon-ai.juanalmiron529.workers.dev", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript, history: [] }),
        });

        const data = await response.json();

        // --- CONFIGURACIÓN DE VOZ FEMENINA ---
        const utterance = new SpeechSynthesisUtterance(data.text);
        const targetLang = lang === 'ES' ? 'es' : 'en';
        
        // Asignamos la mejor voz femenina disponible
        const selectedVoice = getFemaleVoice(targetLang);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.pitch = 1.1; // Un poco más agudo para que suene más femenina
        utterance.rate = 0.95;  // Un poco más pausado para sonar elegante
        utterance.volume = 1;

        window.speechSynthesis.speak(utterance);

      } catch (error) {
        console.error("Voice Error:", error);
      } finally {
        setIsConnecting(false);
      }
    };

    recognition.onerror = () => setIsListening(false);
  };

  return (
    <div className="fixed bottom-24 right-8 z-50">
      <button 
        onClick={handleVoiceChat}
        disabled={isConnecting}
        className="bg-[#112643] text-white p-6 rounded-full shadow-[0_40px_80px_rgba(17,38,67,0.4)] hover:bg-slate-800 hover:scale-105 transition-all active:scale-95 border-2 border-[#c19a5b] flex items-center gap-5 group"
      >
        {isConnecting || isListening ? (
          <div className="w-7 h-7 border-3 border-[#c19a5b] border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <div className="relative">
            <svg className="w-7 h-7 text-[#c19a5b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
        )}
        <div className="flex flex-col items-start pr-4 text-left">
          <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">
            {isListening ? (lang === 'ES' ? 'Escuchando...' : 'Listening...') : (lang === 'ES' ? 'Hablar con Asesora' : 'Speak to Concierge')}
          </span>
          <span className="text-[#c19a5b] text-[8px] font-bold uppercase tracking-[0.2em] opacity-80">
            {isConnecting ? (lang === 'ES' ? 'IA pensando...' : 'Thinking...') : "Elite Voice Active"}
          </span>
        </div>
      </button>
    </div>
  );
};

export default LiveConcierge;
