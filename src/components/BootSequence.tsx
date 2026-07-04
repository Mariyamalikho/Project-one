import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGame } from '../state/GameProvider';

const bootLines = [
  'glitch/os v7.03 initializing',
  'mounting white_room.img',
  'recovering empathy cache',
  'detecting Marry process',
  'warning: memory checksum is crying',
  'launching corrupted desktop',
];

export function BootSequence() {
  const { state, dispatch } = useGame();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (state.booted) return;
    const timer = window.setInterval(() => {
      setIndex((value) => {
        if (value >= bootLines.length - 1) {
          window.clearInterval(timer);
          window.setTimeout(() => dispatch({ type: 'SET_BOOTED', booted: true }), 520);
          return value;
        }
        return value + 1;
      });
    }, state.settings.reduceMotion ? 80 : 360);
    return () => window.clearInterval(timer);
  }, [dispatch, state.booted, state.settings.reduceMotion]);

  return (
    <AnimatePresence>
      {!state.booted && (
        <motion.section className="boot-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(18px)' }}>
          <div className="boot-core">
            <p className="font-display text-cyan">glitch.exe</p>
            <div className="boot-loader" />
            <div className="mt-6 space-y-2 font-mono text-sm text-acid">
              {bootLines.slice(0, index + 1).map((line) => (
                <p key={line}>$ {line}</p>
              ))}
            </div>
            <button className="mt-7 text-xs uppercase tracking-[0.24em] text-slate-400 hover:text-cyan" type="button" onClick={() => dispatch({ type: 'SET_BOOTED', booted: true })}>
              skip boot
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
