import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mail, Heart, Facebook, Instagram, Youtube } from 'lucide-react';
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
    { title: 'Sermons', path: '/sermons' },
    { title: 'Get Involved', path: '/get-involved' },
  ];

  const topNavItems = [
    { title: 'Contact', path: '/contact', icon: <Mail size={16} /> },
    { title: 'Give', path: '/give', icon: <Heart size={16} /> },
  ];

  const socialIcons = [
    { icon: <Facebook size={16} />, url: "https://www.facebook.com/eecfin.media", ariaLabel: "Facebook" },
    { icon: <Instagram size={16} />, url: "https://www.instagram.com/eecfin/", ariaLabel: "Instagram" },
    { icon: <Youtube size={16} />, url: "https://www.youtube.com/@eecfin", ariaLabel: "YouTube" },
  ];

  return (
    <header>
      <div className="bg-eecfin-gold/70 py-1 text-eecfin-navy">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {socialIcons.map((item, index) => (
                <a 
                  key={index} 
                  href={item.url}
                  className="flex items-center text-sm hover:text-eecfin-navy/70 transition-colors"
                  aria-label={item.ariaLabel}
                >
                  {item.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {topNavItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className="flex items-center text-sm hover:text-eecfin-navy/70 transition-colors"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-eecfin-navy py-4 w-full">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/010ebde5-605e-4cfe-b2cc-1caacf7c5734.png" 
                alt="EECFIN Logo" 
                className="h-16 md:h-20"
              />
            </Link>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="nav-link">
                  {item.title}
                </Link>
              ))}
            </nav>

            <button 
              className="md:hidden text-eecfin-gold p-2 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

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
              {topNavItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className="nav-link px-4 py-2 flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.title}
                </Link>
              ))}
              <div className="flex space-x-4 px-4 py-2">
                {socialIcons.map((item, index) => (
                  <a 
                    key={index} 
                    href={item.url}
                    className="text-eecfin-gold hover:text-white transition-colors"
                    aria-label={item.ariaLabel}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
