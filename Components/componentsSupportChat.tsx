
import React, { useState, useEffect, useRef } from 'react';
import { getSupportResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const SupportChat: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                sender: 'ai',
                text: '¡Hola! Soy El Guía, tu asistente de soporte para Sazón AI. ¿Cómo puedo ayudarte a navegar nuestra plataforma hoy? Pregúntame sobre precios, el Lab, o nuestra metodología.'
            }]);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiResponse = await getSupportResponse(input);
        setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
        setIsLoading(false);
    };

    return (
        <>
            {/* Chat Widget */}
            <div className={`fixed bottom-0 right-0 sm:bottom-8 sm:right-8 w-full h-full sm:w-[380px] sm:h-[520px] sm:max-h-[80vh] bg-white shadow-2xl rounded-lg flex flex-col z-50 border border-brand-dark/20 transition-all duration-500 ease-custom-ease ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-brand-dark/10 bg-gray-50 rounded-t-lg">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center mr-3">
                            <i className="fas fa-question text-brand-background"></i>
                        </div>
                        <div>
                            <h3 className="font-bold text-brand-text">Soporte Sazón AI</h3>
                            <p className="text-xs text-brand-text-secondary">Asistente Virtual "El Guía"</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-brand-text-secondary hover:text-brand-text cursor-hover-target text-2xl">&times;</button>
                </header>
                {/* Messages */}
                <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-background">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-gray-200 text-brand-text rounded-bl-none'}`}>
                               {msg.text}{isLoading && msg.sender === 'ai' && index === messages.length -1 && <span className="inline-block w-2 h-4 bg-brand-text ml-1 animate-pulse"></span>}
                            </div>
                        </div>
                    ))}
                     <div ref={messagesEndRef} />
                </main>
                {/* Footer */}
                <footer className="p-4 border-t border-brand-dark/10 bg-white rounded-b-lg">
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Pregunta sobre Sazón AI..."
                            className="flex-1 bg-gray-100 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="ml-3 bg-brand-dark text-brand-background rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50 cursor-hover-target">
                            {isLoading ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> : <i className="fas fa-paper-plane"></i>}
                        </button>
                    </form>
                </footer>
            </div>
            {/* Floating Button */}
            <button onClick={() => setIsOpen(!isOpen)} className={`fixed bottom-8 right-8 bg-brand-dark text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-40 cursor-hover-target transition-all duration-300 transform hover:scale-110 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <i className={`fas fa-question text-2xl`}></i>
            </button>
        </>
    );
};

export default SupportChat;