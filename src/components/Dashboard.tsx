import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProfilePage } from '@/components/ProfilePage';
import { 
  Briefcase, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Building,
  DollarSign,
  Calendar,
  Star,
  FileText,
  Target,
  RefreshCw
} from 'lucide-react';

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'internship';
  matchPercentage: number;
  requirements: string[];
  deadline: string;
  status: 'eligible' | 'action-required' | 'applied' | 'rejected';
}

interface DashboardStats {
  totalMatches: number;
  pendingActions: number;
  applications: number;
  interviews: number;
}

const mockJobMatches: JobMatch[] = [
  {
    id: '1',
    title: 'Software Engineer Intern',
    company: 'Google',
    location: 'Bangalore',
    salary: '₹50,000/month',
    type: 'internship',
    matchPercentage: 95,
    requirements: ['React', 'JavaScript', 'DSA'],
    deadline: '2024-02-15',
    status: 'eligible'
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Microsoft',
    location: 'Hyderabad',
    salary: '₹12-15 LPA',
    type: 'full-time',
    matchPercentage: 88,
    requirements: ['React', 'TypeScript', 'Node.js'],
    deadline: '2024-02-20',
    status: 'action-required'
  },
  {
    id: '3',
    title: 'Data Analyst',
    company: 'Amazon',
    location: 'Mumbai',
    salary: '₹10-12 LPA',
    type: 'full-time',
    matchPercentage: 72,
    requirements: ['Python', 'SQL', 'Excel'],
    deadline: '2024-02-25',
    status: 'applied'
  }
];

const mockStats: DashboardStats = {
  totalMatches: 12,
  pendingActions: 3,
  applications: 8,
  interviews: 2
};

export function Dashboard() {
  const [selectedTab, setSelectedTab] = useState<'matches' | 'applications' | 'profile'>('matches');

  if (selectedTab === 'profile') {
    return <ProfilePage />;
  }

  const getStatusIcon = (status: JobMatch['status']) => {
    switch (status) {
      case 'eligible':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'action-required':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'applied':
        return <Clock className="h-4 w-4 text-primary" />;
      case 'rejected':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusText = (status: JobMatch['status']) => {
    switch (status) {
      case 'eligible':
        return 'Ready to Apply';
      case 'action-required':
        return 'Action Required';
      case 'applied':
        return 'Applied';
      case 'rejected':
        return 'Not Selected';
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-primary';
    if (percentage >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Gautham! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your placement journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profile Completion</p>
                <p className="text-2xl font-bold text-foreground">85%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Job Matches</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.totalMatches}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Applications Sent</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.applications}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interview Calls</p>
                <p className="text-2xl font-bold text-foreground">{mockStats.interviews}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Job Matches Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Job Matches</h2>
          <Button variant="link" className="text-primary">View All</Button>
        </div>

        <div className="space-y-4">
          {mockJobMatches.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company} • {job.location}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-muted-foreground">₹18-12 LPA</span>
                      <Badge variant={job.type === 'internship' ? 'secondary' : 'default'} className="text-xs">
                        {job.type === 'internship' ? 'Internship' : 'Full-time'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-success">{job.matchPercentage}%</div>
                    <div className="text-xs text-muted-foreground">Match Score</div>
                    <div className="w-16 mt-1">
                      <div className="w-full bg-muted rounded-full h-1">
                        <div 
                          className="bg-success h-1 rounded-full transition-all duration-300"
                          style={{ width: `${job.matchPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90">
                    Apply Now
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Email Analysis Dashboard */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Email Analysis Dashboard</h2>
          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Emails
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-muted-foreground">Companies</div>
              <div className="text-xs text-muted-foreground">Direct invitations</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-muted-foreground">External Drives</div>
              <div className="text-xs text-muted-foreground">Off-campus opportunities</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Email Matches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <Building className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-medium">Software Developer - TechCorp</div>
                  <div className="text-sm text-muted-foreground">From: VIT Placement Cell • Match: 95%</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-100 text-green-700 border-green-200">High Match</Badge>
                <Button variant="link" size="sm">View</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Data Analyst Internship</div>
                  <div className="text-sm text-muted-foreground">From: DataFlow Inc • Match: 87%</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Good Match</Badge>
                <Button variant="link" size="sm">View</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Frontend Developer - Remote</div>
                  <div className="text-sm text-muted-foreground">From: External Drive • Match: 92%</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-green-100 text-green-700 border-green-200">High Match</Badge>
                <Button variant="link" size="sm">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}