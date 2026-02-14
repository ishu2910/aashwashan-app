import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, TrendingUp, Building, FileText, Heart, Users, BookOpen } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Featured updates data - Mental Health in India
const featuredUpdates = [
  {
    id: 1,
    title: "Budget 2025-26: Rs 1,000 Crore Allocated for Mental Health Infrastructure",
    excerpt: "In a historic move, the Union Budget 2025-26 has allocated Rs 1,000 crore specifically for mental health services, marking a 40% increase from the previous year. This includes funding for NIMHANS-2 expansion.",
    category: "Policy Update",
    date: "February 2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600",
    readTime: "5 min",
    featured: true,
    icon: Building
  },
  {
    id: 2,
    title: "NIMHANS-2: India's Second National Institute for Mental Health Announced",
    excerpt: "The government has approved the establishment of NIMHANS-2 in North India, aimed at reducing the treatment gap and making specialized mental health care accessible to millions in underserved regions.",
    category: "Healthcare News",
    date: "January 2025",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600",
    readTime: "7 min",
    featured: true,
    icon: Heart
  }
];

const newsCategories = [
  { name: "All Updates", count: 24 },
  { name: "Policy & Budget", count: 8 },
  { name: "Healthcare News", count: 10 },
  { name: "Research & Studies", count: 6 }
];

const recentUpdates = [
  {
    id: 3,
    title: "Mental Health Helpline 988 Launched Across India",
    excerpt: "A nationwide 24/7 mental health helpline has been launched, providing free counseling services in 12 regional languages.",
    category: "Policy Update",
    date: "February 2025",
    readTime: "4 min"
  },
  {
    id: 4,
    title: "WHO Report: India Makes Progress in Mental Health Awareness",
    excerpt: "The latest WHO report highlights India's improving mental health literacy rates, particularly among urban youth populations.",
    category: "Research & Studies",
    date: "January 2025",
    readTime: "6 min"
  },
  {
    id: 5,
    title: "Corporate Mental Health Programs Now Mandatory for 500+ Employee Companies",
    excerpt: "New labor regulations require large corporations to implement employee mental health support programs and regular wellness assessments.",
    category: "Policy Update",
    date: "January 2025",
    readTime: "5 min"
  },
  {
    id: 6,
    title: "Teletherapy Services to be Covered Under Ayushman Bharat",
    excerpt: "In a significant expansion, online mental health consultations will now be covered under the Ayushman Bharat health insurance scheme.",
    category: "Healthcare News",
    date: "December 2024",
    readTime: "4 min"
  },
  {
    id: 7,
    title: "NCERT Introduces Mental Health Curriculum in Schools",
    excerpt: "From the 2025 academic year, mental health education becomes a core part of the school curriculum from Class 6 onwards.",
    category: "Policy Update",
    date: "December 2024",
    readTime: "5 min"
  },
  {
    id: 8,
    title: "Study: 1 in 7 Indians Affected by Mental Health Disorders",
    excerpt: "A comprehensive ICMR study reveals the scale of mental health challenges in India, emphasizing the urgent need for accessible care.",
    category: "Research & Studies",
    date: "November 2024",
    readTime: "8 min"
  }
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Updates");
  const [dbBlogs, setDbBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs`);
      setDbBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUpdates = selectedCategory === "All Updates" 
    ? recentUpdates 
    : recentUpdates.filter(u => u.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-teal-100 font-medium uppercase tracking-widest text-sm mb-4">MENTAL HEALTH NEWS</p>
            <h1 className="text-4xl lg:text-5xl font-semibold mb-6">
              Mental Health Updates in India
            </h1>
            <p className="text-xl text-white/90">
              Stay informed about the latest policies, research, and developments in India's mental health landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Breaking News / Featured Updates */}
      <section className="py-12 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2 animate-pulse">
              <TrendingUp className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Featured Updates</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredUpdates.map((update) => (
              <div key={update.id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={update.image} 
                    alt={update.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {update.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
                    {update.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{update.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{update.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{update.readTime} read</span>
                      </span>
                    </div>
                    <button className="flex items-center space-x-1 text-teal-600 font-medium hover:underline">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-teal-500" />
                  <span>Categories</span>
                </h3>
                <div className="space-y-2">
                  {newsCategories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        selectedCategory === cat.name
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{cat.name}</span>
                        <span className={`text-sm ${selectedCategory === cat.name ? 'text-white/80' : 'text-gray-400'}`}>
                          {cat.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">India Mental Health Stats</h4>
                  <div className="space-y-4">
                    <div className="bg-teal-50 rounded-xl p-4">
                      <p className="text-2xl font-bold text-teal-600">14%</p>
                      <p className="text-sm text-gray-600">of Indians affected by mental health disorders</p>
                    </div>
                    <div className="bg-cyan-50 rounded-xl p-4">
                      <p className="text-2xl font-bold text-cyan-600">0.3</p>
                      <p className="text-sm text-gray-600">psychiatrists per 100,000 population</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-2xl font-bold text-blue-600">83%</p>
                      <p className="text-sm text-gray-600">treatment gap for mental disorders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* News List */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {selectedCategory === "All Updates" ? "Recent Updates" : selectedCategory}
                </h2>
                <span className="text-gray-500">{filteredUpdates.length} articles</span>
              </div>

              {/* Database Blogs Section */}
              {dbBlogs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-teal-500" />
                    <span>From Aashwashan Blog</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {dbBlogs.map((blog) => (
                      <Link 
                        key={blog.id}
                        to={`/blog/${blog.slug}`}
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group border border-teal-100"
                      >
                        {blog.featured_image && (
                          <img src={blog.featured_image} alt={blog.title} className="w-full h-32 object-cover rounded-xl mb-4" />
                        )}
                        <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                          {blog.category}
                        </span>
                        <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                          {blog.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2">{blog.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Static Updates */}
              <div className="space-y-6">
                {filteredUpdates.map((update) => (
                  <div key={update.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                            {update.category}
                          </span>
                          <span className="text-gray-400 text-sm">{update.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
                          {update.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{update.excerpt}</p>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{update.readTime} read</span>
                          </span>
                          <button className="flex items-center space-x-1 text-teal-600 font-medium hover:underline">
                            <span>Read Full Article</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all">
                  Load More Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to receive the latest mental health news and policy updates directly in your inbox.
          </p>
          <div className="max-w-md mx-auto flex space-x-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:outline-none"
            />
            <button className="bg-white text-teal-600 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
