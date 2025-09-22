import { supabase } from '@/integrations/supabase/client';
const API_BASE_URL = 'http://localhost:3001';

export interface Student {
  id: string;
  name: string;
  age: number;
  email: string;
  enrolled_courses: string[];
  join_date: string;
  status: 'Active' | 'Inactive';
}


export interface Course {
  id: string;
  title: string;
  type: string;
  ageGroup: string;
  sessions: number;
  enrolled: number;
  maxCapacity: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'Active' | 'Inactive';
  startDate: string;
  endDate: string; // Add this
  price: string;
  description: string;
  instructor: string;
  location: string; // Add this
  schedule: string; // Mapped from appointment_time
  competitionPrep: boolean; // Mapped from competition_prep
  competitionName?: string; // Mapped from competition_name
  competitionDescription?: string; // This will be part of the main description
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
    const { data, error } = await supabase.from('students').select('*');
    if (error) throw new Error(error.message);
    return data || [];
  },
  
  create: async (newStudent: Omit<Student, 'id'>): Promise<Student[]> => {
    const { data, error } = await supabase.from('students').insert([
        {
            name: newStudent.name,
            age: newStudent.age,
            email: newStudent.email,
            enrolled_courses: newStudent.enrolled_courses,
            join_date: newStudent.join_date,
            status: newStudent.status,
        }
    ]).select();
    if (error) throw new Error(error.message);
    return data || [];
  },

  update: async (id: string, updates: Partial<Student>): Promise<Student[]> => {
    const { data, error } = await supabase.from('students').update(updates).eq('id', id).select();
    if (error) throw new Error(error.message);
    return data || [];
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
};

// Courses API
export const coursesApi = {
  getAll: async (): Promise<Course[]> => {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) throw new Error(error.message);
    
    // Map all database fields to frontend fields
    return (data || []).map(course => ({
      ...course,
      title: course.program_title,
      type: course.program_type,
      ageGroup: course.age_group,
      sessions: course.duration_weeks,
      enrolled: course.enrolled_students,
      maxCapacity: course.max_students,
      startDate: course.start_date,
      endDate: course.end_date,
      price: String(course.price),
      instructor: course.instructor_name,
      location: course.location,
      schedule: course.appointment_time,
      competitionPrep: course.competition_prep,
      competitionName: course.competition_name,
    }));
  },
  create: async (newCourse: Omit<Course, 'id'>): Promise<Course[]> => {
    const { data, error } = await supabase.from('courses').insert([
      {
        program_title: newCourse.title,
        program_type: newCourse.type,
        age_group: newCourse.ageGroup,
        duration_weeks: newCourse.sessions,
        enrolled_students: 0, // Default to 0
        max_students: newCourse.maxCapacity,
        status: newCourse.status,
        start_date: newCourse.startDate,
        end_date: newCourse.endDate,
        price: Number(newCourse.price),
        description: newCourse.description,
        instructor_name: newCourse.instructor,
        location: newCourse.location,
        appointment_time: newCourse.schedule,
        competition_prep: newCourse.competitionPrep,
        competition_name: newCourse.competitionName,
      }
    ]).select();

    if (error) throw new Error(error.message);
    return data || [];
  },
  
  update: async (id: string, updates: Partial<Course>): Promise<Course[]> => {
    // Map all frontend fields back to database fields
    const supabaseUpdates: { [key: string]: any } = {};
    if (updates.status) supabaseUpdates.status = updates.status;
    if (updates.title) supabaseUpdates.program_title = updates.title;
    if (updates.ageGroup) supabaseUpdates.age_group = updates.ageGroup;
    if (updates.startDate) supabaseUpdates.start_date = updates.startDate;
    if (updates.endDate) supabaseUpdates.end_date = updates.endDate;
    if (updates.maxCapacity) supabaseUpdates.max_students = updates.maxCapacity;
    if (updates.location) supabaseUpdates.location = updates.location;
    if (updates.schedule) supabaseUpdates.appointment_time = updates.schedule;
    if (updates.instructor) supabaseUpdates.instructor_name = updates.instructor;
    if (updates.sessions) supabaseUpdates.duration_weeks = updates.sessions;
    if (updates.competitionPrep !== undefined) supabaseUpdates.competition_prep = updates.competitionPrep;
    if (updates.competitionName) supabaseUpdates.competition_name = updates.competitionName;
    if (updates.description) supabaseUpdates.description = updates.description;

    const { data, error } = await supabase.from('courses').update(supabaseUpdates).eq('id', id).select();
    if (error) throw new Error(error.message);
    return data || [];
  },
  
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
  
};

// Enrollments API
export const enrollmentsApi = {
  getAll: async (): Promise<Enrollment[]> => {
    const { data, error } = await supabase.from('enrollments').select('*');
    if (error) throw new Error(error.message);
    return data || [];
  },
  
  create: async (newEnrollment: Omit<Enrollment, 'id' | 'enrollmentDate' | 'status'>): Promise<Enrollment[]> => {
    const { data, error } = await supabase.from('enrollments').insert([
      {
        student_id: newEnrollment.studentId, // This will be a placeholder for now
        student_name: newEnrollment.studentName,
        course_id: newEnrollment.courseId,
        course_name: newEnrollment.courseName,
        start_date: newEnrollment.startDate,
        status: 'Pending', // All new enrollments will default to Pending
        enrollment_date: new Date().toISOString(),
      }
    ]).select();

    if (error) {
        console.error("Supabase insert error:", error);
        throw new Error(error.message);
    }
    return data || [];
  },

  update: async (id: string, updates: Partial<Enrollment>): Promise<Enrollment[]> => {
    const { data, error } = await supabase.from('enrollments').update(updates).eq('id', id).select();
    if (error) throw new Error(error.message);
    return data || [];
  },
};