import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Users, BookOpen, ClipboardList, DollarSign } from "lucide-react";

// Mock data for the chart
const enrollmentData = [
  { month: "Jan", enrollments: 45 },
  { month: "Feb", enrollments: 52 },
  { month: "Mar", enrollments: 48 },
  { month: "Apr", enrollments: 61 },
  { month: "May", enrollments: 55 },
  { month: "Jun", enrollments: 67 },
];

// Mock data for recent activity
const recentEnrollments = [
  { id: 1, studentName: "Alex Johnson", course: "Jr. Game Developer", date: "2024-01-15", status: "Active" },
  { id: 2, studentName: "Sarah Chen", course: "Robotics Explorer", date: "2024-01-14", status: "Pending" },
  { id: 3, studentName: "Michael Brown", course: "AI Fundamentals", date: "2024-01-13", status: "Active" },
  { id: 4, studentName: "Emma Davis", course: "XR Experience Design", date: "2024-01-12", status: "Active" },
  { id: 5, studentName: "Ryan Wilson", course: "Advanced Coding", date: "2024-01-11", status: "Completed" },
];

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "hsl(var(--primary))",
  },
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the BRS Admin Panel. Here's your school overview.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">342</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">28</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Pending Enrollments</CardTitle>
            <ClipboardList className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">23</div>
            <p className="text-xs text-muted-foreground">Needs review</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">$45,231</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Enrollment Analytics</CardTitle>
            <p className="text-sm text-muted-foreground">Student enrollments over the last 6 months</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={enrollmentData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="enrollments" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
            <p className="text-sm text-muted-foreground">Latest student enrollments</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">{enrollment.studentName}</p>
                  <p className="text-sm text-muted-foreground">{enrollment.course}</p>
                  <p className="text-xs text-muted-foreground">{enrollment.date}</p>
                </div>
                <Badge 
                  variant={
                    enrollment.status === "Active" ? "default" :
                    enrollment.status === "Pending" ? "secondary" : "outline"
                  }
                >
                  {enrollment.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}