import { motion } from 'framer-motion';
import { ChevronRight, Database, Eye, HeartPulse, History, Wand2 } from 'lucide-react';
import { type CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterPortrait } from '../components/CharacterPortrait';
import { MemoryMinigameOverlay } from '../components/MemoryMinigameOverlay';
import { Typewriter } from '../components/Typewriter';
import { characters, dialogue, episodes } from '../data/world';
import type { LocationId, MinigameType } from '../types';
import { useGame } from '../state/GameProvider';

const sceneArtifacts: Record<LocationId, Array<{ id: string; label: string; x: number; y: number; memory?: string; minigame?: MinigameType }>> = {
  'white-room': [
    { id: 'glass', label: 'scan glass handprint', x: 70, y: 22, memory: 'm-room', minigame: 'photo-lens' },
    { id: 'bed', label: 'inspect empty bed', x: 24, y: 58 },
  ],
  'neon-city': [
    { id: 'sketch-wall', label: 'repair butterfly sketch', x: 63, y: 28, memory: 'm-sketch', minigame: 'sketch-repair' },
    { id: 'rain', label: 'catch upward rain audio', x: 34, y: 46, memory: 'm-lullaby', minigame: 'audio-tune' },
  ],
  'memory-forest': [
    { id: 'branch', label: 'listen to black branch', x: 48, y: 35 },
    { id: 'swing', label: 'touch old swing', x: 72, y: 64 },
  ],
  'archive-core': [
    { id: 'terminal', label: 'decrypt root cipher', x: 52, y: 29, memory: 'm-hex', minigame: 'hex-decrypt' },
    { id: 'server', label: 'reconnect neural relays', x: 78, y: 52, memory: 'm-nodes', minigame: 'node-connect' },
  ],
  'broken-station': [
    { id: 'ticket', label: 'recover platform ticket', x: 30, y: 42 },
    { id: 'clock', label: 'rewind station clock', x: 68, y: 24 },
  ],
  'reflection-lake': [
    { id: 'lake-mirror', label: 'gaze into subconscious lake', x: 50, y: 60, memory: 'm-nodes', minigame: 'node-connect' },
  ],
  'final-sanctuary': [
    { id: 'drawing', label: 'restore unsent drawing', x: 58, y: 33, memory: 'm-sanctuary', minigame: 'sketch-repair' },
  ],
};

export function StoryPage() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [scanned, setScanned] = useState<string[]>([]);
  const [activeMinigame, setActiveMinigame] = useState<{ type: MinigameType; title: string; memoryId?: string } | null>(null);
  const [backlogOpen, setBacklogOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 50, y: 50 });

  const line = dialogue[state.currentLineId] ?? dialogue['ep1-1'];
  const character = characters.find((item) => item.id === line.character) || characters[0];
  const currentEpisode = episodes.find((ep) => ep.startLine === line.id || ep.location === line.location);
  const artifacts = sceneArtifacts[line.location] || [];

  function advance() {
    if (line.next) dispatch({ type: 'ADVANCE', lineId: line.next });
    if (!line.next && currentEpisode) completeEpisode();
  }

  function completeEpisode() {
    if (currentEpisode) dispatch({ type: 'COMPLETE_EPISODE', episodeId: currentEpisode.id });
    navigate('/episodes');
  }

  function scanArtifact(artifact: (typeof artifacts)[number]) {
    setScanned((items) => (items.includes(artifact.id) ? items : [...items, artifact.id]));
    if (artifact.memory) dispatch({ type: 'UNLOCK_MEMORY', memoryId: artifact.memory });
    if (artifact.minigame) {
      setActiveMinigame({
        type: artifact.minigame,
        title: artifact.label,
        memoryId: artifact.memory,
      });
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* Sidebar Profile & Emotional Stats */}
      <aside className="holo-panel order-2 p-5 lg:order-1 flex flex-col justify-between">
        <div>
          <CharacterPortrait id={line.character} mood={line.mood} />

          <div className="mt-6 space-y-3">
            <h4 className="font-display text-xs uppercase tracking-widest text-cyan border-b border-white/10 pb-1">
              EMOTIONAL STATE
            </h4>
            {Object.entries(state.emotion).map(([key, value]) => (
              <div key={key}>
                <div className="mb-1 flex justify-between text-[11px] font-mono uppercase tracking-wider text-slate-300">
                  <span>{key}</span>
                  <span>{value}/10</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded bg-white/10">
                  <motion.div className="h-full bg-gradient-to-r from-cyan to-pink" animate={{ width: `${value * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <button
            onClick={() => setBacklogOpen(!backlogOpen)}
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2 font-mono text-xs text-slate-300 hover:border-cyan hover:text-cyan"
          >
            <History size={15} />
            <span>{backlogOpen ? 'Hide Backlog' : 'Dialogue History'}</span>
          </button>
        </div>
      </aside>

      {/* Main Visual Novel Canvas */}
      <section
        className="scene-panel order-1 min-h-[640px] overflow-hidden lg:order-2 relative"
        style={
          {
            '--tilt-x': `${tilt.x}%`,
            '--tilt-y': `${tilt.y}%`,
            '--scene-x': `${(tilt.x - 50) * -0.12}px`,
            '--scene-y': `${(tilt.y - 50) * -0.12}px`,
          } as CSSProperties
        }
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          setTilt({
            x: ((event.clientX - bounds.left) / bounds.width) * 100,
            y: ((event.clientY - bounds.top) / bounds.height) * 100,
          });
        }}
      >
        <div className={`scene-backdrop scene-${line.location}`} />
        <div className="scene-aurora" aria-hidden />

        {/* Scene Artifact Hotspots */}
        {artifacts.map((artifact) => {
          const found = scanned.includes(artifact.id) || Boolean(artifact.memory && state.unlockedMemories.includes(artifact.memory));
          return (
            <button
              key={artifact.id}
              type="button"
              className={`scene-artifact ${found ? 'scene-artifact-found' : ''}`}
              style={{ left: `${artifact.x}%`, top: `${artifact.y}%` }}
              onClick={() => scanArtifact(artifact)}
              aria-label={artifact.label}
            >
              {artifact.minigame ? <Wand2 size={15} className="text-pink" /> : <Eye size={15} />}
              <span>{found ? 'reconstructed' : artifact.label}</span>
            </button>
          );
        })}

        {/* Story Overlay / Backlog */}
        <div className="relative z-10 flex min-h-[640px] flex-col justify-end p-5 sm:p-8">
          <div className="mb-auto flex flex-wrap items-center justify-between gap-3">
            <span className="status-pill font-mono">
              <Database size={14} />
              {line.location.replace('-', ' ').toUpperCase()}
            </span>
            <span className="status-pill font-mono">
              <HeartPulse size={14} />
              EPISODE {currentEpisode?.episodeNumber ?? 1} / 30
            </span>
          </div>

          {backlogOpen ? (
            <div className="dialogue-box max-h-[300px] overflow-y-auto p-4 space-y-3 font-mono text-xs">
              <h4 className="font-display text-sm text-cyan mb-2">DIALOGUE BACKLOG</h4>
              {state.terminalHistory.map((item, idx) => (
                <p key={idx} className="text-slate-300">
                  {item}
                </p>
              ))}
            </div>
          ) : (
            <motion.div layout className="dialogue-box">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-2xl uppercase tracking-wider" style={{ color: character.color }}>
                    {character.name}
                  </p>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400">{line.mood}</p>
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan">LINE ID: {line.id}</span>
              </div>

              <div className="min-h-24 text-lg leading-relaxed text-slate-100 font-body">
                <Typewriter text={line.text} speed={state.settings.typewriterSpeed || 25} />
              </div>

              {/* Choices / Actions */}
              <div className="mt-6 grid gap-3">
                {line.choices?.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    className="choice-button group"
                    onClick={() => {
                      dispatch({ type: 'CHOOSE', choice });
                      if (choice.triggerMinigame) {
                        setActiveMinigame({
                          type: choice.triggerMinigame,
                          title: choice.label,
                          memoryId: choice.unlockMemory,
                        });
                      }
                    }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{choice.label}</span>
                    <ChevronRight size={18} aria-hidden />
                  </button>
                ))}

                {!line.choices && line.next && (
                  <button type="button" className="choice-button" onClick={advance}>
                    <span>Continue Narrative</span>
                    <ChevronRight size={18} aria-hidden />
                  </button>
                )}

                {!line.choices && !line.next && (
                  <button type="button" className="choice-button bg-pink/20 border-pink/60 text-pink hover:bg-pink hover:text-black" onClick={completeEpisode}>
                    <span>Complete Chapter {currentEpisode?.episodeNumber}</span>
                    <ChevronRight size={18} aria-hidden />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Interactive Minigame Modal */}
      {activeMinigame && (
        <MemoryMinigameOverlay
          type={activeMinigame.type}
          title={activeMinigame.title}
          memoryId={activeMinigame.memoryId}
          onClose={() => setActiveMinigame(null)}
        />
      )}
    </div>
  );
}
