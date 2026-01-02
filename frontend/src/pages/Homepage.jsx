import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, CheckCircle, Play, Users, Home as HomeIcon, Heart, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { services, team, testimonials, faqs } from '../data/mockData';

const Homepage = () => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState(0);

  const toggleFAQ = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">FIND BALANCE, EMBRACE LIFE</p>
              <h3 className="text-6xl lg:text-8xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Start with one <br />
                <span className="text-blue-600">honest conversation.</span>"
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Discover clarity, confidence, and emotional wellness through guided support that helps you manage stress, heal from within, and grow stronger in every aspect of your mental health journey.
              </p>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800" 
                alt="Mental Health Professional" 
                className="relative z-10 rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Images */}
            <div className="relative">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573495804664-b1c0849525af?w=600" 
                  alt="Therapy Session" 
                  className="rounded-3xl shadow-xl w-full"
                />
              </div>
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 overflow-hidden rounded-full border-8 border-white shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=300" 
                  alt="Counseling" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">ABOUT US</p>
              <h3 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Journey To Mental Wellness Starts Here
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every small step toward better mental health is a significant achievement in our lives. With the right support, each individual can find the strength to face challenges, manage stress, and build positive habits. We believe that everyone deserves the opportunity to grow, thrive, and experience inner peace. Through an empathetic and professional approach, we are here to help you discover the best solutions for lasting mental and emotional well-being.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold">Free Consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold">Mental Satisfaction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold">Emergency Service</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold">Psychologists Services</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <Link to="/about" className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">HOW WE HELP</p>
            <h3 className="text-5xl lg:text-7xl font-bold mb-6">We Solve These Problems</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experiencing any of these symptoms? Book a therapy session and let us help you find relief and regain control of your life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link 
                key={service.id}
                to={`/service/${service.id}`}
                className="bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <span className="text-blue-600 font-semibold group-hover:underline">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h3 className="text-5xl lg:text-6xl font-bold leading-tight">
                Start Your Healing Journey Today
              </h3>
              <p className="text-white/90 text-lg">
                Take the first step toward better mental health. Our compassionate team is here to support you every step of the way.
              </p>
              <Link to="/appointment" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg">
                Book Your Appointment
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600" 
                alt="Support" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">WHY CHOOSE US</p>
            <h3 className="text-5xl lg:text-7xl font-bold mb-6">Why Aashwashan?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We provide professional, compassionate care that makes a real difference in your mental health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                15+
              </div>
              <h4 className="font-bold text-xl mb-3">Years Experience</h4>
              <p className="text-gray-600">Proven track record in mental health care</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl">
              <div className="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                100%
              </div>
              <h4 className="font-bold text-xl mb-3">Confidential</h4>
              <p className="text-gray-600">Your privacy and trust are our priority</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-3xl">
              <div className="w-20 h-20 bg-pink-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                24/7
              </div>
              <h4 className="font-bold text-xl mb-3">Crisis Support</h4>
              <p className="text-gray-600">Emergency support available anytime</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                50+
              </div>
              <h4 className="font-bold text-xl mb-3">Expert Therapists</h4>
              <p className="text-gray-600">Qualified professionals who care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">OUR TEAM</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">Meet Our Expert Therapists</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of licensed professionals brings years of experience and compassionate care to help you achieve mental wellness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="group">
                <div className="relative overflow-hidden rounded-3xl mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex space-x-3">
                      <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </a>
                      <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm mt-1">{member.specialization}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/team" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold">
              View All Team Members
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">TESTIMONIALS</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">What Our Clients Say</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who found healing and hope through our mental health services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-blue-100">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">2500+</p>
              <p className="text-blue-100">Happy Clients</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50+</p>
              <p className="text-blue-100">Expert Therapists</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">98%</p>
              <p className="text-blue-100">Success Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;