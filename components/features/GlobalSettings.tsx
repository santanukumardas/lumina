
import React, { useState, useEffect } from 'react';
import { X, Key, Save, AlertTriangle, ExternalLink, AlertCircle, Trash2, Database, Palette, Check } from 'lucide-react';

interface GlobalSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    onResetData?: () => void;
}

const THEMES = [
    { id: 'theme-lumina', name: 'Lumina', color: '#18181b', ring: 'ring-zinc-500', desc: 'Default Zinc' },
    { id: 'theme-midnight', name: 'Midnight', color: '#0f172a', ring: 'ring-blue-500', desc: 'Cool Slate' },
    { id: 'theme-noir', name: 'Noir', color: '#171717', ring: 'ring-neutral-500', desc: 'Pure Neutral' },
    { id: 'theme-dune', name: 'Dune', color: '#1c1917', ring: 'ring-orange-500', desc: 'Warm Stone' },
];

const GlobalSettings: React.FC<GlobalSettingsProps> = ({ isOpen, onClose, onResetData }) => {
    const [customKey, setCustomKey] = useState('');
    const [saved, setSaved] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [confirmReset, setConfirmReset] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('theme-lumina');

    useEffect(() => {
        if (isOpen) {
            const savedKey = localStorage.getItem('lumina_custom_key');
            if (savedKey) setCustomKey(savedKey);
            setSaved(false);
            setValidationError(null);
            setConfirmReset(false);
            
            // Sync theme state
            const savedTheme = localStorage.getItem('lumina_theme') || 'theme-lumina';
            setCurrentTheme(savedTheme);
        }
    }, [isOpen]);

    const handleSaveKey = () => {
        setValidationError(null);
        const trimmedKey = customKey.trim();

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

        localStorage.setItem('lumina_custom_key', trimmedKey);
        setCustomKey(trimmedKey);
        
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
        }, 800);
    };

    const handleReset = () => {
        if (!confirmReset) {
            setConfirmReset(true);
            return;
        }
        onResetData?.();
        setConfirmReset(false);
        onClose();
    };

    const handleThemeChange = (themeId: string) => {
        setCurrentTheme(themeId);
        localStorage.setItem('lumina_theme', themeId);
        document.body.className = themeId;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white">Settings</h3>
                    <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto scrollbar-hide">
                    
                    {/* THEME SELECTOR */}
                    <div>
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Palette size={14} /> Interface Theme
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            {THEMES.map(theme => (
                                <button
                                    key={theme.id}
                                    onClick={() => handleThemeChange(theme.id)}
                                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${currentTheme === theme.id ? `bg-zinc-800 border-white/20 ring-1 ${theme.ring} ring-offset-2 ring-offset-zinc-950` : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800'}`}
                                >
                                    <div 
                                        className="w-8 h-8 rounded-full border border-white/10 shadow-inner"
                                        style={{ backgroundColor: theme.color }}
                                    />
                                    <div className="text-left">
                                        <div className={`text-sm font-bold ${currentTheme === theme.id ? 'text-white' : 'text-zinc-400'}`}>{theme.name}</div>
                                        <div className="text-[10px] text-zinc-600">{theme.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-px bg-zinc-800"></div>

                    {/* API Key Section */}
                    <div>
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Key size={14} /> AI Configuration
                        </h4>
                        
                        <div className="space-y-4">
                            <div className="bg-amber-900/10 border border-amber-500/20 p-4 rounded-xl">
                                <ul className="text-[11px] text-zinc-400 space-y-2 list-disc pl-4 leading-relaxed">
                                    <li>Use keys from <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline inline-flex items-center gap-0.5">Google AI Studio <ExternalLink size={8}/></a>.</li>
                                    <li>Keys are stored locally in your browser.</li>
                                    <li>Ensure your key has access to <code>gemini-3-flash-preview</code>.</li>
                                </ul>
                            </div>

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
                                    className={`w-full bg-zinc-900/50 border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 transition-all placeholder:text-zinc-600 font-mono ${validationError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500/50'}`}
                                />
                            </div>
                            
                            {validationError && (
                                <p className="text-[10px] text-red-400 flex items-center gap-1 font-bold animate-pulse">
                                    <AlertCircle size={10} /> {validationError}
                                </p>
                            )}

                            <button 
                                onClick={handleSaveKey}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-zinc-200'}`}
                            >
                                {saved ? <><Check size={18}/> Saved Successfully!</> : <><Save size={18} /> Save Key</>}
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-px bg-zinc-800"></div>

                    {/* Data Management Section */}
                    <div>
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Database size={14} /> Data Management
                        </h4>
                        
                        <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800 flex flex-col gap-2">
                            <p className="text-xs text-zinc-400 leading-relaxed mb-2">
                                Your progress, bookmarks, and active missions are stored on this device.
                            </p>
                            <button 
                                onClick={handleReset}
                                className={`w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all border ${confirmReset ? 'bg-red-500 text-white border-red-600' : 'bg-zinc-950 text-red-400 border-zinc-700 hover:border-red-500/50'}`}
                            >
                                <Trash2 size={14} /> 
                                {confirmReset ? 'Are you sure? Click to Confirm' : 'Reset All Progress'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalSettings;
