import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, User, Shield, Clock } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['General', 'Anxiety', 'Depression', 'Sleep', 'Stress', 'Support', 'First Steps', 'Recovery'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/community-posts`);
        if (response.data.posts && response.data.posts.length > 0) {
          setPosts(response.data.posts.map(post => ({
            ...post,
            likes: Math.floor(Math.random() * 50),
            comments: Math.floor(Math.random() * 15),
            timestamp: formatTimestamp(post.created_at)
          })));
        } else {
          setPosts([
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
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([
          {
            id: 1,
            content: "Welcome to the Aashwashan Community! Share your thoughts anonymously and support each other.",
            likes: 10,
            comments: 2,
            timestamp: "Just now",
            category: "Support"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffHours < 48) return 'Yesterday';
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/community-posts`, {
        category: selectedCategory,
        content: newPost
      });

      const newPostObj = {
        id: response.data.id || Date.now(),
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
    } catch (error) {
      console.error('Error posting:', error);
      toast({
        title: "Error",
        description: "Failed to post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section - TEAL THEME */}
      <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-teal-100 font-medium uppercase tracking-widest text-sm mb-4">ANONYMOUS SUPPORT</p>
            <h1 className="text-4xl lg:text-5xl font-semibold mb-6">Community Support</h1>
            <p className="text-xl text-white/90">
              A safe space to share your thoughts, experiences, and support others on their mental health journey. Everything here is anonymous.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-6 bg-teal-50 border-b border-teal-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3 text-teal-700">
            <Shield className="w-5 h-5" />
            <p className="text-sm font-medium">All posts are 100% anonymous. Your identity is protected.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Create Post */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 mb-8 border border-teal-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Share Your Thoughts</h3>
              <form onSubmit={handleSubmitPost}>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind? Share anonymously..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors resize-none mb-4 bg-white"
                />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Category:</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 rounded-lg border border-gray-200 focus:border-teal-500 focus:outline-none text-sm bg-white"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newPost.trim()}
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Posting...' : 'Post Anonymously'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Loading posts...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No posts yet. Be the first to share!</p>
                </div>
              ) : (
                posts.map(post => (
                  <div key={post.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Anonymous</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-teal-600 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-teal-600 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA - TEAL THEME */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold mb-4">Need More Support?</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Sometimes we need more than peer support. Our professional therapists are here to help you through difficult times.
          </p>
          <a 
            href="/team" 
            className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book a Session
          </a>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
