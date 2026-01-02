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
    price: "120",
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
    price: "400",
    duration: "per month",
    features: [
      "4 sessions per month",
      "Priority scheduling",
      "Unlimited email support",
      "Resource materials",
      "Crisis support line access",
      "Save $80 per month"
    ],
    recommended: true
  },
  {
    id: 3,
    name: "Couples Therapy",
    price: "180",
    duration: "per session",
    features: [
      "75-minute session",
      "Relationship assessment",
      "Homework assignments",
      "Communication tools",
      "Follow-up support"
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
    question: "Do you accept insurance?",
    answer: "Yes, we accept most major insurance plans. Please contact our office with your insurance information, and we'll verify your coverage and explain any out-of-pocket costs."
  },
  {
    id: 3,
    question: "What should I expect in my first session?",
    answer: "Your first session is about getting to know you. We'll discuss what brought you to therapy, your goals, and how we can help. It's a safe, judgment-free space where you can share openly."
  },
  {
    id: 4,
    question: "How long does therapy typically last?",
    answer: "The duration of therapy varies for each individual. Some people benefit from short-term therapy (8-12 sessions), while others prefer ongoing support. We'll work together to determine what's best for you."
  },
  {
    id: 5,
    question: "Is therapy confidential?",
    answer: "Yes, everything you share in therapy is confidential. We follow strict ethical guidelines and privacy laws to protect your information. There are rare exceptions required by law, which we'll discuss during your first session."
  },
  {
    id: 6,
    question: "Can I do therapy online?",
    answer: "Absolutely! We offer secure video therapy sessions for your convenience. Online therapy is just as effective as in-person sessions and allows you to receive support from the comfort of your home."
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "5 Signs You Might Benefit from Therapy",
    excerpt: "Discover the common indicators that suggest it might be time to seek professional mental health support.",
    category: "Mental Health",
    author: "Dr. Sarah Mitchell",
    date: "December 15, 2024",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/5119607/pexels-photo-5119607.jpeg",
    content: "Full blog post content would go here..."
  },
  {
    id: 2,
    title: "Managing Anxiety in Uncertain Times",
    excerpt: "Learn practical strategies to cope with anxiety and maintain your mental well-being during challenging periods.",
    category: "Anxiety",
    author: "Dr. Emily Rodriguez",
    date: "December 10, 2024",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/5069423/pexels-photo-5069423.jpeg",
    content: "Full blog post content would go here..."
  },
  {
    id: 3,
    title: "The Importance of Self-Care in Mental Health",
    excerpt: "Explore why self-care is essential for maintaining good mental health and how to incorporate it into your daily routine.",
    category: "Wellness",
    author: "Dr. Michael Chen",
    date: "December 5, 2024",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg",
    content: "Full blog post content would go here..."
  }
];