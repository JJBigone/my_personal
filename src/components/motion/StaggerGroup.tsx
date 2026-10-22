import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  getStaggerContainer,
  getStaggerItem,
  getStaggerItemSubtle,
} from './motionVariants';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  interval?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  delay = 0.04,
  interval = 0.055,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={getStaggerContainer(interval, delay)}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  subtle?: boolean;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  subtle = false,
}) => {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const variants = subtle
    ? getStaggerItemSubtle(shouldReduceMotion)
    : getStaggerItem(shouldReduceMotion);

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};
