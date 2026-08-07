import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ClipboardCheck } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  
  const navigate = useNavigate();
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
      // Navigate to homepage first, then scroll after render
      navigate('/');
      // Use a timeout to wait for React to render the homepage
      setTimeout(() => {
        const element = document.getElementById('self-help-tools');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  };

  return (
    <>
      {/* Top Banner - Orange Theme */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2.5 overflow-hidden">
  <button
    onClick={scrollToSelfHelp}
    className="group w-full overflow-hidden"
  >
    <div className="flex items-center justify-center gap-2 animate-pulse-soft">

      <div className="flex animate-top-banner whitespace-nowrap">
  {Array.from({ length: 8 }).map((_, i) => (
  <div
    key={i}
    className="flex items-center gap-2 mx-10 flex-shrink-0"
  >
    <Sparkles className="w-4 h-4 animate-pulse" />

    <span className="text-sm font-medium">
      Hey! Wanna try our <strong>FREE Self-Help Tools?</strong>
    </span>

    <span className="underline font-semibold">
      Try Now →
    </span>
  </div>
))}
</div>

    </div>
  </button>
</div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-5">
            {/* Logo with Name */}
            <Link to="/" className="flex items-center gap-4 group">
              <div className="h-[88px] w-[88px] lg:h-[108px] lg:w-[108px] flex items-center justify-center">
                <img
  src="https://res.cloudinary.com/qqjn11uq/image/upload/v1786124404/Untitled_1587_x_1245_px_700_x_800_px_or1v1b.png" 
                  alt="Aashwashan" 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[32px] lg:text-[40px] font-bold text-teal-600" style={{ fontFamily: "'Playfair Display', serif" }}>Aashwashan</span>
                <span className="text-xs lg:text-sm text-gray-500 tracking-wider uppercase -mt-1">A Safe Place to Start</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={`text-gray-700 hover:text-teal-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all
after:duration-300
after:ease-out hover:after:w-full ${isActive('/') ? 'text-teal-600 after:w-full pb-1' : ''}`}>
                Home
              </Link>
              <Link to="/about" className={`text-gray-700 hover:text-teal-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all
after:duration-300
after:ease-out hover:after:w-full ${isActive('/about') ? 'text-teal-600 after:w-full pb-1' : ''}`}>
                About Us
              </Link>
              
              <Link to="/resources" className={`text-gray-700 hover:text-teal-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all
after:duration-300
after:ease-out hover:after:w-full ${isActive('/resources') ? 'text-teal-600 after:w-full pb-1' : ''}`}>
                Resources
              </Link>

              <Link to="/community" className={`text-gray-700 hover:text-teal-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all
after:duration-300
after:ease-out hover:after:w-full ${isActive('/community') ? 'text-teal-600 after:w-full pb-1' : ''}`}>
                Community
              </Link>

              <Link to="/blog" className={`text-gray-700 hover:text-teal-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all
after:duration-300
after:ease-out hover:after:w-full ${isActive('/blog') ? 'text-teal-600 after:w-full pb-1' : ''}`}>
                Blog
              </Link>
              
              <Link to="/join-team" className={`text-gray-700 hover:text-teal-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all
after:duration-300
after:ease-out hover:after:w-full ${isActive('/join-team') ? 'text-teal-600 after:w-full pb-1' : ''}`}>
                Join Our Team
              </Link>

              <Link to="/contact" className={`text-gray-700 hover:text-teal-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all hover:after:w-full ${isActive('/contact') ? 'text-teal-600 after:w-full pb-1' : ''}`}>
                Contact Us
              </Link>
            </div>

            {/* CTA Button - Changed to Take Assessment */}
            <Link 
              to="/self-assessment" 
              className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-full hover:shadow-xl hover:scale-[1.03]
hover:-translate-y-1 transition-all duration-300 font-medium group"
            >
              <ClipboardCheck className="w-5 h-5 group-hover:animate-bounce" />
              <span>Take Assessment</span>
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
          <div className="lg:hidden bg-white border-t animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-teal-600">
                Home
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-teal-600">
                About Us
              </Link>
              <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-teal-600">
                Resources
              </Link>
              <Link to="/community" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-teal-600">
                Community
              </Link>
              <Link to="/team" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-teal-600">
                Our Therapists
              </Link>
              <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-teal-600">
                Blog
              </Link>
              <Link to="/join-team" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-teal-600">
                Join Our Team
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-teal-600">
                Contact Us
              </Link>
              <Link to="/self-assessment" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all">
                <ClipboardCheck className="w-5 h-5" />
                <span>Take Assessment</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
