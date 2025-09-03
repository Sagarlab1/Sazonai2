
export enum Agent {
  KAI = 'Kai',
  LYRA = 'Lyra',
  ORION = 'Orion',
  SOL = 'Sol',
  SIMULATOR = 'Simulator',
  HELIOS = 'Helios',
  GUIA = 'Guía'
}

export enum Skill {
  PENSAMIENTO_CRITICO = 'Pensamiento Crítico',
  CREATIVIDAD_INNOVACION = 'Creatividad e Innovación',
  AI_GENERATIVA = 'AI Generativa',
  EMPRENDIMIENTO = 'Emprendimiento',
}

export interface ChatMessage {
  sender: 'user' | 'ai' | 'system';
  text: string;
}

export interface VentureChallenge {
  id: string;
  title: string;
  description: string;
  modules: string[];
  icon: string;
}

export interface StructuredFeedback {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}