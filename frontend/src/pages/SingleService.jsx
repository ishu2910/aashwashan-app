import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { services } from '../data/mockData';

const SingleService = () => {
  const { id } = useParams();
  const service = services.find(s => s.id === parseInt(id));

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services" className="text-blue-600 hover:underline">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <Link to="/services" className="inline-flex items-center text-blue-600 hover:underline mb-8">
            <ArrowLeft className="mr-2 w-5 h-5" /> Back to Services
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-gray-600 mb-8">{service.description}</p>
              <Link to="/appointment" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold">
                Book This Service
              </Link>
            </div>
            <div>
              <img 
                src={service.image} 
                alt={service.title} 
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About This Service</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              {service.fullDescription}
            </p>

            <h3 className="text-2xl font-bold mb-6">What You'll Get</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4">1</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Initial Consultation</h4>
                    <p className="text-gray-600">We'll discuss your concerns, goals, and create a personalized treatment plan.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4">2</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Regular Sessions</h4>
                    <p className="text-gray-600">Attend scheduled therapy sessions and work toward your mental health goals.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0 mr-4">3</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Progress & Growth</h4>
                    <p className="text-gray-600">Track your progress and celebrate achievements as you work toward lasting change.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Other Services You Might Need</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.filter(s => s.id !== service.id).slice(0, 3).map((relatedService) => (
              <Link 
                key={relatedService.id}
                to={`/service/${relatedService.id}`}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">{relatedService.title}</h3>
                <p className="text-gray-600 mb-4">{relatedService.description}</p>
                <span className="text-blue-600 font-semibold">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your {service.title.toLowerCase()} session today and take the first step toward better mental health.
          </p>
          <Link to="/appointment" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SingleService;