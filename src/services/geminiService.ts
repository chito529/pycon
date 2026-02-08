// 1. Definimos la URL de tu Worker (la que encontramos en Account Details)
const WORKER_URL = "https://pycon.juanalmiron529.workers.dev";

export class GeminiService {
  // Ya no necesitamos el constructor con GoogleGenAI porque el Worker tiene la llave

  async sendMessage(message: string): Promise<{text: string, sources?: any[]}> {
    try {
      // 2. Hacemos la petición directamente a tu Worker puente
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error('Error en la comunicación con el Concierge');
      }

      const data = await response.json();
      
      // 3. Retornamos la respuesta que viene del Worker
      return {
        text: data.text || "",
        sources: data.sources || []
      };
    } catch (error) {
      console.error("Worker Error:", error);
      return { 
        text: "I'm experiencing a high volume of requests for legal briefings. Please use our priority WhatsApp link for an immediate response from our human staff." 
      };
    }
  }
}

export const geminiService = new GeminiService();
