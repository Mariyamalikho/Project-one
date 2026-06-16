import { CheckCircle2, Lock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { episodes } from '../data/world';
import { useGame } from '../state/GameProvider';

export function EpisodesPage() {
  const { state, dispatch } = useGame();
  return (
    <section>
      <h1 className="page-title">Episode Select</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {episodes.map((episode, index) => {
          const locked = Boolean(episode.requiredEpisode && !state.completedEpisodes.includes(episode.requiredEpisode));
          const completed = state.completedEpisodes.includes(episode.id);
          return (
            <article key={episode.id} className={`holo-panel p-5 ${locked ? 'opacity-55' : ''}`}>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan">chapter {String(index + 1).padStart(2, '0')}</p>
              <h2 className="mt-3 font-display text-2xl text-slate-100">{episode.title}</h2>
              <p className="mt-2 min-h-12 text-slate-400">{episode.subtitle}</p>
              <Link
                aria-disabled={locked}
                to={locked ? '/episodes' : '/story'}
                onClick={() => !locked && dispatch({ type: 'ADVANCE', lineId: episode.startLine })}
                className="mt-6 inline-flex items-center gap-2 rounded border border-cyan/40 px-4 py-2 text-sm text-cyan hover:bg-cyan/10"
              >
                {locked ? <Lock size={16} /> : completed ? <CheckCircle2 size={16} /> : <Play size={16} />}
                {locked ? 'Locked' : completed ? 'Replay' : 'Launch'}
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
