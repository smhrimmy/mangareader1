import React from 'react';
import { AppMode } from '../types';
import { MOCK_MANGAS, MOCK_NOVELS } from '../constants';
import { Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LatestProps {
  mode: AppMode;
}

const Latest: React.FC<LatestProps> = ({ mode }) => {
  const isManga = mode === AppMode.MANGA;
  
  // Create grouped updates mock
  const updates = [
    { time: 'Today', items: [...MOCK_MANGAS, ...MOCK_NOVELS] },
    { time: 'Yesterday', items: [MOCK_NOVELS[0], MOCK_MANGAS[1]] },
    { time: 'This Week', items: [MOCK_MANGAS[2], MOCK_NOVELS[1], MOCK_NOVELS[2]] },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
       <div className="flex items-center gap-4 py-4">
        <div className={`p-3 rounded-2xl ${isManga ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
           <Clock size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Updates</h1>
          <p className="text-gray-500 dark:text-gray-400">Fresh chapters added recently</p>
        </div>
      </div>

      <div className="space-y-12">
        {updates.map((group, groupIndex) => (
           <section key={group.time} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-brand-500 border-4 border-white dark:border-gray-900"></div>
              <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                 <Calendar size={18} className="text-gray-400" /> {group.time}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {group.items.map((item, i) => (
                    <Link 
                      key={`${groupIndex}-${i}`} 
                      to={`/details/${item.id}`}
                      className="flex gap-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:translate-x-1"
                    >
                       <div className="w-16 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.coverUrl} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm line-clamp-1">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.author}</p>
                          </div>
                          <div className="flex justify-between items-end">
                             <span className={`text-xs font-medium px-2 py-0.5 rounded ${isManga ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                Ch. {item.totalChapters + 1}
                             </span>
                             <span className="text-[10px] text-gray-400">2h ago</span>
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
           </section>
        ))}
      </div>
    </div>
  );
};

export default Latest;