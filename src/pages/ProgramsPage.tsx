import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gamepad2, Bot, Code, Lightbulb, Clock, Users, Trophy, Star } from "lucide-react";

const ProgramsPage = () => {
  const programs = [
    {
      icon: Gamepad2,
      title: "Game & XR Development",
      description: "Create immersive virtual and augmented reality experiences, build games, and explore the metaverse.",
      duration: "12 weeks",
      students: "8-12",
      level: "Beginner to Advanced",
      skills: ["Unity 3D", "C# Programming", "VR/AR Design", "3D Modeling", "Game Physics"],
      projects: ["Virtual Reality Adventure Game", "AR Mobile App", "Multiplayer Online Game"],
      price: "$899"
    },
    {
      icon: Bot,
      title: "Robotics & Arduino",
      description: "Design, build, and program robots. Learn electronics, sensors, and bring your inventions to life.",
      duration: "10 weeks",
      students: "6-10",
      level: "Beginner to Intermediate",
      skills: ["Arduino Programming", "Circuit Design", "Sensor Integration", "Mechanical Design", "Problem Solving"],
      projects: ["Smart Home Robot", "Line-Following Bot", "Voice-Controlled Assistant"],
      price: "$749"
    },
    {
      icon: Code,
      title: "Coding & AI",
      description: "Master programming languages, develop apps, and dive into artificial intelligence and machine learning.",
      duration: "14 weeks",
      students: "10-15",
      level: "Beginner to Advanced",
      skills: ["Python Programming", "Web Development", "Machine Learning", "Data Science", "App Development"],
      projects: ["AI Chatbot", "Web Application", "Mobile App", "ML Prediction Model"],
      price: "$999"
    },
    {
      icon: Lightbulb,
      title: "Creative Tech",
      description: "Blend art, design, and technology to create digital masterpieces and interactive installations.",
      duration: "8 weeks",
      students: "8-12",
      level: "Beginner to Intermediate",
      skills: ["Digital Art", "Interactive Design", "Animation", "Sound Design", "Creative Coding"],
      projects: ["Interactive Art Installation", "Digital Story", "Animated Short Film"],
      price: "$649"
    }
  ];

  const ageGroups = [
    {
      age: "6-9 Years",
      title: "Junior Tech Explorers",
      description: "Introduction to technology through play-based learning and simple coding concepts.",
      programs: ["Basic Robotics", "Scratch Programming", "Digital Art Basics"],
      focus: "Visual programming, basic electronics, creative expression"
    },
    {
      age: "10-12 Years",
      title: "Middle Tech Innovators", 
      description: "Building fundamental coding skills and exploring advanced robotics and game development.",
      programs: ["Game Development", "Arduino Projects", "Python Basics", "3D Design"],
      focus: "Text-based coding, complex projects, team collaboration"
    },
    {
      age: "13-16 Years",
      title: "Advanced Tech Pioneers",
      description: "Advanced programming, AI concepts, and preparation for tech careers and competitions.",
      programs: ["AI & Machine Learning", "Advanced Robotics", "Web Development", "Mobile Apps"],
      focus: "Professional tools, career preparation, leadership skills"
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
              Our 
              <span className="block bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
                Programs
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-medium">
              Comprehensive learning paths designed to unlock your child's potential in technology and innovation
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose Your <span className="bg-gradient-button bg-clip-text text-transparent">Adventure</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each program is carefully crafted to provide hands-on experience with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <div 
                  key={index}
                  className="bg-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 animate-fade-in-up border border-border/50"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-gradient-button rounded-2xl p-4 w-16 h-16 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
                        {program.price}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">{program.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{program.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-sm font-semibold text-foreground">{program.duration}</p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-sm font-semibold text-foreground">{program.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center">
                      <Trophy className="h-5 w-5 text-primary mx-auto mb-2" />
                      <p className="text-sm font-semibold text-foreground">{program.level}</p>
                      <p className="text-xs text-muted-foreground">Level</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-foreground mb-3">Skills You'll Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-bold text-foreground mb-3">Key Projects:</h4>
                    <ul className="space-y-2">
                      {program.projects.map((project, projectIndex) => (
                        <li key={projectIndex} className="flex items-center text-muted-foreground">
                          <Star className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button variant="hero" size="lg" className="w-full">
                    <Link to="/enroll" className="w-full">Enroll Now</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Programs by <span className="bg-gradient-accent bg-clip-text text-transparent">Age Group</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tailored learning experiences designed for different developmental stages
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ageGroups.map((group, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 animate-fade-in-up border border-border/50"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-center mb-6">
                  <div className="bg-gradient-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{group.age.split('-')[0]}-{group.age.split('-')[1].split(' ')[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{group.title}</h3>
                  <p className="text-primary font-semibold">{group.age}</p>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">{group.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-bold text-foreground mb-3">Available Programs:</h4>
                  <ul className="space-y-2">
                    {group.programs.map((program, progIndex) => (
                      <li key={progIndex} className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {program}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-xl">
                  <p className="text-sm font-semibold text-foreground mb-1">Learning Focus:</p>
                  <p className="text-sm text-muted-foreground">{group.focus}</p>
                </div>
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
              Start Your Child's
              <span className="block bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
                Tech Journey
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-medium">
              Join thousands of students who have already discovered their passion for technology at BRS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="hero" size="lg" className="text-xl px-12 py-6 rounded-2xl font-black tracking-wide bg-white text-primary hover:bg-white/90 shadow-glow">
                <Link to="/enroll">Enroll Today</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-xl px-8 py-6 rounded-2xl font-bold text-white border-white/30 hover:bg-white/10">
                <Link to="/contact">Ask Questions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgramsPage;