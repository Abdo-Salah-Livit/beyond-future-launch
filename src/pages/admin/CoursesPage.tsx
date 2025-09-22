import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, Edit, Users, Calendar, Clock, Save, Trash2 } from "lucide-react";
import { coursesApi, type Course } from "@/lib/api";
import { toast } from "sonner";

// Defines the initial state for a new course form
const initialNewCourseState: Omit<Course, 'id'> = {
  title: "",
  type: "General", // Add this default value
  ageGroup: "",
  sessions: 0,
  enrolled: 0,
  maxCapacity: 12,
  status: 'upcoming',
  startDate: "",
  endDate: "",
  price: "",
  description: "",
  instructor: "",
  location: "BRS Main Campus",
  schedule: "",
  competitionPrep: false,
  competitionName: "",
};

export default function CoursesPage() {
  const queryClient = useQueryClient();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [newCourse, setNewCourse] = useState(initialNewCourseState);

  // Fetch all courses from the Supabase backend
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: coursesApi.getAll,
  });

  // Mutation to create a new course
  const createCourseMutation = useMutation({
    mutationFn: (courseData: Omit<Course, 'id'>) => coursesApi.create(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('New course added successfully!');
      setIsAddDialogOpen(false);
      setNewCourse(initialNewCourseState); // Reset form after successful submission
    },
    onError: (error) => {
      toast.error(`Failed to add course: ${error.message}`);
    },
  });

  // Mutation to update an existing course
  const updateCourseMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Course> }) =>
      coursesApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course updated successfully');
      setIsEditDialogOpen(false);
      setEditingCourse(null);
    },
    onError: (error) => {
      toast.error(`Failed to update course: ${error.message}`);
    },
  });

  // Mutation to delete a course
  const deleteCourseMutation = useMutation({
    mutationFn: (id: string) => coursesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast.success('Course deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete course: ${error.message}`);
    },
  });

  // Handler to toggle a course's active/inactive status
  const toggleCourseStatus = (course: Course) => {
    const newStatus = course.status === "Active" ? "Inactive" : "Active";
    updateCourseMutation.mutate({ id: course.id, updates: { status: newStatus } });
  };

  // Handler to delete a course
  const handleDeleteCourse = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourseMutation.mutate(id);
    }
  };
  
  // Opens the edit dialog and populates it with the selected course's data
  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setIsEditDialogOpen(true);
  };

  // Generic handler for input changes in both forms
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setState: Function) => {
    const { name, value } = e.target;
    setState((prevState: any) => ({ ...prevState, [name]: value }));
  };
  
  // Generic handler for switch (toggle) changes in both forms
  const handleSwitchChange = (checked: boolean, setState: Function, fieldName: string) => {
    setState((prevState: any) => ({...prevState, [fieldName]: checked }));
  };

  // Handles the submission of the "Edit Course" form
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse && editingCourse.id) {
      updateCourseMutation.mutate({ id: editingCourse.id, updates: editingCourse });
    }
  };

  // Handles the submission of the "Add New Course" form
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCourseMutation.mutate(newCourse);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
          <p className="text-muted-foreground mt-2">Manage all BRS courses and programs.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-button shadow-button hover:opacity-90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Course
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader><DialogTitle>Add a New Course</DialogTitle></DialogHeader>
                <form onSubmit={handleAddSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label htmlFor="new-title">Course Title</Label><Input id="new-title" name="title" value={newCourse.title} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                      <div className="space-y-2"><Label htmlFor="new-ageGroup">Age Group</Label><Input id="new-ageGroup" name="ageGroup" value={newCourse.ageGroup} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                      <div className="space-y-2"><Label htmlFor="new-startDate">Start Date</Label><Input id="new-startDate" name="startDate" type="date" value={newCourse.startDate} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                      <div className="space-y-2"><Label htmlFor="new-endDate">End Date</Label><Input id="new-endDate" name="endDate" type="date" value={newCourse.endDate} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                      <div className="space-y-2"><Label htmlFor="new-maxCapacity">Class Size</Label><Input id="new-maxCapacity" name="maxCapacity" type="number" value={newCourse.maxCapacity} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                      <div className="space-y-2"><Label htmlFor="new-sessions">Duration (Sessions)</Label><Input id="new-sessions" name="sessions" type="number" value={newCourse.sessions} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                      <div className="space-y-2"><Label htmlFor="new-location">Location</Label><Input id="new-location" name="location" value={newCourse.location} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                      <div className="space-y-2"><Label htmlFor="new-schedule">Schedule</Label><Input id="new-schedule" name="schedule" value={newCourse.schedule} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                      <div className="space-y-2"><Label htmlFor="new-instructor">Instructor</Label><Input id="new-instructor" name="instructor" value={newCourse.instructor} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                      <div className="space-y-2"><Label htmlFor="new-price">Price</Label><Input id="new-price" name="price" value={newCourse.price} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                      <div className="flex items-center space-x-2 pt-6"><Switch id="new-competitionPrep" checked={newCourse.competitionPrep} onCheckedChange={(checked) => handleSwitchChange(checked, setNewCourse, 'competitionPrep')} /><Label htmlFor="new-competitionPrep">Competition Prep?</Label></div>
                  </div>
                  {newCourse.competitionPrep && (
                      <div className="space-y-2 pt-4 border-t"><Label htmlFor="new-competitionName">Competition Name</Label><Input id="new-competitionName" name="competitionName" value={newCourse.competitionName} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                  )}
                  <div className="space-y-2"><Label htmlFor="new-description">Description</Label><Textarea id="new-description" name="description" value={newCourse.description} onChange={(e) => handleInputChange(e, setNewCourse)} /></div>
                  <DialogFooter>
                      <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                      <Button type="submit" disabled={createCourseMutation.isPending}><Save className="h-4 w-4 mr-2" />{createCourseMutation.isPending ? "Adding..." : "Add Course"}</Button>
                  </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 flex flex-col">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg text-card-foreground">{course.title}</CardTitle>
                  <Badge variant="outline" className="text-xs">{course.ageGroup}</Badge>
                </div>
                {/* REMOVE BUTTON ADDED HERE */}
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openEditDialog(course)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive" onClick={() => handleDeleteCourse(course.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={course.status === "Active"}
                    onCheckedChange={() => toggleCourseStatus(course)}
                    disabled={updateCourseMutation.isPending}
                  />
                  <span className="text-sm text-muted-foreground">{course.status}</span>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /><span>{course.sessions} weeks</span></div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4" /><span>{course.enrolled}/{course.maxCapacity} enrolled</span></div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>Starts {new Date(course.startDate).toLocaleDateString()}</span></div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description:</p>
                <p className="text-sm text-card-foreground line-clamp-3">{course.description}</p>
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
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(course)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1" disabled={course.enrolled === 0}>
                  <Users className="h-4 w-4 mr-1" />
                  View Students
                </Button>
              </div>
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Course Details</DialogTitle></DialogHeader>
          {editingCourse && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input id="title" name="title" value={editingCourse.title || ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="ageGroup">Age Group</Label>
                      <Input id="ageGroup" name="ageGroup" value={editingCourse.ageGroup || ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" name="startDate" type="date" value={editingCourse.startDate ? new Date(editingCourse.startDate).toISOString().split('T')[0] : ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" name="endDate" type="date" value={editingCourse.endDate ? new Date(editingCourse.endDate).toISOString().split('T')[0] : ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="maxCapacity">Class Size</Label>
                      <Input id="maxCapacity" name="maxCapacity" type="number" value={editingCourse.maxCapacity || ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="sessions">Duration (Sessions)</Label>
                      <Input id="sessions" name="sessions" type="number" value={editingCourse.sessions || ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" value={editingCourse.location || ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input id="schedule" name="schedule" value={editingCourse.schedule || ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="instructor">Instructor</Label>
                      <Input id="instructor" name="instructor" value={editingCourse.instructor || ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                      <Switch id="competitionPrep" checked={editingCourse.competitionPrep} onCheckedChange={(checked) => handleSwitchChange(checked, setEditingCourse, 'competitionPrep')} />
                      <Label htmlFor="competitionPrep">Competition Prep?</Label>
                  </div>
              </div>
              {editingCourse.competitionPrep && (
                  <div className="space-y-2 pt-4 border-t">
                      <Label htmlFor="competitionName">Competition Name</Label>
                      <Input id="competitionName" name="competitionName" value={editingCourse.competitionName || ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
                  </div>
              )}
               <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={editingCourse.description || ''} onChange={(e) => handleInputChange(e, setEditingCourse)} />
              </div>
              <DialogFooter>
                  <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                  <Button type="submit" disabled={updateCourseMutation.isPending}>
                      <Save className="h-4 w-4 mr-2" />
                      {updateCourseMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}