'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'left' | 'right' | 'up' | 'down';

interface SlideInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
}

const directionMap = {
  left: { x: -50 },
  right: { x: 50 },
  up: { y: -50 },
  down: { y: 50 }
};

export default function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.5,
  className = ''
}: SlideInProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionMap[direction]
      }}
      animate={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      transition={{ 
        duration,
        delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 