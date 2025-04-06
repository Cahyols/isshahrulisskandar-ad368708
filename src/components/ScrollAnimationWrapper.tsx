
import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ScrollAnimationWrapper = ({ 
  children, 
  className = '',
  delay = 0,
  duration = 0.6,
  amount = 0.1,
  once = true,
  direction = 'up'
}: ScrollAnimationWrapperProps) => {
  const getVariants = (): Variants => {
    const directionOffset = () => {
      switch (direction) {
        case 'up': return { y: 30 };
        case 'down': return { y: -30 };
        case 'left': return { x: 30 };
        case 'right': return { x: -30 };
        default: return { y: 30 };
      }
    };

    return {
      hidden: { 
        opacity: 0,
        ...directionOffset()
      },
      visible: { 
        opacity: 1,
        ...(direction === 'up' || direction === 'down' ? { y: 0 } : { x: 0 })
      }
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ 
        duration, 
        delay,
        ease: [0.22, 1, 0.36, 1] 
      }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
