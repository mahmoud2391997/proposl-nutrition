import React, { useState } from 'react';
import { generateBlogContent } from '../services/geminiService';
import { Loader2, BookOpen, X, Sparkles } from 'lucide-react';

interface BlogTopic {
  id: string;
  title: string;
  category: string;
  image: string;
}

const topics: BlogTopic[] = [
  { id: '1', title: 'Intermittent Fasting: Fact vs Fiction', category: 'Trends', image: 'https://picsum.photos/400/300?random=10' },
  { id: '2', title: 'The Truth About Sugar Substitutes', category: 'Ingredients', image: 'https://picsum.photos/400/300?random=11' },
  { id: '3', title: 'Macronutrients 101: A Beginners Guide', category: 'Education', image: 'https://picsum.photos/400/300?random=12' },
  { id: '4', title: 'Gut Health and Mental Clarity', category: 'Wellness', image: 'https://picsum.photos/400/300?random=13' },
  { id: '5', title: 'Plant-Based Protein Sources', category: 'Nutrition', image: 'https://picsum.photos/400/300?random=14' },
  { id: '6', title: 'Hydration Strategies for Athletes', category: 'Sports', image: 'https://picsum.photos/400/300?random=15' },
];

const Blog: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<{ topic: BlogTopic; content: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReadArticle = async (topic: BlogTopic) => {
    setLoading(true);
    try {
      const content = await generateBlogContent(topic.title);
      setActiveArticle({ topic, content });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeArticle = () => {
    setActiveArticle(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Modal for Reading */}
      {activeArticle && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in">
            <button onClick={closeArticle} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
              <X className="w-6 h-6 text-slate-600" />
            </button>
            <div className="h-64 w-full relative">
              <img src={activeArticle.topic.image} alt={activeArticle.topic.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div>
                   <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                    {activeArticle.topic.category}
                   </span>
                   <h2 className="text-3xl font-bold text-white leading-tight">{activeArticle.topic.title}</h2>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12 prose prose-emerald max-w-none">
               <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
                 <Sparkles className="w-4 h-4 text-purple-500" />
                 <span>AI-Generated Content • Review by a professional recommended</span>
               </div>
               {activeArticle.content.split('\n\n').map((para, idx) => (
                 <p key={idx} className="text-slate-700 text-lg leading-relaxed mb-4">{para}</p>
               ))}
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Nutrition Insights</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Stay informed with the latest research and tips. Click any topic to generate a comprehensive article instantly.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map(topic => (
          <div key={topic.id} className="group cursor-pointer" onClick={() => handleReadArticle(topic)}>
            <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video shadow-md">
              <img 
                src={topic.image} 
                alt={topic.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              {loading && activeArticle === null && (
                 // Simple overlay if needed, but we'll use a global spinner or just button state usually
                 <div className="hidden"></div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{topic.category}</span>
                <span className="text-xs text-slate-400">5 min read</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight">
                {topic.title}
              </h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mt-2 group-hover:translate-x-1 transition-transform">
                Read Article <BookOpen className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="fixed bottom-8 right-8 bg-emerald-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 animate-bounce">
          <Loader2 className="w-5 h-5 animate-spin" />
          Generating article...
        </div>
      )}
    </div>
  );
};

export default Blog;