import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_294a8bf0-85ca-41ba-993d-fcdbbbb03ad2/artifacts/3env23ej_logo.gif" 
                alt="Aashwashan Logo" 
                className="h-14 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-xl font-semibold">
                  Aashwashan
                </span>
                <span className="text-xs text-teal-400">Mental Health for All</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 font-light leading-relaxed">
              Your journey to mental wellness starts here. We provide compassionate care and professional support for adults seeking mental health treatment.
            </p>
            <div className="flex space-x-3">
              <a href="https://business.facebook.com/latest/home?business_id=2056270781802330&asset_id=961742973689425" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-white/10 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://x.com/Aashwashan_care" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-white/10 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.instagram.com/aashwashan.health/?hl=en" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-white/10 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/aashwashan-mental-health-for-all-5543493a7/" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-white/10 hover:bg-teal-500 rounded-full flex items-center justify-center transition-all duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-teal-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-teal-400 transition-colors font-light">About Us</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-teal-400 transition-colors font-light">Resources</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-teal-400 transition-colors font-light">Meet Our Team</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-teal-400 transition-colors font-light">Community</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-teal-400 transition-colors font-light">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-teal-400 transition-colors font-light">Contact Us</Link></li>
            </ul>
          </div>

          {/* What We Help With */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-teal-400">
              What We Help With
            </h3>
            <ul className="space-y-3">
              <li><Link to="/resources" className="text-gray-400 hover:text-teal-400 transition-colors font-light">Mood Swings</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-teal-400 transition-colors font-light">Anxiety & Stress</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-teal-400 transition-colors font-light">Psychological Distress</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-teal-400 transition-colors font-light">Sleep Disturbances</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-teal-400 transition-colors font-light">Self-Help Tools</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-teal-400">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
                <a 
                  href="https://maps.app.goo.gl/bLPXRW4qLnUtq5U37" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-teal-400 transition-colors font-light"
                >
                  1289/6 Near Market Committee, Ambala City
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <a href="mailto:care@aashwashan.com" className="text-gray-400 hover:text-teal-400 transition-colors font-light">care@aashwashan.com</a>
              </li>
            </ul>

            {/* Map Link */}
            <div className="mt-6">
              <a 
                href="https://maps.app.goo.gl/bLPXRW4qLnUtq5U37" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 border border-teal-500/30 rounded-lg p-4 transition-colors"
              >
                <div className="flex items-center space-x-2 text-teal-400">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">View on Google Maps</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0 font-light">
              © 2025 Aashwashan. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-500 hover:text-teal-400 text-sm transition-colors font-light">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-teal-400 text-sm transition-colors font-light">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
