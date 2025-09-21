const API_BASE_URL = 'http://localhost:3001';

export interface Student {
  id: string;
  name: string;
  age: number;
  email: string;
  enrolledCourses: string[];
  joinDate: string;
  status: 'Active' | 'Inactive';
}

export interface Course {
  id: string;
  title: string;
  ageGroup: string;
  levels: number;
  sessions: number;
  enrolled: number;
  maxCapacity: number;
  status: 'Active' | 'Inactive';
  startDate: string;
  price: string;
  description: string;
  instructor: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  startDate: string;
  status: 'Pending' | 'Active' | 'Completed';
  enrollmentDate: string;
}

// Students API
export const studentsApi = {
  getAll: async (): Promise<Student[]> => {
    const response = await fetch(`${API_BASE_URL}/students`);
    return response.json();
  },
  
  create: async (student: Omit<Student, 'id'>): Promise<Student> => {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    return response.json();
  },
  
  update: async (id: string, updates: Partial<Student>): Promise<Student> => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return response.json();
  },
  
  delete: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'DELETE',
    });
  },
};

// Courses API
export const coursesApi = {
  getAll: async (): Promise<Course[]> => {
    const response = await fetch(`${API_BASE_URL}/courses`);
    return response.json();
  },
  
  create: async (course: Omit<Course, 'id'>): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });
    return response.json();
  },
  
  update: async (id: string, updates: Partial<Course>): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return response.json();
  },
};

// Enrollments API
export const enrollmentsApi = {
  getAll: async (): Promise<Enrollment[]> => {
    const response = await fetch(`${API_BASE_URL}/enrollments`);
    return response.json();
  },
  
  create: async (enrollment: Omit<Enrollment, 'id'>): Promise<Enrollment> => {
    const response = await fetch(`${API_BASE_URL}/enrollments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enrollment),
    });
    return response.json();
  },
  
  update: async (id: string, updates: Partial<Enrollment>): Promise<Enrollment> => {
    const response = await fetch(`${API_BASE_URL}/enrollments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return response.json();
  },
};