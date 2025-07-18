import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { LandingPage } from '@/components/LandingPage';
import { StudentRegistration } from '@/components/StudentRegistration';
import { Dashboard } from '@/components/Dashboard';
import { ResumeAnalysis } from '@/components/ResumeAnalysis';
import { ProfilePage } from '@/components/ProfilePage';
import { Sidebar } from '@/components/Sidebar';

type ViewType = 'landing' | 'register' | 'dashboard' | 'resume' | 'profile' | 'jobs' | 'applications' | 'analytics';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigateToRegister={() => setCurrentView('register')} />;
      case 'register':
        return <StudentRegistration />;
      case 'dashboard':
        return <Dashboard />;
      case 'resume':
        return <ResumeAnalysis />;
      case 'profile':
        return <ProfilePage />;
      case 'jobs':
        return <div className="bg-background p-6"><h1 className="text-2xl font-bold">Job Opportunities</h1><p>Job listings coming soon...</p></div>;
      case 'applications':
        return <div className="bg-background p-6"><h1 className="text-2xl font-bold">My Applications</h1><p>Application tracking coming soon...</p></div>;
      case 'analytics':
        return <div className="bg-background p-6"><h1 className="text-2xl font-bold">Analytics</h1><p>Analytics dashboard coming soon...</p></div>;
      default:
        return <LandingPage onNavigateToRegister={() => setCurrentView('register')} />;
    }
  };

  const showSidebar = isAuthenticated && !['landing', 'register'].includes(currentView);

  return (
    <div className="min-h-screen bg-background">
      {!showSidebar && (
        <Navigation 
          isAuthenticated={isAuthenticated} 
          userName={isAuthenticated ? "Gautham US" : undefined}
        />
      )}
      
      {showSidebar ? (
        <div className="flex h-screen">
          <Sidebar 
            activeView={currentView} 
            onNavigate={(view) => setCurrentView(view as ViewType)}
            userName="Gautham US"
          />
          <div className="flex-1 overflow-auto">
            {renderContent()}
          </div>
        </div>
      ) : (
        renderContent()
      )}
      
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
    </div>
  );
};

export default Index;
