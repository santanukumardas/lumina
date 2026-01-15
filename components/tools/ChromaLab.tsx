
import React, { useState, useRef } from 'react';
import { Upload, Palette } from 'lucide-react';

const ChromaLab: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [palette, setPalette] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImage(url);
            extractColors(url);
        }
    };

    const extractColors = (src: string) => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            canvas.width = 100; // Small sample size for performance
            canvas.height = 100;
            ctx.drawImage(img, 0, 0, 100, 100);
            
            const imageData = ctx.getImageData(0, 0, 100, 100).data;
            const colorCounts: Record<string, number> = {};
            
            for (let i = 0; i < imageData.length; i += 4 * 10) { // Sample every 10th pixel
                const r = imageData[i];
                const g = imageData[i + 1];
                const b = imageData[i + 2];
                // Simple quantization: rounding to nearest 30
                const rQ = Math.round(r / 30) * 30;
                const gQ = Math.round(g / 30) * 30;
                const bQ = Math.round(b / 30) * 30;
                const key = `${rQ},${gQ},${bQ}`;
                colorCounts[key] = (colorCounts[key] || 0) + 1;
            }

            const sorted = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
            const top5 = sorted.slice(0, 5).map(entry => {
                const [r, g, b] = entry[0].split(',').map(Number);
                return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            });
            setPalette(top5);
        };
    };

    return (
        <div className="max-w-5xl mx-auto p-4 animate-slide-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Chroma Lab</h2>
                <p className="text-zinc-400">Extract color palettes from your photos to understand harmony.</p>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl isolate" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                 <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full aspect-video max-h-[40vh] mx-auto rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden ${image ? 'border-transparent' : 'border-zinc-700 hover:bg-zinc-800'}`}
                >
                    {image ? (
                        <img src={image} className="w-full h-full object-contain bg-black" />
                    ) : (
                        <div className="text-center">
                            <Upload className="mx-auto mb-2 text-zinc-500" size={32} />
                            <p className="text-zinc-400 font-bold">Upload Reference Photo</p>
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
                 </div>
                 
                 <canvas ref={canvasRef} className="hidden" />

                 {palette.length > 0 && (
                     <div className="mt-8">
                         <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Palette size={18} /> Extracted Palette</h3>
                         <div className="grid grid-cols-5 gap-2 md:gap-4">
                             {palette.map((hex, i) => (
                                 <div key={i} className="flex flex-col gap-2 group">
                                     <div className="aspect-square rounded-xl shadow-lg transition-transform group-hover:scale-105" style={{ backgroundColor: hex }}></div>
                                     <span className="text-xs text-center font-mono text-zinc-500 select-all cursor-pointer hover:text-white transition-colors">
                                         {hex.toUpperCase()}
                                     </span>
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}
            </div>
        </div>
    );
};

export default ChromaLab;
