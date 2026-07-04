import { FileAudio, FileImage, FileText, ShieldAlert } from 'lucide-react';
import { easterEggs } from '../data/os';
import { memories } from '../data/world';
import { useGame } from '../state/GameProvider';

const icons = {
  image: FileImage,
  audio: FileAudio,
  text: FileText,
  corrupt: ShieldAlert,
};

export function MemoryPage() {
  const { state } = useGame();
  return (
    <section>
      <h1 className="page-title">Memory Archive</h1>
      <div className="mb-5 holo-panel p-4 text-sm text-slate-300">
        <p className="font-display text-cyan">Hidden collectible routes</p>
        <p className="mt-2">{easterEggs.join(' / ')}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {memories.map((memory) => {
          const unlocked = state.unlockedMemories.includes(memory.id);
          const Icon = icons[memory.kind];
          return (
            <article key={memory.id} className={`holo-panel overflow-hidden ${unlocked ? '' : 'opacity-60'}`}>
              <div className="h-36 border-b border-white/10" style={{ background: unlocked ? memory.image ?? 'linear-gradient(135deg,#111827,#31f7ff22)' : 'repeating-linear-gradient(90deg,#111,#111 8px,#191919 8px,#191919 16px)' }} />
              <div className="p-5">
                <div className="flex items-center gap-3 text-cyan">
                  <Icon size={18} />
                  <span className="text-xs uppercase tracking-[0.24em]">{memory.kind}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl">{unlocked ? memory.title : 'Encrypted Fragment'}</h2>
                <p className="mt-3 text-slate-300">{unlocked ? memory.body : 'Collect this memory during story choices to decrypt the file.'}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
