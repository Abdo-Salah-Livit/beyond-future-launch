export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          program_title: string
          program_type: string
          age_group: string
          start_date: string
          end_date: string
          duration_weeks: number
          max_students: number
          enrolled_students: number
          instructor_name: string | null
          appointment_time: string | null
          status: string
          price: number | null
          competition_prep: boolean | null
          competition_name: string | null
          competition_date: string | null
          location: string | null
          description: string | null
          requirements: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          program_title: string
          program_type: string
          age_group: string
          start_date: string
          end_date: string
          duration_weeks: number
          max_students?: number
          enrolled_students?: number
          instructor_name?: string | null
          appointment_time?: string | null
          status?: string
          price?: number | null
          competition_prep?: boolean | null
          competition_name?: string | null
          competition_date?: string | null
          location?: string | null
          description?: string | null
          requirements?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          program_title?: string
          program_type?: string
          age_group?: string
          start_date?: string
          end_date?: string
          duration_weeks?: number
          max_students?: number
          enrolled_students?: number
          instructor_name?: string | null
          appointment_time?: string | null
          status?: string
          price?: number | null
          competition_prep?: boolean | null
          competition_name?: string | null
          competition_date?: string | null
          location?: string | null
          description?: string | null
          requirements?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      ,
      students: {
        Row: {
          id: string
          name: string
          age: number
          email: string
          enrolled_courses: string[]
          join_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          age: number
          email: string
          enrolled_courses: string[]
          join_date: string
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          age?: number
          email?: string
          enrolled_courses?: string[]
          join_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      ,
      enrollments: {
        Row: {
          id: string
          student_id: string
          student_name: string
          course_id: string
          course_name: string
          start_date: string
          status: string
          enrollment_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          student_name: string
          course_id: string
          course_name: string
          start_date: string
          status: string
          enrollment_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          student_name?: string
          course_id?: string
          course_name?: string
          start_date?: string
          status?: string
          enrollment_date?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never