import React, { useState } from 'react';
import { MapPin, Mail } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    rating: '',
    feedback: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleFeedbackChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again or email us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    
    try {
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable feedback. We appreciate your input!",
      });
      
      setFeedbackData({ name: '', email: '', rating: '', feedback: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your feedback. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">CONTACT US</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-lg text-gray-600">
              If you need any help, contact us. We're here to answer your questions and provide support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Location</h4>
                    <a 
                      href="https://maps.app.goo.gl/bLPXRW4qLnUtq5U37"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      1289/6 Near Market Committee, Ambala City
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Address</h4>
                    <a href="mailto:care@aashwashan.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                      care@aashwashan.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Map Link */}
              <div className="mt-8">
                <a 
                  href="https://maps.app.goo.gl/bLPXRW4qLnUtq5U37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">View on Google Maps</h4>
                      <p className="text-gray-600">Get directions to our office</p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex space-x-3">
                  <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full inline-block mb-4 text-sm font-medium">
                  ✓ It is Anonymous
                </div>
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Name *</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="Your Name"
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                      data-testid="contact-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="+91 98765 43210"
                      data-testid="contact-phone-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject *</label>
                    <input 
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="How can we help?"
                      data-testid="contact-subject-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Message *</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us more about what you need..."
                      data-testid="contact-message-textarea"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                    data-testid="contact-submit-btn"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold mb-4">Share Your Feedback</h3>
              <p className="text-gray-600">Your suggestions help us improve our services</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full inline-block mb-4 text-sm font-medium">
                ✓ It is Anonymous
              </div>
              <form onSubmit={handleFeedbackSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Name *</label>
                    <input 
                      type="text"
                      name="name"
                      value={feedbackData.name}
                      onChange={handleFeedbackChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="Your Name"
                      data-testid="feedback-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                    <input 
                      type="email"
                      name="email"
                      value={feedbackData.email}
                      onChange={handleFeedbackChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                      data-testid="feedback-email-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Rate Your Experience *</label>
                  <select 
                    name="rating"
                    value={feedbackData.rating}
                    onChange={handleFeedbackChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                    data-testid="feedback-rating-select"
                  >
                    <option value="">Select rating...</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Very Good</option>
                    <option value="3">⭐⭐⭐ Good</option>
                    <option value="2">⭐⭐ Fair</option>
                    <option value="1">⭐ Needs Improvement</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Feedback *</label>
                  <textarea 
                    name="feedback"
                    value={feedbackData.feedback}
                    onChange={handleFeedbackChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                    placeholder="Share your thoughts, suggestions, or concerns..."
                    data-testid="feedback-textarea"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold"
                  data-testid="feedback-submit-btn"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">In Crisis? We're Here 24/7</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            If you're experiencing a mental health emergency or suicidal thoughts, immediate help is available.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="tel:14416" className="inline-block bg-white text-red-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-bold shadow-2xl text-xl">
              Tele MANAS: 14416
            </a>
          </div>
          <p className="mt-6 text-base opacity-90">
            Free, confidential, 24/7 mental health support in your language
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
