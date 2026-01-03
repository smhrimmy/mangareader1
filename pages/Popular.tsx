import React from 'react';
import { AppMode } from '../types';
import { MOCK_MANGAS, MOCK_NOVELS } from '../constants';
import { Star, TrendingUp, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PopularProps {
  mode: AppMode;
}

const Popular: React.FC<PopularProps> = ({ mode }) => {
  const isManga = mode === AppMode.MANGA;
  // Duplicate mock data to create a longer list
  const items = [...(isManga ? MOCK_MANGAS : MOCK_NOVELS), ...(isManga ? MOCK_MANGAS : MOCK_NOVELS), ...(isManga ? MOCK_MANGAS : MOCK_NOVELS)].map((item, i) => ({...item, id: `${item.id}-${i}`}));

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center gap-4 py-4">
        <div className={`p-3 rounded-2xl ${isManga ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
           <TrendingUp size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Most Popular</h1>
          <p className="text-gray-500 dark:text-gray-400">Top rated {isManga ? 'Manga' : 'Novels'} this week</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="group relative flex items-center gap-4 md:gap-6 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
             {/* Rank Number with Metallic Effect */}
             <div className="w-12 md:w-16 flex-shrink-0 text-center">
                <span className={`text-4xl md:text-5xl font-black italic tracking-tighter opacity-80
                   ${index < 3 ? 'text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 drop-shadow-sm' : 'text-gray-200 dark:text-gray-700'}
                `}
                style={{ 
                  textShadow: index < 3 ? '2px 2px 4px rgba(0,0,0,0.1)' : 'none'
                }}
                >
                   {index + 1}
                </span>
             </div>

             {/* Cover */}
             <Link to={`/details/${item.id.split('-')[0]}`} className="w-20 md:w-24 aspect-[2/3] rounded-lg overflow-hidden shadow-md flex-shrink-0 perspective-1000">
               <img 
                 src={item.coverUrl} 
                 alt={item.title} 
                 className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
               />
             </Link>

             {/* Info */}
             <div className="flex-1 min-w-0">
               <div className="flex flex-wrap gap-2 mb-1">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-full">{tag}</span>
                  ))}
               </div>
               <Link to={`/details/${item.id.split('-')[0]}`} className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-brand-500 transition-colors line-clamp-1 mb-1">
                 {item.title}
               </Link>
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.author}</p>
               
               <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                     <Star size={14} className="text-yellow-400 fill-yellow-400" />
                     <span className="font-semibold text-gray-700 dark:text-gray-300">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 hidden sm:flex">
                     <Eye size={14} />
                     <span>{item.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                     <span className={`w-2 h-2 rounded-full ${item.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'}`} />
                     <span>{item.status}</span>
                  </div>
               </div>
             </div>

             {/* Action */}
             <div className="hidden md:block pr-4">
                <Link to={`/details/${item.id.split('-')[0]}`} className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${isManga ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                   Read
                </Link>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;