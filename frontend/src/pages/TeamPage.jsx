import React from 'react';
import { team } from '../data/mockData';
import { Mail, Phone } from 'lucide-react';

const TeamPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">OUR TEAM</p>
            <h3 className="text-5xl lg:text-6xl font-bold mb-6">Meet Our Expert Therapists</h3>
            <p className="text-xl text-gray-600">
              Our team of licensed mental health professionals is dedicated to helping you achieve lasting wellness and peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="group">
                <div className="relative overflow-hidden rounded-3xl mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                    <div className="flex space-x-3">
                      <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </a>
                      <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-1">{member.role}</p>
                <p className="text-gray-600 mb-2">{member.specialization}</p>
                <p className="text-sm text-gray-500">{member.experience} experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Team Info */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {team.map((member, index) => (
              <div key={member.id} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="rounded-3xl shadow-2xl"
                  />
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <h3 className="text-4xl font-bold mb-4">{member.name}</h3>
                  <p className="text-blue-600 font-semibold text-xl mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-800">Specialization:</span>
                      <span className="text-gray-600 ml-2">{member.specialization}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Experience:</span>
                      <span className="text-gray-600 ml-2">{member.experience}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Education:</span>
                      <span className="text-gray-600 ml-2">{member.education}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Want to Join Our Team?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for passionate mental health professionals to join our mission of transforming lives.
          </p>
          <a href="mailto:careers@aashwashan.com" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg">
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;