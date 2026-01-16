
import React, { useState, useRef, useEffect } from 'react';
import { 
    Camera, 
    Users, 
    Zap, 
    ScanLine, 
    Maximize2, 
    RotateCcw, 
    Trash2, 
    Save, 
    Download, 
    Box, 
    Square, 
    MoreHorizontal,
    Sun,
    ChevronUp,
    ChevronDown,
    Layers,
    Move,
    Palette,
    Sliders
} from 'lucide-react';

interface StudioItem {
    id: number;
    type: 'camera' | 'subject' | 'softbox' | 'strobe' | 'rim' | 'reflector' | 'background' | 'vflat' | 'chair' | 'table';
    x: number;
    y: number;
    rotation: number;
    scale: number;
    color?: string; // For gels or prop colors
    beamAngle?: number; // Visual spread width (px)
    intensity?: number; // Opacity of beam
}

const DEFAULT_SETUP: StudioItem[] = [
    { id: 1, type: 'background', x: 50, y: 20, rotation: 0, scale: 1.5, color: '#333333' },
    { id: 2, type: 'subject', x: 50, y: 50, rotation: 0, scale: 1 },
    { id: 3, type: 'camera', x: 50, y: 80, rotation: 0, scale: 1 },
    { id: 4, type: 'softbox', x: 25, y: 70, rotation: 45, scale: 1, intensity: 0.6, beamAngle: 100, color: '#ffffff' },
];

const StudioPlanner: React.FC = () => {
    const [items, setItems] = useState<StudioItem[]>(DEFAULT_SETUP);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [savedSlots, setSavedSlots] = useState<{id: number, date: string}[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const draggingIdRef = useRef<number | null>(null);

    // Load saves on mount
    useEffect(() => {
        const loads = [];
        for(let i=1; i<=3; i++) {
            if(localStorage.getItem(`lumina_studio_setup_${i}`)) {
                loads.push({ id: i, date: 'Saved Setup' });
            }
        }
        setSavedSlots(loads);
    }, []);

    const addItem = (type: StudioItem['type']) => {
        let defaultBeam = 100;
        if (type === 'strobe') defaultBeam = 40;
        if (type === 'rim') defaultBeam = 150;

        const newItem: StudioItem = {
            id: Date.now(),
            type,
            x: 50 + (Math.random() * 10 - 5),
            y: 50 + (Math.random() * 10 - 5),
            rotation: type === 'background' ? 0 : 180,
            scale: 1,
            intensity: 0.5,
            beamAngle: defaultBeam,
            color: '#ffffff'
        };
        
        if (type === 'background') { newItem.scale = 2; newItem.y = 20; }
        if (type === 'vflat') { newItem.color = '#000000'; }
        
        setItems(prev => [...prev, newItem]);
        setSelectedId(newItem.id);
    };

    const updateItem = (id: number, changes: Partial<StudioItem>) => {
        setItems(prev => prev.map(i => i.id === id ? { ...i, ...changes } : i));
    };

    const deleteItem = (id: number) => {
        setItems(prev => prev.filter(i => i.id !== id));
        setSelectedId(null);
    };

    const moveLayer = (id: number, direction: 'up' | 'down') => {
        setItems(prev => {
            const index = prev.findIndex(i => i.id === id);
            if (index === -1) return prev;
            
            const newItems = [...prev];
            if (direction === 'up' && index < prev.length - 1) {
                [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
            } else if (direction === 'down' && index > 0) {
                [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
            }
            return newItems;
        });
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: number) => {
        e.stopPropagation();
        // Allow default only if not moving (to allow click selection), but here we assume drag immediately
        if (e.cancelable && 'touches' in e) e.preventDefault(); 
        
        setSelectedId(id);
        draggingIdRef.current = id;
        
        if ('touches' in e) {
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleDragEnd);
        } else {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleDragEnd);
        }
    };

    const handleDragMove = (clientX: number, clientY: number) => {
        const id = draggingIdRef.current;
        if (id === null || !containerRef.current) return;
        
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        
        const clampedX = Math.max(0, Math.min(100, x));
        const clampedY = Math.max(0, Math.min(100, y));

        updateItem(id, { x: clampedX, y: clampedY });
    };

    const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        handleDragMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        if (e.touches.length > 0) {
            handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const handleDragEnd = () => {
        draggingIdRef.current = null;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleDragEnd);
    };

    const saveSetup = (slot: number) => {
        localStorage.setItem(`lumina_studio_setup_${slot}`, JSON.stringify(items));
        const newSlots = savedSlots.filter(s => s.id !== slot);
        newSlots.push({ id: slot, date: new Date().toLocaleTimeString() });
        setSavedSlots(newSlots.sort((a,b) => a.id - b.id));
    };

    const loadSetup = (slot: number) => {
        const data = localStorage.getItem(`lumina_studio_setup_${slot}`);
        if (data) {
            setItems(JSON.parse(data));
            setSelectedId(null);
        }
    };

    const renderLightBeam = (item: StudioItem) => {
        if (!['softbox', 'strobe', 'rim'].includes(item.type)) return null;
        
        let height = 200 * item.scale;
        let width = (item.beamAngle || 100) * item.scale;
        let opacity = item.intensity || 0.3;
        
        return (
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 origin-top pointer-events-none z-0"
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    background: `linear-gradient(to bottom, ${item.color || 'white'} 0%, transparent 100%)`,
                    opacity: opacity,
                    transform: `rotate(${item.rotation}deg)`,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                }}
            />
        );
    };

    const renderIcon = (item: StudioItem) => {
        const color = item.color || '#ffffff';
        const style = { color: item.type === 'softbox' || item.type === 'strobe' ? color : undefined };

        switch(item.type) {
            case 'camera': return <div className="bg-zinc-800 p-1.5 rounded border border-zinc-600 shadow-lg"><Camera size={20} className="text-white" /></div>;
            case 'subject': return (
                <div className="relative drop-shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-zinc-300 border-2 border-white"></div>
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-zinc-300 rounded-l-full"></div> 
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-zinc-300 rounded-r-full"></div> 
                </div>
            );
            case 'softbox': return <div className="w-12 h-10 border-2 border-white bg-white/20 flex items-center justify-center shadow-lg"><Maximize2 size={16} style={style} /></div>;
            case 'strobe': return (
                <div className="w-6 h-8 bg-zinc-800 border-2 border-yellow-400 rounded-full flex items-center justify-center relative shadow-lg">
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-16 h-1 bg-yellow-400/50"></div> 
                    <Zap size={14} className="text-yellow-400" />
                </div>
            );
            case 'rim': return <div className="w-16 h-4 bg-zinc-800 border border-white flex items-center justify-center shadow-lg"><div className="w-14 h-1 bg-white"></div></div>;
            case 'reflector': return <div className="w-2 h-16 bg-white rounded-full border border-zinc-400 shadow-sm"></div>;
            case 'background': return <div className="w-64 h-4 bg-zinc-700 border-t-2 border-zinc-500 rounded-sm shadow-md" style={{ backgroundColor: item.color }}></div>;
            case 'vflat': return <div className="w-2 h-24 bg-black border border-zinc-700 shadow-xl"></div>; 
            case 'table': return <div className="w-20 h-20 bg-zinc-800 border border-zinc-600 rounded-sm flex items-center justify-center text-xs text-zinc-500 shadow-lg">Table</div>;
            case 'chair': return <div className="w-12 h-12 bg-zinc-800 border border-zinc-600 rounded-md flex items-center justify-center shadow-lg"><Box size={16}/></div>;
            default: return <div className="w-4 h-4 bg-red-500"></div>;
        }
    };

    const selectedItem = items.find(i => i.id === selectedId);
    const isLight = selectedItem && ['softbox', 'strobe', 'rim'].includes(selectedItem.type);

    return (
         <div className="max-w-6xl mx-auto p-4 animate-slide-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2 font-serif tracking-tight">Studio Planner</h2>
                <p className="text-zinc-400">Design your lighting diagram. Plan your shot.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* TOOLBAR (Top scrollable on mobile, Left on desktop) */}
                <div className="w-full lg:w-48 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 order-2 lg:order-1 scrollbar-hide shrink-0">
                    <div className="bg-zinc-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 min-w-[200px] lg:min-w-0">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Lighting</h4>
                        <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
                            <ToolBtn onClick={() => addItem('softbox')} icon={Maximize2} label="Softbox" />
                            <ToolBtn onClick={() => addItem('strobe')} icon={Zap} label="Strobe" />
                            <ToolBtn onClick={() => addItem('rim')} icon={Sun} label="Strip" />
                            <ToolBtn onClick={() => addItem('reflector')} icon={ScanLine} label="Refl" />
                        </div>
                    </div>

                    <div className="bg-zinc-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 min-w-[200px] lg:min-w-0">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Props</h4>
                        <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
                            <ToolBtn onClick={() => addItem('subject')} icon={Users} label="Subject" />
                            <ToolBtn onClick={() => addItem('camera')} icon={Camera} label="Camera" />
                            <ToolBtn onClick={() => addItem('background')} icon={ScanLine} label="Back" rotate />
                            <ToolBtn onClick={() => addItem('vflat')} icon={Square} label="V-Flat" />
                        </div>
                    </div>

                    <div className="bg-zinc-900/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 min-w-[140px] lg:min-w-0 flex flex-col justify-center">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Actions</h4>
                        <button onClick={() => { setItems([]); setSelectedId(null); }} className="w-full p-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-red-500/20">
                            <Trash2 size={14} /> Clear
                        </button>
                    </div>
                </div>

                {/* CENTER: Canvas */}
                <div 
                    className="flex-1 aspect-square lg:aspect-[4/3] max-h-[60vh] bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-2xl relative overflow-hidden group shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] order-1 lg:order-2 touch-none"
                    ref={containerRef}
                    onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}
                    onTouchStart={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}
                >
                     <div className="absolute inset-0 opacity-10 pointer-events-none" 
                        style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                     />
                     
                     {items.map(item => (
                         <div
                            key={item.id}
                            onMouseDown={(e) => handleDragStart(e, item.id)}
                            onTouchStart={(e) => handleDragStart(e, item.id)}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-move transition-opacity hover:opacity-90 ${selectedId && selectedId !== item.id ? 'opacity-70 grayscale-[0.5]' : 'opacity-100'}`}
                            style={{ 
                                left: `${item.x}%`, 
                                top: `${item.y}%`,
                                transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale})`,
                                zIndex: selectedId === item.id ? 50 : 10
                            }}
                         >
                             <div className="absolute top-1/2 left-1/2 w-0 h-0 -z-10">{renderLightBeam(item)}</div>
                             <div className={`p-2 transition-all duration-200 ${selectedId === item.id ? 'drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : ''}`}>{renderIcon(item)}</div>
                             {selectedId === item.id && <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>}
                         </div>
                     ))}
                </div>

                {/* RIGHT SIDEBAR: Properties */}
                <div className="lg:w-72 flex flex-col gap-6 order-3">
                    <div className={`bg-zinc-900/60 backdrop-blur-md p-5 rounded-2xl border transition-all duration-300 ${selectedId ? 'border-blue-500/30 ring-1 ring-blue-500/20' : 'border-white/5'}`}>
                        {selectedItem ? (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-zinc-800 rounded text-blue-400"><Sliders size={14}/></div>
                                        <div>
                                            <h3 className="font-bold text-white text-xs uppercase tracking-wide font-serif">{selectedItem.type}</h3>
                                            <p className="text-[10px] text-zinc-500 font-mono">ID: {selectedItem.id.toString().slice(-4)}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteItem(selectedItem.id)} className="p-2 hover:bg-red-900/30 text-zinc-500 hover:text-red-400 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-1"><Move size={10}/> Transform</h4>
                                    <div className="space-y-4">
                                        <ControlRange label="Rotation" value={selectedItem.rotation} min={0} max={360} step={5} unit="°" onChange={(v) => updateItem(selectedItem.id, { rotation: v })} />
                                        <ControlRange label="Scale" value={selectedItem.scale} min={0.5} max={3} step={0.1} unit="x" onChange={(v) => updateItem(selectedItem.id, { scale: v })} />
                                    </div>
                                </div>

                                {isLight && (
                                    <div className="pt-4 border-t border-zinc-800">
                                        <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-1"><Zap size={10}/> Output</h4>
                                        <div className="space-y-4">
                                            <ControlRange label="Intensity" value={selectedItem.intensity || 0.5} min={0} max={1} step={0.05} unit="" displayValue={`${Math.round((selectedItem.intensity || 0.5) * 100)}%`} onChange={(v) => updateItem(selectedItem.id, { intensity: v })} accent="yellow" />
                                            <ControlRange label="Beam" value={selectedItem.beamAngle || 100} min={20} max={300} step={10} unit="px" onChange={(v) => updateItem(selectedItem.id, { beamAngle: v })} accent="yellow" />
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-zinc-800">
                                    <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-1"><Palette size={10}/> Style</h4>
                                    <div className="flex gap-2">
                                        <div className="flex-1 flex gap-1 flex-wrap">
                                            {['#ffffff', '#ffbd00', '#00b4d8', '#ff0000', '#00ff00', '#000000'].map(c => (
                                                <button key={c} onClick={() => updateItem(selectedItem.id, { color: c })} className={`w-6 h-6 rounded-full border border-zinc-700 hover:scale-110 transition-transform ${selectedItem.color === c ? 'ring-2 ring-white' : ''}`} style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                                    <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1"><Layers size={10}/> Layer</h4>
                                    <div className="flex gap-1">
                                        <button onClick={() => moveLayer(selectedItem.id, 'down')} className="p-1.5 bg-zinc-800 text-zinc-400 hover:text-white rounded hover:bg-zinc-700"><ChevronDown size={14} /></button>
                                        <button onClick={() => moveLayer(selectedItem.id, 'up')} className="p-1.5 bg-zinc-800 text-zinc-400 hover:text-white rounded hover:bg-zinc-700"><ChevronUp size={14} /></button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-40 lg:h-64 flex flex-col items-center justify-center text-zinc-600 text-sm gap-3">
                                <div className="p-4 bg-zinc-800/50 rounded-full"><RotateCcw size={24} className="opacity-40" /></div>
                                <p>Select an item to edit</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-zinc-900/60 backdrop-blur-md p-5 rounded-2xl border border-white/5">
                        <h3 className="font-bold text-white uppercase text-xs tracking-wider mb-4 flex items-center gap-2"><Save size={14}/> Saved Setups</h3>
                        <div className="space-y-2">
                            {[1, 2, 3].map(slot => (
                                <div key={slot} className="flex gap-2 items-center group">
                                    <button onClick={() => loadSetup(slot)} disabled={!savedSlots.find(s => s.id === slot)} className="flex-1 text-left px-3 py-2 bg-zinc-800/50 hover:bg-zinc-750 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs transition-colors flex justify-between items-center border border-transparent hover:border-zinc-700">
                                        <span className="font-medium text-zinc-300">Slot {slot}</span>
                                        {savedSlots.find(s => s.id === slot) ? <span className="text-[10px] text-emerald-500 font-bold">LOAD</span> : <span className="text-[10px] text-zinc-600">EMPTY</span>}
                                    </button>
                                    <button onClick={() => saveSetup(slot)} className="p-2 bg-zinc-800/50 hover:bg-blue-600 text-zinc-400 hover:text-white rounded-lg transition-colors border border-transparent hover:border-blue-500"><Download size={14} className="rotate-180"/> </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
         </div>
    );
};

// Sub-components to clean up render
const ToolBtn = ({ onClick, icon: Icon, label, rotate }: { onClick: () => void, icon: any, label: string, rotate?: boolean }) => (
    <button onClick={onClick} className="p-2 bg-zinc-800/50 hover:bg-zinc-700 rounded-lg flex flex-col items-center gap-1 text-[10px] text-zinc-300 transition-colors border border-transparent hover:border-zinc-600 active:scale-95">
        <Icon size={18} className={rotate ? "rotate-90" : ""} /> {label}
    </button>
);

const ControlRange = ({ label, value, min, max, step, unit, onChange, displayValue, accent = "blue" }: any) => (
    <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-zinc-400">
            <span>{label}</span>
            <span className="font-mono text-zinc-500">{displayValue || `${value}${unit}`}</span>
        </div>
        <input 
            type="range" min={min} max={max} step={step}
            value={value} 
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className={`w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-${accent}-500`}
        />
    </div>
);

export default StudioPlanner;
