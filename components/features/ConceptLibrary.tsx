
import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Lightbulb, GraduationCap, Loader2, X, ChevronRight, Search, Zap } from 'lucide-react';
import { TOPICS, OFFLINE_KNOWLEDGE } from '../../data/content';

interface ConceptLibraryProps {
    initialTopic?: string | null;
}

const ConceptLibrary: React.FC<ConceptLibraryProps> = ({ initialTopic }) => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(initialTopic || null);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTopics = TOPICS.filter(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    // If initialTopic provided (e.g. from search), select it immediately
    useEffect(() => {
        if (initialTopic) {
            handleTopicClick(initialTopic);
        }
    }, [initialTopic]);

    // Robust Scroll Locking Logic
    useEffect(() => {
        if (selectedTopic) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { 
            document.body.style.overflow = 'unset'; 
        };
    }, [selectedTopic]);

    const renderOfflineContent = (topic: string) => {
        const offline = OFFLINE_KNOWLEDGE[topic];
        
        if (!offline) {
            setExplanation(`<div class="p-6 bg-red-900/10 border border-red-500/20 rounded-xl text-red-200 text-center">
                <p>Knowledge base temporarily unavailable for ${topic}.</p>
            </div>`);
            return;
        }

        setExplanation(`
            <div class="space-y-6 animate-fade-in">
                <div class="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl relative">
                    <div class="flex items-center gap-2 mb-3 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                       <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                       Lumina Knowledge Base
                    </div>
                    <p class="text-zinc-100 text-lg leading-relaxed font-light border-l-2 border-emerald-500/30 pl-4">${offline.definition}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div class="p-5 bg-zinc-900/30 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <h4 class="text-blue-400 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                             Mechanics
                        </h4>
                        <p class="text-sm text-zinc-400 leading-relaxed">${offline.howItWorks}</p>
                     </div>
                     <div class="p-5 bg-zinc-900/30 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <h4 class="text-purple-400 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"></path></svg>
                            Creative Application
                        </h4>
                        <p class="text-sm text-zinc-400 leading-relaxed">${offline.creativeUse}</p>
                     </div>
                </div>

                ${offline.commonMistakes ? `
                <div class="p-4 bg-red-900/10 rounded-xl border border-red-500/10 flex gap-3 items-start">
                    <div class="mt-0.5"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-red-400"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
                    <div>
                        <h4 class="text-red-400 font-bold text-xs uppercase tracking-wider mb-1">Common Pitfall</h4>
                        <p class="text-sm text-zinc-400">${offline.commonMistakes}</p>
                    </div>
                </div>` : ''}

                <div class="bg-gradient-to-br from-indigo-900/10 to-zinc-900 border border-indigo-500/20 rounded-2xl p-5 flex gap-4 items-center shadow-lg">
                    <div class="p-3 bg-indigo-500/10 rounded-xl shrink-0 border border-indigo-500/20 text-indigo-400">
                        <Zap size={20} />
                    </div>
                    <div>
                        <h4 class="text-indigo-200 font-bold text-sm uppercase tracking-wide mb-1">Practice Now</h4>
                        <p class="text-sm text-zinc-400 leading-relaxed">
                            Open the <span class="text-white font-medium border-b border-indigo-500/30">${offline.tool}</span>.
                            ${offline.toolTip ? `<br/><span class="text-indigo-300 text-xs mt-1 block flex items-center gap-1">Tip: ${offline.toolTip}</span>` : ''}
                        </p>
                    </div>
                </div>
            </div>
        `);
    };

    const handleTopicClick = (topic: string) => {
        setSelectedTopic(topic);
        renderOfflineContent(topic);
    };

    const closeModal = () => {
        setSelectedTopic(null);
        setExplanation(null);
    }

    return (
        <div className="max-w-7xl mx-auto p-4 relative min-h-screen">
            <div className="animate-slide-up">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-zinc-800 pb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Concept Library</h2>
                        <p className="text-zinc-400">Instant knowledge. Curated explanations linked to practical tools.</p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search concepts..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
                        />
                    </div>
                </div>

                {/* Full Width Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredTopics.map((topic) => (
                        <button
                            key={topic}
                            onClick={() => handleTopicClick(topic)}
                            className="group flex items-center justify-between p-5 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl hover:border-indigo-500/50 hover:bg-zinc-900 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-indigo-500 transition-colors"></div>
                                <span className="font-medium text-zinc-300 group-hover:text-white transition-colors">{topic}</span>
                            </div>
                            <ChevronRight size={16} className="text-zinc-700 group-hover:text-indigo-400 transition-colors transform group-hover:translate-x-1" />
                        </button>
                    ))}
                    
                    {filteredTopics.length === 0 && (
                        <div className="col-span-full py-12 text-center text-zinc-500">
                            No concepts found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Overlay */}
            {selectedTopic && (
                <div 
                    className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6" 
                    onClick={closeModal}
                >
                    <div 
                        className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl shadow-2xl relative animate-zoom-in overflow-hidden" 
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header (Fixed) */}
                        <div className="p-6 md:p-8 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl flex justify-between items-start shrink-0 z-10">
                            <div className="flex items-center gap-5">
                                <div className="p-3.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                                    <GraduationCap size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white leading-tight mb-1">{selectedTopic}</h3>
                                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Definition & Application</span>
                                </div>
                            </div>
                            <button 
                                onClick={closeModal} 
                                className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-800 z-50 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="p-6 md:p-8 overflow-y-auto scrollbar-hide overscroll-contain">
                             {explanation ? (
                                <div className="space-y-8 animate-fade-in">
                                    <div 
                                        className="text-lg text-zinc-300 leading-relaxed [&>p]:mb-4 [&>b]:text-white [&>b]:font-bold"
                                        dangerouslySetInnerHTML={{ __html: explanation }}
                                    />
                                    
                                    {!explanation.includes("Missing API Key") && !explanation.includes("Offline Knowledge Base") && (
                                        <div className="bg-gradient-to-br from-indigo-900/30 to-zinc-900 border border-indigo-500/30 rounded-2xl p-5 flex gap-4 items-center">
                                            <div className="p-3 bg-indigo-500/20 rounded-xl shrink-0 text-indigo-400">
                                                <Lightbulb size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-indigo-200 font-bold text-sm uppercase tracking-wide mb-1">Interactive Learning</h4>
                                                <p className="text-sm text-indigo-300/70 leading-relaxed">
                                                    The tool mentioned above is available in the <span className="text-white font-medium">Pro Tools</span> or <span className="text-white font-medium">Learning Modules</span> section. Use it to experiment with this concept directly.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center text-red-400 py-8 bg-red-900/10 rounded-xl border border-red-900/30">
                                    <p>Failed to load explanation.</p>
                                    <button onClick={() => handleTopicClick(selectedTopic!)} className="mt-4 text-sm underline hover:text-white">Try Again</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConceptLibrary;
