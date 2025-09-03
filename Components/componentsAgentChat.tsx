import React, { useState, useEffect, useRef } from 'react';
import { Agent, ChatMessage, Skill } from '../types';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import type { Chat } from '@google/genai';

// Add type declarations for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface AgentChatProps {
    isOpen: boolean;
    agent: Agent | null;
    topic: Skill | null;
    onClose: () => void;
}

const agentGenders: Record<Agent, 'male' | 'female' | 'neutral'> = {
    [Agent.KAI]: 'male',
    [Agent.LYRA]: 'female',
    [Agent.ORION]: 'male',
    [Agent.SOL]: 'female',
    [Agent.SIMULATOR]: 'neutral',
    [Agent.HELIOS]: 'neutral',
    [Agent.GUIA]: 'neutral', // GUIA has a neutral voice by default
};

const AgentChat: React.FC<AgentChatProps> = ({ isOpen, agent, topic, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const recognitionRef = useRef<any>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isOpen && agent) {
        const session = createChatSession(agent);
        setChatSession(session);
        setMessages([]);
        setIsLoading(true);

        // Initial Socratic prompt
        const firstPrompt = `Preséntate brevemente como ${agent}, un mentor Socrático experto en ${topic}, y hazme tu primera pregunta estratégica para empezar a explorar este tema.`;
        
        handleStreamResponse(firstPrompt, session);
      } else {
        stopSpeaking();
        stopListening();
      }
    }, [isOpen, agent, topic]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    const speakText = (text: string) => {
      if ('speechSynthesis' in window && agent) {
        stopSpeaking();
        
        const cleanedText = text.replace(/\*/g, '').replace(/--/g, ', ').replace(/\.\.\./g, ', ');
        const utterance = new SpeechSynthesisUtterance(cleanedText);
        utterance.lang = 'es-US';

        const voices = window.speechSynthesis.getVoices();
        const gender = agentGenders[agent];
        
        let selectedVoice = voices.find(v => v.lang.startsWith('es') && gender !== 'neutral' && v.name.toLowerCase().includes(gender === 'female' ? 'female' : 'male'));
        if (!selectedVoice) {
            selectedVoice = voices.find(v => v.lang.startsWith('es'));
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    };

    const stopSpeaking = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    };

    const handleStreamResponse = async (prompt: string, session: Chat | null) => {
      if (!session) {
        setIsLoading(false);
        setMessages([{sender: 'ai', text: 'Error: No se pudo iniciar la sesión de chat.'}]);
        return;
      }
      try {
        const stream = await sendMessageStream(session, prompt);
        let accumulatedResponse = "";
        let currentMessage = "";

        setIsLoading(false);
        setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

        for await (const chunk of stream) {
            const text = chunk.text;
            accumulatedResponse += text;
            currentMessage += text;

            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = accumulatedResponse;
                return newMessages;
            });
        }
        speakText(currentMessage);
      } catch (error) {
          console.error("Error al recibir el stream:", error);
          setMessages(prev => [...prev, { sender: 'ai', text: "Lo siento, tuve un problema para conectarme. Por favor, intenta de nuevo."}]);
          setIsLoading(false);
      }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatSession) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        handleStreamResponse(input, chatSession);
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Tu navegador no soporta el reconocimiento de voz.");
            return;
        }

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = 'es-US';
        recognitionRef.current.interimResults = true;
        recognitionRef.current.continuous = false;

        recognitionRef.current.onstart = () => {
            setIsListening(true);
        };

        recognitionRef.current.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map(result => result.transcript)
                .join('');
            setInput(transcript);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
            <div className="bg-brand-background rounded-lg max-w-2xl w-full h-[80vh] flex flex-col animate-slide-in-right border border-brand-dark/20">
                <header className="flex items-center justify-between p-4 border-b border-brand-dark/10">
                    <div className="flex items-center">
                         <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center mr-4">
                            <i className="fas fa-robot text-2xl text-brand-background"></i>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-brand-text">Consultando a {agent}</h2>
                            <p className="text-sm text-brand-text-secondary">Experto en {topic}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-brand-text-secondary hover:text-brand-text text-2xl cursor-hover-target">&times;</button>
                </header>
                <main className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center flex-shrink-0 mt-1"><i className="fas fa-microchip"></i></div>}
                            <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-brand-primary text-white' : 'bg-white border border-brand-dark/10'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.text}{isLoading && index === messages.length -1 && <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse"></span>}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </main>
                <footer className="p-4 border-t border-brand-dark/10">
                    {isSpeaking && <button onClick={stopSpeaking} className="text-xs text-brand-primary mb-2 font-semibold">Dejar de hablar</button>}
                    <form onSubmit={handleSubmit} className="flex items-center gap-3">
                        <button type="button" onClick={toggleListening} className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-brand-text-secondary'} cursor-hover-target`}>
                           <i className="fas fa-microphone"></i>
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isListening ? "Escuchando..." : `Escribe tu respuesta...`}
                            className="flex-1 w-full p-3 border border-brand-dark/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-primary"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-all duration-300 cursor-hover-target disabled:opacity-50">
                            Enviar
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default AgentChat;
