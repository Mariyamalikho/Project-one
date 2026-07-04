import { GitBranch } from 'lucide-react';
import { characters } from '../data/world';
import { relationshipNotes } from '../data/os';
import { useGame } from '../state/GameProvider';

export function RelationshipsPage() {
  const { state } = useGame();
  return (
    <section>
      <h1 className="page-title">Relationship Tracker</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        {characters.map((character) => {
          const value = state.relationship[character.id];
          const width = `${Math.max(0, (value + 5) / 15) * 100}%`;
          return (
            <article key={character.id} className="holo-panel p-5">
              <div className="flex items-center gap-3">
                <GitBranch style={{ color: character.color }} />
                <div>
                  <h2 className="font-display text-2xl" style={{ color: character.color }}>{character.name}</h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{character.role}</p>
                </div>
              </div>
              <div className="mt-6 h-3 overflow-hidden rounded bg-white/10">
                <div className="h-full" style={{ width, background: character.color }} />
              </div>
              <div className="mt-2 flex justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
                <span>fractured</span>
                <span>{value}</span>
                <span>bonded</span>
              </div>
              <p className="mt-5 text-slate-300">{relationshipNotes[character.id]}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
