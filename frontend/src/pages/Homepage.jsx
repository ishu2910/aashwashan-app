  import React from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { Phone, CheckCircle, Users, Home as HomeIcon, Heart, HeartHandshake, ShieldCheck, Clock, ChevronDown, ChevronUp, X, Calendar, User, Mail, Wind, BookHeart, Activity, MessageCircle, HelpCircle, Send, CreditCard, Moon, ArrowRight, Sparkles, TrendingUp, Compass, Lock } from 'lucide-react';
  import { services, team, testimonials, faqs } from '../data/mockData';
  import axios from 'axios';
  import { toast } from '../hooks/use-toast';
  import { useAuth } from '../context/AuthContext';
  import SEO from "@/components/SEO";
  import AOS from "aos";
  import "aos/dist/aos.css";
 


  const API = "https://aashwashan-app-1.onrender.com/api";
  
  // Get session pricing based on therapist
  const getSessionPricing = (therapist) => {
    const pricing = {
      '45': { duration: '45 minutes', price: parseInt(therapist?.price45 || 999) }
    };
    // Only add 60 min option if therapist has price60 set (not null)
    if (therapist?.price60) {
      pricing['60'] = { duration: '60 minutes', price: parseInt(therapist.price60) };
    }
    return pricing;
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
    const navigate = useNavigate();
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
    const [storyOpen, setStoryOpen] = React.useState(false);
    const storyContentRef = React.useRef(null);
    const [storyProgress, setStoryProgress] = React.useState(0);
    
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

    React.useEffect(() => {
  AOS.init({
    duration: 900,
    once: true,
    easing: "ease-out-cubic",
    offset: 80,
      });
    }, []);

   React.useEffect(() => {
  if (storyOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [storyOpen]);

  React.useEffect(() => {
  const container = storyContentRef.current;

  if (!container) return;

  const handleScroll = () => {
    const scrollTop = container.scrollTop;
    const maxScroll =
      container.scrollHeight - container.clientHeight;

    const progress =
      maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

    setStoryProgress(progress);
  };

  container.addEventListener("scroll", handleScroll);

  return () =>
    container.removeEventListener("scroll", handleScroll);
}, [storyOpen]); 

    const toggleFAQ = (index) => {
      setOpenFaqIndex(openFaqIndex === index ? -1 : index);
    };

    const openBookingModal = (therapist = null) => {
    setSelectedTherapist(therapist);

    // Reset form every time
    setFormData({
      name: "",
      email: "",
      phone: "",
      sessionDuration: "",
      date: "",
      time: "",
      message: ""
    });

    setSelectedSessionDuration("");
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

    // Get dynamic pricing based on selected therapist
    const SESSION_PRICING = selectedTherapist ? getSessionPricing(selectedTherapist) : getSessionPricing({});

    // Calculate final price based on session duration
    const calculatePrice = () => {
      if (!selectedSessionDuration) return 0;
      return SESSION_PRICING[selectedSessionDuration]?.price || 999;
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
        sessionDuration: SESSION_PRICING[selectedSessionDuration]?.duration || '45 minutes',
        price: calculatePrice(),
        message: `Requested therapist: ${selectedTherapist?.name || 'Any'}. Session: ${SESSION_PRICING[selectedSessionDuration]?.duration || '45 minutes'}. ${formData.message}`,
        therapist_name: selectedTherapist?.name || 'Any Available'
      };
      
      try {
        // Send appointment request via email to care@aashwashan.com
        await axios.post(`${API}/appointments/request`, appointmentData);
        
        closeModal();
        setBookingComplete(true);
        toast({
          title: "Request Submitted!",
          description: "We've received your booking request. Our team will contact you within 24 hours to confirm your session.",
        });
        
      } catch (error) {
        console.error('Error submitting appointment:', error);
        toast({
          title: "Error",
          description: "There was an error submitting your request. Please try again.",
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
    <>
      <SEO
    title="Aashwashan | Online Therapy & Counselling with Licensed Psychologists"
    description="Connect with experienced psychologists through secure online therapy sessions. Aashwashan provides compassionate support for anxiety, depression, stress, relationships, and emotional wellbeing across India."
    keywords="online therapy India, online psychologist, counselling psychologist, anxiety therapy, depression counselling, relationship counselling, mental health support"
    url="https://aashwashan.com/"
  />
      <div className="overflow-hidden">      {/* HERO SECTION: How are you Feeling Today? - With Rotating Background Images */}
        <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
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

          {/* Animated floating elements — hidden on mobile for performance */}
          <div className="hidden sm:block absolute top-20 left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-pulse-soft"></div>
          <div className="hidden sm:block absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-soft delay-500"></div>

          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
            <p className="text-teal-200 font-medium uppercase tracking-[0.3em] text-sm mb-6 animate-fade-in delay-100">
              Hope is real. Healing is possible.
            </p>
            
            <h1 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 sm:mb-8 leading-tight animate-fade-in delay-200"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              How are you feeling<br />
              <span className="italic font-normal text-teal-200"></span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              You don't have to face this alone. Whatever you're going through, we're here to listen, understand, and help you move forward—one conversation at a time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-400">
              <button
                  onClick={() => openBookingModal(null)}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 font-medium text-base sm:text-lg shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 w-full sm:w-auto sm:min-w-[280px] flex items-center justify-center gap-2"
                data-testid="book-session-hero-btn"
              >
                <span>Book Your First Session</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  setIsHelpMeModalOpen(true);
                  setHelpMeStep(1);
                  setHelpMeAnswers({ concern: '', duration: '', preference: '' });
                  setRecommendedTherapist(null);
                }}
                className="bg-white/15 backdrop-blur-md text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full hover:bg-white/25 hover:-translate-y-1 transition-all duration-300 font-medium text-base sm:text-lg border border-white/30 w-full sm:w-auto sm:min-w-[280px] hover:scale-105"
                data-testid="help-me-find-btn-hero"
              >
                Find the Right Therapist
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm animate-fade-in delay-500">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-teal-400 flex items-center justify-center text-white text-xs">✓</span> 100% Confidential
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-teal-400 flex items-center justify-center text-white text-xs">✓</span> Licensed Therapists
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-teal-400 flex items-center justify-center text-white text-xs">✓</span> Safe & Secure
              </span>
            </div>
          </div>

          {/* Hero image indicators - REMOVED to fix visual glitch */}

          {/* Decorative wave - Hidden on mobile to prevent white box glitch */}
          <div className="absolute bottom-0 left-0 right-0 hidden md:block">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* SECTION 2: How Life Feels Better After Therapy */}
        <section className="py-12 sm:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-16">
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
                { title: 'Feel More Like Yourself', desc: 'Enjoy the little moments again', img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=200' }
              ].map((item, idx) => (
                <div
key={idx}
data-aos="fade-up"
data-aos-delay={idx * 120} 
                  className="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 text-center border border-teal-100
  hover:-translate-y-3 hover:scale-[1.03]
  hover:shadow-[0_25px_60px_rgba(20,184,166,0.15)]
  hover:border-teal-300
  transition-all duration-500"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="mb-4 h-24 flex items-center justify-center">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg
  transition-all duration-500
  group-hover:scale-110
  group-hover:rotate-3" 
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-teal-800 transition-colors duration-300 group-hover:text-teal-600" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h4>
                  <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-gray-700">{item.desc}</p>
                </div>
              ))}
            </div>

            
          </div>
        </section>

        

        {/* SECTION: Meet Our Therapists */}
<section
  id="therapists"
  className="py-16 sm:py-20 bg-white"
>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Talk to someone who gets it.
                </h2>
                <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
                  Book a session with a therapist who understands your journey. Online, private, and at your pace.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Free first session available with selected therapists
                </div>
              </div>

              {/* Therapist Cards */}
              <div className="space-y-5 mb-10">
                {team.map((member) => (
    <div
key={member.id}
data-aos="fade-up"
data-aos-delay={member.id * 120}
className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-white rounded-3xl border border-slate-200 p-5 lg:p-6 shadow-sm
hover:shadow-2xl
hover:border-teal-200
hover:-translate-y-2
transition-all duration-500"
                    data-testid={`homepage-therapist-${member.id}`}
                  >
                    <div className="w-full aspect-square sm:w-28 sm:h-28 lg:w-40 lg:h-40 rounded-3xl overflow-hidden shrink-0 border border-gray-200 shadow-lg">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{member.name}</h4>
                      <p className="text-sm text-gray-500">
    {member.role}
    <div className="mt-3 flex items-center gap-2 justify-center sm:justify-start">

  <div className="flex text-amber-400 text-sm">
    ★★★★★
  </div>

  <span className="text-xs text-gray-500">
    4.9 (186 Reviews)
  </span>

</div>
  </p>

  <p className="text-xs font-semibold text-teal-600 mt-1">
    {
      member.name === "Prakhar Tiwari"
        ? "500+ Sessions Conducted"
        : member.name === "Anushka"
        ? "250+ Sessions Conducted"
        : member.name === "Sonali Mishra"
        ? "800+ Sessions Conducted"
        : member.name === "Kanika Dhariwal"
        ? "200+ Sessions Conducted"
        : member.experience
    }
  </p>

              <p className="text-xs font-semibold text-gray-700 mt-2 mb-2">
    Works Best With
  </p>       

                      <div className="mt-1 max-w-[380px]">

    {/* Desktop Animation */}
    <div className="hidden sm:overflow-hidden sm:block">
      <div className="flex w-max gap-2 whitespace-nowrap animate-marquee">
        {[...member.skills, ...member.skills].map((skill, idx) => (
          <span
            key={idx}
            className="bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* Mobile Static Chips */}
    <div className="flex flex-wrap gap-2 sm:hidden mt-1">
      {member.skills?.map((skill, idx) => (
        <span
          key={idx}
          className="bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
        >
          {skill}
        </span>
      ))}
    </div>

  </div>
                    </div>
                    
                    <div className="flex flex-col items-end justify-center gap-3 shrink-0 min-w-[170px]">

    <span className="text-sm font-bold text-teal-600">
      From ₹{member.price45 || "999"}
    </span>

    {member.name === "Prakhar Tiwari" || member.name === "Kanika Dhariwal" ? (
      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        🎁 1st Session Free
      </span>
    ) : (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
        💵 1st Session Paid
      </span>
    )}
    <button
  onClick={() => navigate(`/therapists/${member.id}`)}
  className="w-full mb-3 rounded-full border border-teal-200 bg-white py-3 text-sm font-semibold text-teal-700 transition-all duration-300 hover:bg-teal-50 hover:border-teal-400"
>
  View Full Profile →
</button>
    <button
      onClick={() => openBookingModal(member)}
      className="mt-2 w-full rounded-full bg-teal-600 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-700 hover:shadow-xl hover:scale-105"
    >
      Book Session
    </button>

  </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
    onClick={() => openBookingModal(null)}
    className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
  >
    Book Your Session
  </button>
              </div>
            </div>
          </div>
        </section>



        {/* SECTION: How It Works - Professional Timeline */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-teal-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-16">
              <p className="text-teal-600 font-medium uppercase tracking-[0.2em] text-sm mb-4">Your Healing Journey</p>
              <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                How It Works
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A simple, supportive process designed around you
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Professional Timeline */}
              <div className="relative">
                {/* Connection Line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal-200 via-cyan-300 to-teal-200 transform -translate-y-1/2 z-0"></div>
                
                <div className="grid md:grid-cols-4 gap-8 relative z-10">
                  {[
                    { num: '01', title: "Recognize", subtitle: "The First Step", desc: 'Acknowledge that you need support. Asking for help is a sign of strength.', icon: Heart },
                    { num: '02', title: "Connect", subtitle: "Reach Out", desc: 'Book a session or take our assessment. We\'re here to listen without judgment.', icon: Phone },
                    { num: '03', title: "Match", subtitle: "Find Your Therapist", desc: 'We\'ll connect you with the therapist who best understands your concerns.', icon: Users },
                    { num: '04', title: "One Step at a Time", subtitle: "Feel Better", desc: 'Small conversations can lead to meaningful change. Healing happens at your own pace.', icon: Sparkles }
                  ].map((step, idx) => (
                    <div
key={idx}
data-aos="zoom-in-up"
data-aos-delay={idx * 150}
className="text-center group">
                      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                        {/* Step Number */}
                        <div className="relative mb-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <step.icon className="w-10 h-10" />
                          </div>
                          <span className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                            {step.num}
                          </span>
                        </div>
                        
                        <h4 className="text-xl font-bold mb-1 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>{step.title}</h4>
                        <p className="text-teal-600 text-sm font-medium mb-3">{step.subtitle}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-12">
                <button
                    onClick={() => openBookingModal(null)}
                  className="inline-flex items-center bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-full font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 gap-2"
                >
                  Start Your Journey Today
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>


  {/* STORY SECTION */}
<section className="py-24 bg-white">
  <div className="container mx-auto px-4">

    <div
      className="group relative overflow-hidden hover:scale-[1.01] rounded-[36px] border border-teal-200 bg-gradient-to-br from-white via-teal-50 to-cyan-50 p-10 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_35px_80px_rgba(13,148,136,.18)]"
    >

      {/* Background Glow */}
      <div className="absolute -top-28 -right-24 h-[420px] w-[420px] rounded-full bg-gradient-to-r from-teal-300/30 to-cyan-300/20 blur-[120px] transition-all duration-1000 group-hover:scale-150"></div>

<div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-orange-200/20 blur-[120px] transition-all duration-1000 group-hover:scale-125"></div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">

        
        {/* LEFT */}
<div
  data-aos="fade-right"
  className="relative z-10 max-w-2xl"
>
  {/* Badge */}
<div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 backdrop-blur-md px-5 py-2 shadow-sm">
  <span className="h-2.5 w-2.5 rounded-full bg-teal-500 animate-pulse"></span>

  <p className="uppercase tracking-[0.35em] text-xs font-semibold text-teal-600">
    FOUNDER STORY
  </p>
</div>

<h2
  className="mt-8 text-5xl lg:text-7xl font-semibold leading-[1.02] text-gray-900"
  style={{ fontFamily: "'Playfair Display', serif" }}
>
  Before Aashwashan...
  <br />
  there was
a journey
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
    {" "}that changed
my life.
  </span>
</h2>

<p className="mt-12 text-2xl leading-relaxed text-gray-700">
 From the outside,

everything looked normal.

Until one day...

it didn't.
</p>

<p className="mt-10 max-w-xl text-lg leading-9 text-gray-600">

  I had never experienced anything like it before.

  <br /><br />

  I didn't know what was happening to me.

  <br /><br />

  For almost three months,
  I ignored it.

  <br /><br />

  People around me kept saying,

</p>

<div className="mt-8 rounded-3xl border border-orange-200 bg-orange-50 px-7 py-6">

  <p className="text-xl font-medium text-gray-900">

    "Kuch nahi hota."

  </p>

  <p className="mt-3 text-gray-700">

    "Listen to some music."

  </p>

  <p className="mt-3 text-gray-700">

    "You'll be fine."

  </p>

</div>

<p className="mt-8 max-w-xl text-lg leading-9 text-gray-600">

  I believed them.

  <br /><br />

  Until my symptoms became so severe...

  that I finally asked for professional help.

</p>

<div className="mt-14 inline-block">

  <button
    onClick={() => setStoryOpen(true)}
    className="storyBtn group"
  >
    <span>Read the Story Behind Aashwashan</span>

    <ArrowRight
      size={20}
      className="transition-transform duration-500 group-hover:translate-x-2"
    />

  </button>

  <div className="mt-6 flex items-center gap-3">

    <div className="h-px w-12 bg-orange-300"></div>

    <p className="text-sm tracking-wide text-gray-500">

      Around 3 minutes • Personal Story

    </p>

  </div>
<div className="mt-10">

  <p
    className="text-xl text-gray-900"
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
    — Ishan Goyal
  </p>

  <p className="mt-2 text-sm text-gray-500">
    Founder, Aashwashan
  </p>

</div>
</div>
</div>
{/* RIGHT SIDE */}

<div
  data-aos="fade-left"
  className="relative flex flex-col lg:block h-auto lg:h-[820px] -mt-10 items-center justify-center gap-8 lg:gap-0 overflow-visible perspective-[1800px]"
>

  {/* Floating Glow */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

  <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-r from-teal-300/25 via-cyan-300/20 to-orange-200/15 blur-[140px] animate-pulse"></div>

</div>

{/* Memory Card 01 */}

<div
  data-aos="zoom-in-right"
  data-aos-delay="150"
  className="group relative lg:absolute lg:left-0 lg:top-6 w-full max-w-[320px] lg:w-[300px]
  rounded-[34px]
  bg-white/90
  backdrop-blur-xl
  border border-white/70
  shadow-[0_30px_90px_rgba(0,0,0,.10)]
  rotate-[-10deg]
  transition-all duration-700
  hover:rotate-0
  hover:scale-[1.02]
  hover:-translate-y-4
  hover:z-50
  hover:shadow-[0_45px_120px_rgba(13,148,136,.22)]"
>

  <div className="p-0 overflow-hidden">

    {/* Image */}
<div className="h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-[34px]">

  <img
    src="https://res.cloudinary.com/qqjn11uq/image/upload/v1786038646/ChatGPT_Image_Aug_6_2026_11_20_27_PM_vfqae3.png"
    alt="Beginning"
    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
  />

</div>

<div className="p-8">

  <span className="uppercase tracking-[0.28em] text-[11px] font-bold text-teal-600">
    Everything 
    <br />
    Looked Normal.
  </span>

  <h3
    className="mt-5 text-[32px] leading-[1.08] font-semibold text-gray-900"
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
    If you had
    <br />
    met me then...

  </h3>

  <p className="mt-5 text-[15px] leading-7 text-gray-500">
    you would've thought
    everything was fine.
  </p>

</div>

</div>
</div>

  {/* Memory Card 02 */}

<div
  data-aos="zoom-in"
  data-aos-delay="350"
  className="group relative lg:absolute lg:left-[34%]
lg:-translate-x-1/2
lg:top-20
z-20 w-full max-w-[360px] lg:w-[360px]
  rounded-[38px]
  bg-gradient-to-br
  from-orange-500
  via-orange-400
  to-amber-400
  text-white
  shadow-[0_40px_100px_rgba(249,115,22,.38)]
  rotate-[10deg]
  transition-all duration-700
  hover:rotate-0
  hover:scale-[1.02]
  hover:-translate-y-4
  hover:z-50
  hover:shadow-[0_60px_140px_rgba(249,115,22,.45)]"
>

  <div className="p-0 overflow-hidden">

    <div className="h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-[38px]">

      <img
        src="https://res.cloudinary.com/qqjn11uq/image/upload/v1786038789/ChatGPT_Image_Aug_6_2026_11_22_59_PM_jdqf5x.png"
        alt="Wrong advice"
        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
      />

    </div>

    <div className="p-9">

      <span className="uppercase tracking-[0.28em] text-[11px] font-semibold text-white/70">
        Something Changed.
      </span>

      <h3
        className="mt-5 text-[30px] leading-[1.15] font-semibold"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        I didn't know
        what was happening.
        <br />
        I thought
        it would pass.

      </h3>

      <div className="mt-6 h-px bg-white/20"></div>

      <p className="mt-5 text-[15px] leading-7 text-white/90">

        "Listen to some music."

        <br /><br />

        "You'll be fine."

        <br /><br />

        I believed them.

      </p>

    </div>

  </div>

</div>
{/* Memory Card 03 */}

<div
  data-aos="zoom-in-left"
  data-aos-delay="550"
  className="group relative lg:absolute lg:right-0
lg:bottom-0
z-30
 w-full max-w-[320px] lg:w-[300px]
  rounded-[36px]
  bg-gradient-to-br
  from-teal-600
  via-cyan-500
  to-teal-700
  text-white
  shadow-[0_40px_100px_rgba(13,148,136,.35)]
  rotate-[-14deg]
  transition-all duration-700
  hover:rotate-0
  hover:scale-[1.02]
  hover:-translate-y-4
  hover:z-50
  hover:shadow-[0_60px_130px_rgba(13,148,136,.45)]"
>

  <div className="p-0 overflow-hidden">

    {/* Image */}

    <div className="h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-[36px]">

      <img
        src="https://res.cloudinary.com/qqjn11uq/image/upload/v1786038910/ChatGPT_Image_Aug_6_2026_11_24_58_PM_qro2bz.png"
        alt="Asking for help"
        className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
      />

    </div>

    {/* Content */}

    <div className="p-9">

      <span className="uppercase tracking-[0.28em] text-[11px] font-semibold text-white/70">
        I Asked
        For Help.
      </span>

      <h3
        className="mt-5 text-[30px] leading-[1.1] font-semibold"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
       The hardest step...
        <br />
        became the best
decision I made.
      </h3>

      <div className="mt-6 h-px bg-white/20"></div>

      <p className="mt-5 text-[15px] leading-7 text-white/90">

        The decision
        I feared the most...

        <br /><br />

        became the decision
        that changed
        my life.

      </p>

    </div>

  </div>

</div>

</div>
    </div>
</div>
  </div>
</section>

        {/* SECTION: Self-Help Tools */}
        <section id="self-help-tools" className="py-12 sm:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-16">
              <p className="text-teal-600 font-medium uppercase tracking-[0.2em] text-sm mb-4">TOOLS & RESOURCES</p>
              <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                Tools for Your Well-Being
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Practical, therapist-informed tools to help you understand your emotions, manage daily challenges, and support your mental well-being.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div
              data-aos="fade-up"
              data-aos-delay="100"
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 h-full flex flex-col hover:shadow-xl transition-all duration-300 text-center border border-teal-100">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wind className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-teal-800">Calm Corner</h4>
                <p className="text-gray-600 mb-6 text-sm flex-grow">
                  Feeling overwhelmed? Take a moment to breathe, slow down, and reconnect with yourself using our guided breathing exercise.
                </p>
                <button
                  onClick={() => setIsBreathingModalOpen(true)}
                  className="mt-auto bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-medium"
                  data-testid="breathing-exercise-btn"
                >
                  Open Calm Corner
                </button>
              </div>

              <div
  data-aos="fade-up"
  data-aos-delay="200"
  className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 h-full flex flex-col hover:shadow-xl transition-all duration-300 text-center border border-teal-100"
>
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookHeart className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-teal-800">Reflection Journal</h4>
                <p className="text-gray-600 mb-6 text-sm flex-grow">
                  Write your thoughts, emotions, or moments of gratitude. Small reflections today can create meaningful change tomorrow.
                </p>
                <button
                  onClick={() => setIsGratitudeModalOpen(true)}
                  className="mt-auto bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-medium"
                  data-testid="gratitude-journal-btn"
                >
                  Start Writing
                </button>
              </div>

              <div
  data-aos="fade-up"
  data-aos-delay="300"
  className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 h-full flex flex-col hover:shadow-xl transition-all duration-300 text-center border border-teal-100"
>
    <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
      <Activity className="w-10 h-10 text-white" />
    </div>

    <h4 className="text-xl font-semibold mb-3 text-teal-800">
      Mental Health Assessment
    </h4>

    <p className="text-gray-600 mb-6 text-sm flex-grow">
    Take clinically validated assessments to better understand your anxiety, stress, depression, and overall emotional well-being.
    </p>

    <Link
      to="/self-assessment"
      className="mt-auto inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-medium"
    >
      Start Assessment
    </Link>
  </div>

              <div
  data-aos="fade-up"
  data-aos-delay="400"
  className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl p-8 h-full flex flex-col hover:shadow-xl transition-all duration-300 text-center border border-gray-200"
>

    <div className="w-20 h-20 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
      <Lock className="w-10 h-10 text-white" />
    </div>

    <h4 className="text-xl font-semibold mb-3 text-gray-800">
      Learning Centre
    </h4>

    <p className="text-gray-600 mb-6 text-sm flex-grow">
      Discover therapist-curated articles, practical exercises, and evidence-based resources to support your mental well-being.
    </p>

    <button
      disabled
      className="mt-auto bg-gray-300 text-gray-600 px-6 py-2 rounded-lg font-medium cursor-not-allowed"
    >
      Coming Soon ✨
    </button>
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
          <div className="mt-10 text-center">
    <p className="text-gray-600 mb-5 max-w-2xl mx-auto">
      Self-help tools are a great place to begin, but lasting healing often comes through meaningful conversations with a mental health professional.
    </p>

    <button
      onClick={() => openBookingModal(null)}
      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
    >
      Talk to a Psychologist
    </button>
  </div>

        </section>

        {/* SECTION: What Our Clients Say */}
        <section className="py-12 sm:py-24 bg-gradient-to-br from-gray-50 to-teal-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-16">
              <p className="text-teal-600 font-medium uppercase tracking-[0.2em] text-sm mb-4">Testimonials</p>
              <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                What Our Clients Say
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Every story started with one small step. Today, these journeys remind others that healing is possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id}
data-aos="flip-left" className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100
  transition-all duration-500
  hover:-translate-y-3
  hover:shadow-[0_25px_60px_rgba(20,184,166,0.15)]
  hover:border-teal-200">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center
  transition-all duration-500
  group-hover:scale-110
  group-hover:rotate-6
  group-hover:shadow-xl">
                      {getTestimonialIcon(testimonial.icon)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 transition-colors duration-300 group-hover:text-teal-600">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
    key={i}
    className="w-5 h-5 text-teal-500 transition-transform duration-300 group-hover:scale-125"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-5xl text-teal-100 font-serif leading-none mb-3 select-none">
    “
  </div>
                  <p className="text-gray-600 italic leading-8 text-[16px] transition-colors duration-300 group-hover:text-gray-700">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: FAQ */}
        <section className="py-12 sm:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-16">
              <p className="text-teal-600 font-medium uppercase tracking-[0.2em] text-sm mb-4">FAQs</p>
              <h3 className="text-3xl lg:text-4xl font-semibold mb-4 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                Frequently Asked Questions
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Find answers to common questions about our mental health services and what to expect.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.slice(0, 6).map((faq, index) => (
                <div 
                  key={faq.id}
data-aos="fade-up" 
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

        
  {storyOpen && (
  <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-xl flex items-center justify-center p-3 md:p-6 animate-fade-in">

    {/* Main Container */}
    <div
  className="
  relative
  w-[92vw]
  md:w-[94vw]
  max-w-[980px]
  h-[78vh]
  md:h-[82vh]
  mx-auto
  my-4 md:my-6
  bg-[#FCFCFB]
  rounded-[20px] md:rounded-[32px]
  overflow-hidden
  shadow-[0_40px_120px_rgba(0,0,0,.18)]
  border
  border-white/60
  flex
  flex-col
  animate-[storyReveal_.45s_ease]
"
>
  <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal-200/25 blur-[160px] pointer-events-none" />

<div className="absolute -bottom-52 -left-40 w-[450px] h-[450px] rounded-full bg-orange-200/20 blur-[180px] pointer-events-none" />

      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200">

        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">

          <div>

            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-teal-600">
              Founder Story
            </p>

            <h2
              className="text-2xl md:text-3xl font-semibold mt-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Story Behind Aashwashan
            </h2>

          </div>

          <button
  onClick={() => setStoryOpen(false)}
  className="
    absolute
    top-6
    right-6
    z-50
    w-12
    h-12
    rounded-full
    bg-white/90
    backdrop-blur-xl
    border
    border-gray-200
    shadow-lg
    flex
    items-center
    justify-center
    transition-all
    duration-300
    hover:scale-110
    hover:bg-white
    hover:rotate-90
  "
>
  <X size={22} className="text-gray-700" />
</button>

        </div>

        {/* Progress Bar */}

        <div className="h-[3px] w-full bg-gray-200">

          <div
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-200"
            style={{
              width: `${storyProgress}%`
            }}
          />

        </div>

      </div>

      {/* Scroll Area */}

     <div
  ref={storyContentRef}
  className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-10"
>

        {/* ================= HERO ================= */}

<div className="max-w-4xl mx-auto px-5 md:px-10 pt-14 md:pt-20">

  <div className="overflow-hidden rounded-[28px] shadow-[0_25px_70px_rgba(0,0,0,.10)]">

  <img
    src="https://res.cloudinary.com/qqjn11uq/image/upload/v1786038646/ChatGPT_Image_Aug_6_2026_11_20_27_PM_vfqae3.png"
    alt="Everything Looked Normal"
    className="w-full h-[240px] md:h-[300px] lg:h-[360px] object-cover"
  />

  </div>

  <div className="max-w-3xl mx-auto text-center mt-20">

    <p className="uppercase tracking-[0.45em] text-xs font-semibold text-teal-600">

      THE JOURNEY BEHIND AASHWASHAN

    </p>

    <h1
      className="mt-8 text-6xl lg:text-8xl leading-[0.95] font-semibold text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      Everything

      <br />

      Looked Normal.

    </h1>

    <p className="mt-14 text-[24px] leading-[2] text-gray-600">

      If you had met me then...

    </p>

  </div>

</div>

{/* Divider */}

<div className="flex justify-center py-24">

  <div className="w-px h-24 bg-gradient-to-b from-transparent via-teal-400 to-transparent"></div>

</div>

{/* ================= SECTION 1 ================= */}

<section className="max-w-3xl mx-auto px-8 lg:px-12">

  <div className="space-y-12 text-[22px] leading-[2] text-gray-700">

    <p>

      You would've thought

      everything was fine.

    </p>

    <p>

      College.

      Friends.

      Family.

      Dreams.

    </p>

    <p>

      I laughed.

    </p>

    <p>

      I made plans.

    </p>

    <p>

      I kept showing up.

    </p>

  </div>

  <div className="my-24 rounded-[36px] border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-14">

    <p
      className="text-4xl leading-relaxed text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      From the outside...

      <br /><br />

      everything looked

      completely normal.

    </p>

  </div>

  <div className="space-y-12 text-[22px] leading-[2] text-gray-700">

    <p>

      And honestly...

    </p>

    <p>

      I believed that too.

    </p>

    <p
      className="text-4xl leading-tight text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      Until one day...

    </p>

    <p
      className="text-5xl leading-none text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      everything changed.

    </p>

  </div>

</section>

{/* Divider */}

<div className="flex justify-center py-28">

  <div className="w-px h-24 bg-gradient-to-b from-transparent via-orange-400 to-transparent"></div>

</div>

{/* ================= SECTION 2 ================= */}

<section className="max-w-5xl mx-auto px-8 lg:px-12">

  <div className="overflow-hidden rounded-[28px] shadow-[0_25px_70px_rgba(0,0,0,.10)]">

    <img
      src="https://res.cloudinary.com/qqjn11uq/image/upload/v1786038789/ChatGPT_Image_Aug_6_2026_11_22_59_PM_jdqf5x.png"
      alt="Something Changed"
      className="w-full h-[240px] md:h-[300px] lg:h-[360px] object-cover"
    />

  </div>

  <div className="mt-20">

    <h1
      className="text-6xl lg:text-7xl leading-[0.95] font-semibold text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      Something
      <br />
      Changed.
    </h1>

    <div className="mt-8 h-px w-24 bg-gradient-to-r from-orange-500 to-transparent"></div>

  </div>

  <div className="mt-16 space-y-12 text-[22px] leading-[2] text-gray-700">

    <p>

      It didn't happen overnight.

    </p>

    <p>

      It started with
      depressive symptoms.

    </p>

    <p>

      I had never experienced
      anything like it before.

    </p>

    <p>

      I didn't know
      what was happening.

    </p>

    <p>

      I kept telling myself...

    </p>

  </div>

  <div className="my-24 rounded-[36px] border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-14">

    <p
      className="text-4xl leading-relaxed text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      It'll pass.

      <br /><br />

      I just need some time.

    </p>

  </div>

  <div className="space-y-12 text-[22px] leading-[2] text-gray-700">

    <p>

      But it didn't.

    </p>

    <p
      className="text-4xl leading-tight text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      It only became harder.

    </p>

  </div>

</section>

{/* Divider */}

<div className="flex justify-center py-28">

  <div className="w-px h-24 bg-gradient-to-b from-transparent via-orange-400 to-transparent"></div>

</div>

{/* ================= SECTION 3 ================= */}

<section className="max-w-5xl mx-auto px-8 lg:px-12">

  <div className="overflow-hidden rounded-[36px] shadow-[0_40px_120px_rgba(0,0,0,.12)]">

    <img
      src="https://res.cloudinary.com/qqjn11uq/image/upload/v1786039018/ChatGPT_Image_Aug_6_2026_11_26_48_PM_ddwqkl.png"
      alt="Wrong Advice"
      className="w-full h-[240px] md:h-[300px] lg:h-[360px] object-cover"
    />

  </div>

  <div className="mt-20">

    <h1
      className="text-6xl lg:text-7xl leading-[0.95] font-semibold text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      "Kuch
      <br />
      Nahi
      <br />
      Hota."

    </h1>

    <div className="mt-8 h-px w-24 bg-gradient-to-r from-orange-500 to-transparent"></div>

  </div>

  <div className="mt-16 space-y-12 text-[22px] leading-[2] text-gray-700">

    <p>

      I asked people around me.

    </p>

    <p>

      Most of them
      genuinely wanted to help.

    </p>

    <p>

      But they didn't understand
      what I was going through.

    </p>

  </div>

  <div className="my-24 rounded-[36px] border border-orange-200 bg-orange-50 p-14">

    <p
      className="text-4xl leading-relaxed text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      "Kuch nahi hota."

    </p>

    <p className="mt-8 text-2xl text-gray-700">

      "Listen to some music."

    </p>

    <p className="mt-6 text-2xl text-gray-700">

      "You'll be fine."

    </p>

  </div>

  <div className="space-y-12 text-[22px] leading-[2] text-gray-700">

    <p>

      So...

    </p>

    <p>

      I believed them.

    </p>

    <p>

      I waited.

    </p>

    <p
      className="text-4xl leading-tight text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      Nothing changed.

    </p>

  </div>

</section>

{/* Divider */}

<div className="flex justify-center py-28">

  <div className="w-px h-24 bg-gradient-to-b from-transparent via-teal-400 to-transparent"></div>

</div>

{/* ================= SECTION 4 ================= */}

<section className="max-w-5xl mx-auto px-8 lg:px-12">

  <div className="overflow-hidden rounded-[36px] shadow-[0_40px_120px_rgba(0,0,0,.12)]">

    <img
      src="https://res.cloudinary.com/qqjn11uq/image/upload/v1786038910/ChatGPT_Image_Aug_6_2026_11_24_58_PM_qro2bz.png"
      alt="Asking For Help"
      className="w-full h-[240px] md:h-[300px] lg:h-[360px] object-cover"
    />

  </div>

  <div className="mt-20">

    <h1
      className="text-6xl lg:text-7xl leading-[0.95] font-semibold text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      I Asked
      <br />
      For Help.
    </h1>

    <div className="mt-8 h-px w-24 bg-gradient-to-r from-teal-500 to-transparent"></div>

  </div>

  <div className="mt-16 space-y-12 text-[22px] leading-[2] text-gray-700">

    <p>

      When my symptoms became
      impossible to ignore...

    </p>

    <p>

      I finally booked
      a therapy session.

    </p>

    <p>

      I didn't know
      what to expect.

    </p>

    <p>

      I was nervous.

    </p>

  </div>

  <div className="my-24 rounded-[36px] border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-14">

    <p
      className="text-4xl leading-relaxed text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      Asking for help

      <br /><br />

      was the hardest step.

    </p>

  </div>

  <div className="space-y-12 text-[22px] leading-[2] text-gray-700">

    <p>

      But it became

      the best decision

      I could have made.

    </p>

    <p>

      For the first time...

    </p>

    <p
      className="text-4xl leading-tight text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      I felt understood.

    </p>

  </div>

</section>

{/* Divider */}

<div className="flex justify-center py-28">

  <div className="w-px h-24 bg-gradient-to-b from-transparent via-orange-400 to-transparent"></div>

</div>

{/* ================= FINAL SECTION ================= */}

<section className="max-w-5xl mx-auto px-8 lg:px-12 pb-24">

  <div className="overflow-hidden rounded-[36px] shadow-[0_40px_120px_rgba(0,0,0,.12)]">

    <img
      src="https://res.cloudinary.com/qqjn11uq/image/upload/v1786039212/ChatGPT_Image_Aug_6_2026_11_29_58_PM_i4gnrt.png"
      alt="Why Aashwashan Exists"
      className="w-full h-[240px] md:h-[300px] lg:h-[360px] object-cover"
    />

  </div>

  <div className="mt-20">

    <h1
      className="text-6xl lg:text-7xl leading-[0.95] font-semibold text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      Why
      <br />
      Aashwashan
      <br />
      Exists.
    </h1>

    <div className="mt-8 h-px w-24 bg-gradient-to-r from-orange-500 to-transparent"></div>

  </div>

  <div className="mt-16 space-y-12 text-[22px] leading-[2] text-gray-700">

    <p>

      Looking back...

    </p>

    <p>

      I didn't need
      people to tell me,

      "Kuch nahi hota."

    </p>

    <p>

      I needed someone

      who understood.

    </p>

  </div>

  <div className="my-24 rounded-[36px] border border-orange-200 bg-orange-50 p-14">

    <p
      className="text-4xl leading-relaxed text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      It's okay

      <br />

      to ask for help.

    </p>

  </div>

  <div className="space-y-12 text-[22px] leading-[2] text-gray-700">

    <p>

      If getting help

      changed my life...

    </p>

    <p>

      maybe someone else

      deserves that chance too.

    </p>

    <p
      className="text-5xl leading-tight text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      That's why

      Aashwashan exists.

    </p>

  </div>

</section>

{/* ================= EPILOGUE ================= */}

<div className="max-w-4xl mx-auto px-8 lg:px-12 pt-20 pb-10">

  <div className="flex justify-center mb-20">

    <div className="w-px h-28 bg-gradient-to-b from-transparent via-teal-500 to-transparent"></div>

  </div>

  <div className="text-center">

    <p
      className="text-5xl lg:text-6xl leading-[1.15] text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      This wasn't
      <br />
      the end.
    </p>

    <p className="mt-12 text-[22px] leading-[2] text-gray-600 max-w-3xl mx-auto">

      It was the beginning of understanding,
      healing,
      and creating something that could help others
      reach support sooner than I did.

    </p>

  </div>

</div>

{/* ================= QUOTE ================= */}

<div className="max-w-5xl mx-auto px-8 lg:px-12 pb-20">

  <div className="rounded-[40px] border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-16 text-center shadow-[0_30px_90px_rgba(0,0,0,.08)]">

    <p
      className="text-4xl lg:text-5xl leading-[1.5] text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      Asking for help

      <br /><br />

      was the decision

      <br />

      that changed my life.

    </p>

  </div>

</div>

{/* ================= ENDING ================= */}

<div className="max-w-3xl mx-auto px-8 lg:px-12 pb-28">

  <div className="text-center">

    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-100 mb-10">

      <Heart className="w-9 h-9 text-teal-600" />

    </div>

    <h2
      className="text-5xl leading-tight text-gray-900"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >

      Thank you

      <br />

      for reading.

    </h2>

    <p className="mt-10 text-xl leading-9 text-gray-600">

      If this journey resonates with you,

      know that asking for help is okay.

    </p>

    <button
      onClick={() => {
  setStoryOpen(false);

  setTimeout(() => {
    document.getElementById("therapists")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 300);
}}
      className="mt-14 inline-flex items-center gap-3 rounded-full bg-teal-600 px-8 py-4 text-white font-medium transition-all duration-300 hover:bg-teal-700 hover:scale-105"
    >

      Find Professional Support

      <ArrowRight size={20} />

    </button>

  </div>

</div>

      </div>

    </div>

  </div>
)}   

        {/* Booking Modal - Human-made Design */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header with warm gradient */}
              <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-5 rounded-t-3xl">
                <div className="flex justify-between items-start">
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <p className="text-sm text-teal-100 font-medium">100% Confidential</p>
                    </div>
                  <h3 className="text-2xl font-bold">
    {selectedTherapist
      ? `Book with ${selectedTherapist.name.split(" ")[0]}`
      : "Book Your Session"}
  </h3>
                    {selectedTherapist && (
                      <p className="text-teal-100 mt-1">with {selectedTherapist.name} • {selectedTherapist.role}</p>
                    )}
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    data-testid="close-booking-modal"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Form with friendly styling */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Encouragement message */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100">
                  <p className="text-orange-800 text-sm font-medium text-center">
                    Taking this step takes courage. We're proud of you for prioritizing your mental health.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    <User className="inline w-4 h-4 mr-2 text-teal-500" />What should we call you? *
                  </label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Your name"
                    data-testid="booking-name-input"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      <Mail className="inline w-4 h-4 mr-2 text-teal-500" />Email *
                    </label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="your@email.com"
                      data-testid="booking-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      <Phone className="inline w-4 h-4 mr-2 text-teal-500" />Phone *
                    </label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="+91 98765 43210"
                      data-testid="booking-phone-input"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    <Phone className="inline w-4 h-4 mr-2 text-orange-500" />Emergency Contact Number (Optional)
                  </label>
                  <input 
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Emergency contact number"
                    data-testid="booking-emergency-input"
                  />
                  <p className="text-xs text-gray-500 mt-1">Someone we can reach in case of emergency</p>
                </div>

                <div>

                  
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">
        Choose Your Psychologist *
      </label>

      <select
        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none transition-all bg-gray-50 focus:bg-white"
        value={selectedTherapist?.name || ""}
        onChange={(e) => {
          const therapist = team.find((t) => t.name === e.target.value);
          setSelectedTherapist(therapist || null);
        }}
        required
      >
        <option value="">Choose a psychologist...</option>

        {team.map((member) => (
    <option key={member.id} value={member.name}>
      {member.name} • {member.role}
      {(member.name === "Prakhar Tiwari" ||
        member.name === "Kanika Dhariwal")
        ? " 🎁 First Session FREE"
        : ""}
    </option>
  ))}
      </select>
    </div>
                    
                  {selectedTherapist && (
    <div className="mt-4 rounded-2xl border border-teal-200 bg-teal-50 p-4">
      <div className="flex items-center gap-4">
        <img
          src={selectedTherapist.image}
          alt={selectedTherapist.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
        />

        <div className="flex-1">
          <h4 className="font-bold text-gray-900">
            {selectedTherapist.name}
          </h4>

          <p className="text-sm text-gray-600">
            {selectedTherapist.role}
          </p>

          <p className="text-xs text-teal-700 font-semibold mt-1">
            {
              selectedTherapist.name === "Prakhar Tiwari"
                ? "500+ Sessions Conducted"
                : selectedTherapist.name === "Sonali Mishra"
                ? "800+ Sessions Conducted"
                : selectedTherapist.name === "Kanika Dhariwal"
                ? "200+ Sessions Conducted"
                : "250+ Sessions Conducted"
            }
          </p>
        </div>
      </div>
    </div>
  )}

                  <label className="block text-sm font-semibold mb-3 text-gray-700">Choose your session length *</label>
                  <div className="grid grid-cols-2 gap-4" data-testid="session-duration-selector">
                    {Object.entries(SESSION_PRICING).map(([key, value]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedSessionDuration(key)}
                        className={`p-5 rounded-2xl border-2 text-center transition-all duration-300 ${
                          selectedSessionDuration === key 
                            ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 ring-4 ring-teal-100 scale-[1.02]' 
                            : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
                        }`}
                        data-testid={`session-${key}-btn`}
                      >
                        <p className="font-bold text-xl text-gray-800">{key} min</p>
                        <p className={`text-2xl font-bold mt-1 ${selectedSessionDuration === key ? 'text-teal-600' : 'text-teal-500'}`}>
                          ₹{value.price}
                        </p>
                        {key === '45' && <p className="text-xs text-gray-500 mt-1">Most popular</p>}
                      </button>
                    ))}
                  </div>
                </div>

              {selectedTherapist &&
  (selectedTherapist.name === "Prakhar Tiwari" ||
    selectedTherapist.name === "Kanika Dhariwal") && (
    <div className="rounded-xl bg-green-50 border border-green-200 p-4">
      <p className="text-green-700 font-semibold text-sm">
        🎁 Great news! Your first session with{" "}
        {selectedTherapist.name.split(" ")[0]} is FREE.
      </p>
    </div>
  )}

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
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      <Calendar className="inline w-4 h-4 mr-2 text-teal-500" />When works for you? *
                    </label>
                    <input 
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                      data-testid="booking-date-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      <Clock className="inline w-4 h-4 mr-2 text-teal-500" />What time? *
                    </label>
                    <select 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none transition-all bg-gray-50 focus:bg-white"
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
                  <label className="block text-sm font-semibold mb-2 text-gray-700">What would you like help with?</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                    placeholder="Briefly tell us what's been on your mind..."
                    data-testid="booking-message-textarea"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                  data-testid="submit-booking-btn"
                >
                  {isSubmitting
    ? "Submitting your request..."
    : selectedTherapist
    ? `Book with ${selectedTherapist.name.split(" ")[0]}`
    : "Book My Session"}
                </button>
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
    <p className="text-center text-sm font-medium text-blue-700">
      💙 No payment required today. We'll confirm everything before your session.
    </p>
  </div>
                <p className="text-xs text-gray-500 text-center">
                  Our team will contact you within 24 hours to confirm your session.
                </p>
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
      </>
      
    );
  };

  export default Homepage;
