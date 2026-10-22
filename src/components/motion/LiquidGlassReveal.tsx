import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface LiquidGlassRevealProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'sage' | 'cream' | 'forest';
}

export const LiquidGlassReveal: React.FC<LiquidGlassRevealProps> = ({
  children,
  className = '',
  variant = 'sage',
}) => {
  const shouldReduceMotion = Boolean(useReducedMotion());

  const gradients = {
    sage: 'radial-gradient(ellipse at 40% 30%, rgba(130, 151, 123, 0.22), transparent 70%)',
    cream: 'radial-gradient(ellipse at 60% 40%, rgba(243, 235, 221, 0.35), transparent 75%)',
    forest: 'radial-gradient(ellipse at 50% 50%, rgba(53, 87, 70, 0.18), transparent 70%)',
  };

  if (shouldReduceMotion) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: gradients[variant],
          filter: 'blur(30px)',
        }}
        className="absolute -inset-4 pointer-events-none z-0"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default LiquidGlassReveal;
