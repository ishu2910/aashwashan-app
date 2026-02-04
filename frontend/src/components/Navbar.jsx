import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const scrollToSelfHelp = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('self-help-tools');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#self-help-tools';
    }
  };

  return (
    <>
      {/* Top Banner - Free Self Help Tools */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-2">
        <div className="container mx-auto px-4">
          <button 
            onClick={scrollToSelfHelp}
            className="w-full flex items-center justify-center space-x-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Sparkles className="w-4 h-4" />
            <span>Hey! Wanna try our FREE Self-Help Tools?</span>
            <span className="underline">Try Now →</span>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo with Name */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_294a8bf0-85ca-41ba-993d-fcdbbbb03ad2/artifacts/3env23ej_logo.gif" 
                alt="Aashwashan" 
                className="h-14 w-auto"
              />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-600" style={{ fontFamily: "'Playfair Display', serif" }}>Aashwashan</span>
                <span className="text-[10px] text-gray-500 tracking-wider uppercase -mt-1">Mental Health for All</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${isActive('/') ? 'text-blue-600' : ''}`}>
                Home
              </Link>
              <Link to="/about" className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${isActive('/about') ? 'text-blue-600' : ''}`}>
                About Us
              </Link>
              
              <Link to="/resources" className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${isActive('/resources') || isActive('/services') ? 'text-blue-600' : ''}`}>
                Resources
              </Link>

              <Link to="/community" className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${isActive('/community') ? 'text-blue-600' : ''}`}>
                Community
              </Link>

              <Link to="/blog" className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${isActive('/blog') ? 'text-blue-600' : ''}`}>
                Blog
              </Link>
              
              <Link to="/join-team" className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${isActive('/join-team') ? 'text-blue-600' : ''}`}>
                Join Our Team
              </Link>

              <Link to="/contact" className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${isActive('/contact') ? 'text-blue-600' : ''}`}>
                Contact Us
              </Link>
            </div>

            {/* CTA Button */}
            <Link to="/team" className="hidden lg:block bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium">
              Book a Therapist
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                About Us
              </Link>
              <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Resources
              </Link>
              <Link to="/community" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Community
              </Link>
              <Link to="/team" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Our Therapists
              </Link>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Blog
              </Link>
              <Link to="/join-team" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Join Our Team
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Contact Us
              </Link>
              <Link to="/team" onClick={() => setIsMobileMenuOpen(false)} className="block w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all text-center">
                Book a Therapist
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
