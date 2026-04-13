import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h3 className="text-9xl font-bold text-blue-600 mb-4">404</h3>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h3>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <h3 className="text-xl font-bold mb-4">Here are some helpful links instead:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/" className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300">
              <Home className="w-5 h-5" />
              <span>Go to Homepage</span>
            </Link>
            <Link to="/services" className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-300">
              <Search className="w-5 h-5" />
              <span>Browse Services</span>
            </Link>
            <Link to="/about" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-300">
              About Us
            </Link>
            <Link to="/contact" className="bg-gray-100 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>

        <p className="text-gray-600">
          Need immediate assistance? <a href="tel:5551234567" className="text-blue-600 font-semibold hover:underline">Call us at (555) 123-4567</a>
        </p>
      </div>
    </div>
  );
};

export default Error404;