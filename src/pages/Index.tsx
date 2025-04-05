
import { useRef, useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ParallaxBackground from '@/components/ParallaxBackground';
import ScrollAnimationWrapper from '@/components/ScrollAnimationWrapper';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeToggleProvider';

const Index = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for lightning effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Advanced cursor and lightning effects
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const lightning = lightningRef.current;
    
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;
    
    const speed = 0.1; // Cursor movement speed
    const dotSpeed = 0.2; // Dot movement speed
    
    const animate = () => {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      cursorDotX += (mouseX - cursorDotX) * dotSpeed;
      cursorDotY += (mouseY - cursorDotY) * dotSpeed;
      
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      cursorDot.style.transform = `translate3d(${cursorDotX}px, ${cursorDotY}px, 0)`;
      
      // Update lightning position when in dark mode
      if (isDarkTheme && lightning) {
        lightning.style.left = `${mouseX}px`;
        lightning.style.top = `${mouseY}px`;
      }
      
      requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setMousePos({ x: e.clientX, y: e.clientY }); // Update mouse position state
    };
    
    const handleMouseDown = () => {
      cursor.classList.add('scale-150');
      cursorDot.classList.add('scale-0');
      
      // Extra flash effect on mouse down when in dark mode
      if (isDarkTheme && lightning) {
        lightning.classList.add('lightning-flash');
        setTimeout(() => {
          if (lightning) lightning.classList.remove('lightning-flash');
        }, 300);
      }
    };
    
    const handleMouseUp = () => {
      cursor.classList.remove('scale-150');
      cursorDot.classList.remove('scale-0');
    };
    
    const handleMouseEnterLink = (e: MouseEvent) => {
      cursor.classList.add('scale-150');
      cursorDot.classList.add('scale-0');
    };
    
    const handleMouseLeaveLink = (e: MouseEvent) => {
      cursor.classList.remove('scale-150');
      cursorDot.classList.remove('scale-0');
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add event listeners to all links, buttons, and interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnterLink);
      element.addEventListener('mouseleave', handleMouseLeaveLink);
    });
    
    // Check if not on mobile/tablet
    if (window.innerWidth > 768) {
      cursor.style.display = 'block';
      cursorDot.style.display = 'block';
      if (lightning) lightning.style.display = isDarkTheme ? 'block' : 'none';
      animate();
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnterLink);
        element.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, [isDarkTheme]);
  
  // Update lightning visibility when theme changes
  useEffect(() => {
    const lightning = lightningRef.current;
    if (lightning) {
      lightning.style.display = isDarkTheme && window.innerWidth > 768 ? 'block' : 'none';
    }
  }, [isDarkTheme]);

  // Smooth scroll functionality
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);
  
  return (
    <div className="relative overflow-x-hidden">
      {/* Parallax Background */}
      <ParallaxBackground />
      
      {/* Custom cursor (only visible on desktop) */}
      <div 
        ref={cursorRef} 
        className="fixed hidden w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-50 transition-transform duration-200 -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }}
      ></div>
      <div 
        ref={cursorDotRef} 
        className="fixed hidden w-2 h-2 bg-accent rounded-full pointer-events-none z-50 transition-transform duration-100 -translate-x-1/2 -translate-y-1/2"
      ></div>
      
      {/* Lightning cursor effect for dark mode */}
      <div 
        ref={lightningRef}
        className="fixed hidden pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(120,120,255,0.15) 0%, rgba(70,70,255,0.05) 40%, transparent 70%)',
          borderRadius: '50%',
          transition: 'opacity 0.3s ease',
        }}
      ></div>
      
      <style>
        {`
        .lightning-flash {
          background: radial-gradient(circle, rgba(150,150,255,0.3) 0%, rgba(100,100,255,0.1) 40%, transparent 70%) !important;
          opacity: 1 !important;
          animation: pulse 0.3s ease-out;
        }
        
        @keyframes pulse {
          0% { transform: scale(0.8) translate(-50%, -50%); opacity: 0.3; }
          50% { transform: scale(1.2) translate(-40%, -40%); opacity: 0.7; }
          100% { transform: scale(1) translate(-50%, -50%); opacity: 0.3; }
        }
        `}
      </style>
      
      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      
      <main>
        <HeroSection />
        <ScrollAnimationWrapper>
          <AboutSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <ExperienceSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <SkillsSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <EducationSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <ProjectsSection />
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <ContactSection />
        </ScrollAnimationWrapper>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
