import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, CheckCircle, Users, Home as HomeIcon, Heart, Clock, ChevronDown, ChevronUp, X, Calendar, User, Mail, Wind, BookHeart, Activity, MessageCircle, HelpCircle, Send, CreditCard, Moon, ArrowRight, Sparkles } from 'lucide-react';
import { services, team, testimonials, faqs } from '../data/mockData';
import axios from 'axios';
import { toast } from '../hooks/use-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Session duration pricing
const SESSION_PRICING = {
  '30': { duration: '30 minutes', price: 999 },
  '45': { duration: '45 minutes', price: 1400 },
  '60': { duration: '60 minutes', price: 1600 }
};

// Hero background images for rotation - calming, professional mental health imagery
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1920&q=80', // Meditation/peaceful
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80', // Yoga/sunrise
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1920&q=80', // Peaceful nature
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80', // Calm water
  'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=1920&q=80', // Sunrise hope
];

const Homepage = () => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSymptomModalOpen, setIsSymptomModalOpen] = React.useState(false);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = React.useState(false);
  const [isGratitudeModalOpen, setIsGratitudeModalOpen] = React.useState(false);
  const [isHelpMeModalOpen, setIsHelpMeModalOpen] = React.useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = React.useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [bookingComplete, setBookingComplete] = React.useState(false);
  const [bookedTherapist, setBookedTherapist] = React.useState(null);
  const [selectedService, setSelectedService] = React.useState(null);
  const [selectedTherapist, setSelectedTherapist] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [breathingPhase, setBreathingPhase] = React.useState('ready');
  const [breathingCount, setBreathingCount] = React.useState(4);
  const [gratitudeEntries, setGratitudeEntries] = React.useState(['', '', '']);
  const [messageText, setMessageText] = React.useState('');
  const [helpMeStep, setHelpMeStep] = React.useState(1);
  const [helpMeAnswers, setHelpMeAnswers] = React.useState({
    concern: '',
    duration: '',
    preference: ''
  });
  const [recommendedTherapist, setRecommendedTherapist] = React.useState(null);
  
  // Hero image rotation
  const [currentHeroImage, setCurrentHeroImage] = React.useState(0);
  
  // Session booking state
  const [selectedSessionDuration, setSelectedSessionDuration] = React.useState('');
  const [finalPrice, setFinalPrice] = React.useState(0);
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    sessionDuration: '',
    date: '',
    time: '',
    message: ''
  });

  // Rotate hero images every 6 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const openBookingModal = (therapist) => {
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  };
  
  const openSymptomModal = (service) => {
    setSelectedService(service);
    setIsSymptomModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTherapist(null);
    setSelectedSessionDuration('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      sessionDuration: '',
      date: '',
      time: '',
      message: ''
    });
  };

  // Calculate final price based on session duration
  const calculatePrice = () => {
    if (!selectedSessionDuration) return 0;
    return SESSION_PRICING[selectedSessionDuration].price;
  };
  
  const closeSymptomModal = () => {
    setIsSymptomModalOpen(false);
    setSelectedService(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Filter message input - no numbers or sequential characters allowed
  const handleMessageChange = (e) => {
    const value = e.target.value;
    // Remove any digits and sequential patterns
    const filtered = value.replace(/[0-9]/g, '').replace(/(.)\1{2,}/g, '$1$1');
    setMessageText(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedSessionDuration) {
      toast({
        title: "Please select a session duration",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const appointmentData = {
      ...formData,
      sessionDuration: SESSION_PRICING[selectedSessionDuration].duration,
      price: calculatePrice(),
      couponApplied: couponApplied,
      message: `Requested therapist: ${selectedTherapist?.name || 'Any'}. Session: ${SESSION_PRICING[selectedSessionDuration].duration}. ${formData.message}`
    };
    
    try {
      await axios.post(`${API}/appointments`, appointmentData);
      
      // Store the final price before closing modal
      setFinalPrice(calculatePrice());
      
      // Show payment modal after successful booking
      setBookedTherapist(selectedTherapist);
      closeModal();
      setIsPaymentModalOpen(true);
      
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    setBookingComplete(true);
    toast({
      title: "Booking Confirmed!",
      description: `Your session with ${bookedTherapist?.name} is confirmed. You can now message them.`,
    });
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      toast({
        title: "Message Sent!",
        description: "Your therapist will respond when they're available.",
      });
      setMessageText('');
      setIsMessageModalOpen(false);
    }
  };

  // Algorithm to match therapist based on answers
  const runMatchingAlgorithm = () => {
    let bestMatch = team[0];
    let highestScore = 0;

    team.forEach(therapist => {
      let score = 0;
      
      // Match based on concern
      if (helpMeAnswers.concern === 'anxiety' && therapist.skills.some(s => s.toLowerCase().includes('anxiety'))) {
        score += 3;
      }
      if (helpMeAnswers.concern === 'depression' && therapist.skills.some(s => s.toLowerCase().includes('depress'))) {
        score += 3;
      }
      if (helpMeAnswers.concern === 'stress' && therapist.skills.some(s => s.toLowerCase().includes('stress'))) {
        score += 3;
      }
      if (helpMeAnswers.concern === 'relationship' && therapist.skills.some(s => s.toLowerCase().includes('relationship'))) {
        score += 3;
      }
      if (helpMeAnswers.concern === 'grief' && therapist.skills.some(s => s.toLowerCase().includes('grief'))) {
        score += 3;
      }

      // Match based on duration preference
      if (helpMeAnswers.duration === 'long' && parseInt(therapist.experience) >= 6) {
        score += 2;
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = therapist;
      }
    });

    setRecommendedTherapist(bestMatch);
    setHelpMeStep(4);
  };

  // Audio context for breathing sounds
  const audioContextRef = React.useRef(null);
  const breathingIntervalRef = React.useRef(null);

  // Play a tick/beep sound
  const playTickSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  // Play phase change sound (inhale/exhale)
  const playPhaseSound = (phase) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      if (phase === 'inhale') {
        // Rising tone for inhale
        oscillator.frequency.setValueAtTime(300, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.5);
      } else if (phase === 'exhale') {
        // Falling tone for exhale
        oscillator.frequency.setValueAtTime(600, ctx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.5);
      } else {
        // Steady tone for hold
        oscillator.frequency.value = 450;
      }
      
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  // Speak the phase instruction
  const speakInstruction = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Breathing exercise logic with sounds
  const startBreathingExercise = () => {
    setBreathingPhase('inhale');
    speakInstruction('Breathe in');
    playPhaseSound('inhale');
    
    let phase = 'inhale';
    let count = 4;
    let cycles = 0;
    
    breathingIntervalRef.current = setInterval(() => {
      count--;
      setBreathingCount(count);
      
      if (count > 0) {
        playTickSound();
      }
      
      if (count === 0) {
        if (phase === 'inhale') {
          phase = 'hold';
          count = 4;
          speakInstruction('Hold');
          playPhaseSound('hold');
        } else if (phase === 'hold') {
          phase = 'exhale';
          count = 4;
          speakInstruction('Breathe out');
          playPhaseSound('exhale');
        } else if (phase === 'exhale') {
          cycles++;
          if (cycles >= 3) {
            clearInterval(breathingIntervalRef.current);
            setBreathingPhase('complete');
            speakInstruction('Great job! You did it.');
            return;
          }
          phase = 'inhale';
          count = 4;
          speakInstruction('Breathe in');
          playPhaseSound('inhale');
        }
        setBreathingPhase(phase);
        setBreathingCount(count);
      }
    }, 1000);
  };

  // Stop breathing exercise
  const stopBreathingExercise = () => {
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setBreathingPhase('ready');
    setBreathingCount(4);
  };

  const getTestimonialIcon = (iconType) => {
    switch(iconType) {
      case 'users': return <Users className="w-8 h-8 text-teal-600" />;
      case 'heart': return <Heart className="w-8 h-8 text-pink-600" />;
      default: return <User className="w-8 h-8 text-purple-600" />;
    }
  };

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION: How are you Feeling Today? - With Rotating Background Images */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Rotating Background Images */}
        <div className="absolute inset-0">
          {HERO_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                currentHeroImage === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700/80 via-cyan-700/70 to-blue-800/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 via-transparent to-transparent"></div>
        </div>

        {/* Animated floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-soft delay-500"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <p className="text-teal-200 font-medium uppercase tracking-[0.3em] text-sm mb-6 animate-fade-in delay-100">
            Your Journey to Wellness Starts Here
          </p>
          
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-semibold mb-8 leading-tight animate-fade-in delay-200"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How are you feeling<br />
            <span className="italic font-normal text-teal-200">today?</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            You don't have to face this alone. Our compassionate therapists are here to listen, understand, and guide you towards a healthier mind.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-400">
            <Link
              to="/team"
              className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-full transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-2xl hover:scale-105 min-w-[220px] flex items-center justify-center gap-2"
              data-testid="book-session-hero-btn"
            >
              <span>Book a Session</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => {
                setIsHelpMeModalOpen(true);
                setHelpMeStep(1);
                setHelpMeAnswers({ concern: '', duration: '', preference: '' });
                setRecommendedTherapist(null);
              }}
              className="bg-white/15 backdrop-blur-md text-white px-10 py-4 rounded-full hover:bg-white/25 transition-all duration-300 font-medium text-lg border border-white/30 min-w-[220px] hover:scale-105"
              data-testid="help-me-find-btn-hero"
            >
              Help Me Find a Therapist
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm animate-fade-in delay-500">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-300" /> 100% Confidential
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-300" /> Licensed Therapists
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-300" /> Safe & Secure
            </span>
          </div>
        </div>

        {/* Hero image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentHeroImage === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* SECTION 2: How Life Feels Better After Therapy */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-teal-600 font-medium uppercase tracking-[0.2em] text-sm mb-4">The Benefits</p>
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
              How Life Feels Better After Therapy
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Real improvements that make a difference in your daily life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {[
              { title: 'Sleep Better', desc: 'Restful nights and peaceful mornings', img: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200' },
              { title: 'Think Clearer', desc: 'Better focus and decision making', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=200' },
              { title: 'Feel Lighter', desc: 'Less emotional burden, more joy', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200' },
              { title: 'Build Resilience', desc: 'Bounce back stronger from challenges', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200' },
              { title: 'Become Yourself', desc: 'Rediscover who you truly are', img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=200' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-teal-100"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-4 h-24 flex items-center justify-center">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-teal-800" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA: Do you want to feel like this? */}
          <div className="text-center mt-16">
            <div className="relative overflow-hidden rounded-2xl max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600"></div>
              <div className="relative p-10 text-white">
                <h3 className="text-2xl font-semibold mb-4">
                  Do you want to feel like this?
                </h3>
                <p className="text-white/90 mb-8 text-lg">Start your journey to a better life today</p>
                <Link 
                  to="/team"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  data-testid="book-therapist-cta-btn"
                >
                  Book a Therapist Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Booking Header Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-6">
              Booking a therapist is now just one step away
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg text-lg font-medium border border-white/30">
                100% Confidential
              </span>
              <Link 
                to="/team"
                className="bg-white text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
              >
                Meet Our Therapists
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Meet Our Experts */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-teal-600 font-medium uppercase tracking-[0.2em] text-sm mb-4">Our Team</p>
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meet Our Expert Therapists
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Our team of licensed professionals brings years of experience and compassionate care to help you achieve mental wellness.
            </p>
          </div>

          {/* Help Me Find Popup Trigger */}
          <div className="text-center mb-12">
            <button
              onClick={() => {
                setIsHelpMeModalOpen(true);
                setHelpMeStep(1);
                setHelpMeAnswers({ concern: '', duration: '', preference: '' });
                setRecommendedTherapist(null);
              }}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium inline-flex items-center space-x-2"
              data-testid="help-me-find-btn"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Not sure who to book? Let us help you find the right match</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-lg">{member.name}</p>
                    <p className="text-teal-200 text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.skills && member.skills.map((skill, idx) => (
                      <span key={idx} className="bg-teal-50 text-teal-700 text-xs px-3 py-1 rounded-full font-medium">{skill}</span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{member.experience} experience</p>
                  
                  {/* Session Pricing Display */}
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 mb-4 border border-teal-100">
                    <p className="text-xs text-gray-500 mb-2 font-medium">Session Pricing</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">30 min — <strong className="text-teal-600">₹999</strong></span>
                      <span className="text-gray-700">60 min — <strong className="text-teal-600">₹1600</strong></span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => openBookingModal(member)}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                    data-testid={`book-session-${member.id}`}
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Message Your Therapist - Shows after booking */}
          {bookingComplete && bookedTherapist && (
            <div className="mt-10 text-center">
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 max-w-md mx-auto">
                <MessageCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-green-800 mb-2">Session Booked with {bookedTherapist.name}!</h4>
                <p className="text-green-700 text-sm mb-4">You can now message your therapist. They will respond when available.</p>
                <button
                  onClick={() => setIsMessageModalOpen(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium"
                  data-testid="message-therapist-btn"
                >
                  Message {bookedTherapist.name}
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/team" className="inline-block bg-white text-teal-700 border-2 border-teal-600 px-8 py-3 rounded-lg hover:bg-teal-50 transition-all duration-300 font-medium">
              View All Team Members
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: We Are Human Just Like You */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-semibold mb-8">
              We're Human, Just Like You
            </h3>
            <p className="text-white/90 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
              At Aashwashan, we understand that reaching out for help takes courage. Our therapists aren't just professionals — they're compassionate human beings who genuinely care about your well-being. When you visit us, you're not just a client — you're a person with a story that deserves to be heard.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <p className="text-xl text-white leading-relaxed italic">
                "Every person who walks through our doors is treated with the dignity, respect, and warmth they deserve. We believe in the power of human connection to heal."
              </p>
              <p className="mt-6 text-teal-200 font-medium">— The Aashwashan Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Why You Can't Ignore Mental Health Symptoms */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left side - Main message */}
              <div>
                <p className="text-teal-600 font-medium uppercase tracking-widest text-sm mb-4">Important</p>
                <h2 className="text-3xl lg:text-4xl font-semibold mb-6 text-gray-800 leading-tight">
                  Why You Can't Ignore Mental Health Symptoms Anymore
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Start by noticing, not judging, your emotions. Anxiety, irritability, sadness and even anger are natural human emotions. What matters is how we relate to them.
                </p>
                <Link 
                  to="/team"
                  className="inline-flex items-center bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                  data-testid="choose-therapist-btn"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Therapy Can Help — Choose a Therapist
                </Link>
              </div>
              
              {/* Right side - Structured points */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-100">
                <h3 className="text-xl font-semibold mb-6 text-teal-800">Signs You Shouldn't Ignore:</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">1</div>
                    <p className="text-gray-700">Persistent feelings of sadness or hopelessness</p>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">2</div>
                    <p className="text-gray-700">Excessive worry or anxiety that won't go away</p>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">3</div>
                    <p className="text-gray-700">Difficulty sleeping or changes in appetite</p>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold">4</div>
                    <p className="text-gray-700">Withdrawing from friends and activities you enjoy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: How We Support You - REDESIGNED */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-teal-600 font-medium uppercase tracking-widest text-sm mb-4">How We Help</p>
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800">
              Find the Right Support for You
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Not sure where to start? Explore common concerns below to see how we can help.
            </p>
          </div>

          {/* Main Categories */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Emotional Challenges */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">Emotional Challenges</h4>
                    <p className="text-gray-500 text-sm">When feelings become overwhelming</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {['Persistent sadness or hopelessness', 'Mood swings that affect daily life', 'Grief and loss', 'Low self-esteem', 'Feeling empty or numb'].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openSymptomModal(services[0])}
                  className="mt-6 w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Learn More & Get Help
                </button>
              </div>

              {/* Anxiety & Worry */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">Worry & Anxiety</h4>
                    <p className="text-gray-500 text-sm">When worry takes over your mind</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {['Constant worry about everything', 'Panic attacks or racing heart', 'Fear of social situations', 'Overthinking and rumination', 'Physical tension and restlessness'].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openSymptomModal(services[1])}
                  className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Learn More & Get Help
                </button>
              </div>

              {/* Sleep & Energy */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Moon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">Sleep & Energy Issues</h4>
                    <p className="text-gray-500 text-sm">When rest doesn't come easy</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {['Trouble falling or staying asleep', 'Waking up feeling exhausted', 'Sleeping too much or too little', 'Constant fatigue during the day', 'Racing thoughts at night'].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openSymptomModal(services[2])}
                  className="mt-6 w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Learn More & Get Help
                </button>
              </div>

              {/* Life & Relationship */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-teal-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">Life & Relationships</h4>
                    <p className="text-gray-500 text-sm">When life feels difficult</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {['Relationship conflicts', 'Work stress and burnout', 'Major life transitions', 'Feeling disconnected from others', 'Struggling with purpose or direction'].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openSymptomModal(services[3])}
                  className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Learn More & Get Help
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 text-white text-center">
              <h4 className="text-2xl font-semibold mb-4">Not sure which category fits you?</h4>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                That's completely okay! Book a session and our therapists will help you explore what you're experiencing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/self-assessment"
                  className="inline-block bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-medium hover:bg-white/30 transition-all border border-white/30"
                >
                  Take Self-Assessment First
                </Link>
                <Link 
                  to="/team"
                  className="inline-block bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
                >
                  Book a Session Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-teal-600 font-medium uppercase tracking-widest text-sm mb-4">The Process</p>
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800">
              How It Works
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Your journey from struggle to strength
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Visual Cycle */}
            <div className="grid md:grid-cols-4 gap-6 relative">
              {[
                { num: '1', title: "You're Struggling", desc: 'Feeling overwhelmed, anxious, or lost' },
                { num: '2', title: 'You Reach Out', desc: 'Share your concerns with us confidentially' },
                { num: '3', title: 'Aashwashan Connects', desc: 'We match you with the right therapist' },
                { num: '4', title: 'You Heal & Grow', desc: 'Together, we create your path to wellness' }
              ].map((step, idx) => (
                <div key={idx} className="text-center bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-4">{step.num}</div>
                  <h4 className="font-semibold mb-2 text-teal-800">{step.title}</h4>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Why Aashwashan */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-teal-200 font-medium uppercase tracking-widest text-sm mb-4">Why Choose Us</p>
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4">
              Why Aashwashan?
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              We don't just provide therapy — we provide after-therapy services for emotional healing and lasting change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, title: 'Weekly Schedule Planning', desc: 'We help structure your weekday schedule for better mental wellness' },
              { icon: Activity, title: 'Find Your Triggers', desc: 'Identify your main trigger points and learn to manage them' },
              { icon: CheckCircle, title: 'Execution Plan', desc: 'We create a personalized execution plan just for you' },
              { icon: Heart, title: 'Emotional Healing', desc: 'Not professional services — real emotional healing and support' }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl border border-white/20">
              <p className="text-white text-lg italic">
                "We pledge to change the conversation — from clinical to compassionate, from professional to personal."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Self-Help Tools */}
      <section id="self-help-tools" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-teal-600 font-medium uppercase tracking-widest text-sm mb-4">Self Care</p>
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800">
              Take Care of Yourself
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Simple tools you can use right now to feel better. Start writing for clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 text-center border border-teal-100">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wind className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-teal-800">4-4-4 Breathing</h4>
              <p className="text-gray-600 mb-4 text-sm">
                A simple technique to calm your nervous system and reduce anxiety instantly.
              </p>
              <button
                onClick={() => setIsBreathingModalOpen(true)}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-medium"
                data-testid="breathing-exercise-btn"
              >
                Try Now
              </button>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 text-center border border-teal-100">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookHeart className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-teal-800">Gratitude Journal</h4>
              <p className="text-gray-600 mb-4 text-sm">
                Write down 3 things you're grateful for. It shifts your focus to positivity.
              </p>
              <button
                onClick={() => setIsGratitudeModalOpen(true)}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-medium"
                data-testid="gratitude-journal-btn"
              >
                Start Writing
              </button>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 text-center border border-teal-100">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-teal-800">Move Your Body</h4>
              <p className="text-gray-600 mb-4 text-sm">
                Feeling anxious? Go for a run, walk, or any physical exercise. Movement releases endorphins.
              </p>
              <div className="bg-white/80 rounded-lg p-3 border border-teal-100">
                <p className="text-teal-700 text-sm font-medium">
                  "Even 10 minutes of movement can reduce anxiety by 20%"
                </p>
              </div>
            </div>
          </div>

          {/* Self-Assessment Tools Link */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-8 text-white text-center">
              <h4 className="text-2xl font-semibold mb-3">Want to Check Your Mental Well-Being?</h4>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Take our validated self-assessment tests including PHQ-9, GAD-7, DASS-21, K6, PSS, and WHO-5 to understand your mental health better.
              </p>
              <Link 
                to="/self-assessment"
                className="inline-block bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                data-testid="self-assessment-link"
              >
                Take Self-Assessment
              </Link>
            </div>
          </div>

          {/* Remember: Therapy takes time message */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 max-w-2xl text-white">
              <p className="text-lg">
                <strong>Remember:</strong> Therapy is not a one-time thing. It typically takes 3-4 sessions to start seeing improvement in symptoms. Be patient with yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: What Our Clients Say */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-teal-600 font-medium uppercase tracking-widest text-sm mb-4">Testimonials</p>
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800">
              What Our Clients Say
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Real stories from real people who found healing and hope through our mental health services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                    {getTestimonialIcon(testimonial.icon)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-teal-600 font-medium uppercase tracking-widest text-sm mb-4">FAQs</p>
            <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Find answers to common questions about our mental health services and what to expect.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.slice(0, 6).map((faq, index) => (
              <div 
                key={faq.id} 
                className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left"
                >
                  <h4 className="text-lg font-semibold pr-8 text-gray-800">{faq.question}</h4>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: ROI Line */}
      <section className="py-12 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl lg:text-3xl font-semibold mb-2">
              Spending ₹1000 on mental health can give you a 4x return of ₹4000
            </p>
            <p className="text-white/80 text-sm font-light">
              Invest in your mental wellness today — the returns are priceless
            </p>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-green-600 font-medium mb-1">✓ It is Anonymous</p>
                <h3 className="text-xl font-bold">Book Session</h3>
                {selectedTherapist && (
                  <p className="text-gray-600 text-sm">with {selectedTherapist.name}</p>
                )}
              </div>
              <button
                onClick={closeModal}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                data-testid="close-booking-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
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
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                  placeholder="Your Name"
                  data-testid="booking-name-input"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
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
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    data-testid="booking-email-input"
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
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="+91 98765 43210"
                    data-testid="booking-phone-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Select Session Duration *</label>
                <div className="grid grid-cols-3 gap-3" data-testid="session-duration-selector">
                  {Object.entries(SESSION_PRICING).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSessionDuration(key)}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        selectedSessionDuration === key 
                          ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200' 
                          : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                      }`}
                      data-testid={`session-${key}-btn`}
                    >
                      <p className="font-bold text-lg text-gray-800">{key} min</p>
                      <p className={`text-sm font-semibold ${selectedSessionDuration === key ? 'text-teal-600' : 'text-teal-600'}`}>
                        ₹{value.price}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              {selectedSessionDuration && (
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100" data-testid="price-summary">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Session Duration:</span>
                    <span className="font-semibold">{SESSION_PRICING[selectedSessionDuration].duration}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-teal-200">
                    <span className="font-semibold text-lg">Total:</span>
                    <span className="font-bold text-xl text-teal-600">₹{SESSION_PRICING[selectedSessionDuration].price}</span>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Calendar className="inline w-4 h-4 mr-2" />Preferred Date *
                  </label>
                  <input 
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    data-testid="booking-date-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    <Clock className="inline w-4 h-4 mr-2" />Preferred Time *
                  </label>
                  <select 
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    data-testid="booking-time-select"
                  >
                    <option value="">Select time...</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Do you want to tell more?</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about what brings you here today (optional)..."
                  data-testid="booking-message-textarea"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                data-testid="submit-booking-btn"
              >
                {isSubmitting ? 'Submitting...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* UPI Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Pay via UPI</h3>
              <p className="text-gray-600">Safe & Secure Payment</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-1">Amount to Pay</p>
                <p className="text-3xl font-bold text-green-600" data-testid="payment-amount">₹{finalPrice || 999}</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">UPI ID</p>
                <p className="font-mono font-semibold text-lg">aashwashan@upi</p>
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" /> Secure
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" /> Instant
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" /> Easy
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePaymentComplete}
                className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors font-semibold"
                data-testid="confirm-payment-btn"
              >
                I've Completed Payment
              </button>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-full hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              UPI is the safest and most secure way to pay in India
            </p>
          </div>
        </div>
      )}

      {/* Message Therapist Modal */}
      {isMessageModalOpen && bookedTherapist && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <img src={bookedTherapist.image} alt={bookedTherapist.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold">{bookedTherapist.name}</h3>
                  <p className="text-sm text-green-600">● Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 min-h-[200px]">
              <div className="bg-teal-100 rounded-lg p-3 max-w-[80%] mb-3">
                <p className="text-sm text-teal-800">Hi! I'm here to help. Feel free to share what's on your mind.</p>
                <p className="text-xs text-teal-600 mt-1">{bookedTherapist.name}</p>
              </div>
              <p className="text-xs text-gray-500 text-center">Your therapist will respond when available</p>
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={messageText}
                onChange={handleMessageChange}
                placeholder="Type your message... (no numbers allowed)"
                className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 focus:border-teal-500 focus:outline-none"
                data-testid="message-input"
              />
              <button
                onClick={sendMessage}
                disabled={!messageText.trim()}
                className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full hover:shadow-lg transition-all flex items-center justify-center disabled:bg-gray-300"
                data-testid="send-message-btn"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Numbers are not allowed in messages for your privacy</p>
          </div>
        </div>
      )}

      {/* Help Me Find Modal */}
      {isHelpMeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Find Your Perfect Match</h3>
              <button
                onClick={() => setIsHelpMeModalOpen(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="flex space-x-2 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`h-2 flex-1 rounded-full ${helpMeStep >= step ? 'bg-purple-600' : 'bg-gray-200'}`}
                />
              ))}
            </div>

            {helpMeStep === 1 && (
              <div>
                <p className="text-gray-600 mb-6">What's your primary concern?</p>
                <div className="space-y-3">
                  {['anxiety', 'depression', 'stress', 'relationship', 'grief', 'other'].map((concern) => (
                    <button
                      key={concern}
                      onClick={() => {
                        setHelpMeAnswers({...helpMeAnswers, concern});
                        setHelpMeStep(2);
                      }}
                      className={`w-full p-4 rounded-xl border-2 text-left capitalize hover:border-purple-600 hover:bg-purple-50 transition-colors ${helpMeAnswers.concern === concern ? 'border-purple-600 bg-purple-50' : 'border-gray-200'}`}
                    >
                      {concern === 'other' ? 'Something else' : concern}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {helpMeStep === 2 && (
              <div>
                <p className="text-gray-600 mb-6">How long have you been experiencing this?</p>
                <div className="space-y-3">
                  {[
                    { value: 'recent', label: 'Recently (less than a month)' },
                    { value: 'moderate', label: 'A few months' },
                    { value: 'long', label: 'More than 6 months' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setHelpMeAnswers({...helpMeAnswers, duration: option.value});
                        setHelpMeStep(3);
                      }}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 text-left hover:border-purple-600 hover:bg-purple-50 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {helpMeStep === 3 && (
              <div>
                <p className="text-gray-600 mb-6">What's most important to you in a therapist?</p>
                <div className="space-y-3">
                  {[
                    { value: 'experience', label: 'Years of experience' },
                    { value: 'specialty', label: 'Specialized expertise' },
                    { value: 'approach', label: 'Warm and empathetic approach' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setHelpMeAnswers({...helpMeAnswers, preference: option.value});
                        runMatchingAlgorithm();
                      }}
                      className="w-full p-4 rounded-xl border-2 border-gray-200 text-left hover:border-purple-600 hover:bg-purple-50 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {helpMeStep === 4 && recommendedTherapist && (
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
                  <p className="text-sm text-purple-600 font-medium mb-3">🎯 Our Algorithm Recommends</p>
                  <img 
                    src={recommendedTherapist.image} 
                    alt={recommendedTherapist.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
                  />
                  <h4 className="text-xl font-bold mb-1">{recommendedTherapist.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{recommendedTherapist.role}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {recommendedTherapist.skills.map((skill, idx) => (
                      <span key={idx} className="bg-white text-purple-700 text-xs px-3 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                  <p className="text-green-600 font-bold">Rs {recommendedTherapist.price} per session</p>
                </div>
                <button
                  onClick={() => {
                    setIsHelpMeModalOpen(false);
                    openBookingModal(recommendedTherapist);
                  }}
                  className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition-colors font-semibold"
                >
                  Book with {recommendedTherapist.name}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Symptom Modal */}
      {isSymptomModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{selectedService.title}</h3>
                <p className="text-gray-600 text-sm">Signs and Symptoms</p>
              </div>
              <button
                onClick={closeSymptomModal}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                data-testid="close-symptom-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedService.description}
                </p>
              </div>

              {selectedService.symptoms && selectedService.symptoms.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-4 text-gray-800">Common Signs & Symptoms:</h4>
                  <div className="grid gap-3">
                    {selectedService.symptoms.map((symptom, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-teal-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 text-center border border-teal-100">
                <h4 className="text-lg font-bold mb-2 text-gray-800">Ready to Get Help?</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  If you're experiencing these symptoms, our professional therapists are here to support you.
                </p>
                <button
                  onClick={() => {
                    closeSymptomModal();
                    openBookingModal(null);
                  }}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                  data-testid="book-from-symptom-modal"
                >
                  Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breathing Exercise Modal */}
      {isBreathingModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center relative">
            <button
              onClick={() => {
                stopBreathingExercise();
                setIsBreathingModalOpen(false);
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold mb-4">4-4-4 Breathing Exercise</h3>
            
            {breathingPhase === 'ready' && (
              <div>
                <div className="bg-teal-50 rounded-xl p-4 mb-6">
                  <p className="text-gray-700 mb-2">
                    This technique helps calm your nervous system.
                  </p>
                  <p className="text-teal-700 font-medium text-sm">
                    🔊 Voice guidance & sounds enabled
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-4 mb-6 text-sm text-gray-600">
                  <span className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Inhale 4s</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>Hold 4s</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>Exhale 4s</span>
                </div>
                <button
                  onClick={startBreathingExercise}
                  className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition-colors font-semibold"
                >
                  Start Exercise
                </button>
              </div>
            )}

            {breathingPhase !== 'ready' && breathingPhase !== 'complete' && (
              <div>
                <div className={`w-36 h-36 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-1000 shadow-lg ${
                  breathingPhase === 'inhale' ? 'bg-gradient-to-br from-blue-400 to-blue-600 scale-125' : 
                  breathingPhase === 'hold' ? 'bg-gradient-to-br from-purple-400 to-purple-600 scale-125' : 
                  'bg-gradient-to-br from-green-400 to-green-600 scale-100'
                }`}>
                  <span className="text-white text-5xl font-bold">{breathingCount}</span>
                </div>
                <p className="text-2xl font-semibold capitalize text-gray-800 mb-2">
                  {breathingPhase === 'inhale' && '🌬️ Breathe In...'}
                  {breathingPhase === 'hold' && '⏸️ Hold...'}
                  {breathingPhase === 'exhale' && '💨 Breathe Out...'}
                </p>
                <p className="text-sm text-gray-500">
                  {breathingPhase === 'inhale' && 'Fill your lungs slowly'}
                  {breathingPhase === 'hold' && 'Keep the air in'}
                  {breathingPhase === 'exhale' && 'Release slowly'}
                </p>
              </div>
            )}

            {breathingPhase === 'complete' && (
              <div>
                <div className="w-32 h-32 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
                <p className="text-xl font-semibold text-gray-800 mb-2">Great job!</p>
                <p className="text-gray-600 mb-4">You completed 3 breathing cycles</p>
                <button
                  onClick={() => {
                    stopBreathingExercise();
                    startBreathingExercise();
                  }}
                  className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors font-medium mr-2"
                >
                  Do Again
                </button>
                <button
                  onClick={() => {
                    stopBreathingExercise();
                    setIsBreathingModalOpen(false);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gratitude Journal Modal */}
      {isGratitudeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Gratitude Journal</h3>
              <button
                onClick={() => setIsGratitudeModalOpen(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Write down 3 things you're grateful for today. It can be big or small!
            </p>

            <div className="space-y-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={gratitudeEntries[index]}
                    onChange={(e) => {
                      const newEntries = [...gratitudeEntries];
                      newEntries[index] = e.target.value;
                      setGratitudeEntries(newEntries);
                    }}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
                    placeholder={`I'm grateful for...`}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                toast({
                  title: "Gratitude Saved!",
                  description: "Remember, gratitude shifts your focus to positivity. Keep it up!",
                });
                setGratitudeEntries(['', '', '']);
                setIsGratitudeModalOpen(false);
              }}
              className="w-full mt-6 bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition-colors font-semibold"
            >
              Save & Feel Good
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
