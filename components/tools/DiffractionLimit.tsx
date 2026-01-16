
import React, { useState } from 'react';
import { Aperture, Grid, AlertTriangle } from 'lucide-react';

const SENSORS = [
    { id: 'ff', name: 'Full Frame', w: 36, h: 24, crop: 1 },
    { id: 'apsc_sony', name: 'APS-C (Sony/Nikon)', w: 23.5, h: 15.6, crop: 1.5 },
    { id: 'apsc_canon', name: 'APS-C (Canon)', w: 22.3, h: 14.9, crop: 1.6 },
    { id: 'm43', name: 'Micro 4/3', w: 17.3, h: 13, crop: 2.0 },
    { id: 'gfx', name: 'Medium Format (GFX)', w: 43.8, h: 32.9, crop: 0.79 },
];

const DiffractionLimit: React.FC = () => {
    const [sensorId, setSensorId] = useState('ff');
    const [megapixels, setMegapixels] = useState(24);
    const [aperture, setAperture] = useState(8);

    const activeSensor = SENSORS.find(s => s.id === sensorId) || SENSORS[0];

    // Physics Calculations
    // 1. Calculate Pixel Pitch (width of one pixel in microns)
    // Resolution Width approx = sqrt(MP * AspectRatio). For 3:2, W^2 / 1.5 = TotalPixels -> W = sqrt(Total * 1.5)
    // Simplified: Total Pixels = (W_mm * Pitch) * (H_mm * Pitch)
    // Pitch^2 = Area_mm / TotalPixels
    const areaMm = activeSensor.w * activeSensor.h;
    const totalPixels = megapixels * 1000000;
    const pixelPitchMicrons = Math.sqrt((areaMm / totalPixels)) * 1000;

    // 2. Calculate Airy Disk Diameter
    // D = 2.44 * wavelength * f-stop
    // Green light wavelength approx 0.55 microns
    const airyDiskDiameter = 2.44 * 0.55 * aperture;

    // 3. Diffraction Limit (DLA)
    // Diffraction starts becoming visible when Airy Disk > 2 * Pixel Pitch (approx)
    // Or strictly when Airy Disk > Pixel Pitch
    // DLA = PixelPitch / (2.44 * 0.55) roughly
    const dla = pixelPitchMicrons / (2.44 * 0.55);
    
    // Status
    const isDiffracted = airyDiskDiameter > (pixelPitchMicrons * 2.0); // Visible softening
    const isSevere = airyDiskDiameter > (pixelPitchMicrons * 3.0); // Severe softening

    return (
        <div className="max-w-6xl mx-auto p-4 animate-slide-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Diffraction Limit Calculator</h2>
                <p className="text-zinc-400">Physics simulation of optical sharpness limits based on your sensor.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Visualizer */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 relative flex flex-col items-center justify-center min-h-[400px]">
                     <h3 className="absolute top-6 left-6 text-xs font-bold text-zinc-500 uppercase tracking-widest">Microscopic View</h3>
                     
                     {/* The Pixel Grid */}
                     <div className="relative w-64 h-64 grid grid-cols-4 grid-rows-4 border border-zinc-700">
                         {Array.from({length: 16}).map((_, i) => (
                             <div key={i} className="border border-zinc-800 bg-zinc-900/50 flex items-center justify-center">
                                 {i === 5 && <span className="text-[10px] text-zinc-600 font-mono">{pixelPitchMicrons.toFixed(1)}µm</span>}
                             </div>
                         ))}
                         
                         {/* The Airy Disk (Light Point) */}
                         <div 
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm transition-all duration-300 mix-blend-screen ${isSevere ? 'bg-red-500/50' : isDiffracted ? 'bg-amber-400/60' : 'bg-green-400/80'}`}
                            style={{ 
                                width: `${(airyDiskDiameter / pixelPitchMicrons) * 25}%`, // Scale relative to grid cell (25% is one cell)
                                height: `${(airyDiskDiameter / pixelPitchMicrons) * 25}%`,
                                boxShadow: `0 0 ${airyDiskDiameter}px ${isSevere ? 'rgba(255,0,0,0.4)' : 'rgba(0,255,0,0.2)'}`
                            }}
                         />
                         
                         {/* Central Point */}
                         <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 z-10"></div>
                     </div>

                     <div className="mt-8 text-center space-y-2">
                         <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${isSevere ? 'bg-red-900/20 border-red-500/50 text-red-400' : isDiffracted ? 'bg-amber-900/20 border-amber-500/50 text-amber-400' : 'bg-green-900/20 border-green-500/50 text-green-400'}`}>
                             {isSevere ? <AlertTriangle size={16}/> : <Aperture size={16}/>}
                             {isSevere ? 'Severe Diffraction (Soft)' : isDiffracted ? 'Diffraction Visible' : 'Sharp (Optics Limited)'}
                         </div>
                         <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                             At f/{aperture}, the point of light spreads to {airyDiskDiameter.toFixed(1)}µm, covering {(airyDiskDiameter/pixelPitchMicrons).toFixed(1)} pixels.
                         </p>
                     </div>
                </div>

                {/* Controls & Stats */}
                <div className="flex flex-col gap-6">
                    {/* Settings Box */}
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-6">
                         <div>
                             <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Camera Sensor</label>
                             <div className="grid grid-cols-2 gap-2">
                                 {SENSORS.map(s => (
                                     <button
                                        key={s.id}
                                        onClick={() => setSensorId(s.id)}
                                        className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${sensorId === s.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                                     >
                                         {s.name}
                                     </button>
                                 ))}
                             </div>
                         </div>

                         <div>
                             <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Resolution</label>
                                <span className="text-sm font-mono text-white">{megapixels} MP</span>
                             </div>
                             <input 
                                type="range" min="10" max="100" step="1" 
                                value={megapixels} 
                                onChange={(e) => setMegapixels(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                             />
                             <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
                                 <span>12MP (Old)</span>
                                 <span>100MP (Medium Format)</span>
                             </div>
                         </div>

                         <div className="pt-4 border-t border-zinc-800">
                             <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Aperture</label>
                                <span className="text-xl font-mono text-white font-bold">f/{aperture}</span>
                             </div>
                             <input 
                                type="range" min="1.4" max="32" step="0.1" 
                                value={aperture} 
                                onChange={(e) => setAperture(parseFloat(e.target.value))}
                                className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-colors ${isDiffracted ? 'bg-red-900/50 accent-red-500' : 'bg-zinc-700 accent-emerald-500'}`}
                             />
                         </div>
                    </div>

                    {/* Results Box */}
                    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-xl flex-1 flex flex-col justify-center">
                         <div className="flex items-center gap-3 mb-6">
                             <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                                 <Grid className="text-zinc-400" size={24} />
                             </div>
                             <div>
                                 <h4 className="text-sm font-bold text-white">Pixel Pitch</h4>
                                 <p className="text-xs text-zinc-400">Physical size of one pixel</p>
                             </div>
                             <div className="ml-auto text-xl font-mono text-blue-400">{pixelPitchMicrons.toFixed(2)}µm</div>
                         </div>

                         <div className="flex items-center gap-3">
                             <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                                 <AlertTriangle className={isDiffracted ? "text-amber-500" : "text-zinc-600"} size={24} />
                             </div>
                             <div>
                                 <h4 className="text-sm font-bold text-white">Diffraction Limit (DLA)</h4>
                                 <p className="text-xs text-zinc-400">Aperture where softness begins</p>
                             </div>
                             <div className="ml-auto text-xl font-mono font-bold text-white">f/{dla.toFixed(1)}</div>
                         </div>
                         
                         <div className="mt-6 p-4 bg-black/20 rounded-lg text-xs text-zinc-400 leading-relaxed border border-white/5">
                             <strong>Pro Tip:</strong> For this {megapixels}MP camera, avoid stopping down past <strong>f/{Math.floor(dla * 2) / 2}</strong> if you want pixel-perfect sharpness. Beyond this, the physics of light diffraction will make the image softer than the sensor's resolution.
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiffractionLimit;
