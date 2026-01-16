import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, CheckCircle, Play, Users, Home as HomeIcon, Heart, Clock, ChevronDown, ChevronUp, X, Calendar, User, Mail } from 'lucide-react';
import { services, team, testimonials, faqs } from '../data/mockData';
import axios from 'axios';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Homepage = () => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null);
  const [selectedTherapist, setSelectedTherapist] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const toggleFAQ = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const openBookingModal = (therapist) => {
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  };
  
  const openSymptomModal = (service) => {
    setSelectedService(service);
    setIsSymptomModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTherapist(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      message: ''
    });
  };
  
  const closeSymptomModal = () => {
    setIsSymptomModalOpen(false);
    setSelectedService(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const appointmentData = {
      ...formData,
      message: `Requested therapist: ${selectedTherapist?.name}. ${formData.message}`
    };
    
    try {
      await axios.post(`${API}/appointments`, appointmentData);
      
      toast({
        title: "Appointment Requested!",
        description: `Your appointment request with ${selectedTherapist?.name} has been submitted. We'll contact you within 24 hours.`,
      });
      
      closeModal();
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Booking Header Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Booking a Therapist is now just one step away</h2>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full">
              <p className="text-2xl font-semibold">✓ It is Anonymous</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ignoring Signs Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-red-700">
              Ignoring the signs of mental illness is one of the worst things you can do.
            </h3>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h4 className="text-2xl font-bold mb-4 text-gray-800">Start by noticing, not judging, your emotions</h4>
              <p className="text-gray-700 text-lg leading-relaxed">
                One of the simplest and most powerful practices to begin is turning inward and observing your thoughts and feelings. 
                Anxiety, irritability, sadness and even anger are natural human emotions. What matters is how we relate to them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-base mb-4">HOW WE HELP</p>
            <h3 className="text-5xl lg:text-7xl font-bold mb-6">How We Support You</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experiencing any of these symptoms? Book a therapy session and let us help you find relief and regain control of your life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                  <button
                    onClick={() => openSymptomModal(service)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    How do I know I am going through this?
                  </button>
                </div>
              </div>
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
              <button
                onClick={() => openBookingModal(null)}
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg"
              >
                Book Your Appointment
              </button>
            </div>
            <div className="relative flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600" 
                alt="Support" 
                className="rounded-3xl shadow-2xl w-3/4 lg:w-2/3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-base mb-4">OUR TEAM</p>
            <h3 className="text-5xl lg:text-7xl font-bold mb-6">Meet Our Expert Therapists</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our team of licensed professionals brings years of experience and compassionate care to help you achieve mental wellness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={member.id} className="group" data-aos-delay={index * 100}>
                <div className="relative overflow-hidden rounded-3xl mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm mt-1 mb-3">{member.specialization}</p>
                <button
                  onClick={() => openBookingModal(member)}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-sm"
                >
                  Book Session
                </button>
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

      {/* How Life Feels Better Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-5xl lg:text-7xl font-bold mb-6">How Life Feels Better After Therapy</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Real improvements that make a difference in your daily life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-6xl mb-4">😴</div>
              <h4 className="text-2xl font-bold mb-3">Sleep Better</h4>
              <p className="text-gray-600">Restful nights and peaceful mornings</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-6xl mb-4">🧠</div>
              <h4 className="text-2xl font-bold mb-3">Think Clearer</h4>
              <p className="text-gray-600">Better focus and decision making</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-6xl mb-4">🎈</div>
              <h4 className="text-2xl font-bold mb-3">Feel Lighter</h4>
              <p className="text-gray-600">Less emotional burden, more joy</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-6xl mb-4">✨</div>
              <h4 className="text-2xl font-bold mb-3">Become Yourself Again</h4>
              <p className="text-gray-600">Rediscover who you truly are</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-base mb-4">WHY CHOOSE US</p>
            <h3 className="text-5xl lg:text-7xl font-bold mb-6">Why Aashwashan?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We provide professional, compassionate care that makes a real difference in your mental health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <HomeIcon className="w-10 h-10" />
              </div>
              <h4 className="font-bold text-xl mb-3">From Your Comfort Zone</h4>
              <p className="text-gray-600">Therapy from anywhere you feel safe</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl">
              <div className="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10" />
              </div>
              <h4 className="font-bold text-xl mb-3">Making You Self-Reliant</h4>
              <p className="text-gray-600">Building skills for lifelong wellness</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-3xl">
              <div className="w-20 h-20 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10" />
              </div>
              <h4 className="font-bold text-xl mb-3">Real People. Real Support.</h4>
              <p className="text-gray-600">Genuine care from qualified professionals</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10" />
              </div>
              <h4 className="font-bold text-xl mb-3">Be Yourself Here</h4>
              <p className="text-gray-600">No judgment, just understanding</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-base mb-4">TESTIMONIALS</p>
            <h3 className="text-5xl lg:text-7xl font-bold mb-6">What Our Clients Say</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
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
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">1+</p>
              <p className="text-blue-100">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">100+</p>
              <p className="text-blue-100">Happy Clients</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">5+</p>
              <p className="text-blue-100">Expert Therapists</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-base mb-4">FAQS</p>
            <h3 className="text-5xl lg:text-7xl font-bold mb-6">Frequently Asked Questions</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Find answers to common questions about our mental health services and what to expect.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.slice(0, 6).map((faq, index) => (
              <div 
                key={faq.id} 
                className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left"
                >
                  <h4 className="text-xl font-bold pr-8">{faq.question}</h4>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/faq" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold">
              View All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Crisis Support Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-5xl lg:text-6xl font-bold mb-6">In Crisis? We're Here 24/7</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            If you're experiencing a mental health emergency or suicidal thoughts, immediate help is available. You're not alone.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="tel:14416" className="inline-block bg-white text-red-600 px-10 py-5 rounded-full hover:bg-gray-100 transition-all duration-300 font-bold shadow-2xl text-2xl">
              Tele MANAS: 14416
            </a>
          </div>
          <p className="mt-8 text-lg opacity-90">
            Free, confidential, 24/7 mental health support in your language
          </p>
        </div>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">Book Session</h3>
                {selectedTherapist && (
                  <p className="text-gray-600">with {selectedTherapist.name}</p>
                )}
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  <User className="inline w-4 h-4 mr-2" />Full Name *
                </label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />Email *
                  </label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />Phone *
                  </label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Select Service *</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                >
                  <option value="">Choose a service...</option>
                  {services.map(service => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />Preferred Date *
                  </label>
                  <input 
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Clock className="inline w-4 h-4 mr-2" />Preferred Time *
                  </label>
                  <select 
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                  >
                    <option value="">Select time...</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Additional Information</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about what brings you here today (optional)..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Request Appointment'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Symptom Modal */}
      {isSymptomModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold">{selectedService.title}</h3>
                <p className="text-gray-600">Signs and Symptoms</p>
              </div>
              <button
                onClick={closeSymptomModal}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {selectedService.description}
                </p>
              </div>

              {selectedService.symptoms && (
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-4 text-gray-800">Common Signs & Symptoms:</h4>
                  <div className="grid gap-3">
                    {selectedService.symptoms.map((symptom, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
                <h4 className="text-xl font-bold mb-3 text-gray-800">Ready to Get Help?</h4>
                <p className="text-gray-600 mb-4">
                  If you're experiencing these symptoms, our professional therapists are here to support you.
                </p>
                <button
                  onClick={() => {
                    closeSymptomModal();
                    openBookingModal(null);
                  }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold"
                >
                  Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;