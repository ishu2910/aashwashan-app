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
  const [couponCode, setCouponCode] = useState('AASHWASHAN20');
  const [couponApplied, setCouponApplied] = useState(true); // Auto-apply coupon
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

  // Prices shown are AFTER 20% discount (original prices are 25% higher)
  const sessionPricing = [
    { duration: '30 minutes', price: 999, originalPrice: 1249 },
    { duration: '45 minutes', price: 1400, originalPrice: 1750 },
    { duration: '60 minutes', price: 1600, originalPrice: 2000 }
  ];

  const openBookingModal = (duration) => {
    setSelectedDuration(duration);
    setFormData(prev => ({
      ...prev,
      duration: duration?.duration || ''
    }));
    // Auto-apply coupon code
    setFinalPrice(duration?.price || 0);
    setCouponApplied(true);
    setCouponCode('AASHWASHAN20');
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDuration(null);
    setCouponApplied(false);
    setCouponCode('');
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

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'AASHWASHAN20') {
      const discount = selectedDuration.originalPrice * 0.20;
      setFinalPrice(selectedDuration.originalPrice - discount);
      setCouponApplied(true);
      toast({
        title: "Coupon Applied!",
        description: "20% discount has been applied to your session.",
      });
    } else {
      toast({
        title: "Invalid Coupon",
        description: "Please enter a valid coupon code.",
        variant: "destructive"
      });
    }
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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Resources</h1>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Do You Know What?</h2>
              <p className="text-xl leading-relaxed">
                At Aashwashan, We believe that <span className="font-bold text-yellow-300">high-quality mental health care</span> is not a luxury — <span className="font-bold text-yellow-300">it is your right.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">WHAT WE OFFER</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">Our Resources</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access professional help, educational content, and self-care tools designed to support your mental health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2">Expert Psychologists</h4>
              <p className="text-gray-600 text-sm mb-4">Licensed professionals ready to help you</p>
              <Link to="/team" className="text-blue-600 font-medium hover:underline">Meet Our Team →</Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2">Video Sessions</h4>
              <p className="text-gray-600 text-sm mb-4">Secure video consultations from home</p>
              <button onClick={() => openBookingModal(sessionPricing[1])} className="text-purple-600 font-medium hover:underline">Book Session →</button>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2">Self-Help Tools</h4>
              <p className="text-gray-600 text-sm mb-4">Free exercises and techniques</p>
              <Link to="/#self-help-tools" className="text-pink-600 font-medium hover:underline">Try Now →</Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2">Educational Articles</h4>
              <p className="text-gray-600 text-sm mb-4">Learn about mental health</p>
              <Link to="/blog" className="text-green-600 font-medium hover:underline">Read Blog →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Session Pricing */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">Book a Session</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the session duration that works best for you
            </p>
            <div className="mt-4 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              🎉 Coupon AASHWASHAN20 is auto-applied to all sessions!
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sessionPricing.map((session, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 ${index === 1 ? 'ring-2 ring-purple-500 transform scale-105' : ''}`}
              >
                {index === 1 && (
                  <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h4 className="text-2xl font-bold mb-2">{session.duration}</h4>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-blue-600">₹{session.price}</span>
                </div>
                <p className="text-green-600 text-sm mb-4 font-medium">
                  ✓ Coupon AASHWASHAN20 auto-applied!
                </p>
                <ul className="text-gray-600 text-sm space-y-2 mb-6">
                  <li>✓ One-on-one video session</li>
                  <li>✓ Session recording available</li>
                  <li>✓ Post-session notes</li>
                  <li>✓ 100% Confidential</li>
                </ul>
                <button
                  onClick={() => openBookingModal(session)}
                  className={`w-full py-3 rounded-full font-semibold transition-colors ${index === 1 ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Help With */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">What We Can Help You With</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <div key={service.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <button
                    onClick={() => openBookingModal(sessionPricing[1])}
                    className="text-blue-600 font-medium hover:underline text-sm"
                  >
                    Get Help →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Therapists Preview */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">Our Expert Therapists</h3>
            <p className="text-gray-600">Connect with qualified professionals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                <p className="text-gray-500 text-sm mb-3">{member.role}</p>
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {member.skills?.map((skill, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/team" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold">
              View All Therapists
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedDuration && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-green-600 font-medium mb-1">✓ 100% Confidential</p>
                <h3 className="text-xl font-bold">Book Your Session</h3>
                <p className="text-gray-600 text-sm">{selectedDuration.duration} session</p>
              </div>
              <button onClick={closeBookingModal} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Coupon Section */}
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-800 mb-2">Have a coupon code?</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-600 focus:outline-none uppercase"
                    disabled={couponApplied}
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    disabled={couponApplied}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {couponApplied ? 'Applied!' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-green-600 text-sm mt-2">✓ 20% discount applied!</p>
                )}
              </div>

              {/* Price Display */}
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600">Session Price</p>
                <p className="text-3xl font-bold text-blue-600">₹{finalPrice}</p>
                {couponApplied && (
                  <p className="text-sm text-gray-500 line-through">₹{selectedDuration.originalPrice}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  <User className="inline w-4 h-4 mr-2" />Your Name *
                </label>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />Email *
                  </label>
                  <input 
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />Phone *
                  </label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Preferred Therapist (Optional)</label>
                <select 
                  name="therapist" value={formData.therapist} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
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
                    type="date" name="date" value={formData.date} onChange={handleChange} required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Clock className="inline w-4 h-4 mr-2" />Preferred Time *
                  </label>
                  <select 
                    name="time" value={formData.time} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
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

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold text-lg disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting...' : `Continue to Payment (₹${finalPrice})`}
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
                <p className="text-3xl font-bold text-green-600">₹{finalPrice}</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">UPI ID</p>
                <p className="font-mono font-semibold text-lg">aashwashan@upi</p>
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-1" /> Secure</span>
                <span className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-1" /> Instant</span>
              </div>
            </div>

            <div className="space-y-3">
              <button onClick={handlePaymentComplete} className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 font-semibold">
                I've Completed Payment
              </button>
              <button onClick={() => setIsPaymentModalOpen(false)} className="w-full bg-gray-100 text-gray-700 py-3 rounded-full hover:bg-gray-200 font-medium">
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
