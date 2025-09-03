
import React from 'react';

interface FooterProps {
    onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      if (!href) return;

      if (href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      } else {
          onNavigate(href);
      }
  };
  
  const navLinks = [
    { name: 'Habilidades', href: '#skills' },
    { name: 'Metodología', href: 'methodology' },
    { name: 'Demo', href: 'case-study' },
    { name: 'Lab', href: '#lab' },
    { name: 'Precios', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <footer className="bg-brand-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col sm:flex-row items-center justify-between border-t border-brand-dark/20 py-6 text-sm text-brand-text-secondary">
          <p className="cursor-hover-target">
            <a href="home" onClick={handleNavClick} className="font-bold text-brand-text">SazónAI</a> &copy; {new Date().getFullYear()}
          </p>
           <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-wrap justify-center">
               {navLinks.map((link, index) => (
                    <React.Fragment key={link.name}>
                        <a href={link.href} onClick={handleNavClick} className="hover:text-brand-text transition-colors cursor-hover-target">
                            {link.name}
                        </a>
                        {index < navLinks.length -1 && <span className="opacity-50">/</span>}
                    </React.Fragment>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;