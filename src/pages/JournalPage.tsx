import { BookOpen, LockKeyhole } from 'lucide-react';
import { journalEntries } from '../data/os';
import { useGame } from '../state/GameProvider';

export function JournalPage() {
  const { state } = useGame();
  return (
    <section>
      <h1 className="page-title">Journal</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        {journalEntries.map((entry) => {
          const unlocked = state.journalEntries.includes(entry.id);
          return (
            <article key={entry.id} className={`holo-panel p-5 ${unlocked ? '' : 'opacity-55'}`}>
              <div className="flex items-center gap-3 text-cyan">
                {unlocked ? <BookOpen size={18} /> : <LockKeyhole size={18} />}
                <span className="text-xs uppercase tracking-[0.24em]">{unlocked ? 'entry recovered' : 'entry encrypted'}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl">{unlocked ? entry.title : 'Redacted Note'}</h2>
              <p className="mt-3 text-slate-300">{unlocked ? entry.body : 'Progress through story branches or terminal recovery to restore this note.'}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
