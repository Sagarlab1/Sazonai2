
import React from 'react';

interface PreloaderProps {
    isLoading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
    return (
        <div className={`preloader ${!isLoading ? 'is-loaded' : ''}`}>
            <div className="preloader-logo">
                Sazón<span className="text-brand-primary">AI</span>
            </div>
            <div className="preloader-curtain"></div>
            <style>{`
                .preloader {
                    position: fixed;
                    inset: 0;
                    background-color: #111111;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #F0EFEA;
                    transition: opacity 0.5s ease;
                }
                .preloader.is-loaded {
                    opacity: 0;
                    pointer-events: none;
                }
                .preloader-logo {
                    font-size: 2.5rem;
                    font-weight: bold;
                    letter-spacing: -0.025em;
                    opacity: 0;
                    animation: fadeInLogo 1s 0.5s ease forwards;
                }
                
                @keyframes fadeInLogo {
                    to { opacity: 1; }
                }

                .preloader-curtain {
                    position: absolute;
                    inset: 0;
                    background-color: #F0EFEA;
                    transform: scaleY(1);
                    transform-origin: top;
                    transition: transform 1s cubic-bezier(0.8, 0, 0.2, 1);
                    transition-delay: 1.5s;
                }
                
                .preloader.is-loaded .preloader-curtain {
                    transform: scaleY(0);
                    transform-origin: bottom;
                }

                @media (prefers-reduced-motion: reduce) {
                    .preloader, .preloader-logo, .preloader-curtain {
                        animation: none !important;
                        transition: none !important;
                    }
                    .preloader.is-loaded {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Preloader;