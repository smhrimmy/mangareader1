import React, { ReactNode } from 'react';
import { 
  Library, 
  Compass, 
  Flame, 
  Clock, 
  Settings, 
  LogOut, 
  BookOpen, 
  Menu,
  X,
  Search,
  Bell,
  User,
  Moon,
  Sun
} from 'lucide-react';
import { AppMode } from '../types';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, mode, setMode, isDarkMode, toggleTheme }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();

  const isManga = mode === AppMode.MANGA;
  
  // Theme styling based on mode
  const accentColor = isManga ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400';
  const accentBg = isManga ? 'bg-blue-600' : 'bg-emerald-600';
  const logo = isManga ? 'M' : 'N';

  const navItems = [
    { icon: Library, label: 'Library', path: '/' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Flame, label: 'Popular', path: '/popular' },
    { icon: Clock, label: 'Latest', path: '/latest' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo & Mode Switcher Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-8 h-8 rounded-lg ${accentBg} text-white flex items-center justify-center font-bold text-xl shadow-lg`}>
                {logo}
              </div>
              <span className="text-xl font-bold tracking-tight">OmniRead</span>
            </div>

            {/* Mode Toggle */}
            <div className="relative bg-gray-100 dark:bg-gray-700 p-1 rounded-xl flex">
              <button
                onClick={() => setMode(AppMode.MANGA)}
                className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${isManga ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
              >
                Manga
              </button>
              <button
                onClick={() => setMode(AppMode.NOVEL)}
                className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${!isManga ? 'bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
              >
                Novel
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${location.pathname === item.path 
                    ? `${isManga ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'}` 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}

            <div className="pt-8 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              System
            </div>
            
            <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <User size={18} /> Profile
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Settings size={18} /> Settings
            </button>
          </nav>

          {/* User Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
             <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
               <LogOut size={18} /> Sign Out
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-8 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder={`Search ${isManga ? 'Manga' : 'Novels'}...`}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-full text-sm focus:ring-2 focus:ring-opacity-50 transition-all outline-none"
                style={{ '--tw-ring-color': isManga ? '#3b82f6' : '#10b981' } as React.CSSProperties}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-400 overflow-hidden">
              <img src="https://picsum.photos/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Scrollable Main View */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;