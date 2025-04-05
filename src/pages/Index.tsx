
import { useEffect, useState } from 'react';
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
import CursorEffects from '@/components/CursorEffects';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import ParallaxBackground from '@/components/ParallaxBackground';
import LoadingSkeletons from '@/components/LoadingSkeletons';
import { useA11y } from '@/hooks/use-a11y';

const Index = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  
  // Use a11y hook for accessibility improvements
  useA11y();
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
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
      {/* Custom cursor and effects */}
      <CursorEffects />
      
      {/* Scroll progress indicator */}
      <ScrollProgressBar />
      
      {/* Parallax background */}
      <ParallaxBackground />
      
      {/* Theme customizer */}
      <ThemeCustomizer />
      
      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme}>
        <LanguageSwitcher className="ml-2" />
      </Header>
      
      <main id="main" tabIndex={-1}>
        <HeroSection />
        
        <LoadingSkeletons isLoading={isLoading} type="default">
          <AboutSection />
        </LoadingSkeletons>
        
        <LoadingSkeletons isLoading={isLoading} type="experience">
          <ExperienceSection />
        </LoadingSkeletons>
        
        <LoadingSkeletons isLoading={isLoading} type="skill">
          <SkillsSection />
        </LoadingSkeletons>
        
        <LoadingSkeletons isLoading={isLoading} type="education">
          <EducationSection />
        </LoadingSkeletons>
        
        <LoadingSkeletons isLoading={isLoading} type="project">
          <ProjectsSection />
        </LoadingSkeletons>
        
        <LoadingSkeletons isLoading={isLoading} type="default">
          <ContactSection />
        </LoadingSkeletons>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
