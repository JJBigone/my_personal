import type { Variants, Transition } from 'motion/react';

export const TRANSITION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const pageTransition: Transition = {
  duration: 0.36,
  ease: TRANSITION_EASE,
};

export const getPageTransitionVariants = (reducedMotion: boolean): Variants => ({
  initial: {
    opacity: 0,
    y: reducedMotion ? 0 : 8,
    filter: reducedMotion ? 'none' : 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: reducedMotion ? 'none' : 'blur(0px)',
    transition: pageTransition,
  },
  exit: {
    opacity: 0,
    y: reducedMotion ? 0 : -4,
    filter: reducedMotion ? 'none' : 'blur(4px)',
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 1, 1],
    },
  },
});

export const getStaggerContainer = (staggerInterval = 0.055, delay = 0.04): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerInterval,
      delayChildren: delay,
    },
  },
});

export const getStaggerItem = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 12,
    filter: reducedMotion ? 'none' : 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: TRANSITION_EASE,
    },
  },
});

export const getStaggerItemSubtle = (reducedMotion: boolean): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: TRANSITION_EASE,
    },
  },
});

export const liquidGlowVariants: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: TRANSITION_EASE,
    },
  },
};
