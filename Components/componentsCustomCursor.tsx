
import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduceMotion(mediaQuery.matches);

        const handleChange = () => setReduceMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        if (reduceMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('.cursor-hover-target')) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest('.cursor-hover-target')) {
                setIsHovering(false);
            }
        };
        
        const handleMouseLeave = () => {
          setIsVisible(false);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [reduceMotion, isVisible]);
    
    if (reduceMotion) return null;

    return (
        <div
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
                opacity: isVisible ? 1 : 0,
            }}
            className="pointer-events-none fixed z-[9999] h-3 w-3 rounded-full bg-brand-dark transition-transform,opacity duration-200 ease-out"
        />
    );
};

export default CustomCursor;