import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "My 10-year-old came home excited about programming every day! The story-based approach made complex concepts so easy to understand. She's now building her own games!",
    author: "Sarah Johnson",
    role: "Parent of Emily, Age 10",
    rating: 5
  },
  {
    quote: "BRS transformed my shy teenager into a confident innovator. He's now passionate about robotics and even won a local competition. The hands-on projects are incredible!",
    author: "Michael Chen",
    role: "Parent of Alex, Age 14",
    rating: 5
  },
  {
    quote: "The teachers at BRS don't just teach technology – they inspire creativity and critical thinking. My daughter is building VR experiences and planning to study computer science!",
    author: "Jessica Martinez",
    role: "Parent of Sofia, Age 13",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Parents</span> Say
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 animate-fade-in-up border border-border/50"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-muted-foreground italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-bold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;