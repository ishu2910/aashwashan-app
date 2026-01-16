import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
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
              
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  When You're Ready <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/services" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    All Services
                  </Link>
                  <Link to="/service/1" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    Mood Disorder
                  </Link>
                  <Link to="/service/2" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    Excessive and Persistent Anxiety
                  </Link>
                  <Link to="/service/3" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    Impulsive Behaviour
                  </Link>
                  <Link to="/service/4" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    Combating Low Energy & Fatigue
                  </Link>
                </div>
              </div>

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
              Get Counselling
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
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Services
              </Link>
              <Link to="/team" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Our Team
              </Link>
              <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Subscription Plans
              </Link>
              <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                FAQs
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
                Get Counselling
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;