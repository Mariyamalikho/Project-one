import { motion } from 'framer-motion';
import { Eye, FileCode, HeadphoneOff, Image as ImageIcon, Sparkles, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { MemoryMinigameOverlay } from '../components/MemoryMinigameOverlay';
import { memories } from '../data/world';
import type { MemoryFragment, MinigameType } from '../types';
import { useGame } from '../state/GameProvider';

export function MemoryPage() {
  const { state } = useGame();
  const [filter, setFilter] = useState<'all' | 'sketch' | 'photo' | 'audio' | 'terminal'>('all');
  const [activeMinigame, setActiveMinigame] = useState<{ type: MinigameType; title: string; memoryId: string } | null>(null);

  const filteredMemories = memories.filter((m) => filter === 'all' || m.kind === filter);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-3 text-pink">
          <Sparkles size={24} />
          <h2 className="font-display text-3xl uppercase tracking-wider text-slate-100">MEMORY ARCHIVE</h2>
        </div>
        <p className="mt-2 text-sm text-slate-400 font-mono">
          Recovered digital sketches, polaroids, voice logs, and corrupted ciphers.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'sketch', 'photo', 'audio', 'terminal'] as const).map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => setFilter(kind)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all ${
              filter === kind
                ? 'border-cyan bg-cyan/20 text-cyan shadow-neon'
                : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'
            }`}
          >
            {kind}
          </button>
        ))}
      </div>

      {/* Memories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMemories.map((mem) => {
          const unlocked = state.unlockedMemories.includes(mem.id);
          const repaired = state.repairedMemories?.includes(mem.id);

          return (
            <motion.div
              key={mem.id}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all ${
                unlocked
                  ? 'border-white/20 bg-void-dark/90 backdrop-blur-md shadow-lg'
                  : 'border-white/5 bg-black/40 opacity-40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-cyan uppercase">{mem.kind} FRAGMENT</span>
                  <span className={unlocked ? 'text-pink font-bold' : 'text-slate-600'}>
                    {repaired ? 'RECONSTRUCTED' : unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>

                <h4 className="font-display text-lg text-slate-100">{mem.title}</h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {unlocked ? mem.body : 'Encrypted subconscious data block. Explore story episodes to unlock.'}
                </p>

                {unlocked && mem.image && (
                  <div
                    className="mt-4 h-32 w-full rounded-xl border border-white/20 p-4 flex items-center justify-center text-center font-display text-xs text-white"
                    style={{ background: mem.image }}
                  >
                    <span>{mem.title}</span>
                  </div>
                )}
              </div>

              {unlocked && mem.minigame && !repaired && (
                <button
                  onClick={() =>
                    setActiveMinigame({
                      type: mem.minigame!,
                      title: mem.title,
                      memoryId: mem.id,
                    })
                  }
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-pink/60 bg-pink/15 py-2.5 font-mono text-xs uppercase tracking-wider text-pink hover:bg-pink hover:text-black transition-all"
                >
                  <Wand2 size={14} />
                  <span>Launch Reconstruction Minigame</span>
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

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
