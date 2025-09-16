import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import WhyChoose from "@/components/WhyChoose";
import AgePrograms from "@/components/AgePrograms";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Programs />
      <WhyChoose />
      <AgePrograms />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
