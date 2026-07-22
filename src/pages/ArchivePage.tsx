import { motion } from 'framer-motion';
import { Shield, Sparkles, User, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { CharacterPortrait } from '../components/CharacterPortrait';
import { characters } from '../data/world';
import type { CharacterId } from '../types';

export function ArchivePage() {
  const [selectedId, setSelectedId] = useState<CharacterId>('eva');
  const selectedChar = characters.find((c) => c.id === selectedId) || characters[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-3 text-cyan">
          <User size={24} />
          <h2 className="font-display text-3xl uppercase tracking-wider text-slate-100">CHARACTER ARCHIVE</h2>
        </div>
        <p className="mt-2 text-sm text-slate-400 font-mono">
          Dossiers of subconscious processes, archived identities, and kernel daemons in Echo Grid.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Character Tabs */}
        <div className="flex flex-col gap-3">
          {characters.map((char) => {
            const active = char.id === selectedId;
            return (
              <button
                key={char.id}
                type="button"
                onClick={() => setSelectedId(char.id)}
                className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                  active
                    ? 'border-cyan bg-cyan/15 text-white shadow-neon'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-cyan/40 hover:text-slate-200'
                }`}
              >
                <div
                  className="h-9 w-9 rounded-full border flex items-center justify-center font-mono text-xs font-bold"
                  style={{ borderColor: char.color, color: char.color, backgroundColor: `${char.color}20` }}
                >
                  {char.name[0]}
                </div>
                <div>
                  <h4 className="font-display text-sm text-slate-100">{char.name}</h4>
                  <p className="text-[10px] font-mono text-slate-400">{char.alias}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Character Details Dossier */}
        <motion.div
          key={selectedChar.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-white/15 bg-void-dark/90 p-6 backdrop-blur-md"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start border-b border-white/10 pb-6">
            <CharacterPortrait id={selectedChar.id} size="lg" />
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: selectedChar.color }}>
                    {selectedChar.alias}
                  </span>
                  <h3 className="font-display text-3xl text-slate-100">{selectedChar.name}</h3>
                </div>
                <div className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-pink">
                  {selectedChar.glitchPercent}% CORRUPTION
                </div>
              </div>

              <p className="font-display text-sm italic text-cyan">&quot;{selectedChar.quote}&quot;</p>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedChar.biography}</p>

              <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Volume2 size={14} className="text-cyan" /> {selectedChar.voiceProfile}
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles size={14} className="text-pink" /> Status: {selectedChar.emotionalState}
                </span>
              </div>
            </div>
          </div>

          {/* Sub-sections: Secrets, Timeline, Relationships */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Secrets & Timeline */}
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-cyan mb-2">RECOVERED MEMORY SECRETS</h4>
                <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                  {selectedChar.secrets.map((secret, i) => (
                    <li key={i}>{secret}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h4 className="font-display text-xs uppercase tracking-widest text-pink mb-2">TIMELINE LOGS</h4>
                <ul className="space-y-1.5 font-mono text-xs text-slate-400">
                  {selectedChar.timeline.map((event, i) => (
                    <li key={i}>• {event}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Relationship Matrix */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h4 className="font-display text-xs uppercase tracking-widest text-purple mb-3">RELATIONSHIP LINKS</h4>
              <div className="space-y-3">
                {selectedChar.relationships.map((rel, i) => {
                  const targetChar = characters.find((c) => c.id === rel.characterId);
                  return (
                    <div key={i} className="border-b border-white/5 pb-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-200">{targetChar?.name}</span>
                        <span style={{ color: rel.level > 0 ? '#22D3EE' : '#FF4D6D' }}>
                          AFFINITY: {rel.level > 0 ? `+${rel.level}` : rel.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{rel.note}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
