import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { Agent, Skill, VentureChallenge, StructuredFeedback } from '../types';
import { AGENT_SYSTEM_INSTRUCTIONS } from '../constants';

// Para activar la IA, reemplaza 'undefined' con tu clave de API entre comillas.
// Ejemplo: const API_KEY = "AIzaSy...";
// ADVERTENCIA: Publicar tu clave en un repositorio público no es seguro.
const API_KEY = undefined;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY no está configurada. La funcionalidad de IA usará datos de demostración.");
}

let chatSession: Chat | null = null;

export const createChatSession = (agent: Agent): Chat | null => {
  if (!ai) return null;
  const systemInstruction = AGENT_SYSTEM_INSTRUCTIONS[agent];
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
  return chatSession;
};

export const sendMessageStream = async (chat: Chat, message: string) => {
  if (!ai) {
    // Simulate a stream for environments without an API key
    const mockMessage = "Hola, la funcionalidad de IA está desactivada. Esta es una respuesta de demostración.";
    const chunks = mockMessage.split(' ').map(word => ({ text: `${word} ` }));
    
    async function* streamGenerator() {
      for (const chunk of chunks) {
        await new Promise(resolve => setTimeout(resolve, 50));
        yield chunk;
      }
    }
    return streamGenerator();
  }

  return chat.sendMessageStream({ message });
};

export const getStructuredFeedback = async (
  challenge: VentureChallenge,
  submission: string
): Promise<StructuredFeedback | null> => {
  if (!ai) {
    // Return mock data if API key is not available
    return {
      strengths: ["Concepto innovador y bien definido.", "Potencial de mercado claro en el nicho bicultural."],
      weaknesses: ["Falta de un plan financiero detallado.", "Canales de distribución no especificados."],
      opportunities: ["Creciente demanda de productos auténticos y sostenibles.", "Posibilidad de alianzas estratégicas con comunidades latinas."],
      threats: ["Alta competencia en el sector.", "Posibles barreras regulatorias."],
    };
  }

  try {
    const prompt = `Analiza la siguiente propuesta de un usuario para el desafío "${challenge.title}". La propuesta es: "${submission}". Realiza un análisis FODA (Fortalezas, Oportunidades, Debilidades, Amenazas) conciso y accionable.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strengths: {
              type: Type.ARRAY,
              description: "Puntos fuertes clave de la propuesta.",
              items: { type: Type.STRING }
            },
            weaknesses: {
              type: Type.ARRAY,
              description: "Áreas de mejora o puntos débiles.",
              items: { type: Type.STRING }
            },
            opportunities: {
              type: Type.ARRAY,
              description: "Factores externos que se pueden aprovechar.",
              items: { type: Type.STRING }
            },
            threats: {
              type: Type.ARRAY,
              description: "Riesgos o factores externos que podrían perjudicar el proyecto.",
              items: { type: Type.STRING }
            },
          },
          required: ["strengths", "weaknesses", "opportunities", "threats"]
        },
      },
    });

    const jsonText = response.text;
    return JSON.parse(jsonText) as StructuredFeedback;

  } catch (error) {
    console.error("Error al obtener feedback estructurado de Gemini:", error);
    return null;
  }
};

export const getAgentResponseInLab = async (
  mention: string,
  fullText: string
): Promise<{ agent: Agent; response: string } | null> => {
  if (!ai) {
    const mentionedAgent = mention.substring(1) as Agent;
    return {
      agent: mentionedAgent,
      response: `Hola, soy ${mentionedAgent}. Esta es una respuesta de demostración porque la IA está desactivada. He recibido tu consulta.`
    };
  }
  
  const agent = mention.substring(1) as Agent;
  if (!Object.values(Agent).includes(agent)) {
    return null; // Not a valid agent mention
  }

  const systemInstruction = AGENT_SYSTEM_INSTRUCTIONS[agent];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Contexto: Un usuario está trabajando en un proyecto. Su propuesta completa es: "${fullText}". Ahora te mencionan específicamente. Tu respuesta debe ser concisa, socrática y directamente relacionada con su texto.`,
      config: {
        systemInstruction,
      },
    });
    return { agent, response: response.text };
  } catch (error) {
    console.error(`Error al obtener respuesta de ${agent}:`, error);
    return { agent, response: "Tuve un problema al procesar tu solicitud. Por favor, inténtalo de nuevo." };
  }
};

export const getMarketTrends = async (): Promise<string | null> => {
    if (!ai) {
        return "1. **FinTech de Remesas:** Crear una plataforma que use IA para optimizar las tasas de cambio en tiempo real.\n2. **EdTech para Certificaciones:** Desarrollar micro-certificaciones bilingües para oficios tecnológicos.\n3. **HealthTech Preventiva:** Una app que use IA para predecir riesgos de salud específicos en la comunidad latina.";
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Identifica 3 a 5 oportunidades de negocio emergentes o 'micro-desafíos' altamente relevantes para emprendedores latinos en Estados Unidos en este momento. Sé conciso, accionable y presenta la respuesta como una lista.",
            config: {
                systemInstruction: AGENT_SYSTEM_INSTRUCTIONS[Agent.HELIOS],
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error al obtener tendencias de Helios:", error);
        return "No se pudieron obtener las tendencias del mercado en este momento.";
    }
};

export const getSupportResponse = async (message: string): Promise<string> => {
    if (!ai) {
        return "Hola, soy El Guía. Actualmente, la IA está desconectada. Nuestro plan Premium cuesta $49/mes y puedes probar tu primer desafío gratis. ¿En qué más puedo ayudarte?";
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
            config: {
                systemInstruction: AGENT_SYSTEM_INSTRUCTIONS[Agent.GUIA],
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error al obtener respuesta de El Guía:", error);
        return "Tuve un problema al procesar tu consulta. Para asistencia, por favor contacta a hola@sazonai.com.";
    }
};