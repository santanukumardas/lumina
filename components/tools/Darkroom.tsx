
import React, { useState } from 'react';
import { ASSETS } from '../../data/assets';

const Darkroom: React.FC = () => {
    // Select a random image on mount from centralized assets
    const [sourceImage] = useState(() => ASSETS.DARKROOM[Math.floor(Math.random() * ASSETS.DARKROOM.length)]);

    const [exposure, setExposure] = useState(0);
    const [contrast, setContrast] = useState(1);
    const [saturation, setSaturation] = useState(1);
    const [warmth, setWarmth] = useState(0);
    
    // Target Values (Hidden from user, but this is the "Solution")
    const target = { exposure: 0.2, contrast: 1.4, saturation: 1.3, warmth: 20 };
    const [score, setScore] = useState<number | null>(null);

    const calculateScore = () => {
        // Simple diff logic
        const diffExp = Math.abs(target.exposure - exposure) * 100; // max diff 0.5 * 100 = 50
        const diffCont = Math.abs(target.contrast - contrast) * 50; // max diff 0.5 * 50 = 25
        const diffSat = Math.abs(target.saturation - saturation) * 50; // max diff 0.5 * 50 = 25
        const diffWarm = Math.abs(target.warmth - warmth); // max diff 50

        const totalDiff = diffExp + diffCont + diffSat + diffWarm;
        // Use Math.ceil to be slightly more generous with floating point imprecision
        const finalScore = Math.max(0, Math.min(100, 100 - (totalDiff / 2)));
        setScore(Math.round(finalScore));
    };

    return (
        <div className="max-w-7xl mx-auto p-4 animate-slide-up">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">The Darkroom</h2>
                <p className="text-zinc-400">Color Grading Challenge: Match the target look.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Reference Image */}
                <div className="space-y-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Target Grade</span>
                    <div className="aspect-[4/3] max-h-[40vh] w-auto mx-auto rounded-xl overflow-hidden border border-zinc-700 relative isolate" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                        <img 
                            src={sourceImage}
                            className="w-full h-full object-cover"
                            style={{ 
                                filter: `brightness(${1 + target.exposure}) contrast(${target.contrast}) saturate(${target.saturation}) sepia(${target.warmth > 0 ? target.warmth/100 : 0})` 
                            }}
                        />
                         {score !== null && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
                                <span className="text-5xl font-bold text-white mb-2">{score}%</span>
                                <span className="text-zinc-300 text-sm">Match Accuracy</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* User Edit */}
                <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Your Edit</span>
                    <div className="aspect-[4/3] max-h-[40vh] w-auto mx-auto rounded-xl overflow-hidden border border-zinc-700 isolate" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                        <img 
                            src={sourceImage}
                            className="w-full h-full object-cover"
                            style={{ 
                                // Aligned filter logic with Reference to ensure 100% score is visually identical
                                filter: `brightness(${1 + exposure}) contrast(${contrast}) saturate(${saturation}) sepia(${warmth > 0 ? warmth/100 : 0}) hue-rotate(${warmth < 0 ? warmth : 0}deg)` 
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                     <div className="space-y-2">
                        <div className="flex justify-between text-sm text-zinc-400">
                            <span>Exposure</span>
                            <span>{exposure.toFixed(2)}</span>
                        </div>
                        <input 
                            type="range" min="-0.5" max="0.5" step="0.05" value={exposure} 
                            onChange={(e) => { setExposure(parseFloat(e.target.value)); setScore(null); }} 
                            className="w-full accent-white cursor-pointer" 
                        />
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-sm text-zinc-400">
                            <span>Contrast</span>
                            <span>{contrast.toFixed(2)}</span>
                        </div>
                        <input 
                            type="range" min="0.5" max="2" step="0.1" value={contrast} 
                            onChange={(e) => { setContrast(parseFloat(e.target.value)); setScore(null); }} 
                            className="w-full accent-white cursor-pointer" 
                        />
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-sm text-zinc-400">
                            <span>Saturation</span>
                            <span>{saturation.toFixed(2)}</span>
                        </div>
                        <input 
                            type="range" min="0" max="2" step="0.1" value={saturation} 
                            onChange={(e) => { setSaturation(parseFloat(e.target.value)); setScore(null); }} 
                            className="w-full accent-white cursor-pointer" 
                        />
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between text-sm text-zinc-400">
                            <span>Temp (Warm/Cool)</span>
                            <span>{warmth}</span>
                        </div>
                        <input 
                            type="range" min="-50" max="50" step="5" value={warmth} 
                            onChange={(e) => { setWarmth(parseInt(e.target.value)); setScore(null); }} 
                            className="w-full accent-white cursor-pointer" 
                        />
                     </div>
                </div>
                <div className="mt-8 flex flex-col items-center">
                    <button onClick={calculateScore} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors">
                        Grade Photo
                    </button>
                    <p className="mt-4 text-zinc-600 text-xs text-center max-w-sm italic opacity-70">
                        Note: Since images are pulled from Unsplash, they might occasionally fail to load. Please go back from the module and open again if this happens.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Darkroom;
