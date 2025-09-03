
import React from 'react';
import { FAQS } from '../constants';
import FaqItem from './FaqItem';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FaqSection: React.FC = () => {
  const ref = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="faq" className="py-24 sm:py-40 bg-brand-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-brand-text">Preguntas Frecuentes</h2>
          <p className="mt-6 text-lg text-brand-text-secondary">Respuestas claras a las dudas específicas de nuestra comunidad.</p>
        </div>
        
        <div ref={ref} className="reveal-item max-w-4xl mx-auto" style={{ transitionDelay: '200ms' }}>
          {FAQS.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;