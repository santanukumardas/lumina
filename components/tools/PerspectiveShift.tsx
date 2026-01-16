
import React, { useState, useEffect, useRef } from 'react';
import { Move, ZoomIn, Camera, CheckCircle, RefreshCw, Trophy, Footprints, ScanLine } from 'lucide-react';

const LEVELS = [
    { id: 1, name: "The Wide Context", d: 1.5, f: 24, hint: "Get close and wide to show the environment." },
    { id: 2, name: "Standard Portrait", d: 3, f: 50, hint: "Natural perspective, similar to the human eye." },
    { id: 3, name: "Telephoto Compression", d: 8, f: 135, hint: "Step back and zoom in to bring the background closer." },
    { id: 4, name: "The Dolly Effect", d: 5, f: 85, hint: "Balance the subject size with the background scale." },
    { id: 5, name: "Extreme Compression", d: 10, f: 200, hint: "Maximum zoom, maximum distance." }
];

const PerspectiveShift: React.FC = () => {
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'success'>('intro');
    const [levelIdx, setLevelIdx] = useState(0);
    
    // User Controls
    const [distance, setDistance] = useState(3); // meters (0.5 to 10)
    const [focalLength, setFocalLength] = useState(50); // mm (16 to 200)
    
    // Target Values
    const currentLevel = LEVELS[levelIdx];
    const [target, setTarget] = useState({ d: currentLevel.d, f: currentLevel.f });

    // Physics Constants
    const BASE_D = 3;
    const BASE_F = 50;
    
    // Calculate Scales
    // Subject Scale: Proportional to F/D. Normalized so at 3m/50mm it is 1.
    const getSubjScale = (d: number, f: number) => {
        return (f / d) * (BASE_D / BASE_F);
    };

    // Background Scale: Proportional to F only (assuming bg is infinity).
    // Normalized so at 50mm it is 1.
    const getBgScale = (f: number) => {
        return f / BASE_F;
    };

    // Derived Values for UI
    const userSubjScale = getSubjScale(distance, focalLength);
    const userBgScale = getBgScale(focalLength);
    
    const targetSubjScale = getSubjScale(target.d, target.f);
    const targetBgScale = getBgScale(target.f);

    // Accuracy Check
    const subjDiff = Math.abs(userSubjScale - targetSubjScale);
    const bgDiff = Math.abs(userBgScale - targetBgScale);
    const isMatch = subjDiff < 0.1 && bgDiff < 0.1; // 10% tolerance

    useEffect(() => {
        setTarget({ d: currentLevel.d, f: currentLevel.f });
    }, [levelIdx]);

    const handleNextLevel = () => {
        if (levelIdx < LEVELS.length - 1) {
            setLevelIdx(p => p + 1);
            setGameState('playing');
            // Reset to "bad" settings to force movement
            setDistance(2);
            setFocalLength(35);
        } else {
            setGameState('success');
        }
    };

    const startGame = () => {
        setLevelIdx(0);
        setGameState('playing');
        setDistance(2);
        setFocalLength(35);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 animate-slide-up select-none">
            
            {/* HEADER */}
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                    <ScanLine className="text-indigo-500" /> Perspective Shift
                </h2>
                <p className="text-zinc-400">Master the "Dolly Zoom". Match the target composition by moving your feet and zooming your lens.</p>
            </div>

            {gameState === 'intro' && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Move size={40} className="text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">How to Play</h3>
                        <p className="text-zinc-400 mb-8 leading-relaxed">
                            Beginners zoom with the lens. Masters zoom with their feet.<br/><br/>
                            Your goal is to match the <strong>Target Photo</strong> exactly. 
                            You must adjust both your <strong>Distance</strong> (Physical Position) and <strong>Focal Length</strong> (Optical Zoom) to get the subject AND the background to the correct relative sizes.
                        </p>
                        <button 
                            onClick={startGame}
                            className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-full transition-transform hover:scale-105 shadow-lg shadow-indigo-900/50"
                        >
                            Start Simulation
                        </button>
                    </div>
                </div>
            )}

            {gameState === 'success' && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center shadow-2xl max-w-2xl mx-auto animate-zoom-in">
                    <Trophy className="mx-auto text-yellow-400 mb-6" size={64} />
                    <h2 className="text-4xl font-black text-white mb-2">MASTER PHOTOGRAPHER</h2>
                    <p className="text-zinc-400 mb-8">You intuitively understand space and compression.</p>
                    <button 
                        onClick={startGame}
                        className="px-8 py-3 bg-white hover:bg-zinc-200 text-black font-bold rounded-full transition-colors flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw size={20} /> Play Again
                    </button>
                </div>
            )}

            {gameState === 'playing' && (
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* MAIN VIEWPORT */}
                    <div className="flex-1 w-full space-y-6">
                        {/* Status Bar */}
                        <div className="flex justify-between items-center bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                            <div>
                                <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Level {levelIdx + 1} / {LEVELS.length}</div>
                                <div className="text-white font-bold">{currentLevel.name}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Hint</div>
                                <div className="text-indigo-400 text-xs font-medium">{currentLevel.hint}</div>
                            </div>
                        </div>

                        {/* Viewfinders Container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            {/* TARGET VIEW */}
                            <div className="relative aspect-[4/3] bg-black rounded-2xl overflow-hidden border-4 border-indigo-500/30 shadow-2xl group">
                                <div className="absolute top-4 left-4 z-20 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider">
                                    Target Match
                                </div>
                                <SceneVisualizer 
                                    subjScale={targetSubjScale} 
                                    bgScale={targetBgScale} 
                                    opacity={0.8}
                                />
                            </div>

                            {/* LIVE VIEW */}
                            <div className={`relative aspect-[4/3] bg-black rounded-2xl overflow-hidden border-4 transition-colors duration-300 shadow-2xl ${isMatch ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-white/20'}`}>
                                <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider flex items-center gap-2">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div> Live View
                                </div>
                                <SceneVisualizer 
                                    subjScale={userSubjScale} 
                                    bgScale={userBgScale} 
                                    opacity={1}
                                />
                                
                                {/* Match Overlay */}
                                {isMatch && (
                                    <div className="absolute inset-0 z-30 bg-emerald-500/20 backdrop-blur-[2px] flex items-center justify-center animate-fade-in">
                                        <div className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 transform animate-bounce">
                                            <CheckCircle size={24} /> PERFECT MATCH!
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CONTROLS */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Distance Slider */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-zinc-400 font-bold text-sm flex items-center gap-2">
                                        <Footprints size={18} /> Distance (Feet)
                                    </label>
                                    <span className="font-mono text-white text-lg font-bold">{distance.toFixed(1)}m</span>
                                </div>
                                <input 
                                    type="range" min="0.5" max="10" step="0.1" 
                                    value={distance} 
                                    onChange={(e) => setDistance(parseFloat(e.target.value))}
                                    className="w-full h-3 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
                                />
                                <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase">
                                    <span>Close (Macro)</span>
                                    <span>Far (Landscape)</span>
                                </div>
                            </div>

                            {/* Focal Length Slider */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-zinc-400 font-bold text-sm flex items-center gap-2">
                                        <ZoomIn size={18} /> Focal Length (Zoom)
                                    </label>
                                    <span className="font-mono text-white text-lg font-bold">{Math.round(focalLength)}mm</span>
                                </div>
                                <input 
                                    type="range" min="16" max="200" step="1" 
                                    value={focalLength} 
                                    onChange={(e) => setFocalLength(parseFloat(e.target.value))}
                                    className="w-full h-3 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400"
                                />
                                <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase">
                                    <span>Wide (16mm)</span>
                                    <span>Tele (200mm)</span>
                                </div>
                            </div>

                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end">
                            <button 
                                disabled={!isMatch}
                                onClick={handleNextLevel}
                                className={`px-8 py-3 rounded-xl font-bold text-lg transition-all flex items-center gap-2 ${isMatch ? 'bg-white text-black hover:bg-emerald-400 hover:text-white hover:scale-105 shadow-xl' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}
                            >
                                {isMatch ? 'CAPTURE & NEXT LEVEL' : 'ALIGN TARGETS'} <Camera size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const SceneVisualizer: React.FC<{subjScale: number, bgScale: number, opacity: number}> = ({ subjScale, bgScale, opacity }) => {
    return (
        <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-zinc-900">
            {/* Background Layer (Mountains) */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-100 ease-out origin-center"
                style={{ 
                    backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop)',
                    transform: `scale(${Math.max(1, bgScale)})`, // Prevent scaling smaller than container
                    opacity: opacity
                }}
            />
            
            {/* Reference Floor (Grid to show depth/movement) - fades out at high zoom */}
            <div 
                className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.8)_100%)] z-0"
                style={{ opacity: Math.max(0, 1 - bgScale/3) }} 
            />

            {/* Subject Layer (Person) */}
            {/* Using a distinct, centered element representing a person */}
            <div 
                className="relative z-10 transition-transform duration-100 ease-out flex flex-col items-center drop-shadow-2xl"
                style={{ transform: `scale(${subjScale})` }}
            >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-zinc-200 rounded-full border-4 border-white shadow-xl overflow-hidden relative">
                     <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" 
                        className="w-full h-full object-cover"
                        alt="Subject"
                     />
                </div>
                <div className="w-48 h-64 bg-zinc-800 rounded-t-[4rem] -mt-10 mx-auto shadow-inner border-x-2 border-t-2 border-white/20"></div>
            </div>
        </div>
    );
};

export default PerspectiveShift;
