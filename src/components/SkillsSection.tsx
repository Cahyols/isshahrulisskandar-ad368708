import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronsUpDown, Code, Database, Figma, FileCode, Laptop, Layers, PenTool, Server, Settings, Smartphone, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Skill {
  name: string;
  proficiency: number;
  category: SkillCategory;
  description: string;
  icon: React.ReactNode;
}

type SkillCategory = 'frontend' | 'backend' | 'design' | 'testing' | 'tools';

const skills: Skill[] = [
  {
    name: "Python",
    proficiency: 85,
    category: "backend",
    description: "Proficient in Python development including data processing, automation, and web applications.",
    icon: <FileCode className="h-5 w-5" />
  },
  {
    name: "C#",
    proficiency: 75,
    category: "backend",
    description: "Experienced with C# for application development and scripting.",
    icon: <FileCode className="h-5 w-5" />
  },
  {
    name: "JavaScript",
    proficiency: 90,
    category: "frontend",
    description: "Advanced JavaScript knowledge for dynamic web applications and UI interactions.",
    icon: <Code className="h-5 w-5" />
  },
  {
    name: "AngularJS",
    proficiency: 80,
    category: "frontend",
    description: "Built scalable and maintainable frontend applications using Angular framework.",
    icon: <Layers className="h-5 w-5" />
  },
  {
    name: "HTML",
    proficiency: 95,
    category: "frontend",
    description: "Expert level HTML markup for semantic and accessible web development.",
    icon: <Code className="h-5 w-5" />
  },
  {
    name: "CSS",
    proficiency: 85,
    category: "frontend",
    description: "Advanced styling capabilities including responsive design, animations, and layouts.",
    icon: <Wand2 className="h-5 w-5" />
  },
  {
    name: "Test Plan Creation",
    proficiency: 90,
    category: "testing",
    description: "Created comprehensive test plans for complex software systems ensuring quality and reliability.",
    icon: <FileCode className="h-5 w-5" />
  },
  {
    name: "Manual Testing",
    proficiency: 95,
    category: "testing",
    description: "Performed detailed manual testing to identify bugs and usability issues in software systems.",
    icon: <Laptop className="h-5 w-5" />
  },
  {
    name: "Microsoft Azure",
    proficiency: 70,
    category: "tools",
    description: "Deployed and managed cloud solutions using Microsoft Azure services.",
    icon: <Server className="h-5 w-5" />
  },
  {
    name: "Git",
    proficiency: 85,
    category: "tools",
    description: "Proficient with Git version control for collaborative software development.",
    icon: <FileCode className="h-5 w-5" />
  },
  {
    name: "MySQL",
    proficiency: 80,
    category: "backend",
    description: "Designed and managed relational databases using MySQL.",
    icon: <Database className="h-5 w-5" />
  },
  {
    name: "Software Troubleshooting",
    proficiency: 90,
    category: "tools",
    description: "Diagnosed and resolved complex software issues across multiple platforms.",
    icon: <Settings className="h-5 w-5" />
  },
  {
    name: "UI/UX Basics",
    proficiency: 75,
    category: "design",
    description: "Created user-friendly interfaces with focus on usability and accessibility.",
    icon: <Figma className="h-5 w-5" />
  },
  {
    name: "Mobile Testing",
    proficiency: 85,
    category: "testing",
    description: "Conducted testing across various mobile devices to ensure cross-platform compatibility.",
    icon: <Smartphone className="h-5 w-5" />
  },
  {
    name: "CAD",
    proficiency: 90,
    category: "design",
    description: "Expert in computer-aided design for electrical engineering applications.",
    icon: <PenTool className="h-5 w-5" />
  }
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  const getFilteredSkills = () => {
    if (activeTab === "all") return skills;
    return skills.filter(skill => skill.category === activeTab);
  };
  
  const displayedSkills = showAllSkills ? getFilteredSkills() : getFilteredSkills().slice(0, 9);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">Expertise</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            A comprehensive showcase of my technical capabilities, developed through academic projects, professional experience, and continuous learning.
          </p>
        </motion.div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full max-w-3xl">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <motion.div
              variants={container}
              initial="hidden"
              animate={isVisible ? "show" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayedSkills.map((skill) => (
                <motion.div key={skill.name} variants={item}>
                  <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-background to-muted shadow-lg border border-border hover:border-accent/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="p-5 relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                          {skill.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{skill.name}</h3>
                          <Badge variant="outline" className="capitalize text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {skill.description}
                      </p>
                      
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Proficiency</span>
                          <span className="font-medium">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {getFilteredSkills().length > 9 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex justify-center mt-8"
              >
                <Button
                  variant="outline"
                  onClick={() => setShowAllSkills(!showAllSkills)}
                  className="gap-2"
                >
                  <span>{showAllSkills ? "Show Less" : "Show More"}</span>
                  <ChevronsUpDown className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Collapsible
            open={isCollapsible}
            onOpenChange={setIsCollapsible}
            className="w-full max-w-3xl mx-auto border border-border rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Continuous Learning</h3>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-4 space-y-4">
              <p className="text-muted-foreground">
                My technical expertise is constantly evolving. I believe in continuous learning and regularly engage in online courses, workshops, and technical communities to stay updated with the latest industry trends and technologies.
              </p>
              <div className="bg-secondary/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Recent Learning Focus</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Advanced React patterns and state management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Cloud architecture and serverless computing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2">•</span>
                    <span>Automated testing frameworks and CI/CD pipelines</span>
                  </li>
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
