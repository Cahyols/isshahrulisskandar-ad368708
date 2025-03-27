
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Coffee, IceCream, Zap, PenTool, Laptop } from 'lucide-react';

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

          <TabsContent value="all">
            <ExperienceGrid 
              experiences={experiences} 
              isVisible={isVisible} 
              container={container} 
              item={item} 
            />
          </TabsContent>
          
          <TabsContent value="engineering">
            <ExperienceGrid 
              experiences={experiences.filter(exp => exp.category === 'engineering')} 
              isVisible={isVisible} 
              container={container} 
              item={item} 
            />
          </TabsContent>
          
          <TabsContent value="service">
            <ExperienceGrid 
              experiences={experiences.filter(exp => exp.category === 'service')} 
              isVisible={isVisible} 
              container={container} 
              item={item} 
            />
          </TabsContent>
          
          <TabsContent value="support">
            <ExperienceGrid 
              experiences={experiences.filter(exp => exp.category === 'support')} 
              isVisible={isVisible} 
              container={container} 
              item={item} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

const ExperienceGrid = ({ 
  experiences, 
  isVisible, 
  container, 
  item 
}: { 
  experiences: Experience[],
  isVisible: boolean,
  container: any,
  item: any
}) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {experiences.map((exp) => (
        <motion.div key={exp.id} variants={item} className="h-full">
          <Card className="h-full hover-lift transition-all hover:border-accent">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                  {exp.icon}
                </div>
                <Badge variant="outline" className="text-xs">
                  {exp.period}
                </Badge>
              </div>
              <CardTitle className="mt-4">{exp.title}</CardTitle>
              <CardDescription>
                {exp.company} • {exp.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {exp.description.slice(0, 3).map((item, index) => (
                  <li key={index} className="pl-2">
                    <span className="relative -left-2">{item}</span>
                  </li>
                ))}
                {exp.description.length > 3 && (
                  <li className="text-sm text-accent pl-2">
                    <span className="relative -left-2">+ {exp.description.length - 3} more responsibilities</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExperienceSection;
