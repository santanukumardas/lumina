
import React, { useState } from 'react';
import { Sun, Sparkles, EyeOff, Wind, Contrast } from 'lucide-react';
import { ImageUploader, PostProdProps } from './Shared';

// Map of default images for Post-Production tools if user hasn't uploaded one
export const POST_PROD_DEFAULTS: Record<string, string> = {
    'light-panel': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop', // Landscape for exposure
    'tone-curve': 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?q=80&w=800&auto=format&fit=crop', // Portrait for contrast
    'split-toning': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop', // Architecture for grading
    'hsl-slider': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop', // Colorful for HSL
    'clarity-sharpen': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', // Texture portrait
    'effects-panel': 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=800&auto=format&fit=crop', // Night for grain/vignette
};

// --- LIGHT PANEL (BASIC EDITS) SIMULATION ---
export const LightPanelSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
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
export const EffectsPanelSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
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
export const ToneCurveSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
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
export const SplitToningSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
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
export const HslSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
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
export const ClaritySharpenSim: React.FC<PostProdProps> = ({ image, onUpload }) => {
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
