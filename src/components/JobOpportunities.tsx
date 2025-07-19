import { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  postedTime: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  skills: string[];
  matchScore: number;
  autoFill?: boolean;
}

const mockJobs: JobOpportunity[] = [
  {
    id: '1',
    title: 'Software Developer',
    company: 'TechCorp',
    location: 'Bangalore',
    postedTime: '2 days ago',
    salary: '₹8-12 LPA',
    type: 'Full-time',
    skills: ['JavaScript', 'React', 'Node.js'],
    matchScore: 95,
    autoFill: true
  },
  {
    id: '2',
    title: 'Data Analyst Intern',
    company: 'DataFlow Inc',
    location: 'Mumbai',
    postedTime: '1 day ago',
    salary: '₹25k/month',
    type: 'Internship',
    skills: ['Python', 'SQL', 'Excel'],
    matchScore: 87,
    autoFill: true
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'WebSolutions',
    location: 'Pune',
    postedTime: '3 days ago',
    salary: '₹6-10 LPA',
    type: 'Full-time',
    skills: ['React', 'CSS', 'JavaScript'],
    matchScore: 92
  },
  {
    id: '4',
    title: 'Cybersecurity Analyst',
    company: 'SecureNet',
    location: 'Hyderabad',
    postedTime: '4 days ago',
    salary: '₹10-15 LPA',
    type: 'Full-time',
    skills: ['Security', 'Network', 'Incident Response'],
    matchScore: 78
  },
  {
    id: '5',
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    location: 'Delhi',
    postedTime: '1 week ago',
    salary: '₹7-11 LPA',
    type: 'Full-time',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    matchScore: 84
  },
  {
    id: '6',
    title: 'Backend Developer',
    company: 'CloudTech',
    location: 'Chennai',
    postedTime: '5 days ago',
    salary: '₹9-14 LPA',
    type: 'Full-time',
    skills: ['Python', 'Django', 'AWS'],
    matchScore: 89
  }
];

const getMatchColor = (score: number) => {
  if (score >= 90) return 'text-success';
  if (score >= 80) return 'text-warning';
  return 'text-muted-foreground';
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Full-time':
      return 'bg-primary text-primary-foreground';
    case 'Internship':
      return 'bg-success text-success-foreground';
    case 'Part-time':
      return 'bg-warning text-warning-foreground';
    case 'Contract':
      return 'bg-secondary text-secondary-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const JobOpportunities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobType, setJobType] = useState('All Types');
  const [jobs] = useState<JobOpportunity[]>(mockJobs);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = jobType === 'All Types' || job.type === jobType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Company Icon */}
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-6 w-6 text-primary-foreground" />
                    </div>

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            {job.autoFill && (
                              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                                Auto-fill
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">{job.company} • {job.location}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.postedTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </div>
                            <Badge className={getTypeColor(job.type)}>
                              {job.type}
                            </Badge>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Match Score and Actions */}
                  <div className="flex flex-col items-end gap-4 ml-6">
                    {/* Match Score */}
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Match Score</div>
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-muted/20"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - job.matchScore / 100)}`}
                            className={getMatchColor(job.matchScore)}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-sm font-semibold ${getMatchColor(job.matchScore)}`}>
                            {job.matchScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 w-32">
                      <Button className="w-full">
                        {job.matchScore >= 90 ? 'Quick Apply' : 'Apply Now'}
                      </Button>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};