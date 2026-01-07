// Mock data for Aashwashan Mental Health Website

export const services = [
  {
    id: 1,
    title: "Managing Mood Swings",
    icon: "activity",
    description: "Are you experiencing unpredictable emotional ups and downs? We provide compassionate care to help you understand and stabilize your mood.",
    fullDescription: "If you're struggling with persistent mood swings that affect your daily life, relationships, or work, professional support can help. Our specialized therapy helps adults understand the root causes of emotional fluctuations and develop effective strategies to achieve emotional stability. Through evidence-based techniques, we work with you to identify triggers, develop coping strategies, and build lasting emotional resilience.",
    benefits: ["Emotion regulation techniques", "Trigger identification", "Personalized coping strategies", "Long-term stability support"],
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507"
  },
  {
    id: 2,
    title: "Overcoming Persistent Worry",
    icon: "alert-circle",
    description: "Constant worrying keeping you up at night? Learn to break free from the cycle of anxiety and find peace of mind.",
    fullDescription: "If you find yourself constantly worrying about everything - from daily tasks to future uncertainties - you don't have to suffer alone. Persistent worry can be exhausting and overwhelming, affecting your sleep, concentration, and quality of life. Our specialized treatment helps adults break free from chronic worry patterns using cognitive-behavioral therapy and mindfulness techniques. We help you identify worry patterns, challenge anxious thoughts, and develop healthy mental habits that bring peace of mind.",
    benefits: ["CBT for worry management", "Mindfulness techniques", "Thought reframing", "Anxiety reduction"],
    image: "https://images.unsplash.com/photo-1714976694525-71eb29a7c500"
  },
  {
    id: 3,
    title: "Crisis Support",
    icon: "heart",
    description: "Experiencing suicidal thoughts or in mental health crisis? Immediate, compassionate support is available. You're not alone.",
    fullDescription: "If you're experiencing suicidal thoughts or going through a severe mental health crisis, please know that help is available and your life matters. Our crisis intervention services provide immediate, compassionate support for adults in distress. We offer a safe, non-judgmental space to talk, assess your situation, develop safety plans, and connect you with ongoing care. Whether you're in crisis right now or worried about someone else, we're here to help you find hope and healing.",
    benefits: ["Immediate crisis support", "Safety planning", "24/7 emergency access", "Compassionate care"],
    image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg"
  },
  {
    id: 4,
    title: "Combating Low Energy & Fatigue",
    icon: "battery",
    description: "Feeling constantly exhausted and unmotivated? Discover the underlying causes and regain your energy and zest for life.",
    fullDescription: "If you're experiencing persistent fatigue, lack of motivation, or feeling emotionally drained despite adequate rest, there may be underlying psychological factors at play. Chronic low energy can significantly impact your quality of life, relationships, and productivity. Our therapy addresses the psychological and emotional factors contributing to fatigue, including depression, stress, and burnout. We help you understand the root causes of your exhaustion and develop comprehensive strategies to restore your energy, motivation, and zest for life.",
    benefits: ["Energy restoration techniques", "Depression treatment", "Lifestyle modifications", "Motivation building"],
    image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7"
  }
];

export const team = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "Clinical Psychologist",
    specialization: "Anxiety & Depression",
    experience: "15+ years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    bio: "Dr. Mitchell specializes in cognitive behavioral therapy and has helped hundreds of clients overcome anxiety and depression.",
    education: "Ph.D. in Clinical Psychology, Harvard University"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Licensed Therapist",
    specialization: "Family & Couples Therapy",
    experience: "12+ years",
    image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
    bio: "Dr. Chen is passionate about helping families and couples build stronger, healthier relationships.",
    education: "Ph.D. in Marriage and Family Therapy, UCLA"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Child Psychologist",
    specialization: "Child & Adolescent Therapy",
    experience: "10+ years",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd",
    bio: "Dr. Rodriguez specializes in working with children and teenagers, providing a safe space for young minds to heal and grow.",
    education: "Ph.D. in Child Psychology, Stanford University"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    role: "Psychiatrist",
    specialization: "Medication Management",
    experience: "20+ years",
    image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg",
    bio: "Dr. Wilson provides comprehensive psychiatric care, specializing in medication management for mental health conditions.",
    education: "M.D. Psychiatry, Johns Hopkins University"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Jennifer Thompson",
    role: "Individual Therapy Client",
    rating: 5,
    text: "Aashwashan has truly changed my life. The therapists here are compassionate, professional, and genuinely care about their clients' well-being. I've made tremendous progress in managing my anxiety.",
    image: "https://images.unsplash.com/photo-1573495804664-b1c0849525af"
  },
  {
    id: 2,
    name: "Mark & Lisa Davis",
    role: "Couples Counseling",
    rating: 5,
    text: "Our marriage was on the brink of collapse, but the couples therapy we received here helped us rebuild our relationship. We learned to communicate better and understand each other's needs.",
    image: "https://images.unsplash.com/photo-1604881991720-f91add269bed"
  },
  {
    id: 3,
    name: "Robert Martinez",
    role: "Depression Support Client",
    rating: 5,
    text: "After years of struggling with depression, I finally found hope at Aashwashan. The support and guidance I received helped me reclaim my life and find joy again.",
    image: "https://images.unsplash.com/photo-1551847677-dc82d764e1eb"
  }
];

export const pricingPlans = [
  {
    id: 1,
    name: "Individual Session",
    price: "3,500",
    duration: "per session",
    features: [
      "50-minute session",
      "Personalized treatment plan",
      "Flexible scheduling",
      "Secure video/in-person options",
      "Progress tracking"
    ],
    recommended: false
  },
  {
    id: 2,
    name: "Monthly Package",
    price: "12,000",
    duration: "per month",
    features: [
      "4 sessions per month",
      "Priority scheduling",
      "Unlimited email support",
      "Resource materials",
      "Crisis support line access",
      "Save Rs. 2,000 per month"
    ],
    recommended: true
  },
  {
    id: 3,
    name: "Quarterly Package",
    price: "32,000",
    duration: "3 months",
    features: [
      "12 sessions (3 months)",
      "Dedicated therapist",
      "Priority support",
      "Comprehensive assessment",
      "Progress reports",
      "Save Rs. 10,000"
    ],
    recommended: false
  }
];

export const faqs = [
  {
    id: 1,
    question: "How do I book an appointment?",
    answer: "You can book an appointment by calling us at (555) 123-4567, filling out the contact form on our website, or clicking the 'Book Appointment' button. We'll get back to you within 24 hours to confirm your appointment."
  },
  {
    id: 2,
    question: "What should I expect in my first session?",
    answer: "Your first session is about getting to know you. We'll discuss what brought you to therapy, your goals, and how we can help. It's a safe, judgment-free space where you can share openly."
  },
  {
    id: 3,
    question: "How long does therapy typically last?",
    answer: "The duration of therapy varies for each individual. Some people benefit from short-term therapy (8-12 sessions), while others prefer ongoing support. We'll work together to determine what's best for you."
  },
  {
    id: 4,
    question: "Is therapy confidential?",
    answer: "Yes, everything you share in therapy is confidential. We follow strict ethical guidelines and privacy laws to protect your information. There are rare exceptions required by law, which we'll discuss during your first session."
  },
  {
    id: 5,
    question: "Can I do therapy online?",
    answer: "Absolutely! We offer secure video therapy sessions for your convenience. Online therapy is just as effective as in-person sessions and allows you to receive support from the comfort of your home."
  },
  {
    id: 6,
    question: "What if I need help urgently?",
    answer: "If you're in crisis or experiencing suicidal thoughts, please call Tele MANAS at 14416 immediately. This is a free, 24/7 mental health helpline that provides immediate support in multiple Indian languages."
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Why 80% of Indians Don't Receive Timely Psychiatric Care",
    excerpt: "Over 80% of Indians needing psychiatric care do not receive timely treatment due to stigma, lack of awareness, and shortage of mental health professionals.",
    category: "Mental Health Crisis",
    author: "Daphne Clarance",
    date: "January 6, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    content: "Full article content...",
    source: "India Today"
  },
  {
    id: 2,
    title: "Marks vs Mental Health: Finding the Balance in Parenting",
    excerpt: "Parents struggle between academic pressure and children's mental wellbeing. Experts discuss how to strike the right balance for holistic development.",
    category: "Parenting & Mental Health",
    author: "Times of India",
    date: "December 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
    content: "Full article content...",
    source: "Times of India"
  },
  {
    id: 3,
    title: "Government Launches National Mental Health Survey After 9-Year Gap",
    excerpt: "After nearly a decade, the Indian government announces a comprehensive nationwide mental health survey to assess current mental healthcare needs and gaps.",
    category: "Government Initiative",
    author: "Times of India",
    date: "December 15, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    content: "Full article content...",
    source: "Times of India"
  },
  {
    id: 4,
    title: "Mental Health Stigma in Workplace: Naukri Survey 2025 Reveals Truth",
    excerpt: "New survey shows 67% of Indian employees hesitate to discuss mental health at work due to fear of judgment and career impact.",
    category: "Workplace Mental Health",
    author: "Business Standard",
    date: "October 10, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800",
    content: "Full article content...",
    source: "Business Standard"
  },
  {
    id: 5,
    title: "Empowering Mental Health in India: Policy and Practice",
    excerpt: "Analysis of India's mental health policies, challenges in implementation, and the path forward for accessible mental healthcare for all citizens.",
    category: "Policy Analysis",
    author: "Drishti IAS",
    date: "November 20, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
    content: "Full article content...",
    source: "Drishti IAS"
  },
  {
    id: 6,
    title: "More Indian Men Are Seeking Mental Health Help",
    excerpt: "Breaking stereotypes: Mumbai sees 40% increase in men seeking therapy as stigma around male mental health slowly diminishes in urban India.",
    category: "Breaking Stigma",
    author: "Times of India",
    date: "August 15, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1571406252226-33176e2ed8d3?w=800",
    content: "Full article content...",
    source: "Times of India"
  }
];