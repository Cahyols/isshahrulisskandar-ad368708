
import { useEffect, useRef, RefObject } from 'react';

type AnimationType = 'fade-in' | 'slide-up' | 'slide-in' | 'scale-in';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animation?: AnimationType;
  delay?: number;
}

export const useScrollAnimation = <T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
): [RefObject<T>, boolean] => {
  const {
    threshold = 0.2,
    rootMargin = '0px',
    animation = 'fade-in',
    delay = 0
  } = options;
  
  const elementRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isInViewRef = useRef<boolean>(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Add initial hidden state
    element.style.opacity = '0';
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting && !isInViewRef.current) {
        isInViewRef.current = true;
        
        // Apply animation based on type with potential delay
        setTimeout(() => {
          if (element) {
            element.style.opacity = '1';
            
            switch (animation) {
              case 'fade-in':
                element.classList.add('animate-fade-in');
                break;
              case 'slide-up':
                element.classList.add('animate-slide-up');
                break;
              case 'slide-in':
                element.classList.add('animate-slide-in');
                break;
              case 'scale-in':
                element.classList.add('animate-scale-in');
                break;
            }
          }
        }, delay);
        
        // Once animation is triggered, disconnect observer
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      }
    };
    
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });
    
    observerRef.current.observe(element);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, animation, delay]);
  
  return [elementRef, isInViewRef.current];
};
