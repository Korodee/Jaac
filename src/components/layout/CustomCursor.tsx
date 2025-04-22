'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaHeart, FaStar, FaMoon, FaSun } from 'react-icons/fa';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trailing cursor effect
  const cursorTrailX = useMotionValue(-100);
  const cursorTrailY = useMotionValue(-100);
  const cursorTrailXSpring = useSpring(cursorTrailX, { ...springConfig, stiffness: 500 });
  const cursorTrailYSpring = useSpring(cursorTrailY, { ...springConfig, stiffness: 500 });
  
  // Outer ring effect
  const cursorRingX = useMotionValue(-100);
  const cursorRingY = useMotionValue(-100);
  const cursorRingXSpring = useSpring(cursorRingX, { ...springConfig, stiffness: 300 });
  const cursorRingYSpring = useSpring(cursorRingY, { ...springConfig, stiffness: 300 });
  
  // Particle effects
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([]);
  const [particleId, setParticleId] = useState(0);

  const cursorVariants = {
    default: {
      scale: 1,
      opacity: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    link: {
      scale: 1.5,
      opacity: 0.8,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: 'rgba(99, 102, 241, 0.8)',
    },
  };

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Update trailing cursor with delay
      setTimeout(() => {
        cursorTrailX.set(e.clientX);
        cursorTrailY.set(e.clientY);
      }, 50);
      
      // Update outer ring with more delay
      setTimeout(() => {
        cursorRingX.set(e.clientX);
        cursorRingY.set(e.clientY);
      }, 100);
      
      // Show cursor if it was hidden
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      
      // Create particles on click
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: particleId + i,
        x: cursorX.get(),
        y: cursorY.get(),
        size: Math.random() * 8 + 4,
        color: i % 2 === 0 ? '#a855f7' : '#6366f1'
      }));
      
      setParticles(prev => [...prev, ...newParticles]);
      setParticleId(prev => prev + 5);
      
      // Remove particles after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 1000);
    };
    
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    const handleHoverStart = () => {
      setIsHovering(true);
      setCursorVariant('link');
    };
    
    const handleHoverEnd = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleHoverStart);
      link.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      // Restore default cursor
      document.body.style.cursor = 'auto';
      
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleHoverStart);
        link.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [cursorX, cursorY, cursorTrailX, cursorTrailY, cursorRingX, cursorRingY, isVisible, particleId]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-full rounded-full border-2 flex items-center justify-center">
          {cursorVariant === 'link' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <FaHeart className="text-white text-xs" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-40 mix-blend-difference"
        style={{
          x: cursorTrailXSpring,
          y: cursorTrailYSpring,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-30 mix-blend-difference"
        style={{
          x: cursorRingXSpring,
          y: cursorRingYSpring,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        }}
      />
      
      {/* Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed rounded-full pointer-events-none z-20"
          initial={{ 
            x: particle.x, 
            y: particle.y, 
            width: particle.size, 
            height: particle.size,
            opacity: 1,
            backgroundColor: particle.color
          }}
          animate={{
            x: particle.x + (Math.random() * 100 - 50),
            y: particle.y + (Math.random() * 100 - 50),
            opacity: 0,
            scale: 0
          }}
          transition={{ 
            duration: 1,
            ease: 'easeOut'
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor; 