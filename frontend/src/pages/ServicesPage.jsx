import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, X, User, Mail, Phone, Calendar, Clock, CreditCard } from 'lucide-react';
import { services, team } from '../data/mockData';
import axios from 'axios';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ServicesPage = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    helpWith: '',
    therapist: '',
    date: '',
    time: '',
    message: ''
  });

  const openBookingModal = (service) => {
    setSelectedService(service);
    setFormData(prev => ({
      ...prev,
      helpWith: service?.title || ''
    }));
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      helpWith: '',
      therapist: '',
      date: '',
      time: '',
      message: ''
    });
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
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      message: `Help with: ${formData.helpWith}. Preferred therapist: ${formData.therapist || 'Any'}. Time: ${formData.time}. ${formData.message}`
    };
    
    try {
      await axios.post(`${API}/appointments`, appointmentData);
      closeBookingModal();
      setIsPaymentModalOpen(true);
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast({
        title: "Error",
        description: "There was an error. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    toast({
      title: "Session Booked Successfully!",
      description: "We'll contact you within 24 hours to confirm your appointment.",
    });
  };

  return (
    <div>
      {/* Hero Section - Do You Know What? */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Do You Know What?</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <p className="text-xl lg:text-2xl leading-relaxed">
                At Aashwashan, We believe that <span className="font-bold text-yellow-300">high-quality mental health care</span> is not a luxury — <span className="font-bold text-yellow-300">it is your right.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Help With */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">WHEN YOU'RE READY</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">What We Can Help You With</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Whatever you're going through, our expert therapists are here to support you on your journey to better mental health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service) => (
              <div key={service.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-2xl font-bold mb-3 text-gray-800">{service.title}</h4>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  {service.symptoms && service.symptoms.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Common signs:</p>
                      <div className="flex flex-wrap gap-2">
                        {service.symptoms.slice(0, 3).map((symptom, idx) => (
                          <span key={idx} className="bg-white text-gray-600 text-xs px-3 py-1 rounded-full border">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => openBookingModal(service)}
                    className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold"
                    data-testid={`book-service-${service.id}`}
                  >
                    Get Help With This
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Experts Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">Our Expert Therapists</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with qualified professionals who specialize in the areas you need help with.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                <p className="text-gray-500 text-sm mb-3">{member.role}</p>
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {member.skills && member.skills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
                <p className="text-green-600 font-semibold">Rs {member.price}/session</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/team" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold"
            >
              View All Therapists
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Same as Homepage */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">WHY CHOOSE US</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">Why Aashwashan?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              We provide professional, compassionate care that makes a real difference in your mental health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2">From Your Comfort Zone</h4>
              <p className="text-gray-600 text-sm">Therapy from anywhere you feel safe</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2">Making You Self-Reliant</h4>
              <p className="text-gray-600 text-sm">Building skills for lifelong wellness</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2">Real People. Real Support.</h4>
              <p className="text-gray-600 text-sm">Genuine care from qualified professionals</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2">Be Yourself Here</h4>
              <p className="text-gray-600 text-sm">No judgment, just understanding</p>
            </div>
          </div>
        </div>
      </section>
            <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">₹1500</div>
              <h4 className="font-bold mb-1">Affordable</h4>
              <p className="text-gray-600 text-sm">Quality care for all</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">UPI</div>
              <h4 className="font-bold mb-1">Secure Payment</h4>
              <p className="text-gray-600 text-sm">Safe & easy</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Take the First Step?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            It's okay to ask for help. Your mental health matters.
          </p>
          <button 
            onClick={() => openBookingModal(null)}
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg"
            data-testid="book-session-cta"
          >
            Book Your Session
          </button>
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-green-600 font-medium mb-1">✓ It is Anonymous</p>
                <h3 className="text-xl font-bold">Book What You Need Help With</h3>
              </div>
              <button
                onClick={closeBookingModal}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <p className="text-blue-700 text-sm">
                  💙 You're taking a brave step. We're here to support you.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  <User className="inline w-4 h-4 mr-2" />Your Name *
                </label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
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
                    placeholder="your@email.com"
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
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">What would you like help with? *</label>
                <select 
                  name="helpWith"
                  value={formData.helpWith}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                >
                  <option value="">Select what you need help with...</option>
                  {services.map(service => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                  <option value="Other">Something else</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Preferred Therapist (Optional)</label>
                <select 
                  name="therapist"
                  value={formData.therapist}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                >
                  <option value="">Let us match you with the best fit</option>
                  {team.map(member => (
                    <option key={member.id} value={member.name}>{member.name} - {member.skills?.join(', ')}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
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
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Anything else you'd like us to know?</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                  placeholder="Feel free to share anything that might help us serve you better (optional)..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Continue to Payment'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* UPI Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pay via UPI</h3>
              <p className="text-gray-600">Safe & Secure Payment</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
                <p className="text-3xl font-bold text-green-600">Rs 1500</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">UPI ID</p>
                <p className="font-mono font-semibold text-lg">aashwashan@upi</p>
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" /> Secure
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" /> Instant
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" /> Easy
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePaymentComplete}
                className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors font-semibold"
              >
                I've Completed Payment
              </button>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-full hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              UPI is the safest and most secure way to pay in India
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
