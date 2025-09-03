
import React from 'react';

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in"
            style={{ animationDuration: '0.3s' }}
        >
            <div 
                className="bg-brand-background rounded-lg p-8 max-w-lg w-full relative border border-brand-dark/20 shadow-2xl"
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-brand-text-secondary hover:text-brand-text text-2xl cursor-hover-target"
                >
                    &times;
                </button>
                
                <div className="text-center">
                    <i className="fas fa-rocket text-4xl text-brand-primary mb-4"></i>
                    <h2 className="text-3xl font-bold text-brand-text mb-2">Desbloquea el Exponential Lab</h2>
                    <p className="text-brand-text-secondary mb-6">
                        Estás a un paso de transformar la teoría en impacto real. La suscripción Premium te da acceso ilimitado a:
                    </p>
                </div>
                
                <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-start">
                        <i className="fas fa-check-circle text-brand-primary mr-3 mt-1"></i>
                        <span>Un **Venture Studio 100% automatizado** con tu equipo de Superagentes de IA.</span>
                    </li>
                    <li className="flex items-start">
                        <i className="fas fa-check-circle text-brand-primary mr-3 mt-1"></i>
                        <span>Acceso a **+100 Desafíos Culturales** para construir un portafolio con propósito.</span>
                    </li>
                    <li className="flex items-start">
                        <i className="fas fa-check-circle text-brand-primary mr-3 mt-1"></i>
                        <span>**Feedback Estructurado (FODA)** para cada una de tus propuestas.</span>
                    </li>
                    <li className="flex items-start">
                        <i className="fas fa-check-circle text-brand-primary mr-3 mt-1"></i>
                        <span>**Simulaciones de reuniones** con inversores y clientes para prepararte para el mundo real.</span>
                    </li>
                </ul>

                <div className="text-center mb-6">
                  <p className="text-4xl font-extrabold text-brand-text">$49<span className="text-lg font-medium text-brand-text-secondary">/mes</span></p>
                  <p className="text-xs text-brand-text-secondary">después de tu primer desafío gratuito.</p>
                </div>

                <button className="w-full bg-brand-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 cursor-hover-target">
                    Comienza tu Primer Desafío Gratis
                </button>
                 <p className="text-xs text-center text-brand-text-secondary mt-2">Cancela en cualquier momento.</p>
            </div>
        </div>
    );
};

export default PaywallModal;