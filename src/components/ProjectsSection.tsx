
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Globe, Database, ArrowLeft, ArrowRight, X, Image as ImageIcon, Smartphone, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectDialog from './ProjectDialog';
import FusionsyncContent from './project-details/FusionsyncContent';
import IoTWaterContent from './project-details/IoTWaterContent';
import SmartGroceryContent from './project-details/SmartGroceryContent';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

type ProjectType = 'self' | 'university' | 'all';

interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  icon: React.ReactNode;
  projectType: ProjectType;
  images?: string[]; // Array of image URLs for the gallery
}

// Sample gallery images - in a real application, these would come from your assets or a database
const projectGalleryImages = {
  fusionsync: [
    'https://i.imgur.com/1ZcRyrc.png',
    'https://i.imgur.com/CQFmJ6V.png',
    'https://i.imgur.com/Dc90Wz7.png'
  ],
  'iot-water': [
    'https://i.imgur.com/rGWw7jk.png',
    'https://i.imgur.com/XtDVGiX.png',
    'https://i.imgur.com/t8zreIw.png'
  ],
  'smart-grocery': [
    'https://i.imgur.com/q3SFBfZ.png', 
    'https://i.imgur.com/2NvgxAd.png',
    'https://i.imgur.com/8iMLpF7.png'
  ]
};

const projects: Project[] = [
  {
    id: "smart-grocery",
    title: "Smart Grocery & Meal Planner",
    description: "A mobile app that helps users manage fridge inventory, plan meals, and generate grocery lists based on available ingredients with price comparison across Malaysian supermarkets.",
    year: "2025",
    tags: ["Mobile App", "Meal Planning", "Inventory Management"],
    icon: <Smartphone className="h-5 w-5" />,
    projectType: 'self',
    images: projectGalleryImages["smart-grocery"]
  },
  {
    id: "fusionsync",
    title: "Fusionsync: Bridging System For Seamless Data Synchronization And Template Integration",
    description: "Final year project focused on developing a system for seamless data synchronization between different platforms and template integration, enhancing workflow efficiency and data consistency.",
    year: "2024",
    tags: ["Data Synchronization", "API Integration", "Template System"],
    icon: <Database className="h-5 w-5" />,
    projectType: 'university',
    images: projectGalleryImages.fusionsync
  },
  {
    id: "iot-water",
    title: "Integrated IoT Water Management and Nutrient Delivery System for Cattle Feeding",
    description: "Designed and implemented an IoT-based system for monitoring and managing water resources and nutrient delivery for livestock, improving efficiency and reducing waste.",
    year: "2024",
    tags: ["IoT", "Water Management", "Embedded Systems"],
    icon: <Globe className="h-5 w-5" />,
    projectType: 'university',
    images: projectGalleryImages["iot-water"]
  }
];

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedProjectForGallery, setSelectedProjectForGallery] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [projectTypeFilter, setProjectTypeFilter] = useState<ProjectType>('all');

  const filteredProjects = projectTypeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.projectType === projectTypeFilter);

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
      case 'smart-grocery':
        return <SmartGroceryContent />;
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

  const openGallery = (projectId: string) => {
    setSelectedProjectForGallery(projectId);
    setCurrentImageIndex(0);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setSelectedProjectForGallery(null);
  };

  const nextImage = () => {
    if (!selectedProjectForGallery) return;
    const project = projects.find(p => p.id === selectedProjectForGallery);
    if (!project?.images) return;
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === project.images!.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!selectedProjectForGallery) return;
    const project = projects.find(p => p.id === selectedProjectForGallery);
    if (!project?.images) return;
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? project.images!.length - 1 : prevIndex - 1
    );
  };

  const selectedProjectData = selectedProject 
    ? { 
        id: selectedProject,
        title: projects.find(p => p.id === selectedProject)?.title || "",
        content: getProjectContent(selectedProject)
      }
    : null;

  const galleryImages = selectedProjectForGallery 
    ? projects.find(p => p.id === selectedProjectForGallery)?.images || []
    : [];

  const getProjectTypeLabel = (type: ProjectType): string => {
    switch (type) {
      case 'self': return 'Self Project';
      case 'university': return 'University Project';
      case 'all': return 'All Projects';
      default: return 'Project';
    }
  };

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
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 mb-8">
            Showcasing my technical capabilities through innovative projects that solve real-world problems.
          </p>

          <div className="flex justify-center gap-3 mb-8">
            <Button 
              variant={projectTypeFilter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setProjectTypeFilter('all')}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" /> All Projects
            </Button>
            <Button 
              variant={projectTypeFilter === 'self' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setProjectTypeFilter('self')}
              className="flex items-center gap-2"
            >
              <Badge variant="self" className="h-2 w-2 p-0" /> Self Projects
            </Button>
            <Button 
              variant={projectTypeFilter === 'university' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setProjectTypeFilter('university')}
              className="flex items-center gap-2"
            >
              <Badge variant="university" className="h-2 w-2 p-0" /> University Projects
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative px-4 md:px-10"
        >
          <Carousel 
            opts={{
              align: "start",
              loop: filteredProjects.length > 2,
            }}
            className="w-full"
          >
            <CarouselContent>
              {filteredProjects.map((project, index) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/2 xl:basis-1/3">
                  <ScrollAnimationWrapper delay={index * 0.1} direction={index % 2 === 0 ? 'up' : 'down'}>
                    <motion.div variants={itemVariants} className="group h-full">
                      <Card className="h-full group-hover:shadow-lg transition-all duration-300 overflow-hidden border border-border hover:border-accent">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-20 translate-x-20 group-hover:bg-accent/10 transition-all duration-500"></div>
                        
                        <CardHeader className="pb-2 relative">
                          <div className="flex justify-between items-start">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                              {project.icon}
                            </div>
                            <div className="flex gap-2">
                              <Badge variant={project.projectType} className="text-xs">
                                {getProjectTypeLabel(project.projectType)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {project.year}
                              </Badge>
                            </div>
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
                          
                          {project.images && project.images.length > 0 && (
                            <div 
                              className="mt-4 flex items-center gap-2 cursor-pointer hover:text-accent transition-colors"
                              onClick={() => openGallery(project.id)}
                            >
                              <ImageIcon size={16} />
                              <span className="text-sm font-medium">View Gallery ({project.images.length} images)</span>
                            </div>
                          )}
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
                  </ScrollAnimationWrapper>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-2 mt-8">
              <CarouselPrevious className="relative static transform-none" />
              <CarouselNext className="relative static transform-none" />
            </div>
          </Carousel>
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

      {/* Project Dialog */}
      {selectedProjectData && (
        <ProjectDialog 
          isOpen={!!selectedProject}
          onClose={handleCloseDialog}
          project={selectedProjectData}
        />
      )}

      {/* Image Gallery Lightbox */}
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/90 border-border overflow-hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`Project gallery image ${currentImageIndex + 1}`}
                  className="max-h-[80vh] max-w-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute top-4 right-4 flex gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-white bg-black/50 hover:bg-black/70 rounded-full h-8 w-8"
                onClick={closeGallery}
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              <p className="text-white bg-black/50 px-3 py-1 rounded-md text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </p>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
              onClick={prevImage}
            >
              <ArrowLeft size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
              onClick={nextImage}
            >
              <ArrowRight size={20} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
