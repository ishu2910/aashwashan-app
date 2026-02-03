import React, { useState } from 'react';
import { team } from '../data/mockData';
import { Mail, Phone, X, User, Calendar, Clock, CheckCircle, CreditCard } from 'lucide-react';
import axios from 'axios';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Session duration pricing
const SESSION_PRICING = {
  '30': { duration: '30 minutes', price: 999 },
  '45': { duration: '45 minutes', price: 1400 },
  '60': { duration: '60 minutes', price: 1600 }
};

const COUPON_CODE = 'Aashwashan20';
const COUPON_DISCOUNT = 0.20;

const TeamPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Session booking state
  const [selectedSessionDuration, setSelectedSessionDuration] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });

  const openBookingModal = (therapist) => {
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTherapist(null);
    setSelectedSessionDuration('');
    setCouponCode('');
    setCouponApplied(false);
    setCouponError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: ''
    });
  };

  const calculatePrice = () => {
    if (!selectedSessionDuration) return 0;
    const basePrice = SESSION_PRICING[selectedSessionDuration].price;
    if (couponApplied) {
      return Math.round(basePrice * (1 - COUPON_DISCOUNT));
    }
    return basePrice;
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === COUPON_CODE.toUpperCase()) {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
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
    
    if (!selectedSessionDuration) {
      toast({
        title: "Please select a session duration",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const appointmentData = {
      ...formData,
      sessionDuration: SESSION_PRICING[selectedSessionDuration].duration,
      price: calculatePrice(),
      couponApplied: couponApplied,
      service: SESSION_PRICING[selectedSessionDuration].duration,
      message: `Requested therapist: ${selectedTherapist?.name || 'Any'}. Session: ${SESSION_PRICING[selectedSessionDuration].duration}. ${formData.message}`
    };
    
    try {
      await axios.post(`${API}/appointments`, appointmentData);
      setFinalPrice(calculatePrice());
      closeModal();
      setIsPaymentModalOpen(true);
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

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    toast({
      title: "Booking Confirmed!",
      description: `Your session with ${selectedTherapist?.name} is confirmed. We'll contact you shortly.`,
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">OUR TEAM</p>
            <h3 className="text-5xl lg:text-6xl font-bold mb-6">Meet Our Expert Therapists</h3>
            <p className="text-xl text-gray-600">
              Our team of licensed mental health professionals is dedicated to helping you achieve lasting wellness and peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-lg">{member.name}</p>
                    <p className="text-blue-200 text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {member.skills && member.skills.map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{member.experience} experience</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <button
                    onClick={() => openBookingModal(member)}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-medium"
                    data-testid={`book-session-${member.id}`}
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Session Pricing Info */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4">Session Pricing</h3>
            <p className="text-gray-600">Choose a session duration that works for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {Object.entries(SESSION_PRICING).map(([key, value]) => (
              <div key={key} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">{key} min</h4>
                <p className="text-3xl font-bold text-green-600 mb-2">₹{value.price}</p>
                <p className="text-gray-500 text-sm">per session</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-purple-600 font-medium">
              First time user? Use code <span className="font-mono bg-purple-100 px-2 py-1 rounded">Aashwashan20</span> for 20% off!
            </p>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Want to Join Our Team?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for passionate mental health professionals to join our mission of transforming lives.
          </p>
          <a href="mailto:care@aashwashan.com" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg">
            View Open Positions
          </a>
        </div>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-green-600 font-medium mb-1">✓ It is Anonymous</p>
                <h3 className="text-xl font-bold">Book Session</h3>
                {selectedTherapist && (
                  <p className="text-gray-600 text-sm">with {selectedTherapist.name}</p>
                )}
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                data-testid="close-booking-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
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
                  placeholder="Your Name"
                  data-testid="booking-name-input"
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
                    data-testid="booking-email-input"
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
                    data-testid="booking-phone-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Select Session Duration *</label>
                <div className="grid grid-cols-3 gap-3" data-testid="session-duration-selector">
                  {Object.entries(SESSION_PRICING).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSessionDuration(key)}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        selectedSessionDuration === key 
                          ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                      data-testid={`session-${key}-btn`}
                    >
                      <p className="font-bold text-lg text-gray-800">{key} min</p>
                      <p className={`text-sm font-semibold ${selectedSessionDuration === key ? 'text-blue-600' : 'text-green-600'}`}>
                        ₹{value.price}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                <label className="block text-sm font-semibold mb-2">Have a coupon code?</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError('');
                      setCouponApplied(false);
                    }}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
                    data-testid="coupon-input"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    data-testid="apply-coupon-btn"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-green-600 text-sm mt-2 font-medium" data-testid="coupon-success">
                    ✓ Coupon applied! 20% discount added
                  </p>
                )}
                {couponError && (
                  <p className="text-red-600 text-sm mt-2" data-testid="coupon-error">{couponError}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">First time user? Try code: <span className="font-mono font-semibold">Aashwashan20</span></p>
              </div>

              {/* Price Summary */}
              {selectedSessionDuration && (
                <div className="bg-gray-50 rounded-xl p-4" data-testid="price-summary">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Session Duration:</span>
                    <span className="font-semibold">{SESSION_PRICING[selectedSessionDuration].duration}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
                      <span>Original Price:</span>
                      <span className="line-through">₹{SESSION_PRICING[selectedSessionDuration].price}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="font-semibold text-lg">Total:</span>
                    <span className="font-bold text-xl text-green-600">₹{calculatePrice()}</span>
                  </div>
                </div>
              )}

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
                    data-testid="booking-date-input"
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
                    data-testid="booking-time-select"
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
                  data-testid="booking-message-textarea"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                data-testid="submit-booking-btn"
              >
                {isSubmitting ? 'Submitting...' : 'Proceed to Payment'}
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
                <p className="text-3xl font-bold text-green-600" data-testid="payment-amount">₹{finalPrice || 999}</p>
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
                data-testid="confirm-payment-btn"
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

export default TeamPage;
