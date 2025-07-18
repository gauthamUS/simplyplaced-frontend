import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Building,
  TrendingUp,
  ExternalLink,
  RefreshCw,
  Edit3,
  CheckCircle2,
  Mail,
  User
} from 'lucide-react';

interface ProfileData {
  fullName: string;
  rollNumber: string;
  email: string;
  stream: string;
  cgpa: string;
  domainPreference: string;
  customDomain: string;
  preferredLocations: string[];
  skills: string[];
}

const VIT_STREAMS = [
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
  "M. Tech.( Control and Automation)"
];

const AVAILABLE_SKILLS = [
  'JavaScript', 'React', 'Python', 'SQL', 'Java', 'C++', 'Node.js', 'HTML/CSS',
  'Machine Learning', 'Data Analysis', 'Cloud Computing', 'DevOps', 'UI/UX Design',
  'Cybersecurity', 'Blockchain', 'Mobile Development', 'Database Management'
];

const DOMAIN_OPTIONS = [
  'Software Development', 'Data Science', 'Machine Learning', 'Cybersecurity',
  'Cloud Computing', 'Mobile Development', 'Web Development', 'DevOps',
  'UI/UX Design', 'Database Administration', 'Network Administration',
  'Product Management', 'Digital Marketing', 'Business Analytics', 'Others'
];

const LOCATION_OPTIONS = [
  'Bangalore', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai', 'Delhi/NCR',
  'Kolkata', 'Ahmedabad', 'Kochi', 'Coimbatore', 'Remote'
];

export function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'Gautham US',
    rollNumber: '22bce5209',
    email: 'gautham.us2022a@vitstudent.ac.in',
    stream: 'B. Tech (Computer Science & Engg)',
    cgpa: '7.37',
    domainPreference: 'Development',
    customDomain: '',
    preferredLocations: ['Bangalore', 'Mumbai', 'Pune'],
    skills: ['JavaScript', 'React', 'Python', 'SQL']
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) return 'Name is required';
    if (!nameRegex.test(name)) return 'Name can only contain letters and spaces';
    return '';
  };

  const validateRollNumber = (rollNumber: string) => {
    const rollRegex = /^[a-zA-Z0-9]+$/;
    if (!rollNumber.trim()) return 'Roll number is required';
    if (!rollRegex.test(rollNumber)) return 'Roll number can only contain letters and numbers';
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/;
    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email)) return 'Email must be in format: xyz@vitstudent.ac.in';
    return '';
  };

  const validateCGPA = (cgpa: string) => {
    const cgpaValue = parseFloat(cgpa);
    if (!cgpa.trim()) return 'CGPA is required';
    if (isNaN(cgpaValue) || cgpaValue < 0 || cgpaValue > 10) return 'CGPA must be between 0 and 10';
    return '';
  };

  const validateCustomDomain = (customDomain: string) => {
    const domainRegex = /^[a-zA-Z\s]+$/;
    if (!customDomain.trim()) return 'Custom domain is required when Others is selected';
    if (!domainRegex.test(customDomain)) return 'Domain can only contain letters and spaces';
    return '';
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleLocationToggle = (location: string) => {
    setProfileData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(location)
        ? prev.preferredLocations.filter(l => l !== location)
        : [...prev.preferredLocations, location]
    }));
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    
    newErrors.fullName = validateName(profileData.fullName);
    newErrors.rollNumber = validateRollNumber(profileData.rollNumber);
    newErrors.email = validateEmail(profileData.email);
    newErrors.cgpa = validateCGPA(profileData.cgpa);
    
    // Validate custom domain if "Others" is selected
    if (profileData.domainPreference === 'Others') {
      newErrors.customDomain = validateCustomDomain(profileData.customDomain);
    }

    // Remove empty errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsEditing(false);
      toast({
        title: "Profile updated successfully!",
        description: "Your profile information has been saved.",
      });
    }
  };

  const profileCompletion = 85;

  return (
    <div className="bg-background p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="bg-primary hover:bg-primary/90"
        >
          {isEditing ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Save Profile
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">
                {profileData.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{profileData.fullName}</h2>
              <p className="text-muted-foreground">{profileData.rollNumber} • {profileData.stream}</p>
              <div className="mt-3 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Profile Completion:</span>
                  <Progress value={profileCompletion} className="w-32" />
                  <span className="text-sm font-semibold text-primary">{profileCompletion}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              {isEditing ? (
                <div>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={errors.fullName ? 'border-destructive' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                  )}
                </div>
              ) : (
                <p className="text-foreground font-medium">{profileData.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="rollNumber">Roll Number</Label>
              {isEditing ? (
                <div>
                  <Input
                    id="rollNumber"
                    value={profileData.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                    className={errors.rollNumber ? 'border-destructive' : ''}
                  />
                  {errors.rollNumber && (
                    <p className="text-sm text-destructive mt-1">{errors.rollNumber}</p>
                  )}
                </div>
              ) : (
                <p className="text-foreground font-medium">{profileData.rollNumber}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">VIT Email ID <span className="text-destructive">*</span></Label>
              {isEditing ? (
                <div>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                  <div className="flex items-center mt-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span className="text-sm">Connected for email analysis</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-foreground font-medium">{profileData.email}</p>
                  <div className="flex items-center mt-1 text-green-600">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span className="text-sm">Connected for email analysis</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="stream">Stream</Label>
              {isEditing ? (
                <Select value={profileData.stream} onValueChange={(value) => handleInputChange('stream', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your stream" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {VIT_STREAMS.map((stream) => (
                      <SelectItem key={stream} value={stream}>
                        {stream}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-foreground font-medium">{profileData.stream}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cgpa">CGPA</Label>
              {isEditing ? (
                <div>
                  <Input
                    id="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={profileData.cgpa}
                    onChange={(e) => handleInputChange('cgpa', e.target.value)}
                    className={errors.cgpa ? 'border-destructive' : ''}
                  />
                  {errors.cgpa && (
                    <p className="text-sm text-destructive mt-1">{errors.cgpa}</p>
                  )}
                </div>
              ) : (
                <p className="text-foreground font-medium">{profileData.cgpa}</p>
              )}
            </div>

            <div>
              <Label htmlFor="domainPreference">Domain Preference</Label>
              {isEditing ? (
                <div className="space-y-3">
                  <Select 
                    value={profileData.domainPreference} 
                    onValueChange={(value) => {
                      handleInputChange('domainPreference', value);
                      if (value !== 'Others') {
                        handleInputChange('customDomain', '');
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select domain preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {DOMAIN_OPTIONS.map((domain) => (
                        <SelectItem key={domain} value={domain}>
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {profileData.domainPreference === 'Others' && (
                    <div>
                      <Input
                        placeholder="Enter your domain preference"
                        value={profileData.customDomain}
                        onChange={(e) => handleInputChange('customDomain', e.target.value)}
                        className={errors.customDomain ? 'border-destructive' : ''}
                      />
                      {errors.customDomain && (
                        <p className="text-sm text-destructive mt-1">{errors.customDomain}</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-foreground font-medium">
                  {profileData.domainPreference === 'Others' && profileData.customDomain 
                    ? profileData.customDomain 
                    : profileData.domainPreference}
                </p>
              )}
            </div>

            <div>
              <Label>Preferred Location</Label>
              {isEditing ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {LOCATION_OPTIONS.map((location) => (
                    <Badge
                      key={location}
                      variant={profileData.preferredLocations.includes(location) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleLocationToggle(location)}
                    >
                      {location}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-foreground font-medium">{profileData.preferredLocations.join(', ')}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SKILLS.map((skill) => (
                <Badge
                  key={skill}
                  variant={profileData.skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Analysis Dashboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Email Analysis Dashboard</CardTitle>
            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Emails
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-muted-foreground">Placement Cell</div>
                <div className="text-xs text-muted-foreground">New opportunities</div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-muted-foreground">Companies</div>
                <div className="text-xs text-muted-foreground">Direct invitations</div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ExternalLink className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-sm text-muted-foreground">External Drives</div>
                <div className="text-xs text-muted-foreground">Off-campus opportunities</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}