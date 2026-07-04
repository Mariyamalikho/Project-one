import { CloudOff, Download, Save } from 'lucide-react';
import { useGame } from '../state/GameProvider';

export function SaveSlotsPage() {
  const { slots, state, writeSlot, loadSlot } = useGame();
  return (
    <section>
      <h1 className="page-title">Save Slots</h1>
      <div className="mb-5 holo-panel flex flex-wrap items-center gap-3 p-4 text-sm text-slate-300">
        <CloudOff className="text-warning" size={18} />
        <span>Cloud save adapter is prepared as an optional future layer. Current saves are local and private.</span>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {slots.map((slot) => (
          <article key={slot.id} className={`holo-panel p-5 ${state.activeSlot === slot.id ? 'border-cyan/60 shadow-neon' : ''}`}>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan">{slot.label}</p>
            <h2 className="mt-3 font-display text-2xl">{slot.state ? 'Recovered Save' : 'Empty Slot'}</h2>
            <p className="mt-2 text-sm text-slate-400">
              {slot.savedAt ? new Date(slot.savedAt).toLocaleString() : 'No manual save written yet.'}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button className="secondary-cta" type="button" onClick={() => writeSlot(slot.id)}>
                <Save size={17} />
                <span>Save</span>
              </button>
              <button className="secondary-cta" type="button" disabled={!slot.state} onClick={() => loadSlot(slot.id)}>
                <Download size={17} />
                <span>Load</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
