
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Code, Server, Cpu, Briefcase, Phone, Mail, MapPin } from 'lucide-react';

const AboutSection = () => {
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

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">About Me</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Professional Summary</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel rounded-2xl p-6 lg:col-span-2"
          >
            <p className="text-lg leading-relaxed mb-6">
              Fresh graduate with a Bachelor's degree in Electronic Engineering from Universiti Tun Hussein Onn (UTHM), specializing in software development and quality assurance. Experienced in software testing, front-end and back-end development using Node.js and Angular, and establishing best practices for software reliability during an internship at Petronas Digital.
            </p>
            <p className="text-lg leading-relaxed">
              Skilled in C programming, JavaScript, manual testing, data management, hardware troubleshooting, and AutoCAD. Certified from online courses, with hands-on experience in IoT projects and data synchronization systems. Eager to contribute to dynamic IT or engineering environments, focusing on innovation, technical excellence, and customer satisfaction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-3">
                <motion.li 
                  custom={0}
                  variants={iconVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  className="flex items-center gap-2"
                >
                  <Phone size={18} className="text-accent" />
                  <span>0182663482</span>
                </motion.li>
                <motion.li 
                  custom={1}
                  variants={iconVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  className="flex items-center gap-2"
                >
                  <Mail size={18} className="text-accent" />
                  <span>isshahrulisskandar@gmail.com</span>
                </motion.li>
                <motion.li 
                  custom={2}
                  variants={iconVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  className="flex items-center gap-2"
                >
                  <MapPin size={18} className="text-accent" />
                  <span>Petaling Jaya, Selangor</span>
                </motion.li>
              </ul>
            </div>

            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Specializations</h3>
              <div className="space-y-3">
                <motion.div 
                  custom={3}
                  variants={iconVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  className="flex items-center gap-2"
                >
                  <Code size={18} className="text-accent" />
                  <span>Software Development</span>
                </motion.div>
                <motion.div 
                  custom={4}
                  variants={iconVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  className="flex items-center gap-2"
                >
                  <Server size={18} className="text-accent" />
                  <span>Quality Assurance</span>
                </motion.div>
                <motion.div 
                  custom={5}
                  variants={iconVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  className="flex items-center gap-2"
                >
                  <Cpu size={18} className="text-accent" />
                  <span>IoT & Electronics</span>
                </motion.div>
                <motion.div 
                  custom={6}
                  variants={iconVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  className="flex items-center gap-2"
                >
                  <Briefcase size={18} className="text-accent" />
                  <span>Technical Support</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
