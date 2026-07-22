import { motion } from 'framer-motion';
import { CheckCircle2, Lock, Play, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { episodes } from '../data/world';
import { useGame } from '../state/GameProvider';

export function EpisodesPage() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();

  const acts = [
    { number: 1, name: 'Act I: Corrupted Initialization', desc: 'Evaa awakens in the White Room and meets Marry.' },
    { number: 2, name: 'Act II: Subconscious Fragmentation', desc: 'Traversing the Broken Station and decrypting root archives.' },
    { number: 3, name: 'Act III: Convergence & Self-Acceptance', desc: 'Facing the System Administrator and embracing the archived self.' },
  ];

  function startEpisode(startLine: string) {
    dispatch({ type: 'ADVANCE', lineId: startLine });
    navigate('/story');
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-3 text-pink">
          <Sparkles size={24} />
          <h2 className="font-display text-3xl uppercase tracking-wider text-slate-100">EPISODES ARCHIVE</h2>
        </div>
        <p className="mt-2 text-sm text-slate-400 font-mono">
          30 Chapters across 3 Story Acts. Unlocking memories heals Echo Grid.
        </p>
      </div>

      {/* Acts Navigation */}
      {acts.map((act) => {
        const actEpisodes = episodes.filter((ep) => ep.act === act.number);
        const completedInAct = actEpisodes.filter((ep) => state.completedEpisodes.includes(ep.id)).length;
        const actProgress = Math.round((completedInAct / actEpisodes.length) * 100);

        return (
          <div key={act.number} className="rounded-2xl border border-white/10 bg-void-dark/80 p-6 backdrop-blur-md">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-cyan font-bold">
                  CHAPTER MATRIX // ACT 0{act.number}
                </span>
                <h3 className="font-display text-xl text-slate-100 mt-1">{act.name}</h3>
                <p className="text-xs text-slate-400">{act.desc}</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-pink">{completedInAct} / {actEpisodes.length} COMPLETED</span>
                <div className="mt-1.5 h-2 w-36 overflow-hidden rounded bg-white/10">
                  <div className="h-full bg-pink transition-all" style={{ width: `${actProgress}%` }} />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {actEpisodes.map((ep) => {
                const isCompleted = state.completedEpisodes.includes(ep.id);
                const isUnlocked =
                  !ep.requiredEpisode || state.completedEpisodes.includes(ep.requiredEpisode) || ep.episodeNumber === 1;

                return (
                  <motion.div
                    key={ep.id}
                    whileHover={isUnlocked ? { scale: 1.02 } : {}}
                    className={`relative flex flex-col justify-between rounded-xl border p-4 transition-all ${
                      isCompleted
                        ? 'border-cyan/50 bg-cyan/5'
                        : isUnlocked
                        ? 'border-white/15 bg-white/5 hover:border-pink/50'
                        : 'border-white/5 bg-black/40 opacity-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className={isUnlocked ? 'text-pink' : 'text-slate-500'}>EPISODE {ep.episodeNumber}</span>
                        {isCompleted ? (
                          <CheckCircle2 size={16} className="text-cyan" />
                        ) : isUnlocked ? (
                          <Sparkles size={14} className="text-yellow-400" />
                        ) : (
                          <Lock size={14} className="text-slate-500" />
                        )}
                      </div>

                      <h4 className="font-display text-base text-slate-100">{ep.title}</h4>
                      <p className="mt-1 text-xs text-slate-400 leading-relaxed">{ep.subtitle}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase text-slate-500">{ep.location.replace('-', ' ')}</span>
                      {isUnlocked ? (
                        <button
                          onClick={() => startEpisode(ep.startLine)}
                          type="button"
                          className="inline-flex items-center gap-1 text-xs font-mono uppercase text-cyan hover:text-pink"
                        >
                          <Play size={12} />
                          <span>{isCompleted ? 'Replay' : 'Launch'}</span>
                        </button>
                      ) : (
                        <span className="font-mono text-[10px] uppercase text-slate-600">Locked</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
