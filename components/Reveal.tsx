'use client';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export default function Reveal({ children, className = '', delay = 0, y = 24, once = true }: RevealProps) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once, amount: 0.16 }} transition={{ duration: reduce ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
