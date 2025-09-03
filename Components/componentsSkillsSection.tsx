import React from 'react';
import { SKILLS } from '../constants';
import SkillCard from './SkillCard';
import { Agent, Skill } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SkillsSectionProps {
  onAgentClick: (agent: Agent, topic: Skill) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ onAgentClick }) => {
  const headerRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="skills" className="py-24 sm:py-40 bg-brand-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="reveal-item text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold text-brand-text">Las 4 Habilidades del Futuro</h2>
          <p className="mt-6 text-lg text-brand-text-secondary">Dominar estas competencias te posicionará a la vanguardia de la innovación y el liderazgo en la era de la IA.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((skill, index) => (
            <SkillCard
              key={skill.title}
              {...skill}
              index={index}
              onAgentClick={onAgentClick}
              style={{ transitionDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;