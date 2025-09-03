
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CULTURAL_CHALLENGES } from '../constants';
import { VentureChallenge, Agent } from '../types';
import { getAgentResponseInLab, getMarketTrends } from '../services/geminiService';

interface ExponentialLabPageProps {
    onNavigate: (page: string) => void;
}

interface ConsoleMessage {
    sender: Agent | 'system';
    text: string;
}

const ExponentialLabPage: React.FC<ExponentialLabPageProps> = ({ onNavigate }) => {
    const [activeChallenge, setActiveChallenge] = useState<VentureChallenge | null>(null);
    const [userInput, setUserInput] = useState('');
    const [chatInput, setChatInput] = useState('');
    const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [synergyData, setSynergyData] = useState<Record<string, number>>({});
    const [marketTrends, setMarketTrends] = useState<string | null>(null);
    const [trendsLoading, setTrendsLoading] = useState(false);

    const consoleEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [consoleMessages]);
    
    const handleSelectChallenge = (challenge: VentureChallenge) => {
        setActiveChallenge(challenge);
        setUserInput('');
        setConsoleMessages([]);
        setSynergyData({});
        setMarketTrends(null);
    };
    
    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const mentionMatch = chatInput.match(/@(\w+)/);
        if (!mentionMatch) {
            setConsoleMessages(prev => [...prev, {
                sender: 'system',
                text: 'Para obtener una respuesta, por favor menciona a un agente (ej. @Kai, @Lyra, etc.) en tu mensaje.'
            }]);
            setChatInput('');
            return;
        }

        const agentName = mentionMatch[1].charAt(0).toUpperCase() + mentionMatch[1].slice(1) as Agent;
        if (!Object.values(Agent).includes(agentName)) {
             setConsoleMessages(prev => [...prev, {
                sender: 'system',
                text: `El agente "@${agentName}" no existe. Intenta con @Kai, @Lyra, @Orion o @Sol.`
            }]);
            setChatInput('');
            return;
        }

        const fullProposal = userInput + "\n\nMi pregunta/instrucción actual: " + chatInput;
        setIsLoading(true);
        const result = await getAgentResponseInLab(mentionMatch[0], fullProposal);
        if (result) {
            setConsoleMessages(prev => [...prev, { sender: result.agent, text: result.response }]);
            setSynergyData(prev => ({ ...prev, [result.agent]: (prev[result.agent] || 0) + 1 }));
        }
        setIsLoading(false);
        setChatInput('');
    };

    const handleConsultHelios = async () => {
        setTrendsLoading(true);
        setMarketTrends(null);
        const trends = await getMarketTrends();
        setMarketTrends(trends);
        setTrendsLoading(false);
    };

    return (
        <div className="min-h-screen bg-brand-background text-brand-text animate-fade-in">
            <header className="container mx-auto px-4 sm:px-6 lg:px-8 w-full z-30 py-6">
                <div className="flex items-center justify-between border-b border-brand-dark/20 pb-4">
                    <h1 className="text-xl font-bold tracking-tight text-brand-text">
                        Sazón<span className="text-brand-primary">AI</span> / Exponential Lab
                    </h1>
                    <button onClick={() => onNavigate('home')} className="font-semibold text-brand-text hover:opacity-70 transition-opacity duration-300 cursor-hover-target">
                        &larr; Volver al Inicio
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {!activeChallenge ? (
                    <ChallengeSelector onSelect={handleSelectChallenge} />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-3">
                           <ChallengeDetails challenge={activeChallenge} onBack={() => setActiveChallenge(null)} />
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                               <SynergyProgress synergyData={synergyData} />
                               <OpportunityRadar onConsult={handleConsultHelios} trends={marketTrends} isLoading={trendsLoading} />
                           </div>
                           <UserInput onInputChange={setUserInput} value={userInput} />
                        </div>

                        {/* Right Column: Synergy Console */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-brand-dark/10 flex flex-col h-[85vh]">
                            <h3 className="text-xl font-bold mb-4 border-b pb-2">Consola de Sinergia</h3>
                            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                               {consoleMessages.length === 0 && (
                                 <div className="text-center p-8 text-brand-text-secondary h-full flex flex-col justify-center">
                                     <i className="fas fa-comments text-4xl mb-4"></i>
                                     <h3 className="font-bold">Panel de Colaboración</h3>
                                     <p className="text-sm">Menciona a un Superagente en el chat de abajo para iniciar la colaboración.</p>
                                 </div>
                               )}
                               {consoleMessages.map((msg, index) => {
                                   if (msg.sender === 'system') {
                                       return (
                                           <div key={index} className="text-center text-xs italic text-brand-text-secondary p-2 animate-fade-in">
                                               <p>{msg.text}</p>
                                           </div>
                                       )
                                   }
                                   return (
                                      <div key={index} className="animate-fade-in">
                                          <p className="font-bold text-brand-primary text-sm">@{msg.sender}</p>
                                          <p className="text-brand-text-secondary text-sm whitespace-pre-wrap">{msg.text}</p>
                                      </div>
                                   )
                               })}
                               {isLoading && <div className="text-center p-4"><span className="animate-spin inline-block w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full"></span></div>}
                               <div ref={consoleEndRef}></div>
                            </div>
                            <form onSubmit={handleChatSubmit} className="mt-4 flex gap-2">
                                <input 
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Ej: @Kai, analiza los riesgos..."
                                    className="flex-1 w-full p-2 border border-brand-dark/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                />
                                <button type="submit" disabled={isLoading} className="bg-brand-dark text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 cursor-hover-target disabled:opacity-50">
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};


const ChallengeSelector: React.FC<{onSelect: (c: VentureChallenge) => void}> = ({onSelect}) => (
    <div>
        <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Desafíos Culturales Exponenciales</h2>
            <p className="text-brand-text-secondary mb-12">Elige un problema real que resuene contigo. Aquí es donde aplicas tus habilidades para crear un impacto tangible en la comunidad.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CULTURAL_CHALLENGES.map(c => (
                    <button key={c.id} onClick={() => onSelect(c)} className="p-6 bg-white border border-brand-dark/10 rounded-lg text-left hover:border-brand-primary hover:scale-105 transition-all duration-300 cursor-hover-target flex flex-col items-center text-center">
                        <i className={`fas ${c.icon} text-3xl text-brand-primary mb-4`}></i>
                        <h3 className="font-bold text-lg">{c.title}</h3>
                        <p className="text-sm text-brand-text-secondary mt-2 flex-grow">{c.description}</p>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const ChallengeDetails: React.FC<{challenge: VentureChallenge, onBack: () => void}> = ({challenge, onBack}) => (
    <div className="mb-8 p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-lg relative">
        <button onClick={onBack} className="absolute top-4 right-4 text-brand-text-secondary hover:text-brand-text">&larr; Elegir otro</button>
        <h2 className="text-2xl font-bold">{challenge.title}</h2>
        <p className="text-brand-text-secondary mt-2 mb-4">{challenge.description}</p>
        <div className="flex flex-wrap gap-2">
            {challenge.modules.map(m => <span key={m} className="text-xs bg-brand-dark text-white px-2 py-1 rounded-full">{m}</span>)}
        </div>
    </div>
);

const SynergyProgress: React.FC<{synergyData: Record<string, number>}> = ({synergyData}) => {
    // FIX: Explicitly type `reduce` parameters to prevent `unknown` type inference, resolving this and a subsequent cascading type error.
    const totalMentions = useMemo(() => Object.values(synergyData).reduce((sum: number, count: number) => sum + count, 0), [synergyData]);
    
    const suggestion = useMemo(() => {
        if (totalMentions < 3) return null;
        const agentsMentioned = Object.keys(synergyData);
        const allAgents = [Agent.KAI, Agent.LYRA, Agent.ORION, Agent.SOL];
        const notMentioned = allAgents.filter(agent => !agentsMentioned.includes(agent));

        if (notMentioned.length > 0) {
            return `Has consultado a ${agentsMentioned.join(', ')}. ¿Consideraste la perspectiva de @${notMentioned[0]}?`;
        }
        return null;
    }, [synergyData, totalMentions]);

    return (
        <div className="p-4 bg-white border border-brand-dark/10 rounded-lg">
            <h4 className="font-bold text-sm mb-2">Progreso de Sinergia</h4>
            {totalMentions === 0 ? (
                <p className="text-xs text-brand-text-secondary">Menciona a los agentes para ver tu progreso.</p>
            ) : (
                <div className="space-y-1">
                    {Object.entries(synergyData).map(([agent, count]) => (
                        <div key={agent} className="flex justify-between items-center text-xs">
                            <span className="font-semibold">{agent}</span>
                            <span className="text-brand-text-secondary">{count} mención{count > 1 ? 'es' : ''}</span>
                        </div>
                    ))}
                </div>
            )}
             {suggestion && <p className="text-xs text-brand-primary mt-2 italic">{suggestion}</p>}
        </div>
    );
};

const OpportunityRadar: React.FC<{onConsult: () => void, trends: string | null, isLoading: boolean}> = ({onConsult, trends, isLoading}) => {
    return (
         <div className="p-4 bg-white border border-brand-dark/10 rounded-lg">
            <h4 className="font-bold text-sm mb-2">Radar de Oportunidades</h4>
            {isLoading ? (
                <div className="text-center py-4"><span className="animate-spin inline-block w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full"></span></div>
            ) : trends ? (
                <p className="text-xs text-brand-text-secondary whitespace-pre-wrap">{trends}</p>
            ) : (
                <>
                    <p className="text-xs text-brand-text-secondary mb-3">Consulta a Helios para descubrir nuevas tendencias de mercado y desafíos emergentes.</p>
                    <button onClick={onConsult} className="w-full text-xs bg-brand-dark/5 text-brand-dark font-semibold py-2 px-3 rounded-md hover:bg-brand-dark/10 transition-colors">
                        Consultar a Helios
                    </button>
                </>
            )}
        </div>
    );
};


const UserInput: React.FC<{onInputChange: (v: string) => void, value: string}> = ({onInputChange, value}) => (
    <div>
        <label htmlFor="userInput" className="block text-lg font-semibold mb-2">Tu Propuesta y Plan de Acción:</label>
        <textarea 
            id="userInput"
            value={value}
            onChange={(e) => onInputChange(e.target.value)}
            rows={10}
            placeholder="Desarrolla tu idea principal aquí. Usa la consola de la derecha para colaborar con tus Superagentes."
            className="w-full p-4 border border-brand-dark/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary resize-y"
        />
    </div>
);

export default ExponentialLabPage;