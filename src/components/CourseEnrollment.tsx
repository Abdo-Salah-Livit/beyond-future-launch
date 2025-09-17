import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ExpandableCourseCard from "./ExpandableCourseCard";

interface Course {
  id: string;
  program_title: string;
  program_type: string;
  age_group: string;
  start_date: string;
  end_date: string;
  duration_weeks: number;
  max_students: number;
  enrolled_students: number;
  instructor_name: string;
  appointment_time: string;
  status: string;
  price: number;
  competition_prep: boolean;
  competition_name?: string;
  competition_date?: string;
  location: string;
  description: string;
}

const CourseEnrollment = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingCourses();
  }, []);

  const fetchUpcomingCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .in('status', ['upcoming', 'ongoing'])
        .order('start_date', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching upcoming courses:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
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
          Course Schedule & <span className="bg-gradient-button bg-clip-text text-transparent">Enrollment</span>
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
              course={course}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">No Upcoming Courses</h3>
          <p className="text-muted-foreground mb-6">Check back soon for new course schedules!</p>
          <Button asChild variant="outline">
            <Link to="/contact">Get Notified</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseEnrollment;