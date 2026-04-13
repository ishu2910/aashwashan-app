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
const [newPost, setNewPost] = useState('');
const [isAnonymous, setIsAnonymous] = useState(true);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
fetchPosts();
}, []);

// 📥 Fetch posts
const fetchPosts = async () => {
try {
const { data, error } = await supabase
.from("community_posts")
.select("*");

  if (error) {
    console.log("FETCH ERROR:", error);
  } else {
    setPosts(data || []);
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
const handleLike = (postId) => {
setPosts(posts.map(post =>
post.id === postId
? { ...post, likes_count: (post.likes_count || 0) + 1 }
: post
));
};

// 🚀 Submit post
const handleSubmitPost = async (e) => {
e.preventDefault();

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
  <div>

    {/* Hero */}
    <section className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 py-20 text-white">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">Community Forum</h1>
        <p>A safe space to share your thoughts anonymously.</p>
      </div>
    </section>

  {/* Create Post */}
  <section className="py-10 bg-white">
    <div className="max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmitPost} className="bg-teal-50 p-6 rounded-xl">

        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
          />
          <span>Post anonymously</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting || !newPost.trim()}
          className="bg-teal-500 text-white px-6 py-2 rounded-lg"
        >
          {isSubmitting ? "Posting..." : "Share"}
        </button>

      </form>
    </div>
  </section>

  {/* Posts */}
  <section className="py-10">
    <div className="max-w-3xl mx-auto px-4">

      {isLoading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="border p-4 rounded-lg mb-4">

            <div className="flex justify-between mb-2">
              <p className="font-semibold">
                {post.is_anonymous ? "Someone Like You" : post.name}
              </p>
              <span className="text-sm text-gray-500">
                {formatTimestamp(post.created_at)}
              </span>
            </div>

            <p className="mb-3">{post.content}</p>

            <button onClick={() => handleLike(post.id)}>
              ❤️ {post.likes_count || 0}
            </button>

          </div>
        ))
      )}

    </div>
  </section>
</div>

);
};

export default CommunityPage;