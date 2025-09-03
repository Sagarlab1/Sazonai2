
import React, { useState } from 'react';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-dark/10">
      <button
        className="flex justify-between items-center w-full py-6 text-left cursor-hover-target"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-brand-text">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <i className="fas fa-plus text-brand-primary"></i>
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-brand-text-secondary">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;