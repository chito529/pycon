
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import Logo from './Logo';

// Manual base64 helpers for compliance
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Fixed: Defined props interface to accept 'lang' from parent component
interface LiveConciergeProps {
  lang: string;
}

// Fixed: Applied the props interface to the component definition
const LiveConcierge: React.FC<LiveConciergeProps> = ({ lang }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopSession = () => {
    setIsActive(false);
    sessionRef.current?.close();
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
  };

  const startSession = async () => {
    setIsConnecting(true);
    // Initialize GoogleGenAI instance inside the action handler
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const outputNode = outputAudioContextRef.current.createGain();
      outputNode.connect(outputAudioContextRef.current.destination);

      let nextStartTime = 0;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              
              const base64 = encode(new Uint8Array(int16.buffer));
              // Use sessionPromise.then to ensure session is ready before sending input
              sessionPromise.then(s => s.sendRealtimeInput({ 
                media: { data: base64, mimeType: 'audio/pcm;rate=16000' } 
              }));
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
            setIsActive(true);
            setIsConnecting(false);
          },
          onmessage: async (message: LiveServerMessage) => {
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && outputAudioContextRef.current) {
              const audioBuffer = await decodeAudioData(
                decode(audioData),
                outputAudioContextRef.current,
                24000,
                1
              );

              const source = outputAudioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              
              nextStartTime = Math.max(nextStartTime, outputAudioContextRef.current.currentTime);
              source.start(nextStartTime);
              nextStartTime += audioBuffer.duration;
              
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTime = 0;
            }
          },
          onerror: (e) => {
            console.error('API Error', e);
            stopSession();
          },
          onclose: () => setIsActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          // Fixed: Updated system instruction to incorporate the language preference passed via props
          systemInstruction: `You are the Executive Voice of ParaguayConcierge.com. You are professional, elite, and highly knowledgeable about Ley 6984/2022 and 0% territorial tax. Speak like a luxury advisor. Always respond to the user in ${lang}.`
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-50">
      <div className={`bg-[#112643] rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] p-8 border-2 border-[#c19a5b]/40 transition-all duration-700 transform ${isActive ? 'w-72 scale-100 opacity-100' : 'w-0 scale-50 opacity-0 overflow-hidden translate-y-10'}`}>
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-1.5 items-end h-12">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="w-2 bg-[#c19a5b] rounded-full animate-bounce" style={{ animationDuration: `${0.5 + i/10}s` }}></div>
            ))}
          </div>
          <div className="text-center">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.4em] mb-2">Concierge Voice</h4>
            <div className="flex items-center justify-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[#c19a5b] text-[10px] font-bold uppercase tracking-widest">Priority Line Secured</span>
            </div>
          </div>
          <button 
            onClick={stopSession} 
            className="w-full bg-white/5 hover:bg-white/10 text-[#c19a5b] py-3 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] transition-all border border-white/10"
          >
            End Conversation
          </button>
        </div>
      </div>
      
      {!isActive && (
        <button 
          onClick={startSession}
          disabled={isConnecting}
          className="bg-[#112643] text-white p-6 rounded-full shadow-[0_40px_80px_rgba(17,38,67,0.4)] hover:bg-slate-800 hover:scale-105 transition-all active:scale-95 border-2 border-[#c19a5b] flex items-center gap-5 group"
        >
          {isConnecting ? (
            <div className="w-7 h-7 border-3 border-[#c19a5b] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <div className="relative">
              <svg className="w-7 h-7 text-[#c19a5b] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <div className="absolute -top-1 -right-1 flex h-3 w-3">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c19a5b] opacity-75"></div>
                <div className="relative inline-flex rounded-full h-3 w-3 bg-[#c19a5b]"></div>
              </div>
            </div>
          )}
          <div className="flex flex-col items-start pr-4">
            <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Speak to Concierge</span>
            <span className="text-[#c19a5b] text-[8px] font-bold uppercase tracking-[0.2em] opacity-80">Voice Active 24/7</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default LiveConcierge;
