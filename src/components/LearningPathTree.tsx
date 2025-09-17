import { Gamepad2, Bot, Code, Lightbulb, ArrowRight, Users } from "lucide-react";

const LearningPathTree = () => {
  const learningPaths = [
    {
      icon: Gamepad2,
      title: "Game & XR Development",
      description: "Create immersive virtual and augmented reality experiences, build games, and explore the metaverse.",
      color: "from-purple-500 to-pink-500",
      levels: [
        {
          age: "6-9 Years",
          title: "Junior Game Creators",
          skills: ["Visual Scripting", "Basic 3D Concepts", "Simple Game Mechanics"],
          focus: "Play-based learning with visual tools"
        },
        {
          age: "10-12 Years", 
          title: "Game Developers",
          skills: ["Unity Basics", "C# Introduction", "Game Physics", "Level Design"],
          focus: "Building complete games with guidance"
        },
        {
          age: "13-16 Years",
          title: "XR Pioneers",
          skills: ["Advanced Unity", "VR/AR Development", "Multiplayer Systems", "Professional Tools"],
          focus: "Industry-standard development practices"
        }
      ]
    },
    {
      icon: Bot,
      title: "Robotics & Arduino",
      description: "Design, build, and program robots. Learn electronics, sensors, and bring your inventions to life.",
      color: "from-blue-500 to-cyan-500",
      levels: [
        {
          age: "6-9 Years",
          title: "Little Engineers",
          skills: ["Basic Electronics", "Simple Circuits", "Visual Programming"],
          focus: "Hands-on building with visual interfaces"
        },
        {
          age: "10-12 Years",
          title: "Robot Builders", 
          skills: ["Arduino Programming", "Sensor Integration", "Motor Control", "Problem Solving"],
          focus: "Creating functional robots with code"
        },
        {
          age: "13-16 Years",
          title: "Robotics Engineers",
          skills: ["Advanced Arduino", "IoT Integration", "AI-Powered Robots", "Competition Prep"],
          focus: "Professional robotics and competition readiness"
        }
      ]
    },
    {
      icon: Code,
      title: "Coding & AI",
      description: "Master programming languages, develop apps, and dive into artificial intelligence and machine learning.",
      color: "from-green-500 to-emerald-500",
      levels: [
        {
          age: "6-9 Years",
          title: "Code Explorers",
          skills: ["Scratch Programming", "Logic Building", "Creative Coding"],
          focus: "Visual programming and computational thinking"
        },
        {
          age: "10-12 Years",
          title: "App Developers",
          skills: ["Python Basics", "Web Development", "Mobile Apps", "Data Handling"],
          focus: "Real programming languages and project building"
        },
        {
          age: "13-16 Years",
          title: "AI Innovators", 
          skills: ["Machine Learning", "Data Science", "AI Development", "Advanced Python"],
          focus: "Cutting-edge AI and career preparation"
        }
      ]
    },
    {
      icon: Lightbulb,
      title: "Creative Tech",
      description: "Blend art, design, and technology to create digital masterpieces and interactive installations.",
      color: "from-orange-500 to-red-500",
      levels: [
        {
          age: "6-9 Years",
          title: "Digital Artists",
          skills: ["Digital Drawing", "Animation Basics", "Creative Tools"],
          focus: "Artistic expression through technology"
        },
        {
          age: "10-12 Years",
          title: "Interactive Creators",
          skills: ["Interactive Design", "Sound Design", "Creative Coding", "Digital Storytelling"],
          focus: "Combining creativity with technical skills"
        },
        {
          age: "13-16 Years",
          title: "Tech Artists",
          skills: ["Advanced Animation", "Interactive Installations", "Creative AI", "Professional Tools"],
          focus: "Professional creative technology careers"
        }
      ]
    }
  ];

  return (
    <div className="space-y-16">
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Learning <span className="bg-gradient-button bg-clip-text text-transparent">Paths</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose your track and progress through different levels designed for your age and skill level
        </p>
      </div>

      {learningPaths.map((path, pathIndex) => {
        const Icon = path.icon;
        return (
          <div 
            key={pathIndex}
            className="animate-fade-in-up"
            style={{ animationDelay: `${pathIndex * 200}ms` }}
          >
            {/* Path Header */}
            <div className="text-center mb-12">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r ${path.color} mb-6 shadow-glow`}>
                <Icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">{path.title}</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {path.description}
              </p>
            </div>

            {/* Learning Tree */}
            <div className="relative">
              {/* Tree trunk/line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-primary/60 to-primary/30 h-full hidden lg:block"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                {path.levels.map((level, levelIndex) => (
                  <div 
                    key={levelIndex}
                    className={`relative ${levelIndex === 1 ? 'lg:translate-y-12' : levelIndex === 2 ? 'lg:translate-y-24' : ''}`}
                  >
                    {/* Branch line for desktop */}
                    <div className="hidden lg:block absolute top-1/2 left-1/2 w-16 h-1 bg-gradient-to-r from-primary to-transparent transform -translate-y-1/2 -translate-x-full"></div>
                    
                    {/* Level Card */}
                    <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 border border-border/50 relative">
                      {/* Age Badge */}
                      <div className="absolute -top-3 left-6">
                        <span className={`px-4 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${path.color} shadow-lg`}>
                          {level.age}
                        </span>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="text-xl font-bold text-foreground mb-3">{level.title}</h4>
                        
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-primary mb-2">Skills You'll Learn:</p>
                          <div className="flex flex-wrap gap-2">
                            {level.skills.map((skill, skillIndex) => (
                              <span 
                                key={skillIndex}
                                className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm font-semibold text-foreground mb-1">Learning Focus:</p>
                          <p className="text-sm text-muted-foreground">{level.focus}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow to next level */}
                    {levelIndex < path.levels.length - 1 && (
                      <div className="flex justify-center my-6 lg:absolute lg:bottom-[-2rem] lg:left-1/2 lg:transform lg:-translate-x-1/2">
                        <div className="bg-primary/10 rounded-full p-2">
                          <ArrowRight className="h-4 w-4 text-primary lg:rotate-90" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Separator between paths */}
            {pathIndex < learningPaths.length - 1 && (
              <div className="flex justify-center mt-16">
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningPathTree;