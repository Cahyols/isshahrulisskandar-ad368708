
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Server, Code, Cpu, PencilRuler, Database, Terminal, FileText } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: 'programming' | 'technical' | 'tools';
}

const skills: Skill[] = [
  { name: 'Python', level: 80, category: 'programming' },
  { name: 'C#', level: 75, category: 'programming' },
  { name: 'JavaScript', level: 85, category: 'programming' },
  { name: 'AngularJS', level: 80, category: 'programming' },
  { name: 'HTML', level: 90, category: 'programming' },
  { name: 'CSS', level: 75, category: 'programming' },
  { name: 'Test Plan Creation', level: 85, category: 'technical' },
  { name: 'Manual Testing', level: 90, category: 'technical' },
  { name: 'Microsoft Azure', level: 70, category: 'tools' },
  { name: 'Git', level: 75, category: 'tools' },
  { name: 'MySQL', level: 80, category: 'tools' },
  { name: 'Software Troubleshooting', level: 85, category: 'technical' },
];

const skillCategories = [
  { 
    id: 'programming', 
    name: 'Programming Languages', 
    icon: <Code className="h-8 w-8" /> 
  },
  { 
    id: 'technical', 
    name: 'Technical Skills', 
    icon: <Brain className="h-8 w-8" /> 
  },
  { 
    id: 'tools', 
    name: 'Tools & Technologies', 
    icon: <Terminal className="h-8 w-8" /> 
  },
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('programming');
  const filteredSkills = skills.filter(skill => skill.category === selectedCategory);

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
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
            My technical toolkit representing my proficiency across various technologies and methodologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            className="space-y-4 md:col-span-1"
          >
            {skillCategories.map(category => (
              <div 
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all hover-lift
                  ${selectedCategory === category.id 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-secondary hover:bg-secondary/80'}`}
              >
                <div className={`${selectedCategory === category.id ? 'text-white' : 'text-accent'}`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm opacity-80">
                    {skills.filter(s => s.category === category.id).length} skills
                  </p>
                </div>
              </div>
            ))}

            <div className="hidden md:block mt-8 p-6 rounded-xl glass-panel">
              <h3 className="text-xl font-semibold mb-4">Skill Levels</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Expert (90-100%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <span>Advanced (75-89%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span>Intermediate (60-74%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Beginner (0-59%)</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerContainer}
            className="md:col-span-3"
          >
            <div className="bg-secondary/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6">
                {skillCategories.find(cat => cat.id === selectedCategory)?.name}
              </h3>

              <div className="space-y-6">
                {filteredSkills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    variants={fadeInUp}
                    custom={index}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                      style={{
                        background: 'var(--muted)',
                      }}
                      indicatorStyle={{
                        background: getColorByLevel(skill.level),
                        transition: 'width 1s ease-in-out',
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <SkillCard
                icon={<Cpu className="h-5 w-5" />}
                title="Electronics"
                description="Circuit design, microcontrollers, IoT"
              />
              <SkillCard
                icon={<Server className="h-5 w-5" />}
                title="Backend"
                description="Node.js, APIs, databases"
              />
              <SkillCard
                icon={<Database className="h-5 w-5" />}
                title="Testing"
                description="Test plans, QA processes"
              />
              <SkillCard
                icon={<FileText className="h-5 w-5" />}
                title="Documentation"
                description="Technical writing, SOP creation"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => (
  <div className="p-4 rounded-xl bg-card hover-lift border">
    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-3">
      {icon}
    </div>
    <h3 className="font-medium mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

function getColorByLevel(level: number): string {
  if (level >= 90) return 'var(--green-500, #22c55e)';
  if (level >= 75) return 'var(--accent)';
  if (level >= 60) return 'var(--amber-500, #f59e0b)';
  return 'var(--red-500, #ef4444)';
}

export default SkillsSection;
