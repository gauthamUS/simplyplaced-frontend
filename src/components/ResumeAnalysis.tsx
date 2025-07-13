import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Target,
  Lightbulb,
  Download,
  RefreshCw,
  Star,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeScore {
  overall: number;
  sections: {
    contact: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    projects: number;
  };
}

interface Suggestion {
  type: 'critical' | 'important' | 'suggestion';
  section: string;
  title: string;
  description: string;
  example?: string;
}

interface KeywordAnalysis {
  present: string[];
  missing: string[];
  jobRole: string;
}

const mockResumeScore: ResumeScore = {
  overall: 78,
  sections: {
    contact: 95,
    summary: 70,
    experience: 85,
    education: 90,
    skills: 75,
    projects: 65
  }
};

const mockSuggestions: Suggestion[] = [
  {
    type: 'critical',
    section: 'Summary',
    title: 'Add quantifiable achievements',
    description: 'Include specific numbers and metrics to demonstrate your impact.',
    example: 'Instead of "improved performance", write "improved application performance by 40%"'
  },
  {
    type: 'important',
    section: 'Projects',
    title: 'Include project outcomes',
    description: 'Mention the results and impact of your projects.',
    example: 'Added how the project benefited users or increased efficiency'
  },
  {
    type: 'suggestion',
    section: 'Skills',
    title: 'Add trending technologies',
    description: 'Include in-demand skills relevant to your target roles.',
    example: 'Consider adding: Docker, Kubernetes, TypeScript'
  },
  {
    type: 'important',
    section: 'Experience',
    title: 'Use action verbs',
    description: 'Start bullet points with strong action verbs.',
    example: 'Use "Developed", "Implemented", "Optimized" instead of "Was responsible for"'
  }
];

const mockKeywordAnalysis: KeywordAnalysis = {
  jobRole: 'Software Engineer',
  present: ['JavaScript', 'React', 'Node.js', 'Git', 'API Development'],
  missing: ['TypeScript', 'AWS', 'Docker', 'System Design', 'Testing Frameworks']
};

export function ResumeAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'suggestions' | 'keywords'>('overview');
  const { toast } = useToast();

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been re-analyzed with the latest AI improvements.",
      });
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getSuggestionIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'important':
        return <TrendingUp className="h-4 w-4 text-warning" />;
      case 'suggestion':
        return <Lightbulb className="h-4 w-4 text-primary" />;
    }
  };

  const getSuggestionVariant = (type: Suggestion['type']) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'important':
        return 'secondary';
      case 'suggestion':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Resume Analysis</h1>
          <p className="text-muted-foreground">
            Get personalized insights and recommendations to improve your resume
          </p>
        </div>

        {/* Score Overview Card */}
        <Card className="shadow-medium mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <span>Resume Score</span>
                </CardTitle>
                <CardDescription>Overall assessment of your resume quality</CardDescription>
              </div>
              <Button variant="outline" onClick={handleReanalyze} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Re-analyze
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Overall Score */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${mockResumeScore.overall}, 100`}
                      className="text-primary"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-muted"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${getScoreColor(mockResumeScore.overall)}`}>
                      {mockResumeScore.overall}%
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Overall Score</h3>
                <p className="text-sm text-muted-foreground">
                  {mockResumeScore.overall >= 80 ? 'Excellent' : 
                   mockResumeScore.overall >= 60 ? 'Good' : 'Needs Improvement'}
                </p>
              </div>

              {/* Section Scores */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Section Breakdown</h3>
                <div className="space-y-4">
                  {Object.entries(mockResumeScore.sections).map(([section, score]) => (
                    <div key={section} className="flex items-center space-x-4">
                      <div className="w-20 text-sm capitalize text-muted-foreground">
                        {section}
                      </div>
                      <div className="flex-1">
                        <Progress value={score} className="h-2" />
                      </div>
                      <div className={`w-12 text-sm font-medium ${getScoreColor(score)}`}>
                        {score}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'suggestions' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('suggestions')}
          >
            Suggestions
          </Button>
          <Button
            variant={activeTab === 'keywords' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('keywords')}
          >
            Keywords
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-success" />
                  <span className="text-sm">Clear contact information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-success" />
                  <span className="text-sm">Strong technical skills</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-success" />
                  <span className="text-sm">Relevant work experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-success" />
                  <span className="text-sm">Good education background</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Target className="h-5 w-5 text-warning" />
                  <span>Areas to Improve</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Plus className="h-4 w-4 text-warning" />
                  <span className="text-sm">Add more project details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Plus className="h-4 w-4 text-warning" />
                  <span className="text-sm">Include achievement metrics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Plus className="h-4 w-4 text-warning" />
                  <span className="text-sm">Strengthen summary section</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Plus className="h-4 w-4 text-warning" />
                  <span className="text-sm">Add relevant certifications</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Improved Version
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Detailed Report
                </Button>
                <Button variant="gradient" size="sm" className="w-full">
                  Apply Suggestions
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-4">
            {mockSuggestions.map((suggestion, index) => (
              <Card key={index} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getSuggestionIcon(suggestion.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{suggestion.title}</h3>
                        <Badge variant={getSuggestionVariant(suggestion.type)} className="text-xs">
                          {suggestion.section}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{suggestion.description}</p>
                      {suggestion.example && (
                        <div className="bg-gradient-subtle p-3 rounded-lg border-l-4 border-primary">
                          <p className="text-sm text-foreground">
                            <strong>Example:</strong> {suggestion.example}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'keywords' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span>Keywords Present</span>
                </CardTitle>
                <CardDescription>
                  Keywords found in your resume for {mockKeywordAnalysis.jobRole} roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockKeywordAnalysis.present.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="bg-success/10 text-success">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Missing Keywords</span>
                </CardTitle>
                <CardDescription>
                  Important keywords to consider adding for {mockKeywordAnalysis.jobRole} roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockKeywordAnalysis.missing.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="border-warning text-warning">
                      {keyword}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gradient-subtle rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Tip:</strong> Add these keywords naturally throughout your resume in context of your actual experience and projects.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}