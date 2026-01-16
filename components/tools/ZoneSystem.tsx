
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Info, Layers, Eye } from 'lucide-react';

const ZONES = [
    { id: 0, label: '0', name: 'Pure Black', desc: 'No detail. Total darkness.', range: [0, 15], color: '#000000' },
    { id: 1, label: 'I', name: 'Near Black', desc: 'Slight tonality, no texture.', range: [16, 35], color: '#1a1a1a' },
    { id: 2, label: 'II', name: 'Texture Black', desc: 'Deepest shadows with hint of texture.', range: [36, 55], color: '#333333' },
    { id: 3, label: 'III', name: 'Shadows', desc: 'Average dark materials. Shadow detail.', range: [56, 80], color: '#4d4d4d' },
    { id: 4, label: 'IV', name: 'Dark Skin', desc: 'Dark foliage, landscape shadows, darker skin.', range: [81, 105], color: '#666666' },
    { id: 5, label: 'V', name: 'Middle Grey', desc: '18% Grey. Clear N. sky, darker skin, average foliage.', range: [106, 145], color: '#808080' },
    { id: 6, label: 'VI', name: 'Caucasian Skin', desc: 'Average Caucasian skin, light stone, shadows on snow.', range: [146, 175], color: '#999999' },
    { id: 7, label: 'VII', name: 'Light Skin', desc: 'Very light skin, bright concrete, pale sand.', range: [176, 205], color: '#b3b3b3' },
    { id: 8, label: 'VIII', name: 'Texture White', desc: 'Highlights with texture. White wall, snow texture.', range: [206, 230], color: '#cccccc' },
    { id: 9, label: 'IX', name: 'Near White', desc: 'Slight tonality, no texture. Glare.', range: [231, 245], color: '#e6e6e6' },
    { id: 10, label: 'X', name: 'Pure White', desc: 'Specular highlights. Light sources. No detail.', range: [246, 255], color: '#ffffff' },
];

const ZoneSystem: React.FC = () => {
    const [image, setImage] = useState<string>('https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=1000&auto=format&fit=crop'); // B&W suitable default
    const [activeZone, setActiveZone] = useState<number | null>(5); // Default to Middle Grey
    const [showFalseColor, setShowFalseColor] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const overlayRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load and Process Image
    useEffect(() => {
        const img = new Image();
        img.src = image;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = canvasRef.current;
            const overlay = overlayRef.current;
            if (!canvas || !overlay) return;

            const ctx = canvas.getContext('2d');
            const overlayCtx = overlay.getContext('2d');
            if (!ctx || !overlayCtx) return;

            // Resize canvas to match image aspect ratio, capped at 800px width for performance
            const scale = Math.min(1, 800 / img.width);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            overlay.width = canvas.width;
            overlay.height = canvas.height;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            processZones();
        };
    }, [image, activeZone, showFalseColor]);

    const processZones = () => {
        const canvas = canvasRef.current;
        const overlay = overlayRef.current;
        if (!canvas || !overlay) return;

        const ctx = canvas.getContext('2d');
        const overlayCtx = overlay.getContext('2d');
        if (!ctx || !overlayCtx) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const overlayData = overlayCtx.createImageData(canvas.width, canvas.height);
        
        // Loop through pixels
        for (let i = 0; i < data.length; i += 4) {
            // Calculate Luminance (Perceived brightness)
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

            if (showFalseColor) {
                // False Color Mode: Map every pixel to a zone color
                const zone = ZONES.find(z => lum >= z.range[0] && lum <= z.range[1]);
                if (zone) {
                    // Assign arbitrary false colors for visualization
                    const colors = [
                        [0,0,255], [0,50,255], [0,100,255], // 0-2 Blue
                        [0,255,255], [0,255,100], [0,255,0], // 3-5 Green/Cyan
                        [255,255,0], [255,150,0], [255,0,0], // 6-8 Yellow/Red
                        [255,0,255], [255,255,255] // 9-10 Pink/White
                    ];
                    const [fr, fg, fb] = colors[zone.id];
                    overlayData.data[i] = fr;
                    overlayData.data[i + 1] = fg;
                    overlayData.data[i + 2] = fb;
                    overlayData.data[i + 3] = 255;
                }
            } else if (activeZone !== null) {
                // Single Zone Mode: Highlight only specific range
                const target = ZONES[activeZone];
                if (lum >= target.range[0] && lum <= target.range[1]) {
                    // Highlight color (Fuschia)
                    overlayData.data[i] = 255;
                    overlayData.data[i + 1] = 0;
                    overlayData.data[i + 2] = 255;
                    overlayData.data[i + 3] = 200; // Semi-transparent
                } else {
                    overlayData.data[i + 3] = 0; // Transparent
                }
            } else {
                overlayData.data[i + 3] = 0;
            }
        }
        
        overlayCtx.putImageData(overlayData, 0, 0);
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 animate-slide-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 font-serif tracking-tight">Zone System Mapper</h2>
                <p className="text-zinc-400">Visualize exposure zones to master dynamic range (Ansel Adams method).</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Visualizer */}
                <div className="flex-1">
                    <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] flex items-center justify-center group">
                         <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-contain z-10" />
                         <canvas ref={overlayRef} className="absolute inset-0 w-full h-full object-contain z-20 mix-blend-screen pointer-events-none" />
                         
                         <div className="absolute top-4 right-4 z-30 flex gap-2">
                             <button 
                                onClick={() => setShowFalseColor(!showFalseColor)}
                                className={`p-2 rounded-lg backdrop-blur-md border transition-all flex items-center gap-2 text-xs font-bold ${showFalseColor ? 'bg-indigo-500/80 text-white border-indigo-400' : 'bg-black/60 text-zinc-300 border-white/10 hover:bg-black/80'}`}
                             >
                                 <Layers size={16} /> False Color
                             </button>
                             <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white transition-colors"
                             >
                                 <Upload size={16} />
                             </button>
                         </div>
                         <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
                    </div>
                </div>

                {/* Controls */}
                <div className="lg:w-96 flex flex-col gap-4">
                     {/* Info Box */}
                     <div className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-2xl border border-white/5">
                         {showFalseColor ? (
                            <div className="space-y-2">
                                <h3 className="text-white font-bold flex items-center gap-2 font-serif tracking-wide"><Layers size={18}/> False Color Map</h3>
                                <p className="text-xs text-zinc-400">
                                    This mode (often used in cinema cameras) maps every luminosity value to a specific color, allowing you to instantly see exposure ratios across the entire frame.
                                </p>
                                <div className="h-4 w-full rounded bg-gradient-to-r from-blue-600 via-green-500 via-yellow-400 to-white mt-2"></div>
                                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                                    <span>Shadows</span>
                                    <span>Midtones</span>
                                    <span>Highlights</span>
                                </div>
                            </div>
                         ) : activeZone !== null ? (
                             <div className="space-y-2 animate-fade-in">
                                 <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-bold text-white font-serif tracking-wide">Zone {ZONES[activeZone].label}</h3>
                                    <span className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400 font-mono">Lum: {ZONES[activeZone].range.join('-')}</span>
                                 </div>
                                 <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wide">{ZONES[activeZone].name}</h4>
                                 <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-emerald-500/30 pl-3">
                                     {ZONES[activeZone].desc}
                                 </p>
                             </div>
                         ) : (
                             <div className="flex flex-col items-center justify-center py-4 text-zinc-500 gap-2">
                                 <Info size={24} />
                                 <p className="text-sm">Select a zone below to map it.</p>
                             </div>
                         )}
                     </div>

                     {/* Zone Selector */}
                     <div className="bg-zinc-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                         <div className="flex justify-between items-center mb-4">
                             <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Zone Scale</span>
                             <button onClick={() => { setActiveZone(null); setShowFalseColor(false); }} className="text-[10px] text-zinc-400 hover:text-white underline">Clear</button>
                         </div>
                         <div className="space-y-1">
                             {ZONES.map((zone) => (
                                 <button
                                    key={zone.id}
                                    onClick={() => { setActiveZone(zone.id); setShowFalseColor(false); }}
                                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all text-left group ${activeZone === zone.id && !showFalseColor ? 'bg-zinc-800 ring-1 ring-fuchsia-500' : 'hover:bg-zinc-800/50'}`}
                                 >
                                     <div 
                                        className="w-8 h-8 rounded border border-zinc-700 shrink-0"
                                        style={{ backgroundColor: zone.color }}
                                     ></div>
                                     <div className="flex-1 min-w-0">
                                         <div className="flex justify-between items-baseline">
                                             <span className={`text-sm font-bold font-mono ${activeZone === zone.id && !showFalseColor ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>Zone {zone.label}</span>
                                             {activeZone === zone.id && !showFalseColor && <Eye size={12} className="text-fuchsia-500" />}
                                         </div>
                                         <div className="text-[10px] text-zinc-500 truncate">{zone.name}</div>
                                     </div>
                                 </button>
                             ))}
                         </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ZoneSystem;
