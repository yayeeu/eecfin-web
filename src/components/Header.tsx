
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Who We Are', path: '/who-we-are' },
    { title: 'Events', path: '/events' },
    { title: 'Contact', path: '/contact' },
    { title: 'Get Involved', path: '/get-involved' },
  ];

  return (
    <header className="bg-eecfin-navy py-4 w-full">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/010ebde5-605e-4cfe-b2cc-1caacf7c5734.png" 
              alt="EECFIN Logo" 
              className="h-16 md:h-20"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="nav-link">
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-eecfin-gold p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-eecfin-navy py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="nav-link px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
