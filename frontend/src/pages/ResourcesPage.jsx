import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, X, User, Mail, Phone, Calendar, Clock, CreditCard, BookOpen, Users, Video, FileText } from 'lucide-react';
import { services, team } from '../data/mockData';
import axios from 'axios';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ResourcesPage = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    duration: '',
    therapist: '',
    date: '',
    time: '',
    message: ''
  });

  // Final session prices (no coupon)
  const sessionPricing = [
    { duration: '30 minutes', price: 999 },
    { duration: '45 minutes', price: 1400 },
    { duration: '60 minutes', price: 1600 }
  ];

  const openBookingModal = (duration) => {
    setSelectedDuration(duration);
    setFormData(prev => ({
      ...prev,
      duration: duration?.duration || ''
    }));
    setFinalPrice(duration?.price || 0);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDuration(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      duration: '',
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
      message: `Duration: ${formData.duration}. Therapist: ${formData.therapist || 'Any'}. Time: ${formData.time}. Price: Rs ${finalPrice}. ${formData.message}`
    };
    
    try {
      await axios.post(`${API}/appointments`, appointmentData);
      closeBookingModal();
      setIsPaymentModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    toast({
      title: "Session Booked!",
      description: "We'll send you the video meeting link within 24 hours.",
    });
  };

  return (
    <div>
      {/* Hero Section - TEAL THEME */}
      <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-teal-100 font-medium uppercase tracking-widest text-sm mb-4">RESOURCES</p>
            <h1 className="text-4xl lg:text-5xl font-semibold mb-6">Resources</h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border border-white/20">
              <h2 className="text-2xl font-semibold mb-4">Do You Know What?</h2>
              <p className="text-xl leading-relaxed text-white/90">
                At Aashwashan, We believe that <span className="font-semibold text-yellow-300">high-quality mental health care</span> is not a luxury — <span className="font-semibold text-yellow-300">it is your right.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories - TEAL THEME */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-medium uppercase tracking-widest text-sm mb-3">WHAT WE OFFER</p>
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800">Our Resources</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access professional help, educational content, and self-care tools designed to support your mental health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Expert Psychologists</h4>
              <p className="text-gray-600 text-sm mb-4">Licensed professionals ready to help you</p>
              <Link to="/team" className="text-teal-600 font-medium hover:underline">Meet Our Team →</Link>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Video Sessions</h4>
              <p className="text-gray-600 text-sm mb-4">Secure video consultations from home</p>
              <button onClick={() => openBookingModal(sessionPricing[1])} className="text-teal-600 font-medium hover:underline">Book Session →</button>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Self-Help Tools</h4>
              <p className="text-gray-600 text-sm mb-4">Free exercises and techniques</p>
              <Link to="/#self-help-tools" className="text-teal-600 font-medium hover:underline">Try Now →</Link>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Educational Articles</h4>
              <p className="text-gray-600 text-sm mb-4">Learn about mental health</p>
              <Link to="/blog" className="text-teal-600 font-medium hover:underline">Read Blog →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Session Pricing - TEAL THEME (No Coupon) */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800">Book a Session</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the session duration that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sessionPricing.map((session, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border ${index === 1 ? 'border-teal-500 ring-2 ring-teal-200 transform scale-105' : 'border-gray-100'}`}
              >
                {index === 1 && (
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h4 className="text-2xl font-semibold mb-2 text-gray-800">{session.duration}</h4>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-teal-600">₹{session.price}</span>
                </div>
                <ul className="text-gray-600 text-sm space-y-2 mb-6">
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-teal-500 mr-2" />
                    One-on-one video session
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-teal-500 mr-2" />
                    Session recording available
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-teal-500 mr-2" />
                    Post-session notes
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-teal-500 mr-2" />
                    100% Confidential
                  </li>
                </ul>
                <button
                  onClick={() => openBookingModal(session)}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${index === 1 ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-lg' : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-lg'}`}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Help With - TEAL THEME */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800">What We Can Help You With</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <div key={service.id} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-teal-100">
                <div className="h-40 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">{service.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <button
                    onClick={() => openBookingModal(sessionPricing[1])}
                    className="text-teal-600 font-medium hover:underline text-sm"
                  >
                    Get Help →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Therapists Preview - TEAL THEME */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800">Our Expert Therapists</h3>
            <p className="text-gray-600">Connect with qualified professionals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-1 text-gray-800">{member.name}</h4>
                <p className="text-gray-500 text-sm mb-3">{member.role}</p>
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {member.skills?.map((skill, idx) => (
                    <span key={idx} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/team" className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-medium">
              View All Therapists
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal - TEAL THEME (No Coupon) */}
      {isBookingModalOpen && selectedDuration && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-teal-600 font-medium mb-1">✓ 100% Confidential</p>
                <h3 className="text-xl font-semibold text-gray-800">Book Your Session</h3>
                <p className="text-gray-600 text-sm">{selectedDuration.duration} session</p>
              </div>
              <button onClick={closeBookingModal} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Price Display */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 text-center border border-teal-100">
                <p className="text-sm text-gray-600">Session Price</p>
                <p className="text-3xl font-bold text-teal-600">₹{finalPrice}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  <User className="inline w-4 h-4 mr-2" />Your Name *
                </label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Mail className="inline w-4 h-4 mr-2" />Email *
                  </label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Phone className="inline w-4 h-4 mr-2" />Phone *
                  </label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Preferred Therapist (Optional)</label>
                <select 
                  name="therapist" value={formData.therapist} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                >
                  <option value="">Let us match you with the best fit</option>
                  {team.map(member => (
                    <option key={member.id} value={member.name}>{member.name} - {member.skills?.join(', ')}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Calendar className="inline w-4 h-4 mr-2" />Preferred Date *
                  </label>
                  <input 
                    type="date" name="date" value={formData.date} onChange={handleChange} required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    <Clock className="inline w-4 h-4 mr-2" />Preferred Time *
                  </label>
                  <select 
                    name="time" value={formData.time} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
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
                <label className="block text-sm font-medium mb-2 text-gray-700">Do you want to tell more? (Optional)</label>
                <textarea 
                  name="message" value={formData.message} onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about what brings you here today..."
                ></textarea>
              </div>

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium text-lg disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting...' : `Continue to Payment (₹${finalPrice})`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* UPI Payment Modal - TEAL THEME */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">Pay via UPI</h3>
              <p className="text-gray-600">Safe & Secure Payment</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 mb-6 border border-teal-100">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
                <p className="text-3xl font-bold text-teal-600">₹{finalPrice}</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">UPI ID</p>
                <p className="font-mono font-semibold text-lg">aashwashan@upi</p>
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-1" /> Secure</span>
                <span className="flex items-center"><CheckCircle className="w-4 h-4 text-teal-500 mr-1" /> Instant</span>
              </div>
            </div>

            <div className="space-y-3">
              <button onClick={handlePaymentComplete} className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg font-medium">
                I've Completed Payment
              </button>
              <button onClick={() => setIsPaymentModalOpen(false)} className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
