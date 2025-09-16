const agePrograms = [
  {
    ageGroup: "6-9 Years",
    title: "Junior Tech Explorers",
    description: "Introduction to coding through games, basic robotics with visual programming, and creative digital art projects.",
    bgGradient: "bg-gradient-to-br from-orange-400 to-pink-400"
  },
  {
    ageGroup: "10-12 Years",
    title: "Middle Tech Innovators",
    description: "Advanced programming concepts, Arduino projects, game development basics, and introduction to AI concepts.",
    bgGradient: "bg-gradient-to-br from-pink-400 to-blue-400"
  },
  {
    ageGroup: "13-16 Years",
    title: "Advanced Tech Leaders",
    description: "Full-stack development, advanced robotics, XR/VR creation, machine learning projects, and tech entrepreneurship.",
    bgGradient: "bg-gradient-to-br from-blue-400 to-purple-400"
  }
];

const AgePrograms = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Programs by <span className="bg-gradient-accent bg-clip-text text-transparent">Age</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Carefully designed curricula that grow with your child's development and interests
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {agePrograms.map((program, index) => (
            <div 
              key={index}
              className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 transform hover:scale-105 animate-fade-in-up border border-border/50"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`${program.bgGradient} h-32 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-white/90 text-sm font-semibold">{program.ageGroup}</span>
                  <h3 className="text-white text-xl font-bold mt-1">{program.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-muted-foreground leading-relaxed">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgePrograms;