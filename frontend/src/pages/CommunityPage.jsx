import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send, User, Shield, Clock } from 'lucide-react';
const getUserId = () => {
  let userId = localStorage.getItem("user_id");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("user_id", userId);
  }

  return userId;
};

// 🔑 Supabase
const supabase = createClient(
"https://zafjzucmixwahqxngxrr.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZmp6dWNtaXh3YWhxeG5neHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MTgwNjgsImV4cCI6MjA5MTQ5NDA2OH0.FUnQot_bkz2m9EHgS9p_nKhl3sjMUHY7kVM0k5UZ63U"
);

const CommunityPage = () => {
const navigate = useNavigate();

const [posts, setPosts] = useState([]);
const [trendingPosts, setTrendingPosts] = useState([]);
const [newPost, setNewPost] = useState('');
const [selectedMood, setSelectedMood] = useState('');
const [isAnonymous, setIsAnonymous] = useState(true);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [comments, setComments] = useState({});
const [showComments, setShowComments] = useState({});
const [newComment, setNewComment] = useState({});


useEffect(() => {
  fetchPosts();

  if (window.gtag) {
    window.gtag('event', 'community_view', {
      event_category: 'page',
      event_label: 'community_page_open'
    });
  }

}, []);

// 📥 Fetch posts
const fetchPosts = async () => {
try {
const { data, error } = await supabase
.from("community_posts")
.select("*")
.order("created_at", { ascending: false });

  if (error) {
    console.log("FETCH ERROR:", error);
  } else {
    setPosts(data || []);
    const sorted = [...(data || [])].sort(
  (a, b) => (b.likes_count || 0) - (a.likes_count || 0)
);

setTrendingPosts(sorted.slice(0, 3));
    data?.forEach(p => fetchComments(p.id));
  }
} catch (err) {
  console.log("CRASH:", err);
}

setIsLoading(false);

};

// 🕒 Time format
const formatTimestamp = (dateString) => {
if (!dateString) return 'Just now';
const date = new Date(dateString);
const now = new Date();
const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

if (diffHours < 1) return 'Just now';
if (diffHours < 24) return `${diffHours} hours ago`;
if (diffHours < 48) return 'Yesterday';
return `${Math.floor(diffHours / 24)} days ago`;

};

// ❤️ Like (UI only)
const handleLike = async (postId) => {
  const userId = getUserId();

  // 🔍 check already liked?
  const { data: existing } = await supabase
    .from("post_likes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (existing.length > 0) {
    // ❌ already liked — do nothing
    return;
  }

  // ❤️ insert like
  const { error } = await supabase
    .from("post_likes")
    .insert([{ post_id: postId, user_id: userId }]);

  if (!error) {
    // UI update
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes_count: (post.likes_count || 0) + 1 }
        : post
    ));
  }
};


const toggleComments = (postId) => {
  setShowComments(prev => ({
    ...prev,
    [postId]: !prev[postId]
  }));
};

const fetchComments = async (postId) => {
  const { data } = await supabase
    .from("post_comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  setComments(prev => ({
    ...prev,
    [postId]: data || []
  }));
};

const handleAddComment = async (postId) => {
  const text = newComment[postId];
  if (!text) return;

  const { error } = await supabase
    .from("post_comments")
    .insert([{
      post_id: postId,
      user_id: getUserId(),
      content: text
    }]);

  if (!error) {
    setNewComment(prev => ({ ...prev, [postId]: "" }));
    fetchComments(postId);
  }
};


// 🚀 Submit post
const handleSubmitPost = async () => {

if (!newPost.trim()) return;

setIsSubmitting(true);

const { error } = await supabase
  .from("community_posts")
  .insert([
    {
      content: newPost,
    user_id: getUserId(),
      name: "Someone Like You",
      is_anonymous: true,
      mood: selectedMood,
    },
  ]);

if (error) {
  console.log("INSERT ERROR:", error);
  alert("Post failed");
} else {
  setNewPost('');
  fetchPosts();
}

setIsSubmitting(false);

};

return (
  <div className="min-h-screen bg-[#0f172a] text-white p-6">

    {/* HEADER */}
    <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
  Community
</h1>

    <div className="grid grid-cols-12 gap-6">

      {/* LEFT SIDEBAR */}
<div className="col-span-3 space-y-4">

  <div className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-md">
    <h3 className="font-semibold mb-2">Your Stats</h3>
    <p>Posts: {posts.length}</p>
  </div>

  <div className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-md">
    <h3 className="font-semibold mb-2">Top Users</h3>
    <p>User 1</p>
    <p>User 2</p>
  </div>

</div>

      {/* LEFT FEED */}
      <div className="col-span-6 space-y-8">

        {/* CREATE POST */}
        <div className="sticky top-4 z-10 bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg">

        <div className="mb-4">
    <p className="text-sm text-gray-400 mb-2">How are you feeling?</p>

    <div className="flex gap-2 flex-wrap">
      {["😔 Low", "😰 Anxious", "😵 Overthinking", "😐 Numb"].map(mood => (
        <button
          key={mood}
          type="button"
          onClick={() => setSelectedMood(mood)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedMood === mood
              ? "bg-purple-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          {mood}
        </button>
      ))}
    </div>
  </div>  

          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts..."
            rows="3"
            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
          />

          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <span>Anonymous</span>
            </label>

            <button
              onClick={() => {
              gtag('event', 'create_post', {
              event_category: 'engagement',
              event_label: 'post_created'
              });
              handleSubmitPost();
              }}
              disabled={isSubmitting || !newPost.trim()}
              className="bg-purple-600 px-5 py-2 rounded-lg shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition duration-300"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>

        {/* POSTS */}
        {isLoading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          posts.map(post => (
            <div
              key={post.id}
              className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-white/10 shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 hover:scale-[1.01] transition duration-300"
            >

              {/* HEADER */}
              <div className="flex items-center gap-3 mb-3">

  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
    <User size={18} />
  </div>

  <div className="flex flex-col">
    <p className="font-semibold text-purple-300">
      {post.is_anonymous ? "Someone Like You" : post.name}

      {new Date() - new Date(post.created_at) < 3600000 && (
  <span className="ml-2 text-xs text-green-400">New</span>
)}
    </p>
    <span className="text-xs text-gray-400">
      {formatTimestamp(post.created_at)}
    </span>
  </div>

</div>
              {post.mood && (
  <p className="text-sm text-purple-300 mb-1">{post.mood}</p>
)}


              {/* CONTENT */}
              <p className="mb-4 text-gray-200 leading-relaxed">
  {post.content}
</p>

              {/* ACTIONS */}
              <div className="flex justify-between border-t border-white/10 pt-3 mt-3 text-sm">

  <button
    onClick={() => {
  gtag('event', 'like_post', {
    event_category: 'engagement',
    event_label: 'like_clicked'
  });
  handleLike(post.id);
}}
    className="flex items-center gap-1 hover:text-red-400 transition"
  >
    ❤️ <span>{post.likes_count || 0}</span>
  </button>

  <button
  onClick={() => {
  if (window.gtag) {
    window.gtag('event', 'open_comments', {
      event_category: 'engagement',
      event_label: 'comment_open'
    });
  }
  toggleComments(post.id);
}}
  className="flex items-center gap-1 hover:text-blue-400"
>
  💬 {comments[post.id]?.length || 0}
</button>

  <button className="flex items-center gap-1 hover:text-green-400">
    🔗 Share
  </button>

</div>



            </div>
          ))
        )}

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="col-span-3 space-y-6">

        <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-white/10">
          <h3 className="font-semibold mb-3">Trending</h3>
          {trendingPosts.map(post => (
  <p key={post.id} className="text-sm text-gray-300 mb-2">
    {post.content.slice(0, 40)}...
  </p>
))}
        </div>

        <div className="bg-white/5 backdrop-blur-lg p-5 rounded-2xl border border-white/10">
          <h3 className="font-semibold mb-3">Top Therapists</h3>
          <p>Coming soon...</p>
        </div>

      </div>

    </div>
  </div>
);
};

export default CommunityPage;