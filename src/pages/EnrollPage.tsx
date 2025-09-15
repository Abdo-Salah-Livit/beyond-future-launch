import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Calendar, User, Mail, Phone, Users, BookOpen, CreditCard, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const EnrollPage = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Student Information
    studentName: "",
    studentAge: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    address: "",
    
    // Program Selection
    program: "",
    ageGroup: "",
    startDate: "",
    schedule: "",
    
    // Additional Information
    experience: "",
    interests: "",
    specialNeeds: "",
    emergencyContact: "",
    emergencyPhone: "",
    
    // Terms
    agreesToTerms: false,
    agreesToMarketing: false
  });

  const programs = [
    { id: "game-xr", name: "Game & XR Development", price: "$899" },
    { id: "robotics", name: "Robotics & Arduino", price: "$749" },
    { id: "coding-ai", name: "Coding & AI", price: "$999" },
    { id: "creative-tech", name: "Creative Tech", price: "$649" }
  ];

  const ageGroups = [
    { id: "6-9", name: "Junior Tech Explorers (6-9 years)" },
    { id: "10-12", name: "Middle Tech Innovators (10-12 years)" },
    { id: "13-16", name: "Advanced Tech Pioneers (13-16 years)" }
  ];

  const schedules = [
    { id: "weekday-morning", name: "Weekday Mornings (9AM - 12PM)" },
    { id: "weekday-afternoon", name: "Weekday Afternoons (1PM - 4PM)" },
    { id: "weekend-morning", name: "Saturday Mornings (9AM - 12PM)" },
    { id: "weekend-afternoon", name: "Saturday Afternoons (1PM - 4PM)" }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enrollment Submitted!",
      description: "Thank you for enrolling! We'll contact you within 24 hours to confirm your child's spot.",
    });
    // Reset form or redirect
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const steps = [
    { number: 1, title: "Student Info", icon: User },
    { number: 2, title: "Program Selection", icon: BookOpen },
    { number: 3, title: "Additional Details", icon: Users },
    { number: 4, title: "Review & Payment", icon: CreditCard }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Student Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Student's Full Name *
                </label>
                <Input
                  value={formData.studentName}
                  onChange={(e) => handleChange('studentName', e.target.value)}
                  placeholder="Enter student's full name"
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Student's Age *
                </label>
                <Select onValueChange={(value) => handleChange('studentAge', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 11 }, (_, i) => i + 6).map((age) => (
                      <SelectItem key={age} value={age.toString()}>{age} years old</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Parent/Guardian Name *
              </label>
              <Input
                value={formData.parentName}
                onChange={(e) => handleChange('parentName', e.target.value)}
                placeholder="Enter parent/guardian full name"
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => handleChange('parentEmail', e.target.value)}
                  placeholder="parent@example.com"
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => handleChange('parentPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="h-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Address *
              </label>
              <Textarea
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Enter full address"
                className="min-h-20"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Program Selection</h3>
            
            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">
                Choose a Program *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.program === program.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleChange('program', program.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-foreground">{program.name}</h4>
                        <p className="text-primary font-semibold text-lg">{program.price}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        formData.program === program.id
                          ? 'border-primary bg-primary'
                          : 'border-border'
                      }`}>
                        {formData.program === program.id && (
                          <CheckCircle className="w-3 h-3 text-white ml-0.5 mt-0.5" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Age Group *
              </label>
              <Select onValueChange={(value) => handleChange('ageGroup', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Preferred Start Date *
                </label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Preferred Schedule *
                </label>
                <Select onValueChange={(value) => handleChange('schedule', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    {schedules.map((schedule) => (
                      <SelectItem key={schedule.id} value={schedule.id}>{schedule.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Additional Information</h3>
            
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Previous Technology Experience
              </label>
              <Textarea
                value={formData.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                placeholder="Describe any previous coding, robotics, or technology experience..."
                className="min-h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Student's Interests & Goals
              </label>
              <Textarea
                value={formData.interests}
                onChange={(e) => handleChange('interests', e.target.value)}
                placeholder="What interests your child most about technology? What would they like to create or learn?"
                className="min-h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Special Needs or Accommodations
              </label>
              <Textarea
                value={formData.specialNeeds}
                onChange={(e) => handleChange('specialNeeds', e.target.value)}
                placeholder="Please share any special needs, learning accommodations, or other information we should know..."
                className="min-h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Emergency Contact Name *
                </label>
                <Input
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange('emergencyContact', e.target.value)}
                  placeholder="Emergency contact full name"
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Emergency Contact Phone *
                </label>
                <Input
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="h-12"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        const selectedProgram = programs.find(p => p.id === formData.program);
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Review & Complete Enrollment</h3>
            
            <div className="bg-card rounded-2xl p-6 border border-border/50">
              <h4 className="text-xl font-bold text-foreground mb-4">Enrollment Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student:</span>
                  <span className="font-semibold">{formData.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Program:</span>
                  <span className="font-semibold">{selectedProgram?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age Group:</span>
                  <span className="font-semibold">{ageGroups.find(g => g.id === formData.ageGroup)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="font-semibold">{formData.startDate}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-primary">{selectedProgram?.price}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreesToTerms}
                  onCheckedChange={(checked) => handleChange('agreesToTerms', checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the <span className="text-primary font-semibold cursor-pointer">Terms and Conditions</span> and 
                  <span className="text-primary font-semibold cursor-pointer"> Privacy Policy</span>. I understand that enrollment 
                  is subject to availability and program requirements.
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={formData.agreesToMarketing}
                  onCheckedChange={(checked) => handleChange('agreesToMarketing', checked as boolean)}
                />
                <label htmlFor="marketing" className="text-sm text-muted-foreground leading-relaxed">
                  I would like to receive updates about new programs, events, and educational content from Beyond Reality School.
                </label>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6">
              <h5 className="font-bold text-foreground mb-2">Next Steps:</h5>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>We'll review your enrollment and contact you within 24 hours</li>
                <li>Complete payment to secure your child's spot</li>
                <li>Receive welcome materials and program information</li>
                <li>Attend orientation session before program start</li>
              </ol>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Enroll 
              <span className="block bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
                Today
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-medium">
              Start your child's journey into the future of technology and innovation
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.number} className="flex items-center">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                        currentStep >= step.number
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="ml-3 hidden md:block">
                        <p className={`text-sm font-semibold ${
                          currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          Step {step.number}
                        </p>
                        <p className={`text-xs ${
                          currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                      {step.number < steps.length && (
                        <div className={`hidden md:block w-16 h-0.5 ml-6 transition-all duration-300 ${
                          currentStep > step.number ? 'bg-primary' : 'bg-border'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-card rounded-3xl p-8 shadow-card border border-border/50 animate-fade-in-up">
              <form onSubmit={handleSubmit}>
                {renderStep()}
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12 pt-6 border-t border-border/50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="w-32"
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      variant="hero"
                      onClick={handleNext}
                      className="w-32"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="hero"
                      disabled={!formData.agreesToTerms}
                      className="w-40"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Complete Enrollment
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EnrollPage;