import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Archive, Award, BookOpen, Briefcase, GitBranch, Map, Menu, MonitorCog, Save, Sparkles, Volume2, VolumeX, Zap } from 'lucide-react';
import { lazy, Suspense, useState } from 'react';
import { AchievementToast } from './components/AchievementToast';
import { AmbientAudio } from './components/AmbientAudio';
import { BootSequence } from './components/BootSequence';
import { ErrorBoundary } from './components/ErrorBoundary';
import { GlitchOverlay } from './components/GlitchOverlay';
import { LoadingScreen } from './components/LoadingScreen';
import { OSFrame } from './components/OSFrame';
import { SecretConsole } from './components/SecretConsole';
import { useGame } from './state/GameProvider';

const ArchivePage = lazy(() => import('./pages/ArchivePage').then((module) => ({ default: module.ArchivePage })));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage').then((module) => ({ default: module.AchievementsPage })));
const EpisodesPage = lazy(() => import('./pages/EpisodesPage').then((module) => ({ default: module.EpisodesPage })));
const InventoryPage = lazy(() => import('./pages/InventoryPage').then((module) => ({ default: module.InventoryPage })));
const JournalPage = lazy(() => import('./pages/JournalPage').then((module) => ({ default: module.JournalPage })));
const LandingPage = lazy(() => import('./pages/LandingPage').then((module) => ({ default: module.LandingPage })));
const MemoryPage = lazy(() => import('./pages/MemoryPage').then((module) => ({ default: module.MemoryPage })));
const RelationshipsPage = lazy(() => import('./pages/RelationshipsPage').then((module) => ({ default: module.RelationshipsPage })));
const SaveSlotsPage = lazy(() => import('./pages/SaveSlotsPage').then((module) => ({ default: module.SaveSlotsPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((module) => ({ default: module.SettingsPage })));
const StoryPage = lazy(() => import('./pages/StoryPage').then((module) => ({ default: module.StoryPage })));
const WorldMapPage = lazy(() => import('./pages/WorldMapPage').then((module) => ({ default: module.WorldMapPage })));

const navItems = [
  { to: '/story', label: 'Story', icon: Sparkles },
  { to: '/episodes', label: 'Episodes', icon: Menu },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/archive', label: 'Archive', icon: Archive },
  { to: '/memories', label: 'Memories', icon: MonitorCog },
  { to: '/journal', label: 'Journal', icon: BookOpen },
  { to: '/inventory', label: 'Inventory', icon: Briefcase },
  { to: '/relationships', label: 'Links', icon: GitBranch },
  { to: '/saves', label: 'Saves', icon: Save },
  { to: '/achievements', label: 'Signals', icon: Award },
];

export function App() {
  const location = useLocation();
  const { state, dispatch } = useGame();
  const [consoleOpen, setConsoleOpen] = useState(false);
  const isLanding = location.pathname === '/';

  return (
    <ErrorBoundary>
      <div className={`min-h-screen overflow-x-hidden bg-void text-slate-100 selection:bg-cyan/30 ${state.settings.highContrast ? 'high-contrast' : ''} ${state.settings.cursorFx ? 'cursor-layer' : ''}`}>
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_25%_20%,rgba(49,247,255,.18),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,43,214,.16),transparent_26%),linear-gradient(180deg,#05050a,#090817_55%,#05050a)]" />
        {!isLanding && <OSFrame />}
        <div className="scanlines pointer-events-none fixed inset-0 z-50 opacity-30" />
        {!isLanding && (
          <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-void/70 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
              <NavLink to="/" className="font-display text-lg tracking-[0.28em] text-cyan inline-flex items-center gap-2">
                <Zap size={18} className="text-cyan fill-cyan/30 animate-pulse" />
                <span>glitch.exe</span>
              </NavLink>
              <div className="hidden items-center gap-1 md:flex">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-chip ${isActive ? 'border-cyan/70 text-cyan shadow-neon' : 'border-white/10 text-slate-300'}`
                    }
                  >
                    <item.icon size={16} aria-hidden />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="icon-button"
                  type="button"
                  aria-label={state.settings.muted ? 'Unmute ambience' : 'Mute ambience'}
                  onClick={() => dispatch({ type: 'SET_SETTING', key: 'muted', value: !state.settings.muted })}
                >
                  {state.settings.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button className="console-button" type="button" onClick={() => setConsoleOpen(true)}>
                  CTRL_EXEC
                </button>
              </div>
            </nav>
          </header>
        )}
        {!isLanding && (
          <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-white/10 bg-void/85 backdrop-blur-xl md:hidden">
            {navItems.slice(0, 5).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `grid min-h-14 place-items-center text-[0.65rem] ${isActive ? 'text-cyan' : 'text-slate-400'}`
                }
                aria-label={item.label}
              >
                <item.icon size={18} aria-hidden />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        )}
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -8 }}
            transition={{ duration: state.settings.reduceMotion ? 0.01 : 0.35 }}
            className={isLanding ? '' : 'relative z-10 mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-24'}
          >
            <Suspense fallback={<LoadingScreen />}>
              <Routes location={location}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/story" element={<StoryPage />} />
                <Route path="/episodes" element={<EpisodesPage />} />
                <Route path="/map" element={<WorldMapPage />} />
                <Route path="/archive" element={<ArchivePage />} />
                <Route path="/memories" element={<MemoryPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/relationships" element={<RelationshipsPage />} />
                <Route path="/saves" element={<SaveSlotsPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </Suspense>
          </motion.main>
        </AnimatePresence>
        <BootSequence />
        <GlitchOverlay />
        <AmbientAudio />
        <AchievementToast />
        <SecretConsole open={consoleOpen} onClose={() => setConsoleOpen(false)} />
      </div>
    </ErrorBoundary>
  );
}
