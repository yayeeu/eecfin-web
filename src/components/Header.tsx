
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Who We Are', href: '/who-we-are' },
    { name: 'Our Faith', href: '/our-faith' },
    { name: 'Our Leadership', href: '/our-leadership' },
    { name: 'Events', href: '/events' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Give', href: '/give' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-sm relative z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/5dda826a-06fd-4b4a-bcbe-98b19a84d27f.png" 
              alt="Ethiopian Evangelical Church in Finland"
              className="h-20 w-auto max-w-[300px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-eecfin-gold ${
                  isActivePath(item.href) 
                    ? 'text-eecfin-gold border-b-2 border-eecfin-gold pb-1' 
                    : 'text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth Section */}
            <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-gray-300">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4 text-gray-300" />
                    <span className="text-white">{profile?.name}</span>
                    {profile?.role === 'it' && (
                      <Link to="/admin">
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          Admin
                        </Button>
                      </Link>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 border-t border-gray-600">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActivePath(item.href)
                      ? 'text-eecfin-gold bg-eecfin-gold/10'
                      : 'text-white hover:text-eecfin-gold hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-600">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-300">
                      Signed in as {profile?.name}
                    </div>
                    {profile?.role === 'it' && (
                      <Link
                        to="/admin"
                        className="block px-3 py-2 text-base font-medium text-white hover:text-eecfin-gold hover:bg-white/10 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:text-eecfin-gold hover:bg-white/10 rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-white hover:text-eecfin-gold hover:bg-white/10 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
