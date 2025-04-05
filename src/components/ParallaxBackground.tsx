
import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeToggleProvider';

const ParallaxBackground = () => {
  const { isDarkTheme } = useTheme();
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      
      const scrollPosition = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      
      // Add a subtle rotation for more dynamic effect
      const rotation = scrollPosition * 0.01;
      parallaxRef.current.style.transform += ` rotate(${rotation}deg)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div 
        className={`absolute inset-0 ${isDarkTheme ? 'opacity-5' : 'opacity-10'}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Parallax floating shapes */}
      <div 
        ref={parallaxRef} 
        className="absolute inset-0"
        aria-hidden="true"
      >
        {/* Large gradient circle */}
        <div 
          className={`absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl ${
            isDarkTheme 
              ? 'bg-gradient-to-br from-purple-800/30 via-blue-700/20 to-transparent' 
              : 'bg-gradient-to-br from-purple-500/20 via-blue-400/15 to-transparent'
          }`}
          style={{ 
            top: '10%', 
            right: '-15%',
          }}
        />
        
        {/* Secondary gradient circle */}
        <div 
          className={`absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl ${
            isDarkTheme 
              ? 'bg-gradient-to-tr from-indigo-900/30 via-pink-800/20 to-transparent' 
              : 'bg-gradient-to-tr from-indigo-500/20 via-pink-400/15 to-transparent'
          }`}
          style={{ 
            bottom: '15%', 
            left: '-10%',
          }}
        />
        
        {/* Small accent circles */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className={`absolute w-${20 + i * 8}px h-${20 + i * 8}px rounded-full animate-float ${
              isDarkTheme 
                ? 'bg-accent/10' 
                : 'bg-accent/5'
            }`}
            style={{ 
              top: `${15 + i * 15}%`, 
              left: `${5 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.3 - i * 0.03
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxBackground;
