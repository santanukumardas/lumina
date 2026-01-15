
import React, { useState } from 'react';
import { Mission } from '../../types';
import { ClipboardCheck, Trash2, RefreshCw, Shuffle } from 'lucide-react';

interface MissionGeneratorProps {
    onVerify: (mission: Mission) => void;
    existingMission: Mission | null;
    onSaveMission: (mission: Mission) => void;
    onDiscardMission: () => void;
}

const MissionGenerator: React.FC<MissionGeneratorProps> = ({ onVerify, existingMission, onSaveMission, onDiscardMission }) => {
    const [tempMission, setTempMission] = useState<Mission | null>(null);
    const [generating, setGenerating] = useState(false);
    
    // Data Pools
    const subjects = ['Architecture', 'Strangers', 'Shadows', 'Reflections', 'Nature in City', 'Motion', 'Textures', 'Portraits', 'Night Lights', 'Minimalism', 'Glass', 'Stairs', 'Hands'];
    const techniques = ['Leading Lines', 'Rule of Thirds', 'Negative Space', 'Symmetry', 'Low Angle', 'High Angle', 'Macro', 'Motion Blur', 'Silhouette', 'Framing', 'Golden Hour', 'Dutch Angle'];
    const constraints = ['Black & White', 'Square Crop', 'High Contrast', 'Overexposed', 'Underexposed', 'Only Blue Tones', 'From Hip Level', 'No Editing', 'Through a Window', 'One Lens Only', 'Soft Focus'];

    const generate = () => {
        setGenerating(true);
        setTempMission(null);

        // Simulated "shuffling" effect
        let count = 0;
        const interval = setInterval(() => {
            const nextMission = {
                subject: subjects[Math.floor(Math.random() * subjects.length)],
                technique: techniques[Math.floor(Math.random() * techniques.length)],
                constraint: constraints[Math.floor(Math.random() * constraints.length)],
                timestamp: Date.now()
            };
            setTempMission(nextMission);
            count++;
            if (count > 15) {
                clearInterval(interval);
                setGenerating(false);
                onSaveMission(nextMission); // Auto-save when generation settles
            }
        }, 80);
    };

    const activeMission = existingMission || tempMission;

    return (
        <div className="max-w-2xl mx-auto px-4 animate-slide-up">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-2">Creative Missions</h2>
                <p className="text-zinc-400">Break your creative block with a randomized photo assignment.</p>
            </div>

            {/* If we have a saved mission (and not currently generating), show the ACTIVE MISSION CARD */}
            {existingMission && !generating ? (
                <div 
                    className="bg-zinc-900 border border-emerald-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden animate-zoom-in isolate"
                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                >
                     <div className="absolute inset-0 bg-emerald-900/10"></div>
                     <div className="absolute top-0 right-0 p-4">
                         <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest animate-pulse">
                             <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                             Active Assignment
                         </span>
                     </div>

                     <div className="relative z-10">
                         <h3 className="text-2xl font-bold text-white mb-6">Mission Briefing</h3>
                         
                         <div className="space-y-4 mb-8">
                             <div className="flex flex-col gap-1">
                                 <span className="text-xs font-mono text-zinc-500 uppercase">Target Subject</span>
                                 <span className="text-xl text-white font-medium">{existingMission.subject}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                                 <span className="text-xs font-mono text-zinc-500 uppercase">Required Technique</span>
                                 <span className="text-xl text-white font-medium">{existingMission.technique}</span>
                             </div>
                             <div className="flex flex-col gap-1">
                                 <span className="text-xs font-mono text-zinc-500 uppercase">Constraint</span>
                                 <span className="text-xl text-amber-400 font-medium">{existingMission.constraint}</span>
                             </div>
                         </div>

                         <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => onVerify(existingMission)}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all hover:scale-[1.02]"
                            >
                                <ClipboardCheck size={20} /> Verify Mission
                            </button>
                            <button 
                                onClick={onDiscardMission}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-zinc-800 hover:bg-red-900/30 hover:border-red-500/50 hover:text-red-400 border border-zinc-700 text-zinc-400 rounded-xl font-bold transition-all"
                            >
                                <Trash2 size={20} /> Abort Mission
                            </button>
                         </div>
                         <p className="mt-4 text-center text-xs text-zinc-500">
                             Mission is saved. You can close the app and return later.
                         </p>
                     </div>
                </div>
            ) : (
                <div 
                    className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden isolate"
                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                >
                    {/* Decorative Grid Background */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" 
                        style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                    ></div>

                    <div className="relative z-10 flex flex-col gap-6">
                        {/* Mission Slots */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 aspect-square md:aspect-auto md:h-40 shadow-inner">
                                <div className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-1">Subject</div>
                                <div className={`text-lg md:text-xl font-bold text-white ${generating ? 'opacity-50 blur-[1px]' : ''}`}>
                                    {activeMission ? activeMission.subject : '???'}
                                </div>
                            </div>
                            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 aspect-square md:aspect-auto md:h-40 shadow-inner">
                                <div className="text-xs font-mono text-fuchsia-500 uppercase tracking-widest mb-1">Technique</div>
                                <div className={`text-lg md:text-xl font-bold text-white ${generating ? 'opacity-50 blur-[1px]' : ''}`}>
                                    {activeMission ? activeMission.technique : '???'}
                                </div>
                            </div>
                            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 aspect-square md:aspect-auto md:h-40 shadow-inner">
                                <div className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-1">Constraint</div>
                                <div className={`text-lg md:text-xl font-bold text-white ${generating ? 'opacity-50 blur-[1px]' : ''}`}>
                                    {activeMission ? activeMission.constraint : '???'}
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={generate}
                                disabled={generating}
                                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {generating ? <RefreshCw className="animate-spin" /> : <Shuffle />}
                                    Generate New Mission
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MissionGenerator;
