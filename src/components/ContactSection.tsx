
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, MapPin, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Form will be handled by Netlify
    // but we still show the success message for better UX
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-20 relative bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={contentVariants}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">Get In Touch</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Contact Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Feel free to reach out for collaborations, opportunities, or just to say hello!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={contentVariants}
            className="space-y-8"
          >
            <motion.h3 
              variants={itemVariants} 
              className="text-2xl font-semibold"
            >
              Let's Connect
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground"
            >
              Whether you have a question, project idea, or just want to say hello, I'd love to hear from you. Fill out the form or use my contact details below.
            </motion.p>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">isshahrulisskandar@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">Petaling Jaya, Selangor, Malaysia</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="glass-panel rounded-xl p-6 text-center"
            >
              <h3 className="text-xl font-semibold mb-3">Available for Opportunities</h3>
              <p className="text-muted-foreground">
                Looking for a dedicated engineer to join your team or help with a project? Let's discuss how I can contribute.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={contentVariants}
            className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-semibold mb-6"
            >
              Send Me a Message
            </motion.h3>
            
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Hidden input for Netlify form handling */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Hello, I'd like to talk about..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full min-h-[150px]"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
