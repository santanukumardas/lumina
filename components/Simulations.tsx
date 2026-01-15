
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Sun, Moon, Zap, Aperture, Clock, Grid, MoveRight, BarChart, Thermometer, LampFloor, Target, Maximize, Crop, Clock3, Check, Star, Tag, Lightbulb, Ruler, Scan, Scale, RotateCw, Wifi, Sparkles, Users, Layers, Activity, ArrowUpFromLine, Droplet, Palette, Scissors, Sliders, Contrast, EyeOff, Wind, Upload } from 'lucide-react';
import { LessonId } from '../types';

interface SimulationProps {
  lessonId: LessonId;
  globalImage?: string | null;
  setGlobalImage?: (url: string) => void;
}

// --- HELPER: IMAGE UPLOADER ---
const ImageUploader: React.FC<{ onUpload: (url: string) => void }> = ({ onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            onUpload(url);
        }
    };
    return (
        <>
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-md transition-all border border-white/10 shadow-lg group"
                title="Upload Custom Image"
            >
                <Upload size={16} className="group-hover:scale-110 transition-transform"/>
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFile} 
                className="hidden" 
                accept="image/*" 
            />
        </>
    );
};

// Shared props for Post-Production tools
interface PostProdProps {
    image: string;
    onUpload: (url: string) => void;
}

// --- APERTURE SIMULATION ---
const ApertureSim: React.FC = () => {
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

      <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center shadow-inner group">
        
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
const ShutterSim: React.FC = () => {
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

      <div className="relative w-full h-[40vh] min-h-[300px] max-h-[500px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-inner flex items-center justify-center">
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
const IsoSim: React.FC = () => {
  const [isoIndex, setIsoIndex] = useState(0);
  const isos = [100, 400, 1600, 3200, 6400, 12800];
  const noiseOpacity = 0.05 + (isoIndex / (isos.length - 1)) * 0.7;
  const brightness = 1 + (isoIndex * 0.1); 

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
      <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
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
const MeteringSim: React.FC = () => {
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
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
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
                             <div className="w-64 h-48 border-2 border-white/30 rounded-lg flex items-center justify-center">
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
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${mode === 'matrix' ? 'bg-zinc-700 text-white shadow-inner' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}
                     >
                         Matrix (Balanced)
                     </button>
                     <button 
                        onClick={() => setMode('spot-shadow')}
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${mode === 'spot-shadow' ? 'bg-zinc-700 text-white shadow-inner' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}
                     >
                         Spot (Shadows)
                     </button>
                     <button 
                        onClick={() => setMode('spot-highlight')}
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${mode === 'spot-highlight' ? 'bg-zinc-700 text-white shadow-inner' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}
                     >
                         Spot (Highlights)
                     </button>
                 </div>
                 <p className="text-zinc-400 text-sm mt-2">{exp.text}</p>
            </div>
        </div>
    );
};

// --- FOCAL LENGTH SIMULATION ---
const FocalLengthSim: React.FC = () => {
    const [focalLen, setFocalLen] = useState(0); // 0 = 24mm, 100 = 200mm
    const mm = 24 + (focalLen * 1.76); 
    
    // Simulate "Dolly Zoom" or compression
    // Subject size stays relative, background scales up
    const bgScale = 1 + (focalLen / 50); 
    
    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center">
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
const SensorSizeSim: React.FC = () => {
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
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
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
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${sensor === 'ff' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                     >
                         Full Frame
                     </button>
                     <button 
                        onClick={() => setSensor('apsc')}
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${sensor === 'apsc' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                     >
                         APS-C
                     </button>
                     <button 
                        onClick={() => setSensor('m43')}
                        className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${sensor === 'm43' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400'}`}
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
const FocusPeakingSim: React.FC = () => {
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
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-end justify-center">
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
const DynamicRangeSim: React.FC = () => {
    const [drMode, setDrMode] = useState<'low' | 'high'>('low');

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
            <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center">
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

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex gap-4">
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
const HistogramSim: React.FC = () => {
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
      <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col">
        {/* Preview Image */}
        <div 
          className="flex-1 bg-cover bg-center transition-all duration-100"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=60&w=600&auto=format&fit=crop)',
            filter: `brightness(${exposure * 0.02})`
          }}
        />
        
        {/* Histogram Overlay */}
        <div className="absolute top-4 right-4 w-48 h-32 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10 p-2 flex items-end justify-between gap-0.5 shadow-lg">
           {bars.map((h, i) => (
             <div 
                key={i} 
                className="w-full bg-white/80 rounded-t-sm transition-all duration-200"
                style={{ height: `${h}%` }}
             />
           ))}
        </div>
        <div className="absolute top-4 right-4 w-48 h-32 flex items-center justify-center pointer-events-none">
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

// --- RULE OF THIRDS SIMULATION ---
const ThirdsSim: React.FC = () => {
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

// --- LEADING LINES SIMULATION ---
const LeadingLinesSim: React.FC = () => {
    const [showLines, setShowLines] = useState(true);

    return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto gap-4 p-4">
      <div className="relative w-full aspect-[4/3] max-h-[50vh] mx-auto bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl group">
        {/* Image with strong perspective (Bridge/Tunnel) */}
        <img 
            src="https://images.unsplash.com/photo-1490356860824-3486395dc112?q=70&w=800&auto=format&fit=crop"
            alt="Leading Lines" 
            className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Animated Lines Overlay */}
        <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${showLines ? 'opacity-100' : 'opacity-0'}`}>
            <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="100%" x2="50%" y2="50%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="50%" stopColor="rgba(255,50,50,0.8)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                </defs>
                {/* Lines originating from bottom corners converging to center */}
                <line x1="0" y1="100%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="4" className="animate-pulse" />
                <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="4" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                <line x1="30%" y1="100%" x2="50%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="10,10" opacity="0.5" />
                <line x1="70%" y1="100%" x2="50%" y2="50%" stroke="white" strokeWidth="1" strokeDasharray="10,10" opacity="0.5" />
                
                {/* Vanishing Point */}
                <circle cx="50%" cy="50%" r="5" fill="red" className="animate-ping" />
            </svg>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
            onClick={() => setShowLines(!showLines)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${showLines ? 'bg-red-500 text-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
        >
            <MoveRight size={18} />
            {showLines ? 'Hide Lines' : 'Show Guides'}
        </button>
      </div>
    </div>
    );
};

// --- SYMMETRY SIMULATION ---
const SymmetrySim: React.FC = () => {
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
const GoldenRatioSim: React.FC = () => {
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
const FramingSim: React.FC = () => {
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
const NegativeSpaceSim: React.FC = () => {
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
const BalanceSim: React.FC = () => {
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
const DutchAngleSim: React.FC = () => {
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
const KeystoningSim: React.FC = () => {
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

// --- LIGHTING SIMULATION (Hard/Soft) ---
const LightingSim: React.FC = () => {
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
const ColorTempSim: React.FC = () => {
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
const ThreePointSim: React.FC = () => {
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
const GoldenHourSim: React.FC = () => {
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
const InverseSquareSim: React.FC = () => {
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
const FlashSyncSim: React.FC = () => {
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
const GoboSim: React.FC = () => {
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

// --- LIGHT PANEL (BASIC EDITS) SIMULATION ---
const LightPanelSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
    // Basic Panel State
    const [exposure, setExposure] = useState(0);
    const [contrast, setContrast] = useState(0);
    const [highlights, setHighlights] = useState(0);
    const [shadows, setShadows] = useState(0);
    const [whites, setWhites] = useState(0);
    const [blacks, setBlacks] = useState(0);

    const brightnessVal = 1 + (exposure / 100) + (whites / 200) + (highlights / 200);
    const contrastVal = 1 + (contrast / 100) + (blacks / 200) - (shadows / 200); 
    const saturateVal = 1; 
    
    return (
        <div className="flex flex-col w-full h-full gap-6 p-6">
            {/* Image Preview Area */}
            <div className="w-full h-[60vh] min-h-[400px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative flex items-center justify-center">
                <ImageUploader onUpload={onUpload} />
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-100 ease-out"
                    style={{ 
                        backgroundImage: `url(${image})`,
                        filter: `brightness(${brightnessVal}) contrast(${contrastVal}) saturate(${saturateVal})`
                    }}
                ></div>
            </div>

            {/* Controls Sidebar */}
            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
                    <Sun size={18} className="text-zinc-400"/>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">Light Panel</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Exposure */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400 font-medium">
                            <span>Exposure</span>
                            <span>{exposure > 0 ? '+' : ''}{exposure}</span>
                        </div>
                        <input type="range" min="-50" max="50" value={exposure} onChange={(e) => setExposure(parseInt(e.target.value))} className="w-full h-1.5 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>

                    {/* Contrast */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400 font-medium">
                            <span>Contrast</span>
                            <span>{contrast > 0 ? '+' : ''}{contrast}</span>
                        </div>
                        <input type="range" min="-50" max="50" value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))} className="w-full h-1.5 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400 font-medium">
                            <span>Highlights</span>
                            <span>{highlights > 0 ? '+' : ''}{highlights}</span>
                        </div>
                        <input type="range" min="-100" max="100" value={highlights} onChange={(e) => setHighlights(parseInt(e.target.value))} className="w-full h-1.5 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>

                    {/* Shadows */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400 font-medium">
                            <span>Shadows</span>
                            <span>{shadows > 0 ? '+' : ''}{shadows}</span>
                        </div>
                        <input type="range" min="-100" max="100" value={shadows} onChange={(e) => setShadows(parseInt(e.target.value))} className="w-full h-1.5 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>

                    {/* Whites */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400 font-medium">
                            <span>Whites</span>
                            <span>{whites > 0 ? '+' : ''}{whites}</span>
                        </div>
                        <input type="range" min="-50" max="50" value={whites} onChange={(e) => setWhites(parseInt(e.target.value))} className="w-full h-1.5 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>

                    {/* Blacks */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400 font-medium">
                            <span>Blacks</span>
                            <span>{blacks > 0 ? '+' : ''}{blacks}</span>
                        </div>
                        <input type="range" min="-50" max="50" value={blacks} onChange={(e) => setBlacks(parseInt(e.target.value))} className="w-full h-1.5 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- EFFECTS PANEL (Vignette, Grain, Dehaze) SIMULATION ---
const EffectsPanelSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
    const [vignette, setVignette] = useState(0);
    const [grain, setGrain] = useState(0);
    const [dehaze, setDehaze] = useState(0);

    return (
        <div className="flex flex-col w-full h-full gap-6 p-6">
            {/* Image Preview Area */}
            <div className="w-full h-[60vh] min-h-[400px] bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative flex items-center justify-center group">
                <ImageUploader onUpload={onUpload} />
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                    style={{ 
                        backgroundImage: `url(${image})`, 
                        filter: `contrast(${1 + dehaze/100}) saturate(${1 + dehaze/200}) brightness(${1 - dehaze/300})`
                    }}
                />
                
                {/* Vignette Overlay (Radial Gradient) */}
                <div 
                    className="absolute inset-0 pointer-events-none transition-all duration-300"
                    style={{ 
                        background: `radial-gradient(circle, transparent ${100 - vignette}%, black 150%)`
                    }}
                />

                {/* Grain Overlay (SVG Noise) */}
                <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300" style={{ opacity: grain / 100 }}>
                    <svg className="w-full h-full">
                        <filter id="noiseFilterEffects">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseFilterEffects)" />
                    </svg>
                </div>
            </div>

            {/* Controls Sidebar */}
            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800">
                    <Sparkles size={18} className="text-zinc-400"/>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">Effects Panel</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Vignette */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400 font-medium">
                            <span className="flex items-center gap-1"><EyeOff size={10}/> Vignette</span>
                            <span>{vignette}</span>
                        </div>
                        <input type="range" min="0" max="100" value={vignette} onChange={(e) => setVignette(parseInt(e.target.value))} className="w-full h-1.5 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>

                    {/* Grain */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400 font-medium">
                            <span className="flex items-center gap-1"><Wind size={10}/> Grain</span>
                            <span>{grain}</span>
                        </div>
                        <input type="range" min="0" max="100" value={grain} onChange={(e) => setGrain(parseInt(e.target.value))} className="w-full h-1.5 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>

                    {/* Dehaze */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400 font-medium">
                            <span className="flex items-center gap-1"><Contrast size={10}/> Dehaze</span>
                            <span>{dehaze}</span>
                        </div>
                        <input type="range" min="0" max="100" value={dehaze} onChange={(e) => setDehaze(parseInt(e.target.value))} className="w-full h-1.5 accent-white bg-zinc-700 rounded-lg appearance-none cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- TONE CURVE SIMULATION ---
const ToneCurveSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
    // We simulate a basic S-Curve manipulation using CSS filters
    // 0 = Flat/Fade, 50 = Linear, 100 = Strong S-Curve
    const [contrast, setContrast] = useState(50);
    
    // Calculate bezier control points for visualization
    const factor = (contrast - 50) / 50; // -1 to 1
    
    // Simulation logic
    const brightnessVal = 1 + (factor * 0.1); 
    const contrastVal = 1 + (factor * 0.5);
    const fadeVal = factor < 0 ? Math.abs(factor) * 0.2 : 0; // Lift blacks if contrast is low (Fade look)

    // SVG Graph Points
    const y1 = 75 + (factor * 15); // Pull shadows down/up
    const y2 = 25 - (factor * 15); // Pull highlights up/down
    
    const dPath = `M0,100 C25,${y1} 75,${y2} 100,0`;

    return (
        <div className="flex flex-col w-full h-full gap-6 p-6">
            {/* The Image */}
            <div className="w-full h-[60vh] min-h-[400px] relative bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                    <ImageUploader onUpload={onUpload} />
                    <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                    style={{ 
                        backgroundImage: `url(${image})`,
                        filter: `brightness(${brightnessVal}) contrast(${contrastVal}) drop-shadow(0 0 0 black)`
                    }}
                    >
                        {/* Simulate "Fade" by overlaying a light grey screen */}
                        {fadeVal > 0 && <div className="absolute inset-0 bg-zinc-800 mix-blend-lighten" style={{ opacity: fadeVal }}></div>}
                    </div>
            </div>

            {/* The Controls Area */}
            <div className="w-full bg-zinc-900 rounded-2xl border border-zinc-800 p-6 flex flex-col md:flex-row gap-8 items-center">
                
                {/* Graph */}
                <div className="w-64 h-64 bg-zinc-950 rounded-xl border border-zinc-700/50 relative flex items-center justify-center shrink-0">
                    <div className="w-full h-full relative">
                        {/* Grid */}
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none">
                            <div className="border-r border-b border-zinc-800"></div><div className="border-r border-b border-zinc-800"></div><div className="border-r border-b border-zinc-800"></div><div className="border-b border-zinc-800"></div>
                            <div className="border-r border-b border-zinc-800"></div><div className="border-r border-b border-zinc-800"></div><div className="border-r border-b border-zinc-800"></div><div className="border-b border-zinc-800"></div>
                            <div className="border-r border-b border-zinc-800"></div><div className="border-r border-b border-zinc-800"></div><div className="border-r border-b border-zinc-800"></div><div className="border-b border-zinc-800"></div>
                            <div className="border-r border-zinc-800"></div><div className="border-r border-zinc-800"></div><div className="border-r border-zinc-800"></div><div></div>
                        </div>

                        {/* Histogram BG */}
                        <div className="absolute bottom-0 left-0 w-full h-full flex items-end opacity-20 gap-0.5 px-1 pb-1">
                             {[10,30,50,80,60,40,20,10,50,90,40,20].map((h,i) => (
                                 <div key={i} className="flex-1 bg-white rounded-t-sm" style={{ height: `${h}%`}}></div>
                             ))}
                        </div>

                        {/* Curve Line */}
                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <path d={dPath} fill="none" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            {/* Control Points */}
                            <circle cx="25" cy={y1} r="3" fill="#10b981" />
                            <circle cx="75" cy={y2} r="3" fill="#10b981" />
                        </svg>
                    </div>
                </div>

                {/* Slider */}
                <div className="flex-1 w-full">
                    <div className="flex justify-between mb-4 text-sm font-medium text-zinc-400">
                        <span>Fade / Matte</span>
                        <span>Linear</span>
                        <span>High Contrast (S-Curve)</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="1"
                        value={contrast} 
                        onChange={(e) => setContrast(parseInt(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-emerald-500 transition-colors"
                    />
                    <div className="mt-4 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                        <p className="text-zinc-400 text-sm">
                            An S-Curve darkens shadows and brightens highlights, increasing contrast. Lifting the bottom point creates a "matte" film look.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SPLIT TONING SIMULATION ---
const SplitToningSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
    const [shadowHue, setShadowHue] = useState(210); // Blueish
    const [highlightHue, setHighlightHue] = useState(45); // Warm/Orange
    const [strength, setStrength] = useState(50);

    return (
        <div className="flex flex-col w-full h-full gap-6 p-6">
            <div className="w-full h-[60vh] min-h-[400px] relative bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                 <ImageUploader onUpload={onUpload} />
                 {/* Base BW Image */}
                 <div 
                    className="absolute inset-0 bg-cover bg-center grayscale"
                    style={{ backgroundImage: `url(${image})` }}
                 />
                 
                 {/* Shadow Tint (Multiply) */}
                 <div 
                    className="absolute inset-0 mix-blend-overlay pointer-events-none transition-colors duration-300"
                    style={{ 
                        background: `linear-gradient(to top right, hsl(${shadowHue}, 100%, 50%), transparent)`,
                        opacity: strength / 100
                    }}
                 />

                 {/* Highlight Tint (Screen/Overlay) */}
                 <div 
                    className="absolute inset-0 mix-blend-soft-light pointer-events-none transition-colors duration-300"
                    style={{ 
                        background: `linear-gradient(to bottom left, hsl(${highlightHue}, 100%, 50%), transparent)`,
                        opacity: strength / 100
                    }}
                 />
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                     <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                        <span>Shadow Tint</span>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${shadowHue}, 100%, 50%)`}}></div>
                     </div>
                     <input 
                        type="range" min="0" max="360" value={shadowHue} 
                        onChange={(e) => setShadowHue(parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-red-500 via-green-500 to-blue-500"
                    />
                </div>
                
                <div>
                     <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                        <span>Highlight Tint</span>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${highlightHue}, 100%, 50%)`}}></div>
                     </div>
                     <input 
                        type="range" min="0" max="360" value={highlightHue} 
                        onChange={(e) => setHighlightHue(parseInt(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-red-500 via-green-500 to-blue-500"
                    />
                </div>

                <div>
                     <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                        <span>Intensity</span>
                     </div>
                     <input 
                        type="range" min="0" max="100" value={strength} 
                        onChange={(e) => setStrength(parseInt(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                </div>
            </div>
        </div>
    );
};

// --- HSL SIMULATION ---
const HslSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
    // We modify specific hues in a colorful image
    const [greenShift, setGreenShift] = useState(0); // Shift greens (to teal or yellow)
    const [blueShift, setBlueShift] = useState(0); // Shift blues (to purple or cyan)
    
    return (
        <div className="flex flex-col w-full h-full gap-6 p-6">
            <div className="w-full h-[60vh] min-h-[400px] relative bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                 <ImageUploader onUpload={onUpload} />
                 
                 {/* Base Layer (Red Car - unaffected mostly) */}
                 <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                 />

                 {/* Filtered Layer */}
                 <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                    style={{ 
                        backgroundImage: `url(${image})`,
                        filter: `hue-rotate(${blueShift}deg) saturate(${1 + greenShift/100})`
                    }}
                 />
                 
                 {/* Label */}
                 <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs text-white border border-white/10 font-mono">
                     HSL Shift
                 </div>
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                     <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                        <span>Global Hue Shift</span>
                        <span>{blueShift}°</span>
                     </div>
                     <input 
                        type="range" min="-180" max="180" value={blueShift} 
                        onChange={(e) => setBlueShift(parseInt(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                        style={{ background: 'linear-gradient(to right, cyan, blue, purple, red, yellow, green, cyan)'}}
                    />
                </div>
                
                <div>
                     <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                        <span>Saturation</span>
                        <span>{greenShift > 0 ? '+' : ''}{greenShift}</span>
                     </div>
                     <input 
                        type="range" min="-100" max="100" value={greenShift} 
                        onChange={(e) => setGreenShift(parseInt(e.target.value))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-emerald-400"
                    />
                </div>
            </div>
        </div>
    );
};

// --- CLARITY VS SHARPENING SIMULATION ---
const ClaritySharpenSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
    const [clarity, setClarity] = useState(0); // Midtone contrast
    const [sharpen, setSharpen] = useState(0); // Edge contrast

    return (
        <div className="flex flex-col w-full h-full gap-6 p-6">
            <div className="w-full h-[60vh] min-h-[400px] relative bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex items-center justify-center">
                 <ImageUploader onUpload={onUpload} />
                 <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                    style={{ 
                        backgroundImage: `url(${image})`,
                        // CSS approximations
                        filter: `contrast(${1 + clarity/100}) grayscale(${sharpen > 50 ? 1 : 0})` 
                    }}
                 />
                 
                 {/* Sharpening (SVG Filter) */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0">
                     <filter id="sharpen">
                         <feConvolveMatrix order="3,3" preserveAlpha="true" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"/>
                     </filter>
                 </svg>
                 
                 {/* To visualize Sharpening vs Clarity easily on web:
                     Clarity = Contrast + Grunge.
                     Sharpening = High pass overlay.
                 */}
                 
                 {sharpen > 0 && (
                     <div 
                        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50 pointer-events-none"
                        style={{ 
                             backgroundImage: `url(${image})`,
                             filter: 'contrast(200%) brightness(1.2)'
                        }}
                     />
                 )}
                 
                 {clarity > 0 && (
                     <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none"></div>
                 )}
            </div>

            <div className="w-full bg-zinc-900 p-6 rounded-xl border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                     <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                        <span>Clarity (Structure)</span>
                        <span>{clarity}</span>
                     </div>
                     <input 
                        type="range" min="0" max="100" value={clarity} 
                        onChange={(e) => { setClarity(parseInt(e.target.value)); setSharpen(0); }}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-blue-400"
                    />
                </div>
                
                <div>
                     <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                        <span>Sharpening (Edge Detail)</span>
                        <span>{sharpen}</span>
                     </div>
                     <input 
                        type="range" min="0" max="100" value={sharpen} 
                        onChange={(e) => { setSharpen(parseInt(e.target.value)); setClarity(0); }}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white hover:accent-red-400"
                    />
                </div>
            </div>
        </div>
    );
};

// --- SHOWCASE VIEWER (Gallery) ---

interface ShowcaseData {
    img: string;
    why: string;
    takeaway: string;
    tags: string[];
}

const SHOWCASE_DATA: Record<string, ShowcaseData> = {
    // --- NATURE ---
    'gal-nat-land-1': { img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=60&w=1000&auto=format&fit=crop', why: "Strong foreground layers lead into majestic mountains.", takeaway: "Use foreground to add depth.", tags: ["Layering", "Golden Hour"] },
    'gal-nat-land-2': { img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=60&w=1000&auto=format&fit=crop', why: "Yosemite's scale is emphasized by the light hitting the rock face.", takeaway: "Light defines form in landscapes.", tags: ["Scale", "Contrast"] },
    'gal-nat-land-3': { img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=60&w=1000&auto=format&fit=crop', why: "Mirror-like reflection doubles the visual weight of the scene.", takeaway: "Low angles maximize reflections.", tags: ["Reflection", "Symmetry"] },
    'gal-nat-land-4': { img: 'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?q=60&w=1000&auto=format&fit=crop', why: "Mist separates the layers of hills, creating aerial perspective.", takeaway: "Weather creates mood and depth.", tags: ["Mist", "Atmosphere"] },
    'gal-nat-wild-2': { img: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=60&w=1000&auto=format&fit=crop', why: "Tight cropping on the lion's face creates intensity.", takeaway: "Fill the frame with the subject.", tags: ["Fill Frame", "Intensity"] },
    'gal-nat-wild-3': { img: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=60&w=1000&auto=format&fit=crop', why: "The leopard blends into the environment, showing context.", takeaway: "Environmental portraits tell a story.", tags: ["Context", "Camouflage"] },
    'gal-nat-wild-4': { img: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9dab?q=60&w=1000&auto=format&fit=crop', why: "Backlighting outlines the fox in a rim of light.", takeaway: "Backlight creates separation.", tags: ["Rim Light", "Golden Hour"] },
    'gal-nat-macro-1': { img: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=60&w=1000&auto=format&fit=crop', why: "Macro photography transforms a simple leaf into an intricate map of nature.", takeaway: "Get close to reveal hidden worlds.", tags: ["Texture", "Abstract"] },
    'gal-nat-forest-1': { img: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=60&w=1000&auto=format&fit=crop', why: "Vertical trunks create a rhythm and natural pattern.", takeaway: "Repetition creates visual rhythm.", tags: ["Pattern", "Forest"] },
    'gal-nat-astro-1': { img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=60&w=1000&auto=format&fit=crop', why: "Long exposure captures the Milky Way not visible to eyes.", takeaway: "Sensors see more than eyes at night.", tags: ["Astro", "Long Exposure"] },

    // --- HUMAN ---
    'gal-hum-port-1': { img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=60&w=1000&auto=format&fit=crop', why: "Shallow depth of field focuses entirely on the eyes.", takeaway: "Eyes are the anchor of portraits.", tags: ["Bokeh", "Eyes"] },
    'gal-hum-port-2': { img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=60&w=1000&auto=format&fit=crop', why: "Rembrandt lighting creates a triangle of light on the cheek.", takeaway: "Directional light sculpts the face.", tags: ["Studio", "Rembrandt"] },
    'gal-hum-port-3': { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=60&w=1000&auto=format&fit=crop', why: "The texture of the skin is highlighted by side lighting.", takeaway: "Hard light emphasizes texture.", tags: ["Texture", "Character"] },
    'gal-hum-port-4': { img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=60&w=1000&auto=format&fit=crop', why: "Soft, diffused lighting makes skin look flawless.", takeaway: "Soft light is flattering.", tags: ["Soft Light", "Fashion"] },
    'gal-hum-street-1': { img: 'https://images.unsplash.com/photo-1485550409059-9afb054cada4?q=60&w=1000&auto=format&fit=crop', why: "The moody atmosphere and solitary figure tell a story.", takeaway: "Mood over technical perfection.", tags: ["Street", "Atmosphere"] },
    'gal-hum-street-2': { img: 'https://images.unsplash.com/photo-1542598953-41310c43f54b?q=60&w=1000&auto=format&fit=crop', why: "Captured at the perfect moment of interaction.", takeaway: "Wait for the 'Decisive Moment'.", tags: ["Candid", "Timing"] },
    'gal-hum-street-3': { img: 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?q=60&w=1000&auto=format&fit=crop', why: "Silhouette creates mystery and focuses on form.", takeaway: "Expose for highlights to silhouette.", tags: ["Silhouette", "Mystery"] },
    'gal-hum-sport-1': { img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=60&w=1000&auto=format&fit=crop', why: "Panning blurs the background to show speed.", takeaway: "Move with the subject.", tags: ["Panning", "Motion"] },
    'gal-hum-sport-2': { img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=60&w=1000&auto=format&fit=crop', why: "Peak action caught mid-air.", takeaway: "Anticipate the peak of the movement.", tags: ["Action", "Timing"] },
    'gal-hum-doc-1': { img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=60&w=1000&auto=format&fit=crop', why: "Black and white emphasizes the raw emotion.", takeaway: "B&W removes color distraction.", tags: ["B&W", "Emotion"] },
    'gal-hum-group-1': { img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=60&w=1000&auto=format&fit=crop', why: "Triangular composition creates stability in groups.", takeaway: "Look for triangles in grouping.", tags: ["Group", "Composition"] },

    // --- URBAN & ABSTRACT ---
    'gal-urb-arch-1': { img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=60&w=1000&auto=format&fit=crop', why: "Looking up creates powerful converging vertical lines.", takeaway: "Change your perspective.", tags: ["Perspective", "Lines"] },
    'gal-urb-arch-2': { img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=60&w=1000&auto=format&fit=crop', why: "High contrast B&W turns building into shape study.", takeaway: "Architecture is geometry.", tags: ["Geometry", "B&W"] },
    'gal-urb-arch-3': { img: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=60&w=1000&auto=format&fit=crop', why: "The repetition of identical windows creates a soothing rhythm.", takeaway: "Fill frame with pattern.", tags: ["Pattern", "Repetition"] },
    'gal-urb-night-2': { img: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=60&w=1000&auto=format&fit=crop', why: "Neon lights create a cyberpunk aesthetic.", takeaway: "Mixed lighting creates mood.", tags: ["Neon", "Night"] },
    'gal-urb-night-3': { img: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=60&w=1000&auto=format&fit=crop', why: "Rain on glass creates natural bokeh/distortion.", takeaway: "Shoot through textured surfaces.", tags: ["Bokeh", "Abstract"] },
    'gal-urb-abs-2': { img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=60&w=1000&auto=format&fit=crop', why: "Perfect symmetry makes the image feel balanced.", takeaway: "Symmetry equals order.", tags: ["Symmetry", "Abstract"] },
    'gal-urb-min-2': { img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=60&w=1000&auto=format&fit=crop', why: "The tiny figure against the massive mountain emphasizes scale and isolation.", takeaway: "Use scale to show vulnerability.", tags: ["Scale", "Isolation"] },
    'gal-urb-patt-1': { img: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=60&w=1000&auto=format&fit=crop', why: "The break in the pattern draws the eye.", takeaway: "Break the rhythm.", tags: ["Pattern", "Break"] },
    'gal-urb-food-1': { img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=60&w=1000&auto=format&fit=crop', why: "The overhead angle flattens depth, focusing on arrangement and color.", takeaway: "Overhead for organization.", tags: ["Flat Lay", "Food"] },

    // --- BLACK & WHITE (MONOCHROME) - STRICTLY SATURATION -100 ---
    'gal-bw-1': { img: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=60&w=1000&sat=-100', why: "Ansel Adams style landscape relying purely on tonal range.", takeaway: "Zone system mastery.", tags: ["Landscape", "Contrast"] },
    'gal-bw-2': { img: 'https://images.unsplash.com/photo-1534260164206-2a3a4a72891d?q=60&w=1000&sat=-100', why: "High contrast emphasizes the geometric shadows.", takeaway: "Shadows become shapes.", tags: ["Street", "Shadows"] },
    'gal-bw-3': { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=60&w=1000&sat=-100', why: "Wrinkles and texture tell a story without color distraction.", takeaway: "Texture conveys history.", tags: ["Portrait", "Texture"] },
    'gal-bw-4': { img: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=60&w=1000&sat=-100', why: "Minimalist architecture focusing on form and line.", takeaway: "Simplify the composition.", tags: ["Architecture", "Minimalism"] },
    'gal-bw-5': { img: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=60&w=1000&sat=-100', why: "Long exposure softens water against hard rocks.", takeaway: "Contrast motion and static.", tags: ["Long Exposure", "Nature"] },
    'gal-bw-6': { img: 'https://images.unsplash.com/photo-1505567745926-ba89000d255a?q=60&w=1000&sat=-100', why: "Abstract play of light and shadow.", takeaway: "Look for light, not objects.", tags: ["Abstract", "Light"] },
    'gal-bw-8': { img: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=60&w=1000&sat=-100', why: "Classic film noir atmosphere.", takeaway: "Mood over clarity.", tags: ["Noir", "Atmosphere"] },
    'gal-bw-10': { img: 'https://images.unsplash.com/photo-1446034295857-c39f8844fad4?q=60&w=1000&sat=-100', why: "Fog creates separation between trees.", takeaway: "Tonal separation creates depth.", tags: ["Fog", "Nature"] },
};

const ShowcaseViewer: React.FC<{ id: string }> = ({ id }) => {
    const data = SHOWCASE_DATA[id];

    if (!data) return <div className="text-white">Image data not found</div>;

    return (
        <div className="flex flex-col md:flex-row w-full h-full bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            {/* Image Side */}
            <div className="md:w-2/3 h-64 md:h-auto relative group overflow-hidden bg-zinc-900">
                <img 
                    src={data.img} 
                    alt="Showcase" 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="flex gap-2 flex-wrap">
                        {data.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-bold text-white border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Analysis Side */}
            <div className="md:w-1/3 bg-zinc-900 p-6 md:p-8 flex flex-col justify-center border-l border-zinc-800">
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold uppercase tracking-wider text-xs">
                        <Check size={14} /> Analysis
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 leading-tight">Why it works</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        {data.why}
                    </p>
                </div>

                <div className="w-full h-px bg-zinc-800 my-2"></div>

                <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
                        <Lightbulb size={14} /> Key Takeaway
                    </div>
                    <p className="text-zinc-300 text-sm font-medium italic border-l-2 border-amber-500/50 pl-3 py-1">
                        "{data.takeaway}"
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap gap-2">
                     <span className="text-xs text-zinc-600 font-mono">CONCEPTS:</span>
                     {data.tags.map((tag, i) => (
                         <span key={i} className="text-xs text-zinc-500 flex items-center gap-1">
                             <Tag size={10} /> {tag}
                         </span>
                     ))}
                </div>
            </div>
        </div>
    );
};


// --- GENERIC PLACEHOLDER ---
const PlaceholderSim: React.FC<{ title: string }> = ({ title }) => (
    <div className="h-[50vh] min-h-[300px] flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/50 rounded-2xl border border-zinc-800">
        <Camera size={48} className="mb-4 opacity-20" />
        <p className="text-lg font-medium">Visualizer for {title}</p>
        <p className="text-sm">Interactive module coming soon.</p>
    </div>
);

// Map of default images for Post-Production tools if user hasn't uploaded one
const POST_PROD_DEFAULTS: Record<string, string> = {
    'light-panel': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop', // Landscape for exposure
    'tone-curve': 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?q=80&w=800&auto=format&fit=crop', // Portrait for contrast
    'split-toning': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop', // Architecture for grading
    'hsl-slider': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop', // Colorful for HSL
    'clarity-sharpen': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', // Texture portrait
    'effects-panel': 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=800&auto=format&fit=crop', // Night for grain/vignette
};

export const Visualizer: React.FC<SimulationProps> = ({ lessonId, globalImage, setGlobalImage }) => {
  if (lessonId.startsWith('gal-')) {
      return <ShowcaseViewer id={lessonId} />;
  }

  // Props for post production tools that share image state
  // If globalImage is set (user uploaded), use it.
  // Otherwise, use the specific default for this lesson.
  const defaultImg = POST_PROD_DEFAULTS[lessonId] || 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop';
  const effectiveImage = globalImage || defaultImg;

  const ppProps = {
      image: effectiveImage,
      onUpload: setGlobalImage || (() => {})
  };

  switch (lessonId) {
    case 'aperture': return <ApertureSim />;
    case 'shutter': return <ShutterSim />;
    case 'iso': return <IsoSim />;
    case 'histogram': return <HistogramSim />;
    case 'metering': return <MeteringSim />;
    case 'focal-length': return <FocalLengthSim />;
    case 'sensor-size': return <SensorSizeSim />;
    case 'focus-peaking': return <FocusPeakingSim />;
    case 'dynamic-range': return <DynamicRangeSim />;
    
    case 'thirds': return <ThirdsSim />;
    case 'leading': return <LeadingLinesSim />;
    case 'symmetry': return <SymmetrySim />;
    case 'golden-ratio': return <GoldenRatioSim />;
    case 'framing': return <FramingSim />;
    case 'negative-space': return <NegativeSpaceSim />;
    case 'balance': return <BalanceSim />;
    case 'dutch-angle': return <DutchAngleSim />;
    case 'keystoning': return <KeystoningSim />;
    
    case 'hard-soft': return <LightingSim />;
    case 'color-temp': return <ColorTempSim />;
    case 'three-point': return <ThreePointSim />;
    case 'golden-hour': return <GoldenHourSim />;
    case 'inverse-square': return <InverseSquareSim />;
    case 'gobos': return <GoboSim />;
    case 'flash-sync': return <FlashSyncSim />;
    
    case 'light-panel': return <LightPanelSim {...ppProps} />;
    case 'tone-curve': return <ToneCurveSim {...ppProps} />;
    case 'split-toning': return <SplitToningSim {...ppProps} />;
    case 'hsl-slider': return <HslSim {...ppProps} />;
    case 'clarity-sharpen': return <ClaritySharpenSim {...ppProps} />;
    case 'effects-panel': return <EffectsPanelSim {...ppProps} />;

    default: return <PlaceholderSim title="Concept" />;
  }
};
