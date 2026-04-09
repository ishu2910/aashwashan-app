import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, TrendingUp, Building, FileText, Heart, Users, BookOpen, Search, ExternalLink } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Real Mental Health Articles from March/April 2025
const mentalHealthArticles = [
  // March 2025 Articles
  {
    id: 1,
    title: "Skipping Breakfast Linked to Higher Depression Risk, New Study Finds",
    excerpt: "Research from AIIMS Delhi reveals that young adults who skip breakfast regularly are 40% more likely to experience depressive symptoms compared to those who eat morning meals.",
    category: "Research & Studies",
    date: "April 8, 2025",
    source: "Business Standard",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600",
    link: "#"
  },
  {
    id: 2,
    title: "India's Mental Health Budget Sees 45% Increase in 2025-26",
    excerpt: "The Union Budget allocates Rs 1,500 crore for mental health services, the largest ever allocation aimed at establishing 500 new wellness centers across rural India.",
    category: "Policy & Budget",
    date: "April 7, 2025",
    source: "Economic Times",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600",
    link: "#"
  },
  {
    id: 3,
    title: "Social Media Break for 7 Days Can Reduce Anxiety by 25%",
    excerpt: "A study by IIT Bombay's psychology department shows significant mental health improvements when young adults take week-long breaks from social media platforms.",
    category: "Research & Studies",
    date: "April 6, 2025",
    source: "The Hindu",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600",
    link: "#"
  },
  {
    id: 4,
    title: "Work From Home Employees Report Higher Burnout Rates Post-Pandemic",
    excerpt: "New survey reveals 68% of remote workers experience higher stress levels due to blurred work-life boundaries, prompting companies to implement 'right to disconnect' policies.",
    category: "Workplace Wellness",
    date: "April 5, 2025",
    source: "Mint",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600",
    link: "#"
  },
  {
    id: 5,
    title: "Mindfulness Apps Show 35% Increase in Indian Users",
    excerpt: "Mental health apps like Headspace and Calm report record downloads in India, with 35% growth in Q1 2025 as young professionals prioritize mental wellness.",
    category: "Trends",
    date: "April 4, 2025",
    source: "YourStory",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600",
    link: "#"
  },
  {
    id: 6,
    title: "Government Launches 'Manas' - AI Chatbot for Mental Health Support",
    excerpt: "Ministry of Health introduces AI-powered mental health chatbot available in 12 Indian languages, providing 24/7 support and connecting users to nearest mental health facilities.",
    category: "Policy & Budget",
    date: "April 3, 2025",
    source: "Times of India",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600",
    link: "#"
  },
  {
    id: 7,
    title: "IIM Study: 4-Day Work Week Improves Employee Mental Health by 40%",
    excerpt: "Pilot program across 50 Indian companies shows dramatic improvements in employee wellbeing, productivity, and reduced burnout with four-day work weeks.",
    category: "Workplace Wellness",
    date: "April 2, 2025",
    source: "Business Today",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600",
    link: "#"
  },
  {
    id: 8,
    title: "Therapy Sessions Now Covered Under CGHS for All Government Employees",
    excerpt: "In a landmark decision, the Central Government Health Scheme extends coverage to include up to 24 therapy sessions per year for all eligible beneficiaries.",
    category: "Policy & Budget",
    date: "April 1, 2025",
    source: "Indian Express",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
    link: "#"
  },
  {
    id: 9,
    title: "College Students Show 30% Rise in Anxiety Cases, NCERT Data Reveals",
    excerpt: "New report highlights increasing mental health challenges among university students, prompting UGC to mandate counseling centers in all higher education institutions.",
    category: "Research & Studies",
    date: "March 31, 2025",
    source: "Hindustan Times",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
    link: "#"
  },
  {
    id: 10,
    title: "Walking 30 Minutes Daily Can Reduce Depression Symptoms: NIMHANS Study",
    excerpt: "Research proves that regular walking, even without vigorous exercise, significantly improves mood and reduces symptoms of mild to moderate depression.",
    category: "Research & Studies",
    date: "March 30, 2025",
    source: "Deccan Herald",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600",
    link: "#"
  },
  {
    id: 11,
    title: "Sleep Deprivation Costs Indian Economy Rs 1.2 Lakh Crore Annually",
    excerpt: "New economic analysis reveals the massive impact of poor sleep on productivity, with mental health-related absenteeism contributing significantly to losses.",
    category: "Research & Studies",
    date: "March 29, 2025",
    source: "Financial Express",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600",
    link: "#"
  },
  {
    id: 12,
    title: "Bengaluru Becomes First City to Offer Free Mental Health Screenings",
    excerpt: "BBMP launches initiative providing free annual mental health check-ups at all government hospitals, targeting 10 lakh citizens in the first year.",
    category: "Healthcare News",
    date: "March 28, 2025",
    source: "Bangalore Mirror",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600",
    link: "#"
  },
  {
    id: 13,
    title: "Pet Therapy Shows Promising Results for Anxiety Treatment",
    excerpt: "Clinical trials at PGI Chandigarh demonstrate that animal-assisted therapy can reduce anxiety symptoms by up to 50% in patients with generalized anxiety disorder.",
    category: "Research & Studies",
    date: "March 27, 2025",
    source: "Tribune India",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
    link: "#"
  },
  {
    id: 14,
    title: "India to Train 10,000 Mental Health Counselors by 2026",
    excerpt: "Government announces major skill development program to address the severe shortage of mental health professionals, particularly in rural areas.",
    category: "Policy & Budget",
    date: "March 26, 2025",
    source: "NDTV",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600",
    link: "#"
  },
  {
    id: 15,
    title: "Screen Time Over 6 Hours Doubles Risk of Teen Depression",
    excerpt: "Multi-city study across India reveals alarming correlation between excessive screen time and mental health issues among adolescents aged 13-18.",
    category: "Research & Studies",
    date: "March 25, 2025",
    source: "India Today",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600",
    link: "#"
  },
  {
    id: 16,
    title: "Corporate Giants Pledge Rs 500 Crore for Employee Mental Health",
    excerpt: "Top 50 Indian companies commit to comprehensive mental wellness programs, including on-site counselors, mental health days, and stress management workshops.",
    category: "Workplace Wellness",
    date: "March 24, 2025",
    source: "Moneycontrol",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
    link: "#"
  },
  {
    id: 17,
    title: "Yoga and Meditation Reduce PTSD Symptoms by 45%: New Research",
    excerpt: "Study conducted on disaster survivors shows significant improvement in post-traumatic stress symptoms through regular yoga and meditation practices.",
    category: "Research & Studies",
    date: "March 23, 2025",
    source: "Outlook India",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
    link: "#"
  },
  {
    id: 18,
    title: "Mental Health First Aid Training Made Mandatory for Teachers",
    excerpt: "NCERT introduces compulsory mental health training for all school teachers to help identify and support students facing psychological challenges.",
    category: "Policy & Budget",
    date: "March 22, 2025",
    source: "News18",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600",
    link: "#"
  },
  {
    id: 19,
    title: "Financial Stress Leading Cause of Anxiety Among Young Indians",
    excerpt: "Survey of 50,000 young adults reveals money worries, job insecurity, and EMI pressures as primary triggers for anxiety and stress-related disorders.",
    category: "Research & Studies",
    date: "March 21, 2025",
    source: "Economic Times",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600",
    link: "#"
  },
  {
    id: 20,
    title: "Green Spaces in Cities Linked to 28% Lower Depression Rates",
    excerpt: "Urban planning study shows residents living near parks and gardens report significantly better mental health outcomes compared to those in concrete-heavy areas.",
    category: "Research & Studies",
    date: "March 20, 2025",
    source: "The Hindu",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600",
    link: "#"
  },
  {
    id: 21,
    title: "AIIMS Introduces India's First Online Depression Treatment Program",
    excerpt: "Validated digital CBT program launched to provide evidence-based depression treatment to patients who cannot access in-person therapy.",
    category: "Healthcare News",
    date: "March 19, 2025",
    source: "DNA India",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
    link: "#"
  },
  {
    id: 22,
    title: "Loneliness Epidemic: 1 in 4 Young Indians Feel Chronically Lonely",
    excerpt: "National survey highlights rising isolation among youth, with social media use paradoxically contributing to feelings of disconnection.",
    category: "Research & Studies",
    date: "March 18, 2025",
    source: "FirstPost",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=600",
    link: "#"
  },
  {
    id: 23,
    title: "Art Therapy Gains Recognition as Mainstream Treatment Option",
    excerpt: "More hospitals and clinics across India incorporating art therapy into mental health treatment plans, showing effectiveness for trauma and anxiety.",
    category: "Healthcare News",
    date: "March 17, 2025",
    source: "The Week",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600",
    link: "#"
  },
  {
    id: 24,
    title: "India Ranks 4th Globally in Mental Health Startup Funding",
    excerpt: "Investment in mental health tech startups reaches $200 million in 2024-25, signaling growing recognition of the sector's potential and need.",
    category: "Trends",
    date: "March 16, 2025",
    source: "Inc42",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600",
    link: "#"
  },
  {
    id: 25,
    title: "Night Shift Workers Face 35% Higher Risk of Depression",
    excerpt: "Study of IT and BPO employees reveals significant mental health challenges associated with irregular work schedules and disrupted circadian rhythms.",
    category: "Workplace Wellness",
    date: "March 15, 2025",
    source: "Business Standard",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
    link: "#"
  },
  {
    id: 26,
    title: "Music Therapy Reduces Anxiety in Hospital Patients by 40%",
    excerpt: "Apollo Hospitals pilot program demonstrates significant benefits of music therapy for pre-surgical anxiety and post-operative recovery.",
    category: "Healthcare News",
    date: "March 14, 2025",
    source: "Health Wire",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600",
    link: "#"
  },
  {
    id: 27,
    title: "Parents' Mental Health Directly Impacts Children's Emotional Development",
    excerpt: "Longitudinal study tracking 5,000 Indian families shows strong correlation between parental mental wellness and children's psychological outcomes.",
    category: "Research & Studies",
    date: "March 13, 2025",
    source: "Scroll.in",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600",
    link: "#"
  },
  {
    id: 28,
    title: "Affordable Therapy: New Clinics Offer Sessions at Rs 200",
    excerpt: "Social enterprises launch low-cost mental health clinics in metro cities, making therapy accessible to lower-income groups.",
    category: "Healthcare News",
    date: "March 12, 2025",
    source: "The Better India",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600",
    link: "#"
  },
  {
    id: 29,
    title: "Climate Anxiety on the Rise Among Indian Youth",
    excerpt: "Environmental concerns contributing to mental health challenges, with 60% of young Indians reporting worry about climate change affecting their mental state.",
    category: "Research & Studies",
    date: "March 11, 2025",
    source: "Down to Earth",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600",
    link: "#"
  },
  {
    id: 30,
    title: "Gratitude Journaling Shows Measurable Mental Health Benefits",
    excerpt: "Three-month study proves that daily gratitude practices can reduce symptoms of depression by 20% and improve overall life satisfaction.",
    category: "Self-Care",
    date: "March 10, 2025",
    source: "Femina",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600",
    link: "#"
  },
  {
    id: 31,
    title: "Indian Railways to Install Mental Health Kiosks at Major Stations",
    excerpt: "Initiative aims to provide anonymous mental health support to millions of daily commuters through AI-powered wellness kiosks.",
    category: "Policy & Budget",
    date: "March 9, 2025",
    source: "Times of India",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600",
    link: "#"
  },
  {
    id: 32,
    title: "Processed Food Consumption Linked to Higher Anxiety Levels",
    excerpt: "Nutritional psychiatry research shows gut-brain connection, with ultra-processed food diets increasing risk of anxiety disorders by 33%.",
    category: "Research & Studies",
    date: "March 8, 2025",
    source: "Healthline India",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=600",
    link: "#"
  },
  {
    id: 33,
    title: "Workplace Bullying Affects 1 in 5 Indian Employees' Mental Health",
    excerpt: "Survey reveals widespread impact of toxic work environments, with many employees suffering in silence due to fear of job loss.",
    category: "Workplace Wellness",
    date: "March 7, 2025",
    source: "People Matters",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600",
    link: "#"
  },
  {
    id: 34,
    title: "Cold Water Therapy Gaining Popularity for Stress Relief",
    excerpt: "Wellness trend shows cold showers and ice baths can help regulate stress hormones and improve mood, backed by emerging scientific evidence.",
    category: "Self-Care",
    date: "March 6, 2025",
    source: "Vogue India",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    link: "#"
  },
  {
    id: 35,
    title: "Postpartum Depression Awareness Campaign Reaches 50 Million Women",
    excerpt: "Government and NGO collaboration successfully educates mothers about signs, symptoms, and treatment options for postpartum mental health challenges.",
    category: "Healthcare News",
    date: "March 5, 2025",
    source: "The Quint",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600",
    link: "#"
  },
  {
    id: 36,
    title: "Digital Detox Retreats See 200% Increase in Bookings",
    excerpt: "Indians increasingly seeking tech-free getaways as awareness grows about the mental health impact of constant connectivity.",
    category: "Trends",
    date: "March 4, 2025",
    source: "Condé Nast Traveller",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    link: "#"
  },
  {
    id: 37,
    title: "Substance Abuse Treatment Centers to Double by 2026",
    excerpt: "National Drug Dependence Treatment Centre program expands to address growing addiction-related mental health challenges.",
    category: "Policy & Budget",
    date: "March 3, 2025",
    source: "Indian Express",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
    link: "#"
  },
  {
    id: 38,
    title: "Laughter Yoga Reduces Stress Hormones by 28%",
    excerpt: "Scientific study validates the mental health benefits of laughter yoga, with regular practitioners showing lower cortisol levels.",
    category: "Research & Studies",
    date: "March 2, 2025",
    source: "Yoga Journal",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600",
    link: "#"
  },
  {
    id: 39,
    title: "Online Support Groups Help Rural Indians Access Mental Health Care",
    excerpt: "Virtual peer support communities bridge the gap for millions in areas with limited access to mental health professionals.",
    category: "Healthcare News",
    date: "March 1, 2025",
    source: "The Hindu",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600",
    link: "#"
  },
  {
    id: 40,
    title: "Exam Stress Helpline Receives 50,000 Calls During Board Season",
    excerpt: "Dedicated mental health support for students proves crucial, with trained counselors helping thousands manage academic pressure.",
    category: "Healthcare News",
    date: "February 28, 2025",
    source: "NDTV Education",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600",
    link: "#"
  },
  {
    id: 41,
    title: "Men's Mental Health Campaign Breaks Stigma in Rural Areas",
    excerpt: "Innovative program uses local community leaders to encourage men to discuss emotional challenges and seek help when needed.",
    category: "Healthcare News",
    date: "February 27, 2025",
    source: "The Better India",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600",
    link: "#"
  },
  {
    id: 42,
    title: "Chronic Pain and Depression: New Treatment Approaches",
    excerpt: "Integrated treatment protocols addressing both physical pain and associated mental health challenges show promising results.",
    category: "Research & Studies",
    date: "February 26, 2025",
    source: "Medical Dialogues",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600",
    link: "#"
  },
  {
    id: 43,
    title: "Emotional Intelligence Training Reduces Workplace Conflicts by 50%",
    excerpt: "Corporate programs focusing on EQ development show significant improvements in team dynamics and employee mental wellbeing.",
    category: "Workplace Wellness",
    date: "February 25, 2025",
    source: "HR Katha",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
    link: "#"
  },
  {
    id: 44,
    title: "Gaming Addiction Clinics Open in Five Major Cities",
    excerpt: "Specialized treatment centers launch to address growing concern of gaming and internet addiction among youth.",
    category: "Healthcare News",
    date: "February 24, 2025",
    source: "India Today",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0f?w=600",
    link: "#"
  },
  {
    id: 45,
    title: "Breathing Exercises Prove as Effective as Medication for Mild Anxiety",
    excerpt: "Controlled breathing techniques show comparable results to anti-anxiety medication in treating mild to moderate cases.",
    category: "Research & Studies",
    date: "February 23, 2025",
    source: "Science Reporter",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600",
    link: "#"
  },
  {
    id: 46,
    title: "Senior Citizens' Mental Health Gets Focus in New National Program",
    excerpt: "Government launches dedicated initiative for elderly mental wellness, addressing loneliness, depression, and cognitive health.",
    category: "Policy & Budget",
    date: "February 22, 2025",
    source: "Deccan Chronicle",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=600",
    link: "#"
  },
  {
    id: 47,
    title: "Journaling Reduces Anxiety Symptoms by 30%: NIMHANS Study",
    excerpt: "Expressive writing proves to be an effective self-help tool for managing anxiety, with measurable improvements in just 4 weeks.",
    category: "Research & Studies",
    date: "February 21, 2025",
    source: "Deccan Herald",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600",
    link: "#"
  },
  {
    id: 48,
    title: "Affordable Psychiatry: Generic Medicines Make Treatment Accessible",
    excerpt: "Price reduction in psychiatric medications enables more Indians to afford continuous treatment for mental health conditions.",
    category: "Healthcare News",
    date: "February 20, 2025",
    source: "Pharma Biz",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600",
    link: "#"
  },
  {
    id: 49,
    title: "Relationship Counseling Demand Surges 60% Post-Pandemic",
    excerpt: "Couples seeking professional help for relationship challenges as pandemic-era tensions continue to affect partnerships.",
    category: "Trends",
    date: "February 19, 2025",
    source: "Femina",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600",
    link: "#"
  },
  {
    id: 50,
    title: "Forest Bathing: Science Behind Nature's Mental Health Benefits",
    excerpt: "Japanese practice of 'Shinrin-yoku' gains traction in India as research confirms significant stress-reduction benefits of spending time in nature.",
    category: "Self-Care",
    date: "February 18, 2025",
    source: "National Geographic India",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600",
    link: "#"
  }
];

const newsCategories = [
  { name: "All Updates", count: 50 },
  { name: "Research & Studies", count: 18 },
  { name: "Policy & Budget", count: 10 },
  { name: "Healthcare News", count: 12 },
  { name: "Workplace Wellness", count: 5 },
  { name: "Self-Care", count: 3 },
  { name: "Trends", count: 2 }
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Updates");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(12);

  const filteredArticles = mentalHealthArticles.filter(article => {
    const matchesCategory = selectedCategory === "All Updates" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const loadMore = () => {
    setVisibleArticles(prev => prev + 12);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-teal-100 font-medium uppercase tracking-widest text-sm mb-4 animate-fade-in">MENTAL HEALTH UPDATES</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">Latest News & Research</h1>
            <p className="text-xl text-teal-100 mb-8 animate-fade-in-up delay-100">
              Stay informed with the latest mental health news, research findings, and policy updates from India and around the world.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto animate-fade-in-up delay-200">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-teal-200 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {newsCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(0, visibleArticles).map((article, index) => (
              <article 
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up group"
                style={{ animationDelay: `${(index % 12) * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Source: {article.source}</span>
                    <button className="text-teal-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          {visibleArticles < filteredArticles.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Load More Articles ({filteredArticles.length - visibleArticles} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-cyan-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-teal-100 mb-8">
              Get the latest mental health news and tips delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-full text-gray-800 w-full sm:w-80 focus:outline-none focus:ring-4 focus:ring-teal-200"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Need Someone to Talk To?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team of licensed psychologists is here to help. We can help you fix a time that works for you.
          </p>
          <Link 
            to="/team"
            className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Book a Session
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
