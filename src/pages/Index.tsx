import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { LandingPage } from '@/components/LandingPage';
import { StudentRegistration } from '@/components/StudentRegistration';
import { Dashboard } from '@/components/Dashboard';
import { ResumeAnalysis } from '@/components/ResumeAnalysis';

type ViewType = 'landing' | 'register' | 'dashboard' | 'resume';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'register':
        return <StudentRegistration />;
      case 'dashboard':
        return <Dashboard />;
      case 'resume':
        return <ResumeAnalysis />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={isAuthenticated} 
        userName={isAuthenticated ? "Alex Kumar" : undefined}
      />
      
      {/* Navigation Demo Buttons - Remove in production */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
        <button
          onClick={() => setCurrentView('landing')}
          className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary-hover"
        >
          Landing
        </button>
        <button
          onClick={() => setCurrentView('register')}
          className="px-3 py-1 text-xs bg-success text-success-foreground rounded-md hover:bg-accent-hover"
        >
          Register
        </button>
        <button
          onClick={() => {
            setCurrentView('dashboard');
            setIsAuthenticated(true);
          }}
          className="px-3 py-1 text-xs bg-accent text-accent-foreground rounded-md hover:bg-accent-hover"
        >
          Dashboard
        </button>
        <button
          onClick={() => {
            setCurrentView('resume');
            setIsAuthenticated(true);
          }}
          className="px-3 py-1 text-xs bg-warning text-warning-foreground rounded-md hover:bg-warning/90"
        >
          Resume
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default Index;
