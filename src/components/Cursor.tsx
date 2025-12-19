import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Throttle helper function
const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Throttled mouse move handler - updates every 16ms (~60fps)
    const handleMouseMove = throttle((e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (hidden) setHidden(false);
    }, 16);

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);
    
    // Check for link hover
    const handleLinkHoverEvents = () => {
      const handleLinkMouseEnter = () => setLinkHovered(true);
      const handleLinkMouseLeave = () => setLinkHovered(false);
      
      const links = document.querySelectorAll('a, button, [role="button"]');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', handleLinkMouseEnter);
        link.addEventListener('mouseleave', handleLinkMouseLeave);
      });
      
      return () => {
        links.forEach(link => {
          link.removeEventListener('mouseenter', handleLinkMouseEnter);
          link.removeEventListener('mouseleave', handleLinkMouseLeave);
        });
      };
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    const cleanupLinkEvents = handleLinkHoverEvents();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cleanupLinkEvents();
    };
  }, [hidden]);

  // Hide default cursor if our custom cursor is visible
  useEffect(() => {
    if (!hidden) {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hidden]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="cursor-dot fixed top-0 left-0 z-50 rounded-full pointer-events-none mix-blend-difference"
        style={{
          width: linkHovered ? 40 : 12,
          height: linkHovered ? 40 : 12,
          backgroundColor: 'white',
        }}
        animate={{
          x: position.x - (linkHovered ? 20 : 6),
          y: position.y - (linkHovered ? 20 : 6),
          scale: clicked ? 0.8 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 150,
          mass: 0.1,
        }}
      />
      <motion.div
        className="cursor-ring fixed top-0 left-0 z-40 rounded-full border border-white pointer-events-none mix-blend-difference"
        style={{
          width: 40,
          height: 40,
          borderWidth: '1px',
        }}
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: clicked ? 1.2 : 1,
          opacity: hidden ? 0 : 0.5,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 100,
          mass: 0.5,
        }}
      />
    </>
  );
};

export default Cursor;