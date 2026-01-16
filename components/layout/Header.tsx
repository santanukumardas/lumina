
import React from 'react';
import { ChevronLeft, Settings, Monitor } from 'lucide-react';

interface HeaderProps { 
    viewMode: string;
    onBack: () => void;
    title?: string;
    onOpenSettings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ viewMode, onBack, title, onOpenSettings }) => (
  <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {viewMode !== 'home' && (
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors group"
          >
            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            {viewMode === 'home' ? (
                <>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                LUMINA
                </>
            ) : (
                <span className="text-zinc-100 animate-slide-right">{title}</span>
            )}
        </h1>
      </div>
      <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-[10px] font-medium text-zinc-600 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800/50">
            <Monitor size={12} />
            <span>Best experienced on Desktop</span>
          </div>
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
