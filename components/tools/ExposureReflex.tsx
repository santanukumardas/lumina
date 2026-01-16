
import React, { useState, useEffect, useRef } from 'react';
import { Timer, Zap, Camera, RefreshCw, Trophy, AlertTriangle } from 'lucide-react';

const SCENARIOS = [
    { name: "Bright Sunlight", ev: 15, hint: "Low ISO, Fast Shutter" },
    { name: "Overcast Day", ev: 12, hint: "Moderate settings" },
    { name: "Golden Hour", ev: 10, hint: "Open up aperture" },
    { name: "Indoor Office", ev: 7, hint: "Watch your shutter speed" },
    { name: "Dim Restaurant", ev: 5, hint: "High ISO needed" },
    { name: "City Night", ev: 3, hint: "Open wide, slow shutter" }
];

const MODIFIERS = [
    { name: "Cloud Cover!", delta: -2 },
    { name: "Sun Break!", delta: +2 },
    { name: "Subject into Shadow!", delta: -3 },
    { name: "Spotlight!", delta: +3 }
];

const ExposureReflex: React.FC = () => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover'>('menu');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [level, setLevel] = useState(1);
    
    // Camera Settings (in stops relative to base)
    // Aperture: 0=f/1.4 ... 8=f/22
    // Shutter: 0=1/4000 ... 12=1s
    // ISO: 0=100 ... 7=12800
    const [aperture, setAperture] = useState(4); // Start mid
    const [shutter, setShutter] = useState(6); // Start mid
    const [iso, setIso] = useState(0); // Start 100

    const [targetEV, setTargetEV] = useState(12);
    const [currentScenario, setCurrentScenario] = useState(SCENARIOS[1]);
    const [activeModifier, setActiveModifier] = useState<{name: string, delta: number} | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const timerRef = useRef<number | null>(null);
    const eventTimerRef = useRef<number | null>(null);

    // Standard stops for display
    const fStops = ['1.4', '2.0', '2.8', '4.0', '5.6', '8.0', '11', '16', '22'];
    const sSpeeds = ['1/4000', '1/2000', '1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15', '1/8', '1/4', '0.5"', '1"'];
    const isos = ['100', '200', '400', '800', '1600', '3200', '6400', '12800'];

    // Calculate current EV of camera settings relative to a baseline
    // Formula approximation for game mechanics:
    // EV = ApertureValue + ShutterValue - ISOValue
    // We need to map our indices to actual EV contributions.
    // Let's create a simplified Game EV logic:
    // Higher Aperture Index (f/22) = Less Light (-EV)
    // Higher Shutter Index (1") = More Light (+EV)
    // Higher ISO Index (12800) = More Light (+EV)
    
    const getCameraEV = () => {
        // Base EV at f/1.4, 1/4000, ISO 100 could be considered roughly EV 13?
        // Let's just sum stops.
        // Aperture: f/1.4 is base. f/22 is 8 stops darker. (Contribution: -index)
        // Shutter: 1/4000 is base. 1" is 12 stops brighter. (Contribution: +index)
        // ISO: 100 is base. 12800 is 7 stops brighter. (Contribution: +index)
        
        // This calculates "Light Intake" stops
        return shutter + iso - aperture; 
    };

    // We need to map Scene EV to this "Light Intake" scale.
    // Bright Sun (EV 15) requires roughly f/16 (idx 7), 1/125 (idx 5), ISO 100 (idx 0).
    // Intake = 5 + 0 - 7 = -2.
    // So Target Calculation: 
    // Target Intake = 13 - SceneEV. (e.g. Scene 15 -> Target -2).
    // Scene 3 (Night) -> Target 10. (e.g. f/1.4(0), 1/30(7), ISO 3200(5) -> 7+5-0 = 12). close enough.
    
    const targetIntake = 13 - (targetEV + (activeModifier?.delta || 0));
    const currentIntake = getCameraEV();
    const difference = currentIntake - targetIntake; // 0 = Perfect exposure

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(45);
        setLevel(1);
        startRound();
        
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Random events loop
        if (eventTimerRef.current) clearInterval(eventTimerRef.current);
        eventTimerRef.current = window.setInterval(() => {
            if (Math.random() > 0.7) triggerEvent();
        }, 4000);
    };

    const startRound = () => {
        const scen = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
        setCurrentScenario(scen);
        setTargetEV(scen.ev);
        setActiveModifier(null);
        
        // Randomize settings to be "off"
        setAperture(Math.floor(Math.random() * fStops.length));
        setShutter(Math.floor(Math.random() * sSpeeds.length));
        setIso(Math.floor(Math.random() * 3)); // Keep ISO low initially
    };

    const triggerEvent = () => {
        const mod = MODIFIERS[Math.floor(Math.random() * MODIFIERS.length)];
        setActiveModifier(mod);
        setFeedback(mod.name);
        setTimeout(() => setFeedback(null), 2000);
    };

    const endGame = () => {
        setGameState('gameover');
        if (timerRef.current) clearInterval(timerRef.current);
        if (eventTimerRef.current) clearInterval(eventTimerRef.current);
    };

    const handleShoot = () => {
        if (Math.abs(difference) <= 0.5) {
            // Success
            const timeBonus = Math.ceil(timeLeft / 5);
            const levelBonus = level * 100;
            const accuracyBonus = difference === 0 ? 50 : 0;
            setScore(prev => prev + 200 + timeBonus + levelBonus + accuracyBonus);
            setLevel(prev => prev + 1);
            setFeedback("PERFECT SHOT!");
            
            // Add time
            setTimeLeft(prev => Math.min(60, prev + 5));
            
            setTimeout(() => {
                setFeedback(null);
                startRound();
            }, 800);
        } else {
            // Fail
            setFeedback("BAD EXPOSURE!");
            setTimeLeft(prev => Math.max(0, prev - 5));
            setTimeout(() => setFeedback(null), 500);
        }
    };

    // Cleanup
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (eventTimerRef.current) clearInterval(eventTimerRef.current);
        };
    }, []);

    // Meter Visualization
    // Range -3 to +3
    const meterPercent = Math.min(100, Math.max(0, ((difference + 3) / 6) * 100));
    
    return (
        <div className="max-w-4xl mx-auto p-4 animate-slide-up select-none">
            
            {gameState === 'menu' && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
                    <div className="relative z-10">
                        <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">EXPOSURE <span className="text-emerald-500">REFLEX</span></h2>
                        <p className="text-zinc-400 mb-8 max-w-md mx-auto">Race against the clock. Zero the light meter by adjusting Aperture, Shutter, and ISO. React to changing conditions.</p>
                        <button 
                            onClick={startGame}
                            className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl rounded-full transition-transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                        >
                            START GAME
                        </button>
                    </div>
                </div>
            )}

            {gameState === 'playing' && (
                <div className="space-y-6">
                    {/* HUD */}
                    <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-zinc-800 backdrop-blur-md sticky top-20 z-20">
                        <div className="flex items-center gap-4">
                            <div className={`text-2xl font-black font-mono ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                {timeLeft}s
                            </div>
                            <div className="h-8 w-px bg-zinc-700"></div>
                            <div className="text-sm">
                                <div className="text-zinc-500 font-bold text-xs uppercase">Score</div>
                                <div className="text-emerald-400 font-mono font-bold text-xl">{score}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-zinc-500 font-bold text-xs uppercase">Scenario</div>
                            <div className="text-white font-bold flex items-center gap-2 justify-end">
                                {currentScenario.name}
                                {activeModifier && <AlertTriangle size={16} className="text-amber-500 animate-bounce" />}
                            </div>
                        </div>
                    </div>

                    {/* Feedback Overlay */}
                    {feedback && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                            <h2 className="text-6xl font-black text-white drop-shadow-[0_4px_0_#000] animate-zoom-in bg-black/50 px-8 py-4 rounded-xl backdrop-blur-sm border border-white/20">
                                {feedback}
                            </h2>
                        </div>
                    )}

                    {/* Viewfinder / Light Meter */}
                    <div className="relative bg-zinc-950 rounded-3xl overflow-hidden border-4 border-zinc-800 shadow-2xl">
                        {/* Simulated Viewfinder Image (Blur based on Aperture? brightness based on exposure?) */}
                        {/* For simplicity/performance in game mode, keep brightness relatively static but show overlay */}
                        <div className="h-64 bg-zinc-900 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-50"></div>
                            
                            {/* Exposure Preview (Darken/Lighten div) */}
                            <div 
                                className="absolute inset-0 bg-white transition-opacity duration-200 pointer-events-none"
                                style={{ 
                                    opacity: Math.max(0, Math.min(0.8, difference * 0.2)), 
                                    mixBlendMode: 'overlay'
                                }} 
                            />
                            <div 
                                className="absolute inset-0 bg-black transition-opacity duration-200 pointer-events-none"
                                style={{ 
                                    opacity: Math.max(0, Math.min(0.9, difference * -0.2)) 
                                }} 
                            />

                            {/* Center Target */}
                            <div className="border-2 border-white/30 w-32 h-32 rounded-lg relative">
                                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500/50 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
                            </div>

                            {/* The Meter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/80 rounded-full border border-zinc-700 flex items-center px-2 relative">
                                {/* Tick Marks */}
                                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white z-10"></div>
                                <div className="absolute left-[16%] top-2 bottom-2 w-px bg-zinc-500"></div>
                                <div className="absolute left-[84%] top-2 bottom-2 w-px bg-zinc-500"></div>
                                <div className="absolute left-[33%] top-2 bottom-2 w-px bg-zinc-500"></div>
                                <div className="absolute left-[66%] top-2 bottom-2 w-px bg-zinc-500"></div>

                                {/* The Needle */}
                                <div 
                                    className={`absolute top-1 bottom-1 w-2 rounded-full shadow-[0_0_10px_currentColor] transition-all duration-200 ease-out z-20 ${Math.abs(difference) <= 0.5 ? 'bg-emerald-500 text-emerald-500' : 'bg-red-500 text-red-500'}`}
                                    style={{ left: `calc(${meterPercent}% - 4px)` }}
                                />
                            </div>
                            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 font-mono font-bold text-xs bg-black/50 px-2 rounded text-zinc-300">
                                {difference > 0 ? '+' : ''}{Math.round(difference)} EV
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ControlDial 
                            label="Aperture" 
                            value={`f/${fStops[aperture]}`} 
                            onPrev={() => setAperture(p => Math.max(0, p-1))}
                            onNext={() => setAperture(p => Math.min(fStops.length-1, p+1))}
                            color="text-blue-400"
                        />
                        <ControlDial 
                            label="Shutter" 
                            value={sSpeeds[shutter]} 
                            onPrev={() => setShutter(p => Math.max(0, p-1))}
                            onNext={() => setShutter(p => Math.min(sSpeeds.length-1, p+1))}
                            color="text-amber-400"
                        />
                        <ControlDial 
                            label="ISO" 
                            value={isos[iso]} 
                            onPrev={() => setIso(p => Math.max(0, p-1))}
                            onNext={() => setIso(p => Math.min(isos.length-1, p+1))}
                            color="text-purple-400"
                        />
                    </div>

                    {/* Shoot Button */}
                    <button 
                        onClick={handleShoot}
                        disabled={Math.abs(difference) > 0.5} // Optional: Force user to be accurate? Or allow misses for penalty? Let's allow misses in logic, but button visually indicates readiness
                        className={`w-full py-6 rounded-2xl font-black text-2xl uppercase tracking-widest transition-all transform active:scale-95 shadow-xl ${Math.abs(difference) <= 0.5 ? 'bg-white text-black hover:bg-emerald-400 hover:text-white hover:scale-[1.02]' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'}`}
                    >
                        {Math.abs(difference) <= 0.5 ? 'TAKE PHOTO' : 'ADJUST EXPOSURE'}
                    </button>
                </div>
            )}

            {gameState === 'gameover' && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center shadow-2xl animate-zoom-in">
                    <Trophy className="mx-auto text-yellow-400 mb-6" size={64} />
                    <h2 className="text-4xl font-black text-white mb-2">GAME OVER</h2>
                    <p className="text-zinc-400 mb-8">Reflexes depleted.</p>
                    
                    <div className="bg-zinc-950 rounded-2xl p-6 mb-8 border border-zinc-800 inline-block min-w-[200px]">
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Final Score</div>
                        <div className="text-5xl font-mono font-bold text-emerald-400">{score}</div>
                    </div>

                    <div>
                        <button 
                            onClick={startGame}
                            className="px-8 py-3 bg-white hover:bg-zinc-200 text-black font-bold rounded-full transition-colors flex items-center gap-2 mx-auto"
                        >
                            <RefreshCw size={20} /> Play Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ControlDial: React.FC<{label: string, value: string, onPrev: () => void, onNext: () => void, color: string}> = ({ label, value, onPrev, onNext, color }) => (
    <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex flex-col items-center">
        <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${color}`}>{label}</span>
        <div className="flex items-center justify-between w-full bg-zinc-950 rounded-xl p-2 border border-zinc-800">
            <button onClick={onPrev} className="w-10 h-10 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors font-bold text-xl">-</button>
            <span className="font-mono text-xl font-bold text-white min-w-[80px] text-center">{value}</span>
            <button onClick={onNext} className="w-10 h-10 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors font-bold text-xl">+</button>
        </div>
    </div>
);

export default ExposureReflex;
