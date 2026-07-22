import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Sliders, Sparkles, Terminal, Volume2, Wand2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { MinigameType } from '../types';
import { useGame } from '../state/GameProvider';

interface Props {
  type: MinigameType;
  title: string;
  memoryId?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function MemoryMinigameOverlay({ type, title, memoryId, onClose, onSuccess }: Props) {
  const { dispatch } = useGame();
  const [completed, setCompleted] = useState(false);

  // Sketch Repair State
  const [dotsConnected, setDotsConnected] = useState<number[]>([]);
  const targetDots = [0, 1, 2, 3, 4, 5, 6, 7];

  // Node Connect State
  const [nodeState, setNodeState] = useState([false, false, false, false]);

  // Audio Tuner State
  const [freq, setFreq] = useState(40);
  const [pitch, setPitch] = useState(20);

  // Hex Decoder State
  const [hexInput, setHexInput] = useState<string[]>([]);
  const targetHex = ['0x45', '0x56', '0x41', '0x41'];

  // Photo Lens State
  const [clarity, setClarity] = useState(10);
  const [focus, setFocus] = useState(30);

  function handleComplete() {
    setCompleted(true);
    if (memoryId) {
      dispatch({ type: 'REPAIR_MEMORY', memoryId });
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: 'a-reconstructed' });
    }
    if (onSuccess) onSuccess();
    setTimeout(() => {
      onClose();
    }, 1800);
  }

  // Auto check conditions
  useEffect(() => {
    if (completed) return;
    if (type === 'sketch-repair' && dotsConnected.length >= targetDots.length) {
      handleComplete();
    } else if (type === 'node-connect' && nodeState.every(Boolean)) {
      handleComplete();
    } else if (type === 'audio-tune' && Math.abs(freq - 88) <= 5 && Math.abs(pitch - 75) <= 5) {
      handleComplete();
    } else if (type === 'hex-decrypt' && hexInput.length === targetHex.length && hexInput.every((v, i) => v === targetHex[i])) {
      handleComplete();
    } else if (type === 'photo-lens' && clarity >= 80 && Math.abs(focus - 70) <= 8) {
      handleComplete();
    }
  }, [dotsConnected, nodeState, freq, pitch, hexInput, clarity, focus, completed, type]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl rounded-2xl border border-cyan/40 bg-void-dark/95 p-6 shadow-2xl shadow-cyan/20"
        >
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-cyan/40 bg-cyan/10 p-2 text-cyan">
                <Wand2 size={20} />
              </div>
              <div>
                <p className="font-display text-xs uppercase tracking-[0.25em] text-cyan">Memory Reconstruction</p>
                <h3 className="font-display text-lg text-slate-100">{title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {completed ? (
            <div className="my-12 text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan/20 text-cyan border border-cyan/50"
              >
                <CheckCircle2 size={36} />
              </motion.div>
              <h4 className="font-display text-xl text-cyan">RECONSTRUCTION COMPLETE</h4>
              <p className="mt-2 text-sm text-slate-300">Subconscious fragment successfully integrated into core archive.</p>
            </div>
          ) : (
            <div className="min-h-[300px]">
              {/* SKETCH REPAIR */}
              {type === 'sketch-repair' && (
                <div className="flex flex-col items-center">
                  <p className="mb-4 text-xs tracking-wider text-slate-400">
                    Trace Marry&apos;s sketch by connecting the glowing nodes in sequence.
                  </p>
                  <div className="relative h-64 w-64 rounded-xl border border-pink/30 bg-black/60 p-4">
                    <svg className="absolute inset-0 h-full w-full pointer-events-none">
                      {dotsConnected.map((dotIdx, i) => {
                        if (i === 0) return null;
                        const prevDot = dotsConnected[i - 1];
                        const x1 = 30 + (prevDot % 3) * 80;
                        const y1 = 30 + Math.floor(prevDot / 3) * 80;
                        const x2 = 30 + (dotIdx % 3) * 80;
                        const y2 = 30 + Math.floor(dotIdx / 3) * 80;
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#EC4899"
                            strokeWidth="3"
                            strokeDasharray="4 2"
                            className="animate-pulse"
                          />
                        );
                      })}
                    </svg>
                    <div className="grid h-full w-full grid-cols-3 grid-rows-3 place-items-center">
                      {targetDots.map((dotIdx) => {
                        const isConnected = dotsConnected.includes(dotIdx);
                        return (
                          <button
                            key={dotIdx}
                            type="button"
                            onClick={() => {
                              if (!isConnected) setDotsConnected([...dotsConnected, dotIdx]);
                            }}
                            className={`h-8 w-8 rounded-full border text-xs font-mono transition-all ${
                              isConnected
                                ? 'border-pink bg-pink text-white shadow-neon-pink scale-110'
                                : 'border-cyan/50 bg-cyan/10 text-cyan hover:scale-125'
                            }`}
                          >
                            {dotIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-mono text-pink">
                    Progress: {dotsConnected.length} / {targetDots.length} nodes aligned
                  </p>
                </div>
              )}

              {/* NODE CONNECT */}
              {type === 'node-connect' && (
                <div className="flex flex-col items-center">
                  <p className="mb-6 text-xs tracking-wider text-slate-400">
                    Tap the fragmented memory relays to sync signal paths.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {['Empathy Matrix', 'Memory Cache', 'Subconscious Gateway', 'Archived Self'].map((name, i) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => {
                          const next = [...nodeState];
                          next[i] = !next[i];
                          setNodeState(next);
                        }}
                        className={`flex flex-col items-center justify-center rounded-xl border p-5 transition-all ${
                          nodeState[i]
                            ? 'border-cyan bg-cyan/20 text-cyan shadow-neon'
                            : 'border-white/10 bg-white/5 text-slate-400 hover:border-cyan/40'
                        }`}
                      >
                        <Sparkles size={24} className={nodeState[i] ? 'animate-bounce' : ''} />
                        <span className="mt-2 font-display text-xs uppercase">{name}</span>
                        <span className="mt-1 font-mono text-[10px]">
                          {nodeState[i] ? 'SYNCED' : 'DISCONNECTED'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AUDIO TUNE */}
              {type === 'audio-tune' && (
                <div className="flex flex-col items-center">
                  <p className="mb-4 text-xs tracking-wider text-slate-400">
                    Match the frequency (88Hz) and phase (75°) to unmask Marry&apos;s audio log.
                  </p>
                  <div className="mb-6 flex h-28 w-full items-center justify-center rounded-xl border border-cyan/30 bg-black/60 p-4">
                    <svg className="h-full w-full overflow-visible">
                      <path
                        d={`M 0 50 Q ${freq} ${100 - pitch}, ${freq * 2} 50 T ${freq * 4} 50 T ${freq * 6} 50`}
                        fill="none"
                        stroke="#22D3EE"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <div className="w-full space-y-4 max-w-md">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-cyan">
                        <span>Frequency: {freq} Hz</span>
                        <span>Target: 88 Hz</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="120"
                        value={freq}
                        onChange={(e) => setFreq(Number(e.target.value))}
                        className="w-full accent-cyan"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-mono text-pink">
                        <span>Phase Shift: {pitch}°</span>
                        <span>Target: 75°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={pitch}
                        onChange={(e) => setPitch(Number(e.target.value))}
                        className="w-full accent-pink"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* HEX DECRYPT */}
              {type === 'hex-decrypt' && (
                <div className="flex flex-col items-center">
                  <p className="mb-4 text-xs tracking-wider text-slate-400">
                    Decrypt Evaa&apos;s original memory payload sequence (EVAA).
                  </p>
                  <div className="mb-6 flex gap-3">
                    {targetHex.map((_, i) => (
                      <div
                        key={i}
                        className={`flex h-12 w-14 items-center justify-center rounded-lg border font-mono text-sm font-bold ${
                          hexInput[i]
                            ? 'border-cyan bg-cyan/20 text-cyan'
                            : 'border-white/20 bg-white/5 text-slate-500'
                        }`}
                      >
                        {hexInput[i] || '??'}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {['0x45', '0x89', '0x56', '0x41', '0x12', '0xFF', '0x41', '0x99'].map((hex, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (hexInput.length < targetHex.length) {
                            setHexInput([...hexInput, hex]);
                          }
                        }}
                        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-slate-300 hover:border-cyan hover:text-cyan"
                      >
                        {hex}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setHexInput([])}
                    className="mt-4 font-mono text-xs text-rose-400 hover:underline"
                  >
                    Clear Input Buffer
                  </button>
                </div>
              )}

              {/* PHOTO LENS */}
              {type === 'photo-lens' && (
                <div className="flex flex-col items-center">
                  <p className="mb-4 text-xs tracking-wider text-slate-400">
                    Adjust Clarity and Focal Alignment to restore the corrupted photograph.
                  </p>
                  <div
                    className="mb-6 flex h-44 w-64 items-center justify-center rounded-xl border border-white/20 bg-slate-900 p-4 transition-all"
                    style={{
                      filter: `blur(${Math.max(0, (100 - clarity) / 10)}px) contrast(${100 + (focus - 50)}%)`,
                    }}
                  >
                    <div className="text-center">
                      <Sparkles className="mx-auto mb-2 text-purple-400" size={32} />
                      <p className="font-display text-xs uppercase tracking-widest text-slate-200">
                        Evaa & Marry — Archive #2019
                      </p>
                    </div>
                  </div>
                  <div className="w-full space-y-4 max-w-md">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-purple">
                        <span>Clarity Threshold: {clarity}%</span>
                        <span>Min 80%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={clarity}
                        onChange={(e) => setClarity(Number(e.target.value))}
                        className="w-full accent-purple"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-mono text-cyan">
                        <span>Focal Alignment: {focus}</span>
                        <span>Target: 70</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={focus}
                        onChange={(e) => setFocus(Number(e.target.value))}
                        className="w-full accent-cyan"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
