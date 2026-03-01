import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft, RotateCcw, AlertTriangle, Heart, Brain, Moon, Activity, Smile } from 'lucide-react';

// Assessment data with validated clinical questions
const assessments = {
  'phq9': {
    id: 'phq9',
    title: 'PHQ-9 Depression Scale',
    subtitle: 'Patient Health Questionnaire for Depression',
    description: 'A validated 9-question screening tool for depression severity',
    questions: 9,
    time: '5-10 min',
    icon: Brain,
    color: 'from-blue-500 to-indigo-600',
    items: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
      "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
      "Trouble concentrating on things, such as reading the newspaper or watching television",
      "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
      "Thoughts that you would be better off dead or of hurting yourself in some way"
    ],
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ],
    scoring: [
      { range: [0, 4], level: "Minimal", color: "green", message: "Your responses suggest minimal depression symptoms. Continue practicing self-care and monitoring your mood." },
      { range: [5, 9], level: "Mild", color: "yellow", message: "Your responses suggest mild depression symptoms. Consider lifestyle changes and self-help strategies." },
      { range: [10, 14], level: "Moderate", color: "orange", message: "Your responses suggest moderate depression symptoms. We recommend consulting with a mental health professional." },
      { range: [15, 19], level: "Moderately Severe", color: "red", message: "Your responses suggest moderately severe depression. Please consider reaching out to a therapist soon." },
      { range: [20, 27], level: "Severe", color: "red", message: "Your responses suggest severe depression symptoms. We strongly encourage you to speak with a mental health professional as soon as possible." }
    ]
  },
  'gad7': {
    id: 'gad7',
    title: 'GAD-7 Anxiety Scale',
    subtitle: 'Generalized Anxiety Disorder 7-item Scale',
    description: 'A validated screening tool to assess anxiety severity',
    questions: 7,
    time: '5-10 min',
    icon: Activity,
    color: 'from-purple-500 to-pink-600',
    items: [
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it's hard to sit still",
      "Becoming easily annoyed or irritable",
      "Feeling afraid as if something awful might happen"
    ],
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ],
    scoring: [
      { range: [0, 4], level: "Minimal", color: "green", message: "Your responses suggest minimal anxiety. Keep up with healthy coping strategies." },
      { range: [5, 9], level: "Mild", color: "yellow", message: "Your responses suggest mild anxiety. Consider relaxation techniques and self-care." },
      { range: [10, 14], level: "Moderate", color: "orange", message: "Your responses suggest moderate anxiety. Consider speaking with a mental health professional." },
      { range: [15, 21], level: "Severe", color: "red", message: "Your responses suggest severe anxiety. We recommend consulting with a therapist soon." }
    ]
  },
  'dass21': {
    id: 'dass21',
    title: 'DASS-21 Scale',
    subtitle: 'Depression, Anxiety and Stress Scale',
    description: 'A comprehensive 21-question assessment measuring depression, anxiety, and stress',
    questions: 21,
    time: '10-15 min',
    icon: Heart,
    color: 'from-teal-500 to-cyan-600',
    items: [
      "I found it hard to wind down",
      "I was aware of dryness of my mouth",
      "I couldn't seem to experience any positive feeling at all",
      "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion)",
      "I found it difficult to work up the initiative to do things",
      "I tended to over-react to situations",
      "I experienced trembling (e.g., in the hands)",
      "I felt that I was using a lot of nervous energy",
      "I was worried about situations in which I might panic and make a fool of myself",
      "I felt that I had nothing to look forward to",
      "I found myself getting agitated",
      "I found it difficult to relax",
      "I felt down-hearted and blue",
      "I was intolerant of anything that kept me from getting on with what I was doing",
      "I felt I was close to panic",
      "I was unable to become enthusiastic about anything",
      "I felt I wasn't worth much as a person",
      "I felt that I was rather touchy",
      "I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat)",
      "I felt scared without any good reason",
      "I felt that life was meaningless"
    ],
    options: [
      { value: 0, label: "Did not apply to me at all" },
      { value: 1, label: "Applied to me to some degree" },
      { value: 2, label: "Applied to me a considerable degree" },
      { value: 3, label: "Applied to me very much" }
    ],
    scoring: [
      { range: [0, 13], level: "Normal", color: "green", message: "Your responses are within the normal range. Continue practicing self-care." },
      { range: [14, 20], level: "Mild", color: "yellow", message: "Your responses suggest mild symptoms. Consider self-help strategies." },
      { range: [21, 28], level: "Moderate", color: "orange", message: "Your responses suggest moderate symptoms. Consider consulting a professional." },
      { range: [29, 42], level: "Severe", color: "red", message: "Your responses suggest severe symptoms. We recommend speaking with a therapist." },
      { range: [43, 63], level: "Extremely Severe", color: "red", message: "Your responses suggest extremely severe symptoms. Please seek professional support soon." }
    ]
  },
  'k6': {
    id: 'k6',
    title: 'K6 Psychological Distress Scale',
    subtitle: 'Kessler Psychological Distress Scale',
    description: 'A brief 6-question screening tool for psychological distress',
    questions: 6,
    time: '3-5 min',
    icon: AlertTriangle,
    color: 'from-orange-500 to-red-600',
    items: [
      "During the past 30 days, about how often did you feel nervous?",
      "During the past 30 days, about how often did you feel hopeless?",
      "During the past 30 days, about how often did you feel restless or fidgety?",
      "During the past 30 days, about how often did you feel so depressed that nothing could cheer you up?",
      "During the past 30 days, about how often did you feel that everything was an effort?",
      "During the past 30 days, about how often did you feel worthless?"
    ],
    options: [
      { value: 0, label: "None of the time" },
      { value: 1, label: "A little of the time" },
      { value: 2, label: "Some of the time" },
      { value: 3, label: "Most of the time" },
      { value: 4, label: "All of the time" }
    ],
    scoring: [
      { range: [0, 4], level: "Low Distress", color: "green", message: "Your responses suggest low psychological distress. Keep practicing healthy habits." },
      { range: [5, 12], level: "Moderate Distress", color: "yellow", message: "Your responses suggest moderate distress. Consider self-care and support strategies." },
      { range: [13, 24], level: "High Distress", color: "red", message: "Your responses suggest high psychological distress. We recommend speaking with a mental health professional." }
    ]
  },
  'pss': {
    id: 'pss',
    title: 'Perceived Stress Scale',
    subtitle: 'Measures how stressful situations are perceived',
    description: 'A 10-question assessment of your perceived stress levels',
    questions: 10,
    time: '5-10 min',
    icon: Activity,
    color: 'from-rose-500 to-pink-600',
    items: [
      "In the last month, how often have you been upset because of something that happened unexpectedly?",
      "In the last month, how often have you felt that you were unable to control the important things in your life?",
      "In the last month, how often have you felt nervous and stressed?",
      "In the last month, how often have you felt confident about your ability to handle your personal problems?",
      "In the last month, how often have you felt that things were going your way?",
      "In the last month, how often have you found that you could not cope with all the things that you had to do?",
      "In the last month, how often have you been able to control irritations in your life?",
      "In the last month, how often have you felt that you were on top of things?",
      "In the last month, how often have you been angered because of things that happened that were outside of your control?",
      "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
    ],
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Almost never" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Fairly often" },
      { value: 4, label: "Very often" }
    ],
    reverseItems: [3, 4, 6, 7], // 0-indexed: items 4, 5, 7, 8
    scoring: [
      { range: [0, 13], level: "Low Stress", color: "green", message: "Your perceived stress levels are low. Continue with your current coping strategies." },
      { range: [14, 26], level: "Moderate Stress", color: "yellow", message: "Your perceived stress is moderate. Consider stress management techniques." },
      { range: [27, 40], level: "High Stress", color: "red", message: "Your perceived stress is high. We recommend exploring stress reduction strategies and professional support." }
    ]
  },
  'who5': {
    id: 'who5',
    title: 'WHO-5 Well-Being Index',
    subtitle: 'World Health Organization Well-Being Index',
    description: 'A short 5-question measure of your current mental well-being',
    questions: 5,
    time: '2-5 min',
    icon: Smile,
    color: 'from-emerald-500 to-teal-600',
    items: [
      "I have felt cheerful and in good spirits",
      "I have felt calm and relaxed",
      "I have felt active and vigorous",
      "I woke up feeling fresh and rested",
      "My daily life has been filled with things that interest me"
    ],
    options: [
      { value: 5, label: "All of the time" },
      { value: 4, label: "Most of the time" },
      { value: 3, label: "More than half the time" },
      { value: 2, label: "Less than half the time" },
      { value: 1, label: "Some of the time" },
      { value: 0, label: "At no time" }
    ],
    scoring: [
      { range: [0, 28], level: "Low Well-Being", color: "red", message: "Your well-being score suggests you may benefit from professional support. Consider reaching out to a therapist." },
      { range: [29, 50], level: "Moderate Well-Being", color: "yellow", message: "Your well-being is moderate. Consider activities that bring you joy and relaxation." },
      { range: [51, 100], level: "Good Well-Being", color: "green", message: "Your well-being score is good! Continue practicing self-care and maintaining healthy habits." }
    ],
    multiply: 4 // WHO-5 raw score is multiplied by 4 for percentage
  }
};

const SelfAssessmentPage = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const startAssessment = (assessmentId) => {
    setSelectedAssessment(assessments[assessmentId]);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < selectedAssessment.items.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let total = 0;
    const assessment = selectedAssessment;
    
    Object.entries(answers).forEach(([index, value]) => {
      // Handle reverse scoring for PSS
      if (assessment.reverseItems && assessment.reverseItems.includes(parseInt(index))) {
        total += (assessment.options.length - 1) - value;
      } else {
        total += value;
      }
    });

    // Handle WHO-5 multiplication
    if (assessment.multiply) {
      total = total * assessment.multiply;
    }

    return total;
  };

  const getResult = () => {
    const score = calculateScore();
    const scoring = selectedAssessment.scoring;
    
    for (const level of scoring) {
      if (score >= level.range[0] && score <= level.range[1]) {
        return { score, ...level };
      }
    }
    return { score, level: "Unknown", color: "gray", message: "Unable to calculate result." };
  };

  const resetAssessment = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  // Assessment Selection View
  if (!selectedAssessment) {
    return (
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-teal-100 font-medium uppercase tracking-widest text-sm mb-4">SELF-ASSESSMENT TOOLS</p>
              <h1 className="text-4xl lg:text-5xl font-semibold mb-6">Check Your Mental Well-Being</h1>
              <p className="text-xl text-white/90">
                These validated screening tools can help you understand your mental health better. 
                They are not diagnostic tools but can guide you towards seeking appropriate support.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-6 bg-amber-50 border-b border-amber-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-3 text-amber-800">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">These assessments are for informational purposes only and do not replace professional diagnosis.</p>
            </div>
          </div>
        </section>

        {/* Assessments Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">All Available Assessments</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Choose an assessment based on what you'd like to explore about your mental health</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {Object.values(assessments).map((assessment) => (
                <div 
                  key={assessment.id}
                  className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${assessment.color} rounded-xl flex items-center justify-center mb-4`}>
                    <assessment.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{assessment.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{assessment.subtitle}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full">{assessment.questions} questions</span>
                    <span>{assessment.time}</span>
                  </div>
                  <button
                    onClick={() => startAssessment(assessment.id)}
                    className={`w-full bg-gradient-to-r ${assessment.color} text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2`}
                    data-testid={`start-${assessment.id}`}
                  >
                    <span>Start Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-semibold mb-4">Need Professional Support?</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              If your assessment results suggest you could benefit from professional help, our licensed therapists are here for you.
            </p>
            <Link 
              to="/team" 
              className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a Therapy Session
            </Link>
          </div>
        </section>

        {/* Author Credits & Legal Disclaimer */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Author Credits */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Assessment Credits & Sources</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <p className="font-medium text-gray-800">PHQ-9</p>
                    <p>Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke, and colleagues. © Pfizer Inc.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <p className="font-medium text-gray-800">GAD-7</p>
                    <p>Developed by Drs. Robert L. Spitzer, Kurt Kroenke, Janet B.W. Williams, and Bernd Löwe. © Pfizer Inc.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <p className="font-medium text-gray-800">DASS-21</p>
                    <p>Developed by S.H. Lovibond and P.F. Lovibond at the University of New South Wales, Australia.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <p className="font-medium text-gray-800">K6 Scale</p>
                    <p>Developed by Ronald C. Kessler and colleagues, Harvard Medical School.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <p className="font-medium text-gray-800">PSS (Perceived Stress Scale)</p>
                    <p>Developed by Sheldon Cohen, Tom Kamarck, and Robin Mermelstein (1983).</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <p className="font-medium text-gray-800">WHO-5</p>
                    <p>Developed by the World Health Organization (WHO) Regional Office, Europe.</p>
                  </div>
                </div>
              </div>

              {/* Legal Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-lg font-semibold text-amber-800 mb-2">Important Legal Disclaimer</h4>
                    <div className="text-sm text-amber-700 space-y-2">
                      <p>
                        <strong>Not a Medical Diagnosis:</strong> These self-assessment tools are provided for educational and informational purposes only. They are NOT intended to diagnose, treat, cure, or prevent any mental health condition or illness.
                      </p>
                      <p>
                        <strong>Seek Professional Help:</strong> The results of these assessments should not be used as a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing mental health concerns, please consult a qualified healthcare provider or mental health professional.
                      </p>
                      <p>
                        <strong>Crisis Resources:</strong> If you are in crisis or experiencing suicidal thoughts, please call Tele MANAS at <strong>14416</strong> (India) or your local emergency services immediately.
                      </p>
                      <p>
                        <strong>Data Privacy:</strong> Your assessment responses are processed locally in your browser and are not stored on our servers. We respect your privacy and confidentiality.
                      </p>
                      <p className="pt-2 border-t border-amber-200">
                        By using these assessments, you acknowledge that you have read and understood this disclaimer and agree that Aashwashan is not liable for any decisions made based on these screening tools.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Result View
  if (showResult) {
    const result = getResult();
    const colorClasses = {
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      red: 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${colorClasses[result.color]}`}>
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{selectedAssessment.title}</h2>
                <p className="text-gray-600">Assessment Complete</p>
              </div>

              <div className={`rounded-xl p-6 border ${colorClasses[result.color]} mb-6`}>
                <div className="text-center">
                  <p className="text-sm font-medium mb-2">Your Score</p>
                  <p className="text-4xl font-bold mb-2">{result.score}</p>
                  <p className="text-lg font-semibold">{result.level}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">What This Means</h3>
                <p className="text-gray-700 leading-relaxed">{result.message}</p>
              </div>

              <div className="bg-teal-50 rounded-xl p-6 mb-8 border border-teal-200">
                <h3 className="font-semibold text-teal-800 mb-3">Important Note</h3>
                <p className="text-teal-700 text-sm leading-relaxed">
                  This assessment is a screening tool, not a diagnosis. Only a qualified mental health professional can provide a proper diagnosis. 
                  If you're concerned about your mental health, we encourage you to speak with a therapist.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={resetAssessment}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Take Another Assessment</span>
                </button>
                <Link
                  to="/team"
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <span>Talk to a Therapist</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question View
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{selectedAssessment.title}</span>
              <span>Question {currentQuestion + 1} of {selectedAssessment.items.length}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / selectedAssessment.items.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <p className="text-sm text-teal-600 font-medium mb-4">
              Over the last 2 weeks, how often have you been bothered by:
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-8 leading-relaxed">
              {selectedAssessment.items[currentQuestion]}
            </h2>

            <div className="space-y-3">
              {selectedAssessment.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    answers[currentQuestion] === option.value
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                  }`}
                  data-testid={`option-${index}`}
                >
                  <span className="font-medium text-gray-800">{option.label}</span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <button
                onClick={currentQuestion === 0 ? resetAssessment : goBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{currentQuestion === 0 ? 'Exit' : 'Back'}</span>
              </button>
              <div className="flex space-x-1">
                {selectedAssessment.items.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${
                      i === currentQuestion ? 'bg-teal-500' : 
                      answers[i] !== undefined ? 'bg-teal-300' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessmentPage;
