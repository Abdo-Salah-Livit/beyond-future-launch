import { Cpu, Wrench, ArrowRight, Users, BookOpen, Zap } from "lucide-react";

const AgeLearningPaths = () => {
  const ageGroups = [
    {
      age: "6-9 Years",
      title: "Junior Tech Explorers",
      description: "Introduction to technology through play-based learning and hands-on exploration.",
      color: "from-green-400 to-blue-500",
      paths: {
        hardware: {
          title: "Hardware Path",
          icon: Wrench,
          description: "Building and creating with physical components",
          skills: ["Basic Electronics", "Simple Circuits", "LEGO Robotics", "Sensor Play"],
          projects: ["Light-up Cards", "Simple Motors", "Touch Sensors", "LED Patterns"],
          focus: "Hands-on exploration with safe, age-appropriate components"
        },
        software: {
          title: "Software Path", 
          icon: Cpu,
          description: "Visual programming and digital creativity",
          skills: ["Scratch Jr", "Visual Coding", "Digital Art", "Story Creation"],
          projects: ["Animated Stories", "Simple Games", "Digital Drawings", "Interactive Cards"],
          focus: "Drag-and-drop programming with immediate visual feedback"
        }
      }
    },
    {
      age: "10-12 Years",
      title: "Middle Tech Innovators",
      description: "Building fundamental skills and exploring more complex projects with guidance.",
      color: "from-purple-400 to-pink-500",
      paths: {
        hardware: {
          title: "Hardware Path",
          icon: Wrench,
          description: "Arduino programming and electronic projects",
          skills: ["Arduino Basics", "Circuit Design", "Sensor Integration", "Motor Control"],
          projects: ["Smart Home Models", "Line-Following Robots", "Weather Stations", "Automated Systems"],
          focus: "Real programming with physical computing and problem-solving"
        },
        software: {
          title: "Software Path",
          icon: Cpu, 
          description: "Text-based programming and app development",
          skills: ["Python Basics", "Scratch Advanced", "Web Development", "Game Design"],
          projects: ["Text Adventures", "Simple Websites", "2D Games", "Data Visualizations"],
          focus: "Transition to real programming languages with engaging projects"
        }
      }
    },
    {
      age: "13-16 Years", 
      title: "Advanced Tech Pioneers",
      description: "Professional-level skills and career preparation with industry-standard tools.",
      color: "from-orange-400 to-red-500",
      paths: {
        hardware: {
          title: "Hardware Path",
          icon: Wrench,
          description: "Advanced robotics and IoT development",
          skills: ["Advanced Arduino", "Raspberry Pi", "3D Printing", "IoT Integration", "PCB Design"],
          projects: ["AI-Powered Robots", "Smart City Models", "Drone Programming", "Industrial Automation"],
          focus: "Professional-grade hardware development and competition preparation"
        },
        software: {
          title: "Software Path",
          icon: Cpu,
          description: "Advanced programming and AI development", 
          skills: ["Advanced Python", "Machine Learning", "Web Frameworks", "Mobile Development", "Data Science"],
          projects: ["AI Applications", "Full-Stack Websites", "Mobile Apps", "ML Models", "Data Analytics"],
          focus: "Industry-standard development practices and career readiness"
        }
      }
    }
  ];

  const PathCard = ({ path, pathType, ageColor }: { path: any, pathType: string, ageColor: string }) => {
    const Icon = path.icon;
    return (
      <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 border border-border/50 h-full">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${ageColor} flex items-center justify-center mr-4`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-foreground">{path.title}</h4>
            <p className="text-sm text-muted-foreground">{pathType}</p>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 leading-relaxed">{path.description}</p>
        
        <div className="mb-4">
          <h5 className="font-bold text-foreground mb-2 flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-primary" />
            Skills You'll Learn:
          </h5>
          <div className="flex flex-wrap gap-2">
            {path.skills.map((skill: string, skillIndex: number) => (
              <span 
                key={skillIndex}
                className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h5 className="font-bold text-foreground mb-2 flex items-center">
            <Zap className="h-4 w-4 mr-2 text-primary" />
            Key Projects:
          </h5>
          <ul className="space-y-1">
            {path.projects.map((project: string, projectIndex: number) => (
              <li key={projectIndex} className="flex items-center text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                {project}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-l-primary">
          <p className="text-sm font-semibold text-foreground mb-1">Learning Focus:</p>
          <p className="text-sm text-muted-foreground">{path.focus}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-20">
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Learning Paths by <span className="bg-gradient-button bg-clip-text text-transparent">Age Group</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          Choose between Hardware and Software tracks designed specifically for each age group's developmental stage and interests
        </p>
      </div>

      {ageGroups.map((group, groupIndex) => (
        <div 
          key={groupIndex}
          className="animate-fade-in-up"
          style={{ animationDelay: `${groupIndex * 300}ms` }}
        >
          {/* Age Group Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r ${group.color} mb-6 shadow-glow`}>
              <Users className="h-10 w-10 text-white" />
            </div>
            <div className="mb-4">
              <span className={`px-6 py-2 rounded-full text-lg font-bold text-white bg-gradient-to-r ${group.color} shadow-lg`}>
                {group.age}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">{group.title}</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {group.description}
            </p>
          </div>

          {/* Learning Paths */}
          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
              <div className="relative">
                <PathCard 
                  path={group.paths.hardware} 
                  pathType="Hardware Focus"
                  ageColor={group.color}
                />
              </div>
              
              {/* VS indicator */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
                <div className="bg-background border-4 border-primary rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                  <span className="text-primary font-bold text-sm">OR</span>
                </div>
              </div>
              
              <div className="relative">
                <PathCard 
                  path={group.paths.software} 
                  pathType="Software Focus"
                  ageColor={group.color}
                />
              </div>
            </div>
          </div>
          
          {/* Next Age Group Arrow */}
          {groupIndex < ageGroups.length - 1 && (
            <div className="flex justify-center mt-16">
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-full p-4 border border-primary/30">
                <ArrowRight className="h-6 w-6 text-primary rotate-90" />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Call to Action */}
      <div className="text-center pt-16">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Mix and match between hardware and software paths as you grow. Our flexible curriculum allows students to explore both tracks and find their passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              🔥 Most students combine both paths for maximum learning!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeLearningPaths;