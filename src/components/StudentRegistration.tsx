import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Upload, CheckCircle, FileText, User, MapPin, Code, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

interface FormData {
  name: string;
  rollNumber: string;
  email: string;
  stream: string;
  customStream: string;
  cgpa: string;
  skills: string[];
  customSkills: string;
  jobLocations: string[];
  domainPreference: string;
  resume: File | null;
}

const streams = [
  "B. Tech.(Information Technology)",
  "B. Tech (Computer Science & Engg)",
  "B. Tech. Computer Science and Engg (Spec. in Bioinformatics)",
  "B. Tech - Computer Science and Engineering with Specialization in Information Security",
  "B. Tech- Computer Science and Engineering with specialization in Data Analytics",
  "B. Tech – Computer Science with Specialization in Data Science",
  "B. Tech. Computer Science and Engineering and Business Systems",
  "B. Tech. Computer Science and Engineering with Specialization in IoT",
  "B.Tech (Computer Science & Engg. with spec. in Artificial Intelligence and Machine learning)",
  "B.Tech (Computer Science & Engg. with spec. in Cyber Physical Systems)",
  "B. Tech_Computer Science and Engineering with specialisation in Cyber Security & Digital Forensics",
  "B. Tech_Computer Science and Engineering with specialisation in Gaming Technology",
  "B.Tech Computer Science and Engineering Specialization in Blockchain Technology",
  "B. Tech. (Computer Science and Engineering in Health Informatics)",
  "B. Tech. (Computer Science and Engineering with Specialization in Artificial Intelligence and Robotics)",
  "B. Tech Computer Science and Engineering (Cloud Computing & Automation)",
  "B.Tech. Computer Science and Engineering (Education Technology)",
  "B.Tech. Computer Science and Engineering (E-Commerce Technology)",
  "B.Tech. Computer Science and Engineering Specialization in Cyber Security",
  "B. Tech- Computer Science and Engineering with Specialization in Software Engineering",
  "B. Tech - Electronics and Computer Engineering",
  "B. Tech (Electronics & Communication Engg)",
  "B. Tech (ECE with Biomedical Engg.)",
  "B. Tech (ECE with specialization in Embedded systems)",
  "B.Tech. ECE with specialization in IVP",
  "B.Tech. ECE with specialization in IOT",
  "B.Tech. ECE with specialization in EV",
  "B. Tech. ECE with specialization in VLSI",
  "B. Tech -ECE With (Artificial Intelligent and Cybernetics)",
  "B.Tech (Electrical & Electronics Engg)",
  "B. Tech (Electronics & Instrumentation Engg)",
  "B. Tech (Mechanical Engg)",
  "B.Tech. Mechanical Engineering with specialization in Automotive",
  "B. Tech Mechanical Engineering with specialization in Manufacturing Engineering (BMM)",
  "B.Tech. Mechanical Engineering with specialization in Robotics",
  "B.Tech - Mechanical Engineering (with specialization in Electric Vehicles)",
  "B. Tech Mechanical Engineering (Specialization in AI and Robotics)",
  "B.Tech. Mechanical Engineering with specialization in Digital Manufacturing",
  "B.Tech. – Mechatronics and Automation",
  "B.Tech-Mechanical Engineering with Specialization in Automotive Design",
  "B. Tech (Civil Engineering)",
  "M. Tech (Software Engineering (5 Year Integrated Programme)",
  "M. Tech 5 year Integrated - (computer science Engineering)",
  "M.Tech 5 year Integrated- (Computer science Engineering with data science)",
  "M.Tech 5 year Integrated -(CSE with Specialization in Business Analytics)",
  "M. Tech 5 year Integrated - (CSE in Artificial Intelligence and Machine Learning)",
  "M.Tech 5 year Integrated – (CSE with Cyber Security)",
  "Integrated M.Tech Computer Science & Engineering (Computational and Data Science)",
  "M. Tech (Computer Science & Engg)",
  "M. Tech (Computer Science & Engg.) Information Security",
  "M. Tech CSE (with Big Data Analytics)",
  "M. Tech (CSE with Specialization in Artificial Intelligence and Machine Learning)",
  "M. Tech (CSE with Specialization in Artificial Intelligence and Data Science)",
  "M. Tech (CSE specialization in Cyber Security and Digital Forensics)",
  "M. Tech (Automotive Electronics)",
  "M.Tech Electronics and Communication Engineering (Intelligent Communication Systems)",
  "M. Tech (VLSI)",
  "M. Tech (Internet of Things and Sensor Systems)",
  "M. Tech (Embedded Systems)",
  "M.Tech(Power Electronics and Drives)",
  "Other"
];

const skillOptions = [
  'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'SQL', 'MongoDB',
  'AWS', 'Docker', 'Git', 'Machine Learning', 'Data Analysis', 'UI/UX Design'
];

const locations = [
  'Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'
];

const domains = [
  'Software Development',
  'Data Analysis',
  'Cybersecurity',
  'Business Analyst',
  'Non-Tech'
];

export function StudentRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    rollNumber: '',
    email: '',
    stream: '',
    customStream: '',
    cgpa: '',
    skills: [],
    customSkills: '',
    jobLocations: [],
    domainPreference: '',
    resume: null
  });

  // Check for authenticated user and pre-fill email
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setFormData(prev => ({
          ...prev,
          name: user.user_metadata?.full_name || user.user_metadata?.name || '',
          email: user.email || ''
        }));
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        setFormData(prev => ({
          ...prev,
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
          email: session.user.email || ''
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleLocationToggle = (location: string) => {
    setFormData(prev => ({
      ...prev,
      jobLocations: prev.jobLocations.includes(location)
        ? prev.jobLocations.filter(l => l !== location)
        : [...prev.jobLocations, location]
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setFormData(prev => ({ ...prev, resume: file }));
      toast({
        title: "Resume uploaded successfully!",
        description: "Your resume has been uploaded and will be parsed for better matching.",
      });
    } else {
      toast({
        title: "Invalid file format",
        description: "Please upload a PDF or Word document.",
        variant: "destructive"
      });
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Registration successful!",
      description: "Welcome to Placed!.ai. We'll start matching you with opportunities right away.",
    });
    // Here you would send the data to your backend
    console.log('Form submitted:', formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-primary">
              <User className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number *</Label>
                <Input
                  id="rollNumber"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  placeholder="Enter your roll number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">VIT Student Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="yourname@vitstudent.ac.in"
                pattern=".*@vitstudent\.ac\.in$"
              />
              <p className="text-xs text-muted-foreground">
                Must be a valid VIT student email (ends with @vitstudent.ac.in)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stream">Stream *</Label>
              <Select value={formData.stream} onValueChange={(value) => handleInputChange('stream', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your stream" />
                </SelectTrigger>
                <SelectContent>
                  {streams.map(stream => (
                    <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.stream === 'Other' && (
              <div className="space-y-2">
                <Label htmlFor="customStream">Specify your stream</Label>
                <Input
                  id="customStream"
                  value={formData.customStream}
                  onChange={(e) => handleInputChange('customStream', e.target.value)}
                  placeholder="Enter your stream"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="cgpa">CGPA *</Label>
              <Input
                id="cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) => handleInputChange('cgpa', e.target.value)}
                placeholder="Enter your CGPA (e.g., 8.5)"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-primary">
              <Code className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Skills & Expertise</h3>
            </div>
            
            <div className="space-y-4">
              <Label>Select your skills (choose all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skillOptions.map(skill => (
                  <Button
                    key={skill}
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSkillToggle(skill)}
                    className="justify-start"
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customSkills">Additional Skills</Label>
              <Textarea
                id="customSkills"
                value={formData.customSkills}
                onChange={(e) => handleInputChange('customSkills', e.target.value)}
                placeholder="List any additional skills, separated by commas"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-primary">
              <MapPin className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <Label>Preferred Job Locations</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {locations.map(location => (
                  <Button
                    key={location}
                    variant={formData.jobLocations.includes(location) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLocationToggle(location)}
                    className="justify-start"
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Domain Preference *</Label>
              <Select value={formData.domainPreference} onValueChange={(value) => handleInputChange('domainPreference', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map(domain => (
                    <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-primary">
              <FileText className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Resume Upload</h3>
            </div>
            
            <div className="space-y-4">
              <Label>Upload your resume (PDF or Word document) *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {formData.resume ? (
                  <div className="flex items-center justify-center space-x-2 text-success">
                    <CheckCircle className="h-6 w-6" />
                    <span className="font-medium">{formData.resume.name}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <Label htmlFor="resume-upload" className="cursor-pointer">
                        <span className="text-primary hover:text-primary-hover">Click to upload</span> or drag and drop
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">PDF or DOCX (max 5MB)</p>
                  </div>
                )}
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              
              <div className="bg-gradient-subtle p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">🤖 AI-Powered Resume Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI will parse your resume to extract skills, experience, and achievements for better job matching and personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="shadow-strong">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl">Student Registration</CardTitle>
            </div>
            <CardDescription>
              Join SimplyPlaced to get matched with the best career opportunities
            </CardDescription>
            
            
            <div className="mt-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderStep()}
            
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep === totalSteps ? (
                <Button
                  variant="gradient"
                  onClick={handleSubmit}
                  disabled={!formData.resume}
                >
                  Complete Registration
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={nextStep}
                >
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}