import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { pricingPlans } from '../data/mockData';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">PRICING PLANS</p>
            <h3 className="text-5xl lg:text-6xl font-bold mb-6">Affordable Mental Health Care</h3>
            <p className="text-xl text-gray-600 mb-8">
              Choose a plan that fits your needs and budget. Quality mental health care shouldn't break the bank.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`rounded-3xl p-8 transition-all duration-300 ${
                  plan.recommended 
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl transform scale-105' 
                    : 'bg-white border-2 border-gray-200 hover:shadow-xl'
                }`}
              >
                {plan.recommended && (
                  <div className="bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-2 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-4 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.recommended ? 'text-white' : 'text-blue-600'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-lg ${plan.recommended ? 'text-white/80' : 'text-gray-600'}`}>
                    /{plan.duration}
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${plan.recommended ? 'text-white' : 'text-blue-600'}`} />
                      <span className={plan.recommended ? 'text-white' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/appointment" 
                  className={`block w-full text-center py-4 rounded-full font-semibold transition-all duration-300 ${
                    plan.recommended 
                      ? 'bg-white text-blue-600 hover:bg-gray-100' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Info */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">We Accept Most Insurance Plans</h3>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <p className="text-gray-600 mb-6 leading-relaxed">
                We work with most major insurance providers to make mental health care accessible and affordable. Our team will help you understand your coverage and out-of-pocket costs before your first session.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">Accepted Insurance</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Blue Cross Blue Shield</li>
                    <li>• Aetna</li>
                    <li>• Cigna</li>
                    <li>• United Healthcare</li>
                    <li>• Medicare</li>
                    <li>• And many more...</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3">Self-Pay Options</h3>
                  <p className="text-gray-600 mb-4">
                    Don't have insurance? We offer competitive self-pay rates and flexible payment plans to ensure everyone has access to quality mental health care.
                  </p>
                  <Link to="/contact" className="text-blue-600 font-semibold hover:underline">
                    Contact us to learn more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Pricing FAQs</h3>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">Can I switch plans later?</h3>
                <p className="text-gray-600">Yes, you can upgrade or change your plan at any time. We'll work with you to find the best option for your needs.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">What's included in a session?</h3>
                <p className="text-gray-600">Each session includes dedicated one-on-one time with your therapist, personalized treatment planning, and follow-up support.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="font-bold text-lg mb-2">Do you offer sliding scale fees?</h3>
                <p className="text-gray-600">Yes, we offer sliding scale fees based on income for those who qualify. Contact us to discuss your situation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose a plan and book your first appointment today. Your journey to better mental health starts here.
          </p>
          <Link to="/appointment" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;