import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Loader } from "lucide-react";
import { toast } from "sonner";
import { enrollmentsApi, coursesApi, type Course } from "@/lib/api";
import { Label } from "@/components/ui/label";

const initialFormData = {
  studentName: "",
  parentEmail: "",
  program: "", // This will now store "course.id|course.title|course.startDate"
  agreesToTerms: false,
};

const EnrollPage = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialFormData);

  // Fetch live course data from the API for the dropdown
  const { data: courses = [], isLoading: isLoadingCourses } = useQuery({
    queryKey: ['publicCourses'],
    queryFn: coursesApi.getAll,
    select: (allCourses) => allCourses.filter(c => ['upcoming', 'ongoing', 'Active'].includes(c.status)),
  });

  // Mutation for creating a new enrollment
  const createEnrollmentMutation = useMutation({
    mutationFn: (newEnrollment: any) => enrollmentsApi.create(newEnrollment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] }); // This will refresh the admin page data
      toast.success("Enrollment Submitted!", {
        description: "Thank you for enrolling. We will be in touch shortly to confirm details.",
      });
      setFormData(initialFormData); // Reset the form
    },
    onError: (error) => {
      toast.error("Submission Failed", {
        description: `There was an error: ${error.message}`,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.program) {
        toast.error("Please select a program.");
        return;
    }
    // Destructure the combined value from the program selection
    const [programId, programName, startDate] = formData.program.split('|');

    createEnrollmentMutation.mutate({
      student_id: "placeholder-uuid", // In a real app, this would come from a logged-in user or a new student record
      student_name: formData.studentName,
      course_id: programId,
      course_name: programName,
      start_date: startDate,
    });
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Enroll Today</h1>
            <p className="text-xl md:text-2xl text-white/90">Start your child's journey into the future of technology.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-gradient-card rounded-3xl p-8 shadow-card border border-border/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Enrollment Form</h3>
                {/* Student Info */}
                <div className="space-y-2">
                    <Label>Student's Full Name *</Label>
                    <Input value={formData.studentName} onChange={(e) => handleChange('studentName', e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Parent's Email *</Label>
                    <Input type="email" value={formData.parentEmail} onChange={(e) => handleChange('parentEmail', e.target.value)} required />
                </div>
                
                {/* Program Selection */}
                <div className="space-y-2">
                    <Label>Choose a Program *</Label>
                    <Select onValueChange={(value) => handleChange('program', value)} value={formData.program}>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Select an available course..." /></SelectTrigger>
                        <SelectContent>
                            {isLoadingCourses ? (
                                <SelectItem value="loading" disabled>Loading courses...</SelectItem>
                            ) : (
                                courses.map((course: Course) => (
                                    <SelectItem key={course.id} value={`${course.id}|${course.title}|${course.startDate}`}>
                                        {course.title} ({course.ageGroup}) - Starts {new Date(course.startDate).toLocaleDateString()}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                </div>
                
                {/* Terms and Submit */}
                <div className="flex items-start space-x-3 pt-4">
                    <Checkbox id="terms" checked={formData.agreesToTerms} onCheckedChange={(checked) => handleChange('agreesToTerms', !!checked)} />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground">I agree to the Terms and Conditions.</Label>
                </div>
                <div className="flex justify-end mt-8 pt-6 border-t border-border/50">
                    <Button
                      type="submit"
                      variant="hero"
                      disabled={!formData.agreesToTerms || createEnrollmentMutation.isPending}
                      className="w-48"
                    >
                      {createEnrollmentMutation.isPending ? (
                        <Loader className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Complete Enrollment
                        </>
                      )}
                    </Button>
                </div>
              </form>
            </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EnrollPage;