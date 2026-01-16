
import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Lightbulb, GraduationCap, Loader2, X, ChevronRight, Search, Zap, Check, AlertCircle, HelpCircle } from 'lucide-react';
import { TOPICS, OFFLINE_KNOWLEDGE, CONCEPT_QUIZZES, FUN_FACTS } from '../../data/content';

interface ConceptLibraryProps {
    initialTopic?: string | null;
}

const ConceptLibrary: React.FC<ConceptLibraryProps> = ({ initialTopic }) => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(initialTopic || null);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [quizState, setQuizState] = useState<{ answered: boolean, correct: boolean, selected: number | null }>({ answered: false, correct: false, selected: null });
    const [randomFact, setRandomFact] = useState('');

    const filteredTopics = TOPICS.filter(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        setRandomFact(FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
    }, []);

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

        // We only render the text content here, interactive elements are rendered in the main return
        setExplanation(`
            <div class="space-y-6 animate-fade-in">
                <div class="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl relative">
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

                <div class="bg-gradient-to-br from-indigo-900/10 to-zinc-900/20 border border-indigo-500/20 rounded-2xl p-5 flex gap-4 items-center shadow-lg">
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
        setQuizState({ answered: false, correct: false, selected: null }); // Reset quiz
        renderOfflineContent(topic);
    };

    const handleQuizOption = (index: number) => {
        if (!selectedTopic || quizState.answered) return;
        const quiz = CONCEPT_QUIZZES[selectedTopic];
        if (!quiz) return;

        setQuizState({
            answered: true,
            selected: index,
            correct: index === quiz.correctIndex
        });
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
                        <h2 className="text-3xl font-bold text-white mb-2 font-serif tracking-tight">Concept Library</h2>
                        <p className="text-zinc-400">Instant knowledge. Curated explanations linked to practical tools.</p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search concepts..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-600"
                        />
                    </div>
                </div>

                {/* Full Width Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {filteredTopics.map((topic) => (
                        <button
                            key={topic}
                            onClick={() => handleTopicClick(topic)}
                            className="group flex items-center justify-between p-5 bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-indigo-500/50 hover:bg-zinc-900 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 text-left"
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

                {/* Random Fact Footer */}
                <div className="bg-gradient-to-r from-amber-900/10 to-transparent border border-amber-500/10 rounded-2xl p-6 flex gap-4 items-start animate-fade-in backdrop-blur-sm">
                    <div className="bg-amber-500/10 p-3 rounded-full text-amber-500 shrink-0">
                        <Lightbulb size={24} />
                    </div>
                    <div>
                        <h4 className="text-amber-500 font-bold text-sm uppercase tracking-widest mb-2">Did You Know?</h4>
                        <p className="text-zinc-300 text-sm leading-relaxed italic font-serif">
                            "{randomFact}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            {selectedTopic && (
                <div 
                    className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex justify-center items-end sm:items-center sm:py-12 sm:px-6" 
                    onClick={closeModal}
                >
                    <div 
                        className="bg-zinc-950 sm:bg-zinc-950/95 backdrop-blur-2xl border-t border-x border-white/10 sm:border w-full max-w-2xl h-[85vh] sm:h-auto sm:max-h-[80vh] flex flex-col rounded-t-3xl sm:rounded-3xl shadow-2xl relative animate-slide-up sm:animate-zoom-in overflow-hidden" 
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Mobile Drag Handle */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-zinc-800/80 rounded-full sm:hidden z-50 pointer-events-none" />

                        {/* Modal Header (Fixed) */}
                        <div className="p-5 md:p-8 pt-10 md:pt-8 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md flex justify-between items-start shrink-0 z-10 safe-top">
                            <div className="flex items-center gap-4 md:gap-5">
                                <div className="p-3 md:p-3.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl md:rounded-2xl text-white shadow-lg shadow-indigo-500/20 shrink-0">
                                    <GraduationCap size={24} className="w-6 h-6 md:w-7 md:h-7" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-1 font-serif tracking-tight truncate">{selectedTopic}</h3>
                                    <span className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-widest block truncate">Definition & Application</span>
                                </div>
                            </div>
                            <button 
                                onClick={closeModal} 
                                className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-800 z-50 cursor-pointer shrink-0"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="p-5 md:p-8 overflow-y-auto scrollbar-hide overscroll-contain flex-1">
                             {explanation ? (
                                <div className="space-y-6 md:space-y-8 animate-fade-in pb-10">
                                    <div 
                                        className="text-lg text-zinc-300 leading-relaxed [&>p]:mb-4 [&>b]:text-white [&>b]:font-bold font-light"
                                        dangerouslySetInnerHTML={{ __html: explanation }}
                                    />
                                    
                                    {/* QUIZ SECTION */}
                                    {CONCEPT_QUIZZES[selectedTopic] && (
                                        <div className="mt-8 border-t border-zinc-800 pt-8">
                                            <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                                                <HelpCircle size={14} /> Quick Check
                                            </div>
                                            <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
                                                <h4 className="text-white font-bold text-lg mb-4 font-serif">{CONCEPT_QUIZZES[selectedTopic].question}</h4>
                                                
                                                <div className="space-y-3">
                                                    {CONCEPT_QUIZZES[selectedTopic].options.map((option, idx) => {
                                                        let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center ";
                                                        
                                                        if (quizState.answered) {
                                                            if (idx === CONCEPT_QUIZZES[selectedTopic!].correctIndex) {
                                                                btnClass += "bg-emerald-900/30 border-emerald-500 text-white";
                                                            } else if (idx === quizState.selected) {
                                                                btnClass += "bg-red-900/30 border-red-500 text-red-200 opacity-60";
                                                            } else {
                                                                btnClass += "bg-zinc-900 border-zinc-800 text-zinc-500 opacity-50";
                                                            }
                                                        } else {
                                                            btnClass += "bg-zinc-950 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white";
                                                        }

                                                        return (
                                                            <button
                                                                key={idx}
                                                                onClick={() => handleQuizOption(idx)}
                                                                disabled={quizState.answered}
                                                                className={btnClass}
                                                            >
                                                                <span>{option}</span>
                                                                {quizState.answered && idx === CONCEPT_QUIZZES[selectedTopic!].correctIndex && <Check size={18} className="text-emerald-500" />}
                                                                {quizState.answered && idx === quizState.selected && idx !== CONCEPT_QUIZZES[selectedTopic!].correctIndex && <X size={18} className="text-red-500" />}
                                                            </button>
                                                        )
                                                    })}
                                                </div>

                                                {quizState.answered && (
                                                    <div className={`mt-4 p-4 rounded-xl text-sm leading-relaxed flex gap-3 animate-fade-in ${quizState.correct ? 'bg-emerald-900/10 text-emerald-200 border border-emerald-500/20' : 'bg-red-900/10 text-red-200 border border-red-500/20'}`}>
                                                        <div className="mt-0.5 shrink-0">
                                                            {quizState.correct ? <Check size={16} /> : <AlertCircle size={16} />}
                                                        </div>
                                                        <p>
                                                            <span className="font-bold block mb-1">{quizState.correct ? 'Correct!' : 'Incorrect.'}</span>
                                                            {CONCEPT_QUIZZES[selectedTopic].explanation}
                                                        </p>
                                                    </div>
                                                )}
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
