import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Eye, Edit, Trash2, Save } from "lucide-react";
import { studentsApi, type Student } from "@/lib/api";
import { toast } from "sonner";

const initialNewStudentState = {
  name: "",
  age: "",
  email: "",
};

export default function StudentsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Partial<Student> | null>(null);
  const [newStudent, setNewStudent] = useState(initialNewStudentState);

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: studentsApi.getAll,
  });

  const createStudentMutation = useMutation({
    mutationFn: (studentData: Omit<Student, 'id'>) => studentsApi.create(studentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success("Student added successfully!");
      setIsAddDialogOpen(false);
      setNewStudent(initialNewStudentState);
    },
    onError: (error) => {
      toast.error(`Failed to add student: ${error.message}`);
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Student> }) =>
      studentsApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success("Student updated successfully!");
      setIsEditDialogOpen(false);
      setEditingStudent(null);
    },
    onError: (error) => {
      toast.error(`Failed to update student: ${error.message}`);
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: (studentId: string) => studentsApi.delete(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success("Student removed successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to remove student: ${error.message}`);
    },
  });

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createStudentMutation.mutate({
      ...newStudent,
      age: Number(newStudent.age),
      enrolled_courses: [],
      join_date: new Date().toISOString().split('T')[0],
      status: 'Active',
    } as Omit<Student, 'id'>);
  };

  const handleEditStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent && editingStudent.id) {
      updateStudentMutation.mutate({
        id: editingStudent.id,
        updates: { ...editingStudent, age: Number(editingStudent.age) },
      });
    }
  };

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm("Are you sure you want to permanently delete this student?")) {
      deleteStudentMutation.mutate(studentId);
    }
  };
  
  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: Function) => {
    const { name, value } = e.target;
    setState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading students...</div>;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Student Management</CardTitle>
          <div className="flex justify-between items-center pt-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-button shadow-button">
                  <Plus className="h-5 w-5 mr-2" /> Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add New Student</DialogTitle></DialogHeader>
                <form onSubmit={handleAddStudentSubmit} className="space-y-4">
                  <div><Label htmlFor="name">Full Name</Label><Input id="name" name="name" value={newStudent.name} onChange={(e) => handleInputChange(e, setNewStudent)} required /></div>
                  <div><Label htmlFor="age">Age</Label><Input id="age" name="age" type="number" value={newStudent.age} onChange={(e) => handleInputChange(e, setNewStudent)} required /></div>
                  <div><Label htmlFor="email">Email Address</Label><Input id="email" name="email" type="email" value={newStudent.email} onChange={(e) => handleInputChange(e, setNewStudent)} required /></div>
                  <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                    <Button type="submit" disabled={createStudentMutation.isPending}>{createStudentMutation.isPending ? "Adding..." : "Add Student"}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono text-xs">{student.id}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>{new Date(student.join_date).toLocaleDateString()}</TableCell>
                    <TableCell><Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(student)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteStudent(student.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Student</DialogTitle></DialogHeader>
          {editingStudent && (
            <form onSubmit={handleEditStudentSubmit} className="space-y-4">
              <div><Label htmlFor="edit-name">Full Name</Label><Input id="edit-name" name="name" value={editingStudent.name || ''} onChange={(e) => handleInputChange(e, setEditingStudent)} required /></div>
              <div><Label htmlFor="edit-age">Age</Label><Input id="edit-age" name="age" type="number" value={editingStudent.age || ''} onChange={(e) => handleInputChange(e, setEditingStudent)} required /></div>
              <div><Label htmlFor="edit-email">Email Address</Label><Input id="edit-email" name="email" type="email" value={editingStudent.email || ''} onChange={(e) => handleInputChange(e, setEditingStudent)} required /></div>
              <DialogFooter>
                 <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                 <Button type="submit" disabled={updateStudentMutation.isPending}>{updateStudentMutation.isPending ? "Saving..." : "Save Changes"}</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}