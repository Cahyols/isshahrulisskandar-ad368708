
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
}

const ScrollAnimationWrapper = ({ children, className = '' }: ScrollAnimationWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
