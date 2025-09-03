
import React from 'react';

interface MethodologyPageProps {
    onNavigate: (page: string) => void;
}

const MethodologyPage: React.FC<MethodologyPageProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-brand-background text-brand-text animate-fade-in">
            <header className="container mx-auto px-4 sm:px-6 lg:px-8 w-full z-30 py-6">
                <div className="flex items-center justify-between border-b border-brand-dark/20 pb-4">
                    <h1 className="text-xl font-bold tracking-tight text-brand-text">
                        Sazón<span className="text-brand-primary">AI</span> / Metodología
                    </h1>
                    <button onClick={() => onNavigate('home')} className="font-semibold text-brand-text hover:opacity-70 transition-opacity duration-300 cursor-hover-target">
                        &larr; Volver al Inicio
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-brand-text mb-6">Ciclo de Sinergia Adaptativa (CSA)</h2>
                    <p className="text-lg text-brand-text-secondary mb-12">
                        Nuestro modelo educativo único no es una lista de cursos, es un ecosistema de crecimiento diseñado para acelerar tu dominio en la era de la IA. El CSA es un proceso iterativo de cuatro fases que te empodera para ir de la idea a la implementación de forma rápida y robusta.
                    </p>
                    
                    <div className="space-y-12">
                        <div className="p-8 border border-brand-dark/10 rounded-lg">
                            <h3 className="text-3xl font-bold text-brand-primary mb-3">1. Diagnóstico Estratégico (Pensamiento Crítico)</h3>
                            <p className="text-brand-text-secondary">
                                En esta fase, aprendes a identificar problemas y oportunidades de alto valor. Con la ayuda de <strong>Kai</strong> y su método Socrático, desarrollas un **Pensamiento Crítico** agudo para analizar el panorama, detectar tendencias y definir un desafío con potencial real de impacto.
                            </p>
                        </div>
                        <div className="p-8 border border-brand-dark/10 rounded-lg">
                            <h3 className="text-3xl font-bold text-brand-primary mb-3">2. Ideación Exponencial (Creatividad e Innovación)</h3>
                            <p className="text-brand-text-secondary">
                                Aquí es donde las ideas toman forma. Colaboras con <strong>Lyra</strong> para transformar tu desafío en conceptos innovadores. Esta fase se centra en la **Creatividad e Innovación**, usando la IA como un socio para expandir tus posibilidades. Proyectos avanzados pueden usar <strong>Sandboxes de 'Gemelos Digitales'</strong> para prototipar a escala.
                            </p>
                        </div>
                        <div className="p-8 border border-brand-dark/10 rounded-lg">
                            <h3 className="text-3xl font-bold text-brand-primary mb-3">3. Prototipado Rápido (AI Generativa)</h3>
                            <p className="text-brand-text-secondary">
                                Una idea no es nada sin validación. Con la guía de <strong>Orion</strong>, aplicas la **AI Generativa** para construir y probar tus soluciones a una velocidad sin precedentes. Además, entras en simulaciones de alta presión con nuestro <strong>Agente Simulador</strong> para recibir feedback realista y fortalecer tu propuesta.
                            </p>
                        </div>
                        <div className="p-8 border border-brand-dark/10 rounded-lg">
                            <h3 className="text-3xl font-bold text-brand-primary mb-3">4. Construcción de Venture (Emprendimiento)</h3>
                            <p className="text-brand-text-secondary">
                                En la fase final, conviertes tu solución en un venture viable. <strong>Sol</strong> te ayuda con los principios de **Emprendimiento** para diseñar un modelo de negocio y un pitch deck convincente. Al completar hitos, obtienes <strong>Credenciales Verificables en Blockchain</strong>, creando un portafolio de habilidades transparente.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MethodologyPage;