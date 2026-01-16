
import React, { useState } from 'react';
import { Zap, LampFloor, Sun } from 'lucide-react';

// --- LIGHTING SIMULATION (Hard/Soft) ---
export const LightingSim: React.FC = () => {
  const [angle, setAngle] = useState(45); 
  const radian = (angle * Math.PI) / 180;
  const shadowX = Math.cos(radian) * -20;
  const shadowY = Math.sin(radian) * -20;
  const highlightX = Math.cos(radian) * 30 + 50;
  const highlightY = Math.sin(radian) * 30 + 50;

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
      <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center overflow-hidden">
        <div 
            className="w-40 h-40 rounded-full bg-zinc-700 relative shadow-2xl transition-all duration-100"
            style={{
                background: `radial-gradient(circle at ${highlightX}% ${highlightY}%, #f4f4f5 0%, #71717a 40%, #18181b 100%)`,
                boxShadow: `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.8)`
            }}
        />
        <div className="absolute w-full h-full pointer-events-none">
             <div 
                className="absolute w-8 h-8 bg-yellow-400 rounded-full blur-md flex items-center justify-center transition-all duration-100"
                style={{
                    left: `${Math.cos(radian) * 45 + 50}%`,
                    top: `${Math.sin(radian) * 45 + 50}%`,
                    transform: 'translate(-50%, -50%)'
                }}
             >
                 <div className="w-2 h-2 bg-white rounded-full" />
             </div>
        </div>
      </div>
      <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
         <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
          <span>Side Light</span>
          <span>Top Light</span>
          <span>Side Light</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="180" 
          step="1"
          value={angle} 
          onChange={(e) => setAngle(parseInt(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-yellow-400 transition-colors"
        />
      </div>
    </div>
  );
};

// --- COLOR TEMPERATURE SIMULATION ---
export const ColorTempSim: React.FC = () => {
    const [kelvin, setKelvin] = useState(5500);
    // Map kelvin (2000-10000) to RGB blend
    // Low K = Orange/Red, High K = Blue
    
    const getOverlayColor = (k: number) => {
        if (k < 5000) {
            const opacity = (5000 - k) / 3000; 
            return `rgba(255, 140, 0, ${opacity * 0.4})`; // Orange
        } else {
            const opacity = (k - 5000) / 5000;
            return `rgba(0, 100, 255, ${opacity * 0.4})`; // Blue
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=60&w=600&auto=format&fit=crop)' }}
                />
                <div 
                    className="absolute inset-0 pointer-events-none transition-colors duration-200 mix-blend-overlay"
                    style={{ backgroundColor: getOverlayColor(kelvin) }}
                />
                 {/* Solid color blend for more realism */}
                 <div 
                    className="absolute inset-0 pointer-events-none transition-colors duration-200 mix-blend-color"
                    style={{ backgroundColor: getOverlayColor(kelvin) }}
                />
                
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-xs text-white border border-white/10 font-mono">
                    {kelvin}K
                </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
                    <span className="text-orange-400">Warm (Candle)</span>
                    <span className="text-white">Neutral (Daylight)</span>
                    <span className="text-blue-400">Cool (Shade)</span>
                </div>
                <input 
                    type="range" 
                    min="2000" 
                    max="10000" 
                    step="100"
                    value={kelvin} 
                    onChange={(e) => setKelvin(parseInt(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-orange-500 via-white to-blue-500 rounded-lg appearance-none cursor-pointer"
                />
                <div className="mt-4 text-center">
                    <p className="text-zinc-500 text-sm mt-1">
                        White Balance corrects color casts. Match the Kelvin value to your light source.
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- THREE POINT LIGHTING SIMULATION ---
export const ThreePointSim: React.FC = () => {
    const [lights, setLights] = useState({ key: true, fill: true, back: true });

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
             <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center">
                 {/* The Subject */}
                 <div className="relative w-48 h-64 bg-zinc-900 rounded-[50%_50%_40%_40%] overflow-hidden">
                     {/* Base Darkness */}
                     <div className="absolute inset-0 bg-black opacity-90 z-0"></div>

                     {/* Key Light (Strong, from right) */}
                     <div 
                        className={`absolute inset-0 bg-gradient-to-bl from-white via-transparent to-transparent transition-opacity duration-500 ${lights.key ? 'opacity-90' : 'opacity-0'}`}
                        style={{ mixBlendMode: 'soft-light' }}
                     />
                     <div className={`absolute -right-10 -top-10 w-full h-full bg-white/20 blur-2xl rounded-full ${lights.key ? 'opacity-100' : 'opacity-0'} transition-opacity`} />

                     {/* Fill Light (Soft, from left) */}
                     <div 
                        className={`absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent transition-opacity duration-500 ${lights.fill ? 'opacity-40' : 'opacity-0'}`}
                        style={{ mixBlendMode: 'screen' }}
                     />

                     {/* Back Light (Rim, from behind/top) */}
                     <div 
                        className={`absolute inset-0 rounded-[50%_50%_40%_40%] border-t-4 border-r-2 border-l-2 border-white/80 blur-[2px] transition-opacity duration-500 ${lights.back ? 'opacity-100' : 'opacity-0'}`} 
                        style={{ maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)' }}
                     />
                 </div>
                 
                 {/* Floor Reflection */}
                 <div className="absolute bottom-10 w-32 h-4 bg-black/50 blur-lg rounded-full"></div>
             </div>

             <div className="grid grid-cols-3 gap-4 w-full">
                 <button 
                    onClick={() => setLights({...lights, key: !lights.key})}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${lights.key ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}
                 >
                    <Zap size={20} className={lights.key ? 'text-yellow-400' : 'text-zinc-700'} />
                    <span className="text-xs font-bold uppercase">Key Light</span>
                 </button>
                 <button 
                    onClick={() => setLights({...lights, fill: !lights.fill})}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${lights.fill ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}
                 >
                    <LampFloor size={20} className={lights.fill ? 'text-blue-300' : 'text-zinc-700'} />
                    <span className="text-xs font-bold uppercase">Fill Light</span>
                 </button>
                 <button 
                    onClick={() => setLights({...lights, back: !lights.back})}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${lights.back ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-600'}`}
                 >
                    <Sun size={20} className={lights.back ? 'text-white' : 'text-zinc-700'} />
                    <span className="text-xs font-bold uppercase">Back Light</span>
                 </button>
             </div>
        </div>
    );
};

// --- GOLDEN HOUR SIMULATION ---
export const GoldenHourSim: React.FC = () => {
    const [time, setTime] = useState(50); // 0 = Noon, 100 = Sunset
    
    const getShadowLength = () => 1 + (time / 20);
    const getShadowOpacity = () => 0.6 - (time / 200);
    const getSunPosition = () => 10 + (time * 0.8);
    const getSkyGradient = () => {
        if (time < 30) return 'linear-gradient(to bottom, #87CEEB, #E0F7FA)'; // Noon
        if (time < 70) return 'linear-gradient(to bottom, #6CA6CD, #F0E68C)'; // Afternoon
        return 'linear-gradient(to bottom, #4B3621, #FF8C00, #FFD700)'; // Sunset
    };
    const getOverlayColor = () => {
         // Mix blend color: Blue -> Orange
         if (time < 50) return `rgba(255,255,255,0)`;
         return `rgba(255, 165, 0, ${(time - 50) / 100})`;
    }

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div 
                className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl transition-all duration-1000"
                style={{ background: getSkyGradient() }}
            >
                {/* Sun */}
                <div 
                    className="absolute w-16 h-16 rounded-full bg-yellow-200 shadow-[0_0_40px_rgba(255,255,0,0.8)] blur-sm transition-all duration-300"
                    style={{ 
                        top: `${getSunPosition()}%`, 
                        left: '20%',
                        backgroundColor: time > 70 ? '#FF4500' : '#FFFFE0'
                    }}
                />

                {/* Landscape Silhouettes */}
                <div className="absolute bottom-0 w-full h-24 bg-zinc-900 rounded-t-lg"></div>
                <div className="absolute bottom-24 left-10 w-8 h-32 bg-zinc-800 rounded-t-full"></div> {/* Tree Trunk */}
                <div className="absolute bottom-48 left-2 w-24 h-24 bg-zinc-800 rounded-full"></div> {/* Tree Top */}
                
                {/* Subject casting shadow */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    {/* Shadow */}
                    <div 
                        className="absolute bottom-0 left-1/2 w-8 bg-black rounded-full blur-md transition-all duration-300 origin-bottom"
                        style={{ 
                            height: `${getShadowLength() * 40}px`, 
                            transform: `translateX(-50%) rotate(${90 + (time/2)}deg)`,
                            opacity: getShadowOpacity()
                        }}
                    />
                    {/* Person */}
                    <div className="relative w-8 h-20 bg-zinc-950 rounded-full z-10 flex flex-col items-center">
                        <div className="w-6 h-6 bg-zinc-950 rounded-full -mt-6"></div>
                    </div>
                </div>

                {/* Golden Hour Overlay */}
                <div 
                    className="absolute inset-0 pointer-events-none mix-blend-overlay transition-colors duration-300"
                    style={{ backgroundColor: getOverlayColor() }}
                />
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
                    <span>Noon (Hard Light)</span>
                    <span>Golden Hour (Soft/Warm)</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="1"
                    value={time} 
                    onChange={(e) => setTime(parseInt(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-blue-300 via-yellow-200 to-orange-500 rounded-lg appearance-none cursor-pointer"
                />
                <div className="mt-4 text-center">
                    <p className="text-zinc-500 text-sm mt-1">
                        {time > 75 ? "The 'Golden Hour' provides soft, warm, directional light perfect for portraits." : "Midday sun creates harsh shadows and cooler tones."}
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- INVERSE SQUARE LAW SIMULATION ---
export const InverseSquareSim: React.FC = () => {
    const [distance, setDistance] = useState(1); // 1 to 10
    
    // Intensity = 1 / distance^2
    const intensity = 1 / (distance * distance);
    const brightness = Math.min(100, intensity * 200);

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center px-12">
                {/* Light Source */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
                    <Zap className="text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]" size={32} />
                </div>

                {/* Light Beam */}
                <div 
                    className="absolute left-10 top-1/2 -translate-y-1/2 h-full w-full opacity-20 bg-gradient-to-r from-yellow-100 to-transparent pointer-events-none"
                    style={{ clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 60%)' }}
                />

                {/* Subject Moving */}
                <div 
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 flex flex-col items-center gap-2"
                    style={{ left: `${distance * 9}%` }}
                >
                    <div 
                        className="w-16 h-24 bg-white rounded-lg transition-all duration-300 border border-zinc-500"
                        style={{ filter: `brightness(${brightness}%)` }}
                    />
                    <div className="text-xs text-zinc-500 font-mono">{distance}m</div>
                </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
                    <span>Close (1m)</span>
                    <span>Far (10m)</span>
                </div>
                <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    step="0.5"
                    value={distance} 
                    onChange={(e) => setDistance(parseFloat(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-yellow-400 transition-colors"
                />
                 <div className="mt-4 text-center">
                    <span className="text-3xl font-bold text-white tracking-tighter">{Math.round(intensity * 100)}%</span>
                    <span className="text-sm text-zinc-400 ml-2">Light Intensity</span>
                    <p className="text-zinc-500 text-sm mt-1">
                        Double the distance, quarter the light. Light falls off very quickly.
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- FLASH SYNC SIMULATION ---
export const FlashSyncSim: React.FC = () => {
    const [curtain, setCurtain] = useState<'front' | 'rear'>('rear');

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center">
                {/* Background (City Street) */}
                <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542259685-6113b28b7762?q=60&w=600&auto=format&fit=crop)' }} />
                
                {/* Car Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                     {/* Light Trails */}
                     <div 
                        className={`absolute h-8 w-64 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-md transition-all duration-500 ease-out`}
                        style={{ 
                            transform: curtain === 'rear' ? 'translateX(-80px)' : 'translateX(80px)'
                        }}
                     />
                     
                     {/* Car Sprite */}
                     <div className="relative z-10 p-4 bg-zinc-800 rounded-xl border border-zinc-600 shadow-2xl flex items-center justify-center">
                         <div className="text-4xl">🏎️</div>
                     </div>
                </div>

                <div className="absolute bottom-6 font-bold text-2xl text-white uppercase tracking-widest drop-shadow-md">
                    {curtain} Curtain Sync
                </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex gap-4">
                 <button 
                    onClick={() => setCurtain('front')}
                    className={`flex-1 py-4 rounded-lg text-sm font-medium transition-all ${curtain === 'front' ? 'bg-zinc-700 text-white shadow-inner' : 'bg-zinc-800 text-zinc-400'}`}
                 >
                     Front Curtain (Trails Ahead)
                 </button>
                 <button 
                    onClick={() => setCurtain('rear')}
                    className={`flex-1 py-4 rounded-lg text-sm font-medium transition-all ${curtain === 'rear' ? 'bg-zinc-700 text-white shadow-inner' : 'bg-zinc-800 text-zinc-400'}`}
                 >
                     Rear Curtain (Trails Behind)
                 </button>
            </div>
             <p className="text-zinc-500 text-sm text-center">
                Rear curtain sync creates natural-looking motion trails behind the subject.
            </p>
        </div>
    );
};

// --- GOBOS & PATTERNS SIMULATION ---
export const GoboSim: React.FC = () => {
    const [pattern, setPattern] = useState<'none' | 'blinds' | 'leaves' | 'window'>('none');

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl flex items-center justify-center">
                {/* Wall Background */}
                <div className="absolute inset-0 bg-zinc-900"></div>

                {/* Spotlight Pool */}
                <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-64 h-64 bg-orange-100/10 rounded-full blur-3xl"></div>
                </div>

                {/* The Shadow Pattern (Gobo) */}
                <div 
                    className="absolute inset-0 bg-black mix-blend-multiply transition-all duration-500"
                    style={{
                        maskImage: pattern === 'none' ? 'none' :
                                   pattern === 'blinds' ? 'repeating-linear-gradient(black, black 20px, transparent 20px, transparent 40px)' :
                                   pattern === 'window' ? 'linear-gradient(90deg, transparent 45%, black 45%, black 55%, transparent 55%), linear-gradient(0deg, transparent 45%, black 45%, black 55%, transparent 55%)' :
                                   'radial-gradient(circle, transparent 20%, black 80%)' // Generic approximation for leaves
                    }}
                />
                
                {/* If leaves, add extra SVG noise for realism */}
                {pattern === 'leaves' && (
                     <div className="absolute inset-0 opacity-80 mix-blend-multiply pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaves.png')] bg-cover filter contrast-200"></div>
                )}

                {/* Subject */}
                <div className="relative z-10 w-32 h-40 bg-zinc-200 rounded-full blur-sm opacity-20"></div>
                <div className="relative z-10 text-9xl opacity-80 drop-shadow-2xl">🧍</div>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full">
                 {['none', 'blinds', 'window', 'leaves'].map((p) => (
                     <button 
                        key={p}
                        onClick={() => setPattern(p as any)}
                        className={`py-3 rounded-lg text-sm font-medium capitalize transition-all ${pattern === p ? 'bg-zinc-700 text-white shadow-inner border border-zinc-500' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}
                     >
                         {p}
                     </button>
                 ))}
            </div>
             <p className="text-zinc-500 text-sm text-center mt-2">
                Gobos ("Go-Betweens") are placed in front of lights to cast creative shadows.
            </p>
        </div>
    );
};
