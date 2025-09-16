import { Check, BookOpen, Wrench, Zap, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Story-based Learning",
    description: "Every lesson is an adventure with engaging narratives that make complex concepts fun and memorable."
  },
  {
    icon: Wrench,
    title: "Hands-on Projects",
    description: "Learn by doing with real projects that students can showcase and be proud of."
  },
  {
    icon: Zap,
    title: "Future Skills: AI, XR, Robotics, Coding",
    description: "Master the technologies that will shape tomorrow's world."
  },
  {
    icon: Users,
    title: "Tailored Programs for Ages 6–16",
    description: "Age-appropriate curricula designed to match developmental stages and interests."
  }
];

const WhyChoose = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose <span className="bg-gradient-button bg-clip-text text-transparent">BRS?</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="flex items-start space-x-6 group animate-slide-in-left"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex-shrink-0 bg-gradient-accent rounded-2xl p-3 group-hover:animate-pulse">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;