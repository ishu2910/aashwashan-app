import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { team } from "../data/mockData";
import { BadgeCheck, ArrowLeft, Star } from "lucide-react";

const availabilityData = {
  1: {
    languages: ['English', 'Hindi'],
    rating: 4.8,
    sessions: 500,
  },
  2: {
    languages: ['English', 'Hindi'],
    rating: 4.9,
    sessions: 250,
  },
  3: {
    languages: ['English', 'Hindi', ],
    rating: 4.7,
    sessions: 800,
  },
  4: {
    languages: ['English', 'Hindi'],
    rating: null,
    sessions: 200,
  },
};
const TherapistProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const therapist = team.find(
    (member) => String(member.id) === String(id)
  );

  if (!therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Therapist not found
          </h1>

          <button
            onClick={() => navigate("/team")}
            className="mt-4 rounded-full bg-teal-600 px-6 py-3 text-white"
          >
            Back to Therapists
          </button>
        </div>
      </div>
    );
  }

  const stats = availabilityData[therapist.id] || {};

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-5xl">

        <button
          onClick={() => navigate("/team")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Therapists
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="grid md:grid-cols-[280px_1fr]">

            <div className="w-full md:w-[280px] md:h-[360px]">
              <img
                src={therapist.image}
                alt={therapist.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-7 md:p-10">

              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {therapist.name}
                </h1>

                <BadgeCheck className="w-6 h-6 text-teal-500" />
              </div>

              <p className="mt-2 text-gray-500">
                {therapist.role}
              </p>
              <div className="mt-4">
  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
    Specialization
  </p>

  <p className="mt-1 text-base font-semibold text-teal-700">
    {therapist.specialization}
  </p>
</div>
              {stats.rating && (
                <div className="mt-5 flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <span className="font-semibold text-gray-700">
                    {stats.rating}
                  </span>
                </div>
              )}

              {stats.sessions && (
                <div className="mt-4 inline-flex rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                  {stats.sessions}+ Sessions
                </div>
              )}

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  Specializes In
                </p>

                <div className="flex flex-wrap gap-2">
                  {therapist.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-teal-50 border border-teal-100 px-3 py-1.5 text-sm text-teal-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
      Languages
    </p>

    <div className="flex flex-wrap gap-2">
      {(availabilityData[therapist.id]?.languages || ['English', 'Hindi']).map(
        (language) => (
          <span
            key={language}
            className="text-sm font-medium text-gray-700"
          >
            {language}
          </span>
        )
      )}
    </div>
  </div>

  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
      Experience
    </p>

    <p className="text-sm font-medium text-gray-700">
      {therapist.experience || "Experienced Mental Health Professional"}
    </p>
  </div>

</div>

              <div className="mt-7">
  <h2 className="text-xl font-bold text-gray-900 mb-3">
    About
  </h2>

  <p className="text-gray-600 leading-7">
    {therapist.bio}
  </p>
  {therapist.education && (
  <div className="mt-6">
    <h3 className="text-base font-bold text-gray-900 mb-2">
      Education
    </h3>

    <p className="text-gray-600 leading-relaxed">
      {therapist.education}
    </p>
  </div>
)}

{therapist.credentials && (
  <div className="mt-5">
    <h3 className="text-base font-bold text-gray-900 mb-2">
      Credentials
    </h3>

    <p className="text-gray-600 leading-relaxed">
      {therapist.credentials}
    </p>
  </div>
)}

{therapist.awards?.length > 0 && (
  <div className="mt-5">
    <h3 className="text-base font-bold text-gray-900 mb-2">
      Recognition
    </h3>

    <div className="flex flex-wrap gap-2">
      {therapist.awards.map((award, index) => (
        <span
          key={index}
          className="rounded-full bg-amber-50 border border-amber-100 px-3 py-2 text-sm text-gray-700"
        >
          {award}
        </span>
      ))}
    </div>
  </div>
)}

  <div className="mt-6">
    <h3 className="text-base font-bold text-gray-900 mb-2">
      Areas of Focus
    </h3>

    <div className="flex flex-wrap gap-2">
      {therapist.skills?.map((skill, index) => (
        <span
          key={index}
          className="rounded-full bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-700"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
</div>
              <button
                onClick={() => {
                  navigate(`/?therapist=${therapist.id}#therapists`);
                }}
                className="mt-8 w-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl"
              >
                Book Session
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistProfilePage;