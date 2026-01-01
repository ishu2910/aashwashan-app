import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/mockData';

const ServicesPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">OUR SERVICES</p>
            <h3 className="text-5xl lg:text-6xl font-bold mb-6">Adult Mental Health Services</h3>
            <p className="text-xl text-gray-600">
              We offer specialized therapy for adults dealing with mood swings, persistent worry, crisis situations, and low energy.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <Link 
                    to={`/service/${service.id}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:underline"
                  >
                    Learn More <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">Why Choose Our Services?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive, compassionate care that puts your mental wellness first.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">100%</div>
              <h4 className="font-bold text-lg mb-2">Confidential</h4>
              <p className="text-gray-600 text-sm">Your privacy is our top priority</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-600 mb-4">24/7</div>
              <h4 className="font-bold text-lg mb-2">Support Available</h4>
              <p className="text-gray-600 text-sm">Crisis support when you need it</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-pink-600 mb-4">15+</div>
              <h4 className="font-bold text-lg mb-2">Years Experience</h4>
              <p className="text-gray-600 text-sm">Proven track record of success</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">98%</div>
              <h4 className="font-bold text-lg mb-2">Success Rate</h4>
              <p className="text-gray-600 text-sm">Clients report positive outcomes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step toward better mental health. Book your appointment today.
          </p>
          <Link to="/appointment" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;