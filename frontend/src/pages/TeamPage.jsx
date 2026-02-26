import React, { useState } from 'react';
import { team } from '../data/mockData';
import { Mail, Phone, X, User, Calendar, Clock, CheckCircle, CreditCard, Video, Copy, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Session duration pricing - Get from therapist data or use defaults
const getSessionPricing = (therapist) => ({
  '45': { duration: '45 minutes', price: parseInt(therapist?.price45 || 999) },
  '60': { duration: '60 minutes', price: parseInt(therapist?.price60 || 1249) }
});

const TeamPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSessionDuration, setSelectedSessionDuration] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const [bookedDate, setBookedDate] = useState('');
  const [bookedTime, setBookedTime] = useState('');
  
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
    setFormData({
      name: '',
      email: '',
      phone: '',
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
    
    if (!selectedSessionDuration) {
      toast({
        title: "Please select a session duration",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    const SESSION_PRICING = getSessionPricing(selectedTherapist);
    const price = SESSION_PRICING[selectedSessionDuration].price;
    
    const appointmentData = {
      ...formData,
      sessionDuration: SESSION_PRICING[selectedSessionDuration].duration,
      price: price,
      service: SESSION_PRICING[selectedSessionDuration].duration,
      message: `Requested therapist: ${selectedTherapist?.name || 'Any'}. Session: ${SESSION_PRICING[selectedSessionDuration].duration}. ${formData.message}`
    };
    
    try {
      await axios.post(`${API}/appointments`, appointmentData);
      setFinalPrice(price);
      setBookedDate(formData.date);
      setBookedTime(formData.time);
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
    // Generate Jitsi meeting link
    const roomName = `aashwashan-${selectedTherapist?.name?.replace(/\s+/g, '-').toLowerCase() || 'session'}-${Date.now().toString(36)}`;
    const jitsiLink = `https://meet.jit.si/${roomName}`;
    setMeetingLink(jitsiLink);
    setIsPaymentModalOpen(false);
    setIsSuccessModalOpen(true);
    toast({
      title: "Booking Confirmed!",
      description: `Your session with ${selectedTherapist?.name} is confirmed.`,
    });
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setMeetingLink('');
    setSelectedTherapist(null);
  };

  return (
    <div>
      {/* Hero Section - TEAL THEME */}
      <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-teal-100 font-medium uppercase tracking-widest text-sm mb-4">OUR TEAM</p>
            <h3 className="text-4xl lg:text-5xl font-semibold mb-6">Meet Our Expert Therapists</h3>
            <p className="text-xl text-white/90">
              Our team of licensed mental health professionals is dedicated to helping you achieve lasting wellness and peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid - TEAL THEME */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-lg">{member.name}</p>
                    <p className="text-teal-200 text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {member.skills && member.skills.map((skill, idx) => (
                      <span key={idx} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{member.experience} experience</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <button
                    onClick={() => openBookingModal(member)}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
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

      {/* Session Pricing Info - TEAL THEME */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-semibold mb-4 text-gray-800">Session Pricing</h3>
            <p className="text-gray-600">Choose a session duration that works for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {Object.entries(SESSION_PRICING).map(([key, value]) => (
              <div key={key} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-teal-100">
                <h4 className="text-2xl font-semibold text-gray-800 mb-2">{key} min</h4>
                <p className="text-3xl font-bold text-teal-600 mb-2">₹{value.price}</p>
                <p className="text-gray-500 text-sm">per session</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA - TEAL THEME */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-6">Want to Join Our Team?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            We're always looking for passionate mental health professionals to join our mission of transforming lives.
          </p>
          <a href="mailto:care@aashwashan.com" className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium shadow-lg">
            View Open Positions
          </a>
        </div>
      </section>

      {/* Booking Modal - TEAL THEME */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-teal-600 font-medium mb-1">✓ 100% Confidential</p>
                <h3 className="text-xl font-semibold">Book Session</h3>
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
                <label className="block text-sm font-medium mb-2">
                  <User className="inline w-4 h-4 mr-2" />Full Name *
                </label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="Your Name"
                  data-testid="booking-name-input"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Mail className="inline w-4 h-4 mr-2" />Email *
                  </label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    data-testid="booking-email-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />Phone *
                  </label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="+91 98765 43210"
                    data-testid="booking-phone-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Select Session Duration *</label>
                <div className="grid grid-cols-3 gap-3" data-testid="session-duration-selector">
                  {Object.entries(SESSION_PRICING).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSessionDuration(key)}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        selectedSessionDuration === key 
                          ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200' 
                          : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                      }`}
                      data-testid={`session-${key}-btn`}
                    >
                      <p className="font-semibold text-lg text-gray-800">{key} min</p>
                      <p className={`text-sm font-semibold ${selectedSessionDuration === key ? 'text-teal-600' : 'text-teal-600'}`}>
                        ₹{value.price}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              {selectedSessionDuration && (
                <div className="bg-teal-50 rounded-xl p-4 border border-teal-100" data-testid="price-summary">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Session Duration:</span>
                    <span className="font-medium">{SESSION_PRICING[selectedSessionDuration].duration}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-teal-200">
                    <span className="font-medium text-lg">Total:</span>
                    <span className="font-bold text-xl text-teal-600">₹{SESSION_PRICING[selectedSessionDuration].price}</span>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />Preferred Date *
                  </label>
                  <input 
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    data-testid="booking-date-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Clock className="inline w-4 h-4 mr-2" />Preferred Time *
                  </label>
                  <select 
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
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
                <label className="block text-sm font-medium mb-2">Do you want to tell more?</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about what brings you here today (optional)..."
                  data-testid="booking-message-textarea"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                data-testid="submit-booking-btn"
              >
                {isSubmitting ? 'Submitting...' : 'Proceed to Payment'}
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
              <h3 className="text-2xl font-semibold mb-2">Pay via UPI</h3>
              <p className="text-gray-600">Safe & Secure Payment</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 mb-6 border border-teal-100">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
                <p className="text-3xl font-bold text-teal-600" data-testid="payment-amount">₹{finalPrice || 999}</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">UPI ID</p>
                <p className="font-mono font-semibold text-lg">aashwashan@upi</p>
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-teal-500 mr-1" /> Secure
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-teal-500 mr-1" /> Instant
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-teal-500 mr-1" /> Easy
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePaymentComplete}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg transition-colors font-medium"
                data-testid="confirm-payment-btn"
              >
                I've Completed Payment
              </button>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
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

      {/* Success Modal with Jitsi Link */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" data-testid="success-modal">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600">Your therapy session has been successfully booked</p>
            </div>

            {/* Session Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Session Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Therapist:</span>
                  <span className="font-medium text-gray-800">{selectedTherapist?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-800">{bookedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium text-gray-800">{bookedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-800">{SESSION_PRICING[selectedSessionDuration]?.duration}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-bold text-teal-600">₹{finalPrice}</span>
                </div>
              </div>
            </div>

            {/* Jitsi Meeting Link */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-6 border border-teal-200">
              <div className="flex items-center space-x-2 mb-3">
                <Video className="w-5 h-5 text-teal-600" />
                <h4 className="font-semibold text-teal-800">Your Video Meeting Link</h4>
              </div>
              <div className="bg-white rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-600 mb-1">Join your session at:</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={meetingLink}
                    readOnly
                    className="flex-1 text-sm font-mono text-teal-700 bg-transparent border-none focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(meetingLink);
                      toast({ title: "Link copied!" });
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                    title="Copy link"
                  >
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-teal-700">
                Save this link! You'll use it to join the video session on your scheduled date and time.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Open Meeting Room</span>
              </a>
              <button
                onClick={closeSuccessModal}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Done
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              A confirmation email has been sent to your email address
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
