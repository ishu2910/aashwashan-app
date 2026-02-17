import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, User, Shield, Clock, LogIn } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CommunityPage = () => {
  const { user, isAuthenticated, getAuthHeader } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['General', 'Worry', 'Depression', 'Sleep', 'Stress', 'Support', 'First Steps', 'Recovery'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Try new authenticated API first
      const response = await axios.get(`${API}/community/posts`);
      if (response.data && response.data.length > 0) {
        setPosts(response.data.map(post => ({
          ...post,
          timestamp: formatTimestamp(post.created_at)
        })));
      } else {
        // Fallback to sample posts
        setPosts([
          {
            id: '1',
            author_name: 'Anonymous',
            title: 'Taking small steps',
            content: "I've been feeling overwhelmed lately with work stress. Taking small breaks throughout the day has helped me manage my worries better. Remember, it's okay to pause.",
            likes_count: 24,
            comments_count: 5,
            timestamp: "2 hours ago",
            category: "Worry",
            is_anonymous: true
          },
          {
            id: '2',
            author_name: 'Anonymous',
            title: 'My first therapy session',
            content: "Today I finally talked to a therapist for the first time. I was so nervous but they made me feel completely comfortable. If you're hesitant, just take that first step. It's worth it.",
            likes_count: 45,
            comments_count: 12,
            timestamp: "5 hours ago",
            category: "First Steps",
            is_anonymous: true
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Show sample posts on error
      setPosts([
        {
          id: '1',
          author_name: 'Anonymous',
          title: 'Welcome to Aashwashan Community',
          content: "Welcome to our community! Share your thoughts anonymously and support each other on this journey.",
          likes_count: 10,
          comments_count: 2,
          timestamp: "Just now",
          category: "Support",
          is_anonymous: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (dateString) => {
    if (!dateString) return 'Just now';
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
      post.id === postId ? { ...post, likes_count: (post.likes_count || 0) + 1 } : post
    ));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      toast({
        title: "Login Required",
        description: "Please sign in to share your thoughts with the community.",
        variant: "destructive"
      });
      navigate('/auth', { state: { returnTo: '/community' } });
      return;
    }

    if (!newPost.trim() || !postTitle.trim()) {
      toast({
        title: "Missing Information",
        description: "Please add a title and content for your post.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        `${API}/community/posts`,
        {
          title: postTitle,
          content: newPost,
          category: selectedCategory,
          is_anonymous: isAnonymous
        },
        { headers: getAuthHeader() }
      );

      const newPostObj = {
        id: response.data.id,
        author_name: isAnonymous ? 'Anonymous' : user.name,
        title: postTitle,
        content: newPost,
        likes_count: 0,
        comments_count: 0,
        timestamp: "Just now",
        category: selectedCategory,
        is_anonymous: isAnonymous
      };

      setPosts([newPostObj, ...posts]);
      setNewPost('');
      setPostTitle('');
      setSelectedCategory('General');
      
      toast({
        title: "Posted Successfully!",
        description: "Your post has been shared with the community.",
      });
    } catch (error) {
      console.error('Error posting:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to post. Please try again.",
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
            <p className="text-teal-100 font-medium uppercase tracking-widest text-sm mb-4">COMMUNITY SUPPORT</p>
            <h1 className="text-4xl lg:text-5xl font-semibold mb-6">Community Forum</h1>
            <p className="text-xl text-white/90">
              A safe space to share your thoughts, experiences, and support others on their mental health journey.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-6 bg-teal-50 border-b border-teal-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3 text-teal-700">
            <Shield className="w-5 h-5" />
            <p className="text-sm font-medium">You can choose to post anonymously. Your privacy is our priority.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Create Post */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 mb-8 border border-teal-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Share Your Thoughts</h3>
                {!isAuthenticated() && (
                  <button
                    onClick={() => navigate('/auth', { state: { returnTo: '/community' } })}
                    className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign in to post</span>
                  </button>
                )}
              </div>
              
              {isAuthenticated() ? (
                <form onSubmit={handleSubmitPost}>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Give your post a title..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors mb-3 bg-white"
                    data-testid="post-title-input"
                  />
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind? Share your thoughts..."
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors resize-none mb-4 bg-white"
                    data-testid="post-content-input"
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
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
                      <label className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="w-4 h-4 text-teal-600 rounded"
                        />
                        <span className="text-gray-600">Post anonymously</span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !newPost.trim() || !postTitle.trim()}
                      className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
                      data-testid="submit-post-btn"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Posting...' : 'Share'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Join our community to share your thoughts and connect with others.</p>
                  <button
                    onClick={() => navigate('/auth', { state: { returnTo: '/community' } })}
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Sign In / Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
                          <p className="font-medium text-gray-800">{post.author_name || 'Anonymous'}</p>
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
                    
                    {post.title && (
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h4>
                    )}
                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-teal-600 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.likes_count || 0}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-teal-600 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments_count || 0}</span>
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
