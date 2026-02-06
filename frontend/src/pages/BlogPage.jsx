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
      {/* Hero Section - TEAL THEME */}
      <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-teal-100 font-medium uppercase tracking-widest text-sm mb-4">MENTAL HEALTH NEWS</p>
            <h3 className="text-4xl lg:text-5xl font-semibold mb-6">Latest Mental Health Updates</h3>
            <p className="text-xl text-white/90">
              Stay informed with the latest news, research, and developments in mental health care from India and around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post - TEAL THEME */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl overflow-hidden border border-teal-100">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="h-96 lg:h-auto">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <span className="inline-block bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 w-fit">
                    {blogPosts[0].category}
                  </span>
                  <h3 className="text-3xl font-semibold mb-4">{blogPosts[0].title}</h3>
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
                  <Link to={`/blog/${blogPosts[0].id}`} className="text-teal-600 font-medium hover:underline">
                    Read Full Article →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid - TEAL THEME */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-semibold mb-4">More Articles</h3>
              <p className="text-gray-600">Explore our collection of mental health resources</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPosts.map((post) => (
                <Link 
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-teal-600 transition-colors">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {!showAll && (
              <div className="text-center mt-12">
                <button 
                  onClick={handleLoadMore}
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section - TEAL THEME */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest mental health tips, resources, and updates delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="w-full sm:w-auto bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
