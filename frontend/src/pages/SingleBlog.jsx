import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const SingleBlog = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-4xl font-bold mb-4">Blog Post Not Found</h3>
          <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-blue-600 hover:underline mb-6">
              <ArrowLeft className="mr-2 w-5 h-5" /> Back to Blog
            </Link>
            <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h3 className="text-5xl lg:text-6xl font-bold mb-6">{post.title}</h3>
            <div className="flex flex-wrap items-center gap-6 text-gray-700">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              
              <h3 className="text-3xl font-bold mt-12 mb-6">Understanding the Signs</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Mental health is just as important as physical health, yet it's often overlooked or stigmatized. Recognizing when you might benefit from professional support is the first step toward healing and growth. Many people wait until they're in crisis before seeking help, but therapy can be beneficial at any stage of your mental health journey.
              </p>
              
              <h3 className="text-3xl font-bold mt-12 mb-6">Key Indicators</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                There are several common signs that suggest it might be time to seek therapy. These include persistent feelings of sadness or anxiety, difficulty managing daily tasks, changes in sleep or appetite, strained relationships, and feeling overwhelmed by stress. If you're experiencing any of these symptoms for an extended period, therapy can provide the support and tools you need to navigate these challenges.
              </p>

              <h3 className="text-3xl font-bold mt-12 mb-6">Taking the First Step</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Starting therapy can feel daunting, but it's one of the most powerful investments you can make in yourself. The therapeutic relationship provides a safe, confidential space to explore your thoughts and feelings, develop coping strategies, and work toward your personal goals. Remember, seeking help is a sign of strength, not weakness.
              </p>
            </div>

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Share this article</h3>
                <div className="flex space-x-3">
                  <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold mb-12 text-center">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{relatedPost.title}</h3>
                    <p className="text-sm text-gray-500">{relatedPost.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Take the Next Step?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            If you're experiencing any of the signs mentioned in this article, we're here to help.
          </p>
          <Link to="/appointment" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SingleBlog;