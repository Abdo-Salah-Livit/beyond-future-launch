import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Schedule from "@/components/Schedule";
import LearningPathTree from "@/components/LearningPathTree";
import CourseEnrollment from "@/components/CourseEnrollment";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const ProgramsPage = () => {

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

      {/* Main Content with Tabs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="paths" className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="paths" className="text-lg">Learning Paths</TabsTrigger>
                <TabsTrigger value="enrollment" className="text-lg">Enrollment</TabsTrigger>
                <TabsTrigger value="schedule" className="text-lg">All Courses</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="paths">
              <LearningPathTree />
            </TabsContent>

            <TabsContent value="enrollment">
              <CourseEnrollment />
            </TabsContent>

            <TabsContent value="schedule">
              <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  All <span className="bg-gradient-button bg-clip-text text-transparent">Courses</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Complete overview of all running, upcoming, and completed courses
                </p>
              </div>
              <Schedule />
            </TabsContent>
          </Tabs>
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