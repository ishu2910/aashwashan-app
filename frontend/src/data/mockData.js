// Mock data for Aashwashan Mental Health Website

export const services = [
  {
    id: 1,
    title: "Individual Therapy",
    icon: "user",
    description: "One-on-one sessions focused on your personal growth, mental wellness, and emotional healing.",
    fullDescription: "Our individual therapy sessions provide a safe, confidential space where you can explore your thoughts, feelings, and behaviors. We work collaboratively to help you overcome challenges, develop coping strategies, and achieve your personal goals.",
    benefits: ["Personalized treatment plans", "Flexible scheduling", "Evidence-based approaches", "Confidential environment"],
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507"
  },
  {
    id: 2,
    title: "Couples Counseling",
    icon: "users",
    description: "Strengthen your relationship through guided communication and understanding.",
    fullDescription: "Couples counseling helps partners improve their relationship by enhancing communication, resolving conflicts, and rebuilding trust. Our therapists create a neutral space where both partners can express themselves openly.",
    benefits: ["Improved communication", "Conflict resolution", "Trust building", "Relationship goals"],
    image: "https://images.unsplash.com/photo-1714976694525-71eb29a7c500"
  },
  {
    id: 3,
    title: "Family Therapy",
    icon: "home",
    description: "Build stronger family bonds and resolve conflicts in a supportive environment.",
    fullDescription: "Family therapy addresses issues affecting the psychological health of the family unit. We help families understand each other better and develop healthier patterns of interaction.",
    benefits: ["Family harmony", "Better understanding", "Conflict management", "Support system building"],
    image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg"
  },
  {
    id: 4,
    title: "Stress Management",
    icon: "activity",
    description: "Learn effective techniques to manage stress and maintain emotional balance.",
    fullDescription: "Our stress management programs teach practical skills to handle life's pressures. Learn mindfulness, relaxation techniques, and coping strategies to reduce stress and improve overall well-being.",
    benefits: ["Stress reduction techniques", "Mindfulness training", "Work-life balance", "Emotional regulation"],
    image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7"
  },
  {
    id: 5,
    title: "Anxiety Treatment",
    icon: "alert-circle",
    description: "Overcome anxiety with evidence-based therapeutic approaches.",
    fullDescription: "Our anxiety treatment combines cognitive-behavioral therapy, mindfulness, and other proven methods to help you manage and reduce anxiety symptoms effectively.",
    benefits: ["CBT techniques", "Panic attack management", "Coping strategies", "Long-term relief"],
    image: "https://images.unsplash.com/photo-1592947945242-69312358628b"
  },
  {
    id: 6,
    title: "Depression Support",
    icon: "heart",
    description: "Compassionate care to help you navigate through depression.",
    fullDescription: "We provide comprehensive support for individuals experiencing depression, using evidence-based treatments to help you regain joy and purpose in life.",
    benefits: ["Personalized care", "Medication management support", "Behavioral activation", "Ongoing support"],
    image: "https://images.pexels.com/photos/4098370/pexels-photo-4098370.jpeg"
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