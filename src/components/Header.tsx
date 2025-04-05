
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
  children?: React.ReactNode;
}

const Header = ({ toggleTheme, isDarkTheme, children }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = () => {
    // Copy email to clipboard
    navigator.clipboard.writeText('isshahrulisskandar@gmail.com');
    toast({
      title: "Email copied to clipboard",
      description: "isshahrulisskandar@gmail.com",
    });
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 backdrop-blur-md bg-background/80 shadow-md' 
          : 'py-4 bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#home" 
          className="text-xl font-bold animated-gradient-text"
          aria-label="Go to homepage"
        >
          Isshahrul Isskandar
        </a>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex space-x-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-accent"
                aria-current={link.href === '#home' ? 'page' : undefined}
              >
                {link.name}
              </a>
            ))}
            <Button 
              variant="ghost"
              size="icon"
              onClick={toggleTheme} 
              className="ml-2"
              aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            {children}
            <Button 
              variant="outline" 
              className="ml-2"
              onClick={handleContactClick}
            >
              Contact Me
            </Button>
          </nav>
        )}
        
        {/* Mobile Menu Button */}
        {isMobile && (
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost"
              size="icon"
              onClick={toggleTheme} 
              aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            {children}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMobile && (
        <div 
          id="mobile-menu"
          className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-md transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } pt-20`}
          aria-hidden={!isMenuOpen}
        >
          <nav className="flex flex-col items-center space-y-6 p-8" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xl font-medium hover:text-accent transition-colors"
                onClick={toggleMenu}
                aria-current={link.href === '#home' ? 'page' : undefined}
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="mt-6 w-full"
              onClick={() => {
                handleContactClick();
                toggleMenu();
              }}
            >
              Contact Me
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
