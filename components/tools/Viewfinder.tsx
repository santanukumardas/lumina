
import React, { useState, useEffect, useRef } from 'react';
import { Grid, Maximize2, Target, AlertCircle } from 'lucide-react';

const Viewfinder: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [overlay, setOverlay] = useState<'none' | 'thirds' | 'spiral' | 'center'>('thirds');
    const [filter, setFilter] = useState<'none' | 'bw' | 'contrast'>('none');
    const [error, setError] = useState<string | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                track.stop();
            });
            streamRef.current = null;
            setIsStreaming(false);
        }
    };

    const startCamera = async () => {
        setError(null);
        try {
            // Stop existing if any (just in case)
            stopCamera();
            
            const s = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            
            streamRef.current = s;
            setIsStreaming(true);
            
            if (videoRef.current) {
                videoRef.current.srcObject = s;
                // Ensure video plays
                try {
                    await videoRef.current.play();
                } catch (e) {
                    console.error("Play error", e);
                }
            }
        } catch (err: any) {
            console.error("Camera Error:", err);
            setError("Camera access denied or unavailable. Please check browser permissions.");
        }
    };

    useEffect(() => {
        startCamera();
        
        // CLEANUP FUNCTION
        return () => {
            stopCamera();
        };
    }, []);

    const getFilterClass = () => {
        if (filter === 'bw') return 'grayscale';
        if (filter === 'contrast') return 'contrast-125';
        return '';
    }

    return (
        <div className="max-w-2xl mx-auto h-[80vh] flex flex-col p-4 animate-slide-up">
            <div className="flex-1 relative bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl isolate" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                {error ? (
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 p-6 text-center">
                        <AlertCircle size={48} className="mb-4 text-red-500" />
                        <p className="mb-4">{error}</p>
                        <button 
                            onClick={startCamera}
                            className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-white font-bold transition-colors"
                        >
                            Retry Camera
                        </button>
                    </div>
                ) : !isStreaming ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                         <div className="animate-spin w-8 h-8 border-2 border-zinc-600 border-t-white rounded-full mb-4"></div>
                         <p>Initializing Camera...</p>
                    </div>
                ) : (
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted
                        className={`w-full h-full object-cover ${getFilterClass()}`} 
                    />
                )}

                {/* Overlays */}
                {isStreaming && (
                    <div className="absolute inset-0 pointer-events-none opacity-70">
                        {overlay === 'thirds' && (
                            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                                <div className="border-r border-b border-white/50"></div>
                                <div className="border-r border-b border-white/50"></div>
                                <div className="border-b border-white/50"></div>
                                <div className="border-r border-b border-white/50"></div>
                                <div className="border-r border-b border-white/50"></div>
                                <div className="border-b border-white/50"></div>
                                <div className="border-r border-white/50"></div>
                                <div className="border-r border-white/50"></div>
                                <div></div>
                            </div>
                        )}
                        {overlay === 'center' && (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-64 h-64 border-2 border-white/50 rounded-full"></div>
                                <div className="absolute w-4 h-4 bg-white/50 rounded-full"></div>
                            </div>
                        )}
                        {overlay === 'spiral' && (
                            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                                <path d="M100,0 v100 h-100 v-61.8 h61.8 v61.8 h-38.2 v-38.2 h38.2" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
                                <path d="M100,0 A100,100 0 0 1 0,100 A61.8,61.8 0 0 1 61.8,38.2 A38.2,38.2 0 0 1 23.6,76.4" fill="none" stroke="white" strokeWidth="1" />
                            </svg>
                        )}
                    </div>
                )}

                {/* Live Badge */}
                {isStreaming && (
                    <div className="absolute top-4 left-4 px-2 py-1 bg-red-500 rounded text-[10px] font-bold text-white uppercase animate-pulse flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div> REC
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="mt-4 bg-zinc-900 p-4 rounded-2xl border border-zinc-800 flex flex-col gap-4">
                 <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-zinc-500 uppercase">Composition Grid</span>
                     <div className="flex gap-2">
                         <button onClick={() => setOverlay('thirds')} className={`p-2 rounded-lg transition-colors ${overlay === 'thirds' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}><Grid size={18} /></button>
                         <button onClick={() => setOverlay('spiral')} className={`p-2 rounded-lg transition-colors ${overlay === 'spiral' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}><Maximize2 size={18} /></button>
                         <button onClick={() => setOverlay('center')} className={`p-2 rounded-lg transition-colors ${overlay === 'center' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}><Target size={18} /></button>
                     </div>
                 </div>
                 <div className="flex justify-between items-center">
                     <span className="text-xs font-bold text-zinc-500 uppercase">View Mode</span>
                     <div className="flex gap-2">
                         <button onClick={() => setFilter('none')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${filter === 'none' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}>Standard</button>
                         <button onClick={() => setFilter('bw')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${filter === 'bw' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}>B&W</button>
                         <button onClick={() => setFilter('contrast')} className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${filter === 'contrast' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-750'}`}>Hi-Contrast</button>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default Viewfinder;
