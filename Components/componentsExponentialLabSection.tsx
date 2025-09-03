
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { CULTURAL_CHALLENGES } from '../constants';

interface ExponentialLabSectionProps {
    onNavigate: (page: string) => void;
}

const ExponentialLabSection: React.FC<ExponentialLabSectionProps> = ({ onNavigate }) => {
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const cardRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="lab" className="py-24 sm:py-40 bg-brand-dark text-brand-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="reveal-item text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-primary font-semibold">Sazón AI Premium</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-white mt-4">
            Exponential Learning Lab
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            Has aprendido el "qué". Ahora es el momento del "cómo". El Lab es un Venture Studio 100% automatizado donde dejas la teoría y empiezas a construir soluciones a problemas culturales reales con tu equipo de Superagentes de IA.
          </p>
        </div>
        
        <div ref={cardRef} className="reveal-item max-w-5xl mx-auto bg-[#1F1F1F] border border-gray-700 rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12" style={{ transitionDelay: '200ms' }}>
            <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-white">Resuelve Desafíos Culturales Relevantes</h3>
                <p className="text-gray-400 mt-2 mb-6">Estos no son ejercicios. Son problemas reales esperando una solución innovadora.</p>
                <div className="space-y-4">
                    {CULTURAL_CHALLENGES.slice(0, 2).map(challenge => (
                        <div key={challenge.id} className="bg-brand-dark p-4 rounded-lg border border-gray-700 flex items-center gap-4">
                            <i className={`fas ${challenge.icon} text-brand-primary text-xl`}></i>
                            <p className="font-semibold text-white">{challenge.title}</p>
                        </div>
                    ))}
                    <div className="bg-brand-dark p-4 rounded-lg border border-gray-700 text-center text-gray-400">
                        <p>Y más de 100 desafíos esperando...</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center bg-brand-dark p-8 rounded-lg border border-gray-700">
                <h4 className="font-bold text-white">Transforma Ideas en Impacto</h4>
                <p className="text-sm text-gray-400 mt-2">Obtén feedback estructurado, simula reuniones y acelera tu carrera.</p>
                <button 
                    onClick={() => onNavigate('lab')}
                    className="mt-6 w-full bg-brand-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-hover-target"
                >
                    Entrar al Lab
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ExponentialLabSection;