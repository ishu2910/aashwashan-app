import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { services } from '../data/mockData';

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Appointment booked:', formData);
    toast({
      title: "Appointment Requested!",
      description: "We've received your appointment request. Our team will contact you within 24 hours to confirm.",
    });
    setFormData({ name: '', email: '', phone: '', service: '', date: '', time: '', message: '' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">BOOK APPOINTMENT</p>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Schedule Your Session</h1>
            <p className="text-xl text-gray-600">
              Take the first step toward better mental health. Book your appointment with one of our experienced therapists.
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
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
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        <Mail className="inline w-4 h-4 mr-2" />Email Address *
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
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />Phone Number *
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

                {/* Appointment Details */}
                <div className="pt-6">
                  <h2 className="text-2xl font-bold mb-6">Appointment Details</h2>
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
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about what brings you here today (optional)..."
                  ></textarea>
                </div>

                <div className="bg-blue-100 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> This is an appointment request. Our team will contact you within 24 hours to confirm your appointment time and answer any questions you may have.
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-lg"
                >
                  Request Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">What to Expect</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-bold text-lg mb-2">Confirmation Call</h3>
                <p className="text-gray-600">We'll call you within 24 hours to confirm your appointment</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-bold text-lg mb-2">Prepare for Session</h3>
                <p className="text-gray-600">We'll send you intake forms and information about your first visit</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-bold text-lg mb-2">Your First Session</h3>
                <p className="text-gray-600">Meet your therapist and begin your journey to wellness</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            If you're experiencing a mental health crisis, please don't wait for an appointment.
          </p>
          <a href="tel:988" className="inline-block bg-white text-red-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-lg">
            Call 988 Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default AppointmentPage;