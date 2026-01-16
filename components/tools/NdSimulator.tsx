
import React, { useState, useRef, useEffect } from 'react';
import { Timer, Layers, ArrowRight, MoveHorizontal, Info, Camera, Droplets, Cloud, Wind, Activity } from 'lucide-react';

const SCENES = [
    {
        id: 'waterfall',
        label: 'Waterfall',
        icon: Droplets,
        img: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200', 
        description: 'Smooth out rushing water into a silky texture.'
    },
    {
        id: 'coast',
        label: 'Coastline',
        icon: Wind,
        img: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1200', 
        description: 'Turn crashing waves into an ethereal mist.'
    },
    {
        id: 'clouds',
        label: 'Skyscape',
        icon: Cloud,
        img: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=1200',
        description: 'Capture the movement of clouds over time.'
    },
    {
        id: 'abstract',
        label: 'Abstract',
        icon: Activity,
        img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200', 
        description: 'Create motion blur for abstract architectural shots.'
    }
];

const NdSimulator: React.FC = () => {
    const [activeSceneId, setActiveSceneId] = useState('waterfall');
    const [baseSpeed, setBaseSpeed] = useState(1/250);
    const [stops, setStops] = useState(0); // 0, 3, 6, 10
    const [splitPos, setSplitPos] = useState(50); // 0-100%
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const activeScene = SCENES.find(s => s.id === activeSceneId) || SCENES[0];
    
    // Calculate new speed: base * 2^stops
    const finalSpeed = baseSpeed * Math.pow(2, stops);
    
    const formatSpeed = (s: number) => {
        if (s < 1) {
            const denom = Math.round(1/s);
            return `1/${denom}`;
        }
        return `${s.toFixed(1)}s`;
    }

    const getBlurAmount = () => {
        // Blur logic: correlated to exposure time
        // < 1/60s : Crisp
        // 1/30s - 1s : Slight blur
        // > 1s : Silky
        if (finalSpeed < 1/30) return 0;
        if (finalSpeed < 1) return (finalSpeed * 5); // 0.5s -> 2.5px
        if (finalSpeed < 30) return 5 + (finalSpeed * 0.5); // 10s -> 10px
        return 20; // Cap at 20px
    };

    // Handle Split Slider Drag
    const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        
        let newPos = ((clientX - rect.left) / rect.width) * 100;
        newPos = Math.max(0, Math.min(100, newPos));
        setSplitPos(newPos);
    };

    useEffect(() => {
        const up = () => setIsDragging(false);
        const move = (e: MouseEvent | TouchEvent) => {
            if (isDragging) {
                // Manually create synthetic event structure if needed, or just extract logic
                 if (!containerRef.current) return;
                 const rect = containerRef.current.getBoundingClientRect();
                 const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
                 let newPos = ((clientX - rect.left) / rect.width) * 100;
                 newPos = Math.max(0, Math.min(100, newPos));
                 setSplitPos(newPos);
            }
        };

        if (isDragging) {
            window.addEventListener('mouseup', up);
            window.addEventListener('mousemove', move);
            window.addEventListener('touchend', up);
            window.addEventListener('touchmove', move);
        }

        return () => {
            window.removeEventListener('mouseup', up);
            window.removeEventListener('mousemove', move);
            window.removeEventListener('touchend', up);
            window.removeEventListener('touchmove', move);
        };
    }, [isDragging]);

    return (
        <div className="max-w-7xl mx-auto p-4 animate-slide-up select-none">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">ND Filter Lab</h2>
                <p className="text-zinc-400">Calculate exposure times and visualize long exposure effects.</p>
            </div>

            {/* SCENE SELECTOR */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {SCENES.map(scene => (
                    <button
                        key={scene.id}
                        onClick={() => setActiveSceneId(scene.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${activeSceneId === scene.id ? 'bg-zinc-800 border-blue-500/50 text-white shadow-lg shadow-blue-900/20' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800'}`}
                    >
                        <div className={`p-2 rounded-lg ${activeSceneId === scene.id ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-950 text-zinc-500'}`}>
                            <scene.icon size={18} />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-bold">{scene.label}</div>
                            <div className="text-[10px] opacity-60">Preset</div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-8 mb-8">
                 {/* VISUALIZER */}
                 <div className="flex-1 space-y-4">
                     {/* The Compare View */}
                     <div 
                        ref={containerRef}
                        onMouseDown={() => setIsDragging(true)}
                        onTouchStart={() => setIsDragging(true)}
                        className="aspect-video w-full bg-black rounded-2xl overflow-hidden relative border border-zinc-800 shadow-2xl isolate cursor-ew-resize group"
                     >
                         {/* Layer 1: PROCESSED (Right side, essentially) */}
                         <div className="absolute inset-0">
                            <img 
                                src={activeScene.img} 
                                className="w-full h-full object-cover"
                                style={{ filter: `blur(${getBlurAmount()}px)` }}
                            />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/10">
                                {formatSpeed(finalSpeed)} Exposure
                            </div>
                         </div>

                         {/* Layer 2: ORIGINAL (Left side, clipped) */}
                         <div 
                            className="absolute inset-0 overflow-hidden border-r-2 border-white/50 shadow-[5px_0_20px_rgba(0,0,0,0.5)]"
                            style={{ width: `${splitPos}%` }}
                         >
                            <img 
                                src={activeScene.img} 
                                className="absolute top-0 left-0 max-w-none h-full"
                                style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }} // Hacky responsive fix, usually simpler with object-cover but keeping alignment is key
                            />
                            {/* Force width to match container width to keep alignment perfect */}
                             <div className="absolute inset-0">
                                 {/* We use a background image approach for perfect alignment usually, but let's try to fix the img tag above */}
                                 {/* Actually, setting background-image is safer for alignment */}
                                 <div 
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${activeScene.img})` }}
                                 />
                             </div>
                             
                             <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/10">
                                {formatSpeed(baseSpeed)} (No Filter)
                             </div>
                         </div>

                         {/* Slider Handle */}
                         <div 
                            className="absolute top-0 bottom-0 w-10 -ml-5 flex items-center justify-center pointer-events-none"
                            style={{ left: `${splitPos}%` }}
                         >
                             <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-zinc-900 transform group-hover:scale-110 transition-transform">
                                <MoveHorizontal size={16} />
                             </div>
                         </div>

                         {/* Label Overlay (Bottom) */}
                         <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between text-xs text-zinc-300 pointer-events-none">
                             <span>Frozen (Fast Shutter)</span>
                             <span>Motion Blur (Slow Shutter)</span>
                         </div>
                     </div>
                     
                     <div className="flex gap-2 items-start bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl">
                        <Info className="text-blue-400 shrink-0 mt-0.5" size={16} />
                        <p className="text-sm text-blue-200/80 leading-relaxed">
                            <strong>Why use ND?</strong> In bright light, you can't use a slow shutter speed (like {formatSpeed(finalSpeed)}) without overexposing the image to white. The ND filter acts like "sunglasses" for your lens, blocking light so you can extend the exposure time to capture motion blur without blowing out the highlights.
                        </p>
                     </div>
                 </div>

                 {/* CONTROLS */}
                 <div className="w-full lg:w-96 flex flex-col gap-6">
                      
                      {/* Base Settings */}
                      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                              <Camera size={14} /> Base Exposure
                          </h3>
                          
                          <label className="text-zinc-400 text-xs font-bold uppercase mb-2 block">Shutter Speed (Metered)</label>
                          <select 
                            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg p-3 outline-none focus:border-blue-500 transition-colors"
                            onChange={(e) => setBaseSpeed(parseFloat(e.target.value))}
                            value={baseSpeed}
                          >
                              <option value={1/4000}>1/4000</option>
                              <option value={1/1000}>1/1000</option>
                              <option value={1/500}>1/500</option>
                              <option value={1/250}>1/250</option>
                              <option value={1/125}>1/125</option>
                              <option value={1/60}>1/60</option>
                              <option value={1/30}>1/30</option>
                          </select>
                          <p className="text-[10px] text-zinc-500 mt-2">
                              This is the speed required for a correct exposure <strong>without</strong> any filter.
                          </p>
                      </div>

                      {/* Filter Selection */}
                      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                              <Layers size={14} /> ND Filter Strength
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-3">
                              {[0, 3, 6, 10].map(s => (
                                  <button
                                    key={s}
                                    onClick={() => setStops(s)}
                                    className={`relative p-4 rounded-xl text-sm font-bold transition-all border flex flex-col items-center gap-2 ${stops === s ? 'bg-zinc-800 border-emerald-500 text-white ring-1 ring-emerald-500/50' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
                                  >
                                      {/* Visual representation of density */}
                                      <div 
                                        className="w-8 h-8 rounded-full border border-zinc-600 shadow-inner"
                                        style={{ backgroundColor: `rgba(0,0,0,${s === 0 ? 0 : 0.1 + (s/12)})` }}
                                      ></div>
                                      <span>{s === 0 ? 'No Filter' : `${s} Stops`}</span>
                                      <span className="text-[10px] font-normal opacity-60">
                                          {s === 0 ? '1x Light' : `1/${Math.pow(2, s)} Light`}
                                      </span>
                                  </button>
                              ))}
                          </div>
                      </div>

                      {/* Calculation Result */}
                      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-700 mt-auto shadow-xl">
                          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                              <Timer size={14} /> New Shutter Speed
                          </h3>
                          <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-bold text-white tracking-tight">{formatSpeed(finalSpeed)}</span>
                          </div>
                          
                          <div className="w-full h-px bg-zinc-700 my-4"></div>
                          
                          <div className="flex justify-between items-center text-xs">
                              <span className="text-zinc-500">Light Reduction</span>
                              <span className="text-emerald-400 font-mono">{stops} EV ({Math.pow(2, stops)}x darker)</span>
                          </div>
                          <div className="flex justify-between items-center text-xs mt-2">
                              <span className="text-zinc-500">Time Multiplier</span>
                              <span className="text-emerald-400 font-mono">{Math.pow(2, stops)}x longer</span>
                          </div>
                      </div>

                 </div>
            </div>
        </div>
    );
}

export default NdSimulator;
