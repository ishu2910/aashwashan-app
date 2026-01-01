import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Users, Heart, Target, Lightbulb } from 'lucide-react';

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">ABOUT AASHWASHAN</p>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Your Partner in Mental Wellness</h1>
            <p className="text-xl text-gray-600">
              We are dedicated to providing compassionate, professional mental health care that empowers individuals, couples, and families to live healthier, happier lives.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=700" 
                alt="Our Story" 
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm">OUR STORY</p>
              <h2 className="text-4xl font-bold">Building a Foundation of Trust and Care</h2>
              <p className="text-gray-600 leading-relaxed">
                Aashwashan was founded with a simple yet powerful vision: to make quality mental health care accessible, compassionate, and effective for everyone. Our journey began over 15 years ago when a group of dedicated mental health professionals came together with a shared commitment to breaking down the stigma surrounding mental health.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we've grown into a trusted mental health center serving thousands of clients. Our team of licensed therapists, psychologists, and psychiatrists work collaboratively to provide personalized care that addresses each individual's unique needs and circumstances.
              </p>
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
                  <span className="font-semibold">Confidential Services</span>
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-10 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide accessible, compassionate, and evidence-based mental health services that empower individuals to overcome challenges, heal from trauma, and build meaningful, fulfilling lives. We are committed to creating a safe, supportive environment where every person feels heard, valued, and understood.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-10 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading mental health care provider known for transforming lives through innovative, compassionate care. We envision a world where mental health is prioritized, stigma is eliminated, and everyone has access to the support they need to thrive emotionally, mentally, and spiritually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">OUR VALUES</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">What We Stand For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do and shape the compassionate care we provide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Compassion</h3>
              <p className="text-gray-600">
                We approach every client with empathy, kindness, and genuine care for their well-being.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards of professional care through continuous learning and improvement.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Respect</h3>
              <p className="text-gray-600">
                We honor each person's unique journey, beliefs, and choices in a judgment-free environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why Choose Aashwashan?</h2>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              We offer comprehensive mental health services backed by experience, expertise, and genuine care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">15+</div>
              <p className="text-white/80">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-white/80">Licensed Therapists</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">2500+</div>
              <p className="text-white/80">Lives Changed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">98%</div>
              <p className="text-white/80">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Take the first step toward better mental health. Our compassionate team is here to support you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/appointment" className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg">
                Book an Appointment
              </Link>
              <Link to="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg border-2 border-blue-600">
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