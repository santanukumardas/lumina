
import React, { useState } from 'react';

// Pool of images suitable for Long Exposure simulation (Water, Clouds, Traffic)
const ND_IMAGES = [
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800', // Water Ripple
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800', // Waterfall
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800', // Lake Mirror
    'https://images.unsplash.com/photo-1505567745926-ba89000d255a?q=80&w=800', // Stream
    'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800', // Clouds/Hills
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800', // Coast
    'https://images.unsplash.com/photo-1518182170546-0766aa6f6a56?q=80&w=800', // Flowing River
    'https://images.unsplash.com/photo-1542259685-6113b28b7762?q=80&w=800'  // Car Trails (Traffic)
];

const NdSimulator: React.FC = () => {
    // Select a random image on mount
    const [sourceImage] = useState(() => ND_IMAGES[Math.floor(Math.random() * ND_IMAGES.length)]);

    const [baseSpeed, setBaseSpeed] = useState(1/60);
    const [stops, setStops] = useState(0); // 0, 3, 6, 10
    
    // Calculate new speed: base * 2^stops
    const finalSpeed = baseSpeed * Math.pow(2, stops);
    
    const formatSpeed = (s: number) => {
        if (s < 1) return `1/${Math.round(1/s)}`;
        return `${s.toFixed(1)}s`;
    }

    const getBlur = () => {
        // Blur logic: 0 stops = sharp, 10 stops = silky
        // Base logic on final speed for realism
        if (finalSpeed < 1/30) return 0;
        if (finalSpeed < 1) return 2;
        if (finalSpeed < 5) return 5;
        return 10; // Max silk
    }

    return (
        <div className="max-w-7xl mx-auto p-4 animate-slide-up">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">ND Filter Lab</h2>
                <p className="text-zinc-400">Long Exposure Calculator & Simulator.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
                 <div className="flex-1 aspect-video max-h-[50vh] mx-auto bg-black rounded-2xl overflow-hidden relative border border-zinc-800 shadow-2xl isolate" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                     {/* Base Image */}
                     <img 
                        src={sourceImage} 
                        className="absolute inset-0 w-full h-full object-cover"
                     />
                     
                     {/* Blurred Overlay for Water/Motion */}
                     <div 
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
                        style={{ 
                            backgroundImage: `url(${sourceImage})`,
                            filter: `blur(${getBlur()}px)`,
                            opacity: finalSpeed < 1/30 ? 0 : 0.8 // Only show blur layer if speed is slow enough
                        }}
                     ></div>

                     <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-white font-mono text-sm border border-white/10">
                         Exposure: {formatSpeed(finalSpeed)}
                     </div>
                 </div>

                 <div className="w-full md:w-80 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-8 flex flex-col">
                      <div>
                          <label className="text-zinc-400 text-xs font-bold uppercase mb-2 block">Base Shutter Speed</label>
                          <select 
                            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-3 outline-none focus:border-blue-500"
                            onChange={(e) => setBaseSpeed(parseFloat(e.target.value))}
                            value={baseSpeed}
                          >
                              <option value={1/1000}>1/1000</option>
                              <option value={1/500}>1/500</option>
                              <option value={1/250}>1/250</option>
                              <option value={1/125}>1/125</option>
                              <option value={1/60}>1/60</option>
                              <option value={1/30}>1/30</option>
                          </select>
                      </div>

                      <div>
                          <label className="text-zinc-400 text-xs font-bold uppercase mb-2 block">ND Filter Strength</label>
                          <div className="grid grid-cols-2 gap-2">
                              {[0, 3, 6, 10].map(s => (
                                  <button
                                    key={s}
                                    onClick={() => setStops(s)}
                                    className={`p-3 rounded-lg text-sm font-bold transition-all ${stops === s ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                                  >
                                      {s === 0 ? 'None' : `ND ${Math.pow(2, s)} (${s} Stop)`}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-800">
                          <span className="text-zinc-500 text-xs">Final Exposure Time</span>
                          <div className="text-4xl font-bold text-white mt-1">{formatSpeed(finalSpeed)}</div>
                      </div>

                      <div className="mt-auto">
                        <p className="text-zinc-600 text-[10px] text-center italic opacity-70">
                            Note: Images are pulled from Unsplash and may occasionally fail to load. Go back and reopen to refresh.
                        </p>
                      </div>
                 </div>
            </div>
        </div>
    );
}

export default NdSimulator;
