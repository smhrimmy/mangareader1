import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  Loader2, 
  X, 
  ZoomIn, 
  Image as ImageIcon, 
  Columns 
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface ReaderMangaProps {
  title: string;
  chapterId: string;
}

interface ReaderSettings {
  quality: 'low' | 'medium' | 'high';
  zoom: number; // percentage, e.g., 100
  layout: 'single' | 'double';
}

const ReaderManga: React.FC<ReaderMangaProps> = ({ title, chapterId }) => {
  const navigate = useNavigate();
  const { id: mangaId } = useParams<{ id: string }>();
  
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Default Settings
  const [settings, setSettings] = useState<ReaderSettings>({
    quality: 'high',
    zoom: 100,
    layout: 'single'
  });

  // Swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  // Simulate fetching chapter data based on ID
  useEffect(() => {
    const fetchChapterImages = async () => {
      setLoading(true);
      setImages([]); // Clear previous images
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const chapterNum = parseInt(chapterId || '1');
      const seedBase = chapterNum * 20;
      
      // Generate mock images. 
      // Ensure even number for better double-page testing
      const newImages = Array.from({ length: 14 }, (_, i) => 
        `https://picsum.photos/seed/${seedBase + i}/800/1200`
      );
      
      setImages(newImages);
      setLoading(false);
      window.scrollTo(0, 0);
      setProgress(0);
    };

    fetchChapterImages();
  }, [chapterId]);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      
      if (totalHeight > 0) {
        const percentage = (currentScrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, percentage)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation Handlers
  const handlePrevChapter = () => {
    const current = parseInt(chapterId || '1');
    if (current > 1) {
      navigate(`/read/MANGA/${mangaId}/${current - 1}`);
    }
  };

  const handleNextChapter = () => {
    const current = parseInt(chapterId || '1');
    navigate(`/read/MANGA/${mangaId}/${current + 1}`);
  };

  // Swipe Handlers
  const onTouchStart = (e: TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextChapter();
    } else if (isRightSwipe) {
      handlePrevChapter();
    }
  };

  /**
   * Constructs an optimized image URL using weserv.nl proxy.
   * Handles WebP conversion, resizing, and quality adjustment.
   * 
   * @param url Original image URL
   */
  const getProxyUrl = (url: string) => {
    const baseUrl = 'https://images.weserv.nl/';
    
    // Default parameters for optimization
    const params: Record<string, string> = {
        url: url,
        output: 'webp', // Always convert to WebP for better compression
        we: '1', // Without enlargement
        il: '1', // Interlace/Progressive
        n: '-1', // Load all pages if source is multi-page (PDF/TIFF)
    };

    // Apply quality settings
    switch (settings.quality) {
        case 'low': 
          params.q = '50';
          params.w = '800'; // Resize width for bandwidth saving
          break;
        case 'medium': 
          params.q = '75'; 
          params.w = '1200';
          break;
        case 'high': 
          params.q = '90'; 
          // No width limit, keeps original
          break;
    }

    // NOTE: If source requires User-Agent spoofing, it cannot be done via simple URL params
    // on a public proxy like weserv. You would need a custom backend proxy.
    // Example logic for custom backend:
    // params.ua = 'Mozilla/5.0 ...'; 
    
    return `${baseUrl}?${new URLSearchParams(params).toString()}`;
  };

  // Progress Bar Handler (Scrubbing)
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const targetY = (val / 100) * totalHeight;
    window.scrollTo({ top: targetY, behavior: 'auto' });
    setProgress(val);
  };

  const toggleSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSettings(!showSettings);
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 flex flex-col items-center relative overflow-x-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 h-14 bg-gray-900/95 backdrop-blur-md text-white flex items-center justify-between px-4 z-50 transition-transform duration-300 ease-in-out ${showControls ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center flex-1 mx-4">
          <span className="text-sm font-semibold truncate max-w-[200px]">{title}</span>
          <span className="text-xs text-gray-400">Chapter {chapterId}</span>
        </div>
        <button 
          onClick={toggleSettings} 
          className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-white/20' : 'hover:bg-white/10'}`}
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-16 right-4 w-72 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl z-50 p-4 text-white animate-fade-in-down origin-top-right">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-sm">Reader Settings</h3>
            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
              <X size={16} />
            </button>
          </div>
          
          <div className="space-y-5">
            {/* Display Mode */}
            <div>
               <label className="text-xs text-gray-400 uppercase font-semibold mb-2 flex items-center gap-2">
                 <Columns size={12} /> Layout Mode
               </label>
               <div className="flex bg-gray-700 rounded-lg p-1">
                 <button 
                   onClick={() => setSettings(s => ({...s, layout: 'single'}))}
                   className={`flex-1 text-xs py-1.5 rounded-md transition-all ${settings.layout === 'single' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-300 hover:text-white'}`}
                 >
                   Single Page
                 </button>
                 <button 
                   onClick={() => setSettings(s => ({...s, layout: 'double'}))}
                   className={`flex-1 text-xs py-1.5 rounded-md transition-all ${settings.layout === 'double' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-300 hover:text-white'}`}
                 >
                   Double Page
                 </button>
               </div>
            </div>

            {/* Quality */}
            <div>
               <label className="text-xs text-gray-400 uppercase font-semibold mb-2 flex items-center gap-2">
                 <ImageIcon size={12} /> Image Quality
               </label>
               <div className="flex bg-gray-700 rounded-lg p-1">
                 {(['low', 'medium', 'high'] as const).map((q) => (
                    <button 
                      key={q}
                      onClick={() => setSettings(s => ({...s, quality: q}))}
                      className={`flex-1 text-xs py-1.5 rounded-md transition-all capitalize ${settings.quality === q ? 'bg-brand-600 text-white shadow-md' : 'text-gray-300 hover:text-white'}`}
                    >
                      {q}
                    </button>
                 ))}
               </div>
            </div>

             {/* Zoom */}
             <div>
               <label className="text-xs text-gray-400 uppercase font-semibold mb-2 flex items-center gap-2">
                 <ZoomIn size={12} /> Zoom Level: {settings.zoom}%
               </label>
               <div className="px-1">
                 <input 
                   type="range" min="50" max="200" step="10" 
                   value={settings.zoom}
                   onChange={(e) => setSettings(s => ({...s, zoom: parseInt(e.target.value)}))}
                   className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-brand-500"
                 />
               </div>
               <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono">
                 <span>50%</span>
                 <span>100%</span>
                 <span>200%</span>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div 
        className="w-full min-h-screen bg-gray-950 flex justify-center" 
        onClick={() => { setShowControls(!showControls); setShowSettings(false); }}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen text-gray-400 gap-4">
            <Loader2 size={40} className="animate-spin text-brand-500" />
            <p className="text-sm font-medium animate-pulse">Loading Chapter {chapterId}...</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center pb-20 pt-14">
             {/* Chapter Start Indicator */}
             <div className="py-10 text-center text-gray-500 text-xs uppercase tracking-widest">
                Start of Chapter {chapterId}
             </div>

            <div 
              className={`transition-all duration-300 ease-in-out ${settings.layout === 'double' ? 'grid grid-cols-2 gap-0' : 'flex flex-col gap-0'}`}
              style={{ 
                // Logic to handle zoom and max-width based on layout mode
                width: `${settings.zoom}%`,
                maxWidth: settings.layout === 'double' || settings.zoom > 100 ? 'none' : '48rem' // 48rem is max-w-3xl
              }}
            >
              {images.map((src, index) => (
                <div key={index} className="w-full relative bg-gray-900 overflow-hidden aspect-[2/3] self-start">
                  <img 
                    src={getProxyUrl(src)} 
                    alt={`Page ${index + 1}`} 
                    className="w-full h-full object-cover block transition-opacity duration-500"
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '1';
                    }}
                    style={{ opacity: 0 }}
                  />
                  {/* Skeleton Loader / Placeholder behind image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-800 -z-10 bg-gray-900">
                     <Loader2 size={24} className="animate-spin" />
                  </div>
                </div>
              ))}
            </div>

             {/* Chapter End Actions */}
             <div className="w-full max-w-2xl py-16 flex flex-col items-center gap-6 text-gray-400 px-4">
                <div className="w-full h-px bg-gray-800" />
                <p className="text-sm font-medium uppercase tracking-widest text-gray-500">End of Chapter {chapterId}</p>
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePrevChapter(); }} 
                    disabled={parseInt(chapterId) <= 1} 
                    className="w-full py-4 rounded-xl border border-gray-700 bg-gray-800/50 hover:bg-gray-800 transition-colors text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={20} /> Previous
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNextChapter(); }} 
                    className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-lg hover:shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    Next Chapter <ChevronRight size={20} />
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Bottom Bar with Progress */}
      <div className={`fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md text-white px-4 py-3 z-50 transition-transform duration-300 ease-in-out border-t border-white/5 flex flex-col gap-3 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}>
        
        {/* Progress Slider */}
        <div className="w-full flex items-center gap-4 px-2">
          <span className="text-xs font-mono text-gray-400 w-8 text-right">
             {Math.round(progress)}%
          </span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleProgressChange}
            className="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400"
            style={{
              background: `linear-gradient(to right, #0ea5e9 ${progress}%, #374151 ${progress}%)`
            }}
          />
           <span className="text-xs font-mono text-gray-400 w-8">
             {images.length}P
          </span>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <button 
             onClick={handlePrevChapter}
             disabled={parseInt(chapterId) <= 1}
             className="flex items-center gap-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 px-2 py-1 transition-colors"
          >
            <ChevronLeft size={20} /> <span className="text-sm font-medium">Prev</span>
          </button>
          
          <button 
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors text-gray-300"
            onClick={() => { setShowControls(false); }}
          >
             <span className="text-[10px] uppercase font-bold tracking-widest px-2">Reading Mode</span>
          </button>
          
          <button 
            onClick={handleNextChapter}
            className="flex items-center gap-1 text-white hover:text-brand-400 px-2 py-1 transition-colors"
          >
            <span className="text-sm font-medium">Next</span> <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReaderManga;