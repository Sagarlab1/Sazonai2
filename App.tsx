
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import SkillsSection from './components/SkillsSection';
import FaqSection from './components/FaqSection';
import ExponentialLabSection from './components/ExponentialLabSection';
import Footer from './components/Footer';
import AgentChat from './components/AgentChat';
import { Agent, Skill } from './types';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import MethodologyPage from './components/MethodologyPage';
import ExponentialLabPage from './components/ExponentialLabPage';
import PaywallModal from './components/PaywallModal';
import CaseStudyPage from './components/CaseStudyPage';
import PricingSection from './components/PricingSection';
import SupportChat from './components/SupportChat';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
  const [currentTopic, setCurrentTopic] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [isPaywallVisible, setIsPaywallVisible] = useState(false);
  
  // Set to true to demonstrate the premium features directly.
  const isPremiumUser = true; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);

  // SEO: Dynamically update page title
  useEffect(() => {
    switch(currentPage) {
      case 'methodology':
        document.title = 'Metodología | Sazón AI';
        break;
      case 'case-study':
        document.title = 'Caso de Estudio | Sazón AI';
        break;
      case 'lab':
        document.title = 'Exponential Lab | Sazón AI';
        break;
      case 'home':
      default:
        document.title = 'Sazón AI | Educación Exponencial en IA para Latinos en EE.UU.';
        break;
    }
  }, [currentPage]);

  const handleAgentClick = (agent: Agent, topic: Skill) => {
    setCurrentAgent(agent);
    setCurrentTopic(topic);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setCurrentAgent(null);
    setCurrentTopic(null);
  };

  const handleNavigate = (page: string) => {
    if (page === 'lab' && !isPremiumUser) {
        setIsPaywallVisible(true);
        return;
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch(currentPage) {
        case 'methodology':
            return <MethodologyPage onNavigate={handleNavigate} />;
        case 'case-study':
            return <CaseStudyPage onNavigate={handleNavigate} />;
        case 'lab':
            return <ExponentialLabPage onNavigate={handleNavigate} />;
        case 'home':
        default:
            return (
                <>
                    <main>
                        <Hero onNavigate={handleNavigate} />
                        <SkillsSection onAgentClick={handleAgentClick} />
                        <ExponentialLabSection onNavigate={handleNavigate} />
                        <PricingSection />
                        <FaqSection />
                    </main>
                    <Footer onNavigate={handleNavigate} />
                </>
            );
    }
  }

  return (
    <div className="bg-brand-background min-h-screen">
      <CustomCursor />
      
      <Preloader isLoading={isLoading} />
      
      {!isLoading && (
        <>
          {renderPage()}
          <AgentChat
            isOpen={isChatOpen}
            agent={currentAgent}
            topic={currentTopic}
            onClose={handleCloseChat}
          />
          <PaywallModal 
            isOpen={isPaywallVisible}
            onClose={() => setIsPaywallVisible(false)}
          />
          <SupportChat />
        </>
      )}

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none noise-overlay"></div>

      <style>{`
        /* Hide default cursor */
        body, a, button {
          cursor: none;
        }

        /* Noise Overlay Style */
        .noise-overlay {
          opacity: 0.04;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbXBvc2l0ZSBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iaW4iLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZzh0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIi8+PC9zdmc+');
          z-index: 9999;
        }

        /* Base styles for reveal animations */
        .reveal-item {
          opacity: 0;
          transform: translateY(20px) scale(0.99);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          body, a, button {
            cursor: auto;
          }

          .reveal-item,
          .is-visible,
          .noise-overlay {
            transition: none;
            opacity: 1;
            transform: none;
            animation: none !important;
          }
          .noise-overlay {
            display: none;
          }
        }

        .cursor-hover-target {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cursor-hover-target:hover {
            transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default App;