import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail } from 'lucide-react';
import { useLocation } from "react-router-dom";
import { toast } from '../hooks/use-toast';
import { services } from '../data/mockData';
import api from "../api";
import SEO from "@/components/SEO";


const API = "https://aashwashan-app-1.onrender.com/api";

const AppointmentPage = () => {
  const location = useLocation();
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  therapist: '',
  service: '',
  date: '',
  time: '',
  message: ''
});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  if (location.state?.therapist) {
    setFormData((prev) => ({
      ...prev,
      therapist: location.state.therapist,
    }));
  }
}, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
  ...formData,
  therapist_name: formData.therapist
};

const response = await api.post(`${API}/appointments`, payload);
      
      toast({
        title: "Appointment Requested!",
        description: "We've received your appointment request. Our team will contact you within 24 hours to confirm. A confirmation email has been sent to your email address.",
      });
      
      setFormData({ name: '', email: '', phone: '',  therapist: '', service: '', date: '', time: '', message: '' });
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your appointment. Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <SEO
  title="Book an Online Therapy Session | Aashwashan"
  description="Schedule your confidential online therapy session with experienced psychologists at Aashwashan."
  keywords="book therapy online, psychologist appointment"
  url="https://aashwashan.com/appointment"
/>
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-teal-600 font-semibold uppercase tracking-wider text-sm mb-4">
  BOOK YOUR FIRST SESSION
</p>

<h3 className="text-4xl lg:text-6xl font-bold mb-6">
  Talk to a Psychologist Who Understands You
</h3>

<p className="text-lg text-gray-600 max-w-2xl mx-auto">
  Private. Confidential. Online. Take the first step towards feeling better—we'll help you find the right psychologist.
</p>
<div className="mt-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-5 py-2 text-sm font-medium text-teal-700">
  <span className="h-2 w-2 rounded-full bg-green-500"></span>
  Confidential • Online • We'll contact you within 24 hours
</div>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                   <div className="space-y-6">
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-600 focus:outline-none transition-colors"
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
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-600 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-semibold mb-2">
                    <Phone className="inline w-4 h-4 mr-2" />Phone Number *
                  </label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-600 focus:outline-none transition-colors"
                    placeholder="+91 8950772282"
                  />
                </div>
                
                <div>
  <label className="block text-sm font-semibold mb-2">
    Select Therapist *
  </label>

  <select
  name="therapist"
  value={formData.therapist}
  onChange={handleChange}
  required
  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-600 focus:outline-none transition-colors"
>
  <option value="">Choose a psychologist...</option>

  <option value="Prakhar Tiwari">Prakhar Tiwari</option>

  <option value="Sonali Mishra">Sonali Mishra</option>

  <option value="Anushka">Anushka</option>

  <option value="Kanika Dhariwal">Kanika Dhariwal</option>
</select>
</div>

                {/* Appointment Details */}
                <div className="mt-6">
                   <div>
                    <label className="block text-sm font-semibold mb-2">Select Service *</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-600 focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-600 focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-600 focus:outline-none transition-colors"
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
                  <label className="block text-sm font-semibold mb-2">What would you like help with?</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-600 focus:outline-none transition-colors resize-none"
                    placeholder="For example: Overthinking, relationship problems, work stress, anxiety, panic attacks... (Optional)"
                  ></textarea>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
  <p className="text-sm text-gray-700 leading-relaxed">
    🔒 <strong>Your privacy matters.</strong> Everything you share stays confidential.
    We'll contact you within 24 hours to confirm your preferred session time.
  </p>
</div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Booking Your Session...' : 'Book My Session'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-12 text-center">What to Expect</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-bold text-lg mb-2">We Reach Out</h3>
                <p className="text-gray-600">Our team will contact you to understand your concern and confirm a suitable time.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-bold text-lg mb-2">Meet Your Psychologist</h3>
                <p className="text-gray-600">Join your confidential online session and speak openly in a safe, judgment-free space.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-bold text-lg mb-2">Your Healing Begins</h3>
                <p className="text-gray-600">We'll continue supporting you even after your first session with resources and guidance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Need Immediate Help?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            If you're experiencing a mental health crisis, please don't wait for an appointment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:08046110007" className="inline-block bg-white text-red-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-lg">
              Tele MANAS: 08046110007
            </a>
            
          </div>
          <p className="mt-6 text-red-100 text-sm max-w-2xl mx-auto leading-relaxed">
  If you or someone you know is in immediate danger, please contact your local emergency services or visit the nearest hospital immediately.
</p>
        </div>
      </section>
    </div>
    </>
  );
};

export default AppointmentPage;