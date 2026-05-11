import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { team } from '../data/mockData';
import { X, Calendar, Clock, CheckCircle, Video, Globe, Shield, Star, BadgeCheck, ChevronDown, ChevronUp, Award, GraduationCap } from 'lucide-react';
import axios from 'axios';
import { toast } from '../hooks/use-toast';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const API = "https://aashwashan-app-1.onrender.com/api";

const getSessionPricing = (therapist) => ({
  '45': { duration: '45 minutes', price: parseInt(therapist?.price45 || 999) },
  ...(therapist?.price60 ? { '60': { duration: '60 minutes', price: parseInt(therapist.price60) } } : {})
});

// Online-only availability data
const availabilityData = {
  1: { languages: ['English', 'Hindi'], rating: 4.8, sessions: 120 },
  2: { languages: ['English', 'Hindi'], rating: 4.9, sessions: 280 },
  3: { languages: ['English', 'Hindi', 'Marathi'], rating: 4.7, sessions: 350 },
};

const TeamPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSessionDuration, setSelectedSessionDuration] = useState('');
  const [expandedBio, setExpandedBio] = useState({});

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', time: '', message: ''
  });

  const openBookingModal = (therapist) => {
    if (!isAuthenticated()) {
      setSelectedTherapist(therapist);
      setShowAuthPrompt(true);
      return;
    }
    setFormData(prev => ({ ...prev, name: user?.name || '', email: user?.email || '' }));
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTherapist(null);
    setSelectedSessionDuration('');
    setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSessionDuration) {
      toast({ title: "Please select a session duration", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    const SESSION_PRICING = getSessionPricing(selectedTherapist);
    const price = SESSION_PRICING[selectedSessionDuration].price;

    try {
      await axios.post('https://aashwashan-app-1.onrender.com/api/appointments/request', {
        ...formData,
        sessionDuration: SESSION_PRICING[selectedSessionDuration].duration,
        price,
        service: SESSION_PRICING[selectedSessionDuration].duration,
        therapist_name: selectedTherapist?.name || 'Any Available',
        message: `Mode: Online. ${formData.message}`
      });
      closeModal();
      toast({
        title: "Request Submitted!",
        description: "We've received your booking request. Our team will contact you within 24 hours to confirm your session.",
      });
    } catch (error) {
      toast({ title: "Error", description: "There was an error submitting your request. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const SESSION_PRICING = selectedTherapist ? getSessionPricing(selectedTherapist) : getSessionPricing({});

  return (
    <div data-testid="team-page">
      {/* Auth Prompt */}
      {showAuthPrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center animate-scale-in shadow-2xl">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Shield className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sign in to book</h3>
            <p className="text-gray-500 text-sm mb-6">
              Create an account to book a session with <strong className="text-teal-600">{selectedTherapist?.name}</strong> and get session reminders.
            </p>
            <Link to="/auth" className="block w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all mb-3">
              Sign Up / Sign In
            </Link>
            <button onClick={() => { setShowAuthPrompt(false); setSelectedTherapist(null); }} className="w-full text-gray-500 py-2 text-sm hover:text-gray-700">
              Maybe Later
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-teal-200 font-medium uppercase tracking-widest text-xs mb-3">MEET OUR EXPERTS</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Find the right therapist for you</h1>
          <p className="text-lg text-white/80">Licensed professionals who create a safe, judgment-free space for your healing journey.</p>
        </div>
      </section>

      {/* Therapist Cards — Amaha Style */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {team.map((member) => {
              const avail = availabilityData[member.id] || availabilityData[1];
              const pricing = getSessionPricing(member);
              const startPrice = Math.min(...Object.values(pricing).map(p => p.price));

              return (
                <div key={member.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300" data-testid={`therapist-card-${member.id}`}>
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* Photo */}
                      <div className="shrink-0">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-teal-100">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                              <BadgeCheck className="w-5 h-5 text-teal-500 shrink-0" />
                            </div>
                            <p className="text-sm text-gray-500">{member.role} &bull; {member.experience}</p>
                          </div>
                          <div className="hidden sm:flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg shrink-0">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-semibold text-amber-700">{avail.rating}</span>
                          </div>
                        </div>

                        {/* Education */}
                        {member.education && (
                          <p className="text-xs text-gray-400 mt-1">{member.education}</p>
                        )}

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {member.skills?.map((skill, idx) => (
                            <span key={idx} className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full border border-teal-100">
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5" />
                            {avail.languages.join(', ')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="w-3.5 h-3.5" />
                            Online Sessions
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-teal-500" />
                            {avail.sessions}+ sessions
                          </span>
                        </div>

                        {/* Bio / Read More */}
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {expandedBio[member.id]
                              ? member.bio
                              : member.bio?.slice(0, 100) + (member.bio?.length > 100 ? '...' : '')}
                          </p>
                          {member.bio?.length > 100 && (
                            <button
                              onClick={() => setExpandedBio(prev => ({ ...prev, [member.id]: !prev[member.id] }))}
                              className="text-teal-600 text-xs font-semibold mt-1 flex items-center gap-0.5 hover:text-teal-800 transition-colors"
                              data-testid={`read-more-${member.id}`}
                            >
                              {expandedBio[member.id] ? <>Show less <ChevronUp className="w-3 h-3" /></> : <>Read more <ChevronDown className="w-3 h-3" /></>}
                            </button>
                          )}
                          {expandedBio[member.id] && (
                            <div className="mt-2 space-y-1.5">
                              {member.credentials && (
                                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  {member.credentials}
                                </p>
                              )}
                              {member.awards?.length > 0 && member.awards.map((award, aidx) => (
                                <p key={aidx} className="text-xs text-gray-500 flex items-center gap-1.5">
                                  <Star className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                  {award}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 pt-4 border-t border-gray-100 gap-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Starts at</p>
                          <p className="text-lg font-bold text-gray-900">
                            <span className="text-teal-600">₹{startPrice}</span>
                            <span className="text-xs font-normal text-gray-400 ml-1">/ session</span>
                          </p>
                        </div>
                        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                        <div className="hidden sm:block">
                          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-200">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            1st Session Free
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => openBookingModal(member)}
                        className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm"
                        data-testid={`book-session-${member.id}`}
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simple message */}
          <div className="max-w-4xl mx-auto mt-10 text-center">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your 1st session is free.</h3>
              <p className="text-gray-600 text-sm sm:text-base">No payment needed. Just pick a therapist, choose a time, and start your journey. All sessions are online.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-3">Want to Join Our Team?</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">We're looking for passionate mental health professionals to join our mission.</p>
          <a href="mailto:care@aashwashan.com" className="inline-block bg-white text-teal-600 px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all">
            View Open Positions
          </a>
        </div>
      </section>

      {/* Booking Modal — Amaha style */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-teal-100">
                    <img src={selectedTherapist?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Book with {selectedTherapist?.name}</h3>
                    <p className="text-xs text-gray-500">{selectedTherapist?.role}</p>
                  </div>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" data-testid="close-booking-modal">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Online Session Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal-700 bg-teal-50 px-4 py-2 rounded-xl border border-teal-100">
                  <Video className="w-4 h-4" />
                  <span className="text-sm font-medium">Online Session</span>
                </div>
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-full border border-green-200">1st Session Free</span>
              </div>

              {/* Session Duration */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Session Duration</label>
                <div className="grid grid-cols-2 gap-3" data-testid="session-duration-selector">
                  {Object.entries(SESSION_PRICING).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSessionDuration(key)}
                      className={`p-4 rounded-xl border-2 text-center transition-all
                        ${selectedSessionDuration === key
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-gray-300'}`}
                      data-testid={`session-${key}-btn`}
                    >
                      <p className="font-bold text-gray-800">{key} min</p>
                      <p className={`text-xl font-bold mt-0.5 ${selectedSessionDuration === key ? 'text-teal-600' : 'text-gray-600'}`}>₹{value.price}</p>
                      {key === '45' && <p className="text-[10px] text-teal-600 font-medium mt-0.5">Most popular</p>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Contact */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Your Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all"
                  placeholder="Full name" data-testid="booking-name-input" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all"
                    placeholder="you@email.com" data-testid="booking-email-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all"
                    placeholder="+91 98765 43210" data-testid="booking-phone-input" />
                </div>
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Preferred Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all"
                    data-testid="booking-date-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Preferred Time</label>
                  <select name="time" value={formData.time} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all"
                    data-testid="booking-time-select">
                    <option value="">Select...</option>
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

              {/* Note */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Anything you'd like to share? <span className="font-normal text-gray-400">(optional)</span></label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="2"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all resize-none"
                  placeholder="Feel free to share what's on your mind..." data-testid="booking-message-textarea" />
              </div>

              {/* Price Summary */}
              {selectedSessionDuration && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100" data-testid="price-summary">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{SESSION_PRICING[selectedSessionDuration].duration} &bull; Online</span>
                    <span className="font-bold text-lg text-gray-900">₹{SESSION_PRICING[selectedSessionDuration].price}</span>
                  </div>
                </div>
              )}

              <button type="submit" disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3.5 rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="submit-booking-btn">
                {isSubmitting ? 'Submitting...' : 'Request Session'}
              </button>

              <p className="text-[11px] text-gray-400 text-center">
                100% confidential. Our team will confirm within 24 hours.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
