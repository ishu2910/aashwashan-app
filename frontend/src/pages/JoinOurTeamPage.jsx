import React, { useState } from 'react';
import { Mail, Phone, Upload, User, Briefcase } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const JoinOurTeamPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    resume: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. We'll review your application and get back to you soon.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      message: '',
      resume: null
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-base mb-4">CAREERS</p>
            <h3 className="text-5xl lg:text-6xl font-bold mb-6">Join Our Team</h3>
            <p className="text-xl text-gray-600">
              Be part of a mission-driven team making a real difference in mental health care across India.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-12">Why Work With Aashwashan?</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💙</span>
                </div>
                <h4 className="text-xl font-bold mb-3">Meaningful Impact</h4>
                <p className="text-gray-600">Help people transform their lives through quality mental health care</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌱</span>
                </div>
                <h4 className="text-xl font-bold mb-3">Professional Growth</h4>
                <p className="text-gray-600">Continuous learning opportunities and career development</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤝</span>
                </div>
                <h4 className="text-xl font-bold mb-3">Supportive Culture</h4>
                <p className="text-gray-600">Work with passionate professionals in a collaborative environment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold mb-4">Apply to Join Our Team</h3>
              <p className="text-gray-600 text-lg">Fill out the form below and we'll contact you within 24 hours</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Your name"
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
                      placeholder="your.email@example.com"
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
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Briefcase className="inline w-4 h-4 mr-2" />Position Applying For *
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                  >
                    <option value="">Select position...</option>
                    <option value="Clinical Psychologist">Clinical Psychologist</option>
                    <option value="Counseling Psychologist">Counseling Psychologist</option>
                    <option value="Psychiatric Social Worker">Psychiatric Social Worker</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Years of Experience *</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="e.g., 3 years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Upload className="inline w-4 h-4 mr-2" />Upload Resume *
                  </label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                  />
                  <p className="text-sm text-gray-500 mt-2">PDF, DOC, or DOCX (Max 5MB)</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Cover Letter / Additional Information</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us why you'd be a great fit for our team..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-lg"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinOurTeamPage;
