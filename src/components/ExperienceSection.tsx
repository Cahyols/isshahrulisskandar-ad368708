
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, PenTool, Coffee, Laptop, IceCream, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  icon: React.ReactNode;
  category: 'engineering' | 'service' | 'support';
  tag?: string;
}

const experiences: Experience[] = [
  {
    id: "emerson",
    title: "AutoCAD ENGINEER",
    company: "Emerson",
    location: "Petaling Jaya, Selangor",
    period: "Feb 2025 - Present",
    description: [
      "Created detailed electrical loop drawings using AutoCAD under the guidance of a Senior Drafter to ensure accurate documentation and minimize wiring errors.",
      "Developed and updated wiring diagrams by interpreting engineering specifications to improve system assembly and troubleshooting efficiency.",
      "Reviewed and revised electrical loop drawings to ensure compliance with industry standards, reducing potential field errors.",
      "Collaborated with the Senior Drafter to optimize design processes and enhance the clarity of electrical diagrams for stakeholders.",
      "Prepared final project documentation by consolidating drawings and revisions to ensure ease of future system maintenance.",
      "Assisted in resolving design issues during project execution to minimize delays through quick design adjustments.",
      "Managed drawing version control and organization to ensure easy access to updated diagrams and enhance project traceability."
    ],
    icon: <PenTool className="h-5 w-5" />,
    category: 'engineering',
    tag: 'Freelance'
  },
  {
    id: "starbucks",
    title: "PART TIME BARISTA",
    company: "Starbucks",
    location: "Petaling Jaya, Selangor",
    period: "Dec 2021 - Present",
    description: [
      "Educated customers on coffee brewing and products through personalized service, leading to increased upselling success and customer loyalty.",
      "Managed inventory by monitoring and restocking supplies, ensuring product availability and smooth operations.",
      "Delivered exceptional service by promptly addressing customer needs and managing orders, enhancing customer satisfaction.",
      "Demonstrated time management by completing all daily tasks efficiently, contributing to overall operational success."
    ],
    icon: <Coffee className="h-5 w-5" />,
    category: 'service'
  },
  {
    id: "petronas",
    title: "SOFTWARE ENGINEER & TESTING",
    company: "Petronas Digital",
    location: "Wilayah Persekutuan, Kuala Lumpur",
    period: "July 2023 - April 2024",
    description: [
      "Created detailed test plans and cases for user acceptance testing by collaborating with coworker and business analyst, ensuring software met customer requirements and improved reliability.",
      "Documented best practices and streamlined procedures for software testing, leading to greater accuracy and defect reduction.",
      "Developed backend services using Node.js and built frontend interfaces with Angular, accelerating production deployment.",
      "Supported the development and testing of new software applications by coordinating with cross-functional teams, ensuring a smooth transition to production."
    ],
    icon: <Laptop className="h-5 w-5" />,
    category: 'engineering'
  },
  {
    id: "snowflakes",
    title: "PART TIME DESSERT CREW",
    company: "Snowflakes Sunway Pyramid",
    location: "Petaling Jaya, Selangor",
    period: "Jan 2019 - Dec 2021",
    description: [
      "Prepared and served desserts by following SOPs, ensuring consistent quality and timely service.",
      "Assisted in training new team members by demonstrating best practices, promoting efficiency and teamwork.",
      "Boosted sales by applying upselling techniques and engaging with customers, leading to higher revenue.",
      "Maintained dining area cleanliness by adhering to 70-second rules, ensuring a positive dining experience.",
      "Supported the team leader by creating work schedules, optimizing staff coordination and coverage."
    ],
    icon: <IceCream className="h-5 w-5" />,
    category: 'service'
  },
  {
    id: "serveconnect",
    title: "IT TECHNICIAN SUPPORT",
    company: "Serveconnect",
    location: "Cheras, Kuala Lumpur",
    period: "April 2021 - Oct 2021",
    description: [
      "Assembled PCs from scratch, partitioned storage based on standards, and updated BIOS configurations to enhance system performance and readiness.",
      "Installed the latest drivers and loaded specified software packages, ensuring all systems met operational requirements.",
      "Conducted quality control tests by running diagnostics and resolving hardware or software issues, ensuring proper functionality.",
      "Provided hands-on user training on equipment and software usage, increasing user confidence and reducing IT support needs.",
      "Maintained servers, firewalls, and CCTV systems through routine monitoring, ensuring system stability and data security.",
      "Troubleshot and resolved user-reported IT issues quickly, minimizing system downtimes and improving overall user satisfaction."
    ],
    icon: <Laptop className="h-5 w-5" />,
    category: 'support'
  },
  {
    id: "lanefour-1",
    title: "ELECTRICAL TECHNICIAN",
    company: "Lanefour",
    location: "Shah Alam, Selangor",
    period: "Dec 2020 - March 2021",
    description: [
      "Conducted wiring and soldering for mechanical and electrical assemblies by following technical diagrams, ensuring high-quality RTU box construction for TNB.",
      "Performed functional tests to identify potential issues early, enhancing the overall reliability of the final product.",
      "Followed strict safety protocols during assembly, mitigating risks and ensuring compliance with industry standards.",
      "Supported the team by troubleshooting assembly issues, reducing delays and optimizing production time."
    ],
    icon: <Zap className="h-5 w-5" />,
    category: 'engineering'
  },
  {
    id: "lanefour-2",
    title: "ELECTRICAL TECHNICIAN INTERNSHIP",
    company: "Lanefour",
    location: "Shah Alam, Selangor",
    period: "July 2020 - Nov 2020",
    description: [
      "Conducted wiring and soldering for mechanical and electrical assemblies by following technical diagrams, ensuring high-quality RTU box construction for TNB.",
      "Performed functional tests to identify potential issues early, enhancing the overall reliability of the final product.",
      "Followed strict safety protocols during assembly, mitigating risks and ensuring compliance with industry standards.",
      "Supported the team by troubleshooting assembly issues, reducing delays and optimizing production time."
    ],
    icon: <Zap className="h-5 w-5" />,
    category: 'engineering'
  },
];

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(experiences[0]);

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

    const element = document.getElementById('experience');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="experience" className="py-20 relative bg-gradient-to-t from-secondary/20 to-background dark:bg-gradient-to-t dark:from-black/40 dark:to-background">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 px-3 py-1 text-sm" variant="outline">Work History</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-foreground">My </span>
            <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A chronological display of my professional journey, showcasing roles and responsibilities
            that have shaped my expertise in software engineering, testing, and electronic systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left side - Timeline */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Timeline vertical line */}
              <div className="absolute left-[28px] top-6 bottom-0 w-[3px] bg-border"></div>

              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                  transition={{ duration: 0.4, delay: isVisible ? 0.1 * index : 0 }}
                  className="mb-12 last:mb-0 relative"
                >
                  {/* Timeline dot */}
                  <div 
                    className={`absolute left-[24px] w-[11px] h-[11px] rounded-full border-2 z-10 top-[26px] transform -translate-x-1/2 -translate-y-1/2 ${
                      selectedExperience?.id === exp.id ? 'bg-primary border-primary' : 'bg-background border-muted-foreground'
                    }`}
                  ></div>
                  
                  <div 
                    className={`ml-16 ${selectedExperience?.id === exp.id ? 'bg-primary/5 dark:bg-primary/10' : 'bg-card/80 hover:bg-primary/5 dark:hover:bg-primary/10'} p-5 rounded-lg cursor-pointer border transition-colors`}
                    onClick={() => setSelectedExperience(exp)}
                  >
                    <h3 className="font-bold text-md">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center">
                      <span>{exp.company}</span>
                      <span className="mx-1.5">•</span>
                      <span>{exp.period}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Selected experience details */}
          <div className="lg:col-span-7">
            {selectedExperience && (
              <motion.div
                key={selectedExperience.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-card shadow-md rounded-lg border p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  {selectedExperience.tag && (
                    <Badge className="bg-primary text-primary-foreground">{selectedExperience.tag}</Badge>
                  )}
                  <span className="text-muted-foreground">{selectedExperience.company}</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{selectedExperience.title}</h2>
                <p className="text-muted-foreground mb-4">{selectedExperience.location} • {selectedExperience.period}</p>
                
                <Separator className="my-4" />
                
                <ul className="space-y-3 list-disc pl-5 text-foreground">
                  {selectedExperience.description.map((item, idx) => (
                    <li key={idx} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
