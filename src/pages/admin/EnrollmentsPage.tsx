import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Check, X, Eye, MoreHorizontal } from "lucide-react";
import { enrollmentsApi, type Enrollment } from "@/lib/api";
import { toast } from "sonner";

// Mock enrollment data
const enrollmentsData = [
  {
    id: "ENR001",
    studentName: "Alex Johnson",
    studentId: "STU001",
    courseName: "Jr. Game Developer",
    courseId: "CRS001",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    status: "Pending",
    enrollmentDate: "2024-01-15",
    price: "$299",
  },
  {
    id: "ENR002",
    studentName: "Sarah Chen",
    studentId: "STU002", 
    courseName: "AI Fundamentals",
    courseId: "CRS003",
    startDate: "2024-03-01",
    endDate: "2024-07-01",
    status: "Active",
    enrollmentDate: "2024-01-10",
    price: "$399",
  },
  {
    id: "ENR003",
    studentName: "Michael Brown",
    studentId: "STU003",
    courseName: "Robotics Explorer",
    courseId: "CRS002",
    startDate: "2024-02-15",
    endDate: "2024-04-15",
    status: "Completed",
    enrollmentDate: "2024-01-08",
    price: "$249",
  },
  {
    id: "ENR004",
    studentName: "Emma Davis",
    studentId: "STU004",
    courseName: "XR Experience Design",
    courseId: "CRS004",
    startDate: "2024-04-01",
    endDate: "2024-06-01",
    status: "Pending",
    enrollmentDate: "2024-01-05",
    price: "$349",
  },
  {
    id: "ENR005",
    studentName: "Ryan Wilson",
    studentId: "STU005",
    courseName: "Jr. Game Developer",
    courseId: "CRS001",
    startDate: "2024-02-01", 
    endDate: "2024-05-01",
    status: "Active",
    enrollmentDate: "2024-01-03",
    price: "$299",
  },
];

export default function EnrollmentsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All");
  const queryClient = useQueryClient();

  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ['enrollments'],
    queryFn: enrollmentsApi.getAll,
  });

  const updateEnrollmentMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Enrollment> }) =>
      enrollmentsApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
      toast.success('Enrollment updated successfully');
    },
    onError: () => {
      toast.error('Failed to update enrollment');
    },
  });

  const filteredEnrollments = enrollments.filter((enrollment) => {
    if (statusFilter === "All") return true;
    return enrollment.status === statusFilter;
  });

  const handleApprove = (enrollmentId: string) => {
    updateEnrollmentMutation.mutate({
      id: enrollmentId,
      updates: { status: 'Active' }
    });
  };

  const updateEnrollmentStatus = (enrollmentId: string, newStatus: string) => {
    updateEnrollmentMutation.mutate({
      id: enrollmentId,
      updates: { status: newStatus as 'Pending' | 'Active' | 'Completed' }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Pending":
        return "secondary";
      case "Completed":
        return "outline";
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const uniqueCourses = [...new Set(enrollments.map(e => e.courseName))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Enrollment Management</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all course enrollments.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-card-foreground">
              {enrollments.filter(e => e.status === "Pending").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-card-foreground">
              {enrollments.filter(e => e.status === "Active").length}
            </div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-card-foreground">
              {enrollments.filter(e => e.status === "Completed").length}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-card-foreground">
              {enrollments.length}
            </div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-card-foreground">All Enrollments</CardTitle>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>
                    Completed
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Course: {courseFilter === "All" ? "All" : courseFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Course</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCourseFilter("All")}>
                    All Courses
                  </DropdownMenuItem>
                  {uniqueCourses.map(course => (
                    <DropdownMenuItem key={course} onClick={() => setCourseFilter(course)}>
                      {course}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Enrollment ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">{enrollment.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{enrollment.studentName}</div>
                        <div className="text-sm text-muted-foreground">{enrollment.studentId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{enrollment.courseName}</TableCell>
                    <TableCell>{enrollment.startDate}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(enrollment.status)}>
                        {enrollment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">N/A</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {enrollment.status === "Pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateEnrollmentStatus(enrollment.id, "Active")}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateEnrollmentStatus(enrollment.id, "Cancelled")}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => updateEnrollmentStatus(enrollment.id, "Active")}>
                              Mark as Active
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateEnrollmentStatus(enrollment.id, "Completed")}>
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateEnrollmentStatus(enrollment.id, "Cancelled")}
                              className="text-destructive"
                            >
                              Cancel Enrollment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}