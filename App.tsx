
import React, { useState, useRef, useEffect } from 'react';
import { Category, Lesson, Mission } from './types';
import { GALLERY_COLLECTIONS, LEARNING_MODULES, TOPICS, APP_TOOLS } from './data/content';
import Header from './components/layout/Header';
import GlobalSettings from './components/features/GlobalSettings';
import MainView from './components/layout/MainView';

export type SearchResults = {
    lessons: (Lesson & { categoryId: string, type: 'lesson' | 'gallery' })[];
    concepts: string[];
    tools: typeof APP_TOOLS;
};

export default function App() {
  const [viewMode, setViewMode] = useState<'home' | 'gallery-menu' | 'category' | 'lesson' | 'critique' | 'missions' | 'concepts' | 'darkroom' | 'chroma-lab' | 'studio-planner' | 'dof-calc' | 'nd-sim' | 'rgb-curves' | 'zone-system' | 'diffraction' | 'exposure-reflex' | 'perspective-shift' | 'eq-exposure' | 'fov-comparator' | 'search' | 'bookmarks'>('home');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // Persistent Mission State
  const [activeMission, setActiveMission] = useState<Mission | null>(() => {
      const saved = localStorage.getItem('lumina_active_mission');
      return saved ? JSON.parse(saved) : null;
  });

  // Persistent Progress & Bookmarks
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
      const saved = localStorage.getItem('lumina_completed_lessons');
      return saved ? JSON.parse(saved) : [];
  });
  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>(() => {
      const saved = localStorage.getItem('lumina_bookmarked_lessons');
      return saved ? JSON.parse(saved) : [];
  });

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>({ lessons: [], concepts: [], tools: [] });
  // Specific concept to open if navigated via search
  const [initialConcept, setInitialConcept] = useState<string | null>(null);

  // Global state for post-production image
  const [postProdImage, setPostProdImage] = useState<string | null>(null);

  const scrollPositions = useRef<Record<string, number>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      // Initialize Theme
      const savedTheme = localStorage.getItem('lumina_theme') || 'theme-lumina';
      document.body.className = savedTheme;
  }, []);

  useEffect(() => {
      localStorage.setItem('lumina_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
      localStorage.setItem('lumina_bookmarked_lessons', JSON.stringify(bookmarkedLessons));
  }, [bookmarkedLessons]);

  // Navigation Handler
  const navigateTo = (mode: typeof viewMode, restore: boolean = false) => {
    // Clear search if navigating away
    if (mode !== 'search') {
        setSearchQuery('');
        setInitialConcept(null);
    }

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

  const handleConceptSelect = (topic: string) => {
      setInitialConcept(topic);
      navigateTo('concepts');
  };

  const handleSearch = (query: string) => {
      setSearchQuery(query);
      if (query.length > 1) {
          const lowerQ = query.toLowerCase();
          
          // Search Lessons & Galleries
          const matchedLessons: SearchResults['lessons'] = [];
          [...LEARNING_MODULES, ...GALLERY_COLLECTIONS].forEach(cat => {
              cat.lessons.forEach(l => {
                  if (l.title.toLowerCase().includes(lowerQ) || l.description.toLowerCase().includes(lowerQ)) {
                      matchedLessons.push({ ...l, categoryId: cat.id, type: cat.id.startsWith('gal') ? 'gallery' : 'lesson' });
                  }
              });
          });

          // Search Concepts
          const matchedConcepts = TOPICS.filter(t => t.toLowerCase().includes(lowerQ));

          // Search Tools
          const matchedTools = APP_TOOLS.filter(t => t.title.toLowerCase().includes(lowerQ) || t.description.toLowerCase().includes(lowerQ));

          setSearchResults({ lessons: matchedLessons, concepts: matchedConcepts, tools: matchedTools });
          setViewMode('search');
      } else if (query.length === 0 && viewMode === 'search') {
          navigateTo('home', true);
      }
  };

  const toggleComplete = (lessonId: string) => {
      setCompletedLessons(prev => 
          prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
      );
  };

  const toggleBookmark = (lessonId: string) => {
      setBookmarkedLessons(prev => 
          prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
      );
  };

  const handleResetData = () => {
      setCompletedLessons([]);
      setBookmarkedLessons([]);
      setActiveMission(null);
      localStorage.removeItem('lumina_completed_lessons');
      localStorage.removeItem('lumina_bookmarked_lessons');
      localStorage.removeItem('lumina_active_mission');
      // Note: usage logs and API key are preserved intentionally in this reset, 
      // but you can clear them if needed.
  };

  const handleBack = () => {
    if (viewMode === 'lesson') {
      setActiveLesson(null);
      if (activeCategory) {
          navigateTo('category', true);
      } else {
          // Fallback if accessed via search/bookmarks
          navigateTo('home', true); 
      }
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
      if (viewMode === 'search') return 'Search Results';
      if (viewMode === 'bookmarks') return 'Saved Lessons';
      
      const tool = APP_TOOLS.find(t => t.id === viewMode);
      if (tool) return tool.title;

      return activeCategory?.title || 'Lumina';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-white/20 select-none relative overflow-x-hidden">
      
      {/* Atmosphere Elements */}
      <div className="bg-noise"></div>
      <div className="ambient-light ambient-1"></div>
      <div className="ambient-light ambient-2"></div>

      <Header 
        viewMode={viewMode} 
        onBack={handleBack} 
        title={getPageTitle()} 
        onOpenSettings={() => setShowSettings(true)}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        onOpenBookmarks={() => navigateTo('bookmarks')}
      />

      <GlobalSettings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        onResetData={handleResetData}
      />

      {/* Main Content with adjusted top padding for Fixed Header */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-32 md:pt-24 md:pb-24 relative z-10">
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
            // New Props
            searchResults={searchResults}
            initialConcept={initialConcept}
            handleConceptSelect={handleConceptSelect}
            completedLessons={completedLessons}
            bookmarkedLessons={bookmarkedLessons}
            toggleComplete={toggleComplete}
            toggleBookmark={toggleBookmark}
         />
      </main>
    </div>
  );
}
