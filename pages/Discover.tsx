import React from 'react';
import { AppMode } from '../types';
import { Search, Compass, Zap, Heart, Sword, Ghost, Cpu } from 'lucide-react';

interface DiscoverProps {
  mode: AppMode;
}

const GENRES = [
  { name: 'Action', icon: Sword, color: 'from-red-500 to-orange-500' },
  { name: 'Romance', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { name: 'Fantasy', icon: Compass, color: 'from-purple-500 to-indigo-500' },
  { name: 'Sci-Fi', icon: Cpu, color: 'from-cyan-500 to-blue-500' },
  { name: 'Horror', icon: Ghost, color: 'from-gray-700 to-black' },
  { name: 'Adventure', icon: Zap, color: 'from-yellow-400 to-orange-500' },
];

const Discover: React.FC<DiscoverProps> = ({ mode }) => {
  const isManga = mode === AppMode.MANGA;

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Discover New {isManga ? 'Worlds' : 'Stories'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Explore thousands of titles across various genres. Find your next obsession today.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative group perspective-1000">
           <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
           <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full shadow-xl transform transition-transform group-hover:scale-[1.01] duration-300">
              <Search className="ml-4 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by title, author, or tag..." 
                className="w-full p-4 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
              <button className={`mr-2 px-6 py-2 rounded-full text-white font-medium transition-transform active:scale-95 ${isManga ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                Search
              </button>
           </div>
        </div>
      </div>

      {/* Genres 3D Cards */}
      <section>
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">Browse by Genre</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {GENRES.map((genre, i) => (
            <div 
              key={genre.name}
              className="group relative h-40 rounded-2xl cursor-pointer perspective-1000 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} rounded-2xl shadow-lg transform transition-all duration-300 group-hover:rotate-x-12 group-hover:rotate-y-12 group-hover:scale-105 group-hover:shadow-2xl preserve-3d flex flex-col items-center justify-center text-white`}>
                 <div className="transform translate-z-20 mb-2 p-3 bg-white/20 rounded-full backdrop-blur-sm" style={{ transform: 'translateZ(30px)' }}>
                   <genre.icon size={28} />
                 </div>
                 <span className="font-bold text-lg transform translate-z-10" style={{ transform: 'translateZ(20px)' }}>
                   {genre.name}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Recommendations */}
      <section className="bg-gray-100 dark:bg-gray-800/50 rounded-3xl p-8 border border-gray-200 dark:border-gray-700/50">
         <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-1 block">Curated For You</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Picks</h2>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
               <div key={i} className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-20 h-28 bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                     <img src={`https://picsum.photos/200/300?random=${i + 50}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                     <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">The Great Adventure {i}</h3>
                     <div className="flex gap-2 mb-2">
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-500">Fantasy</span>
                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-500">Action</span>
                     </div>
                     <p className="text-xs text-gray-500 line-clamp-2">A wonderful journey through time and space awaiting discovery.</p>
                  </div>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default Discover;