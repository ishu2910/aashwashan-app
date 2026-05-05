import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import axios from 'axios';
import { mentalHealthArticles, newsCategories } from '../data/blogArticles';

const API_URL = "https://aashwashan-app-1.onrender.com";

// Helper to format ISO date → "Apr 10, 2026"
const formatDate = (iso) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
};

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Updates");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(12);
  const [dbArticles, setDbArticles] = useState([]);

  // Fetch admin-created blogs from backend; merge with static list.
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/blogs?limit=100`);
        const mapped = (res.data || []).map((b) => ({
          id: b.slug,           // use slug as stable id for DB articles
          dbId: b.id,
          slug: b.slug,
          title: b.title,
          excerpt: b.excerpt || '',
          category: b.category || 'Mental Health',
          date: formatDate(b.published_at),
          readTime: '5 min',
          source: b.author_name || 'Aashwashan',
          image: b.featured_image || 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
          isFromDB: true,
        }));
        setDbArticles(mapped);
      } catch (err) {
        console.error('Failed to fetch blogs from DB:', err);
      }
    };
    fetchBlogs();
  }, []);

  // Merge DB articles at the top, then static ones.
  const allArticles = [...dbArticles, ...mentalHealthArticles];

  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory === "All Updates" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (article.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const loadMore = () => {
    setVisibleArticles(prev => prev + 12);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" data-testid="blog-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-teal-100 font-medium uppercase tracking-widest text-sm mb-4 animate-fade-in">MENTAL HEALTH UPDATES</p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">Latest News & Research</h1>
            <p className="text-lg text-teal-100 mb-8 animate-fade-in-up">
              Stay informed with the latest mental health news, research findings, and policy updates from India and around the world.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto animate-fade-in-up">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-teal-200 shadow-lg"
                  data-testid="blog-search-input"
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
                data-testid={`blog-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {category.name}
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
              <Link 
                to={`/blog/${article.isFromDB ? article.slug : article.id}`}
                key={`${article.isFromDB ? 'db-' : ''}${article.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up group block"
                style={{ animationDelay: `${(index % 12) * 0.1}s` }}
                data-testid={`blog-article-${article.id}`}
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
                  {article.isFromDB && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                        NEW
                      </span>
                    </div>
                  )}
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
                    <span className="text-xs text-gray-400">By {article.source}</span>
                    <span className="text-teal-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {visibleArticles < filteredArticles.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                data-testid="blog-load-more"
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
              <button className="bg-amber-400 hover:bg-amber-500 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl">
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
            className="inline-block bg-gradient-to-r from-amber-400 to-orange-400 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Book a Session
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
