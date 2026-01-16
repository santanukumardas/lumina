
import React, { useState } from 'react';
import { Camera, Zap, Target, Users, Sparkles } from 'lucide-react';

// --- APERTURE SIMULATION ---
export const ApertureSim: React.FC = () => {
  const [fStop, setFStop] = useState(2.8);
  const [scene, setScene] = useState<'portrait' | 'bokeh'>('portrait');
  const fStops = [1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 11, 16];
  
  const blurAmount = (1.4 / fStop) * 10; 

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
       {/* Scene Toggle */}
       <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
            <button 
                onClick={() => setScene('portrait')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${scene === 'portrait' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Portrait (Depth)
            </button>
            <button 
                onClick={() => setScene('bokeh')} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${scene === 'bokeh' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                Night (Bokeh)
            </button>
        </div>

      <div className="relative w-full aspect-[4/3] md:h-[50vh] md:aspect-auto bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center shadow-inner group">
        
        {scene === 'portrait' ? (
            <>
                {/* Portrait Scene: Blur background based on f-stop */}
                <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
                style={{ 
                    backgroundImage: 'url(https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=60&w=800&auto=format&fit=crop)',
                    filter: `blur(${blurAmount}px) brightness(0.6)`
                }}
                />
                <div className="relative z-10 w-32 h-32 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                    <Camera className="w-12 h-12 text-white drop-shadow-md" />
                </div>
            </>
        ) : (
             <>
                 {/* Night Scene: Simulate Bokeh Balls */}
                 <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out"
                    style={{ 
                        backgroundImage: 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba?q=60&w=600&auto=format&fit=crop)',
                        filter: `brightness(0.5) blur(${fStop > 8 ? 0 : 2}px)`
                    }}
                />
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex gap-6 items-center">
                           {[1,2,3].map(i => (
                               <div 
                                    key={i}
                                    className="bg-amber-100 rounded-full mix-blend-screen transition-all duration-500 shadow-[0_0_20px_rgba(255,200,0,0.6)] backdrop-blur-sm"
                                    style={{
                                        width: `${Math.max(10, 120 / fStop)}px`,
                                        height: `${Math.max(10, 120 / fStop)}px`,
                                        opacity: Math.min(0.9, 0.4 + (1.4/fStop))
                                    }}
                               />
                           ))}
                      </div>
                 </div>
             </>
        )}

        {/* Physical Aperture Indicator Overlay */}
        <div className="absolute bottom-4 right-4 w-16 h-16 pointer-events-none opacity-80 z-20">
            <div className="w-full h-full rounded-full border-4 border-zinc-400 bg-black/60 backdrop-blur-sm relative flex items-center justify-center">
                 <div 
                        className="bg-white rounded-full transition-all duration-500 shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]"
                        style={{ 
                            width: `${12 * (1.4/fStop)}px`, 
                            height: `${12 * (1.4/fStop)}px`
                        }}
                    />
            </div>
         </div>
      </div>
      
      <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
          <span>Wide Open (f/1.4)</span>
          <span>Closed (f/16)</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="7" 
          step="1"
          value={fStops.indexOf(fStop)} 
          onChange={(e) => setFStop(fStops[parseInt(e.target.value)])}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-emerald-400 transition-colors"
        />
        <div className="mt-4 text-center">
            <span className="text-3xl font-bold text-white tracking-tighter">f/{fStop}</span>
            <p className="text-zinc-500 text-sm mt-1">
                {scene === 'portrait' 
                    ? (fStop < 4 ? "Shallow depth of field isolates the subject." : "Deep depth of field keeps everything in focus.")
                    : (fStop < 4 ? "Large, creamy bokeh circles in out-of-focus areas." : "Small, defined light points.")
                }
            </p>
        </div>
      </div>
    </div>
  );
};

// --- SHUTTER SPEED SIMULATION ---
export const ShutterSim: React.FC = () => {
  const [speedIndex, setSpeedIndex] = useState(2); 
  const [scene, setScene] = useState<'car' | 'water'>('car');
  const speeds = ['1/2', '1/15', '1/60', '1/250', '1/1000'];
  const blurValues = [12, 6, 2, 0, 0]; 

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
        {/* Toggle */}
        <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
            <button onClick={() => setScene('car')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${scene === 'car' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>Action Pan</button>
            <button onClick={() => setScene('water')} className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${scene === 'water' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>Water Flow</button>
        </div>

      <div className="relative w-full aspect-[4/3] md:h-[40vh] md:aspect-auto bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-inner flex items-center justify-center">
        {scene === 'car' ? (
             <>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(255,255,255,0.1)_50%,transparent_51%)] bg-[length:100px_100%]"></div>
                <div className="w-full overflow-hidden relative h-full flex items-center">
                    <div 
                        className="absolute left-0 animate-drive flex items-center justify-center"
                        style={{ animationDuration: '3s' }}
                    >
                        <div className="relative">
                            <div 
                                className="absolute right-0 top-0 bottom-0 bg-amber-500/50 rounded-lg"
                                style={{
                                    width: blurValues[speedIndex] * 10 + 'px',
                                    filter: `blur(${blurValues[speedIndex]}px)`,
                                    opacity: speedIndex < 2 ? 0.8 : 0,
                                    transform: 'translateX(50%)'
                                }}
                            />
                            <div 
                                className="w-32 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-xl flex items-center justify-center relative z-10"
                                style={{ filter: `blur(${blurValues[speedIndex] / 2}px)` }}
                            >
                                <Zap className="text-white w-8 h-8" fill="white" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 text-xs text-zinc-600 font-mono">
                    PANNING MODE
                </div>
             </>
        ) : (
            // Water Scene
             <div className="w-full h-full relative group">
                 <img 
                    src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=60&w=800&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Water base"
                 />
                 {/* Overlay to simulate water smoothing (Gaussian Blur on duplicate layer) */}
                 <div 
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                    style={{ 
                        backgroundImage: 'url(https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=60&w=800&auto=format&fit=crop)',
                        filter: `blur(${Math.max(0, (2 - speedIndex) * 4)}px)`, // Blur more at low speeds
                        opacity: speedIndex < 3 ? 0.9 : 0 
                    }}
                 ></div>
                 {/* White mist overlay for very slow speed (silky effect) */}
                  <div 
                    className="absolute inset-0 bg-white/10 mix-blend-screen transition-opacity duration-300"
                    style={{ opacity: speedIndex === 0 ? 0.4 : 0 }}
                 ></div>
                 
                 <div className="absolute bottom-4 right-4 text-xs text-white/80 font-mono drop-shadow-md">
                    TRIPOD MODE
                </div>
             </div>
        )}
      </div>

      <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
          <span>Slow (Long Exp)</span>
          <span>Fast (Freeze)</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="4" 
          step="1"
          value={speedIndex} 
          onChange={(e) => setSpeedIndex(parseInt(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-amber-400 transition-colors"
        />
        <div className="mt-4 text-center">
            <span className="text-3xl font-bold text-white tracking-tighter">{speeds[speedIndex]}s</span>
            <p className="text-zinc-500 text-sm mt-1">
                {scene === 'car' 
                    ? (speedIndex < 2 ? "Slow shutter blurs moving objects." : "Fast shutter freezes the action.") 
                    : (speedIndex < 2 ? "Long exposure creates silky, smooth water." : "Fast shutter freezes every droplet.")
                }
            </p>
        </div>
      </div>
    </div>
  );
};

// --- ISO SIMULATION ---
export const IsoSim: React.FC = () => {
  const [isoIndex, setIsoIndex] = useState(0);
  const isos = [100, 400, 1600, 3200, 6400, 12800];
  const noiseOpacity = 0.05 + (isoIndex / (isos.length - 1)) * 0.7;
  const brightness = 1 + (isoIndex * 0.1); 

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
      <div className="relative w-full aspect-[4/3] md:h-[50vh] md:aspect-auto bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
        <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-300"
            style={{ 
                // Better night scene for ISO visualization
                backgroundImage: 'url(https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=60&w=800&auto=format&fit=crop)',
                filter: `brightness(${brightness * 0.4}) contrast(1.1)` 
            }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-0 pointer-events-none" style={{ opacity: noiseOpacity }}>
            <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
         <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
          <span>Low Noise (Clean)</span>
          <span>High Noise (Grainy)</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="5" 
          step="1"
          value={isoIndex} 
          onChange={(e) => setIsoIndex(parseInt(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-blue-400 transition-colors"
        />
        <div className="mt-4 text-center">
            <span className="text-3xl font-bold text-white tracking-tighter">ISO {isos[isoIndex]}</span>
            <p className="text-zinc-500 text-sm mt-1">
                {isoIndex < 2 ? "Best quality. Requires good light." : "Visible digital noise. Good for low light."}
            </p>
        </div>
      </div>
    </div>
  );
};

// --- METERING SIMULATION ---
export const MeteringSim: React.FC = () => {
    const [mode, setMode] = useState<'matrix' | 'spot-shadow' | 'spot-highlight'>('matrix');

    // Values for brightness
    const getExposure = () => {
        switch(mode) {
            case 'matrix': return { brightness: 1, contrast: 1, text: "Balanced scene." };
            case 'spot-shadow': return { brightness: 2, contrast: 0.8, text: "Shadows exposed. Highlights blown out." }; // Expose for shadows -> Brighter
            case 'spot-highlight': return { brightness: 0.4, contrast: 1.2, text: "Highlights exposed. Shadows crushed." }; // Expose for highlights -> Darker
        }
    };

    const exp = getExposure();

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full aspect-[4/3] md:h-[50vh] md:aspect-auto bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
                {/* High Contrast Scene */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
                    style={{ 
                        backgroundImage: 'url(https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=70&w=800&auto=format&fit=crop)',
                        filter: `brightness(${exp.brightness}) contrast(${exp.contrast})`
                    }}
                />
                
                {/* Metering Target Indicators */}
                <div className="absolute inset-0 pointer-events-none">
                     {/* Center / Matrix */}
                     {mode === 'matrix' && (
                         <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-48 h-32 md:w-64 md:h-48 border-2 border-white/30 rounded-lg flex items-center justify-center">
                                 <div className="w-full h-px bg-white/30"></div>
                                 <div className="h-full w-px bg-white/30 absolute"></div>
                             </div>
                         </div>
                     )}
                     
                     {/* Spot Highlight (Sun/Sky) */}
                     {mode === 'spot-highlight' && (
                         <div className="absolute top-10 right-20">
                             <Target className="text-red-500 animate-pulse" size={32} />
                         </div>
                     )}

                     {/* Spot Shadow (Ground) */}
                     {mode === 'spot-shadow' && (
                         <div className="absolute bottom-10 left-20">
                             <Target className="text-green-500 animate-pulse" size={32} />
                         </div>
                     )}
                </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col items-center gap-4">
                 <div className="flex gap-2 w-full">
                     <button 
                        onClick={() => setMode('matrix')}
                        className={`flex-1 py-3 rounded-lg text-xs md:text-sm font-medium transition-all ${mode === 'matrix' ? 'bg-zinc-700 text-white shadow-inner' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}
                     >
                         Matrix
                     </button>
                     <button 
                        onClick={() => setMode('spot-shadow')}
                        className={`flex-1 py-3 rounded-lg text-xs md:text-sm font-medium transition-all ${mode === 'spot-shadow' ? 'bg-zinc-700 text-white shadow-inner' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}
                     >
                         Spot (Shadow)
                     </button>
                     <button 
                        onClick={() => setMode('spot-highlight')}
                        className={`flex-1 py-3 rounded-lg text-xs md:text-sm font-medium transition-all ${mode === 'spot-highlight' ? 'bg-zinc-700 text-white shadow-inner' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}
                     >
                         Spot (High)
                     </button>
                 </div>
                 <p className="text-zinc-400 text-sm mt-2">{exp.text}</p>
            </div>
        </div>
    );
};

// --- FOCAL LENGTH SIMULATION ---
export const FocalLengthSim: React.FC = () => {
    const [focalLen, setFocalLen] = useState(0); // 0 = 24mm, 100 = 200mm
    const mm = 24 + (focalLen * 1.76); 
    
    // Simulate "Dolly Zoom" or compression
    // Subject size stays relative, background scales up
    const bgScale = 1 + (focalLen / 50); 
    
    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full aspect-[4/3] md:h-[50vh] md:aspect-auto bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center">
                {/* Background (scales up to show compression) */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-100 origin-center"
                    style={{ 
                        backgroundImage: 'url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=60&w=600&auto=format&fit=crop)',
                        transform: `scale(${bgScale})`
                    }}
                />
                
                {/* Subject (Stays roughly same size to simulate moving back while zooming in) */}
                <div className="relative z-10 w-24 h-40 bg-zinc-800/80 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center shadow-2xl">
                    <Users size={48} className="text-white drop-shadow-lg" />
                </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
                    <span>24mm (Wide)</span>
                    <span>200mm (Tele)</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="1"
                    value={focalLen} 
                    onChange={(e) => setFocalLen(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-blue-500 transition-colors"
                />
                <div className="mt-4 text-center">
                    <span className="text-3xl font-bold text-white tracking-tighter">{Math.round(mm)}mm</span>
                    <p className="text-zinc-500 text-sm mt-1">
                        High focal lengths compress the background, making it appear closer and larger.
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- SENSOR SIZE SIMULATION ---
export const SensorSizeSim: React.FC = () => {
    const [sensor, setSensor] = useState<'ff' | 'apsc' | 'm43'>('ff');

    const getCrop = () => {
        switch(sensor) {
            case 'ff': return { scale: 1, label: 'Full Frame (1x)' };
            case 'apsc': return { scale: 1.5, label: 'APS-C (1.5x Crop)' };
            case 'm43': return { scale: 2, label: 'Micro 4/3 (2x Crop)' };
        }
    }

    const { scale, label } = getCrop();

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full aspect-[4/3] md:h-[50vh] md:aspect-auto bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                {/* Full Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 grayscale"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=60&w=600&auto=format&fit=crop)' }}
                />

                {/* Cropped Area */}
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden border-2 border-yellow-400 shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-500"
                    style={{ 
                        width: `${100 / scale}%`, 
                        height: `${100 / scale}%`,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=60&w=600&auto=format&fit=crop)',
                        backgroundSize: `${scale * 100}% ${scale * 100}%`,
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-yellow-400 text-xs font-bold rounded">{label}</div>
                </div>
            </div>

            <div className="flex gap-2 w-full max-w-lg">
                     <button 
                        onClick={() => setSensor('ff')}
                        className={`flex-1 py-3 rounded-lg text-xs md:text-sm font-medium transition-all ${sensor === 'ff' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                     >
                         Full Frame
                     </button>
                     <button 
                        onClick={() => setSensor('apsc')}
                        className={`flex-1 py-3 rounded-lg text-xs md:text-sm font-medium transition-all ${sensor === 'apsc' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                     >
                         APS-C
                     </button>
                     <button 
                        onClick={() => setSensor('m43')}
                        className={`flex-1 py-3 rounded-lg text-xs md:text-sm font-medium transition-all ${sensor === 'm43' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                     >
                         Micro 4/3
                     </button>
            </div>
             <p className="text-zinc-500 text-sm text-center">
                Smaller sensors "crop" the image, effectively zooming in on the center of the lens projection.
            </p>
        </div>
    );
};

// --- FOCUS PEAKING SIMULATION ---
export const FocusPeakingSim: React.FC = () => {
    const [focusDist, setFocusDist] = useState(50); // 0 = close, 100 = far

    // 0-33: Flower, 34-66: Person, 67-100: Mountain
    const getActivePlane = () => {
        if (focusDist < 33) return 'foreground';
        if (focusDist < 66) return 'midground';
        return 'background';
    }

    const plane = getActivePlane();

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full aspect-[4/3] md:h-[50vh] md:aspect-auto bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-end justify-center">
                {/* Background (Mountain) */}
                <div 
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${plane === 'background' ? 'blur-0' : 'blur-sm'}`}
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=60&w=800&auto=format&fit=crop)' }}
                >
                    {plane === 'background' && <div className="absolute inset-0 border-t-4 border-red-500/50 mix-blend-screen opacity-50" />}
                </div>

                {/* Midground (Person) */}
                <div className={`absolute bottom-0 left-1/3 transition-all duration-300 ${plane === 'midground' ? 'scale-100 blur-0' : 'scale-95 blur-sm brightness-75'}`}>
                    <Users size={120} className="text-zinc-300 drop-shadow-lg" />
                    {plane === 'midground' && (
                        <div className="absolute inset-0 border-2 border-red-500 rounded-lg opacity-60 animate-pulse mix-blend-screen"></div>
                    )}
                </div>

                {/* Foreground (Flower) */}
                <div className={`absolute bottom-4 right-10 transition-all duration-300 ${plane === 'foreground' ? 'scale-110 blur-0' : 'scale-90 blur-md brightness-75'}`}>
                    <Sparkles size={80} className="text-yellow-400 drop-shadow-lg" />
                    {plane === 'foreground' && (
                         <div className="absolute inset-0 border-2 border-red-500 rounded-full opacity-60 animate-pulse mix-blend-screen"></div>
                    )}
                </div>

                {/* Peaking UI Overlay */}
                <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded text-red-500 font-mono text-xs font-bold border border-red-500/30">
                    PEAKING: ON
                </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
                    <span>Macro (Close)</span>
                    <span>Infinity (Far)</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="1"
                    value={focusDist} 
                    onChange={(e) => setFocusDist(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-red-500 transition-colors"
                />
                 <div className="mt-4 text-center">
                    <p className="text-zinc-500 text-sm mt-1">
                        Focus peaking highlights high-contrast edges in red to assist with manual focusing.
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- DYNAMIC RANGE SIMULATION ---
export const DynamicRangeSim: React.FC = () => {
    const [drMode, setDrMode] = useState<'low' | 'high'>('low');

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full aspect-[4/3] md:h-[50vh] md:aspect-auto bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center">
                {/* Base Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                    style={{ 
                        backgroundImage: 'url(https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=60&w=800&auto=format&fit=crop)',
                        filter: drMode === 'low' ? 'contrast(2.0) brightness(0.9)' : 'contrast(1.0) brightness(1.0)'
                    }}
                />
                
                {/* Visualizing Clipping */}
                {drMode === 'low' && (
                    <>
                        <div className="absolute top-10 right-10 text-xs text-red-500 font-bold bg-black/50 px-2 rounded">HIGHLIGHTS CLIPPED</div>
                        <div className="absolute bottom-10 left-10 text-xs text-blue-500 font-bold bg-black/50 px-2 rounded">SHADOWS CRUSHED</div>
                    </>
                )}
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col md:flex-row gap-4">
                 <button 
                    onClick={() => setDrMode('low')}
                    className={`flex-1 py-4 rounded-lg text-sm font-medium transition-all ${drMode === 'low' ? 'bg-zinc-700 text-white shadow-inner' : 'bg-zinc-800 text-zinc-400'}`}
                 >
                     Low Dynamic Range (JPEG)
                 </button>
                 <button 
                    onClick={() => setDrMode('high')}
                    className={`flex-1 py-4 rounded-lg text-sm font-medium transition-all ${drMode === 'high' ? 'bg-zinc-700 text-white shadow-inner' : 'bg-zinc-800 text-zinc-400'}`}
                 >
                     High Dynamic Range (RAW)
                 </button>
            </div>
             <p className="text-zinc-500 text-sm text-center">
                High dynamic range retains details in both the brightest highlights and darkest shadows.
            </p>
        </div>
    );
};

// --- HISTOGRAM SIMULATION ---
export const HistogramSim: React.FC = () => {
  const [exposure, setExposure] = useState(50);
  
  // Generate dummy histogram bars that shift based on exposure
  const bars = Array.from({ length: 30 }, (_, i) => {
    // Create a bell curve shape
    const x = i;
    // Peak shifts with exposure (0-30 range)
    const peak = (exposure / 100) * 30;
    const dist = Math.abs(x - peak);
    // Height formula
    let height = Math.max(5, 100 - (dist * dist * 2));
    // Add some randomness
    height += Math.random() * 20;
    return Math.min(100, Math.max(5, height));
  });

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
      <div className="relative w-full aspect-[4/3] md:h-[50vh] md:aspect-auto bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col">
        {/* Preview Image */}
        <div 
          className="flex-1 bg-cover bg-center transition-all duration-100"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=60&w=600&auto=format&fit=crop)',
            filter: `brightness(${exposure * 0.02})`
          }}
        />
        
        {/* Histogram Overlay */}
        <div className="absolute top-4 right-4 w-32 h-24 md:w-48 md:h-32 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 p-2 flex items-end justify-between gap-0.5 shadow-lg">
           {bars.map((h, i) => (
             <div 
                key={i} 
                className="w-full bg-white/80 rounded-t-sm transition-all duration-200"
                style={{ height: `${h}%` }}
             />
           ))}
        </div>
        <div className="absolute top-4 right-4 w-32 h-24 md:w-48 md:h-32 flex items-center justify-center pointer-events-none">
             {exposure < 20 && <span className="text-xs text-blue-300 font-bold bg-black/50 px-1">Underexposed</span>}
             {exposure > 80 && <span className="text-xs text-red-300 font-bold bg-black/50 px-1">Overexposed</span>}
        </div>
      </div>

      <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
          <span>Dark (Shadows)</span>
          <span>Bright (Highlights)</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          step="1"
          value={exposure} 
          onChange={(e) => setExposure(parseInt(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-purple-400 transition-colors"
        />
        <div className="mt-4 text-center">
            <span className="text-3xl font-bold text-white tracking-tighter">Exposure Value</span>
            <p className="text-zinc-500 text-sm mt-1">
                Keep the graph hill in the center for a balanced exposure.
            </p>
        </div>
      </div>
    </div>
  );
};