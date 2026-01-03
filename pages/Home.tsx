import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppMode, Manga, Novel } from '../types';
import { MOCK_MANGAS, MOCK_NOVELS } from '../constants';
import { Star, Clock, BookOpen, Layers } from 'lucide-react';

interface HomeProps {
  mode: AppMode;
}

const Home: React.FC<HomeProps> = ({ mode }) => {
  const isManga = mode === AppMode.MANGA;
  const items = isManga ? MOCK_MANGAS : MOCK_NOVELS;

  // 3D Tilt Logic for Hero Section
  const heroRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Calculate tilt angles (max 10 degrees)
    const tiltX = (0.5 - y) * 20; 
    const tiltY = (x - 0.5) * 20;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-8 animate-fade-in perspective-1000">
      {/* Hero Section with 3D Tilt */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl transform transition-transform duration-100 ease-out preserve-3d
        ${isManga ? 'bg-gradient-to-r from-blue-900 to-blue-600' : 'bg-gradient-to-r from-emerald-900 to-emerald-600'}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
        }}
      >
        <div className="relative z-10 max-w-2xl transform translate-z-10" style={{ transform: 'translateZ(50px)' }}>
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold mb-4 border border-white/30">
            Featured {isManga ? 'Manga' : 'Novel'}
          </span>
          <h1 className="text-4xl font-bold mb-4 leading-tight drop-shadow-lg">
            {isManga ? "Solo Leveling: Reawakened" : "Shadow Slave"}
          </h1>
          <p className="text-blue-100 mb-6 line-clamp-2 text-lg opacity-90 drop-shadow-md">
            {isManga 
              ? "The legendary hunter returns. Witness the awakening of a power that defies the system itself." 
              : "Lost in a nightmare world, one boy must master the shadows to survive against gods and monsters."}
          </p>
          <div className="flex gap-4">
            <Link 
              to={isManga ? "/details/m1" : "/details/n1"}
              className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Start Reading
            </Link>
            <button className="px-6 py-3 bg-black/20 backdrop-blur text-white rounded-xl font-semibold hover:bg-black/30 transition-all border border-white/20 hover:scale-105">
              + Bookmark
            </button>
          </div>
        </div>
        
        {/* Background Decorative Glow */}
        <div className="absolute -right-20 -bottom-40 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-z-0"></div>
        
        {/* Parallax Image element (abstract) */}
        <div 
          className="absolute right-10 top-10 opacity-20 pointer-events-none transition-transform duration-100"
          style={{ transform: `translateX(${tilt.y * 1.5}px) translateY(${tilt.x * 1.5}px) translateZ(20px)` }}
        >
           <Layers size={200} />
        </div>
      </section>

      {/* Continue Reading */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <Clock size={20} className={isManga ? 'text-blue-500' : 'text-emerald-500'} />
          Continue Reading
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.slice(0, 2).map((item, i) => (
             <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
               <div className="w-16 h-24 flex-shrink-0 shadow-md rounded-md overflow-hidden transform transition-transform group-hover:scale-105">
                 <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 flex flex-col justify-center">
                 <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{item.title}</h3>
                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Ch. {isManga ? '142' : '890'} / {item.totalChapters}</p>
                 <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                   <div className={`h-full w-2/3 ${isManga ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* Main Grid */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Layers size={20} className={isManga ? 'text-blue-500' : 'text-emerald-500'} />
            Latest Updates
          </h2>
          <Link to="/latest" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">View All</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((item, i) => (
            <Link 
              to={`/details/${item.id}`} 
              key={item.id} 
              className="group flex flex-col animate-fade-in-up" 
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="relative aspect-[2/3] mb-3 overflow-hidden rounded-xl shadow-md bg-gray-200 dark:bg-gray-800 perspective-1000">
                <div className="w-full h-full transition-all duration-500 group-hover:transform group-hover:rotate-y-12 group-hover:scale-105 preserve-3d">
                   <img 
                    src={item.coverUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover backface-hidden"
                    loading="lazy"
                  />
                  {/* Glossy sheen effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ transform: 'translateZ(1px)' }}></div>
                </div>
                
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1 z-10">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" /> {item.rating}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-brand-500 transition-colors">
                {item.title}
              </h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                 <span>{item.type === 'MANGA' ? 'Manga' : 'Novel'}</span>
                 <span>{item.lastUpdate}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;