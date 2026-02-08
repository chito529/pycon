export class GeminiService {
  async sendMessage(message: string): Promise<{text: string, sources?: any[]}> {
    try {
      // Llamamos a tu nuevo Worker pycon-api
      const response = await fetch("https://pycon-api.juanalmiron529.workers.dev", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error('Error en el Worker');

      const data = await response.json();
      return {
        text: data.text || "",
        sources: data.sources || []
      };
    } catch (error) {
      console.error("Worker Error:", error);
      return { 
        text: "I'm experiencing a high volume of requests. Please use our WhatsApp concierge link for immediate assistance." 
      };
    }
  }
}

export const geminiService = new GeminiService();
