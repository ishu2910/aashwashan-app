import React from 'react';
import { useNavigate } from 'react-router-dom';
import { team } from '../data/mockData';
import { BadgeCheck } from 'lucide-react';
import SEO from "@/components/SEO";






// Online-only availability data
const availabilityData = {
  1: { languages: ['English', 'Hindi'], rating: 4.8, sessions: 500 },
  2: { languages: ['English', 'Hindi'], rating: 4.9, sessions: 250 },
  3: { languages: ['English', 'Hindi', 'Marathi'], rating: 4.7, sessions: 800 },
  4: { languages: ['English', 'Hindi'], rating: null, sessions: 200 },
};
const TeamPage = () => {
  
  const navigate = useNavigate();
  

  return (
    <>
  <SEO
    title="Meet Our Therapists | Aashwashan"
    description="Meet licensed online psychologists and mental health professionals at Aashwashan. Get confidential online therapy for anxiety, depression, stress, relationships, couples therapy, children, teens and emotional wellbeing across India."
    keywords="online psychologist India, online therapist India, counselling psychologist, child psychologist, couples therapist, anxiety therapist, depression counselling, relationship counselling, online therapy India"
    url="https://aashwashan.com/team"
  />
    <div data-testid="team-page">
      {/* Auth Prompt */}
      

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 py-16 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-teal-200 font-medium uppercase tracking-widest text-xs mb-3">MEET OUR EXPERTS</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Find the right therapist for you</h1>
          <p className="text-lg text-white/80">Licensed professionals who create a safe, judgment-free space for your healing journey.</p>
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



      {/* Therapist Cards — Amaha Style */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {team.map((member) => {
              const avail = availabilityData[member.id] || {
  languages: ['English', 'Hindi'],
  rating: null,
  sessions: null,
};
              
              return (
                <div
  key={member.id}
  className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-200"
  data-testid={`therapist-card-${member.id}`}
>
  {/* Therapist Photo */}
  <div className="relative w-full aspect-square overflow-hidden">
    <img
      src={member.image}
      alt={member.name}
      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
    />

    
  </div>

  {/* Card Content */}
  <div className="p-5">

    {/* Name + Verified */}
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-900">
            {member.name}
          </h3>

          <BadgeCheck className="w-5 h-5 text-teal-500 shrink-0" />
        </div>

        <p className="text-sm text-gray-500 mt-1">
          {member.role}
        </p>
      </div>
    </div>

    {/* Animated Rating */}
{avail.rating && (
  <div className="mt-3 flex items-center gap-2">
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="inline-block text-lg text-amber-400 animate-star-pop"
          style={{ animationDelay: `${star * 100}ms` }}
        >
          ★
        </span>
      ))}
    </div>

    <span className="text-sm font-semibold text-gray-600">
      {avail.rating}
    </span>
  </div>
)}

    {/* Sessions */}
    {avail.sessions && (
      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-3 py-1.5">
        <span className="text-sm font-bold text-teal-700">
          {avail.sessions}+
        </span>

        <span className="text-xs font-semibold text-teal-700">
          Sessions
        </span>
      </div>
    )}

    {/* Specializes In */}
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-4 mb-2">
      Specializes In
    </p>

    <div className="flex flex-wrap gap-1.5">
      {member.skills?.slice(0, 4).map((skill, idx) => (
        <span
          key={idx}
          className="text-xs bg-teal-50 text-teal-700 px-2.5 py-1.5 rounded-full border border-teal-100 transition-all duration-300 hover:bg-teal-100 hover:-translate-y-0.5"
        >
          {skill}
        </span>
      ))}
    </div>

    {/* Bio */}
    <p className="text-sm text-gray-600 leading-relaxed mt-4 line-clamp-3">
      {member.bio}
    </p>

    
    {/* Buttons */}
    <div className="mt-5 space-y-2.5">

      <button
        onClick={() => {
          navigate(`/therapists/${member.id}`);
        }}
        className="w-full rounded-full border border-teal-200 bg-white py-3 text-sm font-semibold text-teal-700 transition-all duration-300 hover:bg-teal-50 hover:border-teal-400 hover:-translate-y-1 hover:shadow-md"
      >
        View Full Profile →
      </button>

     <button
  onClick={() => {
    navigate(`/?therapist=${member.id}#therapists`);
  }}
  className="w-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
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

   

      
    </div>
    </>
  );
};

export default TeamPage;
