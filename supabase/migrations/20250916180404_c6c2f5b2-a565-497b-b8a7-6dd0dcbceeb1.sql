-- Create courses table for scheduling information
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  program_title TEXT NOT NULL,
  program_type TEXT NOT NULL, -- 'Game & XR Development', 'Robotics & Arduino', etc.
  age_group TEXT NOT NULL, -- '6-9 Years', '10-12 Years', '13-16 Years'
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_weeks INTEGER NOT NULL,
  max_students INTEGER NOT NULL DEFAULT 12,
  enrolled_students INTEGER NOT NULL DEFAULT 0,
  instructor_name TEXT,
  appointment_time TEXT, -- e.g., 'Mon/Wed/Fri 3:00-5:00 PM'
  status TEXT NOT NULL DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'completed'
  price DECIMAL(10,2),
  competition_prep BOOLEAN DEFAULT false,
  competition_name TEXT,
  competition_date TIMESTAMP WITH TIME ZONE,
  location TEXT DEFAULT 'BRS Main Campus',
  description TEXT,
  requirements TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (courses are public information)
CREATE POLICY "Courses are viewable by everyone" 
ON public.courses 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample course data
INSERT INTO public.courses (
  program_title, program_type, age_group, start_date, end_date, duration_weeks, 
  max_students, enrolled_students, instructor_name, appointment_time, status, 
  price, competition_prep, competition_name, competition_date, description
) VALUES 
(
  'VR Game Development Bootcamp', 
  'Game & XR Development', 
  '13-16 Years',
  '2024-02-05 09:00:00-08',
  '2024-04-29 17:00:00-08',
  12,
  12,
  8,
  'Dr. Sarah Martinez',
  'Mon/Wed/Fri 3:00-6:00 PM',
  'ongoing',
  899.00,
  true,
  'National VR Challenge 2024',
  '2024-05-15 10:00:00-08',
  'Intensive 12-week program focusing on Unity 3D and advanced VR development techniques.'
),
(
  'Arduino Robotics Championship Prep', 
  'Robotics & Arduino', 
  '10-12 Years',
  '2024-02-12 10:00:00-08',
  '2024-04-15 12:00:00-08',
  10,
  10,
  6,
  'Prof. Michael Chen',
  'Tue/Thu 4:00-6:00 PM, Sat 10:00-12:00 PM',
  'ongoing',
  749.00,
  true,
  'Junior Robotics Championship',
  '2024-04-25 09:00:00-08',
  '10-week intensive program preparing students for the Junior Robotics Championship.'
),
(
  'AI & Machine Learning Fundamentals', 
  'Coding & AI', 
  '13-16 Years',
  '2024-03-01 09:00:00-08',
  '2024-05-31 18:00:00-08',
  14,
  15,
  12,
  'Dr. Lisa Wang',
  'Mon/Wed 5:00-7:00 PM',
  'upcoming',
  999.00,
  false,
  null,
  null,
  'Comprehensive 14-week course covering Python, machine learning algorithms, and AI applications.'
),
(
  'Creative Tech Art Installation', 
  'Creative Tech', 
  '10-12 Years',
  '2024-01-15 10:00:00-08',
  '2024-03-10 15:00:00-08',
  8,
  12,
  10,
  'Artist Maya Rodriguez',
  'Sat 2:00-5:00 PM',
  'completed',
  649.00,
  false,
  null,
  null,
  '8-week program focused on creating interactive digital art installations.'
),
(
  'Unity Game Dev for Beginners', 
  'Game & XR Development', 
  '6-9 Years',
  '2024-03-15 10:00:00-08',
  '2024-06-07 12:00:00-08',
  12,
  8,
  3,
  'Mr. Jake Thompson',
  'Fri 3:30-5:30 PM, Sat 10:00-12:00 PM',
  'upcoming',
  899.00,
  false,
  null,
  null,
  'Introduction to game development using Unity with visual scripting for young learners.'
);