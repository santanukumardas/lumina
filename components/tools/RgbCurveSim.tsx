
import React, { useState, useMemo } from 'react';
import { RotateCcw, Activity } from 'lucide-react';

const RGB_IMAGES = [
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800', // Golden Hour
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800', // Winter Portrait
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800', // Architecture
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800', // Portrait Eyes
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800', // Neon
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800', // Landscape
    'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=800', // Night
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800', // Waterfall
];

type Channel = 'master' | 'red' | 'green' | 'blue';

interface CurveState {
    shadows: number;
    midtones: number;
    highlights: number;
}

const RgbCurveSim: React.FC = () => {
    // Random image on mount
    const [sourceImage] = useState(() => RGB_IMAGES[Math.floor(Math.random() * RGB_IMAGES.length)]);
    
    const [activeChannel, setActiveChannel] = useState<Channel>('master');
    const [curves, setCurves] = useState<Record<Channel, CurveState>>({
        master: { shadows: 0, midtones: 0, highlights: 0 },
        red: { shadows: 0, midtones: 0, highlights: 0 },
        green: { shadows: 0, midtones: 0, highlights: 0 },
        blue: { shadows: 0, midtones: 0, highlights: 0 },
    });

    const updateCurve = (type: keyof CurveState, val: number) => {
        setCurves(prev => ({
            ...prev,
            [activeChannel]: { ...prev[activeChannel], [type]: val }
        }));
    };

    const resetCurrent = () => {
        setCurves(prev => ({
            ...prev,
            [activeChannel]: { shadows: 0, midtones: 0, highlights: 0 }
        }));
    };

    // Calculate curve points for visualization and filter generation
    const getChannelPoints = (channel: Channel) => {
        // Start with linear
        const points = [];
        const state = curves[channel];
        
        // We use a simplified spline: 5 control points
        // 0, 0.25, 0.5, 0.75, 1.0 input
        
        // Calculate offsets (scaled down for usability, e.g. slider +/- 50 maps to +/- 0.25)
        const s = state.shadows / 200; 
        const m = state.midtones / 200;
        const h = state.highlights / 200;

        points.push({ x: 0, y: 0 });
        points.push({ x: 0.25, y: Math.max(0, Math.min(1, 0.25 + s)) });
        points.push({ x: 0.5, y: Math.max(0, Math.min(1, 0.5 + m)) });
        points.push({ x: 0.75, y: Math.max(0, Math.min(1, 0.75 + h)) });
        points.push({ x: 1, y: 1 });
        
        return points;
    };

    // Generate the combined values for the SVG filter tableValues attribute
    const generateTableValues = (colorChannel: 'red' | 'green' | 'blue') => {
        const steps = 20; // Resolution of the curve lookup table
        const values = [];

        const masterPts = getChannelPoints('master');
        const colorPts = getChannelPoints(colorChannel);

        for (let i = 0; i <= steps; i++) {
            const t = i / steps; // 0 to 1
            
            // Simple interpolation function (Linear for robustness in this simple sim)
            // Ideally cubic spline, but linear between our 5 calc points is smooth enough for visual feedback in a small graph
            
            const getVal = (pts: {x: number, y: number}[], x: number) => {
                 if (x <= 0.25) return pts[0].y + (pts[1].y - pts[0].y) * (x / 0.25);
                 if (x <= 0.5) return pts[1].y + (pts[2].y - pts[1].y) * ((x - 0.25) / 0.25);
                 if (x <= 0.75) return pts[2].y + (pts[3].y - pts[2].y) * ((x - 0.5) / 0.25);
                 return pts[3].y + (pts[4].y - pts[3].y) * ((x - 0.75) / 0.25);
            };

            // Combine master + specific channel
            // Note: Curves apply sequentially or additively. 
            // In standard processing, Master applies to RGB, then individual curves apply. 
            // Here we treat them as additive offsets to the linear line x=y.
            
            let val = t; 
            
            // Apply Master deviation
            const masterY = getVal(masterPts, t);
            val += (masterY - t);
            
            // Apply Channel deviation
            const colorY = getVal(colorPts, t);
            val += (colorY - t);
            
            values.push(Math.max(0, Math.min(1, val)));
        }
        
        return values.join(' ');
    };

    // Visual Path Generator for the Graph
    const getSvgPath = (channel: Channel) => {
        const pts = getChannelPoints(channel);
        // Convert to SVG coordinates (0,0 is top left, so y needs inversion relative to 100 height)
        // Box is 100x100
        const toSvg = (p: {x: number, y: number}) => `${p.x * 100},${100 - (p.y * 100)}`;
        
        // Catmull-Rom or similar smoothing would be better, but basic polyline is honest to the interpolation logic used above
        // Let's do a cubic bezier approximation for smoother visuals
        return `M ${toSvg(pts[0])} L ${toSvg(pts[1])} L ${toSvg(pts[2])} L ${toSvg(pts[3])} L ${toSvg(pts[4])}`;
    };

    // Derived values for filter
    const tableR = useMemo(() => generateTableValues('red'), [curves]);
    const tableG = useMemo(() => generateTableValues('green'), [curves]);
    const tableB = useMemo(() => generateTableValues('blue'), [curves]);

    return (
        <div className="max-w-7xl mx-auto p-4 animate-slide-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">RGB Curves</h2>
                <p className="text-zinc-400">Master color grading with non-linear channel adjustments.</p>
            </div>

            {/* SVG Filter Definition */}
            <svg width="0" height="0" className="absolute">
                <filter id="rgbCurves">
                    <feComponentTransfer>
                        <feFuncR type="table" tableValues={tableR} />
                        <feFuncG type="table" tableValues={tableG} />
                        <feFuncB type="table" tableValues={tableB} />
                    </feComponentTransfer>
                </filter>
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Preview */}
                <div className="space-y-4">
                     <div 
                        className="aspect-[4/3] max-h-[50vh] mx-auto w-auto bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative isolate"
                        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                     >
                        <img 
                            src={sourceImage}
                            className="w-full h-full object-cover transition-all duration-100"
                            style={{ filter: 'url(#rgbCurves)' }}
                        />
                        
                        {/* Overlay Graph for context */}
                        <div className="absolute bottom-4 right-4 w-32 h-32 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-2 pointer-events-none">
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible opacity-80">
                                {/* Grid */}
                                <line x1="0" y1="0" x2="0" y2="100" stroke="#333" strokeWidth="1"/>
                                <line x1="0" y1="100" x2="100" y2="100" stroke="#333" strokeWidth="1"/>
                                <line x1="25" y1="0" x2="25" y2="100" stroke="#333" strokeWidth="0.5" strokeDasharray="2"/>
                                <line x1="50" y1="0" x2="50" y2="100" stroke="#333" strokeWidth="0.5" strokeDasharray="2"/>
                                <line x1="75" y1="0" x2="75" y2="100" stroke="#333" strokeWidth="0.5" strokeDasharray="2"/>
                                
                                {/* Baseline */}
                                <line x1="0" y1="100" x2="100" y2="0" stroke="#444" strokeWidth="0.5" strokeDasharray="2"/>

                                {/* Active Curve */}
                                <path 
                                    d={getSvgPath(activeChannel)} 
                                    fill="none" 
                                    stroke={activeChannel === 'master' ? 'white' : activeChannel === 'red' ? '#ef4444' : activeChannel === 'green' ? '#22c55e' : '#3b82f6'} 
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                     </div>
                </div>

                {/* Controls */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col">
                    {/* Channel Tabs */}
                    <div className="flex bg-zinc-950 p-1 rounded-xl mb-8 border border-zinc-800">
                        {(['master', 'red', 'green', 'blue'] as Channel[]).map(c => (
                            <button
                                key={c}
                                onClick={() => setActiveChannel(c)}
                                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                    activeChannel === c 
                                    ? (c === 'master' ? 'bg-white text-black' : c === 'red' ? 'bg-red-500 text-white' : c === 'green' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white')
                                    : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Sliders */}
                    <div className="space-y-8 flex-1">
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                <span>Highlights</span>
                                <span>{curves[activeChannel].highlights > 0 ? '+' : ''}{curves[activeChannel].highlights}</span>
                            </div>
                            <input 
                                type="range" min="-50" max="50" 
                                value={curves[activeChannel].highlights}
                                onChange={(e) => updateCurve('highlights', parseInt(e.target.value))}
                                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${
                                    activeChannel === 'master' ? 'bg-zinc-700 accent-white' : 
                                    activeChannel === 'red' ? 'bg-red-900/30 accent-red-500' :
                                    activeChannel === 'green' ? 'bg-green-900/30 accent-green-500' :
                                    'bg-blue-900/30 accent-blue-500'
                                }`}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                <span>Midtones</span>
                                <span>{curves[activeChannel].midtones > 0 ? '+' : ''}{curves[activeChannel].midtones}</span>
                            </div>
                            <input 
                                type="range" min="-50" max="50" 
                                value={curves[activeChannel].midtones}
                                onChange={(e) => updateCurve('midtones', parseInt(e.target.value))}
                                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${
                                    activeChannel === 'master' ? 'bg-zinc-700 accent-white' : 
                                    activeChannel === 'red' ? 'bg-red-900/30 accent-red-500' :
                                    activeChannel === 'green' ? 'bg-green-900/30 accent-green-500' :
                                    'bg-blue-900/30 accent-blue-500'
                                }`}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider">
                                <span>Shadows</span>
                                <span>{curves[activeChannel].shadows > 0 ? '+' : ''}{curves[activeChannel].shadows}</span>
                            </div>
                            <input 
                                type="range" min="-50" max="50" 
                                value={curves[activeChannel].shadows}
                                onChange={(e) => updateCurve('shadows', parseInt(e.target.value))}
                                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${
                                    activeChannel === 'master' ? 'bg-zinc-700 accent-white' : 
                                    activeChannel === 'red' ? 'bg-red-900/30 accent-red-500' :
                                    activeChannel === 'green' ? 'bg-green-900/30 accent-green-500' :
                                    'bg-blue-900/30 accent-blue-500'
                                }`}
                            />
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
                         <button 
                            onClick={resetCurrent}
                            className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors"
                        >
                            <RotateCcw size={14} /> Reset {activeChannel}
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 text-center">
                <p className="text-zinc-600 text-[10px] italic opacity-70">
                    Note: Images are pulled from Unsplash and may occasionally fail to load. Please go back from the module and open again if this happens.
                </p>
            </div>
        </div>
    );
};

export default RgbCurveSim;
