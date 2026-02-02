import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, User, Shield, Clock } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CommunityPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "I've been feeling overwhelmed lately with work stress. Taking small breaks throughout the day has helped me manage my anxiety better. Remember, it's okay to pause.",
      likes: 24,
      comments: 5,
      timestamp: "2 hours ago",
      category: "Anxiety"
    },
    {
      id: 2,
      content: "Today I finally talked to a therapist for the first time. I was so nervous but they made me feel completely comfortable. If you're hesitant, just take that first step. It's worth it.",
      likes: 45,
      comments: 12,
      timestamp: "5 hours ago",
      category: "First Steps"
    },
    {
      id: 3,
      content: "Struggling with sleep lately. What helps you all fall asleep? I've tried meditation but looking for more suggestions.",
      likes: 18,
      comments: 23,
      timestamp: "Yesterday",
      category: "Sleep"
    },
    {
      id: 4,
      content: "Just want to remind everyone that healing isn't linear. Some days will be harder than others, and that's completely normal. Be gentle with yourself.",
      likes: 67,
      comments: 8,
      timestamp: "2 days ago",
      category: "Support"
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['General', 'Anxiety', 'Depression', 'Sleep', 'Stress', 'Support', 'First Steps', 'Recovery'];

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setIsSubmitting(true);
    
    // Simulate posting
    const newPostObj = {
      id: Date.now(),
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      category: selectedCategory
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setSelectedCategory('General');
    
    toast({
      title: "Posted Successfully!",
      description: "Your anonymous post has been shared with the community.",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">100% Anonymous • Safe Space</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Aashwashan Community</h1>
            <p className="text-xl opacity-90">
              A judgment-free space where you can share your thoughts, support others, and find understanding. Your identity stays protected.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Post Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Anonymous</p>
                <p className="text-xs text-gray-500">Your identity is protected</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmitPost}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share what's on your mind... Your identity stays anonymous."
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none min-h-[120px] mb-4"
                data-testid="community-post-input"
              />
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Category:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={!newPost.trim() || isSubmitting}
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                  data-testid="submit-community-post"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Posting...' : 'Share Anonymously'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Community Guidelines */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-8 border border-blue-100">
            <h3 className="font-semibold text-gray-800 mb-2">Community Guidelines</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Be respectful and supportive of others</li>
              <li>• No personal information or contact details allowed</li>
              <li>• If you're in crisis, please reach out to Tele MANAS: 14416</li>
            </ul>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Anonymous</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.timestamp}</span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{post.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                
                <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{post.likes} Support</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments} Replies</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-colors font-medium">
              Load More Posts
            </button>
          </div>
        </div>
      </section>

      {/* Support Banner */}
      <section className="py-12 bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Need Immediate Support?</h3>
          <p className="mb-4 opacity-90">If you're in crisis, please reach out for help</p>
          <a href="tel:14416" className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
            Call Tele MANAS: 14416
          </a>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
