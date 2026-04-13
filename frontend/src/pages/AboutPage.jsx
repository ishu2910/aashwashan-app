import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Users, Heart, Target, Lightbulb, Shield } from 'lucide-react';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section - TEAL THEME */}
      <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-teal-100 font-medium uppercase tracking-widest text-sm mb-4">ABOUT AASHWASHAN</p>
            <h1 className="text-4xl lg:text-5xl font-semibold mb-6">Mental Health for All</h1>
            <p className="text-lg text-white/90">
              We pledge to provide high-quality mental health treatment for those who want it, at their comfort zone.
            </p>
          </div>
        </div>
      </section>

      {/* Our Pledge Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=700" 
                alt="Our Story" 
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <p className="text-teal-600 font-medium uppercase tracking-widest text-sm">OUR PLEDGE</p>
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800">Changing How India Sees Mental Health</h2>
              
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
                <p className="text-gray-700 text-lg leading-relaxed">
                  We pledge to provide <span className="font-semibold text-teal-600">High Quality mental health treatment</span> for those who want it at their <span className="font-semibold text-teal-600">Comfort Zone</span>.
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                We believe that if we as a company want to see one change in India, it is to <span className="font-semibold text-gray-800">change the way India sees mental health</span>.
              </p>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-l-4 border-orange-500">
                <p className="text-gray-700 text-lg font-medium">
                  Our Goal: We want to decrease suicide rates in India.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0" />
                  <span className="font-medium">Licensed Professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0" />
                  <span className="font-medium">Evidence-Based Care</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0" />
                  <span className="font-medium">100% Confidential</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0" />
                  <span className="font-medium">Personalized Treatment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - TEAL THEME */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize mental health care in India by making professional therapy accessible, affordable, and free from stigma. We are committed to providing compassionate, culturally-sensitive care that meets our clients where they are.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where seeking mental health support is as natural as visiting a doctor for physical health. We envision an India where mental wellness is prioritized, understood, and accessible to every individual regardless of their background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values - TEAL THEME */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-medium uppercase tracking-widest text-sm mb-4">OUR VALUES</p>
            <h3 className="text-3xl lg:text-4xl font-semibold">Always Improving</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Compassion First</h4>
              <p className="text-gray-600 text-sm">Every interaction is guided by empathy and understanding</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Trust & Privacy</h4>
              <p className="text-gray-600 text-sm">Your confidentiality is our highest priority</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Excellence</h4>
              <p className="text-gray-600 text-sm">We strive for the highest standards in everything we do</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Inclusivity</h4>
              <p className="text-gray-600 text-sm">Mental health care for everyone, without judgment</p>
            </div>
          </div>
        </div>
      </section>

      {/* We're Human Section - TEAL THEME */}
      <section className="py-16 bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-semibold mb-6">We're Human, Just Like You</h3>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              At Aashwashan, we understand that reaching out for help takes courage. Our therapists aren't just professionals — they're compassionate human beings who genuinely care about your well-being. When you visit us, you're not just a client — you're a person with a story that deserves to be heard.
            </p>
            <Link 
              to="/team" 
              className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - TEAL THEME */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-semibold mb-6">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 text-lg mb-8">
              Take the first step towards better mental health today. Our team is here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/team" 
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Book a Session
              </Link>
              <Link 
                to="/contact" 
                className="bg-white border-2 border-teal-500 text-teal-600 px-8 py-4 rounded-lg font-medium hover:bg-teal-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
