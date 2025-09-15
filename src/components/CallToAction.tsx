import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket, Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 rounded-full p-4 animate-pulse">
              <Rocket className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Join the Future of
            <span className="block bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
              Learning
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-medium">
            Enroll today and let your child start their innovation journey with XR, robotics, coding, and AI.
            <span className="block mt-2">🚀 Shape tomorrow's innovators today!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              variant="hero" 
              size="lg" 
              className="text-xl px-12 py-6 rounded-2xl font-black tracking-wide bg-white text-primary hover:bg-white/90 shadow-glow"
            >
              <Link to="/enroll">
                <Sparkles className="h-6 w-6 mr-2" />
                Enroll Now
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="text-xl px-8 py-6 rounded-2xl font-bold text-white border-white/30 hover:bg-white/10"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;