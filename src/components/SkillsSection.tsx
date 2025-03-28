
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CodeIcon, Database, FileCode, Layers, PenTool, Server, LayoutGrid, Smartphone, Wand2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeToggleProvider';

// Define skill categories and levels
type SkillCategory = 'programming' | 'technical' | 'tools' | 'design' | 'testing' | 'backend';

interface SkillLevel {
  name: string;
  color: string;
  range: string;
}

interface Skill {
  name: string;
  proficiency: number;
  category: SkillCategory;
  description?: string;
  icon?: React.ReactNode;
}

const skillLevels: SkillLevel[] = [
  { name: 'Advanced', color: 'bg-emerald-500', range: '(80-100%)' },
  { name: 'Intermediate', color: 'bg-blue-500', range: '(60-79%)' },
  { name: 'Intermediate', color: 'bg-amber-500', range: '(40-59%)' },
  { name: 'Beginner', color: 'bg-rose-500', range: '(0-39%)' },
];

const skills: Skill[] = [
  // Programming Languages
  {
    name: "Python",
    proficiency: 75,
    category: "programming",
    icon: <FileCode className="h-5 w-5" />
  },
  {
    name: "C#",
    proficiency: 65,
    category: "programming",
    icon: <FileCode className="h-5 w-5" />
  },
  {
    name: "JavaScript",
    proficiency: 70,
    category: "programming",
    icon: <CodeIcon className="h-5 w-5" />
  },
  {
    name: "AngularJS",
    proficiency: 60,
    category: "programming",
    icon: <Layers className="h-5 w-5" />
  },
  {
    name: "HTML",
    proficiency: 80,
    category: "programming",
    icon: <CodeIcon className="h-5 w-5" />
  },
  {
    name: "CSS",
    proficiency: 70,
    category: "programming",
    icon: <Wand2 className="h-5 w-5" />
  },

  // Technical Skills
  {
    name: "Test Plan Creation",
    proficiency: 65,
    category: "technical",
    icon: <FileCode className="h-5 w-5" />
  },
  {
    name: "Software Troubleshooting",
    proficiency: 70,
    category: "technical",
    icon: <LayoutGrid className="h-5 w-5" />
  },
  {
    name: "CAD",
    proficiency: 55,
    category: "technical",
    icon: <PenTool className="h-5 w-5" />
  },

  // Tools & Technologies
  {
    name: "Microsoft Azure",
    proficiency: 45,
    category: "tools",
    icon: <Server className="h-5 w-5" />
  },
  {
    name: "Git",
    proficiency: 60,
    category: "tools",
    icon: <FileCode className="h-5 w-5" />
  },
  {
    name: "MySQL",
    proficiency: 55,
    category: "tools",
    icon: <Database className="h-5 w-5" />
  },

  // Testing
  {
    name: "Manual Testing",
    proficiency: 75,
    category: "testing",
    icon: <LayoutGrid className="h-5 w-5" />
  },
  {
    name: "Mobile Testing",
    proficiency: 60,
    category: "testing",
    icon: <Smartphone className="h-5 w-5" />
  },

  // Design
  {
    name: "UI/UX Basics",
    proficiency: 50,
    category: "design",
    icon: <Wand2 className="h-5 w-5" />
  }
];

// Group skills by category
const groupedSkills = {
  programming: skills.filter(skill => skill.category === 'programming'),
  technical: skills.filter(skill => skill.category === 'technical'),
  tools: skills.filter(skill => skill.category === 'tools'),
  testing: skills.filter(skill => skill.category === 'testing'),
  design: skills.filter(skill => skill.category === 'design'),
};

// Get skill color based on proficiency
const getSkillColor = (proficiency: number): string => {
  if (proficiency >= 80) return 'bg-emerald-500';
  if (proficiency >= 60) return 'bg-blue-500';
  if (proficiency >= 40) return 'bg-amber-500';
  return 'bg-rose-500';
};

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('programming');
  const { isDarkTheme } = useTheme();
  
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

  // Animation variants
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
    show: { opacity: 1, y: 0 }
  };

  const categoryNames = {
    programming: 'Programming Languages',
    technical: 'Technical Skills',
    tools: 'Tools & Technologies',
    testing: 'Testing',
    design: 'Design'
  };

  const categoryIcons = {
    programming: <CodeIcon className="h-6 w-6" />,
    technical: <LayoutGrid className="h-6 w-6" />,
    tools: <Server className="h-6 w-6" />,
    testing: <Layers className="h-6 w-6" />,
    design: <PenTool className="h-6 w-6" />
  };

  // Get the count of skills in each category
  const getCategorySkillCount = (category: keyof typeof groupedSkills) => {
    return groupedSkills[category].length;
  };

  return (
    <section 
      id="skills" 
      className={`py-20 relative ${isDarkTheme ? 'bg-slate-900 nightmare-vignette nightmare-grain' : 'bg-slate-100'} text-${isDarkTheme ? 'white' : 'slate-800'} overflow-hidden`}
    >
      {/* Background pattern */}
      <div 
        className={`absolute inset-0 ${isDarkTheme ? 'opacity-5' : 'opacity-10'} pointer-events-none`}
        style={{
          backgroundImage: isDarkTheme 
            ? "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            : "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      
      {/* Little Nightmares inspired elements for dark mode */}
      {isDarkTheme && (
        <>
          <div className="absolute top-10 left-1/4 w-4 h-4 bg-yellow-400/30 rounded-full animate-pulse blur-md"></div>
          <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-yellow-400/20 rounded-full animate-pulse blur-sm"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-400/10 rounded-full animate-pulse blur-sm"></div>
          <motion.div 
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-900/5 rounded-full filter blur-3xl"
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </>
      )}
      
      {/* Main content container */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className={`mb-4 px-3 py-1 text-sm ${isDarkTheme ? 'bg-yellow-800/80 text-yellow-200 border-yellow-700/50' : 'bg-indigo-600 text-white'}`} variant="default">Expertise</Badge>
          <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${isDarkTheme ? 'text-yellow-100 nightmare-text-glow' : 'text-slate-800'}`}>Technical Skills</h2>
          <p className={`${isDarkTheme ? 'text-yellow-200/70' : 'text-slate-600'} max-w-2xl mx-auto`}>
            My technical toolkit representing my proficiency across various technologies as a fresh graduate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Skills Categories - Left Side */}
          <div className="space-y-4">
            {Object.entries(categoryNames).map(([key, name]) => (
              <motion.div 
                key={key} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 border-0 ${
                    activeCategory === key 
                      ? isDarkTheme 
                        ? 'bg-yellow-900/30 shadow-lg shadow-black/30 border border-yellow-800/30' 
                        : 'bg-indigo-600/80 shadow-lg shadow-indigo-500/20' 
                      : isDarkTheme
                        ? 'bg-slate-800/70 hover:bg-slate-800/90 border border-slate-700/50'
                        : 'bg-white/80 hover:bg-white shadow-sm'
                  }`}
                  onClick={() => setActiveCategory(key)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          activeCategory === key 
                            ? isDarkTheme 
                              ? 'bg-yellow-900/50' 
                              : 'bg-white/10' 
                            : isDarkTheme 
                              ? 'bg-slate-700/50' 
                              : 'bg-slate-100'
                        }`}>
                          {categoryIcons[key as keyof typeof categoryIcons]}
                        </div>
                        <div className="flex flex-col items-start">
                          <h3 className={`font-medium ${
                            activeCategory === key 
                              ? 'text-white' 
                              : isDarkTheme 
                                ? 'text-yellow-100' 
                                : 'text-slate-800'
                          }`}>{name}</h3>
                          <span className={`text-xs ${isDarkTheme ? 'text-yellow-200/50' : 'text-slate-500'}`}>{getCategorySkillCount(key as keyof typeof groupedSkills)} skills</span>
                        </div>
                      </div>
                      <ChevronRight className={`h-5 w-5 transition-transform ${
                        activeCategory === key 
                          ? 'rotate-90 text-white' 
                          : isDarkTheme 
                            ? 'text-yellow-200/50' 
                            : 'text-slate-400'
                      }`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Skill Levels Legend */}
            <motion.div 
              className={`mt-8 ${isDarkTheme ? 'nightmare-panel' : 'bg-white/80'} rounded-lg p-5 shadow-sm`}
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className={`text-lg font-medium mb-4 ${isDarkTheme ? 'text-yellow-100 flex items-center gap-2' : 'text-slate-800'}`}>
                {isDarkTheme && <Eye className="h-4 w-4" />} Skill Levels
              </h3>
              <div className="space-y-3">
                {skillLevels.map((level, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${level.color}`}></div>
                    <span className={`text-sm ${isDarkTheme ? 'text-yellow-100/80' : 'text-slate-700'}`}>{level.name} <span className={`text-xs ${isDarkTheme ? 'text-yellow-200/50' : 'text-slate-500'}`}>{level.range}</span></span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Skills Details - Right Side */}
          <div className="lg:col-span-3">
            <motion.div 
              className={`${isDarkTheme ? 'nightmare-panel' : 'bg-white/80 border-slate-200'} rounded-xl p-6 shadow-xl border`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className={`text-xl font-bold mb-6 ${isDarkTheme ? 'text-yellow-100 nightmare-text-glow' : 'text-slate-800'}`}>
                {categoryNames[activeCategory as keyof typeof categoryNames]}
              </h3>

              <motion.div 
                variants={container}
                initial="hidden"
                animate={isVisible ? "show" : "hidden"}
                className="space-y-6"
              >
                {groupedSkills[activeCategory as keyof typeof groupedSkills].map((skill, index) => (
                  <motion.div 
                    key={skill.name} 
                    variants={item}
                    className="group"
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 rounded ${isDarkTheme ? 'bg-slate-700/80' : 'bg-slate-100'} flex items-center justify-center ${isDarkTheme ? 'text-yellow-400' : 'text-blue-400'}`}>
                          {skill.icon}
                        </div>
                        <h4 className={`font-medium ${isDarkTheme ? 'text-yellow-100 group-hover:text-yellow-300' : 'text-slate-800 group-hover:text-blue-400'} transition-colors`}>
                          {skill.name}
                        </h4>
                      </div>
                      <span className={`font-mono text-sm font-bold ${isDarkTheme ? 'text-yellow-400' : 'text-blue-400'}`}>{skill.proficiency}%</span>
                    </div>
                    <div className="relative h-2">
                      <Progress 
                        value={skill.proficiency} 
                        className={`h-2 ${isDarkTheme ? 'bg-slate-700/80' : 'bg-slate-100/80'}`}
                        indicatorColor={isDarkTheme ? 'bg-yellow-600' : getSkillColor(skill.proficiency)}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Additional Skill Categories */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {[
                { icon: <FileCode className="h-6 w-6" />, title: "Electronics", description: "Circuit design, microcontrollers, IoT" },
                { icon: <Database className="h-6 w-6" />, title: "Backend", description: "Node.js, APIs, databases" },
                { icon: <Layers className="h-6 w-6" />, title: "Testing", description: "Test plans, QA processes" },
                { icon: <FileCode className="h-6 w-6" />, title: "Documentation", description: "Technical writing, SOP creation" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`${
                    isDarkTheme 
                      ? 'nightmare-panel hover:border-yellow-700/50 hover:bg-yellow-900/10' 
                      : 'bg-white/80 border-slate-200/50 hover:border-indigo-300/50 hover:bg-indigo-50/30'
                  } rounded-xl p-4 transition-all duration-300 border`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div className={`h-10 w-10 rounded-lg ${
                    isDarkTheme ? 'bg-slate-800/80' : 'bg-slate-100'
                  } flex items-center justify-center ${
                    isDarkTheme ? 'text-yellow-500' : 'text-indigo-400'
                  } mb-3`}>
                    {item.icon}
                  </div>
                  <h3 className={`font-medium ${isDarkTheme ? 'text-yellow-100' : 'text-slate-800'} mb-1`}>{item.title}</h3>
                  <p className={`text-xs ${isDarkTheme ? 'text-yellow-200/50' : 'text-slate-500'}`}>{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
