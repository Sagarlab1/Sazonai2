import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Agent, Skill } from '../types';

interface SkillCardProps {
  title: string;
  description: string;
  agent: Agent;
  topic: Skill;
  onAgentClick: (agent: Agent, topic: Skill) => void;
  style: React.CSSProperties;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, description, agent, topic, onAgentClick, style, index }) => {
  const ref = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={style}
      className="reveal-item p-8 rounded-2xl border border-brand-dark/10 flex flex-col h-full transition-all duration-300 ease-custom-ease hover:border-brand-text/50 hover:-translate-y-2 group"
    >
      <div className="relative mb-6">
        <span className="text-6xl font-serif font-bold text-brand-dark/10 transition-colors duration-300 group-hover:text-brand-primary/50">
          {(index + 1).toString().padStart(2, '0')}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-brand-text mb-4">{title}</h3>
      <p className="text-brand-text-secondary mb-6 flex-grow">{description}</p>
      
      <button onClick={() => onAgentClick(agent, topic)} className="cursor-hover-target mt-auto w-full bg-brand-primary/10 text-brand-primary font-semibold py-3 px-6 rounded-lg border border-brand-primary/30 hover:bg-brand-primary/20 transition-colors duration-300 flex items-center justify-center gap-2">
        <i className="fas fa-robot"></i>
        Consultar a {agent}
      </button>
    </div>
  );
};

export default SkillCard;