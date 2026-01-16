
import React, { useRef } from 'react';
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

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left Section: Nav & Title */}
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden shrink-0">
          {viewMode !== 'home' && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}
          <h1 className="text-lg md:text-xl font-bold tracking-tight flex items-center gap-2 truncate">
              {viewMode === 'home' ? (
                  <>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  LUMINA
                  </>
              ) : (
                  <span className="text-zinc-100 animate-slide-right truncate hidden sm:inline">{title}</span>
              )}
          </h1>
        </div>

        {/* Center/Right Section: Search */}
        <div className="flex-1 max-w-md mx-auto relative hidden md:block">
             <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
                 <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Search lessons, tools, concepts..." 
                    value={searchQuery}
                    onChange={(e) => onSearch?.(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full pl-10 pr-10 py-2 text-sm text-white focus:outline-none focus:bg-zinc-900 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all placeholder:text-zinc-600"
                 />
                 {searchQuery && (
                     <button 
                        onClick={() => { onSearch?.(''); inputRef.current?.focus(); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                     >
                         <X size={14} />
                     </button>
                 )}
             </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
            {/* Mobile Search Toggle (Simplified for now to just show settings, future could expand) */}
            
            <button 
              onClick={onOpenBookmarks}
              className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-zinc-800 rounded-full transition-colors relative"
              title="Saved Lessons"
            >
                <Bookmark size={20} />
            </button>

            <button 
              onClick={onOpenSettings}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
              title="Settings"
            >
                <Settings size={20} />
            </button>
        </div>
      </div>
      
      {/* Mobile Search Bar Row */}
      <div className="md:hidden px-4 pb-3">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
             <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-8 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all placeholder:text-zinc-600"
             />
              {searchQuery && (
                 <button 
                    onClick={() => onSearch?.('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                 >
                     <X size={14} />
                 </button>
             )}
          </div>
      </div>
    </header>
  );
};

export default Header;
