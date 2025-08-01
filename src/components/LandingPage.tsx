import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Target, 
  FileText, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ArrowRight,
  Brain,
  Shield,
  Clock
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import { GoogleOAuthButton } from '@/components/GoogleOAuthButton';

const features = [
  {
    icon: FileText,
    title: 'Smart Resume Parsing',
    description: 'AI analyzes your resume and extracts key skills, experiences, and achievements for perfect job matching.'
  },
  {
    icon: Target,
    title: 'Intelligent Job Matching',
    description: 'Get matched with opportunities that align with your profile, preferences, and career goals.'
  },
  {
    icon: Zap,
    title: 'Auto-Fill Applications',
    description: 'Save time with automated form filling and instant alerts for action-required applications.'
  },
  {
    icon: TrendingUp,
    title: 'AI Resume Builder',
    description: 'Receive personalized suggestions to improve your resume and increase your chances of selection.'
  },
  {
    icon: Brain,
    title: 'Rejection Analysis',
    description: 'Learn from rejections with detailed feedback on missing keywords and criteria mismatches.'
  },
  {
    icon: Shield,
    title: 'Eligibility Verification',
    description: 'Automatic verification ensures you only see opportunities you are qualified for.'
  }
];

const stats = [
  { number: '95%', label: 'Job Match Accuracy' },
  { number: '10k+', label: 'Students Placed' },
  { number: '85%', label: 'Interview Success Rate' }
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Computer Science, IIT Delhi',
    company: 'Google',
    content: 'SimplyPlaced helped me land my dream internship at Google. The AI matching was incredibly accurate!'
  },
  {
    name: 'Arjun Patel',
    role: 'Electronics Engineering, NIT Surat',
    company: 'Microsoft',
    content: 'The resume feedback feature helped me improve my profile and secure a full-time offer at Microsoft.'
  },
  {
    name: 'Sneha Reddy',
    role: 'Information Technology, VIT',
    company: 'Amazon',
    content: 'Auto-fill feature saved me hours of application time. Got placed at Amazon in my final year!'
  }
];

interface LandingPageProps {
  onNavigateToRegister?: () => void;
}

export function LandingPage({ onNavigateToRegister }: LandingPageProps) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  🚀 AI-Powered Career Platform
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Your Dream Job is Just a{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Match
                  </span>{' '}
                  Away
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  SimplyPlaced uses advanced AI to match students with perfect career opportunities, 
                  automate applications, and provide personalized career guidance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="gradient" className="text-lg px-8" onClick={onNavigateToRegister}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <GoogleOAuthButton size="lg" className="text-lg px-8" />
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">Free for students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">Instant matching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">AI-powered</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/lovable-uploads/08d28ff2-48f7-4f67-95b2-c33779c8cb25.png" 
                  alt="Professional meeting with diverse team members" 
                  className="rounded-lg shadow-strong w-full h-auto"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-primary rounded-lg transform rotate-3 scale-105 -z-10 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-3d-premium">{stat.number}</div>
                <div className="text-primary-foreground/80 text-3d-outline">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Image Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/86a518de-904f-4d6d-bf6a-bdfe70257e2a.png" 
              alt="SimplyPlaced Brand Logo" 
              className="max-w-2xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Everything You Need to{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Land Your Dream Job
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform streamlines your job search with intelligent matching, 
              automated applications, and personalized career guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Get Placed in{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                4 Simple Steps
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Sign Up & Upload Resume',
                description: 'Create your profile and upload your resume for AI analysis'
              },
              {
                step: '02',
                title: 'Complete Your Profile',
                description: 'Add your skills, preferences, and career goals'
              },
              {
                step: '03',
                title: 'Get Matched',
                description: 'Receive AI-powered job matches tailored to your profile'
              },
              {
                step: '04',
                title: 'Apply & Get Hired',
                description: 'Auto-fill applications and track your progress'
              }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-primary-foreground font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              What Our Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-soft">
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <Badge variant="secondary" className="mt-2">
                      Now at {testimonial.company}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Join thousands of students who have successfully placed with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" onClick={onNavigateToRegister}>
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <a href="mailto:contact@simplyplaced.com" className="text-success hover:text-success">
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted border-t">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              © 2024 SimplyPlaced Pvt Ltd. All rights reserved.
            </div>
            <div className="text-xs text-muted-foreground">
              SimplyPlaced® is a registered trademark of SimplyPlaced Pvt Ltd.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}