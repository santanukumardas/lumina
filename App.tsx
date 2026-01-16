
import React, { useState, useRef, useEffect } from 'react';
import { Category, Lesson, Mission } from './types';
import { Visualizer } from './components/Simulations';
import { LEARNING_MODULES, GALLERY_COLLECTIONS } from './data/content';
import Header from './components/layout/Header';

// Feature Components
import Darkroom from './components/tools/Darkroom';
import ChromaLab from './components/tools/ChromaLab';
import StudioPlanner from './components/tools/StudioPlanner';
import DofCalculator from './components/tools/DofCalculator';
import NdSimulator from './components/tools/NdSimulator';
import RgbCurveSim from './components/tools/RgbCurveSim';
import ZoneSystem from './components/tools/ZoneSystem';
import DiffractionLimit from './components/tools/DiffractionLimit';
import MissionGenerator from './components/features/MissionGenerator';
import PhotoAnalyzer from './components/features/PhotoAnalyzer';
import ConceptLibrary from './components/features/ConceptLibrary';
import GlobalSettings from './components/features/GlobalSettings';

import { 
  Camera, 
  Frame, 
  Sun,
  Image as ImageIcon,
  Mountain,
  Users,
  Building, 
  Moon,
  ChevronLeft,
  ChevronRight,
  BookOpen, 
  Info,
  ArrowRight,
  Play,
  ScanLine,
  Sliders,
  Eye,
  Aperture,
  Maximize2,
  Palette,
  PenTool,
  Calculator,
  Timer,
  Target,
  Sparkles,
  Activity,
  Layers,
  Grid,
  GraduationCap
} from 'lucide-react';

const IconMap = {
  Camera: Camera,
  Frame: Frame,
  Sun: Sun,
  Image: ImageIcon,
  Mountain: Mountain,
  Users: Users,
  Building: Building,
  Moon: Moon,
  ScanLine: ScanLine,
  Target: Target,
  Sliders: Sliders,
  Eye: Eye
};

export default function App() {
  const [viewMode, setViewMode] = useState<'home' | 'gallery-menu' | 'category' | 'lesson' | 'critique' | 'missions' | 'concepts' | 'darkroom' | 'chroma-lab' | 'studio-planner' | 'dof-calc' | 'nd-sim' | 'rgb-curves' | 'zone-system' | 'diffraction'>('home');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // Persistent Mission State
  const [activeMission, setActiveMission] = useState<Mission | null>(() => {
      // Load saved mission on startup
      const saved = localStorage.getItem('lumina_active_mission');
      return saved ? JSON.parse(saved) : null;
  });

  // Global state for post-production image
  const [postProdImage, setPostProdImage] = useState<string | null>(null);

  const scrollPositions = useRef<Record<string, number>>({});

  // Helper to change view and manage scroll
  const navigateTo = (mode: typeof viewMode, restore: boolean = false) => {
    // Save current scroll position for the view we are leaving
    scrollPositions.current[viewMode] = window.scrollY;
    
    setViewMode(mode);

    // After render, restore scroll or reset to top
    // Increased timeout to ensure DOM is ready
    setTimeout(() => {
        const targetScroll = restore ? (scrollPositions.current[mode] || 0) : 0;
        window.scrollTo({
            top: targetScroll,
            behavior: 'instant' 
        });
    }, 10);
  };

  const handleCategorySelect = (category: Category) => {
    setActiveCategory(category);
    navigateTo('category');
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
    navigateTo('lesson');
  };

  const handleGalleryClick = () => {
      setActiveCategory(null);
      navigateTo('gallery-menu');
  }

  const handleCritiqueClick = () => {
      setActiveCategory(null);
      navigateTo('critique');
  }

  const handleConceptsClick = () => {
      setActiveCategory(null);
      navigateTo('concepts');
  }

  const handleVerifyMission = (mission: Mission) => {
      navigateTo('critique');
  }

  const handleSaveMission = (mission: Mission) => {
      setActiveMission(mission);
      localStorage.setItem('lumina_active_mission', JSON.stringify(mission));
  };

  const handleDiscardMission = () => {
      setActiveMission(null);
      localStorage.removeItem('lumina_active_mission');
  };

  const handleBack = () => {
    if (viewMode === 'lesson') {
      setActiveLesson(null);
      navigateTo('category', true);
    } else if (viewMode === 'category') {
      if (GALLERY_COLLECTIONS.find(c => c.id === activeCategory?.id)) {
          setActiveCategory(null);
          navigateTo('gallery-menu', true);
      } else {
          setActiveCategory(null);
          navigateTo('home', true);
      }
    } else {
        navigateTo('home', true);
    }
  };
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
        const { current } = scrollContainerRef;
        const scrollAmount = 300; 
        if (direction === 'left') {
            current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
  };

  const getPageTitle = () => {
      if (viewMode === 'gallery-menu') return 'Curated Galleries';
      if (viewMode === 'critique') return activeMission ? 'Mission Verification' : 'AI Photo Critic';
      if (viewMode === 'missions') return 'Creative Missions';
      if (viewMode === 'concepts') return 'Concept Library';
      if (viewMode === 'darkroom') return 'The Darkroom';
      if (viewMode === 'chroma-lab') return 'Chroma Lab';
      if (viewMode === 'studio-planner') return 'Studio Planner';
      if (viewMode === 'dof-calc') return 'DoF Visualizer';
      if (viewMode === 'nd-sim') return 'ND Filter Lab';
      if (viewMode === 'rgb-curves') return 'RGB Curve Sim';
      if (viewMode === 'zone-system') return 'Zone System Map';
      if (viewMode === 'diffraction') return 'Diffraction Calc';
      return activeCategory?.title || 'Lumina';
  };

  // derived state for lesson navigation
  let currentIndex = -1;
  let prevLesson: Lesson | null = null;
  let nextLesson: Lesson | null = null;

  if (activeCategory && activeLesson) {
      currentIndex = activeCategory.lessons.findIndex(l => l.id === activeLesson.id);
      if (currentIndex > 0) prevLesson = activeCategory.lessons[currentIndex - 1];
      if (currentIndex < activeCategory.lessons.length - 1) nextLesson = activeCategory.lessons[currentIndex + 1];
  }

  // Helper for AI Badge
  const AIBadge = () => (
      <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg z-20 border border-white/20">
          <Sparkles size={10} className="text-indigo-100" /> AI POWERED
      </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-white/20">
      <Header 
        viewMode={viewMode} 
        onBack={handleBack} 
        title={getPageTitle()} 
        onOpenSettings={() => setShowSettings(true)}
      />

      <GlobalSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />

      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        
        {/* HOME VIEW */}
        {viewMode === 'home' && (
          <div className="animate-slide-up">
            <div className="mb-12 text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                    Master the Art.
                </h2>
                <p className="text-zinc-400 max-w-md mx-auto">
                    Interactive visualizations, curated galleries, and AI-powered analysis.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {LEARNING_MODULES.map((cat) => {
                const Icon = IconMap[cat.iconName];
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat)}
                    className="group relative overflow-hidden rounded-3xl bg-zinc-900 aspect-[4/3] md:aspect-[16/9] border border-zinc-800 hover:border-zinc-600 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-left transform-gpu isolate"
                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
                      style={{ backgroundImage: `url(${cat.backgroundImage})` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-50 mix-blend-multiply transition-opacity`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-white/10 shadow-lg">
                        <Icon size={24} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{cat.title}</h3>
                      <p className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                        {cat.subtitle}
                      </p>
                      
                      <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                        {cat.lessons.length} Modules <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
              
              {/* CONCEPTS & TECHNIQUES CARD */}
              <button
                onClick={handleConceptsClick}
                className="group relative overflow-hidden rounded-3xl bg-zinc-900 aspect-[4/3] md:aspect-[16/9] border border-zinc-800 hover:border-zinc-600 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-left transform-gpu isolate"
                style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
              >
                    <AIBadge />
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
                      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=60&w=600&auto=format&fit=crop)` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br from-indigo-600 to-slate-900 opacity-50 mix-blend-multiply transition-opacity`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-white/10 shadow-lg">
                        <GraduationCap size={24} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">Concepts & Techniques</h3>
                      <p className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                        AI-Powered Explanations
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                        20+ Topics <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
              </button>

              {/* GALLERY ENTRY CARD */}
              <button
                onClick={handleGalleryClick}
                className="group relative overflow-hidden rounded-3xl bg-zinc-900 aspect-[4/3] md:aspect-[16/9] border border-zinc-800 hover:border-zinc-600 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-left transform-gpu isolate"
                style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
              >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
                      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1545486332-9e0999c535b2?q=60&w=600&auto=format&fit=crop)` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br from-fuchsia-600 to-purple-900 opacity-50 mix-blend-multiply transition-opacity`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-white/10 shadow-lg">
                        <ImageIcon size={24} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">The Gallery</h3>
                      <p className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                        Curated Examples & Analysis
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                        4 Collections <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
              </button>
            </div>

            {/* PRO TOOLS SECTION */}
            <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-4 px-2 flex items-center gap-2">
                    <Sliders size={18} className="text-zinc-400"/> Pro Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {/* DARKROOM BUTTON */}
                     <button 
                        onClick={() => navigateTo('darkroom')}
                        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-zinc-800"
                     >
                         <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800">
                             <Aperture className="text-amber-400" />
                         </div>
                         <div className="text-left">
                             <h4 className="text-white font-bold">Darkroom</h4>
                             <p className="text-xs text-zinc-400">Grading Sim</p>
                         </div>
                     </button>
                     
                     {/* CHROMA LAB BUTTON */}
                     <button 
                        onClick={() => navigateTo('chroma-lab')}
                        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-zinc-800"
                     >
                         <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800">
                             <Palette className="text-fuchsia-400" />
                         </div>
                         <div className="text-left">
                             <h4 className="text-white font-bold">Chroma Lab</h4>
                             <p className="text-xs text-zinc-400">Palette Extractor</p>
                         </div>
                     </button>

                     {/* STUDIO PLANNER BUTTON */}
                     <button 
                        onClick={() => navigateTo('studio-planner')}
                        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-zinc-800"
                     >
                         <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800">
                             <PenTool className="text-emerald-400" />
                         </div>
                         <div className="text-left">
                             <h4 className="text-white font-bold">Studio Plan</h4>
                             <p className="text-xs text-zinc-400">Lighting Setup</p>
                         </div>
                     </button>

                     {/* DOF VISUALIZER BUTTON */}
                     <button 
                        onClick={() => navigateTo('dof-calc')}
                        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-zinc-800"
                     >
                         <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800">
                             <Calculator className="text-indigo-400" />
                         </div>
                         <div className="text-left">
                             <h4 className="text-white font-bold">DoF Visualizer</h4>
                             <p className="text-xs text-zinc-400">Focus Calculator</p>
                         </div>
                     </button>

                     {/* ND FILTER LAB BUTTON */}
                     <button 
                        onClick={() => navigateTo('nd-sim')}
                        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-zinc-800"
                     >
                         <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800">
                             <Timer className="text-rose-400" />
                         </div>
                         <div className="text-left">
                             <h4 className="text-white font-bold">ND Filter Lab</h4>
                             <p className="text-xs text-zinc-400">Exposure Calc</p>
                         </div>
                     </button>

                     {/* RGB CURVE SIM BUTTON */}
                     <button 
                        onClick={() => navigateTo('rgb-curves')}
                        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-zinc-800"
                     >
                         <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800">
                             <Activity className="text-blue-400" />
                         </div>
                         <div className="text-left">
                             <h4 className="text-white font-bold">RGB Curve Sim</h4>
                             <p className="text-xs text-zinc-400">Color Grading</p>
                         </div>
                     </button>

                     {/* ZONE SYSTEM BUTTON */}
                     <button 
                        onClick={() => navigateTo('zone-system')}
                        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-zinc-800"
                     >
                         <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800">
                             <Layers className="text-gray-200" />
                         </div>
                         <div className="text-left">
                             <h4 className="text-white font-bold">Zone System</h4>
                             <p className="text-xs text-zinc-400">Exposure Map</p>
                         </div>
                     </button>

                     {/* DIFFRACTION LIMIT BUTTON */}
                     <button 
                        onClick={() => navigateTo('diffraction')}
                        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 p-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-zinc-800"
                     >
                         <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800">
                             <Grid className="text-teal-400" />
                         </div>
                         <div className="text-left">
                             <h4 className="text-white font-bold">Diffraction</h4>
                             <p className="text-xs text-zinc-400">Sharpness Physics</p>
                         </div>
                     </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* MISSION CARD */}
              <button
                onClick={() => navigateTo('missions')}
                className={`group relative overflow-hidden rounded-3xl bg-zinc-900 aspect-[4/3] md:aspect-[16/9] border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-left transform-gpu isolate
                    ${activeMission ? 'border-emerald-500/50 hover:border-emerald-400' : 'border-zinc-800 hover:border-zinc-600'}`}
                style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
              >
                    <AIBadge />
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
                      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=60&w=600&auto=format&fit=crop)` }}
                    />
                    <div className={`absolute inset-0 opacity-60 mix-blend-multiply transition-opacity ${activeMission ? 'bg-gradient-to-br from-emerald-800 to-slate-900' : 'bg-gradient-to-br from-emerald-600 to-slate-900'}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-12 h-12 rounded-2xl backdrop-blur-md flex items-center justify-center transition-transform duration-300 border shadow-lg ${activeMission ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-white/10 border-white/10 group-hover:-translate-y-2'}`}>
                            <Target size={24} className={activeMission ? 'text-emerald-400' : 'text-white'} />
                        </div>
                        {activeMission && (
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse">
                                Active Assignment
                            </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold mb-2 text-white">Creative Missions</h3>
                      <p className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                        {activeMission ? (
                            <>Current Objective: <span className="text-emerald-300">{activeMission.subject}</span></>
                        ) : (
                            'Randomized photography challenges to test your skills.'
                        )}
                      </p>
                      <div className={`mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors ${activeMission ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-white'}`}>
                        {activeMission ? 'Resume Mission' : 'Generate Mission'} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
              </button>

              {/* CRITIQUE CARD */}
              <button
                onClick={handleCritiqueClick}
                className="group relative overflow-hidden rounded-3xl bg-zinc-900 aspect-[4/3] md:aspect-[16/9] border border-zinc-800 hover:border-zinc-600 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-left transform-gpu isolate"
                style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
              >
                    <AIBadge />
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
                      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1531297461136-82lw9z1p7w?q=60&w=1200&auto=format&fit=crop)` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br from-cyan-600 to-slate-900 opacity-60 mix-blend-multiply transition-opacity`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <ScanLine className="text-cyan-400/20 w-64 h-64 animate-pulse" />
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 w-full relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-white/10 shadow-lg">
                            <ScanLine size={24} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">AI Photo Critic</h3>
                        <p className="text-zinc-300 text-sm group-hover:text-white transition-colors max-w-sm">
                            Upload your photo for instant feedback on composition, exposure, and technique.
                        </p>
                      </div>
                    </div>
              </button>
            </div>
          </div>
        )}

        {/* REST OF THE COMPONENTS... */}
        {viewMode === 'missions' && (
            <MissionGenerator 
                onVerify={handleVerifyMission} 
                existingMission={activeMission}
                onSaveMission={handleSaveMission}
                onDiscardMission={handleDiscardMission}
            />
        )}
        
        {viewMode === 'concepts' && <ConceptLibrary />}
        {viewMode === 'darkroom' && <Darkroom />}
        {viewMode === 'chroma-lab' && <ChromaLab />}
        {viewMode === 'studio-planner' && <StudioPlanner />}
        {viewMode === 'dof-calc' && <DofCalculator />}
        {viewMode === 'nd-sim' && <NdSimulator />}
        {viewMode === 'rgb-curves' && <RgbCurveSim />}
        {viewMode === 'zone-system' && <ZoneSystem />}
        {viewMode === 'diffraction' && <DiffractionLimit />}

        {viewMode === 'critique' && (
             <div className="animate-fade-in">
                <PhotoAnalyzer 
                    mission={activeMission} 
                    onClearMission={() => navigateTo('missions', true)}
                    onCompleteMission={() => {
                        handleDiscardMission();
                        navigateTo('missions', true);
                    }}
                />
             </div>
        )}

        {viewMode === 'gallery-menu' && (
             <div className="animate-slide-right">
                <div className="mb-8">
                     <h2 className="text-3xl font-bold text-white mb-2">Curated Collections</h2>
                     <p className="text-zinc-400">Select a genre to explore professional examples.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {GALLERY_COLLECTIONS.map((cat) => {
                        const Icon = IconMap[cat.iconName];
                        return (
                        <button
                            key={cat.id}
                            onClick={() => handleCategorySelect(cat)}
                            className="group relative overflow-hidden rounded-3xl bg-zinc-900 aspect-[4/3] md:aspect-[16/9] border border-zinc-800 hover:border-zinc-600 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl text-left transform-gpu isolate"
                            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                        >
                            <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60"
                            style={{ backgroundImage: `url(${cat.backgroundImage})` }}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-50 mix-blend-multiply transition-opacity`} />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                            
                            <div className="absolute bottom-0 left-0 p-8 w-full relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-white/10 shadow-lg">
                                <Icon size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-white">{cat.title}</h3>
                            <p className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                                {cat.subtitle}
                            </p>
                            
                            <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                                {cat.lessons.length} Examples <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                            </div>
                        </button>
                        );
                    })}
                </div>
            </div>
        )}

        {/* CATEGORY VIEW (SUB-NAV) */}
        {viewMode === 'category' && activeCategory && (
          <div className="animate-slide-right">
             <div className="relative mb-8 p-8 rounded-3xl overflow-hidden border border-zinc-800">
                 <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
                    style={{ backgroundImage: `url(${activeCategory.backgroundImage})` }}
                 />
                 <div className={`absolute inset-0 bg-gradient-to-br ${activeCategory.gradient} opacity-90 mix-blend-multiply`} />
                 <div className="relative z-10 text-center">
                     <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{activeCategory.title}</h2>
                     <p className="text-zinc-200 max-w-xl mx-auto text-lg">{activeCategory.subtitle}</p>
                 </div>
             </div>

            {/* Scrollable Tiles Container */}
            <div className="relative group">
                 {/* Scroll Buttons */}
                <button 
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 backdrop-blur-md border border-zinc-700 rounded-full text-white opacity-100 shadow-xl hover:bg-zinc-800 hover:scale-110 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 backdrop-blur-md border border-zinc-700 rounded-full text-white opacity-100 shadow-xl hover:bg-zinc-800 hover:scale-110 transition-all"
                >
                    <ChevronRight size={24} />
                </button>

                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 pb-8 pt-2 scrollbar-hide snap-x snap-mandatory px-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                {activeCategory.lessons.map((lesson, index) => (
                    <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className="flex-shrink-0 w-64 snap-start text-left group/card relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl isolate"
                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                    >
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${activeCategory.gradient} opacity-0 group-hover/card:opacity-100 transition-opacity`}></div>
                        <div className="p-6 h-full flex flex-col">
                            <div className="text-xs font-mono text-zinc-500 mb-2 flex justify-between">
                                <span>MODULE {String(index + 1).padStart(2, '0')}</span>
                                <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover/card:bg-white transition-colors"></div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover/card:text-white/90 transition-colors">{lesson.title}</h3>
                            <p className="text-zinc-400 text-sm line-clamp-2 mb-4 flex-grow">{lesson.description}</p>
                            
                            <div className="flex items-center text-xs font-bold uppercase tracking-wider text-zinc-500 group-hover/card:text-white transition-colors">
                                <Play size={12} className="mr-2 fill-current" /> Initialize
                            </div>
                        </div>
                    </button>
                ))}
                </div>
            </div>
          </div>
        )}

        {/* LESSON VIEW (VISUALIZER) */}
        {viewMode === 'lesson' && activeLesson && activeCategory && (
          <div className="animate-zoom-in">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
               {/* Nav Bar */}
               <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                    <button 
                        onClick={() => prevLesson && handleLessonSelect(prevLesson)}
                        disabled={!prevLesson}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${prevLesson ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 cursor-not-allowed'}`}
                    >
                        <ChevronLeft size={16} />
                        <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="text-xs font-mono text-zinc-500">
                        {currentIndex + 1} / {activeCategory.lessons.length}
                    </div>

                    <button 
                        onClick={() => nextLesson && handleLessonSelect(nextLesson)}
                        disabled={!nextLesson}
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${nextLesson ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 cursor-not-allowed'}`}
                    >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight size={16} />
                    </button>
               </div>
               
               <div className="p-4 md:p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* Left: Visualizer */}
                      <div className="w-full md:w-2/3 bg-black rounded-2xl overflow-hidden shadow-inner border border-zinc-900">
                          <Visualizer 
                                lessonId={activeLesson.id} 
                                globalImage={postProdImage}
                                setGlobalImage={setPostProdImage}
                          />
                      </div>

                      {/* Right: Info */}
                      <div className="w-full md:w-1/3 space-y-6">
                           <div>
                               <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">
                                   <BookOpen size={14} /> Concept
                               </div>
                               <h2 className="text-3xl font-bold text-white mb-2">{activeLesson.title}</h2>
                               <p className="text-lg text-zinc-300 font-light leading-relaxed">
                                   {activeLesson.longDescription}
                               </p>
                           </div>

                           <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50">
                               <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-3">
                                   <Info size={14} /> Pro Tip
                               </div>
                               <p className="text-sm text-zinc-400 italic">
                                   "Don't just memorize the definitions. Use the sliders on the left to develop an intuition for how the setting changes the feeling of an image."
                               </p>
                           </div>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
