import { Briefcase, LockKeyhole } from 'lucide-react';
import { inventoryItems } from '../data/os';
import { useGame } from '../state/GameProvider';

export function InventoryPage() {
  const { state } = useGame();
  return (
    <section>
      <h1 className="page-title">Inventory</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {inventoryItems.map((item) => {
          const unlocked = state.inventory.includes(item.id);
          return (
            <article key={item.id} className={`holo-panel min-h-64 p-5 ${unlocked ? '' : 'opacity-50'}`}>
              <div className="grid h-16 w-16 place-items-center rounded border border-cyan/35 text-cyan">
                {unlocked ? <Briefcase size={28} /> : <LockKeyhole size={24} />}
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.24em] text-magenta">{unlocked ? item.type : 'locked'}</p>
              <h2 className="mt-2 font-display text-xl">{unlocked ? item.title : 'Unknown File'}</h2>
              <p className="mt-3 text-sm text-slate-400">{unlocked ? item.body : 'Hidden collectible not yet recovered.'}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
