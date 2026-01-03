import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  Type, 
  Moon, 
  Sun,
  Play,
  Pause,
  Music,
  Clock,
  BookOpen,
  X,
  AlignLeft,
  ChevronsDown,
  Volume2
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_CHAPTER_TEXT } from '../constants';

interface ReaderNovelProps {
  title: string;
  chapterId: string;
}

const AMBIENT_TRACKS = [
  { title: "Rainy Cafe", color: "bg-blue-500" },
  { title: "Crackling Fire", color: "bg-orange-500" },
  { title: "Deep Space", color: "bg-indigo-900" },
  { title: "Forest Creek", color: "bg-emerald-600" }
];

const ReaderNovel: React.FC<ReaderNovelProps> = ({ title, chapterId }) => {
  const navigate = useNavigate();
  
  // -- State: Loading & Visibility --
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  // -- State: Reader Appearance --
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia' | 'midnight'>('light');

  // -- State: Auto Scroll --
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(0); // 0 = off, 1-10 speed
  const scrollInterval = useRef<number | null>(null);

  // -- State: Music & Timer --
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(50);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null); // minutes remaining

  // Simulate Content Loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [chapterId]);

  // Auto Scroll Logic
  useEffect(() => {
    if (autoScrollSpeed > 0) {
      // Clear existing interval to restart with new speed
      if (scrollInterval.current) clearInterval(scrollInterval.current);
      
      const speedMs = 50 - (autoScrollSpeed * 4); // Map speed 1-10 to interval ms
      scrollInterval.current = window.setInterval(() => {
        window.scrollBy(0, 1);
        // Check if bottom reached
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
           setAutoScrollSpeed(0);
        }
      }, speedMs);
    } else {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
    }
    return () => {
      if (scrollInterval.current) clearInterval(scrollInterval.current);
    };
  }, [autoScrollSpeed]);

  // Sleep Timer Logic
  useEffect(() => {
    if (sleepTimer === null) return;
    
    if (sleepTimer === 0) {
      // Time's up
      setIsPlaying(false);
      setAutoScrollSpeed(0);
      setSleepTimer(null);
      // Optional: Show a "Sleep" modal
      return;
    }

    const timer = setInterval(() => {
      setSleepTimer(prev => (prev && prev > 0 ? prev - 1 : 0));
    }, 60000); // Decrement every minute

    return () => clearInterval(timer);
  }, [sleepTimer]);

  const getThemeClasses = () => {
    switch(theme) {
      case 'dark': return 'bg-gray-900 text-gray-300';
      case 'midnight': return 'bg-[#0f172a] text-slate-400';
      case 'sepia': return 'bg-[#f4ecd8] text-[#5b4636]';
      default: return 'bg-white text-gray-800';
    }
  };

  const getFontClass = () => {
    switch(fontFamily) {
        case 'sans': return 'font-sans';
        case 'mono': return 'font-mono';
        default: return 'font-serif';
    }
  }

  // --- Render Loading Screen ---
  if (loading) {
    return (
      <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500`}>
         <div className="relative mb-8">
            <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-xl animate-pulse"></div>
            <BookOpen size={64} className="text-brand-600 dark:text-brand-400 relative z-10 animate-bounce" />
         </div>
         <div className="flex flex-col items-center gap-2">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 animate-fade-in">Loading Chapter {chapterId}</h2>
            <div className="w-48 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
               <div className="h-full bg-brand-500 animate-loading-bar"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2 font-mono">Fetching content...</p>
         </div>
         <style>{`
           @keyframes loading-bar {
             0% { width: 0%; }
             50% { width: 70%; }
             100% { width: 100%; }
           }
           .animate-loading-bar {
             animation: loading-bar 1.5s ease-in-out infinite;
           }
         `}</style>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ease-in-out ${getThemeClasses()} ${getFontClass()} relative`}>
      
      {/* --- Sticky Header --- */}
      <div className={`sticky top-0 z-40 flex items-center justify-between px-4 h-14 transition-all duration-300 border-b
        ${theme === 'light' ? 'bg-white/95 border-gray-100' : ''}
        ${theme === 'sepia' ? 'bg-[#f4ecd8]/95 border-[#e3d7bf]' : ''}
        ${theme === 'dark' ? 'bg-gray-900/95 border-gray-800' : ''}
        ${theme === 'midnight' ? 'bg-[#0f172a]/95 border-slate-800' : ''}
        ${autoScrollSpeed > 0 ? '-translate-y-full' : 'translate-y-0'} 
      `}>
        {/* Hover area to bring header back if auto-scrolling? Users usually tap. */}
        
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:opacity-70 transition-opacity">
          <ArrowLeft size={20} />
        </button>
        
        <div className="text-center flex-1 mx-4">
          <h1 className="text-sm font-bold truncate opacity-90">{title}</h1>
          <p className="text-[10px] uppercase tracking-wider opacity-60">Chapter {chapterId}</p>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => setShowMusic(!showMusic)} 
            className={`p-2 rounded-full transition-all ${showMusic || isPlaying ? 'text-brand-500 bg-brand-500/10' : 'hover:opacity-70'}`}
          >
            <Music size={20} className={isPlaying ? "animate-pulse" : ""} />
          </button>
          <button 
            onClick={() => setShowMenu(!showMenu)} 
            className={`p-2 rounded-full transition-all ${showMenu ? 'rotate-90' : 'hover:opacity-70'}`}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* --- Ambient Music Player Overlay --- */}
      {showMusic && (
         <div className={`fixed top-16 right-4 w-72 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in-down border
             ${theme === 'light' ? 'bg-white border-gray-100' : 'bg-gray-800 border-gray-700 text-white'}
         `}>
            <div className={`p-4 ${AMBIENT_TRACKS[currentTrack].color} text-white`}>
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{AMBIENT_TRACKS[currentTrack].title}</h3>
                    <p className="text-xs opacity-80">Ambient Soundscape</p>
                  </div>
                  <button onClick={() => setShowMusic(false)} className="bg-white/20 p-1 rounded-full hover:bg-white/30"><X size={14} /></button>
               </div>
               
               {/* Controls */}
               <div className="flex items-center justify-center gap-6 mb-2">
                  <button 
                    onClick={() => setCurrentTrack(prev => (prev === 0 ? AMBIENT_TRACKS.length - 1 : prev - 1))}
                    className="hover:text-white/80"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                  </button>
                  <button 
                    onClick={() => setCurrentTrack(prev => (prev === AMBIENT_TRACKS.length - 1 ? 0 : prev + 1))}
                    className="hover:text-white/80"
                  >
                    <ChevronRight size={24} />
                  </button>
               </div>
            </div>

            <div className="p-4 space-y-4">
               {/* Volume */}
               <div className="flex items-center gap-3 text-xs font-medium opacity-80">
                  <Volume2 size={14} />
                  <input 
                    type="range" min="0" max="100" 
                    value={volume} onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="flex-1 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-500"
                  />
               </div>

               {/* Sleep Timer */}
               <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase opacity-60">
                     <Clock size={12} /> Sleep Timer
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                     {[null, 15, 30, 60].map((mins) => (
                        <button
                          key={mins || 'off'}
                          onClick={() => setSleepTimer(mins)}
                          className={`text-xs py-1.5 rounded-md border transition-colors
                            ${sleepTimer === mins 
                              ? 'bg-brand-500 text-white border-brand-500' 
                              : 'border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                           {mins ? `${mins}m` : 'Off'}
                        </button>
                     ))}
                  </div>
                  {sleepTimer !== null && (
                    <p className="text-xs text-center text-brand-500 font-medium animate-pulse">
                      Stopping in {sleepTimer} mins
                    </p>
                  )}
               </div>
            </div>
         </div>
      )}

      {/* --- Settings Menu --- */}
      {showMenu && (
        <div className={`fixed top-16 right-4 p-5 rounded-2xl shadow-2xl border w-72 z-50 animate-fade-in-down origin-top-right
          ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700 text-white'}`}>
          
          <div className="space-y-6">
             {/* Themes */}
            <div>
              <label className="text-xs font-bold uppercase opacity-60 mb-3 block flex items-center gap-2">
                 <Sun size={12} /> Appearance
              </label>
              <div className="grid grid-cols-4 gap-2">
                 {[
                   { id: 'light', bg: 'bg-white', border: 'border-gray-200' },
                   { id: 'sepia', bg: 'bg-[#f4ecd8]', border: 'border-[#e3d7bf]' },
                   { id: 'dark', bg: 'bg-gray-900', border: 'border-gray-700' },
                   { id: 'midnight', bg: 'bg-[#0f172a]', border: 'border-slate-800' },
                 ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as any)}
                      className={`h-10 rounded-lg border-2 flex items-center justify-center transition-all ${t.bg} ${t.border}
                        ${theme === t.id ? 'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-gray-800 scale-105' : 'hover:opacity-80'}`}
                    >
                       {theme === t.id && <div className="w-2 h-2 rounded-full bg-brand-500" />}
                    </button>
                 ))}
              </div>
            </div>

            {/* Typography */}
            <div>
               <label className="text-xs font-bold uppercase opacity-60 mb-3 block flex items-center gap-2">
                 <Type size={12} /> Typography
              </label>
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-4">
                 {(['serif', 'sans', 'mono'] as const).map((font) => (
                    <button
                      key={font}
                      onClick={() => setFontFamily(font)}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-md capitalize transition-all
                        ${fontFamily === font ? 'bg-white dark:bg-gray-600 shadow-sm text-brand-600 dark:text-brand-400' : 'text-gray-500 dark:text-gray-400'}`}
                    >
                       {font}
                    </button>
                 ))}
              </div>
              
              <div className="flex items-center gap-4">
                 <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><Type size={14} /></button>
                 <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500" style={{ width: `${((fontSize - 14) / 16) * 100}%` }}></div>
                 </div>
                 <button onClick={() => setFontSize(Math.min(30, fontSize + 2))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><Type size={20} /></button>
              </div>
            </div>
            
            {/* Auto Scroll Controls */}
             <div>
               <label className="text-xs font-bold uppercase opacity-60 mb-3 block flex items-center gap-2">
                 <ChevronsDown size={14} /> Auto Scroll
              </label>
               <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setAutoScrollSpeed(prev => prev === 0 ? 1 : 0)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${autoScrollSpeed > 0 ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
                  >
                     {autoScrollSpeed > 0 ? 'ON' : 'OFF'}
                  </button>
                  <input 
                    type="range" min="0" max="10" 
                    value={autoScrollSpeed}
                    onChange={(e) => setAutoScrollSpeed(parseInt(e.target.value))}
                    disabled={autoScrollSpeed === 0}
                    className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg accent-brand-500 disabled:opacity-50"
                  />
                  <span className="text-xs font-mono w-4">{autoScrollSpeed}x</span>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Main Content --- */}
      <main 
         className={`max-w-3xl mx-auto px-6 py-8 pb-32 animate-fade-in-up`}
         onClick={() => { setShowMenu(false); setShowMusic(false); }}
      >
        <div className="mb-8 text-center opacity-50">
           <p className="text-xs font-bold uppercase tracking-widest mb-1">Chapter {chapterId}</p>
           <h2 className="text-2xl font-bold">{title}</h2>
        </div>

        <div 
          className="leading-relaxed transition-all duration-300"
          style={{ 
             fontSize: `${fontSize}px`,
             lineHeight: lineHeight 
          }}
          dangerouslySetInnerHTML={{ __html: MOCK_CHAPTER_TEXT.repeat(3) }} // Repeated for scroll testing
        />
      </main>

      {/* --- Floating Scroll Action Button (Mobile Friendly) --- */}
      <button
        onClick={() => setAutoScrollSpeed(prev => prev > 0 ? 0 : 2)}
        className={`fixed bottom-24 right-6 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 z-30
           ${autoScrollSpeed > 0 ? 'bg-brand-500 text-white animate-pulse' : 'bg-white dark:bg-gray-800 text-gray-400 hover:text-brand-500'}
        `}
      >
         {autoScrollSpeed > 0 ? <Pause size={20} fill="currentColor" /> : <ChevronsDown size={24} />}
      </button>

      {/* --- Navigation Footer --- */}
      <div className={`fixed bottom-0 left-0 right-0 border-t p-4 z-40 transition-transform duration-300
         ${theme === 'light' ? 'bg-white/95 border-gray-100' : ''}
         ${theme === 'sepia' ? 'bg-[#f4ecd8]/95 border-[#e3d7bf]' : ''}
         ${theme === 'dark' ? 'bg-gray-900/95 border-gray-800' : ''}
         ${theme === 'midnight' ? 'bg-[#0f172a]/95 border-slate-800' : ''}
         ${autoScrollSpeed > 0 ? 'translate-y-full' : 'translate-y-0'}
      `}>
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <ChevronLeft size={20} /> <span className="text-sm font-semibold">Prev</span>
          </button>
          
          <div className="h-1 flex-1 mx-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
             {/* Fake progress bar for visual */}
             <div className="h-full bg-brand-500 w-[35%]"></div>
          </div>

          <button className="flex items-center gap-2 font-semibold text-brand-600 dark:text-brand-400 hover:opacity-80 transition-opacity">
            <span className="text-sm">Next</span> <ChevronRight size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ReaderNovel;