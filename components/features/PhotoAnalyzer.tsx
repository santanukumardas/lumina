
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Mission } from '../../types';
import { Target, Upload, Clock, Settings, Cpu, Globe, Key, X, Loader2, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

type AiProvider = 'gemini' | 'openai';

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
    const [customKey, setCustomKey] = useState('');
    const [provider, setProvider] = useState<AiProvider>('gemini');
    const [showSettings, setShowSettings] = useState(false);
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

        // Load custom key and provider
        const savedKey = localStorage.getItem('lumina_custom_key');
        if (savedKey) setCustomKey(savedKey);
        
        const savedProvider = localStorage.getItem('lumina_ai_provider');
        if (savedProvider && (savedProvider === 'gemini' || savedProvider === 'openai')) {
            setProvider(savedProvider as AiProvider);
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
            setResult(null);
            setError(null);
            setLimitError(null);
            startAnalysis(file);
        }
    };

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCustomKey(val);
        localStorage.setItem('lumina_custom_key', val);
    };

    const handleProviderChange = (p: AiProvider) => {
        setProvider(p);
        localStorage.setItem('lumina_ai_provider', p);
        // Clear error when switching providers to give user a chance to enter key
        setError(null); 
    };

    // Helper to validate Keys based on provider
    const isValidKey = (key: string, provider: AiProvider) => {
        if (provider === 'gemini') {
            // Google API keys typically start with AIza and are 39 chars long
            return /^AIza[0-9A-Za-z\-_]{35}$/.test(key);
        }
        if (provider === 'openai') {
            // OpenAI keys generally start with sk- and are quite long. 
            // We'll do a basic check for prefix and length to prevent obvious junk.
            return /^sk-[a-zA-Z0-9\-_]{20,}$/.test(key); 
        }
        return false;
    };

    const analyzeWithOpenAI = async (apiKey: string, base64Image: string, promptText: string) => {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional photography critic. Respond strictly in JSON format with the following schema: { strengths: string[], improvements: string[], score: number }. The score should be out of 100."
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: promptText },
                            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
                        ]
                    }
                ],
                response_format: { type: "json_object" }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "OpenAI API request failed");
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        return JSON.parse(content);
    };

    const startAnalysis = async (file: File) => {
        setError(null);
        setResult(null);
        setLimitError(null);

        const userKey = customKey.trim();

        // 1. STRICT VALIDATION of Custom Key (if provided OR if using OpenAI)
        if (provider === 'openai' && !userKey) {
            setError("OpenAI Analysis requires a valid API Key. Please enter your key in settings.");
            setShowSettings(true);
            setAnalyzing(false);
            return;
        }

        if (userKey) {
            if (!isValidKey(userKey, provider)) {
                setError(`Invalid ${provider === 'gemini' ? 'Google' : 'OpenAI'} API Key format.`);
                setAnalyzing(false);
                return; 
            }
        }

        // 2. RATE LIMIT CHECK
        const now = Date.now();
        if (!userKey && provider === 'gemini') {
            const stored = localStorage.getItem('lumina_usage_log');
            let timestamps: number[] = stored ? JSON.parse(stored) : [];
            timestamps = timestamps.filter(t => now - t < TIME_WINDOW);

            if (timestamps.length >= MAX_HOURLY_ANALYSIS) {
                const oldestTimestamp = timestamps[0];
                const waitTimeMs = TIME_WINDOW - (now - oldestTimestamp);
                const waitMinutes = Math.ceil(waitTimeMs / 60000);
                setLimitError(`Limit reached (${MAX_HOURLY_ANALYSIS}/hr). Wait ${waitMinutes}m or add your own key.`);
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

            if (provider === 'gemini') {
                const activeKey = userKey || process.env.API_KEY;
                if (!activeKey) throw new Error("No Gemini API Key available");

                const ai = new GoogleGenAI({ apiKey: activeKey });
                const response = await ai.models.generateContent({
                    model: 'gemini-3-pro-preview',
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
            } else if (provider === 'openai') {
                const data = await analyzeWithOpenAI(userKey, base64Data, prompt);
                setResult(data);
            }

        } catch (err: any) {
            console.error("Analysis failed", err);
            if (userKey) {
                setError(`The provided ${provider} Key failed. ${err.message}`);
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
                 <div className="mb-6 bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
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
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg z-10">
                        <Upload className="text-zinc-400 group-hover:text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 z-10">
                        {mission ? 'Upload Mission Proof' : 'Upload your Shot'}
                    </h3>
                    <p className="text-zinc-500 text-sm z-10">Click to select or drag and drop</p>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                    />
                </div>

                <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                         <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
                            <Clock size={12} />
                            <span>Hourly Limit: <span className={(usageCount >= MAX_HOURLY_ANALYSIS && !customKey) ? "text-red-400 font-bold" : "text-zinc-300"}>{customKey ? '∞' : usageCount}</span>/{customKey ? '∞' : MAX_HOURLY_ANALYSIS} used</span>
                        </div>
                        <button 
                            onClick={() => setShowSettings(!showSettings)}
                            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            <Settings size={12} />
                            {showSettings ? 'Hide Settings' : 'Settings & API Key'}
                        </button>
                    </div>

                    {showSettings && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-fade-in">
                            {/* Provider Selection */}
                            <div className="flex items-center gap-4 mb-4">
                                <label className="text-xs font-medium text-zinc-400">AI Provider:</label>
                                <div className="flex bg-zinc-950 rounded-lg p-1 border border-zinc-800">
                                    <button 
                                        onClick={() => handleProviderChange('gemini')}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${provider === 'gemini' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        <Cpu size={12} /> Google Gemini
                                    </button>
                                    <button 
                                        onClick={() => handleProviderChange('openai')}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${provider === 'openai' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        <Globe size={12} /> OpenAI
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Key className="text-zinc-600 mt-1" size={16} />
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-zinc-400 mb-1">
                                        {provider === 'gemini' ? 'Google Gemini API Key (Optional)' : 'OpenAI API Key (Required)'}
                                    </label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="password" 
                                            value={customKey}
                                            onChange={handleKeyChange}
                                            placeholder={provider === 'gemini' ? "AIzaSy..." : "sk-proj..."}
                                            className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                        />
                                        {customKey && (
                                            <button onClick={() => { setCustomKey(''); localStorage.removeItem('lumina_custom_key'); }} className="p-2 text-zinc-500 hover:text-white">
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-zinc-600 mt-1">
                                        {provider === 'gemini' 
                                            ? 'Format: Starts with "AIza" (39 chars). Stored locally.'
                                            : 'Format: Starts with "sk-". Stored locally. Required for OpenAI.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
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
                            <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-fade-in">
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
                                    <button 
                                        onClick={() => { reset(); setShowSettings(true); }}
                                        className="px-6 py-2 bg-cyan-900/50 hover:bg-cyan-900 border border-cyan-700/50 rounded-full text-cyan-100 text-sm font-medium transition-colors"
                                    >
                                        Add Custom Key
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* API Error Overlay */}
                        {error && (
                             <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-fade-in">
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
                            <div className={`absolute top-4 right-4 w-16 h-16 bg-zinc-900/90 backdrop-blur-xl rounded-full border-2 flex items-center justify-center shadow-lg animate-zoom-in ${mission ? 'border-emerald-500' : 'border-cyan-500'}`}>
                                <span className="text-xl font-bold text-white">{result.score}</span>
                            </div>
                        )}
                    </div>

                    {/* Report Card */}
                    {!analyzing && result && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                            <div className="bg-zinc-900/50 border border-emerald-500/20 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                                    <CheckCircle size={16} /> {mission ? 'Mission Successes' : 'What Works'}
                                </div>
                                <ul className="space-y-3">
                                    {result.strengths.map((s, i) => (
                                        <li key={i} className="text-sm text-zinc-300 flex gap-3 items-start">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-zinc-900/50 border border-amber-500/20 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4 text-amber-400 font-bold uppercase tracking-wider text-xs">
                                    <AlertTriangle size={16} /> {mission ? 'Mission Failures' : 'Improvements'}
                                </div>
                                <ul className="space-y-3">
                                    {result.improvements.map((s, i) => (
                                        <li key={i} className="text-sm text-zinc-300 flex gap-3 items-start">
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                                            {s}
                                        </li>
                                    ))}
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
                             <div className="text-zinc-600 text-xs font-mono">
                                Usage: {customKey ? 'Unlimited (Custom Key)' : `${usageCount}/${MAX_HOURLY_ANALYSIS}`}
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
