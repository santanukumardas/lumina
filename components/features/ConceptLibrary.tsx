
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BookOpen, Sparkles, Lightbulb, GraduationCap, Loader2, X, ChevronRight, Search, Settings } from 'lucide-react';

const TOPICS = [
    "Bokeh", "Compression", "Golden Hour", "Hyperfocal Distance", 
    "Color Grading", "Rembrandt Lighting", "Long Exposure", "Diffraction",
    "Dynamic Range", "Zone System", "Chromatic Aberration", "Negative Space",
    "White Balance", "Histogram", "Focus Peaking", "Inverse Square Law",
    "Split Toning", "Sensor Crop Factor", "Motion Blur", "Leading Lines"
];

// Context to help the AI recommend the right tool
const APP_TOOLS_CONTEXT = `
The user is using the "Lumina Masterclass" web app. 
Available tools in this app:
1. Aperture Simulator (Visualizes depth of field and bokeh)
2. Shutter Speed Simulator (Visualizes motion blur vs freeze)
3. ISO Simulator (Visualizes noise)
4. Focal Length Simulator (Visualizes compression)
5. DoF Visualizer (Calculates hyperfocal distance and green zone)
6. Studio Planner (Interactive lighting diagram builder)
7. Darkroom (Color grading challenge and exposure)
8. Chroma Lab (Extracts color palettes from images)
9. ND Filter Lab (Calculates long exposure times)
10. Zone System Mapper (Visualizes exposure zones on images)
11. Diffraction Calculator (Visualizes sharpness loss at high f-stops)
12. RGB Curve Sim (Visualizes non-linear color adjustments)
13. Three-Point Lighting Sim (Visualizes key, fill, back lights)
`;

const ConceptLibrary: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTopics = TOPICS.filter(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleTopicClick = async (topic: string) => {
        setSelectedTopic(topic);
        setExplanation(null);
        setLoading(true);

        try {
            // Check local storage for custom key first
            const customKey = localStorage.getItem('lumina_custom_key')?.trim();
            const apiKey = customKey || process.env.API_KEY;

            // 1. Scenario: User trying to use AI features without passing any API Key
            if (!apiKey) {
                setExplanation(`<div class="p-6 bg-red-900/10 border border-red-500/20 rounded-xl text-red-200 text-center flex flex-col items-center gap-3">
                    <div class="p-3 bg-red-500/10 rounded-full text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <div>
                        <p class="font-bold text-lg">Missing API Key</p>
                        <p class="text-sm opacity-80 mt-1">Please open the Settings menu (top right) and provide a valid Google Gemini API Key to unlock this feature.</p>
                    </div>
                </div>`);
                setLoading(false);
                return;
            }
            
            const ai = new GoogleGenAI({ apiKey });
            
            const prompt = `
                Explain the photography concept "${topic}" in 2 concise sentences for a beginner.
                Then, explicitly recommend ONE specific tool from the "Lumina Masterclass" app (listed below) that helps practice or visualize this concept.
                Explain WHY that tool helps.
                
                ${APP_TOOLS_CONTEXT}

                Format the response as HTML. Use strictly <b> tags for bold text.
                Do not include markdown code blocks or \`\`\`html wrappers.
                Keep paragraphs short.
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: { parts: [{ text: prompt }] },
            });

            if (response.text) {
                setExplanation(response.text);
            }
        } catch (error: any) {
            console.error(error);
            let errorMsg = "Unable to generate explanation.";
            // 2. Scenario: API Key is invalid or expired
            if (error.message?.includes('403') || error.message?.includes('400') || error.message?.includes('API key')) {
                errorMsg = "API Key Invalid or Expired. Please update it in Settings.";
            } else if (error.message?.includes('fetch')) {
                errorMsg = "Network error. Check connection or VPN settings.";
            }
            setExplanation(`<p class="text-red-400 font-medium text-center py-4 bg-red-900/10 rounded-lg border border-red-900/30">${errorMsg}</p>`);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setSelectedTopic(null);
        setExplanation(null);
    }

    return (
        <div className="max-w-7xl mx-auto p-4 animate-slide-up relative min-h-screen">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-zinc-800 pb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Concept Library</h2>
                    <p className="text-zinc-400">Instant knowledge. AI-curated explanations linked to practical tools.</p>
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

            {/* Modal Overlay */}
            {selectedTopic && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" 
                    onClick={closeModal}
                >
                    <div 
                        className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative animate-zoom-in" 
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-6 md:p-8 border-b border-zinc-800 bg-zinc-900/30 flex justify-between items-start">
                            <div className="flex items-center gap-5">
                                <div className="p-3.5 bg-indigo-500 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                                    <GraduationCap size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white leading-tight mb-1">{selectedTopic}</h3>
                                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Definition & Application</span>
                                </div>
                            </div>
                            <button 
                                onClick={closeModal} 
                                className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors border border-zinc-800"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 md:p-8 min-h-[240px]">
                             {loading ? (
                                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                    <Loader2 size={40} className="text-indigo-500 animate-spin" />
                                    <p className="text-sm text-zinc-500 animate-pulse font-medium">Consulting Masterclass AI...</p>
                                </div>
                            ) : explanation ? (
                                <div className="space-y-8 animate-fade-in">
                                    <div 
                                        className="text-lg text-zinc-300 leading-relaxed [&>p]:mb-4 [&>b]:text-white [&>b]:font-bold"
                                        dangerouslySetInnerHTML={{ __html: explanation }}
                                    />
                                    
                                    {!explanation.includes("Missing API Key") && !explanation.includes("API Key Invalid") && (
                                        <div className="bg-gradient-to-br from-indigo-900/30 to-zinc-900 border border-indigo-500/30 rounded-2xl p-5 flex gap-4 items-start">
                                            <div className="p-2 bg-indigo-500/20 rounded-full shrink-0 mt-0.5">
                                                <Lightbulb className="text-indigo-400" size={20} />
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
                                    <button onClick={() => handleTopicClick(selectedTopic)} className="mt-4 text-sm underline hover:text-white">Try Again</button>
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
