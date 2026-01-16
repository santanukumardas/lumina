
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, Settings, Search, Bookmark, X } from 'lucide-react';

interface HeaderProps { 
    viewMode: string;
    onBack: () => void;
    title?: string;
    onOpenSettings?: () => void;
    searchQuery?: string;
    onSearch?: (query: string) => void;
    onOpenBookmarks?: () => void;
}

const Header: React.FC<HeaderProps> = ({ viewMode, onBack, title, onOpenSettings, searchQuery, onSearch, onOpenBookmarks }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Close search when view changes
  useEffect(() => {
      setIsSearchOpen(false);
  }, [viewMode]);

  const toggleSearch = () => {
      if (isSearchOpen) {
          setIsSearchOpen(false);
          onSearch?.(''); // Clear search on close
      } else {
          setIsSearchOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
      }
  };

  return (
    <header 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${isSearchOpen ? 'bg-zinc-950/95 border-zinc-800' : 'bg-zinc-950/70 border-white/5 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/60'}`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left Section: Nav & Title */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0 min-w-0">
          {viewMode !== 'home' && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors group active:scale-95"
              aria-label="Go Back"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}
          <h1 className={`text-lg md:text-xl font-bold tracking-tight flex items-center gap-2 ${viewMode === 'home' ? '' : 'truncate'}`}>
              {viewMode === 'home' ? (
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 ml-1 rounded-full bg-white animate-pulse shadow-[0_0_10px_white]"></span>
                    <span className="font-serif tracking-tighter text-2xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">LUMINA</span>
                  </div>
              ) : (
                  <span className="text-zinc-100 animate-slide-right truncate font-serif tracking-tight">{title}</span>
              )}
          </h1>
        </div>

        {/* Center: Desktop Search */}
        <div className="flex-1 max-w-md mx-auto relative hidden md:block">
             <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
                 <input 
                    type="text" 
                    placeholder="Search lessons, tools, concepts..." 
                    value={searchQuery}
                    onChange={(e) => onSearch?.(e.target.value)}
                    className="w-full bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-full pl-10 pr-10 py-2 text-sm text-white focus:outline-none focus:bg-zinc-900/80 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-zinc-600"
                 />
                 {searchQuery && (
                     <button 
                        onClick={() => { onSearch?.(''); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1 rounded-full hover:bg-white/10"
                     >
                         <X size={14} />
                     </button>
                 )}
             </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
            {/* Mobile Search Toggle */}
            <button 
              onClick={toggleSearch}
              className={`md:hidden p-2 rounded-full transition-colors ${isSearchOpen ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/10'}`}
              aria-label="Search"
            >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <button 
              onClick={onOpenBookmarks}
              className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-white/10 rounded-full transition-colors relative active:scale-95"
              title="Saved Lessons"
              aria-label="Bookmarks"
            >
                <Bookmark size={20} />
            </button>

            <button 
              onClick={onOpenSettings}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors active:scale-95"
              title="Settings"
              aria-label="Settings"
            >
                <Settings size={20} />
            </button>
        </div>
      </div>
      
      {/* Mobile Search Bar Row (Collapsible) */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-16 opacity-100 border-t border-zinc-800' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-3 bg-zinc-950/95">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                 <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Find lessons..." 
                    value={searchQuery}
                    onChange={(e) => onSearch?.(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-10 pr-8 py-2 text-base text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-zinc-600"
                 />
                  {searchQuery && (
                     <button 
                        onClick={() => onSearch?.('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1"
                     >
                         <X size={16} />
                     </button>
                 )}
              </div>
          </div>
      </div>
    </header>
  );
};

export default Header;
