import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
import axios from 'axios';
import { mentalHealthArticles } from '../data/blogArticles';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const formatDate = (iso) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
};

const SingleBlog = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setNotFound(false);
      // 1) Try DB: treat slug as a real slug string
      try {
        const res = await axios.get(`${API_URL}/api/blogs/${slug}`);
        if (!cancelled) {
          const b = res.data;
          setArticle({
            id: b.slug,
            title: b.title,
            excerpt: b.excerpt || '',
            content: b.content,
            category: b.category || 'Mental Health',
            date: formatDate(b.published_at || b.created_at),
            readTime: '5 min',
            source: b.author_name || 'Aashwashan',
            image: b.featured_image || 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200',
            isFromDB: true,
          });
          setLoading(false);
          return;
        }
      } catch (err) {
        // fall through to static fallback
      }

      // 2) Fall back to static articles by numeric id
      const numericId = parseInt(slug, 10);
      const staticArticle = mentalHealthArticles.find((a) => a.id === numericId);
      if (!cancelled) {
        if (staticArticle) setArticle(staticArticle);
        else setNotFound(true);
        setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" data-testid="blog-not-found">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h3>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="text-teal-600 hover:underline font-medium" data-testid="back-to-blog-link">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = mentalHealthArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);
  const moreRelated = relatedArticles.length < 3 
    ? [...relatedArticles, ...mentalHealthArticles.filter(a => a.id !== article.id && !relatedArticles.includes(a)).slice(0, 3 - relatedArticles.length)]
    : relatedArticles;

  return (
    <div className="min-h-screen bg-white" data-testid="single-blog-page">
      {/* Hero / Header */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-cyan-50 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium mb-8 transition-colors"
              data-testid="single-blog-back"
            >
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Articles
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-teal-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" /> {article.readTime} read
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-testid="single-blog-title">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {article.date}
              </span>
              <span className="flex items-center gap-2 text-teal-600 font-medium">
                <ExternalLink className="w-4 h-4" /> {article.isFromDB ? 'By' : 'Source'}: {article.source}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
              data-testid="single-blog-image"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {/* Lead / Excerpt */}
              {article.excerpt && (
                <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-teal-500 pl-6">
                  {article.excerpt}
                </p>
              )}

              {/* Article Body */}
              {article.isFromDB && article.content ? (
                <div className="space-y-6 text-gray-700 leading-relaxed whitespace-pre-wrap text-lg" data-testid="single-blog-content">
                  {article.content}
                </div>
              ) : (
                <ArticleContent article={article} />
              )}

              {/* Source Attribution */}
              <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>{article.isFromDB ? 'Author' : 'Source'}:</strong> {article.source} &bull; Published: {article.date}
                </p>
                {!article.isFromDB && (
                  <p className="text-xs text-gray-400 mt-2">
                    This article is curated and summarized by Aashwashan for educational purposes. 
                    For the full original article, please visit the original source.
                  </p>
                )}
              </div>
            </div>

            {/* Share & Actions */}
            <div className="mt-10 pt-8 border-t border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">Share this article</h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: article.title, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors"
                  data-testid="share-article-btn"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 p-8 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Need someone to talk to?</h3>
              <p className="text-gray-600 mb-4">
                If this article resonated with you, our team of licensed psychologists is here to help. 
                We can help you find a time that works for you.
              </p>
              <Link 
                to="/team"
                className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                data-testid="blog-cta-book-session"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {moreRelated.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {moreRelated.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    data-testid={`related-article-${relatedPost.id}`}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-block bg-teal-50 text-teal-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        {relatedPost.category}
                      </span>
                      <h4 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-500">{relatedPost.date} &bull; {relatedPost.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// Component to generate structured article content for static articles
const ArticleContent = ({ article }) => {
  const { excerpt, category } = article;

  const categoryContent = {
    "Research & Studies": {
      sections: [
        { heading: "Key Findings", body: `The research highlighted in this article points to significant developments in our understanding of mental health. ${excerpt} This study adds to the growing body of evidence suggesting that lifestyle factors play a crucial role in psychological wellbeing, particularly among young adults aged 18-30 who face unique pressures in today's fast-paced world.` },
        { heading: "What This Means", body: "These findings have important implications for how we approach mental health care in India. Healthcare professionals are increasingly recognizing that early intervention and awareness can prevent more severe conditions from developing. The data suggests that simple behavioral changes, when implemented consistently, can have a meaningful impact on mental health outcomes." },
        { heading: "Expert Perspective", body: `"Mental health research in India is finally getting the attention it deserves," say experts in the field. With institutions like AIIMS, IIT, and NIMHANS actively contributing to mental health research, there is growing optimism that evidence-based interventions will become more accessible to the general population. The challenge remains in translating these findings into practical, everyday solutions.` }
      ]
    },
    "Policy & Budget": {
      sections: [
        { heading: "Policy Overview", body: `${excerpt} This development marks a significant shift in how mental health is prioritized within India's healthcare framework. Policymakers are increasingly acknowledging that mental health infrastructure needs the same level of investment and attention as physical health services.` },
        { heading: "Impact on Healthcare Access", body: "The policy changes outlined here are expected to improve access to mental health services across India, particularly in underserved rural and semi-urban areas. By expanding the network of wellness centers and training more mental health professionals, the government aims to reduce the treatment gap that currently affects millions of Indians." },
        { heading: "Looking Ahead", body: "While these policy measures are a step in the right direction, experts emphasize that implementation will be key. Consistent funding, trained professionals, and community awareness programs will be essential to ensure that these policies translate into real improvements in people's lives." }
      ]
    },
    "Healthcare News": {
      sections: [
        { heading: "Current Developments", body: `${excerpt} The healthcare sector in India is undergoing a transformation in how mental health services are delivered. From telemedicine platforms to community-based interventions, innovative approaches are making care more accessible than ever before.` },
        { heading: "Addressing the Treatment Gap", body: "India faces a significant mental health treatment gap, with estimates suggesting that nearly 80% of those needing care do not receive it. The developments described in this article represent progress toward closing this gap, but significant challenges remain in terms of affordability, availability, and stigma reduction." },
        { heading: "What You Can Do", body: "If you or someone you know is struggling with mental health challenges, remember that seeking help is a sign of strength. Start by talking to a trusted friend, family member, or a professional. Many organizations, including Aashwashan, offer accessible and affordable mental health support." }
      ]
    },
    "Workplace Wellness": {
      sections: [
        { heading: "The Workplace Reality", body: `${excerpt} The modern workplace, especially post-pandemic, has created new challenges for mental health. Remote work, always-on culture, and blurred boundaries between personal and professional life are contributing to rising rates of burnout and stress among Indian professionals.` },
        { heading: "What Organizations Are Doing", body: "Forward-thinking companies in India are beginning to implement mental health programs, including Employee Assistance Programs (EAPs), mental health days, and wellness workshops. Some are even adopting 'right to disconnect' policies to help employees maintain healthy boundaries." },
        { heading: "Tips for Individuals", body: "While organizational change is important, individuals can also take steps to protect their mental health at work. Setting clear boundaries, taking regular breaks, practicing mindfulness, and seeking support when needed are all effective strategies. Remember, your mental health is just as important as your career goals." }
      ]
    },
    "Self-Care": {
      sections: [
        { heading: "Understanding Self-Care", body: `${excerpt} Self-care is not just about spa days and vacations - it's about consistently making choices that support your physical, emotional, and mental wellbeing. In India's high-pressure culture, this can be particularly challenging but is more important than ever.` },
        { heading: "Practical Approaches", body: "Effective self-care looks different for everyone, but some universally helpful practices include regular physical activity, adequate sleep, maintaining social connections, and engaging in activities that bring you joy. The key is consistency rather than perfection." },
        { heading: "Making It Sustainable", body: "The best self-care routine is one you can actually maintain. Start small - even 10 minutes of mindful breathing or a short walk can make a difference. The goal is to build habits that become a natural part of your daily life, not additional sources of stress." }
      ]
    },
    "Trends": {
      sections: [
        { heading: "Emerging Patterns", body: `${excerpt} The mental health landscape in India is evolving rapidly, driven by increased awareness, technology adoption, and changing social attitudes. These trends reflect a broader shift toward prioritizing psychological wellbeing alongside physical health.` },
        { heading: "Technology's Role", body: "Digital mental health platforms, AI-powered wellness tools, and teletherapy services are making mental health support more accessible than ever. Young Indians, in particular, are embracing these technologies as a first step toward seeking professional help." },
        { heading: "The Road Ahead", body: "As mental health awareness continues to grow in India, we can expect to see even more innovative solutions and services emerge. The challenge will be ensuring that these developments reach those who need them most, including marginalized and underserved communities." }
      ]
    }
  };

  const content = categoryContent[category] || categoryContent["Healthcare News"];

  return (
    <div className="space-y-8 text-gray-700 leading-relaxed">
      {content.sections.map((section, idx) => (
        <div key={idx}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.heading}</h2>
          <p className="leading-relaxed">{section.body}</p>
        </div>
      ))}
      
      <blockquote className="border-l-4 border-teal-500 pl-6 py-3 my-8 bg-teal-50 rounded-r-xl italic text-gray-600">
        "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
        <footer className="mt-2 text-sm text-gray-500 not-italic">— Mental Health Professional</footer>
      </blockquote>
    </div>
  );
};

export default SingleBlog;
