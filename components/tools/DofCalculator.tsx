
import React, { useState } from 'react';
import { Camera, Users } from 'lucide-react';

const DofCalculator: React.FC = () => {
    const [focalLength, setFocalLength] = useState(50); // mm
    const [aperture, setAperture] = useState(2.8); // f/
    const [distance, setDistance] = useState(5); // m
    
    // Simplified DoF Math for full frame
    const coc = 0.03; // Circle of confusion for FF
    const hyperfocal = (focalLength * focalLength) / (aperture * coc) / 1000; // in meters
    const nearLimit = (hyperfocal * distance) / (hyperfocal + (distance - focalLength/1000));
    const farLimit = (hyperfocal * distance) / (hyperfocal - (distance - focalLength/1000));
    
    // Visualization Scale
    const maxDist = 20; 
    const scale = (val: number) => (val / maxDist) * 100;
    
    return (
        <div className="max-w-6xl mx-auto p-4 animate-slide-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Depth of Field Visualizer</h2>
                <p className="text-zinc-400">Visualize your sharp zone.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Visualizer */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative h-[40vh] min-h-[300px] overflow-hidden flex flex-col justify-center">
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-zinc-700"></div>
                    
                    {/* Camera */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
                        <Camera className="text-white" size={24} />
                    </div>

                    {/* Subject */}
                    <div 
                        className="absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-300"
                        style={{ left: `${Math.min(95, scale(distance))}%` }}
                    >
                        <Users className="text-blue-400" size={24} />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-blue-400 font-mono whitespace-nowrap">{distance}m</div>
                    </div>

                    {/* Focus Zone */}
                    <div 
                        className="absolute top-0 bottom-0 bg-emerald-500/20 border-l border-r border-emerald-500/50 transition-all duration-300"
                        style={{ 
                            left: `${Math.min(100, scale(nearLimit))}%`, 
                            right: `${Math.max(0, 100 - scale(farLimit > maxDist ? maxDist : farLimit))}%` 
                        }}
                    >
                         <div className="absolute top-2 left-1 text-[10px] text-emerald-400">NEAR: {nearLimit.toFixed(1)}m</div>
                         <div className="absolute bottom-2 right-1 text-[10px] text-emerald-400 text-right">FAR: {farLimit > 100 ? '∞' : farLimit.toFixed(1) + 'm'}</div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                     <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col items-center justify-center">
                         <span className="text-zinc-500 text-xs font-bold uppercase">Total Depth</span>
                         <span className="text-2xl text-white font-bold">{farLimit > 100 ? 'Infinite' : (farLimit - nearLimit).toFixed(2) + 'm'}</span>
                     </div>
                     <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col items-center justify-center">
                         <span className="text-zinc-500 text-xs font-bold uppercase">Hyperfocal Dist</span>
                         <span className="text-2xl text-white font-bold">{hyperfocal.toFixed(1)}m</span>
                     </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6">
                 <div>
                     <div className="flex justify-between mb-2 text-sm text-zinc-400">
                         <span>Focal Length (Zoom)</span>
                         <span>{focalLength}mm</span>
                     </div>
                     <input type="range" min="16" max="200" value={focalLength} onChange={(e) => setFocalLength(Number(e.target.value))} className="w-full accent-white" />
                 </div>
                 <div>
                     <div className="flex justify-between mb-2 text-sm text-zinc-400">
                         <span>Aperture</span>
                         <span>f/{aperture}</span>
                     </div>
                     <input type="range" min="1.4" max="22" step="0.1" value={aperture} onChange={(e) => setAperture(Number(e.target.value))} className="w-full accent-white" />
                 </div>
                 <div>
                     <div className="flex justify-between mb-2 text-sm text-zinc-400">
                         <span>Subject Distance</span>
                         <span>{distance}m</span>
                     </div>
                     <input type="range" min="0.5" max="20" step="0.5" value={distance} onChange={(e) => setDistance(Number(e.target.value))} className="w-full accent-white" />
                 </div>
            </div>
        </div>
    );
}

export default DofCalculator;
