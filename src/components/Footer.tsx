
import { Code, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold animated-gradient-text">
              Isshahrul Isskandar
            </div>
            <p className="text-muted-foreground mt-2 max-w-md">
              Electronic Engineer specializing in software development and quality assurance.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a
              href="#"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:isshahrulisskandar@gmail.com"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Ahmad Isshahrul Isskandar. All rights reserved.
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="flex items-center">
              <Code className="h-4 w-4 mr-1" />
              Designed & Built with precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
