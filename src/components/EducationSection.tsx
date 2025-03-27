
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Award, Sparkles } from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  icon: React.ReactNode;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  icon: React.ReactNode;
}

const educations: Education[] = [
  {
    id: "uthm",
    degree: "BACHELOR OF ELECTRONIC ENGINEERING",
    institution: "Universiti Tun Hussein Onn",
    location: "Batu Pahat, Johor",
    period: "Oct 2021 - Feb 2025",
    description: "Relevant coursework in electronic engineering and computer science.",
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    id: "pmm",
    degree: "DIPLOMA IN ELECTRICAL ENGINEERING",
    institution: "Politeknik Merlimau Melaka",
    location: "Merlimau, Melaka",
    period: "Dec 2017 - Jun 2020",
    description: "Graduate with Honors.",
    icon: <BookOpen className="h-5 w-5" />
  }
];

const certificates: Certificate[] = [
  {
    id: "meta1",
    name: "Django Web Framework",
    issuer: "Meta (Coursera)",
    year: "2024",
    icon: <Award className="h-5 w-5" />
  },
  {
    id: "meta2",
    name: "Introduction to Databases for Back-End Development",
    issuer: "Meta (Coursera)",
    year: "2024",
    icon: <Award className="h-5 w-5" />
  },
  {
    id: "meta3",
    name: "Introduction to Front-End Development",
    issuer: "Meta (Coursera)",
    year: "2024",
    icon: <Award className="h-5 w-5" />
  },
  {
    id: "meta4",
    name: "Programming in Python",
    issuer: "Meta (Coursera)",
    year: "2024",
    icon: <Award className="h-5 w-5" />
  },
  {
    id: "meta5",
    name: "Version Control",
    issuer: "Meta (Coursera)",
    year: "2024",
    icon: <Award className="h-5 w-5" />
  },
  {
    id: "cisco",
    name: "JavaScript Essentials 1",
    issuer: "Cisco",
    year: "2024",
    icon: <Award className="h-5 w-5" />
  }
];

const achievements = [
  {
    id: "scholarship",
    title: "Global Korea Scholarship",
    description: "Awarded a fully funded scholarship by the Korean government to pursue exchange studies.",
    year: "2024",
    icon: <Sparkles className="h-5 w-5" />
  }
];

const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.getElementById('education');
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

  return (
    <section id="education" className="py-20 relative bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">Academic Background</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Education & Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            My academic journey and professional certifications that have shaped my knowledge and expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="space-y-6 lg:col-span-2"
          >
            <h3 className="text-2xl font-semibold">Academic Education</h3>
            
            {educations.map((edu) => (
              <motion.div key={edu.id} variants={itemVariants}>
                <Card className="hover-lift transition-all hover:border-accent">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                        {edu.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {edu.period}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{edu.degree}</CardTitle>
                    <CardDescription>
                      {edu.institution} • {edu.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {edu.description}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            <h3 className="text-2xl font-semibold pt-4">Achievements</h3>
            
            {achievements.map((achievement) => (
              <motion.div key={achievement.id} variants={itemVariants}>
                <Card className="hover-lift transition-all hover:border-accent backdrop-blur-sm bg-background/50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                        {achievement.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {achievement.year}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {achievement.description}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Certifications</h3>
            
            <div className="bg-card rounded-xl p-6 border space-y-4">
              {certificates.map((cert, index) => (
                <motion.div 
                  key={cert.id} 
                  variants={itemVariants}
                  className={`flex gap-4 py-3 ${
                    index !== certificates.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                    {cert.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{cert.name}</h4>
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{cert.issuer}</span>
                      <span>{cert.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="glass-panel rounded-xl p-6 text-center">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
              <p className="text-muted-foreground">
                Committed to ongoing professional development through courses, certifications, and self-directed learning.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
