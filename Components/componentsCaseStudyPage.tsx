
import React from 'react';

interface CaseStudyPageProps {
    onNavigate: (page: string) => void;
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-brand-background text-brand-text animate-fade-in">
            <header className="container mx-auto px-4 sm:px-6 lg:px-8 w-full z-30 py-6">
                <div className="flex items-center justify-between border-b border-brand-dark/20 pb-4">
                    <h1 className="text-xl font-bold tracking-tight text-brand-text">
                        Sazón<span className="text-brand-primary">AI</span> / Caso de Estudio
                    </h1>
                    <button onClick={() => onNavigate('home')} className="font-semibold text-brand-text hover:opacity-70 transition-opacity duration-300 cursor-hover-target">
                        &larr; Volver al Inicio
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                         <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-brand-text mb-4">De Idea a Impacto en 4 Fases</h2>
                         <p className="text-lg text-brand-text-secondary">
                            Sigue el viaje de Elena, una usuaria Premium, mientras aborda el desafío "Acceso a Salud Mental Bicultural" dentro del Exponential Lab.
                         </p>
                    </div>

                    <div className="space-y-8">
                        {/* Phase 1 */}
                        <div className="p-6 bg-white border border-brand-dark/10 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4 text-brand-primary">Fase 1: Diagnóstico Estratégico</h3>
                            <div className="prose max-w-none text-brand-text-secondary">
                                <p>Elena comienza con una idea general. Usa la consola para consultar a Kai.</p>
                                <blockquote className="border-l-4 border-brand-primary/30 pl-4 italic">
                                    <strong>Input de Elena:</strong> "@Kai, el problema es que muchos latinos en EE.UU. no buscan terapia porque no encuentran profesionales que entiendan su cultura. Quiero crear 'algo' para solucionarlo."
                                </blockquote>
                                <blockquote className="border-l-4 border-gray-300 pl-4 mt-4">
                                    <strong>Respuesta Socrática de @Kai:</strong> "Un punto de partida poderoso, Elena. Antes de pensar en la solución, definamos el problema con más precisión. ¿Qué 'supuestos' estás haciendo sobre por qué no buscan terapia? ¿Es solo la barrera cultural, o hay factores económicos o de estigma que no estamos viendo?"
                                </blockquote>
                            </div>
                        </div>

                        {/* Phase 2 */}
                        <div className="p-6 bg-white border border-brand-dark/10 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4 text-brand-primary">Fase 2: Ideación Exponencial</h3>
                             <div className="prose max-w-none text-brand-text-secondary">
                                <p>Con un problema más definido, Elena colabora con Lyra para explorar soluciones creativas.</p>
                                <blockquote className="border-l-4 border-brand-primary/30 pl-4 italic">
                                    <strong>Input de Elena:</strong> "@Lyra, necesito ideas más allá de un simple directorio. ¿Cómo podemos hacer que la experiencia sea verdaderamente sanadora y bicultural?"
                                </blockquote>
                                <blockquote className="border-l-4 border-gray-300 pl-4 mt-4">
                                    <strong>Respuesta Socrática de @Lyra:</strong> "Excelente pregunta. En lugar de pensar en 'características', pensemos en 'rituales'. ¿Qué pasaría si la app integrara conceptos como el 'cafecito' virtual o 'círculos de apoyo' basados en herencias compartidas? ¿Cómo se vería una 'biblioteca de resiliencia' con historias de nuestros abuelos?"
                                </blockquote>
                            </div>
                        </div>

                        {/* Phase 3 */}
                        <div className="p-6 bg-white border border-brand-dark/10 rounded-lg">
                             <h3 className="text-2xl font-bold mb-4 text-brand-primary">Fase 3: Prototipado Rápido</h3>
                             <div className="prose max-w-none text-brand-text-secondary">
                                <p>Elena tiene un concepto: una app llamada "Raíces". Ahora necesita entender cómo construirlo.</p>
                                <blockquote className="border-l-4 border-brand-primary/30 pl-4 italic">
                                    <strong>Input de Elena:</strong> "@Orion, ¿cómo puedo usar IA generativa para crear contenido personalizado para los 'círculos de apoyo'?"
                                </blockquote>
                                <blockquote className="border-l-4 border-gray-300 pl-4 mt-4">
                                    <strong>Respuesta Socrática de @Orion:</strong> "Interesante. Imagina el flujo de datos. ¿Qué información te daría el usuario para que la IA genere una conversación relevante? ¿Y qué 'barreras de seguridad' necesitarías para asegurar que el contenido sea siempre constructivo y nunca perjudicial?"
                                </blockquote>
                            </div>
                        </div>

                        {/* Phase 4 */}
                        <div className="p-6 bg-white border border-brand-dark/10 rounded-lg">
                             <h3 className="text-2xl font-bold mb-4 text-brand-primary">Fase 4: Construcción de Venture</h3>
                             <div className="prose max-w-none text-brand-text-secondary">
                                <p>Con un prototipo validado, Elena se prepara para presentar su idea.</p>
                                 <blockquote className="border-l-4 border-brand-primary/30 pl-4 italic">
                                    <strong>Input de Elena:</strong> "@Sol, este es mi modelo de negocio: una suscripción mensual. ¿Es viable?"
                                </blockquote>
                                <blockquote className="border-l-4 border-gray-300 pl-4 mt-4">
                                    <strong>Respuesta Socrática de @Sol:</strong> "La suscripción es un modelo, pero ¿cuál es tu 'ventaja injusta'? ¿Qué te hace 10 veces mejor que un simple directorio? Antes de pensar en el precio, respóndeme esto: ¿cuál es la única métrica que te dirá si tu app está realmente creando bienestar?"
                                </blockquote>
                                <p className="font-bold mt-6 text-brand-text">Resultado Final:</p>
                                <p>Tras simular su pitch con inversores y refinar su modelo de negocio, Elena lanzó la primera versión de "Raíces". Por completar el desafío, recibió una <strong>Credencial Verificable en Blockchain</strong> que detalla las habilidades aplicadas, un activo poderoso en su portafolio profesional.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center mt-12">
                        <button onClick={() => onNavigate('lab')} className="bg-brand-primary text-white font-semibold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-hover-target">
                            Comienza tu Propio Desafío
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CaseStudyPage;