import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Users, Calendar, Clock } from "lucide-react";

// Mock course data
const coursesData = [
  {
    id: "CRS001",
    title: "Jr. Game Developer",
    ageGroup: "10-12 Years",
    levels: 3,
    sessions: 12,
    enrolled: 15,
    maxCapacity: 20,
    status: "Active",
    startDate: "2024-02-01",
    price: "$299",
    description: "Introduction to game development using kid-friendly tools and engines.",
    instructor: "Alex Thompson",
  },
  {
    id: "CRS002",
    title: "Robotics Explorer",
    ageGroup: "8-10 Years", 
    levels: 2,
    sessions: 8,
    enrolled: 12,
    maxCapacity: 15,
    status: "Active",
    startDate: "2024-02-15",
    price: "$249",
    description: "Hands-on robotics programming with Arduino and sensors.",
    instructor: "Sarah Chen",
  },
  {
    id: "CRS003",
    title: "AI Fundamentals",
    ageGroup: "13-15 Years",
    levels: 4,
    sessions: 16,
    enrolled: 8,
    maxCapacity: 12,
    status: "Active",
    startDate: "2024-03-01",
    price: "$399",
    description: "Introduction to artificial intelligence and machine learning concepts.",
    instructor: "Dr. Michael Brown",
  },
  {
    id: "CRS004",
    title: "XR Experience Design",
    ageGroup: "14-16 Years",
    levels: 3,
    sessions: 10,
    enrolled: 0,
    maxCapacity: 10,
    status: "Inactive",
    startDate: "2024-04-01",
    price: "$349",
    description: "Create immersive VR and AR experiences using modern tools.",
    instructor: "Emma Davis",
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(coursesData);

  const toggleCourseStatus = (courseId: string) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, status: course.status === "Active" ? "Inactive" : "Active" }
        : course
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage all BRS courses and programs.
          </p>
        </div>
        
        <Button className="bg-gradient-button shadow-button hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg text-card-foreground">{course.title}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {course.ageGroup}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={course.status === "Active"}
                    onCheckedChange={() => toggleCourseStatus(course.id)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {course.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.levels} levels, {course.sessions} sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{course.enrolled}/{course.maxCapacity} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Starts {course.startDate}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description:</p>
                <p className="text-sm text-card-foreground">{course.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Instructor</p>
                  <p className="text-sm font-medium text-card-foreground">{course.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-lg font-bold text-primary">{course.price}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={course.enrolled === 0}
                >
                  <Users className="h-4 w-4 mr-1" />
                  View Students
                </Button>
              </div>

              {/* Enrollment progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Enrollment</span>
                  <span>{Math.round((course.enrolled / course.maxCapacity) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-button h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(course.enrolled / course.maxCapacity) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Course placeholder */}
      <Card className="bg-gradient-card shadow-card border-dashed border-2 border-muted-foreground/30 hover:border-primary/50 transition-colors">
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
          <Plus className="h-12 w-12 text-muted-foreground" />
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-card-foreground">Add New Course</h3>
            <p className="text-sm text-muted-foreground">Create a new course or program for students</p>
          </div>
          <Button className="bg-gradient-button shadow-button">
            Create Course
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}