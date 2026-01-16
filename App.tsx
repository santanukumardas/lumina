
import React, { useState, useRef, useEffect } from 'react';
import { Category, Lesson, Mission } from './types';
import { GALLERY_COLLECTIONS } from './data/content';
import Header from './components/layout/Header';
import GlobalSettings from './components/features/GlobalSettings';
import MainView from './components/layout/MainView';

export default function App() {
  const [viewMode, setViewMode] = useState<'home' | 'gallery-menu' | 'category' | 'lesson' | 'critique' | 'missions' | 'concepts' | 'darkroom' | 'chroma-lab' | 'studio-planner' | 'dof-calc' | 'nd-sim' | 'rgb-curves' | 'zone-system' | 'diffraction'>('home');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // Persistent Mission State
  const [activeMission, setActiveMission] = useState<Mission | null>(() => {
      const saved = localStorage.getItem('lumina_active_mission');
      return saved ? JSON.parse(saved) : null;
  });

  // Global state for post-production image
  const [postProdImage, setPostProdImage] = useState<string | null>(null);

  const scrollPositions = useRef<Record<string, number>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Navigation Handler
  const navigateTo = (mode: typeof viewMode, restore: boolean = false) => {
    scrollPositions.current[viewMode] = window.scrollY;
    setViewMode(mode);
    setTimeout(() => {
        const targetScroll = restore ? (scrollPositions.current[mode] || 0) : 0;
        window.scrollTo({ top: targetScroll, behavior: 'instant' });
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

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-white/20">
      <Header 
        viewMode={viewMode} 
        onBack={handleBack} 
        title={getPageTitle()} 
        onOpenSettings={() => setShowSettings(true)}
      />

      <GlobalSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {/* Optimized padding for mobile: px-4 on mobile, md:px-4. py-4 mobile, py-8 desktop */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 pb-32 md:pb-24">
         <MainView 
            viewMode={viewMode}
            activeCategory={activeCategory}
            activeLesson={activeLesson}
            activeMission={activeMission}
            postProdImage={postProdImage}
            setPostProdImage={setPostProdImage}
            onNavigate={navigateTo}
            onCategorySelect={handleCategorySelect}
            onLessonSelect={handleLessonSelect}
            onMissionVerify={() => navigateTo('critique')}
            onMissionSave={(m) => { setActiveMission(m); localStorage.setItem('lumina_active_mission', JSON.stringify(m)); }}
            onMissionDiscard={() => { setActiveMission(null); localStorage.removeItem('lumina_active_mission'); }}
            onScroll={scroll}
            scrollContainerRef={scrollContainerRef}
         />
      </main>
    </div>
  );
}