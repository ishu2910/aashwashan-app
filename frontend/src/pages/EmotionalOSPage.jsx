import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Brain, Sparkles, Target, TrendingUp, Shield, 
  ChevronRight, CheckCircle, ArrowRight, MessageCircle,
  Star, Zap, Compass, Eye, Users, Calendar
} from 'lucide-react';


const API = "https://aashwashan-app-1.onrender.com/api";

// EOS Module Data
const EOS_MODULES = {
  selfEsteem: {
    id: 'self-esteem',
    title: 'Self-Worth Reset',
    subtitle: '4-Week Journey to Rediscover Your Value',
    icon: Heart,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-600',
    weeks: [
      { week: 1, title: 'Identify Self-Talk Patterns', desc: 'Recognize the voice inside your head and understand its origins' },
      { week: 2, title: 'Separate Identity from Achievement', desc: 'You are not your successes or failures - discover your core self' },
      { week: 3, title: 'Strength Mapping', desc: 'Document your unique abilities and what makes you valuable' },
      { week: 4, title: 'Self-Validation Habits', desc: 'Build daily practices that reinforce your inherent worth' }
    ],
    prompts: [
      "When do you feel 'not enough'?",
      "Whose standard are you measuring against?",
      "What would you tell your younger self?",
      "Name 3 things you did well this week."
    ]
  },
  clarity: {
    id: 'internal-clarity',
    title: 'Internal Clarity Engine',
    subtitle: 'Discover What Truly Matters to You',
    icon: Compass,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-600',
    questions: [
      { q: "What actually matters to you?", hint: "Not what should matter - what does matter" },
      { q: "If no one was watching, what would you choose?", hint: "Remove external expectations" },
      { q: "What decision feels aligned vs impressive?", hint: "Authentic vs performative" },
      { q: "What are you doing when you lose track of time?", hint: "Flow state indicators" }
    ],
    outcome: "AI analyzes your responses to reveal your core values pattern"
  },
  confidence: {
    id: 'confidence-builder',
    title: 'Confidence Builder',
    subtitle: 'Evidence-Based Self-Trust',
    icon: Zap,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    principle: "Confidence = Evidence, Not Affirmation",
    actions: [
      { title: 'Small Discomfort Challenge', desc: 'Do one thing outside your comfort zone today', icon: Target },
      { title: 'Decision Journal', desc: 'Track decisions you made and their outcomes', icon: Calendar },
      { title: 'Daily Win', desc: '"One thing I chose for myself today"', icon: Star },
      { title: 'Evidence Log', desc: 'Record proof of your capabilities', icon: CheckCircle }
    ]
  },
  comparison: {
    id: 'anti-comparison',
    title: 'Anti-Comparison Tracker',
    subtitle: 'Break Free from the Comparison Trap',
    icon: Eye,
    color: 'from-cyan-500 to-teal-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-600',
    checkIn: {
      question: "Did you compare yourself today?",
      followUp: ["Who did you compare to?", "Why did you compare?", "What did it trigger?"],
      reframe: "Comparison detected. Is this your goal or theirs?"
    },
    stats: "Only 1% of people actively work on breaking comparison habits. You're already ahead."
  }
};

const EmotionalOSPage = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [clarityAnswers, setClarityAnswers] = useState({});
  const [comparisonLog, setComparisonLog] = useState({ compared: null, who: '', why: '', trigger: '' });
  const [confidenceAction, setConfidenceAction] = useState('');
  const [selfEsteemWeek, setSelfEsteemWeek] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium">Your Emotional Operating System</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Not Therapy. <span className="text-amber-400">Transformation.</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We don't sell sessions. We build emotional intelligence. 
              These tools help you understand yourself, build confidence, and break free from patterns that hold you back.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-amber-400 font-bold">1%</span> of people actively work on emotional growth
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                Be part of the <span className="text-amber-400 font-bold">difference makers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* EOS Modules Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-orange-500 font-semibold uppercase tracking-widest text-sm mb-4">Your Growth Toolkit</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              4 Modules. <span className="text-teal-600">Infinite Growth.</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each module is designed to address a specific aspect of your emotional well-being. Start anywhere.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Self-Esteem Module */}
            <div 
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 ${activeModule === 'selfEsteem' ? 'border-rose-400 ring-4 ring-rose-100' : 'border-transparent hover:border-rose-200'}`}
              onClick={() => setActiveModule(activeModule === 'selfEsteem' ? null : 'selfEsteem')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 rounded-bl-[100px] -z-10"></div>
              
              <div className={`w-16 h-16 bg-gradient-to-br ${EOS_MODULES.selfEsteem.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Heart className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {EOS_MODULES.selfEsteem.title}
              </h3>
              <p className="text-rose-600 font-medium mb-4">{EOS_MODULES.selfEsteem.subtitle}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((w, i) => (
                  <span key={i} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">{w}</span>
                ))}
              </div>
              
              <p className="text-gray-600 mb-4">Structured 4-week journey to rebuild your sense of self-worth from the ground up.</p>
              
              <div className="flex items-center text-rose-600 font-medium">
                Start Journey <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Expanded Content */}
              {activeModule === 'selfEsteem' && (
                <div className="mt-6 pt-6 border-t border-rose-100 animate-fadeIn">
                  <h4 className="font-semibold text-gray-800 mb-4">Your 4-Week Journey:</h4>
                  <div className="space-y-3">
                    {EOS_MODULES.selfEsteem.weeks.map((week, i) => (
                      <div key={i} className={`p-4 rounded-xl ${selfEsteemWeek === week.week ? 'bg-rose-100 border-2 border-rose-300' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${selfEsteemWeek === week.week ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {week.week}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-800">{week.title}</p>
                            <p className="text-sm text-gray-600">{week.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">AI Reflection Prompts:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {EOS_MODULES.selfEsteem.prompts.map((prompt, i) => (
                        <div key={i} className="p-3 bg-rose-50 rounded-lg text-sm text-rose-700 italic">
                          "{prompt}"
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Begin Week {selfEsteemWeek}
                  </button>
                </div>
              )}
            </div>

            {/* Internal Clarity Engine */}
            <div 
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 ${activeModule === 'clarity' ? 'border-violet-400 ring-4 ring-violet-100' : 'border-transparent hover:border-violet-200'}`}
              onClick={() => setActiveModule(activeModule === 'clarity' ? null : 'clarity')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-bl-[100px] -z-10"></div>
              
              <div className={`w-16 h-16 bg-gradient-to-br ${EOS_MODULES.clarity.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Compass className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {EOS_MODULES.clarity.title}
              </h3>
              <p className="text-violet-600 font-medium mb-4">{EOS_MODULES.clarity.subtitle}</p>
              
              <p className="text-gray-600 mb-4">Answer guided reflections to uncover what truly matters to you — not what society expects.</p>
              
              <div className="bg-violet-50 p-4 rounded-xl mb-4">
                <p className="text-violet-700 font-medium text-sm">"{EOS_MODULES.clarity.outcome}"</p>
              </div>
              
              <div className="flex items-center text-violet-600 font-medium">
                Discover Your Values <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Expanded Content */}
              {activeModule === 'clarity' && (
                <div className="mt-6 pt-6 border-t border-violet-100 animate-fadeIn">
                  <h4 className="font-semibold text-gray-800 mb-4">Values Discovery Questions:</h4>
                  <div className="space-y-4">
                    {EOS_MODULES.clarity.questions.map((item, i) => (
                      <div key={i} className="p-4 bg-violet-50 rounded-xl">
                        <p className="font-semibold text-gray-800 mb-1">{item.q}</p>
                        <p className="text-sm text-violet-600 italic">{item.hint}</p>
                        <textarea 
                          className="w-full mt-3 p-3 border border-violet-200 rounded-lg text-sm resize-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                          rows="2"
                          placeholder="Your reflection..."
                          value={clarityAnswers[i] || ''}
                          onChange={(e) => setClarityAnswers({...clarityAnswers, [i]: e.target.value})}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-6 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Analyze My Values Pattern
                  </button>
                </div>
              )}
            </div>

            {/* Confidence Builder */}
            <div 
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 ${activeModule === 'confidence' ? 'border-amber-400 ring-4 ring-amber-100' : 'border-transparent hover:border-amber-200'}`}
              onClick={() => setActiveModule(activeModule === 'confidence' ? null : 'confidence')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-bl-[100px] -z-10"></div>
              
              <div className={`w-16 h-16 bg-gradient-to-br ${EOS_MODULES.confidence.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Zap className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {EOS_MODULES.confidence.title}
              </h3>
              <p className="text-amber-600 font-medium mb-4">{EOS_MODULES.confidence.subtitle}</p>
              
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg inline-block mb-4">
                <p className="font-bold text-sm">{EOS_MODULES.confidence.principle}</p>
              </div>
              
              <p className="text-gray-600 mb-4">Not motivational quotes. Real micro-actions that build evidence of your capabilities.</p>
              
              <div className="flex items-center text-amber-600 font-medium">
                Build Real Confidence <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Expanded Content */}
              {activeModule === 'confidence' && (
                <div className="mt-6 pt-6 border-t border-amber-100 animate-fadeIn">
                  <h4 className="font-semibold text-gray-800 mb-4">Today's Micro-Actions:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {EOS_MODULES.confidence.actions.map((action, i) => (
                      <div 
                        key={i} 
                        className={`p-4 rounded-xl cursor-pointer transition-all ${confidenceAction === action.title ? 'bg-amber-100 border-2 border-amber-400' : 'bg-amber-50 hover:bg-amber-100'}`}
                        onClick={(e) => { e.stopPropagation(); setConfidenceAction(action.title); }}
                      >
                        <action.icon className="w-6 h-6 text-amber-600 mb-2" />
                        <p className="font-semibold text-gray-800 text-sm">{action.title}</p>
                        <p className="text-xs text-gray-600">{action.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  {confidenceAction && (
                    <div className="mt-4 p-4 bg-amber-100 rounded-xl">
                      <p className="font-semibold text-amber-800 mb-2">Your "{confidenceAction}" entry:</p>
                      <textarea 
                        className="w-full p-3 border border-amber-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-amber-400"
                        rows="3"
                        placeholder="Write about your action or decision..."
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
                  
                  <button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Log Today's Evidence
                  </button>
                </div>
              )}
            </div>

            {/* Anti-Comparison Tracker */}
            <div 
              className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 ${activeModule === 'comparison' ? 'border-cyan-400 ring-4 ring-cyan-100' : 'border-transparent hover:border-cyan-200'}`}
              onClick={() => setActiveModule(activeModule === 'comparison' ? null : 'comparison')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-bl-[100px] -z-10"></div>
              
              <div className={`w-16 h-16 bg-gradient-to-br ${EOS_MODULES.comparison.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <Eye className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {EOS_MODULES.comparison.title}
              </h3>
              <p className="text-cyan-600 font-medium mb-4">{EOS_MODULES.comparison.subtitle}</p>
              
              <div className="bg-cyan-50 p-4 rounded-xl mb-4">
                <p className="text-cyan-700 font-medium text-sm">{EOS_MODULES.comparison.stats}</p>
              </div>
              
              <p className="text-gray-600 mb-4">Daily check-ins to catch comparison thoughts and reframe them with AI assistance.</p>
              
              <div className="flex items-center text-cyan-600 font-medium">
                Start Tracking <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Expanded Content */}
              {activeModule === 'comparison' && (
                <div className="mt-6 pt-6 border-t border-cyan-100 animate-fadeIn">
                  <h4 className="font-semibold text-gray-800 mb-4">Daily Check-In:</h4>
                  
                  <div className="p-4 bg-cyan-50 rounded-xl mb-4">
                    <p className="font-semibold text-gray-800 mb-4">{EOS_MODULES.comparison.checkIn.question}</p>
                    <div className="flex gap-4">
                      <button 
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${comparisonLog.compared === true ? 'bg-red-500 text-white' : 'bg-white border border-gray-200 hover:border-red-300'}`}
                        onClick={(e) => { e.stopPropagation(); setComparisonLog({...comparisonLog, compared: true}); }}
                      >
                        Yes
                      </button>
                      <button 
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all ${comparisonLog.compared === false ? 'bg-green-500 text-white' : 'bg-white border border-gray-200 hover:border-green-300'}`}
                        onClick={(e) => { e.stopPropagation(); setComparisonLog({...comparisonLog, compared: false}); }}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  {comparisonLog.compared === true && (
                    <div className="space-y-3 animate-fadeIn">
                      {EOS_MODULES.comparison.checkIn.followUp.map((q, i) => (
                        <div key={i}>
                          <label className="text-sm font-medium text-gray-700">{q}</label>
                          <input 
                            type="text"
                            className="w-full mt-1 p-3 border border-cyan-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-400"
                            placeholder="Your answer..."
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      ))}
                      
                      <div className="p-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-white mt-4">
                        <p className="font-medium flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          AI Reframe:
                        </p>
                        <p className="mt-2 italic">"{EOS_MODULES.comparison.checkIn.reframe}"</p>
                      </div>
                    </div>
                  )}

                  {comparisonLog.compared === false && (
                    <div className="p-4 bg-green-100 rounded-xl text-green-800 animate-fadeIn">
                      <p className="font-semibold flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Great job today!
                      </p>
                      <p className="mt-1 text-sm">You're building the habit of focusing on your own journey. Keep it up!</p>
                    </div>
                  )}
                  
                  <button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Save Today's Check-In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* The 1% Message */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Only 1% Make a Difference
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Most people scroll past self-improvement. Most people stay stuck. 
            But you're here, reading this. That means you're already different.
            The question is: will you act on it?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/self-assessment"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              Take Assessment First
            </Link>
            <Link 
              to="/team"
              className="bg-orange-600 text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-orange-700 transition-all"
            >
              Talk to Someone
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-teal-600 font-semibold uppercase tracking-widest text-sm mb-4">Our Promise</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-teal-600">Aashwashan</span> is of the <span className="text-orange-500">people</span>, 
            by the <span className="text-cyan-600">people</span>, for the <span className="text-teal-600">people</span>.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're not building another therapy app. We're building an Emotional Operating System 
            that helps you understand, manage, and elevate your inner world.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EmotionalOSPage;
