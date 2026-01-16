
import React, { useState, useEffect } from 'react';
import { X, Key, Save, AlertTriangle, ExternalLink, AlertCircle } from 'lucide-react';

interface GlobalSettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

const GlobalSettings: React.FC<GlobalSettingsProps> = ({ isOpen, onClose }) => {
    const [customKey, setCustomKey] = useState('');
    const [saved, setSaved] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            const savedKey = localStorage.getItem('lumina_custom_key');
            if (savedKey) setCustomKey(savedKey);
            setSaved(false);
            setValidationError(null);
        }
    }, [isOpen]);

    const handleSave = () => {
        setValidationError(null);
        const trimmedKey = customKey.trim();

        // 1. Scenario: User trying to save an invalid format
        if (trimmedKey) {
            if (!trimmedKey.startsWith('AIza')) {
                setValidationError("Invalid Format: Google API keys must start with 'AIza'.");
                return;
            }
            if (trimmedKey.length < 35) {
                setValidationError("Invalid Format: Key appears to be too short.");
                return;
            }
        }

        // 2. Scenario: User clearing the key (allowed, reverts to demo if env exists)
        localStorage.setItem('lumina_custom_key', trimmedKey);
        setCustomKey(trimmedKey);
        
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
            onClose();
        }, 800);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                    <h3 className="text-lg font-bold text-white">AI Settings</h3>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Information Box */}
                    <div className="bg-amber-900/10 border border-amber-500/20 p-4 rounded-xl">
                        <h4 className="text-amber-500 text-xs font-bold uppercase mb-3 flex items-center gap-2">
                            <AlertTriangle size={14} /> Important Configuration Notes
                        </h4>
                        <ul className="text-[11px] text-zinc-400 space-y-2 list-disc pl-4 leading-relaxed">
                            <li>
                                <strong className="text-zinc-300">Key Source:</strong> Use keys from <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-0.5">Google AI Studio <ExternalLink size={8}/></a>, not Cloud Vertex AI.
                            </li>
                            <li>
                                <strong className="text-zinc-300">Regional Access:</strong> Browser-based API calls are restricted in EU, UK, and Switzerland. You may need a VPN to use the AI features.
                            </li>
                            <li>
                                <strong className="text-zinc-300">Security:</strong> Keys are stored in your browser's local storage. Do not enter keys on public computers.
                            </li>
                            <li>
                                <strong className="text-zinc-300">Model Requirement:</strong> Ensure your key has access to <code>gemini-3-flash-preview</code>.
                            </li>
                        </ul>
                    </div>

                    {/* API Key Input */}
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 block">Gemini API Key</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Key className="text-zinc-500" size={16} />
                            </div>
                            <input 
                                type="password" 
                                value={customKey}
                                onChange={(e) => {
                                    setCustomKey(e.target.value);
                                    if (validationError) setValidationError(null);
                                }}
                                placeholder="AIzaSy..."
                                className={`w-full bg-zinc-900 border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 transition-all placeholder:text-zinc-600 font-mono ${validationError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500/50'}`}
                            />
                        </div>
                        
                        {validationError ? (
                            <p className="text-[10px] text-red-400 mt-2 flex items-center gap-1 font-bold animate-pulse">
                                <AlertCircle size={10} /> {validationError}
                            </p>
                        ) : (
                            <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">
                                Leave blank to attempt using the built-in demo limit (subject to rate limiting). Add your own key for the best experience.
                            </p>
                        )}
                    </div>

                    <button 
                        onClick={handleSave}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saved ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-zinc-200'}`}
                    >
                        {saved ? (
                            <>Saved Successfully!</>
                        ) : (
                            <><Save size={18} /> Save Settings</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GlobalSettings;
