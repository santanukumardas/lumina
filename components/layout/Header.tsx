
import React from 'react';
import { ChevronLeft, Settings } from 'lucide-react';

interface HeaderProps { 
    viewMode: string;
    onBack: () => void;
    title?: string;
    onOpenSettings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ viewMode, onBack, title, onOpenSettings }) => (
  <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
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
                <span className="text-zinc-100 animate-slide-right truncate">{title}</span>
            )}
        </h1>
      </div>
      <div className="flex items-center gap-3">
          <button 
            onClick={onOpenSettings}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
            title="AI Settings"
          >
              <Settings size={20} />
          </button>
      </div>
    </div>
  </header>
);

export default Header;