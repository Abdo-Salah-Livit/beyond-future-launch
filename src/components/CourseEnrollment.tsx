import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ExpandableCourseCard from "./ExpandableCourseCard";
import { coursesApi } from "@/lib/api"; // Import from our unified API

const CourseEnrollment = () => {
  // Use React Query to fetch courses via our new API function
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['publicCourses'], // Use a different key to avoid conflicts with admin query
    queryFn: coursesApi.getAll,
    // Filter for only upcoming and ongoing courses for the public page
    select: (allCourses) => allCourses.filter(c => ['upcoming', 'ongoing'].includes(c.status)),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12 animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Course Schedule & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Enrollment</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Secure your spot in our available courses. Limited seats available for each program.
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="space-y-6">
          {courses.map((course, index) => (
            <ExpandableCourseCard 
              key={course.id}
              course={course as any}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">No Upcoming Courses</h3>
          <p className="text-muted-foreground mb-6">Check back soon for new course schedules!</p>
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Contact Admissions</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseEnrollment;