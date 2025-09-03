
import React, { useState } from 'react';
import { SUCCESS_STORIES } from '../constants';

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, onNavigate?: (page: string) => void) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;

    if (href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else if (onNavigate) {
        onNavigate(href);
    }
};

const KineticText: React.FC<{ text: string; stagger: number; delay: number }> = ({ text, stagger, delay }) => {
    return (
        <span className="block" aria-label={text}>
            {text.split('').map((char, index) => (
                <span key={`${char}-${index}`} className="inline-block overflow-hidden">
                    <span 
                        className="inline-block animate-letter-in"
                        style={{ animationDelay: `${delay + index * stagger}ms` }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </span>
    );
};

interface HeaderProps {
    onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    return (
      <header className="w-full z-30 py-6 mb-8">
        <div className="flex items-center justify-between border-b border-brand-dark/20 pb-4">
            <a href="home" onClick={(e) => handleNavClick(e, onNavigate)} className="text-xl font-bold tracking-tight cursor-hover-target text-brand-text">
              Sazón<span className="text-brand-primary">AI</span>
            </a>
            <nav className="hidden md:flex items-center space-x-4 text-sm">
              <a href="#skills" onClick={(e) => handleNavClick(e)} className="text-brand-text-secondary hover:text-brand-text transition-colors duration-300 cursor-hover-target">Habilidades</a>
              <a href="methodology" onClick={(e) => handleNavClick(e, onNavigate)} className="text-brand-text-secondary hover:text-brand-text transition-colors duration-300 cursor-hover-target">Metodología</a>
              <a href="case-study" onClick={(e) => handleNavClick(e, onNavigate)} className="font-semibold text-brand-text hover:opacity-70 transition-opacity duration-300 cursor-hover-target">Ver Demo</a>
              
              <span className="text-brand-dark/20">/</span>
              <a
                href="#lab"
                onClick={(e) => handleNavClick(e)}
                className="font-semibold text-brand-primary hover:opacity-70 transition-opacity duration-300 cursor-hover-target bg-brand-primary/10 px-3 py-1 rounded-md"
              >
                Exponential Lab
              </a>
            </nav>
        </div>
      </header>
    );
};

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = SUCCESS_STORIES[activeIndex];

  return (
    <section id="home" className="relative min-h-screen flex flex-col bg-brand-background text-brand-text overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col">
        <Header onNavigate={onNavigate} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
          {/* Left Column */}
          <div className="flex flex-col justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div>
              <h1 className="font-sans text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none text-brand-text">
                <KineticText text="Construye" delay={300} stagger={25} />
                <KineticText text="Tu Futuro" delay={450} stagger={25} />
                <KineticText text="en IA." delay={600} stagger={25} />
              </h1>
              <div className="mt-8 transition-opacity duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block bg-brand-primary/10 text-brand-primary text-sm font-semibold px-3 py-1 rounded-full">{activeStory.badge}</span>
                  <span className="flex items-center text-xs text-blue-500 font-semibold">
                    <i className="fas fa-check-circle mr-1"></i>
                    Verificado
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-brand-text mb-2">{activeStory.title}</h2>
                <p className="text-brand-text-secondary max-w-md" dangerouslySetInnerHTML={{ __html: activeStory.description }}></p>
              </div>
            </div>
            <a href="#skills" onClick={(e) => handleNavClick(e)} className="group mt-12 text-lg font-medium text-brand-text inline-flex items-center cursor-hover-target relative">
                <span>Conoce las habilidades</span>
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
                <span className="absolute bottom-0 left-0 h-px w-full bg-brand-text scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          </div>

          {/* Right Column */}
          <div className="relative flex flex-col justify-center items-center h-full">
            <div className="w-full max-w-md aspect-[3/4] relative overflow-hidden rounded-lg">
              {SUCCESS_STORIES.map((story, index) => (
                <img
                  key={story.title}
                  src={story.image}
                  alt={`Caso de éxito de Sazón AI: ${story.title}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
             <div className="mt-8">
                <ul className="flex items-center space-x-6 text-brand-text-secondary">
                    {SUCCESS_STORIES.map((story, index) => (
                        <li key={story.title}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`font-medium cursor-pointer transition-colors duration-300 ${activeIndex === index ? 'text-brand-text' : 'hover:text-brand-text'}`}
                        >
                            {story.badge}
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;