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
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2.5 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span>Office Time : Mon - Fri 8:00 - 6:30</span>
              <span className="text-white/80">|</span>
              <span>123 Serenity Lane, Blissfield, CA 90210</span>
            </div>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_294a8bf0-85ca-41ba-993d-fcdbbbb03ad2/artifacts/3env23ej_logo.gif" 
                alt="Aashwashan" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${isActive('/') ? 'text-blue-600' : ''}`}>
                Homepage
              </Link>
              <Link to="/about" className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${isActive('/about') ? 'text-blue-600' : ''}`}>
                About Us
              </Link>
              
              {/* Services Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Services <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/services" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    All Services
                  </Link>
                  <Link to="/service/1" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    Individual Therapy
                  </Link>
                  <Link to="/service/2" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    Couples Counseling
                  </Link>
                </div>
              </div>

              {/* Pages Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Pages <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/team" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    Our Team
                  </Link>
                  <Link to="/pricing" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    Pricing
                  </Link>
                  <Link to="/faq" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    FAQs
                  </Link>
                  <Link to="/blog" className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-blue-600 transition-colors">
                    Blog
                  </Link>
                </div>
              </div>

              <Link to="/contact" className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${isActive('/contact') ? 'text-blue-600' : ''}`}>
                Contact Us
              </Link>
            </div>

            {/* CTA Button */}
            <Link to="/appointment" className="hidden lg:block bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium">
              Get Quotes
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
                Homepage
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
                Pricing
              </Link>
              <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                FAQs
              </Link>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Blog
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-blue-600">
                Contact Us
              </Link>
              <Link to="/appointment" onClick={() => setIsMobileMenuOpen(false)} className="block w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all text-center">
                Get Quotes
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;