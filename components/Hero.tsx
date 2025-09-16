import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import brsLogo from "@/assets/brs-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in-up">
                  <img
                      src={brsLogo}
                      alt="Beyond Reality School Logo"
                      className="mx-auto mb-2 w-80 md:w-100 animate-scale-in shadow-glow rounded-2xl"
                  />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
            Beyond Reality
            <span className="block bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
              School
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 max-w-4xl mx-auto font-medium">
            Where Future Innovators Begin – XR, Robotics, Coding & AI for Kids & Teens
          </p>
          <Button 
            asChild
            variant="hero" 
            size="lg" 
            className="text-xl px-12 py-6 rounded-2xl font-black tracking-wide animate-scale-in delay-500"
          >
            <Link to="/enroll">🚀 Enroll Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;