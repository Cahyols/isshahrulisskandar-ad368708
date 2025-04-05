
import { useEffect, useState } from 'react';

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Parallax elements */}
      <div 
        className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-primary/5 opacity-60"
        style={{ 
          transform: `translate3d(${scrollY * 0.03}px, ${scrollY * -0.02}px, 0)`,
          transition: 'transform 0.1s linear'
        }}
      />
      <div 
        className="absolute top-[30%] left-[10%] w-96 h-96 rounded-full bg-accent/5 opacity-70"
        style={{ 
          transform: `translate3d(${scrollY * -0.02}px, ${scrollY * 0.01}px, 0)`,
          transition: 'transform 0.1s linear'
        }}
      />
      <div 
        className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-secondary/10 opacity-50"
        style={{ 
          transform: `translate3d(${scrollY * 0.01}px, ${scrollY * 0.03}px, 0)`,
          transition: 'transform 0.1s linear'
        }}
      />
      <div 
        className="absolute bottom-[10%] left-[20%] w-72 h-72 rounded-full bg-primary/5 opacity-60"
        style={{ 
          transform: `translate3d(${scrollY * -0.01}px, ${scrollY * -0.02}px, 0)`,
          transition: 'transform 0.1s linear'
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
