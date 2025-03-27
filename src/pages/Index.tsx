
import { useRef, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { useTheme } from '@/components/ThemeToggleProvider';

const Index = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // Advanced cursor effect
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
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
      
      requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleMouseDown = () => {
      cursor.classList.add('scale-150');
      cursorDot.classList.add('scale-0');
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
  }, []);

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
      
      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
