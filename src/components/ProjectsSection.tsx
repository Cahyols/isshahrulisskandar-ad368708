
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Globe, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectDialog from './ProjectDialog';
import FusionsyncContent from './project-details/FusionsyncContent';
import IoTWaterContent from './project-details/IoTWaterContent';

interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: "fusionsync",
    title: "Fusionsync: Bridging System For Seamless Data Synchronization And Template Integration",
    description: "Final year project focused on developing a system for seamless data synchronization between different platforms and template integration, enhancing workflow efficiency and data consistency.",
    year: "2024",
    tags: ["Data Synchronization", "API Integration", "Template System"],
    icon: <Database className="h-5 w-5" />
  },
  {
    id: "iot-water",
    title: "Integrated IoT Water Management and Nutrient Delivery System for Cattle Feeding",
    description: "Designed and implemented an IoT-based system for monitoring and managing water resources and nutrient delivery for livestock, improving efficiency and reducing waste.",
    year: "2024",
    tags: ["IoT", "Water Management", "Embedded Systems"],
    icon: <Globe className="h-5 w-5" />
  }
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

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

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const getProjectContent = (projectId: string) => {
    switch (projectId) {
      case 'fusionsync':
        return <FusionsyncContent />;
      case 'iot-water':
        return <IoTWaterContent />;
      default:
        return <div>Project details not available</div>;
    }
  };

  const handleLearnMore = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  const selectedProjectData = selectedProject 
    ? { 
        id: selectedProject,
        title: projects.find(p => p.id === selectedProject)?.title || "",
        content: getProjectContent(selectedProject)
      }
    : null;

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">Portfolio</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Notable Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Showcasing my technical capabilities through innovative projects that solve real-world problems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full group-hover:shadow-lg transition-all duration-300 overflow-hidden border border-border hover:border-accent">
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-20 translate-x-20 group-hover:bg-accent/10 transition-all duration-500"></div>
                
                <CardHeader className="pb-2 relative">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                      {project.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.year}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 group-hover:text-accent transition-all">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-muted-foreground relative">
                  <p>{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="skill-pill"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4 relative">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => handleLearnMore(project.id)}
                  >
                    <ExternalLink size={16} />
                    <span>Learn More</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-panel rounded-xl p-8 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-semibold mb-4">Interested in Collaborating?</h3>
          <p className="text-muted-foreground mb-6">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Button size="lg" asChild>
            <a href="#contact">
              Let's Connect <ExternalLink className="ml-2" size={16} />
            </a>
          </Button>
        </motion.div>
      </div>

      {selectedProjectData && (
        <ProjectDialog 
          isOpen={!!selectedProject}
          onClose={handleCloseDialog}
          project={selectedProjectData}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
