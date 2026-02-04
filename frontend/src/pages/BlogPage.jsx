import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import { toast } from '../hooks/use-toast';

const BlogPage = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedPosts = showAll ? blogPosts : blogPosts.slice(0, 6);

  const handleLoadMore = () => {
    if (blogPosts.length <= 6) {
      toast({
        title: "That's all for now!",
        description: "We're working on more articles. Check back soon!",
      });
    } else {
      setShowAll(true);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-4">MENTAL HEALTH NEWS</p>
            <h3 className="text-5xl lg:text-6xl font-bold mb-6">Latest Mental Health Updates</h3>
            <p className="text-xl text-gray-600">
              Stay informed with the latest news, research, and developments in mental health care from India and around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="h-96 lg:h-auto">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 w-fit">
                    {blogPosts[0].category}
                  </span>
                  <h3 className="text-4xl font-bold mb-4">{blogPosts[0].title}</h3>
                  <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Link to={`/blog/${blogPosts[0].id}`} className="text-blue-600 font-semibold hover:underline">
                    Read Full Article →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6">Subscribe to Our Newsletter</h3>
            <p className="text-xl mb-8">
              Get the latest mental health tips, insights, and resources delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;