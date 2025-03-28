
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Coffee, IceCream, Zap, PenTool, Laptop, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

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
    <section id="experience" className="py-20 relative bg-gradient-to-t from-secondary/20 to-background">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-3 py-1 text-sm" variant="outline">Work History</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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

          <TabsContent value={activeTab} className="mt-8 max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline center line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/20 via-accent to-primary/20 transform -translate-x-1/2"></div>
              
              <div className="space-y-12">
                {filteredExperiences.map((exp, index) => (
                  <motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                      opacity: isVisible ? 1 : 0, 
                      y: isVisible ? 0 : 50 
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: isVisible ? 0.1 * index : 0 
                    }}
                    className="relative group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute md:left-1/2 top-7 md:-translate-x-1/2 hidden md:flex">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: isVisible ? 1 : 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + 0.1 * index }}
                        className="w-14 h-14 rounded-full bg-background shadow-lg border-2 border-accent flex items-center justify-center z-10"
                      >
                        <div className="bg-gradient-to-br from-primary/20 to-accent/20 w-10 h-10 rounded-full flex items-center justify-center">
                          {exp.icon}
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Content container with alternating layout */}
                    <div className={`md:grid md:grid-cols-2 gap-8 md:gap-16 items-start ${
                      index % 2 === 0 ? '' : 'md:grid-flow-dense'
                    }`}>
                      {/* Empty column for first item in odd-indexed entries */}
                      <div className={index % 2 === 0 ? 'md:block' : 'md:col-start-1 md:row-start-1'}>
                        <motion.div 
                          className="bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-lg hover:shadow-xl transition-all p-6 ml-12 md:ml-0 relative"
                          whileHover={{ y: -5 }}
                          onClick={() => toggleExpanded(exp.id)}
                        >
                          {/* Mobile only icon */}
                          <div className="md:hidden absolute -left-12 top-7 w-8 h-8 bg-background rounded-full border border-accent flex items-center justify-center">
                            {exp.icon}
                          </div>
                          
                          <div className="flex flex-col">
                            <div className="flex justify-between items-start mb-1">
                              <span className="px-2 py-1 bg-accent/10 rounded-full text-xs font-medium text-accent">{exp.period}</span>
                              <button className="text-muted-foreground hover:text-accent transition-colors">
                                {expandedExperience === exp.id ? 
                                  <ChevronUp className="h-4 w-4" /> : 
                                  <ChevronDown className="h-4 w-4" />
                                }
                              </button>
                            </div>
                            
                            <h3 className="text-xl font-bold mt-2 mb-1">{exp.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              <span>{exp.company}</span>
                              <span className="mx-1">•</span>
                              <span>{exp.location}</span>
                            </p>
                            
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: expandedExperience === exp.id ? 'auto' : 0,
                                opacity: expandedExperience === exp.id ? 1 : 0
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-2"
                            >
                              <ul className="list-disc text-left ml-5 space-y-2 text-sm text-muted-foreground">
                                {exp.description.map((item, idx) => (
                                  <li key={idx} className="leading-relaxed">{item}</li>
                                ))}
                              </ul>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Empty column for second item */}
                      <div className={`hidden md:block ${index % 2 === 0 ? 'md:col-start-2' : ''}`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ExperienceSection;
