import { useEffect, useState } from "react";
import { Calendar, Clock, Users, MapPin, Trophy, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

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

const Schedule = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'ongoing': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'completed': return 'bg-gray-500/10 text-gray-600 border-gray-200';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return <Calendar className="h-4 w-4" />;
      case 'ongoing': return <Clock className="h-4 w-4" />;
      case 'completed': return <AlertCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const upcomingCourses = courses.filter(course => course.status === 'upcoming');
  const ongoingCourses = courses.filter(course => course.status === 'ongoing');
  const completedCourses = courses.filter(course => course.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Ongoing Courses */}
      {ongoingCourses.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
            <Clock className="h-8 w-8 text-green-600 mr-3" />
            Currently Running Courses
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ongoingCourses.map((course) => (
              <Card key={course.id} className="border-l-4 border-l-green-500 hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">{course.program_title}</CardTitle>
                      <p className="text-muted-foreground">{course.program_type}</p>
                    </div>
                    <Badge className={getStatusColor(course.status)}>
                      {getStatusIcon(course.status)}
                      <span className="ml-1 capitalize">{course.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{course.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span>Started: {format(new Date(course.start_date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span>Ends: {format(new Date(course.end_date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span>{course.duration_weeks} weeks</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <span>{course.enrolled_students}/{course.max_students} students</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      <span>{course.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span>{course.appointment_time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <span>Instructor: {course.instructor_name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-primary font-semibold">Age Group: {course.age_group}</span>
                    </div>
                  </div>

                  {course.competition_prep && course.competition_name && (
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                      <div className="flex items-center mb-2">
                        <Trophy className="h-4 w-4 text-primary mr-2" />
                        <span className="font-semibold text-primary">Competition Preparation</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{course.competition_name}</p>
                      {course.competition_date && (
                        <p className="text-sm text-muted-foreground">
                          Date: {format(new Date(course.competition_date), 'MMM dd, yyyy')}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Courses */}
      {upcomingCourses.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            Upcoming Courses
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingCourses.map((course) => (
              <Card key={course.id} className="border-l-4 border-l-blue-500 hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">{course.program_title}</CardTitle>
                      <p className="text-muted-foreground">{course.program_type}</p>
                    </div>
                    <Badge className={getStatusColor(course.status)}>
                      {getStatusIcon(course.status)}
                      <span className="ml-1 capitalize">{course.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{course.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span>Starts: {format(new Date(course.start_date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span>Ends: {format(new Date(course.end_date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span>{course.duration_weeks} weeks</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <span>{course.enrolled_students}/{course.max_students} spots</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      <span>{course.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span>{course.appointment_time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <span>Instructor: {course.instructor_name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-primary font-semibold">Age Group: {course.age_group}</span>
                    </div>
                    <div className="flex items-center text-sm font-semibold text-green-600">
                      <span>Price: ${course.price}</span>
                    </div>
                  </div>

                  {course.competition_prep && course.competition_name && (
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                      <div className="flex items-center mb-2">
                        <Trophy className="h-4 w-4 text-primary mr-2" />
                        <span className="font-semibold text-primary">Competition Preparation</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{course.competition_name}</p>
                      {course.competition_date && (
                        <p className="text-sm text-muted-foreground">
                          Date: {format(new Date(course.competition_date), 'MMM dd, yyyy')}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Completed Courses */}
      {completedCourses.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
            <AlertCircle className="h-8 w-8 text-gray-600 mr-3" />
            Recently Completed Courses
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedCourses.map((course) => (
              <Card key={course.id} className="border-l-4 border-l-gray-400 opacity-75 hover:opacity-100 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">{course.program_title}</CardTitle>
                      <p className="text-muted-foreground">{course.program_type}</p>
                    </div>
                    <Badge className={getStatusColor(course.status)}>
                      {getStatusIcon(course.status)}
                      <span className="ml-1 capitalize">{course.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{course.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span>Started: {format(new Date(course.start_date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      <span>Completed: {format(new Date(course.end_date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span>{course.duration_weeks} weeks</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <span>Age Group: {course.age_group}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <span>Instructor: {course.instructor_name}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 font-semibold">✓ Successfully completed with {course.enrolled_students} students</span>
                    </div>
                  </div>

                  {course.competition_prep && course.competition_name && (
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                      <div className="flex items-center mb-2">
                        <Trophy className="h-4 w-4 text-primary mr-2" />
                        <span className="font-semibold text-primary">Competition Preparation</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{course.competition_name}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {courses.length === 0 && (
        <div className="text-center py-20">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">No Courses Scheduled</h3>
          <p className="text-muted-foreground">Check back soon for upcoming course schedules!</p>
        </div>
      )}
    </div>
  );
};

export default Schedule;