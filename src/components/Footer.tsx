
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');

  // For admin pages, just show the copyright footer
  if (isAdminPage) {
    return (
      <footer className="bg-eecfin-navy text-white py-4">
        <div className="container-custom">
          <div className="text-center text-sm">
            <p>&copy; {currentYear} Ethiopian Evangelical Church in Finland. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }

  // For non-admin pages, show the full footer
  return (
    <footer className="bg-eecfin-navy text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-eecfin-gold text-xl font-semibold mb-4">Ethiopian Evangelical Church in Finland</h3>
            <p className="mb-2 flex items-center">
              <MapPin size={18} className="mr-2 text-eecfin-gold" />
              <span>Keinulaudankuja 4 B, 00940 Helsinki, Finland</span>
            </p>
            <p className="mb-2 flex items-center">
              <Phone size={18} className="mr-2 text-eecfin-gold" />
              <span>+358 XX XXX XXXX</span>
            </p>
            <p className="flex items-center">
              <Mail size={18} className="mr-2 text-eecfin-gold" />
              <span>info@eecfin.org</span>
            </p>
          </div>

          <div>
            <h3 className="text-eecfin-gold text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-eecfin-gold transition-colors">Home</Link></li>
              <li><Link to="/who-we-are" className="hover:text-eecfin-gold transition-colors">Who We Are</Link></li>
              <li><Link to="/events" className="hover:text-eecfin-gold transition-colors">Events</Link></li>
              <li><Link to="/contact" className="hover:text-eecfin-gold transition-colors">Contact</Link></li>
              <li><Link to="/get-involved" className="hover:text-eecfin-gold transition-colors">Get Involved</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-eecfin-gold text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.facebook.com/eecfin.media" className="text-white hover:text-eecfin-gold transition-colors" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="https://www.instagram.com/eecfin/" className="text-white hover:text-eecfin-gold transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://www.youtube.com/@eecfin" className="text-white hover:text-eecfin-gold transition-colors" aria-label="YouTube">
                <Youtube size={24} />
              </a>
            </div>
            <p className="text-sm">
              Join us for worship every Sunday at 10:00 AM.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {currentYear} Ethiopian Evangelical Church in Finland. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
