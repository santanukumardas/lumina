
import React from 'react';
import { Check, Lightbulb, Tag } from 'lucide-react';
import { SHOWCASE_DATA } from '../../data/content';

export const ShowcaseViewer: React.FC<{ id: string }> = ({ id }) => {
    const data = SHOWCASE_DATA[id];

    if (!data) return <div className="text-white">Image data not found</div>;

    return (
        <div className="flex flex-col md:flex-row w-full h-full bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            {/* Image Side */}
            <div className="md:w-2/3 h-64 md:h-auto relative group overflow-hidden bg-zinc-900">
                <img 
                    src={data.img} 
                    alt="Showcase" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="flex gap-2 flex-wrap">
                        {data.tags?.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-bold text-white border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Analysis Side */}
            <div className="md:w-1/3 bg-zinc-900 p-6 md:p-8 flex flex-col justify-center border-l border-zinc-800">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                        <Check size={14} /> Analysis
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 leading-tight">Why it works</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        {data.why}
                    </p>
                </div>

                <div className="w-full h-px bg-zinc-800 my-2"></div>

                <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
                        <Lightbulb size={14} /> Key Takeaway
                    </div>
                    <p className="text-zinc-300 text-sm font-medium italic border-l-2 border-amber-500/50 pl-3 py-1">
                        "{data.takeaway}"
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap gap-2">
                     <span className="text-xs text-zinc-600 font-mono">CONCEPTS:</span>
                     {data.tags?.map((tag, i) => (
                         <span key={i} className="text-xs text-zinc-500 flex items-center gap-1">
                             <Tag size={10} /> {tag}
                         </span>
                     ))}
                </div>
            </div>
        </div>
    );
};
