import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Menu, X, User, Bell, Settings } from 'lucide-react';

interface NavigationProps {
  isAuthenticated?: boolean;
  userName?: string;
}

export function Navigation({ isAuthenticated = false, userName }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-black font-helvetica text-foreground">SimplyPlaced</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <a href="#dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </a>
                <a href="#jobs" className="text-foreground hover:text-primary transition-colors">
                  Job Matches
                </a>
                <a href="#resume" className="text-foreground hover:text-primary transition-colors">
                  Resume
                </a>
                <a href="#profile" className="text-foreground hover:text-primary transition-colors">
                  Profile
                </a>
              </>
            ) : (
              <>
                <a href="#features" className="text-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors">
                  About
                </a>
              </>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{userName || 'Student'}</span>
                </div>
              </div>
            ) : (
              <>
                <Button variant="ghost">Sign In</Button>
                <Button variant="gradient">Get Started</Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <a href="#dashboard" className="block px-3 py-2 text-foreground hover:text-primary">
                  Dashboard
                </a>
                <a href="#jobs" className="block px-3 py-2 text-foreground hover:text-primary">
                  Job Matches
                </a>
                <a href="#resume" className="block px-3 py-2 text-foreground hover:text-primary">
                  Resume
                </a>
                <a href="#profile" className="block px-3 py-2 text-foreground hover:text-primary">
                  Profile
                </a>
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{userName || 'Student'}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <a href="#features" className="block px-3 py-2 text-foreground hover:text-primary">
                  Features
                </a>
                <a href="#how-it-works" className="block px-3 py-2 text-foreground hover:text-primary">
                  How It Works
                </a>
                <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary">
                  About
                </a>
                <div className="pt-4 space-y-2 border-t">
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                  <Button variant="gradient" className="w-full">
                    Get Started
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}