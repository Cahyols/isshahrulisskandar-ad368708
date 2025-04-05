
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.ceil((scrolled / totalHeight) * 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1">
      <Progress 
        value={scrollProgress} 
        className="h-1 rounded-none"
        indicatorColor="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" 
      />
    </div>
  );
};

export default ScrollProgressBar;
