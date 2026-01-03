import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_MANGAS, MOCK_NOVELS } from '../constants';
import { Play, Star, List, Heart, Share2, Info, Sparkles } from 'lucide-react';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find item in both lists
  const item = [...MOCK_MANGAS, ...MOCK_NOVELS].find(i => i.id === id);

  if (!item) {
    return <div className="p-10 text-center">Content not found</div>;
  }

  const isManga = item.type === 'MANGA';
  const themeColor = isManga ? 'blue' : 'emerald';
  const btnColor = isManga ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700';

  return (
    <div className="max-w-5xl mx-auto pb-10 animate-fade-in">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-10 items-start">
        {/* 3D Book Cover Container */}
        <div className="w-full md:w-72 flex-shrink-0 flex justify-center md:justify-start perspective-2000 z-10">
          <div className="book-3d-container w-48 md:w-64 aspect-[2/3]">
             {/* Front Cover */}
             <img 
               src={item.coverUrl} 
               alt={item.title} 
               className="w-full h-full object-cover rounded-r-sm shadow-2xl relative z-10" 
             />
             
             {/* 3D Spine & Pages */}
             <div className="book-spine" style={{ 
               background: `linear-gradient(90deg, #111 0%, #333 40%, #111 100%)` 
             }}></div>
             <div className="book-pages"></div>
             
             {/* Dynamic Shadow */}
             <div className="book-shadow"></div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-end pb-2 pt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white leading-tight">
            {item.title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 font-medium">
            By <span className="text-gray-900 dark:text-gray-200">{item.author}</span>
          </p>
          
          <div className="flex items-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 fill-yellow-400" size={18} />
              <span className="font-bold text-lg">{item.rating}</span>
              <span className="text-gray-400">(12k reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <List size={18} className="text-gray-400" />
              <span className="font-bold text-lg">{item.totalChapters}</span>
              <span className="text-gray-400">Chapters</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${item.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
              <span className="text-gray-400">{item.status}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link 
              to={`/read/${isManga ? 'MANGA' : 'NOVEL'}/${id}/1`}
              className={`flex-1 sm:flex-none px-8 py-3.5 ${btnColor} text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95`}
            >
              <Play size={20} className="fill-white" /> Read First
            </Link>
            <button className="px-4 py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-200 transition-colors">
              <Heart size={20} />
            </button>
            <button className="px-4 py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-gray-700 dark:text-gray-200 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Synopsis) */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Info size={18} className="text-gray-400" /> Synopsis
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {item.synopsis}
            </p>
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
               <button className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 group">
                 <Sparkles size={16} className="group-hover:rotate-12 transition-transform" /> Generate AI Summary
               </button>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4">Chapters</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              {Array.from({ length: 10 }).map((_, i) => (
                <Link 
                  key={i}
                  to={`/read/${isManga ? 'MANGA' : 'NOVEL'}/${id}/${item.totalChapters - i}`}
                  className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400 font-mono text-sm w-8">#{item.totalChapters - i}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">Episode Title {item.totalChapters - i}</span>
                  </div>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </Link>
              ))}
              <button className="w-full py-4 text-center text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                View All Chapters
              </button>
            </div>
          </section>
        </div>

        {/* Right Column (Info) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm sticky top-24">
            <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Information</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Type</span>
                <span className="font-medium">{isManga ? 'Manga' : 'Web Novel'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-green-600">{item.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Views</span>
                <span className="font-medium">{item.views}</span>
              </div>
              {!isManga && (
                 <div className="flex justify-between">
                   <span className="text-gray-500">Word Count</span>
                   <span className="font-medium">{(item as any).wordCount}</span>
                 </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;