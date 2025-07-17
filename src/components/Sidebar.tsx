import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  User, 
  Briefcase, 
  FileText, 
  BarChart3,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  userName?: string;
}

export function Sidebar({ activeView, onNavigate, userName }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'jobs', label: 'Job Opportunities', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'resume', label: 'Resume Builder', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: Building2 },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-background border-r border-border transition-all duration-300 z-40",
        "md:relative md:translate-x-0",
        isCollapsed ? "translate-x-0 w-64" : "-translate-x-full w-64",
        "md:w-64"
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">SimplyPlaced!</h2>
              <p className="text-xs text-muted-foreground">Smart Student Placement</p>
            </div>
          </div>
        </div>

        {/* User info */}
        {userName && (
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {userName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                <p className="text-xs text-muted-foreground">Student</p>
              </div>
              <div className="w-3 h-3 bg-success rounded-full"></div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10 px-3",
                    isActive && "bg-primary text-primary-foreground shadow-sm"
                  )}
                  onClick={() => onNavigate(item.id)}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
}