
import { useState, useEffect } from 'react';
import { ArrowDown, Code, ChevronRight, Cpu, Database, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      <div
        className="absolute top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse-glow"
        style={{ animationDelay: '1s' }}
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block rounded-full px-3 py-1 text-sm font-medium bg-accent/10 text-accent mb-4">
                Electronic Engineer & Software Developer
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                <TypeAnimation
                  sequence={[
                    'Ahmad Isshahrul',
                    1000,
                    'Ahmad Isshahrul Isskandar',
                    2000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent" 
                />
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                Fresh graduate specializing in software development with experience in testing, frontend and backend development.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Button size="lg" className="group" asChild>
                <a href="#experience">
                  View Experience <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#projects">
                  My Projects <Code className="ml-2" size={18} />
                </a>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-8"
            >
              <p className="text-muted-foreground text-sm mb-4">Core Technical Specialties</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Cpu size={16} className="text-accent" /> Electronic Engineering
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Code size={16} className="text-accent" /> Software Development
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Database size={16} className="text-accent" /> Test Engineering
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Workflow size={16} className="text-accent" /> IoT Projects
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-[400px] hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden glass-panel">
              <div className="absolute w-full h-full bg-grid-pattern opacity-10"></div>
              
              <div className="p-6 h-full flex flex-col justify-between">
                <Card className="w-full mb-4 hover-lift">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <div className="font-mono text-sm opacity-70">Software Engineer</div>
                    </div>
                    <div className="h-2 w-3/4 bg-primary/20 rounded-full"></div>
                    <div className="h-2 w-1/2 bg-accent/20 rounded-full mt-2"></div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/50 p-4 rounded-xl hover-lift">
                    <div className="font-bold">Projects</div>
                    <div className="text-3xl font-bold text-accent">3+</div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl hover-lift">
                    <div className="font-bold">Experience</div>
                    <div className="text-3xl font-bold text-primary">2+ yrs</div>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {['JS', 'C#', 'Python', 'Angular'].map((skill, i) => (
                    <div 
                      key={skill} 
                      className="text-center p-2 rounded-lg bg-background/30 text-sm font-medium hover-lift"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" aria-label="Scroll down">
            <ArrowDown className="text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
