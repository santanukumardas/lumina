
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Mission } from '../../types';
import { Target, Upload, Clock, CheckCircle, RefreshCw, Loader2, AlertTriangle, Settings } from 'lucide-react';

interface PhotoAnalyzerProps {
    mission?: Mission | null;
    onClearMission?: () => void;
    onCompleteMission?: () => void;
}

const PhotoAnalyzer: React.FC<PhotoAnalyzerProps> = ({ mission, onClearMission, onCompleteMission }) => {
    const [image, setImage] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<{
        strengths: string[];
        improvements: string[];
        score: number;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [limitError, setLimitError] = useState<string | null>(null);
    const [usageCount, setUsageCount] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Rate Limiting Constants
    const MAX_HOURLY_ANALYSIS = 5;
    const TIME_WINDOW = 3600000; // 1 hour in ms

    useEffect(() => {
        // Initial check of usage
        const stored = localStorage.getItem('lumina_usage_log');
        if (stored) {
            const timestamps: number[] = JSON.parse(stored);
            const now = Date.now();
            const valid = timestamps.filter(t => now - t < TIME_WINDOW);
            setUsageCount(valid.length);
            if (valid.length !== timestamps.length) {
                localStorage.setItem('lumina_usage_log', JSON.stringify(valid));
            }
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                setError('Unsupported file format. Please upload JPEG, PNG, or WebP.');
                return;
            }
            const url = URL.createObjectURL(file);
            setImage(url);
            setResult(null);
            setError(null);
            setLimitError(null);
            startAnalysis(file);
        }
    };

    const startAnalysis = async (file: File) => {
        setError(null);
        setResult(null);
        setLimitError(null);

        // Fetch settings from local storage
        const customKey = localStorage.getItem('lumina_custom_key')?.trim() || '';
        const activeKey = customKey || process.env.API_KEY;

        // 1. Scenario: User trying to use AI features without passing any API Key
        if (!activeKey) {
            setError("Missing API Key. Please open Settings and add a valid Google Gemini API Key.");
            return;
        }
        
        // RATE LIMIT CHECK (Only applies if no custom key is provided)
        const now = Date.now();
        if (!customKey) {
            const stored = localStorage.getItem('lumina_usage_log');
            let timestamps: number[] = stored ? JSON.parse(stored) : [];
            timestamps = timestamps.filter(t => now - t < TIME_WINDOW);

            if (timestamps.length >= MAX_HOURLY_ANALYSIS) {
                const oldestTimestamp = timestamps[0];
                const waitTimeMs = TIME_WINDOW - (now - oldestTimestamp);
                const waitMinutes = Math.ceil(waitTimeMs / 60000);
                setLimitError(`Limit reached (${MAX_HOURLY_ANALYSIS}/hr). Wait ${waitMinutes}m or add your own key in settings.`);
                setUsageCount(timestamps.length);
                return;
            }
             // Update Usage Log
            timestamps.push(now);
            localStorage.setItem('lumina_usage_log', JSON.stringify(timestamps));
            setUsageCount(timestamps.length);
        }

        setAnalyzing(true);
        try {
            const base64Data = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                     const result = reader.result as string;
                     const base64 = result.split(',')[1];
                     resolve(base64);
                };
                reader.onerror = reject;
            });

            // CONSTRUCT PROMPT BASED ON CONTEXT
            let prompt = "Analyze this photograph from a professional photography perspective. Provide 3 key strengths and 3 actionable improvements. Focus on composition, lighting, exposure, and color theory. Be constructive, specific, and concise. Score out of 100.";
            
            if (mission) {
                prompt = `You are judging a photography submission for a specific assignment. 
                The user was assigned: 
                - Subject: ${mission.subject}
                - Technique: ${mission.technique}
                - Constraint: ${mission.constraint}
                
                Analyze the image specifically on how well it adhered to this mission. 
                Strengths should focus on successful execution of the technique and subject.
                Improvements should focus on how they could have met the constraint or technique better.
                Score should reflect adherence to the mission.`;
            }

            const ai = new GoogleGenAI({ apiKey: activeKey });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: {
                    parts: [
                        { inlineData: { mimeType: file.type, data: base64Data } },
                        { text: prompt }
                    ]
                },
                config: {
                    systemInstruction: "You are a world-class photography instructor and critic. Provide technical, artistic, and constructive feedback in JSON format.",
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                            improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
                            score: { type: Type.NUMBER }
                        }
                    }
                }
            });

            if (response.text) {
                const data = JSON.parse(response.text);
                setResult(data);
            }

        } catch (err: any) {
            console.error("Analysis failed", err);
            // 2. Scenario: API Key is invalid or expired (400/403 errors)
            if (err.message?.includes('400') || err.message?.includes('403') || err.message?.includes('API key')) {
                setError("The provided API Key is invalid or has expired. Please update it in Settings.");
            } else if (err.message?.includes('fetch')) {
                 setError("Network error. Check your connection or VPN if in a restricted region.");
            } else {
                setError("Analysis engine error. Please try again.");
            }
        } finally {
            setAnalyzing(false);
        }
    };

    const reset = () => {
        setImage(null);
        setResult(null);
        setError(null);
        setLimitError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="animate-slide-up max-w-2xl mx-auto">
            {/* MISSION CONTEXT CARD */}
            {mission && !image && (
                 <div className="mb-6 bg-emerald-900/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
                     <div>
                         <h3 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
                             <Target size={14} /> Mission Verification Mode
                         </h3>
                         <p className="text-zinc-300 text-sm">
                             <b>Subject:</b> {mission.subject} • <b>Technique:</b> {mission.technique}
                         </p>
                     </div>
                     {onClearMission && (
                         <button 
                             onClick={onClearMission}
                             className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg transition-colors"
                         >
                             Exit Mission Mode
                         </button>
                     )}
                 </div>
            )}

            {!image ? (
                <>
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`aspect-video w-full border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden isolate
                    ${mission ? 'border-emerald-700/50 hover:border-emerald-500 hover:bg-emerald-900/10' : 'border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/50'}`}
                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                >
                    <div className="w-16 h-16 bg-zinc-800/80 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg z-10 backdrop-blur-sm">
                        <Upload className="text-zinc-400 group-hover:text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 z-10 font-serif">
                        {mission ? 'Upload Mission Proof' : 'Upload your Shot'}
                    </h3>
                    <p className="text-zinc-500 text-sm z-10">Click to select or drag and drop</p>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/jpeg, image/png, image/webp" 
                        className="hidden" 
                    />
                </div>

                <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                         <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
                            <Clock size={12} />
                            <span>Hourly Limit: <span className={(usageCount >= MAX_HOURLY_ANALYSIS) ? "text-red-400 font-bold" : "text-zinc-300"}>{usageCount}</span>/{MAX_HOURLY_ANALYSIS} used (Demo)</span>
                        </div>
                    </div>
                </div>
                </>
            ) : (
                <div className="space-y-6">
                    {/* Image Preview & Scanner */}
                    <div className="relative rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl bg-black isolate" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                        <img src={image} alt="Upload" className="w-full object-contain max-h-[50vh]" />
                        
                        {/* Scanning Overlay */}
                        {analyzing && !limitError && !error && (
                            <div className="absolute inset-0 z-10">
                                <div className={`absolute top-0 left-0 w-full h-1 shadow-[0_0_20px_currentColor] animate-[scan_3s_ease-in-out_infinite] ${mission ? 'bg-emerald-400 text-emerald-400' : 'bg-cyan-400 text-cyan-400'}`} />
                                <div className={`absolute inset-0 ${mission ? 'bg-emerald-500/10' : 'bg-cyan-500/10'}`} />
                                <div className={`absolute bottom-6 right-6 flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border ${mission ? 'border-emerald-500/30' : 'border-cyan-500/30'}`}>
                                    <Loader2 className={`animate-spin ${mission ? 'text-emerald-400' : 'text-cyan-400'}`} size={18} />
                                    <span className={`${mission ? 'text-emerald-400' : 'text-cyan-400'} font-mono text-xs uppercase tracking-widest`}>
                                        {mission ? 'Verifying Mission...' : 'Analyzing Photo...'}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Error Overlay (Rate Limit) */}
                        {limitError && (
                            <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
                                    <AlertTriangle className="text-amber-500" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Hourly Limit Reached</h3>
                                <p className="text-zinc-300 text-sm mb-6 max-w-xs leading-relaxed">{limitError}</p>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={reset}
                                        className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-full text-white text-sm font-medium transition-colors"
                                    >
                                        Return to Upload
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* API Error Overlay */}
                        {error && (
                             <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                                    <AlertTriangle className="text-red-500" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Analysis Failed</h3>
                                <p className="text-zinc-300 text-sm mb-6 max-w-xs leading-relaxed">{error}</p>
                                <button 
                                    onClick={reset}
                                    className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-full text-white text-sm font-medium transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {/* Result Score Overlay */}
                        {!analyzing && result && !error && (
                            <div className={`absolute top-4 right-4 w-16 h-16 bg-zinc-900/80 backdrop-blur-xl rounded-full border-2 flex items-center justify-center shadow-lg animate-zoom-in ${mission ? 'border-emerald-500' : 'border-cyan-500'}`}>
                                <span className="text-xl font-bold text-white font-mono">{result.score}</span>
                            </div>
                        )}
                    </div>

                    {/* Report Card */}
                    {!analyzing && result && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                            <div className="bg-zinc-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                                    <CheckCircle size={16} /> {mission ? 'Mission Successes' : 'What Works'}
                                </div>
                                <ul className="space-y-3">
                                    {result.strengths?.map((s, i) => (
                                        <li key={i} className="text-sm text-zinc-300 flex gap-3 items-start">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                                            {s}
                                        </li>
                                    )) || <li className="text-sm text-zinc-500 italic">No specific strengths listed.</li>}
                                </ul>
                            </div>

                            <div className="bg-zinc-900/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4 text-amber-400 font-bold uppercase tracking-wider text-xs">
                                    <AlertTriangle size={16} /> {mission ? 'Mission Failures' : 'Improvements'}
                                </div>
                                <ul className="space-y-3">
                                    {result.improvements?.map((s, i) => (
                                        <li key={i} className="text-sm text-zinc-300 flex gap-3 items-start">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                                            {s}
                                        </li>
                                    )) || <li className="text-sm text-zinc-500 italic">No specific improvements listed.</li>}
                                </ul>
                            </div>
                        </div>
                    )}

                    {!analyzing && !error && !limitError && (
                        <div className="flex flex-col items-center gap-4 pt-4">
                            <div className="flex gap-3">
                                <button 
                                    onClick={reset}
                                    className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-full text-white font-medium transition-colors border border-zinc-700"
                                >
                                    <RefreshCw size={18} /> Analyze Another
                                </button>
                                {mission && onCompleteMission && result && result.score >= 0 && (
                                     <button 
                                        onClick={onCompleteMission}
                                        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-full text-white font-medium transition-colors shadow-lg shadow-emerald-900/50"
                                    >
                                        <CheckCircle size={18} /> Complete Mission
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default PhotoAnalyzer;
