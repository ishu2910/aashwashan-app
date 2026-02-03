import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, CheckCircle, Users, Home as HomeIcon, Heart, Clock, ChevronDown, ChevronUp, X, Calendar, User, Mail, Wind, BookHeart, Activity, MessageCircle, HelpCircle, Send, CreditCard } from 'lucide-react';
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

const COUPON_CODE = 'Aashwashan20';
const COUPON_DISCOUNT = 0.20; // 20% discount

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
  
  // Session booking state
  const [selectedSessionDuration, setSelectedSessionDuration] = React.useState('');
  const [couponCode, setCouponCode] = React.useState('');
  const [couponApplied, setCouponApplied] = React.useState(false);
  const [couponError, setCouponError] = React.useState('');
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    sessionDuration: '',
    date: '',
    time: '',
    message: ''
  });

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
    setCouponCode('');
    setCouponApplied(false);
    setCouponError('');
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

  // Calculate final price based on session duration and coupon
  const calculatePrice = () => {
    if (!selectedSessionDuration) return 0;
    const basePrice = SESSION_PRICING[selectedSessionDuration].price;
    if (couponApplied) {
      return Math.round(basePrice * (1 - COUPON_DISCOUNT));
    }
    return basePrice;
  };

  // Apply coupon code
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === COUPON_CODE.toUpperCase()) {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
    }
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
    setIsSubmitting(true);
    
    const appointmentData = {
      ...formData,
      message: `Requested therapist: ${selectedTherapist?.name}. ${formData.message}`
    };
    
    try {
      await axios.post(`${API}/appointments`, appointmentData);
      
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
      case 'users': return <Users className="w-8 h-8 text-blue-600" />;
      case 'heart': return <Heart className="w-8 h-8 text-pink-600" />;
      default: return <User className="w-8 h-8 text-purple-600" />;
    }
  };

  return (
    <div className="overflow-hidden">
      {/* SECTION 1: Ignoring Signs Section - NOW AT TOP */}
      <section className="py-12 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-red-700">
              Ignoring the signs of mental illness is one of the worst things you can do.
            </h2>
            <p className="text-gray-700 text-lg">
              Start by noticing, not judging, your emotions. Anxiety, irritability, sadness and even anger are natural human emotions. What matters is how we relate to them.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: How Life Feels Better After Therapy */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800">How Life Feels Better After Therapy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Real improvements that make a difference in your daily life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-4 h-24 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1758273239288-9b60777397c5?w=200" alt="Sleep Better" className="w-20 h-20 object-cover rounded-full" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">Sleep Better</h4>
              <p className="text-gray-600 text-sm">Restful nights and peaceful mornings</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-4 h-24 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1763723341417-a4ea5ba6f675?w=200" alt="Think Clearer" className="w-20 h-20 object-cover rounded-full" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">Think Clearer</h4>
              <p className="text-gray-600 text-sm">Better focus and decision making</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-4 h-24 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1559551538-d4d5a9e85124?w=200" alt="Feel Lighter" className="w-20 h-20 object-cover rounded-full" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">Feel Lighter</h4>
              <p className="text-gray-600 text-sm">Less emotional burden, more joy</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-4 h-24 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1738084737196-031b26793ed0?w=200" alt="Build Resilience" className="w-20 h-20 object-cover rounded-full" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">Build Resilience</h4>
              <p className="text-gray-600 text-sm">Bounce back stronger from challenges</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-4 h-24 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1592598015799-35c84b09394c?w=200" alt="Become Yourself" className="w-20 h-20 object-cover rounded-full" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-gray-800">Become Yourself</h4>
              <p className="text-gray-600 text-sm">Rediscover who you truly are</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Booking Header Section - UPDATED */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Booking a Therapist is now just one step away</h2>
            <div className="inline-flex items-center space-x-4">
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-semibold">
                ✓ 100% Confidential
              </span>
              <Link 
                to="/team"
                className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Meet Our Therapists →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Meet Our Experts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">OUR TEAM</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">Meet Our Expert Therapists</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              Our team of licensed professionals brings years of experience and compassionate care to help you achieve mental wellness.
            </p>
          </div>

          {/* Help Me Find Popup Trigger */}
          <div className="text-center mb-10">
            <button
              onClick={() => {
                setIsHelpMeModalOpen(true);
                setHelpMeStep(1);
                setHelpMeAnswers({ concern: '', duration: '', preference: '' });
                setRecommendedTherapist(null);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-semibold inline-flex items-center space-x-2"
              data-testid="help-me-find-btn"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Don't know whom to book? Let us help you!</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-bold text-lg">{member.name}</p>
                    <p className="text-blue-200 text-sm">{member.role}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {member.skills && member.skills.map((skill, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{member.experience} experience</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold">Rs {member.price} only</span>
                    <button
                      onClick={() => openBookingModal(member)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 font-medium text-sm"
                      data-testid={`book-session-${member.id}`}
                    >
                      Book Session
                    </button>
                  </div>
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

          <div className="text-center mt-10">
            <Link to="/team" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold">
              View All Team Members
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: How We Support You */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">HOW WE HELP</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">How We Support You</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              Experiencing any of these symptoms? Book a therapy session and let us help you find relief and regain control of your life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">{service.description}</p>
                  <button
                    onClick={() => openSymptomModal(service)}
                    className="text-blue-600 font-medium hover:underline text-sm"
                    data-testid={`symptoms-${service.id}`}
                  >
                    How do I know I am going through this?
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: How It Works - Updated Cycle */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              Your journey from struggle to strength
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Visual Cycle */}
            <div className="grid md:grid-cols-4 gap-4 relative">
              <div className="text-center bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6">
                <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h4 className="font-bold mb-2 text-red-700">You're Struggling</h4>
                <p className="text-gray-600 text-sm">Feeling overwhelmed, anxious, or lost</p>
              </div>
              <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6">
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h4 className="font-bold mb-2 text-yellow-700">You Reach Out</h4>
                <p className="text-gray-600 text-sm">Share your concerns with us confidentially</p>
              </div>
              <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h4 className="font-bold mb-2 text-blue-700">Aashwashan Connects</h4>
                <p className="text-gray-600 text-sm">We match you with the right therapist</p>
              </div>
              <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h4 className="font-bold mb-2 text-green-700">You Heal & Grow</h4>
                <p className="text-gray-600 text-sm">Together, we create your path to wellness</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Why Aashwashan */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">WHY CHOOSE US</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">Why Aashwashan?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              We provide professional, compassionate care that makes a real difference in your mental health journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2">From Your Comfort Zone</h4>
              <p className="text-gray-600 text-sm">Therapy from anywhere you feel safe</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2">Making You Self-Reliant</h4>
              <p className="text-gray-600 text-sm">Building skills for lifelong wellness</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2">Real People. Real Support.</h4>
              <p className="text-gray-600 text-sm">Genuine care from qualified professionals</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2">Guided, Not Generic</h4>
              <p className="text-gray-600 text-sm">Personalized care tailored to you</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Self-Help Tools */}
      <section id="self-help-tools" className="py-16 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-semibold uppercase tracking-wider text-sm mb-3">SELF-HELP TOOLS</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">Take Care of Yourself</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              Simple tools you can use right now to feel better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wind className="w-10 h-10 text-teal-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">4-4-4 Breathing</h4>
              <p className="text-gray-600 mb-4 text-sm">
                A simple technique to calm your nervous system and reduce anxiety instantly.
              </p>
              <button
                onClick={() => setIsBreathingModalOpen(true)}
                className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors font-medium"
                data-testid="breathing-exercise-btn"
              >
                Try Now
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookHeart className="w-10 h-10 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">Gratitude Journal</h4>
              <p className="text-gray-600 mb-4 text-sm">
                Write down 3 things you're grateful for. It shifts your focus to positivity.
              </p>
              <button
                onClick={() => setIsGratitudeModalOpen(true)}
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors font-medium"
                data-testid="gratitude-journal-btn"
              >
                Start Writing
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="w-10 h-10 text-orange-600" />
              </div>
              <h4 className="text-xl font-bold mb-3">Move Your Body</h4>
              <p className="text-gray-600 mb-4 text-sm">
                Feeling anxious? Go for a run, walk, or any physical exercise. Movement releases endorphins.
              </p>
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-orange-700 text-sm font-medium">
                  "Even 10 minutes of movement can reduce anxiety by 20%"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: What Our Clients Say */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">TESTIMONIALS</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">What Our Clients Say</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              Real stories from real people who found healing and hope through our mental health services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    {getTestimonialIcon(testimonial.icon)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">FAQS</p>
            <h3 className="text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-base">
              Find answers to common questions about our mental health services and what to expect.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.slice(0, 6).map((faq, index) => (
              <div 
                key={faq.id} 
                className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left"
                >
                  <h4 className="text-lg font-bold pr-8">{faq.question}</h4>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
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

      {/* SECTION 11: ROI Line */}
      <section className="py-8 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl lg:text-2xl font-semibold">
            💡 Spending Rs 1 on mental health can give 4x return
          </p>
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
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="+91 98765 43210"
                    data-testid="booking-phone-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Select Service *</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                  data-testid="booking-service-select"
                >
                  <option value="">Choose a service...</option>
                  {services.map(service => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </div>

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
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
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
                <label className="block text-sm font-semibold mb-2">Additional Information</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about what brings you here today (optional)..."
                  data-testid="booking-message-textarea"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                <p className="text-3xl font-bold text-green-600">Rs {bookedTherapist?.price || '1500'}</p>
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
              <div className="bg-blue-100 rounded-lg p-3 max-w-[80%] mb-3">
                <p className="text-sm text-blue-800">Hi! I'm here to help. Feel free to share what's on your mind.</p>
                <p className="text-xs text-blue-600 mt-1">{bookedTherapist.name}</p>
              </div>
              <p className="text-xs text-gray-500 text-center">Your therapist will respond when available</p>
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={messageText}
                onChange={handleMessageChange}
                placeholder="Type your message... (no numbers allowed)"
                className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-600 focus:outline-none"
                data-testid="message-input"
              />
              <button
                onClick={sendMessage}
                disabled={!messageText.trim()}
                className="w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-gray-300"
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
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
                <h4 className="text-lg font-bold mb-2 text-gray-800">Ready to Get Help?</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  If you're experiencing these symptoms, our professional therapists are here to support you.
                </p>
                <button
                  onClick={() => {
                    closeSymptomModal();
                    openBookingModal(null);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold"
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
