
import React, { useState } from 'react';
import { Camera, Users, Infinity as InfinityIcon, Ruler, ScanLine } from 'lucide-react';

const DofCalculator: React.FC = () => {
    const [focalLength, setFocalLength] = useState(50); // mm
    const [aperture, setAperture] = useState(2.8); // f/
    const [focusDistance, setFocusDistance] = useState(5); // m (Where lens is focused)
    const [subjectDistance, setSubjectDistance] = useState(5); // m (Where subject stands)
    
    // Simplified DoF Math for full frame
    const coc = 0.03; // Circle of confusion for FF
    const hyperfocal = (focalLength * focalLength) / (aperture * coc) / 1000; // in meters
    
    // DoF Limits depend on FOCUS DISTANCE
    const nearLimit = (hyperfocal * focusDistance) / (hyperfocal + (focusDistance - focalLength/1000));
    const farLimitDenominator = hyperfocal - (focusDistance - focalLength/1000);
    const farLimit = farLimitDenominator <= 0 ? Infinity : (hyperfocal * focusDistance) / farLimitDenominator;
    
    // Visualization Scale
    const maxDist = 20; 
    const scale = (val: number) => Math.min(100, Math.max(0, (val / maxDist) * 100));

    // Check if subject is in focus (Subject Position vs DoF Limits)
    const inFocus = subjectDistance >= nearLimit && (farLimit === Infinity || subjectDistance <= farLimit);
    
    return (
        <div className="max-w-6xl mx-auto p-4 animate-slide-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Depth of Field Visualizer</h2>
                <p className="text-zinc-400">Visualize your sharp zone and hyperfocal distance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Visualizer */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 relative h-[40vh] min-h-[300px] overflow-hidden flex flex-col justify-center shadow-inner select-none">
                    
                    {/* Background Ruler / Grid */}
                    <div className="absolute inset-0 flex flex-col justify-end pb-8 opacity-20 pointer-events-none">
                         <div className="w-full border-b border-zinc-500 relative h-4">
                             {[0, 5, 10, 15, 20].map(m => (
                                 <div key={m} className="absolute bottom-0 h-3 border-l border-zinc-500 text-[10px] pl-1 text-zinc-400" style={{ left: `${(m/20)*100}%` }}>
                                     {m}m
                                 </div>
                             ))}
                             {Array.from({length: 20}).map((_, i) => (
                                 <div key={i} className="absolute bottom-0 h-1 border-l border-zinc-600" style={{ left: `${(i/20)*100}%` }}></div>
                             ))}
                         </div>
                    </div>

                    {/* Optical Axis Line */}
                    <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-800"></div>
                    
                    {/* Camera */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-zinc-950 p-1 rounded-full border border-zinc-700">
                        <Camera className="text-zinc-400" size={24} />
                    </div>

                    {/* Hyperfocal Marker */}
                    <div 
                        className="absolute top-8 bottom-12 w-0.5 border-l-2 border-dashed border-amber-500/50 z-10 transition-all duration-300"
                        style={{ left: `${scale(hyperfocal)}%` }}
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-amber-500 bg-zinc-900/80 px-1 rounded whitespace-nowrap border border-amber-500/30">
                            Hyperfocal: {hyperfocal.toFixed(1)}m
                        </div>
                    </div>

                    {/* Focus Zone (The Green Area) */}
                    <div 
                        className="absolute top-[20%] bottom-[20%] bg-emerald-500/10 border-l-2 border-r-2 border-emerald-500/40 transition-all duration-300 z-0 backdrop-blur-[1px]"
                        style={{ 
                            left: `${scale(nearLimit)}%`, 
                            right: `${100 - (farLimit === Infinity ? 100 : scale(farLimit))}%`,
                            borderRightWidth: farLimit === Infinity ? 0 : 2
                        }}
                    >
                         <div className="absolute top-2 left-1 text-[10px] text-emerald-400 font-bold">NEAR</div>
                         <div className="absolute bottom-2 right-1 text-[10px] text-emerald-400 font-bold text-right">FAR</div>
                         
                         {/* Infinity Fade if applicable */}
                         {farLimit === Infinity && (
                             <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-r from-transparent to-emerald-500/20"></div>
                         )}
                    </div>
                    
                    {/* Focus Plane Line (Where lens is set) */}
                    <div 
                        className="absolute top-[25%] bottom-[25%] w-px bg-white/50 z-10 transition-all duration-300"
                        style={{ left: `${scale(focusDistance)}%` }}
                    >
                         <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-mono whitespace-nowrap flex items-center gap-1">
                            <ScanLine size={10}/> Focus
                         </div>
                    </div>

                    {/* Subject */}
                    <div 
                        className={`absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-300 flex flex-col items-center group cursor-grab active:cursor-grabbing ${inFocus ? 'opacity-100' : 'opacity-50 blur-[1px]'}`}
                        style={{ left: `${scale(subjectDistance)}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <div className={`p-2 rounded-full transition-colors duration-300 ${inFocus ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-red-500/20 text-red-500 border border-red-500'}`}>
                            <Users size={24} />
                        </div>
                        <div className={`mt-2 text-xs font-mono font-bold whitespace-nowrap px-2 py-0.5 rounded transition-colors duration-300 ${inFocus ? 'text-emerald-400 bg-black/50' : 'text-red-400 bg-black/50'}`}>
                            {inFocus ? 'IN FOCUS' : 'OUT OF FOCUS'}
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-0.5">{subjectDistance}m</div>
                    </div>
                </div>

                {/* Stats Panel */}
                <div className="grid grid-cols-2 gap-4 h-min">
                     <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex flex-col justify-center">
                         <span className="text-zinc-500 text-xs font-bold uppercase mb-1">Total Depth of Field</span>
                         <span className="text-2xl text-emerald-400 font-bold flex items-center gap-2">
                             {farLimit === Infinity ? 'Infinite' : (farLimit - nearLimit).toFixed(2) + 'm'}
                             {farLimit === Infinity && <InfinityIcon size={20} />}
                         </span>
                         <span className="text-xs text-zinc-600 mt-2">
                             Sharp from {nearLimit.toFixed(2)}m to {farLimit === Infinity ? '∞' : farLimit.toFixed(2) + 'm'}
                         </span>
                     </div>
                     <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex flex-col justify-center">
                         <span className="text-zinc-500 text-xs font-bold uppercase mb-1">Hyperfocal Distance</span>
                         <span className="text-2xl text-amber-400 font-bold">{hyperfocal.toFixed(2)}m</span>
                         <span className="text-xs text-zinc-600 mt-2">
                             Focus here to keep everything from { (hyperfocal/2).toFixed(2) }m to Infinity sharp.
                         </span>
                     </div>
                     
                     <div className="col-span-2 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50 flex items-center gap-3">
                         <Ruler className="text-zinc-500" size={20} />
                         <p className="text-xs text-zinc-400 leading-relaxed">
                             <strong className="text-zinc-300">Tip:</strong> The <strong>Focus Distance</strong> controls the green zone. The <strong>Subject Position</strong> moves the person. If the person leaves the green zone, they are out of focus.
                         </p>
                     </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                 <div>
                     <div className="flex justify-between mb-3 text-sm font-bold text-zinc-300">
                         <span>Focal Length</span>
                         <span className="font-mono text-zinc-400">{focalLength}mm</span>
                     </div>
                     <input type="range" min="16" max="200" value={focalLength} onChange={(e) => setFocalLength(Number(e.target.value))} className="w-full accent-white h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer" />
                     <div className="flex justify-between text-[10px] text-zinc-600 mt-1 px-1">
                         <span>Wide (16mm)</span>
                         <span>Telephoto (200mm)</span>
                     </div>
                 </div>
                 
                 <div>
                     <div className="flex justify-between mb-3 text-sm font-bold text-zinc-300">
                         <span>Aperture</span>
                         <span className="font-mono text-zinc-400">f/{aperture}</span>
                     </div>
                     <input type="range" min="1.4" max="22" step="0.1" value={aperture} onChange={(e) => setAperture(Number(e.target.value))} className="w-full accent-emerald-500 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer" />
                     <div className="flex justify-between text-[10px] text-zinc-600 mt-1 px-1">
                         <span>Open (f/1.4)</span>
                         <span>Closed (f/22)</span>
                     </div>
                 </div>
                 
                 <div>
                     <div className="flex justify-between mb-3 text-sm font-bold text-zinc-300">
                         <span className="flex items-center gap-2"><ScanLine size={14}/> Focus Distance (Lens)</span>
                         <span className="font-mono text-zinc-400">{focusDistance}m</span>
                     </div>
                     <input type="range" min="0.5" max="20" step="0.1" value={focusDistance} onChange={(e) => setFocusDistance(Number(e.target.value))} className="w-full accent-blue-500 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer" />
                     <div className="flex justify-between text-[10px] text-zinc-600 mt-1 px-1">
                         <span>Close (0.5m)</span>
                         <span>Far (20m)</span>
                     </div>
                 </div>

                 <div>
                     <div className="flex justify-between mb-3 text-sm font-bold text-zinc-300">
                         <span className="flex items-center gap-2"><Users size={14}/> Subject Position</span>
                         <span className="font-mono text-zinc-400">{subjectDistance}m</span>
                     </div>
                     <input type="range" min="0.5" max="20" step="0.1" value={subjectDistance} onChange={(e) => setSubjectDistance(Number(e.target.value))} className="w-full accent-red-500 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer" />
                     <div className="flex justify-between text-[10px] text-zinc-600 mt-1 px-1">
                         <span>Close (0.5m)</span>
                         <span>Far (20m)</span>
                     </div>
                 </div>
            </div>
        </div>
    );
}

export default DofCalculator;
