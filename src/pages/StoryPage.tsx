import { motion } from 'framer-motion';
import { ChevronRight, Database, Eye, HeartPulse } from 'lucide-react';
import { type CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterPortrait } from '../components/CharacterPortrait';
import { Typewriter } from '../components/Typewriter';
import { characters, dialogue, episodes } from '../data/world';
import type { LocationId } from '../types';
import { useGame } from '../state/GameProvider';

const sceneArtifacts: Record<LocationId, Array<{ id: string; label: string; x: number; y: number; memory?: string; journal?: string; item?: string }>> = {
  'white-room': [
    { id: 'glass', label: 'scan glass handprint', x: 70, y: 22, memory: 'm-room', journal: 'j-glass', item: 'i-glass' },
    { id: 'bed', label: 'inspect empty bed', x: 24, y: 58 },
  ],
  'neon-city': [
    { id: 'billboard', label: 'read broken billboard', x: 63, y: 28, memory: 'm-lullaby', journal: 'j-city' },
    { id: 'rain', label: 'catch upward rain', x: 34, y: 46 },
  ],
  'memory-forest': [
    { id: 'branch', label: 'listen to black branch', x: 48, y: 35, memory: 'm-bot' },
    { id: 'swing', label: 'touch old swing', x: 72, y: 64 },
  ],
  'archive-core': [
    { id: 'terminal', label: 'decrypt apology log', x: 52, y: 29, memory: 'm-bot', journal: 'j-core' },
    { id: 'server', label: 'ping frozen server', x: 78, y: 52 },
  ],
  'broken-station': [
    { id: 'ticket', label: 'recover platform ticket', x: 30, y: 42, memory: 'm-train', item: 'i-ticket' },
    { id: 'clock', label: 'rewind station clock', x: 68, y: 24 },
  ],
  'final-sanctuary': [
    { id: 'drawing', label: 'restore unsent drawing', x: 58, y: 33, memory: 'm-sanctuary', journal: 'j-sanctuary', item: 'i-artwork' },
    { id: 'moon', label: 'steady paper moon', x: 38, y: 22 },
  ],
};

export function StoryPage() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [scanned, setScanned] = useState<string[]>([]);
  const [tilt, setTilt] = useState({ x: 50, y: 50 });
  const line = dialogue[state.currentLineId] ?? dialogue['boot-01'];
  const character = characters.find((item) => item.id === line.character)!;
  const currentEpisode = episodes.find((episode) => episode.startLine === line.id || episode.location === line.location);
  const artifacts = sceneArtifacts[line.location];

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
    if (artifact.journal) dispatch({ type: 'ADD_JOURNAL', entryId: artifact.journal });
    if (artifact.item) dispatch({ type: 'ADD_INVENTORY', itemId: artifact.item });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <aside className="holo-panel order-2 p-5 lg:order-1">
        <CharacterPortrait id={line.character} mood={line.mood} />
        <div className="mt-6 space-y-4">
          {Object.entries(state.emotion).map(([key, value]) => (
            <div key={key}>
              <div className="mb-1 flex justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                <span>{key}</span>
                <span>{value}/10</span>
              </div>
              <div className="h-2 overflow-hidden rounded bg-white/10">
                <motion.div className="h-full bg-cyan" animate={{ width: `${value * 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </aside>
      <section
        className="scene-panel order-1 min-h-[640px] overflow-hidden lg:order-2"
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
        <div className="scene-orbit" aria-hidden />
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
              <Eye size={16} aria-hidden />
              <span>{found ? 'decoded' : artifact.label}</span>
            </button>
          );
        })}
        <div className="relative z-10 flex min-h-[640px] flex-col justify-end p-4 sm:p-7">
          <div className="mb-auto flex flex-wrap items-center gap-3">
            <span className="status-pill">
              <Database size={15} />
              {line.location.replace('-', ' ')}
            </span>
            <span className="status-pill">
              <HeartPulse size={15} />
              auto-save active
            </span>
          </div>
          <motion.div layout className="dialogue-box">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-2xl uppercase tracking-[0.16em]" style={{ color: character.color }}>
                  {character.name}
                </p>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{line.mood}</p>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-cyan">line {line.id}</span>
            </div>
            <div className="min-h-28 text-xl leading-relaxed text-slate-100">
              <Typewriter text={line.text} />
            </div>
            <div className="mt-6 grid gap-3">
              {line.choices?.map((choice) => (
                <button key={choice.id} type="button" className="choice-button" onClick={() => dispatch({ type: 'CHOOSE', choice })}>
                  <span>{choice.label}</span>
                  <ChevronRight size={18} aria-hidden />
                </button>
              ))}
              {!line.choices && line.next && (
                <button type="button" className="choice-button" onClick={advance}>
                  <span>Continue</span>
                  <ChevronRight size={18} aria-hidden />
                </button>
              )}
              {!line.choices && !line.next && (
                <button type="button" className="choice-button" onClick={completeEpisode}>
                  <span>Complete Episode</span>
                  <ChevronRight size={18} aria-hidden />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
