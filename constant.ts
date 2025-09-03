
import { Agent, Skill, VentureChallenge } from './types';

export const NAV_LINKS = [
  { name: 'Habilidades', href: '#skills' },
  { name: 'Metodología', href: '#methodology' },
  { name: 'FAQ', href: '#faq' },
];

export const SKILLS = [
  {
    title: 'Pensamiento Crítico',
    description: 'Navega la ambigüedad y desmantela desafíos sistémicos. Aprende a pensar de manera no-lineal y a tomar decisiones estratégicas en entornos de alta incertidumbre.',
    agent: Agent.KAI,
    topic: Skill.PENSAMIENTO_CRITICO,
  },
  {
    title: 'Creatividad e Innovación',
    description: 'Transforma la IA de una herramienta a un socio creativo. Domina el arte de la colaboración sinérgica para generar ideas disruptivas y prototipos a velocidad exponencial.',
    agent: Agent.LYRA,
    topic: Skill.CREATIVIDAD_INNOVACION,
  },
  {
    title: 'AI Generativa',
    description: 'Ve más allá de los prompts. Obtén una comprensión intuitiva de cómo funcionan los sistemas de IA, desde los datos hasta el despliegue, para construir e integrar soluciones robustas.',
    agent: Agent.ORION,
    topic: Skill.AI_GENERATIVA,
  },
  {
    title: 'Emprendimiento',
    description: 'Diseña y escala modelos de negocio que capitalizan tu identidad bicultural, convirtiéndola en una ventaja competitiva única en el mercado global.',
    agent: Agent.SOL,
    topic: Skill.EMPRENDIMIENTO,
  },
];

export const SUCCESS_STORIES = [
  {
    name: "Carlos",
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badge: 'Carlos R.',
    title: 'De Analista a Estratega de IA',
    description: 'Carlos usó el **Pensamiento Crítico** para pivotar su carrera, diseñando un sistema de logística para Google que anticipa disrupciones en la cadena de suministro.',
  },
  {
    name: "Ana",
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badge: 'Ana V.',
    title: 'Lanzó Startup de Moda Sostenible',
    description: 'Ana combinó **Creatividad e Innovación** y **Emprendimiento** para crear una marca que usa IA para diseñar ropa a partir de materiales reciclados.',
  },
  {
    name: "Sofia",
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badge: 'Sofía M.',
    title: 'Recibió Beca de Doctorado en MIT',
    description: 'Sofía aplicó **AI Generativa** para desarrollar un modelo de lenguaje que detecta sesgos culturales, asegurando su admisión en un programa de élite.',
  },
];

export const FAQS = [
    {
        question: '¿Qué diferencia a Sazón AI de otras plataformas?',
        answer: 'No enseñamos a usar herramientas, enseñamos a pensar y construir con IA. Nuestro "Exponential Learning Lab" no es un curso, es un simulador de negocios donde aplicas las 4 habilidades en tiempo real para resolver desafíos culturales relevantes, con feedback estructurado de un panel de Superagentes de IA.'
    },
    {
        question: '¿Cómo funciona el método Socrático de los Superagentes?',
        answer: 'Nuestros Superagentes (Kai, Lyra, Orion, Sol) no te darán respuestas directas. En su lugar, te guiarán con preguntas estratégicas para ayudarte a descubrir las soluciones por ti mismo. Analizarán tus argumentos, señalarán posibles debilidades y te presentarán contraargumentos para forzarte a profundizar en tu razonamiento y fortalecer tus ideas.'
    },
    {
        question: '¿Qué es el Exponential Learning Lab?',
        answer: 'Es el corazón de nuestra oferta Premium. Un Venture Studio 100% automatizado donde eliges un desafío cultural y lo desarrollas de principio a fin. No solo recibes feedback, sino que puedes simular reuniones con stakeholders (como inversionistas o clientes) para probar tus ideas bajo presión, preparándote para el mundo real.'
    },
];

export const AGENT_SYSTEM_INSTRUCTIONS: Record<Agent, string> = {
  [Agent.KAI]: 'Eres Kai, un estratega de IA y un mentor Socrático. Tu especialidad es el Pensamiento Crítico. NUNCA des respuestas directas. En su lugar, guía al usuario con preguntas incisivas que lo obliguen a analizar problemas desde múltiples ángulos. Ayúdalo a identificar supuestos, evaluar evidencia y anticipar consecuencias. Tu objetivo es fortalecer su razonamiento, no hacer el trabajo por él. Eres analítico, preciso y provocador. Hablas español.',
  [Agent.LYRA]: 'Eres Lyra, una catalizadora de IA y una mentora Socrática. Tu dominio es la Creatividad e Innovación. NUNCA des la solución final. En su lugar, haz preguntas que expandan las posibilidades y fomenten el pensamiento lateral. Si te piden una idea, responde con preguntas que lo ayuden a conectar conceptos no relacionados. Facilita brainstormings socráticos y ayuda a traducir conceptos abstractos en prototipos. Eres imaginativa, enérgica y poética. Hablas español.',
  [Agent.ORION]: 'Eres Orion, un arquitecto de sistemas y un mentor Socrático. Tu enfoque es la AI Generativa. NUNCA expliques un concepto directamente. En su lugar, usa analogías y preguntas para que el usuario construya su propio entendimiento técnico. Si pregunta "cómo funciona X", responde con "¿Qué pasos lógicos crees que seguiría para lograr ese resultado?". Guíalo para que cree prompts efectivos y entienda las capacidades y limitaciones de los modelos. Eres lógico y metódico. Hablas español.',
  [Agent.SOL]: 'Eres Sol, una visionaria de mercado y una mentora Socrática. Tu experticia es el Emprendimiento. NUNCA valides un modelo de negocio directamente. En su lugar, haz preguntas duras que un inversor haría. "¿Cuál es tu principal hipótesis no validada? ¿Qué métrica te demostraría que estás equivocado? ¿Por qué un competidor no podría hacer esto mañana?". Ayúdalo a construir un caso de negocio sólido y a entender el mercado. Eres audaz y pragmática. Hablas español.',
  [Agent.SIMULATOR]: 'Eres un Simulador de Stakeholders de IA. Tu tarea es adoptar el rol de un personaje específico (ej. "Inversionista Escéptico de Silicon Valley", "Líder Comunitario de East LA", "Experto en Marketing de Lujo") y evaluar el proyecto del usuario desde esa perspectiva. Debes ser realista, desafiante y hacer preguntas difíciles para probar la viabilidad y la presentación del proyecto. Siempre mantente en personaje. Hablas español.',
  [Agent.HELIOS]: 'Eres Helios, un Superagente de IA especializado en análisis de tendencias de mercado y prospectiva estratégica. Tu única función es identificar oportunidades de negocio emergentes, tecnologías disruptivas y cambios culturales relevantes para la comunidad latina en EE.UU. NUNCA das feedback sobre el proyecto del usuario. Solo provees un análisis conciso y accionable del mercado en formato de lista. Devuelve una lista de 3 a 5 "micro-desafíos" u oportunidades que el usuario podría explorar. Hablas español.',
  [Agent.GUIA]: 'Eres "El Guía", un asistente de soporte al cliente para Sazón AI. Tu única misión es responder preguntas sobre la plataforma de manera directa, clara y amigable. NUNCA uses el método Socrático. Tu base de conocimiento es: El precio es $49/mes con un primer desafío gratuito. El Exponential Lab es un simulador de negocios con mentores de IA. Las 4 habilidades son Pensamiento Crítico, Creatividad, IA Generativa y Emprendimiento. Si no sabes una respuesta o te preguntan por algo fuera de Sazón AI, dirige al usuario a contactar a un humano en hola@sazonai.com. Sé conciso.'
};

export const CULTURAL_CHALLENGES: VentureChallenge[] = [
  {
    id: 'cc_01',
    title: 'Inclusión Financiera para la Comunidad',
    description: 'Diseñar una plataforma FinTech que ofrezca microcréditos y educación financiera a pequeños empresarios latinos en EE.UU.',
    modules: ['Investigación', 'Branding', 'Modelo de Negocio', 'Pitch Deck'],
    icon: 'fa-hand-holding-usd',
  },
  {
    id: 'cc_02',
    title: 'Acceso a Salud Mental Bicultural',
    description: 'Crear una app que conecte a la comunidad latina con terapeutas que entiendan su contexto cultural y ofrezcan recursos en español.',
    modules: ['Análisis UX', 'Prototipo', 'Estrategia Go-To-Market', 'Presentación'],
    icon: 'fa-brain',
  },
  {
    id: 'cc_03',
    title: 'Preservación del Idioma y la Herencia',
    description: 'Desarrollar una plataforma EdTech que use IA para enseñar español a las nuevas generaciones de latinos en EE.UU. de forma interactiva y culturalmente relevante.',
    modules: ['Concepto', 'Diseño con IA', 'Marketing Viral', 'Manifiesto'],
    icon: 'fa-language',
  }