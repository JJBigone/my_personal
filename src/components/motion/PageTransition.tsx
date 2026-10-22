import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { getPageTransitionVariants } from './motionVariants';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const variants = getPageTransitionVariants(shouldReduceMotion);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={`w-full flex-1 flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
