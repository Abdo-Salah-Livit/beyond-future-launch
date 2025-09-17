import { useEffect, useState } from "react";
import { Calendar, Clock, Users, MapPin, Trophy, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";

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
        .eq('status', 'upcoming')
        .order('start_date', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching upcoming courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSpotsRemaining = (course: Course) => {
    return course.max_students - course.enrolled_students;
  };

  const getSpotsBadgeColor = (spotsRemaining: number) => {
    if (spotsRemaining <= 2) return 'bg-red-500/10 text-red-600 border-red-200';
    if (spotsRemaining <= 5) return 'bg-orange-500/10 text-orange-600 border-orange-200';
    return 'bg-green-500/10 text-green-600 border-green-200';
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
          Secure your spot in our upcoming courses. Limited seats available for each program.
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {courses.map((course, index) => {
            const spotsRemaining = getSpotsRemaining(course);
            return (
              <Card 
                key={course.id} 
                className="border border-border/50 hover:shadow-glow transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground">{course.program_title}</CardTitle>
                      <p className="text-muted-foreground font-medium">{course.program_type}</p>
                    </div>
                    <Badge className={getSpotsBadgeColor(spotsRemaining)}>
                      {spotsRemaining} spots left
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {course.age_group}
                    </span>
                    <div className="flex items-center text-2xl font-bold text-green-600">
                      <DollarSign className="h-5 w-5 mr-1" />
                      {course.price}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                  
                  {/* Course Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Starts</p>
                        <p className="text-muted-foreground">{format(new Date(course.start_date), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Ends</p>
                        <p className="text-muted-foreground">{format(new Date(course.end_date), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Duration</p>
                        <p className="text-muted-foreground">{course.duration_weeks} weeks</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Class Size</p>
                        <p className="text-muted-foreground">{course.enrolled_students}/{course.max_students} students</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Details */}
                  <div className="space-y-3 p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span><strong>Location:</strong> {course.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span><strong>Schedule:</strong> {course.appointment_time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span><strong>Instructor:</strong> {course.instructor_name}</span>
                    </div>
                  </div>

                  {/* Competition Info */}
                  {course.competition_prep && course.competition_name && (
                    <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/20">
                      <div className="flex items-center mb-2">
                        <Trophy className="h-5 w-5 text-primary mr-2" />
                        <span className="font-bold text-primary">Competition Preparation Included</span>
                      </div>
                      <p className="text-sm text-foreground font-medium mb-1">{course.competition_name}</p>
                      {course.competition_date && (
                        <p className="text-sm text-muted-foreground">
                          Competition Date: {format(new Date(course.competition_date), 'MMM dd, yyyy')}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Enrollment Button */}
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full text-lg font-bold py-6 rounded-xl bg-gradient-button hover:opacity-90 text-white"
                    disabled={spotsRemaining <= 0}
                  >
                    {spotsRemaining > 0 ? (
                      <Link to="/enroll">Enroll Now</Link>
                    ) : (
                      <span>Course Full - Join Waitlist</span>
                    )}
                  </Button>

                  {spotsRemaining <= 3 && spotsRemaining > 0 && (
                    <p className="text-center text-sm text-orange-600 font-semibold">
                      ⚡ Only {spotsRemaining} spots remaining!
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
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