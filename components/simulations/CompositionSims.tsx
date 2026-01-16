
import React, { useState } from 'react';
import { Grid, Crop } from 'lucide-react';

// --- RULE OF THIRDS SIMULATION ---
export const ThirdsSim: React.FC = () => {
  const [showGrid, setShowGrid] = useState(true);
  
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
      <div className="relative w-full aspect-[4/3] max-h-[50vh] mx-auto bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl group cursor-crosshair">
        {/* Image where subject is on the right vertical third line */}
        <img 
            src="https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=70&w=800&auto=format&fit=crop"
            alt="Rule of Thirds" 
            className="absolute inset-0 w-full h-full object-cover"
        />

        <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${showGrid ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-1/3 left-0 w-full h-px bg-white/70 shadow-sm"></div>
            <div className="absolute top-2/3 left-0 w-full h-px bg-white/70 shadow-sm"></div>
            <div className="absolute left-1/3 top-0 h-full w-px bg-white/70 shadow-sm"></div>
            <div className="absolute left-2/3 top-0 h-full w-px bg-white/70 shadow-sm"></div>
            
            {/* Highlight intersections */}
            <div className="absolute top-1/3 left-2/3 w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-emerald-400 bg-emerald-400/20 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
            onClick={() => setShowGrid(!showGrid)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${showGrid ? 'bg-white text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
        >
            <Grid size={18} />
            {showGrid ? 'Hide Grid' : 'Show Grid'}
        </button>
      </div>
    </div>
  );
};

// --- SYMMETRY SIMULATION ---
export const SymmetrySim: React.FC = () => {
    const [mode, setMode] = useState<'natural' | 'guide'>('natural');
    
    return (
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
        <div className="relative w-full aspect-[4/3] max-h-[50vh] mx-auto bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex justify-center">
             {/* Symmetrical Architecture Image */}
             <img 
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=70&w=800&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Symmetrical Building"
             />

             {/* Center Guide Line */}
             <div className={`absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_10px_cyan] transition-all duration-500 z-10 ${mode === 'guide' ? 'opacity-100 h-full' : 'opacity-0 h-0'}`} />
             
             {/* Grid Overlay for Guide Mode */}
             <div className={`absolute inset-0 grid grid-cols-2 pointer-events-none transition-opacity duration-500 ${mode === 'guide' ? 'opacity-100' : 'opacity-0'}`}>
                 <div className="border-r border-cyan-400/30 bg-cyan-400/5"></div>
                 <div className="bg-cyan-400/5"></div>
             </div>
        </div>
  
        <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex items-center justify-center gap-4">
            <button 
                onClick={() => setMode('natural')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'natural' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400'}`}
            >
                Natural View
            </button>
            <button 
                onClick={() => setMode('guide')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'guide' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' : 'bg-zinc-800 text-zinc-400'}`}
            >
                Check Alignment
            </button>
        </div>
      </div>
    );
};

// --- GOLDEN RATIO SIMULATION ---
export const GoldenRatioSim: React.FC = () => {
    const [showSpiral, setShowSpiral] = useState(true);

    return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
      <div className="relative w-full aspect-[1.618/1] max-h-[50vh] mx-auto bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl">
        <img 
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=70&w=800&auto=format&fit=crop"
            alt="Golden Ratio" 
            className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${showSpiral ? 'opacity-100' : 'opacity-0'}`}>
             <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                <path d="M100,0 v100 h-100 v-61.8 h61.8 v61.8 h-38.2 v-38.2 h38.2" fill="none" stroke="rgba(255,215,0,0.6)" strokeWidth="0.5" />
                <path d="M100,0 A100,100 0 0 1 0,100 A61.8,61.8 0 0 1 61.8,38.2 A38.2,38.2 0 0 1 23.6,76.4" fill="none" stroke="gold" strokeWidth="1" />
            </svg>
        </div>
      </div>
       <button 
            onClick={() => setShowSpiral(!showSpiral)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${showSpiral ? 'bg-yellow-500 text-black' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
        >
            {showSpiral ? 'Hide Phi Grid' : 'Show Phi Grid'}
        </button>
    </div>
    );
};

// --- FRAMING SIMULATION ---
export const FramingSim: React.FC = () => {
    const [hasFrame, setHasFrame] = useState(false);

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full aspect-[4/3] max-h-[50vh] mx-auto bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                {/* Subject */}
                <img 
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=70&w=800&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                    style={{ transform: hasFrame ? 'scale(1.1)' : 'scale(1)' }}
                    alt="Mountain Landscape"
                />

                {/* Foreground Frame (Overlay) */}
                <div 
                    className={`absolute inset-0 pointer-events-none transition-all duration-700 ease-in-out ${hasFrame ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                    style={{
                        backgroundImage: 'radial-gradient(circle, transparent 40%, #000 150%)',
                    }}
                >
                    <div className="absolute top-0 left-0 w-32 h-32 bg-zinc-900 blur-xl rounded-br-full opacity-80"></div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-zinc-900 blur-2xl rounded-bl-full opacity-80"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-24 bg-zinc-900 blur-xl rounded-tl-full opacity-60"></div>
                     <div className="absolute bottom-0 left-0 w-24 h-64 bg-zinc-900 blur-xl rounded-tr-full opacity-60"></div>
                </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex justify-between items-center">
                 <span className="text-zinc-500 text-sm">Flat Image</span>
                 <button 
                    onClick={() => setHasFrame(!hasFrame)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${hasFrame ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-white'}`}
                 >
                     <Crop size={16} className="inline mr-2" />
                     {hasFrame ? 'Frame Removed' : 'Add Natural Frame'}
                 </button>
                 <span className="text-zinc-500 text-sm">Depth Added</span>
            </div>
        </div>
    );
};

// --- NEGATIVE SPACE SIMULATION ---
export const NegativeSpaceSim: React.FC = () => {
    const [scale, setScale] = useState(1);

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full aspect-[4/3] max-h-[50vh] mx-auto bg-blue-300 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center transition-colors duration-500"
                 style={{ backgroundColor: '#87CEEB' }}>
                 
                 {/* Background Elements (Clouds) */}
                 <div className="absolute top-10 right-20 w-32 h-12 bg-white/40 blur-xl rounded-full"></div>
                 <div className="absolute bottom-20 left-10 w-48 h-16 bg-white/30 blur-2xl rounded-full"></div>

                 {/* Subject (Balloon) */}
                 <div 
                    className="relative transition-all duration-500 ease-out drop-shadow-2xl"
                    style={{ transform: `scale(${scale})` }}
                 >
                     <div className="text-6xl">🎈</div>
                 </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
                    <span>Small Subject (Vast Space)</span>
                    <span>Tight Crop (Crowded)</span>
                </div>
                <input 
                    type="range" 
                    min="0.5" 
                    max="3" 
                    step="0.1"
                    value={scale} 
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-sky-400 transition-colors"
                />
                 <div className="mt-4 text-center">
                    <p className="text-zinc-500 text-sm mt-1">
                        {scale < 1.5 ? "Negative space emphasizes isolation and scale." : "Zooming in removes context and mystery."}
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- BALANCE (VISUAL WEIGHT) SIMULATION ---
export const BalanceSim: React.FC = () => {
    const [balance, setBalance] = useState(50); // 0=Left Heavy, 50=Balanced, 100=Right Heavy
    
    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-200 rounded-2xl overflow-hidden border border-zinc-300 shadow-2xl flex items-end justify-center pb-12">
                {/* The Scales Base */}
                <div className="absolute bottom-0 w-4 h-16 bg-zinc-800"></div>
                
                {/* The Seesaw */}
                <div 
                    className="w-3/4 h-2 bg-zinc-800 relative transition-transform duration-300 ease-out flex justify-between items-end px-4"
                    style={{ transform: `rotate(${(balance - 50) / 2}deg)` }}
                >
                     {/* Pivot */}
                     <div className="absolute left-1/2 bottom-[-10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-zinc-800 -translate-x-1/2"></div>
                     
                     {/* Left Weight: Small Dark Circle */}
                     <div className="w-16 h-16 rounded-full bg-black shadow-lg mb-2 flex items-center justify-center text-white text-xs font-bold">
                         Heavy
                     </div>
                     
                     {/* Right Weight: Large Light Square */}
                     <div className="w-32 h-32 rounded-lg bg-zinc-400/50 border-4 border-zinc-400 shadow-lg mb-2 flex items-center justify-center text-zinc-600 text-xs font-bold">
                         Light
                     </div>
                </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
                    <span>Left Heavy</span>
                    <span>Balanced</span>
                    <span>Right Heavy</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="1"
                    value={balance} 
                    onChange={(e) => setBalance(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-500 transition-colors"
                />
                 <div className="mt-4 text-center">
                    <p className="text-zinc-500 text-sm mt-1">
                        A small dark object can have the same "visual weight" as a large light object.
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- DUTCH ANGLE SIMULATION ---
export const DutchAngleSim: React.FC = () => {
    const [angle, setAngle] = useState(0);
    const [showGrid, setShowGrid] = useState(true);

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 origin-center"
                    style={{ 
                        backgroundImage: 'url(https://images.unsplash.com/photo-1480796927426-f609979314bd?q=70&w=800&auto=format&fit=crop)', // Reliable urban image
                        transform: `scale(1.3) rotate(${angle}deg)` // Scale up to cover corners
                    }}
                />
                
                {/* Static Grid to emphasize the tilt of the subject */}
                 <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${showGrid ? 'opacity-50' : 'opacity-0'}`}>
                    {/* Horizontal Horizon Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500/50 shadow-[0_0_4px_rgba(255,0,0,0.8)]"></div>
                     <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white/20"></div>
                 </div>

                <div className="absolute bottom-6 left-6 text-white font-bold text-4xl drop-shadow-lg opacity-80 mix-blend-overlay">
                    {angle !== 0 ? 'DYNAMIC' : 'STATIC'}
                </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                     <div className="flex justify-between w-full text-sm font-medium text-zinc-400">
                        <span>-25°</span>
                        <span>0°</span>
                        <span>+25°</span>
                    </div>
                </div>
                
                <input 
                    type="range" 
                    min="-25" 
                    max="25" 
                    step="1"
                    value={angle} 
                    onChange={(e) => setAngle(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-red-500 transition-colors"
                />
                 <div className="mt-6 flex justify-center gap-4 items-center">
                     <button onClick={() => setAngle(0)} className="px-4 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700">Reset</button>
                     <button onClick={() => setShowGrid(!showGrid)} className="px-4 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700">{showGrid ? 'Hide Horizon' : 'Show Horizon'}</button>
                 </div>
                 <div className="mt-4 text-center">
                    <p className="text-zinc-500 text-sm mt-1">
                        Tilting the camera creates kinetic energy and psychological tension.
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- KEYSTONING SIMULATION ---
export const KeystoningSim: React.FC = () => {
    const [tilt, setTilt] = useState(0); // 0 to 100 correction

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center perspective-[1000px]">
                {/* Image Container with Perspective Transform */}
                <div 
                    className="relative w-full h-full transition-transform duration-500 ease-out origin-bottom"
                    style={{ 
                        backgroundImage: 'url(https://images.unsplash.com/photo-1486718448742-163732cd1544?q=70&w=800&auto=format&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: `rotateX(${20 - (tilt * 0.2)}deg) scale(${1 + (tilt * 0.002)})`
                    }}
                >
                    {/* Grid Overlay to show alignment */}
                    <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-40">
                         <div className="border-r border-red-500/50"></div>
                         <div className="border-r border-red-500/50"></div>
                         <div className="border-r border-red-500/50"></div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
                    <span>Distorted (Looking Up)</span>
                    <span>Corrected (Parallel)</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="1"
                    value={tilt} 
                    onChange={(e) => setTilt(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-emerald-500 transition-colors"
                />
                 <div className="mt-4 text-center">
                    <p className="text-zinc-500 text-sm mt-1">
                        Keystoning occurs when you tilt the camera up. Use perspective control to make vertical lines parallel.
                    </p>
                </div>
            </div>
        </div>
    );
};
