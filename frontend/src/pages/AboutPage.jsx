import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Users, Heart, Target, Lightbulb, Shield } from 'lucide-react';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">ABOUT AASHWASHAN</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Mental Health for All</h1>
            <p className="text-lg text-gray-600">
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
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">OUR PLEDGE</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Changing How India Sees Mental Health</h2>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  We pledge to provide <span className="font-semibold text-blue-600">High Quality mental health treatment</span> for those who want it at their <span className="font-semibold text-blue-600">Comfort Zone</span>.
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                We believe that if we as a company want to see one change in India, it is to <span className="font-bold text-gray-800">change the way India sees mental health</span>.
              </p>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-l-4 border-red-500">
                <p className="text-gray-700 text-lg font-semibold">
                  🎯 Our Goal: We want to decrease suicide rates in India.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold">Licensed Professionals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold">Evidence-Based Care</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold">100% Confidential</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold">Personalized Treatment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To make quality mental health care accessible, compassionate, and effective for everyone in India. We are committed to creating a safe, supportive environment where every person feels heard, valued, and understood - without any judgment.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where mental health is prioritized, stigma is eliminated, and everyone has access to the support they need to thrive emotionally and mentally. We envision an India where seeking mental health support is as normal as visiting a doctor for physical health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">OUR VALUES</p>
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">What We Stand For</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do and shape the compassionate care we provide.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Compassion</h3>
              <p className="text-gray-600 text-sm">
                We approach every client with empathy, kindness, and genuine care.
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600 text-sm">
                We maintain the highest standards through continuous learning.
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Respect</h3>
              <p className="text-gray-600 text-sm">
                We honor each person's unique journey in a judgment-free space.
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust</h3>
              <p className="text-gray-600 text-sm">
                Your privacy and confidentiality are our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">Why Choose Aashwashan?</h3>
            <p className="text-white/90 max-w-2xl mx-auto">
              We offer comprehensive mental health services backed by experience, expertise, and genuine care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1+</div>
              <p className="text-white/80">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3+</div>
              <p className="text-white/80">Licensed Therapists</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100+</div>
              <p className="text-white/80">Lives Changed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-white/80">Confidential</p>
            </div>
          </div>
        </div>
      </section>

      {/* Human Touch Section */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">We're Human, Just Like You</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              At Aashwashan, we understand that reaching out for help takes courage. Our therapists aren't just professionals - they're compassionate human beings who genuinely care about your well-being. When you visit us, you're not just a client - you're a person with a story that deserves to be heard.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-xl text-gray-700 italic">
                "Every person who walks through our doors is treated with the dignity, respect, and warmth they deserve. We believe in the power of human connection to heal."
              </p>
              <p className="mt-4 text-blue-600 font-semibold">— The Aashwashan Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-10 text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Take the first step toward better mental health. Our compassionate team is here to support you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/team" className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg">
                Book an Appointment
              </Link>
              <Link to="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg border-2 border-blue-600">
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
