import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Users, Lightbulb, Target, Award, Heart } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We believe in fostering creativity and innovative thinking through hands-on learning experiences."
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building a supportive community where students, parents, and educators collaborate for success."
    },
    {
      icon: Target,
      title: "Future Ready",
      description: "Preparing students with skills and knowledge that will be essential in tomorrow's digital world."
    },
    {
      icon: Heart,
      title: "Passion Driven",
      description: "Cultivating genuine passion for technology and learning through engaging, story-based curricula."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      description: "Former NASA engineer with 15+ years in aerospace technology and education innovation."
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Curriculum",
      description: "Educational technology specialist with expertise in XR development and youth programming."
    },
    {
      name: "Emma Thompson",
      role: "Lead Instructor",
      description: "Robotics engineer and former Microsoft developer passionate about STEM education."
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
              About 
              <span className="block bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
                Beyond Reality School
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-medium">
              Pioneering the future of education through immersive technology and hands-on innovation
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our <span className="bg-gradient-button bg-clip-text text-transparent">Mission</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Empowering Tomorrow's Innovators
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Beyond Reality School (BRS) is more than just a learning institution – we're a launchpad for the next generation of innovators, creators, and problem-solvers. Our mission is to bridge the gap between traditional education and the rapidly evolving digital landscape.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  We believe that every child has the potential to shape the future. Through our innovative curriculum combining XR (Extended Reality), robotics, coding, and AI, we provide students with the tools, knowledge, and confidence to turn their wildest ideas into reality.
                </p>
                <Button asChild variant="hero" size="lg">
                  <Link to="/programs">Explore Programs</Link>
                </Button>
              </div>
              
              <div className="animate-scale-in">
                <div className="bg-gradient-accent rounded-3xl p-8 text-white">
                  <Award className="h-16 w-16 mb-6 mx-auto" />
                  <div className="text-center">
                    <h4 className="text-2xl font-bold mb-4">Award-Winning Approach</h4>
                    <p className="text-lg leading-relaxed">
                      Our story-based learning methodology has been recognized by educational institutions worldwide, 
                      making complex STEM concepts accessible and engaging for students aged 6-16.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our <span className="bg-gradient-accent bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at Beyond Reality School
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 animate-fade-in-up border border-border/50"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-gradient-button rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:animate-pulse">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet Our <span className="bg-gradient-button bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate educators and technology experts dedicated to your child's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 animate-fade-in-up text-center border border-border/50"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-24 h-24 bg-gradient-accent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-4">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Join Our
              <span className="block bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
                Community?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-medium">
              Discover how Beyond Reality School can unlock your child's potential in technology and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="hero" size="lg" className="text-xl px-12 py-6 rounded-2xl font-black tracking-wide bg-white text-primary hover:bg-white/90 shadow-glow">
                <Link to="/enroll">Start Your Journey</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-xl px-8 py-6 rounded-2xl font-bold text-white border-white/30 hover:bg-white/10">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;