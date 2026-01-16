
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Sun, Timer, Aperture, Gauge, AlertCircle, ArrowRightLeft } from 'lucide-react';

// Data Constants (1 Stop Increments)
const F_STOPS = [1.4, 2.0, 2.8, 4.0, 5.6, 8.0, 11, 16, 22];
const SHUTTER_SPEEDS = [
    '1/4000', '1/2000', '1/1000', '1/500', '1/250', '1/125', 
    '1/60', '1/30', '1/15', '1/8', '1/4', '1/2', 
    '1"', '2"', '4"', '8"', '15"', '30"'
];
const ISOS = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600];

type SettingType = 'aperture' | 'shutter' | 'iso';

const EquivalentExposure: React.FC = () => {
    // Indices for the arrays above
    const [apertureIdx, setApertureIdx] = useState(2); // f/2.8
    const [shutterIdx, setShutterIdx] = useState(6);   // 1/60
    const [isoIdx, setIsoIdx] = useState(4);           // 1600

    const [isLocked, setIsLocked] = useState(false);
    const [compensateWith, setCompensateWith] = useState<SettingType>('shutter');
    const [lockedEV, setLockedEV] = useState(0);
    const [limitWarning, setLimitWarning] = useState<string | null>(null);

    // Calculate current Light Value (Relative)
    // Aperture: Higher index = Less light (-1 per step)
    // Shutter: Higher index = More light (+1 per step)
    // ISO: Higher index = More light (+1 per step)
    const currentEV = shutterIdx + isoIdx - apertureIdx;

    useEffect(() => {
        if (isLocked) {
            setLockedEV(currentEV);
        } else {
            setLimitWarning(null);
        }
    }, [isLocked]);

    const handleChange = (type: SettingType, direction: 'up' | 'down') => {
        setLimitWarning(null);

        // 1. Calculate the proposed change for the target setting
        let newAperture = apertureIdx;
        let newShutter = shutterIdx;
        let newIso = isoIdx;
        let changeAmount = direction === 'up' ? 1 : -1;

        if (type === 'aperture') {
            newAperture += changeAmount;
            if (newAperture < 0 || newAperture >= F_STOPS.length) return; // Clamp manual input
        } else if (type === 'shutter') {
            newShutter += changeAmount;
            if (newShutter < 0 || newShutter >= SHUTTER_SPEEDS.length) return;
        } else if (type === 'iso') {
            newIso += changeAmount;
            if (newIso < 0 || newIso >= ISOS.length) return;
        }

        // 2. If Locked, calculate necessary compensation on the other setting
        if (isLocked) {
            // How much light did we just add/remove?
            // EV = S + I - A
            // NewEV - OldEV = Difference we need to counteract
            const newTempEV = newShutter + newIso - newAperture;
            const diff = newTempEV - lockedEV; // e.g. +1 stop (too bright)

            // We need to apply -diff to the Compensation control to balance it out
            if (diff !== 0) {
                if (compensateWith === 'shutter') {
                    // To remove light (diff > 0), we need to lower shutter index (faster speed)
                    // NewShutter = OldShutter - diff
                    newShutter = newShutter - diff;
                } else if (compensateWith === 'iso') {
                    // To remove light (diff > 0), we need to lower ISO index
                    newIso = newIso - diff;
                } else if (compensateWith === 'aperture') {
                    // To remove light (diff > 0), we need to RAISE aperture index (smaller hole)
                    // NewAperture = OldAperture + diff
                    newAperture = newAperture + diff;
                }

                // Check limits of compensation
                if (newShutter < 0 || newShutter >= SHUTTER_SPEEDS.length ||
                    newIso < 0 || newIso >= ISOS.length ||
                    newAperture < 0 || newAperture >= F_STOPS.length) {
                    setLimitWarning(`Limit reached for ${compensateWith}! Cannot maintain exposure.`);
                    return; // Reject the change
                }
            }
        }

        // 3. Apply changes
        setApertureIdx(newAperture);
        setShutterIdx(newShutter);
        setIsoIdx(newIso);
    };

    const toggleLock = () => {
        setIsLocked(!isLocked);
    };

    return (
        <div className="max-w-5xl mx-auto p-4 animate-slide-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Equivalent Exposure Locker</h2>
                <p className="text-zinc-400">Lock your brightness and trade settings. Learn the law of reciprocity.</p>
            </div>

            {/* MAIN INTERFACE */}
            <div className={`relative bg-zinc-900 border rounded-3xl p-8 transition-colors duration-500 ${isLocked ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-zinc-800'}`}>
                
                {/* Status Bar */}
                <div className="flex justify-between items-center mb-8 bg-black/40 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleLock}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg ${isLocked ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'}`}
                        >
                            {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                            {isLocked ? 'EV LOCKED' : 'EV UNLOCKED'}
                        </button>
                        {isLocked && (
                            <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400 animate-fade-in">
                                <ArrowRightLeft size={14} />
                                <span>Adjusting others compensates <strong>{compensateWith}</strong></span>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Light Value</span>
                        <div className="flex items-center gap-2">
                            <Sun size={16} className={isLocked ? "text-emerald-400" : "text-zinc-600"} />
                            <span className="font-mono font-bold text-xl text-white">{currentEV + 10}</span> {/* +10 arbitrary offset for prettier number */}
                        </div>
                    </div>
                </div>

                {limitWarning && (
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 bg-red-500/90 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl animate-bounce flex items-center gap-2">
                        <AlertCircle size={14} /> {limitWarning}
                    </div>
                )}

                {/* DIALS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* APERTURE CARD */}
                    <ControlCard 
                        label="Aperture"
                        icon={<Aperture size={24} className="text-blue-400" />}
                        value={`f/${F_STOPS[apertureIdx]}`}
                        subtext={apertureIdx < 3 ? "Blurry Background" : apertureIdx > 6 ? "Deep Focus" : "Standard"}
                        onUp={() => handleChange('aperture', 'up')} // Increase index = Smaller hole = Darker
                        onDown={() => handleChange('aperture', 'down')} // Decrease index = Larger hole = Brighter
                        isLocked={isLocked}
                        isCompensator={compensateWith === 'aperture'}
                        onSelectCompensator={() => setCompensateWith('aperture')}
                        highlightColor="border-blue-500/50"
                        barColor="bg-blue-500"
                        percent={(1 - apertureIdx / (F_STOPS.length - 1)) * 100} // Inverse for bar (Low index is big hole/more light)
                    />

                    {/* SHUTTER CARD */}
                    <ControlCard 
                        label="Shutter Speed"
                        icon={<Timer size={24} className="text-amber-400" />}
                        value={SHUTTER_SPEEDS[shutterIdx]}
                        subtext={shutterIdx < 8 ? "Motion Blur" : "Action Freeze"}
                        onUp={() => handleChange('shutter', 'up')} // Increase index = Longer time = Brighter
                        onDown={() => handleChange('shutter', 'down')} // Decrease index = Shorter time = Darker
                        isLocked={isLocked}
                        isCompensator={compensateWith === 'shutter'}
                        onSelectCompensator={() => setCompensateWith('shutter')}
                        highlightColor="border-amber-500/50"
                        barColor="bg-amber-500"
                        percent={(shutterIdx / (SHUTTER_SPEEDS.length - 1)) * 100}
                    />

                    {/* ISO CARD */}
                    <ControlCard 
                        label="ISO"
                        icon={<Gauge size={24} className="text-purple-400" />}
                        value={ISOS[isoIdx].toString()}
                        subtext={isoIdx < 3 ? "Clean Image" : "Noisy/Grainy"}
                        onUp={() => handleChange('iso', 'up')} // Increase index = More sensitivity = Brighter
                        onDown={() => handleChange('iso', 'down')}
                        isLocked={isLocked}
                        isCompensator={compensateWith === 'iso'}
                        onSelectCompensator={() => setCompensateWith('iso')}
                        highlightColor="border-purple-500/50"
                        barColor="bg-purple-500"
                        percent={(isoIdx / (ISOS.length - 1)) * 100}
                    />

                </div>

                {/* Explanation */}
                <div className="mt-8 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6 flex gap-4 items-start">
                    <div className="p-3 bg-zinc-800 rounded-xl text-zinc-400 shrink-0">
                        <ArrowRightLeft size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm uppercase mb-1">Reciprocity Law</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            When <strong>EV Lock</strong> is active, changing one setting forces the tool to adjust the 
                            <span className="text-emerald-400 font-bold"> AUTO</span> selected dial in the opposite direction. 
                            If you stop down the aperture (darker), the shutter must stay open longer (brighter) to capture the same amount of light.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ControlCardProps {
    label: string;
    icon: React.ReactNode;
    value: string;
    subtext: string;
    onUp: () => void;
    onDown: () => void;
    isLocked: boolean;
    isCompensator: boolean;
    onSelectCompensator: () => void;
    highlightColor: string;
    barColor: string;
    percent: number;
}

const ControlCard: React.FC<ControlCardProps> = ({ 
    label, icon, value, subtext, onUp, onDown, 
    isLocked, isCompensator, onSelectCompensator,
    highlightColor, barColor, percent 
}) => {
    return (
        <div className={`relative bg-zinc-900 p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-4 group ${isCompensator && isLocked ? `bg-zinc-800 ${highlightColor} scale-[1.02] shadow-xl` : 'border-zinc-800 hover:border-zinc-700'}`}>
            
            {/* Header */}
            <div className="flex items-center gap-3 w-full border-b border-zinc-800 pb-4 justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800">{icon}</div>
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{label}</span>
                </div>
                {isLocked && (
                    <button 
                        onClick={onSelectCompensator}
                        className={`text-[10px] font-bold px-2 py-1 rounded border transition-colors ${isCompensator ? 'bg-emerald-500 text-black border-emerald-500 cursor-default' : 'bg-zinc-950 text-zinc-500 border-zinc-700 hover:text-white hover:border-zinc-500'}`}
                    >
                        {isCompensator ? 'AUTO' : 'MANUAL'}
                    </button>
                )}
            </div>

            {/* Value Display */}
            <div className="text-center py-2">
                <div className="text-4xl font-black text-white font-mono tracking-tighter transition-all">
                    {value}
                </div>
                <div className="text-xs font-medium text-zinc-500 mt-1">{subtext}</div>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                <div className={`h-full ${barColor} transition-all duration-300`} style={{ width: `${percent}%` }}></div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-2 w-full mt-auto">
                <button 
                    onClick={onDown}
                    disabled={isLocked && isCompensator}
                    className={`py-3 rounded-xl font-bold text-lg transition-all border ${isLocked && isCompensator ? 'bg-zinc-900 text-zinc-700 border-zinc-800 cursor-not-allowed opacity-50' : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white hover:border-zinc-600'}`}
                >
                    -
                </button>
                <button 
                    onClick={onUp}
                    disabled={isLocked && isCompensator}
                    className={`py-3 rounded-xl font-bold text-lg transition-all border ${isLocked && isCompensator ? 'bg-zinc-900 text-zinc-700 border-zinc-800 cursor-not-allowed opacity-50' : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white hover:border-zinc-600'}`}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default EquivalentExposure;
