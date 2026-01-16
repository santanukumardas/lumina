
import React, { useState } from 'react';
import { Eye, Smartphone, Camera, Check } from 'lucide-react';

const LENSES = [
    { mm: 24, color: 'border-red-500', bg: 'bg-red-500', label: '24mm (Wide)' },
    { mm: 35, color: 'border-blue-500', bg: 'bg-blue-500', label: '35mm (Street)' },
    { mm: 50, color: 'border-emerald-500', bg: 'bg-emerald-500', label: '50mm (Standard)' },
    { mm: 85, color: 'border-yellow-500', bg: 'bg-yellow-500', label: '85mm (Portrait)' },
    { mm: 135, color: 'border-purple-500', bg: 'bg-purple-500', label: '135mm (Tele)' }
];

const FovComparator: React.FC = () => {
    const [activeLenses, setActiveLenses] = useState<number[]>([24, 50, 85]);
    const [isCropSensor, setIsCropSensor] = useState(false);
    
    // Base focal length of the background image roughly corresponds to ~16mm full frame ultrawide
    const BASE_MM = 16; 
    const CROP_FACTOR = 1.5; // APS-C

    const toggleLens = (mm: number) => {
        setActiveLenses(prev => 
            prev.includes(mm) ? prev.filter(l => l !== mm) : [...prev, mm]
        );
    };

    const getFrameStyle = (mm: number) => {
        // Calculate relative scale
        // FoV logic simplified: Linear scale relative to base mm. 
        // Width Ratio ~= BaseMM / TargetMM.
        // e.g. 50mm frame on 16mm bg = 16/50 width.
        
        let effectiveMM = mm;
        if (isCropSensor) {
            // If we are simulating a crop sensor on this lens, the FoV tightens.
            // A 50mm lens on Crop behaves like 75mm. So frame gets smaller.
            effectiveMM = mm * CROP_FACTOR;
        }

        const scale = BASE_MM / effectiveMM;
        
        // Clamping min/max for CSS safety
        const widthPercent = Math.min(100, scale * 100);
        const heightPercent = Math.min(100, scale * 100); // Assuming same aspect ratio

        return {
            width: `${widthPercent}%`,
            height: `${heightPercent}%`,
        };
    };

    return (
        <div className="max-w-6xl mx-auto p-4 animate-slide-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Field of View Comparator</h2>
                <p className="text-zinc-400">Visualize different focal lengths and sensor sizes instantly.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Visualizer Area */}
                <div className="flex-1 bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl relative overflow-hidden group">
                    <div className="aspect-[3/2] w-full relative flex items-center justify-center overflow-hidden">
                        {/* Base Image (Ultrawide) */}
                        <img 
                            src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop" 
                            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3]"
                            alt="Landscape Base"
                        />
                        <div className="absolute top-4 left-4 text-[10px] bg-black/50 text-white px-2 py-1 rounded backdrop-blur-md">
                            16mm View (Base)
                        </div>

                        {/* Overlay Frames */}
                        {LENSES.map(lens => {
                            if (!activeLenses.includes(lens.mm)) return null;
                            const style = getFrameStyle(lens.mm);
                            return (
                                <div 
                                    key={lens.mm}
                                    className={`absolute border-2 ${lens.color} shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out flex flex-col justify-end`}
                                    style={{ 
                                        width: style.width, 
                                        height: style.height,
                                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3)' // Dim outside areas
                                    }}
                                >
                                    <div className={`${lens.bg} text-white text-[10px] font-bold px-2 py-0.5 self-start`}>
                                        {lens.mm}mm {isCropSensor ? `(Eq. ${Math.round(lens.mm * CROP_FACTOR)}mm)` : ''}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Controls */}
                <div className="lg:w-80 flex flex-col gap-6">
                    {/* Sensor Toggle */}
                    <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Sensor Format</h4>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setIsCropSensor(false)}
                                className={`flex-1 py-3 px-2 rounded-xl border flex flex-col items-center gap-2 transition-all ${!isCropSensor ? 'bg-zinc-800 border-white text-white' : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:bg-zinc-800'}`}
                            >
                                <Camera size={20} />
                                <span className="text-xs font-bold">Full Frame</span>
                            </button>
                            <button 
                                onClick={() => setIsCropSensor(true)}
                                className={`flex-1 py-3 px-2 rounded-xl border flex flex-col items-center gap-2 transition-all ${isCropSensor ? 'bg-zinc-800 border-emerald-500 text-white' : 'bg-zinc-900 border-zinc-700 text-zinc-500 hover:bg-zinc-800'}`}
                            >
                                <Smartphone size={20} /> {/* Using smartphone icon as proxy for smaller sensor visual */}
                                <span className="text-xs font-bold">APS-C (1.5x)</span>
                            </button>
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-3 leading-relaxed">
                            APS-C sensors are smaller, effectively "cropping" the image. A 50mm lens on APS-C has the field of view of a 75mm lens on Full Frame.
                        </p>
                    </div>

                    {/* Lens Toggles */}
                    <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Lenses</h4>
                        <div className="space-y-2">
                            {LENSES.map(lens => (
                                <button
                                    key={lens.mm}
                                    onClick={() => toggleLens(lens.mm)}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${activeLenses.includes(lens.mm) ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${lens.bg}`}></div>
                                        <span className="text-sm font-medium">{lens.label}</span>
                                    </div>
                                    {activeLenses.includes(lens.mm) && <Check size={16} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FovComparator;
