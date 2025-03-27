import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Coffee, IceCream, Zap, PenTool, Laptop, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import ProjectDialog from '@/components/ProjectDialog';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  icon: React.ReactNode;
  category: 'engineering' | 'service' | 'support';
}

const experiences: Experience[] = [
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
    category: 'engineering'
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
];

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

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

  const toggleExpanded = (id: string) => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  const filteredExperiences = activeTab === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === activeTab);

  return (
    <section id="experience" className="py-20 relative bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">Work History</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            A chronicle of my professional journey, showcasing my growth and contributions across various roles and industries.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="service">Service</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-8 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 md:block hidden"></div>
            
            <div className="space-y-16 relative">
              {filteredExperiences.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: isVisible ? 1 : 0, 
                    y: isVisible ? 0 : 50 
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: isVisible ? 0.1 * index : 0 
                  }}
                  className={`relative ${index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0 ml-12' : 'md:pl-12 md:text-left md:mr-0 ml-12'} md:ml-0`}
                >
                  <div className="absolute md:left-1/2 left-0 md:transform md:-translate-x-1/2 -translate-x-16 w-8 h-8 rounded-full bg-background border-2 border-accent flex items-center justify-center z-10">
                    {exp.icon}
                  </div>
                  
                  <div 
                    className={`bg-card border border-border rounded-lg shadow-lg p-6 hover:border-accent/50 transition-all cursor-pointer ${
                      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    } md:max-w-[calc(50%-4rem)] w-full`}
                    onClick={() => toggleExpanded(exp.id)}
                  >
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-accent">{exp.period}</span>
                        {expandedExperience === exp.id ? 
                          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                      
                      <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                      <p className="text-muted-foreground mb-4">{exp.company} • {exp.location}</p>
                      
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: expandedExperience === exp.id ? 'auto' : 0,
                          opacity: expandedExperience === exp.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="list-disc text-left ml-5 space-y-2 text-sm text-muted-foreground">
                          {exp.description.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ExperienceSection;
