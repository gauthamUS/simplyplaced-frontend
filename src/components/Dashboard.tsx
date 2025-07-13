import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Target
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
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Here's your latest placement activity and job matches.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Job Matches</p>
                  <p className="text-2xl font-bold text-foreground">{mockStats.totalMatches}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Actions</p>
                  <p className="text-2xl font-bold text-foreground">{mockStats.pendingActions}</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold text-foreground">{mockStats.applications}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Interviews</p>
                  <p className="text-2xl font-bold text-foreground">{mockStats.interviews}</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={selectedTab === 'matches' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('matches')}
          >
            Job Matches
          </Button>
          <Button
            variant={selectedTab === 'applications' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('applications')}
          >
            Applications
          </Button>
          <Button
            variant={selectedTab === 'profile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('profile')}
          >
            Profile
          </Button>
        </div>

        {/* Job Matches */}
        {selectedTab === 'matches' && (
          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <span>Latest Job Matches</span>
                </CardTitle>
                <CardDescription>
                  AI-powered matches based on your profile and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockJobMatches.map((job) => (
                  <Card key={job.id} className="p-4 hover:shadow-soft transition-all duration-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <Badge variant={job.type === 'internship' ? 'secondary' : 'default'}>
                            {job.type === 'internship' ? 'Internship' : 'Full-time'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Deadline: {job.deadline}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col lg:items-end space-y-3 lg:w-64">
                        <div className="flex items-center space-x-2">
                          <div className="text-right">
                            <div className={`text-xl font-bold ${getMatchColor(job.matchPercentage)}`}>
                              {job.matchPercentage}%
                            </div>
                            <div className="text-xs text-muted-foreground">Match</div>
                          </div>
                          <div className="w-16">
                            <Progress value={job.matchPercentage} className="h-2" />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {getStatusIcon(job.status)}
                          <span className="text-sm">{getStatusText(job.status)}</span>
                        </div>

                        <div className="flex space-x-2">
                          {job.status === 'eligible' && (
                            <Button size="sm" variant="gradient">
                              Apply Now
                            </Button>
                          )}
                          {job.status === 'action-required' && (
                            <Button size="sm" variant="default">
                              Complete Profile
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Applications Tab */}
        {selectedTab === 'applications' && (
          <Card className="shadow-medium">
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Applications Dashboard</h3>
              <p className="text-muted-foreground">Track all your job applications in one place</p>
            </CardContent>
          </Card>
        )}

        {/* Profile Tab */}
        {selectedTab === 'profile' && (
          <Card className="shadow-medium">
            <CardContent className="p-8 text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Profile Analytics</h3>
              <p className="text-muted-foreground">View your profile strength and improvement suggestions</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}