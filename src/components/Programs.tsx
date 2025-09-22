import { Gamepad2, Bot, Code, Lightbulb } from "lucide-react";

const programsData = [
  {
    icon: Gamepad2,
    title: "Game & XR Development",
    description: "Create immersive virtual and augmented reality experiences, build games, and explore the metaverse."
  },
  {
    icon: Bot,
    title: "Robotics & Arduino",
    description: "Design, build, and program robots. Learn electronics, sensors, and bring your inventions to life."
  },
  {
    icon: Code,
    title: "Coding & AI",
    description: "Master programming languages, develop apps, and dive into artificial intelligence and machine learning."
  },
  {
    icon: Lightbulb,
    title: "Creative Tech",
    description: "Blend art, design, and technology to create digital masterpieces and interactive installations."
  }
];

const Programs = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="bg-gradient-to-r from-blue-700 to-red-400 bg-clip-text text-transparent">Programs</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programsData.map((program, index) => {
            const Icon = program.icon;
            return (
              <div 
                key={index}
                className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 animate-fade-in-up border border-border/50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-gradient-button rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:animate-pulse">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{program.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{program.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;