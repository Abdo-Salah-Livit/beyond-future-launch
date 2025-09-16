import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Innovation Drive\nTech Valley, CA 94025"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "(555) 123-TECH\n(555) 123-8324"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@beyondrealityschool.com\nsupport@beyondrealityschool.com"
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Monday - Friday: 9AM - 6PM\nSaturday: 10AM - 4PM\nSunday: Closed"
    }
  ];

  const faqs = [
    {
      question: "What age groups do you serve?",
      answer: "We offer programs for children and teens aged 6-16, with age-appropriate curricula designed for different developmental stages."
    },
    {
      question: "Do students need prior coding experience?",
      answer: "No prior experience is necessary! Our programs are designed to accommodate beginners while also challenging more advanced students."
    },
    {
      question: "What equipment do students need?",
      answer: "We provide all necessary equipment including computers, robotics kits, and VR headsets. Students just need to bring their curiosity and enthusiasm!"
    },
    {
      question: "How small are the class sizes?",
      answer: "We maintain small class sizes of 6-15 students depending on the program to ensure personalized attention and hands-on learning."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Get in 
              <span className="block bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-medium">
              Have questions? Ready to enroll? We're here to help you start your child's innovation journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="animate-slide-in-left">
                <div className="bg-card rounded-3xl p-8 shadow-card border border-border/50">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-button rounded-2xl p-3 mr-4">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">Send us a Message</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What can we help you with?"
                          className="h-12"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your questions or how we can help..."
                        className="min-h-32"
                      />
                    </div>
                    
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="animate-slide-in-right">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-6">
                      Contact <span className="bg-gradient-button bg-clip-text text-transparent">Information</span>
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Ready to take the next step? Our friendly team is here to answer your questions 
                      and help you find the perfect program for your child.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <div 
                          key={index}
                          className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 border border-border/50"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="bg-gradient-accent rounded-xl p-3 flex-shrink-0">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground mb-2">{info.title}</h3>
                              <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="bg-gradient-button rounded-2xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button asChild variant="outline" size="sm" className="w-full justify-start text-white border-white/30 hover:bg-white/20">
                        <Link to="/enroll">
                          <Send className="h-4 w-4 mr-2" />
                          Enroll Your Child
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="w-full justify-start text-white border-white/30 hover:bg-white/20">
                        <Link to="/programs">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          View All Programs
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked <span className="bg-gradient-accent bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find quick answers to common questions about our programs and enrollment process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in-up border border-border/50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h3 className="text-lg font-bold text-foreground mb-4">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground mb-6">
              Don't see your question answered?
            </p>
            <Button asChild variant="hero" size="lg">
              <Link to="#contact-form">Ask Us Directly</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;